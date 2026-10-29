const DEFAULT_EXCERPT = 'Baca update berita dan artikel terbaru seputar manga, anime, dan pop culture di Norinoya.';

/**
 * Cuplikan meta: buang tag, rapikan spasi, potong di batas kata.
 * Dipakai ulang di daftar dan detail supaya deskripsi tidak memotong HTML mentah.
 */
export function newsExcerpt(html?: string | null, fallback = DEFAULT_EXCERPT): string {
    const decoded = (html || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>');

    const text = decoded.replace(/\s+/g, ' ').trim();

    if (!text) {
        return fallback;
    }

    if (text.length <= 155) {
        return text;
    }

    const cut = text.slice(0, 155);
    const space = cut.lastIndexOf(' ');
    const clipped = space > 80 ? cut.slice(0, space) : cut;

    return clipped.replace(/[.,;:!?"'\s]+$/g, '') + '…';
}
