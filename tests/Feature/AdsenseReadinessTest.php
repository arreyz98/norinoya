<?php

use App\Models\News;
use Illuminate\Support\Facades\Cache;

it('menampilkan kebijakan privasi beserta cookie iklan google', function () {
    $this->get(route('legal.privacy'))
        ->assertOk()
        ->assertSee('Kebijakan Privasi', false)
        ->assertSee('cookie iklan Google', false);
});

it('menampilkan email kontak publik', function () {
    $this->get(route('legal.contact'))
        ->assertOk()
        ->assertSee('norinoya.official@gmail.com', false);
});

it('menyertakan id penerbit di ads.txt dan sitemap', function () {
    expect(file_get_contents(public_path('ads.txt')))
        ->toContain('pub-9645427304493061');

    Cache::forget('sitemap:xml:v3');

    $this->get(route('sitemap'))
        ->assertOk()
        ->assertSee('/privasi', false)
        ->assertSee('/kontak', false);
});

it('tidak menampilkan placeholder iklan adsense di detail berita', function () {
    $news = News::create([
        'title' => 'Berita Tanpa Placeholder Iklan',
        'content' => 'Isi berita untuk memastikan placeholder iklan sudah dihapus.',
        'category' => 'rilisan',
    ]);

    $this->get(route('news.detail', $news->slug))
        ->assertOk()
        ->assertDontSee('SPONSORED ADSENSE', false);
});
