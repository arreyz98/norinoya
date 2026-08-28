import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Send, ExternalLink, ShoppingBag, Store, BookOpen, Eye
} from 'lucide-react';
import { getTierDetails } from '@/types/demoHelper';

export interface CatalogItem {
  id: string; // unique ID: comicId-vol-volNumber
  comicId: string;
  title: string; // Comic Title + Volume X
  comicTitle: string;
  slug?: string;
  volNumber: number;
  category: string;
  categories?: string[];
  merchType?: string;
  coverImage: string;
  synopsis: string;
  deskripsi_produk?: string;
  rating: number;
  genres: string[];
  publisherName: string;
  publisherId: string;
  status: 'ongoing' | 'completed';
  demographic: string;
  readingRating?: string;
  author: string;
  price: number;
  isbn: string;
  releaseDate: string;
  cetakanInfo: string;
  affiliateLinks: {
    gramedia: string;
    shopee: string;
    tokopedia: string;
    toco?: string;
  };
  // Preloved extension fields
  isPreloved?: boolean;
  linkedComicId?: string;
  originalPrice?: number;
  conditionRating?: string;
  notes?: string;
  isSoldOut?: boolean;
  carouselImages?: string[];
  carouselLabels?: string[];
  shopeeUrl?: string;
  tokopediaUrl?: string;
  tocoUrl?: string;
  views_count?: number;
  shopee_clicks_count?: number;
  tokopedia_clicks_count?: number;
  gramedia_clicks_count?: number;
  toco_clicks_count?: number;
  total_clicks_count?: number;
}

export interface DetailKiosProps {
  selectedItem: CatalogItem;
  catalogItems: CatalogItem[];
  onClose: () => void;
  onSelectItem: (item: CatalogItem) => void;
  onOpenShareModal: (data: { title: string; shareUrl: string; category: string }) => void;
  onAddToCart?: (item: CatalogItem) => void;
  triggerNotification?: (msg: string) => void;
}

