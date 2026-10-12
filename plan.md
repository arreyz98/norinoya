# Plan: Fitur "Link Video" pada Form Buku

Status: **selesai diimplementasikan, terverifikasi, dan migrasi database sudah dijalankan.**
Dibuat: 2026-10-12
Ruang lingkup: admin book form (`Admin/Books`) + model + API internal

---

## 1. Ringkasan

Menambahkan blok input baru bernama **Link Video** di form buku (create & edit),
dengan perilaku input yang sama seperti **Affiliate Links** (bisa tambah/hapus
baris). Tiap baris punya 4 field:

| Field UI | Key data | Tipe input |
|---|---|---|
| Nama Platform | `platform_name` | text |
| Judul | `title` | text |
| Akses | `access_type` | dropdown: Gratis / Subscription |
| Link | `url` | text (URL) |

Kesimpulan: **perlu tabel baru** `book_video_links` (relasi one-to-many ke `books`),
mengikuti pola yang sudah dipakai `affiliate_links` dan `book_tiktok_embeds`.

---

## 2. Kenapa tabel baru (bukan opsi lain)

Link Video bersifat **daftar** — satu buku bisa punya banyak link video. Karena itu
tidak bisa disimpan sebagai kolom biasa di `books`.

Opsi yang dipertimbangkan:

| Opsi | Putusan | Alasan |
|---|---|---|
| Tabel baru `book_video_links` | **Dipilih** | Konsisten dengan pola project, bisa divalidasi & di-relasi lewat Eloquent |
| JSON column di `books` | Ditolak | Tidak konsisten dengan pola project; sulit divalidasi (`exists:`) & sulit di-query |
| Tambah kolom ke `book_tiktok_embeds` | Ditolak | Tabel itu spesifik TikTok; fitur ini generik (platform bebas) + punya `access_type` yang tidak ada di sana |

---

## 3. Desain data

### 3.1 Tabel: `book_video_links`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigIncrements | PK |
| `book_id` | foreignId → `books.id`, `cascadeOnDelete` | relasi ke buku |
| `platform_name` | string | nama platform (input teks) |
| `title` | string, nullable | judul video |
| `access_type` | string, default `'free'` | Gratis / Subscription |
| `url` | text | link video |
| `sort_order` | unsignedInteger, default 1 | urutan tampil (diisi `index + 1`) |
| `created_at` / `updated_at` | timestamps | — |

Catatan: pola `sort_order` mengikuti `book_tiktok_embeds` (di-set otomatis dari index).

### 3.2 Enum: `App\Enums\VideoAccessType`

Konsisten dengan `App\Enums\BookType` / `AgeRating` yang sudah ada.

```php
<?php

namespace App\Enums;

enum VideoAccessType: string
{
    case FREE = 'free';
    case SUBSCRIPTION = 'subscription';

    public function label(): string
    {
        return match ($this) {
            self::FREE => 'Gratis',
            self::SUBSCRIPTION => 'Subscription',
        };
    }
}
```

### 3.3 Model: `App\Models\BookVideoLink`

Meniru `app/Models/BookTiktokEmbed.php`.

```php
<?php

namespace App\Models;

use App\Enums\VideoAccessType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookVideoLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'platform_name',
        'title',
        'access_type',
        'url',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'access_type' => VideoAccessType::class,
        ];
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
```

---

## 4. Perubahan Backend

### 4.1 Migration baru

File: `database/migrations/2026_10_12_000000_create_book_video_links_table.php`

Meniru `database/migrations/2026_08_10_034850_create_book_tiktok_embeds_table.php`.

```php
Schema::create('book_video_links', function (Blueprint $table) {
    $table->id();

    $table->foreignId('book_id')
        ->constrained('books')
        ->cascadeOnDelete();

    $table->string('platform_name');
    $table->string('title')->nullable();
    $table->string('access_type')->default('free');
    $table->text('url');
    $table->unsignedInteger('sort_order')->default(1);

    $table->timestamps();
});
```

### 4.2 `app/Models/Book.php`

- Tambah relasi (setelah `tiktokEmbeds()`, sekitar baris 117):

```php
public function videoLinks(): HasMany
{
    return $this->hasMany(
        BookVideoLink::class
    )->orderBy('sort_order');
}
```

- Tambah eager load di `homeQuery()` (sekitar baris 140) **hanya jika** link video
  ingin ikut terkirim ke halaman user:

