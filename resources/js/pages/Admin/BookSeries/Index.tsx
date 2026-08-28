import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { useState } from 'react';

import type { BookSeries } from '@/types/book-series';
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

interface BookSeriesIndexProps {
    series: PaginatedData<BookSeries>;
}

export default function BookSeriesIndex({
    series,
}: BookSeriesIndexProps) {
    const [deleteSeries, setDeleteSeries] =
        useState<BookSeries | null>(null);

    const handleDelete = () => {
        if (!deleteSeries) {
            return;
        }

        router.delete(
            route(
                'admin.book-series.destroy',
                deleteSeries.id
            ),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteSeries(null);
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
        title: 'Book Series',
        href: '/admin/book-series',
    },
];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Series" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Book Series
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola series buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.book-series.create'
                            )}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Series
                        </Link>
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Series
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
                            {series.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center"
                                    >
                                        Belum ada series.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                series.data.map(
                                    (item) => (
                                        <TableRow
                                            key={item.id}
                                        >
                                            <TableCell className="font-medium">
                                                {item.title}
                                            </TableCell>

                                            <TableCell className="text-muted-foreground">
                                                {item.slug}
                                            </TableCell>

                                            <TableCell>
                                                {item.books_count ??
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
                                                                'admin.book-series.edit',
                                                                item.id
                                                            )}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            setDeleteSeries(
                                                                item
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

                {/* Pagination */}
                {series.last_page > 1 && (
                    <div className="flex items-center justify-center gap-1">
                        {series.links.map(
                            (link, index) => (
                                <Button
                                    key={`${link.label}-${index}`}
                                    variant={
                                        link.active
                                            ? 'default'
                                            : 'outline'
                                    }
                                    size="sm"
                                    disabled={
                                        !link.url
                                    }
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

            {/* Delete Confirmation */}
            <AlertDialog
                open={Boolean(deleteSeries)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteSeries(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Series?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin
                            menghapus series{' '}
                            <strong>
                                {deleteSeries?.title}
                            </strong>
                            ?
                            <br />
                            <br />
                            Series yang masih memiliki
                            buku tidak dapat dihapus.
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