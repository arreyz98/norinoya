<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEditionRequest;
use App\Http\Requests\UpdateEditionRequest;
use App\Models\Edition;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EditionController extends Controller
{
    public function index(): Response
    {
        $editions = Edition::query()
            ->withCount('books')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Editions/Index', [
            'editions' => $editions,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Editions/Create');
    }

    public function store(
        StoreEditionRequest $request
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name']
        );

        Edition::create($data);

        return to_route('admin.editions.index')
            ->with(
                'success',
                'Edisi berhasil ditambahkan.'
            );
    }

    public function edit(
        Edition $edition
    ): Response {
        return Inertia::render('Admin/Editions/Edit', [
            'edition' => $edition,
        ]);
    }

    public function update(
        UpdateEditionRequest $request,
        Edition $edition
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name'],
            $edition->id
        );

        $edition->update($data);

        return to_route('admin.editions.index')
            ->with(
                'success',
                'Edisi berhasil diperbarui.'
            );
    }

    public function destroy(
        Edition $edition
    ): RedirectResponse {
        if ($edition->books()->exists()) {
            return back()->with(
                'error',
                'Edisi tidak dapat dihapus karena masih digunakan oleh buku.'
            );
        }

        $edition->delete();

        return to_route('admin.editions.index')
            ->with(
                'success',
                'Edisi berhasil dihapus.'
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
            Edition::query()
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