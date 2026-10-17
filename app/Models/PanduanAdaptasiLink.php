<?php

namespace App\Models;

use App\Enums\PanduanLinkCategory;
use App\Enums\PanduanLinkStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PanduanAdaptasiLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'node_id',
        'category',
        'platform_name',
        'title',
        'status',
        'url',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'category' => PanduanLinkCategory::class,
            'status' => PanduanLinkStatus::class,
            'sort_order' => 'integer',
        ];
    }

    public function node(): BelongsTo
    {
        return $this->belongsTo(PanduanAdaptasiNode::class, 'node_id');
    }
}
