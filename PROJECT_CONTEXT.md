# PROJECT_CONTEXT.md — Norinoya

> Ringkasan konteks project **Norinoya** (database manga/komik/novel/light novel + kios preloved). Sumber: `composer.json`, `package.json`, kode, `composer.lock`, `package-lock.json`. **Tidak ada `.env` / secret.**

---

## 1. Versi (versi *lock*)

| Komponen          | Batasan                       | Versi terkunci (lock)                  |
|-------------------|-------------------------------|----------------------------------------|
| PHP               | `^8.2`                        | 8.2.33 (tercatat di `error.md`)        |
| Laravel           | `^12.0`                       | `v12.64.0`                             |
| Node              | tidak dipatok (tidak ada `engines`) | —                                 |
| React             | `^19.0.0`                     | `19.0.0`                               |
| TypeScript        | `^5.7.2`                      | `5.7.3`                                |
| Inertia (Laravel) | `^2.0`                        | `v2.0.24` (`inertiajs/inertia-laravel`)|
| Inertia (React)   | `^2.0.0`                      | `2.0.3` (`@inertiajs/react`)           |
| Tailwind CSS      | `^4.0.0`                      | `4.0.8`                                |
| Pest              | `^3.8`                        | `v3.8.7` (+ `pest-plugin-laravel` `v3.2.0`) |

> Bukan Laravel Breeze secara paket — ini **Laravel React Starter Kit** (auth scaffolding) + shadcn/ui, dikustom kebahasa Indonesia.

---

## 2. Dependency penting

**Composer (runtime):** `laravel/framework`, `inertiajs/inertia-laravel`, `tightenco/ziggy`, `laravel/tinker`.
**Composer (dev):** `pestphp/pest` + plugin, `laravel/pint`, `laravel/boost`, `laravel/pail`, `laravel/sail`, `nunomaduro/collision`, `mockery/mockery`, `fakerphp/faker`.

**npm (runtime):** React 19 (`react`+`react-dom`); `@inertiajs/react` 2.0.3; `typescript` 5.7.3; `vite` 6.4.3 (`@vitejs/plugin-react`, `laravel-vite-plugin`, `@tailwindcss/vite`); `tailwindcss` 4.0.8 (`tailwind-merge`, `tailwindcss-animate`, `class-variance-authority`, `clsx`); **shadcn/ui** — komponen di `resources/js/components/ui/*` (32 file; `components.json` style `default`, baseColor `neutral`, iconLibrary `lucide`); `lucide-react`; `motion` 13 (Framer Motion v13); `sonner`; `@radix-ui/react-*`; `@headlessui/react` 2.2.0; `cmdk` 1.1.1; `next-themes`; `@tiptap/react` 3.31.3 (+`core`/`pm`/`starter-kit`); `date-fns` 4.4.0; `react-day-picker` 10.0.1.

> **Ziggy:** `ziggy-js` **bukan npm package** — di-resolve ke `vendor/tightenco/ziggy` lewat `tsconfig.json` `paths`; `route()` global disuntikkan di Blade via `@routes`. Import di `app.tsx` bersifat *type-only*, sehingga esbuild meng-elidinya (build tidak butuh paket npm).

**npm (dev):** ESLint 9 (`@eslint/js`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `typescript-eslint`) + Prettier (`eslint-config-prettier`, `prettier-plugin-organize-imports`, `prettier-plugin-tailwindcss`).

---

## 3. Struktur folder utama `resources/js`

```
app.tsx                  # resolve: (name) => resolvePageComponent('./pages/${name}.tsx', import.meta.glob('./pages/**/*.tsx'))
ssr.jsx                  # entri SSR opsional
css/app.css              # Tailwind import + tema
components/              # app-shell, sidebar, navbar, login-form, RichTextEditor, filter-combobox, dsb.
components/ui/           # shadcn/ui (32 komponen)
layouts/                 # app-layout.tsx -> app/app-sidebar-layout, auth-layout, settings/
pages/
 ├─ dashboard.tsx, welcome.tsx, login.tsx
 ├─ auth/        (login, register->login, forgot/reset-password, verify-email, confirm-password)
 ├─ settings/    (profile.tsx, password.tsx, appearance.tsx)
 ├─ User/        (home.tsx, news.tsx, kios.tsx, bookmark.tsx + components/)
 └─ Admin/       (AffiliateStores, Authors, Books, BookSeries, Editions, Genres, Kios,
                   KiosPartners, News, Publishers, StoryStatuses — masing-masing Index/Edit/Create
                   + Log/SearchLog + components/{Form}.tsx)
hooks/  (use-appearance, use-mobile, use-page-loading, use-initials)
types/  (index.ts, pagination.ts, + satu file tiap entitas)
lib/utils.ts   # cn() = twMerge(clsx(...))
utils/         (bookmarkStorage, mapBookToComic, newsDate)
```

