<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStoryStatusRequest;
use App\Http\Requests\UpdateStoryStatusRequest;
use App\Models\StoryStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StoryStatusController extends Controller
{
    public function index(): Response
    {
        $storyStatuses = StoryStatus::query()
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/StoryStatuses/Index', [
            'storyStatuses' => $storyStatuses,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render(
            'Admin/StoryStatuses/Create'
        );
    }

    public function store(
        StoreStoryStatusRequest $request
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name']
        );

        StoryStatus::create($data);

        return to_route('admin.story-statuses.index')
            ->with(
                'success',
                'Status cerita berhasil ditambahkan.'
            );
    }

    public function edit(
        StoryStatus $storyStatus
    ): Response {
        return Inertia::render(
            'Admin/StoryStatuses/Edit',
            [
                'storyStatus' => $storyStatus,
            ]
        );
    }

    public function update(
        UpdateStoryStatusRequest $request,
        StoryStatus $storyStatus
    ): RedirectResponse {
        $data = $request->validated();

        $data['slug'] = $this->generateUniqueSlug(
            $data['name'],
            $storyStatus->id
        );

        $storyStatus->update($data);

        return to_route('admin.story-statuses.index')
            ->with(
                'success',
                'Status cerita berhasil diperbarui.'
            );
    }

    public function destroy(
    StoryStatus $storyStatus
): RedirectResponse {
    if ($storyStatus->books()->exists()) {
        return back()->with(
            'error',
            'Status cerita tidak dapat dihapus karena masih digunakan oleh buku.'
        );
    }

    $storyStatus->delete();

    return to_route('admin.story-statuses.index')
        ->with(
            'success',
            'Status cerita berhasil dihapus.'
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
            StoryStatus::query()
                ->where('slug', $slug)
                ->when(
                    $ignoreId,
                    fn ($query) => $query->where(
                        'id',
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