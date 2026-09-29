import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Edition {
    id: number;
    name: string;
    slug: string;
}

interface EditEditionProps {
    edition: Edition;
}

export default function EditEdition({
    edition,
}: EditEditionProps) {
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
            title: 'Edit Edisi',
            href: `/admin/editions/${edition.id}/edit`,
        },
    ];

    const form = useForm({
        name: edition.name,
    });

    const submit = (
        event: FormEvent,
    ) => {
        event.preventDefault();

        form.put(
            route(
                'admin.editions.update',
                edition.id,
            ),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={`Edit Edisi - ${edition.name}`}
            />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Edisi
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi edisi.
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
                    <form
                        onSubmit={submit}
                        className="max-w-xl space-y-6"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nama Edisi
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
                                disabled={
                                    form.processing
                                }
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
                                value={edition.slug}
                                disabled
                            />

                            <p className="text-xs text-muted-foreground">
                                Slug dibuat otomatis
                                berdasarkan nama edisi.
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
                                        'admin.editions.index',
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