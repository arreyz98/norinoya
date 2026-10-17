<?php

use App\Models\Book;
use App\Models\BookImage;
use App\Models\Edition;
use App\Models\PanduanAdaptasi;
use App\Models\PanduanAdaptasiNode;
use App\Models\Publisher;
use App\Models\StoryStatus;
use Inertia\Testing\AssertableInertia as Assert;

/**
 * Helper: buat panduan adaptasi + node (+ buku dengan cover opsional).
 */
function createPanduanRecord(array $attributes = [], ?Book $book = null): PanduanAdaptasi
{
    $panduan = PanduanAdaptasi::create(array_merge([
        'title' => 'Solo Leveling',
        'slug' => 'solo-leveling',
        'description' => 'Panduan urutan nonton Solo Leveling.',
    ], $attributes));

    PanduanAdaptasiNode::create([
        'panduan_adaptasi_id' => $panduan->id,
        'book_id' => $book?->id,
        'title' => 'Season 1',
        'description' => 'Adaptasi bab awal.',
        'sort_order' => 1,
    ]);

    return $panduan;
}

/**
 * Helper: buat buku valid lengkap dengan cover.
 */
function createBookWithCover(string $coverUrl): Book
{
    $edition = Edition::create(['name' => 'Edisi Reguler', 'slug' => 'edisi-reguler']);
    $publisher = Publisher::create(['name' => 'Toko Buku', 'slug' => 'toko-buku']);
    $storyStatus = StoryStatus::create(['name' => 'Ongoing', 'slug' => 'ongoing']);

    $book = Book::create([
        'title' => 'Solo Leveling',
        'slug' => 'solo-leveling-vol-1',
        'volume' => '1',
        'edition_id' => $edition->id,
        'publisher_id' => $publisher->id,
        'story_status_id' => $storyStatus->id,
        'book_type' => 'Manga',
        'age_rating' => 'Remaja',
    ]);

    BookImage::create([
        'book_id' => $book->id,
        'image_url' => $coverUrl,
        'sort_order' => 1,
    ]);

    return $book->fresh(['images']);
}

it('mengirim meta SEO lengkap pada halaman detail panduan', function () {
    $panduan = createPanduanRecord();

    $this->get('/panduan-adaptasi/'.$panduan->slug)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/components/DetailPanduanAdaptasi')
            ->where('meta.title', 'Solo Leveling - Panduan Adaptasi Norinoya')
            ->where('meta.url', url('/panduan-adaptasi/solo-leveling'))
            ->where('meta.type', 'article')
            ->where('meta.image', url('/assets/images/logo-dark.png'))
            ->etc()
        );
});

it('memotong deskripsi meta maksimal 160 karakter (plus elipsis)', function () {
    $panduan = createPanduanRecord([
        'slug' => 'deskripsi-panjang',
        'description' => str_repeat('deskripsi sangat panjang ', 20),
    ]);

    $this->get('/panduan-adaptasi/'.$panduan->slug)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('meta.description', fn ($value) => mb_strlen($value) <= 163)
            ->etc()
        );
});

it('memakai deskripsi fallback saat kolom description kosong', function () {
    $panduan = createPanduanRecord(['slug' => 'tanpa-deskripsi', 'description' => null]);

    $this->get('/panduan-adaptasi/'.$panduan->slug)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('meta.description', fn ($value) => str_contains($value, 'Panduan nonton bertahap'))
            ->etc()
        );
});

it('memakai cover buku sebagai og:image bila tersedia', function () {
    $book = createBookWithCover('storage/covers/solo-leveling.webp');
    $panduan = createPanduanRecord(['slug' => 'dengan-cover'], $book);

    $this->get('/panduan-adaptasi/'.$panduan->slug)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('meta.image', url('storage/covers/solo-leveling.webp'))
            ->etc()
        );
});

it('mempertahankan url absolut pada cover eksternal', function () {
    $external = 'https://pix.toco.id/resize/w:700/sample.webp';
    $book = createBookWithCover($external);
    $panduan = createPanduanRecord(['slug' => 'cover-eksternal'], $book);

    $this->get('/panduan-adaptasi/'.$panduan->slug)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->where('meta.image', $external)
            ->etc()
        );
});

it('mengirim meta SEO pada halaman index panduan', function () {
    createPanduanRecord();

    $this->get('/panduan-adaptasi')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/panduanAdaptasi')
            ->where('meta.title', 'Panduan Adaptasi - Norinoya')
            ->where('meta.url', url('/panduan-adaptasi'))
            ->where('meta.type', 'website')
            ->where('meta.image', url('/assets/images/logo-dark.png'))
            ->etc()
        );
});

it('mengembalikan 404 untuk slug panduan yang tidak ada', function () {
    $this->get('/panduan-adaptasi/panduan-yang-tidak-ada')->assertNotFound();
});
