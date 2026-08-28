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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            
            $table->string('title');
            $table->foreignId('series_id')
                ->nullable()
                ->constrained('book_series')
                ->nullOnDelete();

            $table->string('slug')->unique();

            $table->text('synopsis')->nullable();

            $table->text('short_description')->nullable();

            $table->unsignedInteger('volume');

            $table->decimal('msrp', 12, 2)->nullable();

            $table->string('news_link')->nullable();


            $table->string('isbn')->nullable();

            $table->unsignedInteger('page_count')->nullable();

            $table->string('paper_type')->nullable();

            $table->string('dimensions')->nullable();

            $table->string('adaptation')->nullable();

            $table->string('book_type');

            $table->string('age_rating');

            $table->foreignId('edition_id')
                ->constrained('editions')
                ->restrictOnDelete();

            $table->foreignId('publisher_id')
                ->constrained('publishers')
                ->restrictOnDelete();

            $table->foreignId('story_status_id')
                ->constrained('story_statuses')
                ->restrictOnDelete();

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
