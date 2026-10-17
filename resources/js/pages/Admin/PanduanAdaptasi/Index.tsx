import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUp,
    BookOpen,
    Copy,
    Eye,
    GitBranch,
    Network,
    Pencil,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import type { PanduanAdaptasi } from '@/types/panduanAdaptasi';
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

interface PanduanAdaptasiIndexProps {
    panduanAdaptasiList: PaginatedData<PanduanAdaptasi>;
    totalPanduan: number;
    totalNodes: number;
}

const formatPaginationLabel = (label: string) =>
    label
        .replace(/&laquo;|&raquo;/g, '')
        .replace('pagination.previous', 'Sebelumnya')
        .replace('pagination.next', 'Berikutnya')
        .trim();

type SortMode = 'latest' | 'oldest';

export default function PanduanAdaptasiIndex({
    panduanAdaptasiList,
    totalPanduan,
    totalNodes,
}: PanduanAdaptasiIndexProps) {
    const [deleteItem, setDeleteItem] = useState<PanduanAdaptasi | null>(null);
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState<SortMode>('latest');
    const searchRef = useRef<HTMLInputElement>(null);

    const handleDelete = () => {
        if (!deleteItem) {
            return;
        }

        router.delete(route('admin.panduan-adaptasi.destroy', deleteItem.id), {
            preserveScroll: true,
            onSuccess: () => setDeleteItem(null),
        });
    };

    // Filter + sort hanya menyaring halaman aktif (client-side).
    const filtered = panduanAdaptasiList.data
        .filter((item) => {
            const q = query.toLowerCase().trim();

            return (
                !q ||
                item.title.toLowerCase().includes(q) ||
                item.slug.toLowerCase().includes(q)
            );
        })
        .sort((a, b) => (sort === 'oldest' ? b.id - a.id : a.id - b.id));

    // Shortcut ⌘K / Ctrl+K untuk fokus ke search.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };

        window.addEventListener('keydown', onKey);

        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const copySlug = (slug: string) => {
        navigator.clipboard?.writeText(slug);
        toast.success('Slug disalin', { description: slug });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Panduan Adaptasi', href: '/admin/panduan-adaptasi' },
    ];

    const hasData = panduanAdaptasiList.data.length > 0;
    const isEmptyResult = hasData && filtered.length === 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Panduan Adaptasi" />

            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6 dark:bg-[#07080b]">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-neutral-900 dark:font-extrabold dark:text-white">
                            <GitBranch className="h-6 w-6 text-[#112A12] dark:text-emerald-400" />
                            Panduan Adaptasi
                        </h1>

                        <p className="mt-0.5 text-xs text-neutral-500 dark:text-slate-400">
                            Kelola panduan nonton bertahap &amp; korelasi bab.
                        </p>
                    </div>

                    <Button
                        asChild
                        className="flex h-9 items-center gap-1.5 rounded-lg border border-transparent bg-[#112A12] px-4 text-xs font-bold text-white hover:bg-[#0c1e0d] dark:border-[#235325] dark:text-[#E2F8E3] dark:hover:bg-[#1a3d1b]"
                    >
                        <Link href={route('admin.panduan-adaptasi.create')}>
                            <Plus className="h-4 w-4" />
                            Tambah Panduan
                        </Link>
                    </Button>
                </div>

                {/* Stat cards */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-[#0b0c13]/90">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-slate-400">
                                    Total Panduan Terdaftar
                                </p>

                                <p className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                                    {totalPanduan} Seri
                                </p>

                                <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-slate-500">
                                    Semua aktif di platform
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#235325] bg-[#112A12] text-[#E2F8E3] shadow-inner">
                                <BookOpen className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-[#0b0c13]/90">
                        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald-600/5 blur-xl transition-colors group-hover:bg-emerald-600/10" />

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-slate-400">
                                    Jumlah Node Total
                                </p>

                                <p className="mt-1 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                                    {totalNodes} Node
                                </p>

                                <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-slate-500">
                                    Terhubung ke korelasi bab
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 shadow-inner">
                                <Network className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search + sort bar */}
                <div className="flex flex-col items-stretch justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-2.5 shadow-sm lg:flex-row lg:items-center dark:border-slate-800/80 dark:bg-[#0d0f17]/80">
                    <div className="relative w-full sm:max-w-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 dark:text-slate-500">
                            <Search className="h-[18px] w-[18px]" />
                        </div>

                        <input
                            ref={searchRef}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Cari judul atau slug..."
                            className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-14 text-xs text-neutral-900 placeholder-neutral-400 focus:border-[#2e6d30] focus:outline-none focus:ring-1 focus:ring-[#2e6d30] dark:border-slate-800 dark:bg-[#121522] dark:text-slate-200 dark:placeholder-slate-500 sm:text-sm"
                        />

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                            <kbd className="hidden rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 shadow-inner sm:inline-block dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-slate-400">
                                ⌘K
                            </kbd>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-neutral-200 pt-2 text-xs text-neutral-500 lg:justify-end lg:border-t-0 lg:pt-0 dark:border-slate-800/60 dark:text-slate-400">
                        <div className="inline-flex items-center rounded-lg border border-neutral-300 bg-neutral-100 p-0.5 text-xs dark:border-slate-800 dark:bg-[#121522]">
                            <button
                                type="button"
                                onClick={() => setSort('latest')}
                                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                                    sort === 'latest'
                                        ? 'border border-[#235325] bg-[#112A12] text-[#E2F8E3] shadow-sm'
                                        : 'text-neutral-500 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <ArrowDown className="h-[13px] w-[13px]" />
                                Terbaru
                            </button>

                            <button
                                type="button"
                                onClick={() => setSort('oldest')}
                                className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                                    sort === 'oldest'
                                        ? 'border border-[#235325] bg-[#112A12] text-[#E2F8E3] shadow-sm'
                                        : 'text-neutral-500 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white'
                                }`}
                            >
                                <ArrowUp className="h-[13px] w-[13px]" />
                                Terlama
                            </button>
                        </div>

                        <span className="flex items-center gap-1 text-[11px] dark:text-slate-400">
                            Menampilkan <strong className="font-semibold text-neutral-700 dark:text-slate-200">{filtered.length}</strong> data
                        </span>
                    </div>
                </div>

                {/* Table card */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xs dark:border-slate-800/90 dark:bg-[#0b0c13]">
                    <Table>
                        <TableHeader className="bg-[#112A12] text-white dark:bg-[#0f111a]/95 dark:text-slate-400">
                            <TableRow className="border-b border-[#112A12] hover:bg-transparent dark:border-slate-800/90">
                                <TableHead className="w-12 text-center text-[11px] font-semibold uppercase tracking-wider text-white dark:text-slate-400">#</TableHead>
                                <TableHead className="min-w-[260px] px-6 text-[11px] font-semibold uppercase tracking-wider text-white dark:text-slate-400">Judul</TableHead>
                                <TableHead className="min-w-[220px] px-6 text-[11px] font-semibold uppercase tracking-wider text-white dark:text-slate-400">Slug</TableHead>
                                <TableHead className="min-w-[150px] px-6 text-[11px] font-semibold uppercase tracking-wider text-white dark:text-slate-400">Jumlah Node</TableHead>
                                <TableHead className="w-[150px] px-6 text-right text-[11px] font-semibold uppercase tracking-wider text-white dark:text-slate-400">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-neutral-200 text-sm dark:divide-slate-800/60">
                            {!hasData ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                                <GitBranch className="size-5 text-muted-foreground" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                    Belum ada panduan adaptasi
                                                </p>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Buat panduan nonton bertahap pertama Anda.
                                                </p>
                                            </div>

                                            <Button size="sm" asChild>
                                                <Link href={route('admin.panduan-adaptasi.create')}>
                                                    <Plus className="mr-2 size-4" />
                                                    Tambah Panduan
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : isEmptyResult ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                Tidak ada hasil
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                Tidak ditemukan panduan untuk &quot;{query}&quot;.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        data-title={item.title}
                                        data-slug={item.slug}
                                        className="hover:bg-neutral-50/70 dark:hover:bg-[#13171f]/60"
                                    >
                                        <TableCell className="px-4 text-center font-mono text-[12px] font-medium text-neutral-400 dark:text-slate-400">
                                            {String(index + 1).padStart(2, '0')}
                                        </TableCell>

                                        <TableCell className="px-6 font-bold text-neutral-900 dark:text-white">
                                            {item.title}
                                        </TableCell>

                                        <TableCell className="px-6">
                                            <div className="inline-flex items-center gap-1.5 rounded border border-neutral-200 bg-neutral-100 px-2.5 py-1 font-mono text-[11px] text-neutral-600 dark:border-slate-800 dark:bg-[#131622] dark:text-white">
                                                <span className="font-normal text-neutral-400 dark:text-slate-400">/</span>
                                                {item.slug}

                                                <button
                                                    type="button"
                                                    onClick={() => copySlug(item.slug)}
                                                    title="Salin slug"
                                                    className="ml-0.5 rounded p-0.5 text-neutral-400 opacity-0 transition-opacity hover:text-neutral-900 group-hover:opacity-100 dark:text-slate-400 dark:hover:text-white"
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6">
                                            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#112A12]/20 bg-[#112A12]/10 px-2.5 py-0.5 text-xs font-semibold text-[#112A12] dark:border-[#235325] dark:bg-[#112A12] dark:text-[#E2F8E3]">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
                                                {item.nodes_count ?? 0} Node
                                            </div>
                                        </TableCell>

                                        <TableCell className="px-6 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                    title="Lihat Panduan"
                                                    aria-label={`Lihat ${item.title}`}
                                                    className="text-neutral-600 hover:text-neutral-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                                >
                                                    <a
                                                        href={route('panduan-adaptasi.detail', item.slug)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </a>
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                    title="Edit Panduan"
                                                    aria-label={`Edit ${item.title}`}
                                                    className="text-neutral-600 hover:text-neutral-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                                >
                                                    <Link
                                                        href={route('admin.panduan-adaptasi.edit', item.id)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Hapus Panduan"
                                                    aria-label={`Hapus ${item.title}`}
                                                    onClick={() => setDeleteItem(item)}
                                                    className="text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {panduanAdaptasiList.last_page > 1 && (
                    <div className="flex flex-col gap-4 pt-2 lg:flex-row lg:items-center lg:justify-between">
                        <span className="text-xs text-neutral-500 dark:text-slate-400">
                            Halaman {panduanAdaptasiList.current_page} dari {panduanAdaptasiList.last_page}
                        </span>

                        <div className="flex flex-wrap gap-1">
                            {panduanAdaptasiList.links.map((link, index) => {
                                const label = formatPaginationLabel(link.label);

                                return (
                                    <Button
                                        key={`${link.label}-${index}`}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url) {
                                                router.get(link.url, {}, {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                });
                                            }
                                        }}
                                        className={
                                            link.active
                                                ? 'border-[#235325] bg-[#112A12] text-[#E2F8E3] hover:bg-[#0c1e0d] dark:hover:bg-[#1a3d1b]'
                                                : ''
                                        }
                                    >
                                        {label}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <AlertDialog
                open={Boolean(deleteItem)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteItem(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Panduan Adaptasi?</AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus panduan{' '}
                            <strong>{deleteItem?.title}</strong>?
                            <br />
                            <br />
                            Seluruh node timeline dan link di dalamnya ikut terhapus.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>

                        <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
