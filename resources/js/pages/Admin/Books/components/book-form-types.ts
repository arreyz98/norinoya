/**
 * Tipe & konstanta bersama untuk form buku (BookForm dan section-section-nya).
 */

export interface Option {
    id: number;
    name?: string;
    title?: string;
}

export interface EnumOption {
    value: string;
    label: string;
}

export interface ImageItem {
    id?: number;
    image_url: string;
    sort_order?: number;
}

export interface AffiliateLink {
    id?: number;
    affiliate_store_id: string;
    store_name?: string;
    location?: string;
    url: string;
}

export interface VideoLink {
    id?: number;
    platform_name: string;
    title?: string;
    access_type: string;
    url: string;
}

// Ignore only untouched new placeholders; keep partial and persisted rows for validation.
export const hasVideoLinkContent = (video: VideoLink): boolean =>
    Boolean(video.id || video.platform_name.trim() || video.title?.trim() || video.url.trim() || video.access_type !== 'free');

export interface TiktokEmbed {
    id?: number;
    name: string;
    embed_url: string;
    url_video: string;
}

export interface InstagramEmbed {
    id?: number;
    name: string;
    url: string;
    thumbnail_url: string;
    title: string;
    description: string;
    // Hanya dipakai di form (tempat admin menempel embed HTML dari Microlink).
    embed_html?: string;
}

// Link berita terkait (tabel book_news_links). Bisa lebih dari satu per buku.
export interface NewsLink {
    id?: number;
    title: string;
    url: string;
}

export interface BookFormData {
    [key: string]: unknown;
    title: string;
    series_id: string;
    volume: string;
    edition_id: string;
    book_type: string;
    story_status_id: string;
    age_rating: string;
    publisher_id: string;

    synopsis: string;
    news_link: string;
    news_links: NewsLink[];
    msrp: string;

    isbn: string;
    page_count: string;
    paper_type: string;
    dimensions: string;
    adaptation: string;
    is_upcoming: boolean;
    publication_status: 'draft' | 'published';

    images: ImageItem[];
    tiktok_embeds: TiktokEmbed[];
    instagram_embeds: InstagramEmbed[];

    story_authors: string[];
    art_authors: string[];
    genres: string[];

    affiliate_links: AffiliateLink[];
    video_links: VideoLink[];
}

export type ValidationErrors = Record<string, string>;

export interface SubmissionMaps {
    images: number[];
    tiktok_embeds: number[];
    instagram_embeds: number[];
    news_links: number[];
    affiliate_links: number[];
    video_links: number[];
}

/**
 * Field yang wajib diisi (dipakai untuk aria-required di getFieldProps).
 */
export const REQUIRED_FIELDS = new Set([
    'title',
    'volume',
    'edition_id',
    'book_type',
    'story_status_id',
    'age_rating',
    'publisher_id',
    'synopsis',
    'msrp',
]);

/**
 * Props aksesoris yang dipakai section-section form (error + helper field).
 */
export interface BookFormSectionProps {
    activeErrors: ValidationErrors;
    getFieldProps: (
        field: string,
        alternateFields?: string[],
        baseClassName?: string,
    ) => {
        'aria-invalid'?: boolean;
        'aria-required'?: boolean;
        'aria-describedby'?: string;
        className?: string;
    };
}
