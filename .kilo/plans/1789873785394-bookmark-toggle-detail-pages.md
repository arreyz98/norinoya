# Bookmark Toggle on Detail Pages

## Goal
Add a bookmark toggle button next to the share button in `DetailBuku`, `DetailNews`, and `DetailKios`. Bookmarks persist via `localStorage` using the existing `bookmarkStorage` utility — no database changes.

## Existing Infrastructure
- `resources/js/utils/bookmarkStorage.ts` — provides `bookmarkStorage.toggle()`, `bookmarkStorage.isBookmarked()`, and `useBookmarks()` hook
- `resources/js/pages/User/bookmark.tsx` — already resolves bookmark IDs back to objects using `COMICS_DATA`, `NEWS_UPDATES`, `PRE_OWNED_ITEMS`, `KIOS_CATALOG_ITEMS`, `KIOS_PARTNER_ITEMS`
- Bookmark ID formats already handled by `bookmark.tsx`:
  - Comics: `${comicId}-vol-${volNumber}` (parsed at line 237) or `${comicId}`
  - News: `${newsPost.id}`
  - Kios: `${itemId}` (supports PRE_OWNED_ITEMS, KIOS_CATALOG_ITEMS, KIOS_PARTNER_ITEMS, vol-format, and direct COMICS_DATA)

## Changes

### 1. `DetailBuku.tsx`
- Import `bookmarkStorage` from `../../../utils/bookmarkStorage`
- Import `Bookmark` icon from `lucide-react`
- Add local state: `const [isBookmarked, setIsBookmarked] = useState(false)`
- In the existing `useEffect` that runs on `[selectedComic?.id, activeVolumeNum]` (line 59), add:
  ```ts
  const bookmarkId = `${selectedComic.id}-vol-${activeVolumeNum}`;
  setIsBookmarked(bookmarkStorage.isBookmarked('comics', bookmarkId));
  ```
- Add a `handleToggleBookmark` function:
  ```ts
  const handleToggleBookmark = () => {
    const bookmarkId = `${selectedComic.id}-vol-${activeVolumeNum}`;
    const newState = bookmarkStorage.toggle('comics', bookmarkId);
    setIsBookmarked(newState);
  };
  ```
- In the header bar (line 360-380), add a bookmark button next to the share button with identical styling (`w-9 h-9 flex items-center justify-center ...`). Use `<Bookmark>` icon, filled (`fill="currentColor"`) when `isBookmarked` is true. Title: "Simpan ke Bookmark" / "Hapus dari Bookmark".

### 2. `DetailNews.tsx`
- Import `bookmarkStorage` from `../../../utils/bookmarkStorage`
- Import `Bookmark` icon from `lucide-react`
- Add local state: `const [isBookmarked, setIsBookmarked] = useState(false)`
- In the existing `useEffect` that runs on `[activePost?.id]` (line 147), add:
  ```ts
  setIsBookmarked(bookmarkStorage.isBookmarked('news', activePost.id));
  ```
- Add a `handleToggleBookmark` function:
  ```ts
  const handleToggleBookmark = () => {
    const newState = bookmarkStorage.toggle('news', activePost.id);
    setIsBookmarked(newState);
  };
  ```
- In the header bar (line 183-193), add a bookmark icon-only button (same style as share button but icon-only `w-9 h-9`) between the share button and closing `</div>`. Use `<Bookmark>` icon, filled when bookmarked.

### 3. `DetailKios.tsx`
- Import `bookmarkStorage` from `../../utils/bookmarkStorage` (adjust path based on file location)
- Import `Bookmark` icon from `lucide-react`
- Add local state: `const [isBookmarked, setIsBookmarked] = useState(false)`
- In the existing `useEffect` that runs on `[selectedItem]` (line 134), add:
  ```ts
  setIsBookmarked(bookmarkStorage.isBookmarked('kios', selectedItem.id));
  ```
- Add a `handleToggleBookmark` function:
  ```ts
  const handleToggleBookmark = () => {
    const newState = bookmarkStorage.toggle('kios', selectedItem.id);
    setIsBookmarked(newState);
  };
  ```
- In the header bar (line 253-261), add a bookmark icon-only button next to the share button. Same styling pattern. Use `<Bookmark>` icon, filled when bookmarked.

### 4. No changes to `bookmark.tsx` or `bookmarkStorage.ts`
The existing resolution logic in `bookmark.tsx` already handles the ID formats being saved.

## Button Design Pattern
All three buttons follow the same pattern — an icon-only button matching the existing share button style:
```tsx
<button
  onClick={handleToggleBookmark}
  className="w-9 h-9 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none shrink-0"
  title={isBookmarked ? 'Hapus dari Bookmark' : 'Simpan ke Bookmark'}
>
  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-amber-500' : 'text-neutral-600 dark:text-neutral-300'}`} />
</button>
```

## Validation
1. Open a book detail → click bookmark → verify amber filled icon → navigate to `/bookmark` page → verify item appears under Katalog tab
2. Open a news detail → click bookmark → verify it appears under News tab on bookmark page
3. Open a kios detail → click bookmark → verify it appears under Kios tab on bookmark page
4. Click bookmark again to unsave → verify item disappears from bookmark page
5. Refresh browser → verify bookmarks persist (localStorage)
6. Clear all bookmarks from bookmark page → verify detail page buttons reset to unfilled state when revisited
