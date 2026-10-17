<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('panduan_adaptasi_links', function (Blueprint $table) {
            $table->id();

            $table->foreignId('node_id')
                ->constrained('panduan_adaptasi_nodes')
                ->cascadeOnDelete();

            // takarir | dubbing | baca
            $table->string('category')->default('takarir');
            $table->string('platform_name');

            // Sub-label opsional yang tampil kecil di bawah nama platform.
            $table->string('title')->nullable();

            // gratis | subscription | digital | fisik | penerbit
            $table->string('status')->default('gratis');

            $table->text('url');
            $table->unsignedInteger('sort_order')->default(1);
            $table->timestamps();

            $table->index(['node_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('panduan_adaptasi_links');
    }
};
