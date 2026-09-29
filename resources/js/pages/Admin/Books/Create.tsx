import { type RequestPayload } from '@inertiajs/core';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import BookForm, { type BookFormData, type EnumOption, type Option } from '@/pages/Admin/Books/components/BookForm';

interface BookImage {
    id?: number;
    image_url: string;
    sort_order?: number;
}

interface TikTokEmbed {
    id?: number;
    name?: string;
    embed_url?: string;
    url_video?: string;
    sort_order?: number;
}

interface AffiliateLink {
    id?: number;
    affiliate_store_id: number | string;
    store_name?: string;
    location?: string;
    url: string;
}

interface Book {
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
    images?: BookImage[];
    tiktok_embeds?: TikTokEmbed[];
    story_authors?: (number | string)[];
    art_authors?: (number | string)[];
    genres?: (number | string)[];
    affiliate_links?: AffiliateLink[];
}

interface Props {
    series: Option[];
    editions: Option[];
    storyStatuses: Option[];
    publishers: Option[];
    authors: Option[];
    genres: Option[];
    affiliateStores: Option[];
    existingVolumes: string[];
    bookTypes: EnumOption[];
    ageRatings: EnumOption[];
    book?: Book;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Books',
        href: '/admin/books',
    },
    {
        title: 'Tambah Buku',
        href: '/admin/books/create',
    },
];

const breadcrumbsWithDuplicate: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Books',
        href: '/admin/books',
    },
    {
        title: 'Tambah Buku',
        href: '/admin/books/create',
    },
    {
        title: 'Duplikat Buku',
        href: '#',
    },
];

export default function Create({
    series,
    editions,
    storyStatuses,
    publishers,
    authors,
    genres,
    affiliateStores,
    existingVolumes,
    bookTypes,
    ageRatings,
    book,
}: Props) {
    const { errors } = usePage().props as unknown as { errors: Record<string, string> };
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (formData: BookFormData) => {
        router.post(route('admin.books.store'), formData as unknown as RequestPayload, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    const pageTitle = book ? 'Duplikat Buku' : 'Tambah Buku';
    const pageDescription = book ? 'Duplikat buku dengan volume yang sudah disesuaikan.' : 'Tambahkan buku baru ke dalam database.';

    return (
        <AppLayout breadcrumbs={book ? breadcrumbsWithDuplicate : breadcrumbs}>
            <Head title={pageTitle} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">{pageTitle}</h1>

                    <p className="text-muted-foreground text-sm">{pageDescription}</p>
                </div>

                <BookForm
                    mode="create"
                    book={book}
                    series={series}
                    editions={editions}
                    storyStatuses={storyStatuses}
                    publishers={publishers}
                    authors={authors}
                    genres={genres}
                    affiliateStores={affiliateStores}
                    existingVolumes={existingVolumes}
                    bookTypes={bookTypes}
                    ageRatings={ageRatings}
                    processing={processing}
                    errors={errors || {}}
                    onSubmit={handleSubmit}
                />
            </div>
        </AppLayout>
    );
}