```php
'videoLinks:id,book_id,platform_name,title,access_type,url,sort_order',
```

### 4.3 `app/Http/Requests/StoreBookRequest.php`

Tambah blok rules (setelah blok Affiliate, sekitar baris 240). Perlu
`use App\Enums\VideoAccessType;` di atas.

```php
/*
 * Video Links
 */
'video_links' => [
    'nullable',
    'array',
    'max:20',
],

'video_links.*.platform_name' => [
    'required',
    'string',
    'max:255',
],

'video_links.*.title' => [
    'nullable',
    'string',
    'max:255',
],

'video_links.*.access_type' => [
    'required',
    'string',
    Rule::enum(VideoAccessType::class),
],

'video_links.*.url' => [
    'required',
    'url',
    'max:2048',
],
```

Tambahan di `messages()`:

```php
'video_links.*.url.url' => 'URL video tidak valid.',
'video_links.*.platform_name.required' => 'Nama platform wajib diisi.',
'video_links.*.url.required' => 'Link video wajib diisi.',
```

### 4.4 `app/Http/Requests/UpdateBookRequest.php`

Sama seperti di atas, **plus** rule `id` (agar baris lama bisa di-update, bukan
dibuat ulang):

```php
'video_links.*.id' => [
    'nullable',
    'integer',
    'exists:book_video_links,id',
],
```

### 4.5 `app/Http/Controllers/Admin/BookController.php`

Perlu `use App\Models\BookVideoLink;`? Tidak wajib (pakai relasi), tapi
`use App\Enums\VideoAccessType;` diperlukan untuk default value.

**a. `edit(Book $book)` (sekitar baris 594–673)**

- Tambah ke `$book->load([...])`:
  ```php
  'videoLinks:id,book_id,platform_name,title,access_type,url,sort_order',
  ```
- Tambah serialisasi ke props `book` (setelah `affiliate_links`, sekitar baris 668):
  ```php
  'video_links' => $book->videoLinks
      ->sortBy('sort_order')
      ->map(fn ($video) => [
          'id' => $video->id,
          'platform_name' => $video->platform_name,
          'title' => $video->title,
          'access_type' => $video->access_type?->value ?? $video->access_type,
          'url' => $video->url,
          'sort_order' => $video->sort_order,
      ])
      ->values(),
  ```

**b. `duplicate(Book $book)` (sekitar baris 682–788)**

- Sama seperti `edit()`: tambah ke `load()` dan tambah serialisasi `video_links`
  di props `book` (setelah baris 782).

**c. `store()` (sekitar baris 790–892)**

Tambah setelah blok Affiliate Links (sekitar baris 879):

```php
/*
 * Video Links
 */
foreach (
    $data['video_links'] ?? [] as $index => $video
) {
    $book->videoLinks()->create([
        'platform_name' => $video['platform_name'],
        'title' => $video['title'] ?? '',
        'access_type' => $video['access_type'] ?? VideoAccessType::FREE->value,
        'url' => $video['url'],
        'sort_order' => $index + 1,
    ]);
}
```

**d. `update()` (sekitar baris 897–1083)**

Meniru pola Affiliate Links (baris 1028–1072) — hapus yang tidak dikirim,
lalu update/create:

```php
/*
 * Video Links
 */
$submittedVideoIds = collect(
    $data['video_links'] ?? []
)
    ->pluck('id')
    ->filter()
    ->values();

$book->videoLinks()
    ->whereNotIn('id', $submittedVideoIds)
    ->delete();

foreach (
    $data['video_links'] ?? [] as $index => $video
) {
    $payload = [
        'platform_name' => $video['platform_name'],
        'title' => $video['title'] ?? '',
        'access_type' => $video['access_type'] ?? VideoAccessType::FREE->value,
        'url' => $video['url'],
        'sort_order' => $index + 1,
    ];

    if (! empty($video['id'])) {
        $book->videoLinks()
            ->where('id', $video['id'])
            ->update($payload);
    } else {
        $book->videoLinks()->create($payload);
    }
}
```

**e. `formOptions()` (sekitar baris 1105–1172)**

Tambah opsi dropdown agar label Gratis/Subscription dikirim dari backend
(konsisten dengan `bookTypes` / `ageRatings`):

```php
'videoAccessTypes' => collect(VideoAccessType::cases())
    ->map(fn (VideoAccessType $type) => [
        'value' => $type->value,
        'label' => $type->label(),
    ])
    ->values(),
```

