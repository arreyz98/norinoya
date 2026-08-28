import { Head, Link, router } from '@inertiajs/react';
import {
    Eye,
    Pencil,
    Plus,
    Search,
    Trash2,
    ArrowUpDown,
    BookOpen,
    History,
    SearchCode,
} from 'lucide-react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface BookImage {
    id: number;
    image_url: string;
    sort_order: number;
}

interface Book {
    id: number;
    title: string;
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

interface Props {
    books: PaginationData;
    filters?: {
        search?: string;
        sort?: string;
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

export default function Index({ books, filters: rawFilters }: Props) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [deleteBook, setDeleteBook] =
        useState<Book | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [sort, setSort] = useState(filters.sort || 'latest');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('admin.books.index'),
            { search, sort },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        router.get(
            route('admin.books.index'),
            { search, sort: newSort },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleDelete = () => {
        if (!deleteBook) {
            return;
        }

        router.delete(
            route(
                'admin.books.destroy',
                deleteBook.id,
            ),
            {
                preserveScroll: true,

                onFinish: () => {
                    setDeleteBook(null);
                },
            },
        );
    };
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

                        <Link href={route('admin.books.create')}>
                            <Button className="bg-[#112A12] hover:bg-[#0c1e0d] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-4 h-9 rounded-lg">
                                <Plus className="w-4 h-4" />
                                <span>Tambah Buku</span>
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
                                placeholder="Cari judul buku, series, penerbit..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-9 text-xs"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>

                    <div className="flex items-center gap-2">
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

                        {(search || sort !== 'latest') && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setSearch('');
                                    setSort('latest');
                                    router.get(route('admin.books.index'), {}, { preserveScroll: true });
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
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-[#112A12] text-white">
                                <tr className="border-b border-[#112A12]">
                                    <th className="w-[70px] px-4 py-3 text-left text-xs font-bold text-white">
                                        #
                                    </th>

                                    <th className="w-[80px] px-4 py-3 text-left text-xs font-bold text-white">
                                        Cover
                                    </th>

                                    <th className="px-4 py-3 text-left text-xs font-bold text-white">
                                        Buku
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
                                        Views
                                    </th>

                                    <th className="px-4 py-3 text-right text-xs font-bold text-white">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {books.data.length > 0 ? (
                                    books.data.map(
                                        (
                                            book,
                                            index,
                                        ) => (
                                            <tr
                                                key={
                                                    book.id
                                                }
                                                className="border-b last:border-0 hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40"
                                            >
                                                {/* Number */}
                                                <td className="px-4 py-3 text-sm text-muted-foreground">
                                                    {(books.current_page -
                                                        1) *
                                                        books.per_page +
                                                        index +
                                                        1}
                                                </td>

                                                {/* Cover */}
                                                <td className="px-4 py-3">
                                                    {book
                                                        .images
                                                        .length >
                                                    0 ? (
                                                        <img
                                                            src={
                                                                book
                                                                    .images[0]
                                                                    .image_url
                                                            }
                                                            alt={
                                                                book.title
                                                            }
                                                            className="h-16 w-12 rounded-md border object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-16 w-12 items-center justify-center rounded-md border bg-muted text-center text-[10px] text-muted-foreground">
                                                            No
                                                            Image
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Book */}
                                                <td className="px-4 py-3">
                                                    <div className="max-w-[280px]">
                                                        <p className="truncate text-sm font-medium">
                                                            {
                                                                book.title
                                                            }
                                                        </p>

                                                        <div className="mt-1 flex flex-wrap gap-1.5">
                                                            <span className="text-xs text-muted-foreground">
                                                                {
                                                                    book.genres_count
                                                                }{' '}
                                                                genre
                                                            </span>

                                                            <span className="text-xs text-muted-foreground">
                                                                •
                                                            </span>

                                                            <span className="text-xs text-muted-foreground">
                                                                {
                                                                    book.affiliate_links_count
                                                                }{' '}
                                                                affiliate
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Series */}
                                                <td className="px-4 py-3 text-sm">
                                                    {book.series
                                                        ? book
                                                              .series
                                                              .title
                                                        : (
                                                            <span className="text-muted-foreground">
                                                                -
                                                            </span>
                                                        )}
                                                </td>

                                                {/* Volume */}
                                                <td className="px-4 py-3 text-sm">
                                                    Vol.{' '}
                                                    {
                                                        book.volume
                                                    }
                                                </td>

                                                {/* Publisher */}
                                                <td className="px-4 py-3 text-sm">
                                                    {book
                                                        .publisher
                                                        ? book
                                                              .publisher
                                                              .name
                                                        : (
                                                            <span className="text-muted-foreground">
                                                                -
                                                            </span>
                                                        )}
                                                </td>

                                                {/* Status */}
                                                <td className="px-4 py-3">
                                                    {book.story_status ? (
                                                        <span className="inline-flex rounded-full border px-2.5 py-1 text-xs font-medium">
                                                            {
                                                                book
                                                                    .story_status
                                                                    ?.name
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">
                                                            -
                                                        </span>
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
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={route(
                                                                  'admin.books.edit',
                                                                    book.id,
                                                                )}
                                                            >
                                                                <Pencil className="size-4" />
                                                            </Link>
                                                        </Button>

                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() =>
                                                                setDeleteBook(
                                                                    book,
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
                                            colSpan={9}
                                            className="px-4 py-16 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                                                    <Eye className="size-5 text-muted-foreground" />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Belum
                                                        ada
                                                        buku
                                                    </p>

                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Tambahkan
                                                        buku
                                                        pertama
                                                        Anda.
                                                    </p>
                                                </div>

                                                <Button
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            'admin.books.create',
                                                        )}
                                                    >
                                                        <Plus className="mr-2 size-4" />
                                                        Tambah
                                                        Buku
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {books.last_page > 1 && (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-muted-foreground">
                            Menampilkan{' '}
                            {books.from ?? 0}–
                            {books.to ?? 0} dari{' '}
                            {books.total} buku.
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {books.links.map(
                                (link, index) => {
                                    const cleanLabel = link.label
                                        .replace('pagination.previous', 'Previous')
                                        .replace('pagination.next', 'Next');

                                    if (!link.url) {
                                        return (
                                            <Button
                                                key={
                                                    index
                                                }
                                                variant="outline"
                                                size="sm"
                                                disabled
                                            >
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanLabel,
                                                    }}
                                                />
                                            </Button>
                                        );
                                    }

                                    return (
                                        <Button
                                            key={
                                                index
                                            }
                                            variant={
                                                link.active
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            asChild
                                        >
                                            <Link
                                                href={
                                                    link.url
                                                }
                                                preserveScroll
                                            >
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: cleanLabel,
                                                    }}
                                                />
                                            </Link>
                                        </Button>
                                    );
                                },
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
                        <AlertDialogTitle>
                            Hapus buku?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Apakah Anda yakin ingin
                            menghapus buku{' '}
                            <strong>
                                {deleteBook?.title}
                            </strong>
                            ?

                            <br />

                            Data buku akan dipindahkan
                            ke soft delete.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Batal
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={
                                handleDelete
                            }
                        >
                            Hapus Buku
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}