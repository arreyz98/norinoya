<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookTiktokEmbedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua data buku dari tabel books
        $books = DB::table('books')->get();

        $tiktokEmbeds = [];

        foreach ($books as $book) {
            // Contoh URL embed TikTok dummy, Anda bisa menyesuaikannya
            $tiktokEmbeds[] = [
                'book_id'    => $book->id,
                'name' => 'Review TikTok :'.$book->title,
                'url_video'  => 'https://www.tiktok.com/@norinoya.official/photo/7672668560115780885',
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        if (!empty($tiktokEmbeds)) {
            DB::table('book_tiktok_embeds')->insert($tiktokEmbeds);
        }
    }
}