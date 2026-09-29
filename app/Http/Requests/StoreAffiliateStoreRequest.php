<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAffiliateStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:100',
                'unique:affiliate_stores,name',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama toko wajib diisi.',
            'name.string' => 'Nama toko harus berupa teks.',
            'name.max' => 'Nama toko maksimal 100 karakter.',
            'name.unique' => 'Toko tersebut sudah tersedia.',
        ];
    }
}