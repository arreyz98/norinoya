<?php

use App\Enums\AgeRating;
use App\Enums\BookType;
use App\Enums\VideoAccessType;
use App\Models\Book;
use App\Models\Edition;
use App\Models\Publisher;
use App\Models\StoryStatus;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->withoutVite();
    $this->actingAs(User::factory()->create());

    $edition = Edition::create(['name' => 'Standard', 'slug' => 'standard']);
    $publisher = Publisher::create(['name' => 'Test Publisher', 'slug' => 'test-publisher']);
    $status = StoryStatus::create(['name' => 'Ongoing', 'slug' => 'ongoing']);

    $this->bookPayload = [
        'title' => 'Video Link Test Book',
        'series_id' => null,
        'volume' => '1',
        'edition_id' => $edition->id,
        'book_type' => BookType::MANGA->value,
        'story_status_id' => $status->id,
        'age_rating' => AgeRating::TEEN->value,
        'publisher_id' => $publisher->id,
        'synopsis' => 'A book used to test video links.',
        'msrp' => 45000,
        'video_links' => [],
    ];

    $this->videoPayload = [
        'platform_name' => 'Video Platform',
        'title' => 'Volume 1 review',
        'access_type' => VideoAccessType::FREE->value,
        'url' => 'https://example.com/video/1',
    ];
});

test('creates ordered video links with an optional title and enum casts', function () {
    $secondVideo = array_replace($this->videoPayload, [
        'title' => null,
        'access_type' => VideoAccessType::SUBSCRIPTION->value,
        'url' => 'https://example.com/video/2',
    ]);

    $this->post(route('admin.books.store'), array_replace($this->bookPayload, [
        'video_links' => [$this->videoPayload, $secondVideo],
    ]))->assertSessionHasNoErrors()->assertRedirect(route('admin.books.index'));

    $book = Book::query()->sole();
    $videos = $book->videoLinks;

    expect($videos)->toHaveCount(2)
        ->and($videos->pluck('sort_order')->all())->toBe([1, 2])
        ->and($videos[0]->access_type)->toBe(VideoAccessType::FREE)
        ->and($videos[1]->access_type)->toBe(VideoAccessType::SUBSCRIPTION)
        ->and($videos[1]->title)->toBe('')
        ->and($videos[0]->book->id)->toBe($book->id);
});

test('updates retained rows deletes omitted rows and inserts new rows in submitted order', function () {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $first = $book->videoLinks()->create(array_merge($this->videoPayload, ['sort_order' => 1]));
    $removed = $book->videoLinks()->create(array_merge($this->videoPayload, ['sort_order' => 2]));
    $last = $book->videoLinks()->create(array_merge($this->videoPayload, ['sort_order' => 3]));

    $this->put(route('admin.books.update', $book), array_replace($this->bookPayload, [
        'video_links' => [
            array_merge($this->videoPayload, ['id' => $last->id, 'title' => 'Moved first']),
            array_merge($this->videoPayload, ['id' => $first->id, 'access_type' => 'subscription']),
            array_merge($this->videoPayload, ['title' => 'New video']),
        ],
    ]))->assertSessionHasNoErrors()->assertRedirect(route('admin.books.index'));

    $videos = $book->fresh()->videoLinks;

    expect($videos)->toHaveCount(3)
        ->and($videos->pluck('sort_order')->all())->toBe([1, 2, 3])
        ->and($videos[0]->id)->toBe($last->id)
        ->and($videos[0]->title)->toBe('Moved first')
        ->and($videos[1]->id)->toBe($first->id)
        ->and($videos[1]->access_type)->toBe(VideoAccessType::SUBSCRIPTION)
        ->and($videos[2]->title)->toBe('New video');

    $this->assertDatabaseMissing('book_video_links', ['id' => $removed->id]);
});

test('an explicit empty or null video list removes all links', function (?array $videos) {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $book->videoLinks()->create($this->videoPayload);

    $this->put(route('admin.books.update', $book), array_replace($this->bookPayload, [
        'video_links' => $videos,
    ]))->assertSessionHasNoErrors()->assertRedirect(route('admin.books.index'));

    expect($book->videoLinks()->count())->toBe(0);
})->with([
    'empty list' => [[]],
    'explicit null' => [null],
]);

test('omitting the video list preserves existing links', function () {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $video = $book->videoLinks()->create($this->videoPayload);
    $payload = $this->bookPayload;
    unset($payload['video_links']);

    $this->put(route('admin.books.update', $book), $payload)
        ->assertSessionHasNoErrors()->assertRedirect(route('admin.books.index'));

    $this->assertDatabaseHas('book_video_links', ['id' => $video->id, 'book_id' => $book->id]);
});

