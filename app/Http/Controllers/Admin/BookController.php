<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AgeRating;
use App\Enums\BookType;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\AffiliateLink;
use App\Models\AffiliateStore;
use App\Models\Author;
use App\Models\Book;
use App\Models\BookSeries;
use App\Models\BookViewLog;
use App\Models\Edition;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\SearchLogBuku;
use App\Models\StoryStatus;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Display a listing of books.
     */
    public function index(Request $request): Response
    {
        $query = Book::query()
            ->with([
                'series:id,title',
                'edition:id,name',
                'storyStatus:id,name',
                'publisher:id,name',
                'images:id,book_id,image_url,sort_order',
            ])
            ->withCount([
                'genres',
                'affiliateLinks',
            ]);

        $search = trim((string) $request->input('search', ''));

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $booleanTerm = $this->fullTextBooleanTerm($search);

                if ($this->fullTextIndexAvailable() && mb_strlen($search) >= 3 && $booleanTerm !== '') {
                    $q->whereFullText(
                        ['title', 'synopsis', 'short_description'],
                        $booleanTerm,
                        ['mode' => 'boolean']
                    );
                } else {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('synopsis', 'like', "%{$search}%");
                }

                $q->orWhereHas('series', function ($sq) use ($search) {
                    $sq->where('title', 'like', "%{$search}%");
                })->orWhereHas('publisher', function ($pq) use ($search) {
                    $pq->where('name', 'like', "%{$search}%");
                });
            });
        }

        if ($request->filled('series_id') && $request->series_id !== 'all') {
            $query->where('series_id', $request->series_id);
        }

        if ($request->filled('publisher_id') && $request->publisher_id !== 'all') {
            $query->where('publisher_id', $request->publisher_id);
        }

        $sort = (string) $request->input('sort', 'latest');

        match ($sort) {
            'oldest' => $query->oldest()->orderBy('id'),
            'title_asc' => $query->orderBy('title')->orderBy('id'),
            'title_desc' => $query->orderByDesc('title')->orderByDesc('id'),
            'views_asc' => $query->orderBy('views_count')->orderBy('id'),
            'views_desc' => $query->orderByDesc('views_count')->orderByDesc('id'),
            default => $query->latest()->orderByDesc('id'),
        };

        $perPage = (int) $request->input('per_page', 15);

        if (! in_array($perPage, [10, 15, 25, 50, 100], true)) {
            $perPage = 15;
        }

        $books = $query->paginate($perPage)->withQueryString();

        $selectedSeries = null;

        if ($request->filled('series_id') && $request->series_id !== 'all') {
            $selectedSeries = BookSeries::whereKey($request->series_id)->first(['id', 'title']);
        }

        $selectedPublisher = null;

        if ($request->filled('publisher_id') && $request->publisher_id !== 'all') {
            $selectedPublisher = Publisher::whereKey($request->publisher_id)->first(['id', 'name']);
        }

        return Inertia::render(
            'Admin/Books/Index',
            [
                'books' => $books,
                'selectedSeries' => $selectedSeries,
                'selectedPublisher' => $selectedPublisher,
                'filters' => (object) $request->only(['search', 'series_id', 'publisher_id', 'sort', 'per_page']),
            ]
        );
    }

    /**
     * Return filter options for the async series/publisher comboboxes.
     */
    public function filterOptions(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'in:series,publisher'],
            'q' => ['nullable', 'string', 'max:100'],
        ]);

        $term = trim((string) ($validated['q'] ?? ''));

        if ($validated['type'] === 'series') {
            $options = BookSeries::query()
                ->when($term !== '', function ($q) use ($term) {
                    $q->where('title', 'like', "%{$term}%");
                })
                ->orderBy('title')
                ->limit(25)
                ->get(['id', 'title'])
                ->map(fn (BookSeries $series) => [
                    'value' => (string) $series->id,
                    'label' => $series->title,
                ]);
        } else {
            $options = Publisher::query()
                ->when($term !== '', function ($q) use ($term) {
                    $q->where('name', 'like', "%{$term}%");
                })
                ->orderBy('name')
                ->limit(25)
                ->get(['id', 'name'])
                ->map(fn (Publisher $publisher) => [
                    'value' => (string) $publisher->id,
                    'label' => $publisher->name,
                ]);
        }

        return response()->json(['data' => $options->values()]);
    }

    /**
     * Remove the given books in a single request.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ids' => ['required', 'array', 'min:1', 'max:100'],
            'ids.*' => ['integer', 'distinct', 'exists:books,id'],
        ]);

        $books = Book::whereIn('id', $validated['ids'])->get();

        DB::transaction(function () use ($books) {
            foreach ($books as $book) {
                $book->forceDelete();
            }
        });

        $this->forgetBookCaches();

        return redirect()
            ->back(fallback: route('admin.books.index'))
            ->with('success', $books->count().' buku berhasil dihapus.');
    }

    private function fullTextIndexAvailable(): bool
    {
        if (! in_array(DB::connection()->getDriverName(), ['mysql', 'mariadb'], true)) {
            return false;
        }

        return Cache::remember(
            'books_fulltext_index',
            now()->addHour(),
            fn () => Schema::hasIndex('books', 'books_search_fulltext')
        );
    }

    private function fullTextBooleanTerm(string $search): string
    {
        $terms = preg_split('/\s+/u', $search, -1, PREG_SPLIT_NO_EMPTY) ?: [];

        $terms = array_map(function ($term) {
            $cleaned = preg_replace('/[+\-><()~*"@\\\\]+/u', ' ', $term);

            return trim(is_string($cleaned) ? $cleaned : '');
        }, $terms);

        $terms = array_values(array_filter($terms, fn ($term) => mb_strlen($term) >= 3));

        if ($terms === []) {
            return '';
        }

        return implode(' ', array_map(fn ($term) => $term.'*', $terms));
    }

    /**
     * Display a listing of book view timestamp logs.
     */
    public function logs(Request $request): Response
    {
        $query = BookViewLog::query()
            ->with([
                'book:id,title,slug,volume,series_id,publisher_id',
                'book.series:id,title',
                'book.publisher:id,name',
            ]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ip_address', 'like', "%{$search}%")
                    ->orWhere('user_agent', 'like', "%{$search}%")
                    ->orWhereHas('book', function ($bq) use ($search) {
                        $bq->where('title', 'like', "%{$search}%")
                            ->orWhere('slug', 'like', "%{$search}%")
                            ->orWhereHas('series', function ($sq) use ($search) {
                                $sq->where('title', 'like', "%{$search}%");
                            });
                    });
            });
        }

        if ($request->filled('book_id')) {
            $query->where('book_id', $request->book_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $logs = $query->latest('created_at')->paginate(20)->withQueryString();

        // Overall log stats
        $totalLogsCount = BookViewLog::count();
        $todayLogsCount = BookViewLog::whereDate('created_at', today())->count();
        $uniqueIpsCount = BookViewLog::distinct('ip_address')->count('ip_address');

        // Top 5 most viewed books recently
        $topBooks = Book::orderByDesc('views_count')
            ->take(5)
            ->get(['id', 'title', 'volume', 'views_count', 'series_id']);

        return Inertia::render('Admin/Books/Logs', [
            'logs' => $logs,
            'filters' => (object) $request->only(['search', 'book_id', 'start_date', 'end_date']),
            'stats' => [
                'total_views' => $totalLogsCount,
                'today_views' => $todayLogsCount,
                'unique_ips' => $uniqueIpsCount,
            ],
            'topBooks' => $topBooks,
        ]);
    }

    /**
     * Delete a single book view log manually.
     */
    public function destroyLog(BookViewLog $log): RedirectResponse
    {
        $log->delete();

        return redirect()->back()->with('success', 'Log kunjungan berhasil dihapus.');
    }

    /**
     * Clear filtered or all logs manually.
     */
    public function clearLogs(Request $request): RedirectResponse
    {
        $query = BookViewLog::query();

        if ($request->filled('book_id')) {
            $query->where('book_id', $request->book_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $count = $query->delete();

        return redirect()->back()->with('success', "{$count} data log berhasil dibersihkan.");
    }

    /**
     * Export book view logs to CSV compatible with Google Sheets & Excel.
     */
    public function exportLogs(Request $request)
    {
        $query = BookViewLog::query()
            ->with([
                'book:id,title,slug,volume,series_id,publisher_id',
                'book.series:id,title',
                'book.publisher:id,name',
            ]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('ip_address', 'like', "%{$search}%")
                    ->orWhere('user_agent', 'like', "%{$search}%")
                    ->orWhereHas('book', function ($bq) use ($search) {
                        $bq->where('title', 'like', "%{$search}%")
                            ->orWhere('slug', 'like', "%{$search}%")
                            ->orWhereHas('series', function ($sq) use ($search) {
                                $sq->where('title', 'like', "%{$search}%");
                            });
                    });
            });
        }

        if ($request->filled('book_id')) {
            $query->where('book_id', $request->book_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $logs = $query->latest('created_at')->get();

        $filename = 'book_view_logs_'.date('Y-m-d_His').'.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($logs) {
            $handle = fopen('php://output', 'w');
            // Add UTF-8 BOM for proper Excel / Google Sheets character handling
            fwrite($handle, "\xEF\xBB\xBF");

            // CSV Header Row
            fputcsv($handle, [
                'ID Log',
                'ID Buku',
                'Judul Buku',
                'Series / Seri',
                'Volume',
                'Penerbit',
                'Waktu & Tanggal Dilihat (WIB)',
                'IP Address',
                'Perangkat',
                'Browser',
                'User Agent',
            ]);

            foreach ($logs as $log) {
                $book = $log->book;
                $ua = $log->user_agent ?? '';
                $isMobile = preg_match('/mobile|android|iphone|ipad|phone/i', $ua);

                $browser = 'Other';
                if (stripos($ua, 'edg') !== false) {
                    $browser = 'Edge';
                } elseif (stripos($ua, 'chrome') !== false || stripos($ua, 'crios') !== false) {
                    $browser = 'Chrome';
                } elseif (stripos($ua, 'firefox') !== false || stripos($ua, 'fxios') !== false) {
                    $browser = 'Firefox';
                } elseif (stripos($ua, 'safari') !== false) {
                    $browser = 'Safari';
                } elseif (stripos($ua, 'opera') !== false || stripos($ua, 'opr') !== false) {
                    $browser = 'Opera';
                }

                $device = $isMobile ? 'Mobile' : 'Desktop';
                $timeString = $log->created_at ? $log->created_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') : '-';

                fputcsv($handle, [
                    $log->id,
                    $log->book_id,
                    $book?->title ?? '-',
                    $book?->series?->title ?? '-',
                    $book?->volume ?? '-',
                    $book?->publisher?->name ?? '-',
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
     * Display a listing of book search keyword logs.
     */
    public function searchLogs(Request $request): Response
    {
        $query = SearchLogBuku::query();

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

        // Overall stats
        $totalSearchesCount = (int) SearchLogBuku::sum('search_count');
        $todaySearchesCount = (int) SearchLogBuku::whereDate('search_date', today())->sum('search_count');
        $uniqueKeywordsCount = SearchLogBuku::distinct('keyword')->count('keyword');

        // Top 5 most searched keywords
        $topSearches = SearchLogBuku::select('keyword', DB::raw('SUM(search_count) as total_count'))
            ->groupBy('keyword')
            ->orderByDesc('total_count')
            ->take(5)
            ->get();

        return Inertia::render('Admin/Books/SearchLogs', [
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
     * Delete a single search log record.
     */
    public function destroySearchLog(SearchLogBuku $searchLog): RedirectResponse
    {
        $searchLog->delete();

        return redirect()->back()->with('success', 'Log kata kunci pencarian berhasil dihapus.');
    }

    /**
     * Clear filtered or all search logs.
     */
    public function clearSearchLogs(Request $request): RedirectResponse
    {
        $query = SearchLogBuku::query();

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

        return redirect()->back()->with('success', "{$count} data log kata kunci berhasil dibersihkan.");
    }

    /**
     * Export book search logs to CSV compatible with Google Sheets & Excel.
     */
    public function exportSearchLogs(Request $request)
    {
        $query = SearchLogBuku::query();

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

        $filename = 'search_keyword_logs_'.date('Y-m-d_His').'.csv';

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($logs) {
            $handle = fopen('php://output', 'w');
            // Add UTF-8 BOM for proper Excel / Google Sheets character handling
            fwrite($handle, "\xEF\xBB\xBF");

            // CSV Header Row
            fputcsv($handle, [
                'ID Log',
                'Kata Kunci (Keyword)',
                'Frekuensi Pencarian (Count)',
                'Tanggal Pencarian (YYYY-MM-DD)',
                'Terakhir Dicari (WIB)',
            ]);

            foreach ($logs as $log) {
                $timeString = $log->updated_at ? $log->updated_at->setTimezone('Asia/Jakarta')->format('Y-m-d H:i:s') : '-';
                $searchDateString = $log->search_date ? Carbon::parse($log->search_date)->format('Y-m-d') : '-';

                fputcsv($handle, [
                    $log->id,
                    $log->keyword,
                    $log->search_count,
                    $searchDateString,
                    $timeString,
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Show the form for creating a new book.
     */
    public function create()
    {
        return Inertia::render('Admin/Books/Create', array_merge($this->formOptions(), [
            'existingSlugs' => $this->existingSlugs(),
            'volumesBySeries' => $this->volumesBySeries(),
        ]));
    }

    /**
     * Show the form for editing the specified book.
     */
    public function edit(Book $book)
    {
        $book->load([
            'series:id,title',
            'edition:id,name',
            'storyStatus:id,name',
            'publisher:id,name',
            'images:id,book_id,image_url,sort_order',
            'authors:id,name',
            'genres:id,name',
            'tiktokEmbeds:id,book_id,name,url_video,sort_order',
            'affiliateLinks:id,book_id,affiliate_store_id,store_name,location,url',
        ]);

        return Inertia::render('Admin/Books/Edit', array_merge($this->formOptions(), [
            'book' => [
                'id' => $book->id,
                'title' => $book->title,
                'slug' => $book->slug,
                'series_id' => $book->series_id,
                'volume' => $book->volume,
                'edition_id' => $book->edition_id,
                'book_type' => $book->book_type?->value ?? $book->book_type,
                'story_status_id' => $book->story_status_id,
                'age_rating' => $book->age_rating?->value ?? $book->age_rating,
                'publisher_id' => $book->publisher_id,
                'synopsis' => $book->synopsis,
                'short_description' => $book->short_description,
                'news_link' => $book->news_link,
                'msrp' => $book->msrp,
                'isbn' => $book->isbn,
                'page_count' => $book->page_count,
                'paper_type' => $book->paper_type,
                'dimensions' => $book->dimensions,
                'adaptation' => $book->adaptation,
                'is_upcoming' => (bool) $book->is_upcoming,

                'images' => $book->images
                    ->sortBy('sort_order')
                    ->values(),

                'story_authors' => $book->authors
                    ->filter(fn ($author) => $author->pivot->role === 'story')
                    ->pluck('id')
                    ->values(),

                'art_authors' => $book->authors
                    ->filter(fn ($author) => $author->pivot->role === 'art')
                    ->pluck('id')
                    ->values(),

                'genres' => $book->genres
                    ->pluck('id')
                    ->values(),

                'tiktok_embeds' => $book->tiktokEmbeds
                    ->sortBy('sort_order')
                    ->map(fn ($item) => [
                        'id' => $item->id,
                        'name' => $item->name,
                        'url_video' => $item->url_video,
                        'embed_url' => $item->url_video,
                        'sort_order' => $item->sort_order,
                    ])
                    ->values(),

                'affiliate_links' => $book->affiliateLinks
                    ->map(fn ($link) => [
                        'id' => $link->id,
                        'affiliate_store_id' => $link->affiliate_store_id,
                        'store_name' => $link->store_name ?: AffiliateLink::DEFAULT_STORE_NAME,
                        'location' => $link->location ?: AffiliateLink::DEFAULT_LOCATION,
                        'url' => $link->url,
                    ])
                    ->values(),
            ],
            'existingSlugs' => $this->existingSlugs($book->id),
            'volumesBySeries' => $this->volumesBySeries($book->id),
        ]));
    }

    /**
     * Show the form for duplicating the specified book.
     *
     * The book is loaded with all relations (same as edit), then the
     * Create page is rendered with pre-filled data. The volume is
     * auto-adjusted to avoid uniqueness conflicts within the same series.
     */
    public function duplicate(Book $book)
    {
        $book->load([
            'series:id,title',
            'edition:id,name',
            'storyStatus:id,name',
            'publisher:id,name',
            'images:id,book_id,image_url,sort_order',
            'authors:id,name',
            'genres:id,name',
            'tiktokEmbeds:id,book_id,name,url_video,sort_order',
            'affiliateLinks:id,book_id,affiliate_store_id,store_name,location,url',
        ]);

        $existingVolumesQuery = Book::query();

        if ($book->series_id) {
            $existingVolumesQuery->where('series_id', $book->series_id);
        } else {
            $existingVolumesQuery->whereNull('series_id');
        }

        $existingVolumes = $existingVolumesQuery
            ->pluck('volume')
            ->filter()
            ->map(fn ($v) => (string) $v)
            ->values()
            ->toArray();

        $originalVolume = (string) $book->volume;
        $duplicatedVolume = $originalVolume;

        if ($originalVolume !== '') {
            $suffix = 2;
            while (in_array($duplicatedVolume, $existingVolumes, true)) {
                $duplicatedVolume = $originalVolume.' '.$suffix;
                $suffix++;
            }
        }

        return Inertia::render('Admin/Books/Create', array_merge($this->formOptions(), [
            'book' => [
                'id' => $book->id,
                'title' => $book->title,
                'slug' => $book->slug,
                'series_id' => $book->series_id,
                'volume' => $duplicatedVolume,
                'edition_id' => $book->edition_id,
                'book_type' => $book->book_type?->value ?? $book->book_type,
                'story_status_id' => $book->story_status_id,
                'age_rating' => $book->age_rating?->value ?? $book->age_rating,
                'publisher_id' => $book->publisher_id,
                'synopsis' => $book->synopsis,
                'short_description' => $book->short_description,
                'news_link' => $book->news_link,
                'msrp' => $book->msrp,
                'isbn' => $book->isbn,
                'page_count' => $book->page_count,
                'paper_type' => $book->paper_type,
                'dimensions' => $book->dimensions,
                'adaptation' => $book->adaptation,
                'is_upcoming' => (bool) $book->is_upcoming,

                'images' => $book->images
                    ->sortBy('sort_order')
                    ->values(),

                'story_authors' => $book->authors
                    ->filter(fn ($author) => $author->pivot->role === 'story')
                    ->pluck('id')
                    ->values(),

                'art_authors' => $book->authors
                    ->filter(fn ($author) => $author->pivot->role === 'art')
                    ->pluck('id')
                    ->values(),

                'genres' => $book->genres
                    ->pluck('id')
                    ->values(),

                'tiktok_embeds' => $book->tiktokEmbeds
                    ->sortBy('sort_order')
                    ->map(fn ($item) => [
                        'id' => $item->id,
                        'name' => $item->name,
                        'url_video' => $item->url_video,
                        'embed_url' => $item->url_video,
                        'sort_order' => $item->sort_order,
                    ])
                    ->values(),

                'affiliate_links' => $book->affiliateLinks
                    ->map(fn ($link) => [
                        'id' => $link->id,
                        'affiliate_store_id' => $link->affiliate_store_id,
                        'store_name' => $link->store_name ?: AffiliateLink::DEFAULT_STORE_NAME,
                        'location' => $link->location ?: AffiliateLink::DEFAULT_LOCATION,
                        'url' => $link->url,
                    ])
                    ->values(),
            ],
            'duplicatedVolume' => $duplicatedVolume,
            'existingSlugs' => $this->existingSlugs(),
            'volumesBySeries' => $this->volumesBySeries(),
        ]));
    }

    public function store(StoreBookRequest $request)
    {

        $book = DB::transaction(function () use ($request) {
            $data = $request->validated();
            $slug = $this->generateUniqueSlug(
                $data['title'],
                $data['volume']
            );

            $sortOrder = 0;
            if ($data['series_id']) {
                $maxSortOrder = Book::where('series_id', $data['series_id'])->max('sort_order');
                $sortOrder = ($maxSortOrder ?? -1) + 1;
            }

            $book = Book::create([
                'title' => $data['title'],
                'slug' => $slug,
                'series_id' => $data['series_id'] ?? null,
                'volume' => $data['volume'],
                'sort_order' => $sortOrder,
                'edition_id' => $data['edition_id'],
                'book_type' => $data['book_type'],
                'story_status_id' => $data['story_status_id'],
                'age_rating' => $data['age_rating'],
                'publisher_id' => $data['publisher_id'],

                'synopsis' => $data['synopsis'],
                'short_description' => $data['short_description'] ?? null,
                'news_link' => $data['news_link'] ?? null,
                'msrp' => $data['msrp'],
                'isbn' => $data['isbn'] ?? null,
                'page_count' => $data['page_count'] ?? null,
                'paper_type' => $data['paper_type'] ?? null,
                'dimensions' => $data['dimensions'] ?? null,
                'adaptation' => $data['adaptation'] ?? null,
                'is_upcoming' => ! empty($data['is_upcoming']),
            ]
            );

            foreach (
                $data['tiktok_embeds'] ?? [] as $index => $embed
            ) {
                $book->tiktokEmbeds()->create([
                    'name' => $embed['name'] ?? '',
                    'url_video' => $embed['url_video'] ?? $embed['embed_url'] ?? '',
                    'sort_order' => $index + 1,
                ]);
            }

            /*
             * Images
             */
            foreach (
                $data['images'] ?? [] as $index => $image
            ) {
                $book->images()->create([
                    'image_url' => $image['image_url'],
                    'sort_order' => $index + 1,
                ]);
            }

            /*
             * Authors
             */
            $this->syncAuthors($book, $data);

            /*
             * Genres
             */
            $book->genres()->sync(
                $data['genres'] ?? []
            );

            /*
             * Affiliate Links
             */
            foreach (
                $data['affiliate_links'] ?? [] as $affiliate
            ) {
                $book->affiliateLinks()->create([
                    'affiliate_store_id' => $affiliate[
                            'affiliate_store_id'
                        ],
                    'store_name' => $this->affiliateStoreName($affiliate),
                    'location' => $this->affiliateLocation($affiliate),
                    'url' => $affiliate['url'],
                ]);
            }

            return $book;
        });

        $this->forgetBookCaches();

        return redirect()
            ->route('admin.books.index')
            ->with(
                'success',
                'Buku berhasil ditambahkan.'
            );
    }

    /**
     * Update the specified book.
     */
    public function update(
        UpdateBookRequest $request,
        Book $book
    ) {
        $data = $request->validated();

        DB::transaction(function () use (
            $data,
            $book
        ) {
            // Judul atau volume berubah -> slug ikut diperbarui agar URL postingan
            // selalu mengikuti judul terbaru, bukan slug lama.
            $slug = $book->slug;

            if (
                (string) $data['title'] !== (string) $book->title
                || (string) $data['volume'] !== (string) $book->volume
            ) {
                $slug = $this->generateUniqueSlug(
                    $data['title'],
                    (string) $data['volume'],
                    $book->id
                );
            }

            $book->update([
                'title' => $data['title'],
                'slug' => $slug,
                'series_id' => $data['series_id'] ?? null,
                'volume' => $data['volume'],
                'edition_id' => $data['edition_id'],
                'book_type' => $data['book_type'],
                'story_status_id' => $data['story_status_id'],
                'age_rating' => $data['age_rating'],
                'publisher_id' => $data['publisher_id'],
                'synopsis' => $data['synopsis'],
                'short_description' => $data['short_description'] ?? null,
                'news_link' => $data['news_link'] ?? null,
                'msrp' => $data['msrp'],
                'isbn' => $data['isbn'] ?? null,
                'page_count' => $data['page_count'] ?? null,
                'paper_type' => $data['paper_type'] ?? null,
                'dimensions' => $data['dimensions'] ?? null,
                'adaptation' => $data['adaptation'] ?? null,
                'is_upcoming' => ! empty($data['is_upcoming']),
            ]);

            /*
             * Authors
             */
            $this->syncAuthors($book, $data);

            /*
             * Genres
             */
            $book->genres()->sync(
                $data['genres'] ?? []
            );

            /*
             * Images
             */
            $submittedImageIds = collect(
                $data['images'] ?? []
            )
                ->pluck('id')
                ->filter()
                ->values();

            $book->images()
                ->whereNotIn(
                    'id',
                    $submittedImageIds
                )
                ->delete();

            foreach (
                $data['images'] ?? [] as $index => $image
            ) {
                if (! empty($image['id'])) {
                    $book->images()
                        ->where('id', $image['id'])
                        ->update([
                            'image_url' => $image['image_url'],
                            'sort_order' => $index + 1,
                        ]);
                } else {
                    $book->images()->create([
                        'image_url' => $image['image_url'],
                        'sort_order' => $index + 1,
                    ]);
                }
            }

            /*
             * TikTok Embeds
             */
            $submittedTikTokIds = collect(
                $data['tiktok_embeds'] ?? []
            )
                ->pluck('id')
                ->filter()
                ->values();

            $book->tiktokEmbeds()
                ->whereNotIn(
                    'id',
                    $submittedTikTokIds
                )
                ->delete();

            foreach (
                $data['tiktok_embeds'] ?? [] as $index => $embed
            ) {
                if (! empty($embed['id'])) {
                    $book->tiktokEmbeds()
                        ->where('id', $embed['id'])
                        ->update([
                            'name' => $embed['name'] ?? '',
                            'url_video' => $embed['url_video'] ?? $embed['embed_url'] ?? '',
                            'sort_order' => $index + 1,
                        ]);
                } else {
                    $book->tiktokEmbeds()->create([
                        'name' => $embed['name'] ?? '',
                        'url_video' => $embed['url_video'] ?? $embed['embed_url'] ?? '',
                        'sort_order' => $index + 1,
                    ]);
                }
            }

            /*
             * Affiliate Links
             */
            $submittedAffiliateIds = collect(
                $data['affiliate_links'] ?? []
            )
                ->pluck('id')
                ->filter()
                ->values();

            $book->affiliateLinks()
                ->whereNotIn(
                    'id',
                    $submittedAffiliateIds
                )
                ->delete();

            foreach (
                $data['affiliate_links'] ?? [] as $affiliate
            ) {
                if (! empty($affiliate['id'])) {
                    $book->affiliateLinks()
                        ->where(
                            'id',
                            $affiliate['id']
                        )
                        ->update([
                            'affiliate_store_id' => $affiliate[
                                    'affiliate_store_id'
                                ],
                            'store_name' => $this->affiliateStoreName($affiliate),
                            'location' => $this->affiliateLocation($affiliate),
                            'url' => $affiliate['url'],
                        ]);
                } else {
                    $book->affiliateLinks()->create([
                        'affiliate_store_id' => $affiliate[
                                'affiliate_store_id'
                            ],
                        'store_name' => $this->affiliateStoreName($affiliate),
                        'location' => $this->affiliateLocation($affiliate),
                        'url' => $affiliate['url'],
                    ]);
                }
            }
        });

        $this->forgetBookCaches();

        return redirect()
            ->route('admin.books.index')
            ->with(
                'success',
                'Buku berhasil diperbarui.'
            );
    }

    /**
     * Remove the specified book.
     */
    public function destroy(Book $book): RedirectResponse
    {
        $book->forceDelete();

        $this->forgetBookCaches();

        return redirect()
            ->back(fallback: route('admin.books.index'))
            ->with(
                'success',
                'Buku berhasil dihapus.'
            );
    }

    /**
     * Form options.
     */
    private function formOptions(): array
    {
        return [
            'series' => BookSeries::query()
                ->orderBy('title')
                ->get([
                    'id',
                    'title',
                    'title as name',
                ]),

            'editions' => Edition::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                ]),

            'storyStatuses' => StoryStatus::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                ]),

            'publishers' => Publisher::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                ]),

            'authors' => Author::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                ]),

            'genres' => Genre::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                ]),

            'affiliateStores' => AffiliateStore::query()
                ->orderBy('name')
                ->get([
                    'id',
                    'name',
                ]),

            'bookTypes' => collect(BookType::cases())
                ->map(fn (BookType $type) => [
                    'value' => $type->value,
                    'label' => $type->label(),
                ])
                ->values(),

            'ageRatings' => collect(AgeRating::cases())
                ->map(fn (AgeRating $rating) => [
                    'value' => $rating->value,
                    'label' => $rating->value,
                ])
                ->values(),
        ];
    }

    /**
     * Generate a unique slug.
     *
     * Soft-deleted rows are included because the slug
     * column has a unique index.
     */
    private function generateUniqueSlug(
        string $title,
        string $volume,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug(
            $title.'-volume-'.$volume
        );

        $originalSlug = $slug;
        $counter = 1;

        while (
            Book::withTrashed()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->whereKeyNot(
                        $ignoreId
                    )
                )
                ->exists()
        ) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    /**
     * Semua slug yang sudah dipakai (termasuk buku soft-deleted) agar pratinjau
     * slug di form dapat menghitung sufiks unik persis seperti generateUniqueSlug().
     *
     * @return array<int, string>
     */
    private function existingSlugs(?int $ignoreId = null): array
    {
        return Book::withTrashed()
            ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
            ->whereNotNull('slug')
            ->where('slug', '!=', '')
            ->pluck('slug')
            ->values()
            ->all();
    }

    /**
     * Volume yang sudah dipakai per series (key "none" untuk buku tanpa series)
     * agar validasi form mengikuti series yang sedang dipilih, bukan series asal
     * saat menduplikat buku.
     *
     * @return array<string, array<int, string>>
     */
    private function volumesBySeries(?int $ignoreId = null): array
    {
        return Book::query()
            ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
            ->get(['series_id', 'volume'])
            ->groupBy(fn (Book $book) => $book->series_id ? (string) $book->series_id : 'none')
            ->map(fn ($books) => $books
                ->pluck('volume')
                ->filter()
                ->map(fn ($volume) => (string) $volume)
                ->values()
                ->all())
            ->all();
    }

    /**
     * Bersihkan cache halaman publik agar perubahan buku langsung tampil.
     */
    private function forgetBookCaches(): void
    {
        foreach (['home:books:v2', 'bookmark:books:v2', 'news:books:v2', 'kios:books:v2'] as $key) {
            Cache::forget($key);
        }
    }

    /**
     * Sync book authors.
     *
     * Satu author boleh memegang peran story sekaligus art pada buku yang sama,
     * sehingga pivot tidak bisa di-key hanya oleh author_id (role art akan
     * menimpa role story). Karena unique index tabel pivot mencakup kolom role
     * (book_id, author_id, role), tiap peran di-attach sebagai baris terpisah.
     */
    private function syncAuthors(
        Book $book,
        array $data
    ): void {
        $storyAuthorIds = collect(
            $data['story_authors'] ?? []
        )
            ->filter(fn ($authorId) => $authorId !== null && $authorId !== '')
            ->unique()
            ->values();

        $artAuthorIds = collect(
            $data['art_authors'] ?? []
        )
            ->filter(fn ($authorId) => $authorId !== null && $authorId !== '')
            ->unique()
            ->values();

        $book->authors()->detach();

        if ($storyAuthorIds->isNotEmpty()) {
            $book->authors()->attach(
                $storyAuthorIds->all(),
                ['role' => 'story']
            );
        }

        if ($artAuthorIds->isNotEmpty()) {
            $book->authors()->attach(
                $artAuthorIds->all(),
                ['role' => 'art']
            );
        }
    }

    /**
     * Sync book genres.
     */
    private function syncGenres(
        Book $book,
        array $data
    ): void {
        $book->genres()->sync(
            $data['genres'] ?? []
        );
    }

    /**
     * Sync book images.
     */
    private function syncImages(
        Book $book,
        array $data
    ): void {
        $book->images()->delete();

        foreach (
            $data['images'] ?? [] as $index => $imageUrl
        ) {
            $book->images()->create([
                'image_url' => $imageUrl,
                'sort_order' => $index + 1,
            ]);
        }
    }

    /**
     * Sync affiliate links.
     */
    private function syncAffiliateLinks(
        Book $book,
        array $data
    ): void {
        $book->affiliateLinks()->delete();

        foreach (
            $data['affiliate_links'] ?? [] as $affiliateLink
        ) {
            $book->affiliateLinks()->create([
                'affiliate_store_id' => $affiliateLink['affiliate_store_id'],

                'store_name' => $this->affiliateStoreName($affiliateLink),

                'location' => $this->affiliateLocation($affiliateLink),

                'url' => $affiliateLink['url'],
            ]);
        }
    }

    private function affiliateStoreName(array $affiliate): string
    {
        return trim($affiliate['store_name'] ?? '') !== ''
            ? $affiliate['store_name']
            : AffiliateLink::DEFAULT_STORE_NAME;
    }

    private function affiliateLocation(array $affiliate): string
    {
        return trim($affiliate['location'] ?? '') !== ''
            ? $affiliate['location']
            : AffiliateLink::DEFAULT_LOCATION;
    }
}
