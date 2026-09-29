<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class LogBookViewJob implements ShouldQueue
{
    use Queueable;

    public int $bookId;
    public ?string $ipAddress;
    public ?string $userAgent;

    /**
     * Create a new job instance.
     */
    public function __construct(int $bookId, ?string $ipAddress, ?string $userAgent)
    {
        $this->bookId = $bookId;
        $this->ipAddress = $ipAddress;
        $this->userAgent = $userAgent;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // 1. Check if the book exists
        $book = \App\Models\Book::find($this->bookId);
        if (!$book) {
            return;
        }

        // 2. Anti-spam check: 1 view per IP per 1 minute for the same book
        $oneMinuteAgo = now()->subMinute();

        $alreadyLogged = \App\Models\BookViewLog::where('book_id', $this->bookId)
            ->where('ip_address', $this->ipAddress)
            ->where('created_at', '>=', $oneMinuteAgo)
            ->exists();

        if (!$alreadyLogged) {
            // Increment view count on book
            $book->increment('views_count');

            // Record timestamp log
            \App\Models\BookViewLog::create([
                'book_id' => $this->bookId,
                'ip_address' => $this->ipAddress,
                'user_agent' => $this->userAgent,
            ]);
        }
    }
}
