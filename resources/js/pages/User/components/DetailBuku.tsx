import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShareModal } from './ShareModal';
import { HighlightReview } from './HighlightReview';
import { 
  BookOpen, ArrowUpRight, ArrowLeft, Send, Store, ShieldAlert, Info, ShoppingBag
} from 'lucide-react';
import { COMICS_DATA, NEWS_UPDATES, PRE_OWNED_ITEMS } from '../../../types/mockData';
import { Comic, Volume} from '../../../types/demo';
import { RawNewsItem } from '../news';

interface DetailBukuProps {
  selectedComic: Comic;
  activeVolumeNum: number;
  setActiveVolumeNum: (volNum: number) => void;
  handleCloseModal: () => void;
  onNavigateToNews?: (newsId: string) => void;
  setSelectedGenres: (genres: string[]) => void;
  setSelectedComic: (comic: Comic | null) => void;
  allComics?: Comic[];
  newsList?: RawNewsItem[];
}

export default function DetailBuku({
  selectedComic,
  activeVolumeNum,
  setActiveVolumeNum,
  handleCloseModal,
  setSelectedGenres,
  setSelectedComic,
  allComics,
  newsList = [],
}: DetailBukuProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [unlockedComics, setUnlockedComics] = useState<Record<string, boolean>>({});

  // Share Modal state
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    title: string;
    shareUrl: string;
    category: string;
  }>({ isOpen: false, title: '', shareUrl: '', category: 'Katalog' });

  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSlideIndex(0);
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }
    
    // Smooth scroll to position the main comic detail card nicely below the sticky top headers
    const scrollToTarget = () => {
      const cardEl = document.getElementById('comic-detail-card');
      if (cardEl) {
        const cardTop = cardEl.getBoundingClientRect().top + window.pageYOffset;
        const headerOffset = 120;
        window.scrollTo({
          top: Math.max(0, cardTop - headerOffset),
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const timer = setTimeout(scrollToTarget, 60);
    return () => clearTimeout(timer);
  }, [selectedComic?.id, activeVolumeNum]);

  const activeVolObj = selectedComic
    ? (selectedComic.volumes.find(v => v.volNumber === activeVolumeNum) || selectedComic.volumes[0])
    : null;

  // Increment view counter on backend when viewing detail buku
  useEffect(() => {
    const targetBookId = activeVolObj?.bookId || activeVolObj?.id || selectedComic?.bookId || selectedComic?.id;
    if (!targetBookId) return;

    // Send POST request with CSRF token support
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    fetch(`/books/${encodeURIComponent(String(targetBookId))}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        volume: activeVolumeNum,
        slug: selectedComic?.slug,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && typeof data.views_count === 'number') {
          if (activeVolObj) {
            activeVolObj.views_count = data.views_count;
          }
          if (selectedComic) {
            selectedComic.views_count = data.views_count;
          }
        }
      })
      .catch(() => {
        // Silently catch network errors
      });
  }, [selectedComic, activeVolObj, activeVolumeNum]);

  const activeVolumeCover = selectedComic
    ? (activeVolObj?.coverImage || selectedComic.coverImage)
    : undefined;

  const carouselImages = selectedComic
    ? (activeVolObj?.images && activeVolObj.images.length > 0
        ? activeVolObj.images
        : (activeVolumeCover ? [activeVolumeCover] : [])
      )
    : [];

  const getAffiliateStoreStyle = (storeName: string, storeSlug: string) => {
    const name = (storeName || storeSlug || '').toLowerCase();
    
    if (name.includes('gramedia')) {
      return {
        className: 'bg-[#00519E] hover:bg-[#004080] text-white',
        label: storeName || 'Gramedia',
        brand: 'gramedia'
      };
    }
    if (name.includes('shopee')) {
      return {
        className: 'bg-[#EE4D2D] hover:bg-[#D73C1E] text-white',
        label: storeName || 'Shopee',
        brand: 'shopee'
      };
    }
    if (name.includes('tokopedia')) {
      return {
        className: 'bg-[#03AC0E] hover:bg-[#028F0B] text-white',
        label: storeName || 'Tokopedia',
        brand: 'tokopedia'
      };
    }
    if (name.includes('blibli')) {
      return {
        className: 'bg-[#0095DA] hover:bg-[#007BB5] text-white',
        label: storeName || 'Blibli',
        brand: 'blibli'
      };
    }
    if (name.includes('lazada')) {
      return {
        className: 'bg-[#0F146D] hover:bg-[#0A0E52] text-white',
        label: storeName || 'Lazada',
        brand: 'lazada'
      };
    }
    if (name.includes('amazon')) {
      return {
        className: 'bg-[#FF9900] hover:bg-[#E68A00] text-black font-extrabold',
        label: storeName || 'Amazon',
        brand: 'amazon'
      };
    }

    return {
      className: 'bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white',
      label: storeName || 'Toko Resmi',
      brand: 'custom'
    };
  };

  const catalogComics = (allComics && allComics.length > 0) ? allComics : COMICS_DATA;

  const relevantComics = React.useMemo(() => {
    if (!selectedComic) return [];

    const currentGenres = new Set((selectedComic.genres || []).map(g => g.toLowerCase()));
    const currentCategory = (selectedComic.category || '').toLowerCase();
    const currentPublisher = (selectedComic.publisherId || selectedComic.publisherName || '').toLowerCase();
    const currentTitle = (selectedComic.title || '').toLowerCase();

    // Filter out current comic and any comic with identical title or slug (same book, different volume)
    const candidates = catalogComics.filter((c) => {
      if (c.id === selectedComic.id) return false;
      if (c.slug && selectedComic.slug && c.slug === selectedComic.slug) return false;
      if (c.title && currentTitle && c.title.toLowerCase() === currentTitle) return false;
      return true;
    });

    // Score candidates based on matching genres (+2), category (+3), and publisher (+1)
    const scored = candidates.map((c) => {
      let score = 0;

      if (c.genres && c.genres.length > 0) {
        c.genres.forEach(g => {
          if (currentGenres.has(g.toLowerCase())) {
            score += 2;
          }
        });
      }

      if (c.category && c.category.toLowerCase() === currentCategory) {
        score += 3;
      }

      if (c.publisherId || c.publisherName) {
        const pub = (c.publisherId || c.publisherName || '').toLowerCase();
        if (pub && pub === currentPublisher) {
          score += 1;
        }
      }

      return { comic: c, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const matched = scored.filter(item => item.score > 0).map(item => item.comic);
    if (matched.length > 0) {
      return matched.slice(0, 4);
    }

    return candidates.slice(0, 4);
  }, [selectedComic, catalogComics]);

  useEffect(() => {
    if (!selectedComic || carouselImages.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedComic, carouselImages.length]);

  const getReadingRatingStyle = (rating?: string) => {
    switch (rating) {
      case 'Anak & Bimbingan Orang Tua':
      case 'Anak & Bimbingan':
        return {
          bg: 'bg-[#22c55e] dark:bg-[#16a34a] border-emerald-600/30 text-white',
          text: 'Anak & Bimbingan',
          color: '#41a34c',
          hoverClass: 'group-hover:text-[#41a34c] dark:group-hover:text-emerald-400',
          hoverClassKat: 'group-hover/kat:text-[#41a34c] dark:group-hover/kat:text-emerald-400'
        };
      case 'Remaja':
        return {
          bg: 'bg-[#f59e0b] dark:bg-[#d97706] border-amber-600/30 text-white',
          text: 'Remaja',
          color: '#f59e0b',
          hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
          hoverClassKat: 'group-hover/kat:text-[#d97706] dark:group-hover/kat:text-amber-400'
        };
      case 'Dewasa Ringan':
        return {
          bg: 'bg-[#ff6628] dark:bg-[#ea580c] border-orange-600/30 text-white',
          text: 'Dewasa Ringan',
          color: '#ff723c',
          hoverClass: 'group-hover:text-[#ff6628] dark:group-hover:text-orange-400',
          hoverClassKat: 'group-hover/kat:text-[#ff6628] dark:group-hover/kat:text-orange-400'
        };
      case 'Dewasa Berat':
        return {
          bg: 'bg-[#ef4444] dark:bg-[#dc2626] border-red-600/30 text-white',
          text: 'Dewasa Berat',
          color: '#c1271f',
          hoverClass: 'group-hover:text-[#c1271f] dark:group-hover:text-red-400',
          hoverClassKat: 'group-hover/kat:text-[#c1271f] dark:group-hover/kat:text-red-400'
        };
      default:
        return {
          bg: 'bg-[#f97316] dark:bg-[#ea580c] border-orange-600/30 text-white',
          text: 'Remaja',
          color: '#d97706',
          hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
          hoverClassKat: 'group-hover/kat:text-[#d97706] dark:group-hover/kat:text-amber-400'
        };
    }
  };

  const getPaperType = (comic: Comic, vol: Volume | null) => {
    if (vol?.paperType) return vol.paperType;
    if (comic.paperType) return comic.paperType;
    
    if (comic.id === 'naruto-bindup') return 'Bookpaper 55g (Premium)';
    if (comic.category === 'light_novel' || comic.category === 'novel') return 'Bookpaper Premium';
    if (vol?.cetakanInfo?.toLowerCase().includes('bookpaper')) return 'Bookpaper';
    if (vol?.cetakanInfo?.toLowerCase().includes('koran')) return 'Kertas Koran';
    return 'Bookpaper 55g';
  };

  const getDimensions = (comic: Comic, vol: Volume | null) => {
    if (vol?.dimensions) return vol.dimensions;
    if (comic.dimensions) return comic.dimensions;
    
    if (comic.id === 'naruto-bindup') return '13 x 18 cm';
    if (comic.category === 'novel') return '13.5 x 20 cm';
    if (comic.category === 'light_novel') return '13 x 19 cm';
    return '12 x 18 cm';
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-950 flex flex-col min-h-screen" ref={scrollableContainerRef}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full bg-white dark:bg-[#202120] text-neutral-950 dark:text-neutral-50 flex flex-col transition-colors duration-200 relative"
      >
        <div id="comic-detail-top" className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
        {/* Scrollable Content Viewport */}
        <div className="w-full">
          {/* Top Header Navigation sticky full-width block */}
        <div className="fixed top-[58px] sm:top-[64px] left-0 right-0 z-40 w-full bg-white/95 dark:bg-[#202120]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800 transition-colors">
                  <div className="max-w-4xl w-full mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
                    <button
                      onClick={handleCloseModal}
                      className="h-9 inline-flex items-center gap-2 px-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none"
                    >
                      <ArrowLeft className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                      <span>Kembali</span>
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Share Action - Icon Only */}
                      <button
                        onClick={() => {
                          if (selectedComic) {
                            const bookSlug = selectedComic.slug || selectedComic.id;
                            const shareUrl = `${window.location.origin}/buku/${bookSlug}`;
                            setShareModalData({
                              isOpen: true,
                              title: selectedComic.title,
                              shareUrl,
                              category: 'Katalog'
                            });
                          }
                        }}
                        className="w-9 h-9 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none shrink-0"
                        title="Bagikan Post Katalog"
                      >
                        <Send className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                      </button>
                    </div>
                  </div>
                </div>

          <div className="w-full h-fit lg:max-w-[92%] xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-24 pt-16 sm:pt-20 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28 dark:bg-neutral-950">
            {/* Title Header with Gradient */}
            <div id="comic-detail-card" className="bg-neutral-50/80 dark:bg-[#0F0F0F] p-3 sm:p-5 md:p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col md:flex-row gap-4 md:gap-6 items-start relative overflow-hidden shadow-xs">
            
            {/* Left Column: Interactive Slide Carousel Portfolio Component */}
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-80">
              <div className="relative aspect-[3/4] w-full max-w-[260px] mx-auto md:max-w-none rounded-xl overflow-hidden bg-neutral-950 flex flex-col justify-between p-3 border border-neutral-150 dark:border-neutral-800 shadow-md group">
                
                {/* Active Slide Image */}
                {carouselImages && carouselImages.length > 0 ? (
                  <img 
                    src={carouselImages[activeSlideIndex]} 
                    alt={`${selectedComic.title} - Jilid ${activeVolumeNum} - Slide ${activeSlideIndex + 1}`} 
                    referrerPolicy="no-referrer"
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-450 rounded-2xl">
                    <BookOpen className="w-14 h-14 stroke-[1.2]" />
                  </div>
                )}
                
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none rounded-2xl" />
              </div>

              {/* Miniature thumbnail row indicators (responsive) */}
              {carouselImages && carouselImages.length > 1 && (
                <div className="grid grid-cols-5 gap-1.5 select-none self-center w-full">
                  {carouselImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`aspect-square rounded-lg border overflow-hidden relative transition-all bg-neutral-900 cursor-pointer ${
                        activeSlideIndex === idx 
                          ? 'border-neutral-950 ring-2 ring-neutral-950 ring-offset-1 p-0.5 scale-102 font-bold' 
                          : 'border-neutral-200 opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`thumbnail ${idx}`} referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-md" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Combined Information Panel */}
            <div className="space-y-4 flex-1 pt-1 text-left w-full">
              
              {/* Primary Comic and Volume title */}
              <div className="flex items-center flex-wrap gap-2.5">
                <h2 className="text-xl md:text-2xl font-sans font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-snug">
                  {activeVolObj?.title  || selectedComic.title} (Volume {activeVolumeNum})
                </h2>
              </div>

              {/* Curator explanation text changed to volume-specific synopsis */}
              <p className="text-xs sm:text-sm text-neutral-705 dark:text-neutral-300 leading-relaxed font-sans whitespace-pre-line select-text">
                {selectedComic.volumes.find(v => v.volNumber === activeVolumeNum)?.synopsis || selectedComic.synopsis}
              </p>

              {/* Collector badge triggers */}
              <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs max-w-xl space-y-4">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4.5 h-4.5 text-neutral-500 dark:text-neutral-400 mt-0.5 shrink-0" />
                  <div className="space-y-3.5 flex-1">
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-sans font-bold shadow-2xs select-none">
                          📖 {activeVolObj?.editionName ? `Edisi ${activeVolObj.editionName}` : (activeVolObj?.cetakanInfo || 'Edisi Standar')}
                        </span>
                      </div>
                      
                      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-sans pl-0.5 leading-relaxed">
                        {activeVolObj?.editionName
                          ? `Buku ini menggunakan format Edisi ${activeVolObj.editionName} resmi.`
                          : 'Cetakan dan rilis resmi Indonesia.'}
                      </p>
                    </div>

                    <div className="h-px bg-neutral-150 dark:bg-neutral-800/80" />

                    <div className="space-y-1 pl-0.5">
                      <div className="text-xs font-sans font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        {activeVolObj?.editionName ? `Edisi ${activeVolObj.editionName}` : 'Edisi Indonesia'}
                      </div>
                      <div className="text-[11px] sm:text-xs font-sans font-medium text-neutral-450 dark:text-neutral-550">
                        Penerbit: {selectedComic.publisherName || 'Penerbit Resmi'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider separating curator details and the original comic metadata */}
              <div className="h-px bg-neutral-200 my-4" />

              {/* Combined Metadata: Category, Reading Rating, and Status Badges */}
              <div className="space-y-3 pt-0.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs px-2.5 py-0.5 bg-neutral-150 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border dark:border-neutral-800 rounded-md capitalize font-bold leading-normal">
                    {selectedComic.category.replace('_', ' ')}
                  </span>
                  {selectedComic.readingRating && (
                    <span className={`text-xs px-2.5 py-0.5 rounded-md font-bold border leading-normal ${getReadingRatingStyle(selectedComic.readingRating).bg}`}>
                      {getReadingRatingStyle(selectedComic.readingRating).text}
                    </span>
                  )}
                  <span className="text-xs px-2.5 py-0.5 bg-neutral-150 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border dark:border-neutral-800 rounded-md capitalize font-bold leading-normal">
                    {selectedComic.status}
                  </span>
                </div>

                {/* Publisher and Authors list text */}
                <div className="text-xs text-neutral-550 space-y-1.5 mt-1 leading-normal">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <p>
                      Author Story: <span className="text-neutral-900 dark:text-white font-extrabold">{selectedComic.authorStory || 'N/A'}</span>
                    </p>
                    <p>
                      Author Art: <span className="text-neutral-900 dark:text-white font-extrabold">{selectedComic.authorArt || 'N/A'}</span>
                    </p>
                  </div>
                </div>

                {/* Clickable Genre indicators pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedComic.genres.map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => {
                        setSelectedGenres([g]);
                        handleCloseModal();
                      }}
                      className="text-[10px] sm:text-xs bg-white dark:bg-neutral-900 text-neutral-850 dark:text-neutral-200 px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 font-medium leading-normal hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-2xs"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Grid details body */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-full overflow-hidden">
            {/* Left Detail Column */}
            <div className="col-span-1 md:col-span-8 space-y-6 w-full max-w-full overflow-hidden">
              {/* Review & Update News Link */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-150 dark:border-neutral-850 pb-1 leading-normal">
                  KETERANGAN
                </h4>
                {(() => {
                  const targetNewsUrl = activeVolObj?.news_link || activeVolObj?.newsLink || selectedComic.news_link || selectedComic.newsLink;
                  
                  if (!targetNewsUrl) {
                    return (
                      <div className="space-y-3">
                        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans whitespace-pre-line select-text">
                          {activeVolObj?.synopsis || selectedComic.synopsis}
                        </p>
                      </div>
                    );
                  }

                  const isInternalNews = targetNewsUrl.startsWith('/news') || targetNewsUrl.startsWith('/news/');

                  // Find matched news title from newsList or NEWS_UPDATES
                  let matchedTitle = '';
                  const cleanSlug = targetNewsUrl.replace(/^\/news\//, '').replace(/^\/news/, '').replace(/\?.*/, '').trim();

                  if (newsList && newsList.length > 0) {
                    const found = newsList.find(n => 
                      (cleanSlug && (n.slug === cleanSlug || String(n.id) === cleanSlug)) ||
                      (n.slug && targetNewsUrl.includes(n.slug)) || (n.slug && targetNewsUrl.endsWith(n.slug))
                    );
                    if (found?.title) matchedTitle = found.title;
                  }

                  if (!matchedTitle) {
                    const foundMock = NEWS_UPDATES.find(n => 
                      (cleanSlug && (n.slug === cleanSlug || String(n.id) === cleanSlug)) ||
                      targetNewsUrl.includes(String(n.id)) || (n.slug && targetNewsUrl.includes(n.slug))
                    );
                    if (foundMock?.title) matchedTitle = foundMock.title;
                  }

                  const displayTitle = matchedTitle || `Berita & Informasi Terkait: ${activeVolObj?.title || selectedComic.title}`;

                  return (
                    <div className="space-y-3">
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans whitespace-pre-line select-text">
                        {activeVolObj?.synopsis || selectedComic.synopsis}
                      </p>
                      
                      {isInternalNews ? (
                        <a
                          href={targetNewsUrl}
                          className="w-full text-left p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-[#262626] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group flex items-start gap-3.5 cursor-pointer shadow-xs"
                        >
                          <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center">
                            <Info className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                          </div>
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100">
                              Baca Berita Terkait:
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 font-sans font-medium leading-relaxed group-hover:text-neutral-950 dark:group-hover:text-white transition-colors line-clamp-2">
                              {displayTitle}
                            </p>
                          </div>
                          <div className="p-1 rounded-lg text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-all self-center shrink-0">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </a>
                      ) : (
                        <a
                          href={targetNewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-[#262626] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group flex items-start gap-3.5 cursor-pointer shadow-xs"
                        >
                          <div className="p-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center">
                            <Info className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                          </div>
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100">
                              Baca Berita Terkait:
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 font-sans font-medium leading-relaxed group-hover:text-neutral-950 dark:group-hover:text-white transition-colors line-clamp-2">
                              {displayTitle}
                            </p>
                          </div>
                          <div className="p-1 rounded-lg text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-all self-center shrink-0">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </a>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Volume Selector Carousel */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 leading-normal">
                  PILIH VOLUME
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedComic.volumes.map(v => (
                    <button
                      key={v.volNumber}
                      onClick={() => {
                        setActiveVolumeNum(v.volNumber);
                      }}
                      className={`w-10 h-10 rounded-xl border transition-all text-xs font-bold cursor-pointer ${
                        activeVolumeNum === v.volNumber
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 active:bg-neutral-50'
                      }`}
                    >
                      {v.volNumber}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Volume details display box */}
              {(() => {
                if (!activeVolObj) return null;

                return (
                  <div className=" rounded-xl p-3.5 sm:p-5 space-y-4 sm:space-y-5 bg-neutral-50/40 dark:bg-[#171717] shadow-xs">
                    {/* Title and general metadata */}
                    <div className="flex justify-between items-center gap-2">
                      <h5 className="font-extrabold text-[#030303] dark:text-white text-sm leading-snug font-sans">
                        Volume {activeVolObj.volNumber}
                      </h5>
                      <span className="text-sm font-extrabold px-3 py-1 bg-white dark:bg-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 rounded-xl shrink-0 leading-normal text-neutral-900">
                        Rp {(activeVolObj.price || 45000).toLocaleString('id-ID')}
                      </span>
                    </div>

                    {/* Affiliate & OTT Adaptations with Age Censorship Sensor */}
                    {(() => {
                      const isAdult = selectedComic.readingRating === 'Dewasa Ringan' || selectedComic.readingRating === 'Dewasa Berat';
                      const isUnlocked = unlockedComics[selectedComic.id];
                      const hasAnime = !!(activeVolObj.animeAdaptation && activeVolObj.animeAdaptation.length > 0);
                      const hasLiveAction = !!(activeVolObj.liveActionAdaptation && activeVolObj.liveActionAdaptation.length > 0);
                      const hasOtt = hasAnime || hasLiveAction;

                      const linksContent = (
                        <div className="space-y-4">
                          {/* Affiliate Direct Links */}
                          {(() => {
                            const dynamicLinks = (activeVolObj.affiliateLinksList && activeVolObj.affiliateLinksList.length > 0)
                              ? activeVolObj.affiliateLinksList
                              : [
                                  activeVolObj.affiliateLinks?.gramedia && { id: 'g', url: activeVolObj.affiliateLinks.gramedia, storeName: 'Gramedia', storeSlug: 'gramedia' },
                                  activeVolObj.affiliateLinks?.shopee && { id: 's', url: activeVolObj.affiliateLinks.shopee, storeName: 'Shopee', storeSlug: 'shopee' },
                                  activeVolObj.affiliateLinks?.tokopedia && { id: 't', url: activeVolObj.affiliateLinks.tokopedia, storeName: 'Tokopedia', storeSlug: 'tokopedia' }
                                ].filter(Boolean) as { id: string; url: string; storeName: string; storeSlug: string }[];

                            if (!dynamicLinks || dynamicLinks.length === 0) return null;

                            return (
                              <div className="space-y-3">
                                <h6 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 leading-normal">
                                  <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                                  Link affiliate toko resmi (Dukungan bagi kreator)
                                </h6>
                                <div className="space-y-1.5">
                                  {dynamicLinks.map((link) => {
                                    const style = getAffiliateStoreStyle(link.storeName, link.storeSlug);
                                    return (
                                      <a
                                        key={link.id || link.storeName}
                                        href={link.url}
                                        target="_blank"
                                        rel="no-referrer"
                                        className={`w-full h-8.5 rounded-xl flex items-center justify-center transition-all shadow-3xs px-3 gap-2 ${style.className}`}
                                        title={`Beli di ${link.storeName} Resmi`}
                                      >
                                        {style.brand === 'gramedia' && (
                                          <svg className="h-4.5 text-white fill-current filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M12 8.5C10 8.5 9 10 9 12s1 3.5 3 3.5c1.2 0 2-.6 2.3-1.2h-2v-1.5h3.5v4H14c-1.5 1.5-3.5 1.5-4.5 1.5C6.5 17.8 5 15.5 5 12c0-3.5 1.5-5.8 4.5-5.8 1.5 0 3 .8 3.8 2l-1.3 1.1c-.5-.7-1.1-.8-1.5-.8z" />
                                            <text x="25" y="16.5" fill="currentColor" className="font-sans tracking-widest text-[12px] font-extrabold">GRAMEDIA</text>
                                          </svg>
                                        )}

                                        {style.brand === 'shopee' && (
                                          <svg className="h-4.5 text-white fill-current filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 5h-2c-.2 0-.3.1-.4.2L6 8h6l-1.6-2.8c-.1-.1-.2-.2-.4-.2zM15.5 8h-2.1L11.8 5c-.1-.2-.3-.3-.5-.3h-2.6c-.2 0-.4.1-.5.3L6.6 8H4.5C3.7 8 3 8.7 3 9.5v10c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5v-10c0-.8-.7-1.5-1.5-1.5zm-5.5-5.5c.8 0 1.5.7 1.5 1.5H8.5c0-.8.7-1.5 1.5-1.5z" />
                                            <text x="24" y="16.5" fill="currentColor" className="font-sans tracking-widest text-[13px] font-extrabold">Shopee</text>
                                          </svg>
                                        )}

                                        {style.brand === 'tokopedia' && (
                                          <svg className="h-4.5 text-white fill-current filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14H11v-2H9v-2h2v-2h2v2h2v2h-2v2z" />
                                            <text x="25" y="16.5" fill="currentColor" className="font-sans tracking-tight text-[12px] font-extrabold">tokopedia</text>
                                          </svg>
                                        )}

                                        {style.brand === 'custom' && (
                                          <span className="font-sans text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                                            <ShoppingBag className="w-4 h-4" />
                                            {link.storeName}
                                          </span>
                                        )}

                                        {style.brand !== 'gramedia' && style.brand !== 'shopee' && style.brand !== 'tokopedia' && style.brand !== 'custom' && (
                                          <span className="font-sans text-xs font-extrabold uppercase tracking-wider">
                                            {link.storeName}
                                          </span>
                                        )}
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })()}
                                        </div>
                      );

                      if (isAdult && !isUnlocked) {
                        return (
                          <div className="border border-red-200/60 rounded-2xl p-4 bg-red-50/5 relative overflow-hidden transition-all duration-300 shadow-inner min-h-[240px] flex flex-col justify-center">
                            {/* Blurred target area container */}
                            <div className="blur-md opacity-25 select-none pointer-events-none transition-all duration-300">
                              {linksContent}
                            </div>
                            
                            {/* Custom Warning Gated Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-white/90 dark:bg-[#171717] backdrop-blur-xs z-10">
                              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100/80 flex items-center justify-center text-red-600 mb-2 shadow-xs">
                                <ShieldAlert className="w-5 h-5 text-red-600" />
                              </div>
                              <h6 className="font-sans font-black text-neutral-950 dark:text-white text-xs sm:text-sm tracking-tight mb-1">
                                Ditujukan untuk Dewasa ({selectedComic.readingRating})
                              </h6>
                              <p className="font-sans text-neutral-550 text-[10.5px] sm:text-[11px] max-w-sm mb-3.5 leading-relaxed">
                                {hasOtt
                                  ? "Bagian ini berisi tautan affiliate toko & adaptasi OTT platform legal berating Dewasa. Konfirmasi usia untuk membukanya."
                                  : "Bagian ini berisi tautan affiliate toko resmi berating Dewasa. Konfirmasi usia untuk membukanya."
                                }
                              </p>
                              <button
                                onClick={() => setUnlockedComics(prev => ({ ...prev, [selectedComic.id]: true }))}
                                className="px-5 py-2 bg-neutral-950 hover:bg-neutral-850 active:translate-y-px text-white text-xs font-sans font-black rounded-full transition-all shadow-md cursor-pointer hover:shadow-lg"
                              >
                                Saya Mengerti &amp; Konfirmasi
                              </button>
                            </div>
                          </div>
                        );
                      }

                      return linksContent;
                    })()}

                    {/* Educational Preview Shorts Shelf */}
                    <HighlightReview activeVolObj={activeVolObj} selectedComic={selectedComic} />
                  </div>
                );
              })()}
            </div>

            {/* Right Metadata Column */}
            <div className="col-span-1 md:col-span-4 space-y-4 text-sm font-sans w-full max-w-full overflow-hidden">
              {/* General book stats */}
              <div className="bg-neutral-50 dark:bg-[#171717] rounded-2xl p-4.5 space-y-3.5 shadow-xs">
                <h5 className="font-extrabold dark:text-neutral-100 text-neutral-900 border-b border-neutral-250 pb-2 uppercase text-xs tracking-wider leading-normal">
                  Spesifikasi Buku
                </h5>
                <div className="space-y-3 text-sm leading-normal">
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500 block text-xs leading-normal">JENIS KERTAS:</span>
                    <span className="text-neutral-950 dark:text-neutral-100 font-semibold">{getPaperType(selectedComic, activeVolObj)}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500 block text-xs leading-normal">ISBN:</span>
                    <span className="text-neutral-950 dark:text-neutral-100 font-semibold">{activeVolObj?.isbn || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500 block text-xs leading-normal">JUMLAH HALAMAN:</span>
                    <span className="text-neutral-950 dark:text-neutral-100 font-semibold">
                      {activeVolObj?.pages ? `${activeVolObj.pages} Halaman` : 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 dark:text-neutral-500 block text-xs leading-normal">UKURAN BUKU (LEBAR X PANJANG):</span>
                    <span className="text-neutral-950 dark:text-neutral-100 font-semibold">{getDimensions(selectedComic, activeVolObj)}</span>
                  </div>
                </div>
              </div>

              {/* KATALOG RELEVAN Widget */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3 shadow-xs text-left">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-150 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0">
                      <BookOpen className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <h5 className="font-extrabold text-neutral-900 dark:text-neutral-50 uppercase text-xs tracking-wider">
                      KATALOG RELEVAN
                    </h5>
                  </div>
                  <span className="text-[10px]  font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded-md">
                    {relevantComics.length} Buku
                  </span>
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                  Manga & volume terbitan resmi yang berhubungan dengan berita/buku ini:
                </p>

                <div className="space-y-2">
                  {relevantComics.map((relComic) => {
                    const firstVol = relComic.volumes && relComic.volumes.length > 0 ? relComic.volumes[0] : null;
                    const relCover = relComic.coverImage || firstVol?.coverImage;
                    const displayPrice = firstVol?.price ? `Rp ${firstVol.price.toLocaleString('id-ID')}` : 'Rp 45.000';
                    const genresText = relComic.genres?.slice(0, 2).join(', ') || 'Komik & Novel';

                    return (
                      <div 
                        key={relComic.id} 
                        onClick={() => {
                          setSelectedComic(relComic);
                          setActiveVolumeNum(firstVol?.volNumber || 1);
                        }}
                        className="p-2.5 bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 rounded-xl flex gap-3 items-center hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group cursor-pointer"
                      >
                        {relCover ? (
                          <img 
                            src={relCover} 
                            alt={relComic.title} 
                            referrerPolicy="no-referrer"
                            className="w-11 h-15 object-cover rounded-md bg-neutral-900 shrink-0 shadow-2xs group-hover:scale-102 transition-transform" 
                          />
                        ) : (
                          <div className="w-11 h-15 bg-neutral-200 dark:bg-neutral-700 rounded-md shrink-0 flex items-center justify-center text-neutral-400">
                            <BookOpen className="w-5 h-5" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0 text-left space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[8.5px] font-extrabold bg-neutral-200/80 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-1.5 py-0.2 rounded uppercase leading-none">
                              {relComic.category ? relComic.category.replace('_', ' ') : 'Buku'}
                            </span>
                            <span className="text-[9.5px] text-neutral-400 truncate">
                              {relComic.publisherName || 'Penerbit'}
                            </span>
                          </div>
                          
                          <h6 className={`text-xs font-sans font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 ${getReadingRatingStyle(relComic.readingRating).hoverClass} transition-colors leading-snug`}>
                            {relComic.title}
                          </h6>

                          <p className="text-[10px] font-sans text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {genresText}
                          </p>

                          <div className="flex items-center justify-between pt-0.5">
                            <span className="text-xs font-extrabold text-neutral-900 dark:text-neutral-100">
                              {displayPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {relevantComics.length === 0 && (
                    <p className="text-xs text-neutral-400 font-sans italic py-3 text-center">
                      Belum ada katalog relevan lainnya.
                    </p>
                  )}
                </div>
              </div>

              {/* KIOS PENJUALAN (PRELOVED) Widget */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3 shadow-xs text-left">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-150 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0">
                      <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h5 className="font-extrabold text-neutral-900 dark:text-neutral-50 uppercase text-xs tracking-wider">
                      KIOS
                    </h5>
                  </div>
                </div>

                {(() => {
                  const preloved = PRE_OWNED_ITEMS.find(p => p.linkedComicId === selectedComic.id) || PRE_OWNED_ITEMS[0];
                  const productUrl = `/kios#${preloved.id}`;

                  return (
                    <div 
                      onClick={() => {
                        window.location.href = productUrl;
                      }}
                      className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/80 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-xl space-y-2.5 cursor-pointer transition-all hover:shadow-xs group/kios"
                    >
                      <div className="flex gap-3 items-start">
                        <div className="relative shrink-0 w-14 aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
                          <img 
                            src={preloved.coverImage} 
                            alt={preloved.comicTitle} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover/kios:scale-105 transition-transform" 
                          />
                          <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[7.5px] font-black px-1 py-0.2 rounded uppercase shadow-xs">
                            Kondisi {preloved.conditionRating || 'S'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 text-left space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <h6 className="text-xs font-sans font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover/kios:text-emerald-600 dark:group-hover/kios:text-emerald-400 transition-colors">
                              {preloved.comicTitle} Vol {preloved.volumeNumber}
                            </h6>
                            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/kios:text-emerald-600 dark:group-hover/kios:text-emerald-400 transition-colors shrink-0" />
                          </div>
                          <p className="text-[10px] font-sans text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-snug">
                            {preloved.notes}
                          </p>
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="text-xs font-sans font-black text-emerald-600 dark:text-emerald-400">
                              Rp {preloved.salePrice.toLocaleString('id-ID')}
                            </span>
                            {preloved.originalPrice && (
                              <span className="text-[10px] text-neutral-400 line-through">
                                Rp {preloved.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Ads placeholder inside modal */}
              <div className="bg-neutral-50 dark:bg-[#262626] border border-dashed border-neutral-250 dark:border-neutral-700 rounded-2xl p-4 text-center space-y-1.5 transition-colors">
                <span className="text-xs font-extrabold tracking-wider text-neutral-400 dark:text-neutral-400 uppercase block leading-normal">PROMOTED AD</span>
                <div className="bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-800 py-4.5 rounded-xl text-xs text-neutral-500 dark:text-neutral-300 shadow-xs leading-normal">
                  Affiliate Promo Slot
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </motion.div>

      {/* Lightbox High-Resolution Immersive Zoom Overlay */}
      <AnimatePresence>
        {isLightboxOpen && selectedComic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/98 backdrop-blur-md z-[100] flex flex-col justify-between p-6 select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar inside Lightbox */}
            <div className="flex justify-between items-center w-full max-w-5xl mx-auto text-white">
              <div className="space-y-0.5">
                <span className="text-[10px] sm:text-xs font-bold tracking-wider text-neutral-400 uppercase">
                  Detail Cetakan Fisik Halaman
                </span>
                <h3 className="text-base sm:text-lg font-sans font-extrabold text-white leading-normal">
                  {selectedComic.title} (Vol. {activeVolumeNum})
                </h3>
              </div>
              <button 
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 border border-neutral-800 rounded-full flex items-center justify-center text-white bg-neutral-900 hover:bg-neutral-800 transition-colors uppercase text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Immersive centered Image wrapper */}
            <div className="my-auto w-full max-w-5xl mx-auto flex items-center justify-center relative">
              <img 
                src={carouselImages[activeSlideIndex]} 
                alt="lightbox-zoom"
                referrerPolicy="no-referrer"
                className="max-h-[70vh] md:max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-neutral-850"
              />
            </div>

            {/* Bottom Controls Indicator inside Lightbox */}
            <div className="w-full max-w-5xl mx-auto flex justify-between items-center text-white pt-2">
              <span className="text-xs text-neutral-400">
                Pencahayaan Alami Studio • 5500K
              </span>
              <span className="text-xs text-neutral-400 uppercase tracking-widest">
                Foto {activeSlideIndex + 1} / {carouselImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal Popup */}
      <ShareModal
        isOpen={shareModalData.isOpen}
        onClose={() => setShareModalData(prev => ({ ...prev, isOpen: false }))}
        title={shareModalData.title}
        shareUrl={shareModalData.shareUrl}
        category={shareModalData.category}
      />
    </div>
  );
}
