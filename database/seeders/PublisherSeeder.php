<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Publisher;
use Illuminate\Support\Str;

class PublisherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $publishers = [
            'Elex Media',
            'Gramedia',
            'M&C',
            'Phoenix',
        ];

        foreach ($publishers as $publisher) {
            Publisher::firstOrCreate(
                ['slug' => Str::slug($publisher)],
                ['name' => $publisher]
            );
        }
    }
}
