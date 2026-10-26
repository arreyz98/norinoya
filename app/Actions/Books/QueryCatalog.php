<?php

namespace App\Actions\Books;

use App\Enums\AgeRating;
use App\Enums\BookType;
use App\Models\Book;
use App\Models\BookImage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class QueryCatalog
{
    public const PER_PAGE = 24;

    public const DEFAULT_PAGE_CACHE = 'catalog:page:v1';

    public const UPCOMING_CACHE = 'catalog:upcoming:v1';

    /**
     * @var array<string, string>
     */
    private const FORMAT_MAP = [
        'manga' => BookType::MANGA->value,
        'komik' => BookType::KOMIK->value,
        'komik_lokal' => BookType::KOMIK_LOKAL->value,
        'light_novel' => BookType::LIGHT_NOVEL->value,
        'novel' => BookType::NOVEL->value,
        'j_lit' => BookType::J_LIT->value,
    ];

    /**
     * @var list<string>
     */
    private const SORTS = [
        'relevan',
        'terbaru',
        'terpopuler',
        'harga_terendah',
        'harga_tertinggi',
        'alfabet_az',
        'alfabet_za',
    ];

    public function paginate(Request $request): LengthAwarePaginator
    {
        if ($this->isDefault($request)) {
            /** @var LengthAwarePaginator $page */
            $page = Cache::remember(self::DEFAULT_PAGE_CACHE, 120, fn () => $this->run($request));

            return $page;
        }

        return $this->run($request);
    }

    public function defaultPage(): LengthAwarePaginator
    {
        return $this->paginate(Request::create('/'));
    }

    /**
     * @return Collection<int, Book>
     */
    public function upcoming(): Collection
    {
        /** @var Collection<int, Book> $books */
        $books = Cache::remember(self::UPCOMING_CACHE, 120, function () {
            $books = Book::catalogQuery()
                ->where('is_upcoming', true)
                ->latest('updated_at')
                ->limit(6)
                ->get();

            $this->attachCoverImages($books);

            return $books;
        });

        return $books;
    }

    /**
     * @return array{q: string, sort: string, page: int, format: list<string>, publisher: list<string>, status: list<string>, genre: list<string>, adaptation: list<string>, rating: list<string>}
     */
    public function filters(Request $request): array
    {
        return [
            'q' => $this->term($request),
            'sort' => $this->sort($request),
            'page' => max(1, (int) $request->input('page', 1)),
            'format' => $this->list($request, 'format'),
            'publisher' => $this->list($request, 'publisher'),
            'status' => $this->list($request, 'status'),
            'genre' => $this->list($request, 'genre'),
            'adaptation' => $this->list($request, 'adaptation'),
            'rating' => $this->list($request, 'rating'),
        ];
    }

    /**
     * Kartu untuk id yang benar-benar dirujuk halaman lain.
     *
     * @param  list<int|string>  $ids
     * @return Collection<int, Book>
     */
    public function cardsForIds(array $ids, bool $withSynopsis = false): Collection
    {
        $ids = array_values(array_unique(array_filter(
            array_map(fn ($id) => is_numeric($id) ? (int) $id : 0, $ids),
            fn (int $id) => $id > 0
        )));

        if ($ids === []) {
            return new Collection;
        }

        $query = Book::catalogQuery()->whereIn('id', $ids);

        if ($withSynopsis) {
            $query->addSelect('synopsis');
        }

        $books = $query->get();
        $this->attachCoverImages($books);

        return $books;
    }

    /**
     * @param  iterable<int, mixed>  $newsItems
     * @return Collection<int, Book>
     */
    public function cardsForNews(iterable $newsItems): Collection
    {
        $ids = [];

        foreach ($newsItems as $item) {
            foreach ((array) ($item->relevant_books ?? []) as $id) {
                $ids[] = $id;
            }

            foreach ((array) ($item->recommendations ?? []) as $rec) {
                if (is_array($rec) && isset($rec['book_id'])) {
                    $ids[] = $rec['book_id'];
                }
            }
        }

        return $this->cardsForIds($ids, true);
    }

    /**
     * Bookmark menyimpan id komik berbentuk `series-{id}-vol-{volume}` atau `book-{id}-vol-{volume}`.
     *
     * @param  list<string>  $savedIds
     * @return Collection<int, Book>
     */
    public function cardsForBookmarks(array $savedIds): Collection
    {
        $bookIds = [];
        $seriesPairs = [];

        foreach (array_slice($savedIds, 0, 100) as $saved) {
            if (! is_string($saved)) {
                continue;
            }

            if (preg_match('/^book-(\d+)(?:-vol-.+)?$/', $saved, $match)) {
                $bookIds[] = (int) $match[1];

                continue;
            }

            if (preg_match('/^series-(\d+)-vol-(.+)$/', $saved, $match)) {
                $seriesPairs[] = [(int) $match[1], $match[2]];
            }
        }

        if ($bookIds === [] && $seriesPairs === []) {
            return new Collection;
        }

        $books = Book::catalogQuery()
            ->addSelect('synopsis')
            ->where(function (Builder $query) use ($bookIds, $seriesPairs) {
                if ($bookIds !== []) {
                    $query->orWhereIn('id', $bookIds);
                }

                foreach ($seriesPairs as [$seriesId, $volume]) {
                    $query->orWhere(function (Builder $inner) use ($seriesId, $volume) {
                        $inner->where('series_id', $seriesId)->where('volume', $volume);
                    });
                }
            })
            ->limit(100)
            ->get();

        $this->attachCoverImages($books);

        return $books;
    }

    /**
     * @param  Collection<int, Book>  $books
     */
    public function attachCoverImages(Collection $books): void
    {
        if ($books->isEmpty()) {
            return;
        }

        $covers = BookImage::query()
            ->whereIn('book_id', $books->modelKeys())
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'book_id', 'image_url', 'sort_order'])
            ->groupBy('book_id');

        foreach ($books as $book) {
            $cover = $covers->get($book->id)?->first();
            $book->setRelation('images', $cover ? new Collection([$cover]) : new Collection);
        }
    }

    private function run(Request $request): LengthAwarePaginator
    {
        $query = $this->filtered($request);
        $this->applySort($query, $request);

        $page = max(1, (int) $request->input('page', 1));

        $paginator = $query->paginate(self::PER_PAGE, ['*'], 'page', $page);
        $this->attachCoverImages($paginator->getCollection());

        return $paginator;
    }

    /**
     * @return Builder<Book>
     */
    private function filtered(Request $request): Builder
    {
        $query = Book::catalogQuery();
        $this->excludeUpcoming($query);

        $term = $this->term($request);

        if ($term !== '') {
            $like = '%'.addcslashes(mb_strtolower($term, 'UTF-8'), '%_\\').'%';
            $words = array_values(array_filter(preg_split('/\s+/u', mb_strtolower($term, 'UTF-8')) ?: []));

            $query->where(function (Builder $outer) use ($like, $words) {
                $outer->where(function (Builder $inner) use ($like) {
                    $this->whereTitleLike($inner, $like);
                });

                if (count($words) > 1) {
                    $outer->orWhere(function (Builder $all) use ($words) {
                        foreach ($words as $word) {
                            $wordLike = '%'.addcslashes($word, '%_\\').'%';
                            $all->where(function (Builder $inner) use ($wordLike) {
                                $this->whereTitleLike($inner, $wordLike);
                            });
                        }
                    });
                }
            });
        }

        $formats = array_values(array_filter(array_map(
            fn (string $key) => self::FORMAT_MAP[$key] ?? null,
            $this->list($request, 'format')
        )));

        if ($formats !== []) {
            $query->whereIn('book_type', $formats);
        }

        $publishers = array_values(array_filter(
            $this->list($request, 'publisher'),
            fn (string $id) => ctype_digit($id)
        ));

        if ($publishers !== []) {
            $query->whereIn('publisher_id', $publishers);
        }

        $statuses = array_values(array_filter(
            $this->list($request, 'status'),
            fn (string $id) => ctype_digit($id)
        ));

        if ($statuses !== []) {
            $query->whereIn('story_status_id', $statuses);
        }

        $genres = $this->list($request, 'genre');

        if ($genres !== []) {
            $query->whereHas('genres', function (Builder $genre) use ($genres) {
                $genre->where(function (Builder $inner) use ($genres) {
                    foreach ($genres as $name) {
                        $inner->orWhereRaw('LOWER(genres.name) = ?', [mb_strtolower($name, 'UTF-8')]);
                    }
                });
            });
        }

        $adaptations = $this->list($request, 'adaptation');

        if ($adaptations !== []) {
            $query->where(function (Builder $outer) use ($adaptations) {
                foreach ($adaptations as $adaptation) {
                    $outer->orWhere(function (Builder $inner) use ($adaptation) {
                        if ($adaptation === 'anime') {
                            $inner->whereRaw('LOWER(adaptation) LIKE ?', ['%anime%']);
                        } elseif ($adaptation === 'live_action') {
                            $inner->where(function (Builder $live) {
                                $live->whereRaw('LOWER(adaptation) LIKE ?', ['%live%'])
                                    ->orWhereRaw('LOWER(adaptation) LIKE ?', ['%action%']);
                            });
                        } elseif ($adaptation === 'manga') {
                            $inner->where(function (Builder $manga) {
                                $manga->whereRaw('LOWER(adaptation) LIKE ?', ['%manga%'])
                                    ->orWhereRaw('LOWER(adaptation) LIKE ?', ['%komik%'])
                                    ->orWhereRaw('LOWER(adaptation) LIKE ?', ['%manhwa%'])
                                    ->orWhereRaw('LOWER(adaptation) LIKE ?', ['%manhua%'])
                                    ->orWhere('book_type', BookType::MANGA->value);
                            });
                        }
                    });
                }
            });
        }

        $ratings = [];

        foreach ($this->list($request, 'rating') as $rating) {
            if ($rating === 'Dewasa') {
                $ratings[] = AgeRating::LIGHT_ADULT->value;
                $ratings[] = AgeRating::HEAVY_ADULT->value;
            } else {
                $ratings[] = $rating;
            }
        }

        $ratings = array_values(array_unique($ratings));

        if ($ratings !== []) {
            $query->whereIn('age_rating', $ratings);
        }

        return $query;
    }

    /**
     * Buku yang sudah tampil di section "Segera Rilis" tidak boleh muncul lagi di
     * grid katalog pada halaman yang sama. Daftar id diambil dari upcoming() yang
     * sudah di-cache, jadi tidak ada query tambahan yang berarti.
     *
     * Dipasang sebelum paginate() supaya total dan last_page ikut tersaring.
     *
     * @param  Builder<Book>  $query
     */
    private function excludeUpcoming(Builder $query): void
    {
        $ids = $this->upcoming()->pluck('id')->all();

        if ($ids !== []) {
            $query->whereNotIn('books.id', $ids);
        }
    }

    /**
     * @param  Builder<Book>  $query
     */
    private function whereTitleLike(Builder $query, string $like): void
    {
        $query->whereRaw('LOWER(books.title) LIKE ?', [$like])
            ->orWhereHas('series', function (Builder $series) use ($like) {
                $series->whereRaw('LOWER(title) LIKE ?', [$like]);
            });
    }

    /**
     * @param  Builder<Book>  $query
     */
    private function applySort(Builder $query, Request $request): void
    {
        $sort = $this->sort($request);
        $term = $this->term($request);

        if ($sort === 'relevan' && $term !== '') {
            $lower = mb_strtolower($term, 'UTF-8');
            $prefix = addcslashes($lower, '%_\\').'%';

            $query->orderByRaw(
                'CASE WHEN LOWER(books.title) = ? THEN 0 WHEN LOWER(books.title) LIKE ? THEN 1 ELSE 2 END',
                [$lower, $prefix]
            )->orderBy('title');

            return;
        }

        match ($sort) {
            // 'created_at' (kapan buku dibuat admin), bukan 'updated_at': kolom itu ikut
            // berubah saat buku diedit, status publikasi di-toggle, atau urutan volume
            // diubah, sehingga buku lama bisa naik ke atas tanpa alasan.
            'terbaru' => $query->latest('created_at')->orderByDesc('id'),
            'terpopuler' => $query->orderByDesc('views_count')->orderBy('title'),
            'harga_terendah' => $query->orderBy('msrp')->orderBy('title'),
            'harga_tertinggi' => $query->orderByDesc('msrp')->orderBy('title'),
            'alfabet_za' => $query->orderByDesc('title'),
            default => $query->orderBy('title'),
        };
    }

    private function isDefault(Request $request): bool
    {
        return $this->term($request) === ''
            && $this->sort($request) === 'relevan'
            && max(1, (int) $request->input('page', 1)) === 1
            && $this->list($request, 'format') === []
            && $this->list($request, 'publisher') === []
            && $this->list($request, 'status') === []
            && $this->list($request, 'genre') === []
            && $this->list($request, 'adaptation') === []
            && $this->list($request, 'rating') === [];
    }

    private function term(Request $request): string
    {
        $term = trim(preg_replace('/\s+/u', ' ', (string) $request->input('q', '')) ?? '');

        if (mb_strlen($term, 'UTF-8') > 100) {
            $term = mb_substr($term, 0, 100, 'UTF-8');
        }

        return $term;
    }

    private function sort(Request $request): string
    {
        $sort = (string) $request->input('sort', 'relevan');

        return in_array($sort, self::SORTS, true) ? $sort : 'relevan';
    }

    /**
     * @return list<string>
     */
    private function list(Request $request, string $key): array
    {
        $value = $request->input($key, []);

        if (is_string($value)) {
            $value = [$value];
        }

        if (! is_array($value)) {
            return [];
        }

        $items = [];

        foreach ($value as $item) {
            if (! is_scalar($item)) {
                continue;
            }

            $item = trim((string) $item);

            if ($item === '' || $item === 'all') {
                continue;
            }

            $items[] = $item;
        }

        return array_values(array_unique($items));
    }
}
