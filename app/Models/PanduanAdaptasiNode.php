<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PanduanAdaptasiNode extends Model
{
    use HasFactory;

    protected $fillable = [
        'panduan_adaptasi_id',
        'book_id',
        'title',
        'description',
        'studio',
        'adaptation_label',
        'adaptation_range',
        'adaptation_chapters',
        'tags',
        'is_upcoming',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'is_upcoming' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function panduanAdaptasi(): BelongsTo
    {
        return $this->belongsTo(PanduanAdaptasi::class, 'panduan_adaptasi_id');
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function links(): HasMany
    {
        return $this->hasMany(
            PanduanAdaptasiLink::class,
            'node_id'
        )->orderBy('sort_order');
    }
}
