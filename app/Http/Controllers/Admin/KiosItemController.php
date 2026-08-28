<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AgeRating;
use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\KiosItem;
use App\Models\KiosPartner;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KiosItemController extends Controller
{
    public function index(Request $request)
    {
        $query = KiosItem::query()->with('kiosPartner');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('publisher_name', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where(function ($q) use ($request) {
                $q->where('category', $request->category)
                  ->orWhereJsonContains('categories', $request->category)
                  ->orWhere('merch_type', $request->category);
            });
        }

        if ($request->filled('type')) {
            if ($request->type === 'preloved') {
                $query->where('is_preloved', true);
            } elseif ($request->type === 'partner') {
                $query->where('is_preloved', false);
            }
        }

        $kiosItems = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Admin/Kios/Index', [
            'kiosItems' => $kiosItems,
            'filters' => $request->only(['search', 'category', 'type']),
        ]);
    }

    /**
     * Display a listing of kios item view & click timestamp logs.
     */
    public function logs(Request $request)
    {
        $query = \App\Models\KiosViewLog::query()->with('kiosItem:id,title,slug,category,publisher_name,price,is_preloved');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ip_address', 'like', "%{$search}%")
                  ->orWhere('user_agent', 'like', "%{$search}%")
                  ->orWhere('action_type', 'like', "%{$search}%")
                  ->orWhereHas('kiosItem', function ($kq) use ($search) {
                      $kq->where('title', 'like', "%{$search}%")
                         ->orWhere('slug', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('kios_item_id')) {
            $query->where('kios_item_id', $request->kios_item_id);
        }

        if ($request->filled('action_type') && $request->action_type !== 'all') {
            $query->where('action_type', $request->action_type);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $logs = $query->latest('created_at')->paginate(20)->withQueryString();

        $totalLogsCount = \App\Models\KiosViewLog::count();
        $viewsCount = \App\Models\KiosViewLog::where('action_type', 'view')->count();
        $clicksCount = \App\Models\KiosViewLog::where('action_type', 'like', 'click_%')->count();
        $todayLogsCount = \App\Models\KiosViewLog::whereDate('created_at', today())->count();
        $uniqueIpsCount = \App\Models\KiosViewLog::distinct('ip_address')->count('ip_address');

        return Inertia::render('Admin/Kios/Logs', [
            'logs' => $logs,
            'filters' => (object) $request->only(['search', 'kios_item_id', 'action_type', 'start_date', 'end_date']),
            'stats' => [
                'total_views' => $viewsCount,
                'total_clicks' => $clicksCount,
                'today_views' => $todayLogsCount,
                'unique_ips' => $uniqueIpsCount,
            ],
        ]);
    }

    /**
     * Delete a single kios log manually.
     */
    public function destroyLog(\App\Models\KiosViewLog $log)
    {
        $log->delete();
        return redirect()->back()->with('success', 'Log aktivitas kios berhasil dihapus.');
    }

    /**
     * Clear filtered or all kios logs manually.
     */
    public function clearLogs(Request $request)
    {
        $query = \App\Models\KiosViewLog::query();

        if ($request->filled('kios_item_id')) {
            $query->where('kios_item_id', $request->kios_item_id);
        }

        if ($request->filled('action_type') && $request->action_type !== 'all') {
            $query->where('action_type', $request->action_type);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $count = $query->delete();
        return redirect()->back()->with('success', "{$count} data log kios berhasil dibersihkan.");
    }

    /**
     * Export kios view & click logs to CSV compatible with Google Sheets & Excel.
     */
    public function exportLogs(Request $request)
    {
        $query = \App\Models\KiosViewLog::query()->with('kiosItem:id,title,slug,category,publisher_name,price,is_preloved');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ip_address', 'like', "%{$search}%")
                  ->orWhere('user_agent', 'like', "%{$search}%")
                  ->orWhere('action_type', 'like', "%{$search}%")
                  ->orWhereHas('kiosItem', function ($kq) use ($search) {
                      $kq->where('title', 'like', "%{$search}%")
                         ->orWhere('slug', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('kios_item_id')) {
            $query->where('kios_item_id', $request->kios_item_id);
        }

        if ($request->filled('action_type') && $request->action_type !== 'all') {
            $query->where('action_type', $request->action_type);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $logs = $query->latest('created_at')->get();
        $filename = 'kios_activity_logs_' . date('Y-m-d_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($logs) {
            $handle = fopen('php://output', 'w');
            fputs($handle, "\xEF\xBB\xBF"); // UTF-8 BOM

            fputcsv($handle, [
                'ID Log',
                'ID Item Kios',
                'Judul / Nama Produk',
                'Tipe Aktivitas',
                'Kategori',
                'Tipe Produk',
                'Harga (Rp)',
                'Waktu & Tanggal (WIB)',
                'IP Address',
                'Perangkat',
                'Browser',
                'User Agent',
            ]);

            foreach ($logs as $log) {
                $item = $log->kiosItem;
                $ua = $log->user_agent ?? '';
                $isMobile = preg_match('/mobile|android|iphone|ipad|phone/i', $ua);
                
                $browser = 'Other';
                if (stripos($ua, 'edg') !== false) $browser = 'Edge';
                elseif (stripos($ua, 'chrome') !== false || stripos($ua, 'crios') !== false) $browser = 'Chrome';
                elseif (stripos($ua, 'firefox') !== false || stripos($ua, 'fxios') !== false) $browser = 'Firefox';
                elseif (stripos($ua, 'safari') !== false) $browser = 'Safari';
                elseif (stripos($ua, 'opera') !== false || stripos($ua, 'opr') !== false) $browser = 'Opera';

                $device = $isMobile ? 'Mobile' : 'Desktop';
                $timeString = $log->created_at ? $log->created_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') : '-';

                $actionLabel = $log->action_type === 'view' ? 'Lihat Detail Produk' : 'Klik Link ' . ucfirst(str_replace('click_', '', (string) $log->action_type));

                fputcsv($handle, [
                    $log->id,
                    $log->kios_item_id,
                    $item?->title ?? '-',
                    $actionLabel,
                    $item?->category ?? '-',
                    $item ? ($item->is_preloved ? 'Preloved' : 'Partner Merch') : '-',
                    $item?->price ?? '-',
                    $timeString,
                    $log->ip_address ?? '127.0.0.1',
                    $device,
                    $browser,
                    $log->user_agent ?? '-',
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Display a listing of kios search keyword logs.
     */
    public function searchLogs(Request $request)
    {
        $query = \App\Models\SearchLogKios::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('keyword', 'like', "%{$search}%");
        }

        if ($request->filled('start_date')) {
            $query->whereDate('search_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('search_date', '<=', $request->end_date);
        }

        $logs = $query->latest('search_date')->latest('search_count')->paginate(20)->withQueryString();

        $totalSearchesCount = (int) \App\Models\SearchLogKios::sum('search_count');
        $todaySearchesCount = (int) \App\Models\SearchLogKios::whereDate('search_date', today())->sum('search_count');
        $uniqueKeywordsCount = \App\Models\SearchLogKios::distinct('keyword')->count('keyword');

        $topSearches = \App\Models\SearchLogKios::select('keyword', \Illuminate\Support\Facades\DB::raw('SUM(search_count) as total_count'))
            ->groupBy('keyword')
            ->orderByDesc('total_count')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Kios/SearchLogs', [
            'logs' => $logs,
            'filters' => (object) $request->only(['search', 'start_date', 'end_date']),
            'stats' => [
                'total_searches' => $totalSearchesCount,
                'today_searches' => $todaySearchesCount,
                'unique_keywords' => $uniqueKeywordsCount,
            ],
            'topSearches' => $topSearches,
        ]);
    }

    /**
     * Delete a single kios search log record.
     */
    public function destroySearchLog(\App\Models\SearchLogKios $searchLog)
    {
        $searchLog->delete();

        return redirect()->back()->with('success', 'Log kata kunci pencarian kios berhasil dihapus.');
    }

    /**
     * Clear filtered or all kios search logs.
     */
    public function clearSearchLogs(Request $request)
    {
        $query = \App\Models\SearchLogKios::query();

        if ($request->filled('search')) {
            $query->where('keyword', 'like', "%{$request->search}%");
        }

        if ($request->filled('start_date')) {
            $query->whereDate('search_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('search_date', '<=', $request->end_date);
        }

        $count = $query->delete();

        return redirect()->back()->with('success', "{$count} data log kata kunci kios berhasil dibersihkan.");
    }

    /**
     * Export kios search logs to CSV compatible with Google Sheets & Excel.
     */
    public function exportSearchLogs(Request $request)
    {
        $query = \App\Models\SearchLogKios::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('keyword', 'like', "%{$search}%");
        }

        if ($request->filled('start_date')) {
            $query->whereDate('search_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('search_date', '<=', $request->end_date);
        }

        $logs = $query->latest('search_date')->latest('search_count')->get();

        $filename = 'kios_search_keyword_logs_' . date('Y-m-d_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($logs) {
            $handle = fopen('php://output', 'w');
            fputs($handle, "\xEF\xBB\xBF");

            fputcsv($handle, [
                'ID Log',
                'Kata Kunci Kios (Keyword)',
                'Frekuensi Pencarian (Count)',
                'Tanggal Pencarian (YYYY-MM-DD)',
                'Terakhir Dicari (WIB)',
            ]);

            foreach ($logs as $log) {
                $timeString = $log->updated_at ? $log->updated_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') : '-';

                fputcsv($handle, [
                    $log->id,
                    $log->keyword,
                    $log->search_count,
                    $log->search_date ? $log->search_date->format('Y-m-d') : '-',
                    $timeString,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function create()
    {
        $partners = KiosPartner::orderBy('name', 'asc')->get();
        $ageRatings = collect(AgeRating::cases())->map(fn (AgeRating $rating) => [
            'value' => $rating->value,
            'label' => $rating->label(),
        ])->values();

        return Inertia::render('Admin/Kios/Create', [
            'partners' => $partners,
            'ageRatings' => $ageRatings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'merch_type' => 'required|string|max:50',
            'categories' => 'required|array|min:1',
            'categories.*' => 'string|max:50',
            'cover_image' => 'nullable|string',
            'carousel_images' => 'nullable|array',
            'carousel_images.*' => 'nullable|string',
            'carousel_labels' => 'nullable|array',
            'carousel_labels.*' => 'nullable|string',
            'deskripsi_produk' => 'nullable|string',
            'notes' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'condition_rating' => 'nullable|string|max:10',
            'is_preloved' => 'boolean',
            'is_sold_out' => 'boolean',
            'rating' => 'nullable|numeric|min:0|max:5',
            'genres' => 'nullable|array',
            'genres.*' => 'nullable|string',
            'kios_partner_id' => 'nullable|exists:kios_partners,id',
            'publisher_name' => 'nullable|string|max:255',
            'publisher_id' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:255',
            'reading_rating' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:50',
            'demographic' => 'nullable|string|max:50',
            'isbn' => 'nullable|string|max:100',
            'release_date' => 'nullable|string|max:100',
            'cetakan_info' => 'nullable|string',
            'shopee_url' => 'nullable|string',
            'tokopedia_url' => 'nullable|string',
            'gramedia_url' => 'nullable|string',
            'toco_url' => 'nullable|string',
        ]);

        if (isset($validated['categories']) && is_array($validated['categories'])) {
            $validated['categories'] = array_values(array_unique(array_filter($validated['categories'])));
            $validated['category'] = $validated['categories'][0] ?? ($validated['merch_type'] ?? 'manga');
        }

        if (isset($validated['kios_partner_id']) && !empty($validated['kios_partner_id'])) {
            $partner = KiosPartner::find($validated['kios_partner_id']);
            if ($partner) {
                $validated['publisher_name'] = $partner->name;
                $validated['publisher_id'] = $partner->slug;
            }
        }

        if (isset($validated['carousel_images'])) {
            $validated['carousel_images'] = array_values(array_filter($validated['carousel_images']));
        }
        if (isset($validated['carousel_labels'])) {
            $validated['carousel_labels'] = array_values(array_filter($validated['carousel_labels']));
        }
        if (isset($validated['genres'])) {
            $validated['genres'] = array_values(array_filter($validated['genres']));
        }

        KiosItem::create($validated);

        return redirect()->route('admin.kios.index')->with('success', 'Item Kios berhasil ditambahkan!');
    }

    public function edit(KiosItem $kio)
    {
        $partners = KiosPartner::orderBy('name', 'asc')->get();
        $ageRatings = collect(AgeRating::cases())->map(fn (AgeRating $rating) => [
            'value' => $rating->value,
            'label' => $rating->label(),
        ])->values();

        return Inertia::render('Admin/Kios/Edit', [
            'kiosItem' => $kio,
            'partners' => $partners,
            'ageRatings' => $ageRatings,
        ]);
    }

    public function update(Request $request, KiosItem $kio)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'merch_type' => 'required|string|max:50',
            'categories' => 'required|array|min:1',
            'categories.*' => 'string|max:50',
            'cover_image' => 'nullable|string',
            'carousel_images' => 'nullable|array',
            'carousel_images.*' => 'nullable|string',
            'carousel_labels' => 'nullable|array',
            'carousel_labels.*' => 'nullable|string',
            'deskripsi_produk' => 'nullable|string',
            'notes' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'condition_rating' => 'nullable|string|max:10',
            'is_preloved' => 'boolean',
            'is_sold_out' => 'boolean',
            'rating' => 'nullable|numeric|min:0|max:5',
            'genres' => 'nullable|array',
            'genres.*' => 'nullable|string',
            'kios_partner_id' => 'nullable|exists:kios_partners,id',
            'publisher_name' => 'nullable|string|max:255',
            'publisher_id' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:255',
            'reading_rating' => 'nullable|string|max:50',
            'status' => 'nullable|string|max:50',
            'demographic' => 'nullable|string|max:50',
            'isbn' => 'nullable|string|max:100',
            'release_date' => 'nullable|string|max:100',
            'cetakan_info' => 'nullable|string',
            'shopee_url' => 'nullable|string',
            'tokopedia_url' => 'nullable|string',
            'gramedia_url' => 'nullable|string',
            'toco_url' => 'nullable|string',
        ]);

        if (isset($validated['categories']) && is_array($validated['categories'])) {
            $validated['categories'] = array_values(array_unique(array_filter($validated['categories'])));
            $validated['category'] = $validated['categories'][0] ?? ($validated['merch_type'] ?? 'manga');
        }

        if (isset($validated['kios_partner_id']) && !empty($validated['kios_partner_id'])) {
            $partner = KiosPartner::find($validated['kios_partner_id']);
            if ($partner) {
                $validated['publisher_name'] = $partner->name;
                $validated['publisher_id'] = $partner->slug;
            }
        }

        if (isset($validated['carousel_images'])) {
            $validated['carousel_images'] = array_values(array_filter($validated['carousel_images']));
        }
        if (isset($validated['carousel_labels'])) {
            $validated['carousel_labels'] = array_values(array_filter($validated['carousel_labels']));
        }
        if (isset($validated['genres'])) {
            $validated['genres'] = array_values(array_filter($validated['genres']));
        }

        $kio->update($validated);

        return redirect()->route('admin.kios.index')->with('success', 'Item Kios berhasil diperbarui!');
    }

    public function destroy(KiosItem $kio)
    {
        $kio->delete();

        return redirect()->route('admin.kios.index')->with('success', 'Item Kios berhasil dihapus!');
    }
}
