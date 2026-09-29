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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('username')->default('norinoya_official');
            $table->string('display_name')->default('Norinoya Official');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->string('category')->default('rilisan');
            $table->json('hash_tags')->nullable();
            $table->string('attached_image')->nullable();
            $table->json('gallery_images')->nullable();
            $table->string('reading_rating')->nullable();
            $table->boolean('is_pinned')->default(false);

            // Opsional: Feature Polling
            $table->string('poll_question')->nullable();
            $table->json('poll_options')->nullable(); // Array of { id, label, votes }

            // Opsional: Feature Initial Reactions Boost
            $table->json('reactions')->nullable(); // Array of { id, emoji, label, count }

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
