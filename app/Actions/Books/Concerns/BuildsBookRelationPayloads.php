<?php

namespace App\Actions\Books\Concerns;

use App\Enums\VideoAccessType;
use App\Models\AffiliateLink;
use App\Models\Book;
use Illuminate\Support\Collection;

/**
 * Payload baris relasi & sinkronisasi pivot yang dipakai bersama oleh
 * CreateBookRelations dan UpdateBookRelations.
 */
trait BuildsBookRelationPayloads
{
    /**
     * Payload baris TikTok embed.
     */
    protected function tiktokEmbedPayload(array $embed, int $index): array
    {
        return [
            'name' => $embed['name'] ?? '',
            'url_video' => $embed['url_video'] ?? $embed['embed_url'] ?? '',
            'sort_order' => $index + 1,
        ];
    }

    /**
     * Payload baris Instagram embed.
     */
    protected function instagramEmbedPayload(array $embed, int $index): array
    {
        return [
            'name' => $embed['name'] ?? '',
            'url' => trim((string) ($embed['url'] ?? '')),
            'thumbnail_url' => $embed['thumbnail_url'] ?? null,
            'title' => $embed['title'] ?? null,
            'description' => $embed['description'] ?? null,
            'sort_order' => $index + 1,
        ];
    }

    /**
     * Payload baris link berita.
     */
    protected function newsLinkPayload(array $link, int $index): array
    {
        return [
            'title' => $link['title'] ?? '',
            'url' => trim((string) ($link['url'] ?? '')),
            'sort_order' => $index + 1,
        ];
    }

    /**
     * Payload baris gambar buku.
     */
    protected function imagePayload(array $image, int $index): array
    {
        return [
            'image_url' => $image['image_url'],
            'sort_order' => $index + 1,
        ];
    }

    /**
     * Payload baris affiliate link.
     */
    protected function affiliatePayload(array $affiliate): array
    {
        return [
            'affiliate_store_id' => $affiliate['affiliate_store_id'],
            'store_name' => $this->affiliateStoreName($affiliate),
            'location' => $this->affiliateLocation($affiliate),
            'url' => $affiliate['url'],
        ];
    }

    /**
     * Payload baris link video.
     */
    protected function videoLinkPayload(array $video, int $index): array
    {
        return [
            'platform_name' => $video['platform_name'],
            'title' => $video['title'] ?? '',
            'access_type' => $video['access_type'] ?? VideoAccessType::FREE->value,
            'url' => $video['url'],
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

    /**
     * Sync book authors.
     *
     * Satu author boleh memegang peran story sekaligus art pada buku yang sama,
     * sehingga pivot tidak bisa di-key hanya oleh author_id (role art akan
     * menimpa role story). Karena unique index tabel pivot mencakup kolom role
     * (book_id, author_id, role), tiap peran di-attach sebagai baris terpisah.
     */
    protected function syncAuthors(Book $book, array $data): void
    {
        $storyAuthorIds = collect($data['story_authors'] ?? [])
            ->filter(fn ($authorId) => $authorId !== null && $authorId !== '')
            ->unique()
            ->values();

        $artAuthorIds = collect($data['art_authors'] ?? [])
            ->filter(fn ($authorId) => $authorId !== null && $authorId !== '')
            ->unique()
            ->values();

        $book->authors()->detach();

        if ($storyAuthorIds->isNotEmpty()) {
            $book->authors()->attach(
                $storyAuthorIds->all(),
                ['role' => 'story']
            );
        }

        if ($artAuthorIds->isNotEmpty()) {
            $book->authors()->attach(
                $artAuthorIds->all(),
                ['role' => 'art']
            );
        }
    }

    /**
     * Sync book genres.
     */
    protected function syncGenres(Book $book, array $data): void
    {
        $book->genres()->sync(
            $data['genres'] ?? []
        );
    }

    private function affiliateStoreName(array $affiliate): string
    {
        return trim($affiliate['store_name'] ?? '') !== ''
            ? $affiliate['store_name']
            : AffiliateLink::DEFAULT_STORE_NAME;
    }

    private function affiliateLocation(array $affiliate): string
    {
        return trim($affiliate['location'] ?? '') !== ''
            ? $affiliate['location']
            : AffiliateLink::DEFAULT_LOCATION;
    }
}
