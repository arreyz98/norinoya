import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Head, router } from '@inertiajs/react';
import {
  BookOpen,  Instagram, Sparkles,
  MessageCircle,  Newspaper, ArrowUp, ShoppingBag,
  Mail, ChevronLeft, ChevronRight, Youtube,
} from 'lucide-react';

// Sub-components
import NewsFeed from './components/NewsFeed';
import MarketplaceDb from './components/MarketplaceDB';
import AboutSection from './components/AboutSection';
import EtalaseCatalog from './components/EtalaseCatalog';
import Navbar from './components/Navbar';
import LoadingHome from './components/SkeletonLoading/LoadingHome';

import logoDarkUrl from '../../../../public/assets/images/logo-dark.png';
import logoLightUrl from '../../../../public/assets/images/logo-light.png';

// Data
import { COMICS_DATA, NEWS_UPDATES } from '../../types/mockData';
import { mapBooksToComics, BookModel } from '../../utils/mapBookToComic';
import { RawNewsItem } from './news';

export interface FilterOption {
  id: number;
  name: string;
  slug?: string;
}

export interface VideoShortItem {
  id: string | number;
  title: string;
  quote?: string;
  thumbnail: string;
  likes?: string | number;
  views?: string;
  duration?: string;
  videoUrl?: string;
}

interface HomeProps {
  books?: BookModel[];
  publishers?: FilterOption[];
  storyStatuses?: FilterOption[];
  genres?: FilterOption[];
  newsList?: RawNewsItem[];
  totalBooksCount?: number;
  totalSeriesCount?: number;
  totalPublishersCount?: number;
  initialBook?: BookModel | null;
  initialSlug?: string;
}

