import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import AuthorForm from './components/AuthorForm';

import { Button } from '@/components/ui/button';

export default function CreateAuthor() {
    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Authors',
        href: '/admin/authors',
    },
    {
        title: 'Tambah Author',
        href: '/admin/authors/create',
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Author" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tambah Author
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Tambahkan author baru.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        asChild
                    >
                        <Link
                            href={route(
                                'admin.authors.index'
                            )}
                        >
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border bg-card p-6">
                    <AuthorForm
                        submitLabel="Simpan Author"
                        onSubmit={(form) => {
                            form.post(
                                route(
                                    'admin.authors.store'
                                )
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}