**f. Cache**

Tidak perlu perubahan — `forgetBookCaches()` sudah dipanggil di `store()` &
`update()`. Pastikan key cache baru (kalau ada penambahan) ikut di-flush.

**g. `syncAffiliateLinks()` (baris 1336) — catatan**

Method ini sudah tidak dipakai di alur `store`/`update` (logika inline dipakai
langsung). Tidak perlu diubah, tapi kalau nanti dirapikan, tambahkan juga
`syncVideoLinks()` dengan pola yang sama.

---

## 5. Perubahan Frontend

### 5.1 `resources/js/pages/Admin/Books/components/BookForm.tsx`

Ini bagian paling banyak. Urutan perubahan:

**1) Interface `VideoLink`** — tambah setelah `AffiliateLink` (sekitar baris 48):

```ts
export interface VideoLink {
    id?: number;
    platform_name: string;
    title?: string;
    access_type: string;
    url: string;
}
```

**2) `BookFormData`** — tambah `video_links: VideoLink[];` (sekitar baris 87).

**3) `SubmissionMaps`** — tambah `video_links: number[];` (sekitar baris 95).

**4) `validateBook()`** — tambah blok setelah loop affiliate (sekitar baris 237):

```ts
form.video_links.forEach((video, index) => {
    const platform = video.platform_name.trim();
    const url = video.url.trim();
    const hasAny = Boolean(platform || url);

    if (hasAny && !platform) {
        nextErrors[`video_links.${index}.platform_name`] = 'Nama platform wajib diisi.';
    }

    if (hasAny && !url) {
        nextErrors[`video_links.${index}.url`] = 'Link video wajib diisi.';
    } else if (url && !isValidUrl(url)) {
        nextErrors[`video_links.${index}.url`] = 'Link video tidak valid.';
    }

    if (hasAny && !video.access_type) {
        nextErrors[`video_links.${index}.access_type`] = 'Pilih tipe akses.';
    }
});
```

**5) `normalizeServerErrors()`** — tambah blok regex setelah blok affiliate (sekitar baris 271):

```ts
const videoMatch = key.match(/^video_links\.(\d+)\.([\w.]+)$/);

if (videoMatch) {
    const payloadIndex = Number(videoMatch[1]);
    const formIndex = maps.video_links[payloadIndex] ?? payloadIndex;
    normalized[`video_links.${formIndex}.${videoMatch[2]}`] = message;
    continue;
}
```

**6) `BookFormProps`** — tambah di tipe `book` (sekitar baris 330):

```ts
video_links?: {
    id?: number;
    platform_name: string;
    title?: string | null;
    access_type: string;
    url: string;
}[];
```

Dan tambah prop baru (sekitar baris 342, sebelah `ageRatings`):

```ts
videoAccessTypes: EnumOption[];
```

Lalu destructure di parameter komponen (sekitar baris 361).

**7) State awal `useState<BookFormData>`** (sekitar baris 508–521) — tambah:

```ts
video_links: book?.video_links?.map((video) => ({
    id: video.id,
    platform_name: video.platform_name,
    title: video.title ?? '',
    access_type: video.access_type ?? 'free',
    url: video.url,
})) ?? [
    {
        platform_name: '',
        title: '',
        access_type: 'free',
        url: '',
    },
],
```

Juga update state awal `submissionMaps` (sekitar baris 370–374) → tambah `video_links: []`.

**8) Handler** — tambah setelah `updateAffiliateLink` (sekitar baris 728):

```ts
const addVideoLink = () => {
    clearErrorPrefix('video_links');

    setForm((previous) => ({
        ...previous,
        video_links: [
            ...previous.video_links,
            {
                platform_name: '',
                title: '',
                access_type: 'free',
                url: '',
            },
        ],
    }));
};

const removeVideoLink = (index: number) => {
    clearErrorPrefix('video_links');

    setForm((previous) => ({
        ...previous,
        video_links: previous.video_links.filter((_, i) => i !== index),
    }));
};

const updateVideoLink = (index: number, field: keyof VideoLink, value: string) => {
    clearFieldError(`video_links.${index}.${field}`);

    setForm((previous) => ({
        ...previous,
        video_links: previous.video_links.map((video, i) =>
            i === index ? { ...video, [field]: value } : video,
        ),
    }));
};
```