`app/` Laravel: `app/Http/Controllers/{Admin,Auth,Settings,User}/`, `app/Http/Requests/`, `app/Models/`, `app/Enums/`, `app/Casts/`, `app/Jobs/`, `app/Http/Middleware/HandleInertiaRequests.php`, `app/Providers/AppServiceProvider.php` (kosong).

---

## 4. Konvensi penamaan & resolusi

- **Casing halaman (IMPORTAN):** `pages/`/`auth/`/`settings/`/`User/` dan `dashboard|welcome|login` memakai **huruf kecil**; `pages/Admin/*/Index.tsx` memakai **huruf besar**. Inertia `resolve` pakai `./pages/${name}.tsx` (case-sensitive di Linux) — jadi `Admin/Authors/Index` ≠ `admin/authors/index`. Controller merujuk dengan casing tepat, mis. `Inertia::render('Admin/Authors/Index', ...)`.
- **Alias:** `@/` → `resources/js/` (Vite default + `tsconfig paths`).
- **`cn()`** di `resources/js/lib/utils.ts` = `twMerge(clsx(inputs))`; dipakai seluruh shadcn/ui.
- **Validasi:** Form Request untuk admin CRUD + auth/settings (`Store*Request`/`Update*Request`/`LoginRequest`, `authorize()=true`, `messages()` berbahasa Indonesia). Endpoint publik JSON (`search-log`, `increment-view`, `increment-click`) pakai validasi inline + `response()->json()` — bukan Form Request.

---

## 5. Auth

Starter kit Laravel 12 React (bukan Breeze/Fortify terpisah). `app/Http/Controllers/Auth/`. Register **diredirect ke `/login`** (`routes/auth.php`); login via `AuthenticatedSessionController` (rate-limited lewat `LoginRequest`, 5x/15m), password reset, email verification (rate-limited 6/1), confirm-password. User model standar `Illuminate\\Foundation\\Auth\\User`; `SESSION_DRIVER=database`; Sanctum tidak dipakai. Setelah login → `/admin/dashboard` (`redirect()->intended(route('admin.dashboard'))`). Semua admin route dilindungi `auth` middleware.

---

## 6. Database, model & relasi

Driver default `sqlite` (`config/database.php` + `.env.example`); MySQL/MariaDB dikonfigurasi lewat `.env` (nilai tidak dilampirkan). `CACHE_STORE=database`.

Model & relasi (`app/Models/`):
1. **User** — `HasFactory, Notifiable` (standar Laravel).
2. **Book** (SoftDeletes): `belongsTo` series/edition/storyStatus/publisher; `hasMany` images, affiliateLinks, tiktokEmbeds, viewLogs; `belongsToMany` authors (pivot `role`) & genres. `book_type`→cast `NormalizedBookType`, `age_rating`→cast `AgeRating`; ada `Book::homeQuery()`.
3. **BookSeries** (`hasMany books`).
4. **Edition/Publisher/StoryStatus/Genre** (SoftDeletes; `hasMany` atau `belongsToMany` books).
5. **Author** (SoftDeletes; `belongsToMany` books pivot `role`); relasi `storyBooks()`/`artBooks()` filter per `role`.
6. **BookImage**, **BookTiktokEmbed** (`belongsTo` Book).
7. **AffiliateStore** (SoftDeletes; `hasMany` links). **AffiliateLink** (`belongsTo` book+store; default store `Official Store`, location `Indonesia`).
8. **News** (`hasMany` viewLogs; JSON-casts `hash_tags`/`gallery_images`/`poll_options`/`reactions`/`recommendations`/`relevant_books`).
9. **KiosItem** (`belongsTo` book+partner; slug unik auto di `saving()`; counter klik per marketplace). **KiosPartner** (SoftDeletes).
10. **BookViewLog/NewsViewLog/KiosViewLog** — `Prunable` 90 hari, dihapus via `php artisan model:prune` (jadwal *daily* di `routes/console.php`); `views_count` tidak dikurangi.
11. **SearchLogBuku/News/Kios** — agregat harian per keyword (`keyword`, `search_count`, `search_date`).

Enums: `AgeRating`, `BookType`, `AuthorRole`. Cast khusus: `NormalizedBookType`. Seeder: `database/seeders/` (13 file + DatabaseSeeder).

---

## 7. Route (`routes/web.php` ringkas)

