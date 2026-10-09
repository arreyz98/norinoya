import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Head } from '@inertiajs/react';
import { ShareModal } from './ShareModal';
import { HighlightReview } from './HighlightReview';
import { ModalAffiliateStore } from './ModalAffiliateStore';
import {
  BookOpen, ArrowUpRight, ArrowLeft, Send, Store, ShieldAlert, Info, ShoppingBag, Bookmark
} from 'lucide-react';
import { useBookmarks } from '../../../utils/bookmarkStorage';
import { BookmarkToast, useBookmarkToast } from './BookmarkToast';
import { COMICS_DATA, NEWS_UPDATES } from '../../../types/mockData';
import { Comic, Volume} from '../../../types/demo';
import { RawNewsItem } from '../news';
import type { RawKiosItem } from './EtalaseCatalog';
import { getBookTypeLabel } from '../../../utils/mapBookToComic';
interface DetailBukuProps {
  selectedComic: Comic;
  activeVolumeNum: number | string;
  setActiveVolumeNum: (volNum: number | string) => void;
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
  const { isSaved, toggle } = useBookmarks();
  const { message: bookmarkToast, show: showBookmarkToast } = useBookmarkToast();
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [unlockedComics, setUnlockedComics] = useState<Record<string, boolean>>({});
  const [kiosCandidates, setKiosCandidates] = useState<RawKiosItem[]>([]);

  // Cache kios results per book title so reopening the same book does not refetch.
  const kiosTitleCacheRef = useRef<Map<string, RawKiosItem[]>>(new Map());

