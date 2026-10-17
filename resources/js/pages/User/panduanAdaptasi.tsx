import React, { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Search, ChevronRight } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import type { PaginatedData } from '@/types/pagination';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface PanduanAdaptasiListItem {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  source: string;
  nodes_count: number;
}

interface PanduanAdaptasiPageProps {
  panduanAdaptasiList: PaginatedData<PanduanAdaptasiListItem>;
  filters?: { q?: string };
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PanduanAdaptasiPage({
  panduanAdaptasiList,
  filters,
}: PanduanAdaptasiPageProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('norinoya-dark-mode') === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  React.useLayoutEffect(() => {
    sessionStorage.setItem('norinoya-dark-mode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleNavHome = () => router.visit('/');
  const handleNavNews = () => router.visit('/news');
  const handleNavKios = () => router.visit('/kios');
  const handleNavAbout = () => router.visit('/?scroll=about');

  /* ---------------------------------------------------------------- */
  /*  Search (debounce, state tersimpan di URL ?q=)                    */
  /* ---------------------------------------------------------------- */

  const [searchQuery, setSearchQuery] = useState<string>(filters?.q ?? '');
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    const term = searchQuery.trim();
    const currentTerm = (filters?.q ?? '').trim();

    if (term === currentTerm) {
      return;
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      router.get(
        route('panduan-adaptasi.index'),
        term === '' ? {} : { q: term },
        { preserveState: true, preserveScroll: true, replace: true },
      );
    }, 350);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, filters?.q]);

  const items = panduanAdaptasiList.data;
  const total = panduanAdaptasiList.total;
  const from = panduanAdaptasiList.from ?? 0;
  const to = panduanAdaptasiList.to ?? 0;
  const isSearching = (filters?.q ?? '').trim() !== '';

  // SEO: canonical absolut (SSR-safe — origin kosong saat server render).
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}/panduan-adaptasi`;
  const pageTitle = 'Panduan Adaptasi - Norinoya';
  const pageDesc =
    'Direktori titik lanjut adaptasi anime ke manga: daftar judul, sumber, dan panduan urutan nonton bertahap.';
  const ogImage = `${origin}/assets/images/logo-dark.png`;

  return (
    <div className="bg-[#FEFFFE] dark:bg-[#202120] min-h-screen text-neutral-950 dark:text-neutral-50 selection:bg-neutral-900 dark:selection:bg-neutral-100 selection:text-white dark:selection:text-neutral-900 flex flex-col justify-between font-sans">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:site_name" content="Norinoya" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="theme-color" content="#E53935" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Navbar
        activeTab="about"
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigateHome={handleNavHome}
        onNavigateNews={handleNavNews}
        onNavigateKios={handleNavKios}
      />

      <main className="flex-1 w-full px-3 sm:px-6 py-8 sm:py-12 flex items-start justify-center">
        {/* Floating content board */}
        <section className="w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800/60 shadow-[0_8px_30px_rgba(19,42,30,0.04)] dark:shadow-none p-6 sm:p-10 md:p-12 transition-all">
          {/* Header area */}
          <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-8 border-b border-neutral-200/60 dark:border-neutral-800/60">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
                Panduan Adaptasi
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 tracking-normal">
                Daftar adaptasi yang bisa kalian lihat
              </p>
            </div>
            <div className="self-start sm:self-auto">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-neutral-950 dark:text-neutral-50 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                Total {total} Indeks
              </span>
            </div>
          </header>

          {/* Search bar */}
          <div className="py-6">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Cari panduan adaptasi"
                placeholder="Ketik judul anime, studio, atau komikus..."
                className="w-full h-12 pl-12 pr-4 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-neutral-900 dark:focus:border-white focus:ring-2 focus:ring-[#DA6B1C]/10 transition-all shadow-xs"
              />
              {searchQuery !== '' && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-sm font-mono cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Archival table */}
          <div className="w-full overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/60 dark:border-neutral-800/60">
              <div className="col-span-8 sm:col-span-6">JUDUL</div>
              <div className="col-span-2 sm:col-span-3">SUMBER</div>
              <div className="col-span-2 sm:col-span-3 text-right"></div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
              {items.length === 0 ? (
                <div className="py-14 text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {isSearching
                      ? `Tidak ada panduan yang cocok dengan "${filters?.q}".`
                      : 'Belum ada panduan adaptasi.'}
                  </p>
                </div>
              ) : (
                items.map((entry, i) => (
                  <Link
                    key={entry.id}
                    href={`/panduan-adaptasi/${entry.slug}`}
                    className={`group grid grid-cols-12 gap-4 items-center px-4 py-3.5 sm:py-4 rounded-xl transition-colors duration-150 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 ${
                      i % 2 === 1 ? 'bg-neutral-50/70 dark:bg-neutral-800/25' : ''
                    }`}
                  >
                    <div className="col-span-8 sm:col-span-6 flex flex-col justify-center min-w-0 pr-2">
                      <span className="font-medium text-xs sm:text-sm text-neutral-950 dark:text-neutral-50 truncate">
                        {entry.title}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/70 dark:border-neutral-700/70">
                        {entry.source}
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-3 flex justify-end">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-950 dark:text-neutral-50 group-hover:text-[#DA6B1C] dark:group-hover:text-[#F08A3C] transition-colors">
                        <span className="hidden sm:inline">Buka</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-[3px]" />
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Footer toolbar */}
            <footer className="mt-8 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              <div>
                Menampilkan <span className="font-bold text-neutral-950 dark:text-neutral-50">{from}</span>–
                <span className="font-bold text-neutral-950 dark:text-neutral-50">{to}</span> dari{' '}
                <span className="font-bold text-neutral-950 dark:text-neutral-50">{total}</span> judul seri
                terindeks
              </div>

              {panduanAdaptasiList.last_page > 1 && (
                <div className="flex items-center gap-1.5 font-medium">
                  {panduanAdaptasiList.links.map((link, index) => {
                    const isPrev = index === 0;
                    const isNext = index === panduanAdaptasiList.links.length - 1;
                    const label = link.label
                      .replace('&laquo;', 'Prev')
                      .replace('&raquo;', 'Next')
                      .replace('Previous', 'Prev')
                      .replace('Next', 'Next');

                    const baseClass = link.active
                      ? 'bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-900 font-semibold shadow-xs'
                      : 'border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-800';

                    const sizeClass = isPrev || isNext ? 'px-3 py-1.5 rounded-lg' : 'w-8 h-8 rounded-lg';

                    return (
                      <button
                        key={`${link.label}-${index}`}
                        type="button"
                        disabled={!link.url}
                        aria-current={link.active ? 'page' : undefined}
                        onClick={() => {
                          if (link.url) {
                            router.get(link.url, {}, { preserveState: true, preserveScroll: true });
                          }
                        }}
                        className={`${sizeClass} flex items-center justify-center transition-colors ${
                          link.url ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                        } ${baseClass}`}
                      >
                        {/^\d+$/.test(label) ? label : isPrev ? 'Prev' : isNext ? 'Next' : label}
                      </button>
                    );
                  })}
                </div>
              )}
            </footer>
          </div>
        </section>
      </main>

      <Footer onNavigateHome={handleNavHome} onNavigateAbout={handleNavAbout} darkMode={darkMode} />
    </div>
  );
}
