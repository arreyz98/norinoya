<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookSeriesRequest;
use App\Http\Requests\UpdateBookSeriesRequest;
use App\Models\BookSeries;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BookSeriesController extends Controller
{
    /**
     * Display a listing of book series.
     */
    public function index(): Response
    {
        $series = BookSeries::query()
            ->withCount('books')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/BookSeries/Index', [
            'series' => $series,
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

        $bookSeries->delete();

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