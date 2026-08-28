<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuthorRequest extends FormRequest
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
                'max:255',
                'unique:authors,name',
            ],

            'biography' => [
                'nullable',
                'string',
                'max:5000',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama author wajib diisi.',

            'name.unique' => 'Author dengan nama tersebut sudah ada.',

            'name.max' => 'Nama author maksimal 255 karakter.',

            'biography.max' => 'Biografi maksimal 5000 karakter.',
        ];
    }
}