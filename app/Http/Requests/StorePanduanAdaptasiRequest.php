<?php

namespace App\Http\Requests;

use App\Enums\PanduanLinkCategory;
use App\Enums\PanduanLinkStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePanduanAdaptasiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],

            /*
             * Nodes (kartu timeline)
             */
            'nodes' => ['nullable', 'array', 'list', 'max:50'],
            'nodes.*' => ['array'],

            'nodes.*.title' => ['required', 'string', 'max:255'],
            'nodes.*.description' => ['nullable', 'string', 'max:5000'],
            'nodes.*.studio' => ['nullable', 'string', 'max:255'],
            'nodes.*.book_id' => ['nullable', 'integer', 'exists:books,id'],
            'nodes.*.is_upcoming' => ['boolean'],

            'nodes.*.adaptation_label' => ['nullable', 'string', 'max:255'],
            'nodes.*.adaptation_range' => ['nullable', 'string', 'max:255'],
            'nodes.*.adaptation_chapters' => ['nullable', 'string', 'max:255'],

            /*
             * Tags (chip label di atas judul node)
             */
            'nodes.*.tags' => ['nullable', 'array', 'max:5'],
            'nodes.*.tags.*' => ['array'],
            'nodes.*.tags.*.label' => ['required', 'string', 'max:50'],
            'nodes.*.tags.*.tone' => ['required', 'string', 'in:neutral,amber'],

            /*
             * Links (takarir / dubbing / baca per node)
             */
            'nodes.*.links' => ['nullable', 'array', 'list', 'max:20'],
            'nodes.*.links.*' => ['array'],

            'nodes.*.links.*.category' => [
                'required',
                'string',
                Rule::enum(PanduanLinkCategory::class),
            ],

            'nodes.*.links.*.platform_name' => ['required', 'string', 'max:255'],
            'nodes.*.links.*.title' => ['nullable', 'string', 'max:255'],

            'nodes.*.links.*.status' => [
                'required',
                'string',
                Rule::enum(PanduanLinkStatus::class),
            ],

            'nodes.*.links.*.url' => ['required', 'url:http,https', 'max:2048'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Judul panduan wajib diisi.',
            'title.max' => 'Judul panduan maksimal 255 karakter.',
            'description.max' => 'Deskripsi maksimal 5000 karakter.',

            'nodes.max' => 'Maksimal 50 node timeline.',
            'nodes.list' => 'Node timeline harus berupa daftar berurutan.',
            'nodes.*.title.required' => 'Judul node wajib diisi.',
            'nodes.*.title.max' => 'Judul node maksimal 255 karakter.',
            'nodes.*.description.max' => 'Deskripsi node maksimal 5000 karakter.',
            'nodes.*.studio.max' => 'Nama studio maksimal 255 karakter.',
            'nodes.*.book_id.integer' => 'Pilihan buku tidak valid.',
            'nodes.*.book_id.exists' => 'Buku yang dipilih tidak ditemukan.',

            'nodes.*.adaptation_label.max' => 'Label adaptasi maksimal 255 karakter.',
            'nodes.*.adaptation_range.max' => 'Rentang adaptasi maksimal 255 karakter.',
            'nodes.*.adaptation_chapters.max' => 'Keterangan bab maksimal 255 karakter.',

            'nodes.*.tags.max' => 'Maksimal 5 chip tag per node.',
            'nodes.*.tags.*.label.required' => 'Label tag wajib diisi.',
            'nodes.*.tags.*.label.max' => 'Label tag maksimal 50 karakter.',
            'nodes.*.tags.*.tone.required' => 'Pilih warna tag.',
            'nodes.*.tags.*.tone.in' => 'Warna tag tidak valid.',

            'nodes.*.links.max' => 'Maksimal 20 link per node.',
            'nodes.*.links.list' => 'Link harus berupa daftar berurutan.',
            'nodes.*.links.*.category.required' => 'Pilih kategori link.',
            'nodes.*.links.*.category.enum' => 'Kategori link tidak valid.',
            'nodes.*.links.*.platform_name.required' => 'Nama platform wajib diisi.',
            'nodes.*.links.*.platform_name.max' => 'Nama platform maksimal 255 karakter.',
            'nodes.*.links.*.title.max' => 'Judul link maksimal 255 karakter.',
            'nodes.*.links.*.status.required' => 'Pilih status akses.',
            'nodes.*.links.*.status.enum' => 'Status akses tidak valid.',
            'nodes.*.links.*.url.required' => 'Link URL wajib diisi.',
            'nodes.*.links.*.url.url' => 'URL link tidak valid.',
            'nodes.*.links.*.url.max' => 'URL link maksimal 2048 karakter.',
        ];
    }
}
