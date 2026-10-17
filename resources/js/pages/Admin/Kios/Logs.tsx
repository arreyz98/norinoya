import { Eye, MousePointerClick, SearchCode, ShoppingBag, TrendingUp, Users } from 'lucide-react';

import LogsPage, { type LogsPageConfig, type LogsPageFilters, type LogsPageItem } from '@/components/admin/logs-page';
import { type BreadcrumbItem } from '@/types';
import { type PaginatedData } from '@/types/pagination';

interface KiosViewLogItem extends LogsPageItem {
    kios_item_id: number;
    action_type: string;
    kios_item?: {
        id: number;
        title: string;
        slug: string;
        category: string;
        publisher_name?: string;
        price: number;
        is_preloved: boolean;
    };
}

interface Props {
    logs: PaginatedData<KiosViewLogItem>;
    filters?: LogsPageFilters & { action_type?: string };
    stats: {
        total_views: number;
        total_clicks: number;
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
        title: 'Kios Merch & Preloved',
        href: '/admin/kios',
    },
    {
        title: 'Activity Logs',
        href: '/admin/kios/logs',
    },
];

const renderActionBadge = (action: string) => {
    if (action === 'view') {
        return (
            <span className="inline-flex items-center gap-1 rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Eye className="h-3 w-3" />
                <span>View Detail</span>
            </span>
        );
    }

    const platform = action.replace('click_', '');

    return (
        <span className="inline-flex items-center gap-1 rounded border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-700 uppercase dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <MousePointerClick className="h-3 w-3" />
            <span>Klik {platform}</span>
        </span>
    );
};

export default function Logs({ logs, filters, stats }: Props) {
    const config: LogsPageConfig<KiosViewLogItem> = {
        headTitle: 'Kios Activity Logs',
        pageTitle: 'Log Kunjungan & Klik Produk Kios',
        subtitle: 'Pencatatan riwayat waktu saat produk dilihat atau link pembelian diklik oleh pembeli.',
        breadcrumbs,
        backHref: route('admin.kios.index'),
        crossLink: {
            href: route('admin.kios.search-logs'),
            label: 'Keyword Logs',
            icon: SearchCode,
            iconClassName: 'text-emerald-600 dark:text-emerald-400',
        },
        exportHref: route('admin.kios.logs.export', {
            search: filters?.search,
            kios_item_id: filters?.kios_item_id,
            action_type: filters?.action_type,
            start_date: filters?.start_date,
            end_date: filters?.end_date,
        }),
        routes: {
            list: 'admin.kios.logs',
            destroy: 'admin.kios.logs.destroy',
            clear: 'admin.kios.logs.clear',
        },
        searchPlaceholder: 'Cari judul produk, IP, user agent...',
        searchFormClassName: 'max-w-md',
        entityFilterKey: 'kios_item_id',
        entityFilterLabel: 'Kios',
        actionTypeOptions: [
            { value: 'view', label: 'View Detail' },
            { value: 'click_shopee', label: 'Klik Shopee' },
            { value: 'click_tokopedia', label: 'Klik Tokopedia' },
            { value: 'click_gramedia', label: 'Klik Gramedia' },
            { value: 'click_toco', label: 'Klik Toco' },
        ],
        statCards: [
            { label: 'Total View Produk', value: stats.total_views, icon: Eye, tone: 'brand' },
            { label: 'Total Klik Pembelian', value: stats.total_clicks, icon: MousePointerClick, tone: 'amber' },
            { label: 'Aktivitas Hari Ini', value: stats.today_views, icon: TrendingUp, tone: 'emerald' },
            { label: 'Unique IP Pengunjung', value: stats.unique_ips, icon: Users, tone: 'blue' },
        ],
        columns: {
            entity: 'Produk / Item',
            activity: 'Aktivitas',
            time: 'Waktu & Jam',
            entityCellClassName: 'max-w-[260px]',
        },
        emptyText: 'Belum ada riwayat log aktivitas kios yang tercatat sesuai kriteria filter.',
        deleteDialog: {
            title: 'Hapus Riwayat Log Kios',
            entityNoun: 'produk',
            fallbackTitle: 'item',
            titleOf: (log) => log.kios_item?.title,
        },
        clearDialog: {
            title: 'Bersihkan Seluruh Log Kios',
            allBoldText: 'seluruh data log aktivitas kios',
            note: 'Catatan: Jumlah counter views dan klik pada masing-masing produk kios tidak akan terpengaruh atau berkurang.',
        },
        calendar: {
            startDesc: 'Pilih tanggal awal untuk memfilter data log aktivitas kios.',
            endDesc: 'Pilih tanggal akhir untuk memfilter data log aktivitas kios.',
        },
        renderEntityCell: (log) =>
            log.kios_item ? (
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span className="truncate">{log.kios_item.title}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
                        <span className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">{log.kios_item.is_preloved ? 'Preloved' : 'Partner'}</span>
                        {log.kios_item.publisher_name && <span>{log.kios_item.publisher_name}</span>}
                    </div>
                </div>
            ) : (
                <span className="text-xs text-neutral-400 italic">Item Kios #{log.kios_item_id} (Dihapus)</span>
            ),
        renderActivityCell: (log) => renderActionBadge(log.action_type),
    };

    return <LogsPage logs={logs} filters={filters} config={config} />;
}
