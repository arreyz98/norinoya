<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\KiosItem;
use App\Models\News;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index()
    {
        $books = Cache::remember('bookmark:books:v2', 300, fn () => Book::homeQuery()->latest('updated_at')->limit(120)->get());

        return Inertia::render('User/bookmark', [
            'books' => $books,
            'newsList' => Inertia::defer(fn () => News::latest()->limit(40)->get()),
            'kiosItems' => Inertia::defer(fn () => KiosItem::with(['kiosPartner:id,name,slug', 'linkedBook:id,title'])->latest()->limit(40)->get()),
            'meta' => ['robots' => 'noindex,nofollow'],
        ]);
    }
}