- Publik: `GET /`, `/news`, `/news/{slug}`, `/kios`, `/kios/{slug}`, `/bookmark`, `/buku/{slug}`; `POST .../search-log` (throttle 20/m); `POST .../view` (60/m), `POST /kios/{id}/click` (30/m); `GET /sitemap.xml` (cache 1h, `SitemapController`); `Route::redirect('/home','/')`.
- Auth (`routes/auth.php`): login, register→/login, reset-password, verify-email (signed+throttle 6/1), confirm-password, logout.
- Settings (`routes/settings.php`, `@auth`): profile (edit/update/destroy), password, `settings/appearance` via `Route::inertia`.
- Admin (`@auth`, prefix `admin.`): `GET dashboard` → DashboardController. Resource CRUD (tanpa `show`) untuk `kios-partners`, `kios`, `news`, `books` (+ `duplicate`, `filter-options`, `bulk-destroy`), `book-series`, `authors`, `genres`, `publishers`, `editions`, `story-statuses`, `affiliate-stores`. Modul news/books/kios ada `logs`/`search-logs` (+export/hapus/clear) dan `books/volume-order` (drag-reorder).
- Jadwal `routes/console.php`: `Schedule::command('model:prune')->daily()`.

---

## 8. Controller & halaman representatif (tempel)

Contoh pasangan CRUD termudah: **`AuthorController`** + **`pages/Admin/Authors/Index.tsx`**. Versi penuh `User/BookController.php` (increment-view + cache invalidation + searchLog anti-spam, 214 baris) ada di `app/Http/Controllers/User/BookController.php`.

### Controller — `app/Http/Controllers/Admin/AuthorController.php`
```php
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Models\Author;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthorController extends Controller
{
    public function index(): Response
    {
        $authors = Author::query()
            ->withCount(['storyBooks', 'artBooks'])
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Authors/Index', [
            'authors' => $authors,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Authors/Create');
    }

    public function store(
        StoreAuthorRequest $request
    ): RedirectResponse {
        $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['name']);
        Author::create($data);
        return to_route('admin.authors.index')
            ->with('success', 'Author berhasil ditambahkan.');
    }

    public function edit(
        Author $author
    ): Response {
        return Inertia::render('Admin/Authors/Edit', [
            'author' => $author,
        ]);
    }

    public function update(
        UpdateAuthorRequest $request,
        Author $author
    ): RedirectResponse {
        $data = $request->validated();
        $data['slug'] = $this->generateUniqueSlug($data['name'], $author->id);
        $author->update($data);
        return to_route('admin.authors.index')
            ->with('success', 'Author berhasil diperbarui.');
    }

    public function destroy(
        Author $author
    ): RedirectResponse {
        if ($author->books()->exists()) {
            return back()->with(
                'error',
                'Author tidak dapat dihapus karena masih digunakan oleh buku.'
            );
        }
        $author->delete();
        return to_route('admin.authors.index')
            ->with('success', 'Author berhasil dihapus.');
    }

    private function generateUniqueSlug(
        string $name,
        ?int $ignoreId = null
    ): string {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $counter = 1;
        while (
            Author::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn ($query) => $query->whereKey('!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }
        return $slug;
    }
}
```

### Halaman — `resources/js/pages/Admin/Authors/Index.tsx`
```tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Author } from '@/types/author';
import type { PaginatedData } from '@/types/pagination';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AuthorIndexProps {
    authors: PaginatedData<Author>;
}

export default function AuthorIndex({
    authors,
}: AuthorIndexProps) {
    const [deleteAuthor, setDeleteAuthor] =
        useState<Author | null>(null);

    const handleDelete = () => {
        if (!deleteAuthor) {
            return;
        }

        router.delete(
            route(
                'admin.authors.destroy',
                deleteAuthor.id
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteAuthor(null);
                },
            }
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Authors',
        href: '/admin/authors',
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Authors" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Authors
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola author buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.authors.create'
                            )}
                        >
                            <Plus className="mr-2 h-4 w-4" />

                            Tambah Author
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Nama Author
                                </TableHead>

                                <TableHead>
                                    Story
                                </TableHead>

                                <TableHead>
                                    Art
                                </TableHead>

                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {authors.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        Belum ada author.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                authors.data.map(
                                    (author) => (
                                        <TableRow
                                            key={author.id}
                                        >
                                            <TableCell className="font-medium">
                                                {author.name}
                                            </TableCell>

                                            <TableCell>
                                                {author.story_books_count ??
                                                    0}
                                            </TableCell>

                                            <TableCell>
                                                {author.art_books_count ??
                                                    0}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={route(
                                                                'admin.authors.edit',
                                                                author.id
                                                            )}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            setDeleteAuthor(
                                                                author
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>

                {authors.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {authors.links.map(
                            (link, index) => (
                                <Button
                                    key={`${link.label}-${index}`}
                                    variant={
                                        link.active
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (
                                            link.url
                                        ) {
                                            router.get(
                                                link.url,
                                                {},
                                                {
                                                    preserveState:
                                                        true,
                                                    preserveScroll:
                                                        true,
                                                }
                                            );
                                        }
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )
                        )}
                    </div>
                )}
            </div>

            <AlertDialog
                open={Boolean(deleteAuthor)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteAuthor(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Author?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin
                            menghapus author{' '}
                            <strong>
                                {deleteAuthor?.name}
                            </strong>
                            ?
                            <br />
                            <br />
                            Author yang masih digunakan
                            oleh buku tidak dapat
                            dihapus.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDelete}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
```

