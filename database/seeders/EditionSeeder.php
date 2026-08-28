<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $editions = [
            'Blinded Edition',
            'Special Edition',
            'Limited Edition',
            'Exclusive Edition',
        ];

        foreach ($editions as $edition) {
            DB::table('editions')->insert([
                'name' => $edition,
                'slug' => Str::slug($edition),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}