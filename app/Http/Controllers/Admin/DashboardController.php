<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\KiosItem;
use App\Models\KiosPartner;
use App\Models\News;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBooks = Book::count();
        $totalNews = News::count();
        $totalKios = KiosItem::count();
        $totalPartners = KiosPartner::count();

        $bookViews = Book::sum('views_count');
        $newsViews = News::sum('views_count');
        $kiosViews = KiosItem::sum('views_count');
        $totalViews = $bookViews + $newsViews + $kiosViews;

        $recentBooks = Book::latest()->take(5)->get(['id', 'title', 'volume', 'views_count', 'created_at']);
        $recentNews = News::latest()->take(5)->get(['id', 'title', 'category', 'views_count', 'created_at']);
        $recentKios = KiosItem::latest()->take(5)->get(['id', 'title', 'price', 'is_preloved', 'views_count', 'created_at']);

        return Inertia::render('dashboard', [
            'meta' => ['robots' => 'noindex,nofollow'],
            'stats' => [
                'totalBooks' => $totalBooks,
                'totalNews' => $totalNews,
                'totalKios' => $totalKios,
                'totalPartners' => $totalPartners,
                'totalViews' => $totalViews,
            ],
            'recentBooks' => $recentBooks,
            'recentNews' => $recentNews,
            'recentKios' => $recentKios,
        ]);
    }
}
