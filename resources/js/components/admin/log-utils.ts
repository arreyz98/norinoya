/**
 * Util bersama untuk halaman log admin (View Logs & Search Logs).
 * Dipakai oleh `logs-page.tsx` dan `search-logs-page.tsx`.
 */

export interface ParsedUserAgent {
    device: string;
    browser: string;
    isMobile: boolean;
}

/**
 * Ekstrak info device/browser dari string User-Agent.
 */
export function parseUserAgent(ua: string | null): ParsedUserAgent {
    if (!ua) {
        return { device: 'Unknown', browser: 'Unknown', isMobile: false };
    }

    const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
    let browser = 'Browser';

    if (/edg/i.test(ua)) {
        browser = 'Edge';
    } else if (/chrome|crios/i.test(ua)) {
        browser = 'Chrome';
    } else if (/firefox|fxios/i.test(ua)) {
        browser = 'Firefox';
    } else if (/safari/i.test(ua)) {
        browser = 'Safari';
    } else if (/opera|opr/i.test(ua)) {
        browser = 'Opera';
    }

    return {
        device: isMobile ? 'Mobile' : 'Desktop',
        browser,
        isMobile,
    };
}

/**
 * Format objek Date lokal ke string YYYY-MM-DD tanpa pergeseran UTC.
 */
export function toLocalDateString(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * Format string tanggal YYYY-MM-DD ke tampilan lokal (mis. "9 Okt 2026").
 */
export function formatDisplayDate(dateString?: string): string {
    if (!dateString) {
        return '';
    }

    const parts = dateString.split('-');

    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);

        return d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }

    return dateString;
}

/**
 * Format string datetime ke tampilan lokal dengan jam & menit.
 */
export function formatDateTime(dateString: string): string {
    if (!dateString) {
        return '-';
    }

    const d = new Date(dateString);

    return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Parse string YYYY-MM-DD kembali menjadi Date lokal (tanpa pergeseran UTC).
 */
export function parseLocalDate(value: string): Date | undefined {
    const parts = value.split('-');

    return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : undefined;
}
