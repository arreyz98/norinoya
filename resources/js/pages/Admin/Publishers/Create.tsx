import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Publishers',
        href: '/admin/publishers',
    },
    {
        title: 'Tambah',
        href: '/admin/publishers/create',
    },
];

export default function CreatePublisher() {
    const form = useForm({
        name: '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.post(
            route('admin.publishers.store'),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Publisher" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Tambah Publisher
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Tambahkan penerbit buku baru.
                        </p>
                    </div>

                    <Button variant="outline" asChild>
                        <Link
                            href={route(
                                'admin.publishers.index',
                            )}
                        >
                            Kembali
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border bg-card p-6">
                    <form
                        onSubmit={submit}
                        className="max-w-xl space-y-6"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nama Publisher
                            </Label>

                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData(
                                        'name',
                                        event.target.value,
                                    )
                                }
                                placeholder="Contoh: Elex Media Komputindo"
                                disabled={form.processing}
                            />

                            {form.errors.name && (
                                <p className="text-sm text-destructive">
                                    {form.errors.name}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={
                                form.processing ||
                                !form.data.name.trim()
                            }
                        >
                            {form.processing
                                ? 'Menyimpan...'
                                : 'Simpan Publisher'}
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}