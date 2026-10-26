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

        if (! $book) {
            // Referensi lama berbasis id internal (/buku/series-12, /buku/book-7)
            // dialihkan permanen ke slug publik supaya tidak jadi soft 404.
            if ($legacy = $this->resolveLegacyRef($slug)) {
                return redirect()->to(url("/buku/{$legacy->slug}"), 301);
            }

            abort(404);
        }

        if ($book->publication_status !== PublicationStatus::Published) {
            abort(404);
        }

        $requestedVolume = $request->query('vol', null);
        $initialVolume = $requestedVolume
            ? $requestedVolume
            : $book->volume;

        // Volume lain dalam seri yang sama — dipakai pemilih volume sekaligus sumber SEO.
        $detailBooks = $this->seriesBooks($book);

        // Bila URL memakai slug volume lain + ?vol=N, konten & canonical harus ikut volume itu.
        $seoBook = $book;
        if ($requestedVolume !== null) {
            $seoBook = $detailBooks->first(fn (Book $item) => (string) $item->volume === (string) $requestedVolume)
                ?? $book;
        }

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
            'detailBooks' => $detailBooks->values(),
            'initialBook' => $book,
            'initialSlug' => $slug,
            'initialVolume' => $initialVolume,
            'meta' => [
                'title' => $this->seoTitle($seoBook),
                'description' => $this->seoDescription($seoBook),
                'image' => $this->seoImage($seoBook) ?? url('/favicon.png'),
                'url' => url("/buku/{$seoBook->slug}"),
                'type' => 'book',
                'schema' => $this->seoSchema($seoBook),
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
     * Referensi lama berbasis id internal: /buku/book-12 atau /buku/series-3(-vol-2).
     * Dipakai untuk redirect 301 ke slug publik, bukan untuk merender halaman.
     */
    private function resolveLegacyRef(string $slug): ?Book
    {
        if (preg_match('/^book-(\d+)$/', $slug, $matches)) {
            return Book::published()->whereKey((int) $matches[1])->first();
        }

        if (preg_match('/^series-(\d+)(?:-vol-(.+))?$/', $slug, $matches)) {
            $base = Book::published()->where('series_id', (int) $matches[1]);
            $volume = trim((string) ($matches[2] ?? ''));

            if ($volume !== '') {
                $exact = (clone $base)->where('volume', $volume)->first();

                if ($exact) {
                    return $exact;
                }
            }

            return $base->orderBy('sort_order')->orderBy('id')->first();
        }

        return null;
    }

    /**
     * Nama buku lengkap dengan volume, dipakai untuk title & structured data.
     * Volume tidak disisipkan lagi kalau judulnya sudah memuatnya.
     */
    private function seoBookName(Book $book): string
    {
        $title = trim((string) $book->title);
        $volume = trim((string) $book->volume);

        if ($volume === '') {
            return $title;
        }

        $alreadyMentioned = preg_match(
            '/\bvol(?:ume)?\.?\s*'.preg_quote($volume, '/').'\b/iu',
            $title
        ) === 1;

        if ($alreadyMentioned) {
            return $title;
        }

        return is_numeric($volume)
            ? $title.' Vol. '.$volume
            : $title.' ('.$volume.')';
    }

    private function seoTitle(Book $book): string
    {
        // 48 + 3 + 9 (" - Norinoya") = 60 karakter, batas aman tampilan SERP.
        return Str::limit($this->seoBookName($book), 48, '…').' - Norinoya';
    }

    private function seoDescription(Book $book): string
    {
        $name = $this->seoBookName($book);
        $synopsis = $this->cleanSynopsis($book);

        if ($synopsis === '') {
            $synopsis = 'Informasi lengkap, sinopsis, penerbit, dan link pembelian '.$name.' di Norinoya.';
        }

        return Str::limit($name.': '.$synopsis, 157);
    }

    private function cleanSynopsis(Book $book): string
    {
        $plain = html_entity_decode(
            strip_tags((string) $book->synopsis),
            ENT_QUOTES | ENT_HTML5,
            'UTF-8'
        );

        return trim(preg_replace('/\s+/u', ' ', $plain) ?? '');
    }

    private function seoImage(Book $book): ?string
    {
        $image = $book->images->first()?->image_url;

        if (! $image) {
            return null;
        }

        return Str::startsWith($image, ['http://', 'https://']) ? $image : url($image);
    }

    /**
     * Structured data Book + BreadcrumbList yang dirender langsung dari blade,
     * supaya tetap terbaca meski konten halaman di-render di klien.
     *
     * @return array<string, mixed>
     */
    private function seoSchema(Book $book): array
    {
        $book->loadMissing(['authors', 'genres']);

        $url = url("/buku/{$book->slug}");
        $name = $this->seoBookName($book);
        $volume = trim((string) $book->volume);
        $author = $book->authors->first()?->name;
        $genres = $book->genres->pluck('name')->take(3)->implode(', ');
        $pages = (int) ($book->page_count ?? 0);

        $bookNode = array_filter([
            '@type' => 'Book',
            '@id' => $url.'#book',
            'name' => $name,
            'url' => $url,
            'inLanguage' => 'id',
            'image' => $this->seoImage($book),
            'isbn' => $book->isbn ?: null,
            'numberOfPages' => $pages > 0 ? $pages : null,
            'bookEdition' => $volume !== '' ? 'Volume '.$volume : null,
            'author' => $author ? ['@type' => 'Person', 'name' => $author] : null,
            'publisher' => $book->publisher?->name
                ? ['@type' => 'Organization', 'name' => $book->publisher->name]
                : null,
            'genre' => $genres !== '' ? $genres : null,
            'description' => $this->cleanSynopsis($book) ?: null,
        ], static fn ($value) => $value !== null && $value !== '');

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                $bookNode,
                [
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => [
                        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => url('/')],
                        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Katalog Buku', 'item' => url('/')],
                        ['@type' => 'ListItem', 'position' => 3, 'name' => $name, 'item' => $url],
                    ],
                ],
            ],
        ];
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
