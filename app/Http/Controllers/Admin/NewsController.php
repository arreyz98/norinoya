<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Book;
use App\Models\BookTiktokEmbed;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $query = News::query();

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $sort = $request->input('sort', 'latest');
        if ($sort === 'oldest') {
            $query->oldest();
        } else {
            $query->latest();
        }

        $newsList = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/News/Index', [
            'news' => $newsList,
            'filters' => (object) $request->only(['search', 'category', 'sort']),
        ]);
    }

    /**
     * Display a listing of news view timestamp logs.
     */
    public function logs(Request $request)
    {
        $query = \App\Models\NewsViewLog::query()->with('news:id,title,slug,category,username,display_name');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ip_address', 'like', "%{$search}%")
                  ->orWhere('user_agent', 'like', "%{$search}%")
                  ->orWhereHas('news', function ($nq) use ($search) {
                      $nq->where('title', 'like', "%{$search}%")
                         ->orWhere('slug', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('news_id')) {
            $query->where('news_id', $request->news_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $logs = $query->latest('created_at')->paginate(20)->withQueryString();

        $totalLogsCount = \App\Models\NewsViewLog::count();
        $todayLogsCount = \App\Models\NewsViewLog::whereDate('created_at', today())->count();
        $uniqueIpsCount = \App\Models\NewsViewLog::distinct('ip_address')->count('ip_address');

        return Inertia::render('Admin/News/Logs', [
            'logs' => $logs,
            'filters' => (object) $request->only(['search', 'news_id', 'start_date', 'end_date']),
            'stats' => [
                'total_views' => $totalLogsCount,
                'today_views' => $todayLogsCount,
                'unique_ips' => $uniqueIpsCount,
            ],
        ]);
    }

    /**
     * Delete a single news view log manually.
     */
    public function destroyLog(\App\Models\NewsViewLog $log)
    {
        $log->delete();
        return redirect()->back()->with('success', 'Log kunjungan berita berhasil dihapus.');
    }

    /**
     * Clear filtered or all news logs manually.
     */
    public function clearLogs(Request $request)
    {
        $query = \App\Models\NewsViewLog::query();

        if ($request->filled('news_id')) {
            $query->where('news_id', $request->news_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $count = $query->delete();
        return redirect()->back()->with('success', "{$count} data log berita berhasil dibersihkan.");
    }

    /**
     * Export news view logs to CSV compatible with Google Sheets & Excel.
     */
    public function exportLogs(Request $request)
    {
        $query = \App\Models\NewsViewLog::query()->with('news:id,title,slug,category,username,display_name');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ip_address', 'like', "%{$search}%")
                  ->orWhere('user_agent', 'like', "%{$search}%")
                  ->orWhereHas('news', function ($nq) use ($search) {
                      $nq->where('title', 'like', "%{$search}%")
                         ->orWhere('slug', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('news_id')) {
            $query->where('news_id', $request->news_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $logs = $query->latest('created_at')->get();
        $filename = 'news_view_logs_' . date('Y-m-d_His') . '.csv';

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
                'ID Berita',
                'Judul Berita',
                'Kategori',
                'Penulis / Author',
                'Waktu & Tanggal Dilihat (WIB)',
                'IP Address',
                'Perangkat',
                'Browser',
                'User Agent',
            ]);

            foreach ($logs as $log) {
                $news = $log->news;
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

                fputcsv($handle, [
                    $log->id,
                    $log->news_id,
                    $news?->title ?? '-',
                    $news?->category ?? '-',
                    $news?->display_name ?? $news?->username ?? '-',
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
     * Display a listing of news search keyword logs.
     */
    public function searchLogs(Request $request)
    {
        $query = \App\Models\SearchLogNews::query();

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

        $totalSearchesCount = (int) \App\Models\SearchLogNews::sum('search_count');
        $todaySearchesCount = (int) \App\Models\SearchLogNews::whereDate('search_date', today())->sum('search_count');
        $uniqueKeywordsCount = \App\Models\SearchLogNews::distinct('keyword')->count('keyword');

        $topSearches = \App\Models\SearchLogNews::select('keyword', \Illuminate\Support\Facades\DB::raw('SUM(search_count) as total_count'))
            ->groupBy('keyword')
            ->orderByDesc('total_count')
            ->take(5)
            ->get();

        return Inertia::render('Admin/News/SearchLogs', [
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
     * Delete a single news search log record.
     */
    public function destroySearchLog(\App\Models\SearchLogNews $searchLog)
    {
        $searchLog->delete();

        return redirect()->back()->with('success', 'Log kata kunci pencarian berita berhasil dihapus.');
    }

    /**
     * Clear filtered or all news search logs.
     */
    public function clearSearchLogs(Request $request)
    {
        $query = \App\Models\SearchLogNews::query();

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

        return redirect()->back()->with('success', "{$count} data log kata kunci berita berhasil dibersihkan.");
    }

    /**
     * Export news search logs to CSV compatible with Google Sheets & Excel.
     */
    public function exportSearchLogs(Request $request)
    {
        $query = \App\Models\SearchLogNews::query();

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

        $filename = 'news_search_keyword_logs_' . date('Y-m-d_His') . '.csv';

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
                'Kata Kunci Berita (Keyword)',
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
        $books = Book::select('id', 'title', 'slug', 'volume', 'edition_id', 'publisher_id', 'msrp', 'book_type', 'age_rating')
            ->with([
                'images',
                'publisher:id,name',
                'edition:id,name',
            ])
            ->orderBy('title')
            ->get();

        $tiktokEmbeds = BookTiktokEmbed::select('id', 'book_id', 'name', 'url_video', 'sort_order')
            ->orderBy('book_id')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Admin/News/Create', [
            'books' => $books,
            'tiktokEmbeds' => $tiktokEmbeds,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'required|string',
            'username' => 'nullable|string|max:100',
            'display_name' => 'nullable|string|max:100',
            'attached_image' => 'nullable|string',
            'gallery_images' => 'nullable|array|max:4',
            'gallery_images.*' => 'nullable|string',
            'reading_rating' => 'nullable|string',
            'is_pinned' => 'boolean',
            'hash_tags' => 'nullable|array',
            'hash_tags.*' => 'nullable|string',
            'poll_question' => 'nullable|string|max:255',
            'poll_options' => 'nullable|array',
            'reactions' => 'nullable|array',
            'recommendations' => 'nullable|array',
            'recommendations.*.number' => 'nullable',
            'recommendations.*.title' => 'nullable|string|max:255',
            'recommendations.*.description' => 'nullable|string',
            'recommendations.*.book_id' => 'nullable',
            'recommendations.*.tiktok_embed_id' => 'nullable',
            'relevant_books' => 'nullable|array',
            'relevant_books.*' => 'nullable',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);
        $validated['username'] = $validated['username'] ?? 'norinoya_official';
        $validated['display_name'] = $validated['display_name'] ?? 'Norinoya Official';

        // Clean & filter gallery_images (max 4 non-empty URLs)
        if (!empty($validated['gallery_images'])) {
            $validated['gallery_images'] = array_values(array_filter($validated['gallery_images'], function ($img) {
                return !empty(trim($img));
            }));
            $validated['gallery_images'] = array_slice($validated['gallery_images'], 0, 4);
        }

        // Clean hash_tags (remove # if typed by admin)
        if (!empty($validated['hash_tags'])) {
            $cleanedTags = [];
            foreach ($validated['hash_tags'] as $tag) {
                $tagStr = trim((string) $tag);
                if (!empty($tagStr)) {
                    $cleanedTags[] = ltrim($tagStr, '#');
                }
            }
            $validated['hash_tags'] = array_values(array_unique($cleanedTags));
        }

        // Set default high-engagement initial reaction counters if not specified or empty
        if (empty($validated['reactions'])) {
            $validated['reactions'] = [
                ['id' => 'fire', 'emoji' => '🔥', 'label' => 'Hype!', 'count' => rand(40, 150)],
                ['id' => 'heart', 'emoji' => '😍', 'label' => 'Mau Banget', 'count' => rand(35, 120)],
                ['id' => 'mind_blown', 'emoji' => '🤯', 'label' => 'Baru Tahu', 'count' => rand(25, 95)],
                ['id' => 'thumbs_up', 'emoji' => '👍', 'label' => 'Sangat Setuju', 'count' => rand(30, 110)],
            ];
        }

        // Clean poll_options structure if question is present
        if (!empty($validated['poll_question']) && !empty($validated['poll_options'])) {
            $cleanedOptions = [];
            foreach ($validated['poll_options'] as $idx => $opt) {
                if (is_array($opt) && !empty($opt['label'])) {
                    $cleanedOptions[] = [
                        'id' => 'opt-' . ($idx + 1),
                        'label' => trim($opt['label']),
                        'votes' => (int) ($opt['votes'] ?? rand(30, 180)),
                    ];
                }
            }
            $validated['poll_options'] = $cleanedOptions;
        } else {
            $validated['poll_question'] = null;
            $validated['poll_options'] = null;
        }

        // Clean recommendations
        if (!empty($validated['recommendations'])) {
            $cleanedRecs = [];
            foreach ($validated['recommendations'] as $idx => $rec) {
                if (is_array($rec) && (!empty($rec['title']) || !empty($rec['book_id']))) {
                    $cleanedRecs[] = [
                        'number' => !empty($rec['number']) ? (int)$rec['number'] : ($idx + 1),
                        'title' => trim($rec['title'] ?? ''),
                        'description' => trim($rec['description'] ?? ''),
                        'book_id' => !empty($rec['book_id']) ? (int)$rec['book_id'] : null,
                        'tiktok_embed_id' => !empty($rec['tiktok_embed_id']) ? (int)$rec['tiktok_embed_id'] : null,
                    ];
                }
            }
            $validated['recommendations'] = !empty($cleanedRecs) ? $cleanedRecs : null;
        } else {
            $validated['recommendations'] = null;
        }

        // Clean relevant_books (array of book_ids)
        if (!empty($validated['relevant_books'])) {
            $cleanedBookIds = [];
            foreach ($validated['relevant_books'] as $bookId) {
                if (!empty($bookId)) {
                    $cleanedBookIds[] = (int) $bookId;
                }
            }
            $validated['relevant_books'] = !empty($cleanedBookIds) ? array_values(array_unique($cleanedBookIds)) : null;
        } else {
            $validated['relevant_books'] = null;
        }

        News::create($validated);

        return redirect()->route('admin.news.index')->with('success', 'Berita & Poling berhasil dipublikasikan!');
    }

    public function edit(News $news)
    {
        $books = Book::with([
            'images',
            'publisher',
            'edition',
            'tiktokEmbeds' => function ($query) {
                $query->orderBy('sort_order', 'asc');
            }
        ])->orderBy('title', 'asc')->get();

        $tiktokEmbeds = BookTiktokEmbed::orderBy('name', 'asc')->get();

        return Inertia::render('Admin/News/Edit', [
            'newsItem' => $news,
            'books' => $books,
            'tiktokEmbeds' => $tiktokEmbeds,
        ]);
    }

    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:rilisan,cetakan_ulang,promo,edukasi,event,komunitas,anime,game,jepang,manga,light_novel,novel',
            'username' => 'nullable|string|max:255',
            'display_name' => 'nullable|string|max:255',
            'content' => 'required|string',
            'attached_image' => 'nullable|string',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'nullable|string',
            'reading_rating' => 'nullable|string|in:Anak & Bimbingan Orang Tua,Remaja,Dewasa Ringan,Dewasa Berat',
            'is_pinned' => 'boolean',
            'hash_tags' => 'nullable|array',
            'hash_tags.*' => 'nullable|string',
            'poll_question' => 'nullable|string|max:255',
            'poll_options' => 'nullable|array',
            'reactions' => 'nullable|array',
            'recommendations' => 'nullable|array',
            'recommendations.*.number' => 'nullable',
            'recommendations.*.title' => 'nullable|string|max:255',
            'recommendations.*.description' => 'nullable|string',
            'recommendations.*.book_id' => 'nullable',
            'recommendations.*.tiktok_embed_id' => 'nullable',
            'relevant_books' => 'nullable|array',
            'relevant_books.*' => 'nullable',
        ]);

        if ($news->title !== $validated['title']) {
            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);
        }

        // Clean & filter gallery_images (max 4 non-empty URLs)
        if (!empty($validated['gallery_images'])) {
            $validated['gallery_images'] = array_values(array_filter($validated['gallery_images'], function ($img) {
                return !empty(trim($img));
            }));
            $validated['gallery_images'] = array_slice($validated['gallery_images'], 0, 4);
        }

        // Clean hash_tags
        if (!empty($validated['hash_tags'])) {
            $cleanedTags = [];
            foreach ($validated['hash_tags'] as $tag) {
                $tagStr = trim((string) $tag);
                if (!empty($tagStr)) {
                    $cleanedTags[] = ltrim($tagStr, '#');
                }
            }
            $validated['hash_tags'] = array_values(array_unique($cleanedTags));
        }

        // Clean poll_options structure if question is present
        if (!empty($validated['poll_question']) && !empty($validated['poll_options'])) {
            $cleanedOptions = [];
            foreach ($validated['poll_options'] as $idx => $opt) {
                if (is_array($opt) && !empty($opt['label'])) {
                    $cleanedOptions[] = [
                        'id' => 'opt-' . ($idx + 1),
                        'label' => trim($opt['label']),
                        'votes' => (int) ($opt['votes'] ?? rand(30, 180)),
                    ];
                }
            }
            $validated['poll_options'] = $cleanedOptions;
        } else {
            $validated['poll_question'] = null;
            $validated['poll_options'] = null;
        }

        // Clean recommendations
        if (!empty($validated['recommendations'])) {
            $cleanedRecs = [];
            foreach ($validated['recommendations'] as $idx => $rec) {
                if (is_array($rec) && (!empty($rec['title']) || !empty($rec['book_id']))) {
                    $cleanedRecs[] = [
                        'number' => !empty($rec['number']) ? (int)$rec['number'] : ($idx + 1),
                        'title' => trim($rec['title'] ?? ''),
                        'description' => trim($rec['description'] ?? ''),
                        'book_id' => !empty($rec['book_id']) ? (int)$rec['book_id'] : null,
                        'tiktok_embed_id' => !empty($rec['tiktok_embed_id']) ? (int)$rec['tiktok_embed_id'] : null,
                    ];
                }
            }
            $validated['recommendations'] = !empty($cleanedRecs) ? $cleanedRecs : null;
        } else {
            $validated['recommendations'] = null;
        }

        // Clean relevant_books (array of book_ids)
        if (!empty($validated['relevant_books'])) {
            $cleanedBookIds = [];
            foreach ($validated['relevant_books'] as $bookId) {
                if (!empty($bookId)) {
                    $cleanedBookIds[] = (int) $bookId;
                }
            }
            $validated['relevant_books'] = !empty($cleanedBookIds) ? array_values(array_unique($cleanedBookIds)) : null;
        } else {
            $validated['relevant_books'] = null;
        }

        $news->update($validated);

        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil diperbarui!');
    }

    public function destroy(News $news)
    {
        $news->delete();

        return redirect()->route('admin.news.index')->with('success', 'Berita berhasil dihapus!');
    }
}
