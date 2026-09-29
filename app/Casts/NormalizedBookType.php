<?php

namespace App\Casts;

use App\Enums\BookType;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

/**
 * Cast book_type yang toleran terhadap nilai legacy.
 *
 * BookType::from() (cast bawaan Eloquent) melempar ValueError bila baris
 * berisi backing value lama, mis. "J-Lit (Japanese Literature)".
 * Cast ini mencoba tryFrom() lebih dulu, lalu menormalkan variasi penulisan
 * (mengikuti logika mapBookTypeToCategory() di resources/js/utils/mapBookToComic.ts).
 * Nilai yang tetap tidak dikenali dikembalikan apa adanya sebagai string,
 * sehingga halaman tetap tampil (bukan 500) dan pemilihannya bisa dilihat
 * lewat "$book->book_type?->value ?? $book->book_type" di controller.
 */
class NormalizedBookType implements CastsAttributes
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if ($value === null || $value instanceof BookType) {
            return $value;
        }

        $value = (string) $value;

        return BookType::tryFrom($value) ?? self::normalize($value) ?? $value;
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if ($value instanceof BookType) {
            return $value->value;
        }

        if (is_string($value)) {
            $enum = BookType::tryFrom(trim($value)) ?? self::normalize($value);

            if ($enum !== null) {
                return $enum->value;
            }
        }

        return $value;
    }

    private static function normalize(string $raw): ?BookType
    {
        $b = strtolower(trim(preg_replace('/[\s\-_]+/u', ' ', $raw) ?? ''));

        if ($b === '') {
            return null;
        }

        if (str_contains($b, 'light novel') || (str_contains($b, 'light') && str_contains($b, 'novel'))) {
            return BookType::LIGHT_NOVEL;
        }

        if (str_contains($b, 'j lit') || str_contains($b, 'japanese literature') || $b === 'jlit') {
            return BookType::J_LIT;
        }

        if (str_contains($b, 'lokal')) {
            return BookType::KOMIK_LOKAL;
        }

        if (str_contains($b, 'novel')) {
            return BookType::NOVEL;
        }

        if (str_contains($b, 'manga')) {
            return BookType::MANGA;
        }

        if (str_contains($b, 'komik') || str_contains($b, 'comic')) {
            return BookType::KOMIK;
        }

        return null;
    }
}
