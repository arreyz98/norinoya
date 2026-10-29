<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Default 'published' supaya seluruh berita lama tetap tampil di situs publik.
            $table->string('publication_status')->default('published')->after('category')->index();
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropIndex(['publication_status']);
            $table->dropColumn('publication_status');
        });
    }
};
