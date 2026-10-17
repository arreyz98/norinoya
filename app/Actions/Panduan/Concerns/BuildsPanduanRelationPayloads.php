<?php

namespace App\Actions\Panduan\Concerns;

use App\Enums\PanduanLinkCategory;
use App\Enums\PanduanLinkStatus;
use Illuminate\Support\Collection;

/**
 * Payload baris relasi panduan adaptasi (node timeline & link per node)
 * yang dipakai bersama oleh CreatePanduanRelations dan UpdatePanduanRelations.
 */
trait BuildsPanduanRelationPayloads
{
    /**
     * Payload baris node timeline.
     */
    protected function nodePayload(array $node, int $index): array
    {
        $tags = collect($node['tags'] ?? [])
            ->map(fn (array $tag) => [
                'label' => trim((string) ($tag['label'] ?? '')),
                'tone' => $tag['tone'] ?? 'neutral',
            ])
            ->filter(fn (array $tag) => $tag['label'] !== '')
            ->values();

        return [
            'book_id' => ! empty($node['book_id']) ? $node['book_id'] : null,
            'title' => $node['title'],
            'description' => $node['description'] ?? null,
            'studio' => $node['studio'] ?? null,
            'adaptation_label' => $node['adaptation_label'] ?? null,
            'adaptation_range' => $node['adaptation_range'] ?? null,
            'adaptation_chapters' => $node['adaptation_chapters'] ?? null,
            'tags' => $tags->isEmpty() ? null : $tags->all(),
            'is_upcoming' => (bool) ($node['is_upcoming'] ?? false),
            'sort_order' => $index + 1,
        ];
    }

    /**
     * Payload baris link per node.
     */
    protected function linkPayload(array $link, int $index): array
    {
        return [
            'category' => $link['category'] ?? PanduanLinkCategory::TAKARIR->value,
            'platform_name' => $link['platform_name'],
            'title' => $link['title'] ?? null,
            'status' => $link['status'] ?? PanduanLinkStatus::GRATIS->value,
            'url' => $link['url'],
            'sort_order' => $index + 1,
        ];
    }

    /**
     * ID baris yang dikirim dari form (dipakai untuk menghapus baris lama
     * yang tidak lagi disertakan saat update).
     */
    protected function submittedIds(array $items): Collection
    {
        return collect($items)
            ->pluck('id')
            ->filter()
            ->values();
    }
}
