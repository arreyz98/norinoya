import {
    Head,
    router,
} from '@inertiajs/react';
import { type RequestPayload } from '@inertiajs/core';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import BookForm, {
    type BookFormData,
    type EnumOption,
    type Option,
} from '@/pages/Admin/Books/components/BookForm';

interface Props {
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
        title: 'Tambah Buku',
        href: '/admin/books/create',
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
    bookTypes,
    ageRatings,
}: Props) {
    const handleSubmit = (
        formData: BookFormData,
    ) => {
        router.post(
            route('admin.books.store'),
            formData as unknown as RequestPayload,
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Buku" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Tambah Buku
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Tambahkan buku baru ke dalam
                        database.
                    </p>
                </div>

                <BookForm
                    mode="create"
                    series={series}
                    editions={editions}
                    storyStatuses={
                        storyStatuses
                    }
                    publishers={publishers}
                    authors={authors}
                    genres={genres}
                    affiliateStores={
                        affiliateStores
                    }
                    bookTypes={bookTypes}
                    ageRatings={ageRatings}
                    processing={false}
                    errors={{}}
                    onSubmit={
                        handleSubmit
                    }
                />
            </div>
        </AppLayout>
    );
}