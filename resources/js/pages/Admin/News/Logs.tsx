import { Head, Link, router } from '@inertiajs/react';
import { 
    History, ArrowLeft, Search, Eye, Calendar as CalendarIcon, Clock, Laptop, Smartphone, Newspaper, TrendingUp, Users, RefreshCw, FileSpreadsheet, Trash2, X, AlertTriangle, SearchCode
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

interface NewsViewLogItem {
    id: number;
    news_id: number;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    news?: {
        id: number;
        title: string;
        slug: string;
        category: string;
        username?: string;
        display_name?: string;
    };
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
    logs: PaginationData<NewsViewLogItem>;
    filters?: {
        search?: string;
        news_id?: string | number;
        start_date?: string;
        end_date?: string;
    };
    stats: {
        total_views: number;
        today_views: number;
        unique_ips: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'News',
        href: '/admin/news',
    },
    {
        title: 'View Logs',
        href: '/admin/news/logs',
    },
];

export default function Logs({ logs, filters: rawFilters, stats }: Props) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [search, setSearch] = useState(filters.search || '');
    const [startDate, setStartDate] = useState<string>(filters.start_date || '');
    const [endDate, setEndDate] = useState<string>(filters.end_date || '');

    // State for delete confirmations
    const [deleteItem, setDeleteItem] = useState<NewsViewLogItem | null>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Dialog open state for calendars
    const [isStartDateOpen, setIsStartDateOpen] = useState(false);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);

    const handleApplyFilters = (newStart?: string, newEnd?: string, newSearch?: string) => {
        const queryStart = newStart !== undefined ? newStart : startDate;
        const queryEnd = newEnd !== undefined ? newEnd : endDate;
        const querySearch = newSearch !== undefined ? newSearch : search;

        router.get(
            route('admin.news.logs'),
            {
                search: querySearch || undefined,
                news_id: filters.news_id || undefined,
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
        router.get(route('admin.news.logs'), {}, { preserveScroll: true });
    };

    // Format local Date object to YYYY-MM-DD string without UTC shift
    const toLocalDateString = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Format date string for display (YYYY-MM-DD to localized date)
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

    // Handle delete single log
    const confirmDeleteSingle = () => {
        if (!deleteItem) return;
        setIsDeleting(true);

        router.delete(route('admin.news.logs.destroy', deleteItem.id), {
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

        router.delete(route('admin.news.logs.clear'), {
            data: {
                news_id: filters.news_id || undefined,
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

    // Helper to extract device/browser info from User-Agent
    const parseUserAgent = (ua: string | null) => {
        if (!ua) return { device: 'Unknown', browser: 'Unknown', isMobile: false };
        const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
        let browser = 'Browser';
        if (/edg/i.test(ua)) browser = 'Edge';
        else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
        else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
        else if (/safari/i.test(ua)) browser = 'Safari';
        else if (/opera|opr/i.test(ua)) browser = 'Opera';

        return {
            device: isMobile ? 'Mobile' : 'Desktop',
            browser,
            isMobile,
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News View Logs" />

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
                                <History className="w-6 h-6 text-[#112A12] dark:text-emerald-400" />
                                <span>Log Kunjungan &amp; Waktu Berita</span>
                            </h1>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 ml-10">
                            Pencatatan riwayat waktu real-time saat artikel berita dilihat oleh pengunjung (dengan anti-spam 1 view/menit per IP).
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                        <Link href={route('admin.news.search-logs')}>
                            <Button variant="outline" className="border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3.5 h-9 rounded-lg shadow-2xs">
                                <SearchCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                <span>Keyword Logs</span>
                            </Button>
                        </Link>

                        <a
                            href={route('admin.news.logs.export', {
                                search: filters.search,
                                news_id: filters.news_id,
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
                                title="Bersihkan log (seluruhnya atau sesuai filter tanggal)"
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
                                Total Log Tercatat
                            </span>
                            <div className="text-2xl font-sans font-black text-neutral-900 dark:text-white">
                                {stats.total_views.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400 flex items-center justify-center">
                            <Eye className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                                Kunjungan Hari Ini
                            </span>
                            <div className="text-2xl font-sans font-black text-emerald-600 dark:text-emerald-400">
                                {stats.today_views.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between">
                        <div className="space-y-0.5">
                            <span className="text-[11px] font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase">
                                Unique IP Pengunjung
                            </span>
                            <div className="text-2xl font-sans font-black text-blue-600 dark:text-blue-400">
                                {stats.unique_ips.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Filter & Search Bar with Date Pickers */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-2xs">
                    {/* Left: Search input */}
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-sm">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Cari judul berita, IP address, user agent..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 h-9 text-xs"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>

                    {/* Right: Date Pickers and Reset */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Tombol Date Picker 'Dari' */}
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

                        {/* Tombol Date Picker 'Sampai' */}
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

                        {filters.news_id && (
                            <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                                Filter News #{filters.news_id}
                            </span>
                        )}

                        {(search || filters.news_id || startDate || endDate) && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="h-9 px-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 flex items-center gap-1 cursor-pointer"
                            >
                                <X className="w-3.5 h-3.5" />
                                <span>Reset Filter</span>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Table Data */}
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-2xs">
                    <Table>
                        <TableHeader className="bg-[#112A12] text-white">
                            <TableRow className="border-b border-[#112A12] hover:bg-transparent">
                                <TableHead className="w-16 text-center text-xs font-bold text-white">ID</TableHead>
                                <TableHead className="text-xs font-bold text-white">Judul Berita</TableHead>
                                <TableHead className="text-xs font-bold text-white">Waktu &amp; Jam Dilihat</TableHead>
                                <TableHead className="text-xs font-bold text-white">IP Address</TableHead>
                                <TableHead className="text-xs font-bold text-white">Device &amp; Browser</TableHead>
                                <TableHead className="text-xs font-bold text-white">User Agent</TableHead>
                                <TableHead className="text-right text-xs font-bold w-16 text-white">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.data.length > 0 ? (
                                logs.data.map((log) => {
                                    const uaParsed = parseUserAgent(log.user_agent);
                                    const dateObj = new Date(log.created_at);

                                    return (
                                        <TableRow key={log.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40">
                                            {/* ID */}
                                            <TableCell className="text-center font-mono text-xs text-neutral-400">
                                                #{log.id}
                                            </TableCell>

                                            {/* News Title */}
                                            <TableCell className="max-w-[280px]">
                                                {log.news ? (
                                                    <div className="space-y-0.5">
                                                        <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                                                            <Newspaper className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                                            <span className="truncate">{log.news.title}</span>
                                                        </div>
                                                        <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-2">
                                                            <span className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded capitalize">{log.news.category || 'news'}</span>
                                                            {log.news.display_name && (
                                                                <span>Oleh: {log.news.display_name}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-neutral-400 italic">Berita ID #{log.news_id} (Dihapus)</span>
                                                )}
                                            </TableCell>

                                            {/* Timestamp (Date & Exact Hour) */}
                                            <TableCell>
                                                <div className="space-y-0.5">
                                                    <div className="font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                                                        <span>
                                                            {dateObj.toLocaleTimeString('id-ID', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                second: '2-digit',
                                                            })} WIB
                                                        </span>
                                                    </div>
                                                    <div className="font-mono text-[10px] text-neutral-400 flex items-center gap-1.5">
                                                        <CalendarIcon className="w-3 h-3 text-neutral-400" />
                                                        <span>
                                                            {dateObj.toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* IP Address */}
                                            <TableCell>
                                                <span className="font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200/50 dark:border-neutral-700">
                                                    {log.ip_address || '127.0.0.1'}
                                                </span>
                                            </TableCell>

                                            {/* Device & Browser */}
                                            <TableCell>
                                                <div className="flex items-center gap-1.5">
                                                    {uaParsed.isMobile ? (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800">
                                                            <Smartphone className="w-3 h-3" />
                                                            <span>Mobile</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                                                            <Laptop className="w-3 h-3" />
                                                            <span>Desktop</span>
                                                        </span>
                                                    )}
                                                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                                                        {uaParsed.browser}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* User Agent tooltip string */}
                                            <TableCell className="max-w-[180px] truncate font-mono text-[10px] text-neutral-400" title={log.user_agent || ''}>
                                                {log.user_agent || '-'}
                                            </TableCell>

                                            {/* Actions (Delete Single) */}
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                                                    onClick={() => setDeleteItem(log)}
                                                    title="Hapus baris log ini"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-32 text-center text-xs text-neutral-500">
                                        Belum ada riwayat log kunjungan berita yang tercatat sesuai kriteria filter.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {logs.last_page > 1 && (
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                        <span>Halaman {logs.current_page} dari {logs.last_page} ({logs.total} total log)</span>
                        <div className="flex gap-1">
                            {logs.links.map((link, idx) => {
                                let label = link.label;
                                if (label.includes('pagination.previous') || label.includes('&laquo;') || label.includes('Previous')) {
                                    label = '&laquo; Previous';
                                } else if (label.includes('pagination.next') || label.includes('&raquo;') || label.includes('Next')) {
                                    label = 'Next &raquo;';
                                }

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
                                        dangerouslySetInnerHTML={{ __html: label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Dialog Calendar 'Dari' (Tengah Layar) */}
            <Dialog open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                <DialogContent className="max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center">
                    <DialogHeader className="w-full text-center sm:text-center pb-2">
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-emerald-600" />
                            <span>Pilih Tanggal Mulai (Dari)</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500">
                            Pilih tanggal awal untuk memfilter data log kunjungan berita.
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

            {/* Modal Dialog Calendar 'Sampai' (Tengah Layar) */}
            <Dialog open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                <DialogContent className="max-w-lg w-[92vw] sm:w-[500px] p-6 flex flex-col items-center justify-center">
                    <DialogHeader className="w-full text-center sm:text-center pb-2">
                        <DialogTitle className="text-base font-bold text-neutral-900 dark:text-white flex items-center justify-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-emerald-600" />
                            <span>Pilih Tanggal Akhir (Sampai)</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-500">
                            Pilih tanggal akhir untuk memfilter data log interaksi berita.
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

            {/* Dialog Konfirmasi Hapus Satuan */}
            <Dialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            <span>Hapus Riwayat Log Berita</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
                            Apakah Anda yakin ingin menghapus data log ID <strong>#{deleteItem?.id}</strong> untuk berita <strong>{deleteItem?.news?.title || 'berita'}</strong>?
                            Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteItem(null)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={confirmDeleteSingle}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                        >
                            {isDeleting ? 'Menghapus...' : 'Ya, Hapus Log'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Dialog Konfirmasi Bersihkan Log (Clear) */}
            <Dialog open={showClearConfirm} onOpenChange={setShowClearConfirm}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            <span>Bersihkan Seluruh Log Berita</span>
                        </DialogTitle>
                        <DialogDescription className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 space-y-2">
                            <p>
                                {startDate || endDate ? (
                                    <>
                                        Anda akan menghapus data log dalam rentang{' '}
                                        <strong>{startDate ? formatDisplayDate(startDate) : 'awal'}</strong> s/d{' '}
                                        <strong>{endDate ? formatDisplayDate(endDate) : 'sekarang'}</strong>.
                                    </>
                                ) : (
                                    <>Anda akan menghapus <strong>seluruh data log kunjungan berita</strong> yang ada di database.</>
                                )}
                            </p>
                            <p className="text-[11px] text-neutral-500">
                                <em>Catatan: Jumlah counter views pada masing-masing berita tidak akan terpengaruh atau berkurang.</em>
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowClearConfirm(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={confirmClearLogs}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
                        >
                            {isDeleting ? 'Membersihkan...' : 'Bersihkan Sekarang'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
