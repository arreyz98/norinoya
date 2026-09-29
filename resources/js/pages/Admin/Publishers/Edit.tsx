import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Publisher {
    id: number;
    name: string;
    slug: string;
}

interface EditPublisherProps {
    publisher: Publisher;
}

export default function EditPublisher({
    publisher,
}: EditPublisherProps) {
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
            title: 'Edit',
            href: `/admin/publishers/${publisher.id}/edit`,
        },
    ];

    const form = useForm({
        name: publisher.name,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(
            route(
                'admin.publishers.update',
                publisher.id,
            ),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={`Edit Publisher - ${publisher.name}`}
            />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Publisher
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi publisher.
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
                                disabled={form.processing}
                            />

                            {form.errors.name && (
                                <p className="text-sm text-destructive">
                                    {form.errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">
                                Slug
                            </Label>

                            <Input
                                id="slug"
                                value={publisher.slug}
                                disabled
                            />

                            <p className="text-xs text-muted-foreground">
                                Slug dibuat otomatis oleh
                                sistem.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                disabled={
                                    form.processing ||
                                    !form.data.name.trim()
                                }
                            >
                                {form.processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                asChild
                            >
                                <Link
                                    href={route(
                                        'admin.publishers.index',
                                    )}
                                >
                                    Batal
                                </Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}