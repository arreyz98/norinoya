<?php

namespace App\Actions\Panduan;

use App\Actions\Panduan\Concerns\BuildsPanduanRelationPayloads;
use App\Models\PanduanAdaptasi;
use App\Models\PanduanAdaptasiNode;

/**
 * Membuat node timeline + link per node untuk panduan adaptasi baru.
 */
class CreatePanduanRelations
{
    use BuildsPanduanRelationPayloads;

    public function execute(PanduanAdaptasi $panduan, array $data): void
    {
        foreach ($data['nodes'] ?? [] as $index => $node) {
            $model = $panduan->nodes()->create(
                $this->nodePayload($node, $index)
            );

            $this->createLinks($model, $node['links'] ?? []);
        }
    }

    private function createLinks(PanduanAdaptasiNode $node, array $links): void
    {
        foreach ($links as $index => $link) {
            $node->links()->create(
                $this->linkPayload($link, $index)
            );
        }
    }
}
