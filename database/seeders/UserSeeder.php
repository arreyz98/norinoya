<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'komikusnganggur@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('Danzomati123'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}