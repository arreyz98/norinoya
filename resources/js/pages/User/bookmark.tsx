import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bookmark, BookOpen, Newspaper, ShoppingBag, Trash2,
  Search, Sparkles, ChevronRight, Tag,
  Clock, Check, Info, Layers, Send, RefreshCw,
  BookMarked, BookText, Ticket, Mic, Tv, Gamepad2, Globe, Flame
} from 'lucide-react';
import { Head, router } from '@inertiajs/react';
import { useBookmarks } from '../../utils/bookmarkStorage';
import { COMICS_DATA, PRE_OWNED_ITEMS } from '../../types/mockData';
import { Comic, NewsUpdate } from '../../types/demo';
import { mapBooksToComics, BookModel, getBookTypeLabel } from '../../utils/mapBookToComic';
import { RawNewsItem } from './news';
import { RawKiosItem } from './components/EtalaseCatalog';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';


const getReadingRatingBadgeStyle = (rating?: string) => {
  switch (rating) {
    case 'Anak & Bimbingan Orang Tua':
    case 'Anak & Bimbingan':
      return 'bg-[#22c55e] dark:bg-[#16a34a] text-white border border-emerald-600/30';
    case 'Remaja':
      return 'bg-[#f59e0b] dark:bg-[#d97706] text-white border border-amber-600/30';
    case 'Dewasa Ringan':
      return 'bg-[#ff6628] dark:bg-[#ea580c] text-white border border-orange-600/30';
    case 'Dewasa Berat':
      return 'bg-[#ef4444] dark:bg-[#dc2626] text-white border border-red-600/30';
    default:
      return 'bg-[#f59e0b] dark:bg-[#d97706] text-white border border-amber-600/30';
  }
};

type BookmarkNewsItem = NewsUpdate & { publishDate?: string };

const formatNewsPublishDateTime = (post: BookmarkNewsItem) => {
  if (post.publishDate) {
    try {
      const d = new Date(post.publishDate);
      if (!isNaN(d.getTime())) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
      }
    } catch {
      // fallback
    }
  }
  let charHash = 0;
  for (let i = 0; i < post.id.length; i++) {
    charHash = (charHash << 5) - charHash + post.id.charCodeAt(i);
    charHash |= 0;
  }
  const positiveHash = Math.abs(charHash);
  const simHours = String((positiveHash % 12) + 9).padStart(2, '0');
  const simMins = String((positiveHash * 7) % 60).padStart(2, '0');
  return `23 Ags 2026, ${simHours}:${simMins} WIB`;
};

const getNewsCategoryInfo = (category: string) => {
  switch (category) {
    case 'cetakan_ulang':
      return { icon: RefreshCw, label: 'Cetak Ulang' };
    case 'manga':
      return { icon: BookOpen, label: 'Manga' };
    case 'light_novel':
      return { icon: BookMarked, label: 'Light Novel' };
    case 'novel':
      return { icon: BookText, label: 'Novel' };
    case 'rilisan':
      return { icon: Newspaper, label: 'Rilisan' };
    case 'edukasi':
      return { icon: Sparkles, label: 'Review' };
    case 'promo':
      return { icon: Tag, label: 'Promo' };
    case 'event':
      return { icon: Ticket, label: 'Event' };
    case 'komunitas':
      return { icon: Mic, label: 'Komunitas' };
    case 'anime':
      return { icon: Tv, label: 'Anime' };
    case 'game':
      return { icon: Gamepad2, label: 'Game' };
    case 'jepang':
      return { icon: Globe, label: 'Jepang' };
    case 'breaking':
      return { icon: Flame, label: 'Breaking' };
    default:
      return { icon: Newspaper, label: 'Berita' };
  }
};

