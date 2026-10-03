<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->index('created_at');
            $table->index(['series_id', 'created_at']);
            $table->index(['publisher_id', 'created_at']);
            $table->index('views_count');
        });

        if ($this->supportsFullText()) {
            DB::statement('ALTER TABLE books ADD FULLTEXT books_search_fulltext (title, synopsis, short_description)');
        }

        Cache::forget('books_fulltext_index');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if ($this->supportsFullText()) {
            DB::statement('ALTER TABLE books DROP INDEX books_search_fulltext');
        }

        Schema::table('books', function (Blueprint $table) {
            $table->dropIndex(['created_at']);
            $table->dropIndex(['series_id', 'created_at']);
            $table->dropIndex(['publisher_id', 'created_at']);
            $table->dropIndex(['views_count']);
        });

        Cache::forget('books_fulltext_index');
    }

    private function supportsFullText(): bool
    {
        return in_array(DB::connection()->getDriverName(), ['mysql', 'mariadb'], true);
    }
};
