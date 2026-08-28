import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Store, Search } from 'lucide-react';
import React, { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

export interface KiosPartnerData {
    id: number;
    name: string;
    slug: string;
    logo_url?: string | null;
    description?: string | null;
    kios_items_count?: number;
    created_at?: string;
    updated_at?: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface KiosPartnersIndexProps {
    partners: PaginatedData<KiosPartnerData>;
    filters?: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Toko Partner Kios',
        href: '/admin/kios-partners',
    },
];

export default function KiosPartnersIndex({ partners, filters = {} }: KiosPartnersIndexProps) {
    const [deletePartner, setDeletePartner] = useState<KiosPartnerData | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.kios-partners.index'), {
            search: searchTerm,
        }, { preserveState: true });
    };

    const handleDelete = () => {
        if (!deletePartner) return;

        router.delete(route('admin.kios-partners.destroy', deletePartner.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeletePartner(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Toko Partner Kios" />

            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                            <Store className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            <span>Toko Partner Kios</span>
                        </h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Kelola daftar toko partner/penjual resmi yang akan muncul pada dropdown pilihan di CRUD Kios.
                        </p>
                    </div>

                    <Link href={route('admin.kios-partners.create')}>
                        <Button className="bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg">
                            <Plus className="w-4 h-4" />
                            <span>Tambah Toko Partner</span>
                        </Button>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Cari nama partner..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 h-9 text-xs"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>
                </div>

                {/* Table Data */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs">
                    <Table>
                        <TableHeader className="bg-neutral-50 dark:bg-neutral-850">
                            <TableRow>
                                <TableHead className="w-16 text-center text-xs font-bold">Logo</TableHead>
                                <TableHead className="text-xs font-bold">Nama Toko Partner</TableHead>
                                <TableHead className="text-xs font-bold">Slug Identifier</TableHead>
                                <TableHead className="text-xs font-bold">Deskripsi</TableHead>
                                <TableHead className="text-xs font-bold text-center">Jumlah Produk</TableHead>
                                <TableHead className="text-right text-xs font-bold w-24">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {partners.data.length > 0 ? (
                                partners.data.map((partner) => (
                                    <TableRow key={partner.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40">
                                        <TableCell className="p-2 text-center">
                                            {partner.logo_url ? (
                                                <img
                                                    src={partner.logo_url}
                                                    alt={partner.name}
                                                    className="w-10 h-10 object-contain rounded-lg mx-auto border border-neutral-200 dark:border-neutral-700 bg-white p-1"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg mx-auto flex items-center justify-center text-neutral-400">
                                                    <Store className="w-4 h-4" />
                                                </div>
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100">
                                                {partner.name}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                                                {partner.slug}
                                            </span>
                                        </TableCell>

                                        <TableCell className="max-w-[280px]">
                                            <span className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                                                {partner.description || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            <span className="text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                                                {partner.kios_items_count || 0} item
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link href={route('admin.kios-partners.edit', partner.id)}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40"
                                                    onClick={() => setDeletePartner(partner)}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-xs text-neutral-500">
                                        Belum ada toko partner kios yang ditambahkan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {partners.last_page > 1 && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                        <span>Halaman {partners.current_page} dari {partners.last_page} ({partners.total} total partner)</span>
                        <div className="flex gap-1">
                            {partners.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${
                                        link.active
                                            ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900'
                                            : !link.url
                                            ? 'opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800'
                                            : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Dialog Konfirmasi Hapus */}
            <AlertDialog
                open={!!deletePartner}
                onOpenChange={(open) => !open && setDeletePartner(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Toko Partner?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus toko partner{' '}
                            <span className="font-semibold text-neutral-900 dark:text-white">
                                "{deletePartner?.name}"
                            </span>
                            ? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
