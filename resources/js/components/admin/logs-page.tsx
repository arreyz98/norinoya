import { Head, Link, router } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowLeft,
    Calendar as CalendarIcon,
    Clock,
    FileSpreadsheet,
    History,
    Laptop,
    RefreshCw,
    Search,
    Smartphone,
    Trash2,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/pagination';

import { formatDisplayDate, parseLocalDate, parseUserAgent, toLocalDateString } from './log-utils';

export interface LogsPageItem {
    id: number;
    ip_address: string | null;
    user_agent: string | null;
    created_at: string;
    action_type?: string;
}

export interface LogsPageFilters {
    search?: string;
    start_date?: string;
    end_date?: string;
    [key: string]: string | number | undefined;
}

export interface LogsStatCard {
    label: string;
    value: number;
    icon: LucideIcon;
    tone: 'brand' | 'emerald' | 'amber' | 'blue';
}

export interface LogsPageConfig<T extends LogsPageItem> {
    headTitle: string;
    pageTitle: string;
    subtitle: string;
    breadcrumbs: BreadcrumbItem[];
    backHref: string;
    crossLink: {
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
    searchPlaceholder: string;
    searchFormClassName: string;
    /** Key filter entitas pada query string, mis. `book_id` / `news_id` / `kios_item_id`. */
    entityFilterKey: string;
    entityFilterLabel: string;
    actionTypeOptions?: Array<{ value: string; label: string }>;
    statCards: LogsStatCard[];
    columns: {
        entity: string;
        activity?: string;
        time: string;
        entityCellClassName: string;
    };
    emptyText: string;
    deleteDialog: {
        title: string;
        entityNoun: string;
        fallbackTitle: string;
        titleOf: (log: T) => string | undefined;
    };
    clearDialog: {
        title: string;
        allBoldText: string;
        note: string;
    };
    calendar: {
        startDesc: string;
        endDesc: string;
    };
    renderEntityCell: (log: T) => ReactNode;
    renderActivityCell?: (log: T) => ReactNode;
}

export interface LogsPageProps<T extends LogsPageItem> {
    logs: PaginatedData<T>;
    filters?: LogsPageFilters;
    config: LogsPageConfig<T>;
}

const STAT_TONES: Record<LogsStatCard['tone'], { value: string; icon: string }> = {
    brand: {
        value: 'text-neutral-900 dark:text-white',
        icon: 'bg-[#112A12]/10 dark:bg-emerald-950/40 text-[#112A12] dark:text-emerald-400',
    },
    emerald: {
        value: 'text-emerald-600 dark:text-emerald-400',
        icon: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
    },
    amber: {
        value: 'text-amber-600 dark:text-amber-400',
        icon: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    },
    blue: {
        value: 'text-blue-600 dark:text-blue-400',
        icon: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
    },
};

/**
 * Halaman generik "View / Activity Logs" untuk admin (Books, News, Kios).
 * Semua perbedaan antar entitas dikirim lewat `config`.
 */
export default function LogsPage<T extends LogsPageItem>({ logs, filters: rawFilters, config }: LogsPageProps<T>) {
    const filters = rawFilters && !Array.isArray(rawFilters) ? rawFilters : {};
    const [search, setSearch] = useState(filters.search || '');
    const [startDate, setStartDate] = useState<string>(filters.start_date || '');
    const [endDate, setEndDate] = useState<string>(filters.end_date || '');
    const [actionType, setActionType] = useState<string>(filters.action_type ? String(filters.action_type) : 'all');

    // State for delete confirmations
    const [deleteItem, setDeleteItem] = useState<T | null>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Dialog open state for calendars
    const [isStartDateOpen, setIsStartDateOpen] = useState(false);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);

    const entityFilterValue = filters[config.entityFilterKey];
    const hasActionTypeSelect = Boolean(config.actionTypeOptions);

