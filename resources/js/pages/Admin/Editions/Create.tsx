import { Head, Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';

import EditionForm from './components/EditionForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Editions',
        href: '/admin/editions',
    },
    {
        title: 'Tambah Edisi',
        href: '/admin/editions/create',
    },
];

export default function CreateEdition() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Edisi" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tambah Edisi
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Tambahkan jenis edisi buku baru.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        asChild
                    >
                        <Link
                            href={route(
                                'admin.editions.index',
                            )}
                        >
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border bg-card p-6">
                    <EditionForm
                        submitLabel="Simpan Edisi"
                        onSubmit={(form) => {
                            form.post(
                                route(
                                    'admin.editions.store',
                                ),
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}