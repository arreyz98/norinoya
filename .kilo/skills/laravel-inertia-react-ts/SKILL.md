---
name: laravel-inertia-react-ts
description: Panduan kerja untuk project Norinoya (database manga/komik/novel/light novel + kios preloved) dengan stack Laravel 12, Inertia 2, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, dan Pest. Gunakan skill ini setiap kali user meminta membuat atau mengubah fitur, halaman, form, CRUD admin, komponen UI, route, controller, model, migration, test, atau memperbaiki bug di project ini, bahkan jika user hanya memberi instruksi singkat seperti "buatkan halaman X", "tambah fitur Y", atau "kenapa error Z".
---

# Norinoya — Laravel 12 + Inertia 2 + React 19 + TypeScript + Tailwind 4

Project ini memiliki dua area: **Admin** (CRUD, butuh login) dan **User/publik** (home, news, kios, bookmark). Ikuti pola yang sudah ada; jangan membuat pola baru jika contoh serupa sudah ada di project.

## Aturan Kerja Utama

1. **Baca dulu, tulis kemudian.** Cari modul serupa (misalnya `AuthorController` + `pages/Admin/Authors/*` untuk CRUD sederhana) dan tiru polanya.
2. **Satu permintaan = satu fitur utuh**, jangan menyentuh file yang tidak berhubungan.
3. **Jangan tambah dependency baru** tanpa konfirmasi. Library yang sudah ada: shadcn/ui (`components/ui`), `lucide-react`, `motion`, `sonner`, `@headlessui/react`, `cmdk`, `next-themes`, TipTap, `date-fns`, `react-day-picker`.
4. **Jangan ubah** `.env`, migration lama yang sudah dijalankan, `vite.config.js`, atau `tsconfig.json` tanpa izin.
5. **Balas user dalam Bahasa Indonesia.** Kode dan nama variabel dalam bahasa Inggris. **Teks yang tampil ke pengguna (label, tombol, pesan flash, pesan validasi) dalam Bahasa Indonesia.**
6. Di akhir, beri ringkasan singkat: file yang dibuat/diubah, asumsi yang diambil, dan perintah yang perlu dijalankan user (misal `php artisan migrate`).
7. Jika Laravel Boost tersedia (MCP), gunakan untuk membaca skema database dan log error, bukan menebak.

## Versi (jangan gunakan sintaks versi lain)

PHP 8.2 · Laravel 12 · Inertia 2 (laravel + react) · React 19 · TypeScript 5.7 · Tailwind CSS **4** · Vite 6 · Pest 3 · ESLint 9 + Prettier · Laravel Pint.

## Struktur Direktori

```
app/Http/Controllers/{Admin,Auth,Settings,User}/
app/Http/Requests/           # Store*Request / Update*Request
app/Models/  app/Enums/  app/Casts/  app/Jobs/
resources/js/
  app.tsx                    # resolve: ./pages/${name}.tsx
  components/                # komponen aplikasi
  components/ui/             # shadcn/ui (jangan edit tanpa alasan kuat)
  layouts/                   # app-layout, auth-layout, settings/
  pages/                     # lihat aturan casing di bawah
  hooks/  types/  lib/utils.ts  utils/
routes/{web,auth,settings,console}.php
```

### Aturan Casing Halaman (PENTING, case-sensitive di Linux)

- `pages/Admin/<Modul>/{Index,Create,Edit}.tsx` → **huruf besar** (`Inertia::render('Admin/Authors/Index')`).
- `pages/User/*`, `pages/auth/*`, `pages/settings/*`, `dashboard`, `welcome`, `login` → **huruf kecil** pada folder/file sesuai yang sudah ada.
- String di `Inertia::render()` harus **persis sama** dengan path file di bawah `pages/`.
- Form dipisah ke `pages/Admin/<Modul>/components/<Modul>Form.tsx`.

## Backend (Laravel)

- **Controller tipis** dengan return type eksplisit (`Inertia\Response`, `RedirectResponse`) dan `to_route()`:

```php
public function store(StoreAuthorRequest $request): RedirectResponse
{
    Author::create($request->validated());
    return to_route('admin.authors.index')
        ->with('success', 'Author berhasil ditambahkan.');
}
```