  // Share Modal state
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    title: string;
    shareUrl: string;
    category: string;
  }>({ isOpen: false, title: '', shareUrl: '', category: 'Katalog' });

   // Bila satu brand punya lebih dari satu link affiliate, tombolnya membuka modal pilihan
    const [selectedStoreGroup, setSelectedStoreGroup] = useState<{
      storeName: string;
      brand: string;
      brandSlug: string;
      links: { id: string; url: string; storeName: string; storeSlug: string; brand: string; brandSlug: string; location?: string }[];
    } | null>(null);

    const openStoreGroupModal = (storeName: string, brand: string, brandSlug: string, links: { id: string; url: string; storeName: string; storeSlug: string; brand: string; brandSlug: string; location?: string }[]) => {
      setSelectedStoreGroup({ storeName, brand, brandSlug, links });
    };

  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveSlideIndex(0);
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = 0;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedComic?.id, activeVolumeNum]);

  // Urutan volume sudah ditentukan admin lewat kolom sort_order (lihat mapBooksToComic),
  // jadi di sini cukup dipakai apa adanya tanpa pengurutan ulang.
  const orderedVolumes = selectedComic ? selectedComic.volumes : [];

  const activeVolObj = selectedComic
    ? (orderedVolumes.find(v => String(v.volNumber) === String(activeVolumeNum)) || orderedVolumes[0])
    : null;

  // Increment view counter on backend when viewing detail buku (deduped 1 min on server)
  useEffect(() => {
    const targetBookId = activeVolObj?.bookId || activeVolObj?.id || selectedComic?.bookId || selectedComic?.id;
    if (!targetBookId) return;

    const isDirectBookPath = typeof window !== 'undefined' && window.location.pathname.startsWith('/buku/');
    // Jika user membuka via deep-link langsung /buku/{slug}, SSR sudah menghitung view yang sama (window 1 menit).
    // Hindari double-count: skip POST saat masih dalam jeda dedupe kecuali ganti volume.
    const dedupeKey = `norinoya-book-view:${String(targetBookId)}:${String(activeVolumeNum)}`;
    const lastTs = Number(sessionStorage.getItem(dedupeKey) || 0);
    const nowTs = Date.now();
    if (isDirectBookPath && nowTs - lastTs < 60_000) return;
    sessionStorage.setItem(dedupeKey, String(nowTs));

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
      .catch(() => {
        // Silently catch network errors
      });
  }, [selectedComic?.id, selectedComic?.bookId, selectedComic?.slug, activeVolObj?.id, activeVolObj?.bookId, activeVolumeNum]);

  const activeVolumeCover = selectedComic
    ? (activeVolObj?.coverImage || selectedComic.coverImage)
    : undefined;

  // Fetch kios posts by book title once per title, then reuse from cache.
  // Stale responses are dropped when the open book changes mid-request.
  const kiosLookupKey = selectedComic ? (selectedComic.title || '').trim().toLowerCase() : null;

  useEffect(() => {
    if (!kiosLookupKey) {
      setKiosCandidates([]);
      return;
    }

    const cached = kiosTitleCacheRef.current.get(kiosLookupKey);
    if (cached) {
      setKiosCandidates(cached);
      return;
    }

    const controller = new AbortController();

    fetch(`/kios/relevant-by-title?title=${encodeURIComponent(kiosLookupKey)}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(res => res.json())
      .then(data => {
        const items: RawKiosItem[] = Array.isArray(data?.items) ? data.items : [];
        kiosTitleCacheRef.current.set(kiosLookupKey, items);
        setKiosCandidates(items);
      })
      .catch(() => {
        if (!controller.signal.aborted) setKiosCandidates([]);
      });

    return () => controller.abort();
  }, [kiosLookupKey]);

  const carouselImages = selectedComic
    ? (activeVolObj?.images && activeVolObj.images.length > 0
        ? activeVolObj.images
        : (activeVolumeCover ? [activeVolumeCover] : [])
      )
    : [];

  // Kios posts relevant to the currently opened book, decided by TITLE only and kept loose:
  // 1. the whole book title appearing in the item title is the strongest signal,
  // 2. every title word matching is next,
  // 3. a single matching title word still qualifies,
  // and when nothing matches the title at all, the newest kios posts are shown instead —
  // so the widget is only hidden when the kios has no posts at all.
  const relevantKiosItems = React.useMemo<RawKiosItem[]>(() => {
    if (!selectedComic) return [];
    if (kiosCandidates.length === 0) return [];

    const seriesTitle = (selectedComic.title || '').toLowerCase().trim();
    const titleWords = seriesTitle.split(/[\s:–-]+/).filter(w => w.length > 2);

    const scored = kiosCandidates.map((item) => {
      let score = 0;
      const itemText = `${item.comic_title || ''} ${item.title || ''}`.toLowerCase();

      if (seriesTitle && itemText.includes(seriesTitle)) {
        // Judul buku muncul utuh di judul postingan kios
        score += 100;
      } else if (titleWords.length > 0) {
        const matchedWords = titleWords.filter(w => itemText.includes(w));
        if (matchedWords.length === titleWords.length) {
          // Seluruh kata judul ikut muncul
          score += 50;
        } else if (matchedWords.length > 0) {
          // Sebagian kata judul cocok sudah dianggap relevan
          score += 20;
        }
      }

      // Prioritas kecil untuk postingan dengan volume yang sedang dibuka
      if (item.vol_number && item.vol_number === activeVolumeNum) score += 10;

      return { item, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const matched = scored.filter(s => s.score > 0).map(s => s.item);
    if (matched.length > 0) {
      return matched.slice(0, 4);
    }

    // Tidak ada judul yang cocok: tetap tampilkan postingan kios terbaru
    return kiosCandidates.slice(0, 4);
  }, [selectedComic, activeVolumeNum, kiosCandidates]);

  const getAffiliateStoreStyle = (brand: string) => {
    const name = (brand || '').toLowerCase();

    if (name.includes('gramedia')) {
      return {
        className: 'bg-[#00519E] hover:bg-[#004080] text-white',
        label: 'Gramedia',
        brand: 'gramedia'
      };
    }
    if (name.includes('shopee')) {
      return {
        className: 'bg-[#EE4D2D] hover:bg-[#D73C1E] text-white',
        label: 'Shopee',
        brand: 'shopee'
      };
    }
    if (name.includes('tokopedia')) {
      return {
        className: 'bg-[#03AC0E] hover:bg-[#028F0B] text-white',
        label: 'Tokopedia',
        brand: 'tokopedia'
      };
    }
    if (name.includes('blibli')) {
      return {
        className: 'bg-[#0095DA] hover:bg-[#007BB5] text-white',
        label: 'Blibli',
        brand: 'blibli'
      };
    }
    if (name.includes('lazada')) {
      return {
        className: 'bg-[#0F146D] hover:bg-[#0A0E52] text-white',
        label: 'Lazada',
        brand: 'lazada'
      };
    }
    if (name.includes('amazon')) {
      return {
        className: 'bg-[#FF9900] hover:bg-[#E68A00] text-black font-extrabold',
        label: 'Amazon',
        brand: 'amazon'
      };
    }

    return {
      className: 'bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white',
      label: 'Toko Resmi',
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

  const metaTitle = `${selectedComic.title}${activeVolObj ? ` Vol. ${activeVolObj.volNumber}` : ''} - Norinoya`;
  const metaDesc = (activeVolObj?.synopsis || selectedComic.synopsis || 'Lihat detail buku di Norinoya').replace(/<[^>]*>/g, '').slice(0, 160);
  const metaImage = activeVolObj?.coverImage || selectedComic.coverImage || '';
  const canonicalUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/buku/${selectedComic.slug || selectedComic.id}`
    : `/buku/${selectedComic.slug || selectedComic.id}`;

   return (
    <div className="w-full bg-white flex flex-col min-h-screen" ref={scrollableContainerRef}>
      {selectedComic ? (
        <Head>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDesc} />
          <meta property="og:site_name" content="Norinoya" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDesc} />
          <meta property="og:type" content="book" />
          {metaImage && <meta property="og:image" content={metaImage} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metaTitle} />
          <meta name="twitter:description" content={metaDesc} />
          {metaImage && <meta name="twitter:image" content={metaImage} />}
          <meta name="theme-color" content="#E53935" />
          <link rel="canonical" href={canonicalUrl} />
              <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Book',
              name: activeVolObj?.title || selectedComic.title,
              alternateName: selectedComic.title,
              url: canonicalUrl,
              ...(metaImage ? { image: metaImage } : {}),
              ...(activeVolObj?.isbn ? { isbn: activeVolObj.isbn } : {}),
              ...(selectedComic.publisherName ? { publisher: { '@type': 'Organization', name: selectedComic.publisherName } } : {}),
              ...(activeVolObj?.authorStory ? { author: { '@type': 'Person', name: activeVolObj.authorStory } } : {}),
              ...(activeVolObj?.volNumber != null ? { bookEdition: `Volume ${activeVolObj.volNumber}` } : {}),
              ...(selectedComic.genres?.length ? { genre: selectedComic.genres.join(', ') } : {}),
              ...(activeVolObj?.synopsis ? { description: activeVolObj.synopsis.replace(/<[^>]*>/g, '').trim() } : {}),
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Beranda', item: typeof window !== 'undefined' ? `${window.location.origin}/` : '/' },
                { '@type': 'ListItem', position: 2, name: 'Katalog Buku', item: typeof window !== 'undefined' ? `${window.location.origin}/` : '/' },
                { '@type': 'ListItem', position: 3, name: (activeVolObj?.title || selectedComic.title), item: canonicalUrl },
              ],
            })}
          </script>
        </Head>
      ) : (
        <Head>
          <title>Norinoya - Database Manga, Komik, & Light Novel Indonesia</title>
          <meta name="description" content="Norinoya - Database Manga, Komik, & Light Novel Indonesia" />
        </Head>
      )}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full bg-white text-neutral-950 dark:text-neutral-50 flex flex-col transition-colors duration-200 relative"
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
                        <button
                          onClick={() => {
                            if (!selectedComic) return;
                            const bookmarkId = `${selectedComic.id}-vol-${activeVolumeNum}`;
                            const volTitle = activeVolObj?.title || selectedComic.title;
                            const saved = toggle('comics', bookmarkId);
                            showBookmarkToast(
                              saved
                                ? `"${volTitle}" (Volume ${activeVolumeNum}) berhasil di-bookmark`
                                : `"${volTitle}" (Volume ${activeVolumeNum}) telah dihapus dari bookmark`
                            );
                          }}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-all active:scale-95 border outline-none shrink-0 ${
                            selectedComic && isSaved('comics', `${selectedComic.id}-vol-${activeVolumeNum}`)
                              ? 'bg-[#DA6B1C] text-white hover:bg-[#e54747]'
                              : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-neutral-200/50 dark:border-neutral-700'
                          }`}
                          title="Simpan ke Bookmark"
                        >
                          <Bookmark className={`w-4 h-4 ${
                            selectedComic && isSaved('comics', `${selectedComic.id}-vol-${activeVolumeNum}`)
                              ? 'fill-current'
                              : 'text-neutral-600 dark:text-neutral-300'
                          }`} />
                        </button>
                        <button
                          onClick={() => {
                            if (selectedComic) {
                              const bookSlug = selectedComic.slug || selectedComic.id;
                              const shareUrl = `${window.location.origin}/buku/${bookSlug}?vol=${activeVolumeNum}`;
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

            <div className="w-full h-fit lg:max-w-[92%] xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-24 pt-16 sm:pt-20 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28 dark:bg-[#202120] ">
              {/* Title Header with Gradient */}
              <div id="comic-detail-card" className=" dark:bg-[#0F0F0F] p-3 sm:p-5 md:p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col md:flex-row gap-4 md:gap-6 items-start relative overflow-hidden shadow-xs">

              {/* Left Column: Interactive Slide Carousel Portfolio Component */}
              <div className="flex flex-col gap-3 shrink-0 w-full md:w-80">
                <div className="relative aspect-[3/4] w-full max-w-[260px] mx-auto md:max-w-none rounded-2xl overflow-hidden bg-neutral-950 flex flex-col justify-between p-3 border border-neutral-150 dark:border-neutral-800 shadow-md group">

                {/* Active Slide Image */}
                {carouselImages && carouselImages.length > 0 ? (
                  <img
                    src={carouselImages[activeSlideIndex]}
                    alt={`${selectedComic.title} - Jilid ${activeVolumeNum} - Slide ${activeSlideIndex + 1}`}
                    referrerPolicy="no-referrer"
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl cursor-zoom-in group-hover:scale-[1.02] transition-transform duration-300 "
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-450 rounded-2xl">
                    <BookOpen className="w-14 h-14 stroke-[1.2]" />
                  </div>
                )}

             
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
                      <img src={img} alt={`thumbnail ${idx}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" className="w-full h-full object-cover rounded-md" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Combined Information Panel */}
            <div className="space-y-4 flex-1 pt-1 text-left w-full">

              {/* Primary Comic and Volume title */}
              <div className="flex items-center flex-wrap gap-2.5">
                <h1 className="text-xl md:text-2xl font-sans font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-snug">
                  {activeVolObj?.title  || selectedComic.title}{selectedComic.volumes.length > 1 && ` (Volume ${activeVolumeNum})`}
                </h1>
              </div>

              {/* Curator explanation text changed to volume-specific synopsis */}
              <p className="text-xs sm:text-sm text-neutral-705 dark:text-neutral-300 leading-relaxed font-sans whitespace-pre-line select-text">
                {activeVolObj?.synopsis || selectedComic.synopsis}
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
                    {getBookTypeLabel(selectedComic.category)}
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
                  <div className="flex flex-wrap gap-x-4 gap-y-1  ml-2">
                    <p>
                      Author Story: <span className="text-neutral-900 dark:text-white font-extrabold">{activeVolObj?.authorStory || selectedComic.authorStory || 'N/A'}</span>
                    </p>
                    {(activeVolObj?.authorArt || selectedComic.authorArt) && ((activeVolObj?.authorArt || selectedComic.authorArt || '').toLowerCase() !== 'tidak diketahui') && (
                    <p>
                      Author Art: <span className="text-neutral-900 dark:text-white font-extrabold">{activeVolObj?.authorArt || selectedComic.authorArt}</span>
                    </p>
                    )}
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

                  const isInternalNews = targetNewsUrl.startsWith('/news');

                  // Find matched news title from newsList or NEWS_UPDATES.
                  // Bekerja untuk path relatif ("/news/slug"), URL penuh ("https://domain/news/slug?utm=..."),
                  // link berbasis id ("/news/123"), maupun query ("?slug=..." atau "?id=...").
                  let matchedTitle = '';
                  const cleanPath = targetNewsUrl.split(/[?#]/)[0];
                  const rawLastSegment = cleanPath.split('/').filter(Boolean).pop() || '';
                  const lastSegment = rawLastSegment === 'news' ? '' : decodeURIComponent(rawLastSegment).trim();
                  const queryKeyMatch = targetNewsUrl.match(/[?&](?:slug|news|news_id|post|post_id|id)=([^&#]+)/i);
                  const queryKey = queryKeyMatch ? decodeURIComponent(queryKeyMatch[1]).trim() : '';
                  const lookupKeys = Array.from(new Set([lastSegment, queryKey].filter(Boolean)));
                  const urlLower = targetNewsUrl.toLowerCase();

                  const matchNewsTitle = (n: { id: string | number; title?: string; slug?: string }): string => {
                    if (lookupKeys.some(k => (n.slug ? k === n.slug : false) || k === String(n.id))) return n.title || '';
                    if (n.slug && n.slug.length > 3 && urlLower.includes(`/${n.slug.toLowerCase()}`)) return n.title || '';
                    return '';
                  };

                  for (const n of newsList) {
                    matchedTitle = matchNewsTitle(n);
                    if (matchedTitle) break;
                  }

                  if (!matchedTitle) {
                    for (const n of NEWS_UPDATES) {
                      matchedTitle = matchNewsTitle(n);
                      if (matchedTitle) break;
                    }
                  }

                  // Link internal yang tidak ada di daftar berita: pakai slug yang di-humanize agar tetap judul berita.
                  const humanizedSlug = isInternalNews && lastSegment && !/^\d+$/.test(lastSegment)
                    ? lastSegment.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                    : '';

                  const displayTitle = matchedTitle || humanizedSlug || `Berita & Informasi Terkait: ${activeVolObj?.title || selectedComic.title}`;

                  return (
                    <div className="space-y-3">
                   

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
                  {orderedVolumes.map((v, idx) => {
                    // Volume boleh berupa angka ("1", "16.5") atau teks ("Limited Edition"),
                    // jadi labelnya dipakai apa adanya tanpa konversi yang bisa menghasilkan NaN.
                    const volLabel = String(v.volNumber ?? '').trim();
                    const isNumericVolume = volLabel !== '' && Number.isFinite(Number(volLabel));
                    const isActive = String(activeVolumeNum).trim() === volLabel;
                    // Keterangan jilid: judul volume dari database, jika kosong pakai tanggal rilis.
                    const volDetail = (v.title || '').trim() || v.releaseDate || '';
                    const volText = isNumericVolume ? `Volume ${volLabel}` : volLabel;
                    return (
                      <button
                        key={v.id ?? `${volLabel || idx}-${idx}`}
                        type="button"
                        onClick={() => setActiveVolumeNum(v.volNumber)}
                        title={volDetail ? `${volText} - ${volDetail}` : volText}
                        className={`min-w-10 w-auto h-10 flex flex-col items-start gap-0.5 max-w-[190px] px-2.5 py-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 active:bg-neutral-50'
                        }`}
                      >
                        <span className="m-auto text-xs font-bold leading-tight">{volLabel}</span>
                        
                      </button>
                    );
                  })}
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
                                   activeVolObj.affiliateLinks?.gramedia && { id: 'g', url: activeVolObj.affiliateLinks.gramedia, storeName: 'Official Store', storeSlug: 'gramedia', brand: 'Gramedia', brandSlug: 'gramedia' },
                                   activeVolObj.affiliateLinks?.shopee && { id: 's', url: activeVolObj.affiliateLinks.shopee, storeName: 'Official Store', storeSlug: 'shopee', brand: 'Shopee', brandSlug: 'shopee' },
                                   activeVolObj.affiliateLinks?.tokopedia && { id: 't', url: activeVolObj.affiliateLinks.tokopedia, storeName: 'Official Store', storeSlug: 'tokopedia', brand: 'Tokopedia', brandSlug: 'tokopedia' }
                                 ].filter(Boolean) as { id: string; url: string; storeName: string; storeSlug: string; brand: string; brandSlug: string }[];

                            if (!dynamicLinks || dynamicLinks.length === 0) return null;

                            return (
                              <div className="space-y-3">
                                <h6 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 leading-normal">
                                  <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                                  Link affiliate toko resmi (Dukungan bagi kreator)
                                </h6>
                                <div className="space-y-1.5">
                                  {(() => {
                                    // Kelompokkan link berdasarkan brand toko yang sama.
                                    // Toko tanpa brand yang dikenali (custom) dikelompokkan per nama toko,
                                    // supaya dua toko berbeda tidak ikut tergabung.
                                     const grouped = new Map<string, { id: string; url: string; storeName: string; storeSlug: string; brand: string; brandSlug: string; location?: string }[]>();
                                      dynamicLinks.forEach((link) => {
                                        const storeStyle = getAffiliateStoreStyle(link.brand || link.storeName);
                                        const brandKey = storeStyle.brand === 'custom'
                                          ? `custom:${(link.brand || link.storeName || '').toLowerCase()}`
                                          : storeStyle.brand;
                                        const bucket = grouped.get(brandKey);
                                        if (bucket) {
                                          bucket.push(link);
                                        } else {
                                          grouped.set(brandKey, [link]);
                                        }
                                      });
                                     return Array.from(grouped.values());
                                    })().map((group) => {
                                      const link = group[0];
                                      const style = getAffiliateStoreStyle(link.brand || link.storeName);
                                      const hasMultiple = group.length > 1;
                                      const storeName = link.storeName;
                                      const brandName = link.brand || link.storeName;
                                      return (
                                        <a
                                          key={link.id || link.storeName}
                                          href={hasMultiple ? undefined : link.url}
                                          role={hasMultiple ? 'button' : undefined}
                                          target={hasMultiple ? undefined : '_blank'}
                                          rel={hasMultiple ? undefined : 'no-referrer'}
                                          onClick={hasMultiple ? (e) => {
                                            e.preventDefault();
                                            openStoreGroupModal(storeName, link.brand || link.storeName, link.brandSlug || link.storeSlug, group);
                                          } : undefined}
                                          className={`w-full h-8.5 rounded-xl flex items-center justify-center transition-all shadow-3xs px-3 gap-2 ${style.className} ${hasMultiple ? 'cursor-pointer' : ''}`}
                                          title={hasMultiple ? `Pilih dari ${group.length} link ${brandName}` : `Beli di ${brandName} Resmi`}
                                       >
                                        <span className="font-sans text-sm font-extrabold uppercase tracking-wider">
                                          {style.brand === 'custom' ? link.storeName : style.label}
                                        </span>

                                        {hasMultiple && (
                                          <span className="text-sm font-mono font-black px-1.5 py-0.5 rounded-md bg-white/25 border border-white/30 shrink-0 leading-none">
                                            {group.length} Link
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
                            loading="lazy"
                            decoding="async"
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
                              {relComic.category ? getBookTypeLabel(relComic.category) : 'Buku'}
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

              {/* KIOS PENJUALAN Widget (hidden while no relevant kios post exists) */}
              {relevantKiosItems.length > 0 && (
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
                    <span className="text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-0.5 rounded-md">
                      {relevantKiosItems.length} Post
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {relevantKiosItems.map((item) => {
                      const itemCover = item.cover_image || item.carousel_images?.[0]
                        || null;
                      const itemTitle = item.comic_title || item.title || 'Produk Kios';
                      const itemNotes = item.deskripsi_produk || item.notes || item.synopsis || '';
                      const itemPrice = Number(item.price) || 0;
                      const itemOriginalPrice = Number(item.original_price) || 0;
                      const productUrl = `/kios/${item.slug || item.id}`;

                      return (
                        <div
                          key={String(item.id)}
                          onClick={() => {
                            window.location.href = productUrl;
                          }}
                          className="p-3 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/80 hover:border-emerald-400 dark:hover:border-emerald-600 rounded-xl space-y-2.5 cursor-pointer transition-all hover:shadow-xs group/kios"
                        >
                           <div className="flex gap-3 items-start">
                             <div className="relative shrink-0 w-14 aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                               {itemCover ? (
                                 <img
                                   src={itemCover}
                                   alt={itemTitle}
                                   loading="lazy"
                                   decoding="async"
                                   referrerPolicy="no-referrer"
                                   className="w-full h-full object-cover group-hover/kios:scale-105 transition-transform"
                                 />
                               ) : (
                                 <span className="text-neutral-500 dark:text-neutral-400 text-xs font-mono">No Image</span>
                               )}
                             </div>
                            <div className="flex-1 min-w-0 text-left space-y-0.5">
                              <div className="flex items-center justify-between gap-1">
                                <h6 className="text-xs font-sans font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover/kios:text-emerald-600 dark:group-hover/kios:text-emerald-400 transition-colors">
                                  {itemTitle}{item.vol_number ? ` Vol ${item.vol_number}` : ''}
                                </h6>
                                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/kios:text-emerald-600 dark:group-hover/kios:text-emerald-400 transition-colors shrink-0" />
                              </div>
                              {itemNotes && (
                                <p className="text-[10px] font-sans text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-snug">
                                  {itemNotes}
                                </p>
                              )}
                              <div className="flex items-baseline gap-2 pt-1">
                                <span className="text-xs font-sans font-black text-emerald-600 dark:text-emerald-400">
                                  Rp {itemPrice.toLocaleString('id-ID')}
                                </span>
                                {itemOriginalPrice > itemPrice && (
                                  <span className="text-[10px] text-neutral-400 line-through">
                                    Rp {itemOriginalPrice.toLocaleString('id-ID')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Ads placeholder inside modal */}
              <div className="bg-neutral-50 dark:bg-[#202120] border border-dashed border-neutral-250 dark:border-neutral-700 rounded-2xl p-4 text-center space-y-1.5 transition-colors">
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
                  {selectedComic.title} {selectedComic.volumes.length > 1 && `(Vol. ${activeVolumeNum})`}
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
              <span className="text-xs text-neutral-400 uppercase tracking-widest">
                Foto {activeSlideIndex + 1} / {carouselImages.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal pilihan link affiliate saat satu brand punya beberapa link */}
      <ModalAffiliateStore
        isOpen={!!selectedStoreGroup}
        onClose={() => setSelectedStoreGroup(null)}
        group={selectedStoreGroup ? {
          storeName: selectedStoreGroup.storeName,
          storeSlug: selectedStoreGroup.brandSlug || selectedStoreGroup.storeName.toLowerCase().replace(/\s+/g, '-'),
          brand: selectedStoreGroup.brand,
          brandSlug: selectedStoreGroup.brandSlug,
          links: selectedStoreGroup.links,
        } : null}
        comicTitle={selectedComic.title}
        volNumber={activeVolumeNum}
        price={activeVolObj?.price || 45000}
      />

      {/* Bookmark Notification Toast */}
      <BookmarkToast message={bookmarkToast} />

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
