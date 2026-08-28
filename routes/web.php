<?php

use App\Http\Controllers\Admin\BookSeriesController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\EditionController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\Admin\StoryStatusController;
use App\Http\Controllers\Admin\AffiliateStoreController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\KiosItemController;
use App\Http\Controllers\Admin\KiosPartnerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/test', function () {
    return Inertia::render('User/test');
})->name('test');

Route::get('/', function () {
    $books = \App\Models\Book::with([
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

    $publishers = \App\Models\Publisher::orderBy('name')->get(['id', 'name', 'slug']);
    $storyStatuses = \App\Models\StoryStatus::orderBy('name')->get(['id', 'name', 'slug']);
    $genres = \App\Models\Genre::orderBy('name')->get(['id', 'name', 'slug']);
    $newsList = \App\Models\News::latest()->get();

    return Inertia::render('User/home', [
        'books' => $books,
        'publishers' => $publishers,
        'storyStatuses' => $storyStatuses,
        'genres' => $genres,
        'newsList' => $newsList,
    ]);
})->name('home');

Route::get('/news', function () {
    $newsList = \App\Models\News::latest()->get();
    $kiosItems = \App\Models\KiosItem::with(['kiosPartner', 'linkedBook'])->latest()->get();
    $books = \App\Models\Book::with([
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

    return Inertia::render('User/news', [
        'newsList' => $newsList,
        'books' => $books,
        'kiosItems' => $kiosItems,
    ]);
})->name('news');

Route::get('/kios', function () {
    $kiosItems = \App\Models\KiosItem::with(['kiosPartner', 'linkedBook'])->latest()->get();
    $books = \App\Models\Book::with([
        'series',
        'edition',
        'storyStatus',
        'publisher',
        'images',
        'genres',
    ])->get();

    return Inertia::render('User/kios', [
        'kiosItems' => $kiosItems,
        'books' => $books,
    ]);
})->name('kios');

Route::get('/buku/{slug}', function ($slug) {
    $book = \App\Models\Book::where('slug', $slug)
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

    if (!$book) {
        return redirect()->route('home');
    }

    if ($book) {
        $ip = request()->ip();
        $ua = request()->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = \App\Models\BookViewLog::where('book_id', $book->id)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (!$alreadyLogged) {
            $book->increment('views_count');

            \App\Models\BookViewLog::create([
                'book_id' => $book->id,
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }
    }

    $books = \App\Models\Book::with([
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

    $publishers = \App\Models\Publisher::orderBy('name')->get(['id', 'name', 'slug']);
    $storyStatuses = \App\Models\StoryStatus::orderBy('name')->get(['id', 'name', 'slug']);
    $genres = \App\Models\Genre::orderBy('name')->get(['id', 'name', 'slug']);
    $newsList = \App\Models\News::latest()->get();

    return Inertia::render('User/home', [
        'books' => $books,
        'publishers' => $publishers,
        'storyStatuses' => $storyStatuses,
        'genres' => $genres,
        'newsList' => $newsList,
        'initialBook' => $book,
        'initialSlug' => $slug,
    ]);
})->name('book.detail');

Route::post('/books/{id}/view', function (\Illuminate\Http\Request $request, $id) {
    $cleanId = preg_replace('/^(book|series)-/', '', $id);
    $volume = $request->input('volume');
    $slug = $request->input('slug');

    $book = null;

    // 1. Try finding by direct numeric ID
    if (is_numeric($cleanId)) {
        if ($volume) {
            $book = \App\Models\Book::where('id', $cleanId)->first()
                ?? \App\Models\Book::where('series_id', $cleanId)->where('volume', $volume)->first();
        } else {
            $book = \App\Models\Book::where('id', $cleanId)->first()
                ?? \App\Models\Book::where('series_id', $cleanId)->first();
        }
    }

    // 2. Try finding by slug or provided slug
    if (!$book) {
        $targetSlug = $slug ?: $id;
        $book = \App\Models\Book::where('slug', $targetSlug)->first();
    }

    // 3. Fallback search by title/series
    if (!$book && $volume) {
        $book = \App\Models\Book::where('volume', $volume)
            ->where(function ($q) use ($id, $cleanId) {
                $q->where('slug', 'like', "%{$cleanId}%")
                  ->orWhere('title', 'like', "%{$cleanId}%")
                  ->orWhereHas('series', function ($sq) use ($cleanId) {
                      $sq->where('id', $cleanId)->orWhere('title', 'like', "%{$cleanId}%");
                  });
            })->first();
    }

    if ($book) {
        $ip = $request->ip();
        $ua = $request->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = \App\Models\BookViewLog::where('book_id', $book->id)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (!$alreadyLogged) {
            $book->increment('views_count');

            \App\Models\BookViewLog::create([
                'book_id' => $book->id,
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }

        return response()->json([
            'success' => true,
            'book_id' => $book->id,
            'views_count' => (int) $book->views_count,
            'is_new_view' => !$alreadyLogged,
        ]);
    }

    return response()->json(['success' => false, 'message' => 'Book not found'], 404);
})->name('books.increment-view');

Route::post('/books/search-log', function (\Illuminate\Http\Request $request) {
    $rawKeyword = (string) $request->input('keyword', '');

    // 1. Membersihkan spasi berlebih (trim) dan multiple whitespaces
    $keyword = trim(preg_replace('/\s+/u', ' ', $rawKeyword));

    // 2. Menyeragamkan huruf kecil (strtolower UTF-8)
    $keyword = mb_strtolower($keyword, 'UTF-8');

    // 3. Jangan catat jika keyword kurang dari 3 huruf
    if (mb_strlen($keyword, 'UTF-8') < 3) {
        return response()->json(['success' => false, 'message' => 'Keyword terlalu pendek (min 3 huruf).'], 422);
    }

    // 4. Batasi panjang maksimal kata kunci agar tidak abused
    if (mb_strlen($keyword, 'UTF-8') > 100) {
        $keyword = mb_substr($keyword, 0, 100, 'UTF-8');
    }

    // 5. Pencegahan Spam / Karakter Berulang (misal: "aaaaaa", ".......", "111111", "???????")
    // Tolak jika ada 4 karakter identik berurutan atau hanya terdiri dari simbol/tanda baca tanpa huruf/angka
    if (preg_match('/(.)\1{3,}/u', $keyword) || !preg_match('/[\p{L}\p{N}]/u', $keyword)) {
        return response()->json(['success' => false, 'message' => 'Keyword terdeteksi spam atau karakter berulang.'], 422);
    }

    $today = now()->setTimezone('Asia/Jakarta')->toDateString();

    // 6. Pastikan di tanggal yang sama tidak ada keyword yang sama (jika ada maka search_count bertambah)
    $log = \App\Models\SearchLogBuku::firstOrCreate(
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
})->name('books.search-log');

Route::post('/news/search-log', function (\Illuminate\Http\Request $request) {
    $rawKeyword = (string) $request->input('keyword', '');

    // 1. Membersihkan spasi berlebih (trim) dan multiple whitespaces
    $keyword = trim(preg_replace('/\s+/u', ' ', $rawKeyword));

    // 2. Menyeragamkan huruf kecil (strtolower UTF-8)
    $keyword = mb_strtolower($keyword, 'UTF-8');

    // 3. Jangan catat jika keyword kurang dari 3 huruf
    if (mb_strlen($keyword, 'UTF-8') < 3) {
        return response()->json(['success' => false, 'message' => 'Keyword terlalu pendek (min 3 huruf).'], 422);
    }

    // 4. Batasi panjang maksimal kata kunci agar tidak abused
    if (mb_strlen($keyword, 'UTF-8') > 100) {
        $keyword = mb_substr($keyword, 0, 100, 'UTF-8');
    }

    // 5. Pencegahan Spam / Karakter Berulang
    if (preg_match('/(.)\1{3,}/u', $keyword) || !preg_match('/[\p{L}\p{N}]/u', $keyword)) {
        return response()->json(['success' => false, 'message' => 'Keyword terdeteksi spam atau karakter berulang.'], 422);
    }

    $today = now()->setTimezone('Asia/Jakarta')->toDateString();

    // 6. Pastikan di tanggal yang sama tidak ada keyword yang sama
    $log = \App\Models\SearchLogNews::firstOrCreate(
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
})->name('news.search-log');

Route::post('/kios/search-log', function (\Illuminate\Http\Request $request) {
    $rawKeyword = (string) $request->input('keyword', '');

    // 1. Membersihkan spasi berlebih (trim) dan multiple whitespaces
    $keyword = trim(preg_replace('/\s+/u', ' ', $rawKeyword));

    // 2. Menyeragamkan huruf kecil (strtolower UTF-8)
    $keyword = mb_strtolower($keyword, 'UTF-8');

    // 3. Jangan catat jika keyword kurang dari 3 huruf
    if (mb_strlen($keyword, 'UTF-8') < 3) {
        return response()->json(['success' => false, 'message' => 'Keyword terlalu pendek (min 3 huruf).'], 422);
    }

    // 4. Batasi panjang maksimal kata kunci agar tidak abused
    if (mb_strlen($keyword, 'UTF-8') > 100) {
        $keyword = mb_substr($keyword, 0, 100, 'UTF-8');
    }

    // 5. Pencegahan Spam / Karakter Berulang
    if (preg_match('/(.)\1{3,}/u', $keyword) || !preg_match('/[\p{L}\p{N}]/u', $keyword)) {
        return response()->json(['success' => false, 'message' => 'Keyword terdeteksi spam atau karakter berulang.'], 422);
    }

    $today = now()->setTimezone('Asia/Jakarta')->toDateString();

    // 6. Pastikan di tanggal yang sama tidak ada keyword yang sama
    $log = \App\Models\SearchLogKios::firstOrCreate(
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
})->name('kios.search-log');

Route::get('/news/{slug}', function ($slug) {
    $news = \App\Models\News::where('slug', $slug)
        ->orWhere('id', $slug)
        ->first();

    if (!$news) {
        return redirect()->route('news');
    }

    $ip = request()->ip();
    $ua = request()->userAgent();
    $oneMinuteAgo = now()->subMinute();

    $alreadyLogged = \App\Models\NewsViewLog::where('news_id', $news->id)
        ->where('ip_address', $ip)
        ->where('created_at', '>=', $oneMinuteAgo)
        ->exists();

    if (!$alreadyLogged) {
        $news->increment('views_count');

        \App\Models\NewsViewLog::create([
            'news_id' => $news->id,
            'ip_address' => $ip,
            'user_agent' => $ua,
        ]);
    }

    $newsList = \App\Models\News::latest()->get();
    $kiosItems = \App\Models\KiosItem::with(['kiosPartner', 'linkedBook'])->latest()->get();
    $books = \App\Models\Book::with([
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

    return Inertia::render('User/news', [
        'newsList' => $newsList,
        'books' => $books,
        'kiosItems' => $kiosItems,
        'initialNews' => $news,
        'initialSlug' => $slug,
    ]);
})->name('news.detail');

Route::post('/news/{id}/view', function (\Illuminate\Http\Request $request, $id) {
    $cleanId = preg_replace('/^news-/', '', $id);
    $slug = $request->input('slug');

    $news = null;
    if (is_numeric($cleanId)) {
        $news = \App\Models\News::where('id', $cleanId)->first();
    }

    if (!$news) {
        $targetSlug = $slug ?: $id;
        $news = \App\Models\News::where('slug', $targetSlug)->first()
            ?? \App\Models\News::where('id', $id)->first();
    }

    if ($news) {
        $ip = $request->ip();
        $ua = $request->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = \App\Models\NewsViewLog::where('news_id', $news->id)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (!$alreadyLogged) {
            $news->increment('views_count');

            \App\Models\NewsViewLog::create([
                'news_id' => $news->id,
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }

        return response()->json([
            'success' => true,
            'news_id' => $news->id,
            'views_count' => (int) $news->views_count,
            'is_new_view' => !$alreadyLogged,
        ]);
    }

    return response()->json(['success' => false, 'message' => 'News not found'], 404);
})->name('news.increment-view');

Route::get('/kios/{slug}', function ($slug) {
    $kiosItem = \App\Models\KiosItem::where('slug', $slug)
        ->orWhere('id', $slug)
        ->with(['kiosPartner', 'linkedBook'])
        ->first();

    if (!$kiosItem) {
        return redirect()->route('kios');
    }

    $ip = request()->ip();
    $ua = request()->userAgent();
    $oneMinuteAgo = now()->subMinute();

    $alreadyLogged = \App\Models\KiosViewLog::where('kios_item_id', $kiosItem->id)
        ->where('action_type', 'view')
        ->where('ip_address', $ip)
        ->where('created_at', '>=', $oneMinuteAgo)
        ->exists();

    if (!$alreadyLogged) {
        $kiosItem->increment('views_count');

        \App\Models\KiosViewLog::create([
            'kios_item_id' => $kiosItem->id,
            'action_type' => 'view',
            'ip_address' => $ip,
            'user_agent' => $ua,
        ]);
    }

    $kiosItems = \App\Models\KiosItem::with(['kiosPartner', 'linkedBook'])->latest()->get();
    $books = \App\Models\Book::with([
        'series',
        'edition',
        'storyStatus',
        'publisher',
        'images',
        'genres',
    ])->get();

    return Inertia::render('User/kios', [
        'kiosItems' => $kiosItems,
        'books' => $books,
        'initialKiosItem' => $kiosItem,
        'initialSlug' => $slug,
    ]);
})->name('kios.detail');

Route::post('/kios/{id}/view', function (\Illuminate\Http\Request $request, $id) {
    $cleanId = preg_replace('/^kios-/', '', $id);
    $slug = $request->input('slug');

    $item = null;
    if (is_numeric($cleanId)) {
        $item = \App\Models\KiosItem::where('id', $cleanId)->first();
    }

    if (!$item) {
        $targetSlug = $slug ?: $id;
        $item = \App\Models\KiosItem::where('slug', $targetSlug)->first()
            ?? \App\Models\KiosItem::where('id', $id)->first();
    }

    if ($item) {
        $ip = $request->ip();
        $ua = $request->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = \App\Models\KiosViewLog::where('kios_item_id', $item->id)
            ->where('action_type', 'view')
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (!$alreadyLogged) {
            $item->increment('views_count');

            \App\Models\KiosViewLog::create([
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
            'is_new_view' => !$alreadyLogged,
        ]);
    }

    return response()->json(['success' => false, 'message' => 'Kios item not found'], 404);
})->name('kios.increment-view');

Route::post('/kios/{id}/click', function (\Illuminate\Http\Request $request, $id) {
    $cleanId = preg_replace('/^kios-/', '', $id);
    $platform = strtolower((string) $request->input('platform', ''));
    $slug = $request->input('slug');

    $item = null;
    if (is_numeric($cleanId)) {
        $item = \App\Models\KiosItem::where('id', $cleanId)->first();
    }

    if (!$item) {
        $targetSlug = $slug ?: $id;
        $item = \App\Models\KiosItem::where('slug', $targetSlug)->first()
            ?? \App\Models\KiosItem::where('id', $id)->first();
    }

    if ($item) {
        // Increment total clicks
        $item->increment('total_clicks_count');

        // Increment specific platform clicks
        if (in_array($platform, ['shopee', 'tokopedia', 'gramedia', 'toco'])) {
            $column = "{$platform}_clicks_count";
            $item->increment($column);
        }

        // Record log for link click
        \App\Models\KiosViewLog::create([
            'kios_item_id' => $item->id,
            'action_type' => $platform ? "click_{$platform}" : 'click_other',
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
})->name('kios.increment-click');

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
                $totalBooks = \App\Models\Book::count();
                $totalNews = \App\Models\News::count();
                $totalKios = \App\Models\KiosItem::count();
                $totalPartners = \App\Models\KiosPartner::count();

                $bookViews = \App\Models\Book::sum('views_count');
                $newsViews = \App\Models\News::sum('views_count');
                $kiosViews = \App\Models\KiosItem::sum('views_count');
                $totalViews = $bookViews + $newsViews + $kiosViews;

                $recentBooks = \App\Models\Book::latest()->take(5)->get(['id', 'title', 'volume', 'views_count', 'created_at']);
                $recentNews = \App\Models\News::latest()->take(5)->get(['id', 'title', 'category', 'views_count', 'created_at']);
                $recentKios = \App\Models\KiosItem::latest()->take(5)->get(['id', 'title', 'price', 'is_preloved', 'views_count', 'created_at']);

                return Inertia::render('dashboard', [
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

            Route::resource(
                'books',
                BookController::class,
            )->except(['show']);

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
