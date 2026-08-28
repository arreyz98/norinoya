import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import AuthorForm from './components/AuthorForm';

import { Button } from '@/components/ui/button';

import type { Author } from '@/types/author';

interface EditAuthorProps {
    author: Author;
}

export default function EditAuthor({
    author,
}: EditAuthorProps) {
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
        title: 'Edit Author',
        href: `/admin/authors/${author.id}/edit`,
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${author.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Edit Author
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Perbarui informasi author.
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
                        submitLabel="Simpan Perubahan"
                        initialValues={{
                            name: author.name,
                            biography:
                                author.biography ?? '',
                        }}
                        onSubmit={(form) => {
                            form.put(
                                route(
                                    'admin.authors.update',
                                    author.id
                                )
                            );
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
}