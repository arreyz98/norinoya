<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AffiliateStoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stores = [
            'Shopee',
            'Tokopedia',
            'TikTok Shop',
            'Gramedia',
            'Lazada',
        ];

        foreach ($stores as $store) {
            DB::table('affiliate_stores')->insert([
                'name'       => $store,
                'slug'       => Str::slug($store),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}