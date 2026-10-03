import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    BookOpen,
    Eye,
    History,
    Pencil,
    Plus,
    Search,
    SearchCode,
    Trash2,
} from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { toast } from 'sonner';

import FilterCombobox from '@/components/filter-combobox';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface BookImage {
    id: number;
    image_url: string;
    sort_order: number;
}

interface Book {
    id: number;
    title: string;
    slug?: string | null;
    volume: number;

    series: {
        id: number;
        title: string;
    } | null;

    edition: {
        id: number;
        name: string;
    } | null;

    story_status: {
        id: number;
        name: string;
    } | null;

    publisher: {
        id: number;
        name: string;
    } | null;

    images: BookImage[];

    genres_count: number;
    affiliate_links_count: number;
    views_count?: number;

    isbn?: string | null;
    page_count?: number | null;
    paper_type?: string | null;
    dimensions?: string | null;
    adaptation?: string | null;

    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    data: Book[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface FilterItem {
    id: number;
    title?: string;
    name?: string;
}

interface FilterOverrides {
    search?: string;
    series_id?: string;
    publisher_id?: string;
    sort?: string;
    per_page?: number;
    page?: number;
}

interface Props {
    books: PaginationData;
    selectedSeries?: FilterItem | null;
    selectedPublisher?: FilterItem | null;
    filters?: {
        search?: string;
        series_id?: string;
        publisher_id?: string;
        sort?: string;
        per_page?: string | number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Books',
        href: '/admin/books',
    },
];

const PER_PAGE_OPTIONS = [10, 15, 25, 50, 100] as const;

const SORT_OPTIONS = [
    { value: 'latest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
    { value: 'title_asc', label: 'Judul A–Z' },
    { value: 'title_desc', label: 'Judul Z–A' },
    { value: 'views_desc', label: 'Views Terbanyak' },
    { value: 'views_asc', label: 'Views Tersedikit' },
] as const;

const formatPaginationLabel = (label: string) =>
    label
        .replace(/&laquo;|&raquo;/g, '')
        .replace('pagination.previous', 'Sebelumnya')
        .replace('pagination.next', 'Berikutnya')
        .trim();

export default function Index({
    books,
    selectedSeries = null,
    selectedPublisher = null,
    filters: rawFilters,
}: Props) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [deleteBook, setDeleteBook] = useState<Book | null>(null);
    const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
    const [bulkCount, setBulkCount] = useState(0);
    const [search, setSearch] = useState(filters.search || '');
    const [seriesId, setSeriesId] = useState(filters.series_id || 'all');
    const [publisherId, setPublisherId] = useState(filters.publisher_id || 'all');
    const [sort, setSort] = useState(filters.sort || 'latest');
    const [perPage, setPerPage] = useState(Number(filters.per_page) || 15);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [pageInput, setPageInput] = useState('');

    const pageIds = useMemo(() => books.data.map((book) => book.id), [books.data]);
    const selectedOnPage = pageIds.filter((id) => selectedIds.includes(id));
    const allPageSelected = pageIds.length > 0 && selectedOnPage.length === pageIds.length;
    const somePageSelected = selectedOnPage.length > 0 && !allPageSelected;

    useEffect(() => {
        setSelectedIds([]);
    }, [books.current_page]);

    useEffect(() => {
        if (books.data.length === 0 && books.current_page > 1 && books.prev_page_url) {
            router.get(books.prev_page_url, {}, { preserveScroll: true, preserveState: true, only: ['books'] });
        }
    }, [books.current_page, books.data.length, books.prev_page_url]);

    const toggleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
            return;
        }

        setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    };

    const toggleSelect = (id: number, checked: boolean) => {
        setSelectedIds((prev) => (checked ? Array.from(new Set([...prev, id])) : prev.filter((value) => value !== id)));
    };

    const buildQuery = (overrides?: FilterOverrides): Record<string, string> => {
        const nextSearch = overrides?.search ?? search;
        const nextSeries = overrides?.series_id ?? seriesId;
        const nextPublisher = overrides?.publisher_id ?? publisherId;
        const nextSort = overrides?.sort ?? sort;
        const nextPerPage = overrides?.per_page ?? perPage;

        const payload: Record<string, string> = {};

        if (nextSearch) {
            payload.search = nextSearch;
        }

        if (nextSeries && nextSeries !== 'all') {
            payload.series_id = nextSeries;
        }

        if (nextPublisher && nextPublisher !== 'all') {
            payload.publisher_id = nextPublisher;
        }

        if (nextSort && nextSort !== 'latest') {
            payload.sort = nextSort;
        }

        if (nextPerPage !== 15) {
            payload.per_page = String(nextPerPage);
        }

        if (overrides?.page && overrides.page > 1) {
            payload.page = String(overrides.page);
        }

        return payload;
    };