export default function DetailKios({
  selectedItem,
  catalogItems,
  onClose,
  onSelectItem,
  onOpenShareModal,
}: DetailKiosProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const scrollableContainerRef = React.useRef<HTMLDivElement>(null);

  const [currentViews, setCurrentViews] = useState<number>(() => {
    return selectedItem?.views_count || 0;
  });

  useEffect(() => {
    if (selectedItem?.views_count !== undefined) {
      setCurrentViews(selectedItem.views_count);
    }
  }, [selectedItem?.views_count, selectedItem?.id]);

  // Increment view counter on backend when viewing detail kios item
  useEffect(() => {
    if (!selectedItem?.id) return;

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    fetch(`/kios/${encodeURIComponent(String(selectedItem.id))}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        slug: selectedItem.slug,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && typeof data.views_count === 'number') {
          setCurrentViews(data.views_count);
          if (selectedItem) {
            selectedItem.views_count = data.views_count;
          }
        }
      })
      .catch(() => {
        // Silently catch network errors
      });
  }, [selectedItem]);

  // Track purchase/affiliate link clicks
  const handleLinkClick = (platform: 'shopee' | 'tokopedia' | 'gramedia' | 'toco') => {
    if (!selectedItem?.id) return;

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    fetch(`/kios/${encodeURIComponent(String(selectedItem.id))}/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        platform,
        slug: selectedItem.slug,
      }),
    }).catch(() => {
      // Silently catch network errors
    });
  };

  useEffect(() => {
    setActiveSlideIndex(0);
    const targetSlug = selectedItem.slug || selectedItem.id;
    window.history.pushState({ itemId: selectedItem.id }, '', `/kios/${targetSlug}`);
    
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }

    const t1 = setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0;
      }
    }, 10);

    const t2 = setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0;
      }
    }, 50);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [selectedItem]);

  const getReadingRatingBadgeStyle = (rating?: string) => {
    switch (rating) {
      case 'Anak & Bimbingan Orang Tua':
      case 'Anak & Bimbingan':
        return 'bg-neutral-100/95 dark:bg-neutral-800/95 text-[#41a34c] dark:text-emerald-400 border-emerald-500/40';
      case 'Remaja':
        return 'bg-neutral-100/95 dark:bg-neutral-800/95 text-[#d97706] dark:text-amber-400 border-amber-500/50 dark:border-amber-400/40';
      case 'Dewasa Ringan':
        return 'bg-neutral-100/95 dark:bg-neutral-800/95 text-[#ff6628] dark:text-orange-400 border-orange-500/40';
      case 'Dewasa Berat':
        return 'bg-neutral-100/95 dark:bg-neutral-800/95 text-[#c1271f] dark:text-red-400 border-red-500/40';
      default:
        return 'bg-neutral-100/95 dark:bg-neutral-800/95 text-[#d97706] dark:text-amber-400 border-amber-500/50 dark:border-amber-400/40';
    }
  };

  const handleShareClick = () => {
    const shareUrl = `${window.location.origin}/kios/${selectedItem.slug || selectedItem.id}`;
    onOpenShareModal({
      title: selectedItem.title,
      shareUrl,
      category: 'Kios'
    });
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-950 flex flex-col min-h-screen" ref={scrollableContainerRef}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50 flex flex-col transition-colors duration-200 relative"
      >
        {/* Top Header Navigation sticky full-width block */}
        <div className="sticky top-[57px] sm:top-[61px] z-40 w-full bg-white/95 dark:bg-[#202120]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="max-w-4xl w-full mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
              <span>Kembali</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none shrink-0"
                title="Bagikan Post Kios"
              >
                <Send className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28">
          {/* Title Header Block */}
          <div className="bg-neutral-50/80 dark:bg-neutral-900/40 p-3 sm:p-5 md:p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col md:flex-row gap-4 md:gap-6 items-start relative overflow-hidden shadow-xs">
            
            {/* Left Column: Cover carousel/image portfolio */}
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-80">
              <div className="relative aspect-[3/4] w-full max-w-[260px] mx-auto md:max-w-none rounded-xl overflow-hidden bg-neutral-950 flex flex-col justify-between p-3 border border-neutral-150 dark:border-neutral-800 shadow-md group">
                
                {selectedItem.isPreloved && selectedItem.carouselImages && selectedItem.carouselImages.length > 0 ? (
                  <img 
                    src={selectedItem.carouselImages[activeSlideIndex]} 
                    alt={`${selectedItem.title} - Slide ${activeSlideIndex + 1}`} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                  />
                ) : (
                  <img 
                    src={selectedItem.coverImage} 
                    alt={selectedItem.title} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-300"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none rounded-2xl" />

                {/* Carousel controls */}
                {selectedItem.isPreloved && selectedItem.carouselImages && selectedItem.carouselImages.length > 1 && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3.5 z-20 pointer-events-auto select-none">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIndex((prev) => 
                          prev === 0 ? selectedItem.carouselImages!.length - 1 : prev - 1
                        );
                      }}
                      className="w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center select-none transition-colors border border-white/15 shadow-md cursor-pointer"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIndex((prev) => 
                          prev === selectedItem.carouselImages!.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="w-8 h-8 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center select-none transition-colors border border-white/15 shadow-md cursor-pointer"
                    >
                      ›
                    </button>
                  </div>
                )}

                {/* Active photo caption */}
                {selectedItem.isPreloved && (
                  <div className="absolute bottom-4 left-6 right-6 z-10 text-left">
                    <span className="text-[10px] font-mono font-extrabold bg-white text-neutral-950 px-2 py-0.5 rounded uppercase tracking-wider leading-none shadow-xs">
                      {selectedItem.carouselLabels ? selectedItem.carouselLabels[activeSlideIndex] : 'Review Photo'}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails row */}
              {selectedItem.isPreloved && selectedItem.carouselImages && selectedItem.carouselImages.length > 1 && (
                <div className="grid grid-cols-5 gap-1.5 select-none self-center w-full">
                  {selectedItem.carouselImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`aspect-square rounded-lg border overflow-hidden relative transition-all bg-neutral-900 cursor-pointer ${
                        activeSlideIndex === idx 
                          ? 'border-neutral-950 dark:border-neutral-100 ring-2 ring-neutral-950 dark:ring-neutral-100 ring-offset-1 p-0.5 scale-102 font-bold' 
                          : 'border-neutral-200 dark:border-neutral-850 opacity-65 hover:opacity-100'
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
              
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedItem.isPreloved ? (
                  <>
                    <span className="text-xs font-mono px-2.5 py-1 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 text-neutral-800 dark:text-neutral-200 rounded font-bold">
                      Grade Kondisi: {getTierDetails(selectedItem.conditionRating).label}
                    </span>
                    {selectedItem.isSoldOut ? (
                      <span className="text-xs font-mono px-1.5 py-1 bg-red-105 text-red-800 rounded font-bold uppercase">
                        HABIS TERJUAL
                      </span>
                    ) : (
                      <span className="text-xs font-mono px-1.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold uppercase">
                        STOK TERSEDIA
                      </span>
                    )}
                    {selectedItem.originalPrice && (
                      <span className="text-xs font-mono px-1.5 py-1 bg-orange-50 text-rose-900 rounded font-bold uppercase border border-rose-200/50">
                        Hemat {Math.round((1 - selectedItem.price / selectedItem.originalPrice) * 100)}%
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {selectedItem.categories && selectedItem.categories.length > 0 ? (
                      selectedItem.categories.map((cat, i) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-0.5 bg-neutral-150 text-neutral-800 rounded-md capitalize font-bold leading-normal">
                          {cat.replace('_', ' ')}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs font-mono px-2.5 py-0.5 bg-neutral-150 text-neutral-800 rounded-md capitalize font-bold leading-normal">
                        {selectedItem.category.replace('_', ' ')}
                      </span>
                    )}
                    {selectedItem.readingRating && (
                      <span className={`text-xs font-mono px-2.5 py-0.5 rounded-md font-bold border leading-normal ${getReadingRatingBadgeStyle(selectedItem.readingRating)}`}>
                        {selectedItem.readingRating}
                      </span>
                    )}
                    <span className="text-xs font-mono px-2.5 py-0.5 bg-neutral-150 text-neutral-800 rounded-md capitalize font-bold leading-normal">
                      {selectedItem.status}
                    </span>
                  </>
                )}

                {/* Views Counter Badge */}
                <span className="inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-md border border-neutral-200/50 dark:border-neutral-700 leading-normal">
                  <Eye className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{currentViews.toLocaleString('id-ID')} views</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-sans font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-snug">
                {selectedItem.title}
              </h2>

              {/* Author Art, Story & Publisher */}
              <p className="text-xs sm:text-sm text-neutral-550 dark:text-neutral-450">
                Karya <strong>{selectedItem.author}</strong> • Penerbit Resmi <strong>{selectedItem.publisherName}</strong>
              </p>

              {/* Price and Action Cards */}
              <div className="bg-neutral-50/50 dark:bg-neutral-900/60 p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs max-w-xl space-y-4">
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block leading-none">
                      {selectedItem.isPreloved ? 'Harga Sale Preloved' : 'Harga Eceran Resmi'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-sans font-black ${selectedItem.isPreloved ? 'text-pink-600' : 'text-[#03ac0e]'}`}>
                        Rp {selectedItem.price.toLocaleString('id-ID')}
                      </span>
                      {selectedItem.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          Rp {selectedItem.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleShareClick}
                    className="px-4 py-2.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 border border-transparent text-xs font-sans font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span>BAGIKAN</span>
                  </button>
                </div>

                {/* Buy Buttons */}
                <div className="pt-2">
                  {selectedItem.isPreloved ? (
                    selectedItem.isSoldOut ? (
                      <button
                        disabled
                        className="w-full py-2.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 text-xs font-sans font-black uppercase tracking-wider rounded-xl text-center select-none"
                      >
                        Produk Terjual (Habis)
                      </button>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.shopeeUrl && (
                          <a
                            href={selectedItem.shopeeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('shopee')}
                            className="flex-1 min-w-[120px] py-2.5 px-3 bg-[#EE4D2D] text-white hover:opacity-95 text-xs font-sans font-black uppercase tracking-wider rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Shopee</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {selectedItem.tokopediaUrl && (
                          <a
                            href={selectedItem.tokopediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('tokopedia')}
                            className="flex-1 min-w-[120px] py-2.5 px-3 bg-[#03AC0E] text-white hover:opacity-95 text-xs font-sans font-black uppercase tracking-wider rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Tokopedia</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {selectedItem.tocoUrl && (
                          <a
                            href={selectedItem.tocoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('toco')}
                            className="flex-1 min-w-[120px] py-2.5 px-3 bg-[#FFD400] text-neutral-950 hover:brightness-95 text-xs font-sans font-black uppercase tracking-wider rounded-xl text-center shadow-xs flex items-center justify-center gap-1.5 cursor-pointer border border-[#e6bf00]"
                          >
                            <span>Toco</span>
                            <ExternalLink className="w-3.5 h-3.5 text-neutral-950" />
                          </a>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block leading-none mb-1">
                        Klik untuk Beli Resmi (Affiliate Link):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.affiliateLinks.gramedia && (
                          <a
                            href={selectedItem.affiliateLinks.gramedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('gramedia')}
                            className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 hover:border-blue-500 hover:text-blue-600 dark:border-neutral-800 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                          >
                            <span className="w-5 h-5 bg-[#00519E] rounded-md flex items-center justify-center shrink-0">
                              <span className="!text-white text-[8.5px] font-sans font-black select-none" style={{ color: '#ffffff' }}>G</span>
                            </span>
                            <span className="text-xs font-sans font-bold">Gramedia</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400 shrink-0" />
                          </a>
                        )}
                        {selectedItem.affiliateLinks.shopee && (
                          <a
                            href={selectedItem.affiliateLinks.shopee}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('shopee')}
                            className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 hover:border-orange-500 hover:text-orange-600 dark:border-neutral-800 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                          >
                            <span className="w-5 h-5 bg-[#EE4D2D] rounded-md flex items-center justify-center shrink-0">
                              <span className="!text-white text-[8.5px] font-sans font-black select-none" style={{ color: '#ffffff' }}>S</span>
                            </span>
                            <span className="text-xs font-sans font-bold">Shopee</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400 shrink-0" />
                          </a>
                        )}
                        {selectedItem.affiliateLinks.tokopedia && (
                          <a
                            href={selectedItem.affiliateLinks.tokopedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('tokopedia')}
                            className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 hover:border-emerald-500 hover:text-emerald-600 dark:border-neutral-800 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                          >
                            <span className="w-5 h-5 bg-[#03AC0E] rounded-md flex items-center justify-center shrink-0">
                              <span className="!text-white text-[8.5px] font-sans font-black select-none" style={{ color: '#ffffff' }}>T</span>
                            </span>
                            <span className="text-xs font-sans font-bold">Tokopedia</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400 shrink-0" />
                          </a>
                        )}
                        {selectedItem.affiliateLinks.toco && (
                          <a
                            href={selectedItem.affiliateLinks.toco}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('toco')}
                            className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 hover:border-yellow-500 hover:text-yellow-600 dark:border-neutral-800 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                          >
                            <span className="w-5 h-5 bg-[#FFD400] text-neutral-950 rounded-md flex items-center justify-center shrink-0">
                              <span className="text-[8.5px] font-sans font-black select-none text-neutral-950">Tc</span>
                            </span>
                            <span className="text-xs font-sans font-bold">Toco</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400 shrink-0" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedItem.genres.map(g => (
                  <span
                    key={g}
                    className="text-[10px] sm:text-xs bg-white dark:bg-neutral-900 text-neutral-850 dark:text-neutral-200 px-2.5 py-1 rounded-md font-mono border border-neutral-200 dark:border-neutral-800 font-medium leading-normal shadow-2xs"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Grid details body */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-full overflow-hidden">
            
            {/* Left Detail Column */}
            <div className="col-span-1 md:col-span-8 space-y-6 w-full max-w-full overflow-hidden text-left">
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-150 dark:border-neutral-850 pb-1 leading-normal">
                  Deskripsi Produk
                </h4>
                
                {selectedItem.isPreloved ? (
                  <div className="space-y-4">
                    {/* Deskripsi Produk Dinamis dari database CRUD */}
                    {(selectedItem.deskripsi_produk || selectedItem.synopsis) ? (
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans whitespace-pre-line select-text">
                        {selectedItem.deskripsi_produk || selectedItem.synopsis}
                      </p>
                    ) : (
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans select-text">
                        Item ini dikurasi langsung oleh tim <strong>@konotasi.sukasuka</strong> setelah sesi bedah terbitan. Segel dibuka dengan sangat hati-hati, hanya dibaca sekali untuk pencatatan kualitas kertas, lalu langsung dibungkus rapi dalam sleeve plastik tahan kelembaban.
                      </p>
                    )}

                    {/* Catatan Kondisi Fisik Reviewer */}
                    {selectedItem.notes && (
                      <div className="space-y-2 bg-neutral-50 dark:bg-neutral-900/40 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
                        <h5 className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest leading-none">
                          catatan kondisi fisik
                        </h5>
                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap select-text">
                          {selectedItem.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
                    <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans whitespace-pre-line select-text">
                      {selectedItem.deskripsi_produk || selectedItem.synopsis || 'Tidak ada deskripsi untuk produk ini.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Metadata Column */}
            <div className="col-span-1 md:col-span-4 space-y-4 text-sm font-sans w-full max-w-full overflow-hidden text-left">
              {/* PRODUK RELEVAN Widget */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3 shadow-xs text-left">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-150 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0">
                      <BookOpen className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <h5 className="font-extrabold text-neutral-900 dark:text-neutral-50 uppercase text-xs font-mono tracking-wider">
                      PRODUK RELEVAN
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded-md">
                    Rekomendasi
                  </span>
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed">
                  Produk lain yang relevan dengan item ini:
                </p>

                <div className="space-y-2">
                  {(() => {
                    const otherItems = catalogItems.filter(item => item.id !== selectedItem.id);
                    
                    // Score relevance based on categories, genres, and title matching
                    const scoredItems = otherItems.map(item => {
                      let score = 0;
                      
                      // Match same comic series or title similarity
                      if (item.comicTitle && selectedItem.comicTitle && (
                        item.comicTitle.toLowerCase() === selectedItem.comicTitle.toLowerCase() ||
                        item.title.toLowerCase().includes(selectedItem.comicTitle.toLowerCase()) ||
                        selectedItem.title.toLowerCase().includes(item.comicTitle.toLowerCase())
                      )) {
                        score += 50;
                      }

                      // Match same category (manga, light_novel, etc)
                      if (item.category === selectedItem.category) {
                        score += 15;
                      }

                      // Match common genres
                      if (Array.isArray(item.genres) && Array.isArray(selectedItem.genres)) {
                        const common = item.genres.filter(g => selectedItem.genres.includes(g));
                        score += common.length * 10;
                      }

                      // Match preloved vs official
                      if (Boolean(item.isPreloved) === Boolean(selectedItem.isPreloved)) {
                        score += 5;
                      }

                      return { item, score };
                    });

                    // Sort by relevance score descending
                    scoredItems.sort((a, b) => b.score - a.score);
                    const relevantList = scoredItems.slice(0, 4).map(s => s.item);

                    if (relevantList.length === 0) {
                      return (
                        <p className="text-xs text-neutral-400 py-3 text-center italic">
                          Tidak ada produk terkait lainnya.
                        </p>
                      );
                    }

                    return relevantList.map((relItem) => (
                      <div 
                        key={relItem.id} 
                        onClick={() => {
                          onSelectItem(relItem);
                        }}
                        className="p-2.5 bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 rounded-xl flex gap-3 items-center hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group cursor-pointer"
                      >
                        <img 
                          src={relItem.coverImage} 
                          alt={relItem.title} 
                          referrerPolicy="no-referrer"
                          className="w-11 h-15 object-cover rounded-md bg-neutral-900 shrink-0" 
                        />
                        <div className="flex-1 min-w-0 text-left space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[8.5px] font-mono font-extrabold bg-neutral-200/80 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 px-1.5 py-0.2 rounded uppercase leading-none">
                              {relItem.isPreloved ? 'PRELOVED' : 'MERCH'}
                            </span>
                            <span className="text-[9.5px] font-mono text-neutral-400 truncate">
                              {relItem.publisherName}
                            </span>
                          </div>
                          <h6 className="text-xs font-sans font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-emerald-600 transition-colors leading-snug">
                            {relItem.title}
                          </h6>
                          <p className="text-[10px] font-sans text-neutral-500 dark:text-neutral-400 line-clamp-1">
                            {relItem.genres.join(', ')}
                          </p>
                          <div className="flex items-center justify-between pt-0.5">
                            <span className="text-xs font-mono font-extrabold text-neutral-900 dark:text-neutral-100">
                              Rp {relItem.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* KIOS PENJUALAN (PRELOVED) Widget */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3 shadow-xs text-left">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-150 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0">
                      <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h5 className="font-extrabold text-neutral-900 dark:text-neutral-50 uppercase text-xs font-mono tracking-wider">
                      KIOS PENJUALAN (PRELOVED)
                    </h5>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-300/50">
                    Konotasi Store
                  </span>
                </div>

                {(() => {
                  const preloved = catalogItems.find(p => p.isPreloved && p.id !== selectedItem.id) || (selectedItem.isPreloved ? selectedItem : catalogItems[0]);
                  if (!preloved) return null;
                  return (
                    <div className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/80 rounded-xl space-y-2.5">
                      <div className="flex gap-3 items-start cursor-pointer" onClick={() => onSelectItem(preloved)}>
                        <div className="relative shrink-0 w-14 aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
                          <img 
                            src={preloved.coverImage} 
                            alt={preloved.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover" 
                          />
                          <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[7.5px] font-mono font-black px-1 py-0.2 rounded uppercase shadow-xs">
                            Kondisi {preloved.conditionRating || 'S'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 text-left space-y-0.5">
                          <h6 className="text-xs font-sans font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                            {preloved.title}
                          </h6>
                          <p className="text-[10px] font-sans text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-snug">
                            {preloved.notes || preloved.synopsis}
                          </p>
                          <div className="flex items-baseline gap-2 pt-1">
                            <span className="text-xs font-sans font-black text-emerald-600 dark:text-emerald-400">
                              Rp {preloved.price.toLocaleString('id-ID')}
                            </span>
                            {preloved.originalPrice && (
                              <span className="text-[10px] text-neutral-400 line-through">
                                Rp {preloved.originalPrice.toLocaleString('id-ID')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        {preloved.shopeeUrl && (
                          <a
                            href={preloved.shopeeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[80px] py-1.5 px-2 bg-[#EE4D2D] hover:opacity-95 text-white text-[11px] font-sans font-bold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-white shrink-0" />
                            <span>Shopee</span>
                          </a>
                        )}
                        {preloved.tokopediaUrl && (
                          <a
                            href={preloved.tokopediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[80px] py-1.5 px-2 bg-[#03AC0E] hover:opacity-95 text-white text-[11px] font-sans font-bold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <Store className="w-3.5 h-3.5 text-white shrink-0" />
                            <span>Tokopedia</span>
                          </a>
                        )}
                        {preloved.tocoUrl && (
                          <a
                            href={preloved.tocoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[80px] py-1.5 px-2 bg-[#FFD400] hover:brightness-95 text-neutral-950 text-[11px] font-sans font-bold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border border-[#e6bf00]"
                          >
                            <span className="w-3.5 h-3.5 bg-neutral-950 rounded-full text-[#FFD400] text-[8px] font-black flex items-center justify-center shrink-0">T</span>
                            <span>Toco</span>
                          </a>
                        )}
                        {!preloved.shopeeUrl && !preloved.tokopediaUrl && !preloved.tocoUrl && (
                          <a
                            href="https://shopee.co.id/norinoya.sukasuka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 px-2 bg-[#EE4D2D] hover:opacity-95 text-white text-[11px] font-sans font-bold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-white shrink-0" />
                            <span>Shopee Store</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>

          {/* Clean Footer */}
          <div className="mt-12 pt-8 border-t border-neutral-200/80 dark:border-neutral-800 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-sans font-black tracking-wider uppercase text-neutral-900 dark:text-neutral-100">Norinoya</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-400"></span>
                  <span className="text-xs font-mono font-bold text-neutral-400">KIOS DETAIL</span>
                </div>
                <p className="text-xs text-neutral-550 dark:text-neutral-450 max-w-md font-sans leading-relaxed">
                  Dapatkan produk orisinal dan berkualitas tinggi langsung melalui partner kolaborasi kami. Dukung industri resmi dengan membeli produk original.
                </p>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
