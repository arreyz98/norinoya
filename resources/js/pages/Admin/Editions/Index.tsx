import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { Edition } from '@/types/edition';

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

interface EditionIndexProps {
    editions: PaginatedData<Edition>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Editions',
        href: '/admin/editions',
    },
];

export default function EditionIndex({
    editions,
}: EditionIndexProps) {
    const [deleteEdition, setDeleteEdition] =
        useState<Edition | null>(null);

    const handleDelete = () => {
        if (!deleteEdition) {
            return;
        }

        router.delete(
            route(
                'admin.editions.destroy',
                deleteEdition.id,
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteEdition(null);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editions" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Editions
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola edisi buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.editions.create',
                            )}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Edisi
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Edisi
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
                            {editions.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        Belum ada edisi.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                editions.data.map((edition) => (
                                    <TableRow
                                        key={edition.id}
                                    >
                                        <TableCell className="font-medium">
                                            {edition.name}
                                        </TableCell>

                                        <TableCell className="text-muted-foreground">
                                            {edition.slug}
                                        </TableCell>

                                        <TableCell>
                                            {edition.books_count ??
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
                                                            'admin.editions.edit',
                                                            edition.id,
                                                        )}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        setDeleteEdition(
                                                            edition,
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
                open={Boolean(deleteEdition)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteEdition(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Edisi?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin
                            menghapus edisi{' '}
                            <strong>
                                {deleteEdition?.name}
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