    const handleApplyFilters = (overrides?: FilterOverrides) => {
        setSelectedIds([]);

        router.get(route('admin.books.index'), buildQuery(overrides), {
            preserveState: true,
            preserveScroll: true,
            only: ['books', 'filters', 'selectedSeries', 'selectedPublisher'],
        });
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleApplyFilters();
    };

    const handleReset = () => {
        setSearch('');
        setSeriesId('all');
        setPublisherId('all');
        setSort('latest');
        setPerPage(15);
        setSelectedIds([]);

        router.get(route('admin.books.index'), {}, { preserveState: true, preserveScroll: true });
    };

    const handlePageJump = (e: FormEvent) => {
        e.preventDefault();

        const target = Number.parseInt(pageInput, 10);

        if (!Number.isFinite(target) || target < 1 || target > books.last_page) {
            toast.error(`Halaman harus di antara 1 dan ${books.last_page}`);
            return;
        }

        router.get(route('admin.books.index'), buildQuery({ page: target }), {
            preserveState: true,
            preserveScroll: true,
            only: ['books'],
        });

        setPageInput('');
    };

    const toggleTitleSort = () => {
        const next = sort === 'title_asc' ? 'title_desc' : 'title_asc';

        setSort(next);
        handleApplyFilters({ sort: next });
    };

    const toggleViewsSort = () => {
        const next = sort === 'views_desc' ? 'views_asc' : 'views_desc';

        setSort(next);
        handleApplyFilters({ sort: next });
    };

    const renderSortIcon = (ascValue: string, descValue: string) => {
        if (sort === ascValue) {
            return <ArrowUp className="size-3.5" />;
        }

        if (sort === descValue) {
            return <ArrowDown className="size-3.5" />;
        }

        return <ArrowUpDown className="size-3.5 opacity-60" />;
    };

