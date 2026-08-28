import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Store, ShoppingBag, Search, Eye, MousePointerClick, History, SearchCode } from 'lucide-react';
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

export interface KiosItemData {
    id: number;
    title: string;
    comic_title?: string | null;
    vol_number?: number;
    category: string;
    categories?: string[] | null;
    cover_image?: string | null;
    carousel_images?: string[] | null;
    carousel_labels?: string[] | null;
    deskripsi_produk?: string | null;
    synopsis?: string | null;
    notes?: string | null;
    price: number | string;
    original_price?: number | string | null;
    condition_rating?: string;
    is_preloved?: boolean;
    is_sold_out?: boolean;
    rating?: number;
    genres?: string[] | null;
    publisher_name?: string | null;
    publisher_id?: string | null;
    author?: string | null;
    reading_rating?: string | null;
    status?: string | null;
    demographic?: string | null;
    isbn?: string | null;
    release_date?: string | null;
    cetakan_info?: string | null;
    shopee_url?: string | null;
    tokopedia_url?: string | null;
    gramedia_url?: string | null;
    toco_url?: string | null;
    linked_book_id?: number | null;
    views_count?: number;
    shopee_clicks_count?: number;
    tokopedia_clicks_count?: number;
    gramedia_clicks_count?: number;
    toco_clicks_count?: number;
    total_clicks_count?: number;
    created_at?: string;
    updated_at?: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface KiosIndexProps {
    kiosItems: PaginatedData<KiosItemData>;
    filters?: {
        search?: string;
        category?: string;
        type?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Kios & Preloved',
        href: '/admin/kios',
    },
];

export default function KiosIndex({ kiosItems, filters = {} }: KiosIndexProps) {
    const [deleteItem, setDeleteItem] = useState<KiosItemData | null>(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('admin.kios.index'), {
            search: searchTerm,
            category: filters.category,
            type: filters.type,
        }, { preserveState: true });
    };

    const handleFilterType = (type: string) => {
        router.get(route('admin.kios.index'), {
            search: searchTerm,
            category: filters.category,
            type: type === 'all' ? undefined : type,
        }, { preserveState: true });
    };

