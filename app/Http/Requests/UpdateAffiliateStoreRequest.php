<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAffiliateStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $affiliateStore = $this->route('affiliate_store');

        return [
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique(
                    'affiliate_stores',
                    'name'
                )->ignore($affiliateStore->id),
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