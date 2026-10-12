<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    /**
     * Batas panjang slug agar tetap aman terhadap kolom string(255),
     * termasuk saat ditambah suffix pembeda (-2, -3, dst).
     */
    public const SLUG_MAX_LENGTH = 180;

    /**
     * Jumlah maksimal slug lama yang disimpan untuk redirect 301.
     */
    public const SLUG_HISTORY_LIMIT = 10;

    protected $fillable = [
        'username',
        'display_name',
        'title',
        'slug',
        'slug_history',
        'content',
        'category',
        'hash_tags',
        'attached_image',
        'gallery_images',
        'reading_rating',
        'is_pinned',
        'poll_question',
        'poll_options',
        'reactions',
        'recommendations',
        'relevant_books',
        'views_count',
    ];

    protected $casts = [
        'hash_tags' => 'array',
        'gallery_images' => 'array',
        'is_pinned' => 'boolean',
        'poll_options' => 'array',
        'reactions' => 'array',
        'recommendations' => 'array',
        'relevant_books' => 'array',
        'views_count' => 'integer',
        'slug_history' => 'array',
    ];

    protected static function booted(): void
    {
        static::creating(function (News $news) {
            if (blank($news->slug)) {
                $news->slug = static::makeUniqueSlug((string) $news->title);
            }
        });
    }

    /**
     * Slug dasar dari judul: huruf kecil, spasi jadi tanda hubung, tanpa suffix.
     */
    public static function baseSlug(string $title): string
    {
        $base = Str::slug($title);

        if ($base === '') {
            $base = 'berita';
        }

        // Slug yang murni angka bisa bentrok dengan URL lama berbasis ID (/news/1).
        if (is_numeric($base)) {
            $base = 'berita-' . $base;
        }

        return trim(Str::limit($base, self::SLUG_MAX_LENGTH, ''), '-');
    }

    /**
     * Slug unik berbasis judul. Judul duplikat diberi suffix -2, -3, dst.
     */
    public static function makeUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = static::baseSlug($title);
        $slug = $base;
        $counter = 2;

        while (static::slugTaken($slug, $ignoreId)) {
            $suffix = '-' . $counter;
            $slug = trim(Str::limit($base, self::SLUG_MAX_LENGTH - strlen($suffix), ''), '-') . $suffix;
            $counter++;
        }

        return $slug;
    }

    protected static function slugTaken(string $slug, ?int $ignoreId = null): bool
    {
        return static::query()
            ->where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists();
    }

    /**
     * Cari berita dari slug aktif, lalu slug lama (agar link lama tetap hidup).
     */
    public static function findBySlugOrHistory(string $slug): ?self
    {
        return static::query()->where('slug', $slug)->first()
            ?? static::query()->whereJsonContains('slug_history', $slug)->first();
    }

    /**
     * Simpan slug lama ke riwayat supaya URL lama bisa di-redirect 301.
     * Panggil sebelum slug baru di-assign.
     */
    public function rememberOldSlug(?string $oldSlug): void
    {
        $oldSlug = trim((string) $oldSlug);

        if ($oldSlug === '' || $oldSlug === (string) $this->slug) {
            return;
        }

        $history = is_array($this->slug_history) ? $this->slug_history : [];
        array_unshift($history, $oldSlug);

        $this->slug_history = array_values(array_slice(array_unique($history), 0, self::SLUG_HISTORY_LIMIT));
    }

    public function viewLogs()
    {
        return $this->hasMany(NewsViewLog::class, 'news_id');
    }
}
