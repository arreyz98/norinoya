<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\KiosItem;
use App\Models\News;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $xml = Cache::remember('sitemap:xml:v1', 3600, function () {
            $base = rtrim(config('app.url'), '/');

            $urls = [];

            // Static routes
            $static = [
                ['loc' => $base.'/', 'priority' => '1.0', 'freq' => 'daily'],
                ['loc' => $base.'/news', 'priority' => '0.8', 'freq' => 'daily'],
                ['loc' => $base.'/kios', 'priority' => '0.8', 'freq' => 'daily'],
            ];
            foreach ($static as $s) {
                $urls[] = $this->urlEntry($s['loc'], now()->toAtomString(), $s['freq'], $s['priority']);
            }

            // Books — each volume is a distinct sitemap entry via /buku/{slug}?vol= but canonical is per book slug.
            // We emit one URL per unique slug to avoid duplicate content; volume is handled via canonical.
            $books = Book::query()
                ->select(['id', 'slug', 'updated_at'])
                ->whereNotNull('slug')
                ->where('slug', '!=', '')
                ->orderByDesc('updated_at')
                ->limit(5000)
                ->get();

            foreach ($books as $book) {
                $loc = $base.'/buku/'.$book->slug;
                $lastmod = $book->updated_at ? $book->updated_at->toAtomString() : now()->toAtomString();
                $urls[] = $this->urlEntry($loc, $lastmod, 'weekly', '0.9');
            }

            // News
            $newsList = News::query()
                ->select(['id', 'slug', 'updated_at'])
                ->whereNotNull('slug')
                ->where('slug', '!=', '')
                ->orderByDesc('updated_at')
                ->limit(2000)
                ->get();

            foreach ($newsList as $news) {
                $loc = $base.'/news/'.$news->slug;
                $lastmod = $news->updated_at ? $news->updated_at->toAtomString() : now()->toAtomString();
                $urls[] = $this->urlEntry($loc, $lastmod, 'weekly', '0.7');
            }

            // Kios
            $kiosList = KiosItem::query()
                ->select(['id', 'slug', 'updated_at'])
                ->whereNotNull('slug')
                ->where('slug', '!=', '')
                ->orderByDesc('updated_at')
                ->limit(2000)
                ->get();

            foreach ($kiosList as $item) {
                $loc = $base.'/kios/'.$item->slug;
                $lastmod = $item->updated_at ? $item->updated_at->toAtomString() : now()->toAtomString();
                $urls[] = $this->urlEntry($loc, $lastmod, 'weekly', '0.7');
            }

            $body = implode("\n", $urls);

            return <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{$body}
</urlset>
XML;
        });

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }

    private function urlEntry(string $loc, string $lastmod, string $freq, string $priority): string
    {
        $loc = e($loc);

        return "  <url><loc>{$loc}</loc><lastmod>{$lastmod}</lastmod><changefreq>{$freq}</changefreq><priority>{$priority}</priority></url>";
    }
}
