<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('kios_items', function (Blueprint $table) {
            $table->unsignedBigInteger('views_count')->default(0)->after('linked_book_id');
            $table->unsignedBigInteger('shopee_clicks_count')->default(0)->after('views_count');
            $table->unsignedBigInteger('tokopedia_clicks_count')->default(0)->after('shopee_clicks_count');
            $table->unsignedBigInteger('gramedia_clicks_count')->default(0)->after('tokopedia_clicks_count');
            $table->unsignedBigInteger('toco_clicks_count')->default(0)->after('gramedia_clicks_count');
            $table->unsignedBigInteger('total_clicks_count')->default(0)->after('toco_clicks_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kios_items', function (Blueprint $table) {
            $table->dropColumn([
                'views_count',
                'shopee_clicks_count',
                'tokopedia_clicks_count',
                'gramedia_clicks_count',
                'toco_clicks_count',
                'total_clicks_count',
            ]);
        });
    }
};
