<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\KiosItem;
use App\Models\News;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index()
    {
        return Inertia::render('User/bookmark', [
            'newsList' => Inertia::defer(fn () => News::latest()->limit(40)->get()),
            'kiosItems' => Inertia::defer(fn () => KiosItem::with(['kiosPartner:id,name,slug', 'linkedBook:id,title'])->latest()->limit(40)->get()),
            'meta' => ['robots' => 'noindex,nofollow'],
        ]);
    }
}
