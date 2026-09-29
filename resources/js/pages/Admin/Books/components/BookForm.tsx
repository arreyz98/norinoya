import { router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectList,
    MultiSelectSearch,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

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

export interface TiktokEmbed {
    id?: number;
    name: string;
    embed_url: string;
    url_video: string;
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
    short_description: string;
    news_link: string;
    msrp: string;

    isbn: string;
    page_count: string;
    paper_type: string;
    dimensions: string;
    adaptation: string;
    is_upcoming: boolean;

    images: ImageItem[];
    tiktok_embeds: TiktokEmbed[];

    story_authors: string[];
    art_authors: string[];
    genres: string[];

    affiliate_links: AffiliateLink[];
}

type ValidationErrors = Record<string, string>;

interface SubmissionMaps {
    images: number[];
    tiktok_embeds: number[];
    affiliate_links: number[];
}

const isValidUrl = (value: string): boolean => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
};

// Previews the slug the backend will generate from title + volume
// (`Str::slug($title . '-volume-' . $volume)`).
const buildSlugPreview = (title: string, volume: string): string => {
    return `${title}-volume-${volume}`
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-{2,}/g, '-')
        .replace(/^-+|-+$/g, '');
};

const validateBook = (form: BookFormData, existingVolumes: string[]): ValidationErrors => {
    const nextErrors: ValidationErrors = {};

    if (!form.title.trim()) {
        nextErrors.title = 'Judul buku wajib diisi.';
    }

    if (!form.volume.trim()) {
        nextErrors.volume = 'Volume wajib diisi.';
    } else if (form.volume.trim().length > 50) {
        nextErrors.volume = 'Volume maksimal 50 karakter.';
    } else if (existingVolumes.includes(form.volume.trim())) {
        nextErrors.volume = 'Volume ini sudah ada dalam series yang sama.';
    }

    if (!form.edition_id) {
        nextErrors.edition_id = 'Edisi cetakan wajib dipilih.';
    }

    if (!form.book_type) {
        nextErrors.book_type = 'Tipe buku wajib dipilih.';
    }

    if (!form.story_status_id) {
        nextErrors.story_status_id = 'Status cerita wajib dipilih.';
    }

    if (!form.age_rating) {
        nextErrors.age_rating = 'Rating umur wajib dipilih.';
    }

    if (!form.publisher_id) {
        nextErrors.publisher_id = 'Penerbit wajib dipilih.';
    }

    if (!form.synopsis.trim()) {
        nextErrors.synopsis = 'Sinopsis wajib diisi.';
    }

    if (!form.msrp.trim()) {
        nextErrors.msrp = 'Harga MSRP wajib diisi.';
    } else if (!Number.isFinite(Number(form.msrp)) || Number(form.msrp) < 0) {
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

    return nextErrors;
};

const normalizeServerErrors = (serverErrors: ValidationErrors, maps: SubmissionMaps): ValidationErrors => {
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

        const affiliateMatch = key.match(/^affiliate_links\.(\d+)\.([\w.]+)$/);

        if (affiliateMatch) {
            const payloadIndex = Number(affiliateMatch[1]);
            const formIndex = maps.affiliate_links[payloadIndex] ?? payloadIndex;
            normalized[`affiliate_links.${formIndex}.${affiliateMatch[2]}`] = message;
            continue;
        }

        normalized[key] = message;
    }

    return normalized;
};

function FieldError({ field, errors }: { field: string; errors: ValidationErrors }) {
    const message = errors[field];

    if (!message) {
        return null;
    }

    return (
        <p id={`${field}-error`} className="text-destructive text-sm">
            {message}
        </p>
    );
}

