<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Author extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'biography',
    ];

    public function books(): BelongsToMany
    {
        return $this->belongsToMany(
            Book::class,
            'book_authors'
        )->withPivot('role');
    }

    public function storyBooks(): BelongsToMany
    {
        return $this->belongsToMany(
            Book::class,
            'book_authors'
        )
            ->wherePivot('role', 'story')
            ->withPivot('role');
    }

    public function artBooks(): BelongsToMany
    {
        return $this->belongsToMany(
            Book::class,
            'book_authors'
        )
            ->wherePivot('role', 'art')
            ->withPivot('role');
    }
}