<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        $authors = [
            [
                'name' => 'Eiichiro Oda',
            ],
            [
                'name' => 'Masashi Kishimoto',
            ],
            [
                'name' => 'Hajime Isayama',
            ],
        ];

        foreach ($authors as $author) {
            Author::firstOrCreate(
                ['slug' => Str::slug($author['name'])],
                $author
            );
        }
    }
}