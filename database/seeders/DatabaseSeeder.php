<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    // public function run(): void
    // {
    //     // User::factory(10)->create();

    //     User::factory()->create([
    //         'name' => 'Test User',
    //         'email' => 'test@example.com',
    //     ]);
    // }
    public function run(): void
{
    $this->call([
        UserSeeder::class,
        EditionSeeder::class,
        StoryStatusSeeder::class,
        GenreSeeder::class,
        PublisherSeeder::class,
        AuthorSeeder::class,
        BookSeriesSeeder::class,
        AffiliateStoreSeeder::class,
        StoryStatusSeeder::class,
        BookSeeder::class,
        BookImagesSeeder::class,
        BookTiktokEmbedSeeder::class,
    ]);
}
}
