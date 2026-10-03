<?php

use App\Http\Controllers\Admin\AffiliateStoreController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookSeriesController;
use App\Http\Controllers\Admin\BookVolumeOrderController;
use App\Http\Controllers\Admin\EditionController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\KiosItemController;
use App\Http\Controllers\Admin\KiosPartnerController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\Admin\StoryStatusController;
use App\Http\Controllers\SitemapController;
use App\Models\Book;
use App\Models\BookSeries;
use App\Models\BookViewLog;
use App\Models\Genre;
use App\Models\KiosItem;
use App\Models\KiosPartner;
use App\Models\KiosViewLog;
use App\Models\News;
use App\Models\NewsViewLog;
use App\Models\Publisher;
use App\Models\SearchLogBuku;
use App\Models\SearchLogKios;
use App\Models\SearchLogNews;
use App\Models\StoryStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

if (! function_exists('homeBookQuery')) {
    function homeBookQuery()
    {
        return Book::query()->with([
            'series:id,title',
            'edition:id,name',
            'storyStatus:id,name',
            'publisher:id,name',
            'images:id,book_id,image_url,sort_order',
            'authors:id,name',
            'genres:id,name',
            'affiliateLinks.affiliateStore:id,name,slug,logo_url',
            'tiktokEmbeds:id,book_id,name,url_video,sort_order',
        ]);
    }
}

// SEO: sitemap.xml dinamis (cache 1 jam)
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Payload dirampingkan: limit + cache filter, defer news, count di-cache.
Route::get('/', function () {
    $books = Cache::remember('home:books:v2', 300, fn () => homeBookQuery()
        ->latest('updated_at')
        ->limit(300)
        ->get());

    $publishers = Cache::remember('home:publishers', 600, fn () => Publisher::orderBy('name')->get(['id', 'name', 'slug']));
    $storyStatuses = Cache::remember('home:story_statuses', 600, fn () => StoryStatus::orderBy('name')->get(['id', 'name', 'slug']));
    $genres = Cache::remember('home:genres', 600, fn () => Genre::orderBy('name')->get(['id', 'name', 'slug']));

    $totalBooksCount = Cache::remember('home:total_books', 300, fn () => Book::count());
    $totalSeriesCount = Cache::remember('home:total_series', 300, fn () => BookSeries::count());
    $totalPublishersCount = Cache::remember('home:total_publishers', 300, fn () => Publisher::count());

    return Inertia::render('User/home', [
        'books' => $books,
        'publishers' => $publishers,
        'storyStatuses' => $storyStatuses,
        'genres' => $genres,
        'newsList' => Inertia::defer(fn () => News::latest()->limit(50)->get()),
        'totalBooksCount' => $totalBooksCount,
        'totalSeriesCount' => $totalSeriesCount,
        'totalPublishersCount' => $totalPublishersCount,
        'meta' => [
            'title' => 'Norinoya - Database Manga, Komik, & Light Novel Indonesia',
            'description' => 'Norinoya - Database Manga, Komik, & Light Novel Indonesia. Temukan rilisan buku, berita terbaru, dan belanja komik preloved di Kios Norinoya.',
            'image' => url('/favicon.png'),
            'url' => url('/'),
            'type' => 'website',
        ],
    ]);
})->name('home');

Route::get('/news', function () {
    $newsList = Cache::remember('news:list:v2', 300, fn () => News::latest()->limit(80)->get());
    $kiosItems = Cache::remember('news:kios_items', 300, fn () => KiosItem::with(['kiosPartner:id,name,slug', 'linkedBook:id,title'])->available()->latest()->limit(40)->get());
    $books = Cache::remember('news:books:v2', 300, fn () => homeBookQuery()->latest('updated_at')->limit(100)->get());
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
})->name('news');

Route::get('/kios', function () {
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
})->name('kios');

Route::get('/bookmark', function () {
    $books = Cache::remember('bookmark:books:v2', 300, fn () => homeBookQuery()->latest('updated_at')->limit(120)->get());

    return Inertia::render('User/bookmark', [
        'books' => $books,
        'newsList' => Inertia::defer(fn () => News::latest()->limit(40)->get()),
        'kiosItems' => Inertia::defer(fn () => KiosItem::with(['kiosPartner:id,name,slug', 'linkedBook:id,title'])->latest()->limit(40)->get()),
        'meta' => ['robots' => 'noindex,nofollow'],
    ]);
})->name('bookmark');

