# AGENTS.md — Norinoya

> Baca file ini SEBELUM menjelajah project. Ringkas & padat — jangan baca ulang seluruh project.

## 1. Ringkasan & Stack
- **Norinoya**: database manga/komik/novel/LN + kios preloved. Laravel + Inertia + React + MySQL.
- PHP ^8.2 · Laravel ^12 · React 19 · TypeScript 5.7 (strict) · Inertia Laravel 2 / React 2 · Tailwind CSS 4 · Vite 6 · Pest 3 · MySQL (dev: `norinoya_app`) / SQLite untuk test.
- UI: shadcn/ui + Radix + lucide-react; util `cn()` di `resources/js/lib/utils.ts`; routing JS via **Ziggy** (`route()` global, dari `vendor/tightenco/ziggy`, bukan paket npm).
- Auth: Laravel React Starter Kit (bukan Breeze). **Register dinonaktifkan** (`/register` → redirect `/login`). Login sukses → `/admin/dashboard`.

## 2. Peta Folder
- `app/Http/Controllers/Admin/` — CRUD master data (13 controller; **`BookController` 1186 baris**, `NewsController` berikutnya)
- `app/Actions/Books/` — Action class relasi buku: `CreateBookRelations`, `UpdateBookRelations`, trait `Concerns/BuildsBookRelationPayloads` (semua sync relasi images/authors/genres/affiliate/tiktok/instagram/news/video)
- `app/Http/Controllers/User/` — halaman publik (home, news, kios, detail buku, bookmark)
- `app/Http/Controllers/Auth/` + `Settings/` — starter kit; jangan diubah tanpa alasan jelas
- `app/Http/Controllers/SitemapController.php` — `sitemap.xml` dinamis (cache 1 jam)
- `app/Http/Requests/` — Form Request admin: `Store*Request`/`Update*Request` (`authorize()=true`, `messages()` Bahasa Indonesia)
- `app/Models/` — 24 model (Eloquent, `$fillable` eksplisit, `casts()` method, SoftDeletes di master data)
- `app/Enums/` — AgeRating, AuthorRole, BookType, VideoAccessType · `app/Casts/NormalizedBookType.php` (normalisasi nilai legacy)
- `app/Http/Middleware/HandleInertiaRequests.php` — shared props: `auth.user`, `flash.success/error`, `name`, `quote`
- `app/Jobs/LogBookViewJob.php` — ⚠️ dead code (tidak dipanggil dari mana pun)
- `resources/js/components/admin/` — **LogsPage & SearchLogsPage generik** + `log-utils.ts` (parse UA, format tanggal) — dipakai 6 halaman log admin
- `resources/js/pages/` — `Admin/*` PascalCase (Index/Create/Edit/Logs/SearchLogs/VolumeOrder); `User/*` + `auth/` + `settings/` lowercase; `dashboard.tsx`, `login.tsx`, `welcome.tsx`
- `resources/js/pages/Admin/Books/components/` — BookForm dipecah: `BookForm.tsx` (orkestrator state + submit, 996 baris), section: `BookBasicInfo`, `BookMetadataForm`, `BookAuthorsGenresSection`, `BookImagesSection`, `BookDescriptionMediaSection`, `AffiliateLinksSection`, `VideoLinksSection`; shared: `book-form-types.ts`, `book-form-utils.ts`, `FieldError.tsx`
- `resources/js/components/` — app-shell, sidebar, navbar, `RichTextEditor.tsx`, `EmbedNode.tsx`, `FilterCombobox.tsx` · `ui/` = shadcn (jangan di-edit kecuali perlu)
- `resources/js/types/` — tipe per entitas + `index.ts` (SharedData, User, BreadcrumbItem) + `pagination.ts` (`PaginatedData<T>`)
- `resources/js/layouts/` — `app-layout` (sidebar), `auth-layout`, `settings/layout`
- `resources/js/hooks/` — `use-appearance` (tema per-area!), `use-mobile`, `use-initials`, `use-page-loading`
- `resources/js/utils/` — `mapBookToComic`, `bookmarkStorage`, `imageUrl`, `embedFrame`, `newsDate`
- `routes/` — `web.php` (publik + admin), `auth.php`, `settings.php`, `console.php` (`model:prune` harian). **Tidak ada `api.php`**.
- `database/migrations/` — 46 file · `database/seeders/` — 15 file
- `tests/` — Pest: `Feature/` (Auth, Settings, BookVideoLinksTest, DashboardTest, NewsSlugTest) + `Unit/`

## 3. Skema Database (ringkas)
**Master**: `book_series` (title, slug; **tanpa** SoftDeletes sejak 2026-09-28); `authors`, `genres`, `editions`, `publishers`, `story_statuses` (SoftDeletes, slug unik); `affiliate_stores` (SoftDeletes, logo_url); `kios_partners` (SoftDeletes); `users` standar.
**books** (SoftDeletes): title, slug (unique), series_id → book_series **nullOnDelete**; edition_id / publisher_id / story_status_id → **restrictOnDelete**; volume (string), sort_order, book_type (enum), age_rating (enum), msrp, isbn, page_count, synopsis, is_upcoming, views_count. Index FULLTEXT(title, synopsis) khusus MySQL. Kolom `short_description` sudah dihapus (2026-10-15).
**Pivot**: `book_authors` (book_id, author_id, role) unique · `book_genres` (book_id, genre_id) unique.
**Child books** (hasMany, book_id **cascadeOnDelete**, sort_order): `book_images`, `affiliate_links` (clicks, is_active), `book_tiktok_embeds`, `book_instagram_embeds`, `book_news_links`, `book_video_links` (access_type: free/subscription).
**news**: slug unik + `slug_history` JSON (redirect 301, `findBySlugOrHistory`); JSON casts: hash_tags, gallery_images, poll_options, reactions, recommendations, relevant_books; is_pinned, views_count.
**kios_items**: slug auto via `saving()`; linked_book_id → books nullOnDelete; kios_partner_id; klik per marketplace (shopee/tokopedia/gramedia/toco + total); views_count; scope `available`.
**Log**: `book_view_logs` / `news_view_logs` / `kios_view_logs` — **Prunable 90 hari**, anti-spam IP (1 log/IP/menit), `views_count` naik terpisah; `search_logs_buku` / `search_log_news` / `search_log_kios` — agregat harian per keyword (unique keyword+search_date).

