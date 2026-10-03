import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowUpDown,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

import type { BookSeries } from '@/types/book-series';
import type { PaginatedData } from '@/types/pagination';

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

interface BookSeriesIndexProps {
    series: PaginatedData<BookSeries>;
    filters?: {
        search?: string;
        sort?: string;
        per_page?: string | number;
    };
}

interface FilterOverride {
    search?: string;
    sort?: string;
    per_page?: string;
}

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

export default function BookSeriesIndex({
    series,
    filters: rawFilters,
}: BookSeriesIndexProps) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [deleteSeries, setDeleteSeries] =
        useState<BookSeries | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [sort, setSort] = useState(filters.sort || 'latest');
    const [perPage, setPerPage] = useState(
        String(filters.per_page || '15')
    );
    const lastAppliedSearch = useRef(filters.search || '');

    const applyFilters = (override?: FilterOverride) => {
        const payload: Record<string, string> = {
            search:
                override?.search !== undefined
                    ? override.search
                    : search,
            sort:
                override?.sort !== undefined
                    ? override.sort
                    : sort,
            per_page:
                override?.per_page !== undefined
                    ? override.per_page
                    : perPage,
        };

        if (!payload.search) {
            delete payload.search;
        }

        if (payload.sort === 'latest') {
            delete payload.sort;
        }

        if (payload.per_page === '15') {
            delete payload.per_page;
        }

        lastAppliedSearch.current = payload.search ?? '';

        router.get(route('admin.book-series.index'), payload, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const applyFiltersRef = useRef<(override?: FilterOverride) => void>(
        () => {}
    );
    applyFiltersRef.current = applyFilters;

    useEffect(() => {
        if (search === lastAppliedSearch.current) {
            return;
        }

        const timeout = setTimeout(() => {
            if (search === lastAppliedSearch.current) {
                return;
            }

            lastAppliedSearch.current = search;
            applyFiltersRef.current({ search });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        lastAppliedSearch.current = search;
        applyFilters({ search });
    };

    const handleClearSearch = () => {
        setSearch('');
        lastAppliedSearch.current = '';
        applyFilters({ search: '' });
    };

    const handleSortChange = (value: string) => {
        setSort(value);
        applyFilters({ sort: value });
    };

    const handlePerPageChange = (value: string) => {
        setPerPage(value);
        applyFilters({ per_page: value });
    };

    const handleReset = () => {
        setSearch('');
        setSort('latest');
        setPerPage('15');
        lastAppliedSearch.current = '';

        router.get(
            route('admin.book-series.index'),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const hasActiveFilters =
        Boolean(search) || sort !== 'latest' || perPage !== '15';

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Series" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Book Series
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Kelola series buku.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="relative"
                        >
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                placeholder="Cari nama atau slug series..."
                                aria-label="Cari series"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="h-9 w-64 pl-9 pr-8 text-sm"
                            />

                            {search && (
                                <button
                                    type="button"
                                    aria-label="Bersihkan pencarian"
                                    onClick={handleClearSearch}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </form>

                        <div className="relative">
                            <ArrowUpDown className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />

                            <select
                                value={sort}
                                onChange={(e) =>
                                    handleSortChange(e.target.value)
                                }
                                aria-label="Urutkan series"
                                className="h-9 cursor-pointer appearance-none rounded-md border border-input bg-background pr-3 pl-8 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                            >
                                <option value="latest">
                                    Terbaru
                                </option>
                                <option value="oldest">
                                    Terlama
                                </option>
                                <option value="title_asc">
                                    Judul A–Z
                                </option>
                                <option value="title_desc">
                                    Judul Z–A
                                </option>
                                <option value="books_desc">
                                    Jumlah Buku
                                </option>
                            </select>
                        </div>

                        <select
                            value={perPage}
                            onChange={(e) =>
                                handlePerPageChange(e.target.value)
                            }
                            aria-label="Jumlah data per halaman"
                            className="h-9 cursor-pointer rounded-md border border-input bg-background px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring"
                        >
                            <option value="15">
                                15 / halaman
                            </option>
                            <option value="25">
                                25 / halaman
                            </option>
                            <option value="50">
                                50 / halaman
                            </option>
                            <option value="100">
                                100 / halaman
                            </option>
                        </select>

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
                                        {filters.search ? (
                                            <div className="flex flex-col items-center gap-2 py-2">
                                                <p className="text-sm text-muted-foreground">
                                                    Tidak ada
                                                    series yang
                                                    cocok dengan
                                                    &ldquo;
                                                    {
                                                        filters.search
                                                    }
                                                    &rdquo;.
                                                </p>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={
                                                        handleClearSearch
                                                    }
                                                >
                                                    Reset
                                                    Pencarian
                                                </Button>
                                            </div>
                                        ) : (
                                            'Belum ada series.'
                                        )}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                series.data.map(
                                    (item) => (
                                        <TableRow
                                            key={item.id}
                                        >
                                            <TableCell className="font-medium">
                                                <span
                                                    className="block max-w-[320px] truncate"
                                                    title={
                                                        item.title
                                                    }
                                                >
                                                    {
                                                        item.title
                                                    }
                                                </span>
                                            </TableCell>

                                            <TableCell className="text-muted-foreground">
                                                <span
                                                    className="block max-w-[240px] truncate"
                                                    title={
                                                        item.slug
                                                    }
                                                >
                                                    {
                                                        item.slug
                                                    }
                                                </span>
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
                                                        title="Edit series"
                                                        aria-label={`Edit ${item.title}`}
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
                                                        disabled={
                                                            (item.books_count ??
                                                                0) >
                                                            0
                                                        }
                                                        title={
                                                            (item.books_count ??
                                                                0) >
                                                            0
                                                                ? 'Tidak dapat dihapus: series masih memiliki buku'
                                                                : 'Hapus series'
                                                        }
                                                        aria-label={`Hapus ${item.title}`}
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

                {/* Summary & Pagination */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan {series.from ?? 0}–
                        {series.to ?? 0} dari{' '}
                        {series.total.toLocaleString('id-ID')}{' '}
                        series
                        {filters.search
                            ? ` untuk pencarian “${filters.search}”`
                            : ''}
                        .
                    </p>

                    {series.last_page > 1 && (
                        <div className="flex flex-wrap items-center gap-1">
                            {series.links.map(
                                (link, index) => {
                                    const label = link.label
                                        .replace(
                                            '&laquo; Previous',
                                            'Sebelumnya'
                                        )
                                        .replace(
                                            'Previous',
                                            'Sebelumnya'
                                        )
                                        .replace(
                                            'Next &raquo;',
                                            'Berikutnya'
                                        )
                                        .replace(
                                            'Next',
                                            'Berikutnya'
                                        );

                                    if (
                                        !link.url &&
                                        link.label === '...'
                                    ) {
                                        return (
                                            <span
                                                key={`ellipsis-${index}`}
                                                className="px-2 text-sm text-muted-foreground"
                                            >
                                                …
                                            </span>
                                        );
                                    }

                                    if (!link.url) {
                                        return (
                                            <Button
                                                key={`${link.label}-${index}`}
                                                variant="outline"
                                                size="sm"
                                                disabled
                                            >
                                                {label}
                                            </Button>
                                        );
                                    }

                                    return (
                                        <Button
                                            key={`${link.label}-${index}`}
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={link.url}
                                                preserveScroll
                                                preserveState
                                            >
                                                {label}
                                            </Link>
                                        </Button>
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
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
