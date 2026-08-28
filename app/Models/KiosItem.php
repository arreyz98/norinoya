<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KiosItem extends Model
{
    use HasFactory;

    protected $table = 'kios_items';

    protected $fillable = [
        'title',
        'slug',
        'comic_title',
        'vol_number',
        'category',
        'categories',
        'merch_type',
        'cover_image',
        'carousel_images',
        'carousel_labels',
        'deskripsi_produk',
        'notes',
        'price',
        'original_price',
        'condition_rating',
        'is_preloved',
        'is_sold_out',
        'rating',
        'genres',
        'publisher_name',
        'publisher_id',
        'kios_partner_id',
        'author',
        'reading_rating',
        'status',
        'demographic',
        'isbn',
        'release_date',
        'cetakan_info',
        'shopee_url',
        'tokopedia_url',
        'gramedia_url',
        'toco_url',
        'linked_book_id',
        'views_count',
        'shopee_clicks_count',
        'tokopedia_clicks_count',
        'gramedia_clicks_count',
        'toco_clicks_count',
        'total_clicks_count',
    ];

    protected $casts = [
        'vol_number' => 'integer',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'rating' => 'float',
        'is_preloved' => 'boolean',
        'is_sold_out' => 'boolean',
        'categories' => 'array',
        'carousel_images' => 'array',
        'carousel_labels' => 'array',
        'genres' => 'array',
        'views_count' => 'integer',
        'shopee_clicks_count' => 'integer',
        'tokopedia_clicks_count' => 'integer',
        'gramedia_clicks_count' => 'integer',
        'toco_clicks_count' => 'integer',
        'total_clicks_count' => 'integer',
    ];

    protected static function booted(): void
    {
        static::saving(function (KiosItem $item) {
            if (empty($item->slug)) {
                $baseSlug = \Illuminate\Support\Str::slug($item->title);
                $slug = $baseSlug;
                $count = 1;
                while (static::where('slug', $slug)->where('id', '!=', $item->id ?? 0)->exists()) {
                    $slug = $baseSlug . '-' . $count++;
                }
                $item->slug = $slug ?: 'item-' . ($item->id ?? time());
            }
        });
    }

    public function linkedBook(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'linked_book_id');
    }

    public function kiosPartner(): BelongsTo
    {
        return $this->belongsTo(KiosPartner::class, 'kios_partner_id');
    }

    public function viewLogs()
    {
        return $this->hasMany(KiosViewLog::class, 'kios_item_id');
    }
}
