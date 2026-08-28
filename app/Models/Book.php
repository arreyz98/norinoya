<?php

namespace App\Models;

use App\Enums\AgeRating;
use App\Enums\BookType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'series_id',
        'volume',
        'edition_id',
        'book_type',
        'story_status_id',
        'age_rating',
        'publisher_id',
        'synopsis',
        'short_description',
        'news_link',
        'msrp',
        'isbn',
        'page_count',
        'paper_type',
        'dimensions',
        'adaptation',
        'is_upcoming',
        'views_count',
    ];

    protected function casts(): array
    {
        return [
            'book_type' => BookType::class,
            'age_rating' => AgeRating::class,
            'msrp' => 'decimal:2',
            'page_count' => 'integer',
            'is_upcoming' => 'boolean',
            'views_count' => 'integer',
        ];
    }

    public function series(): BelongsTo
    {
        return $this->belongsTo(
            BookSeries::class,
            'series_id'
        );
    }

    public function edition(): BelongsTo
    {
        return $this->belongsTo(
            Edition::class,
            'edition_id'
        );
    }

    public function storyStatus(): BelongsTo
    {
        return $this->belongsTo(
            StoryStatus::class,
            'story_status_id'
        );
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(
            Publisher::class,
            'publisher_id'
        );
    }

    public function images(): HasMany
    {
        return $this->hasMany(
            BookImage::class
        )->orderBy('sort_order');
    }

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(
            Author::class,
            'book_authors'
        )->withPivot('role');
    }

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(
            Genre::class,
            'book_genres'
        );
    }

    public function affiliateLinks(): HasMany
    {
        return $this->hasMany(
            AffiliateLink::class
        );
    }

    public function tiktokEmbeds(): HasMany
    {
        return $this->hasMany(
            BookTiktokEmbed::class
        )->orderBy('sort_order');
    }

    public function viewLogs(): HasMany
    {
        return $this->hasMany(BookViewLog::class, 'book_id');
    }
}