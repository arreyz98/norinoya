import type { Comic, Volume } from '../types/demo';

type BookLike = Pick<Comic, 'slug'> | null | undefined;
type VolumeLike = Pick<Volume, 'slug' | 'volNumber'> | null | undefined;

/**
 * Tombol modifier yang membuat klik dianggap "buka di tab/jendela baru".
 * Dipakai agar <a href> tetap menghormati Ctrl/Cmd/Shift/middle-click.
 */
export interface ClickModifiers {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}

function normalizeSlug(value: string | undefined | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Satu-satunya sumber URL halaman detail buku.
 *
 * Aturan:
 * 1. Kalau volume punya slug sendiri, pakai itu — slug sudah mewakili volume,
 *    jadi tidak perlu `?vol=`.
 * 2. Kalau hanya ada slug seri, tambahkan `?vol=` supaya volume tetap terpilih.
 * 3. Tidak ada slug sama sekali → `null`. JANGAN fallback ke `comic.id`
 *    (format `series-12` / `book-7` tidak dikenali server dan jadi soft 404).
 */
export function bookPath(comic: BookLike, volume?: VolumeLike): string | null {
  const volumeSlug = normalizeSlug(volume?.slug);

  if (volumeSlug) {
    return `/buku/${encodeURIComponent(volumeSlug)}`;
  }

  const comicSlug = normalizeSlug(comic?.slug);

  if (!comicSlug) {
    return null;
  }

  const base = `/buku/${encodeURIComponent(comicSlug)}`;
  const rawVolume = volume?.volNumber;
  const volumeNumber = rawVolume === undefined || rawVolume === null ? '' : String(rawVolume).trim();

  return volumeNumber === '' ? base : `${base}?vol=${encodeURIComponent(volumeNumber)}`;
}

/**
 * Versi absolut dari {@link bookPath}, untuk share sheet / canonical klien.
 * Mengembalikan `null` saat tidak ada `window` (mis. render server).
 */
export function bookUrl(comic: BookLike, volume?: VolumeLike): string | null {
  const path = bookPath(comic, volume);

  if (!path || typeof window === 'undefined') {
    return null;
  }

  return `${window.location.origin}${path}`;
}

/**
 * Klik kiri tanpa modifier. Dipakai sebelum `preventDefault()` supaya
 * Ctrl/Cmd-klik dan middle-click tetap membuka tab baru secara native.
 */
export function isPlainLeftClick(event: ClickModifiers): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
