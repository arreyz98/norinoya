import { router } from '@inertiajs/react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { normalizeImageKitUrl } from '@/utils/imageUrl';

import AffiliateLinksSection from './AffiliateLinksSection';
import BookAuthorsGenresSection from './BookAuthorsGenresSection';
import BookBasicInfo from './BookBasicInfo';
import BookDescriptionMediaSection from './BookDescriptionMediaSection';
import BookImagesSection from './BookImagesSection';
import BookMetadataForm from './BookMetadataForm';
import VideoLinksSection from './VideoLinksSection';
import {
    REQUIRED_FIELDS,
    hasVideoLinkContent,
    type AffiliateLink,
    type BookFormData,
    type EnumOption,
    type ImageItem,
    type InstagramEmbed,
    type NewsLink,
    type Option,
    type SubmissionMaps,
    type TiktokEmbed,
    type ValidationErrors,
    type VideoLink,
} from './book-form-types';
import { buildSlugPreview, buildUniqueSlugPreview, cleanInstagramUrl, cleanTikTokUrl, normalizeServerErrors, validateBook } from './book-form-utils';

export type { AffiliateLink, BookFormData, EnumOption, ImageItem, InstagramEmbed, NewsLink, Option, TiktokEmbed, ValidationErrors, VideoLink };

interface BookFormProps {
    mode: 'create' | 'edit';
    /** `async` berarti server tidak mengirim daftar series (jumlahnya terlalu banyak). */
    seriesMode: 'inline' | 'async';
    selectedSeries?: { id: number; title: string } | null;
    selectedSeriesVolumes?: string[];
    existingSlugs?: string[];

    book?: {
        id?: number;
        title?: string;
        slug?: string;
        series_id?: number | string | null;
        volume?: number | string;
        edition_id?: number | string;
        book_type?: string;
        story_status_id?: number | string;
        age_rating?: string;
        publisher_id?: number | string;
        synopsis?: string;
        news_link?: string | null;
        news_links?: { id?: number; title?: string; url: string; sort_order?: number }[];
        msrp?: number | string | null;
        isbn?: string | null;
        page_count?: number | string | null;
        paper_type?: string | null;
        dimensions?: string | null;
        adaptation?: string | null;
        is_upcoming?: boolean | null;
        publication_status?: 'draft' | 'published';
        images?: { id?: number; image_url: string; sort_order?: number }[];
        tiktok_embeds?: { id?: number; name?: string; embed_url?: string; url_video?: string; sort_order?: number }[];
        instagram_embeds?: {
            id?: number;
            name?: string;
            url?: string;
            thumbnail_url?: string;
            title?: string;
            description?: string;
            sort_order?: number;
        }[];
        story_authors?: (number | string)[];
        art_authors?: (number | string)[];
        genres?: (number | string)[];
        affiliate_links?: {
            id?: number;
            affiliate_store_id: number | string;
            store_name?: string;
            location?: string;
            url: string;
        }[];
        video_links?: {
            id?: number;
            platform_name: string;
            title?: string | null;
            access_type: string;
            url: string;
        }[];
    };

    series: Option[];
    editions: Option[];
    storyStatuses: Option[];
    publishers: Option[];
    authors: Option[];
    genres: Option[];
    affiliateStores: Option[];
    videoAccessTypes: EnumOption[];

    bookTypes: EnumOption[];
    ageRatings: EnumOption[];

    processing: boolean;
    errors: Record<string, string>;

    onSubmit: (data: BookFormData) => void;
}