const renderNewsGallery = (news: NewsUpdate) => {
  const images = (news.galleryImages && news.galleryImages.length > 0)
    ? news.galleryImages
    : (news.attachedImage ? [news.attachedImage] : []);

  if (!images || images.length === 0) return null;

   if (images.length === 1) {
     return (
       <div className="relative w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs group/img aspect-[16/10] flex items-center justify-center">
         <img
           src={images[0]}
           alt={news.title || 'Foto Berita'}
           loading="lazy"
           decoding="async"
           referrerPolicy="no-referrer"
           onError={(e) => {
             e.currentTarget.onerror = null;
             e.currentTarget.style.display = 'none';
           }}
           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
         />
         <span className="text-neutral-400 dark:text-neutral-500 text-xs font-mono">Gambar tidak tersedia</span>
       </div>
     );
   }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 aspect-[16/10]">
        {images.map((img, idx) => (
          <div key={idx} className="relative w-full h-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
            <img
              src={img}
              alt={`Foto ${idx + 1}`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 aspect-[16/10]">
        <div className="relative w-full h-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
          <img
            src={images[0]}
            alt="Foto 1"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col gap-1.5 w-full h-full min-h-0">
          <div className="relative flex-1 w-full min-h-0 overflow-hidden bg-neutral-200 dark:bg-neutral-900">
            <img
              src={images[1]}
              alt="Foto 2"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative flex-1 w-full min-h-0 overflow-hidden bg-neutral-200 dark:bg-neutral-900">
            <img
              src={images[2]}
              alt="Foto 3"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    );
  }

  // 4 or more images: 2x2 grid
  const displayImages = images.slice(0, 4);
  const extraCount = images.length - 4;

  return (
    <div className="grid grid-cols-2 gap-1.5 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 aspect-[16/10]">
      {displayImages.map((img, idx) => {
        const isFourthAndExtra = idx === 3 && extraCount > 0;
        return (
          <div key={idx} className="relative w-full h-full overflow-hidden bg-neutral-200 dark:bg-neutral-900">
            <img
              src={img}
              alt={`Foto ${idx + 1}`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isFourthAndExtra && (
              <div className="absolute inset-0 bg-neutral-900/75 backdrop-blur-2xs flex items-center justify-center text-white font-mono font-extrabold text-xs sm:text-sm">
                +{extraCount} Foto
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface SavedBookmarksProps {
  comics: Comic[];
  news: BookmarkNewsItem[];
  kiosItems: RawKiosItem[];
  onNavigateToComic: (comicId: string) => void;
  onNavigateToNews: (newsId: string) => void;
  onNavigateToKios: (kiosId?: string) => void;
  onNavigateToHome: () => void;
}

export function SavedBookmarks({
  comics: catalogComics,
  news: newsFeedData,
  kiosItems,
  onNavigateToComic,
  onNavigateToNews,
  onNavigateToKios,
  onNavigateToHome,
}: SavedBookmarksProps) {
  const { bookmarks, remove, clear, counts } = useBookmarks();
  const [activeFilter, setActiveFilter] = useState<'all' | 'comics' | 'news' | 'kios'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Resolve saved objects from IDs
  const savedComics = useMemo(() => {
    const list: Array<{
      id: string;
      comicId: string;
      title: string;
      seriesTitle: string;
      publisherName: string;
      category: string;
      rating: number;
      readingRating?: string;
      author?: string;
      genres?: string;
      coverImage?: string;
      synopsis: string;
      volNumber?: number | string;
      price?: number;
      releaseDate?: string;
    }> = [];

    bookmarks.comics.forEach((savedId) => {
      const volMatch = savedId.match(/^(.+)-vol-(.+)$/);
      if (volMatch) {
        const cId = volMatch[1];
        const volPart = volMatch[2];
        const isNumericVol = /^\d+(\.\d+)?$/.test(volPart);
        const volNum = isNumericVol ? Number(volPart) : volPart;
        const comic = catalogComics.find(c => c.id === cId);
        if (comic) {
          const vol = comic.volumes.find(v => String(v.volNumber) === String(volNum));
          list.push({
            id: savedId,
            comicId: comic.id,
            title: `${comic.title} Vol.${volNum}`,
            seriesTitle: comic.title,
            publisherName: comic.publisherName,
            category: getBookTypeLabel(comic.category),
            rating: comic.rating,
            readingRating: comic.readingRating || 'Remaja',
            author: comic.authorStory || comic.authorArt || 'Kreator',
            genres: comic.genres?.slice(0, 2).join(', ') || comic.demographic || 'Manga, Buku',
            coverImage: vol?.coverImage || comic.coverImage,
            synopsis: vol?.synopsis || comic.synopsis,
            volNumber: volNum,
            price: vol?.price || comic.volumes[0]?.price || 45000,
            releaseDate: vol?.releaseDate,
          });
          return;
        }
      }

      const comic = catalogComics.find(c => c.id === savedId);
      if (comic) {
        list.push({
          id: savedId,
          comicId: comic.id,
          title: comic.title,
          seriesTitle: comic.title,
          publisherName: comic.publisherName,
          category: comic.category,
          rating: comic.rating,
          readingRating: comic.readingRating || 'Remaja',
          author: comic.authorStory || comic.authorArt || 'Kreator',
          genres: comic.genres?.slice(0, 2).join(', ') || comic.demographic || 'Manga, Buku',
          coverImage: comic.coverImage || comic.volumes[0]?.coverImage,
          synopsis: comic.synopsis,
          volNumber: comic.volumes[0]?.volNumber,
          price: comic.volumes[0]?.price || 45000,
        });
      }
    });
    return list;
  }, [catalogComics, bookmarks.comics]);

  const savedNews = useMemo(() => {
    return newsFeedData.filter(n => bookmarks.news.includes(n.id));
  }, [newsFeedData, bookmarks.news]);

  const savedKios = useMemo(() => {
    const list: Array<{
      id: string;
      comicId?: string;
      comicTitle: string;
      volumeNumber?: number | string;
      salePrice: number;
      originalPrice?: number;
      coverImage: string;
      notes: string;
      publisherName: string;
      category: string;
      rating: number;
      readingRating?: string;
      author?: string;
      genres?: string;
      conditionRating?: string;
      isSoldOut?: boolean;
    }> = [];

    bookmarks.kios.forEach((savedId) => {
      // 1. Check PRE_OWNED_ITEMS
      const preOwned = PRE_OWNED_ITEMS.find(k => k.id === savedId);
      if (preOwned) {
        const linkedComic = preOwned.linkedComicId
          ? catalogComics.find(c => c.id === preOwned.linkedComicId || c.id === preOwned.linkedComicId?.replace('-manga', '') || c.id === preOwned.linkedComicId?.replace('-ln', '') || c.id === preOwned.linkedComicId?.replace('-bindup', ''))
          : undefined;
        list.push({
          id: preOwned.id,
          comicId: preOwned.linkedComicId || preOwned.id,
          comicTitle: preOwned.comicTitle,
          volumeNumber: preOwned.volumeNumber,
          salePrice: preOwned.salePrice,
          originalPrice: preOwned.originalPrice,
          coverImage: preOwned.coverImage || '',
          notes: preOwned.notes,
          conditionRating: preOwned.conditionRating,
          isSoldOut: preOwned.isSoldOut,
          publisherName: linkedComic?.publisherName || 'Preloved @konotasi',
          category: linkedComic?.category || 'MANGA',
          rating: linkedComic?.rating || 5.0,
          readingRating: linkedComic?.readingRating || 'Remaja',
          author: linkedComic?.authorStory || linkedComic?.authorArt || '@konotasi.sukasuka',
          genres: linkedComic?.genres?.slice(0, 2).join(', ') || linkedComic?.demographic || 'Preloved, Koleksi',
        });
        return;
      }

      // 2. Check live kios items (database)
      const kiosItem = kiosItems.find(k => String(k.id) === savedId);
      if (kiosItem) {
        const price = Number(kiosItem.price) || 0;
        const linkedComic = catalogComics.find(
          c => c.title === (kiosItem.comic_title || kiosItem.title)
        );
        list.push({
          id: String(kiosItem.id),
          comicId: linkedComic?.id || String(kiosItem.id),
          comicTitle: kiosItem.comic_title || kiosItem.title,
          volumeNumber: kiosItem.vol_number || 1,
          salePrice: price,
          originalPrice: Number(kiosItem.original_price) || price,
          coverImage: kiosItem.cover_image || linkedComic?.coverImage || '',
          notes: kiosItem.deskripsi_produk || kiosItem.synopsis || kiosItem.notes || '',
          conditionRating: kiosItem.condition_rating || 'S',
          isSoldOut: Boolean(kiosItem.is_sold_out),
          publisherName: kiosItem.publisher_name || linkedComic?.publisherName || 'Kios Partner',
          category: kiosItem.categories?.[0] || kiosItem.category || 'MANGA',
          rating: Number(kiosItem.rating) || linkedComic?.rating || 4.9,
          readingRating: kiosItem.reading_rating || linkedComic?.readingRating || 'Remaja',
          author: kiosItem.author || linkedComic?.authorStory || linkedComic?.authorArt || 'Kreator',
          genres: kiosItem.genres?.slice(0, 2).join(', ') || kiosItem.demographic || 'Kios, Merchandise',
        });
        return;
      }

      // 3. Check if volume ID format `${comicId}-vol-${volNum}`
      const volMatch = savedId.match(/^(.+)-vol-(.+)$/);
      if (volMatch) {
        const cId = volMatch[1];
        const volPart = volMatch[2];
        const isNumericVol = /^\d+(\.\d+)?$/.test(volPart);
        const volNum = isNumericVol ? Number(volPart) : volPart;
        const comic = catalogComics.find(c => c.id === cId);
        if (comic) {
          const vol = comic.volumes.find(v => String(v.volNumber) === String(volNum));
          list.push({
            id: savedId,
            comicId: comic.id,
            comicTitle: comic.title,
            volumeNumber: volNum,
            salePrice: vol?.price || comic.volumes[0]?.price || 45000,
            originalPrice: vol?.price || comic.volumes[0]?.price || 45000,
            coverImage: vol?.coverImage || comic.coverImage || '',
            notes: vol?.synopsis || comic.synopsis || '',
            conditionRating: 'Baru',
            isSoldOut: false,
            publisherName: comic.publisherName,
            category: getBookTypeLabel(comic.category),
            rating: comic.rating,
            readingRating: comic.readingRating || 'Remaja',
            author: comic.authorStory || comic.authorArt || 'Kreator',
            genres: comic.genres?.slice(0, 2).join(', ') || comic.demographic || 'Manga, Buku',
          });
          return;
        }
      }

      // 4. Check direct comic in the catalog
      const comic = catalogComics.find(c => c.id === savedId);
      if (comic) {
        list.push({
          id: savedId,
          comicId: comic.id,
          comicTitle: comic.title,
          volumeNumber: comic.volumes[0]?.volNumber || 1,
          salePrice: comic.volumes[0]?.price || 45000,
          originalPrice: comic.volumes[0]?.price || 45000,
          coverImage: comic.coverImage || comic.volumes[0]?.coverImage || '',
          notes: comic.synopsis || '',
          conditionRating: 'Baru',
          isSoldOut: false,
          publisherName: comic.publisherName,
          category: comic.category,
          rating: comic.rating,
          readingRating: comic.readingRating || 'Remaja',
          author: comic.authorStory || comic.authorArt || 'Kreator',
          genres: comic.genres?.slice(0, 2).join(', ') || comic.demographic || 'Manga, Buku',
        });
        return;
      }
    });

    return list;
  }, [catalogComics, kiosItems, bookmarks.kios]);

  // Filtered lists based on search
  const filteredComics = useMemo(() => {
    if (!searchQuery.trim()) return savedComics;
    const q = searchQuery.toLowerCase();
    return savedComics.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.seriesTitle.toLowerCase().includes(q) ||
      c.publisherName.toLowerCase().includes(q) ||
      (c.author && c.author.toLowerCase().includes(q)) ||
      (c.genres && c.genres.toLowerCase().includes(q))
    );
  }, [savedComics, searchQuery]);

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return savedNews;
    const q = searchQuery.toLowerCase();
    return savedNews.filter(n =>
      (n.title && n.title.toLowerCase().includes(q)) ||
      n.content.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      (n.displayName && n.displayName.toLowerCase().includes(q))
    );
  }, [savedNews, searchQuery]);

  const filteredKios = useMemo(() => {
    if (!searchQuery.trim()) return savedKios;
    const q = searchQuery.toLowerCase();
    return savedKios.filter(k =>
      k.comicTitle.toLowerCase().includes(q) ||
      (k.publisherName && k.publisherName.toLowerCase().includes(q)) ||
      (k.author && k.author.toLowerCase().includes(q)) ||
      (k.genres && k.genres.toLowerCase().includes(q)) ||
      (k.notes && k.notes.toLowerCase().includes(q))
    );
  }, [savedKios, searchQuery]);

  const totalFilteredCount = (activeFilter === 'all' ? (filteredComics.length + filteredNews.length + filteredKios.length) :
    activeFilter === 'comics' ? filteredComics.length :
    activeFilter === 'news' ? filteredNews.length :
    filteredKios.length);

  const [pendingRemoveId, setPendingRemoveId] = useState<string | null>(null);
  const pendingTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pendingClearAll, setPendingClearAll] = useState<boolean>(false);
  const pendingClearTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tab scroll state for horizontal fade in/out indicators
  const tabsContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkTabsScroll = React.useCallback(() => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  }, []);

  React.useEffect(() => {
    checkTabsScroll();
    const handleResize = () => checkTabsScroll();
    window.addEventListener('resize', handleResize);

    const elem = tabsContainerRef.current;
    if (elem) {
      const observer = new ResizeObserver(checkTabsScroll);
      observer.observe(elem);
      return () => {
        window.removeEventListener('resize', handleResize);
        observer.disconnect();
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [checkTabsScroll, counts]);

  React.useEffect(() => {
    return () => {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
      if (pendingClearTimerRef.current) clearTimeout(pendingClearTimerRef.current);
    };
  }, []);

  const handleRemoveItem = (type: 'comics' | 'news' | 'kios', id: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (pendingRemoveId === id) {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
      setPendingRemoveId(null);
      remove(type, id);
      showToast(`🗑️ Dihapus dari Tersimpan: ${title}`);
    } else {
      if (pendingTimerRef.current) clearTimeout(pendingTimerRef.current);
      setPendingRemoveId(id);
      showToast(`⚠️ Klik 1x lagi pada tombol sampah untuk menghapus`);
      pendingTimerRef.current = setTimeout(() => {
        setPendingRemoveId(null);
      }, 3500);
    }
  };

  const handleClearAll = () => {
    if (pendingClearAll) {
      if (pendingClearTimerRef.current) clearTimeout(pendingClearTimerRef.current);
      setPendingClearAll(false);
      clear();
      showToast('🗑️ Semua item tersimpan berhasil dibersihkan');
    } else {
      if (pendingClearTimerRef.current) clearTimeout(pendingClearTimerRef.current);
      setPendingClearAll(true);
      showToast('⚠️ Klik 1x lagi untuk konfirmasi hapus semua item');
      pendingClearTimerRef.current = setTimeout(() => {
        setPendingClearAll(false);
      }, 3500);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2.5 rounded-xl shadow-xl text-xs font-mono font-bold flex items-center gap-2 border border-neutral-700 dark:border-neutral-200"
          >
            <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Banner */}
      <div className="relative text-center py-5 sm:py-7 md:py-8 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-2xl overflow-hidden shadow-xs dark:shadow-md border border-neutral-200/60 dark:border-neutral-800 px-4 sm:px-6 flex flex-col items-center justify-center space-y-2.5 sm:space-y-3.5 mb-4 sm:mb-6 transition-all duration-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase rounded-full">
          <Bookmark className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500 text-amber-600 dark:text-amber-400" />
          <span>KOLEKSI TERSIMPAN</span>
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-black tracking-tight uppercase leading-tight text-neutral-950 dark:text-white">
          BOOKMARK &amp; FAVORIT
        </h1>

        <p className="text-[11px] sm:text-xs md:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
          Kumpulan katalog buku, komik, berita kurasi, dan item kios yang Anda simpan untuk referensi cepat kapan saja.
        </p>

        {/* Counter Summary Pills */}
        <div className="flex items-center gap-3 sm:gap-6 pt-1 sm:pt-2 font-mono text-xs">
          <div className="flex flex-col items-center">
            <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">{counts.total}</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Total Item</span>
          </div>
          <div className="h-5 sm:h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-col items-center">
            <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">{counts.comics}</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Katalog</span>
          </div>
          <div className="h-5 sm:h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-col items-center">
            <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">{counts.kios}</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Kios</span>
          </div>
          <div className="h-5 sm:h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-col items-center">
            <span className="text-neutral-950 dark:text-white font-extrabold text-base sm:text-lg leading-none">{counts.news}</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">News</span>
          </div>
        </div>
      </div>

      {/* Beta Notice: Local Device Storage */}
      <div className="mb-4 p-3 sm:p-3.5 bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 rounded-xl sm:rounded-2xl flex items-start sm:items-center gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-[11.5px] sm:text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 flex-1">
          <span className="inline-flex items-center gap-1 mr-1.5 align-middle">
            <span className="px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950/60 border border-amber-300/80 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-extrabold uppercase rounded">
              Mode Beta
            </span>
          </span>
          Fitur tersimpan saat ini hanya disimpan di perangkat (device) Anda melalui fitur cookies/penyimpanan browser lokal. Jika Anda berpindah device atau membersihkan data browser, daftar tersimpan akan hilang.
        </div>
      </div>

      {/* Control Bar: Filter Tabs & Search */}
      <div className="bg-white dark:bg-neutral-900 p-3 sm:p-4 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Chips with Left and Right Fade in/out Gradients */}
        <div className="relative flex-1 min-w-0 overflow-hidden">
          {/* Left Fade Gradient */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-white dark:from-neutral-900 via-white/80 dark:via-neutral-900/80 to-transparent z-10 transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Right Fade Gradient */}
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-white dark:from-neutral-900 via-white/80 dark:via-neutral-900/80 to-transparent z-10 transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            ref={tabsContainerRef}
            onScroll={checkTabsScroll}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0 scroll-smooth px-0.5"
          >
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-tight transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Semua ({counts.total})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('comics')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-tight transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeFilter === 'comics'
                  ? 'bg-[#183619] text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Katalog ({counts.comics})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('kios')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-tight transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeFilter === 'kios'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Kios ({counts.kios})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('news')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold tracking-tight transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeFilter === 'news'
                  ? 'bg-[#DA6B1C] text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>News ({counts.news})</span>
            </button>
          </div>
        </div>

        {/* Search Input & Clear All */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari bookmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl pl-9 pr-3 py-2 text-xs font-sans outline-none focus:border-neutral-900 dark:focus:border-white text-neutral-900 dark:text-neutral-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {counts.total > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 border ${
                pendingClearAll
                  ? 'bg-red-600 hover:bg-red-700 text-white border-red-600 animate-pulse shadow-xs'
                  : 'bg-neutral-100 hover:bg-red-50 dark:bg-neutral-800 dark:hover:bg-red-950/30 text-neutral-600 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 border-neutral-200 dark:border-neutral-700'
              }`}
              title={pendingClearAll ? 'Klik 1x lagi untuk konfirmasi hapus semua item' : 'Bersihkan Semua Bookmark'}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {pendingClearAll ? 'Yakin Hapus Semua?' : 'Hapus Semua'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {counts.total === 0 ? (
        /* Empty State Overall */
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Bookmark className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-base sm:text-lg font-sans font-bold text-neutral-900 dark:text-neutral-100">
              Belum Ada Item Tersimpan
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Klik ikon Bookmark 🔖 pada katalog komik, berita, atau item kios untuk menyimpannya ke koleksi pribadi ini.
            </p>
          </div>
          <div className="flex items-center gap-2.5 pt-2 flex-wrap justify-center">
            <button
              type="button"
              onClick={onNavigateToHome}
              className="px-4 py-2 bg-[#183619] hover:bg-[#0b1a0c] text-white text-xs font-mono font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#DA6B1C]" />
              <span>Jelajahi Katalog</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToNews('all')}
              className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Newspaper className="w-3.5 h-3.5 text-[#DA6B1C]" />
              <span>Baca Berita</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToKios()}
              className="px-4 py-2 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#DA6B1C]" />
              <span>Buka Kios</span>
            </button>
          </div>
        </div>
      ) : totalFilteredCount === 0 ? (
        /* Empty State on Search */
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 p-8 text-center flex flex-col items-center justify-center space-y-3">
          <Search className="w-8 h-8 text-neutral-400" />
          <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
            Tidak ada hasil untuk "{searchQuery}"
          </h4>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Coba kata kunci lain atau bersihkan filter pencarian.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="px-3.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-xs font-mono font-bold rounded-lg text-neutral-700 dark:text-neutral-300"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* 1. SEKSI KATALOG POST (KOMIK) */}
          {(activeFilter === 'all' || activeFilter === 'comics') && filteredComics.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#183619]" />
                  <h3 className="text-sm font-mono font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
                    Katalog ({filteredComics.length})
                  </h3>
                </div>
                {activeFilter === 'all' && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter('comics')}
                    className="text-xs font-mono font-semibold text-[#183619] dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
                {filteredComics.map((comic) => (
                  <div
                    key={comic.id}
                    onClick={() => onNavigateToComic(comic.comicId)}
                    className="bg-white dark:bg-neutral-900 rounded-2xl border border-[#183619] ring-2 ring-[#183619] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer relative select-none"
                  >
                    {/* Top Cover Section */}
                    <div className="relative aspect-[3/4] w-full bg-neutral-950 flex flex-col justify-between select-none overflow-hidden isolate">
                      <img
                        src={comic.coverImage}
                        alt={comic.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover transition-transform duration-500 will-change-transform scale-100 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Trash / Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem('comics', comic.id, comic.title, e);
                        }}
                        className={`absolute top-2 right-2 z-20 p-1.5 rounded-lg transition-all cursor-pointer backdrop-blur-xs ${
                          pendingRemoveId === comic.id
                            ? 'bg-red-600 text-white ring-2 ring-red-400 animate-pulse'
                            : 'bg-black/60 hover:bg-red-600 text-white'
                        }`}
                        title={pendingRemoveId === comic.id ? 'Klik 1x lagi untuk konfirmasi hapus' : 'Hapus dari tersimpan (Klik 2x)'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Dark overlay */}
                      <div className="absolute -inset-[1px] bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none transition-opacity duration-300" />

                      {/* Badges Overlay on Cover bottom-left */}
                      <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 pointer-events-none">
                        <span className="bg-white/95 dark:bg-neutral-100 text-neutral-900 font-sans font-bold px-2 py-0.5 rounded-md text-[9px] capitalize shadow-xs leading-none">
                          {getBookTypeLabel(comic.category)}
                        </span>
                        {comic.readingRating && (
                          <span className={`px-2 py-0.5 rounded-md font-sans font-bold text-[9px] shadow-xs leading-none ${getReadingRatingBadgeStyle(comic.readingRating)}`}>
                            {comic.readingRating}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Metadata Section */}
                    <div className="p-3 flex-1 flex flex-col justify-between text-left space-y-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] sm:text-[10.5px] font-sans text-neutral-400 dark:text-neutral-500 leading-tight block truncate">
                          {comic.publisherName}
                        </span>
                        <h4 className="text-xs sm:text-sm font-sans font-bold text-neutral-900 dark:text-white line-clamp-1 leading-snug group-hover:text-[#183619] dark:group-hover:text-emerald-400 transition-colors">
                          {comic.seriesTitle}
                        </h4>
                        {comic.volNumber && (
                          <div className="text-xs font-sans font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                            Vol.{comic.volNumber}
                          </div>
                        )}
                        {comic.author && (
                          <div className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 leading-tight truncate pt-0.5">
                            {comic.author}
                          </div>
                        )}
                        {comic.genres && (
                          <div className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 leading-tight truncate">
                            {comic.genres}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2 flex items-center justify-between font-sans w-full">
                        <span className="font-extrabold text-neutral-950 dark:text-neutral-50 text-xs sm:text-sm leading-none">
                          Rp {comic.price?.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. SEKSI KIOS MERCHANDISE POST */}
          {(activeFilter === 'all' || activeFilter === 'kios') && filteredKios.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
                  <h3 className="text-sm font-mono font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
                    Kios ({filteredKios.length})
                  </h3>
                </div>
                {activeFilter === 'all' && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter('kios')}
                    className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-200 hover:underline flex items-center gap-0.5"
                  >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
                {filteredKios.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onNavigateToKios(item.id)}
                    className="bg-white dark:bg-neutral-900 rounded-2xl border border-[#183619] ring-2 ring-[#183619] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer relative select-none"
                  >
                    {/* Top Cover Section */}
                    <div className="relative aspect-[3/4] w-full bg-neutral-950 flex flex-col justify-between select-none overflow-hidden isolate">
                      <img
                        src={item.coverImage}
                        alt={item.comicTitle}
                        loading="lazy"
                        decoding="async"
                        className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover transition-transform duration-500 will-change-transform scale-100 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Trash / Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem('kios', item.id, item.comicTitle, e);
                        }}
                        className={`absolute top-2 right-2 z-20 p-1.5 rounded-lg transition-all cursor-pointer backdrop-blur-xs ${
                          pendingRemoveId === item.id
                            ? 'bg-red-600 text-white ring-2 ring-red-400 animate-pulse'
                            : 'bg-black/60 hover:bg-red-600 text-white'
                        }`}
                        title={pendingRemoveId === item.id ? 'Klik 1x lagi untuk konfirmasi hapus' : 'Hapus dari tersimpan (Klik 2x)'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Dark overlay */}
                      <div className="absolute -inset-[1px] bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none transition-opacity duration-300" />

                      {/* Badges Overlay on Cover bottom-left */}
                      <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 pointer-events-none">
                        <span className="bg-white/95 dark:bg-neutral-100 text-neutral-900 font-sans font-bold px-2 py-0.5 rounded-md text-[9px] capitalize shadow-xs leading-none">
                          {getBookTypeLabel(item.category)}
                        </span>
                        {item.readingRating && (
                          <span className={`px-2 py-0.5 rounded-md font-sans font-bold text-[9px] shadow-xs leading-none ${getReadingRatingBadgeStyle(item.readingRating)}`}>
                            {item.readingRating}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Metadata Section */}
                    <div className="p-3 flex-1 flex flex-col justify-between text-left space-y-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] sm:text-[10.5px] font-sans text-neutral-400 dark:text-neutral-500 leading-tight block truncate">
                          {item.publisherName}
                        </span>
                        <h4 className="text-xs sm:text-sm font-sans font-bold text-neutral-900 dark:text-white line-clamp-1 leading-snug group-hover:text-[#183619] dark:group-hover:text-emerald-400 transition-colors">
                          {item.comicTitle}
                        </h4>
                        {item.volumeNumber && (
                          <div className="text-xs font-sans font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                            Vol.{item.volumeNumber}
                          </div>
                        )}
                        {item.author && (
                          <div className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 leading-tight truncate pt-0.5">
                            {item.author}
                          </div>
                        )}
                        {item.genres && (
                          <div className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 leading-tight truncate">
                            {item.genres}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2 flex items-center justify-between font-sans w-full">
                        <span className="font-extrabold text-neutral-950 dark:text-neutral-50 text-xs sm:text-sm leading-none">
                          Rp {item.salePrice?.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SEKSI BERITA & REVIEW POST (Style matching Gambar 2) */}
          {(activeFilter === 'all' || activeFilter === 'news') && filteredNews.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DA6B1C]" />
                  <h3 className="text-sm font-mono font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
                    News ({filteredNews.length})
                  </h3>
                </div>
                {activeFilter === 'all' && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter('news')}
                    className="text-xs font-mono font-semibold text-[#DA6B1C] hover:underline flex items-center gap-0.5"
                  >
                    <span>Lihat Semua</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {filteredNews.map((news) => {
                  const { icon: CatIcon, label: catLabel } = getNewsCategoryInfo(news.category);
                  return (
                    <article
                      key={news.id}
                      onClick={() => onNavigateToNews(news.id)}
                      className="bg-white hover:bg-[#FAFAFA] dark:bg-neutral-900 dark:hover:bg-[#1C1C1C] rounded-2xl border border-[#183619] ring-2 ring-[#183619] p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer relative space-y-3 text-left"
                    >
                      <div className="space-y-2">
                        {/* Top Header: Avatar + Author + Actions */}
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0 text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400">
                            <div className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-sans font-black text-[10px] shadow-xs select-none shrink-0">
                              N
                            </div>
                            <span className="font-sans font-bold text-neutral-900 dark:text-neutral-100 tracking-tight truncate text-[11px] sm:text-xs">
                              {news.displayName || 'Norinoya'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveItem('news', news.id, news.title || 'Berita', e);
                              }}
                              className={`p-1 rounded-lg transition-all cursor-pointer ${
                                pendingRemoveId === news.id
                                  ? 'bg-red-600 text-white ring-2 ring-red-400 animate-pulse'
                                  : 'text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40'
                              }`}
                              title={pendingRemoveId === news.id ? 'Klik 1x lagi untuk konfirmasi hapus' : 'Hapus dari tersimpan (Klik 2x)'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (navigator.share) {
                                  navigator.share({ title: news.title, url: window.location.href }).catch(() => {});
                                } else if (navigator.clipboard) {
                                  navigator.clipboard.writeText(window.location.href);
                                  showToast('🔗 Tautan berita disalin ke clipboard');
                                }
                              }}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-all cursor-pointer active:scale-95 border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs group/share"
                              title="Bagikan berita"
                            >
                              <Send className="w-3 h-3 group-hover/share:translate-x-0.5 group-hover/share:-translate-y-0.5 transition-transform stroke-[2]" />
                            </button>
                          </div>
                        </div>

                        {/* Timestamp */}
                        <div className="flex items-center gap-1 text-neutral-400 dark:text-neutral-500 font-mono text-[10px] sm:text-[11px]">
                          <Clock className="w-2.5 h-2.5 text-neutral-400 shrink-0" />
                          <span>{formatNewsPublishDateTime(news)}</span>
                        </div>

                        {/* Category Badge Pill */}
                        <div className="flex items-center pt-0.5">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-bold border border-neutral-200/60 dark:border-neutral-700/60">
                            <CatIcon className="w-3 h-3 text-neutral-700 dark:text-neutral-300 shrink-0" />
                            <span>{catLabel}</span>
                          </span>
                        </div>

                        {/* Title Headline */}
                        <h4 className="text-xs sm:text-sm font-extrabold leading-snug tracking-tight text-neutral-900 dark:text-white group-hover:text-[#DA6B1C] transition-colors line-clamp-2">
                          {news.title || news.content}
                        </h4>
                      </div>

                      {/* Attached Image / Multi-image Grid Gallery */}
                      {renderNewsGallery(news)}
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

type RawNewsDbItem = RawNewsItem & {
  username?: string;
  display_name?: string;
  category?: string;
  hash_tags?: string[];
  reading_rating?: string;
  is_pinned?: boolean;
};

interface BookmarkPageProps {
  books?: BookModel[];
  newsList?: RawNewsDbItem[];
  kiosItems?: RawKiosItem[];
}

export default function BookmarkPage({
  books = [],
  newsList = [],
  kiosItems = [],
}: BookmarkPageProps) {
  const comicsData: Comic[] = React.useMemo(() => {
    if (books && books.length > 0) {
      return mapBooksToComics(books);
    }
    return COMICS_DATA;
  }, [books]);

  const newsData: BookmarkNewsItem[] = React.useMemo(() => {
    return newsList.map((dbItem) => ({
      id: String(dbItem.id),
      username: dbItem.username || 'norinoya_official',
      displayName: dbItem.display_name || 'Norinoya Official',
      timestamp: dbItem.created_at
        ? new Date(dbItem.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
        : 'Baru saja',
      title: dbItem.title,
      slug: dbItem.slug,
      content: dbItem.content || '',
      category: (dbItem.category || 'rilisan') as NewsUpdate['category'],
      hashTags: dbItem.hash_tags || [],
      attachedImage: dbItem.attached_image,
      galleryImages: dbItem.gallery_images || (dbItem.attached_image ? [dbItem.attached_image] : undefined),
      readingRating: (dbItem.reading_rating as NewsUpdate['readingRating']) || 'Dewasa Ringan',
      isPinned: !!dbItem.is_pinned,
      publishDate: dbItem.created_at,
    }));
  }, [newsList]);

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

  const handleNavKios = () => {
    router.visit('/kios');
  };

  const handleNavBookmark = () => {
    router.visit('/bookmark');
  };

  const handleNavAbout = () => {
    router.visit('/?scroll=about');
  };

  const handleNavigateToComic = (comicId: string) => {
    router.visit(`/buku/${comicId}`);
  };

  const handleNavigateToNews = (newsId: string) => {
    const target = newsData.find(n => n.id === newsId);
    router.visit(target?.slug ? `/news/${target.slug}` : '/news');
  };

  const handleNavigateToKios = (kiosId?: string) => {
    const target = kiosId ? kiosItems.find(k => String(k.id) === kiosId) : null;
    router.visit(target?.slug ? `/kios/${target.slug}` : '/kios');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans flex flex-col transition-colors duration-200">
      <Head>
        <title>Bookmark &amp; Favorit - Norinoya</title>
        <meta name="description" content="Kumpulan katalog buku, komik, berita, dan item kios yang Anda simpan di Norinoya." />
        <meta property="og:title" content="Bookmark &amp; Favorit - Norinoya" />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar
        activeTab="bookmark"
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigateHome={handleNavHome}
        onNavigateNews={handleNavNews}
        onNavigateKios={handleNavKios}
        onNavigateBookmark={handleNavBookmark}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 pb-20 md:pb-6 bg-transparent">
        <SavedBookmarks
          comics={comicsData}
          news={newsData}
          kiosItems={kiosItems}
          onNavigateToComic={handleNavigateToComic}
          onNavigateToNews={handleNavigateToNews}
          onNavigateToKios={handleNavigateToKios}
          onNavigateToHome={handleNavHome}
        />
      </main>

      <Footer onNavigateHome={handleNavHome} onNavigateAbout={handleNavAbout} darkMode={darkMode}/>

      {/* Floating Back to Top Button */}
      <BackToTopButton />

    </div>
  );
}

