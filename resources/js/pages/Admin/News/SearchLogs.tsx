import { Head, Link, router } from '@inertiajs/react';
import { 
    SearchCode, ArrowLeft, Search, Calendar as CalendarIcon, Clock, TrendingUp, RefreshCw, FileSpreadsheet, Trash2, X, AlertTriangle, Hash, Sparkles, Newspaper
} from 'lucide-react';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';

interface SearchLogItem {
    id: number;
    keyword: string;
    search_count: number;
    search_date: string;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData<T> {
    current_page: number;
    data: T[];
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
    logs: PaginationData<SearchLogItem>;
    filters?: {
        search?: string;
        start_date?: string;
        end_date?: string;
    };
    stats: {
        total_searches: number;
        today_searches: number;
        unique_keywords: number;
    };
    topSearches: Array<{
        keyword: string;
        total_count: number;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Berita',
        href: '/admin/news',
    },
    {
        title: 'Keyword Logs',
        href: '/admin/news/search-logs',
    },
];

export default function SearchLogs({ logs, filters: rawFilters, stats, topSearches }: Props) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [search, setSearch] = useState(filters.search || '');
    const [startDate, setStartDate] = useState<string>(filters.start_date || '');
    const [endDate, setEndDate] = useState<string>(filters.end_date || '');

