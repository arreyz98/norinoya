<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;
use App\Models\Genre;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class GenreController extends Controller
{
    public function index(): Response
    {
        $genres = Genre::query()
            ->withCount('books')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Genres/Index', [
            'genres' => $genres,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Genres/Create');
    }

    public function store(
        StoreGenreRequest $request
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name']
        );

        Genre::create($data);

        return to_route('admin.genres.index')
            ->with(
                'success',
                'Genre berhasil ditambahkan.'
            );
    }

    public function edit(
        Genre $genre
    ): Response {
        return Inertia::render('Admin/Genres/Edit', [
            'genre' => $genre,
        ]);
    }

    public function update(
        UpdateGenreRequest $request,
        Genre $genre
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name'],
            $genre->id
        );

        $genre->update($data);

        return to_route('admin.genres.index')
            ->with(
                'success',
                'Genre berhasil diperbarui.'
            );
    }

    public function destroy(
        Genre $genre
    ): RedirectResponse {
        if ($genre->books()->exists()) {
            return back()->with(
                'error',
                'Genre tidak dapat dihapus karena masih digunakan oleh buku.'
            );
        }

        $genre->delete();

        return to_route('admin.genres.index')
            ->with(
                'success',
                'Genre berhasil dihapus.'
            );
    }

    private function generateUniqueSlug(
        string $name,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($name);

        $originalSlug = $slug;
        $counter = 1;

        while (
            Genre::query()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->whereKey(
                        '!=',
                        $ignoreId
                    )
                )
                ->exists()
        ) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}