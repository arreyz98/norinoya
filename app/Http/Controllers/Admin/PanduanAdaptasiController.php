<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Panduan\CreatePanduanRelations;
use App\Actions\Panduan\UpdatePanduanRelations;
use App\Enums\PanduanLinkCategory;
use App\Enums\PanduanLinkStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePanduanAdaptasiRequest;
use App\Http\Requests\UpdatePanduanAdaptasiRequest;
use App\Models\PanduanAdaptasi;
use App\Models\PanduanAdaptasiNode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PanduanAdaptasiController extends Controller
{
    public function index(): Response
    {
        $panduanAdaptasiList = PanduanAdaptasi::query()
            ->withCount('nodes')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $totalPanduan = PanduanAdaptasi::count();
        $totalNodes = PanduanAdaptasi::withCount('nodes')->get(['id'])->sum('nodes_count');

        return Inertia::render('Admin/PanduanAdaptasi/Index', [
            'panduanAdaptasiList' => $panduanAdaptasiList,
            'totalPanduan' => $totalPanduan,
            'totalNodes' => $totalNodes,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/PanduanAdaptasi/Create', $this->formOptions());
    }

    public function store(StorePanduanAdaptasiRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();
            $data['slug'] = $this->generateUniqueSlug($data['title']);

            $panduan = PanduanAdaptasi::create($data);

            app(CreatePanduanRelations::class)->execute($panduan, $data);
        });

        return to_route('admin.panduan-adaptasi.index')
            ->with('success', 'Panduan adaptasi berhasil ditambahkan.');
    }

    public function edit(PanduanAdaptasi $panduan_adaptasi): Response
    {
        $panduan_adaptasi->load([
            'nodes' => fn ($query) => $query->orderBy('sort_order'),
            'nodes.book:id,title,volume',
            'nodes.links' => fn ($query) => $query->orderBy('sort_order'),
        ]);

        return Inertia::render('Admin/PanduanAdaptasi/Edit', [
            'panduanAdaptasi' => [
                'id' => $panduan_adaptasi->id,
                'title' => $panduan_adaptasi->title,
                'slug' => $panduan_adaptasi->slug,
                'description' => $panduan_adaptasi->description,
                'nodes' => $panduan_adaptasi->nodes->map(fn ($node) => [
                    'id' => $node->id,
                    'book_id' => $node->book_id,
                    'book_label' => $node->book
                        ? $node->book->title.($node->book->volume ? ' — Vol.'.$node->book->volume : '')
                        : null,
                    'title' => $node->title,
                    'description' => $node->description,
                    'studio' => $node->studio,
                    'adaptation_label' => $node->adaptation_label,
                    'adaptation_range' => $node->adaptation_range,
                    'adaptation_chapters' => $node->adaptation_chapters,
                    'tags' => $node->tags ?? [],
                    'is_upcoming' => $node->is_upcoming,
                    'links' => $node->links->map(fn ($link) => [
                        'id' => $link->id,
                        'category' => $link->category?->value ?? $link->category,
                        'platform_name' => $link->platform_name,
                        'title' => $link->title,
                        'status' => $link->status?->value ?? $link->status,
                        'url' => $link->url,
                    ])->values(),
                ])->values(),
            ],
        ] + $this->formOptions());
    }

    public function update(UpdatePanduanAdaptasiRequest $request, PanduanAdaptasi $panduan_adaptasi): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $panduan_adaptasi) {
            if ((string) $data['title'] !== (string) $panduan_adaptasi->title) {
                $data['slug'] = $this->generateUniqueSlug($data['title'], $panduan_adaptasi->id);
            }

            $panduan_adaptasi->update($data);

            app(UpdatePanduanRelations::class)->execute($panduan_adaptasi, $data);
        });

        return to_route('admin.panduan-adaptasi.index')
            ->with('success', 'Panduan adaptasi berhasil diperbarui.');
    }

    public function destroy(PanduanAdaptasi $panduan_adaptasi): RedirectResponse
    {
        $panduan_adaptasi->delete();

        return to_route('admin.panduan-adaptasi.index')
            ->with('success', 'Panduan adaptasi berhasil dihapus.');
    }

    /**
     * Opsi enum untuk dropdown form (kategori & status link).
     */
    private function formOptions(): array
    {
        return [
            'linkCategories' => collect(PanduanLinkCategory::cases())
                ->map(fn (PanduanLinkCategory $category) => [
                    'value' => $category->value,
                    'label' => $category->label(),
                ])
                ->values(),

            'linkStatuses' => collect(PanduanLinkStatus::cases())
                ->map(fn (PanduanLinkStatus $status) => [
                    'value' => $status->value,
                    'label' => $status->label(),
                ])
                ->values(),
        ];
    }

    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while (
            PanduanAdaptasi::withTrashed()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->whereKeyNot($ignoreId))
                ->exists()
        ) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