    const [deleteItem, setDeleteItem] = useState<SearchLogItem | null>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isStartDateOpen, setIsStartDateOpen] = useState(false);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);

    const handleApplyFilters = (newStart?: string, newEnd?: string, newSearch?: string) => {
        const queryStart = newStart !== undefined ? newStart : startDate;
        const queryEnd = newEnd !== undefined ? newEnd : endDate;
        const querySearch = newSearch !== undefined ? newSearch : search;

        router.get(
            route('admin.news.search-logs'),
            {
                search: querySearch || undefined,
                start_date: queryStart || undefined,
                end_date: queryEnd || undefined,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleApplyFilters();
    };

    const handleReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        router.get(route('admin.news.search-logs'), {}, { preserveScroll: true });
    };

    const toLocalDateString = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (dateString?: string) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const d = new Date(year, month, day);
            return d.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        }
        return dateString;
    };

    const confirmDeleteSingle = () => {
        if (!deleteItem) return;
        setIsDeleting(true);

        router.delete(route('admin.news.search-logs.destroy', deleteItem.id), {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setDeleteItem(null);
            },
        });
    };

    const confirmClearLogs = () => {
        setIsDeleting(true);

        router.delete(route('admin.news.search-logs.clear'), {
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

    const formatDateTime = (dateString: string) => {
        if (!dateString) return '-';
        const d = new Date(dateString);
        return d.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Keyword Logs Pencarian Berita" />

            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-6">
                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href={route('admin.news.index')}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
                                <SearchCode className="w-6 h-6 text-[#112A12] dark:text-emerald-400" />
                                <span>Log Kata Kunci Pencarian Berita</span>
                            </h1>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10">
                            Riwayat kata kunci yang dicari pengunjung pada halaman berita & artikel (dilengkapi sanitasi dan anti-spam).
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <Link href={route('admin.news.logs')}>
                            <Button variant="outline" className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs">
                                <Newspaper className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Lihat View Logs</span>
                            </Button>
                        </Link>

                        <a
                            href={route('admin.news.search-logs.export', {
                                search: filters.search,
                                start_date: filters.start_date,
                                end_date: filters.end_date,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >
                            <Button 
                                className="bg-[#0F9D58] hover:bg-[#0b8043] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs"
                                title="Download format CSV yang kompatibel langsung dengan Google Sheets & Excel"
                            >
                                <FileSpreadsheet className="w-4 h-4" />
                                <span>Export Google Sheets</span>
                            </Button>
                        </a>

                        {logs.data.length > 0 && (
                            <Button 
                                variant="outline"
                                onClick={() => setShowClearConfirm(true)}
                                className="h-9 px-3 text-xs font-bold flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border-red-200 dark:border-red-900/50 cursor-pointer"
                                title="Bersihkan log (seluruhnya atau sesuai filter tanggal/kata kunci)"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Bersihkan Log</span>
                            </Button>
                        )}

                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.reload()}
                            className="h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Refresh</span>
                        </Button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                                Total Frekuensi Pencarian
                            </span>
                            <div className="text-2xl font-sans font-black text-neutral-900 dark:text-white">
                                {stats.total_searches.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center">
                            <Search className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                                Pencarian Hari Ini
                            </span>
                            <div className="text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400">
                                {stats.today_searches.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                                Kata Kunci Unik
                            </span>
                            <div className="text-2xl font-sans font-black text-blue-600 dark:text-blue-400">
                                {stats.unique_keywords.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <Hash className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Top Popular Keywords Banner */}
                {topSearches && topSearches.length > 0 && (
                    <div className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#DA6B1C] shrink-0" />
                            <span className="text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300">
                                Top Kata Kunci Berita Terpopuler:
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {topSearches.map((item, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        setSearch(item.keyword);
                                        handleApplyFilters(undefined, undefined, item.keyword);
                                    }}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-emerald-500 text-neutral-800 dark:text-neutral-200 cursor-pointer shadow-3xs transition-all"
                                >
                                    <span className="font-semibold text-[#112A12] dark:text-emerald-400">#{idx + 1}</span>
                                    <span>{item.keyword}</span>
                                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-1.5 py-0.5 rounded">
                                        {Number(item.total_count).toLocaleString('id-ID')}x
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter & Search Bar with Date Pickers */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs">
                    {/* Left: Search input */}
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-sm">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Cari kata kunci berita..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-9 text-xs"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>

                    {/* Right: 2 Date Picker Buttons and Reset */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">Dari:</span>
                            <Button
                                variant="outline"
                                onClick={() => setIsStartDateOpen(true)}
                                className={`h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${
                                    !startDate && 'text-neutral-400'
                                }`}
                            >
                                <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{startDate ? formatDisplayDate(startDate) : 'Pilih Tanggal'}</span>
                            </Button>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">Sampai:</span>
                            <Button
                                variant="outline"
                                onClick={() => setIsEndDateOpen(true)}
                                className={`h-9 px-3 text-xs font-medium justify-start text-left gap-2 border-neutral-200 dark:border-neutral-800 ${
                                    !endDate && 'text-neutral-400'
                                }`}
                            >
                                <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{endDate ? formatDisplayDate(endDate) : 'Pilih Tanggal'}</span>
                            </Button>
                        </div>

                        {(search || startDate || endDate) && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="h-9 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Reset Filter</span>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table Data */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
                    <Table>
                        <TableHeader className="bg-neutral-50/70 dark:bg-neutral-800/50">
                            <TableRow className="border-neutral-200 dark:border-neutral-800">
                                <TableHead className="w-[80px] text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                                    ID
                                </TableHead>
                                <TableHead className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                                    Kata Kunci (Keyword)
                                </TableHead>
                                <TableHead className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                                    Frekuensi Pencarian
                                </TableHead>
                                <TableHead className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                                    Tanggal Pencarian
                                </TableHead>
                                <TableHead className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                                    Terakhir Dicari
                                </TableHead>
                                <TableHead className="w-[100px] text-right text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-48 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-neutral-400 dark:text-neutral-500">
                                            <SearchCode className="w-8 h-8 stroke-1" />
                                            <p className="text-sm font-medium">Belum ada riwayat kata kunci pencarian berita</p>
                                            <p className="text-xs text-neutral-400">
                                                Kata kunci yang diketik pengunjung saat mencari berita & artikel akan otomatis dicatat di sini.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                logs.data.map((log) => {
                                    return (
                                        <TableRow 
                                            key={log.id} 
                                            className="border-neutral-100 dark:border-neutral-800/60 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
                                        >
                                            <TableCell className="font-mono text-xs text-neutral-400">
                                                #{log.id}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium font-mono text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-700">
                                                        {log.keyword}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                                                    <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                                                    <span>{log.search_count.toLocaleString('id-ID')}x dicari</span>
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300 font-sans">
                                                    <CalendarIcon className="w-3.5 h-3.5 text-neutral-400" />
                                                    <span>{formatDisplayDate(log.search_date)}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                                                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                                    <span>{formatDateTime(log.updated_at)}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteItem(log)}
                                                    className="h-8 w-8 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                                                    title="Hapus log kata kunci ini"
                                                >
                                                    <Trash2 className="w-4 h-4" />
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
                        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
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
                                                className="h-8 text-xs font-semibold opacity-50 cursor-not-allowed"
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
                                                        : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
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
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white">
                            Hapus Log Kata Kunci Berita?
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500 dark:text-neutral-400">
                            Apakah Anda yakin ingin menghapus riwayat kata kunci <span className="font-bold text-neutral-900 dark:text-white font-mono">"{deleteItem?.keyword}"</span> pada tanggal <span className="font-bold text-neutral-900 dark:text-white">{formatDisplayDate(deleteItem?.search_date)}</span>? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex items-center justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={isDeleting}
                            onClick={() => setDeleteItem(null)}
                            className="text-xs font-semibold cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={isDeleting}
                            onClick={confirmDeleteSingle}
                            className="text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white"
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
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-1">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white">
                            Bersihkan Riwayat Log Kata Kunci Berita?
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1.5">
                            <p>
                                {startDate || endDate || search ? (
                                    <span>
                                        Data log kata kunci pencarian berita yang sesuai dengan <strong>filter aktif saat ini</strong> akan dihapus permanen.
                                    </span>
                                ) : (
                                    <span>
                                        <strong>Seluruh ({stats.total_searches.toLocaleString('id-ID')})</strong> data log kata kunci pencarian berita akan dihapus secara permanen dari database.
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
                            className="text-xs font-semibold cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={isDeleting}
                            onClick={confirmClearLogs}
                            className="text-xs font-semibold cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? 'Membersihkan...' : 'Ya, Bersihkan Sekarang'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Dialog Calendar 'Dari' */}
            <Dialog open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <DialogContent className="max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center">
                    <DialogHeader className="w-full text-center sm:text-center pb-2">
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-emerald-600" />
                            <span>Pilih Tanggal Mulai (Dari)</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500">
                            Pilih tanggal awal untuk memfilter data log kata kunci pencarian berita.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="w-full flex justify-center py-2">
                        <Calendar
                            mode="single"
                            className="w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs"
                            classNames={{
                                root: "w-full",
                                months: "w-full flex flex-col items-center",
                                month: "w-full space-y-4",
                                month_grid: "w-full border-collapse",
                                weekdays: "flex w-full justify-between",
                                weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
                                week: "flex w-full justify-between mt-2",
                                day: "flex-1 aspect-square flex items-center justify-center p-0",
                            }}
                            selected={startDate ? (() => {
                                const parts = startDate.split('-');
                                return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : undefined;
                            })() : undefined}
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

                    <DialogFooter className="w-full mt-3 flex items-center justify-between sm:justify-between">
                        {startDate ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setStartDate('');
                                    setIsStartDateOpen(false);
                                    handleApplyFilters('', endDate);
                                }}
                                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                            >
                                Hapus Filter Tanggal
                            </Button>
                        ) : <div />}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsStartDateOpen(false)}
                            className="text-xs font-semibold cursor-pointer"
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal Dialog Calendar 'Sampai' */}
            <Dialog open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <DialogContent className="max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center">
                    <DialogHeader className="w-full text-center sm:text-center pb-2">
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-emerald-600" />
                            <span>Pilih Tanggal Akhir (Sampai)</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500">
                            Pilih tanggal akhir untuk memfilter data log kata kunci pencarian berita.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="w-full flex justify-center py-2">
                        <Calendar
                            mode="single"
                            className="w-full p-4 [--cell-size:3.2rem] rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-2xs"
                            classNames={{
                                root: "w-full",
                                months: "w-full flex flex-col items-center",
                                month: "w-full space-y-4",
                                month_grid: "w-full border-collapse",
                                weekdays: "flex w-full justify-between",
                                weekday: "text-muted-foreground flex-1 text-center font-bold text-xs py-1",
                                week: "flex w-full justify-between mt-2",
                                day: "flex-1 aspect-square flex items-center justify-center p-0",
                            }}
                            selected={endDate ? (() => {
                                const parts = endDate.split('-');
                                return parts.length === 3 ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)) : undefined;
                            })() : undefined}
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

                    <DialogFooter className="w-full mt-3 flex items-center justify-between sm:justify-between">
                        {endDate ? (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setEndDate('');
                                    setIsEndDateOpen(false);
                                    handleApplyFilters(startDate, '');
                                }}
                                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                            >
                                Hapus Filter Tanggal
                            </Button>
                        ) : <div />}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEndDateOpen(false)}
                            className="text-xs font-semibold cursor-pointer"
                        >
                            Tutup
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