**9) `handleSubmit()`** (sekitar baris 772–799) — tambah:

```ts
const videoPayload: VideoLink[] = [];
const videoMap: number[] = [];

form.video_links.forEach((video, index) => {
    const platform = video.platform_name.trim();
    const url = video.url.trim();

    if (platform !== '' || url !== '') {
        videoPayload.push({ ...video, platform_name: platform, url });
        videoMap.push(index);
    }
});
```

Lalu di `setSubmissionMaps` tambah `video_links: videoMap`, dan di `onSubmit`
tambah `video_links: videoPayload`.

**10) Section JSX** — tambah Card baru **setelah** Card Affiliate
(sekitar baris 1677), meniru struktur Card Affiliate:

```tsx
{/* ================================= */}
{/* VIDEO LINKS */}
{/* ================================= */}

<Card>
    <CardHeader>
        <CardTitle>Link Video</CardTitle>

        <CardDescription>Tambahkan link video terkait buku ini.</CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
        {form.video_links.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center">
                <p className="text-muted-foreground text-sm">Belum ada link video.</p>
            </div>
        ) : (
            form.video_links.map((video, index) => (
                <div key={index} className="rounded-lg border p-4">
                    <div className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
                        <div className="space-y-2">
                            <Label>Nama Platform</Label>

                            <Input
                                id={`video_links.${index}.platform_name`}
                                name="video_platform_name"
                                value={video.platform_name}
                                onChange={(event) => updateVideoLink(index, 'platform_name', event.target.value)}
                                placeholder="YouTube"
                            />

                            <FieldError field={`video_links.${index}.platform_name`} errors={activeErrors} />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Judul</Label>

                                <Input
                                    id={`video_links.${index}.title`}
                                    name="video_title"
                                    value={video.title || ''}
                                    onChange={(event) => updateVideoLink(index, 'title', event.target.value)}
                                    placeholder="Review volume 1"
                                />

                                <FieldError field={`video_links.${index}.title`} errors={activeErrors} />
                            </div>

                            <div className="space-y-2">
                                <Label>Akses</Label>

                                <Select
                                    value={video.access_type}
                                    onValueChange={(value) => updateVideoLink(index, 'access_type', value)}
                                >
                                    <SelectTrigger {...getFieldProps(`video_links.${index}.access_type`)}>
                                        <SelectValue placeholder="Pilih akses" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {videoAccessTypes.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FieldError field={`video_links.${index}.access_type`} errors={activeErrors} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Link</Label>

                            <Input
                                id={`video_links.${index}.url`}
                                name="video_url"
                                type="url"
                                value={video.url}
                                onChange={(event) => updateVideoLink(index, 'url', event.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                            />

                            <FieldError field={`video_links.${index}.url`} errors={activeErrors} />
                        </div>

                        <div className="flex items-end">
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeVideoLink(index)}>
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ))
        )}

        <Button type="button" variant="outline" onClick={addVideoLink}>
            <Plus className="mr-2 size-4" />
            Tambah Link Video
        </Button>

        <FieldError field="video_links" errors={activeErrors} />
    </CardContent>
</Card>
```

### 5.2 `resources/js/pages/Admin/Books/Create.tsx`

- Tambah interface `VideoLink` + field `video_links?: VideoLink[]` di interface `Book`.
- Tambah `videoAccessTypes: EnumOption[]` di interface `Props`.
- Destructure `videoAccessTypes` di parameter komponen.
- Pass `videoAccessTypes={videoAccessTypes}` ke `<BookForm />`.

### 5.3 `resources/js/pages/Admin/Books/Edit.tsx`

- Sama seperti `Create.tsx`: tambah interface `VideoLink` + `video_links` di
  interface `Book`, tambah `videoAccessTypes` di `Props`, destructure, dan pass
  ke `<BookForm />`.

---

## 6. Opsional — Tampilan ke halaman user

Hanya kalau Link Video ingin ditampilkan di sisi user (bukan admin saja).

### 6.1 `resources/js/utils/mapBookToComic.ts`

- Tambah interface `BookVideoLink`.
- Tambah `videoLinks?` / `video_links?` di tipe payload buku.
- Mapping di dalam `groupBooks.map((b) => ...)` (dekat mapping `tiktokEmbeds`,
  sekitar baris 300).
- Teruskan ke objek `comics.push({...})` (sekitar baris 353).