export default function BookForm({
    mode,
    book,
    series,
    editions,
    storyStatuses,
    publishers,
    authors,
    genres,
    affiliateStores,
    videoAccessTypes,
    bookTypes,
    ageRatings,
    seriesMode,
    selectedSeries,
    selectedSeriesVolumes = [],
    existingSlugs = [],
    processing,
    errors,
    onSubmit,
}: BookFormProps) {
    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});
    const [clearedFields, setClearedFields] = useState<Set<string>>(new Set());
    const [submissionMaps, setSubmissionMaps] = useState<SubmissionMaps>({
        images: [],
        tiktok_embeds: [],
        instagram_embeds: [],
        news_links: [],
        affiliate_links: [],
        video_links: [],
    });

    // Cache volume per series. Hanya series yang dipilih yang dimuat, supaya
    // payload halaman tidak perlu mengirim seluruh volume dari semua series.
    const [volumesBySeries, setVolumesBySeries] = useState<Record<string, string[]>>(() =>
        book?.series_id ? { [String(book.series_id)]: selectedSeriesVolumes } : {},
    );

    const formRef = useRef<HTMLFormElement>(null);
    const errorSummaryRef = useRef<HTMLDivElement>(null);

    const normalizedServerErrors = useMemo(() => normalizeServerErrors(errors, submissionMaps), [errors, submissionMaps]);

    const activeErrors = useMemo(() => {
        const merged = {
            ...normalizedServerErrors,
            ...localErrors,
        };

        return Object.fromEntries(Object.entries(merged).filter(([key, message]) => Boolean(message) && !clearedFields.has(key)));
    }, [clearedFields, localErrors, normalizedServerErrors]);

    const errorCount = Object.keys(activeErrors).length;

    const clearFieldError = (field: string) => {
        setLocalErrors((previous) => ({
            ...previous,
            [field]: '',
        }));
        setClearedFields((previous) => {
            const next = new Set(previous);
            next.add(field);
            return next;
        });
    };

    const clearErrorPrefix = (prefix: string) => {
        setLocalErrors((previous) => {
            const next = { ...previous };

            for (const key of Object.keys(next)) {
                if (key === prefix || key.startsWith(`${prefix}.`)) {
                    next[key] = '';
                }
            }

            return next;
        });

        setClearedFields((previous) => {
            const next = new Set(previous);
            next.add(prefix);

            for (const key of Object.keys(activeErrors)) {
                if (key.startsWith(`${prefix}.`)) {
                    next.add(key);
                }
            }

            return next;
        });
    };

    const getFieldProps = (field: string, alternateFields: string[] = [], baseClassName?: string) => {
        const errorFields = [field, ...alternateFields].filter((candidate) => Boolean(activeErrors[candidate]));
        const hasError = errorFields.length > 0;

        const publishing = form.publication_status === 'published';
        const isRequired =
            field === 'title' ||
            (publishing && (REQUIRED_FIELDS.has(field) || alternateFields.some((candidate) => REQUIRED_FIELDS.has(candidate))));

        return {
            'aria-invalid': hasError || undefined,
            'aria-required': isRequired || undefined,
            'aria-describedby': hasError ? errorFields.map((candidate) => `${candidate}-error`).join(' ') : undefined,
            className: cn(baseClassName, hasError && 'border-destructive'),
        };
    };

    const [form, setForm] = useState<BookFormData>({
        title: book?.title ?? '',
        series_id: book?.series_id ? String(book.series_id) : '',
        volume: book?.volume ? String(book.volume) : '',
        edition_id: book?.edition_id ? String(book.edition_id) : '',
        book_type: book?.book_type ?? '',
        story_status_id: book?.story_status_id ? String(book.story_status_id) : '',
        age_rating: book?.age_rating ?? '',
        publisher_id: book?.publisher_id ? String(book.publisher_id) : '',

        synopsis: book?.synopsis ?? '',
        news_link: book?.news_link ?? '',

        news_links: book?.news_links?.map((link) => ({
            id: link.id,
            title: link.title ?? '',
            url: link.url ?? '',
        })) ?? [
            {
                title: '',
                url: '',
            },
        ],
        msrp: book?.msrp !== undefined && book?.msrp !== null ? String(book.msrp) : '',

        isbn: book?.isbn ?? '',
        page_count: book?.page_count !== undefined && book?.page_count !== null ? String(book.page_count) : '',
        paper_type: book?.paper_type ?? '',
        dimensions: book?.dimensions ?? '',
        adaptation: book?.adaptation ?? '',
        is_upcoming: Boolean(book?.is_upcoming),
        publication_status:
            mode === 'edit' ? (book?.publication_status === 'draft' ? 'draft' : 'published') : book?.publication_status === 'published' ? 'published' : 'draft',

        images: book?.images?.map((image) => ({
            id: image.id,
            image_url: normalizeImageKitUrl(image.image_url),
            sort_order: image.sort_order,
        })) ?? [
            {
                image_url: '',
            },
        ],

        tiktok_embeds: book?.tiktok_embeds?.map((embed) => ({
            id: embed.id,
            name: embed.name ?? '',
            embed_url: embed.embed_url ?? embed.url_video ?? '',
            url_video: embed.url_video ?? embed.embed_url ?? '',
        })) ?? [
            {
                name: '',
                embed_url: '',
                url_video: '',
            },
        ],

        instagram_embeds: book?.instagram_embeds?.map((embed) => ({
            id: embed.id,
            name: embed.name ?? '',
            url: embed.url ?? '',
            thumbnail_url: embed.thumbnail_url ?? '',
            title: embed.title ?? '',
            description: embed.description ?? '',
            embed_html: '',
        })) ?? [
            {
                name: '',
                url: '',
                thumbnail_url: '',
                title: '',
                description: '',
                embed_html: '',
            },
        ],

        story_authors: book?.story_authors?.map(String) ?? [],

        art_authors: book?.art_authors?.map(String) ?? [],

        genres: book?.genres?.map(String) ?? [],

        affiliate_links: book?.affiliate_links?.map((link) => ({
            id: link.id,
            affiliate_store_id: String(link.affiliate_store_id),
            store_name: link.store_name ?? 'Official Store',
            location: link.location ?? 'Indonesia',
            url: link.url,
        })) ?? [
            {
                affiliate_store_id: '',
                store_name: 'Official Store',
                location: 'Indonesia',
                url: '',
            },
        ],

        video_links: book?.video_links?.map((video) => ({
            id: video.id,
            platform_name: video.platform_name,
            title: video.title ?? '',
            access_type: video.access_type ?? 'free',
            url: video.url,
        })) ?? [
            {
                platform_name: '',
                title: '',
                access_type: 'free',
                url: '',
            },
        ],
    });

    const existingSlugSet = useMemo(() => new Set(existingSlugs), [existingSlugs]);

    const slugPreview = useMemo(
        () => buildUniqueSlugPreview(buildSlugPreview(form.title, form.volume), existingSlugSet),
        [existingSlugSet, form.title, form.volume],
    );

    // Backend hanya meregenerasi slug saat judul/volume berubah, jadi selama
    // keduanya belum diubah tampilkan slug yang benar-benar tersimpan.
    const titleVolumeUnchanged = useMemo(() => {
        if (mode !== 'edit') {
            return false;
        }

        const persistedTitle = (book?.title ?? '').trim();
        const persistedVolume = book?.volume !== undefined && book?.volume !== null ? String(book.volume).trim() : '';

        return form.title.trim() === persistedTitle && form.volume.trim() === persistedVolume;
    }, [book?.title, book?.volume, form.title, form.volume, mode]);

    const hasSlugInput = form.title.trim() !== '' || form.volume.trim() !== '';
    const displayedSlug = mode === 'edit' && book?.slug && titleVolumeUnchanged ? book.slug : slugPreview;

    // Muat volume milik series yang sedang dipilih agar validasi "volume sudah
    // ada" tetap jalan tanpa mengirim semua volume di props awal.
    useEffect(() => {
        const seriesId = form.series_id;

        if (!seriesId || volumesBySeries[seriesId] !== undefined) {
            return;
        }

        const controller = new AbortController();
        const url = new URL(route('admin.books.series-volumes'), window.location.origin);
        url.searchParams.set('series_id', seriesId);

        // Saat edit, volume buku ini sendiri tidak dihitung sebagai duplikat.
        if (mode === 'edit' && book?.id) {
            url.searchParams.set('ignore', String(book.id));
        }

        fetch(url.toString(), {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            signal: controller.signal,
        })
            .then((response) => (response.ok ? response.json() : { volumes: [] }))
            .then((payload: { volumes?: string[] }) => {
                const volumes = Array.isArray(payload.volumes) ? payload.volumes : [];

                setVolumesBySeries((previous) => ({ ...previous, [seriesId]: volumes }));
            })
            .catch(() => undefined);

        return () => controller.abort();
    }, [book?.id, form.series_id, mode, volumesBySeries]);

    useEffect(() => {
        if (form.images.length === 0) {
            setForm((previous) => ({
                ...previous,
                images: [
                    {
                        image_url: '',
                    },
                ],
            }));
        }
    }, [form.images.length]);

    const updateField = <K extends keyof BookFormData>(field: K, value: BookFormData[K]) => {
        clearFieldError(field as string);

        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const addImage = () => {
        if (form.images.length >= 5) {
            return;
        }

        clearErrorPrefix('images');

        setForm((previous) => ({
            ...previous,
            images: [
                ...previous.images,
                {
                    image_url: '',
                },
            ],
        }));
    };

    const removeImage = (index: number) => {
        clearErrorPrefix('images');

        setForm((previous) => ({
            ...previous,
            images: previous.images.filter((_, imageIndex) => imageIndex !== index),
        }));
    };

    const updateImage = (index: number, value: string) => {
        clearFieldError(`images.${index}.image_url`);

        const normalizedValue = normalizeImageKitUrl(value);

        setForm((previous) => ({
            ...previous,
            images: previous.images.map((image, imageIndex) =>
                imageIndex === index
                    ? {
                          ...image,
                          image_url: normalizedValue,
                      }
                    : image,
            ),
        }));
    };

    const addTiktokEmbed = () => {
        if (form.tiktok_embeds.length >= 10) {
            return;
        }

        clearErrorPrefix('tiktok_embeds');

        setForm((previous) => ({
            ...previous,
            tiktok_embeds: [
                ...previous.tiktok_embeds,
                {
                    name: '',
                    embed_url: '',
                    url_video: '',
                },
            ],
        }));
    };

    const removeTiktokEmbed = (index: number) => {
        clearErrorPrefix('tiktok_embeds');

        setForm((previous) => ({
            ...previous,
            tiktok_embeds: previous.tiktok_embeds.filter((_, embedIndex) => embedIndex !== index),
        }));
    };

    const updateTiktokEmbed = (index: number, field: 'name' | 'embed_url' | 'url_video', value: string) => {
        if (field === 'embed_url' || field === 'url_video') {
            clearFieldError(`tiktok_embeds.${index}.url_video`);
            clearFieldError(`tiktok_embeds.${index}.embed_url`);
        } else {
            clearFieldError(`tiktok_embeds.${index}.${field}`);
        }

        let finalValue = value;
        if (field === 'embed_url' || field === 'url_video') {
            finalValue = cleanTikTokUrl(value);
        }

        setForm((previous) => ({
            ...previous,
            tiktok_embeds: previous.tiktok_embeds.map((embed, embedIndex) =>
                embedIndex === index
                    ? {
                          ...embed,
                          [field]: finalValue,
                          ...(field === 'embed_url' || field === 'url_video'
                              ? {
                                    embed_url: finalValue,
                                    url_video: finalValue,
                                }
                              : {}),
                      }
                    : embed,
            ),
        }));
    };

    const addInstagramEmbed = () => {
        if (form.instagram_embeds.length >= 10) {
            return;
        }

        clearErrorPrefix('instagram_embeds');

        setForm((previous) => ({
            ...previous,
            instagram_embeds: [
                ...previous.instagram_embeds,
                {
                    name: '',
                    url: '',
                    thumbnail_url: '',
                    title: '',
                    description: '',
                    embed_html: '',
                },
            ],
        }));
    };

    const removeInstagramEmbed = (index: number) => {
        clearErrorPrefix('instagram_embeds');

        setForm((previous) => ({
            ...previous,
            instagram_embeds: previous.instagram_embeds.filter((_, embedIndex) => embedIndex !== index),
        }));
    };

    const updateInstagramEmbed = (index: number, field: keyof InstagramEmbed, value: string) => {
        clearFieldError(`instagram_embeds.${index}.${field}`);

        const finalValue = field === 'url' ? cleanInstagramUrl(value) : value;

        setForm((previous) => ({
            ...previous,
            instagram_embeds: previous.instagram_embeds.map((embed, embedIndex) =>
                embedIndex === index
                    ? {
                          ...embed,
                          [field]: finalValue,
                      }
                    : embed,
            ),
        }));
    };

    // Ambil metadata (thumbnail, judul, deskripsi) dari embed HTML yang di-generate
    // di https://microlink.io/tools/embed-url/instagram, lalu isi ke field terkait.
    const parseInstagramEmbedHtml = (raw: string): { url: string; thumbnail_url: string; title: string; description: string } | null => {
        const value = (raw || '').trim();

        if (value === '') {
            return null;
        }

        // Kalau admin hanya menempel URL (tanpa HTML), pakai URL-nya langsung.
        if (!/[<>]/.test(value)) {
            return {
                url: cleanInstagramUrl(value),
                thumbnail_url: '',
                title: '',
                description: '',
            };
        }

        const doc = new DOMParser().parseFromString(value, 'text/html');
        const anchor = doc.querySelector('a[href*="instagram.com"]') ?? doc.querySelector('a');

        if (!anchor) {
            return null;
        }

        const href = anchor.getAttribute('href') ?? '';

        // Thumbnail = <img> pertama yang bukan logo (logo memakai path /rsrc.php/).
        const images = Array.from(anchor.querySelectorAll('img'));
        const thumbnail = images.find((img) => !/\/rsrc\.php\//i.test(img.getAttribute('src') ?? '')) ?? images[0];
        const thumbnailUrl = (thumbnail?.getAttribute('src') ?? '').trim();

        // Judul & deskripsi dikenali dari inline font-size yang dipakai Microlink.
        const divs = Array.from(anchor.querySelectorAll('div'));
        const titleEl = divs.find((div) => /font-size:\s*16px/i.test(div.getAttribute('style') ?? ''));
        const descriptionEl = divs.find((div) => /font-size:\s*13px/i.test(div.getAttribute('style') ?? ''));

        return {
            url: cleanInstagramUrl(href),
            thumbnail_url: thumbnailUrl,
            title: (titleEl?.textContent ?? '').trim(),
            description: (descriptionEl?.textContent ?? '').trim(),
        };
    };

    const applyInstagramEmbedHtml = (index: number, raw: string) => {
        clearErrorPrefix('instagram_embeds');

        const parsed = parseInstagramEmbedHtml(raw);

        setForm((previous) => ({
            ...previous,
            instagram_embeds: previous.instagram_embeds.map((embed, embedIndex) => {
                if (embedIndex !== index) {
                    return embed;
                }

                if (!parsed) {
                    return { ...embed, embed_html: raw };
                }

                return {
                    ...embed,
                    embed_html: raw,
                    url: parsed.url || embed.url,
                    thumbnail_url: parsed.thumbnail_url || embed.thumbnail_url,
                    title: parsed.title || embed.title,
                    description: parsed.description || embed.description,
                };
            }),
        }));
    };

    const addNewsLink = () => {
        if (form.news_links.length >= 10) {
            return;
        }

        clearErrorPrefix('news_links');

        setForm((previous) => ({
            ...previous,
            news_links: [
                ...previous.news_links,
                {
                    title: '',
                    url: '',
                },
            ],
        }));
    };

    const removeNewsLink = (index: number) => {
        clearErrorPrefix('news_links');

        setForm((previous) => ({
            ...previous,
            news_links: previous.news_links.filter((_, linkIndex) => linkIndex !== index),
        }));
    };

    const updateNewsLink = (index: number, field: keyof NewsLink, value: string) => {
        clearFieldError(`news_links.${index}.${field}`);

        setForm((previous) => ({
            ...previous,
            news_links: previous.news_links.map((link, linkIndex) =>
                linkIndex === index
                    ? {
                          ...link,
                          [field]: value,
                      }
                    : link,
            ),
        }));
    };

    const addAffiliateLink = () => {
        clearErrorPrefix('affiliate_links');

        setForm((previous) => ({
            ...previous,
            affiliate_links: [
                ...previous.affiliate_links,
                {
                    affiliate_store_id: '',
                    store_name: 'Official Store',
                    location: 'Indonesia',
                    url: '',
                },
            ],
        }));
    };

    const removeAffiliateLink = (index: number) => {
        clearErrorPrefix('affiliate_links');

        setForm((previous) => ({
            ...previous,
            affiliate_links: previous.affiliate_links.filter((_, linkIndex) => linkIndex !== index),
        }));
    };

    const updateAffiliateLink = (index: number, field: keyof AffiliateLink, value: string) => {
        clearFieldError(`affiliate_links.${index}.${field}`);

        setForm((previous) => ({
            ...previous,
            affiliate_links: previous.affiliate_links.map((link, linkIndex) =>
                linkIndex === index
                    ? {
                          ...link,
                          [field]: value,
                      }
                    : link,
            ),
        }));
    };

    const addVideoLink = () => {
        if (form.video_links.length >= 20) {
            return;
        }

        clearErrorPrefix('video_links');

        setForm((previous) => ({
            ...previous,
            video_links: [
                ...previous.video_links,
                {
                    platform_name: '',
                    title: '',
                    access_type: 'free',
                    url: '',
                },
            ],
        }));
    };

    const removeVideoLink = (index: number) => {
        clearErrorPrefix('video_links');

        setForm((previous) => ({
            ...previous,
            video_links: previous.video_links.filter((_, videoIndex) => videoIndex !== index),
        }));
    };

    const updateVideoLink = (index: number, field: keyof VideoLink, value: string) => {
        clearFieldError(`video_links.${index}.${field}`);

        setForm((previous) => ({
            ...previous,
            video_links: previous.video_links.map((video, videoIndex) =>
                videoIndex === index
                    ? {
                          ...video,
                          [field]: value,
                      }
                    : video,
            ),
        }));
    };

    const submitIntent = useRef<'draft' | 'published'>('published');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const publicationStatus = submitIntent.current;
        const formToValidate: BookFormData = {
            ...form,
            publication_status: publicationStatus,
        };
        const nextErrors = validateBook(formToValidate, volumesBySeries);
        setClearedFields(new Set());
        setLocalErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        const imagesPayload: ImageItem[] = [];
        const imageMap: number[] = [];

        form.images.forEach((image, index) => {
            const imageUrl = normalizeImageKitUrl(image.image_url);

            if (imageUrl !== '') {
                imagesPayload.push({
                    ...image,
                    image_url: imageUrl,
                });
                imageMap.push(index);
            }
        });

        const tiktokPayload: TiktokEmbed[] = [];
        const tiktokMap: number[] = [];

        form.tiktok_embeds.forEach((embed, index) => {
            const url = (embed.embed_url || embed.url_video || '').trim();

            if (url !== '') {
                tiktokPayload.push({
                    ...embed,
                    embed_url: url,
                    url_video: url,
                });
                tiktokMap.push(index);
            }
        });

        const affiliatePayload: AffiliateLink[] = [];
        const affiliateMap: number[] = [];

        form.affiliate_links.forEach((link, index) => {
            const url = link.url.trim();

            if (link.affiliate_store_id !== '' || url !== '') {
                affiliatePayload.push({
                    ...link,
                    url,
                });
                affiliateMap.push(index);
            }
        });

        const instagramPayload: InstagramEmbed[] = [];
        const instagramMap: number[] = [];

        form.instagram_embeds.forEach((embed, index) => {
            const url = (embed.url || '').trim();

            if (url !== '') {
                // embed_html sengaja tidak dikirim: hanya dipakai untuk parsing di form.
                instagramPayload.push({
                    id: embed.id,
                    name: embed.name,
                    url,
                    thumbnail_url: embed.thumbnail_url,
                    title: embed.title,
                    description: embed.description,
                });
                instagramMap.push(index);
            }
        });

        const newsLinksPayload: NewsLink[] = [];
        const newsLinksMap: number[] = [];

        form.news_links.forEach((link, index) => {
            const url = (link.url || '').trim();

            if (url !== '') {
                newsLinksPayload.push({
                    id: link.id,
                    title: link.title,
                    url,
                });
                newsLinksMap.push(index);
            }
        });

        const videoPayload: VideoLink[] = [];
        const videoMap: number[] = [];

        form.video_links.forEach((video, index) => {
            const platform = video.platform_name.trim();
            const url = video.url.trim();

            if (hasVideoLinkContent(video)) {
                videoPayload.push({
                    ...video,
                    platform_name: platform,
                    title: video.title?.trim() ?? '',
                    url,
                });
                videoMap.push(index);
            }
        });

        setSubmissionMaps({
            images: imageMap,
            tiktok_embeds: tiktokMap,
            instagram_embeds: instagramMap,
            news_links: newsLinksMap,
            affiliate_links: affiliateMap,
            video_links: videoMap,
        });
        setLocalErrors({});

        onSubmit({
            ...form,
            publication_status: publicationStatus,
            images: imagesPayload,
            tiktok_embeds: tiktokPayload,
            instagram_embeds: instagramPayload,
            news_links: newsLinksPayload,
            affiliate_links: affiliatePayload,
            video_links: videoPayload,
        });
    };

    useEffect(() => {
        if (errorCount === 0) {
            return;
        }

        const timer = window.setTimeout(() => {
            const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');

            if (firstInvalid) {
                firstInvalid.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
                firstInvalid.focus({ preventScroll: true });
            } else {
                errorSummaryRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 80);

        return () => window.clearTimeout(timer);
    }, [activeErrors, errorCount]);

    const authorOptions = useMemo(
        () =>
            authors.map((author) => ({
                value: String(author.id),
                label: author.name ?? String(author.id),
            })),
        [authors],
    );

    const genreOptions = useMemo(
        () =>
            genres.map((genre) => ({
                value: String(genre.id),
                label: genre.name ?? String(genre.id),
            })),
        [genres],
    );

    const sectionProps = { activeErrors, getFieldProps };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            {mode === 'edit' && (
                <div>
                    {form.publication_status === 'draft' ? (
                        <span className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                            Draf — belum tampil di situs publik
                        </span>
                    ) : (
                        <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                            Terbit
                        </span>
                    )}
                </div>
            )}
            {errorCount > 0 && (
                <Alert ref={errorSummaryRef} variant="destructive">
                    <AlertTitle>Terdapat {errorCount} kesalahan pada formulir</AlertTitle>
                    <AlertDescription>Periksa kembali kolom yang ditandai merah sebelum menyimpan.</AlertDescription>
                </Alert>
            )}

            {/* INFORMASI BUKU */}
            <BookBasicInfo
                {...sectionProps}
                form={form}
                mode={mode}
                book={book}
                series={series}
                seriesMode={seriesMode}
                selectedSeries={selectedSeries}
                editions={editions}
                storyStatuses={storyStatuses}
                publishers={publishers}
                bookTypes={bookTypes}
                ageRatings={ageRatings}
                displayedSlug={displayedSlug}
                hasSlugInput={hasSlugInput}
                updateField={updateField}
                clearFieldError={clearFieldError}
            />

            {/* SPESIFIKASI & ADAPTASI BUKU */}
            <BookMetadataForm {...sectionProps} form={form} updateField={updateField} />

            {/* AUTHORS & GENRES */}
            <BookAuthorsGenresSection
                {...sectionProps}
                form={form}
                authors={authors}
                genres={genres}
                authorOptions={authorOptions}
                genreOptions={genreOptions}
                updateField={updateField}
            />

            {/* IMAGES */}
            <BookImagesSection {...sectionProps} form={form} addImage={addImage} removeImage={removeImage} updateImage={updateImage} />

            {/* DESKRIPSI & EMBED */}
            <BookDescriptionMediaSection
                {...sectionProps}
                form={form}
                updateField={updateField}
                addNewsLink={addNewsLink}
                removeNewsLink={removeNewsLink}
                updateNewsLink={updateNewsLink}
                addTiktokEmbed={addTiktokEmbed}
                removeTiktokEmbed={removeTiktokEmbed}
                updateTiktokEmbed={updateTiktokEmbed}
                addInstagramEmbed={addInstagramEmbed}
                removeInstagramEmbed={removeInstagramEmbed}
                updateInstagramEmbed={updateInstagramEmbed}
                applyInstagramEmbedHtml={applyInstagramEmbedHtml}
            />

            {/* AFFILIATE */}
            <AffiliateLinksSection
                {...sectionProps}
                form={form}
                affiliateStores={affiliateStores}
                addAffiliateLink={addAffiliateLink}
                removeAffiliateLink={removeAffiliateLink}
                updateAffiliateLink={updateAffiliateLink}
            />

            {/* VIDEO LINKS */}
            <VideoLinksSection
                {...sectionProps}
                form={form}
                videoAccessTypes={videoAccessTypes}
                addVideoLink={addVideoLink}
                removeVideoLink={removeVideoLink}
                updateVideoLink={updateVideoLink}
            />

            {/* SUBMIT */}
            <div className="flex items-center justify-end gap-3">
                <Button type="button" variant="outline" disabled={processing} onClick={() => router.visit(route('admin.books.index'))}>
                    Batal
                </Button>

                <Button
                    type="submit"
                    variant="outline"
                    disabled={processing}
                    onClick={() => {
                        submitIntent.current = 'draft';
                    }}
                >
                    {processing ? 'Menyimpan...' : 'Simpan sebagai draf'}
                </Button>

                <Button
                    type="submit"
                    disabled={processing}
                    onClick={() => {
                        submitIntent.current = 'published';
                    }}
                >
                    {processing ? 'Menyimpan...' : mode === 'edit' && form.publication_status === 'published' ? 'Simpan & tetap terbit' : 'Terbitkan'}
                </Button>
            </div>
        </form>
    );
}
