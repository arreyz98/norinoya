<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePublisherRequest;
use App\Http\Requests\UpdatePublisherRequest;
use App\Models\Publisher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PublisherController extends Controller
{
    public function index(): Response
    {
        $publishers = Publisher::query()
            ->withCount('books')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Publishers/Index', [
            'publishers' => $publishers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Publishers/Create');
    }

    public function store(
        StorePublisherRequest $request
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name']
        );

        Publisher::create($data);

        return to_route('admin.publishers.index')
            ->with(
                'success',
                'Penerbit berhasil ditambahkan.'
            );
    }

    public function edit(
        Publisher $publisher
    ): Response {
        return Inertia::render('Admin/Publishers/Edit', [
            'publisher' => $publisher,
        ]);
    }

    public function update(
        UpdatePublisherRequest $request,
        Publisher $publisher
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name'],
            $publisher->id
        );

        $publisher->update($data);

        return to_route('admin.publishers.index')
            ->with(
                'success',
                'Penerbit berhasil diperbarui.'
            );
    }

    public function destroy(
        Publisher $publisher
    ): RedirectResponse {
        if ($publisher->books()->exists()) {
            return back()->with(
                'error',
                'Penerbit tidak dapat dihapus karena masih digunakan oleh buku.'
            );
        }

        $publisher->delete();

        return to_route('admin.publishers.index')
            ->with(
                'success',
                'Penerbit berhasil dihapus.'
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
            Publisher::query()
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