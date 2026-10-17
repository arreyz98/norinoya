<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PanduanAdaptasi extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Nama tabel eksplisit — tebakan otomatis Laravel adalah
     * "panduan_adaptasis", sedangkan nama tabel yang dipakai "panduan_adaptasi".
     */
    protected $table = 'panduan_adaptasi';

    protected $fillable = [
        'title',
        'slug',
        'description',
    ];

    public function nodes(): HasMany
    {
        return $this->hasMany(
            PanduanAdaptasiNode::class,
            'panduan_adaptasi_id'
        )->orderBy('sort_order');
    }
}
