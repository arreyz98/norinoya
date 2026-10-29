import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Head, router } from '@inertiajs/react';
import { Sparkles, Instagram } from 'lucide-react';

import NewsFeed from './components/NewsFeed';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingNews from './components/SkeletonLoading/LoadingNews';
import BackToTopButton from './components/BackToTopButton';
import { VideoShortItem } from './home';
import { usePageLoading } from '../../hooks/use-page-loading';
import { newsExcerpt } from '../../utils/newsExcerpt';

export interface RawNewsItem {
  id: string | number;
  title: string;
  slug?: string;
  content?: string;
  attached_image?: string;
  gallery_images?: string[];
  created_at?: string;
  source_name?: string;
  source_url?: string;
  likes_count?: number;
  comments_count?: number;
}

interface NewsPageProps {
  newsList?: RawNewsItem[];
  books?: unknown[];
  kiosItems?: unknown[];
  initialNews?: RawNewsItem | null;
  initialSlug?: string;
  totalNewsCount?: number;
}

export default function NewsPage({
  newsList = [],
  books = [],
  kiosItems = [],
  initialNews,
  initialSlug,
  totalNewsCount,
}: NewsPageProps) {
  const initialPostId = React.useMemo(() => {
    if (initialNews) return String(initialNews.id);
    if (initialSlug && newsList.length > 0) {
      const match = newsList.find(n => n.slug === initialSlug || String(n.id) === initialSlug);
      return match ? String(match.id) : null;
    }
    return null;
  }, [initialNews, initialSlug, newsList]);

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(initialPostId);
  const [selectedShort, setSelectedShort] = useState<VideoShortItem | null>(null);
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
    setSelectedNewsId(null);
    router.visit('/news');
  };

  const handleNavEtalase = () => {
    router.visit('/kios');
  };

  const activeNewsItem = selectedNewsId ? newsList.find(n => String(n.id) === selectedNewsId) : null;
  const pageTitle = activeNewsItem
    ? `${activeNewsItem.title} - Norinoya News`
    : 'Berita & Pengumuman Komik - Norinoya';
  const pageDesc = activeNewsItem
    ? newsExcerpt(activeNewsItem.content, `Berita ${activeNewsItem.title} di Norinoya Hub`)
    : 'Update berita rilisan komik terbaru, info cetak ulang m&c! Akasha dan Elex Media, promo, serta poling komunitas Norinoya.';
  const pageImage = activeNewsItem?.attached_image || (Array.isArray(activeNewsItem?.gallery_images) && activeNewsItem.gallery_images[0]) || '/favicon.png';

  return (
    <div className="bg-[#FEFFFE] dark:bg-[#202120] min-h-screen text-neutral-950 dark:text-neutral-50 selection:bg-neutral-900 dark:selection:bg-neutral-100 selection:text-white dark:selection:text-neutral-900 flex flex-col justify-between font-sans">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="article" />
      </Head>
      {/* Header / Navbar */}
      <Navbar
        activeTab="news"
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigateHome={handleNavHome}
        onNavigateNews={handleNavNews}
        onNavigateKios={handleNavEtalase}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 pb-20 md:pb-6 bg-transparent">
        <motion.div
          key="news-screen"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="space-y-8"
        >
          {isLoading ? (
            <LoadingNews />
          ) : (
            <>
              {!selectedNewsId && (
                <div className="relative text-center py-10 md:py-14 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white rounded-2xl overflow-hidden shadow-xs dark:shadow-md border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 transition-all duration-200">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-100 dark:from-neutral-800/20 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neutral-100 dark:bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 dark:bg-white/10 dark:backdrop-blur-md border border-neutral-200 dark:border-white/20 text-neutral-800 dark:text-white text-[9px] sm:text-[11px] font-mono font-bold tracking-wider sm:tracking-widest uppercase rounded-full text-center max-w-full leading-relaxed sm:leading-none">
                    <Sparkles className="w-3.5 h-3.5 text-[#DA6B1C] dark:text-[#DA6B1C] fill-[#DA6B1C]/10 dark:fill-[#DA6B1C]/30 shrink-0" />
                    <span>Discover Japanese Stories.</span>
                  </span>
                  <h1 className="text-3xl md:text-5xl font-sans font-black tracking-tight uppercase leading-none max-w-4xl text-neutral-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-100 dark:to-neutral-300">
                    NEWS
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                    Explore manga, light novel, anime, dan rilisan terbaru dari sumber resmi.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1.5 relative z-10">
                       <a
                      href="https://instagram.com/norinoya.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-white hover:text-neutral-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-sm hover:scale-105 active:scale-95 duration-150 transition-all flex items-center justify-center cursor-pointer group"
                      title="Instagram @norinoya.official"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.75] text-neutral-800 dark:text-white transition-transform group-hover:scale-110" />
                    </a>
                      <a
                      href="https://tiktok.com/@norinoya.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-white hover:text-neutral-950 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-sm hover:scale-105 active:scale-95 duration-150 transition-all flex items-center justify-center cursor-pointer group"
                      title="TikTok @norinoya.official"
                      aria-label="TikTok"
                    >
                     <svg 
                        className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current text-neutral-800 dark:text-white transition-transform group-hover:scale-110 shrink-0" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.18 6.393 6.393 0 0 0 1.558 9.385 6.331 6.331 0 0 0 7.854-.622 6.388 6.388 0 0 0 1.902-4.524V9.043a8.232 8.232 0 0 0 4.815 1.543V7.128a4.82 4.82 0 0 1-1.502-.442z"/>
                      </svg>
                    </a>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 pt-3 font-mono text-[10px] sm:text-xs">
                    <div className="flex flex-col items-center">
                      <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">
                        {totalNewsCount !== undefined ? totalNewsCount : newsList.length}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[9px] sm:text-[10px] mt-1">Feeds Hari Ini</span>
                    </div>
                     <div className="flex flex-col items-center">
                      <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">100%</span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Komunitas</span>
                    </div>
                  </div>
                </div>
              )}

              <div id="norinoya-news-hub" className="pt-2 scroll-mt-20">
                <NewsFeed
                  dbNewsList={newsList}
                  dbBooksList={books}
                  dbKiosList={kiosItems}
                  selectedNewsId={selectedNewsId}
                  setSelectedNewsId={setSelectedNewsId}
                  onNavigateToCatalog={handleNavHome}
                  onNavigateToComic={(comicId) => {
                    router.visit(`/buku/${comicId}`);
                  }}
                  onSelectShort={(short) => setSelectedShort(short)}
                />
              </div>
            </>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={handleNavHome}
        darkMode={darkMode}
      />

      {/* Shorts Player Modal */}
      <AnimatePresence>
        {selectedShort && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedShort(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[340px] aspect-[9/16] bg-neutral-900 rounded-[36px] overflow-hidden border-8 border-neutral-800 shadow-2xl flex flex-col justify-between p-4 px-5 pb-6"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.95)), url(${selectedShort.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex justify-between items-center w-full pt-4 relative z-10 text-white font-mono text-xs font-bold">
                <span className="bg-red-650 px-1.5 py-0.5 rounded uppercase font-extrabold">● SPECIAL SHORTS</span>
                <button onClick={() => setSelectedShort(null)} className="px-3 py-1 bg-white/20 rounded-lg">✕</button>
              </div>
              <div className="relative z-10 mt-auto space-y-3 text-left text-white pr-6">
                <p className="text-xs text-neutral-50 font-sans italic font-bold">{selectedShort.quote}</p>
                <h4 className="font-sans font-black text-xs text-white">{selectedShort.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
