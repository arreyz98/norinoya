<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchLogBuku extends Model
{
    use HasFactory;

    protected $table = 'search_logs_buku';

    protected $fillable = [
        'keyword',
        'search_count',
        'search_date',
    ];

    protected $casts = [
        'search_date' => 'date',
        'search_count' => 'integer',
    ];
}
