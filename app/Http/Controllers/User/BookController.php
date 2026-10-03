<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookSeries;
use App\Models\BookViewLog;
use App\Models\Genre;
use App\Models\News;
use App\Models\Publisher;
use App\Models\SearchLogBuku;
use App\Models\StoryStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookController extends Controller
{
    public function show(Request $request, $slug)
    {
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

        $requestedVolume = $request->query('vol', null);
        $initialVolume = $requestedVolume
            ? $requestedVolume
            : ($book?->volume ?? null);

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
        }

        $books = Cache::remember('home:books:v2', 300, fn () => Book::homeQuery()->latest('updated_at')->limit(300)->get());
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
    }

    public function incrementView(Request $request, $id)
    {
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
    }
}
