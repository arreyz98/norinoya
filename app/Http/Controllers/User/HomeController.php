<?php

namespace App\Http\Controllers\User;

use App\Actions\Books\QueryCatalog;
use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\BookSeries;
use App\Models\Genre;
use App\Models\News;
use App\Models\Publisher;
use App\Models\StoryStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request, QueryCatalog $catalog)
    {
        $publishers = Cache::remember('home:publishers', 600, fn () => Publisher::orderBy('name')->get(['id', 'name', 'slug']));
        $storyStatuses = Cache::remember('home:story_statuses', 600, fn () => StoryStatus::orderBy('name')->get(['id', 'name', 'slug']));
        $genres = Cache::remember('home:genres', 600, fn () => Genre::orderBy('name')->get(['id', 'name', 'slug']));

        $totalBooksCount = Cache::remember('home:total_books', 300, fn () => Book::published()->count());
        $totalSeriesCount = Cache::remember('home:total_series', 300, fn () => BookSeries::count());
        $totalPublishersCount = Cache::remember('home:total_publishers', 300, fn () => Publisher::count());

        return Inertia::render('User/home', [
            'catalog' => $catalog->paginate($request),
            'upcoming' => $catalog->upcoming(),
            'filters' => $catalog->filters($request),
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
            'meta' => [
                'title' => 'Norinoya - Database Manga, Komik, & Light Novel Indonesia',
                'description' => 'Norinoya - Database Manga, Komik, & Light Novel Indonesia. Temukan rilisan buku, berita terbaru, dan belanja komik preloved di Kios Norinoya.',
                'image' => url('/favicon.png'),
                'url' => url('/'),
                'type' => 'website',
            ],
        ]);
    }
}
