<?php

use App\Enums\AgeRating;
use App\Enums\BookType;
use App\Enums\PublicationStatus;
use App\Models\Book;
use App\Models\Edition;
use App\Models\Publisher;
use App\Models\StoryStatus;
use App\Models\User;

beforeEach(function () {
    $this->withoutVite();
    $this->actingAs(User::factory()->create());

    $this->edition = Edition::create(['name' => 'Standard', 'slug' => 'standard']);
    $this->publisher = Publisher::create(['name' => 'Test Publisher', 'slug' => 'test-publisher']);
    $this->status = StoryStatus::create(['name' => 'Ongoing', 'slug' => 'ongoing']);

    $this->publishedPayload = [
        'title' => 'Buku Terbit',
        'publication_status' => PublicationStatus::Published->value,
        'series_id' => null,
        'volume' => '1',
        'edition_id' => $this->edition->id,
        'book_type' => BookType::MANGA->value,
        'story_status_id' => $this->status->id,
        'age_rating' => AgeRating::TEEN->value,
        'publisher_id' => $this->publisher->id,
        'synopsis' => 'Sinopsis lengkap.',
        'msrp' => 50000,
    ];
});

test('menyimpan draf hanya dengan judul', function () {
    $this->post(route('admin.books.store'), [
        'title' => 'Draf Judul Saja',
        'publication_status' => PublicationStatus::Draft->value,
    ])->assertSessionHasNoErrors()->assertRedirect(route('admin.books.index'));

    $book = Book::query()->sole();

    expect($book->publication_status)->toBe(PublicationStatus::Draft)
        ->and($book->volume)->toBeNull()
        ->and($book->slug)->toBe('draf-judul-saja');
});

test('menolak terbit bila data wajib belum lengkap', function () {
    $this->post(route('admin.books.store'), [
        'title' => 'Belum Lengkap',
        'publication_status' => PublicationStatus::Published->value,
    ])->assertSessionHasErrors(['volume', 'edition_id', 'book_type', 'story_status_id', 'age_rating', 'publisher_id', 'synopsis', 'msrp']);

    expect(Book::query()->count())->toBe(0);
});

test('buku terbit tampil di publik dan draf mengembalikan 404', function () {
    $this->post(route('admin.books.store'), $this->publishedPayload)
        ->assertSessionHasNoErrors();

    $published = Book::query()->sole();

    $draft = Book::create([
        'title' => 'Masih Draf',
        'slug' => 'masih-draf',
        'publication_status' => PublicationStatus::Draft,
    ]);

    $this->get(route('book.detail', $published->slug))->assertOk();
    $this->get(route('book.detail', $draft->slug))->assertNotFound();

    expect(Book::homeQuery()->pluck('id')->all())->toBe([$published->id]);

    $sitemap = $this->get(route('sitemap'))->assertOk()->getContent();

    expect($sitemap)->toContain('/buku/'.$published->slug)
        ->and($sitemap)->not->toContain('/buku/'.$draft->slug);
});

test('buku yang sudah ada tetap dianggap terbit', function () {
    $book = Book::create([
        'title' => 'Buku Lama',
        'slug' => 'buku-lama',
        'volume' => '1',
        'edition_id' => $this->edition->id,
        'book_type' => BookType::MANGA->value,
        'story_status_id' => $this->status->id,
        'age_rating' => AgeRating::TEEN->value,
        'publisher_id' => $this->publisher->id,
        'synopsis' => 'Sudah ada.',
        'msrp' => 10000,
    ]);

    expect($book->fresh()->publication_status)->toBe(PublicationStatus::Published);
    $this->get(route('book.detail', $book->slug))->assertOk();
});

test('aksi tabel menolak terbit bila data belum lengkap dan bisa mengembalikan buku terbit ke draf', function () {
    $draft = Book::create([
        'title' => 'Draf Kosong',
        'slug' => 'draf-kosong',
        'publication_status' => PublicationStatus::Draft,
    ]);

    $this->patch(route('admin.books.publication.update', $draft), [
        'publication_status' => PublicationStatus::Published->value,
    ])->assertRedirect()->assertSessionHas('error');

    expect($draft->fresh()->publication_status)->toBe(PublicationStatus::Draft);

    $published = Book::create(array_merge($this->publishedPayload, [
        'title' => 'Siap Ditarik',
        'slug' => 'siap-ditarik',
        'volume' => '2',
    ]));

    $this->patch(route('admin.books.publication.update', $published), [
        'publication_status' => PublicationStatus::Draft->value,
    ])->assertRedirect()->assertSessionHas('success');

    expect($published->fresh()->publication_status)->toBe(PublicationStatus::Draft);
    $this->get(route('book.detail', 'siap-ditarik'))->assertNotFound();

    $this->patch(route('admin.books.publication.update', $published), [
        'publication_status' => PublicationStatus::Published->value,
    ])->assertRedirect()->assertSessionHas('success');

    expect($published->fresh()->isPublished())->toBeTrue();
    $this->get(route('book.detail', 'siap-ditarik'))->assertOk();
});
