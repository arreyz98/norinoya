<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEditionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $edition = $this->route('edition');

        return [
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('editions', 'name')
                    ->ignore($edition->id),
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