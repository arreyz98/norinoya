/**
 * Utilitas iframe embed (Instagram / X-Twitter / YouTube).
 *
 * MASALAH
 * iframe embed Instagram & X/Twitter punya tinggi tetap sementara konten di
 * dalamnya bisa lebih tinggi -> muncul scrollbar atau (kalau dipaksa) terpotong.
 *
 * Instagram mengirim tinggi konten aslinya lewat postMessage ("MEASURE"), jadi
 * tingginya bisa presisi. X/Twitter TIDAK — diverifikasi dengan menangkap seluruh
 * pesan dari iframe-nya, yang datang hanya "twttr.private.initialized" dan
 * "twttr.private.results". Karena itu tinggi Twitter memakai nilai terukur.
 */

/** Tinggi awal iframe embed post Instagram (sebelum tinggi asli terdeteksi). */
export const INSTAGRAM_EMBED_HEIGHT = 760;

/** Tinggi awal iframe embed Reel / IGTV Instagram (kontennya lebih tinggi). */
export const INSTAGRAM_REEL_EMBED_HEIGHT = 900;

/**
 * Tinggi iframe X/Twitter.
 *
 * Diukur langsung dari piksel render tweet nyata (bukan perkiraan):
 *   iframe 550px -> konten berakhir di 873px
 *   iframe 420px -> konten berakhir di 839px
 *
 * Tinggi konten praktis tidak berubah terhadap lebar karena Twitter menyesuaikan
 * crop media, jadi satu nilai tetap sudah cukup. 900px memberi ruang aman.
 * `scrolling` sengaja TIDAK dimatikan: kalau ada tweet yang lebih tinggi dari ini,
 * pengguna melihat scrollbar, bukan konten yang terpotong.
 */
export const TWITTER_EMBED_HEIGHT = 900;

type EmbedProviderKey = 'instagram' | 'twitter';

/** URL src Instagram yang berisi Reel / IGTV membutuhkan tinggi lebih besar. */
export const instagramFrameHeight = (src: string): number =>
    /\/(reel|reels|tv)\//i.test(src) ? INSTAGRAM_REEL_EMBED_HEIGHT : INSTAGRAM_EMBED_HEIGHT;

const isInstagramFrame = (src: string): boolean => /instagram\.com/i.test(src);

const isTwitterFrame = (src: string): boolean => /platform\.twitter\.com|\/\/(www\.)?(twitter|x)\.com/i.test(src);

const currentHeight = (frame: HTMLIFrameElement): number => {
    const value = Number.parseFloat(frame.style.height || '0');
    return Number.isFinite(value) ? value : 0;
};

const providerFromOrigin = (origin: string): EmbedProviderKey | null => {
    if (!origin) return null;

    let host: string;
    try {
        host = new URL(origin).hostname.toLowerCase();
    } catch {
        return null;
    }

    if (/(^|\.)instagram\.com$/.test(host)) return 'instagram';
    if (/(^|\.)twitter\.com$/.test(host) || /(^|\.)x\.com$/.test(host)) return 'twitter';
    return null;
};

/** Ambil angka tinggi dari payload postMessage (struktur bisa beda antar provider/versi). */
const readHeight = (value: unknown, depth = 0): number | null => {
    if (depth > 5 || value === null || typeof value !== 'object') return null;

    if (Array.isArray(value)) {
        for (const item of value) {
            const nested = readHeight(item, depth + 1);
            if (nested) return nested;
        }
        return null;
    }

    const record = value as Record<string, unknown>;

    for (const key of ['height', 'Height']) {
        const raw = record[key];
        if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) return Math.round(raw);
        if (typeof raw === 'string' && /^\d+(\.\d+)?$/.test(raw.trim())) return Math.round(Number(raw));
    }

    for (const key of ['details', 'data', 'payload', 'value', 'measurements', 'result', 'twttr', 'embed', 'params']) {
        const nested = readHeight(record[key], depth + 1);
        if (nested) return nested;
    }

    return null;
};

/**
 * Samakan tinggi iframe embed dengan tinggi konten aslinya berdasarkan
 * postMessage dari Instagram ("MEASURE") atau X/Twitter ("twttr.private.resize").
 * Mengembalikan fungsi cleanup untuk melepas listener.
 */
export const syncEmbedHeights = (container: HTMLElement | null): (() => void) => {
    if (!container || typeof window === 'undefined') return () => {};

    const handleMessage = (event: MessageEvent) => {
        const provider = providerFromOrigin(event.origin);
        if (!provider || !event.source) return;

        let payload: unknown = event.data;
        let raw: string;

        if (typeof payload === 'string') {
            raw = payload;
            try {
                payload = JSON.parse(payload);
            } catch {
                return;
            }
        } else {
            try {
                raw = JSON.stringify(payload);
            } catch {
                return;
            }
        }

        // Hanya tanggapi pesan pengukuran tinggi, bukan pesan lain dari provider yang sama.
        const isMeasure =
            provider === 'instagram' ? raw.includes('MEASURE') : raw.includes('twttr.private.resize');
        if (!isMeasure) return;

        const height = readHeight(payload);
        if (!height || height < 120 || height > 6000) return;

        // `event.source` adalah contentWindow iframe pengirim, jadi pasangannya pasti tepat.
        for (const frame of Array.from(container.querySelectorAll('iframe'))) {
            if (frame.contentWindow !== event.source) continue;
            const next = `${height}px`;
            if (frame.style.height !== next) frame.style.height = next;
            break;
        }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
};

/**
 * Siapkan seluruh iframe embed di dalam container:
 * - buang atribut loading="lazy" (membuat iframe di-reload saat halaman di-scroll)
 * - Instagram: matikan scrollbar internal + pasang tinggi awal yang lega. Tinggi
 *   sebenarnya menyusul lewat postMessage "MEASURE", jadi aman.
 * - X/Twitter: naikkan tinggi ke nilai terukur dan biarkan `scrolling` aktif,
 *   supaya tweet yang lebih tinggi muncul scrollbar alih-alih terpotong.
 */
export const prepareEmbedFrames = (container: HTMLElement | null): void => {
    if (!container) return;

    container.querySelectorAll<HTMLIFrameElement>('iframe').forEach((frame) => {
        frame.removeAttribute('loading');

        const src = frame.getAttribute('src') || '';

        if (isInstagramFrame(src)) {
            frame.setAttribute('scrolling', 'no');
            frame.style.overflow = 'hidden';

            const minHeight = instagramFrameHeight(src);
            if (currentHeight(frame) < minHeight) frame.style.height = `${minHeight}px`;
            return;
        }

        if (!isTwitterFrame(src)) return;

        // Buang atribut sisa dari versi sebelumnya supaya konten tidak terpotong.
        frame.removeAttribute('scrolling');
        frame.style.overflow = '';

        if (currentHeight(frame) < TWITTER_EMBED_HEIGHT) {
            frame.style.height = `${TWITTER_EMBED_HEIGHT}px`;
        }
    });
};
