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
        Schema::create('kios_view_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kios_item_id')->constrained('kios_items')->onDelete('cascade');
            $table->string('action_type')->default('view'); // 'view' or 'click_{platform}'
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();

            $table->index(['kios_item_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kios_view_logs');
    }
};
