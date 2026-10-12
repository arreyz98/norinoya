<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookInstagramEmbed extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'name',
        'url',
        'thumbnail_url',
        'title',
        'description',
        'sort_order',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
