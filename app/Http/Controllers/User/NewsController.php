<?php

namespace App\Http\Controllers\User;

use App\Actions\Books\QueryCatalog;
use App\Http\Controllers\Controller;
use App\Models\KiosItem;
use App\Models\News;
use App\Models\NewsViewLog;
use App\Models\SearchLogNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function index()
    {
        $newsList = Cache::remember('news:list:v3', 300, fn () => News::published()->latest()->limit(80)->get());
        $kiosItems = Cache::remember('news:kios_items', 300, fn () => KiosItem::with(['kiosPartner:id,name,slug', 'linkedBook:id,title'])->available()->latest()->limit(40)->get());
        $books = app(QueryCatalog::class)->cardsForNews($newsList);
        $totalNewsCount = Cache::remember('news:total:v2', 300, fn () => News::published()->count());

        return Inertia::render('User/news', [
            'newsList' => $newsList,
            'books' => $books,
            'kiosItems' => Inertia::defer(fn () => $kiosItems),
            'totalNewsCount' => $totalNewsCount,
            'meta' => [
                'title' => 'Berita &amp; Update - Norinoya',
                'description' => 'Baca update berita dan artikel terbaru seputar manga, anime, dan pop culture di Norinoya.',
                'image' => url('/favicon.png'),
                'url' => url('/news'),
                'type' => 'website',
            ],
        ]);
    }

    public function show(Request $request, $slug)
    {
        // Prioritas: slug aktif -> slug lama -> ID numerik (URL lama).
        // Draft tidak boleh bisa diakses lewat URL publik mana pun.
        $news = News::findPublishedBySlugOrHistory($slug);

        if (! $news && ctype_digit((string) $slug)) {
            $news = News::published()->find((int) $slug);

            if ($news) {
                return redirect()->route('news.detail', $this->canonicalParams($request, $news->slug), 301);
            }
        }

        if (! $news) {
            abort(404);
        }

        // URL lama (ID atau slug lama) diarahkan permanen ke slug kanonik.
        if ($news->slug !== $slug) {
            return redirect()->route('news.detail', $this->canonicalParams($request, $news->slug), 301);
        }

        $ip = $request->ip();
        $ua = $request->userAgent();
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = NewsViewLog::where('news_id', $news->id)
            ->where('ip_address', $ip)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (! $alreadyLogged) {
            $news->increment('views_count');

            NewsViewLog::create([
                'news_id' => $news->id,
                'ip_address' => $ip,
                'user_agent' => $ua,
            ]);
        }

        $newsList = News::published()->latest()->get();
        $kiosItems = KiosItem::with(['kiosPartner', 'linkedBook'])->available()->latest()->get();
        $books = app(QueryCatalog::class)->cardsForNews(collect([$news])->merge($newsList));

        $totalNewsCount = News::published()->count();
        $description = $this->newsExcerpt($news->content);
        $image = $this->absoluteNewsImage($news->attached_image);
        $url = url("/news/{$news->slug}");

        return Inertia::render('User/news', [
            'newsList' => $newsList,
            'books' => $books,
            'kiosItems' => $kiosItems,
            'initialNews' => $news,
            'initialSlug' => $slug,
            'totalNewsCount' => $totalNewsCount,
            'meta' => [
                'title' => $news->title.' - Norinoya News',
                'description' => $description,
                'image' => $image,
                'url' => $url,
                'type' => 'article',
                'schema' => $this->newsSchema($news, $description, $image, $url),
                'article' => [
                    'title' => $news->title,
                    'published_at' => $news->created_at?->toAtomString(),
                    'content' => $news->content ?? '',
                ],
            ],
        ]);
    }

    /**
     * Parameter redirect kanonik: slug baru + query string asli (kecuali slug).
     */
    protected function canonicalParams(Request $request, string $slug): array
    {
        $query = $request->query();
        unset($query['slug']);

        return array_merge($query, ['slug' => $slug]);
    }

    public function incrementView(Request $request, $id)
    {
        $cleanId = preg_replace('/^news-/', '', $id);
        $slug = $request->input('slug');

        $news = null;
        if (is_numeric($cleanId)) {
            $news = News::published()->where('id', $cleanId)->first();
        }

        if (! $news) {
            $targetSlug = $slug ?: $id;
            $news = News::published()->where('slug', $targetSlug)->first();

            // Fallback lewat id HANYA bila parameternya benar-benar angka. MySQL
            // meng-cast string ke angka dari awalan numeriknya, sehingga slug
            // seperti "5-hal-seru-..." bisa salah cocok ke news id 5.
            if (! $news && is_numeric($id)) {
                $news = News::published()->where('id', $id)->first();
            }
        }

        if ($news) {
            $ip = $request->ip();
            $ua = $request->userAgent();
            $oneMinuteAgo = now()->subMinute();

            $alreadyLogged = NewsViewLog::where('news_id', $news->id)
                ->where('ip_address', $ip)
                ->where('created_at', '>=', $oneMinuteAgo)
                ->exists();

            if (! $alreadyLogged) {
                $news->increment('views_count');

                NewsViewLog::create([
                    'news_id' => $news->id,
                    'ip_address' => $ip,
                    'user_agent' => $ua,
                ]);
            }

            return response()->json([
                'success' => true,
                'news_id' => $news->id,
                'views_count' => (int) $news->views_count,
                'is_new_view' => ! $alreadyLogged,
            ]);
        }

        return response()->json(['success' => false, 'message' => 'News not found'], 404);
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

        $log = SearchLogNews::firstOrCreate(
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

    /**
     * Cuplikan meta: buang tag, rapikan spasi, potong di batas kata.
     */
    private function newsExcerpt(?string $html): string
    {
        $fallback = 'Baca update berita dan artikel terbaru di Norinoya News.';
        $text = html_entity_decode(strip_tags(str_replace('<', ' <', (string) $html)), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = trim((string) preg_replace('/\s+/u', ' ', $text));

        if ($text === '') {
            return $fallback;
        }

        if (mb_strlen($text) <= 155) {
            return $text;
        }

        $cut = mb_substr($text, 0, 155);
        $space = mb_strrpos($cut, ' ');

        if ($space !== false && $space > 80) {
            $cut = mb_substr($cut, 0, $space);
        }

        return rtrim($cut, " \t\n\r\0\x0B.,;:!?\"'").'…';
    }

    private function absoluteNewsImage(?string $image): string
    {
        if (! $image) {
            return url('/favicon.png');
        }

        if (Str::startsWith($image, ['http://', 'https://'])) {
            return $image;
        }

        return url($image);
    }

    /**
     * @return array<string, mixed>
     */
    private function newsSchema(News $news, string $description, string $image, string $url): array
    {
        $authorName = trim((string) ($news->display_name ?: $news->username));
        $published = $news->created_at?->toAtomString();
        $modified = $news->updated_at?->toAtomString() ?? $published;

        $article = array_filter([
            '@type' => 'NewsArticle',
            '@id' => $url.'#article',
            'headline' => $news->title,
            'description' => $description,
            'inLanguage' => 'id',
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $url,
            ],
            'datePublished' => $published,
            'dateModified' => $modified,
            'image' => [$image],
            'articleSection' => $news->category,
            'author' => $authorName !== '' ? ['@type' => 'Person', 'name' => $authorName] : null,
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'Norinoya',
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => url('/assets/images/logo-dark.png'),
                ],
            ],
        ], static fn ($value) => $value !== null && $value !== '');

        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                $article,
                [
                    '@type' => 'BreadcrumbList',
                    'itemListElement' => [
                        ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => url('/')],
                        ['@type' => 'ListItem', 'position' => 2, 'name' => 'Berita', 'item' => url('/news')],
                        ['@type' => 'ListItem', 'position' => 3, 'name' => $news->title, 'item' => $url],
                    ],
                ],
            ],
        ];
    }
}
