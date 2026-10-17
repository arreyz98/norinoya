<?php

namespace App\Actions\Panduan;

use App\Actions\Panduan\Concerns\BuildsPanduanRelationPayloads;
use App\Models\PanduanAdaptasi;
use App\Models\PanduanAdaptasiNode;

/**
 * Sinkronisasi node timeline + link per node saat panduan adaptasi diubah.
 *
 * Pola delete-then-upsert-by-id (mengikuti UpdateBookRelations):
 * - Node/link lama yang tidak lagi dikirim akan dihapus.
 * - Baris dengan id di-update, baris baru (tanpa id) di-create.
 * - Key "nodes" yang absen dari payload berarti pertahankan semua node.
 */
class UpdatePanduanRelations
{
    use BuildsPanduanRelationPayloads;

    public function execute(PanduanAdaptasi $panduan, array $data): void
    {
        if (! array_key_exists('nodes', $data)) {
            return;
        }

        // Hapus node yang tidak dikirim — links ikut terhapus via FK cascade.
        $panduan->nodes()
            ->whereNotIn('id', $this->submittedIds($data['nodes'] ?? []))
            ->delete();

        foreach ($data['nodes'] ?? [] as $index => $node) {
            $payload = $this->nodePayload($node, $index);

            if (! empty($node['id'])) {
                $model = $panduan->nodes()->find($node['id']);

                if (! $model) {
                    continue;
                }

                $model->update($payload);
            } else {
                $model = $panduan->nodes()->create($payload);
            }

            $this->syncLinks($model, $node['links'] ?? []);
        }
    }

    private function syncLinks(PanduanAdaptasiNode $node, array $links): void
    {
        $node->links()
            ->whereNotIn('id', $this->submittedIds($links))
            ->delete();

        foreach ($links as $index => $link) {
            $payload = $this->linkPayload($link, $index);

            if (! empty($link['id'])) {
                // ID yang bukan milik node ini tidak akan ter-update;
                // baris diperlakukan sebagai link baru (hindari menimpa
                // data milik node lain).
                $updated = $node->links()
                    ->where('id', $link['id'])
                    ->update($payload);

                if ($updated === 0) {
                    $node->links()->create($payload);
                }
            } else {
                $node->links()->create($payload);
            }
        }
    }
}
