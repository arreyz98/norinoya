import SearchLogsPage, { type SearchLogsPageConfig, type SearchLogsPageProps } from '@/components/admin/search-logs-page';
import { type BreadcrumbItem } from '@/types';

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
        title: 'Keyword Logs',
        href: '/admin/books/search-logs',
    },
];

export default function SearchLogs(props: Omit<SearchLogsPageProps, 'config'>) {
    const config: SearchLogsPageConfig = {
        headTitle: 'Keyword Logs Pencarian Buku',
        pageTitle: 'Log Kata Kunci Pencarian Buku',
        subtitle:
            'Riwayat kata kunci yang dicari pengunjung di katalog buku. Otomatis dibersihkan dari spasi berlebih, huruf kecil, serta pencegahan spam kata berulang.',
        breadcrumbs,
        backHref: route('admin.books.index'),
        exportHref: route('admin.books.search-logs.export', {
            search: props.filters?.search,
            start_date: props.filters?.start_date,
            end_date: props.filters?.end_date,
        }),
        routes: {
            list: 'admin.books.search-logs',
            destroy: 'admin.books.search-logs.destroy',
            clear: 'admin.books.search-logs.clear',
        },
        topLabel: 'Top Kata Kunci Terpopuler:',
        searchPlaceholder: 'Cari kata kunci...',
        emptyTitle: 'Belum ada riwayat kata kunci pencarian',
        emptyDescription: 'Kata kunci pencarian yang diketik pengunjung di katalog buku akan otomatis dicatat di sini.',
        dialog: {
            deleteTitle: 'Hapus Log Kata Kunci?',
            clearTitle: 'Bersihkan Riwayat Log Kata Kunci?',
            totalBoldText: 'data log kata kunci pencarian',
        },
        calendar: {
            startDesc: 'Pilih tanggal awal untuk memfilter data log kata kunci pencarian.',
            endDesc: 'Pilih tanggal akhir untuk memfilter data log kata kunci pencarian.',
        },
    };

    return <SearchLogsPage {...props} config={config} />;
}
