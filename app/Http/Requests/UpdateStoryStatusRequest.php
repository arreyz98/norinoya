<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStoryStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $storyStatus = $this->route('story_status');

        return [
            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('story_statuses', 'name')
                    ->ignore($storyStatus->id),
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