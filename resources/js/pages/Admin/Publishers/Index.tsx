import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
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

interface Publisher {
    id: number;
    name: string;
    slug: string;
}

interface PublisherPagination {
    data: Publisher[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface PublisherIndexProps {
    publishers: PublisherPagination;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Publishers',
        href: '/admin/publishers',
    },
];

export default function PublisherIndex({
    publishers,
}: PublisherIndexProps) {
    const [deletePublisher, setDeletePublisher] =
        useState<Publisher | null>(null);

    const handleDelete = () => {
        if (!deletePublisher) {
            return;
        }

        router.delete(
            route(
                'admin.publishers.destroy',
                deletePublisher.id,
            ),
            {
                preserveScroll: true,
                onFinish: () => {
                    setDeletePublisher(null);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Publishers" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Publishers
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola penerbit buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.publishers.create',
                            )}
                        >
                            <Plus className="mr-2 size-4" />
                            Tambah Publisher
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        #
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Nama
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Slug
                                    </th>

                                    <th className="px-4 py-3 text-right text-sm font-medium">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {publishers.data.length > 0 ? (
                                    publishers.data.map(
                                        (publisher, index) => (
                                            <tr
                                                key={publisher.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {(publishers.current_page -
                                                        1) *
                                                        publishers.per_page +
                                                        index +
                                                        1}
                                                </td>

                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {publisher.name}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {publisher.slug}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={route(
                                                                    'admin.publishers.edit',
                                                                    publisher.id,
                                                                )}
                                                            >
                                                                <Pencil className="size-4" />
                                                            </Link>
                                                        </Button>

                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() =>
                                                                setDeletePublisher(
                                                                    publisher,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-10 text-center text-sm text-muted-foreground"
                                        >
                                            Belum ada publisher.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {publishers.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan{' '}
                            {publishers.data.length} dari{' '}
                            {publishers.total} publisher.
                        </p>

                        <div className="flex gap-2">
                            {publishers.current_page > 1 && (
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'admin.publishers.index',
                                            {
                                                page:
                                                    publishers.current_page -
                                                    1,
                                            },
                                        )}
                                    >
                                        Sebelumnya
                                    </Link>
                                </Button>
                            )}

                            {publishers.current_page <
                                publishers.last_page && (
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'admin.publishers.index',
                                            {
                                                page:
                                                    publishers.current_page +
                                                    1,
                                            },
                                        )}
                                    >
                                        Berikutnya
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <AlertDialog
                open={deletePublisher !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletePublisher(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Publisher?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus{' '}
                            <strong>
                                {deletePublisher?.name}
                            </strong>
                            ?
                            <br />
                            Publisher yang masih digunakan
                            oleh buku tidak dapat dihapus.
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