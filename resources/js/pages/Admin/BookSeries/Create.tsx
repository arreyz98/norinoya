import { Head, Link } from '@inertiajs/react';

import BookSeriesForm from './components/BookSeriesForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';

export default function CreateBookSeries() {
    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Book Series',
        href: '/admin/book-series',
    },
    {
        title: 'Tambah Book Series',
        href: '/admin/book-series/create',
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Series" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tambah Series
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Tambahkan series buku baru.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        asChild
                    >
                        <Link href={route('admin.book-series.index')}>
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <BookSeriesForm
                        mode="create"
                        submitLabel="Simpan Series"
                        onSubmit={(form) => {
                            form.post(
                                route(
                                    'admin.book-series.store'
                                )
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}