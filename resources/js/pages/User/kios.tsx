import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Head } from '@inertiajs/react';
import { 
  BookOpen, Instagram, ShoppingBag, Newspaper, Store, ShieldCheck
} from 'lucide-react';

import EtalaseCatalog, { RawKiosItem } from './components/EtalaseCatalog';
import Navbar from './components/Navbar';
import logoDarkUrl from '../../../../public/assets/images/logo-dark.png';
import logoLightUrl from '../../../../public/assets/images/logo-light.png';

interface KiosPageProps {
  kiosItems?: RawKiosItem[];
  books?: unknown[];
  initialKiosItem?: RawKiosItem | null;
  initialSlug?: string;
}

export default function KiosPage({ 
  kiosItems = [], 
  books = [],
  initialKiosItem,
  initialSlug,
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
    window.location.href = '/';
  };

  const handleNavNews = () => {
    window.location.href = '/news';
  };

  const handleNavEtalase = () => {
    setSelectedSaleId(null);
    window.location.href = '/kios';
  };

  const activeKiosItem = selectedSaleId ? kiosItems.find(k => String(k.id) === selectedSaleId) : null;
  const pageTitle = activeKiosItem 
    ? `${activeKiosItem.title} - Beli di Kios Norinoya` 
    : 'Kios & Etalase Merchandise - Norinoya';
  const pageDesc = activeKiosItem
    ? (activeKiosItem.deskripsi_produk || activeKiosItem.notes || `Beli ${activeKiosItem.title} resmi / preloved di Kios Norinoya`).slice(0, 160)
    : 'Kios merchandise resmi, preloved mulus terverifikasi, komik, manga, light novel, dan official apparel mitra partner Norinoya.';
  const pageImage = activeKiosItem?.cover_image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';

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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-6"
        >
          {/* Kios Hero Banner */}
          {!selectedSaleId && (
            <div className="relative text-center py-10 md:py-14 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white rounded-2xl overflow-hidden shadow-xs dark:shadow-md border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 transition-all duration-200">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 dark:from-amber-500/15 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-700/40 text-amber-900 dark:text-amber-300 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase rounded-full shadow-2xs">
                <Store className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>OFFICIAL & PRELOVED MARKETPLACE</span>
              </span>

              <h1 className="text-3xl md:text-5xl font-sans font-black tracking-tight uppercase leading-none max-w-4xl text-neutral-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-100 dark:to-neutral-300">
                KIOS NORINOYA
              </h1>
              
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                Temukan buku manga, merchandise resmi, apparel, aksesoris, dan komik preloved terverifikasi dari toko mitra resmi.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>100% Produk Terverifikasi</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <Store className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Mitra Partner Terpercaya</span>
                </div>
              </div>
            </div>
          )}

          <EtalaseCatalog 
            onNavigateToNews={(newsId) => {
              window.location.href = `/news#${newsId}`;
            }} 
            selectedSaleId={selectedSaleId}
            onClearSelectedSaleId={() => setSelectedSaleId(null)}
            dbKiosItems={kiosItems}
            dbBooksList={books}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-205 dark:border-neutral-850 mt-16 bg-neutral-50 dark:bg-neutral-900 py-12 px-6 sm:px-8 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2 select-none">
              <img 
                src={darkMode ? logoDarkUrl : logoLightUrl} 
                alt="Norinoya Logo" 
                className="h-[32px] w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-sm text-neutral-500 max-w-sm font-sans leading-[20px]">
              Platform kurasi, database buku, komik dan light novel resmi di Indonesia, terafiliasi dengan program referral Gramedia, Tokopedia, Shopee. <strong>Stop Buku Bajakan!</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-neutral-700">
            <div className="space-y-2">
              <h6 className="text-xs font-mono tracking-wider font-extrabold text-neutral-400 uppercase leading-[16px]">Fitur Utama</h6>
              <ul className="text-sm space-y-2 leading-[20px] dark:text-neutral-400">
                <li><button onClick={handleNavHome} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">Home</button></li>
                <li><button onClick={handleNavNews} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">News</button></li>
                <li><button onClick={handleNavEtalase} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">Kios</button></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h6 className="text-xs font-mono tracking-wider font-extrabold text-neutral-400 uppercase leading-[16px]">Kebijakan Hukum</h6>
              <ul className="text-sm space-y-2 leading-[20px] dark:text-neutral-400">
                <li>
                  <button 
                    onClick={() => { window.location.href = '/#about'; }} 
                    className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h6 className="text-xs font-mono tracking-wider font-extrabold text-neutral-400 uppercase leading-[16px]">Media Sosial</h6>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4 py-1.5 px-3 bg-neutral-50 dark:bg-[#262626] rounded-xl border border-neutral-100 dark:border-neutral-800">
                  <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">@norinoya.official</span>
                  <div className="flex gap-1.5">
                    <a href="https://instagram.com/norinoya.official" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-pink-500 text-neutral-500 flex items-center justify-center">
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-200 mt-10 pt-6 text-center text-xs font-mono text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-4 leading-[16px]">
          <span>© 2026 Norinoya Hub. Diposisikan murni untuk ulasan komunitas & edukasi legalitas komik Indonesia.</span>
          <span>Made with precision</span>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl z-[60] flex items-center justify-around py-2.5 px-3 mb-safe">
        <button onClick={handleNavHome} className="flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer text-neutral-400 dark:text-neutral-400">
          <BookOpen className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">norinoya</span>
        </button>
        <button onClick={handleNavNews} className="flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer text-neutral-400 dark:text-neutral-400">
          <Newspaper className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">News</span>
        </button>
        <button onClick={handleNavEtalase} className="flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer text-neutral-950 dark:text-white font-extrabold bg-neutral-100/90 dark:bg-neutral-700">
          <ShoppingBag className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">Kios</span>
        </button>
      </div>
    </div>
  );
}
