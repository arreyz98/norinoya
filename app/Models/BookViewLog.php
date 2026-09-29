<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookViewLog extends Model
{
    use HasFactory, Prunable;

    protected $table = 'book_view_logs';

    protected $fillable = [
        'book_id',
        'ip_address',
        'user_agent',
    ];

    /**
     * Get the prunable model query.
     * Automatically deletes logs older than 90 days without affecting books.views_count.
     */
    public function prunable(): Builder
    {
        return static::where('created_at', '<=', now()->subDays(90));
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }
}
