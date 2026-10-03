<?php

use App\Http\Controllers\Admin\AffiliateStoreController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookSeriesController;
use App\Http\Controllers\Admin\BookVolumeOrderController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EditionController;
use App\Http\Controllers\Admin\GenreController;
use App\Http\Controllers\Admin\KiosItemController;
use App\Http\Controllers\Admin\KiosPartnerController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\Admin\StoryStatusController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\User\BookController as UserBookController;
use App\Http\Controllers\User\BookmarkController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\KiosController;
use App\Http\Controllers\User\NewsController as UserNewsController;
use Illuminate\Support\Facades\Route;

// SEO: sitemap.xml dinamis (cache 1 jam)
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// Payload dirampingkan: limit + cache filter, defer news, count di-cache.
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/news', [UserNewsController::class, 'index'])->name('news');

Route::get('/kios', [KiosController::class, 'index'])->name('kios');

Route::get('/bookmark', [BookmarkController::class, 'index'])->name('bookmark');

Route::get('/buku/{slug}', [UserBookController::class, 'show'])->name('book.detail');

Route::post('/books/{id}/view', [UserBookController::class, 'incrementView'])->middleware('throttle:60,1')->name('books.increment-view');

// Endpoint kios relevan berdasarkan JUDUL buku
Route::get('/kios/relevant-by-title', [KiosController::class, 'relevantByTitle'])->name('kios.relevant-by-title');

Route::post('/books/search-log', [UserBookController::class, 'searchLog'])->middleware('throttle:20,1')->name('books.search-log');

Route::post('/news/search-log', [UserNewsController::class, 'searchLog'])->middleware('throttle:20,1')->name('news.search-log');

Route::post('/kios/search-log', [KiosController::class, 'searchLog'])->middleware('throttle:20,1')->name('kios.search-log');

Route::get('/news/{slug}', [UserNewsController::class, 'show'])->name('news.detail');

Route::post('/news/{id}/view', [UserNewsController::class, 'incrementView'])->middleware('throttle:60,1')->name('news.increment-view');

Route::get('/kios/{slug}', [KiosController::class, 'show'])->name('kios.detail');

Route::post('/kios/{id}/view', [KiosController::class, 'incrementView'])->middleware('throttle:60,1')->name('kios.increment-view');

Route::post('/kios/{id}/click', [KiosController::class, 'incrementClick'])->middleware('throttle:30,1')->name('kios.increment-click');

Route::redirect('/home', '/');

Route::middleware(['auth'])->group(function () {
    Route::redirect('dashboard', '/admin/dashboard');

    Route::prefix('admin')
        ->name('admin.')
        ->group(function () {

            Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

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
                BookController::class
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
