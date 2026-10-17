import { Newspaper } from 'lucide-react';

import SearchLogsPage, { type SearchLogsPageConfig, type SearchLogsPageProps } from '@/components/admin/search-logs-page';
import { type BreadcrumbItem } from '@/types';

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

export default function SearchLogs(props: Omit<SearchLogsPageProps, 'config'>) {
    const config: SearchLogsPageConfig = {
        headTitle: 'Keyword Logs Pencarian Berita',
        pageTitle: 'Log Kata Kunci Pencarian Berita',
        subtitle: 'Riwayat kata kunci yang dicari pengunjung pada halaman berita & artikel (dilengkapi sanitasi dan anti-spam).',
        breadcrumbs,
        backHref: route('admin.news.index'),
        crossLink: {
            href: route('admin.news.logs'),
            label: 'Lihat View Logs',
            icon: Newspaper,
            iconClassName: 'text-emerald-600 dark:text-emerald-400',
        },
        exportHref: route('admin.news.search-logs.export', {
            search: props.filters?.search,
            start_date: props.filters?.start_date,
            end_date: props.filters?.end_date,
        }),
        routes: {
            list: 'admin.news.search-logs',
            destroy: 'admin.news.search-logs.destroy',
            clear: 'admin.news.search-logs.clear',
        },
        topLabel: 'Top Kata Kunci Berita Terpopuler:',
        searchPlaceholder: 'Cari kata kunci berita...',
        emptyTitle: 'Belum ada riwayat kata kunci pencarian berita',
        emptyDescription: 'Kata kunci yang diketik pengunjung saat mencari berita & artikel akan otomatis dicatat di sini.',
        dialog: {
            deleteTitle: 'Hapus Log Kata Kunci Berita?',
            clearTitle: 'Bersihkan Riwayat Log Kata Kunci Berita?',
            totalBoldText: 'data log kata kunci pencarian berita',
        },
        calendar: {
            startDesc: 'Pilih tanggal awal untuk memfilter data log kata kunci pencarian berita.',
            endDesc: 'Pilih tanggal akhir untuk memfilter data log kata kunci pencarian berita.',
        },
    };

    return <SearchLogsPage {...props} config={config} />;
}