## 4. Route → Controller → Halaman
- `GET /` → `User\HomeController@index` → `User/home` (cache key `home:books:v2`)
- `GET /news`, `/news/{slug}` → `User\NewsController` → `User/news`, `User/components/DetailNews`
- `GET /kios`, `/kios/{slug}` → `User\KiosController` → `User/kios`, `DetailKios`
- `GET /buku/{slug}` → `User\BookController@show` → `User/components/DetailBuku`
- `GET /bookmark` → `User\BookmarkController` → `User/bookmark`
- `GET /sitemap.xml` → `SitemapController@index`
- Endpoint publik JSON (validasi **inline**, bukan Form Request; throttle): `POST /books|news|kios /search-log` (20/m) · `POST /{id}/view` (60/m) · `POST /kios/{id}/click` (30/m)
- Auth (`routes/auth.php`): login, forgot/reset-password, verify-email (throttle 6/m), confirm-password, logout
- Settings (`@auth`): profile (edit/update/destroy), password, appearance
- Admin (`@auth`, prefix `admin.`, resource CRUD **tanpa `show`**): kios-partners, kios, news, books, book-series, authors, genres, publishers, editions, story-statuses, affiliate-stores
- Books ekstra: `books/duplicate`, `books/filter-options`, `books/bulk` (bulk-destroy), `books/volume-order` (GET/PUT)
- News/Books/Kios ekstra: `logs` + `logs/export` + hapus/clear; `search-logs` + export + hapus/clear
- Pola render: `Inertia::render('Admin/{Entitas}/{Index|Create|Edit}', [...])`; list dikirim sebagai `paginate(15)` → `PaginatedData<T>`

## 5. Konvensi WAJIB
- **Casing halaman**: `Admin/*` PascalCase, `User/`+`auth/`+`settings/` lowercase — server Linux case-sensitive, jaga casing saat `Inertia::render` dan `import`.
- **Validasi**: Form Request untuk admin CRUD & auth/settings; endpoint publik JSON = validasi inline + `response()->json()`.
- **Logika relasi buku**: sinkronisasi images/authors/genres/affiliate/tiktok/instagram/news/video → taruh di `app/Actions/Books/` (bukan di controller). Controller cukup panggil `app(CreateBookRelations::class)->execute($book, $data)` / `app(UpdateBookRelations::class)->execute($book, $data)`.
- **Halaman log admin** (View/Activity Logs & Keyword Logs): jangan duplikasi UI — pakai `LogsPage` / `SearchLogsPage` dari `resources/js/components/admin/` + kirim `config` object dari halaman tipis.
- **Props ke React**: list → `PaginatedData<T>`; enum dikirim sebagai `{value,label}[]`; seluruh teks UI & pesan validasi **Bahasa Indonesia**.
- **Model**: `$fillable` eksplisit; relasi dengan return type; slug unik digenerate di controller (`generateUniqueSlug`) atau di model (`KiosItem::saving()`, `News::booted()`).
- **Feedback**: `redirect()->with('success'|'error', ...)` → otomatis tampil via shared props `flash`.
- **Cache**: key `home:books:v2` (home/bookmark/news/kios) — panggil `forgetBookCaches()` setiap data buku berubah (store/update/destroy/bulk).
- **React**: pakai komponen shadcn dari `components/ui/`; form state lokal + validasi FE; error server dinormalisasi ke `field.index.subfield` (pola di `Admin/Books/components/BookForm.tsx`); layout admin pakai `@/layouts/app-layout` + breadcrumbs.
- **Test**: Pest, `tests/Feature/`, DB SQLite in-memory + `RefreshDatabase`.
- Prettier + ESLint (react-hooks, typescript-eslint) aktif — jalankan `npm run lint` sebelum commit.

## 6. Perintah Penting
- Dev (semua proses): `composer dev` — atau `php artisan serve` + `npm run dev`
- Build: `npm run build` · Lint: `npm run lint` · Format: `npm run format` · Cek format: `npm run format:check`
- Migrasi: `php artisan migrate` · Test: `php artisan test` · PHP style: `vendor/bin/pint`
- Perubahan route PHP: reload `php artisan serve` bila pakai server bawaan.

## 7. Aturan untuk AI
1. **Baca AGENTS.md ini dulu** — jangan eksplorasi project dari nol.
2. **Jangan baca ulang seluruh project.** File besar (BookForm.tsx 2431, BookController 1640, mockData.ts 3221 baris) — baca bagian relevan saja via grep/offset.
3. **Jangan baca**: `vendor/`, `node_modules/`, `public/build/`, `storage/`, `*.lock`, `.env` (lihat `.aiignore`).
4. **Ubah hanya file yang relevan** dengan tugas; ikuti konvensi & gaya kode existing; jangan refaktor besar tanpa diminta.
5. Perubahan DB: **selalu migration baru** + update model; jangan edit migration lama yang sudah jalan di produksi.
6. Logika baru wajib ada test di `tests/Feature/` (gaya Pest).
