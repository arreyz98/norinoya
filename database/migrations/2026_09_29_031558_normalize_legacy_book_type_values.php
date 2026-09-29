<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Data migration: menormalkan nilai buku.book_type yang tidak dikenal
     * oleh enum App\Enums\BookType (mis. legacy "J-Lit (Japanese Literature)").
     *
     * Tanpa ini, model Book (cast book_type => BookType) melempar ValueError
     * saat membaca baris dengan backing value lama.
     */
    public function up(): void
    {
        $valid = ['Manga', 'Komik', 'Komik Lokal', 'Light Novel', 'Novel', 'J Lit'];

        $rows = DB::table('books')
            ->select('id', 'book_type')
            ->whereNotNull('book_type')
            ->get();

        foreach ($rows as $row) {
            if (in_array($row->book_type, $valid, true)) {
                continue;
            }

            $normalized = $this->normalize((string) $row->book_type);

            if ($normalized !== null && $normalized !== $row->book_type) {
                DB::table('books')
                    ->where('id', $row->id)
                    ->update(['book_type' => $normalized]);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * Tidak bisa membalikkan pemetaan nilai lama secara andal,
     * karena itu down() sengaja no-op.
     */
    public function down(): void
    {
        //
    }

    /**
     * Petakan variasi penulisan lama ke backing value enum saat ini.
     * Mengikuti logika mapBookTypeToCategory() di resources/js/utils/mapBookToComic.ts.
     */
    private function normalize(string $raw): ?string
    {
        $b = strtolower(trim(preg_replace('/[\s\-_]+/u', ' ', $raw) ?? ''));

        if ($b === '') {
            return null;
        }

        if (str_contains($b, 'light novel') || (str_contains($b, 'light') && str_contains($b, 'novel'))) {
            return 'Light Novel';
        }

        if (str_contains($b, 'j lit') || str_contains($b, 'japanese literature') || $b === 'jlit') {
            return 'J Lit';
        }

        if (str_contains($b, 'komik lokal') || str_contains($b, 'comic lokal') || str_contains($b, 'lokal')) {
            return 'Komik Lokal';
        }

        if (str_contains($b, 'novel')) {
            return 'Novel';
        }

        if (str_contains($b, 'manga')) {
            return 'Manga';
        }

        if (str_contains($b, 'komik') || str_contains($b, 'comic')) {
            return 'Komik';
        }

        return null;
    }
};
