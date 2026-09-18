import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Newspaper, 
    ShoppingBag, 
    Eye, 
    ArrowUpRight,
    Plus,
    History,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardStats {
    totalBooks: number;
    totalNews: number;
    totalKios: number;
    totalPartners: number;
    totalViews: number;
}

interface RecentBook {
    id: number;
    title: string;
    volume: number;
    views_count: number;
    created_at: string;
}

interface RecentNews {
    id: number;
    title: string;
    category: string;
    views_count: number;
    created_at: string;
}

interface RecentKios {
    id: number;
    title: string;
    price: number;
    is_preloved: boolean;
    views_count: number;
    created_at: string;
}

interface DashboardProps {
    stats?: DashboardStats;
    recentBooks?: RecentBook[];
    recentNews?: RecentNews[];
    recentKios?: RecentKios[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard({ 
    stats = {
        totalBooks: 0,
        totalNews: 0,
        totalKios: 0,
        totalPartners: 0,
        totalViews: 0,
    },
    recentBooks = [],
    recentNews = [],
    recentKios = [],
}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Welcome Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-emerald-950 p-6 text-white shadow-md">
                    <div className="relative z-10 max-w-2xl space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-sm border border-emerald-500/30">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Norinoya Management Hub</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                            Selamat Datang di Panel Admin Norinoya
                        </h1>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                            Kelola seluruh katalog buku komik, rilis berita resmi, etalase kios preloved, dan pantau log kunjungan audiens secara real-time.
                        </p>
                        <div className="flex flex-wrap gap-2.5 pt-2">
                            <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-8 text-xs cursor-pointer">
                                <Link href={route('admin.books.create')}>
                                    <Plus className="h-3.5 w-3.5 mr-1" />
                                    Tambah Buku
                                </Link>
                            </Button>
                            <Button size="sm" variant="secondary" asChild className="h-8 text-xs font-bold cursor-pointer">
                                <Link href={route('admin.news.create')}>
                                    <Plus className="h-3.5 w-3.5 mr-1" />
                                    Tulis Berita
                                </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild className="h-8 text-xs font-bold border-neutral-700 hover:bg-neutral-800 text-neutral-800 dark:text-white cursor-pointer">
                                <Link href={route('admin.kios.create')}>
                                    <Plus className="h-3.5 w-3.5 mr-1" />
                                    Tambah Item Kios
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Overview */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Books Metric */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Total Buku</span>
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
                                <BookOpen className="h-4.5 w-4.5" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                            <span className="text-2xl font-black font-sans text-neutral-900 dark:text-white">
                                {stats.totalBooks.toLocaleString('id-ID')}
                            </span>
                            <Link href={route('admin.books.index')} className="text-xs font-medium text-emerald-600 hover:underline flex items-center gap-0.5">
                                Kelola <ArrowUpRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>

                    {/* News Metric */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Artikel Berita</span>
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600">
                                <Newspaper className="h-4.5 w-4.5" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                            <span className="text-2xl font-black font-sans text-neutral-900 dark:text-white">
                                {stats.totalNews.toLocaleString('id-ID')}
                            </span>
                            <Link href={route('admin.news.index')} className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-0.5">
                                Kelola <ArrowUpRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Kios Metric */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kios & Preloved</span>
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-50 dark:bg-pink-950/50 text-pink-600">
                                <ShoppingBag className="h-4.5 w-4.5" />
                            </div>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                            <span className="text-2xl font-black font-sans text-neutral-900 dark:text-white">
                                {stats.totalKios.toLocaleString('id-ID')}
                            </span>
                            <Link href={route('admin.kios.index')} className="text-xs font-medium text-pink-600 hover:underline flex items-center gap-0.5">
                                Kelola <ArrowUpRight className="h-3 w-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Activities Section */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Latest Books */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-emerald-600" />
                                <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Buku Terbaru</h2>
                            </div>
                            <Link href={route('admin.books.index')} className="text-xs font-medium text-emerald-600 hover:underline">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {recentBooks.length > 0 ? (
                                recentBooks.map((book) => (
                                    <div key={book.id} className="py-2.5 flex items-center justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                                {book.title} {book.volume ? `Vol. ${book.volume}` : ''}
                                            </p>
                                            <p className="text-[11px] text-neutral-400 font-mono">
                                                {new Date(book.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                                            <Eye className="h-3 w-3" />
                                            {book.views_count ?? 0}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-neutral-400 py-4 text-center">Belum ada buku terdaftar.</p>
                            )}
                        </div>
                    </div>

                    {/* Latest News */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2">
                                <Newspaper className="h-4 w-4 text-blue-600" />
                                <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Berita Terbaru</h2>
                            </div>
                            <Link href={route('admin.news.index')} className="text-xs font-medium text-blue-600 hover:underline">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {recentNews.length > 0 ? (
                                recentNews.map((item) => (
                                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                                {item.title}
                                            </p>
                                            <span className="text-[10px] uppercase font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/50 px-1.5 py-0.2 rounded">
                                                {item.category}
                                            </span>
                                        </div>
                                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                                            <Eye className="h-3 w-3" />
                                            {item.views_count ?? 0}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-neutral-400 py-4 text-center">Belum ada berita terbit.</p>
                            )}
                        </div>
                    </div>

                    {/* Latest Kios Items */}
                    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4 text-pink-600" />
                                <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Kios & Preloved</h2>
                            </div>
                            <Link href={route('admin.kios.index')} className="text-xs font-medium text-pink-600 hover:underline">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {recentKios.length > 0 ? (
                                recentKios.map((kios) => (
                                    <div key={kios.id} className="py-2.5 flex items-center justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                                                {kios.title}
                                            </p>
                                            <span className="text-[11px] font-mono font-bold text-emerald-600">
                                                Rp {Number(kios.price).toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                                            kios.is_preloved 
                                                ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300' 
                                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                                        }`}>
                                            {kios.is_preloved ? 'Preloved' : 'Partner'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-neutral-400 py-4 text-center">Belum ada item kios.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Log Navigation Links */}
                <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 shadow-2xs">
                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                        Pintasan Analitik & Log Riwayat
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Link 
                            href={route('admin.books.logs')} 
                            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <History className="h-4 w-4 text-emerald-600" />
                                <span>Log Kunjungan Buku</span>
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                        </Link>
                        <Link 
                            href={route('admin.books.search-logs')} 
                            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <History className="h-4 w-4 text-emerald-600" />
                                <span>Pencarian Kata Kunci Buku</span>
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                        </Link>
                        <Link 
                            href={route('admin.news.logs')} 
                            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <History className="h-4 w-4 text-blue-600" />
                                <span>Log Pembaca Berita</span>
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                        </Link>
                        <Link 
                            href={route('admin.kios.logs')} 
                            className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <History className="h-4 w-4 text-pink-600" />
                                <span>Log Klik & View Kios</span>
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
