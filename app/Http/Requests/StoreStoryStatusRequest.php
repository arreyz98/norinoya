<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStoryStatusRequest extends FormRequest
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
                'unique:story_statuses,name',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Nama status cerita wajib diisi.',
            'name.max' => 'Nama status maksimal 100 karakter.',
            'name.unique' => 'Status cerita tersebut sudah tersedia.',
        ];
    }
}