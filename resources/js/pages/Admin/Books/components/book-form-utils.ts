import { hasVideoLinkContent, type BookFormData, type SubmissionMaps, type ValidationErrors } from './book-form-types';

export const isValidUrl = (value: string): boolean => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
};

// Transliterasi mendekati Illuminate\Support\Str::ascii() (portable-ascii)
// untuk karakter yang tidak terurai lewat NFKD.
const transliterateForSlug = (value: string): string =>
    value
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ß/g, 'ss')
        .replace(/[Ææ]/g, 'AE')
        .replace(/[Œœ]/g, 'OE')
        .replace(/[Øø]/g, 'O')
        .replace(/[Þþ]/g, 'TH')
        .replace(/[ÐðĐđ]/g, 'D')
        .replace(/[Łł]/g, 'L');

// Meniru Illuminate\Support\Str::slug($title . '-volume-' . $volume):
// transliterasi -> '_' menjadi '-' -> '@' menjadi '-at-' -> hapus karakter
// non-alfanumerik (bukan diganti '-') -> kolaps separator/whitespace -> trim.
export const buildSlugPreview = (title: string, volume: string): string =>
    transliterateForSlug(`${title}-volume-${volume}`)
        .replace(/_+/g, '-')
        .replace(/@/g, '-at-')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]+/gu, '')
        .replace(/[-\s]+/g, '-')
        .replace(/^-+|-+$/g, '');

// Meniru BookController::generateUniqueSlug(): bila slug dasar sudah dipakai
// (termasuk buku soft-deleted), tambahkan sufiks -1, -2, dst.
export const buildUniqueSlugPreview = (baseSlug: string, existingSlugs: ReadonlySet<string>): string => {
    if (baseSlug === '' || !existingSlugs.has(baseSlug)) {
        return baseSlug;
    }

    let counter = 1;

    while (existingSlugs.has(`${baseSlug}-${counter}`)) {
        counter += 1;
    }

    return `${baseSlug}-${counter}`;
};

export const validateBook = (form: BookFormData, volumesBySeries: Record<string, string[]>): ValidationErrors => {
    const nextErrors: ValidationErrors = {};
    const publishing = form.publication_status === 'published';
    const seriesKey = form.series_id ? String(form.series_id) : 'none';
    const seriesVolumes = volumesBySeries[seriesKey] ?? [];

    if (!form.title.trim()) {
        nextErrors.title = 'Judul buku wajib diisi.';
    }

    if (publishing && !form.volume.trim()) {
        nextErrors.volume = 'Volume wajib diisi.';
    } else if (form.volume.trim().length > 50) {
        nextErrors.volume = 'Volume maksimal 50 karakter.';
    } else if (form.volume.trim() && seriesVolumes.includes(form.volume.trim())) {
        nextErrors.volume = 'Volume ini sudah ada dalam series yang sama.';
    }

    if (publishing && !form.edition_id) {
        nextErrors.edition_id = 'Edisi cetakan wajib dipilih.';
    }

    if (publishing && !form.book_type) {
        nextErrors.book_type = 'Tipe buku wajib dipilih.';
    }

    if (publishing && !form.story_status_id) {
        nextErrors.story_status_id = 'Status cerita wajib dipilih.';
    }

    if (publishing && !form.age_rating) {
        nextErrors.age_rating = 'Rating umur wajib dipilih.';
    }

    if (publishing && !form.publisher_id) {
        nextErrors.publisher_id = 'Penerbit wajib dipilih.';
    }

    if (publishing && !form.synopsis.trim()) {
        nextErrors.synopsis = 'Sinopsis wajib diisi.';
    }

    if (publishing && !form.msrp.trim()) {
        nextErrors.msrp = 'Harga MSRP wajib diisi.';
    } else if (form.msrp.trim() && (!Number.isFinite(Number(form.msrp)) || Number(form.msrp) < 0)) {
        nextErrors.msrp = 'Harga MSRP harus berupa angka minimal 0.';
    }

    if (form.news_link.trim() && !isValidUrl(form.news_link.trim())) {
        nextErrors.news_link = 'Link berita tidak valid.';
    }

    if (form.images.length > 5) {
        nextErrors.images = 'Maksimal 5 gambar.';
    }

    form.images.forEach((image, index) => {
        const url = image.image_url.trim();

        if (url && !isValidUrl(url)) {
            nextErrors[`images.${index}.image_url`] = 'URL gambar tidak valid.';
        }
    });

    if (form.tiktok_embeds.length > 10) {
        nextErrors.tiktok_embeds = 'Maksimal 10 video TikTok.';
    }

    form.tiktok_embeds.forEach((embed, index) => {
        const url = (embed.embed_url || embed.url_video || '').trim();

        if (url && !isValidUrl(url)) {
            nextErrors[`tiktok_embeds.${index}.url_video`] = 'URL TikTok tidak valid.';
        }
    });

    if (form.instagram_embeds.length > 10) {
        nextErrors.instagram_embeds = 'Maksimal 10 postingan Instagram.';
    }

    form.instagram_embeds.forEach((embed, index) => {
        const url = (embed.url || '').trim();

        if (url && !isValidUrl(url)) {
            nextErrors[`instagram_embeds.${index}.url`] = 'URL Instagram tidak valid.';
        }
    });

    if (form.news_links.length > 10) {
        nextErrors.news_links = 'Maksimal 10 link berita.';
    }

    form.news_links.forEach((link, index) => {
        const url = (link.url || '').trim();

        if (url && !isValidUrl(url)) {
            nextErrors[`news_links.${index}.url`] = 'URL berita tidak valid.';
        }
    });

    form.affiliate_links.forEach((link, index) => {
        const hasStore = Boolean(link.affiliate_store_id);
        const url = link.url.trim();

        if ((hasStore || url) && !hasStore) {
            nextErrors[`affiliate_links.${index}.affiliate_store_id`] = 'Toko affiliate wajib dipilih.';
        }

        if ((hasStore || url) && !url) {
            nextErrors[`affiliate_links.${index}.url`] = 'URL affiliate wajib diisi.';
        } else if (url && !isValidUrl(url)) {
            nextErrors[`affiliate_links.${index}.url`] = 'URL affiliate tidak valid.';
        }
    });

    if (form.video_links.length > 20) {
        nextErrors.video_links = 'Maksimal 20 link video.';
    }

    form.video_links.forEach((video, index) => {
        const platform = video.platform_name.trim();
        const url = video.url.trim();
        const hasAny = hasVideoLinkContent(video);

        if (hasAny && !platform) {
            nextErrors[`video_links.${index}.platform_name`] = 'Nama platform wajib diisi.';
        }

        if (hasAny && !url) {
            nextErrors[`video_links.${index}.url`] = 'Link video wajib diisi.';
        } else if (url && !isValidUrl(url)) {
            nextErrors[`video_links.${index}.url`] = 'Link video tidak valid.';
        }

        if (hasAny && !video.access_type) {
            nextErrors[`video_links.${index}.access_type`] = 'Pilih tipe akses.';
        } else if (hasAny && !['free', 'subscription'].includes(video.access_type)) {
            nextErrors[`video_links.${index}.access_type`] = 'Tipe akses video tidak valid.';
        }
    });

    return nextErrors;
};

