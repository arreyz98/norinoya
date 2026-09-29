<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NewsViewLog extends Model
{
    use HasFactory, Prunable;

    protected $table = 'news_view_logs';

    protected $fillable = [
        'news_id',
        'ip_address',
        'user_agent',
    ];

    /**
     * Get the prunable model query.
     * Automatically deletes logs older than 90 days without affecting news.views_count.
     */
    public function prunable(): Builder
    {
        return static::where('created_at', '<=', now()->subDays(90));
    }

    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class, 'news_id');
    }
}
