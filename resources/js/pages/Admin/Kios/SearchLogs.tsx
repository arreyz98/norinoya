import { Store } from 'lucide-react';

import SearchLogsPage, { type SearchLogsPageConfig, type SearchLogsPageProps } from '@/components/admin/search-logs-page';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Kios',
        href: '/admin/kios',
    },
    {
        title: 'Keyword Logs',
        href: '/admin/kios/search-logs',
    },
];

export default function SearchLogs(props: Omit<SearchLogsPageProps, 'config'>) {
    const config: SearchLogsPageConfig = {
        headTitle: 'Keyword Logs Pencarian Kios',
        pageTitle: 'Log Kata Kunci Pencarian Kios',
        subtitle: 'Riwayat kata kunci yang dicari pengunjung pada etalase katalog produk kios (dilengkapi sanitasi dan anti-spam).',
        breadcrumbs,
        backHref: route('admin.kios.index'),
        crossLink: {
            href: route('admin.kios.logs'),
            label: 'Lihat Aktivitas Kios',
            icon: Store,
            iconClassName: 'text-emerald-600 dark:text-emerald-400',
        },
        exportHref: route('admin.kios.search-logs.export', {
            search: props.filters?.search,
            start_date: props.filters?.start_date,
            end_date: props.filters?.end_date,
        }),
        routes: {
            list: 'admin.kios.search-logs',
            destroy: 'admin.kios.search-logs.destroy',
            clear: 'admin.kios.search-logs.clear',
        },
        topLabel: 'Top Kata Kunci Kios Terpopuler:',
        searchPlaceholder: 'Cari kata kunci produk kios...',
        emptyTitle: 'Belum ada riwayat kata kunci pencarian produk kios',
        emptyDescription: 'Kata kunci yang diketik pengunjung saat mencari produk di etalase kios akan otomatis dicatat di sini.',
        dialog: {
            deleteTitle: 'Hapus Log Kata Kunci Kios?',
            clearTitle: 'Bersihkan Riwayat Log Kata Kunci Kios?',
            totalBoldText: 'data log kata kunci pencarian kios',
        },
        calendar: {
            startDesc: 'Pilih tanggal awal untuk memfilter data log kata kunci pencarian kios.',
            endDesc: 'Pilih tanggal akhir untuk memfilter data log kata kunci pencarian kios.',
        },
    };

    return <SearchLogsPage {...props} config={config} />;
}
