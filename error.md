# Error - Internal Server Error

Call to undefined function homeBookQuery()

PHP 8.2.33
Laravel 12.64.0
norinoya.com

## Stack Trace

0 - laravel-serializable-closure://function () {
    $books = \Illuminate\Support\Facades\Cache::remember(&#039;home:books:v2&#039;, 300, fn () =&gt; \homeBookQuery()
        -&gt;latest(&#039;updated_at&#039;)
        -&gt;limit(300)
        -&gt;get());

    $publishers = \Illuminate\Support\Facades\Cache::remember(&#039;home:publishers&#039;, 600, fn () =&gt; \App\Models\Publisher::orderBy(&#039;name&#039;)-&gt;get([&#039;id&#039;, &#039;name&#039;, &#039;slug&#039;]));
    $storyStatuses = \Illuminate\Support\Facades\Cache::remember(&#039;home:story_statuses&#039;, 600, fn () =&gt; \App\Models\StoryStatus::orderBy(&#039;name&#039;)-&gt;get([&#039;id&#039;, &#039;name&#039;, &#039;slug&#039;]));
    $genres = \Illuminate\Support\Facades\Cache::remember(&#039;home:genres&#039;, 600, fn () =&gt; \App\Models\Genre::orderBy(&#039;name&#039;)-&gt;get([&#039;id&#039;, &#039;name&#039;, &#039;slug&#039;]));

    $totalBooksCount = \Illuminate\Support\Facades\Cache::remember(&#039;home:total_books&#039;, 300, fn () =&gt; \App\Models\Book::count());
    $totalSeriesCount = \Illuminate\Support\Facades\Cache::remember(&#039;home:total_series&#039;, 300, fn () =&gt; \App\Models\BookSeries::count());
    $totalPublishersCount = \Illuminate\Support\Facades\Cache::remember(&#039;home:total_publishers&#039;, 300, fn () =&gt; \App\Models\Publisher::count());

    return \Inertia\Inertia::render(&#039;User/home&#039;, [
        &#039;books&#039; =&gt; $books,
        &#039;publishers&#039; =&gt; $publishers,
        &#039;storyStatuses&#039; =&gt; $storyStatuses,
        &#039;genres&#039; =&gt; $genres,
        &#039;newsList&#039; =&gt; \Inertia\Inertia::defer(fn () =&gt; \App\Models\News::latest()-&gt;limit(50)-&gt;get()),
        &#039;totalBooksCount&#039; =&gt; $totalBooksCount,
        &#039;totalSeriesCount&#039; =&gt; $totalSeriesCount,
        &#039;totalPublishersCount&#039; =&gt; $totalPublishersCount,
        &#039;meta&#039; =&gt; [
            &#039;title&#039; =&gt; &#039;Norinoya - Database Manga, Komik, &amp; Light Novel Indonesia&#039;,
            &#039;description&#039; =&gt; &#039;Norinoya - Database Manga, Komik, &amp; Light Novel Indonesia. Temukan rilisan buku, berita terbaru, dan belanja komik preloved di Kios Norinoya.&#039;,
            &#039;image&#039; =&gt; \url(&#039;/favicon.png&#039;),
            &#039;url&#039; =&gt; \url(&#039;/&#039;),
            &#039;type&#039; =&gt; &#039;website&#039;,
        ],
    ]);
}:3
1 - vendor/laravel/framework/src/Illuminate/Cache/Repository.php:564
2 - vendor/laravel/framework/src/Illuminate/Cache/CacheManager.php:558
3 - vendor/laravel/framework/src/Illuminate/Support/Facades/Facade.php:363
4 - laravel-serializable-closure://function () {
    $books = \Illuminate\Support\Facades\Cache::remember(&#039;home:books:v2&#039;, 300, fn () =&gt; \homeBookQuery()
        -&gt;latest(&#039;updated_at&#039;)
        -&gt;limit(300)
        -&gt;get());

    $publishers = \Illuminate\Support\Facades\Cache::remember(&#039;home:publishers&#039;, 600, fn () =&gt; \App\Models\Publisher::orderBy(&#039;name&#039;)-&gt;get([&#039;id&#039;, &#039;name&#039;, &#039;slug&#039;]));
    $storyStatuses = \Illuminate\Support\Facades\Cache::remember(&#039;home:story_statuses&#039;, 600, fn () =&gt; \App\Models\StoryStatus::orderBy(&#039;name&#039;)-&gt;get([&#039;id&#039;, &#039;name&#039;, &#039;slug&#039;]));
    $genres = \Illuminate\Support\Facades\Cache::remember(&#039;home:genres&#039;, 600, fn () =&gt; \App\Models\Genre::orderBy(&#039;name&#039;)-&gt;get([&#039;id&#039;, &#039;name&#039;, &#039;slug&#039;]));

    $totalBooksCount = \Illuminate\Support\Facades\Cache::remember(&#039;home:total_books&#039;, 300, fn () =&gt; \App\Models\Book::count());
    $totalSeriesCount = \Illuminate\Support\Facades\Cache::remember(&#039;home:total_series&#039;, 300, fn () =&gt; \App\Models\BookSeries::count());
    $totalPublishersCount = \Illuminate\Support\Facades\Cache::remember(&#039;home:total_publishers&#039;, 300, fn () =&gt; \App\Models\Publisher::count());

    return \Inertia\Inertia::render(&#039;User/home&#039;, [
        &#039;books&#039; =&gt; $books,
        &#039;publishers&#039; =&gt; $publishers,
        &#039;storyStatuses&#039; =&gt; $storyStatuses,
        &#039;genres&#039; =&gt; $genres,
        &#039;newsList&#039; =&gt; \Inertia\Inertia::defer(fn () =&gt; \App\Models\News::latest()-&gt;limit(50)-&gt;get()),
        &#039;totalBooksCount&#039; =&gt; $totalBooksCount,
        &#039;totalSeriesCount&#039; =&gt; $totalSeriesCount,
        &#039;totalPublishersCount&#039; =&gt; $totalPublishersCount,
        &#039;meta&#039; =&gt; [
            &#039;title&#039; =&gt; &#039;Norinoya - Database Manga, Komik, &amp; Light Novel Indonesia&#039;,
            &#039;description&#039; =&gt; &#039;Norinoya - Database Manga, Komik, &amp; Light Novel Indonesia. Temukan rilisan buku, berita terbaru, dan belanja komik preloved di Kios Norinoya.&#039;,
            &#039;image&#039; =&gt; \url(&#039;/favicon.png&#039;),
            &#039;url&#039; =&gt; \url(&#039;/&#039;),
            &#039;type&#039; =&gt; &#039;website&#039;,
        ],
    ]);
}:3
5 - vendor/laravel/framework/src/Illuminate/Routing/CallableDispatcher.php:39
6 - vendor/laravel/framework/src/Illuminate/Routing/Route.php:243
7 - vendor/laravel/framework/src/Illuminate/Routing/Route.php:214
8 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:822
9 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:180
10 - vendor/laravel/framework/src/Illuminate/Http/Middleware/AddLinkHeadersForPreloadedAssets.php:32
11 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
12 - vendor/inertiajs/inertia-laravel/src/Middleware.php:122
13 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
14 - vendor/laravel/framework/src/Illuminate/Routing/Middleware/SubstituteBindings.php:50
15 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
16 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php:87
17 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
18 - vendor/laravel/framework/src/Illuminate/View/Middleware/ShareErrorsFromSession.php:48
19 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
20 - vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php:120
21 - vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php:63
22 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
23 - vendor/laravel/framework/src/Illuminate/Cookie/Middleware/AddQueuedCookiesToResponse.php:36
24 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
25 - vendor/laravel/framework/src/Illuminate/Cookie/Middleware/EncryptCookies.php:74
26 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
27 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:137
28 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:821
29 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:800
30 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:764
31 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:753
32 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:200
33 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:180
34 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php:21
35 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ConvertEmptyStringsToNull.php:31
36 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
37 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php:21
38 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TrimStrings.php:51
39 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
40 - vendor/laravel/framework/src/Illuminate/Http/Middleware/ValidatePostSize.php:27
41 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
42 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/Pr9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8.php:109
43 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
44 - vendor/laravel/framework/src/Illuminate/Http/Middleware/HandleCors.php:61
45 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
46 - vendor/laravel/framework/src/Illuminate/Http/Middleware/TrustProxies.php:58
47 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
48 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/InvokeDeferredCallbacks.php:22
49 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
50 - vendor/laravel/framework/src/Illuminate/Http/Middleware/ValidatePathEncoding.php:26
51 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
52 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:137
53 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:175
54 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:144
55 - vendor/laravel/framework/src/Illuminate/Foundation/Application.php:1220
56 - /home/norinoya/public_html/index.php:17

## Request

GET /

## Headers

* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
* **accept-encoding**: gzip, deflate, br, zstd
* **accept-language**: en-US,en;q=0.9
* **cookie**: XSRF-TOKEN=eyJpdiI6IjFGd2dKNkNUck1qYnN4YXAyOVBPR0E9PSIsInZhbHVlIjoiaWoyTGJKN2JSdkRxcDJzUTRFRGx3TVF5WmJhd0lURG93R2tDdHYyZDZYSlBNbHptMlNPR0h0SWllc3A2b0FQYjRNeXI2RGw1RFI4Szg4MnkvdEhYdksxNi9UTkREQ0tXbC9OUGRvN3lVSXZqSHJRSC9reEVpbFBWL0JTN2tGWnEiLCJtYWMiOiI4N2ZjMDY3ZjFlODliZGMxY2VhZTFlMDI5NDcxZjlmZmFiMWI4ODdlZThiODA4YjcwN2YyNmE4OTkzNWEyOTg5IiwidGFnIjoiIn0%3D; norinoya_app_session=eyJpdiI6IktJNm9kVG1WOVBMc241MGEvcEFPNkE9PSIsInZhbHVlIjoiWFNYVldySkxCa0ZwS0l4TGFnTnFlMEtDK2xOL2pKNUJ6VmNxMkZuSlBCNjdLZWY4cFk5UjhuNGw5U1p4ZS95K08zREtLbWkzQ1dQOXdWUGZKeWE5QWp5dGpYQ3h0dllOYWVzeFBQRTZpUDk4L29PR0VlK0NiNUFGcHhVWjcycVciLCJtYWMiOiI4Nzg5Y2RiNzczNTM5ZTIzYmM0MTk5NjRmNDZhMWY5YTQwZWM1ZDFiNzU4MDNmNmMxMDdmYzcyYjhjNTUyNDRmIiwidGFnIjoiIn0%3D
* **host**: norinoya.com
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36
* **upgrade-insecure-requests**: 1
* **sec-ch-ua**: "Chromium";v="154", "Google Chrome";v="154", "Not A(Brand";v="99"
* **sec-ch-ua-mobile**: ?0
* **sec-ch-ua-platform**: "Windows"
* **sec-fetch-site**: cross-site
* **sec-fetch-mode**: navigate
* **sec-fetch-user**: ?1
* **sec-fetch-dest**: document
* **priority**: u=0, i
* **x-https**: 1

## Route Context

controller: Closure
route name: home
middleware: web

## Route Parameters

No route parameter data available.

## Database Queries

* mysql - select * from `sessions` where `id` = '58XZuHr4D6wjXVpVzEWeWqibZNYPpIlsBap7tLUZ' limit 1 (293.01 ms)
* mysql - select * from `cache` where `key` in ('home:books:v2') (45.63 ms)