export default function App({ 
  books = [], 
  publishers = [], 
  storyStatuses = [], 
  genres = [], 
  newsList = [],
  totalBooksCount,
  totalSeriesCount,
  totalPublishersCount,
  initialBook,
  initialSlug,
}: HomeProps) {
  const comicsData = React.useMemo(() => {
    if (books && books.length > 0) {
      return mapBooksToComics(books);
    }
    return COMICS_DATA;
  }, [books]);

  // Initial comic ID if accessed via /buku/{slug}
  const initialComicId = React.useMemo(() => {
    if (!comicsData || comicsData.length === 0) return null;

    if (initialBook) {
      // Find comic containing this book ID or slug
      const bookIdNum = initialBook.id;
      const targetSlug = initialBook.slug;
      const match = comicsData.find(c => 
        c.bookId === bookIdNum ||
        c.id === `book-${bookIdNum}` ||
        c.id === `series-${initialBook.series_id}` ||
        c.slug === targetSlug ||
        c.volumes.some(v => v.id === bookIdNum || v.bookId === bookIdNum)
      );
      if (match) {
        return `${match.id}-vol-${initialBook.volume || 1}`;
      }
      return String(initialBook.id);
    }

    if (initialSlug) {
      const match = comicsData.find(c =>
        c.slug === initialSlug ||
        c.id === initialSlug ||
        c.id === `book-${initialSlug}` ||
        c.id === `series-${initialSlug}` ||
        c.volumes.some(v => v.id === Number(initialSlug) || v.bookId === Number(initialSlug))
      );
      return match ? match.id : initialSlug;
    }
    return null;
  }, [initialBook, initialSlug, comicsData]);

  // Tabs: 'home' | 'news' | 'database' | 'about' | 'etalase' | 'calendar'
  const [activeTab, setActiveTab] = useState<'home' | 'news' | 'database' | 'about' | 'etalase' | 'calendar'>('home');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedComicId, setSelectedComicId] = useState<string | null>(initialComicId);
  const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
  const [selectedShort, setSelectedShort] = useState<VideoShortItem | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showToTop, setShowToTop] = useState<boolean>(false);
  const [cookieChoice, setCookieChoice] = useState<string | null>(null);
  const [showBriefModal, setShowBriefModal] = useState<boolean>(false);
  const [briefSlide, setBriefSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial load simulation & Inertia route transition listener
  useEffect(() => {
    // Initial page load skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    // Listen to Inertia router visit start / finish
    const unbindStart = router.on('start', (event) => {
      // Only show home skeleton if navigating to home/buku
      const targetUrl = event.detail.visit.url.pathname;
      if (targetUrl === '/' || targetUrl.startsWith('/buku/')) {
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

  // Navigation handlers
  const handleNavHome = () => {
    setSelectedComicId(null);
    setActiveTab('home');
    window.location.hash = '#home';
  };

  const handleNavNews = () => {
    window.location.href = '/news';
  };

  const handleNavAbout = () => {
    setActiveTab('about');
    window.location.hash = '#about';
  };

  const handleNavEtalase = () => {
    window.location.href = '/kios';
  };

  const handleNavCalendar = () => {
    setActiveTab('calendar');
    window.location.hash = '#calendar';
  };

  // Dark mode state & effect integration
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

  // Hash state synchronization
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === '#home' || hash === '#') {
        setActiveTab('home');
        if (!window.location.pathname.startsWith('/buku/')) {
          // only reset if not on /buku route
        }
      } else if (hash === '#news' || hash === '#/news' || hash === '#/news/' || hash.startsWith('#news')) {
        setActiveTab('news');
      } else if (hash.startsWith('#/database/')) {
        const comicId = hash.replace('#/database/', '');
        setActiveTab('home');
        setSelectedComicId(comicId);
      } else if (hash === '#database' || hash === '#/database' || hash === '#/database/') {
        setActiveTab('home');
        setSelectedComicId(null);
      } else if (hash.startsWith('#/sale/')) {
        const saleId = hash.replace('#/sale/', '');
        setActiveTab('etalase');
        setSelectedSaleId(saleId);
      } else if (hash === '#store' || hash === '#sale' || hash === '#/store' || hash === '#/sale' || hash === '#/store/' || hash === '#/sale/') {
        setActiveTab('etalase');
        setSelectedSaleId(null);
      } else if (hash === '#about') {
        setActiveTab('about');
      } else if (hash === '#etalase') {
        setActiveTab('etalase');
      } else if (hash === '#calendar' || hash === '#/calendar' || hash === '#/calendar/') {
        setActiveTab('calendar');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useEffect(() => {
    const saved = localStorage.getItem('norinoya-cookie-consent');
    if (saved) {
      setCookieChoice(saved);
    } else {
      setCookieChoice('none');
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('norinoya-cookie-consent', 'accepted');
    setCookieChoice('accepted');
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('norinoya-cookie-consent', 'declined');
    setCookieChoice('declined');
  };

  React.useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.currentTarget as HTMLElement | Window;
      let scrollTop = 0;
      if (target instanceof Window) {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      } else {
        scrollTop = (target as HTMLElement).scrollTop;
      }
      if (scrollTop > 250) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Also watch for any simulated scrolling frame container inside our ViewportWrapper
    const intervalId = setInterval(() => {
      const scrollingEls = document.querySelectorAll('.overflow-auto, [class*="overflow-y-auto"]');
      scrollingEls.forEach(el => {
        el.removeEventListener('scroll', handleScroll);
        el.addEventListener('scroll', handleScroll, { passive: true });
      });
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollingContainers = document.querySelectorAll('.overflow-auto, [class*="overflow-y-auto"]');
    scrollingContainers.forEach((el) => {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
    const scrollingContainers = document.querySelectorAll('.overflow-auto, [class*="overflow-y-auto"]');
    scrollingContainers.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [activeTab, selectedNewsId, selectedComicId]);

  // Scrollbar is now handled globally with custom styling

    const activeComicObj = selectedComicId ? comicsData.find(c => c.id === selectedComicId) : null;
    const pageTitle = activeComicObj ? `${activeComicObj.title} - Sinopsis & Ulasan Komik | Norinoya` : 'Norinoya - Pusat Katalog & Ulasan Komik Indonesia';
    const pageDesc = activeComicObj ? (activeComicObj.synopsis || `Informasi detail, sinopsis, penerbit, dan link pembelian buku ${activeComicObj.title}`).slice(0, 160) : 'Katalog komik terlengkap, jadwal terbit m&c! Akasha dan Elex Media, serta ulasan fisik komik dari Konotasi Store.';
    const pageImage = activeComicObj?.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';

    return (
    <div 
      className="bg-[#FEFFFE] dark:bg-[#202120] min-h-screen text-neutral-950 dark:text-neutral-50 selection:bg-neutral-900 dark:selection:bg-neutral-100 selection:text-white dark:selection:text-neutral-900 flex flex-col justify-between font-sans"
    >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
      </Head>
        
        {/* Dynamic Minimal Navbar */}
        <Navbar
          activeTab={activeTab}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onNavigateHome={handleNavHome}
          onNavigateNews={handleNavNews}
          onNavigateKios={handleNavEtalase}
        />
        {/* Dynamic Content Body with Smooth Fade-in Animations */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 pb-20 md:pb-6 bg-transparent">
          <AnimatePresence mode="wait">
            
            {/* Tab: HOME (Catalog Database) */}
            {activeTab === 'home' && (
              <motion.div
                key={isLoading ? 'home-skeleton' : 'home-screen'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? (
                  <LoadingHome />
                ) : (
                  <MarketplaceDb 
                    customComics={comicsData}
                    dynamicPublishers={publishers}
                    dynamicStoryStatuses={storyStatuses}
                    dynamicGenres={genres}
                    newsList={newsList}
                    totalBooksCount={totalBooksCount}
                    totalSeriesCount={totalSeriesCount}
                    totalPublishersCount={totalPublishersCount}
                    initialSelectedComicId={selectedComicId} 
                    onClearSelectedComicId={() => setSelectedComicId(null)}
                    onNavigateToNews={(newsId) => {
                      setActiveTab('news');
                      setSelectedNewsId(newsId);
                      window.location.hash = `#news`;
                    }}
                    onNavigateToCalendar={handleNavCalendar}
                  />
                )}
              </motion.div>
            )}

            {/* Tab: NEWS (Feeds & Updates) */}
            {activeTab === 'news' && (
              <motion.div
                key="news-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Visual Minimalist Landing Hero Banner */}
                {!selectedNewsId && (
                  <div className="relative text-center py-10 md:py-14 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white rounded-2xl overflow-hidden shadow-xs dark:shadow-md border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 transition-all duration-200">
                    {/* Abstract Background Accents */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-100 dark:from-neutral-800/20 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neutral-100 dark:bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 dark:bg-white/10 dark:backdrop-blur-md border border-neutral-200 dark:border-white/20 text-neutral-800 dark:text-white text-[9px] sm:text-[11px] font-mono font-bold tracking-wider sm:tracking-widest uppercase rounded-full text-center max-w-full leading-relaxed sm:leading-none">
                      <Sparkles className="w-3.5 h-3.5 text-[#DA6B1C] dark:text-[#DA6B1C] fill-[#DA6B1C]/10 dark:fill-[#DA6B1C]/30 shrink-0" />
                      <span>Discover Japanese Stories.</span>
                    </span>
                    <h1 className="text-3xl md:text-5xl font-sans font-black tracking-tight uppercase leading-none max-w-4xl text-neutral-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-100 dark:to-neutral-300">
                      NORINOYA
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                      Explore manga, light novel, anime, dan rilisan terbaru dari sumber resmi.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1.5 relative z-10">
                      <button
                        onClick={handleNavHome}
                        className="px-4.5 py-2 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-900 dark:hover:bg-neutral-100 active:scale-95 duration-100 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border border-transparent"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>norinoya</span>
                      </button>
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

                    {/* Counter Widget Info */}
                    <div className="flex items-center gap-4 sm:gap-6 pt-3 font-mono text-[10px] sm:text-xs">
                      <div className="flex flex-col items-center">
                        <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">{NEWS_UPDATES.length}</span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-[9px] sm:text-[10px] mt-1">Feeds Hari Ini</span>
                      </div>
                      <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
                      <div className="flex flex-col items-center">
                        <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">100%</span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-[9px] sm:text-[10px] mt-1">Komunitas</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* News Feed section with id for anchoring */}
                <div id="norinoya-news-hub" className="pt-2 scroll-mt-20">
                  <NewsFeed 
                    dbNewsList={newsList}
                    dbBooksList={books}
                    selectedNewsId={selectedNewsId} 
                    setSelectedNewsId={setSelectedNewsId} 
                    onNavigateToCatalog={handleNavHome}
                    onNavigateToComic={(comicId) => {
                      setActiveTab('home');
                      setSelectedComicId(comicId);
                      window.location.hash = `#/database/${comicId}`;
                    }}
                    onSelectShort={(short) => setSelectedShort(short)}
                  />
                </div>
              </motion.div>
            )}

            {/* Tab: ETALASE AFFILIATE CATALOG */}
            {activeTab === 'etalase' && (
              <motion.div
                key="etalase-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <EtalaseCatalog 
                  onNavigateToNews={(newsId) => {
                    setActiveTab('news');
                    setSelectedNewsId(newsId);
                    window.location.hash = `#news`;
                  }} 
                  selectedSaleId={selectedSaleId}
                  onClearSelectedSaleId={() => setSelectedSaleId(null)}
                />
              </motion.div>
            )}

            {/* Tab: ABOUT / PENERBIT / HUKUM INDONESIA */}
            {activeTab === 'about' && (
              <motion.div
                key="about-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Legal compliance legal page component */}
                <AboutSection />
              </motion.div>
            )}


          </AnimatePresence>
        </main>

        {/* Global Footer (Informative, design-inspired) */}
        <footer className="border-t border-neutral-205 dark:border-neutral-850 mt-16 bg-neutral-50 dark:bg-neutral-900 py-12 px-6 sm:px-8 pb-24 md:pb-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
            
            {/* Branding details */}
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

            {/* Hub menu */}
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
                      onClick={() => { 
                        handleNavAbout(); 
                        setTimeout(() => { 
                          document.getElementById('privacy-policy')?.scrollIntoView({ behavior: 'smooth' }); 
                        }, 150); 
                      }} 
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
                      <a 
                        href="https://instagram.com/norinoya.official" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-neutral-500 dark:text-neutral-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all flex items-center justify-center shadow-xs"
                        title="Instagram @norinoya.official"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                      <a 
                        href="https://tiktok.com/@norinoya.official" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all flex items-center justify-center shadow-xs"
                        title="TikTok @norinoya.official"
                      >
                        <svg className="w-3.5 h-3.5 fill-current text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.97 2.05 1.64 3.34 1.85.01.88 0 1.77-.01 2.65-.96-.11-1.92-.48-2.73-1.03-.69-.47-1.25-1.11-1.63-1.85-.05 1.48-.03 2.94-.04 4.41-.07 2.58-.93 5.16-2.71 7.03-1.74 1.95-4.32 2.99-6.95 2.87-2.67-.03-5.26-1.24-6.85-3.39-1.75-2.25-2.22-5.4-1.25-8.13C2.15 6.01 4.7 3.86 7.6 3.5c1.47-.15 2.98.08 4.29.81-.01 1-.01 1.99-.02 2.99-.86-.54-1.9-.76-2.9-.61-1.39.21-2.61 1.15-3.19 2.44-.7 1.46-.57 3.29.35 4.62.91 1.34 2.53 2.1 4.14 2 1.4-.04 2.72-.78 3.44-1.97.48-.75.69-1.64.67-2.52.01-3.21 0-6.42.01-9.63-.08-.55-.38-.97-.87-1.23-.28-.15-.59-.22-.92-.22H12.525z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-1.5 px-3 bg-neutral-50 dark:bg-[#262626] rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">@konotasi.sukasuka</span>
                    <div className="flex gap-1.5">
                      <a 
                        href="https://instagram.com/konotasi.sukasuka" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-neutral-500 dark:text-neutral-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all flex items-center justify-center shadow-xs"
                        title="Instagram @konotasi.sukasuka"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                      <a 
                        href="https://tiktok.com/@konotasi.sukasuka" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all flex items-center justify-center shadow-xs"
                        title="TikTok @konotasi.sukasuka"
                      >
                        <svg className="w-3.5 h-3.5 fill-current text-neutral-500 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.97 2.05 1.64 3.34 1.85.01.88 0 1.77-.01 2.65-.96-.11-1.92-.48-2.73-1.03-.69-.47-1.25-1.11-1.63-1.85-.05 1.48-.03 2.94-.04 4.41-.07 2.58-.93 5.16-2.71 7.03-1.74 1.95-4.32 2.99-6.95 2.87-2.67-.03-5.26-1.24-6.85-3.39-1.75-2.25-2.22-5.4-1.25-8.13C2.15 6.01 4.7 3.86 7.6 3.5c1.47-.15 2.98.08 4.29.81-.01 1-.01 1.99-.02 2.99-.86-.54-1.9-.76-2.9-.61-1.39.21-2.61 1.15-3.19 2.44-.7 1.46-.57 3.29.35 4.62.91 1.34 2.53 2.1 4.14 2 1.4-.04 2.72-.78 3.44-1.97.48-.75.69-1.64.67-2.52.01-3.21 0-6.42.01-9.63-.08-.55-.38-.97-.87-1.23-.28-.15-.59-.22-.92-.22H12.525z"/>
                        </svg>
                      </a>
                      <a 
                        href="https://youtube.com/@konotasi.sukasuka" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 text-neutral-500 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-all flex items-center justify-center shadow-xs"
                        title="YouTube @konotasi.sukasuka"
                      >
                        <Youtube className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto mt-10 pt-6 text-center text-xs font-mono text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-4 leading-[16px]">
            <span>© 2026 Norinoya </span>
          </div>
        </footer>

        {/* Mobile Sticky Bottom Navigation */}
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl z-[60] flex items-center justify-around py-2.5 px-3 mb-safe">
          <button
            onClick={handleNavHome}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer outline-none focus:outline-none ${
              activeTab === 'home'
                ? 'text-neutral-950 dark:text-white font-extrabold bg-neutral-100/90 dark:bg-neutral-700'
                : 'text-neutral-400 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4.5 h-4.5 mb-0.5" />
            <span className="text-xs font-sans font-bold leading-none tracking-tight">Home</span>
          </button>

          <button
            onClick={handleNavNews}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer outline-none focus:outline-none ${
              activeTab === 'news'
                ? 'text-neutral-950 dark:text-white font-extrabold bg-neutral-100/90 dark:bg-neutral-700'
                : 'text-neutral-400 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <Newspaper className="w-4.5 h-4.5 mb-0.5" />
            <span className="text-xs font-sans font-bold leading-none tracking-tight">News</span>
          </button>

          <button
            onClick={handleNavEtalase}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl select-none transition-all flex-1 cursor-pointer outline-none focus:outline-none ${
              activeTab === 'etalase'
                ? 'text-neutral-950 dark:text-white font-extrabold bg-neutral-100/90 dark:bg-neutral-700'
                : 'text-neutral-400 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4.5 h-4.5 mb-0.5" />
            <span className="text-xs font-sans font-bold leading-none tracking-tight">Kios</span>
          </button>
        </div>

        {/* Animated Simulated Shorts Modal Player (Unified with MarketplaceDb design!) */}
        <AnimatePresence>
          {selectedShort && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-950/95 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedShort(null)}
            >
              {/* Main Phone Shell Wrapper Container */}
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[340px] aspect-[9/16] bg-neutral-900 rounded-[36px] overflow-hidden border-8 border-neutral-800 shadow-2xl flex flex-col justify-between p-4 px-5 pb-6"
                style={{
                  background: `linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.95)), url(${selectedShort.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Phone Speaker & Camera Notch Hole */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-2xl flex items-center justify-between px-3.5 z-50">
                  <div className="w-11 h-1 bg-neutral-800 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-850" />
                </div>

                {/* Player Top Utility Header */}
                <div className="flex justify-between items-center w-full pt-4 relative z-10 text-white font-mono text-xs font-bold">
                  <span className="flex items-center gap-1 bg-red-650 px-1.5 py-0.5 rounded uppercase font-extrabold tracking-wider leading-none">
                    ● SPECIAL SHORTS
                  </span>
                  <span className="bg-black/40 px-2 py-0.5 rounded-full text-neutral-300 leading-none">
                    @konotasi.sukasuka
                  </span>
                </div>

                {/* Simulated Center Player Ring Loop */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.15, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center animate-pulse"
                  />
                </div>

                {/* Right Sidebar Icons Panel (TikTok Style!) */}
                <div className="absolute right-3.5 bottom-24 flex flex-col gap-4 items-center z-13 text-white">
                  {/* Curator Avatar badge */}
                  <div className="w-9 h-9 rounded-full border-2 border-[#DA6B1C]/50 overflow-hidden relative shadow">
                    <div className="bg-neutral-950 flex items-center justify-center w-full h-full text-xs font-bold text-[#DA6B1C]">KN</div>
                    <div className="absolute -bottom-1 -right-1 bg-red-600 rounded-full w-4.5 h-4.5 flex items-center justify-center font-bold text-xs text-white select-none">+</div>
                  </div>

                  {/* Like Button */}
                  <button 
                    onClick={() => alert("Simulasi Like Ditambahkan!")} 
                    className="flex flex-col items-center gap-0.5 group cursor-pointer bg-transparent border-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-black/50 hover:bg-neutral-800 flex items-center justify-center border border-white/10 transition-colors">
                      <span className="text-red-500 text-sm">❤</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-neutral-200">{selectedShort.likes}</span>
                  </button>

                  {/* Views Info */}
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center border border-white/10">
                      <span className="text-sky-400 text-xs font-bold font-mono">👁</span>
                    </div>
                    <span className="text-xs font-bold font-mono text-neutral-300">{selectedShort.views ? selectedShort.views.split(' ')[0] : '0'}</span>
                  </div>

                  {/* Audio sound button */}
                  <button 
                    onClick={() => setIsMuted(prev => !prev)}
                    className="w-9 h-9 rounded-full bg-black/55 hover:bg-neutral-800 flex items-center justify-center border border-white/10 cursor-pointer text-white"
                  >
                    <span className="text-xs">{isMuted ? '🔇' : '🔊'}</span>
                  </button>
                </div>

                {/* Bottom Interactive Content Container */}
                <div className="relative z-10 mt-auto space-y-3.5 text-left text-white pr-6">
                  
                  {/* Generative Interactive Dialogue Subtitles Bubble */}
                  <div className="bg-black/90 backdrop-blur-md rounded-2xl p-3 border border-neutral-800 shadow-lg space-y-1.5 max-w-[215px]">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-mono font-bold text-[#03ac0e] bg-emerald-950 border border-emerald-900 px-1.5 py-0.2 rounded uppercase">
                        Curator Quote
                      </span>
                      {selectedShort.duration && (
                        <span className="text-xs text-neutral-400 font-mono italic">{selectedShort.duration}</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-50 font-sans italic leading-relaxed font-bold">
                      {selectedShort.quote}
                    </p>
                  </div>

                  {/* Sound wave music record spinning */}
                  <div className="space-y-1">
                    <h4 className="font-sans font-black text-xs text-white leading-tight line-clamp-2">
                      {selectedShort.title}
                    </h4>
                    <p className="text-xs text-[#03ac0e] font-mono leading-none flex items-center gap-1">
                      <span>🎵 @konotasi.sukasuka - Original Sound (Curator Review)</span>
                    </p>
                  </div>

                  {/* Progress bar and controls */}
                  <div className="space-y-2 pt-1">
                    <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: ['-100%', '0%'] }}
                        transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                        className="absolute inset-0 w-full bg-[#03ac0e] rounded-full"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setSelectedShort(null)}
                        className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors text-white"
                      >
                        ✕ Tutup Player
                      </button>
                      <span className="text-xs text-neutral-400 font-mono font-bold">Simulasi Bersuara</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cookie Consent Banner */}
        <AnimatePresence>
          {cookieChoice === 'none' && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
              className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[110] bg-neutral-900 border border-neutral-800 text-white rounded-2xl shadow-2xl p-4 flex flex-col gap-3 font-sans"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-lg shrink-0 select-none">
                  🍪
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs tracking-wider uppercase text-neutral-350">Informasi Cookie &amp; Privasi</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans mt-0.5">
                    Norinoya menggunakan kuki lokal (cookies) dan <code>localStorage</code> untuk mengingat status pembatasan bacaan dewasa dan merawat preferensi navigasi Anda secara anonim. Kami tidak melacak data sensitif pribadi Anda.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1 sm:justify-end">
                <button
                  onClick={() => {
                    handleNavAbout();
                    setTimeout(() => {
                      document.getElementById('privacy-policy')?.scrollIntoView({ behavior: 'smooth' });
                    }, 150);
                  }}
                  className="px-3 py-1.5 hover:underline text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer text-left mr-auto sm:mr-0 font-bold"
                >
                  Kebijakan Privasi
                </button>
                <button
                  onClick={handleDeclineCookies}
                  className="px-3.5 py-1.5 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  Tolak
                </button>
                <button
                  onClick={handleAcceptCookies}
                  className="px-4 py-1.5 bg-[#03ac0e] hover:bg-emerald-600 active:scale-95 rounded-lg text-xs text-black font-sans font-black tracking-wide transition-all cursor-pointer shadow-sm text-center"
                >
                  Setuju
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Floating Back to Top Button */}
        <AnimatePresence>
          {showToTop && (
            <motion.button
              id="to-top-button"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToTop}
              className="fixed bottom-[88px] right-4 md:bottom-8 md:right-8 z-[100] bg-white/95 dark:bg-[#171717]/95 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-white p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:bg-neutral-100 dark:hover:bg-[#262626] hover:text-neutral-950 dark:hover:text-white focus:outline-none flex items-center justify-center cursor-pointer font-bold group transition-colors"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Partnership Brief Modal */}
        <AnimatePresence>
          {showBriefModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-neutral-900 border border-neutral-800 text-white w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col font-sans"
              >
                {/* Modal Header */}
                <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 border border-neutral-700 bg-neutral-800 text-neutral-200 font-sans text-[10px] font-black tracking-wider uppercase rounded-md select-none">
                      Media Kit
                    </span>
                    <h3 className="font-sans font-black text-sm uppercase tracking-tight text-white flex items-center gap-1.5">
                      <span>Norinoya &amp; @konotasi.sukasuka</span>
                      <span className="text-[11px] text-neutral-500 font-mono font-medium tracking-normal lowercase">(halaman {briefSlide + 1}/3)</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowBriefModal(false)}
                    className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center cursor-pointer transition-all active:scale-90"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body with Carousel Content */}
                <div className="p-6 flex flex-col justify-between">
                  <div className="h-[460px] sm:h-[230px] relative overflow-visible">
                    <AnimatePresence mode="wait">
                      {briefSlide === 0 && (
                        <motion.div
                          key="slide-0"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-5"
                        >
                          {/* Visual Intro */}
                          <div className="space-y-1.5">
                            <h4 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-neutral-450 shrink-0" />
                              <span>Kolaborasi Kreatif &amp; Publikasi</span>
                            </h4>
                            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                              Kami menghubungkan penerbit, kreator komik/novel, serta komunitas penikmat pop-kultur Jepang di Indonesia melalui review mendalam, ulasan kertas/cetakan, dan kurasi database yang kredibel.
                            </p>
                          </div>

                          {/* Channel Metrics / Statistics */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                            <div className="bg-neutral-950/60 border border-neutral-800 p-3 rounded-xl text-center space-y-0.5">
                              <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">Followers</span>
                              <span className="text-white font-black text-base tracking-tight block">10K+</span>
                              <span className="text-neutral-300 font-bold text-[9px] block">Instagram</span>
                            </div>
                            <div className="bg-neutral-950/60 border border-neutral-800 p-3 rounded-xl text-center space-y-0.5">
                              <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">Impressions</span>
                              <span className="text-white font-black text-base tracking-tight block">120K+</span>
                              <span className="text-neutral-400 font-bold text-[9px] block">Bulanan</span>
                            </div>
                            <div className="bg-neutral-950/60 border border-neutral-800 p-3 rounded-xl text-center space-y-0.5">
                              <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">Engagement</span>
                              <span className="text-white font-black text-base tracking-tight block">8.4%</span>
                              <span className="text-emerald-400 font-bold text-[9px] block">Organic Rate</span>
                            </div>
                            <div className="bg-neutral-950/60 border border-neutral-800 p-3 rounded-xl text-center space-y-0.5">
                              <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-wider block">Target Pembaca</span>
                              <span className="text-white font-black text-xs sm:text-[11px] tracking-tight truncate block pt-0.5">Manga Enthusiast</span>
                              <span className="text-neutral-400 font-bold text-[9px] block">Demografi</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {briefSlide === 1 && (
                        <motion.div
                          key="slide-1"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3.5"
                        >
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-black text-white uppercase tracking-tight">
                              Layanan Kolaborasi
                            </h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                              Pilihan program publikasi &amp; promosi yang dapat kami hadirkan untuk produk atau event Anda.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                            <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                              <div className="text-base shrink-0 select-none">📢</div>
                              <div className="space-y-0.5">
                                <h6 className="text-[11px] font-bold text-white">Press Release &amp; Broadcast</h6>
                                <p className="text-[10px] text-neutral-400 leading-normal">
                                  Publikasi info rilis komik baru, cetak ulang, lisensi baru, dan berita event di website Norinoya &amp; Instagram.
                                </p>
                              </div>
                            </div>

                            <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                              <div className="text-base shrink-0 select-none">📸</div>
                              <div className="space-y-0.5">
                                <h6 className="text-[11px] font-bold text-white">Event Coverage / Media Partner</h6>
                                <p className="text-[10px] text-neutral-400 leading-normal">
                                  Liputan langsung jalannya event komunitas, pameran buku, book signing, serta kolaborasi publikasi poster.
                                </p>
                              </div>
                            </div>

                            <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                              <div className="text-base shrink-0 select-none">📖</div>
                              <div className="space-y-0.5">
                                <h6 className="text-[11px] font-bold text-white">Premium Review &amp; Spotlight</h6>
                                <p className="text-[10px] text-neutral-400 leading-normal">
                                  Ulasan detail fisik buku (kertas, cetakan, translasi) serta ulasan konten secara obyektif &amp; menarik.
                                </p>
                              </div>
                            </div>

                            <div className="bg-neutral-950/40 border border-neutral-850 p-2.5 rounded-xl flex gap-2.5 hover:border-neutral-800 transition-colors">
                              <div className="text-base shrink-0 select-none">🎨</div>
                              <div className="space-y-0.5">
                                <h6 className="text-[11px] font-bold text-white">Banner &amp; Native Advertising</h6>
                                <p className="text-[10px] text-neutral-400 leading-normal">
                                  Pemasangan banner sponsor pada slot display Adsense di platform Norinoya untuk visibilitas maksimal.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {briefSlide === 2 && (
                        <motion.div
                          key="slide-2"
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3.5"
                        >
                          <div className="space-y-0.5">
                            <h4 className="text-sm font-black text-white uppercase tracking-tight">
                              Prosedur Kolaborasi
                            </h4>
                            <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                              Alur kerja sama yang transparan untuk menjaga kualitas publikasi bagi pembaca.
                            </p>
                          </div>

                          <div className="bg-neutral-950/80 border border-neutral-800 p-3 rounded-xl space-y-1 pt-2">
                            <ul className="space-y-1.5 text-[10.5px] text-neutral-300 pl-4 list-decimal leading-relaxed">
                              <li>Hubungi kami melalui tombol <strong className="text-white">Kontak</strong> atau kirim email langsung ke <code className="text-neutral-200 font-mono">komikusnganggur@gmail.com</code> dengan subjek <code className="text-neutral-400">[Partnership] Nama Brand/Event</code>.</li>
                              <li>Kirimkan detail brief, materi press release, aset gambar pendukung, atau jadwal peluncuran produk/event Anda.</li>
                              <li>Tim kami akan meninjau kelayakan konten agar selaras dengan ketertarikan komunitas pembaca Norinoya.</li>
                              <li>Penayangan artikel berita atau review akan dijadwalkan dan dikonfirmasikan kembali kepada pihak partner.</li>
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Carousel Page Indicators & Arrow Controls */}
                  <div className="flex items-center justify-between border-t border-neutral-800/60 pt-3 mt-4">
                    <button
                      disabled={briefSlide === 0}
                      onClick={() => setBriefSlide(prev => Math.max(0, prev - 1))}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-800 text-[11px] font-mono font-bold transition-all select-none ${
                        briefSlide === 0
                          ? 'opacity-30 cursor-not-allowed text-neutral-600 border-neutral-850 bg-transparent'
                          : 'cursor-pointer hover:bg-neutral-800 hover:text-white text-neutral-400 active:scale-95 bg-neutral-950/40'
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
                      <span>Prev</span>
                    </button>

                    {/* Dots indicator */}
                    <div className="flex items-center gap-2">
                      {[0, 1, 2].map((idx) => (
                        <button
                          key={idx}
                          onClick={() => setBriefSlide(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            briefSlide === idx
                              ? 'bg-white scale-125'
                              : 'bg-neutral-700 hover:bg-neutral-500'
                          }`}
                          title={`Halaman ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      disabled={briefSlide === 2}
                      onClick={() => setBriefSlide(prev => Math.min(2, prev + 1))}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-800 text-[11px] font-mono font-bold transition-all select-none ${
                        briefSlide === 2
                          ? 'opacity-30 cursor-not-allowed text-neutral-600 border-neutral-850 bg-transparent'
                          : 'cursor-pointer hover:bg-neutral-800 hover:text-white text-neutral-400 active:scale-95 bg-neutral-950/40'
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-neutral-800 bg-neutral-950 px-6 py-4 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500 font-mono">© @konotasi.sukasuka • norinoya.com</span>
                  <div className="flex gap-2">
                    <a
                      href="https://wa.me/628123456789?text=Halo%20Norinoya,%20saya%20tertarik%20untuk%20berkolaborasi%20mengenai%20partnership/press%20release."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white/10" />
                      <span>whatsapp</span>
                    </a>
                    <a
                      href="mailto:komikusnganggur@gmail.com"
                      className="px-4 py-1.5 bg-white hover:bg-neutral-100 text-neutral-950 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>email</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
  );
}