### 6.2 `resources/js/pages/User/components/DetailBuku.tsx`

- Tambah tipe `videoLinks` di props/tipe `Comic`.
- Render daftar link video (badge platform + label Gratis/Subscription + tombol link).

### 6.3 `resources/js/types/demo.ts`

- Tambah field `videoLinks` di tipe `Comic` / `Volume` kalau diperlukan.

---

## 6A. Implementasi tampilan user (SELESAI)

Keputusan yang diambil sesuai permintaan terakhir:

| Aspek | Keputusan |
|---|---|
| Lokasi | Di dalam `linksContent`, tepat **di bawah** section Affiliate (per volume) |
| Desain | Tombol/kartu: ikon play di kiri, nama platform + judul video, ikon panah keluar di kanan |
| Warna | Mengikuti brand platform (YouTube merah, iQiyi hijau, Crunchyroll oranye, dll.) |
| Badge | **Tidak dipakai** sesuai permintaan ("tanpa label badge") |
| Klik | `<a href={url} target="_blank" rel="no-referrer">` — langsung membuka link video |
| Data | Per volume (`activeVolObj.videoLinks`), sama seperti affiliate |

Warna platform yang dipetakan (`getVideoPlatformStyle`):
YouTube `#FF0000`, iQiyi `#00CC33`, Crunchyroll `#F47521`, Bilibili/Bstation
`#00A1D6`, Netflix `#E50914`, WeTV `#00A650`, Vidio `#F5362B`, Viu `#FFC000`,
Prime Video `#00A8E1`, Disney+ `#113CCF`, Dailymotion `#0066DC`, Vimeo `#1AB7EA`.
Platform lain → gaya netral dengan nama platform apa adanya.

Catatan: `access_type` (Gratis/Subscription) **tidak** ditampilkan sebagai badge
sesuai permintaan, tetapi tetap dipakai pada atribut `title` (tooltip) tombol.

Backend pendukung: `Book::homeQuery()` dan `User\BookController@show()` kini
eager-load `videoLinks`, sehingga data ikut terkirim ke halaman user.

---

## 7. Langkah migrasi & verifikasi

1. `php artisan migrate` — bikin tabel `book_video_links`.
2. `npm run build` (atau `npm run dev`) — kompilasi ulang aset frontend.
3. Uji manual:
   - **Create**: isi 2 baris link video, simpan, cek baris masuk ke DB
     (`book_video_links`, `sort_order` = 1 & 2).
   - **Edit**: buka buku tadi, pastikan data muncul kembali di form; ubah 1
     baris, hapus 1 baris, tambah 1 baris baru → simpan → cek DB.
   - **Validasi**: submit dengan platform kosong / URL tidak valid → cek pesan
     error muncul di field yang benar (bukan bergeser indeksnya).
   - **Duplicate**: duplikat buku → pastikan link video ikut tercopy.
4. `php artisan test` (kalau ada test terkait book).

---

## 8. Checklist eksekusi

- [x] Migration `create_book_video_links_table` (file tersedia, belum dijalankan)
- [x] Enum `App\Enums\VideoAccessType`
- [x] Model `App\Models\BookVideoLink`
- [x] `Book::videoLinks()` (`homeQuery()` tidak diubah: scope admin-only)
- [x] `StoreBookRequest` — rules + messages
- [x] `UpdateBookRequest` — rules + messages + `video_links.*.id`
- [x] `BookController@edit` — load + serialize
- [x] `BookController@duplicate` — load + serialize
- [x] `BookController@store` — create loop
- [x] `BookController@update` — delete-not-in + update/create
- [x] `BookController@formOptions` — `videoAccessTypes`
- [x] `BookForm.tsx` — 10 titik perubahan (lihat §5.1)
- [x] `Create.tsx` — interface + prop
- [x] `Edit.tsx` — interface + prop
- [x] (Opsional) `mapBookToComic.ts`, `DetailBuku.tsx`, `demo.ts` — **dikerjakan**: tombol link video tampil di halaman user di bawah section Affiliate
- [x] Tambah regression test `tests/Feature/BookVideoLinksTest.php` — **21 test, 140 assertion, semua lolos**
- [x] `npm run build` — berhasil (aset di `public/build` diperbarui)
- [x] Uji create / edit / validasi / duplicate — tercakup test otomatis di atas
- [x] `php artisan migrate` — **berhasil**, tabel `book_video_links` dibuat di `norinoya_app` (MySQL)