- **Validasi admin & auth → Form Request** (`StoreXRequest`/`UpdateXRequest`), `authorize()` return `true`, dan `messages()` dalam Bahasa Indonesia.
- **Endpoint JSON publik** (search-log, increment-view, increment-click) memakai validasi inline + `response()->json()` dan `throttle` di `routes/web.php`. Tidak ada `api.php`.
- **Flash message:** gunakan key `success` dan `error` (`->with('success', ...)`).
- **Hapus data:** cek relasi dulu; jika masih dipakai, `back()->with('error', ...)`. Model utama memakai **SoftDeletes**.
- **Slug:** dibuat unik (lihat `generateUniqueSlug` di `AuthorController`, atau di `saving()` pada `KiosItem`).
- **Route admin:** di dalam grup `auth`, nama berawalan `admin.`, pakai `Route::resource(...)->except(['show'])`.
- **Hindari N+1**: `with()`, `withCount()`; paginate dengan `->paginate(15)->withQueryString()`.
- **Enum & cast:** gunakan `BookType`, `AgeRating`, `AuthorRole`. Jangan hapus `NormalizedBookType` (menjaga data legacy).
- **Lazy data:** `Inertia::defer(fn () => ...)` untuk daftar berat (contoh: news list).
- **Cache halaman publik** memakai key versi `v2`: `home:books:v2`, `bookmark:books:v2`, `news:books:v2`, `kios:books:v2`. Jika mengubah data yang tampil di sana, invalidasi dengan `Cache::forget`.
- **View counter** hanya naik bila belum ada log IP yang sama dalam 1 menit. Jangan menghapus mekanisme anti-spam ini. `LogBookViewJob` adalah kode legacy yang tidak terpakai; jangan dipanggil.
- **Search log** menolak input pendek/berulang/non-alfanumerik; pertahankan aturan ini jika mengubah.
- Perubahan skema = **migration baru**.
- Format PHP dengan Pint: `./vendor/bin/pint`.

## Frontend (React + TypeScript + Inertia)

- **TypeScript ketat, tanpa `any`.** Type per entitas disimpan di `resources/js/types/<entitas>.ts`; pagination memakai `PaginatedData<T>` dari `@/types/pagination`.
- **Import dengan alias `@/`** (contoh `@/components/ui/button`).
- **Halaman admin** dibungkus `AppLayout` dengan `breadcrumbs` dan `<Head title="..." />`:

```tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
```

- **Ziggy:** pakai fungsi global `route('admin.authors.edit', id)`. **Jangan** `import` dari `ziggy-js` dan jangan `npm install ziggy-js` (di project ini di-resolve dari `vendor/` lewat tsconfig paths).
- **Navigasi:** `<Link>` dari `@inertiajs/react`; mutasi lewat `router.post/put/delete` atau `useForm`. Jangan `fetch`/`axios` kecuali endpoint JSON publik (view/click/search-log).
- **Hapus data:** gunakan `AlertDialog` (shadcn) untuk konfirmasi, lalu `router.delete(route(...), { preserveScroll: true, onSuccess })`.
- **Tabel admin:** shadcn `Table`, state kosong ("Belum ada ..."), tombol aksi `Button variant="ghost" size="icon"` dengan ikon `lucide-react` (`Pencil`, `Trash2`, `Plus`).
- **Pagination:** render `links` dari Laravel dengan `Button` dan `router.get(link.url, {}, { preserveState: true, preserveScroll: true })`. `dangerouslySetInnerHTML` **hanya** boleh untuk `link.label` pagination dari Laravel; jangan dipakai untuk data dari pengguna.
- **Form:** `useForm`, tampilkan `errors.<field>` di bawah input, disable tombol saat `processing`.
- **Toast:** gunakan `sonner` untuk menampilkan flash `success`/`error` jika pola itu sudah dipakai di layout.
- **Rich text:** gunakan komponen `RichTextEditor` (TipTap) yang sudah ada.
- **Tema:** area publik memakai `sessionStorage 'norinoya-dark-mode'`, admin memakai `localStorage 'appearance'` (diatur `hooks/use-appearance.tsx`). Jangan ubah mekanisme ini, dan jangan menyimpan data ke storage selain yang sudah ada tanpa alasan jelas.
- **Bookmark** disimpan di sisi klien (`utils/bookmarkStorage`).
- **Jangan pakai** `types/demo.ts`, `demoHelper.ts`, `mockData.ts` (data tiruan legacy) di fitur baru.
- Format dengan Prettier dan perbaiki warning ESLint (cek skrip lint/format di `package.json`).

