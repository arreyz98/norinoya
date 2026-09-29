import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2, Newspaper, Pin, Search, ArrowUpDown, Eye, History, SearchCode } from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import type { NewsItem } from '@/types/news';

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
import { toast } from 'sonner';

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

interface NewsIndexProps {
    news: PaginatedData<NewsItem>;
    filters?: {
        search?: string;
        category?: string;
        sort?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Berita & Feeds',
        href: '/admin/news',
    },
];

export default function NewsIndex({ news, filters: rawFilters }: NewsIndexProps) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [deleteNewsItem, setDeleteNewsItem] = useState<NewsItem | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || 'all');
    const [sort, setSort] = useState(filters.sort || 'latest');

    const handleApplyFilters = (newParams?: {
        search?: string;
        category?: string;
        sort?: string;
    }) => {
        const payload: Record<string, string> = {
            search: newParams?.search !== undefined ? newParams.search : search,
            category: newParams?.category !== undefined ? newParams.category : category,
            sort: newParams?.sort !== undefined ? newParams.sort : sort,
        };

        if (!payload.search) delete payload.search;
        if (!payload.category || payload.category === 'all') delete payload.category;

        router.get(route('admin.news.index'), payload, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleApplyFilters();
    };

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
        handleApplyFilters({ category: newCategory });
    };

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        handleApplyFilters({ sort: newSort });
    };

    const handleDelete = () => {
        if (!deleteNewsItem) return;

        const newsTitle = deleteNewsItem.title;

        router.delete(route('admin.news.destroy', deleteNewsItem.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Berita "${newsTitle}" sudah terhapus`);
                setDeleteNewsItem(null);
            },
            onError: () => {
                toast.error('Gagal menghapus berita');
            },
            onFinish: () => {
                setDeleteNewsItem(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita & Feeds" />

            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6">
                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                            <Newspaper className="w-6 h-6 text-[#112A12] dark:text-emerald-400" />
                            <span>Berita &amp; Feeds</span>
                        </h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Kelola publikasi berita, pengumuman, dan artikel komunitas Norinoya.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href={route('admin.news.search-logs')}>
                            <Button variant="outline" className="border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                <SearchCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Keyword Logs</span>
                            </Button>
                        </Link>

                        <Link href={route('admin.news.logs')}>
                            <Button variant="outline" className="border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
                                <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Lihat Logs</span>
                            </Button>
                        </Link>

                        <Link href={route('admin.news.create')}>
                            <Button className="bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg">
                                <Plus className="w-4 h-4" />
                                <span>Tambah Berita</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Cari judul berita atau konten..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-9 text-xs"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>

                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        {/* Category Filter */}
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="h-9 px-3 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                            >
                                <option value="all">Semua Kategori</option>
                                <option value="rilisan">Rilisan</option>
                                <option value="event">Event</option>
                                <option value="berita">Berita</option>
                                <option value="pengumuman">Pengumuman</option>
                                <option value="komunitas">Komunitas</option>
                                <option value="ulasan">Ulasan</option>
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div className="relative">
                            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                            <select
                                value={sort}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="h-9 pl-8 pr-7 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer appearance-none"
                            >
                                <option value="latest">Terbaru</option>
                                <option value="oldest">Terlama</option>
                            </select>
                        </div>

                        {(search || category !== 'all' || sort !== 'latest') && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearch('');
                                    setCategory('all');
                                    setSort('latest');
                                    router.get(route('admin.news.index'), {}, { preserveScroll: true });
                                }}
                                className="h-9 text-xs font-bold"
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table Data */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs">
                    <Table>
                        <TableHeader className="bg-[#112A12] text-white">
                            <TableRow className="border-b border-[#112A12] hover:bg-transparent">
                                <TableHead className="text-xs font-bold text-white">Judul Berita</TableHead>
                                <TableHead className="text-xs font-bold text-white">Kategori</TableHead>
                                <TableHead className="text-xs font-bold text-white">Penulis</TableHead>
                                <TableHead className="text-xs font-bold text-white">Status Pin</TableHead>
                                <TableHead className="text-center text-xs font-bold text-white">Views</TableHead>
                                <TableHead className="text-xs font-bold text-white">Tanggal Publikasi</TableHead>
                                <TableHead className="w-[100px] text-right text-xs font-bold text-white">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {news.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                        Belum ada berita. Klik tombol Tambah Berita untuk memublikasikan postingan baru.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                news.data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium max-w-md truncate">
                                            {item.title}
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-800 uppercase">
                                                {item.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            @{item.username} ({item.display_name})
                                        </TableCell>
                                        <TableCell>
                                            {item.is_pinned ? (
                                                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                                                    <Pin className="w-3 h-3 fill-current" />
                                                    Disematkan
                                                </span>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                                                <Eye className="w-3.5 h-3.5 text-neutral-400" />
                                                <span>{(item.views_count ?? 0).toLocaleString('id-ID')}</span>
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground">
                                            {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button variant="ghost" size="icon" asChild title="Lihat Tampilan User">
                                                    <a
                                                        href={route('news.detail', item.slug || item.id)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                                <Button variant="ghost" size="icon" asChild title="Edit Berita">
                                                    <Link href={route('admin.news.edit', item.id)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Hapus Berita"
                                                    onClick={() => setDeleteNewsItem(item)}
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

                {/* Pagination */}
                {news.last_page > 1 && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                        <span>Halaman {news.current_page} dari {news.last_page}</span>
                        <div className="flex flex-wrap gap-1">
                            {news.links.map((link, idx) => {
                                const cleanLabel = link.label
                                    .replace('pagination.previous', 'Previous')
                                    .replace('pagination.next', 'Next');

                                if (!link.url) {
                                    return (
                                        <Button
                                            key={idx}
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="opacity-40 cursor-not-allowed text-xs font-mono"
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: cleanLabel }} />
                                        </Button>
                                    );
                                }

                                return (
                                    <Button
                                        key={idx}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        asChild
                                        className="text-xs font-mono"
                                    >
                                        <Link href={link.url} preserveScroll>
                                            <span dangerouslySetInnerHTML={{ __html: cleanLabel }} />
                                        </Link>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <AlertDialog open={!!deleteNewsItem} onOpenChange={() => setDeleteNewsItem(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Berita Ini?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Berita "{deleteNewsItem?.title}" akan dihapus secara permanen dari server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