### Catatan implementasi

- Mengikuti default plan: judul opsional, platform teks bebas, maksimal 20 baris, admin-only.
- Validasi ID update dibatasi ke buku yang sedang diedit dan menolak ID duplikat.
- Payload harus berupa list berurutan; URL hanya HTTP/HTTPS agar konsisten dengan frontend.
- Update tanpa field `video_links` mempertahankan data lama. Mengirim `[]` secara eksplisit menghapus semua link; `null` juga diperlakukan sebagai daftar kosong sesuai rule nullable.
- Baris baru yang benar-benar kosong dilewati. Baris parsial (termasuk judul saja atau akses Subscription saja) dan baris lama tetap divalidasi, bukan dibuang diam-diam.
- Input video terhubung ke tampilan error, ARIA, dan fokus error; tombol tambah dibatasi 20 baris.

### Hasil verifikasi

| Pemeriksaan | Hasil |
|---|---|
| `php -l` pada 8 file PHP baru/berubah | Lolos |
| `BookVideoLinksTest` (SQLite in-memory) | **21 lolos, 140 assertion** |
| Cek perilaku frontend terhadap source `BookForm.tsx` | **8 lolos** |
| ESLint (3 file BookForm/Create/Edit) | Bersih |
| Prettier (3 file) | Sesuai gaya |
| TypeScript scoped (Create/Edit/BookForm + dependensi + global) | Lolos |
| `vite build` | Berhasil, 3554 modul, 59 aset manifest terverifikasi |
| `php artisan migrate` | **Berhasil** — `2026_10_12_000000_create_book_video_links_table` (88 ms), batch [9] |
| Struktur tabel hasil migrasi | 9 kolom sesuai rencana; `book_id` FK → `books.id` `onDelete=cascade` |
| Relasi & cast enum di DB asli | `Book::with('videoLinks')` OK; enum `Gratis`/`Subscription` OK |

Catatan: `tsc --noEmit` untuk **seluruh** project masih melaporkan error lama di file lain yang tidak terkait fitur ini (mis. `Admin/News/Edit.tsx`, `EtalaseCatalog.tsx`, `EmbedNode.tsx`, `app-header.tsx`, `welcome.tsx`). File-file tersebut tidak disentuh.

Seluruh test suite (`php artisan test`) menunjukkan **48 lolos / 7 gagal**. Ketujuh kegagalan bersifat **pre-existing dan tidak terkait** fitur ini:
- `Auth\RegistrationTest` (2) & `Auth\AuthenticationTest` & `Auth\EmailVerificationTest` & `Auth\PasswordConfirmationTest` — register memang dinonaktifkan (redirect ke `/login`), sesuai `PROJECT_CONTEXT.md`.
- `DashboardTest` — `/dashboard` redirect ke `/admin/dashboard` (302, bukan 200).
- `NewsSlugTest` — berasal dari pekerjaan lain yang belum selesai (file belum di-commit).

---

## 9. Hal yang perlu diputuskan

1. **`title` wajib atau opsional?** Plan ini pakai *opsional* (meniru
   `tiktok_embeds.name`). Kalau wajib, ubah rule jadi `required` + validasi FE.
2. **`platform_name` teks bebas atau dropdown master?** Plan ini pakai *teks
   bebas*. Kalau mau dropdown dari master data, perlu tabel tambahan
   `video_platforms` + model + entri di `formOptions()` + prop baru.
3. **Tampilkan ke user atau admin-only?** Kalau admin-only, §4.2 (`homeQuery`)
   dan §6 bisa dilewati.
4. **Batas maksimal baris** — plan ini pakai `max:20` (affiliate tanpa batas,
   tiktok `max:10`). Sesuaikan kalau perlu.
5. **Ada `is_active` / klik tracking?** `affiliate_links` punya `clicks` &
   `is_active`; kalau Link Video butuh hal serupa, tambahkan kolomnya sekarang.

---

## 10. Rollback

- Migration `down()`: `Schema::dropIfExists('book_video_links');`
- Hapus file: enum, model, migration.
- Revert perubahan di: `Book.php`, 2 FormRequest, `BookController.php`,
  `BookForm.tsx`, `Create.tsx`, `Edit.tsx`.
- Tidak ada route baru, jadi tidak ada perubahan `routes/web.php`.