    const handleDelete = () => {
        if (!deleteItem) return;

        router.delete(route('admin.kios.destroy', deleteItem.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteItem(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kios & Preloved Items" />

            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6">
                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                            <Store className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            <span>Kios &amp; Preloved Merchandise</span>
                        </h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Kelola koleksi preloved buku, merchandise partner, apparel, trading card, dan link affiliate official.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href={route('admin.kios.search-logs')}>
                            <Button variant="outline" className="border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                <SearchCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Keyword Logs</span>
                            </Button>
                        </Link>

                        <Link href={route('admin.kios.logs')}>
                            <Button variant="outline" className="border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Lihat Logs</span>
                            </Button>
                        </Link>

                        <Link href={route('admin.kios.create')}>
                            <Button className="bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg">
                                <Plus className="w-4 h-4" />
                                <span>Tambah Item Kios</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Cari judul, komik, brand partner..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 h-9 text-xs"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                        <button
                            type="button"
                            onClick={() => handleFilterType('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                !filters.type || filters.type === 'all'
                                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                            }`}
                        >
                            Semua ({kiosItems.total})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFilterType('preloved')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                filters.type === 'preloved'
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 hover:bg-pink-100'
                            }`}
                        >
                            Preloved / Review
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFilterType('partner')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                                filters.type === 'partner'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                            }`}
                        >
                            Merch Partner
                        </button>
                    </div>
                </div>

                {/* Table Data */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs">
                    <Table>
                        <TableHeader className="bg-[#112A12] text-white">
                            <TableRow className="border-b border-[#112A12] hover:bg-transparent">
                                <TableHead className="w-16 text-center text-xs font-bold text-white">Cover</TableHead>
                                <TableHead className="text-xs font-bold text-white">Produk / Judul</TableHead>
                                <TableHead className="text-xs font-bold text-white">Tipe &amp; Kategori</TableHead>
                                <TableHead className="text-xs font-bold text-white">Partner / Toko</TableHead>
                                <TableHead className="text-xs font-bold text-white">Harga</TableHead>
                                <TableHead className="text-xs font-bold text-white">Kondisi / Status</TableHead>
                                <TableHead className="text-xs font-bold text-center text-white">Views</TableHead>
                                <TableHead className="text-xs font-bold text-center text-white">Klik Link Beli</TableHead>
                                <TableHead className="text-xs font-bold text-center text-white">Link Marketplace</TableHead>
                                <TableHead className="text-right text-xs font-bold w-24 text-white">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kiosItems.data.length > 0 ? (
                                kiosItems.data.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40">
                                        {/* Cover */}
                                        <TableCell className="p-2 text-center">
                                            {item.cover_image ? (
                                                <img
                                                    src={item.cover_image}
                                                    alt={item.title}
                                                    className="w-11 h-14 object-cover rounded-md mx-auto border border-neutral-200 dark:border-neutral-700 shadow-2xs"
                                                />
                                            ) : (
                                                <div className="w-11 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-md mx-auto flex items-center justify-center text-neutral-400">
                                                    <ShoppingBag className="w-4 h-4" />
                                                </div>
                                            )}
                                        </TableCell>

                                        {/* Title & Author info */}
                                        <TableCell className="max-w-[240px]">
                                            <div className="space-y-0.5">
                                                <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 line-clamp-1">
                                                    {item.title}
                                                </div>
                                                {item.author && (
                                                    <div className="text-[10px] font-mono text-neutral-400">
                                                        Oleh: {item.author}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Type & Categories */}
                                        <TableCell>
                                            <div className="flex flex-col items-start gap-1">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                                    item.is_preloved
                                                        ? 'bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300'
                                                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                                }`}>
                                                    {item.is_preloved ? 'PRELOVED' : 'PARTNER MERCH'}
                                                </span>
                                                <div className="flex flex-wrap gap-1">
                                                    {Array.isArray(item.categories) && item.categories.length > 0 ? (
                                                        item.categories.map((c: string, i: number) => (
                                                            <span key={i} className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-1.5 py-0.2 rounded capitalize">
                                                                {c.replace('_', ' ')}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-[11px] font-mono text-neutral-500 capitalize">
                                                            {item.category?.replace('_', ' ') || 'manga'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Partner / Publisher */}
                                        <TableCell>
                                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                                {item.publisher_name || '-'}
                                            </span>
                                        </TableCell>

                                        {/* Price */}
                                        <TableCell>
                                            <div className="space-y-0.5">
                                                <span className="text-xs font-mono font-extrabold text-neutral-900 dark:text-white">
                                                    Rp {Number(item.price).toLocaleString('id-ID')}
                                                </span>
                                                {item.original_price && Number(item.original_price) > 0 && (
                                                    <div className="text-[10px] font-mono text-neutral-400 line-through">
                                                        Rp {Number(item.original_price).toLocaleString('id-ID')}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Condition / Stock Status */}
                                        <TableCell>
                                            <div className="flex flex-col items-start gap-1">
                                                {item.is_preloved ? (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                                                        Grade: {item.condition_rating || 'S'}
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-mono text-neutral-400">
                                                        Kondisi Baru
                                                    </span>
                                                )}
                                                {item.reading_rating && (
                                                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                                                        {item.reading_rating}
                                                    </span>
                                                )}
                                                {item.is_sold_out ? (
                                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300">
                                                        HABIS
                                                    </span>
                                                ) : (
                                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                        TERSEDIA
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Views */}
                                        <TableCell className="text-center">
                                            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                                                <Eye className="w-3.5 h-3.5 text-neutral-400" />
                                                <span>{(item.views_count ?? 0).toLocaleString('id-ID')}</span>
                                            </span>
                                        </TableCell>

                                        {/* Clicks (Total + Breakdown) */}
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                                                    <MousePointerClick className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                                    <span>{(item.total_clicks_count ?? 0).toLocaleString('id-ID')} klik</span>
                                                </span>
                                                {/* Breakdown by platform if any clicks exist */}
                                                {(Number(item.total_clicks_count) > 0 || item.shopee_clicks_count || item.tokopedia_clicks_count || item.gramedia_clicks_count || item.toco_clicks_count) && (
                                                    <div className="flex items-center gap-1 text-[9px] font-mono font-semibold text-neutral-500 dark:text-neutral-400 flex-wrap justify-center">
                                                        {Number(item.shopee_clicks_count) > 0 && (
                                                            <span className="text-[#EE4D2D]" title="Shopee clicks">
                                                                S: {item.shopee_clicks_count}
                                                            </span>
                                                        )}
                                                        {Number(item.tokopedia_clicks_count) > 0 && (
                                                            <span className="text-[#03AC0E]" title="Tokopedia clicks">
                                                                T: {item.tokopedia_clicks_count}
                                                            </span>
                                                        )}
                                                        {Number(item.gramedia_clicks_count) > 0 && (
                                                            <span className="text-[#00519E]" title="Gramedia clicks">
                                                                G: {item.gramedia_clicks_count}
                                                            </span>
                                                        )}
                                                        {Number(item.toco_clicks_count) > 0 && (
                                                            <span className="text-amber-600 dark:text-amber-400" title="Toco clicks">
                                                                Tc: {item.toco_clicks_count}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Marketplace Links */}
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                {item.shopee_url && (
                                                    <a
                                                        href={item.shopee_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-6 h-6 rounded bg-[#EE4D2D] text-white flex items-center justify-center text-[10px] font-bold"
                                                        title="Buka Link Shopee"
                                                    >
                                                        S
                                                    </a>
                                                )}
                                                {item.tokopedia_url && (
                                                    <a
                                                        href={item.tokopedia_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-6 h-6 rounded bg-[#03AC0E] text-white flex items-center justify-center text-[10px] font-bold"
                                                        title="Buka Link Tokopedia"
                                                    >
                                                        T
                                                    </a>
                                                )}
                                                {item.gramedia_url && (
                                                    <a
                                                        href={item.gramedia_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-6 h-6 rounded bg-[#00519E] text-white flex items-center justify-center text-[10px] font-bold"
                                                        title="Buka Link Gramedia"
                                                    >
                                                        G
                                                    </a>
                                                )}
                                                {item.toco_url && (
                                                    <a
                                                        href={item.toco_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-6 h-6 rounded bg-[#FFD400] text-neutral-950 flex items-center justify-center text-[10px] font-black shadow-2xs"
                                                        title="Buka Link Toco"
                                                    >
                                                        Tc
                                                    </a>
                                                )}
                                                {!item.shopee_url && !item.tokopedia_url && !item.gramedia_url && !item.toco_url && (
                                                    <span className="text-[11px] text-neutral-400">-</span>
                                                )}
                                            </div>
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link href={route('admin.kios.edit', item.id)}>
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
                                                    onClick={() => setDeleteItem(item)}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={10} className="h-32 text-center text-xs text-neutral-500">
                                        Belum ada item kios yang ditambahkan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {kiosItems.last_page > 1 && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                        <span>Halaman {kiosItems.current_page} dari {kiosItems.last_page} ({kiosItems.total} total item)</span>
                        <div className="flex gap-1">
                            {kiosItems.links.map((link, idx) => {
                                const cleanLabel = link.label
                                    .replace('pagination.previous', 'Previous')
                                    .replace('pagination.next', 'Next');

                                return (
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
                                        dangerouslySetInnerHTML={{ __html: cleanLabel }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Dialog Konfirmasi Hapus */}
            <AlertDialog
                open={!!deleteItem}
                onOpenChange={(open) => !open && setDeleteItem(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Item Kios?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus item{' '}
                            <span className="font-semibold text-neutral-900 dark:text-white">
                                "{deleteItem?.title}"
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
