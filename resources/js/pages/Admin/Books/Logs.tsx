import { BookOpen, Eye, SearchCode, TrendingUp, Users } from 'lucide-react';

import LogsPage, { type LogsPageConfig, type LogsPageFilters, type LogsPageItem } from '@/components/admin/logs-page';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/pagination';

interface BookViewLogItem extends LogsPageItem {
    book_id: number;
    book?: {
        id: number;
        title: string;
        slug: string;
        volume: number;
        series?: {
            id: number;
            title: string;
        };
        publisher?: {
            id: number;
            name: string;
        };
    };
}

interface Props {
    logs: PaginatedData<BookViewLogItem>;
    filters?: LogsPageFilters;
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
        title: 'Books',
        href: '/admin/books',
    },
    {
        title: 'View Logs',
        href: '/admin/books/logs',
    },
];

export default function Logs({ logs, filters, stats }: Props) {
    const config: LogsPageConfig<BookViewLogItem> = {
        headTitle: 'Book View Logs',
        pageTitle: 'Log Kunjungan & Waktu Buku',
        subtitle: 'Pencatatan riwayat waktu real-time saat buku dilihat oleh pengunjung (dengan anti-spam 1 view/menit per IP).',
        breadcrumbs,
        backHref: route('admin.books.index'),
        crossLink: {
            href: route('admin.books.search-logs'),
            label: 'Keyword Logs',
            icon: SearchCode,
            iconClassName: 'text-blue-600 dark:text-blue-400',
        },
        exportHref: route('admin.books.logs.export', {
            search: filters?.search,
            book_id: filters?.book_id,
            start_date: filters?.start_date,
            end_date: filters?.end_date,
        }),
        routes: {
            list: 'admin.books.logs',
            destroy: 'admin.books.logs.destroy',
            clear: 'admin.books.logs.clear',
        },
        searchPlaceholder: 'Cari judul buku, IP address, user agent...',
        searchFormClassName: 'max-w-sm',
        entityFilterKey: 'book_id',
        entityFilterLabel: 'Book',
        statCards: [
            { label: 'Total Log Tercatat', value: stats.total_views, icon: Eye, tone: 'brand' },
            { label: 'Kunjungan Hari Ini', value: stats.today_views, icon: TrendingUp, tone: 'emerald' },
            { label: 'Unique IP Pengunjung', value: stats.unique_ips, icon: Users, tone: 'blue' },
        ],
        columns: {
            entity: 'Judul Buku / Jilid',
            time: 'Waktu & Jam Dilihat',
            entityCellClassName: 'max-w-[280px]',
        },
        emptyText: 'Belum ada riwayat log kunjungan yang tercatat sesuai kriteria filter.',
        deleteDialog: {
            title: 'Hapus Riwayat Log',
            entityNoun: 'buku',
            fallbackTitle: 'buku',
            titleOf: (log) => log.book?.title,
        },
        clearDialog: {
            title: 'Bersihkan Seluruh Log',
            allBoldText: 'seluruh data log kunjungan',
            note: 'Catatan: Jumlah counter views pada masing-masing buku tidak akan terpengaruh atau berkurang.',
        },
        calendar: {
            startDesc: 'Pilih tanggal awal untuk memfilter data log kunjungan buku.',
            endDesc: 'Pilih tanggal akhir untuk memfilter data log kunjungan buku.',
        },
        renderEntityCell: (log) =>
            log.book ? (
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        <BookOpen className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span className="truncate">{log.book.title}</span>
                        <span className="py-0.2 shrink-0 rounded bg-emerald-50 px-1.5 font-mono text-[10px] text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                            Vol {log.book.volume}
                        </span>
                    </div>
                    {log.book.publisher && <div className="font-mono text-[10px] text-neutral-400">{log.book.publisher.name}</div>}
                </div>
            ) : (
                <span className="text-xs text-neutral-400 italic">Buku ID #{log.book_id} (Dihapus)</span>
            ),
    };

    return <LogsPage logs={logs} filters={filters} config={config} />;
}
