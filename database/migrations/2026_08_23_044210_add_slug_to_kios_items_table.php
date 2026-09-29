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
        Schema::table('kios_items', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('title');
        });

        // Generate slugs for existing items
        $items = \App\Models\KiosItem::all();
        foreach ($items as $item) {
            $baseSlug = \Illuminate\Support\Str::slug($item->title);
            $slug = $baseSlug;
            $count = 1;
            while (\App\Models\KiosItem::where('slug', $slug)->where('id', '!=', $item->id)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }
            $item->slug = $slug ?: 'item-' . $item->id;
            $item->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kios_items', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