    const handleApplyFilters = (newStart?: string, newEnd?: string, newSearch?: string, newAction?: string) => {
        const queryStart = newStart !== undefined ? newStart : startDate;
        const queryEnd = newEnd !== undefined ? newEnd : endDate;
        const querySearch = newSearch !== undefined ? newSearch : search;
        const queryAction = newAction !== undefined ? newAction : actionType;

        const query: Record<string, string | number | undefined> = {
            search: querySearch || undefined,
            [config.entityFilterKey]: entityFilterValue || undefined,
            start_date: queryStart || undefined,
            end_date: queryEnd || undefined,
        };

        if (hasActionTypeSelect) {
            query.action_type = queryAction !== 'all' ? queryAction : undefined;
        }

        router.get(route(config.routes.list), query, { preserveState: true, preserveScroll: true });
    };

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleApplyFilters();
    };

    const handleReset = () => {
        setSearch('');
        setStartDate('');
        setEndDate('');
        setActionType('all');
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

        const data: Record<string, string | number | undefined> = {
            [config.entityFilterKey]: entityFilterValue || undefined,
            start_date: startDate || undefined,
            end_date: endDate || undefined,
        };

        if (hasActionTypeSelect) {
            data.action_type = actionType !== 'all' ? actionType : undefined;
        }

        router.delete(route(config.routes.clear), {
            data,
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
                setShowClearConfirm(false);
            },
        });
    };

    const columnCount = config.columns.activity ? 8 : 7;

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
                                <History className="h-6 w-6 text-[#112A12] dark:text-emerald-400" />
                                <span>{config.pageTitle}</span>
                            </h1>
                        </div>
                        <p className="mt-0.5 ml-10 text-xs text-neutral-500 dark:text-neutral-400">{config.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                        <Link href={config.crossLink.href}>
                            <Button
                                variant="outline"
                                className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border-neutral-300 px-3.5 text-xs font-bold text-neutral-800 shadow-2xs hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                            >
                                <config.crossLink.icon className={`h-4 w-4 ${config.crossLink.iconClassName}`} />
                                <span>{config.crossLink.label}</span>
                            </Button>
                        </Link>

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
                                title="Bersihkan log (seluruhnya atau sesuai filter tanggal)"
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
                <div className={`grid grid-cols-1 ${config.statCards.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-3 sm:gap-4`}>
                    {config.statCards.map((card) => {
                        const tone = STAT_TONES[card.tone];
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.label}
                                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs dark:border-neutral-800 dark:bg-neutral-900"
                            >
                                <div className="space-y-0.5">
                                    <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase dark:text-neutral-400">
                                        {card.label}
                                    </span>
                                    <div className={`font-sans text-2xl font-black ${tone.value}`}>{card.value.toLocaleString('id-ID')}</div>
                                </div>
                                <div className={`h-10 w-10 rounded-xl ${tone.icon} flex items-center justify-center`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filter & Search Bar with Date Pickers */}
                <div className="flex flex-col items-stretch justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-2xs lg:flex-row lg:items-center dark:border-neutral-800 dark:bg-neutral-900">
                    {/* Left: Search input */}
                    <form onSubmit={handleSearchSubmit} className={`flex flex-1 items-center gap-2 ${config.searchFormClassName}`}>
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder={config.searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-9 pl-9 text-xs"
                            />
                        </div>
                        {config.actionTypeOptions && (
                            <select
                                value={actionType}
                                onChange={(e) => {
                                    setActionType(e.target.value);
                                    handleApplyFilters(undefined, undefined, undefined, e.target.value);
                                }}
                                className="h-9 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-semibold dark:border-neutral-800 dark:bg-neutral-900"
                            >
                                <option value="all">Semua Tipe</option>
                                {config.actionTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        )}
                        <Button type="submit" variant="secondary" className="h-9 px-3 text-xs font-bold">
                            Cari
                        </Button>
                    </form>

                    {/* Right: Date Picker Buttons (Center Dialog Modal) and Reset */}
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

                        {entityFilterValue && (
                            <span className="rounded-md bg-neutral-100 px-2.5 py-1 font-mono text-xs font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                                Filter {config.entityFilterLabel} #{entityFilterValue}
                            </span>
                        )}

                        {(search || entityFilterValue || startDate || endDate || (hasActionTypeSelect && actionType !== 'all')) && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReset}
                                className="flex h-9 cursor-pointer items-center gap-1 px-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 dark:text-neutral-300"
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
                        <TableHeader className="bg-[#112A12] text-white">
                            <TableRow className="border-b border-[#112A12] hover:bg-transparent">
                                <TableHead className="w-16 text-center text-xs font-bold text-white">ID</TableHead>
                                <TableHead className="text-xs font-bold text-white">{config.columns.entity}</TableHead>
                                {config.columns.activity && <TableHead className="text-xs font-bold text-white">{config.columns.activity}</TableHead>}
                                <TableHead className="text-xs font-bold text-white">{config.columns.time}</TableHead>
                                <TableHead className="text-xs font-bold text-white">IP Address</TableHead>
                                <TableHead className="text-xs font-bold text-white">Device &amp; Browser</TableHead>
                                <TableHead className="text-xs font-bold text-white">User Agent</TableHead>
                                <TableHead className="w-16 text-right text-xs font-bold text-white">Aksi</TableHead>
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
                                            <TableCell className="text-center font-mono text-xs text-neutral-400">#{log.id}</TableCell>

                                            {/* Entity Title */}
                                            <TableCell className={config.columns.entityCellClassName}>{config.renderEntityCell(log)}</TableCell>

                                            {/* Activity Type Badge (opsional) */}
                                            {config.columns.activity && <TableCell>{config.renderActivityCell?.(log)}</TableCell>}

                                            {/* Timestamp (Date & Exact Hour) */}
                                            <TableCell>
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                                                        <Clock className="h-3.5 w-3.5 text-neutral-400" />
                                                        <span>
                                                            {dateObj.toLocaleTimeString('id-ID', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                second: '2-digit',
                                                            })}{' '}
                                                            WIB
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400">
                                                        <CalendarIcon className="h-3 w-3 text-neutral-400" />
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
                                                <span className="rounded-md border border-neutral-200/50 bg-neutral-100 px-2 py-0.5 font-mono text-xs font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                                    {log.ip_address || '127.0.0.1'}
                                                </span>
                                            </TableCell>

                                            {/* Device & Browser */}
                                            <TableCell>
                                                <div className="flex items-center gap-1.5">
                                                    {uaParsed.isMobile ? (
                                                        <span className="inline-flex items-center gap-1 rounded border border-purple-200 bg-purple-50 px-2 py-0.5 font-mono text-[11px] font-bold text-purple-700 dark:border-purple-800 dark:bg-purple-950/40 dark:text-purple-300">
                                                            <Smartphone className="h-3 w-3" />
                                                            <span>Mobile</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-50 px-2 py-0.5 font-mono text-[11px] font-bold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                                                            <Laptop className="h-3 w-3" />
                                                            <span>Desktop</span>
                                                        </span>
                                                    )}
                                                    <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                                                        {uaParsed.browser}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* User Agent tooltip string */}
                                            <TableCell
                                                className="max-w-[180px] truncate font-mono text-[10px] text-neutral-400"
                                                title={log.user_agent || ''}
                                            >
                                                {log.user_agent || '-'}
                                            </TableCell>

                                            {/* Actions (Delete Single) */}
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/40"
                                                    onClick={() => setDeleteItem(log)}
                                                    title="Hapus baris log ini"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columnCount} className="h-32 text-center text-xs text-neutral-500">
                                        {config.emptyText}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {logs.last_page > 1 && (
                    <div className="flex items-center justify-between pt-2 text-xs text-neutral-500">
                        <span>
                            Halaman {logs.current_page} dari {logs.last_page} ({logs.total} total log)
                        </span>
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
                                        className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                                            link.active
                                                ? 'border-neutral-900 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                                : !link.url
                                                  ? 'cursor-not-allowed border-neutral-200 opacity-40 dark:border-neutral-800'
                                                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Dialog Konfirmasi Hapus Satuan */}
            <Dialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="h-5 w-5" />
                            <span>{config.deleteDialog.title}</span>
                        </DialogTitle>
                        <DialogDescription className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                            Apakah Anda yakin ingin menghapus data log ID <strong>#{deleteItem?.id}</strong> untuk {config.deleteDialog.entityNoun}{' '}
                            <strong>{(deleteItem ? config.deleteDialog.titleOf(deleteItem) : undefined) || config.deleteDialog.fallbackTitle}</strong>
                            ? Tindakan ini tidak dapat dibatalkan.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2">
                        <Button variant="outline" size="sm" onClick={() => setDeleteItem(null)} disabled={isDeleting}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={confirmDeleteSingle}
                            disabled={isDeleting}
                            className="cursor-pointer bg-red-600 font-bold text-white hover:bg-red-700"
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
                            <AlertTriangle className="h-5 w-5" />
                            <span>{config.clearDialog.title}</span>
                        </DialogTitle>
                        <DialogDescription className="mt-2 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                            <p>
                                {startDate || endDate ? (
                                    <>
                                        Anda akan menghapus data log dalam rentang{' '}
                                        <strong>{startDate ? formatDisplayDate(startDate) : 'awal'}</strong> s/d{' '}
                                        <strong>{endDate ? formatDisplayDate(endDate) : 'sekarang'}</strong>.
                                    </>
                                ) : (
                                    <>
                                        Anda akan menghapus <strong>{config.clearDialog.allBoldText}</strong> yang ada di database.
                                    </>
                                )}
                            </p>
                            <p className="text-[11px] text-neutral-500">
                                <em>{config.clearDialog.note}</em>
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowClearConfirm(false)} disabled={isDeleting}>
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={confirmClearLogs}
                            disabled={isDeleting}
                            className="cursor-pointer bg-red-600 font-bold text-white hover:bg-red-700"
                        >
                            {isDeleting ? 'Membersihkan...' : 'Bersihkan Sekarang'}
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
