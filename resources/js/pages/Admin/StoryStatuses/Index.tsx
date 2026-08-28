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

interface StoryStatus {
    id: number;
    name: string;
    slug: string;
}

interface StoryStatusPagination {
    data: StoryStatus[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface StoryStatusIndexProps {
    storyStatuses: StoryStatusPagination;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Story Status',
        href: '/admin/story-statuses',
    },
];

export default function StoryStatusIndex({
    storyStatuses,
}: StoryStatusIndexProps) {
    const [deleteStatus, setDeleteStatus] =
        useState<StoryStatus | null>(null);

    const handleDelete = () => {
        if (!deleteStatus) {
            return;
        }

        router.delete(
            route(
                'admin.story-statuses.destroy',
                deleteStatus.id,
            ),
            {
                preserveScroll: true,
                onFinish: () => {
                    setDeleteStatus(null);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Story Status" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Story Status
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola status cerita buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.story-statuses.create',
                            )}
                        >
                            <Plus className="mr-2 size-4" />
                            Tambah Status
                        </Link>
                    </Button>
                </div>

                {/* Table */}
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
                                {storyStatuses.data.length > 0 ? (
                                    storyStatuses.data.map(
                                        (status, index) => (
                                            <tr
                                                key={status.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {(storyStatuses.current_page -
                                                        1) *
                                                        storyStatuses.per_page +
                                                        index +
                                                        1}
                                                </td>

                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {status.name}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {status.slug}
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
                                                                    'admin.story-statuses.edit',
                                                                    status.id,
                                                                )}
                                                            >
                                                                <Pencil className="size-4" />
                                                                <span className="sr-only">
                                                                    Edits
                                                                </span>
                                                            </Link>
                                                        </Button>

                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() =>
                                                                setDeleteStatus(
                                                                    status,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="size-4" />
                                                            <span className="sr-only">
                                                                Hapus
                                                            </span>
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
                                            Belum ada status
                                            cerita.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {storyStatuses.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan{' '}
                            {storyStatuses.data.length}{' '}
                            dari {storyStatuses.total}{' '}
                            status.
                        </p>

                        <div className="flex gap-2">
                            {storyStatuses.current_page >
                                1 && (
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'admin.story-statuses.index',
                                            {
                                                page:
                                                    storyStatuses.current_page -
                                                    1,
                                            },
                                        )}
                                    >
                                        Sebelumnya
                                    </Link>
                                </Button>
                            )}

                            {storyStatuses.current_page <
                                storyStatuses.last_page && (
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'admin.story-statuses.index',
                                            {
                                                page:
                                                    storyStatuses.current_page +
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

            {/* Delete Confirmation */}
            <AlertDialog
                open={deleteStatus !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteStatus(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Story Status?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus
                            status{' '}
                            <strong>
                                {deleteStatus?.name}
                            </strong>
                            ? Tindakan ini tidak dapat
                            dibatalkan.
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