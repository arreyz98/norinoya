import { FormEvent, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';

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

interface BookFormProps {
    mode: 'create' | 'edit';

    book?: {
        id?: number;
        title?: string;
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
        affiliate_links?: { id?: number; affiliate_store_id: number | string; url: string }[];
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

    onSubmit: (
        data: BookFormData,
    ) => void;
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
    processing,
    errors,
    onSubmit,
}: BookFormProps) {
    const [form, setForm] =
        useState<BookFormData>({
            title: book?.title ?? '',
            series_id: book?.series_id
                ? String(book.series_id)
                : '',
            volume: book?.volume
                ? String(book.volume)
                : '',
            edition_id: book?.edition_id
                ? String(book.edition_id)
                : '',
            book_type:
                book?.book_type ?? '',
            story_status_id:
                book?.story_status_id
                    ? String(
                          book.story_status_id,
                      )
                    : '',
            age_rating:
                book?.age_rating ?? '',
            publisher_id:
                book?.publisher_id
                    ? String(
                          book.publisher_id,
                      )
                    : '',

            synopsis:
                book?.synopsis ?? '',
            short_description:
                book?.short_description ??
                '',
            news_link:
                book?.news_link ?? '',
            msrp:
                book?.msrp !== undefined &&
                book?.msrp !== null
                    ? String(book.msrp)
                    : '',

            isbn: book?.isbn ?? '',
            page_count:
                book?.page_count !== undefined &&
                book?.page_count !== null
                    ? String(book.page_count)
                    : '',
            paper_type: book?.paper_type ?? '',
            dimensions: book?.dimensions ?? '',
            adaptation: book?.adaptation ?? '',
            is_upcoming: Boolean(book?.is_upcoming),

            images:
                book?.images?.map(
                    (image) => ({
                        id: image.id,
                        image_url:
                            image.image_url,
                        sort_order:
                            image.sort_order,
                    }),
                ) ?? [
                    {
                        image_url: '',
                    },
                ],

            tiktok_embeds:
                book?.tiktok_embeds?.map(
                    (embed) => ({
                        id: embed.id,
                        name: embed.name ?? '',
                        embed_url: embed.embed_url ?? embed.url_video ?? '',
                        url_video: embed.url_video ?? embed.embed_url ?? '',
                    }),
                ) ?? [
                    {
                        name: '',
                        embed_url: '',
                        url_video: '',
                    },
                ],

            story_authors:
                book?.story_authors?.map(
                    String,
                ) ?? [],

            art_authors:
                book?.art_authors?.map(
                    String,
                ) ?? [],

            genres:
                book?.genres?.map(
                    String,
                ) ?? [],

            affiliate_links:
                book?.affiliate_links?.map(
                    (link) => ({
                        id: link.id,
                        affiliate_store_id:
                            String(
                                link.affiliate_store_id,
                            ),
                        url: link.url,
                    }),
                ) ?? [
                    {
                        affiliate_store_id:
                            '',
                        url: '',
                    },
                ],
        });

    useEffect(() => {
        if (
            form.images.length === 0
        ) {
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

    const updateField = <
        K extends keyof BookFormData,
    >(
        field: K,
        value: BookFormData[K],
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const addImage = () => {
        if (form.images.length >= 5) {
            return;
        }

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

    const removeImage = (
        index: number,
    ) => {
        setForm((previous) => ({
            ...previous,
            images: previous.images.filter(
                (_, imageIndex) =>
                    imageIndex !== index,
            ),
        }));
    };

    const updateImage = (
        index: number,
        value: string,
    ) => {
        setForm((previous) => ({
            ...previous,
            images: previous.images.map(
                (image, imageIndex) =>
                    imageIndex === index
                        ? {
                              ...image,
                              image_url:
                                  value,
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
        setForm((previous) => ({
            ...previous,
            tiktok_embeds: previous.tiktok_embeds.filter(
                (_, embedIndex) => embedIndex !== index,
            ),
        }));
    };

    const updateTiktokEmbed = (
        index: number,
        field: 'name' | 'embed_url' | 'url_video',
        value: string,
    ) => {
        let finalValue = value;
        if (field === 'embed_url' || field === 'url_video') {
            finalValue = cleanTikTokUrl(value);
        }

        setForm((previous) => ({
            ...previous,
            tiktok_embeds: previous.tiktok_embeds.map(
                (embed, embedIndex) =>
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
        setForm((previous) => ({
            ...previous,
            affiliate_links: [
                ...previous.affiliate_links,
                {
                    affiliate_store_id:
                        '',
                    url: '',
                },
            ],
        }));
    };

    const removeAffiliateLink = (
        index: number,
    ) => {
        setForm((previous) => ({
            ...previous,
            affiliate_links:
                previous.affiliate_links.filter(
                    (_, linkIndex) =>
                        linkIndex !== index,
                ),
        }));
    };

    const updateAffiliateLink = (
        index: number,
        field: keyof AffiliateLink,
        value: string,
    ) => {
        setForm((previous) => ({
            ...previous,
            affiliate_links:
                previous.affiliate_links.map(
                    (link, linkIndex) =>
                        linkIndex === index
                            ? {
                                  ...link,
                                  [field]:
                                      value,
                              }
                            : link,
                ),
        }));
    };

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        onSubmit({
            ...form,
            images: form.images.filter(
                (image) =>
                    image.image_url.trim() !==
                    '',
            ),
            tiktok_embeds: form.tiktok_embeds.filter(
                (embed) =>
                    embed.embed_url.trim() !==
                    '',
            ),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* ================================= */}
            {/* INFORMASI BUKU */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Informasi Buku
                    </CardTitle>

                    <CardDescription>
                        Informasi utama mengenai
                        buku.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Judul */}
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Judul Buku
                        </Label>

                        <Input
                            id="title"
                            value={form.title}
                            onChange={(event) =>
                                updateField(
                                    'title',
                                    event.target
                                        .value,
                                )
                            }
                            placeholder="Masukkan judul buku"
                        />

                        {errors.title && (
                            <p className="text-sm text-destructive">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Series */}
                        <div className="space-y-2">
                            <Label>
                                Series
                            </Label>

                            <Select
                                value={
                                    form.series_id ||
                                    'none'
                                }
                                onValueChange={(
                                    value,
                                ) =>
                                    updateField(
                                        'series_id',
                                        value ===
                                            'none'
                                            ? ''
                                            : value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih series" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="none">
                                        Tidak ada
                                    </SelectItem>

                                    {series.map(
                                        (
                                            item,
                                        ) => (
                                            <SelectItem
                                                key={
                                                    item.id
                                                }
                                                value={String(
                                                    item.id,
                                                )}
                                            >
                                                {
                                                    item.title || item.name
                                                }
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>

                            {errors.series_id && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.series_id
                                    }
                                </p>
                            )}
                        </div>

                        {/* Volume */}
                        <div className="space-y-2">
                            <Label htmlFor="volume">
                                Volume
                            </Label>

                            <Input
                                id="volume"
                                type="number"
                                min="1"
                                value={
                                    form.volume
                                }
                                onChange={(
                                    event,
                                ) =>
                                    updateField(
                                        'volume',
                                        event.target
                                            .value,
                                    )
                                }
                                placeholder="Contoh: 1"
                            />

                            {errors.volume && (
                                <p className="text-sm text-destructive">
                                    {errors.volume}
                                </p>
                            )}

                            <p className="text-xs text-muted-foreground">
                                Volume tidak boleh
                                sama dalam series
                                yang sama.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Edition */}
                        <div className="space-y-2">
                            <Label>
                                Edisi Cetakan
                            </Label>

                            <Select
                                value={
                                    form.edition_id
                                }
                                onValueChange={(
                                    value,
                                ) =>
                                    updateField(
                                        'edition_id',
                                        value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih edisi" />
                                </SelectTrigger>

                                <SelectContent>
                                    {editions.map(
                                        (
                                            item,
                                        ) => (
                                            <SelectItem
                                                key={
                                                    item.id
                                                }
                                                value={String(
                                                    item.id,
                                                )}
                                            >
                                                {
                                                    item.name
                                                }
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>

                            {errors.edition_id && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.edition_id
                                    }
                                </p>
                            )}
                        </div>

                        {/* Book Type */}
                        <div className="space-y-2">
                            <Label>
                                Tipe Buku
                            </Label>

                            <Select
                                value={
                                    form.book_type
                                }
                                onValueChange={(
                                    value,
                                ) =>
                                    updateField(
                                        'book_type',
                                        value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe buku" />
                                </SelectTrigger>

                                <SelectContent>
                                    {(bookTypes && bookTypes.length > 0 ? bookTypes : [
                                        { value: 'manga', label: 'Komik (Manga)' },
                                        { value: 'light_novel', label: 'Light Novel' },
                                        { value: 'novel', label: 'Novel' },
                                    ]).map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.book_type && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.book_type
                                    }
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {/* Story Status */}
                        <div className="space-y-2">
                            <Label>
                                Status Cerita
                            </Label>

                            <Select
                                value={
                                    form.story_status_id
                                }
                                onValueChange={(
                                    value,
                                ) =>
                                    updateField(
                                        'story_status_id',
                                        value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>

                                <SelectContent>
                                    {storyStatuses.map(
                                        (
                                            item,
                                        ) => (
                                            <SelectItem
                                                key={
                                                    item.id
                                                }
                                                value={String(
                                                    item.id,
                                                )}
                                            >
                                                {
                                                    item.name
                                                }
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>

                            {errors.story_status_id && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.story_status_id
                                    }
                                </p>
                            )}
                        </div>

                        {/* Age Rating */}
                        <div className="space-y-2">
                            <Label>
                                Rating Umur
                            </Label>

                            <Select
                                value={
                                    form.age_rating
                                }
                                onValueChange={(
                                    value,
                                ) =>
                                    updateField(
                                        'age_rating',
                                        value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih rating umur" />
                                </SelectTrigger>

                                <SelectContent>
                                    {ageRatings.map(
                                        (
                                            item,
                                        ) => (
                                            <SelectItem
                                                key={
                                                    item.value
                                                }
                                                value={
                                                    item.value
                                                }
                                            >
                                                {
                                                    item.label
                                                }
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>

                            {errors.age_rating && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.age_rating
                                    }
                                </p>
                            )}
                        </div>

                        {/* Publisher */}
                        <div className="space-y-2">
                            <Label>
                                Penerbit
                            </Label>

                            <Select
                                value={
                                    form.publisher_id
                                }
                                onValueChange={(
                                    value,
                                ) =>
                                    updateField(
                                        'publisher_id',
                                        value,
                                    )
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih penerbit" />
                                </SelectTrigger>

                                <SelectContent>
                                    {publishers.map(
                                        (
                                            item,
                                        ) => (
                                            <SelectItem
                                                key={
                                                    item.id
                                                }
                                                value={String(
                                                    item.id,
                                                )}
                                            >
                                                {
                                                    item.name
                                                }
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>

                            {errors.publisher_id && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.publisher_id
                                    }
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* SPESIFIKASI & ADAPTASI BUKU */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Spesifikasi &amp; Adaptasi Buku
                    </CardTitle>

                    <CardDescription>
                        Detail fisik buku seperti ISBN, jumlah halaman, jenis kertas, ukuran, dan info adaptasi.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* ISBN */}
                        <div className="space-y-2">
                            <Label htmlFor="isbn">
                                ISBN
                            </Label>

                            <Input
                                id="isbn"
                                value={form.isbn}
                                onChange={(event) =>
                                    updateField(
                                        'isbn',
                                        event.target.value,
                                    )
                                }
                                placeholder="Contoh: 978-623-87-002-6"
                            />

                            {errors.isbn && (
                                <p className="text-sm text-destructive">
                                    {errors.isbn}
                                </p>
                            )}
                        </div>

                        {/* Jumlah Halaman */}
                        <div className="space-y-2">
                            <Label htmlFor="page_count">
                                Jumlah Halaman
                            </Label>

                            <Input
                                id="page_count"
                                type="number"
                                min="1"
                                value={form.page_count}
                                onChange={(event) =>
                                    updateField(
                                        'page_count',
                                        event.target.value,
                                    )
                                }
                                placeholder="Contoh: 208"
                            />

                            {errors.page_count && (
                                <p className="text-sm text-destructive">
                                    {errors.page_count}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Jenis Kertas */}
                        <div className="space-y-2">
                            <Label htmlFor="paper_type">
                                Jenis Kertas
                            </Label>

                            <Input
                                id="paper_type"
                                value={form.paper_type}
                                onChange={(event) =>
                                    updateField(
                                        'paper_type',
                                        event.target.value,
                                    )
                                }
                                placeholder="Contoh: Bookpaper 55g"
                            />

                            {errors.paper_type && (
                                <p className="text-sm text-destructive">
                                    {errors.paper_type}
                                </p>
                            )}
                        </div>

                        {/* Ukuran Buku / Dimensions */}
                        <div className="space-y-2">
                            <Label htmlFor="dimensions">
                                Ukuran Buku (Dimensi)
                            </Label>

                            <Input
                                id="dimensions"
                                value={form.dimensions}
                                onChange={(event) =>
                                    updateField(
                                        'dimensions',
                                        event.target.value,
                                    )
                                }
                                placeholder="Contoh: 13 x 18 cm"
                            />

                            {errors.dimensions && (
                                <p className="text-sm text-destructive">
                                    {errors.dimensions}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Adaptasi */}
                    <div className="space-y-2">
                        <Label>
                            Adaptasi Media
                        </Label>

                        <Select
                            value={form.adaptation || 'all'}
                            onValueChange={(value) =>
                                updateField(
                                    'adaptation',
                                    value === 'all' ? '' : value,
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih adaptasi" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Adaptasi
                                </SelectItem>
                                <SelectItem value="anime">
                                    Anime
                                </SelectItem>
                                <SelectItem value="live_action">
                                    Live Action
                                </SelectItem>
                                <SelectItem value="manga">
                                    Manga
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {errors.adaptation && (
                            <p className="text-sm text-destructive">
                                {errors.adaptation}
                            </p>
                        )}
                    </div>

                    {/* Checkbox / Toggle Item Segera Rilis */}
                    <div className="pt-3 border-t border-border/60">
                        <label className="flex items-start gap-3 p-3.5 border rounded-xl bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer transition-colors">
                            <input
                                type="checkbox"
                                checked={form.is_upcoming}
                                onChange={(e) => updateField('is_upcoming', e.target.checked)}
                                className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary"
                            />
                            <div className="space-y-0.5">
                                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                    <span>Tampilkan di Section "Item Segera Rilis"</span>
                                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-bold">
                                        Highlight User
                                    </span>
                                </span>
                                <p className="text-xs text-muted-foreground">
                                    Jika dicentang, buku ini akan dimunculkan pada banner khusus "ITEM SEGERA RILIS" di bagian atas halaman katalog user.
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
                    <CardTitle>
                        Author & Genre
                    </CardTitle>

                    <CardDescription>
                        Pilih author cerita, author
                        gambar, dan genre buku.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Story Author */}
                        <div className="space-y-2">
                            <Label>
                                Author Story
                            </Label>

                            <MultiSelect
                                values={
                                    form.story_authors
                                }
                                onValuesChange={(
                                    values: string[],
                                ) =>
                                    updateField(
                                        'story_authors',
                                        values,
                                    )
                                }
                            >
                                <MultiSelectTrigger className="w-full">
                                    <MultiSelectValue placeholder="Pilih author story" />
                                </MultiSelectTrigger>

                                <MultiSelectContent>
                                    <MultiSelectGroup>
                                        {authors.map(
                                            (
                                                author,
                                            ) => (
                                                <MultiSelectItem
                                                    key={
                                                        author.id
                                                    }
                                                    value={String(
                                                        author.id,
                                                    )}
                                                >
                                                    {
                                                        author.name
                                                    }
                                                </MultiSelectItem>
                                            ),
                                        )}
                                    </MultiSelectGroup>
                                </MultiSelectContent>
                            </MultiSelect>

                            {errors.story_authors && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.story_authors
                                    }
                                </p>
                            )}
                        </div>

                        {/* Art Author */}
                        <div className="space-y-2">
                            <Label>
                                Author Art
                            </Label>

                            <MultiSelect
                                values={
                                    form.art_authors
                                }
                                onValuesChange={(
                                    values: string[],
                                ) =>
                                    updateField(
                                        'art_authors',
                                        values,
                                    )
                                }
                            >
                                <MultiSelectTrigger className="w-full">
                                    <MultiSelectValue placeholder="Pilih author art" />
                                </MultiSelectTrigger>

                                <MultiSelectContent>
                                    <MultiSelectGroup>
                                        {authors.map(
                                            (
                                                author,
                                            ) => (
                                                <MultiSelectItem
                                                    key={
                                                        author.id
                                                    }
                                                    value={String(
                                                        author.id,
                                                    )}
                                                >
                                                    {
                                                        author.name
                                                    }
                                                </MultiSelectItem>
                                            ),
                                        )}
                                    </MultiSelectGroup>
                                </MultiSelectContent>
                            </MultiSelect>

                            {errors.art_authors && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.art_authors
                                    }
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Genre */}
                    <div className="space-y-2">
                        <Label>
                            Genre
                        </Label>

                        <MultiSelect
                            values={
                                form.genres
                            }
                            onValuesChange={(
                                values: string[],
                            ) =>
                                updateField(
                                    'genres',
                                    values,
                                )
                            }
                        >
                            <MultiSelectTrigger className="w-full">
                                <MultiSelectValue placeholder="Pilih genre" />
                            </MultiSelectTrigger>

                            <MultiSelectContent>
                                <MultiSelectGroup>
                                    {genres.map(
                                        (
                                            genre,
                                        ) => (
                                            <MultiSelectItem
                                                key={
                                                    genre.id
                                                }
                                                value={String(
                                                    genre.id,
                                                )}
                                            >
                                                {
                                                    genre.name
                                                }
                                            </MultiSelectItem>
                                        ),
                                    )}
                                </MultiSelectGroup>
                            </MultiSelectContent>
                        </MultiSelect>

                        {errors.genres && (
                            <p className="text-sm text-destructive">
                                {errors.genres}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* IMAGES */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Gambar Buku
                    </CardTitle>

                    <CardDescription>
                        Masukkan maksimal 5 URL gambar
                        untuk buku.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {form.images.map(
                        (
                            image,
                            index,
                        ) => (
                            <div
                                key={index}
                                className="flex gap-3"
                            >
                                <div className="flex-1 space-y-2">
                                    <Label>
                                        Gambar{' '}
                                        {index +
                                            1}
                                    </Label>

                                    <Input
                                        value={
                                            image.image_url
                                        }
                                        onChange={(
                                            event,
                                        ) =>
                                            updateImage(
                                                index,
                                                event
                                                    .target
                                                    .value,
                                            )
                                        }
                                        placeholder="https://example.com/image.jpg"
                                    />

                                    {errors[
                                        `images.${index}.image_url`
                                    ] && (
                                        <p className="text-sm text-destructive">
                                            {
                                                errors[
                                                    `images.${index}.image_url`
                                                ]
                                            }
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-end">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        disabled={
                                            form
                                                .images
                                                .length ===
                                                1
                                        }
                                        onClick={() =>
                                            removeImage(
                                                index,
                                            )
                                        }
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        ),
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={addImage}
                        disabled={
                            form.images.length >=
                            5
                        }
                    >
                        <Plus className="mr-2 size-4" />
                        Tambah Gambar
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        {form.images.length}/5
                        gambar digunakan.
                    </p>

                    {errors.images && (
                        <p className="text-sm text-destructive">
                            {errors.images}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* DESKRIPSI & EMBED */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Deskripsi & Media
                    </CardTitle>

                    <CardDescription>
                        Informasi deskripsi dan embed media tambahan buku.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Synopsis */}
                    <div className="space-y-2">
                        <Label htmlFor="synopsis">
                            Sinopsis
                        </Label>

                        <Textarea
                            id="synopsis"
                            value={
                                form.synopsis
                            }
                            onChange={(
                                event,
                            ) =>
                                updateField(
                                    'synopsis',
                                    event.target
                                        .value,
                                )
                            }
                            placeholder="Masukkan sinopsis buku"
                            rows={6}
                        />

                        {errors.synopsis && (
                            <p className="text-sm text-destructive">
                                {errors.synopsis}
                            </p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div className="space-y-2">
                        <Label htmlFor="short_description">
                            Deskripsi Singkat
                        </Label>

                        <Textarea
                            id="short_description"
                            value={
                                form.short_description
                            }
                            onChange={(
                                event,
                            ) =>
                                updateField(
                                    'short_description',
                                    event.target
                                        .value,
                                )
                            }
                            placeholder="Deskripsi singkat buku"
                            rows={3}
                        />

                        {errors.short_description && (
                            <p className="text-sm text-destructive">
                                {
                                    errors.short_description
                                }
                            </p>
                        )}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {/* News */}
                        <div className="space-y-2">
                            <Label htmlFor="news_link">
                                Link Berita
                            </Label>

                            <Input
                                id="news_link"
                                type="url"
                                value={
                                    form.news_link
                                }
                                onChange={(
                                    event,
                                ) =>
                                    updateField(
                                        'news_link',
                                        event.target
                                            .value,
                                    )
                                }
                                placeholder="https://..."
                            />

                            {errors.news_link && (
                                <p className="text-sm text-destructive">
                                    {
                                        errors.news_link
                                    }
                                </p>
                            )}
                        </div>

                        {/* MSRP */}
                        <div className="space-y-2">
                            <Label htmlFor="msrp">
                                Harga MSRP
                            </Label>

                            <Input
                                id="msrp"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.msrp}
                                onChange={(
                                    event,
                                ) =>
                                    updateField(
                                        'msrp',
                                        event.target
                                            .value,
                                    )
                                }
                                placeholder="Contoh: 45000"
                            />

                            {errors.msrp && (
                                <p className="text-sm text-destructive">
                                    {errors.msrp}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* TikTok Embeds */}
                    <div className="space-y-3 pt-2">
                        <Label>TikTok Video Links & Review</Label>
                        <CardDescription>
                            Masukkan Judul dan Link video/photo TikTok (maksimal 10 link). Link otomatis dibersihkan saat di-paste.
                        </CardDescription>

                        {form.tiktok_embeds.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-lg border p-4 bg-muted/20 space-y-3"
                            >
                                <div className="flex justify-between items-center">
                                    <Label className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                                        Video TikTok #{index + 1}
                                    </Label>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="h-7 text-xs px-2"
                                        onClick={() => removeTiktokEmbed(index)}
                                    >
                                        <Trash2 className="mr-1 size-3.5" />
                                        Hapus
                                    </Button>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Judul Video
                                        </Label>
                                        <Input
                                            value={item.name || ''}
                                            onChange={(e) =>
                                                updateTiktokEmbed(
                                                    index,
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Contoh: Bedah Detail Kertas Jilid 1"
                                        />
                                        {errors[`tiktok_embeds.${index}.name`] && (
                                            <p className="text-sm text-destructive">
                                                {errors[`tiktok_embeds.${index}.name`]}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label className="text-xs">
                                            Link TikTok
                                        </Label>
                                        <Input
                                            value={item.url_video || item.embed_url || ''}
                                            onChange={(e) =>
                                                updateTiktokEmbed(
                                                    index,
                                                    'url_video',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://www.tiktok.com/@norinoya.official/photo/..."
                                        />
                                        {errors[`tiktok_embeds.${index}.url_video`] && (
                                            <p className="text-sm text-destructive">
                                                {errors[`tiktok_embeds.${index}.url_video`]}
                                            </p>
                                        )}
                                        {errors[`tiktok_embeds.${index}.embed_url`] && (
                                            <p className="text-sm text-destructive">
                                                {errors[`tiktok_embeds.${index}.embed_url`]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addTiktokEmbed}
                            disabled={form.tiktok_embeds.length >= 10}
                        >
                            <Plus className="mr-2 size-4" />
                            Tambah TikTok Link
                        </Button>

                        {errors.tiktok_embeds && (
                            <p className="text-sm text-destructive">
                                {errors.tiktok_embeds}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* AFFILIATE */}
            {/* ================================= */}

            <Card>
                <CardHeader>
                    <CardTitle>
                        Affiliate Links
                    </CardTitle>

                    <CardDescription>
                        Tambahkan link pembelian dari
                        berbagai toko.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {form.affiliate_links.length ===
                    0 ? (
                        <div className="rounded-lg border border-dashed p-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Belum ada affiliate
                                link.
                            </p>
                        </div>
                    ) : (
                        form.affiliate_links.map(
                            (
                                link,
                                index,
                            ) => (
                                <div
                                    key={index}
                                    className="rounded-lg border p-4"
                                >
                                    <div className="grid gap-4 md:grid-cols-[220px_1fr_auto]">
                                        <div className="space-y-2">
                                            <Label>
                                                Toko
                                            </Label>

                                            <Select
                                                value={
                                                    link.affiliate_store_id
                                                }
                                                onValueChange={(
                                                    value,
                                                ) =>
                                                    updateAffiliateLink(
                                                        index,
                                                        'affiliate_store_id',
                                                        value,
                                                    )
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih toko" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {affiliateStores.map(
                                                        (
                                                            store,
                                                        ) => (
                                                            <SelectItem
                                                                key={
                                                                    store.id
                                                                }
                                                                value={String(
                                                                    store.id,
                                                                )}
                                                            >
                                                                {
                                                                    store.name
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            {errors[
                                                `affiliate_links.${index}.affiliate_store_id`
                                            ] && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        errors[
                                                            `affiliate_links.${index}.affiliate_store_id`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>
                                                Link
                                            </Label>

                                            <Input
                                                type="url"
                                                value={
                                                    link.url
                                                }
                                                onChange={(
                                                    event,
                                                ) =>
                                                    updateAffiliateLink(
                                                        index,
                                                        'url',
                                                        event
                                                            .target
                                                            .value,
                                                    )
                                                }
                                                placeholder="https://tokopedia.com/..."
                                            />

                                            {errors[
                                                `affiliate_links.${index}.url`
                                            ] && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        errors[
                                                            `affiliate_links.${index}.url`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-end">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    removeAffiliateLink(
                                                        index,
                                                    )
                                                }
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={
                            addAffiliateLink
                        }
                    >
                        <Plus className="mr-2 size-4" />
                        Tambah Affiliate Link
                    </Button>

                    {errors.affiliate_links && (
                        <p className="text-sm text-destructive">
                            {
                                errors.affiliate_links
                            }
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* ================================= */}
            {/* SUBMIT */}
            {/* ================================= */}

            <div className="flex items-center justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    disabled={processing}
                    onClick={() =>
                        router.visit(
                            route(
                                'admin.books.index',
                            ),
                        )
                    }
                >
                    Batal
                </Button>

                <Button
                    type="submit"
                    disabled={processing}
                >
                    {processing
                        ? 'Menyimpan...'
                        : mode === 'create'
                          ? 'Simpan Buku'
                          : 'Simpan Perubahan'}
                </Button>
            </div>
        </form>
    );
}

