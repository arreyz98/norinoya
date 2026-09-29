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
        Schema::create('kios_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('comic_title')->nullable();
            $table->integer('vol_number')->default(1);
            $table->string('category')->default('manga');
            $table->text('cover_image')->nullable();
            $table->json('carousel_images')->nullable();
            $table->json('carousel_labels')->nullable();
            $table->text('synopsis')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('price', 15, 2)->default(0);
            $table->decimal('original_price', 15, 2)->nullable();
            $table->string('condition_rating')->default('S'); // S, A, B, C, D
            $table->boolean('is_preloved')->default(false);
            $table->boolean('is_sold_out')->default(false);
            $table->float('rating')->default(5.0);
            $table->json('genres')->nullable();
            $table->string('publisher_name')->nullable(); // e.g. Preloved @konotasi, geekmode.id, animate, kyouhobbyshop
            $table->string('publisher_id')->nullable(); // preloved, geekmode, animate, kyou
            $table->string('author')->nullable();
            $table->string('reading_rating')->nullable()->default('Remaja');
            $table->string('status')->default('completed');
            $table->string('demographic')->default('General');
            $table->string('isbn')->nullable();
            $table->string('release_date')->nullable();
            $table->text('cetakan_info')->nullable();
            $table->text('shopee_url')->nullable();
            $table->text('tokopedia_url')->nullable();
            $table->text('gramedia_url')->nullable();
            $table->foreignId('linked_book_id')->nullable()->constrained('books')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kios_items');
    }
};
