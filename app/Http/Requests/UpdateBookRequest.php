<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $book = $this->route('book');

        $bookId = is_object($book)
            ? $book->id
            : $book;

        return [
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
                'required',
                'integer',
                'min:1',
                Rule::unique('books', 'volume')
                    ->where(function ($query) {
                        return $query->where(
                            'series_id',
                            $this->input('series_id')
                        );
                    })
                    ->ignore($bookId),
            ],

            'edition_id' => [
                'required',
                'integer',
                'exists:editions,id',
            ],

            'book_type' => [
                'required',
                'string',
            ],

            'story_status_id' => [
                'required',
                'integer',
                'exists:story_statuses,id',
            ],

            'age_rating' => [
                'required',
                'string',
            ],

            'publisher_id' => [
                'required',
                'integer',
                'exists:publishers,id',
            ],

            'synopsis' => [
                'required',
                'string',
            ],

            'short_description' => [
                'nullable',
                'string',
            ],

            'news_link' => [
                'nullable',
                'url',
                'max:2048',
            ],

            'msrp' => [
                'required',
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

            'affiliate_links.*.url' => [
                'required',
                'url',
                'max:2048',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' =>
                'Judul buku wajib diisi.',

            'volume.required' =>
                'Volume wajib diisi.',

            'volume.unique' =>
                'Volume tersebut sudah digunakan dalam series ini.',

            'images.max' =>
                'Maksimal 5 gambar.',

            'tiktok_embeds.max' =>
                'Maksimal 10 video TikTok.',

            'news_link.url' =>
                'Link berita tidak valid.',

            'msrp.required' =>
                'Harga MSRP wajib diisi.',

            'msrp.numeric' =>
                'Harga MSRP harus berupa angka.',
        ];
    }
}