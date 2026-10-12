<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookInstagramEmbedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil semua data buku dari tabel books
        $books = DB::table('books')->get();

        $instagramEmbeds = [];

        foreach ($books as $book) {
            // Contoh URL postingan Instagram dummy, Anda bisa menyesuaikannya
            $instagramEmbeds[] = [
                'book_id'     => $book->id,
                'name'        => 'Review Instagram :'.$book->title,
                'url'         => 'https://www.instagram.com/p/DPe_Dmokn1A/',
                'thumbnail_url' => null,
                'title'       => 'Review Instagram :'.$book->title,
                'description' => null,
                'sort_order'  => 1,
                'created_at'  => now(),
                'updated_at'  => now(),
            ];
        }

        if (!empty($instagramEmbeds)) {
            DB::table('book_instagram_embeds')->insert($instagramEmbeds);
        }
    }
}
