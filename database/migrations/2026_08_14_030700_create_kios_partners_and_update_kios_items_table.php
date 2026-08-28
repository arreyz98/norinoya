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
        Schema::create('kios_partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('logo_url')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('kios_items', function (Blueprint $table) {
            $table->string('merch_type')->nullable()->after('category');
            $table->json('categories')->nullable()->after('category');
            $table->foreignId('kios_partner_id')->nullable()->after('publisher_name')->constrained('kios_partners')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kios_items', function (Blueprint $table) {
            $table->dropForeign(['kios_partner_id']);
            $table->dropColumn(['kios_partner_id', 'merch_type', 'categories']);
        });

        Schema::dropIfExists('kios_partners');
    }
};
