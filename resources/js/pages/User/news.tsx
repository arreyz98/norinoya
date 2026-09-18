import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Head, router } from '@inertiajs/react';
import { 
  BookOpen, Instagram, ShoppingBag, Newspaper, Sparkles
} from 'lucide-react';

import NewsFeed from './components/NewsFeed';
import Navbar from './components/Navbar';
import LoadingNews from './components/SkeletonLoading/LoadingNews';
import logoDarkUrl from '../../../../public/assets/images/logo-dark.png';
import logoLightUrl from '../../../../public/assets/images/logo-light.png';
import { VideoShortItem } from './home';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    const unbindStart = router.on('start', (event) => {
      const targetUrl = event.detail.visit.url.pathname;
      if (targetUrl === '/news' || targetUrl.startsWith('/news/')) {
        setIsLoading(true);
      }
    });

    const unbindFinish = router.on('finish', () => {
      setIsLoading(false);
    });

    return () => {
      clearTimeout(timer);
      unbindStart();
      unbindFinish();
    };
  }, []);

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
    setSelectedNewsId(null);
    window.location.href = '/news';
  };

  const handleNavEtalase = () => {
    window.location.href = '/kios';
  };

  const activeNewsItem = selectedNewsId ? newsList.find(n => String(n.id) === selectedNewsId) : null;
  const pageTitle = activeNewsItem 
    ? `${activeNewsItem.title} - Norinoya News` 
    : 'Berita & Pengumuman Komik - Norinoya';
  const cleanContent = activeNewsItem?.content ? activeNewsItem.content.replace(/<[^>]*>?/gm, '') : '';
  const pageDesc = activeNewsItem 
    ? (cleanContent || `Berita ${activeNewsItem.title} di Norinoya Hub`).slice(0, 160)
    : 'Update berita rilisan komik terbaru, info cetak ulang m&c! Akasha dan Elex Media, promo, serta poling komunitas Norinoya.';
  const pageImage = activeNewsItem?.attached_image || (Array.isArray(activeNewsItem?.gallery_images) && activeNewsItem.gallery_images[0]) || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80';

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
          key={isLoading ? 'news-skeleton' : 'news-screen'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
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
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4.5 py-2 bg-[#5865F2] hover:bg-[#4752C4] !text-white active:scale-95 duration-100 text-xs font-mono font-bold tracking-tight rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border border-[#4752C4]/20"
                    >
                      <svg className="w-4 h-4 fill-white text-white shrink-0" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                      </svg>
                      <span className="text-white font-bold">konotasi.sukasuka</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 pt-3 font-mono text-[10px] sm:text-xs">
                    <div className="flex flex-col items-center">
                      <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">
                        {totalNewsCount !== undefined ? totalNewsCount : newsList.length}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 text-[9px] sm:text-[10px] mt-1">Feeds Hari Ini</span>
                    </div>
                    <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
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
                    window.location.href = `/#/database/${comicId}`;
                  }}
                  onSelectShort={(short) => setSelectedShort(short)}
                />
              </div>
            </>
          )}
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
              Platform kurasi database buku (manga, novel dan light novel) legal di Indonesia.
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

        <div className="max-w-7xl mx-auto  mt-10 pt-6 text-center text-xs font-mono text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-4 leading-[16px]">
          <span>© 2026 Norinoya</span>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl z-[60] flex items-center justify-around py-2.5 px-3 mb-safe">
        <button onClick={handleNavHome} className="flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer text-neutral-400 dark:text-neutral-400">
          <BookOpen className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">Home</span>
        </button>
        <button onClick={handleNavNews} className="flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer text-neutral-950 dark:text-white font-extrabold bg-neutral-100/90 dark:bg-neutral-700">
          <Newspaper className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">News</span>
        </button>
        <button onClick={handleNavEtalase} className="flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer text-neutral-400 dark:text-neutral-400">
          <ShoppingBag className="w-4.5 h-4.5 mb-0.5" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">Kios</span>
        </button>
      </div>

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
    </div>
  );
}
