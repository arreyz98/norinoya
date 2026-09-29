# Fix: Refresh on Book Detail (`/buku/{slug}`) drops back to Home

## Goal
When a user is viewing a book detail (the full-screen `DetailBuku` view rendered by `MarketplaceDb` inside `home.tsx`) and refreshes, they must stay on that same book (and same volume). Today refresh lands them on the home/catalog view.

## Evidence (current behavior)
- Detail is a **client-side overlay**, not a route: `MarketplaceDb` renders `<DetailBuku>` when `selectedComic` is set (`resources/js/pages/User/components/MarketplaceDB.tsx:1524`).
- URL is written with `window.history.pushState` in `openVolumeModal` using `comic.slug || comic.id`, and **the volume is not in the URL** (`MarketplaceDB.tsx:355`).
- Volume changes inside the detail only call raw `setActiveVolumeNum` (`MarketplaceDB.tsx:1528`), so the URL is never updated.
- On refresh the server route `/buku/{slug}` runs (`routes/web.php:123`) and **silently redirects to home when the slug does not match a `books` row** (`routes/web.php:138-140`). This is the literal "berpindah ke home".
- The server route does resolve a real book and passes `initialBook` / `initialSlug` (`routes/web.php:184-202`), and `home.tsx` derives `initialComicId` (`resources/js/pages/User/home.tsx:79-110`), but:
  - The client slug can come from mock `COMICS_DATA` (e.g. `naruto-bind-up`) which never exists in `books`, forcing the redirect.
  - For series grouped by `series_id`, the comic slug is the **first** volume's book slug, so the viewed volume is lost.
  - `home.tsx`'s resolver only searches `comicsData` (DB-derived); a mock slug is returned as-is and then not found by `MarketplaceDb`, so no detail opens.
  - `MarketplaceDb`'s sync effect clears selection whenever the derived id is falsy (`MarketplaceDB.tsx:350-352`), so any transient miss drops to the catalog.

## Decisions
- **No silent redirect for unknown slugs.** `/buku/{slug}` always returns `User/home` (HTTP 200) with `initialSlug`, letting the client resolve from DB comics or mock `COMICS_DATA`. This fixes both real and mock catalog items.
- **Encode volume in the URL as a query param** `?vol=<n>`. Backwards compatible, no route signature change, easy to parse server-side via `$request->query('vol')`.
- **Single client resolver** shared by `home.tsx` and `MarketplaceDb` that searches DB-derived comics first, then `COMICS_DATA`.

## Tasks

1. **Backend route `/buku/{slug}` — `routes/web.php:123-203`**
   - Remove the `if (!$book) return redirect()->route('home')` branch.
   - Allow `$book` to be null; derive `$books` (all) as today.
   - Read `$volume = (int) request()->query('vol', 0)`; when `$book` exists and `$volume` is 0, default to `$book->volume`.
   - Pass to the page: `initialBook` (`$book` or `null`), `initialSlug` (`$slug`), `initialVolume` (`$volume ?: null`).
   - Keep the view-count logging only when `$book` exists.
   - Keep the existing `meta` block, but guard against `$book === null` (fall back to a generic catalog title/description and `favicon.png`).
   - Leave the existing `where('slug', $slug)->orWhere('id', $slug)` lookup, but never redirect on miss.

2. **URL writer — `MarketplaceDB.tsx:355-361` (`openVolumeModal`)**
   - Build target as `/buku/${targetSlug}?vol=${volNumber}`.
   - Keep `pushState` (no full navigation) so SPA behavior is unchanged.

3. **Keep URL in sync on volume change — `MarketplaceDB.tsx`**
   - Wrap `setActiveVolumeNum` in a handler that also replaces the current URL's `vol` query param for the active comic slug (use `history.replaceState` to avoid polluting history on every click).
   - Pass that wrapper to `DetailBuku` instead of the raw setter (`MarketplaceDB.tsx:1528`).

4. **Client resolver — `home.tsx:79-110` and pass-through**
   - Accept new prop `initialVolume?: number | null`.
   - Resolve the comic by searching `comicsData` **and** `COMICS_DATA` (merge/dedupe by id) using the existing match predicates (`id`, `book-${id}`, `series-${series_id}`, `bookId`, `slug`, volume id/bookId).
   - Build `initialComicId` as `${match.id}-vol-${initialVolume || initialBook?.volume || 1}` when a match is found; otherwise fall back to `initialSlug` so no failure.
   - Pass `initialVolume` down to `MarketplaceDb` (new optional prop).

5. **MarketplaceDb initial/sync resolution — `MarketplaceDB.tsx:218-249, 331-353`**
   - Factor the existing find predicate into one local helper `findComicByRef(ref)` and reuse it in all three places (lazy `useState` for `selectedComic`, lazy `useState` for `activeVolumeNum`, and the `useEffect`).
   - Search `activeComics` first, then `COMICS_DATA` as a fallback when `customComics` is provided but does not contain the ref.
   - Change the sync effect so it **does not clear** `selectedComic` when `initialSelectedComicId` is falsy on the very first pass; only clear on an explicit transition to falsy after having a selection (or simply leave the current value). This prevents a transient miss from dropping to the catalog.
   - Honor `initialVolume` when present, else the parsed `-vol-` suffix, else first volume.

6. **Share link — `DetailBuku.tsx:485-495`**
   - Include the current volume in the share URL: `/buku/${bookSlug}?vol=${activeVolumeNum}`.

7. **Close behavior — `MarketplaceDB.tsx:363-374`**
   - `handleCloseModal` should also clear the `vol` query param when reverting the URL. No change to the redirect-to-`/` behavior for closing.

## Files touched
- `routes/web.php` (route `/buku/{slug}` only)
- `resources/js/pages/User/home.tsx`
- `resources/js/pages/User/components/MarketplaceDB.tsx`
- `resources/js/pages/User/components/DetailBuku.tsx`

## Edge cases / failure modes to verify
- DB book with `series_id`: refresh at `?vol=3` reopens series group at volume 3.
- DB book without `series_id`: `book-${id}-vol-N` resolves.
- Mock-only catalog (empty `books` prop): mock slug renders home and opens the mock detail instead of redirecting.
- Slug present in DB but with a volume that does not exist in the group: fall back to first volume.
- Query param `vol` non-numeric / `0` / negative: ignored, default applied.
- Unknown slug with no mock match: shows the catalog (home tab) at the same URL — **no redirect**.

## Validation
- Manual: open catalog → open a book (vol 1), switch to vol 2, copy URL, refresh → same book and vol 2.
- Manual: repeat for a mock-only item (if `books` empty) and confirm no redirect to `/`.
- Manual: click Share and confirm the generated URL contains `?vol=`.
- Run `npx tsc --noEmit` (and `npm run lint` if configured) after the change.

## Open question (default chosen)
URL scheme for volume: using query param `?vol=` by default. If a path segment (`/buku/{slug}/{vol}`) is preferred, the route signature must change accordingly; not chosen to keep the route and existing links compatible.