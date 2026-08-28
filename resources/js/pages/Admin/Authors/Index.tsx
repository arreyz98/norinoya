import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import {
    Head,
    Link,
    router,
} from '@inertiajs/react';

import {
    Pencil,
    Plus,
    Trash2,
} from 'lucide-react';

import { useState } from 'react';

import type { Author } from '@/types/author';
import type { PaginatedData } from '@/types/pagination';

import { Button } from '@/components/ui/button';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AuthorIndexProps {
    authors: PaginatedData<Author>;
}

export default function AuthorIndex({
    authors,
}: AuthorIndexProps) {
    const [deleteAuthor, setDeleteAuthor] =
        useState<Author | null>(null);

    const handleDelete = () => {
        if (!deleteAuthor) {
            return;
        }

        router.delete(
            route(
                'admin.authors.destroy',
                deleteAuthor.id
            ),
            {
                preserveScroll: true,

                onSuccess: () => {
                    setDeleteAuthor(null);
                },
            }
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Authors',
        href: '/admin/authors',
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Authors" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Authors
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola author buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.authors.create'
                            )}
                        >
                            <Plus className="mr-2 h-4 w-4" />

                            Tambah Author
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Nama Author
                                </TableHead>

                                <TableHead>
                                    Story
                                </TableHead>

                                <TableHead>
                                    Art
                                </TableHead>

                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {authors.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        Belum ada author.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                authors.data.map(
                                    (author) => (
                                        <TableRow
                                            key={author.id}
                                        >
                                            <TableCell className="font-medium">
                                                {author.name}
                                            </TableCell>

                                            <TableCell>
                                                {author.story_books_count ??
                                                    0}
                                            </TableCell>

                                            <TableCell>
                                                {author.art_books_count ??
                                                    0}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={route(
                                                                'admin.authors.edit',
                                                                author.id
                                                            )}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            setDeleteAuthor(
                                                                author
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>

                {authors.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {authors.links.map(
                            (link, index) => (
                                <Button
                                    key={`${link.label}-${index}`}
                                    variant={
                                        link.active
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => {
                                        if (
                                            link.url
                                        ) {
                                            router.get(
                                                link.url,
                                                {},
                                                {
                                                    preserveState:
                                                        true,
                                                    preserveScroll:
                                                        true,
                                                }
                                            );
                                        }
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )
                        )}
                    </div>
                )}
            </div>

            <AlertDialog
                open={Boolean(deleteAuthor)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteAuthor(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Author?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin
                            menghapus author{' '}
                            <strong>
                                {deleteAuthor?.name}
                            </strong>
                            ?
                            <br />
                            <br />
                            Author yang masih digunakan
                            oleh buku tidak dapat
                            dihapus.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleDelete}
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}