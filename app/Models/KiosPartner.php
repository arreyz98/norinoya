<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class KiosPartner extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kios_partners';

    protected $fillable = [
        'name',
        'slug',
        'logo_url',
        'description',
    ];

    public function kiosItems(): HasMany
    {
        return $this->hasMany(KiosItem::class, 'kios_partner_id');
    }
}
