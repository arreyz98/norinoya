<?php

namespace App\Http\Controllers\User;

use App\Actions\Books\QueryCatalog;
use App\Enums\PublicationStatus;
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
    public function data(string $slug)
    {
        $book = $this->findPublished($slug);

        if (! $book) {
            abort(404);
        }

        return response()->json([
            'books' => $this->seriesBooks($book)->values(),
        ]);
    }

    public function lookup(Request $request, QueryCatalog $catalog)
    {
        $validated = $request->validate([
            'ids' => ['array', 'max:100'],
            'ids.*' => ['string', 'max:200'],
        ]);

        return response()->json([
            'books' => $catalog->cardsForBookmarks($validated['ids'] ?? [])->values(),
        ]);
    }

    public function show(Request $request, $slug, QueryCatalog $catalog)
    {
        $book = Book::with([
            'series',
            'edition',
            'storyStatus',
            'publisher',
            'images',
            'authors',
            'genres',
            'affiliateLinks.affiliateStore',
            'tiktokEmbeds',
            'instagramEmbeds',
            'newsLinks',
            'videoLinks',
        ])
            ->where(function ($query) use ($slug) {
                $query->where('slug', $slug);

                // Guard is_numeric: MySQL meng-cast string ke angka berdasarkan awalan
                // numeriknya, sehingga slug seperti "5-centimeters-per-second-volume-2"
                // dibaca sebagai id 5 dan salah membuka buku lain. Pencarian lewat id
                // hanya dilakukan bila parameter benar-benar berupa angka.
                if (is_numeric($slug)) {
                    $query->orWhere('id', $slug);
                }
            })
            ->first();

        if ($book && $book->publication_status !== PublicationStatus::Published) {
            abort(404);
        }

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

                BookViewLog::create([
                    'book_id' => $book->id,
                    'ip_address' => $ip,
                    'user_agent' => $ua,
                ]);
            }
        }

        $publishers = Cache::remember('home:publishers', 600, fn () => Publisher::orderBy('name')->get(['id', 'name', 'slug']));
        $storyStatuses = Cache::remember('home:story_statuses', 600, fn () => StoryStatus::orderBy('name')->get(['id', 'name', 'slug']));
        $genres = Cache::remember('home:genres', 600, fn () => Genre::orderBy('name')->get(['id', 'name', 'slug']));

        $totalBooksCount = Cache::remember('home:total_books', 300, fn () => Book::published()->count());
        $totalSeriesCount = Cache::remember('home:total_series', 300, fn () => BookSeries::count());
        $totalPublishersCount = Cache::remember('home:total_publishers', 300, fn () => Publisher::count());

        return Inertia::render('User/home', [
            'catalog' => $catalog->defaultPage(),
            'upcoming' => $catalog->upcoming(),
            'filters' => $catalog->filters(Request::create('/')),
            'publishers' => $publishers,
            'storyStatuses' => $storyStatuses,
            'genres' => $genres,
            'newsList' => Inertia::defer(fn () => Cache::remember(
                'home:news:v1',
                300,
                fn () => News::latest()->limit(50)->get()
            )),
            'relevantBooks' => Inertia::defer(function () use ($catalog) {
                $news = Cache::remember('home:news:v1', 300, fn () => News::latest()->limit(50)->get());

                return $catalog->cardsForNews($news);
            }),
            'totalBooksCount' => $totalBooksCount,
            'totalSeriesCount' => $totalSeriesCount,
            'totalPublishersCount' => $totalPublishersCount,
            'detailBooks' => $book ? $this->seriesBooks($book)->values() : [],
            'initialBook' => $book,
            'initialSlug' => $slug,
            'initialVolume' => $initialVolume,
            'meta' => [
                'title' => $book ? $book->title.' - Norinoya' : 'Katalog Buku - Norinoya',
                'description' => $book
                    ? Str::limit(strip_tags($book->synopsis ?? 'Lihat informasi lengkap dan detail buku komik di Norinoya.'), 160)
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
                $book = Book::published()->where('id', $cleanId)->first()
                    ?? Book::published()->where('series_id', $cleanId)->where('volume', $volume)->first();
            } else {
                $book = Book::published()->where('id', $cleanId)->first()
                    ?? Book::published()->where('series_id', $cleanId)->first();
            }
        }

        if (! $book) {
            $targetSlug = $slug ?: $id;
            $book = Book::published()->where('slug', $targetSlug)->first();
        }

        if (! $book && $volume) {
            $escaped = addcslashes($cleanId, '%_\\');
            $book = Book::published()->where('volume', $volume)
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

    private function findPublished(string $slug): ?Book
    {
        $book = Book::query()
            ->where(function ($query) use ($slug) {
                $query->where('slug', $slug);

                if (is_numeric($slug)) {
                    $query->orWhere('id', $slug);
                }
            })
            ->first();

        if (! $book || $book->publication_status !== PublicationStatus::Published) {
            return null;
        }

        return $book;
    }

    /**
     * Volume lain dalam seri yang sama, supaya pemilih volume di detail tetap lengkap.
     */
    private function seriesBooks(Book $book)
    {
        $query = Book::homeQuery()->orderBy('sort_order')->orderBy('id');

        if ($book->series_id) {
            return $query->where('series_id', $book->series_id)->limit(80)->get();
        }

        return $query->whereKey($book->id)->get();
    }
}
