<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAuthorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $authorId = $this->route('author')->id;

        return [
            'name' => [
                'required',
                'string',
                'max:255',

                Rule::unique('authors', 'name')
                    ->ignore($authorId),
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