test('edit and duplicate forms expose video links and access options', function () {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $video = $book->videoLinks()->create($this->videoPayload);

    foreach (['edit' => 'Admin/Books/Edit', 'duplicate' => 'Admin/Books/Create'] as $action => $component) {
        $this->get(route('admin.books.'.$action, $book))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component($component)
                ->has('book.video_links', 1)
                ->where('book.video_links.0.id', $video->id)
                ->where('book.video_links.0.platform_name', 'Video Platform')
                ->where('book.video_links.0.access_type', 'free')
                ->where('book.video_links.0.url', $this->videoPayload['url'])
                ->where('videoAccessTypes', [
                    ['value' => 'free', 'label' => 'Gratis'],
                    ['value' => 'subscription', 'label' => 'Subscription'],
                ])
            );
    }
});

test('saving a duplicate creates new video records instead of reusing source ids', function () {
    $source = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $sourceVideo = $source->videoLinks()->create($this->videoPayload);

    $this->post(route('admin.books.store'), array_replace($this->bookPayload, [
        'volume' => '1 2',
        'video_links' => [array_merge($this->videoPayload, ['id' => $sourceVideo->id])],
    ]))->assertSessionHasNoErrors()->assertRedirect(route('admin.books.index'));

    $duplicate = Book::query()->whereKeyNot($source->id)->sole();
    $duplicateVideo = $duplicate->videoLinks()->sole();

    expect($duplicateVideo->id)->not->toBe($sourceVideo->id)
        ->and($duplicateVideo->book_id)->toBe($duplicate->id)
        ->and($source->videoLinks()->count())->toBe(1);
});

test('rejects invalid video fields without creating a book', function (string $field, mixed $value) {
    $this->post(route('admin.books.store'), array_replace($this->bookPayload, [
        'video_links' => [array_replace($this->videoPayload, [$field => $value])],
    ]))->assertSessionHasErrors(['video_links.0.'.$field]);

    $this->assertDatabaseCount('books', 0);
    $this->assertDatabaseCount('book_video_links', 0);
})->with([
    'missing platform' => ['platform_name', ''],
    'platform too long' => ['platform_name', str_repeat('x', 256)],
    'title too long' => ['title', str_repeat('x', 256)],
    'missing url' => ['url', ''],
    'invalid url' => ['url', 'not-a-url'],
    'unsupported protocol' => ['url', 'ftp://example.com/video'],
    'url too long' => ['url', 'https://example.com/'.str_repeat('x', 2048)],
    'missing access type' => ['access_type', ''],
    'invalid access type' => ['access_type', 'paid'],
]);

test('enforces the twenty link limit on both create and update', function () {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $video = $book->videoLinks()->create($this->videoPayload);
    $videos = array_fill(0, 21, $this->videoPayload);

    $this->post(route('admin.books.store'), array_replace($this->bookPayload, [
        'volume' => '2',
        'video_links' => $videos,
    ]))->assertSessionHasErrors(['video_links']);

    $this->put(route('admin.books.update', $book), array_replace($this->bookPayload, [
        'video_links' => $videos,
    ]))->assertSessionHasErrors(['video_links']);

    $this->assertDatabaseCount('books', 1);
    $this->assertDatabaseHas('book_video_links', ['id' => $video->id]);
});

test('rejects video ids belonging to a different book before changing existing data', function () {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $ownVideo = $book->videoLinks()->create($this->videoPayload);
    $other = Book::create(array_merge($this->bookPayload, ['volume' => '2', 'slug' => 'other-volume-2']));
    $otherVideo = $other->videoLinks()->create($this->videoPayload);

    $this->put(route('admin.books.update', $book), array_replace($this->bookPayload, [
        'title' => 'Should not be saved',
        'video_links' => [array_merge($this->videoPayload, ['id' => $otherVideo->id])],
    ]))->assertSessionHasErrors(['video_links.0.id']);

    expect($book->fresh()->title)->toBe($this->bookPayload['title']);
    $this->assertDatabaseHas('book_video_links', ['id' => $ownVideo->id, 'book_id' => $book->id]);
    $this->assertDatabaseHas('book_video_links', ['id' => $otherVideo->id, 'book_id' => $other->id]);
});

test('rejects repeated video ids instead of overwriting a retained row twice', function () {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $video = $book->videoLinks()->create($this->videoPayload);
    $row = array_merge($this->videoPayload, ['id' => $video->id]);

    $this->put(route('admin.books.update', $book), array_replace($this->bookPayload, [
        'video_links' => [$row, $row],
    ]))->assertSessionHasErrors(['video_links.0.id', 'video_links.1.id']);

    expect($book->videoLinks()->count())->toBe(1);
});

test('rejects non-list video payloads instead of failing during sort-order arithmetic', function () {
    $this->post(route('admin.books.store'), array_replace($this->bookPayload, [
        'video_links' => ['first' => $this->videoPayload],
    ]))->assertSessionHasErrors(['video_links']);

    $this->assertDatabaseCount('books', 0);
});

test('deleting a book cascades to its video links', function () {
    $book = Book::create(array_merge($this->bookPayload, ['slug' => 'test-book-volume-1']));
    $video = $book->videoLinks()->create($this->videoPayload);

    $this->delete(route('admin.books.destroy', $book))->assertSessionHasNoErrors()->assertRedirect();

    $this->assertDatabaseMissing('books', ['id' => $book->id]);
    $this->assertDatabaseMissing('book_video_links', ['id' => $video->id]);
});
