<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEditionRequest extends FormRequest
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
                'unique:editions,name',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama edisi wajib diisi.',
            'name.max' => 'Nama edisi maksimal 100 karakter.',
            'name.unique' => 'Edisi tersebut sudah tersedia.',
        ];
    }
}