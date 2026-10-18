<?php

use App\Enums\AgeRating;
use App\Enums\BookType;
use App\Enums\PublicationStatus;
use App\Models\Book;
use App\Models\BookImage;
use App\Models\Edition;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\StoryStatus;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();

    $this->edition = Edition::create(['name' => 'Standard', 'slug' => 'standard']);
    $this->publisher = Publisher::create(['name' => 'Penerbit Utama', 'slug' => 'penerbit-utama']);
    $this->otherPublisher = Publisher::create(['name' => 'Penerbit Lain', 'slug' => 'penerbit-lain']);
    $this->status = StoryStatus::create(['name' => 'Ongoing', 'slug' => 'ongoing']);
    $this->genre = Genre::create(['name' => 'Action', 'slug' => 'action']);
});

function makePublishedBook(array $overrides = []): Book
{
    $book = Book::create(array_merge([
        'title' => 'Buku',
        'slug' => 'buku-'.uniqid(),
        'publication_status' => PublicationStatus::Published,
        'volume' => '1',
        'edition_id' => test()->edition->id,
        'book_type' => BookType::MANGA->value,
        'story_status_id' => test()->status->id,
        'age_rating' => AgeRating::TEEN->value,
        'publisher_id' => test()->publisher->id,
        'synopsis' => 'Sinopsis yang tidak boleh ikut ke kartu katalog.',
        'msrp' => 50000,
    ], $overrides));

    return $book;
}

test('beranda mengirim 24 kartu tanpa sinopsis dan menyembunyikan draf', function () {
    foreach (range(1, 25) as $n) {
        makePublishedBook([
            'title' => sprintf('Katalog %02d', $n),
            'slug' => sprintf('katalog-%02d', $n),
        ]);
    }

    BookImage::create([
        'book_id' => Book::where('slug', 'katalog-01')->first()->id,
        'image_url' => '/covers/katalog-01.jpg',
        'sort_order' => 1,
    ]);
    BookImage::create([
        'book_id' => Book::where('slug', 'katalog-01')->first()->id,
        'image_url' => '/covers/katalog-01-extra.jpg',
        'sort_order' => 2,
    ]);

    makePublishedBook([
        'title' => 'Hanya Action',
        'slug' => 'hanya-action',
    ])->genres()->attach(test()->genre->id);

    Book::create([
        'title' => 'Masih Draf',
        'slug' => 'masih-draf',
        'publication_status' => PublicationStatus::Draft,
        'synopsis' => 'Draf tidak boleh tampil.',
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/home')
            ->has('catalog.data', 24)
            ->where('catalog.per_page', 24)
            ->where('catalog.last_page', 2)
            ->where('catalog.total', 26)
            ->where('catalog.data.0.title', 'Hanya Action')
            ->missing('books')
            ->where('catalog.data', function ($books) {
                $card = collect($books)->firstWhere('slug', 'katalog-01');

                expect($card)->not->toHaveKey('synopsis')
                    ->and($card)->not->toHaveKey('tiktok_embeds')
                    ->and($card['images'])->toHaveCount(1)
                    ->and($card['images'][0]['image_url'])->toBe('/covers/katalog-01.jpg')
                    ->and(collect($books)->pluck('slug'))->not->toContain('masih-draf');

                return true;
            })
        );
});

test('halaman kedua dan filter penerbit serta genre dihitung di server', function () {
    foreach (range(1, 25) as $n) {
        makePublishedBook([
            'title' => sprintf('Katalog %02d', $n),
            'slug' => sprintf('katalog-%02d', $n),
        ]);
    }

    $other = makePublishedBook([
        'title' => 'Buku Penerbit Lain',
        'slug' => 'buku-penerbit-lain',
        'publisher_id' => test()->otherPublisher->id,
    ]);
    $other->genres()->attach(test()->genre->id);

    $this->get(route('home', ['page' => 2]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('catalog.current_page', 2)
            ->has('catalog.data', 2)
            ->where('catalog.total', 26)
        );

    $this->get(route('home', ['publisher' => [test()->otherPublisher->id]]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('catalog.data', 1)
            ->where('catalog.data.0.slug', 'buku-penerbit-lain')
            ->where('catalog.total', 1)
        );

    $this->get(route('home', ['genre' => ['Action']]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('catalog.data', 1)
            ->where('catalog.data.0.slug', 'buku-penerbit-lain')
        );
});

test('detail buku tidak memuat katalog penuh dan data satu seri menyertakan sinopsis', function () {
    foreach (range(1, 25) as $n) {
        makePublishedBook([
            'title' => sprintf('Katalog %02d', $n),
            'slug' => sprintf('katalog-%02d', $n),
        ]);
    }

    $book = Book::where('slug', 'katalog-01')->first();

    $this->get(route('book.detail', $book->slug))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('catalog.data', 24)
            ->where('catalog.per_page', 24)
            ->missing('books')
            ->where('initialBook.synopsis', 'Sinopsis yang tidak boleh ikut ke kartu katalog.')
            ->has('detailBooks', 1)
            ->where('detailBooks.0.synopsis', 'Sinopsis yang tidak boleh ikut ke kartu katalog.')
        );

    $this->getJson(route('book.data', $book->slug))
        ->assertOk()
        ->assertJsonPath('books.0.synopsis', 'Sinopsis yang tidak boleh ikut ke kartu katalog.')
        ->assertJsonCount(0, 'books.0.tiktok_embeds');

    $this->getJson(route('book.data', 'masih-draf'))->assertNotFound();
});
