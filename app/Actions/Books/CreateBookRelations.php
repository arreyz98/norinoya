<?php

namespace App\Actions\Books;

use App\Actions\Books\Concerns\BuildsBookRelationPayloads;
use App\Models\Book;

/**
 * Simpan semua relasi buku saat Create (store).
 * Book utama sudah dibuat oleh pemanggil sebelum action ini dijalankan.
 */
class CreateBookRelations
{
    use BuildsBookRelationPayloads;

    public function execute(Book $book, array $data): void
    {
        $this->createTiktokEmbeds($book, $data);
        $this->createInstagramEmbeds($book, $data);
        $this->createNewsLinks($book, $data);
        $this->createImages($book, $data);

        $this->syncAuthors($book, $data);
        $this->syncGenres($book, $data);

        $this->createAffiliateLinks($book, $data);
        $this->createVideoLinks($book, $data);
    }

    private function createTiktokEmbeds(Book $book, array $data): void
    {
        foreach ($data['tiktok_embeds'] ?? [] as $index => $embed) {
            $book->tiktokEmbeds()->create(
                $this->tiktokEmbedPayload($embed, $index)
            );
        }
    }

    private function createInstagramEmbeds(Book $book, array $data): void
    {
        foreach ($data['instagram_embeds'] ?? [] as $index => $embed) {
            $payload = $this->instagramEmbedPayload($embed, $index);

            if ($payload['url'] === '') {
                continue;
            }

            $book->instagramEmbeds()->create($payload);
        }
    }

    private function createNewsLinks(Book $book, array $data): void
    {
        foreach ($data['news_links'] ?? [] as $index => $link) {
            $payload = $this->newsLinkPayload($link, $index);

            if ($payload['url'] === '') {
                continue;
            }

            $book->newsLinks()->create($payload);
        }
    }

    private function createImages(Book $book, array $data): void
    {
        foreach ($data['images'] ?? [] as $index => $image) {
            $book->images()->create(
                $this->imagePayload($image, $index)
            );
        }
    }

    private function createAffiliateLinks(Book $book, array $data): void
    {
        foreach ($data['affiliate_links'] ?? [] as $affiliate) {
            $book->affiliateLinks()->create(
                $this->affiliatePayload($affiliate)
            );
        }
    }

    private function createVideoLinks(Book $book, array $data): void
    {
        foreach ($data['video_links'] ?? [] as $index => $video) {
            $book->videoLinks()->create(
                $this->videoLinkPayload($video, $index)
            );
        }
    }
}