export const normalizeServerErrors = (serverErrors: ValidationErrors, maps: SubmissionMaps): ValidationErrors => {
    const normalized: ValidationErrors = {};

    for (const [key, message] of Object.entries(serverErrors)) {
        const imageMatch = key.match(/^images\.(\d+)\.([\w.]+)$/);

        if (imageMatch) {
            const payloadIndex = Number(imageMatch[1]);
            const formIndex = maps.images[payloadIndex] ?? payloadIndex;
            normalized[`images.${formIndex}.${imageMatch[2]}`] = message;
            continue;
        }

        const tiktokMatch = key.match(/^tiktok_embeds\.(\d+)\.([\w.]+)$/);

        if (tiktokMatch) {
            const payloadIndex = Number(tiktokMatch[1]);
            const formIndex = maps.tiktok_embeds[payloadIndex] ?? payloadIndex;
            normalized[`tiktok_embeds.${formIndex}.${tiktokMatch[2]}`] = message;
            continue;
        }

        const instagramMatch = key.match(/^instagram_embeds\.(\d+)\.([\w.]+)$/);

        if (instagramMatch) {
            const payloadIndex = Number(instagramMatch[1]);
            const formIndex = maps.instagram_embeds[payloadIndex] ?? payloadIndex;
            normalized[`instagram_embeds.${formIndex}.${instagramMatch[2]}`] = message;
            continue;
        }

        const newsLinkMatch = key.match(/^news_links\.(\d+)\.([\w.]+)$/);

        if (newsLinkMatch) {
            const payloadIndex = Number(newsLinkMatch[1]);
            const formIndex = maps.news_links[payloadIndex] ?? payloadIndex;
            normalized[`news_links.${formIndex}.${newsLinkMatch[2]}`] = message;
            continue;
        }

        const affiliateMatch = key.match(/^affiliate_links\.(\d+)\.([\w.]+)$/);

        if (affiliateMatch) {
            const payloadIndex = Number(affiliateMatch[1]);
            const formIndex = maps.affiliate_links[payloadIndex] ?? payloadIndex;
            normalized[`affiliate_links.${formIndex}.${affiliateMatch[2]}`] = message;
            continue;
        }

        const videoMatch = key.match(/^video_links\.(\d+)\.([\w.]+)$/);

        if (videoMatch) {
            const payloadIndex = Number(videoMatch[1]);
            const formIndex = maps.video_links[payloadIndex] ?? payloadIndex;
            normalized[`video_links.${formIndex}.${videoMatch[2]}`] = message;
            continue;
        }

        normalized[key] = message;
    }

    return normalized;
};

/**
 * Bersihkan URL TikTok (hapus query/hash, ambil URL video/photo canonical).
 */
export const cleanTikTokUrl = (url: string): string => {
    if (!url) return '';
    const trimmed = url.trim();
    const match = trimmed.match(/^(https?:\/\/(?:[a-zA-Z0-9-]+\.)?tiktok\.com\/@[^/]+\/(?:video|photo)\/\d+)/i);
    if (match && match[1]) {
        return match[1];
    }
    if (trimmed.includes('tiktok.com') && (trimmed.includes('?') || trimmed.includes('#'))) {
        return trimmed.split('?')[0].split('#')[0];
    }
    return trimmed;
};

/**
 * Bersihkan URL Instagram (hapus query/hash, ambil URL post/reel canonical).
 */
export const cleanInstagramUrl = (url: string): string => {
    if (!url) {
        return '';
    }

    const trimmed = url.trim();
    const match = trimmed.match(/^(https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|reels|tv)\/[A-Za-z0-9_-]+)/i);

    if (match && match[1]) {
        return match[1];
    }

    if (trimmed.includes('instagram.com') && (trimmed.includes('?') || trimmed.includes('#'))) {
        return trimmed.split('?')[0].split('#')[0];
    }

    return trimmed;
};
