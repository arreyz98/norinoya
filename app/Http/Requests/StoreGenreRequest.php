<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGenreRequest extends FormRequest
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
                'unique:genres,name',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama genre wajib diisi.',
            'name.max' => 'Nama genre maksimal 100 karakter.',
            'name.unique' => 'Genre tersebut sudah tersedia.',
        ];
    }
}