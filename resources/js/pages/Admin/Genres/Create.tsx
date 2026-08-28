import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';



import GenreForm from './components/GenreForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Genres',
        href: '/admin/genres',
    },
    {
        title: 'Tambah',
        href: '/admin/genres/create',
    },
];

export default function CreateGenre() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Genre" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Tambah Genre
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Tambahkan genre baru.
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-6">
                    <GenreForm
                        submitLabel="Simpan Genre"
                        onSubmit={(form) => {
                            form.post(
                                route(
                                    'admin.genres.store',
                                ),
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}