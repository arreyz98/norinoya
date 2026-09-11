<?php

namespace App\Http\Controllers\Admin;

use App\Enums\AgeRating;
use App\Enums\BookType;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Models\AffiliateStore;
use App\Models\Author;
use App\Models\Book;
use App\Models\BookSeries;
use App\Models\Edition;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\StoryStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Display a listing of books.
     */
    public function index(\Illuminate\Http\Request $request): Response
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

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('synopsis', 'like', "%{$search}%")
                  ->orWhereHas('series', function ($sq) use ($search) {
                      $sq->where('title', 'like', "%{$search}%");
                  })
                  ->orWhereHas('publisher', function ($pq) use ($search) {
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

        $sort = $request->input('sort', 'latest');
        if ($sort === 'oldest') {
            $query->oldest();
        } else {
            $query->latest();
        }

        $books = $query->paginate(15)->withQueryString();

        $seriesList = BookSeries::orderBy('title')->get(['id', 'title']);
        $publishersList = Publisher::orderBy('name')->get(['id', 'name']);

        return Inertia::render(
            'Admin/Books/Index',
            [
                'books' => $books,
                'seriesList' => $seriesList,
                'publishersList' => $publishersList,
                'filters' => (object) $request->only(['search', 'series_id', 'publisher_id', 'sort']),
            ]
        );
    }

    /**
     * Display a listing of book view timestamp logs.
     */
    public function logs(\Illuminate\Http\Request $request): Response
    {
        $query = \App\Models\BookViewLog::query()
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
        $totalLogsCount = \App\Models\BookViewLog::count();
        $todayLogsCount = \App\Models\BookViewLog::whereDate('created_at', today())->count();
        $uniqueIpsCount = \App\Models\BookViewLog::distinct('ip_address')->count('ip_address');

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
    public function destroyLog(\App\Models\BookViewLog $log): RedirectResponse
    {
        $log->delete();

        return redirect()->back()->with('success', 'Log kunjungan berhasil dihapus.');
    }

    /**
     * Clear filtered or all logs manually.
     */
    public function clearLogs(\Illuminate\Http\Request $request): RedirectResponse
    {
        $query = \App\Models\BookViewLog::query();

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
    public function exportLogs(\Illuminate\Http\Request $request)
    {
        $query = \App\Models\BookViewLog::query()
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

        $filename = 'book_view_logs_' . date('Y-m-d_His') . '.csv';

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
            fputs($handle, "\xEF\xBB\xBF");

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
                if (stripos($ua, 'edg') !== false) $browser = 'Edge';
                elseif (stripos($ua, 'chrome') !== false || stripos($ua, 'crios') !== false) $browser = 'Chrome';
                elseif (stripos($ua, 'firefox') !== false || stripos($ua, 'fxios') !== false) $browser = 'Firefox';
                elseif (stripos($ua, 'safari') !== false) $browser = 'Safari';
                elseif (stripos($ua, 'opera') !== false || stripos($ua, 'opr') !== false) $browser = 'Opera';

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
    public function searchLogs(\Illuminate\Http\Request $request): Response
    {
        $query = \App\Models\SearchLogBuku::query();

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
        $totalSearchesCount = (int) \App\Models\SearchLogBuku::sum('search_count');
        $todaySearchesCount = (int) \App\Models\SearchLogBuku::whereDate('search_date', today())->sum('search_count');
        $uniqueKeywordsCount = \App\Models\SearchLogBuku::distinct('keyword')->count('keyword');

        // Top 5 most searched keywords
        $topSearches = \App\Models\SearchLogBuku::select('keyword', DB::raw('SUM(search_count) as total_count'))
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
    public function destroySearchLog(\App\Models\SearchLogBuku $searchLog): RedirectResponse
    {
        $searchLog->delete();

        return redirect()->back()->with('success', 'Log kata kunci pencarian berhasil dihapus.');
    }

    /**
     * Clear filtered or all search logs.
     */
    public function clearSearchLogs(\Illuminate\Http\Request $request): RedirectResponse
    {
        $query = \App\Models\SearchLogBuku::query();

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
    public function exportSearchLogs(\Illuminate\Http\Request $request)
    {
        $query = \App\Models\SearchLogBuku::query();

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

        $filename = 'search_keyword_logs_' . date('Y-m-d_His') . '.csv';

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
            fputs($handle, "\xEF\xBB\xBF");

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
        return Inertia::render('Admin/Books/Create', $this->formOptions());
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
            'affiliateLinks:id,book_id,affiliate_store_id,url',
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
                    ->values(),
            ],
        ]));
    }

    public function store(StoreBookRequest $request)
{
    
    $book = DB::transaction(function () use ($request) {
        $data = $request->validated();
        $slug = Str::slug(
            $data['title'] . '-volume-' . $data['volume']
        );
        $book = Book::create([
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
            'short_description' =>
                $data['short_description'] ?? null,
            'news_link' =>
                $data['news_link'] ?? null,
            'msrp' => $data['msrp'],
            'isbn' => $data['isbn'] ?? null,
            'page_count' => $data['page_count'] ?? null,
            'paper_type' => $data['paper_type'] ?? null,
            'dimensions' => $data['dimensions'] ?? null,
            'adaptation' => $data['adaptation'] ?? null,
            'is_upcoming' => !empty($data['is_upcoming']),
        ]
    );

    foreach (
        $data['tiktok_embeds'] ?? []
        as $index => $embed
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
            $data['images'] ?? []
            as $index => $image
        ) {
            $book->images()->create([
                'image_url' =>
                    $image['image_url'],
                'sort_order' =>
                    $index + 1,
            ]);
        }

        /*
         * Story Authors
         */
        foreach (
            $data['story_authors'] ?? []
            as $authorId
        ) {
            $book->authors()->attach(
                $authorId,
                [
                    'role' => 'story',
                ]
            );
        }

        /*
         * Art Authors
         */
        foreach (
            $data['art_authors'] ?? []
            as $authorId
        ) {
            $book->authors()->attach(
                $authorId,
                [
                    'role' => 'art',
                ]
            );
        }

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
            $data['affiliate_links'] ?? []
            as $affiliate
        ) {
            $book->affiliateLinks()->create([
                'affiliate_store_id' =>
                    $affiliate[
                        'affiliate_store_id'
                    ],
                'url' =>
                    $affiliate['url'],
            ]);
        }

        return $book;
    });

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
        $book->update([
            'title' => $data['title'],
            'series_id' => $data['series_id'] ?? null,
            'volume' => $data['volume'],
            'edition_id' => $data['edition_id'],
            'book_type' => $data['book_type'],
            'story_status_id' => $data['story_status_id'],
            'age_rating' => $data['age_rating'],
            'publisher_id' => $data['publisher_id'],
            'synopsis' => $data['synopsis'],
            'short_description' =>
                $data['short_description'] ?? null,
            'news_link' =>
                $data['news_link'] ?? null,
            'msrp' => $data['msrp'],
            'isbn' => $data['isbn'] ?? null,
            'page_count' => $data['page_count'] ?? null,
            'paper_type' => $data['paper_type'] ?? null,
            'dimensions' => $data['dimensions'] ?? null,
            'adaptation' => $data['adaptation'] ?? null,
            'is_upcoming' => !empty($data['is_upcoming']),
        ]);

        /*
         * Authors
         */
        $book->authors()->detach();

        foreach (
            $data['story_authors'] ?? []
            as $authorId
        ) {
            $book->authors()->attach(
                $authorId,
                [
                    'role' => 'story',
                ]
            );
        }

        foreach (
            $data['art_authors'] ?? []
            as $authorId
        ) {
            $book->authors()->attach(
                $authorId,
                [
                    'role' => 'art',
                ]
            );
        }

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
            $data['images'] ?? []
            as $index => $image
        ) {
            if (!empty($image['id'])) {
                $book->images()
                    ->where('id', $image['id'])
                    ->update([
                        'image_url' =>
                            $image['image_url'],
                        'sort_order' =>
                            $index + 1,
                    ]);
            } else {
                $book->images()->create([
                    'image_url' =>
                        $image['image_url'],
                    'sort_order' =>
                        $index + 1,
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
            $data['tiktok_embeds'] ?? []
            as $index => $embed
        ) {
            if (!empty($embed['id'])) {
                $book->tiktokEmbeds()
                    ->where('id', $embed['id'])
                    ->update([
                        'name' =>
                            $embed['name'] ?? '',
                        'url_video' =>
                            $embed['url_video'] ?? $embed['embed_url'] ?? '',
                        'sort_order' =>
                            $index + 1,
                    ]);
            } else {
                $book->tiktokEmbeds()->create([
                    'name' =>
                        $embed['name'] ?? '',
                    'url_video' =>
                        $embed['url_video'] ?? $embed['embed_url'] ?? '',
                    'sort_order' =>
                        $index + 1,
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
            $data['affiliate_links'] ?? []
            as $affiliate
        ) {
            if (!empty($affiliate['id'])) {
                $book->affiliateLinks()
                    ->where(
                        'id',
                        $affiliate['id']
                    )
                    ->update([
                        'affiliate_store_id' =>
                            $affiliate[
                                'affiliate_store_id'
                            ],
                        'url' =>
                            $affiliate['url'],
                    ]);
            } else {
                $book->affiliateLinks()->create([
                    'affiliate_store_id' =>
                        $affiliate[
                            'affiliate_store_id'
                        ],
                    'url' =>
                        $affiliate['url'],
                ]);
            }
        }
    });

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
        $book->delete();

        return to_route(
            'admin.books.index'
        )->with(
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
     * Validate volume uniqueness.
     */
    private function validateVolume(
        ?int $seriesId,
        int $volume,
        ?int $ignoreBookId = null
    ): void {
        $query = Book::query()
            ->where('volume', $volume);

        if ($seriesId === null) {
            $query->whereNull('series_id');
        } else {
            $query->where('series_id', $seriesId);
        }

        if ($ignoreBookId !== null) {
            $query->where(
                'id',
                '!=',
                $ignoreBookId
            );
        }

        if ($query->exists()) {
            throw ValidationException::withMessages([
                'volume' =>
                    'Volume tersebut sudah digunakan pada series ini.',
            ]);
        }
    }

    /**
     * Sync book authors.
     */
    private function syncAuthors(
        Book $book,
        array $data
    ): void {
        $authors = [];

        foreach (
            $data['story_authors'] ?? []
            as $authorId
        ) {
            $authors[] = [
                'id' => $authorId,
                'role' => 'story',
            ];
        }

        foreach (
            $data['art_authors'] ?? []
            as $authorId
        ) {
            $authors[] = [
                'id' => $authorId,
                'role' => 'art',
            ];
        }

        $book->authors()->detach();

        foreach ($authors as $author) {
            $book->authors()->attach(
                $author['id'],
                [
                    'role' => $author['role'],
                ]
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
            $data['images'] ?? []
            as $index => $imageUrl
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
            $data['affiliate_links'] ?? []
            as $affiliateLink
        ) {
            $book->affiliateLinks()->create([
                'affiliate_store_id' =>
                    $affiliateLink['affiliate_store_id'],

                'url' =>
                    $affiliateLink['url'],
            ]);
        }
    }
}