Route::get('/buku/{slug}', function ($slug) {
    $book = Book::where('slug', $slug)
        ->orWhere('id', $slug)
        ->with([
            'series',
            'edition',
            'storyStatus',
            'publisher',
            'images',
            'authors',
            'genres',
            'affiliateLinks.affiliateStore',
            'tiktokEmbeds',
        ])->first();

    $requestedVolume = request()->query('vol', null);
    $initialVolume = $requestedVolume
        ? $requestedVolume
        : ($book?->volume ?? null);

    if ($book) {
        $ip = request()->ip();
        $ua = request()->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = BookViewLog::where('book_id', $book->id)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (! $alreadyLogged) {
            $book->increment('views_count');
            Cache::forget('home:books:v2');
            Cache::forget('bookmark:books:v2');
            Cache::forget('news:books:v2');
            Cache::forget('kios:books:v2');

            BookViewLog::create([
                'book_id' => $book->id,
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }
    }

    $books = Cache::remember('home:books:v2', 300, fn () => homeBookQuery()->latest('updated_at')->limit(300)->get());
    $publishers = Cache::remember('home:publishers', 600, fn () => Publisher::orderBy('name')->get(['id', 'name', 'slug']));
    $storyStatuses = Cache::remember('home:story_statuses', 600, fn () => StoryStatus::orderBy('name')->get(['id', 'name', 'slug']));
    $genres = Cache::remember('home:genres', 600, fn () => Genre::orderBy('name')->get(['id', 'name', 'slug']));

    $totalBooksCount = Cache::remember('home:total_books', 300, fn () => Book::count());
    $totalSeriesCount = Cache::remember('home:total_series', 300, fn () => BookSeries::count());
    $totalPublishersCount = Cache::remember('home:total_publishers', 300, fn () => Publisher::count());

    return Inertia::render('User/home', [
        'books' => $books,
        'publishers' => $publishers,
        'storyStatuses' => $storyStatuses,
        'genres' => $genres,
        'newsList' => Inertia::defer(fn () => News::latest()->limit(50)->get()),
        'totalBooksCount' => $totalBooksCount,
        'totalSeriesCount' => $totalSeriesCount,
        'totalPublishersCount' => $totalPublishersCount,
        'initialBook' => $book,
        'initialSlug' => $slug,
        'initialVolume' => $initialVolume,
        'meta' => [
            'title' => $book ? $book->title.' - Norinoya' : 'Katalog Buku - Norinoya',
            'description' => $book
                ? Str::limit(strip_tags($book->synopsis ?? $book->short_description ?? 'Lihat informasi lengkap dan detail buku komik di Norinoya.'), 160)
                : 'Katalog manga, komik, novel, dan light novel lengkap di Norinoya.',
            'image' => ($book && ($img = $book->images->first()?->image_url)) ? (Str::startsWith($img, ['http://', 'https://']) ? $img : url($img)) : url('/favicon.png'),
            'url' => $book ? url("/buku/{$book->slug}") : url("/buku/{$slug}"),
            'type' => 'book',
        ],
    ]);
})->name('book.detail');

Route::post('/books/{id}/view', function (Request $request, $id) {
    $cleanId = preg_replace('/^(book|series)-/', '', $id);
    $volume = $request->input('volume');
    $slug = $request->input('slug');

    $book = null;

    if (is_numeric($cleanId)) {
        if ($volume) {
            $book = Book::where('id', $cleanId)->first()
                ?? Book::where('series_id', $cleanId)->where('volume', $volume)->first();
        } else {
            $book = Book::where('id', $cleanId)->first()
                ?? Book::where('series_id', $cleanId)->first();
        }
    }

    if (! $book) {
        $targetSlug = $slug ?: $id;
        $book = Book::where('slug', $targetSlug)->first();
    }

    if (! $book && $volume) {
        $escaped = addcslashes($cleanId, '%_\\');
        $book = Book::where('volume', $volume)
            ->where(function ($q) use ($escaped, $cleanId) {
                $q->where('slug', 'like', "%{$escaped}%")
                    ->orWhere('title', 'like', "%{$escaped}%")
                    ->orWhereHas('series', function ($sq) use ($escaped, $cleanId) {
                        $sq->where('title', 'like', "%{$escaped}%");
                        if (is_numeric($cleanId)) {
                            $sq->orWhere('id', $cleanId);
                        }
                    });
            })->first();
    }

    if ($book) {
        $ip = $request->ip();
        $ua = $request->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = BookViewLog::where('book_id', $book->id)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (! $alreadyLogged) {
            $book->increment('views_count');
            Cache::forget('home:books:v2');
            Cache::forget('bookmark:books:v2');
            Cache::forget('news:books:v2');
            Cache::forget('kios:books:v2');

            BookViewLog::create([
                'book_id' => $book->id,
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }

        return response()->json([
            'success' => true,
            'book_id' => $book->id,
            'views_count' => (int) $book->views_count,
            'is_new_view' => ! $alreadyLogged,
        ]);
    }

    return response()->json(['success' => false, 'message' => 'Book not found'], 404);
})->middleware('throttle:60,1')->name('books.increment-view');

// Endpoint kios relevan berdasarkan JUDUL buku
Route::get('/kios/relevant-by-title', function (Request $request) {
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
})->name('kios.relevant-by-title');

Route::post('/books/search-log', function (Request $request) {
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

    $log = SearchLogBuku::firstOrCreate(
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
})->middleware('throttle:20,1')->name('books.search-log');

Route::post('/news/search-log', function (Request $request) {
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
})->middleware('throttle:20,1')->name('news.search-log');

Route::post('/kios/search-log', function (Request $request) {
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
})->middleware('throttle:20,1')->name('kios.search-log');

Route::get('/news/{slug}', function ($slug) {
    $news = News::where('slug', $slug)
        ->orWhere('id', $slug)
        ->first();

    if (! $news) {
        return redirect()->route('news');
    }

    $ip = request()->ip();
    $ua = request()->userAgent();
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
})->name('news.detail');

Route::post('/news/{id}/view', function (Request $request, $id) {
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
})->middleware('throttle:60,1')->name('news.increment-view');

Route::get('/kios/{slug}', function ($slug) {
    $kiosItem = KiosItem::where('slug', $slug)
        ->orWhere('id', $slug)
        ->with(['kiosPartner', 'linkedBook'])
        ->first();

    if (! $kiosItem) {
        return redirect()->route('kios');
    }

    $ip = request()->ip();
    $ua = request()->userAgent();
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
})->name('kios.detail');

Route::post('/kios/{id}/view', function (Request $request, $id) {
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
})->middleware('throttle:60,1')->name('kios.increment-view');

Route::post('/kios/{id}/click', function (Request $request, $id) {
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
})->middleware('throttle:30,1')->name('kios.increment-click');

Route::get('/home', function () {
    return redirect()->route('home');
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            Route::get('dashboard', function () {
                $totalBooks = Book::count();
                $totalNews = News::count();
                $totalKios = KiosItem::count();
                $totalPartners = KiosPartner::count();

                $bookViews = Book::sum('views_count');
                $newsViews = News::sum('views_count');
                $kiosViews = KiosItem::sum('views_count');
                $totalViews = $bookViews + $newsViews + $kiosViews;

                $recentBooks = Book::latest()->take(5)->get(['id', 'title', 'volume', 'views_count', 'created_at']);
                $recentNews = News::latest()->take(5)->get(['id', 'title', 'category', 'views_count', 'created_at']);
                $recentKios = KiosItem::latest()->take(5)->get(['id', 'title', 'price', 'is_preloved', 'views_count', 'created_at']);

                return Inertia::render('dashboard', [
                    'meta' => ['robots' => 'noindex,nofollow'],
                    'stats' => [
                        'totalBooks' => $totalBooks,
                        'totalNews' => $totalNews,
                        'totalKios' => $totalKios,
                        'totalPartners' => $totalPartners,
                        'totalViews' => $totalViews,
                    ],
                    'recentBooks' => $recentBooks,
                    'recentNews' => $recentNews,
                    'recentKios' => $recentKios,
                ]);
            })->name('dashboard');

            Route::resource(
                'kios-partners',
                KiosPartnerController::class
            )->except(['show']);

            Route::get('kios/logs', [KiosItemController::class, 'logs'])->name('kios.logs');
            Route::get('kios/logs/export', [KiosItemController::class, 'exportLogs'])->name('kios.logs.export');
            Route::delete('kios/logs/{log}', [KiosItemController::class, 'destroyLog'])->name('kios.logs.destroy');
            Route::delete('kios/logs-clear', [KiosItemController::class, 'clearLogs'])->name('kios.logs.clear');

            Route::get('kios/search-logs', [KiosItemController::class, 'searchLogs'])->name('kios.search-logs');
            Route::get('kios/search-logs/export', [KiosItemController::class, 'exportSearchLogs'])->name('kios.search-logs.export');
            Route::delete('kios/search-logs/{searchLog}', [KiosItemController::class, 'destroySearchLog'])->name('kios.search-logs.destroy');
            Route::delete('kios/search-logs-clear', [KiosItemController::class, 'clearSearchLogs'])->name('kios.search-logs.clear');

            Route::resource(
                'kios',
                KiosItemController::class
            )->except(['show']);

            Route::get('news/logs', [NewsController::class, 'logs'])->name('news.logs');
            Route::get('news/logs/export', [NewsController::class, 'exportLogs'])->name('news.logs.export');
            Route::delete('news/logs/{log}', [NewsController::class, 'destroyLog'])->name('news.logs.destroy');
            Route::delete('news/logs-clear', [NewsController::class, 'clearLogs'])->name('news.logs.clear');

            Route::get('news/search-logs', [NewsController::class, 'searchLogs'])->name('news.search-logs');
            Route::get('news/search-logs/export', [NewsController::class, 'exportSearchLogs'])->name('news.search-logs.export');
            Route::delete('news/search-logs/{searchLog}', [NewsController::class, 'destroySearchLog'])->name('news.search-logs.destroy');
            Route::delete('news/search-logs-clear', [NewsController::class, 'clearSearchLogs'])->name('news.search-logs.clear');

            Route::resource(
                'news',
                NewsController::class
            )->except(['show']);

            Route::get('books/logs', [BookController::class, 'logs'])->name('books.logs');
            Route::get('books/logs/export', [BookController::class, 'exportLogs'])->name('books.logs.export');
            Route::delete('books/logs/{log}', [BookController::class, 'destroyLog'])->name('books.logs.destroy');
            Route::delete('books/logs-clear', [BookController::class, 'clearLogs'])->name('books.logs.clear');

            Route::get('books/search-logs', [BookController::class, 'searchLogs'])->name('books.search-logs');
            Route::get('books/search-logs/export', [BookController::class, 'exportSearchLogs'])->name('books.search-logs.export');
            Route::delete('books/search-logs/{searchLog}', [BookController::class, 'destroySearchLog'])->name('books.search-logs.destroy');
            Route::delete('books/search-logs-clear', [BookController::class, 'clearSearchLogs'])->name('books.search-logs.clear');

            Route::get('books/{book}/duplicate', [BookController::class, 'duplicate'])->name('books.duplicate');

            Route::get('books/filter-options', [BookController::class, 'filterOptions'])->name('books.filter-options');

            Route::delete('books/bulk', [BookController::class, 'bulkDestroy'])->name('books.bulk-destroy');

            Route::resource(
                'books',
                BookController::class,
            )->except(['show']);

            Route::get('books/volume-order', [BookVolumeOrderController::class, 'index'])->name('books.volume-order');
            Route::get('books/volume-order/{seriesId}', [BookVolumeOrderController::class, 'getVolumesBySeries'])->name('books.volume-order.volumes');
            Route::put('books/volume-order/update', [BookVolumeOrderController::class, 'updateOrder'])->name('books.volume-order.update');

            Route::resource(
                'book-series',
                BookSeriesController::class
            )->except(['show']);

            Route::resource(
                'authors',
                AuthorController::class
            )->except(['show']);

            Route::resource(
                'genres',
                GenreController::class
            )->except(['show']);

            Route::resource(
                'publishers',
                PublisherController::class
            )->except(['show']);

            Route::resource(
                'editions',
                EditionController::class
            )->except(['show']);

            Route::resource(
                'story-statuses',
                StoryStatusController::class
            )->except(['show']);

            Route::resource(
                'affiliate-stores',
                AffiliateStoreController::class
            )->except(['show']);

        });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
