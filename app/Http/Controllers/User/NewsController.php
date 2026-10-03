<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\KiosItem;
use App\Models\News;
use App\Models\NewsViewLog;
use App\Models\SearchLogNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $newsList = Cache::remember('news:list:v2', 300, fn () => News::latest()->limit(80)->get());
        $kiosItems = Cache::remember('news:kios_items', 300, fn () => KiosItem::with(['kiosPartner:id,name,slug', 'linkedBook:id,title'])->available()->latest()->limit(40)->get());
        $books = Cache::remember('news:books:v2', 300, fn () => Book::homeQuery()->latest('updated_at')->limit(100)->get());
        $totalNewsCount = Cache::remember('news:total', 300, fn () => News::count());

        return Inertia::render('User/news', [
            'newsList' => $newsList,
            'books' => $books,
            'kiosItems' => Inertia::defer(fn () => $kiosItems),
            'totalNewsCount' => $totalNewsCount,
            'meta' => [
                'title' => 'Berita &amp; Update - Norinoya',
                'description' => 'Baca update berita dan artikel terbaru seputar manga, anime, dan pop culture di Norinoya.',
                'image' => url('/favicon.png'),
                'url' => url('/news'),
                'type' => 'website',
            ],
        ]);
    }

    public function show(Request $request, $slug)
    {
        $news = News::where('slug', $slug)
            ->orWhere('id', $slug)
            ->first();

        if (! $news) {
            return redirect()->route('news');
        }

        $ip = $request->ip();
        $ua = $request->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = NewsViewLog::where('news_id', $news->id)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (! $alreadyLogged) {
            $news->increment('views_count');

            NewsViewLog::create([
                'news_id' => $news->id,
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }

        $newsList = News::latest()->get();
        $kiosItems = KiosItem::with(['kiosPartner', 'linkedBook'])->available()->latest()->get();
        $books = Book::with([
            'series',
            'edition',
            'storyStatus',
            'publisher',
            'images',
            'authors',
            'genres',
            'affiliateLinks.affiliateStore',
            'tiktokEmbeds',
        ])->get();

        $totalNewsCount = News::count();

        return Inertia::render('User/news', [
            'newsList' => $newsList,
            'books' => $books,
            'kiosItems' => $kiosItems,
            'initialNews' => $news,
            'initialSlug' => $slug,
            'totalNewsCount' => $totalNewsCount,
            'meta' => [
                'title' => $news->title.' - Norinoya News',
                'description' => Str::limit(strip_tags($news->content ?? 'Baca update berita dan artikel terbaru di Norinoya News.'), 160),
                'image' => ($img = $news->attached_image) ? (Str::startsWith($img, ['http://', 'https://']) ? $img : url($img)) : url('/favicon.png'),
                'url' => url("/news/{$news->slug}"),
                'type' => 'article',
            ],
        ]);
    }

    public function incrementView(Request $request, $id)
    {
        $cleanId = preg_replace('/^news-/', '', $id);
        $slug = $request->input('slug');

        $news = null;
        if (is_numeric($cleanId)) {
            $news = News::where('id', $cleanId)->first();
        }

        if (! $news) {
            $targetSlug = $slug ?: $id;
            $news = News::where('slug', $targetSlug)->first()
                ?? News::where('id', $id)->first();
        }

        if ($news) {
            $ip = $request->ip();
            $ua = $request->userAgent();
            $oneMinuteAgo = now()->subMinute();

            $alreadyLogged = NewsViewLog::where('news_id', $news->id)
                ->where('ip_address', $ip)
                ->where('created_at', '>=', $oneMinuteAgo)
                ->exists();

            if (! $alreadyLogged) {
                $news->increment('views_count');

                NewsViewLog::create([
                    'news_id' => $news->id,
                    'ip_address' => $ip,
                    'user_agent' => $ua,
                ]);
            }

            return response()->json([
                'success' => true,
                'news_id' => $news->id,
                'views_count' => (int) $news->views_count,
                'is_new_view' => ! $alreadyLogged,
            ]);
        }

        return response()->json(['success' => false, 'message' => 'News not found'], 404);
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

        $log = SearchLogNews::firstOrCreate(
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
}
