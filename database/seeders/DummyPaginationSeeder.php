<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\BookSeries;
use App\Models\Publisher;
use App\Models\StoryStatus;
use App\Models\Edition;
use App\Models\News;
use App\Models\KiosItem;
use App\Models\KiosPartner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DummyPaginationSeeder extends Seeder
{
    /**
     * Run the database seeds to test pagination on Book, News, and KiosItem models.
     */
    public function run(): void
    {
        // 1. Ensure minimal relational dependencies exist
        $publisher = Publisher::first() ?? Publisher::create([
            'name' => 'Gramedia / Elex Media',
            'slug' => 'gramedia-elex-media',
        ]);

        $series = BookSeries::first() ?? BookSeries::create([
            'title' => 'Norinoya Special Series',
            'slug' => 'norinoya-special-series',
        ]);

        $edition = Edition::first() ?? Edition::create([
            'name' => 'Regular Edition',
            'slug' => 'regular-edition',
        ]);

        $status = StoryStatus::first() ?? StoryStatus::create([
            'name' => 'Ongoing',
            'slug' => 'ongoing',
        ]);

        $partner = KiosPartner::first() ?? KiosPartner::create([
            'name' => 'Norinoya Official Store',
            'slug' => 'norinoya-official-store',
            'description' => 'Toko partner resmi merchandise dan komik original.',
        ]);

        $bookSampleTitles = [
            'Frieren: Beyond Journey\'s End',
            'Sousou no Frieren',
            'Jujutsu Kaisen',
            'Chainsaw Man',
            'Oshi no Ko',
            'Spy x Family',
            'Blue Lock',
            'Kaiju No. 8',
            'Dandadan',
            'Bocchi the Rock!',
            'The Apothecary Diaries',
            'Solo Leveling',
            'Omniscient Reader\'s Viewpoint',
            'Wind Breaker',
            'Tokyo Revengers',
            'Demon Slayer: Kimetsu no Yaiba',
            'Attack on Titan',
            'Haikyu!!',
            'My Hero Academia',
            'One Punch Man',
            'Vinland Saga',
            'Mushoku Tensei',
            'Re:Zero Starting Life in Another World',
            'Sword Art Online',
            'That Time I Got Reincarnated as a Slime',
        ];

        // ==========================================
        // 1. SEED DUMMY BOOKS (25 Items)
        // ==========================================
        $this->command?->info('Seeding 25 Books for pagination test...');
        for ($i = 1; $i <= 25; $i++) {
            $baseTitle = $bookSampleTitles[($i - 1) % count($bookSampleTitles)];
            $vol = ($i % 5) + 1;
            $title = "{$baseTitle} Vol. {$vol} (Dummy #{$i})";
            $slug = Str::slug($title) . '-' . time() . '-' . $i;

            Book::create([
                'title' => $title,
                'slug' => $slug,
                'series_id' => $series->id,
                'volume' => $vol,
                'edition_id' => $edition->id,
                'story_status_id' => $status->id,
                'publisher_id' => $publisher->id,
                'book_type' => $i % 2 === 0 ? 'Manga' : 'Light Novel',
                'age_rating' => $i % 3 === 0 ? 'Dewasa Ringan' : 'Remaja',
                'synopsis' => "Sinopsis lengkap dan review ulasan untuk buku dummy {$title}. Cerita yang sangat menarik dengan alur yang seru dan menegangkan untuk dibaca.",
                'short_description' => "Ulasan singkat buku dummy {$title}.",
                'msrp' => 45000 + ($i * 2500),
                'isbn' => '978-602-' . str_pad((string)$i, 6, '0', STR_PAD_LEFT),
                'page_count' => 180 + ($i * 10),
                'paper_type' => 'Bookpaper 55gr',
                'dimensions' => '13 x 18 cm',
                'adaptation' => 'Anime TV',
                'is_upcoming' => $i % 4 === 0,
                'views_count' => rand(50, 2500),
            ]);
        }

        // ==========================================
        // 2. SEED DUMMY NEWS (25 Items)
        // ==========================================
        $newsCategories = ['rilisan', 'cetakan_ulang', 'edukasi', 'promo', 'manga', 'light_novel', 'anime', 'event'];
        $newsHeadlines = [
            'Pengumuman Jadwal Rilis Komik & Manga Terbaru Bulan Ini',
            'Ulasan Lengkap & Perbandingan Edisi Kolektor vs Edisi Reguler',
            'Informasi Cetak Ulang Manga Populer yang Paling Ditunggu',
            'Bocoran Adaptasi Anime Season Baru dan Tanggal Penayangannya',
            'Promo Spesial Diskon & Bundle Merchandise di Kios Norinoya',
            'Tips Merawat Koleksi Komik dan Light Novel Agar Tidak Menguning',
            'Event Pop Culture dan Komik Gathering Nasional Terbesar Tahun Ini',
            'Rekomendasi Manga Slice of Life Terbaik untuk Menemani Akhir Pekan',
        ];

        $this->command?->info('Seeding 25 News Articles for pagination test...');
        for ($i = 1; $i <= 25; $i++) {
            $cat = $newsCategories[($i - 1) % count($newsCategories)];
            $headline = $newsHeadlines[($i - 1) % count($newsHeadlines)] . " (Part #{$i})";
            $slug = Str::slug($headline) . '-' . time() . '-' . $i;

            News::create([
                'username' => 'norinoya_editorial',
                'display_name' => 'Norinoya Editorial Team',
                'title' => $headline,
                'slug' => $slug,
                'content' => "<p>Halo para pembaca setia Norinoya! Pada edisi kali ini kita akan mengulas berita penting mengenai <strong>{$headline}</strong>.</p><p>Simak terus pembaruan informasi terkini seputar dunia literasi komik, novel, dan merchandise resmi hanya di platform Norinoya.</p>",
                'category' => $cat,
                'hash_tags' => ['#NorinoyaNews', '#' . ucfirst($cat), '#MangaUpdate', '#AnimeIndonesia'],
                'reading_rating' => 'Semua Umur',
                'is_pinned' => $i === 1,
                'poll_question' => $i % 3 === 0 ? "Bagaimana tanggapan Anda mengenai {$headline}?" : null,
                'poll_options' => $i % 3 === 0 ? [
                    ['id' => '1', 'label' => 'Sangat Menarik', 'votes' => rand(20, 150)],
                    ['id' => '2', 'label' => 'Biasa Saja', 'votes' => rand(5, 50)],
                ] : null,
                'reactions' => [
                    ['id' => 'fire', 'emoji' => '🔥', 'label' => 'Hype!', 'count' => rand(10, 200)],
                    ['id' => 'heart', 'emoji' => '😍', 'label' => 'Mau Banget', 'count' => rand(10, 150)],
                    ['id' => 'mind_blown', 'emoji' => '🤯', 'label' => 'Baru Tahu', 'count' => rand(5, 80)],
                    ['id' => 'thumbs_up', 'emoji' => '👍', 'label' => 'Sangat Setuju', 'count' => rand(10, 120)],
                ],
                'views_count' => rand(100, 5000),
            ]);
        }

        // ==========================================
        // 3. SEED DUMMY KIOS ITEMS (25 Items)
        // ==========================================
        $kiosMerchTypes = ['manga', 'light_novel', 'trading_card', 'apparel', 'lifestyle', 'tas', 'aksesoris', 'figurine'];
        $kiosTitles = [
            'Kaos Oversize Anime Norinoya Official Edition',
            'Gantungan Kunci Akrilik Karakter Eksklusif',
            'Komik Preloved Grade S - Koleksi Pribadi Mulus',
            'Trading Card Game Booster Pack Edisi Kolektor',
            'Tote Bag Kanvas Premium Ilustrasi Manga',
            'Tumbler Stainless Steel Anime Aesthetic',
            'Deskmat Gaming Anti Slip Water-Resistant',
            'Figure Chibi Karakter Original Limited Run',
        ];

        $this->command?->info('Seeding 25 Kios Items for pagination test...');
        for ($i = 1; $i <= 25; $i++) {
            $type = $kiosMerchTypes[($i - 1) % count($kiosMerchTypes)];
            $itemName = $kiosTitles[($i - 1) % count($kiosTitles)] . " (Batch #{$i})";
            $slug = Str::slug($itemName) . '-' . time() . '-' . $i;
            $price = 35000 + ($i * 5000);
            $isPreloved = $i % 2 === 0;

            KiosItem::create([
                'title' => $itemName,
                'slug' => $slug,
                'comic_title' => $isPreloved ? "Koleksi Manga Preloved #{$i}" : '-',
                'vol_number' => $isPreloved ? ($i % 10) + 1 : 0,
                'category' => $type,
                'categories' => [$type, 'merchandise', 'official'],
                'merch_type' => $type,
                'deskripsi_produk' => "Produk berkualitas tinggi {$itemName}. Sangat cocok untuk kolektor maupun penggunaan harian dengan material premium.",
                'notes' => $isPreloved ? 'Kondisi mulus sekali baca, tidak ada lipatan tajam maupun coretan.' : 'Produk baru 100% original partner.',
                'price' => $price,
                'original_price' => $price + 20000,
                'condition_rating' => $isPreloved ? ($i % 3 === 0 ? 'A' : 'S') : 'S',
                'is_preloved' => $isPreloved,
                'is_sold_out' => $i % 6 === 0,
                'rating' => 4.8,
                'kios_partner_id' => $partner->id,
                'publisher_name' => $isPreloved ? 'Elex Media Komputindo' : 'Norinoya Partner Store',
                'shopee_url' => 'https://shopee.co.id',
                'tokopedia_url' => 'https://tokopedia.com',
                'gramedia_url' => 'https://gramedia.com',
                'toco_url' => 'https://toco.id',
                'views_count' => rand(50, 1800),
                'total_clicks_count' => rand(10, 500),
                'shopee_clicks_count' => rand(5, 200),
                'tokopedia_clicks_count' => rand(5, 200),
                'gramedia_clicks_count' => rand(1, 50),
                'toco_clicks_count' => rand(1, 50),
            ]);
        }

        $this->command?->info('Dummy Pagination Seeder successfully generated 25 Books, 25 News, and 25 Kios Items!');
    }
}
