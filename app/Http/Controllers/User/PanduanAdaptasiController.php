<?php

namespace App\Http\Controllers\User;

use App\Enums\BookType;
use App\Http\Controllers\Controller;
use App\Models\PanduanAdaptasi;
use App\Models\PanduanAdaptasiNode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PanduanAdaptasiController extends Controller
{
    /**
     * Daftar panduan adaptasi (indeks) — dibaca dari tabel `panduan_adaptasi`.
     */
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));

        $panduanAdaptasiList = PanduanAdaptasi::query()
            ->when($q !== '', function ($query) use ($q) {
                $query->where(function ($sub) use ($q) {
                    $sub->where('title', 'like', "%{$q}%")
                        ->orWhere('description', 'like', "%{$q}%");
                });
            })
            ->with([
                'nodes' => fn ($query) => $query
                    ->select('id', 'panduan_adaptasi_id', 'book_id', 'sort_order')
                    ->orderBy('sort_order'),
                'nodes.book:id,title,book_type',
            ])
            ->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn (PanduanAdaptasi $panduan) => [
                'id' => $panduan->id,
                'title' => $panduan->title,
                'slug' => $panduan->slug,
                'description' => $panduan->description,
                'source' => $this->resolveSource($panduan),
                'nodes_count' => $panduan->nodes->count(),
            ]);

        return Inertia::render('User/panduanAdaptasi', [
            'panduanAdaptasiList' => $panduanAdaptasiList,
            'filters' => ['q' => $q],
            'meta' => [
                'title' => 'Panduan Adaptasi - Norinoya',
                'description' => 'Direktori titik lanjut adaptasi anime ke manga: daftar judul, sumber, dan panduan urutan nonton bertahap.',
                'image' => url('/assets/images/logo-dark.png'),
                'url' => url('/panduan-adaptasi'),
                'type' => 'website',
            ],
        ]);
    }

    /**
     * Halaman detail panduan (urutan nonton & korelasi bab) — dibaca dari DB.
     * Node timeline + link-nya ikut dikirim ke React.
     */
    public function show(string $slug): Response
    {
        $panduan = PanduanAdaptasi::query()
            ->where('slug', $slug)
            ->with([
                'nodes' => fn ($query) => $query->orderBy('sort_order'),
                'nodes.book.publisher:id,name',
                'nodes.book.images:id,book_id,image_url,sort_order',
                'nodes.book.authors:id,name',
                'nodes.book.genres:id,name',
                'nodes.links' => fn ($query) => $query->orderBy('sort_order'),
            ])
            ->firstOrFail();

        $entries = $panduan->nodes
            ->values()
            ->map(fn (PanduanAdaptasiNode $node, int $index) => $this->serializeNode($node, $index))
            ->values();

        // og:image absolut — cover buku pertama yang tersedia, fallback ke logo.
        $cover = $entries->pluck('manga.coverUrl')->first(fn ($url) => filled($url));
        $image = $cover
            ? (Str::startsWith($cover, ['http://', 'https://']) ? $cover : url($cover))
            : url('/assets/images/logo-dark.png');

        $description = $panduan->description
            ?: 'Panduan nonton bertahap dan korelasi bab manga untuk adaptasi anime, lengkap dengan tautan takarir, dubbing, dan tempat baca resmi.';

        return Inertia::render('User/components/DetailPanduanAdaptasi', [
            'panduan' => [
                'id' => $panduan->id,
                'title' => $panduan->title,
                'slug' => $panduan->slug,
                'description' => $panduan->description,
                'entries' => $entries,
            ],
            'meta' => [
                'title' => $panduan->title.' - Panduan Adaptasi Norinoya',
                'description' => Str::limit(strip_tags($description), 160),
                'image' => $image,
                'url' => url("/panduan-adaptasi/{$panduan->slug}"),
                'type' => 'article',
            ],
        ]);
    }

    /**
     * Serialisasi satu node timeline ke bentuk yang dipakai komponen React.
     */
    private function serializeNode(PanduanAdaptasiNode $node, int $index): array
    {
        return [
            'id' => 'node-'.$node->id,
            'index' => $index + 1,
            'studio' => $node->studio,
            'tags' => $node->tags ?? [],
            'title' => $node->title,
            'description' => $node->description ?? '',
            'manga' => $this->serializeManga($node),
            'adaptation' => $this->serializeAdaptation($node),
            'watchGroups' => $this->serializeWatchGroups($node, $index),
            'upcoming' => (bool) $node->is_upcoming,
        ];
    }

    /**
     * Kartu buku (gaya postingan MarketplaceDB) dari buku yang dipilih di node.
     */
    private function serializeManga(PanduanAdaptasiNode $node): ?array
    {
        $book = $node->book;

        if (! $book) {
            return null;
        }

        $storyAuthors = $book->authors
            ->filter(fn ($author) => ($author->pivot->role ?? null) === 'story')
            ->pluck('name')
            ->unique()
            ->values();

        $artAuthors = $book->authors
            ->filter(fn ($author) => ($author->pivot->role ?? null) === 'art')
            ->pluck('name')
            ->unique()
            ->values();

        return [
            'slug' => $book->slug,
            'coverUrl' => (string) ($book->images->first()?->image_url ?? ''),
            'publisherName' => $book->publisher?->name ?? '',
            'title' => $book->title,
            'volumeNumber' => (string) ($book->volume ?? ''),
            'authors' => $storyAuthors->merge($artAuthors)->unique()->values()->implode(', '),
            'genres' => $book->genres->pluck('name')->values()->all(),
            'price' => (float) ($book->msrp ?? 0),
            'category' => $this->enumValue($book->book_type),
            'readingRating' => $this->enumValue($book->age_rating),
        ];
    }

    /**
     * Kotak "Adaptasi Buku" per node. Null bila ketiga kolom kosong.
     */
    private function serializeAdaptation(PanduanAdaptasiNode $node): ?array
    {
        $hasContent = filled($node->adaptation_label)
            || filled($node->adaptation_range)
            || filled($node->adaptation_chapters);

        if (! $hasContent) {
            return null;
        }

        return [
            'label' => filled($node->adaptation_label) ? $node->adaptation_label : 'Adaptasi Buku',
            'range' => $node->adaptation_range ?? '',
            'chapters' => $node->adaptation_chapters ?? '',
        ];
    }

    /**
     * Grup link per kategori (takarir / dubbing / baca) dalam urutan tetap.
     */
    private function serializeWatchGroups(PanduanAdaptasiNode $node, int $nodeIndex): array
    {
        $configs = [
            'takarir' => [
                'title' => 'Takarir Indonesia',
                'badgeLabel' => 'Takarir',
                'icon' => 'subtitle',
                'accent' => 'amber',
                'prefix' => 'sub',
            ],
            'dubbing' => [
                'title' => 'Dubbing Indonesia',
                'badgeLabel' => 'Dubbing',
                'icon' => 'dub',
                'accent' => 'amber',
                'prefix' => 'dub',
            ],
            'baca' => [
                'title' => 'Rekomendasi Tempat Membaca Resmi',
                'badgeLabel' => 'Resmi',
                'icon' => 'book',
                'accent' => 'emerald',
                'prefix' => 'read',
            ],
        ];

        $grouped = $node->links->groupBy(
            fn ($link) => $link->category instanceof \BackedEnum
                ? (string) $link->category->value
                : (string) $link->category
        );

        $groups = [];

        foreach ($configs as $key => $config) {
            $links = $grouped->get($key);

            if (! $links || $links->isEmpty()) {
                continue;
            }

            $groups[] = [
                'id' => $config['prefix'].'-'.$nodeIndex,
                'title' => $config['title'],
                'badgeLabel' => $config['badgeLabel'],
                'icon' => $config['icon'],
                'accent' => $config['accent'],
                'links' => $links->map(fn ($link) => [
                    'platform' => $link->platform_name,
                    'subLabel' => $link->title,
                    'status' => $link->status instanceof \BackedEnum
                        ? (string) $link->status->label()
                        : (string) $link->status,
                    'href' => $link->url,
                ])->values()->all(),
            ];
        }

        return $groups;
    }

    /**
     * "Sumber" pada kolom daftar: tipe buku dari node pertama yang punya buku.
     */
    private function resolveSource(PanduanAdaptasi $panduan): string
    {
        $book = $panduan->nodes
            ->first(fn (PanduanAdaptasiNode $node) => $node->book !== null)
            ?->book;

        if (! $book) {
            return 'Manga';
        }

        $raw = $this->enumValue($book->book_type);

        return BookType::tryFrom($raw)?->label() ?? ($raw !== '' ? $raw : 'Manga');
    }

    /**
     * Nilai string dari enum / string mentah (book_type memakai cast khusus
     * yang bisa mengembalikan enum BookType atau string legacy).
     */
    private function enumValue(mixed $value): string
    {
        if ($value instanceof \BackedEnum) {
            return (string) $value->value;
        }

        return (string) ($value ?? '');
    }
}
