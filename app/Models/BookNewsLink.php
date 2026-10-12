<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookNewsLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'title',
        'url',
        'sort_order',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
