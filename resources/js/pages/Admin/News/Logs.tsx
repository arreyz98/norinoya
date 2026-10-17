import { Eye, Newspaper, SearchCode, TrendingUp, Users } from 'lucide-react';

import LogsPage, { type LogsPageConfig, type LogsPageFilters, type LogsPageItem } from '@/components/admin/logs-page';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/pagination';

interface NewsViewLogItem extends LogsPageItem {
    news_id: number;
    news?: {
        id: number;
        title: string;
        slug: string;
        category: string;
        username?: string;
        display_name?: string;
    };
}

interface Props {
    logs: PaginatedData<NewsViewLogItem>;
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
        title: 'News',
        href: '/admin/news',
    },
    {
        title: 'View Logs',
        href: '/admin/news/logs',
    },
];

export default function Logs({ logs, filters, stats }: Props) {
    const config: LogsPageConfig<NewsViewLogItem> = {
        headTitle: 'News View Logs',
        pageTitle: 'Log Kunjungan & Waktu Berita',
        subtitle: 'Pencatatan riwayat waktu real-time saat artikel berita dilihat oleh pengunjung (dengan anti-spam 1 view/menit per IP).',
        breadcrumbs,
        backHref: route('admin.news.index'),
        crossLink: {
            href: route('admin.news.search-logs'),
            label: 'Keyword Logs',
            icon: SearchCode,
            iconClassName: 'text-emerald-600 dark:text-emerald-400',
        },
        exportHref: route('admin.news.logs.export', {
            search: filters?.search,
            news_id: filters?.news_id,
            start_date: filters?.start_date,
            end_date: filters?.end_date,
        }),
        routes: {
            list: 'admin.news.logs',
            destroy: 'admin.news.logs.destroy',
            clear: 'admin.news.logs.clear',
        },
        searchPlaceholder: 'Cari judul berita, IP address, user agent...',
        searchFormClassName: 'max-w-sm',
        entityFilterKey: 'news_id',
        entityFilterLabel: 'News',
        statCards: [
            { label: 'Total Log Tercatat', value: stats.total_views, icon: Eye, tone: 'brand' },
            { label: 'Kunjungan Hari Ini', value: stats.today_views, icon: TrendingUp, tone: 'emerald' },
            { label: 'Unique IP Pengunjung', value: stats.unique_ips, icon: Users, tone: 'blue' },
        ],
        columns: {
            entity: 'Judul Berita',
            time: 'Waktu & Jam Dilihat',
            entityCellClassName: 'max-w-[280px]',
        },
        emptyText: 'Belum ada riwayat log kunjungan berita yang tercatat sesuai kriteria filter.',
        deleteDialog: {
            title: 'Hapus Riwayat Log Berita',
            entityNoun: 'berita',
            fallbackTitle: 'berita',
            titleOf: (log) => log.news?.title,
        },
        clearDialog: {
            title: 'Bersihkan Seluruh Log Berita',
            allBoldText: 'seluruh data log kunjungan berita',
            note: 'Catatan: Jumlah counter views pada masing-masing berita tidak akan terpengaruh atau berkurang.',
        },
        calendar: {
            startDesc: 'Pilih tanggal awal untuk memfilter data log kunjungan berita.',
            endDesc: 'Pilih tanggal akhir untuk memfilter data log interaksi berita.',
        },
        renderEntityCell: (log) =>
            log.news ? (
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        <Newspaper className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span className="truncate">{log.news.title}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
                        <span className="rounded bg-neutral-100 px-1 capitalize dark:bg-neutral-800">{log.news.category || 'news'}</span>
                        {log.news.display_name && <span>Oleh: {log.news.display_name}</span>}
                    </div>
                </div>
            ) : (
                <span className="text-xs text-neutral-400 italic">Berita ID #{log.news_id} (Dihapus)</span>
            ),
    };

    return <LogsPage logs={logs} filters={filters} config={config} />;
}