---

## 9. Test framework

- **Pest 3** (`pestphp/pest` + `pest-plugin-laravel`); konfigurasi `tests/Pest.php`: `pest()->extend(Tests\TestCase::class)->use(RefreshDatabase::class)->in('Feature')`.
- `phpunit.xml`; suite `Unit` + `Feature`; tes pakai gaya `test('...', fn () => ...)`.
- DB test: **SQLite in-memory** (`DB_CONNECTION=sqlite`, `DB_DATABASE=:memory:`, `CACHE_STORE=array`).
- Contoh `tests/Feature/DashboardTest.php`: guest diarahkan ke `/login`; user terautentikasi dapat `/dashboard` (200).
- `tests/Feature/Auth/*` (Authentication, Registration, PasswordReset, PasswordConfirmation, EmailVerification) + `tests/Feature/Settings/*` (ProfileUpdate, PasswordUpdate) — standar starter kit.

---

## 10. Hal tidak biasa / custom

1. **Ziggy via Composer, bukan npm.** `ziggy-js` hanya ada di `vendor/tightenco/ziggy` + tsconfig `paths`; `route()` global disuntikkan Blade via `@routes` di `resources/views/app.blade.php`. Import *type-only* di `app.tsx` esbuild meng-elidinya (build tidak perlu paket npm).
2. **Casing halaman campur.** `User/`/`auth/`/`settings/` → huruf kecil; `Admin/*/Index.tsx` → huruf besar; jaga ketika deploy di FS case-sensitive.
3. **Normalisasi legacy.** `App\\Casts\\NormalizedBookType` + migrasi `normalize_legacy_book_type_values` memetakan nilai lama (`J-Lit (Japanese Literature)` → `BookType::J_LIT`) mencegah `ValueError` enum.
4. **Tema per-area.** Inline script di `app.blade.php`: halaman publik pakai `sessionStorage 'norinoya-dark-mode'`; admin pakai `localStorage 'appearance'`. `hooks/use-appearance.tsx` membedakan rute, dan `app.tsx` panggil `initializeTheme()` setiap navigasi Inertia (`router.on('navigate')`).
5. **Cache agresif + invalidasi terarah.** Key `v2` (`home:books:v2`, `bookmark:books:v2`, `news:books:v2`, `kios:books:v2`); `increment('views_count')` memaksa `Cache::forget` keempat key. `Inertia::defer(fn () => News::latest()->limit(50)->get())` untuk lazy news list.
6. **Rate limiting pada endpoint publik JSON.** `POST .../{id}/view` 60/m, `/search-log` 20/m, `/kios/{id}/click` 30/m — langsung di `routes/web.php`, tidak ada `api.php`.
7. **View-log + counter terpisah.** `views_count` naik hanya bila belum ada log IP yang sama dalam 1 menit (anti-spam), sekaligus mencatat `BookViewLog`/`NewsViewLog`/`KiosViewLog` (`Prunable` 90 hari). `LogBookViewJob` ada di `app/Jobs/` namun tidak dipanggil dari kode (legacy helper, belum terhubung).
8. **Search-log anti-spam.** Panjang 3–100, lowercase, menolak karakter berulang `/(.)\1{3,}/u` atau non-alfanumerik; agregat harian per keyword via `firstOrCreate`+`increment`.
9. **Slugify di level model.** `KiosItem::saving()` menghasilkan slug unik; `incrementView` fleksibel menerima slug/id/`series-{id}`+`vol`.
10. **Chunking bundle per area.** `vite.config.js` `manualChunks` memisahkan vendor (motion/lucide/tiptap/date/ui/react) dan `pages/Admin` → chunk `admin-pages` (TipTap editor) terpisah dari bundle user.
11. **SSR opsional.** Ada `resources/js/ssr.jsx` + skrip `build:ssr`, tapi `app.blade.php` tidak memakai SSR — rendering client-side standar.
12. **Konten demo/legacy masih ada.** `resources/js/types/` masih memuat `demo.ts`, `demoHelper.ts`, `mockData.ts` (data tiruan) yang kemungkinan tidak dipakai runtime tapi belum dihapus.
13. **Register dinonaktifkan.** `routes/auth.php` me-redirect `/register` ke `/login`.
14. **Root file dokumen.** `error.md` (rekaman runtime error lama) ada di root, bukan bagian kode produk.

---

*Dokumen ini dibuat oleh asisten (Code agent). Diperbarui: 2026-10-09. Untuk detail model/controller lain, cek `app/Models/*.php` dan `app/Http/Controllers/Admin/*.php`.*





