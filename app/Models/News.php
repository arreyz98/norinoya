<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'username',
        'display_name',
        'title',
        'slug',
        'content',
        'category',
        'hash_tags',
        'attached_image',
        'gallery_images',
        'reading_rating',
        'is_pinned',
        'poll_question',
        'poll_options',
        'reactions',
        'recommendations',
        'relevant_books',
        'views_count',
    ];

    protected $casts = [
        'hash_tags' => 'array',
        'gallery_images' => 'array',
        'is_pinned' => 'boolean',
        'poll_options' => 'array',
        'reactions' => 'array',
        'recommendations' => 'array',
        'relevant_books' => 'array',
        'views_count' => 'integer',
    ];

    public function viewLogs()
    {
        return $this->hasMany(NewsViewLog::class, 'news_id');
    }
}