    const handleDelete = () => {
        if (!deleteBook) {
            return;
        }

        const bookTitle = deleteBook.title;

        router.delete(route('admin.books.destroy', deleteBook.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Buku "${bookTitle}" sudah terhapus`);
            },
            onError: () => {
                toast.error('Gagal menghapus buku');
            },
            onFinish: () => {
                setDeleteBook(null);
            },
        });
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) {
            return;
        }

        const count = selectedIds.length;

        router.delete(route('admin.books.bulk-destroy'), {
            data: { ids: selectedIds },
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${count} buku sudah terhapus`);
                setSelectedIds([]);
            },
            onError: () => {
                toast.error('Gagal menghapus buku terpilih');
            },
            onFinish: () => {
                setBulkDeleteOpen(false);
            },
        });
    };

    const hasActiveFilters =
        Boolean(search) || seriesId !== 'all' || publisherId !== 'all' || sort !== 'latest' || perPage !== 15;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Books" />

            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6">
                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                            <BookOpen className="w-6 h-6 text-[#112A12] dark:text-emerald-400" />
                            <span>Books Catalog</span>
                        </h1>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                            Kelola seluruh katalog buku, manga, novel, dan informasi volume yang tersedia di website.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <Link href={route('admin.books.search-logs')}>
                            <Button variant="outline" className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs">
                                <SearchCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span>Keyword Logs</span>
                            </Button>
                        </Link>

                        <Link href={route('admin.books.logs')}>
                            <Button variant="outline" className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs">
                                <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Lihat Logs</span>
                            </Button>
                        </Link>

                        <Link href={route('admin.books.volume-order')}>
                            <Button variant="outline" className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs">
                                <ArrowUpDown className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                <span>Urutan Volume</span>
                            </Button>
                        </Link>

                        <Link href={route('admin.books.create')}>
                            <Button className="bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg">
                                <Plus className="w-4 h-4" />
                                <span>Tambah Buku</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 min-w-[240px]">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Cari judul buku, sinopsis..."
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
                        <FilterCombobox
                            value={seriesId}
                            selectedLabel={selectedSeries?.title ?? null}
                            allLabel="Semua Series"
                            placeholder="Cari series..."
                            type="series"
                            onChange={(next) => {
                                setSeriesId(next);
                                handleApplyFilters({ series_id: next });
                            }}
                        />

                        <FilterCombobox
                            value={publisherId}
                            selectedLabel={selectedPublisher?.name ?? null}
                            allLabel="Semua Penerbit"
                            placeholder="Cari penerbit..."
                            type="publisher"
                            onChange={(next) => {
                                setPublisherId(next);
                                handleApplyFilters({ publisher_id: next });
                            }}
                        />

                        {/* Sort Filter */}
                        <div className="relative">
                            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                            <select
                                value={sort}
                                onChange={(e) => {
                                    const next = e.target.value;
                                    setSort(next);
                                    handleApplyFilters({ sort: next });
                                }}
                                className="h-9 pl-8 pr-7 text-xs font-medium bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer appearance-none"
                            >
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {hasActiveFilters && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="h-9 text-xs font-bold"
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selectedIds.length > 0 && (
                    <div className="flex flex-col gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between dark:border-red-900/50 dark:bg-red-950/30">
                        <p className="text-xs font-semibold text-red-700 dark:text-red-300">
                            {selectedIds.length} buku dipilih
                        </p>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs font-bold"
                                onClick={() => setSelectedIds([])}
                            >
                                Batal
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                className="h-8 text-xs font-bold"
                                onClick={() => {
                                    setBulkCount(selectedIds.length);
                                    setBulkDeleteOpen(true);
                                }}
                            >
                                <Trash2 className="mr-1.5 size-3.5" />
                                Hapus Terpilih
                            </Button>
                        </div>
                    </div>
                )}

                {/* Table Data */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1040px]">
                            <thead className="bg-[#112A12] text-white">
                                <tr className="border-b border-[#112A12]">
                                    <th className="w-[44px] px-4 py-3 text-left">
                                        <Checkbox
                                            checked={allPageSelected ? true : somePageSelected ? 'indeterminate' : false}
                                            onCheckedChange={(checked) => toggleSelectAll(checked === true)}
                                            aria-label="Pilih semua buku di halaman ini"
                                            className="border-white/60 data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-[#112A12]"
                                        />
                                    </th>

                                    <th className="w-[70px] px-4 py-3 text-left text-xs font-bold text-white">
                                        #
                                    </th>

                                    <th className="w-[80px] px-4 py-3 text-left text-xs font-bold text-white">
                                        Cover
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-bold text-white">
                                        <button
                                            type="button"
                                            onClick={toggleTitleSort}
                                            className="inline-flex cursor-pointer items-center gap-1 hover:text-emerald-200"
                                        >
                                            <span>Buku</span>
                                            {renderSortIcon('title_asc', 'title_desc')}
                                        </button>
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-bold text-white">
                                        Series
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-bold text-white">
                                        Volume
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-bold text-white">
                                        Penerbit
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-bold text-white">
                                        Status
                                    </th>

                                    <th className="px-4 py-3 text-center text-xs font-bold text-white">
                                        <button
                                            type="button"
                                            onClick={toggleViewsSort}
                                            className="inline-flex cursor-pointer items-center gap-1 hover:text-emerald-200"
                                        >
                                            <span>Views</span>
                                            {renderSortIcon('views_desc', 'views_asc')}
                                        </button>
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-bold text-white">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {books.data.length > 0 ? (
                                    books.data.map((book, index) => (
                                        <tr
                                            key={book.id}
                                            className="border-b last:border-0 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40"
                                        >
                                            {/* Select */}
                                            <td className="px-4 py-3">
                                                <Checkbox
                                                    checked={selectedIds.includes(book.id)}
                                                    onCheckedChange={(checked) => toggleSelect(book.id, checked === true)}
                                                    aria-label={`Pilih ${book.title}`}
                                                />
                                            </td>

                                            {/* Number */}
                                            <td className="px-4 py-3 text-sm text-muted-foreground">
                                                {(books.current_page - 1) * books.per_page + index + 1}
                                            </td>

                                            {/* Cover */}
                                            <td className="px-4 py-3">
                                                {book.images.length > 0 ? (
                                                    <img
                                                        src={book.images[0].image_url}
                                                        alt={book.title}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="h-16 w-12 rounded-md border object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-12 items-center justify-center rounded-md border bg-muted text-center text-[10px] text-muted-foreground">
                                                        No Image
                                                    </div>
                                                )}
                                            </td>

                                            {/* Book */}
                                            <td className="px-4 py-3">
                                                <div className="max-w-[280px]">
                                                    <p className="truncate text-sm font-medium">{book.title}</p>

                                                    <div className="mt-1 flex flex-wrap gap-1.5">
                                                        <span className="text-xs text-muted-foreground">
                                                            {book.genres_count} genre
                                                        </span>

                                                        <span className="text-xs text-muted-foreground">•</span>

                                                        <span className="text-xs text-muted-foreground">
                                                            {book.affiliate_links_count} affiliate
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Series */}
                                            <td className="px-4 py-3 text-sm">
                                                {book.series ? (
                                                    book.series.title
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>

                                            {/* Volume */}
                                            <td className="px-4 py-3 text-sm">Vol. {book.volume}</td>

                                            {/* Publisher */}
                                            <td className="px-4 py-3 text-sm">
                                                {book.publisher ? (
                                                    book.publisher.name
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-3">
                                                {book.story_status ? (
                                                    <span className="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                                                        {book.story_status?.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">-</span>
                                                )}
                                            </td>

                                            {/* Views */}
                                            <td className="px-4 py-3 text-center">
                                                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                                                    <Eye className="w-3.5 h-3.5 text-neutral-400" />
                                                    <span>{(book.views_count ?? 0).toLocaleString('id-ID')}</span>
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                        title="Lihat Tampilan User"
                                                        className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
                                                    >
                                                        <a
                                                            href={route('book.detail', book.slug || book.id)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Eye className="size-4" />
                                                        </a>
                                                    </Button>

                                                    <Button variant="outline" size="icon" asChild title="Edit Buku">
                                                        <Link href={route('admin.books.edit', book.id)}>
                                                            <Pencil className="size-4" />
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        title="Hapus Buku"
                                                        onClick={() => setDeleteBook(book)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={10} className="px-4 py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                                    <BookOpen className="size-5 text-muted-foreground" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {hasActiveFilters ? 'Tidak ada buku yang cocok' : 'Belum ada buku'}
                                                    </p>

                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        {hasActiveFilters
                                                            ? 'Coba ubah kata kunci atau filter pencarian.'
                                                            : 'Tambahkan buku pertama Anda.'}
                                                    </p>
                                                </div>

                                                {hasActiveFilters ? (
                                                    <Button size="sm" variant="outline" onClick={handleReset}>
                                                        Reset Filter
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" asChild>
                                                        <Link href={route('admin.books.create')}>
                                                            <Plus className="mr-2 size-4" />
                                                            Tambah Buku
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {books.total > 0 && (
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <p>
                                Menampilkan {books.from ?? 0}–{books.to ?? 0} dari {books.total} buku.
                            </p>

                            <div className="flex items-center gap-1.5">
                                <span className="text-xs">Baris:</span>
                                <select
                                    value={perPage}
                                    onChange={(e) => {
                                        const next = Number(e.target.value);
                                        setPerPage(next);
                                        handleApplyFilters({ per_page: next });
                                    }}
                                    className="h-8 rounded-md border border-input bg-background px-2 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
                                >
                                    {PER_PAGE_OPTIONS.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {books.last_page > 1 && (
                                <div className="flex flex-wrap gap-1">
                                    {books.links.map((link, index) => {
                                        const label = formatPaginationLabel(link.label);

                                        if (!link.url) {
                                            return (
                                                <Button key={index} variant="outline" size="sm" disabled>
                                                    {label}
                                                </Button>
                                            );
                                        }

                                        return (
                                            <Button
                                                key={index}
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                asChild
                                            >
                                                <Link href={link.url} preserveScroll>
                                                    {label}
                                                </Link>
                                            </Button>
                                        );
                                    })}
                                </div>
                            )}

                            {books.last_page > 1 && (
                                <form onSubmit={handlePageJump} className="flex items-center gap-1.5">
                                    <Input
                                        value={pageInput}
                                        onChange={(e) => setPageInput(e.target.value)}
                                        inputMode="numeric"
                                        placeholder="Hal."
                                        aria-label="Lompat ke halaman"
                                        className="h-8 w-16 text-center text-xs"
                                    />
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-2.5 text-xs font-bold"
                                    >
                                        Ke
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Dialog */}
            <AlertDialog
                open={deleteBook !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteBook(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus buku?</AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus buku <strong>{deleteBook?.title}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>

                        <AlertDialogAction onClick={handleDelete}>Hapus Buku</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Bulk Delete Dialog */}
            <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus {bulkCount} buku?</AlertDialogTitle>

                        <AlertDialogDescription>
                            Buku yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus{' '}
                            <strong>{bulkCount} buku</strong> terpilih?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>

                        <AlertDialogAction onClick={handleBulkDelete}>Hapus Buku</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
