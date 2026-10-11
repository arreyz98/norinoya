<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    private const SLUG_MAX_LENGTH = 180;

    private const SLUG_HISTORY_LIMIT = 10;

    /**
     * Menambah kolom riwayat slug + merapikan slug lama menjadi slug bersih
     * berbasis judul (tanpa suffix random), tanpa memutus link lama.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('news', 'slug_history')) {
            Schema::table('news', function (Blueprint $table) {
                $table->json('slug_history')->nullable()->after('slug');
            });
        }

        $this->normalizeSlugs();
    }

    public function down(): void
    {
        if (Schema::hasColumn('news', 'slug_history')) {
            Schema::table('news', function (Blueprint $table) {
                $table->dropColumn('slug_history');
            });
        }
    }

    private function normalizeSlugs(): void
    {
        if (! Schema::hasTable('news')) {
            return;
        }

        $used = DB::table('news')
            ->whereNotNull('slug')
            ->pluck('slug')
            ->map(fn ($slug) => (string) $slug)
            ->filter()
            ->flip()
            ->all();

        DB::table('news')->orderBy('id')->chunkById(100, function ($rows) use (&$used) {
            foreach ($rows as $row) {
                $current = (string) ($row->slug ?? '');
                $base = $this->baseSlug((string) $row->title);

                if ($base === $current) {
                    continue;
                }

                unset($used[$current]);

                $slug = $base;
                $counter = 2;

                while (isset($used[$slug])) {
                    $suffix = '-' . $counter;
                    $slug = trim(Str::limit($base, self::SLUG_MAX_LENGTH - strlen($suffix), ''), '-') . $suffix;
                    $counter++;
                }

                $history = json_decode((string) ($row->slug_history ?? '[]'), true);
                $history = is_array($history) ? $history : [];

                if ($current !== '') {
                    array_unshift($history, $current);
                    $history = array_values(array_unique($history));
                }

                DB::table('news')->where('id', $row->id)->update([
                    'slug' => $slug,
                    'slug_history' => json_encode(array_slice($history, 0, self::SLUG_HISTORY_LIMIT)),
                ]);

                $used[$slug] = true;
            }
        });
    }

    private function baseSlug(string $title): string
    {
        $base = Str::slug($title);

        if ($base === '') {
            $base = 'berita';
        }

        if (is_numeric($base)) {
            $base = 'berita-' . $base;
        }

        return trim(Str::limit($base, self::SLUG_MAX_LENGTH, ''), '-');
    }
};
