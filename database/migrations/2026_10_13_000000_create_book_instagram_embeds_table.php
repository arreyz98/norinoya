<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('book_instagram_embeds', function (Blueprint $table) {
            $table->id();

            $table->foreignId('book_id')
                ->constrained('books')
                ->cascadeOnDelete();

            // Nama/label opsional yang diisi admin.
            $table->string('name')->nullable();

            // URL postingan Instagram mentah (yang di-paste admin).
            $table->text('url');

            // Metadata hasil Microlink (nullable bila fetch gagal / post privat).
            $table->text('thumbnail_url')->nullable();
            $table->text('title')->nullable();
            $table->text('description')->nullable();

            $table->unsignedInteger('sort_order')
                ->default(1);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('book_instagram_embeds');
    }
};
