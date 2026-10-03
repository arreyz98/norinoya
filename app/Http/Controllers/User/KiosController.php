<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\KiosItem;
use App\Models\KiosPartner;
use App\Models\KiosViewLog;
use App\Models\SearchLogKios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KiosController extends Controller
{
    public function index()
    {
        $kiosItems = Cache::remember('kios:list:v2', 300, fn () => KiosItem::with(['kiosPartner:id,name,slug', 'linkedBook:id,title'])->available()->latest()->limit(80)->get());
        $books = Cache::remember('kios:books:v2', 300, fn () => Book::with([
            'series:id,title', 'edition:id,name', 'storyStatus:id,name', 'publisher:id,name', 'images:id,book_id,image_url,sort_order', 'genres:id,name',
        ])->latest('updated_at')->limit(100)->get());
        $totalKiosItemsCount = Cache::remember('kios:total_items', 300, fn () => KiosItem::count());
        $totalPartnersCount = Cache::remember('kios:total_partners', 300, fn () => KiosPartner::count());

        return Inertia::render('User/kios', [
            'kiosItems' => $kiosItems,
            'books' => Inertia::defer(fn () => $books),
            'totalKiosItemsCount' => $totalKiosItemsCount,
            'totalPartnersCount' => $totalPartnersCount,
            'meta' => [
                'title' => 'Kios Norinoya - Marketplace Komik & Merchandise',
                'description' => 'Beli merchandise, komik, dan produk eksklusif di Kios Norinoya. Temukan penawaran terbaik dari Gramedia, Shopee, Tokopedia, dan lokakarya seni.',
                'image' => url('/favicon.png'),
                'url' => url('/kios'),
                'type' => 'website',
            ],
        ]);
    }

    public function relevantByTitle(Request $request)
    {
        $title = trim(preg_replace('/\s+/u', ' ', (string) $request->input('title', '')));

        if (mb_strlen($title, 'UTF-8') < 2) {
            return response()->json(['success' => false, 'items' => []]);
        }

        $needle = '%'.addcslashes(mb_strtolower($title, 'UTF-8'), '%_\\').'%';

        $words = array_values(array_filter(
            preg_split('/[\s:â€“-]+/u', mb_strtolower($title, 'UTF-8')) ?: [],
            fn ($w) => mb_strlen($w, 'UTF-8') > 2
        ));

        $effectiveTitle = "IFNULL(NULLIF(comic_title, ''), title)";

        $columns = [
            'id',
            'slug',
            'title',
            'comic_title',
            'vol_number',
            'category',
            'cover_image',
            'deskripsi_produk',
            'notes',
            'price',
            'original_price',
            'genres',
            'publisher_name',
        ];

        $items = KiosItem::query()
            ->where(function ($q) use ($needle, $words, $effectiveTitle) {
                $q->whereRaw('LOWER(comic_title) LIKE ?', [$needle])
                    ->orWhereRaw('LOWER(title) LIKE ?', [$needle]);
                foreach ($words as $word) {
                    $q->orWhereRaw("LOWER({$effectiveTitle}) LIKE ?", [
                        '%'.addcslashes($word, '%_\\').'%',
                    ]);
                }
            })
            ->where('is_sold_out', false)
            ->latest()
            ->limit(12)
            ->get($columns);

        if ($items->isEmpty()) {
            $items = KiosItem::query()
                ->where('is_sold_out', false)
                ->latest()
                ->limit(4)
                ->get($columns);

            return response()->json([
                'success' => true,
                'title' => $title,
                'fallback' => true,
                'items' => $items,
            ]);
        }

        return response()->json([
            'success' => true,
            'title' => $title,
            'fallback' => false,
            'items' => $items,
        ]);
    }

    public function searchLog(Request $request)
    {
        $rawKeyword = (string) $request->input('keyword', '');

        $keyword = trim(preg_replace('/\s+/u', ' ', $rawKeyword));
        $keyword = mb_strtolower($keyword, 'UTF-8');

        if (mb_strlen($keyword, 'UTF-8') < 3) {
            return response()->json(['success' => false, 'message' => 'Keyword terlalu pendek (min 3 huruf).'], 422);
        }

        if (mb_strlen($keyword, 'UTF-8') > 100) {
            $keyword = mb_substr($keyword, 0, 100, 'UTF-8');
        }

        if (preg_match('/(.)\1{3,}/u', $keyword) || ! preg_match('/[\p{L}\p{N}]/u', $keyword)) {
            return response()->json(['success' => false, 'message' => 'Keyword terdeteksi spam atau karakter berulang.'], 422);
        }

        $today = now()->setTimezone('Asia/Jakarta')->toDateString();

        $log = SearchLogKios::firstOrCreate(
            [
                'keyword' => $keyword,
                'search_date' => $today,
            ],
            [
                'search_count' => 0,
            ]
        );

        $log->increment('search_count');

        return response()->json([
            'success' => true,
            'id' => $log->id,
            'keyword' => $log->keyword,
            'search_count' => (int) $log->search_count,
            'search_date' => $today,
        ]);
    }

    public function show(Request $request, $slug)
    {
        $kiosItem = KiosItem::where('slug', $slug)
            ->orWhere('id', $slug)
            ->with(['kiosPartner', 'linkedBook'])
            ->first();

        if (! $kiosItem) {
            return redirect()->route('kios');
        }

        $ip = $request->ip();
        $ua = $request->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = KiosViewLog::where('kios_item_id', $kiosItem->id)
            ->where('action_type', 'view')
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (! $alreadyLogged) {
            $kiosItem->increment('views_count');

            KiosViewLog::create([
                'kios_item_id' => $kiosItem->id,
                'action_type' => 'view',
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }

        $kiosItems = KiosItem::with(['kiosPartner', 'linkedBook'])->available()->latest()->get();
        $books = Book::with([
            'series',
            'edition',
            'storyStatus',
            'publisher',
            'images',
            'genres',
        ])->get();

        $totalKiosItemsCount = KiosItem::count();
        $totalPartnersCount = KiosPartner::count();

        return Inertia::render('User/kios', [
            'kiosItems' => $kiosItems,
            'books' => $books,
            'initialKiosItem' => $kiosItem,
            'initialSlug' => $slug,
            'totalKiosItemsCount' => $totalKiosItemsCount,
            'totalPartnersCount' => $totalPartnersCount,
            'meta' => [
                'title' => $kiosItem->title.' - Norinoya Kios',
                'description' => Str::limit(strip_tags($kiosItem->deskripsi_produk ?? 'Beli merchandise, komik, dan produk eksklusif di Kios Norinoya.'), 160),
                'image' => ($img = $kiosItem->cover_image) ? (Str::startsWith($img, ['http://', 'https://']) ? $img : url($img)) : url('/favicon.png'),
                'url' => url("/kios/{$kiosItem->slug}"),
                'type' => 'product',
            ],
        ]);
    }

    public function incrementView(Request $request, $id)
    {
        $cleanId = preg_replace('/^kios-/', '', $id);
        $slug = $request->input('slug');

        $item = null;
        if (is_numeric($cleanId)) {
            $item = KiosItem::where('id', $cleanId)->first();
        }

        if (! $item) {
            $targetSlug = $slug ?: $id;
            $item = KiosItem::where('slug', $targetSlug)->first()
                ?? KiosItem::where('id', $id)->first();
        }

        if ($item) {
            $ip = $request->ip();
            $ua = $request->userAgent();
            $oneMinuteAgo = now()->subMinute();

            $alreadyLogged = KiosViewLog::where('kios_item_id', $item->id)
                ->where('action_type', 'view')
                ->where('ip_address', $ip)
                ->where('created_at', '>=', $oneMinuteAgo)
                ->exists();

            if (! $alreadyLogged) {
                $item->increment('views_count');

                KiosViewLog::create([
                    'kios_item_id' => $item->id,
                    'action_type' => 'view',
                    'ip_address' => $ip,
                    'user_agent' => $ua,
                ]);
            }

            return response()->json([
                'success' => true,
                'kios_id' => $item->id,
                'views_count' => (int) $item->views_count,
                'is_new_view' => ! $alreadyLogged,
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Kios item not found'], 404);
    }

    public function incrementClick(Request $request, $id)
    {
        $cleanId = preg_replace('/^kios-/', '', $id);
        $platform = strtolower((string) $request->input('platform', ''));
        $slug = $request->input('slug');

        $item = null;
        if (is_numeric($cleanId)) {
            $item = KiosItem::where('id', $cleanId)->first();
        }

        if (! $item) {
            $targetSlug = $slug ?: $id;
            $item = KiosItem::where('slug', $targetSlug)->first()
                ?? KiosItem::where('id', $id)->first();
        }

        if ($item) {
            $allowed = ['shopee', 'tokopedia', 'gramedia', 'toco'];
            $isAllowed = in_array($platform, $allowed, true);

            // Dedup klik: 10 detik window per IP+item+platform untuk mencegah inflate
            $tenSecondsAgo = now()->subSeconds(10);
            $actionType = $isAllowed ? "click_{$platform}" : 'click_other';
            $recentClick = KiosViewLog::where('kios_item_id', $item->id)
                ->where('action_type', $actionType)
                ->where('ip_address', $request->ip())
                ->where('created_at', '>=', $tenSecondsAgo)
                ->exists();

            if ($recentClick) {
                return response()->json([
                    'success' => true,
                    'kios_id' => $item->id,
                    'platform' => $platform,
                    'deduped' => true,
                    'total_clicks_count' => (int) $item->total_clicks_count,
                    'shopee_clicks_count' => (int) $item->shopee_clicks_count,
                    'tokopedia_clicks_count' => (int) $item->tokopedia_clicks_count,
                    'gramedia_clicks_count' => (int) $item->gramedia_clicks_count,
                    'toco_clicks_count' => (int) $item->toco_clicks_count,
                ]);
            }

            $item->increment('total_clicks_count');

            if ($isAllowed) {
                $column = "{$platform}_clicks_count";
                $item->increment($column);
            }

            KiosViewLog::create([
                'kios_item_id' => $item->id,
                'action_type' => $actionType,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => true,
                'kios_id' => $item->id,
                'platform' => $platform,
                'total_clicks_count' => (int) $item->total_clicks_count,
                'shopee_clicks_count' => (int) $item->shopee_clicks_count,
                'tokopedia_clicks_count' => (int) $item->tokopedia_clicks_count,
                'gramedia_clicks_count' => (int) $item->gramedia_clicks_count,
                'toco_clicks_count' => (int) $item->toco_clicks_count,
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Kios item not found'], 404);
    }
}
