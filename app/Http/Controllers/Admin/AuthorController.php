<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    public function index(): Response
    {
        $authors = Author::query()
            ->withCount([
                'storyBooks',
                'artBooks',
            ])
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Authors/Index', [
            'authors' => $authors,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Authors/Create');
    }

    public function store(
        StoreAuthorRequest $request
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name']
        );

        Author::create($data);

        return to_route('admin.authors.index')
            ->with(
                'success',
                'Author berhasil ditambahkan.'
            );
    }

    public function edit(
        Author $author
    ): Response {
        return Inertia::render('Admin/Authors/Edit', [
            'author' => $author,
        ]);
    }

    public function update(
        UpdateAuthorRequest $request,
        Author $author
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name'],
            $author->id
        );

        $author->update($data);

        return to_route('admin.authors.index')
            ->with(
                'success',
                'Author berhasil diperbarui.'
            );
    }

    public function destroy(
        Author $author
    ): RedirectResponse {
        if ($author->books()->exists()) {
            return back()->with(
                'error',
                'Author tidak dapat dihapus karena masih digunakan oleh buku.'
            );
        }

        $author->delete();

        return to_route('admin.authors.index')
            ->with(
                'success',
                'Author berhasil dihapus.'
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
            Author::query()
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