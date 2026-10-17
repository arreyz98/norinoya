import { Head, Link, router } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    Calendar as CalendarIcon,
    Clock,
    FileSpreadsheet,
    Hash,
    RefreshCw,
    Search,
    SearchCode,
    Sparkles,
    Trash2,
    TrendingUp,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/pagination';

import { formatDateTime, formatDisplayDate, parseLocalDate, toLocalDateString } from './log-utils';

export interface SearchLogItem {
    id: number;
    keyword: string;
    search_count: number;
    search_date: string;
    created_at: string;
    updated_at: string;
}

export interface SearchLogsPageFilters {
    search?: string;
    start_date?: string;
    end_date?: string;
}

export interface SearchLogsStats {
    total_searches: number;
    today_searches: number;
    unique_keywords: number;
}

export interface SearchLogsPageConfig {
    headTitle: string;
    pageTitle: string;
    subtitle: string;
    breadcrumbs: BreadcrumbItem[];
    backHref: string;
    crossLink?: {
        href: string;
        label: string;
        icon: LucideIcon;
        iconClassName: string;
    };
    /** URL export yang sudah jadi (dibangun lewat route() di halaman pemanggil). */
    exportHref: string;
    routes: {
        list: string;
        destroy: string;
        clear: string;
    };
    topLabel: string;
    searchPlaceholder: string;
    emptyTitle: string;
    emptyDescription: string;
    dialog: {
        deleteTitle: string;
        clearTitle: string;
        totalBoldText: string;
    };
    calendar: {
        startDesc: string;
        endDesc: string;
    };
}

export interface SearchLogsPageProps {
    logs: PaginatedData<SearchLogItem>;
    filters?: SearchLogsPageFilters;
    stats: SearchLogsStats;
    topSearches: Array<{ keyword: string; total_count: number }>;
    config: SearchLogsPageConfig;
}

/**
 * Halaman generik "Keyword Logs" (search logs) untuk admin (Books, News, Kios).
 * Semua perbedaan antar entitas dikirim lewat `config`.
 */