interface BookFormProps {
    mode: 'create' | 'edit';
    existingVolumes: string[];

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
        short_description?: string | null;
        news_link?: string | null;
        msrp?: number | string | null;
        isbn?: string | null;
        page_count?: number | string | null;
        paper_type?: string | null;
        dimensions?: string | null;
        adaptation?: string | null;
        is_upcoming?: boolean | null;
        images?: { id?: number; image_url: string; sort_order?: number }[];
        tiktok_embeds?: { id?: number; name?: string; embed_url?: string; url_video?: string; sort_order?: number }[];
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
    };

    series: Option[];
    editions: Option[];
    storyStatuses: Option[];
    publishers: Option[];
    authors: Option[];
    genres: Option[];
    affiliateStores: Option[];

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
    bookTypes,
    ageRatings,
    existingVolumes,
    processing,
    errors,
    onSubmit,
}: BookFormProps) {
    const [localErrors, setLocalErrors] = useState<ValidationErrors>({});
    const [clearedFields, setClearedFields] = useState<Set<string>>(new Set());
    const [submissionMaps, setSubmissionMaps] = useState<SubmissionMaps>({
        images: [],
        tiktok_embeds: [],
        affiliate_links: [],
    });

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

    const REQUIRED_FIELDS = new Set([
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

    const getFieldProps = (field: string, alternateFields: string[] = [], baseClassName?: string) => {
        const errorFields = [field, ...alternateFields].filter((candidate) => Boolean(activeErrors[candidate]));
        const hasError = errorFields.length > 0;

        const isRequired = REQUIRED_FIELDS.has(field) || alternateFields.some((candidate) => REQUIRED_FIELDS.has(candidate));

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
        short_description: book?.short_description ?? '',
        news_link: book?.news_link ?? '',
        msrp: book?.msrp !== undefined && book?.msrp !== null ? String(book.msrp) : '',

        isbn: book?.isbn ?? '',
        page_count: book?.page_count !== undefined && book?.page_count !== null ? String(book.page_count) : '',
        paper_type: book?.paper_type ?? '',
        dimensions: book?.dimensions ?? '',
        adaptation: book?.adaptation ?? '',
        is_upcoming: Boolean(book?.is_upcoming),

        images: book?.images?.map((image) => ({
            id: image.id,
            image_url: image.image_url,
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
    });

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

        setForm((previous) => ({
            ...previous,
            images: previous.images.map((image, imageIndex) =>
                imageIndex === index
                    ? {
                          ...image,
                          image_url: value,
                      }
                    : image,
            ),
        }));
    };

    const cleanTikTokUrl = (url: string): string => {
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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validateBook(form, existingVolumes);
        setClearedFields(new Set());
        setLocalErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        const imagesPayload: ImageItem[] = [];
        const imageMap: number[] = [];

        form.images.forEach((image, index) => {
            const imageUrl = image.image_url.trim();

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

        setSubmissionMaps({
            images: imageMap,
            tiktok_embeds: tiktokMap,
            affiliate_links: affiliateMap,
        });
        setLocalErrors({});

        onSubmit({
            ...form,
            images: imagesPayload,
            tiktok_embeds: tiktokPayload,
            affiliate_links: affiliatePayload,
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

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errorCount > 0 && (
                <Alert ref={errorSummaryRef} variant="destructive">
                    <AlertTitle>Terdapat {errorCount} kesalahan pada formulir</AlertTitle>
                    <AlertDescription>Periksa kembali kolom yang ditandai merah sebelum menyimpan.</AlertDescription>
                </Alert>
            )}

            {/* ================================= */}
            {/* INFORMASI BUKU */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>Informasi Buku</CardTitle>

                    <CardDescription>Informasi utama mengenai buku.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Judul */}
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Judul Buku{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Input
                            id="title"
                            {...getFieldProps('title')}
                            value={form.title}
                            onChange={(event) => updateField('title', event.target.value)}
                            placeholder="Masukkan judul buku"
                        />

                        <FieldError field="title" errors={activeErrors} />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Series */}
                        <div className="space-y-2">
                            <Label>Series</Label>

                            <Select
                                value={form.series_id || 'none'}
                                onValueChange={(value) => updateField('series_id', value === 'none' ? '' : value)}
                            >
                                <SelectTrigger {...getFieldProps('series_id')}>
                                    <SelectValue placeholder="Pilih series" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="none">Tidak ada</SelectItem>

                                    {series.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.title || item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FieldError field="series_id" errors={activeErrors} />
                        </div>

                        {/* Volume */}
                        <div className="space-y-2">
                            <Label htmlFor="volume">
                                Volume{' '}
                                <span aria-hidden="true" className="text-destructive">
                                    *
                                </span>
                            </Label>

                            <Input
                                id="volume"
                                {...getFieldProps('volume')}
                                type="text"
                                value={form.volume}
                                onChange={(event) => updateField('volume', event.target.value)}
                                placeholder="Contoh: 1, 16.5, Limited Edition"
                            />

                            <FieldError field="volume" errors={activeErrors} />

                            <p className="text-muted-foreground text-xs">
                                Volume tidak boleh sama dalam series yang sama. Boleh berupa angka (mis. 1, 16.5) atau teks (mis. Limited Edition).
                            </p>
                        </div>
                    </div>

                    {/* Slug preview: slug ikut berubah saat judul/volume diubah */}
                    <div className="rounded-lg border border-dashed bg-neutral-50/60 p-3.5 dark:bg-neutral-900/40">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">Slug URL</span>

                            {mode === 'edit' && book?.slug && (
                                <span className="text-muted-foreground max-w-full truncate font-mono text-[11px]">Sebelumnya: {book.slug}</span>
                            )}
                        </div>

                        <p className="mt-1 truncate font-mono text-sm">/buku/{buildSlugPreview(form.title, form.volume) || '…'}</p>

                        <p className="text-muted-foreground mt-1 text-xs">
                            Slug dibentuk dari judul dan volume, lalu diperbarui otomatis saat formulir disimpan sehingga URL selalu mengikuti judul
                            terbaru.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Edition */}
                        <div className="space-y-2">
                            <Label>
                                Edisi Cetakan{' '}
                                <span aria-hidden="true" className="text-destructive">
                                    *
                                </span>
                            </Label>

                            <Select value={form.edition_id} onValueChange={(value) => updateField('edition_id', value)}>
                                <SelectTrigger {...getFieldProps('edition_id')}>
                                    <SelectValue placeholder="Pilih edisi" />
                                </SelectTrigger>

                                <SelectContent>
                                    {editions.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FieldError field="edition_id" errors={activeErrors} />
                        </div>

                        {/* Book Type */}
                        <div className="space-y-2">
                            <Label>
                                Tipe Buku{' '}
                                <span aria-hidden="true" className="text-destructive">
                                    *
                                </span>
                            </Label>

                            <Select value={form.book_type} onValueChange={(value) => updateField('book_type', value)}>
                                <SelectTrigger {...getFieldProps('book_type')}>
                                    <SelectValue placeholder="Pilih tipe buku" />
                                </SelectTrigger>

                                <SelectContent>
                                    {(bookTypes && bookTypes.length > 0
                                        ? bookTypes
                                        : [
                                              // Nilai (bukan sekadar label) harus sama persis dengan backing value
                                              // App\Enums\BookType, karena kolom book_type di-cast ke enum tersebut.
                                              { value: 'Manga', label: 'Manga' },
                                              { value: 'Komik', label: 'Komik' },
                                              { value: 'Light Novel', label: 'Light Novel' },
                                              { value: 'Novel', label: 'Novel' },
                                              { value: 'Komik Lokal', label: 'Komik Lokal' },
                                              { value: 'J Lit', label: 'J Lit' },
                                          ]
                                    ).map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FieldError field="book_type" errors={activeErrors} />
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {/* Story Status */}
                        <div className="space-y-2">
                            <Label>
                                Status Cerita{' '}
                                <span aria-hidden="true" className="text-destructive">
                                    *
                                </span>
                            </Label>

                            <Select value={form.story_status_id} onValueChange={(value) => updateField('story_status_id', value)}>
                                <SelectTrigger {...getFieldProps('story_status_id')}>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>

                                <SelectContent>
                                    {storyStatuses.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FieldError field="story_status_id" errors={activeErrors} />
                        </div>

                        {/* Age Rating */}
                        <div className="space-y-2">
                            <Label>
                                Rating Umur{' '}
                                <span aria-hidden="true" className="text-destructive">
                                    *
                                </span>
                            </Label>

                            <Select value={form.age_rating} onValueChange={(value) => updateField('age_rating', value)}>
                                <SelectTrigger {...getFieldProps('age_rating')}>
                                    <SelectValue placeholder="Pilih rating umur" />
                                </SelectTrigger>

                                <SelectContent>
                                    {ageRatings.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FieldError field="age_rating" errors={activeErrors} />
                        </div>

                        {/* Publisher */}
                        <div className="space-y-2">
                            <Label>
                                Penerbit{' '}
                                <span aria-hidden="true" className="text-destructive">
                                    *
                                </span>
                            </Label>

                            <Select value={form.publisher_id} onValueChange={(value) => updateField('publisher_id', value)}>
                                <SelectTrigger {...getFieldProps('publisher_id')}>
                                    <SelectValue placeholder="Pilih penerbit" />
                                </SelectTrigger>

                                <SelectContent>
                                    {publishers.map((item) => (
                                        <SelectItem key={item.id} value={String(item.id)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FieldError field="publisher_id" errors={activeErrors} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* SPESIFIKASI & ADAPTASI BUKU */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>Spesifikasi &amp; Adaptasi Buku</CardTitle>

                    <CardDescription>Detail fisik buku seperti ISBN, jumlah halaman, jenis kertas, ukuran, dan info adaptasi.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* ISBN */}
                        <div className="space-y-2">
                            <Label htmlFor="isbn">ISBN</Label>

                            <Input
                                id="isbn"
                                {...getFieldProps('isbn')}
                                value={form.isbn}
                                onChange={(event) => updateField('isbn', event.target.value)}
                                placeholder="Contoh: 978-623-87-002-6"
                            />

                            <FieldError field="isbn" errors={activeErrors} />
                        </div>

                        {/* Jumlah Halaman */}
                        <div className="space-y-2">
                            <Label htmlFor="page_count">Jumlah Halaman</Label>

                            <Input
                                id="page_count"
                                {...getFieldProps('page_count')}
                                type="number"
                                min="1"
                                value={form.page_count}
                                onChange={(event) => updateField('page_count', event.target.value)}
                                placeholder="Contoh: 208"
                            />

                            <FieldError field="page_count" errors={activeErrors} />
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Jenis Kertas */}
                        <div className="space-y-2">
                            <Label htmlFor="paper_type">Jenis Kertas</Label>

                            <Input
                                id="paper_type"
                                {...getFieldProps('paper_type')}
                                value={form.paper_type}
                                onChange={(event) => updateField('paper_type', event.target.value)}
                                placeholder="Contoh: Bookpaper 55g"
                            />

                            <FieldError field="paper_type" errors={activeErrors} />
                        </div>

                        {/* Ukuran Buku / Dimensions */}
                        <div className="space-y-2">
                            <Label htmlFor="dimensions">Ukuran Buku (Dimensi)</Label>

                            <Input
                                id="dimensions"
                                {...getFieldProps('dimensions')}
                                value={form.dimensions}
                                onChange={(event) => updateField('dimensions', event.target.value)}
                                placeholder="Contoh: 13 x 18 cm"
                            />

                            <FieldError field="dimensions" errors={activeErrors} />
                        </div>
                    </div>

                    {/* Adaptasi */}
                    <div className="space-y-2">
                        <Label>Adaptasi Media</Label>

                        <Select value={form.adaptation || 'all'} onValueChange={(value) => updateField('adaptation', value === 'all' ? '' : value)}>
                            <SelectTrigger {...getFieldProps('adaptation')}>
                                <SelectValue placeholder="Pilih adaptasi" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">Semua Adaptasi</SelectItem>
                                <SelectItem value="anime">Anime</SelectItem>
                                <SelectItem value="live_action">Live Action</SelectItem>
                                <SelectItem value="manga">Manga</SelectItem>
                            </SelectContent>
                        </Select>

                        <FieldError field="adaptation" errors={activeErrors} />
                    </div>

                    {/* Checkbox / Toggle Item Segera Rilis */}
                    <div className="border-border/60 border-t pt-3">
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-neutral-50/50 p-3.5 transition-colors hover:bg-neutral-50 dark:bg-neutral-900/50 dark:hover:bg-neutral-900">
                            <input
                                type="checkbox"
                                checked={form.is_upcoming}
                                onChange={(e) => updateField('is_upcoming', e.target.checked)}
                                className="text-primary focus:ring-primary mt-0.5 h-4 w-4 rounded"
                            />
                            <div className="space-y-0.5">
                                <span className="text-foreground flex items-center gap-1.5 text-sm font-semibold">
                                    <span>Tampilkan di Section "Item Segera Rilis"</span>
                                    <span className="rounded bg-orange-100 px-2 py-0.5 font-mono text-[10px] font-bold text-orange-700 uppercase dark:bg-orange-950 dark:text-orange-300">
                                        Highlight User
                                    </span>
                                </span>
                                <p className="text-muted-foreground text-xs">
                                    Jika dicentang, buku ini akan dimunculkan pada banner khusus "ITEM SEGERA RILIS" di bagian atas halaman katalog
                                    user.
                                </p>
                            </div>
                        </label>
                    </div>
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* AUTHORS & GENRES */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>Author & Genre</CardTitle>

                    <CardDescription>Pilih author cerita, author gambar, dan genre buku.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Story Author */}
                        <div className="space-y-2">
                            <Label>Author Story</Label>

                            <MultiSelect
                                values={form.story_authors}
                                options={authorOptions}
                                onValuesChange={(values: string[]) => updateField('story_authors', values)}
                            >
                                <MultiSelectTrigger {...getFieldProps('story_authors', [], 'w-full')}>
                                    <MultiSelectValue placeholder="Pilih author story" />
                                </MultiSelectTrigger>

                                <MultiSelectContent>
                                    <MultiSelectSearch placeholder="Cari author..." />

                                    <MultiSelectList>
                                        <MultiSelectGroup>
                                            {authors.map((author) => (
                                                <MultiSelectItem key={author.id} value={String(author.id)}>
                                                    {author.name}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectGroup>
                                    </MultiSelectList>
                                </MultiSelectContent>
                            </MultiSelect>

                            <FieldError field="story_authors" errors={activeErrors} />
                        </div>

                        {/* Art Author */}
                        <div className="space-y-2">
                            <Label>Author Art</Label>

                            <MultiSelect
                                values={form.art_authors}
                                options={authorOptions}
                                onValuesChange={(values: string[]) => updateField('art_authors', values)}
                            >
                                <MultiSelectTrigger {...getFieldProps('art_authors', [], 'w-full')}>
                                    <MultiSelectValue placeholder="Pilih author art" />
                                </MultiSelectTrigger>

                                <MultiSelectContent>
                                    <MultiSelectSearch placeholder="Cari author..." />

                                    <MultiSelectList>
                                        <MultiSelectGroup>
                                            {authors.map((author) => (
                                                <MultiSelectItem key={author.id} value={String(author.id)}>
                                                    {author.name}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectGroup>
                                    </MultiSelectList>
                                </MultiSelectContent>
                            </MultiSelect>

                            <FieldError field="art_authors" errors={activeErrors} />
                        </div>
                    </div>

                    {/* Genre */}
                    <div className="space-y-2">
                        <Label>Genre</Label>

                        <MultiSelect values={form.genres} options={genreOptions} onValuesChange={(values: string[]) => updateField('genres', values)}>
                            <MultiSelectTrigger {...getFieldProps('genres', [], 'w-full')}>
                                <MultiSelectValue placeholder="Pilih genre" />
                            </MultiSelectTrigger>

                            <MultiSelectContent>
                                <MultiSelectSearch placeholder="Cari genre..." />

                                <MultiSelectList>
                                    <MultiSelectGroup>
                                        {genres.map((genre) => (
                                            <MultiSelectItem key={genre.id} value={String(genre.id)}>
                                                {genre.name}
                                            </MultiSelectItem>
                                        ))}
                                    </MultiSelectGroup>
                                </MultiSelectList>
                            </MultiSelectContent>
                        </MultiSelect>

                        <FieldError field="genres" errors={activeErrors} />
                    </div>
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* IMAGES */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>Gambar Buku</CardTitle>

                    <CardDescription>Masukkan maksimal 5 URL gambar untuk buku.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {form.images.map((image, index) => (
                        <div key={index} className="flex gap-3">
                            <div className="flex-1 space-y-2">
                                <Label>Gambar {index + 1}</Label>

                                <Input
                                    {...getFieldProps(`images.${index}.image_url`)}
                                    value={image.image_url}
                                    onChange={(event) => updateImage(index, event.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />

                                <FieldError field={`images.${index}.image_url`} errors={activeErrors} />

                                {image.image_url && (
                                    <div className="mt-3 flex items-center gap-4">
                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
                                            <img
                                                src={image.image_url}
                                                alt={`Preview gambar ${index + 1}`}
                                                className="block h-full w-full object-cover"
                                                onError={(event) => {
                                                    (event.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <span className="text-muted-foreground text-xs">Preview gambar</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-end">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    disabled={form.images.length === 1}
                                    onClick={() => removeImage(index)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addImage} disabled={form.images.length >= 5}>
                        <Plus className="mr-2 size-4" />
                        Tambah Gambar
                    </Button>

                    <p className="text-muted-foreground text-xs">{form.images.length}/5 gambar digunakan.</p>

                    <FieldError field="images" errors={activeErrors} />
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* DESKRIPSI & EMBED */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>Deskripsi & Media</CardTitle>

                    <CardDescription>Informasi deskripsi dan embed media tambahan buku.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Synopsis */}
                    <div className="space-y-2">
                        <Label htmlFor="synopsis">
                            Sinopsis{' '}
                            <span aria-hidden="true" className="text-destructive">
                                *
                            </span>
                        </Label>

                        <Textarea
                            id="synopsis"
                            {...getFieldProps('synopsis')}
                            value={form.synopsis}
                            onChange={(event) => updateField('synopsis', event.target.value)}
                            placeholder="Masukkan sinopsis buku"
                            rows={6}
                        />

                        <FieldError field="synopsis" errors={activeErrors} />
                    </div>

                    {/* Short Description */}
                    <div className="space-y-2">
                        <Label htmlFor="short_description">Deskripsi Singkat</Label>

                        <Textarea
                            id="short_description"
                            {...getFieldProps('short_description')}
                            value={form.short_description}
                            onChange={(event) => updateField('short_description', event.target.value)}
                            placeholder="Deskripsi singkat buku"
                            rows={3}
                        />

                        <FieldError field="short_description" errors={activeErrors} />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* News */}
                        <div className="space-y-2">
                            <Label htmlFor="news_link">Link Berita</Label>

                            <Input
                                id="news_link"
                                {...getFieldProps('news_link')}
                                type="url"
                                value={form.news_link}
                                onChange={(event) => updateField('news_link', event.target.value)}
                                placeholder="https://..."
                            />

                            <FieldError field="news_link" errors={activeErrors} />
                        </div>

                        {/* MSRP */}
                        <div className="space-y-2">
                            <Label htmlFor="msrp">
                                Harga MSRP{' '}
                                <span aria-hidden="true" className="text-destructive">
                                    *
                                </span>
                            </Label>

                            <Input
                                id="msrp"
                                {...getFieldProps('msrp')}
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.msrp}
                                onChange={(event) => updateField('msrp', event.target.value)}
                                placeholder="Contoh: 45000"
                            />

                            <FieldError field="msrp" errors={activeErrors} />
                        </div>
                    </div>

                    {/* TikTok Embeds */}
                    <div className="space-y-3 pt-2">
                        <Label>TikTok Video Links & Review</Label>
                        <CardDescription>
                            Masukkan Judul dan Link video/photo TikTok (maksimal 10 link). Link otomatis dibersihkan saat di-paste.
                        </CardDescription>

                        {form.tiktok_embeds.map((item, index) => (
                            <div key={index} className="bg-muted/20 space-y-3 rounded-lg border p-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                        Video TikTok #{index + 1}
                                    </Label>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="h-7 px-2 text-xs"
                                        onClick={() => removeTiktokEmbed(index)}
                                    >
                                        <Trash2 className="mr-1 size-3.5" />
                                        Hapus
                                    </Button>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Judul Video</Label>
                                        <Input
                                            {...getFieldProps(`tiktok_embeds.${index}.name`)}
                                            value={item.name || ''}
                                            onChange={(e) => updateTiktokEmbed(index, 'name', e.target.value)}
                                            placeholder="Contoh: Bedah Detail Kertas Jilid 1"
                                        />
                                        <FieldError field={`tiktok_embeds.${index}.name`} errors={activeErrors} />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Link TikTok</Label>
                                        <Input
                                            {...getFieldProps(`tiktok_embeds.${index}.url_video`, [`tiktok_embeds.${index}.embed_url`])}
                                            value={item.url_video || item.embed_url || ''}
                                            onChange={(e) => updateTiktokEmbed(index, 'url_video', e.target.value)}
                                            placeholder="https://www.tiktok.com/@norinoya.official/photo/..."
                                        />
                                        <FieldError field={`tiktok_embeds.${index}.url_video`} errors={activeErrors} />
                                        <FieldError field={`tiktok_embeds.${index}.embed_url`} errors={activeErrors} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button type="button" variant="outline" onClick={addTiktokEmbed} disabled={form.tiktok_embeds.length >= 10}>
                            <Plus className="mr-2 size-4" />
                            Tambah TikTok Link
                        </Button>

                        <FieldError field="tiktok_embeds" errors={activeErrors} />
                    </div>
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* AFFILIATE */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>Affiliate Links</CardTitle>

                    <CardDescription>Tambahkan link pembelian dari berbagai toko.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {form.affiliate_links.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-6 text-center">
                            <p className="text-muted-foreground text-sm">Belum ada affiliate link.</p>
                        </div>
                    ) : (
                        form.affiliate_links.map((link, index) => (
                            <div key={index} className="rounded-lg border p-4">
                                <div className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
                                    <div className="space-y-2">
                                        <Label>Toko</Label>

                                        <Select
                                            value={link.affiliate_store_id}
                                            onValueChange={(value) => updateAffiliateLink(index, 'affiliate_store_id', value)}
                                        >
                                            <SelectTrigger {...getFieldProps(`affiliate_links.${index}.affiliate_store_id`)}>
                                                <SelectValue placeholder="Pilih toko" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {affiliateStores.map((store) => (
                                                    <SelectItem key={store.id} value={String(store.id)}>
                                                        {store.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FieldError field={`affiliate_links.${index}.affiliate_store_id`} errors={activeErrors} />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Nama Toko</Label>

                                            <Input
                                                value={link.store_name || ''}
                                                onChange={(event) => updateAffiliateLink(index, 'store_name', event.target.value)}
                                                placeholder="Official Store"
                                            />

                                            <FieldError field={`affiliate_links.${index}.store_name`} errors={activeErrors} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Lokasi</Label>

                                            <Input
                                                value={link.location || ''}
                                                onChange={(event) => updateAffiliateLink(index, 'location', event.target.value)}
                                                placeholder="Indonesia"
                                            />

                                            <FieldError field={`affiliate_links.${index}.location`} errors={activeErrors} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Link</Label>

                                        <Input
                                            type="url"
                                            value={link.url}
                                            onChange={(event) => updateAffiliateLink(index, 'url', event.target.value)}
                                            placeholder="https://tokopedia.com/..."
                                        />

                                        <FieldError field={`affiliate_links.${index}.url`} errors={activeErrors} />
                                    </div>

                                    <div className="flex items-end">
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeAffiliateLink(index)}>
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    <Button type="button" variant="outline" onClick={addAffiliateLink}>
                        <Plus className="mr-2 size-4" />
                        Tambah Affiliate Link
                    </Button>

                    <FieldError field="affiliate_links" errors={activeErrors} />
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* SUBMIT */}
            {/* ================================= */}

            <div className="flex items-center justify-end gap-3">
                <Button type="button" variant="outline" disabled={processing} onClick={() => router.visit(route('admin.books.index'))}>
                    Batal
                </Button>

                <Button type="submit" disabled={processing}>
                    {processing ? 'Menyimpan...' : mode === 'create' ? 'Simpan Buku' : 'Simpan Perubahan'}
                </Button>
            </div>
        </form>
    );
}
