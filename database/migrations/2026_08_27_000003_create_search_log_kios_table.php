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
        Schema::create('search_log_kios', function (Blueprint $table) {
            $table->id();
            $table->string('keyword', 255);
            $table->unsignedInteger('search_count')->default(1);
            $table->date('search_date');
            $table->timestamps();

            $table->unique(['keyword', 'search_date'], 'search_log_kios_keyword_date_unique');
            $table->index('search_date');
            $table->index('keyword');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('search_log_kios');
    }
};
