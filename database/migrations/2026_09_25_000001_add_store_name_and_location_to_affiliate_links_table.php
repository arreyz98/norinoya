<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('affiliate_links', function (Blueprint $table) {
            $table->string('store_name')
                ->default('Official Store')
                ->after('affiliate_store_id');

            $table->string('location')
                ->default('Indonesia')
                ->after('store_name');
        });
    }

    public function down(): void
    {
        Schema::table('affiliate_links', function (Blueprint $table) {
            $table->dropColumn(['store_name', 'location']);
        });
    }
};
