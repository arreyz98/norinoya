<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoryStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            'Ongoing',
            'Completed',
            'Hiatus',
        ];

        foreach ($statuses as $status) {
            DB::table('story_statuses')->insert([
                'name' => $status,
                'slug' => Str::slug($status),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}