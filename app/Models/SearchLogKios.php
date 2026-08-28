<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchLogKios extends Model
{
    use HasFactory;

    protected $table = 'search_log_kios';

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
