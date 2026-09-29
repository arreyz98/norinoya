import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import BookSeriesForm from './components/BookSeriesForm';

import { Button } from '@/components/ui/button';

import type { BookSeries } from '@/types/book-series';

interface EditBookSeriesProps {
    series: BookSeries;
}



export default function EditBookSeries({
    series,
}: EditBookSeriesProps) {
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
        title: 'Edit Book Series',
        href: `/admin/book-series/${series.id}/edit`,
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${series.title}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Series
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi series.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        asChild
                    >
                        <Link
                            href={route(
                                'admin.book-series.index'
                            )}
                        >
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <BookSeriesForm
                        mode="edit"
                        submitLabel="Simpan Perubahan"
                        initialValues={{
                            title: series.title,
                            description:
                                series.description ?? '',
                        }}
                        onSubmit={(form) => {
                            form.put(
                                route(
                                    'admin.book-series.update',
                                    series.id
                                )
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}