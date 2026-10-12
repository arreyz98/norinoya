<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Kolom short_description sudah tidak dipakai lagi. Kolom ini ikut menjadi
     * bagian index FULLTEXT books_search_fulltext, jadi index-nya di-drop dulu
     * lalu dibuat ulang tanpa kolom tersebut.
     */
    public function up(): void
    {
        if ($this->supportsFullText()) {
            DB::statement('ALTER TABLE books DROP INDEX books_search_fulltext');
        }

        Schema::table('books', function (Blueprint $table) {
            $table->dropColumn('short_description');
        });

        if ($this->supportsFullText()) {
            DB::statement('ALTER TABLE books ADD FULLTEXT books_search_fulltext (title, synopsis)');
        }

        Cache::forget('books_fulltext_index');
    }

    public function down(): void
    {
        if ($this->supportsFullText()) {
            DB::statement('ALTER TABLE books DROP INDEX books_search_fulltext');
        }

        Schema::table('books', function (Blueprint $table) {
            $table->text('short_description')->nullable()->after('synopsis');
        });

        if ($this->supportsFullText()) {
            DB::statement('ALTER TABLE books ADD FULLTEXT books_search_fulltext (title, synopsis, short_description)');
        }

        Cache::forget('books_fulltext_index');
    }

    private function supportsFullText(): bool
    {
        return in_array(DB::connection()->getDriverName(), ['mysql', 'mariadb'], true);
    }
};