## Tailwind CSS 4

- **Tidak ada `tailwind.config.js`.** Tema dan token ada di `resources/js/css/app.css` (`@import "tailwindcss"`, `@theme`). Tambahkan token baru di sana.
- Gunakan **utility class**, mobile-first (`sm:`, `md:`, `lg:`), dan dukung `dark:`.
- Class kondisional dengan `cn()` dari `@/lib/utils`.
- Gunakan warna semantik shadcn (`text-muted-foreground`, `bg-background`, `border`, `text-destructive`) agar dark mode tetap benar.
- Urutan class dirapikan `prettier-plugin-tailwindcss`.
- Gunakan `motion` hanya untuk animasi yang bermakna, terutama di halaman publik.

## Alur Membuat Modul CRUD Admin Baru

1. `php artisan make:model X -m` → isi migration, `$fillable`, relasi, SoftDeletes bila sesuai.
2. `php artisan make:request StoreXRequest` dan `UpdateXRequest` (pesan Bahasa Indonesia).
3. Controller di `app/Http/Controllers/Admin/XController.php`, mengikuti `AuthorController`.
4. Route resource di grup admin `auth` di `routes/web.php`.
5. Halaman `pages/Admin/Xs/{Index,Create,Edit}.tsx` + `components/XForm.tsx`.
6. Type di `resources/js/types/x.ts`.
7. Tambahkan item menu di sidebar (`components/app-sidebar`) bila perlu.
8. Tambahkan test Pest sederhana (guest → redirect login, user login → 200, create/update/delete).
9. Beri tahu user: `php artisan migrate`, lalu `npm run dev`.

## Testing (Pest 3)

- Gaya `test('...', fn () => ...)`, `RefreshDatabase` sudah aktif untuk folder `Feature`.
- DB test: SQLite in-memory. Jalankan dengan `php artisan test` atau `./vendor/bin/pest`.
- Setiap fitur baru minimal punya feature test untuk akses (guest vs login) dan aksi utamanya.

## Keamanan & Kualitas

- Jangan hardcode secret; gunakan `.env` dan `config()`. Jangan pernah menampilkan isi `.env`.
- Register sengaja dinonaktifkan (`/register` → `/login`); jangan diaktifkan kembali tanpa diminta.
- Semua route admin harus berada di bawah middleware `auth`.
- Endpoint publik yang menulis data wajib diberi `throttle`.
- Jangan kirim kolom sensitif ke frontend; pilih kolom atau gunakan Resource.
- Hapus `console.log`, kode mati, dan komentar sisa debug.

## Saat Terjadi Error

1. Baca pesan error lengkap (terminal Laravel, console browser, error TypeScript). Catatan error lama ada di `error.md` di root (bukan bagian kode produk).
2. Penyebab umum di project ini:
   - **Halaman tidak ditemukan** → casing path tidak cocok (`Admin/...` vs `admin/...`).
   - **`route is not defined` / nama route tidak ada** → route belum terdaftar atau cache Ziggy; jalankan `php artisan route:list` dan `php artisan optimize:clear`.
   - **`ValueError` enum** → nilai legacy `book_type`; cek `NormalizedBookType`.
   - **Data publik tidak berubah** → cache `v2` belum diinvalidasi.
   - **Lupa migrate** → `php artisan migrate`.
3. Perbaiki akar masalah. Jangan menutupi dengan `@ts-ignore`, `any`, atau `try/catch` kosong.
4. Jelaskan singkat penyebab dan perbaikannya.

## Kapan Bertanya ke User

Tanya dulu (maksimal 1–2 pertanyaan singkat) hanya jika:
- Permintaan ambigu dan mengubah skema database secara signifikan.
- Perlu package baru atau perubahan arsitektur.
- Aksi destruktif (hapus data, reset DB, ubah migration lama).

Selain itu, ambil asumsi yang wajar, kerjakan, lalu sebutkan asumsinya di ringkasan akhir.
