import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Genre } from '@/types/genre';

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

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface GenreIndexProps {
    genres: PaginatedData<Genre>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Genres',
        href: '/admin/genres',
    },
];

export default function GenreIndex({
    genres,
}: GenreIndexProps) {
    const [deleteGenre, setDeleteGenre] =
        useState<Genre | null>(null);

    const handleDelete = () => {
        if (!deleteGenre) {
            return;
        }

        router.delete(
            route(
                'admin.genres.destroy',
                deleteGenre.id,
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteGenre(null);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Genres" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Genres
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola genre buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.genres.create',
                            )}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Genre
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Genre
                                </TableHead>

                                <TableHead>
                                    Slug
                                </TableHead>

                                <TableHead>
                                    Jumlah Buku
                                </TableHead>

                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {genres.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        Belum ada genre.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                genres.data.map((genre) => (
                                    <TableRow
                                        key={genre.id}
                                    >
                                        <TableCell className="font-medium">
                                            {genre.name}
                                        </TableCell>

                                        <TableCell className="text-muted-foreground">
                                            {genre.slug}
                                        </TableCell>

                                        <TableCell>
                                            {genre.books_count ??
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
                                                            'admin.genres.edit',
                                                            genre.id,
                                                        )}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        setDeleteGenre(
                                                            genre,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog
                open={Boolean(deleteGenre)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteGenre(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Genre?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin
                            menghapus genre{' '}
                            <strong>
                                {deleteGenre?.name}
                            </strong>
                            ?
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