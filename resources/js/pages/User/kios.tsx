import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Head, router } from '@inertiajs/react';
import { Handshake } from 'lucide-react';

import EtalaseCatalog, { RawKiosItem } from './components/EtalaseCatalog';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import ModalKolaborasi from './components/ModalKolaborasi';
import LoadingKios from './components/SkeletonLoading/LoadingKios';
import BackToTopButton from './components/BackToTopButton';
import { usePageLoading } from '../../hooks/use-page-loading';


interface KiosPageProps {
  kiosItems?: RawKiosItem[];
  books?: unknown[];
  initialKiosItem?: RawKiosItem | null;
  initialSlug?: string;
  totalKiosItemsCount?: number;
  totalPartnersCount?: number;
}

export default function KiosPage({
  kiosItems = [],
  books = [],
  initialKiosItem,
  initialSlug,
  totalKiosItemsCount,
  totalPartnersCount,
}: KiosPageProps) {
  const initialItemId = React.useMemo(() => {
    if (initialKiosItem) return String(initialKiosItem.id);
    if (initialSlug && kiosItems.length > 0) {
      const match = kiosItems.find(k => k.slug === initialSlug || String(k.id) === initialSlug);
      return match ? String(match.id) : null;
    }
    return null;
  }, [initialKiosItem, initialSlug, kiosItems]);

  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(initialItemId);
  const [showPartnershipModal, setShowPartnershipModal] = useState<boolean>(false);

  const isLoading = usePageLoading();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('norinoya-dark-mode');
      return saved === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  React.useLayoutEffect(() => {
    sessionStorage.setItem('norinoya-dark-mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavHome = () => {
    router.visit('/');
  };

  const handleNavNews = () => {
    router.visit('/news');
  };

  const handleNavEtalase = () => {
    setSelectedSaleId(null);
    router.visit('/kios');
  };

  const handleNavAbout = () => {
    router.visit('/?scroll=about');
  };

  const activeKiosItem = selectedSaleId ? kiosItems.find(k => String(k.id) === selectedSaleId) : null;
  const pageTitle = activeKiosItem
    ? `${activeKiosItem.title} - Beli di Kios Norinoya`
    : 'Kios & Etalase Merchandise - Norinoya';
  const pageDesc = activeKiosItem
    ? (activeKiosItem.deskripsi_produk || activeKiosItem.notes || `Beli ${activeKiosItem.title} resmi / preloved di Kios Norinoya`).slice(0, 160)
    : 'Kios merchandise resmi, preloved mulus terverifikasi, komik, manga, light novel, dan official apparel mitra partner Norinoya.';
  const pageImage = activeKiosItem?.cover_image || '/favicon.png';

  return (
    <div className="bg-[#FEFFFE] dark:bg-[#202120] min-h-screen text-neutral-950 dark:text-neutral-50 selection:bg-neutral-900 dark:selection:bg-neutral-100 selection:text-white dark:selection:text-neutral-900 flex flex-col justify-between font-sans">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="product" />
      </Head>

      {/* Header / Navbar */}
      <Navbar
        activeTab="kios"
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigateHome={handleNavHome}
        onNavigateNews={handleNavNews}
        onNavigateKios={handleNavEtalase}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 pb-20 md:pb-6 bg-transparent">
        <motion.div
          key="etalase-screen"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="space-y-6"
        >
          {isLoading ? (
            <LoadingKios />
          ) : (
            <>
              {/* Kios Hero Banner */}
              {!selectedSaleId && (
                <div className="relative text-center py-10 md:py-14 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white rounded-2xl overflow-hidden shadow-xs dark:shadow-md border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 transition-all duration-200">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 dark:from-amber-500/15 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                 <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/20 text-neutral-800 dark:text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase rounded-full">
                  <Handshake className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#DA6B1C] dark:text-[#DA6B1C] fill-[#DA6B1C]/10 dark:fill-[#DA6B1C]/20" />
                  <span>KOLABORASI PARTNER RESMI</span>
                </span>

                  <h1 className="text-3xl md:text-5xl font-sans font-black tracking-tight uppercase leading-none max-w-4xl text-neutral-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-100 dark:to-neutral-300">
                    KIOS
                  </h1>

                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                   Temukan koleksi eksklusif norinoya dengan brand resmi terpilih, cek harga dan checkout langsung.
                  </p>

                   {/* Action Button: Gabung Partner? */}
                  <div className="pt-0.5 relative z-10 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setShowPartnershipModal(true)}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#183619] hover:bg-[#0b1a0c] text-white border border-[#1c3e1e] active:scale-95 duration-100 text-[11px] sm:text-xs font-mono font-bold tracking-tight rounded-lg sm:rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                      title="Gabung Kolaborasi Partner Kios Norinoya"
                    >
                      <Handshake className="w-3.5 h-3.5 text-[#DA6B1C]" />
                      <span>Gabung Partner?</span>
                    </button>
                  </div>

                 {/* Counter Widget Info */}
                  <div className="flex items-center gap-4 sm:gap-6 pt-1 sm:pt-2 font-mono text-xs">
                    <div className="flex flex-col items-center">
                      <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">
                        {totalKiosItemsCount !== undefined ? totalKiosItemsCount : kiosItems.length}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Total Produk</span>
                    </div>
                    <div className="h-5 sm:h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
                    <div className="flex flex-col items-center">
                      <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">
                        {totalPartnersCount !== undefined ? `${totalPartnersCount}+` : '3+'}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Partner Resmi</span>
                    </div>
                    <div className="h-5 sm:h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
                    <div className="flex flex-col items-center">
                      <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">100%</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Link Resmi</span>
                    </div>
                  </div>
                </div>
              )}

              <EtalaseCatalog
                onNavigateToNews={(newsId) => {
                  router.visit(`/news#${newsId}`);
                }}
                selectedSaleId={selectedSaleId}
                onClearSelectedSaleId={() => setSelectedSaleId(null)}
                onSelectSaleItem={(item) => setSelectedSaleId(item ? String(item.id) : null)}
                dbKiosItems={kiosItems}
                dbBooksList={books}
              />
            </>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={handleNavHome}
        onNavigateAbout={handleNavAbout}
        darkMode={darkMode}
      />

      {/* Modal Kolaborasi Partnership */}
      <ModalKolaborasi
        isOpen={showPartnershipModal}
        onClose={() => setShowPartnershipModal(false)}
      />

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
