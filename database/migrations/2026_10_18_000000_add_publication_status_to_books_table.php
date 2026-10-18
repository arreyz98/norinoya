<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->string('publication_status')->default('published')->after('title')->index();
        });

        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign(['edition_id']);
            $table->dropForeign(['publisher_id']);
            $table->dropForeign(['story_status_id']);
        });

        Schema::table('books', function (Blueprint $table) {
            $table->string('volume')->nullable()->change();
            $table->string('book_type')->nullable()->change();
            $table->string('age_rating')->nullable()->change();
            $table->unsignedBigInteger('edition_id')->nullable()->change();
            $table->unsignedBigInteger('publisher_id')->nullable()->change();
            $table->unsignedBigInteger('story_status_id')->nullable()->change();
        });

        Schema::table('books', function (Blueprint $table) {
            $table->foreign('edition_id')->references('id')->on('editions')->restrictOnDelete();
            $table->foreign('publisher_id')->references('id')->on('publishers')->restrictOnDelete();
            $table->foreign('story_status_id')->references('id')->on('story_statuses')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            $table->dropForeign(['edition_id']);
            $table->dropForeign(['publisher_id']);
            $table->dropForeign(['story_status_id']);
        });

        Schema::table('books', function (Blueprint $table) {
            $table->string('volume')->nullable(false)->change();
            $table->string('book_type')->nullable(false)->change();
            $table->string('age_rating')->nullable(false)->change();
            $table->unsignedBigInteger('edition_id')->nullable(false)->change();
            $table->unsignedBigInteger('publisher_id')->nullable(false)->change();
            $table->unsignedBigInteger('story_status_id')->nullable(false)->change();
        });

        Schema::table('books', function (Blueprint $table) {
            $table->foreign('edition_id')->references('id')->on('editions')->restrictOnDelete();
            $table->foreign('publisher_id')->references('id')->on('publishers')->restrictOnDelete();
            $table->foreign('story_status_id')->references('id')->on('story_statuses')->restrictOnDelete();
            $table->dropIndex(['publication_status']);
            $table->dropColumn('publication_status');
        });
    }
};
