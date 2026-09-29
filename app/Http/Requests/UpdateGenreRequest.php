<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGenreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $genreId = $this->route('genre')->id;

        return [
            'name' => [
                'required',
                'string',
                'max:100',

                Rule::unique('genres', 'name')
                    ->ignore($genreId),
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