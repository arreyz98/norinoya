<?php

namespace App\Actions\Books;

use App\Actions\Books\Concerns\BuildsBookRelationPayloads;
use App\Models\Book;

/**
 * Sinkronkan semua relasi buku saat Update.
 * Pola: hapus baris lama yang tidak lagi dikirim, lalu update baris lama
 * (berdasarkan id) atau buat baris baru.
 */
class UpdateBookRelations
{
    use BuildsBookRelationPayloads;

    public function execute(Book $book, array $data): void
    {
        $this->syncAuthors($book, $data);
        $this->syncGenres($book, $data);

        $this->syncImages($book, $data);
        $this->syncTiktokEmbeds($book, $data);
        $this->syncInstagramEmbeds($book, $data);
        $this->syncNewsLinks($book, $data);
        $this->syncAffiliateLinks($book, $data);
        $this->syncVideoLinks($book, $data);
    }

    private function syncImages(Book $book, array $data): void
    {
        $book->images()
            ->whereNotIn('id', $this->submittedIds($data['images'] ?? []))
            ->delete();

        foreach ($data['images'] ?? [] as $index => $image) {
            $payload = $this->imagePayload($image, $index);

            if (! empty($image['id'])) {
                $book->images()
                    ->where('id', $image['id'])
                    ->update($payload);
            } else {
                $book->images()->create($payload);
            }
        }
    }

    private function syncTiktokEmbeds(Book $book, array $data): void
    {
        $book->tiktokEmbeds()
            ->whereNotIn('id', $this->submittedIds($data['tiktok_embeds'] ?? []))
            ->delete();

        foreach ($data['tiktok_embeds'] ?? [] as $index => $embed) {
            $payload = $this->tiktokEmbedPayload($embed, $index);

            if (! empty($embed['id'])) {
                $book->tiktokEmbeds()
                    ->where('id', $embed['id'])
                    ->update($payload);
            } else {
                $book->tiktokEmbeds()->create($payload);
            }
        }
    }

    private function syncInstagramEmbeds(Book $book, array $data): void
    {
        $book->instagramEmbeds()
            ->whereNotIn('id', $this->submittedIds($data['instagram_embeds'] ?? []))
            ->delete();

        foreach ($data['instagram_embeds'] ?? [] as $index => $embed) {
            $payload = $this->instagramEmbedPayload($embed, $index);

            if ($payload['url'] === '') {
                continue;
            }

            if (! empty($embed['id'])) {
                $book->instagramEmbeds()
                    ->where('id', $embed['id'])
                    ->update($payload);
            } else {
                $book->instagramEmbeds()->create($payload);
            }
        }
    }

    private function syncNewsLinks(Book $book, array $data): void
    {
        $book->newsLinks()
            ->whereNotIn('id', $this->submittedIds($data['news_links'] ?? []))
            ->delete();

        foreach ($data['news_links'] ?? [] as $index => $link) {
            $payload = $this->newsLinkPayload($link, $index);

            if ($payload['url'] === '') {
                continue;
            }

            if (! empty($link['id'])) {
                $book->newsLinks()
                    ->where('id', $link['id'])
                    ->update($payload);
            } else {
                $book->newsLinks()->create($payload);
            }
        }
    }

    private function syncAffiliateLinks(Book $book, array $data): void
    {
        $book->affiliateLinks()
            ->whereNotIn('id', $this->submittedIds($data['affiliate_links'] ?? []))
            ->delete();

        foreach ($data['affiliate_links'] ?? [] as $affiliate) {
            $payload = $this->affiliatePayload($affiliate);

            if (! empty($affiliate['id'])) {
                $book->affiliateLinks()
                    ->where('id', $affiliate['id'])
                    ->update($payload);
            } else {
                $book->affiliateLinks()->create($payload);
            }
        }
    }

    /**
     * Link video: daftar yang tidak dikirim mempertahankan data lama;
     * daftar kosong eksplisit akan menghapus semua link.
     */
    private function syncVideoLinks(Book $book, array $data): void
    {
        if (! array_key_exists('video_links', $data)) {
            return;
        }

        $book->videoLinks()
            ->whereNotIn('id', $this->submittedIds($data['video_links'] ?? []))
            ->delete();

        foreach ($data['video_links'] ?? [] as $index => $video) {
            $payload = $this->videoLinkPayload($video, $index);

            if (! empty($video['id'])) {
                $book->videoLinks()
                    ->where('id', $video['id'])
                    ->update($payload);
            } else {
                $book->videoLinks()->create($payload);
            }
        }
    }
}
