<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookSeriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bookSeries = [
            'The Beginning After The End',
            'Solo Leveling',
            'The Hunter X Hunter',
            'One Piece',
            'Naruto',
            'Dragon Ball',
            'Demon Slayer',
        ];

        foreach ($bookSeries as $title) {
            DB::table('book_series')->insert([
                'title' => $title,
                'slug' => Str::slug($title),
                'description' => 'Deskripsi untuk series ' . $title, // Opsional karena nullable
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}