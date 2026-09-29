<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePublisherRequest extends FormRequest
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
                'max:150',
                'unique:publishers,name',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama penerbit wajib diisi.',
            'name.max' => 'Nama penerbit maksimal 150 karakter.',
            'name.unique' => 'Penerbit tersebut sudah tersedia.',
        ];
    }
}