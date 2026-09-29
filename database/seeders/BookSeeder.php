<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'title'             => 'The Beginning After The End Vol. 1',
                'series_id'         => 1, // Pastikan data di tabel book_series sudah ada
                'slug'              => Str::slug('The Beginning After The End Vol. 1'),
                'synopsis'          => 'King Grey has unmatched strength, wealth, and prestige in a society governed by martial ability...',
                'short_description' => 'Awal kisah perjalanan King Grey di dunia baru.',
                'volume'            => 1,
                'msrp'              => 125000.00,
                'news_link'         => 'https://example.com/news/tbate-1',
                'isbn'              => '978-602-04-1234-5',
                'page_count'        => 350,
                'paper_type'        => 'Bookpaper',
                'dimensions'        => '13 x 19 cm',
                'adaptation'        => 'Manhwa / Webtoon',
                'book_type'         => 'Novel',
                'age_rating'        => 'Remaja',
                'edition_id'        => 1, // Pastikan data di tabel editions sudah ada
                'publisher_id'      => 1, // Pastikan data di tabel publishers sudah ada
                'story_status_id'   => 1, // Pastikan data di tabel story_statuses sudah ada
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
            [
                'title'             => 'Solo Leveling Vol. 1',
                'series_id'         => 2,
                'slug'              => Str::slug('Solo Leveling Vol. 1'),
                'synopsis'          => 'In a world where hunters with magical powers battle deadly monsters, a weak hunter named Sung Jinwoo...',
                'short_description' => 'Petualangan Hunter terkecil yang bangkit menjadi penguasa bayangan.',
                'volume'            => 1,
                'msrp'              => 135000.00,
                'news_link'         => 'https://example.com/news/solo-leveling-1',
                'isbn'              => '978-602-04-1234-8',
                'page_count'        => 280,
                'paper_type'        => 'Bookpaper',
                'dimensions'        => '14 x 20 cm',
                'adaptation'        => 'Anime / Manhwa',
                'book_type'         => 'Komik',
                'age_rating'        => 'Dewasa Ringan',
                'edition_id'        => 1,
                'publisher_id'      => 1,
                'story_status_id'   => 1,
                'created_at'        => now(),
                'updated_at'        => now(),
            ],
        ];

        DB::table('books')->insert($books);
    }
}