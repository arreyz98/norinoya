<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KiosViewLog extends Model
{
    use HasFactory, Prunable;

    protected $table = 'kios_view_logs';

    protected $fillable = [
        'kios_item_id',
        'action_type',
        'ip_address',
        'user_agent',
    ];

    /**
     * Get the prunable model query.
     * Automatically deletes logs older than 90 days without affecting kios_items counters.
     */
    public function prunable(): Builder
    {
        return static::where('created_at', '<=', now()->subDays(90));
    }

    public function kiosItem(): BelongsTo
    {
        return $this->belongsTo(KiosItem::class, 'kios_item_id');
    }
}
