<?php

namespace App\Http\Requests;

use App\Enums\BookType;
use App\Enums\PublicationStatus;
use App\Enums\VideoAccessType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if (! $this->filled('publication_status')) {
            $this->merge([
                'publication_status' => PublicationStatus::Published->value,
            ]);
        }
    }

    public function rules(): array
    {
        $book = $this->route('book');

        $bookId = is_object($book)
            ? $book->id
            : $book;

        return [
            'publication_status' => [
                'required',
                Rule::enum(PublicationStatus::class),
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'series_id' => [
                'nullable',
                'integer',
                'exists:book_series,id',
            ],

            'volume' => [
                'nullable',
                'required_if:publication_status,published',
                'string',
                'max:50',
                Rule::unique('books', 'volume')
                    ->where(function ($query) {
                        $query->whereNull('deleted_at');

                        $seriesId = $this->input('series_id');

                        if ($seriesId === null || $seriesId === '') {
                            return $query->whereNull('series_id');
                        }

                        return $query->where('series_id', $seriesId);
                    })
                    ->ignore($bookId),
            ],

            'edition_id' => [
                'nullable',
                'required_if:publication_status,published',
                'integer',
                'exists:editions,id',
            ],

            'book_type' => [
                'nullable',
                'required_if:publication_status,published',
                'string',
                Rule::enum(BookType::class),
            ],

            'story_status_id' => [
                'nullable',
                'required_if:publication_status,published',
                'integer',
                'exists:story_statuses,id',
            ],

            'age_rating' => [
                'nullable',
                'required_if:publication_status,published',
                'string',
            ],

            'publisher_id' => [
                'nullable',
                'required_if:publication_status,published',
                'integer',
                'exists:publishers,id',
            ],

            'synopsis' => [
                'nullable',
                'required_if:publication_status,published',
                'string',
            ],

            'news_link' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'msrp' => [
                'nullable',
                'required_if:publication_status,published',
                'numeric',
                'min:0',
            ],

            'isbn' => [
                'nullable',
                'string',
                'max:255',
            ],

            'page_count' => [
                'nullable',
                'integer',
                'min:1',
            ],

            'paper_type' => [
                'nullable',
                'string',
                'max:255',
            ],

            'dimensions' => [
                'nullable',
                'string',
                'max:255',
            ],

            'adaptation' => [
                'nullable',
                'string',
                'max:255',
            ],

            'is_upcoming' => [
                'nullable',
                'boolean',
            ],

            /*
             * Images
             */
            'images' => [
                'nullable',
                'array',
                'max:5',
            ],

            'images.*.id' => [
                'nullable',
                'integer',
                'exists:book_images,id',
            ],

            'images.*.image_url' => [
                'required',
                'url',
                'max:2048',
            ],

            /*
             * Authors
             */
            'story_authors' => [
                'nullable',
                'array',
            ],

            'story_authors.*' => [
                'integer',
                'exists:authors,id',
            ],

            'art_authors' => [
                'nullable',
                'array',
            ],

            'art_authors.*' => [
                'integer',
                'exists:authors,id',
            ],

            /*
             * Genres
             */
            'genres' => [
                'nullable',
                'array',
            ],

            'genres.*' => [
                'integer',
                'exists:genres,id',
            ],

            /*
             * TikTok
             */
            'tiktok_embeds' => [
                'nullable',
                'array',
                'max:10',
            ],

            'tiktok_embeds.*.id' => [
                'nullable',
                'integer',
                'exists:book_tiktok_embeds,id',
            ],

            'tiktok_embeds.*.name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'tiktok_embeds.*.url_video' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'tiktok_embeds.*.embed_url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            /*
             * Instagram
             */
            'instagram_embeds' => [
                'nullable',
                'array',
                'max:10',
            ],

            'instagram_embeds.*.id' => [
                'nullable',
                'integer',
                'exists:book_instagram_embeds,id',
            ],

            'instagram_embeds.*.name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'instagram_embeds.*.url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'instagram_embeds.*.thumbnail_url' => [
                'nullable',
                'url',
                'max:4096',
            ],

            'instagram_embeds.*.title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'instagram_embeds.*.description' => [
                'nullable',
                'string',
                'max:2000',
            ],

            /*
             * News Links
             */
            'news_links' => [
                'nullable',
                'array',
                'max:10',
            ],

            'news_links.*.id' => [
                'nullable',
                'integer',
                'exists:book_news_links,id',
            ],

            'news_links.*.title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'news_links.*.url' => [
                'nullable',
                'url',
                'max:2048',
            ],

            /*
             * Affiliate
             */
            'affiliate_links' => [
                'nullable',
                'array',
            ],

            'affiliate_links.*.id' => [
                'nullable',
                'integer',
                'exists:affiliate_links,id',
            ],

            'affiliate_links.*.affiliate_store_id' => [
                'required',
                'integer',
                'exists:affiliate_stores,id',
            ],

            'affiliate_links.*.store_name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'affiliate_links.*.location' => [
                'nullable',
                'string',
                'max:255',
            ],

            'affiliate_links.*.url' => [
                'required',
                'url',
                'max:2048',
            ],

            /*
             * Video Links
             */
            'video_links' => [
                'nullable',
                'array',
                'list',
                'max:20',
            ],

            'video_links.*' => ['array'],

            'video_links.*.id' => [
                'nullable',
                'integer',
                'distinct',
                Rule::exists('book_video_links', 'id')->where('book_id', $bookId),
            ],

            'video_links.*.platform_name' => [
                'required',
                'string',
                'max:255',
            ],

            'video_links.*.title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'video_links.*.access_type' => [
                'required',
                'string',
                Rule::enum(VideoAccessType::class),
            ],

            'video_links.*.url' => [
                'required',
                'url:http,https',
                'max:2048',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'publication_status.required' => 'Status publikasi wajib dipilih.',

            'publication_status.enum' => 'Status publikasi tidak valid.',

            'title.required' => 'Judul buku wajib diisi.',

            'volume.required' => 'Volume wajib diisi.',

            'volume.required_if' => 'Volume wajib diisi.',

            'edition_id.required_if' => 'Edisi cetakan wajib dipilih.',

            'book_type.required_if' => 'Tipe buku wajib dipilih.',

            'story_status_id.required_if' => 'Status cerita wajib dipilih.',

            'age_rating.required_if' => 'Rating umur wajib dipilih.',

            'publisher_id.required_if' => 'Penerbit wajib dipilih.',

            'synopsis.required_if' => 'Sinopsis wajib diisi.',

            'msrp.required_if' => 'Harga MSRP wajib diisi.',

            'volume.max' => 'Volume maksimal 50 karakter.',

            'volume.unique' => 'Volume tersebut sudah digunakan dalam series ini.',

            'images.max' => 'Maksimal 5 gambar.',

            'tiktok_embeds.max' => 'Maksimal 10 video TikTok.',

            'news_link.url' => 'Link berita tidak valid.',

            'msrp.required' => 'Harga MSRP wajib diisi.',

            'msrp.numeric' => 'Harga MSRP harus berupa angka.',

            'video_links.*.url.url' => 'URL video tidak valid.',

            'video_links.*.platform_name.required' => 'Nama platform wajib diisi.',

            'video_links.*.url.required' => 'Link video wajib diisi.',

            'video_links.max' => 'Maksimal 20 link video.',

            'video_links.list' => 'Link video harus berupa daftar berurutan.',

            'video_links.*.access_type.required' => 'Pilih tipe akses.',

            'video_links.*.access_type.enum' => 'Tipe akses video tidak valid.',

            'video_links.*.id.exists' => 'Link video tidak ditemukan pada buku ini.',

            'video_links.*.id.distinct' => 'Link video yang sama tidak boleh dikirim dua kali.',

            'instagram_embeds.max' => 'Maksimal 10 postingan Instagram.',

            'instagram_embeds.*.url.url' => 'URL Instagram tidak valid.',

            'news_links.max' => 'Maksimal 10 link berita.',

            'news_links.*.url.url' => 'URL berita tidak valid.',
        ];
    }
}
