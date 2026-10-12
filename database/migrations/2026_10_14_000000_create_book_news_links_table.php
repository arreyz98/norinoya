<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('book_news_links', function (Blueprint $table) {
            $table->id();

            $table->foreignId('book_id')
                ->constrained('books')
                ->cascadeOnDelete();

            // Judul opsional. Kalau kosong, judul diambil dari berita yang cocok
            // (untuk link internal) atau di-humanize dari slug URL.
            $table->string('title')->nullable();

            $table->text('url');

            $table->unsignedInteger('sort_order')
                ->default(1);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('book_news_links');
    }
};
