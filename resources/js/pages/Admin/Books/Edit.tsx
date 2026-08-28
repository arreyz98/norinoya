import BookForm, { type BookFormData } from './components/BookForm';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import type { RequestPayload } from '@inertiajs/core';
import { useState } from 'react';

interface Option {
    id: number;
    name?: string;
    title?: string;
}

interface EnumOption {
    value: string;
    label: string;
}

interface BookImage {
    id: number;
    image_url: string;
    sort_order: number;
}

interface TikTokEmbed {
    id: number;
    embed_url: string;
    sort_order: number;
}

interface AffiliateLink {
    id: number;
    affiliate_store_id: number;
    url: string;
}

interface Book {
    id: number;
    title: string;
    slug: string;
    series_id: number | null;
    volume: number;
    edition_id: number;
    book_type: string;
    story_status_id: number;
    age_rating: string;
    publisher_id: number;
    synopsis: string;
    short_description: string | null;
    news_link: string | null;
    msrp: number;
    isbn?: string | null;
    page_count?: number | null;
    paper_type?: string | null;
    dimensions?: string | null;
    adaptation?: string | null;
    is_upcoming?: boolean;

    images: BookImage[];

    story_authors: number[];
    art_authors: number[];
    genres: number[];

    tiktok_embeds: TikTokEmbed[];

    affiliate_links: AffiliateLink[];
}

interface Props {
    book: Book;

    series: Option[];
    editions: Option[];
    storyStatuses: Option[];
    publishers: Option[];
    authors: Option[];
    genres: Option[];
    affiliateStores: Option[];

    bookTypes: EnumOption[];
    ageRatings: EnumOption[];
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
        title: 'Edit',
        href: '#',
    },
];

export default function Edit({
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
}: Props) {
    const { errors } = usePage().props as unknown as { errors: Record<string, string> };
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (formData: BookFormData) => {
        router.put(
            route('admin.books.update', book.id),
            formData as unknown as RequestPayload,
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${book.title}`} />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Edit Book
                    </h1>

                    <p className="text-muted-foreground">
                        Edit informasi buku.
                    </p>
                </div>

                <BookForm
                    mode="edit"
                    book={book}
                    series={series}
                    editions={editions}
                    storyStatuses={storyStatuses}
                    publishers={publishers}
                    authors={authors}
                    genres={genres}
                    affiliateStores={affiliateStores}
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