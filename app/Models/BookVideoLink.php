<?php

namespace App\Models;

use App\Enums\VideoAccessType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookVideoLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'platform_name',
        'title',
        'access_type',
        'url',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'access_type' => VideoAccessType::class,
        ];
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
