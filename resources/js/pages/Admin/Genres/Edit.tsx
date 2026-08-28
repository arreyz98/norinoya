
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Genre {
    id: number;
    name: string;
    slug: string;
}

interface EditGenreProps {
    genre: Genre;
}

export default function EditGenre({
    genre,
}: EditGenreProps) {
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
            title: 'Edit Genre',
            href: `/admin/genres/${genre.id}/edit`,
        },
    ];

    const form = useForm({
        name: genre.name,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        form.put(
            route(
                'admin.genres.update',
                genre.id,
            ),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Genre - ${genre.name}`} />

            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Edit Genre
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi genre.
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        asChild
                    >
                        <Link
                            href={route(
                                'admin.genres.index',
                            )}
                        >
                            Kembali
                        </Link>
                    </Button>
                </div>

                {/* Form */}
                <div className="rounded-xl border bg-card p-6">
                    <form
                        onSubmit={submit}
                        className="max-w-xl space-y-6"
                    >
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nama Genre
                            </Label>

                            <Input
                                id="name"
                                type="text"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData(
                                        'name',
                                        event.target.value,
                                    )
                                }
                                placeholder="Contoh: Action"
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

                        {/* Slug */}
                        <div className="space-y-2">
                            <Label htmlFor="slug">
                                Slug
                            </Label>

                            <Input
                                id="slug"
                                type="text"
                                value={genre.slug}
                                disabled
                            />

                            <p className="text-xs text-muted-foreground">
                                Slug dibuat otomatis oleh
                                sistem berdasarkan nama
                                genre.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
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
                                        'admin.genres.index',
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
