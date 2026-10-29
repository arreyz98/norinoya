export function normalizeImageKitUrl(value: string): string {
    return value.trim().replace(/^https?:\/\/ik\.imagekit\.io(?=\/|$)/i, 'https://ik.imgkit.net');
}

/**
 * URL valid (http/https) — sinkron dengan rule validasi server.
 * Dipakai bersama oleh Books, PanduanAdaptasi, dan News.
 */
export function isValidUrl(value: string): boolean {
    const url = value.trim();

    if (url === '') return false;

    try {
        const parsed = new URL(url);

        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
}

const DANGEROUS_PROTOCOL = /^(javascript|data|vbscript):/i;

/**
 * Alamat gambar yang aman dipakai di <img src>:
 * `http(s)://…`, `//host/…`, path relatif situs `/…`, atau domain telanjang.
 * Menolak `javascript:`, `data:`, `vbscript:`, dan nilai yang mengandung spasi.
 */
export function isSafeImageUrl(value: string): boolean {
    const url = (value ?? '').trim();

    if (url === '' || /\s/.test(url)) return false;
    if (DANGEROUS_PROTOCOL.test(url)) return false;

    // Path relatif situs sendiri, mis. /assets/images/foto.jpg
    if (url.startsWith('/') && !url.startsWith('//')) return true;

    const candidate = url.startsWith('//')
        ? `https:${url}`
        : /^[a-z][a-z0-9+.-]*:/i.test(url)
            ? url
            : `https://${url}`;

    try {
        const parsed = new URL(candidate);

        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
        return false;
    }
}

/** Rapikan alamat gambar sebelum disimpan (tambahkan https:// bila perlu). */
export function normalizeImageUrl(value: string): string {
    const url = (value ?? '').trim();

    if (url === '') return '';
    if (url.startsWith('//')) return `https:${url}`;
    if (url.startsWith('/')) return url;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;

    return `https://${url}`;
}
