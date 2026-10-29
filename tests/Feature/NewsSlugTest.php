<?php

use App\Models\News;
use Inertia\Testing\AssertableInertia as Assert;

function createNewsRecord(array $attributes = []): News
{
    return News::create(array_merge([
        'title' => 'Rilisan Manga Terbaru Oktober',
        'content' => 'Konten berita untuk pengujian.',
        'category' => 'rilisan',
    ], $attributes));
}

it('membuat slug bersih dari judul tanpa suffix acak', function () {
    $news = createNewsRecord();

    expect($news->slug)->toBe('rilisan-manga-terbaru-oktober');
});

it('menambah suffix angka saat judul duplikat', function () {
    createNewsRecord();
    $second = createNewsRecord();

    expect($second->slug)->toBe('rilisan-manga-terbaru-oktober-2');
});

it('memberi prefix berita pada judul yang murni angka', function () {
    $news = createNewsRecord(['title' => '12345']);

    expect($news->slug)->toBe('berita-12345');
});

it('menampilkan berita lewat url slug', function () {
    $news = createNewsRecord();

    $this->get("/news/{$news->slug}")
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/news')
            ->where('initialNews.slug', $news->slug)
        );
});

it('mengalihkan url lama berbasis id ke slug kanonik', function () {
    $news = createNewsRecord();

    $this->get("/news/{$news->id}")
        ->assertStatus(301)
        ->assertRedirect("/news/{$news->slug}");
});

it('mengalihkan slug lama ke slug terbaru', function () {
    $news = createNewsRecord();
    $oldSlug = $news->slug;

    $news->rememberOldSlug($oldSlug);
    $news->slug = News::makeUniqueSlug('Judul Baru Setelah Diedit', $news->id);
    $news->save();

    expect($news->slug)->toBe('judul-baru-setelah-diedit');

    $this->get("/news/{$oldSlug}")
        ->assertStatus(301)
        ->assertRedirect("/news/{$news->slug}");
});

it('mengembalikan 404 untuk berita yang tidak ada', function () {
    $this->get('/news/berita-yang-tidak-pernah-ada')->assertNotFound();
});

it('menaruh judul dan kalimat isi berita di html pertama', function () {
    $sentence = 'Kalimat unik untuk mesin pencari tentang cetak ulang manga.';
    $news = createNewsRecord([
        'title' => 'Cetak Ulang Manga Musim Gugur',
        'content' => '<p>Pengantar singkat.</p><p>'.$sentence.'</p>',
        'display_name' => 'Redaksi Norinoya',
    ]);

    $html = $this->get("/news/{$news->slug}")
        ->assertOk()
        ->getContent();

    $canonical = url("/news/{$news->slug}");

    expect($html)->toContain('Cetak Ulang Manga Musim Gugur')
        ->and($html)->toContain($sentence)
        ->and($html)->toContain('NewsArticle')
        ->and($html)->toContain('dateModified')
        ->and($html)->toContain($canonical)
        ->and($html)->toContain('id="server-news-article"');

    preg_match('/<meta name="description" content="([^"]*)"/', $html, $description);

    expect($description[1] ?? '')->toContain('Kalimat unik untuk mesin pencari')
        ->and($description[1] ?? '')->not->toContain('<')
        ->and($description[1] ?? '')->not->toContain('&lt;');
});