export default function SearchLogsPage({ logs, filters: rawFilters, stats, topSearches, config }: SearchLogsPageProps) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [search, setSearch] = useState(filters.search || '');
    const [startDate, setStartDate] = useState<string>(filters.start_date || '');
    const [endDate, setEndDate] = useState<string>(filters.end_date || '');

    // State for delete confirmations
    const [deleteItem, setDeleteItem] = useState<SearchLogItem | null>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Popover/Dialog open state for calendars
    const [isStartDateOpen, setIsStartDateOpen] = useState(false);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);

    const handleApplyFilters = (newStart?: string, newEnd?: string, newSearch?: string) => {
        const queryStart = newStart !== undefined ? newStart : startDate;
        const queryEnd = newEnd !== undefined ? newEnd : endDate;
        const querySearch = newSearch !== undefined ? newSearch : search;

        router.get(
            route(config.routes.list),
            {
                search: querySearch || undefined,
                start_date: queryStart || undefined,
                end_date: queryEnd || undefined,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleApplyFilters();
    };

    const handleReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        router.get(route(config.routes.list), {}, { preserveScroll: true });
    };

    // Handle delete single log
    const confirmDeleteSingle = () => {
        if (!deleteItem) return;
        setIsDeleting(true);

        router.delete(route(config.routes.destroy, deleteItem.id), {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setDeleteItem(null);
            },
        });
    };

    // Handle clear all/filtered logs
    const confirmClearLogs = () => {
        setIsDeleting(true);

        router.delete(route(config.routes.clear), {
            data: {
                search: search || undefined,
                start_date: startDate || undefined,
                end_date: endDate || undefined,
            },
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setShowClearConfirm(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={config.breadcrumbs}>
            <Head title={config.headTitle} />

            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6">
                {/* Top Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href={config.backHref}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <h1 className="flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
                                <SearchCode className="h-6 w-6 text-[#112A12] dark:text-emerald-400" />
                                <span>{config.pageTitle}</span>
                            </h1>
                        </div>
                        <p className="mt-0.5 ml-10 text-xs text-neutral-500 dark:text-neutral-400">{config.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                        {config.crossLink && (
                            <Link href={config.crossLink.href}>
                                <Button
                                    variant="outline"
                                    className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border-neutral-300 px-3.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                                >
                                    <config.crossLink.icon className={`h-4 w-4 ${config.crossLink.iconClassName}`} />
                                    <span>{config.crossLink.label}</span>
                                </Button>
                            </Link>
                        )}

                        <a href={config.exportHref} target="_blank" rel="noopener noreferrer" download>
                            <Button
                                className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-[#0F9D58] px-3.5 text-xs font-bold text-white shadow-2xs hover:bg-[#0b8043]"
                                title="Download format CSV yang kompatibel langsung dengan Google Sheets & Excel"
                            >
                                <FileSpreadsheet className="h-4 w-4" />
                                <span>Export Google Sheets</span>
                            </Button>
                        </a>

                        {logs.data.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={() => setShowClearConfirm(true)}
                                className="flex h-9 cursor-pointer items-center gap-1.5 border-red-200 px-3 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-950/40"
                                title="Bersihkan log (seluruhnya atau sesuai filter tanggal/kata kunci)"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Bersihkan Log</span>
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.reload()}
                            className="flex h-9 cursor-pointer items-center gap-1.5 px-3 text-xs font-bold"
                        >
                            <RefreshCw className="h-3.5 w-3.5" />
                            <span>Refresh</span>
                        </Button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="space-y-0.5">
                            <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase dark:text-neutral-400">
                                Total Frekuensi Pencarian
                            </span>
                            <div className="font-sans text-2xl font-black text-neutral-900 dark:text-white">
                                {stats.total_searches.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#112A12]/10 text-[#112A12] dark:bg-emerald-950/40 dark:text-emerald-400">
                            <Search className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="space-y-0.5">
                            <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase dark:text-neutral-400">
                                Pencarian Hari Ini
                            </span>
                            <div className="font-sans text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                {stats.today_searches.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                        <div className="space-y-0.5">
                            <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase dark:text-neutral-400">Kata Kunci Unik</span>
                            <div className="font-sans text-2xl font-black text-blue-600 dark:text-blue-400">
                                {stats.unique_keywords.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                            <Hash className="h-5 w-5" />
                        </div>
                    </div>
                </div>

                {/* Top Popular Keywords Banner */}
                {topSearches && topSearches.length > 0 && (
                    <div className="flex flex-col justify-between gap-2.5 rounded-xl border border-neutral-200/80 bg-neutral-50 p-3 sm:flex-row sm:items-center sm:p-4 dark:border-neutral-800 dark:bg-neutral-900/60">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 shrink-0 text-[#DA6B1C]" />
                            <span className="font-mono text-xs font-bold text-neutral-700 uppercase dark:text-neutral-300">{config.topLabel}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                            {topSearches.map((item, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        setSearch(item.keyword);
                                        handleApplyFilters(undefined, undefined, item.keyword);
                                    }}
                                    className="shadow-3xs inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-800 transition-all hover:border-emerald-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                                >
                                    <span className="font-semibold text-[#112A12] dark:text-emerald-400">#{idx + 1}</span>
                                    <span>{item.keyword}</span>
                                    <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500">
                                        {Number(item.total_count).toLocaleString('id-ID')}x
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter & Search Bar with Date Pickers */}
                <div className="flex flex-col items-stretch justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-2xs lg:flex-row lg:items-center dark:border-neutral-800 dark:bg-neutral-900">
                    {/* Left: Search input */}
                    <form onSubmit={handleSearchSubmit} className="flex max-w-sm flex-1 items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder={config.searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-9 pl-9 text-xs"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>

                    {/* Right: 2 Date Picker Buttons and Reset */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Tombol Date Picker 'Dari' */}
                        <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">Dari:</span>
                            <Button
                                variant="outline"
                                onClick={() => setIsStartDateOpen(true)}
                                className={`h-9 justify-start gap-2 border-neutral-200 px-3 text-left text-xs font-medium dark:border-neutral-800 ${
                                    !startDate && 'text-neutral-400'
                                }`}
                            >
                                <CalendarIcon className="h-3.5 w-3.5 text-emerald-600" />
                                <span>{startDate ? formatDisplayDate(startDate) : 'Pilih Tanggal'}</span>
                            </Button>
                        </div>

                        {/* Tombol Date Picker 'Sampai' */}
                        <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">Sampai:</span>
                            <Button
                                variant="outline"
                                onClick={() => setIsEndDateOpen(true)}
                                className={`h-9 justify-start gap-2 border-neutral-200 px-3 text-left text-xs font-medium dark:border-neutral-800 ${
                                    !endDate && 'text-neutral-400'
                                }`}
                            >
                                <CalendarIcon className="h-3.5 w-3.5 text-emerald-600" />
                                <span>{endDate ? formatDisplayDate(endDate) : 'Pilih Tanggal'}</span>
                            </Button>
                        </div>

                        {(search || startDate || endDate) && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="flex h-9 cursor-pointer items-center gap-1 text-xs font-bold"
                            >
                                <X className="h-3.5 w-3.5" />
                                <span>Reset Filter</span>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table Data */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xs dark:border-neutral-800 dark:bg-neutral-900">
                    <Table>
                        <TableHeader className="bg-neutral-50/70 dark:bg-neutral-800/50">
                            <TableRow className="border-neutral-200 dark:border-neutral-800">
                                <TableHead className="w-[80px] font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">ID</TableHead>
                                <TableHead className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                                    Kata Kunci (Keyword)
                                </TableHead>
                                <TableHead className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                                    Frekuensi Pencarian
                                </TableHead>
                                <TableHead className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                                    Tanggal Pencarian
                                </TableHead>
                                <TableHead className="font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">Terakhir Dicari</TableHead>
                                <TableHead className="w-[100px] text-right font-mono text-xs font-bold text-neutral-600 dark:text-neutral-400">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-48 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-neutral-400 dark:text-neutral-500">
                                            <SearchCode className="h-8 w-8 stroke-1" />
                                            <p className="text-sm font-medium">{config.emptyTitle}</p>
                                            <p className="text-xs text-neutral-400">{config.emptyDescription}</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                logs.data.map((log) => {
                                    return (
                                        <TableRow
                                            key={log.id}
                                            className="border-neutral-100 transition-colors hover:bg-neutral-50/50 dark:border-neutral-800/60 dark:hover:bg-neutral-800/30"
                                        >
                                            {/* ID */}
                                            <TableCell className="font-mono text-xs text-neutral-400">#{log.id}</TableCell>

                                            {/* Keyword */}
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-md border border-neutral-200/60 bg-neutral-100 px-2.5 py-1 font-mono text-xs font-medium text-neutral-900 sm:text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                                                        {log.keyword}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Search Count */}
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-950/50 dark:text-emerald-400">
                                                    <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                                                    <span>{log.search_count.toLocaleString('id-ID')}x dicari</span>
                                                </span>
                                            </TableCell>

                                            {/* Search Date */}
                                            <TableCell>
                                                <div className="flex items-center gap-1.5 font-sans text-xs text-neutral-600 dark:text-neutral-300">
                                                    <CalendarIcon className="h-3.5 w-3.5 text-neutral-400" />
                                                    <span>{formatDisplayDate(log.search_date)}</span>
                                                </div>
                                            </TableCell>

                                            {/* Updated At */}
                                            <TableCell>
                                                <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                                                    <Clock className="h-3.5 w-3.5 text-neutral-400" />
                                                    <span>{formatDateTime(log.updated_at)}</span>
                                                </div>
                                            </TableCell>

                                            {/* Action Delete */}
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteItem(log)}
                                                    className="h-8 w-8 cursor-pointer rounded-lg text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                                                    title="Hapus log kata kunci ini"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    {logs.total > logs.per_page && (
                        <div className="flex flex-col items-center justify-between gap-3 border-t border-neutral-100 p-4 sm:flex-row dark:border-neutral-800">
                            <div className="text-xs text-neutral-500">
                                Menampilkan <span className="font-bold text-neutral-800 dark:text-neutral-200">{logs.from || 0}</span> sampai{' '}
                                <span className="font-bold text-neutral-800 dark:text-neutral-200">{logs.to || 0}</span> dari{' '}
                                <span className="font-bold text-neutral-800 dark:text-neutral-200">{logs.total}</span> data
                            </div>
                            <div className="flex items-center gap-1">
                                {logs.links.map((link, idx) => {
                                    if (link.url === null) {
                                        return (
                                            <Button
                                                key={idx}
                                                variant="outline"
                                                size="sm"
                                                disabled
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className="h-8 cursor-not-allowed text-xs font-semibold opacity-50"
                                            />
                                        );
                                    }
                                    return (
                                        <Link key={idx} href={link.url} preserveScroll preserveState>
                                            <Button
                                                variant={link.active ? 'default' : 'outline'}
                                                size="sm"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className={`h-8 text-xs font-semibold ${
                                                    link.active
                                                        ? 'bg-[#112A12] text-white hover:bg-[#112A12]/90'
                                                        : 'border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800'
                                                }`}
                                            />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Dialog Konfirmasi Hapus Satuan */}
            <Dialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
                <DialogContent className="max-w-md p-6">
                    <DialogHeader className="space-y-2">
                        <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white">{config.dialog.deleteTitle}</DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500 dark:text-neutral-400">
                            Apakah Anda yakin ingin menghapus riwayat kata kunci{' '}
                            <span className="font-mono font-bold text-neutral-900 dark:text-white">"{deleteItem?.keyword}"</span> pada tanggal{' '}
                            <span className="font-bold text-neutral-900 dark:text-white">{formatDisplayDate(deleteItem?.search_date)}</span>? Tindakan
                            ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex items-center justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isDeleting}
                            onClick={() => setDeleteItem(null)}
                            className="cursor-pointer text-xs font-semibold"
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={isDeleting}
                            onClick={confirmDeleteSingle}
                            className="cursor-pointer bg-red-600 text-xs font-semibold text-white hover:bg-red-700"
                        >
                            {isDeleting ? 'Menghapus...' : 'Ya, Hapus Log'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Dialog Konfirmasi Bersihkan Semua / Filtered Log */}
            <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
                <DialogContent className="max-w-md p-6">
                    <DialogHeader className="space-y-2">
                        <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                            <Trash2 className="h-5 w-5" />
                        </div>
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white">{config.dialog.clearTitle}</DialogTitle>
                        <DialogDescription className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                            <p>
                                {startDate || endDate || search ? (
                                    <span>
                                        Data log kata kunci pencarian yang sesuai dengan <strong>filter aktif saat ini</strong> akan dihapus permanen.
                                    </span>
                                ) : (
                                    <span>
                                        <strong>Seluruh ({stats.total_searches.toLocaleString('id-ID')})</strong> {config.dialog.totalBoldText} akan
                                        dihapus secara permanen dari database.
                                    </span>
                                )}
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex items-center justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isDeleting}
                            onClick={() => setShowClearConfirm(false)}
                            className="cursor-pointer text-xs font-semibold"
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={isDeleting}
                            onClick={confirmClearLogs}
                            className="cursor-pointer bg-red-600 text-xs font-semibold text-white hover:bg-red-700"
                        >
                            {isDeleting ? 'Membersihkan...' : 'Ya, Bersihkan Sekarang'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Dialog Calendar 'Dari' (Tengah Layar) */}
            <Dialog open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <DialogContent className="flex w-[92vw] max-w-lg flex-col items-center justify-center p-6 sm:w-[500px]">
                    <DialogHeader className="w-full pb-2 text-center sm:text-center">
                        <DialogTitle className="flex items-center justify-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
                            <CalendarIcon className="h-4 w-4 text-emerald-600" />
                            <span>Pilih Tanggal Mulai (Dari)</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500">{config.calendar.startDesc}</DialogDescription>
                    </DialogHeader>

                    <div className="flex w-full justify-center py-2">
                        <Calendar
                            mode="single"
                            className="w-full rounded-xl border border-neutral-100 p-4 shadow-2xs [--cell-size:3.2rem] dark:border-neutral-800"
                            classNames={{
                                root: 'w-full',
                                months: 'w-full flex flex-col items-center',
                                month: 'w-full space-y-4',
                                month_grid: 'w-full border-collapse',
                                weekdays: 'flex w-full justify-between',
                                weekday: 'text-muted-foreground flex-1 text-center font-bold text-xs py-1',
                                week: 'flex w-full justify-between mt-2',
                                day: 'flex-1 aspect-square flex items-center justify-center p-0',
                            }}
                            selected={startDate ? parseLocalDate(startDate) : undefined}
                            onSelect={(date) => {
                                if (date) {
                                    const formatted = toLocalDateString(date);
                                    setStartDate(formatted);
                                    setIsStartDateOpen(false);
                                    handleApplyFilters(formatted, endDate);
                                } else {
                                    setStartDate('');
                                    setIsStartDateOpen(false);
                                    handleApplyFilters('', endDate);
                                }
                            }}
                        />
                    </div>

                    <DialogFooter className="mt-3 flex w-full items-center justify-between sm:justify-between">
                        {startDate ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setStartDate('');
                                    setIsStartDateOpen(false);
                                    handleApplyFilters('', endDate);
                                }}
                                className="cursor-pointer text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40"
                            >
                                Hapus Filter Tanggal
                            </Button>
                        ) : (
                            <div />
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsStartDateOpen(false)}
                            className="cursor-pointer text-xs font-semibold"
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Dialog Calendar 'Sampai' (Tengah Layar) */}
            <Dialog open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <DialogContent className="flex w-[92vw] max-w-lg flex-col items-center justify-center p-6 sm:w-[500px]">
                    <DialogHeader className="w-full pb-2 text-center sm:text-center">
                        <DialogTitle className="flex items-center justify-center gap-2 text-base font-bold text-neutral-900 dark:text-white">
                            <CalendarIcon className="h-4 w-4 text-emerald-600" />
                            <span>Pilih Tanggal Akhir (Sampai)</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500">{config.calendar.endDesc}</DialogDescription>
                    </DialogHeader>

                    <div className="flex w-full justify-center py-2">
                        <Calendar
                            mode="single"
                            className="w-full rounded-xl border border-neutral-100 p-4 shadow-2xs [--cell-size:3.2rem] dark:border-neutral-800"
                            classNames={{
                                root: 'w-full',
                                months: 'w-full flex flex-col items-center',
                                month: 'w-full space-y-4',
                                month_grid: 'w-full border-collapse',
                                weekdays: 'flex w-full justify-between',
                                weekday: 'text-muted-foreground flex-1 text-center font-bold text-xs py-1',
                                week: 'flex w-full justify-between mt-2',
                                day: 'flex-1 aspect-square flex items-center justify-center p-0',
                            }}
                            selected={endDate ? parseLocalDate(endDate) : undefined}
                            onSelect={(date) => {
                                if (date) {
                                    const formatted = toLocalDateString(date);
                                    setEndDate(formatted);
                                    setIsEndDateOpen(false);
                                    handleApplyFilters(startDate, formatted);
                                } else {
                                    setEndDate('');
                                    setIsEndDateOpen(false);
                                    handleApplyFilters(startDate, '');
                                }
                            }}
                        />
                    </div>

                    <DialogFooter className="mt-3 flex w-full items-center justify-between sm:justify-between">
                        {endDate ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setEndDate('');
                                    setIsEndDateOpen(false);
                                    handleApplyFilters(startDate, '');
                                }}
                                className="cursor-pointer text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40"
                            >
                                Hapus Filter Tanggal
                            </Button>
                        ) : (
                            <div />
                        )}
                        <Button variant="outline" size="sm" onClick={() => setIsEndDateOpen(false)} className="cursor-pointer text-xs font-semibold">
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
