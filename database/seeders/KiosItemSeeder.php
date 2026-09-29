<?php

namespace Database\Seeders;

use App\Models\KiosItem;
use Illuminate\Database\Seeder;

class KiosItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'Frieren: After the End Vol 1 (Preloved)',
                'comic_title' => 'Frieren: After the End',
                'vol_number' => 1,
                'category' => 'manga',
                'cover_image' => 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=400&auto=format&fit=crop&q=80',
                'carousel_images' => [
                    'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
                ],
                'carousel_labels' => ['Cover Depan', 'Punggung Buku (Spine)', 'Cover Belakang', 'Halaman Kertas'],
                'synopsis' => 'Petualangan penyihir elf Frieren setelah sang pahlawan meninggal dunia.',
                'notes' => 'Kondisi 99% mulus seperti baru. Hanya dibuka segel untuk review kertas komik & live unboxing satu kali, jaket luar bersih tanpa tekukan, kertas putih bersih tanpa bercak kuning.',
                'price' => 38000,
                'original_price' => 45000,
                'condition_rating' => 'S',
                'is_preloved' => true,
                'is_sold_out' => false,
                'rating' => 5,
                'genres' => ['Preloved', 'Fantasy', 'Adventure'],
                'publisher_name' => 'Preloved @konotasi',
                'publisher_id' => 'preloved',
                'author' => 'Kanehito Yamada & Tsukasa Abe',
                'reading_rating' => 'Remaja',
                'status' => 'completed',
                'demographic' => 'Shonen',
                'isbn' => '978-623-00-2777-2',
                'release_date' => '2023',
                'cetakan_info' => 'Cetakan I (2023) - Elex Media Komputindo',
                'shopee_url' => 'https://shopee.co.id/norinoya.sukasuka',
                'tokopedia_url' => 'https://tokopedia.com/konotasi.sukasuka',
            ],
            [
                'title' => 'Chainsaw Man Vol 1 (Preloved Koleksi)',
                'comic_title' => 'Chainsaw Man',
                'vol_number' => 1,
                'category' => 'manga',
                'cover_image' => 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
                'carousel_images' => [
                    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=800&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
                ],
                'carousel_labels' => ['Cover Depan', 'Punggung Buku (Spine)', 'Cover Belakang', 'Halaman Kertas'],
                'synopsis' => 'Denji yang terikat kontrak dengan iblis gergaji mesin Pochita.',
                'notes' => 'Kondisi 95% sangat baik. Jaket mengkilap, ada sedikit tekukan mikro pada sudut belakang kiri bawah, bagian kertas dalam sangat mulus & bersih.',
                'price' => 32000,
                'original_price' => 40000,
                'condition_rating' => 'A',
                'is_preloved' => true,
                'is_sold_out' => false,
                'rating' => 4.9,
                'genres' => ['Preloved', 'Action', 'Dark Fantasy'],
                'publisher_name' => 'Preloved @konotasi',
                'publisher_id' => 'preloved',
                'author' => 'Tatsuki Fujimoto',
                'reading_rating' => 'Dewasa Ringan',
                'status' => 'completed',
                'demographic' => 'Shonen',
                'isbn' => '978-623-03-0511-9',
                'release_date' => '2023',
                'cetakan_info' => 'Cetakan I (2023) - m&c! Koloni',
                'shopee_url' => 'https://shopee.co.id/norinoya.sukasuka',
                'tokopedia_url' => 'https://tokopedia.com/konotasi.sukasuka',
            ],
            [
                'title' => 'Pokemon TCG: Scarlet & Violet Booster Pack',
                'comic_title' => 'Pokemon TCG Booster Pack',
                'vol_number' => 1,
                'category' => 'trading_card',
                'cover_image' => 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&auto=format&fit=crop&q=80',
                'carousel_images' => [
                    'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&auto=format&fit=crop&q=80'
                ],
                'carousel_labels' => ['Produk Depan'],
                'synopsis' => 'Booster pack kartu Pokemon TCG original versi bahasa Indonesia / Inggris. Berisi 5 kartu acak dengan kesempatan mendapatkan kartu Rare Holo/SR.',
                'notes' => 'Original Merchandise Partner Baru dan Bersegel Resmi geekmode.id.',
                'price' => 45000,
                'original_price' => 50000,
                'condition_rating' => 'S',
                'is_preloved' => false,
                'is_sold_out' => false,
                'rating' => 4.9,
                'genres' => ['Merchandise', 'Card Game', 'Collectibles'],
                'publisher_name' => 'geekmode.id',
                'publisher_id' => 'geekmode',
                'author' => 'The Pokemon Company',
                'reading_rating' => 'Semua Umur',
                'status' => 'completed',
                'demographic' => 'General',
                'isbn' => 'TCG-ID-001',
                'release_date' => '2024',
                'cetakan_info' => 'Original Merchandise Partner geekmode.id',
                'shopee_url' => 'https://shopee.co.id/geekmode.id',
                'tokopedia_url' => 'https://tokopedia.com/geekmode',
            ],
        ];

        foreach ($items as $item) {
            KiosItem::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
