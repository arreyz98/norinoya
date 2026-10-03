<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookSeriesRequest;
use App\Http\Requests\UpdateBookSeriesRequest;
use App\Models\BookSeries;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BookSeriesController extends Controller
{
    /**
     * Display a listing of book series.
     */
    public function index(Request $request): Response
    {
        $query = BookSeries::query()
            ->withCount('books');

        if ($request->filled('search')) {
            $search = $request->input('search');

            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        match ($request->input('sort', 'latest')) {
            'oldest' => $query->oldest(),
            'title_asc' => $query->orderBy('title'),
            'title_desc' => $query->orderByDesc('title'),
            'books_desc' => $query->orderByDesc('books_count')->latest(),
            default => $query->latest(),
        };

        $perPage = (int) $request->input('per_page', 15);
        $perPage = in_array($perPage, [15, 25, 50, 100], true)
            ? $perPage
            : 15;

        $series = $query->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Admin/BookSeries/Index', [
            'series' => $series,
            'filters' => (object) $request->only([
                'search',
                'sort',
                'per_page',
            ]),
        ]);
    }

    /**
     * Show the form for creating a new book series.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/BookSeries/Create');
    }

    /**
     * Store a newly created book series.
     */
    public function store(
        StoreBookSeriesRequest $request
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['title']
        );

        BookSeries::create($data);

        return to_route('admin.book-series.index')
            ->with('success', 'Series berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified book series.
     */
    public function edit(BookSeries $bookSeries): Response
    {
        return Inertia::render('Admin/BookSeries/Edit', [
            'series' => $bookSeries,
        ]);
    }

    /**
     * Update the specified book series.
     */
    public function update(
        UpdateBookSeriesRequest $request,
        BookSeries $bookSeries
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['title'],
            $bookSeries->id
        );

        $bookSeries->update($data);

        return to_route('admin.book-series.index')
            ->with('success', 'Series berhasil diperbarui.');
    }

    /**
     * Remove the specified book series.
     */
    public function destroy(
        BookSeries $bookSeries
    ): RedirectResponse {
        if ($bookSeries->books()->exists()) {
            return back()->with(
                'error',
                'Series tidak dapat dihapus karena masih memiliki buku.'
            );
        }

        $bookSeries->forceDelete();

        return to_route('admin.book-series.index')
            ->with('success', 'Series berhasil dihapus.');
    }

    /**
     * Generate a unique slug.
     */
    private function generateUniqueSlug(
        string $title,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($title);

        $originalSlug = $slug;
        $counter = 1;

        while (
            BookSeries::query()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->whereKey('!=', $ignoreId)
                )
                ->exists()
        ) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}