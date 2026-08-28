<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AffiliateLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'affiliate_store_id',
        'url',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function affiliateStore(): BelongsTo
    {
        return $this->belongsTo(
            AffiliateStore::class,
            'affiliate_store_id'
        );
    }
}