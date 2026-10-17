<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('panduan_adaptasi_nodes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('panduan_adaptasi_id')
                ->constrained('panduan_adaptasi')
                ->cascadeOnDelete();

            // Buku yang ditampilkan di kartu node. Nullable supaya node
            // "Segera Hadir" tetap bisa dibuat tanpa memilih buku.
            $table->foreignId('book_id')
                ->nullable()
                ->constrained('books')
                ->nullOnDelete();

            $table->string('title');
            $table->text('description')->nullable();
            $table->string('studio')->nullable();

            // Kotak "Adaptasi Buku" (mis. label + "Volume 1 s/d 4" + "(Bab 1 — 34)").
            $table->string('adaptation_label')->nullable();
            $table->string('adaptation_range')->nullable();
            $table->string('adaptation_chapters')->nullable();

            // Chip tag per node: [{ label, tone }] — null saat kosong.
            $table->json('tags')->nullable();

            $table->boolean('is_upcoming')->default(false);
            $table->unsignedInteger('sort_order')->default(1);
            $table->timestamps();

            $table->index(['panduan_adaptasi_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('panduan_adaptasi_nodes');
    }
};
