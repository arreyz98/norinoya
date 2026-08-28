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

interface AffiliateStore {
    id: number;
    name: string;
    slug: string;
}

interface AffiliateStorePagination {
    data: AffiliateStore[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface AffiliateStoreIndexProps {
    affiliateStores: AffiliateStorePagination;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Affiliate Stores',
        href: '/admin/affiliate-stores',
    },
];

export default function AffiliateStoreIndex({
    affiliateStores,
}: AffiliateStoreIndexProps) {
    const [deleteStore, setDeleteStore] =
        useState<AffiliateStore | null>(null);

    const handleDelete = () => {
        if (!deleteStore) {
            return;
        }

        router.delete(
            route(
                'admin.affiliate-stores.destroy',
                deleteStore.id,
            ),
            {
                preserveScroll: true,

                onFinish: () => {
                    setDeleteStore(null);
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Affiliate Stores" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Affiliate Stores
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola toko untuk link affiliate
                            buku.
                        </p>
                    </div>

                    <Button asChild>
                        <Link
                            href={route(
                                'admin.affiliate-stores.create',
                            )}
                        >
                            <Plus className="mr-2 size-4" />
                            Tambah Store
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
                                        Nama Toko
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
                                {affiliateStores.data.length >
                                0 ? (
                                    affiliateStores.data.map(
                                        (store, index) => (
                                            <tr
                                                key={store.id}
                                                className="border-b last:border-0"
                                            >
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {(affiliateStores.current_page -
                                                        1) *
                                                        affiliateStores.per_page +
                                                        index +
                                                        1}
                                                </td>

                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {store.name}
                                                </td>

                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {store.slug}
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
                                                                    'admin.affiliate-stores.edit',
                                                                    store.id,
                                                                )}
                                                            >
                                                                <Pencil className="size-4" />
                                                            </Link>
                                                        </Button>

                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() =>
                                                                setDeleteStore(
                                                                    store,
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
                                            Belum ada affiliate
                                            store.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {affiliateStores.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan{' '}
                            {affiliateStores.data.length}{' '}
                            dari {affiliateStores.total}{' '}
                            store.
                        </p>

                        <div className="flex gap-2">
                            {affiliateStores.current_page >
                                1 && (
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'admin.affiliate-stores.index',
                                            {
                                                page:
                                                    affiliateStores.current_page -
                                                    1,
                                            },
                                        )}
                                    >
                                        Sebelumnya
                                    </Link>
                                </Button>
                            )}

                            {affiliateStores.current_page <
                                affiliateStores.last_page && (
                                <Button
                                    variant="outline"
                                    asChild
                                >
                                    <Link
                                        href={route(
                                            'admin.affiliate-stores.index',
                                            {
                                                page:
                                                    affiliateStores.current_page +
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

            {/* Delete Dialog */}
            <AlertDialog
                open={deleteStore !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteStore(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Hapus Affiliate Store?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus{' '}
                            <strong>
                                {deleteStore?.name}
                            </strong>
                            ?
                            <br />
                            Store yang masih digunakan oleh
                            affiliate link tidak dapat
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