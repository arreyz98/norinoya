import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DetailBuku from './DetailBuku';

import { 
  Search, BookOpen, Filter,  Check, X,
  Tv, Video, AlertCircle, ChevronRight, ChevronLeft, ChevronDown, ShieldAlert, ArrowUpDown, 
  Sparkles, Clock, Flame, TrendingDown, TrendingUp, ArrowDownAZ, ArrowUpAZ, Layers, Building2, Tag, Activity, Shield, BookText} from 'lucide-react';
import { COMICS_DATA } from '../../../types/mockData';
import { Comic, Volume } from '../../../types/demo';
import { RawNewsItem } from '../news';

interface CustomSelectProps {
  label: string;
  value: string[];
  options: { value: string; label: string; icon?: React.ElementType }[];
  onChange: (value: string[]) => void;
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

function CustomSelect({ label, value, options, onChange, isOpen, onToggle }: CustomSelectProps) {
  const selectedOptions = options.filter(opt => value.includes(opt.value) && opt.value !== 'all');
  const displayText = selectedOptions.length === 0 
    ? (options.find(opt => opt.value === 'all')?.label || 'Semua')
    : selectedOptions.length === 1
      ? selectedOptions[0].label
      : `${selectedOptions[0].label} (+${selectedOptions.length - 1})`;

  const activeSingleOption = selectedOptions.length === 1 ? selectedOptions[0] : null;
  const ActiveIcon = activeSingleOption?.icon || (options.find(opt => opt.value === 'all')?.icon);

  return (
    <div className="flex flex-col gap-1 select-none w-full" onClick={(e) => e.stopPropagation()}>
      <span className="text-xs font-sans font-bold tracking-wide text-neutral-400 dark:text-neutral-500 pl-0.5 mb-0.5">
        {label}
      </span>
      <div className="relative w-full">
        <button
          type="button"
          onClick={onToggle}
          title={displayText}
          className="flex items-center justify-between w-full h-9 px-3.5 bg-neutral-50/55 dark:bg-[#121212] border border-neutral-200/70 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-[#262626] hover:border-neutral-300 dark:hover:border-neutral-700 rounded-lg text-xs md:text-sm text-neutral-850 dark:text-neutral-100 transition-all font-sans font-medium text-left outline-none cursor-pointer"
        >
          <div className="flex items-center gap-2 truncate min-w-0 flex-1">
            {ActiveIcon ? (
              React.createElement(ActiveIcon, { className: "w-3.5 h-3.5 text-neutral-500 shrink-0" })
            ) : (
              <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            )}
            <span className="truncate">{displayText}</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 shrink-0 select-none ml-1.5 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute top-[calc(100%+4px)] left-0 w-full bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 shadow-[0_12px_32px_rgba(0,0,0,0.08)] rounded-xl py-1.5 z-[100] max-h-60 overflow-y-auto"
            >
              {options.map((opt) => {
                const isSelected = value.includes(opt.value);
                const OptionIcon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      if (opt.value === 'all') {
                        onChange(['all']);
                      } else {
                        let next = value.filter(v => v !== 'all');
                        if (next.includes(opt.value)) {
                          next = next.filter(v => v !== opt.value);
                        } else {
                          next.push(opt.value);
                        }
                        if (next.length === 0) {
                          next = ['all'];
                        }
                        onChange(next);
                      }
                    }}
                    className={`flex items-center justify-between w-full px-3.5 py-2.5 sm:py-2 text-xs md:text-sm text-left transition-colors font-sans cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAFAFA] dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 font-bold'
                        : 'text-neutral-700 dark:text-neutral-350 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-1.5 flex-1">
                      {OptionIcon ? (
                        <OptionIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#112A12] dark:text-emerald-400' : 'text-neutral-400 dark:text-neutral-500'}`} />
                      ) : (
                        <Tag className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#112A12] dark:text-emerald-400' : 'text-neutral-350 dark:text-neutral-600'}`} />
                      )}
                      <span className="whitespace-normal break-words leading-snug py-0.5">{opt.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-neutral-50 shrink-0 ml-1.5 mt-0.5" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface FilterOptionItem {
  id: number;
  name: string;
  slug?: string;
}

interface SelectOptionItem {
  value: string;
  label: string;
  slug?: string;
  icon?: React.ElementType;
}

interface MarketplaceDbProps {
  customComics?: Comic[];
  dynamicPublishers?: FilterOptionItem[];
  dynamicStoryStatuses?: FilterOptionItem[];
  dynamicGenres?: FilterOptionItem[];
  newsList?: RawNewsItem[];
  initialSelectedComicId?: string | null;
  onClearSelectedComicId?: () => void;
  onNavigateToNews?: (newsId: string) => void;
  onNavigateToCalendar?: () => void;
}

export default function MarketplaceDb({ 
  customComics, 
  dynamicPublishers = [], 
  dynamicStoryStatuses = [], 
  dynamicGenres = [], 
  newsList = [],
  initialSelectedComicId, 
  onClearSelectedComicId, 
  onNavigateToNews
}: MarketplaceDbProps = {}) {
  const activeComics = useMemo(() => customComics || COMICS_DATA, [customComics]);

  const [searchInput, setSearchInput] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(['all']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(['all']);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['all']);
  const [selectedAdaptations, setSelectedAdaptations] = useState<string[]>(['all']);
  const [selectedReadingRatings, setSelectedReadingRatings] = useState<string[]>(['all']);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('relevan');

  const sortOptions = [
    { value: 'relevan', label: 'Paling Relevan', icon: Sparkles },
    { value: 'terbaru', label: 'Terbaru', icon: Clock },
    { value: 'terpopuler', label: 'Terpopuler', icon: Flame },
    { value: 'harga_terendah', label: 'Harga Terendah', icon: TrendingDown },
    { value: 'harga_tertinggi', label: 'Harga Tertinggi', icon: TrendingUp },
    { value: 'alfabet_az', label: 'Alfabet A-Z', icon: ArrowDownAZ },
    { value: 'alfabet_za', label: 'Alfabet Z-A', icon: ArrowUpAZ },
  ];

  useEffect(() => {
    if (!activeDropdown) return;
    const handleClose = () => setActiveDropdown(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [activeDropdown]);

  // Fungsi submit pencarian saat tekan Enter atau klik tombol Search
  const handlePerformSearch = (keywordToSearch?: string) => {
    const raw = (keywordToSearch !== undefined ? keywordToSearch : searchInput).trim();
    setActiveSearchTerm(raw);

    const clean = raw.replace(/\s+/g, ' ').toLowerCase();

    // Catat log jika memenuhi kriteria: minimal 3 huruf, bukan spam karakter berulang
    if (clean.length >= 3 && !/(.)\1{3,}/.test(clean) && /[\p{L}\p{N}]/u.test(clean)) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

      fetch('/books/search-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
        },
        body: JSON.stringify({ keyword: clean }),
      }).catch(() => {
        // Silently catch error
      });
    }
  };

  // Modal detailed states
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [activeVolumeNum, setActiveVolumeNum] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 24;
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const upcomingReleases = useMemo(() => {
    const list: Array<{ comic: Comic; volume: Volume; dateStr: string }> = [];
    
    // Only find books explicitly flagged as upcoming by admin
    activeComics.forEach((comic) => {
      comic.volumes.forEach((vol) => {
        if (vol.isUpcoming || comic.isUpcoming) {
          list.push({
            comic,
            volume: vol,
            dateStr: vol.releaseDate || 'Segera Rilis'
          });
        }
      });
    });

    return list.slice(0, 6);
  }, [activeComics]);

  const getReadingRatingStyle = (rating?: string) => {
    switch (rating) {
      case 'Anak & Bimbingan Orang Tua':
      case 'Anak & Bimbingan':
        return {
          bg: 'bg-neutral-100/95 dark:bg-neutral-800/95 border-emerald-500/40 text-[#41a34c] dark:text-emerald-400',
          text: 'Anak & Bimbingan',
          color: '#41a34c',
          hoverClass: 'group-hover:text-[#41a34c] dark:group-hover:text-emerald-400',
          hoverClassKat: 'group-hover/kat:text-[#41a34c] dark:group-hover/kat:text-emerald-400'
        };
      case 'Remaja':
        return {
          bg: 'bg-neutral-100/95 dark:bg-neutral-800/95 border-amber-500/50 dark:border-amber-400/40 text-[#d97706] dark:text-amber-400',
          text: 'Remaja',
          color: '#d97706',
          hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
          hoverClassKat: 'group-hover/kat:text-[#d97706] dark:group-hover/kat:text-amber-400'
        };
      case 'Dewasa Ringan':
        return {
          bg: 'bg-neutral-100/95 dark:bg-neutral-800/95 border-orange-500/40 text-[#ff6628] dark:text-orange-400',
          text: 'Dewasa Ringan',
          color: '#ff723c',
          hoverClass: 'group-hover:text-[#ff6628] dark:group-hover:text-orange-400',
          hoverClassKat: 'group-hover/kat:text-[#ff6628] dark:group-hover/kat:text-orange-400'
        };
      case 'Dewasa Berat':
        return {
          bg: 'bg-neutral-100/95 dark:bg-neutral-800/95 border-red-500/40 text-[#c1271f] dark:text-red-400',
          text: 'Dewasa Berat',
          color: '#c1271f',
          hoverClass: 'group-hover:text-[#c1271f] dark:group-hover:text-red-400',
          hoverClassKat: 'group-hover/kat:text-[#c1271f] dark:group-hover/kat:text-red-400'
        };
      default:
        return {
          bg: 'bg-neutral-100/95 dark:bg-neutral-800/95 border-amber-500/50 dark:border-amber-400/40 text-[#d97706] dark:text-amber-400',
          text: 'Remaja',
          color: '#d97706',
          hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
          hoverClassKat: 'group-hover/kat:text-[#d97706] dark:group-hover/kat:text-amber-400'
        };
    }
  };



  const getAuthorNameOnly = (c: { authorStory?: string; authorArt?: string }) => {
    const story = c.authorStory;
    const art = c.authorArt;
    if (!story && !art) return '';
    if (story === art) return story || '';
    return [story, art].filter(Boolean).join(', ');
  };


  useEffect(() => {
    if (initialSelectedComicId) {
      // Support either standard series id or formatted series-vol-X identifier
      const parts = initialSelectedComicId.split('-vol-');
      const realComicId = parts[0];
      const targetVol = parts[1] ? parseInt(parts[1], 10) : 1;

      const comic = activeComics.find(c =>
        c.id === realComicId ||
        c.id === `book-${realComicId}` ||
        c.id === `series-${realComicId}` ||
        c.bookId === Number(realComicId) ||
        c.slug === realComicId ||
        c.volumes.some(v => v.id === Number(realComicId) || v.bookId === Number(realComicId))
      );
      if (comic) {
        setSelectedComic(comic);
        setActiveVolumeNum(comic.volumes.some(v => v.volNumber === targetVol) ? targetVol : (comic.volumes[0]?.volNumber || 1));
      }
    } else {
      setSelectedComic(null);
    }
  }, [initialSelectedComicId, activeComics]);

  const openVolumeModal = (comic: Comic, volNumber: number) => {
    setSelectedComic(comic);
    setActiveVolumeNum(volNumber);
    // Update browser URL using slug for SEO without full-page reload
    const targetSlug = comic.slug || comic.id;
    window.history.pushState({ comicId: comic.id, volNumber }, '', `/buku/${targetSlug}`);
  };

  const handleCloseModal = () => {
    setSelectedComic(null);
    if (onClearSelectedComicId) {
      onClearSelectedComicId();
    }
    // Revert browser URL back to home cleanly
    if (window.location.pathname.startsWith('/buku/')) {
      window.history.pushState({}, '', '/');
    } else if (window.location.hash.startsWith('#/database/')) {
      window.location.hash = '#database';
    }
  };

  // All genres present in database / prop
  const genreOptions: SelectOptionItem[] = useMemo(() => {
    if (dynamicGenres && dynamicGenres.length > 0) {
      return dynamicGenres.map(g => ({ value: g.name, label: g.name, slug: g.slug, icon: Tag }));
    }
    const defaultGenres = [
      'Action', 'Adventure', 'Avant Garde', 'Comedy', 'Drama', 'Fantasy',
      'Horror', 'Mystery', 'Natural', 'Psychological', 'Romance', 'Sci-Fi',
      'Slice of Life', 'Sports', 'Supernatural', 'Thriller'
    ];
    return defaultGenres.map(g => ({ value: g, label: g, icon: Tag }));
  }, [dynamicGenres]);

  const publisherOptions: SelectOptionItem[] = useMemo(() => {
    if (dynamicPublishers && dynamicPublishers.length > 0) {
      return dynamicPublishers.map(p => ({
        value: String(p.id),
        label: p.name,
        slug: p.slug,
        icon: Building2
      }));
    }
    return [
      { value: 'elex', label: 'Elex Media Komputindo', slug: 'elex', icon: Building2 },
      { value: 'level', label: 'Elex Media Komputindo (Level Comic)', slug: 'level', icon: Building2 },
      { value: 'mnc', label: 'm&c!', slug: 'mnc', icon: Building2 },
      { value: 'akasha', label: 'm&c! (AKASHA)', slug: 'akasha', icon: Building2 },
      { value: 'clover', label: 'Penerbit Clover', slug: 'clover', icon: Building2 },
      { value: 'haru', label: 'Penerbit Haru', slug: 'haru', icon: Building2 },
      { value: 'phoenix', label: 'Phoenix Gramedia Indonesia', slug: 'phoenix', icon: Building2 },
      { value: 'baca', label: 'Penerbit Baca', slug: 'baca', icon: Building2 }
    ];
  }, [dynamicPublishers]);

  const statusOptions: SelectOptionItem[] = useMemo(() => {
    if (dynamicStoryStatuses && dynamicStoryStatuses.length > 0) {
      return dynamicStoryStatuses.map(s => ({
        value: String(s.id),
        label: s.name,
        slug: s.slug,
        icon: Activity
      }));
    }
    return [
      { value: 'ongoing', label: 'Sedang Berjalan', slug: 'ongoing', icon: Clock },
      { value: 'completed', label: 'Tamat', slug: 'completed', icon: Check }
    ];
  }, [dynamicStoryStatuses]);

  // Map each individual comic and volume into a distinct volume posting
  interface VolumePost {
    id: string;
    comic: Comic;
    volume: Volume;
  }

  const allVolumePosts = useMemo<VolumePost[]>(() => {
    const posts: VolumePost[] = [];
    activeComics.forEach(comic => {
      comic.volumes.forEach(volume => {
        posts.push({
          id: `${comic.id}-vol-${volume.volNumber}`,
          comic,
          volume,
        });
      });
    });
    return posts;
  }, [activeComics]);

  // Filter logic on volume posts
  const filteredVolumePosts = useMemo(() => {
    return allVolumePosts.filter(post => {
      const { comic, volume } = post;
      const bookTitle = volume.title || comic.title;
      const combinedTitle = `${bookTitle} Vol ${volume.volNumber}`;
      
      const matchesSearch = 
        !activeSearchTerm ||
        combinedTitle.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        bookTitle.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        comic.title.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        (volume.title && volume.title.toLowerCase().includes(activeSearchTerm.toLowerCase())) ||
        comic.synopsis.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        volume.cetakanInfo.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        (volume.isbn && volume.isbn.toLowerCase().includes(activeSearchTerm.toLowerCase())) ||
        comic.publisherName.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        (comic.authorStory && comic.authorStory.toLowerCase().includes(activeSearchTerm.toLowerCase())) ||
        (comic.authorArt && comic.authorArt.toLowerCase().includes(activeSearchTerm.toLowerCase()));

      const matchesCat = selectedCategories.includes('all') || selectedCategories.length === 0 || selectedCategories.includes(comic.category);
      
      const matchesPublisher = selectedPublishers.includes('all') || selectedPublishers.length === 0 || selectedPublishers.some(sp => {
        const opt = publisherOptions.find(o => o.value === sp);
        if (!opt) return sp === comic.publisherId;
        return (
          sp === comic.publisherId ||
          opt.label.toLowerCase() === comic.publisherName.toLowerCase() ||
          (opt.slug && opt.slug.toLowerCase() === comic.publisherId.toLowerCase())
        );
      });

      const matchesStatus = selectedStatuses.includes('all') || selectedStatuses.length === 0 || selectedStatuses.some(ss => {
        // If comic has a database statusId
        if (comic.statusId) {
          const opt = statusOptions.find(o => String(o.value) === String(ss));
          // If option matches by ID
          if (String(comic.statusId) === String(ss)) return true;
          // If option is fallback string 'ongoing' or 'completed'
          if (ss === 'ongoing') return comic.status === 'ongoing';
          if (ss === 'completed') return comic.status === 'completed';
          // Check by option slug or label match with comic.statusName
          if (opt && comic.statusName) {
            const optSlug = (opt.slug || opt.label).toLowerCase();
            const cStatusName = comic.statusName.toLowerCase();
            return optSlug === cStatusName || cStatusName.includes(optSlug) || optSlug.includes(cStatusName);
          }
          return false;
        }

        // Fallback for mock data without database statusId
        const opt = statusOptions.find(o => String(o.value) === String(ss));
        const optKey = (opt ? (opt.slug || opt.label) : ss).toLowerCase();
        if (optKey.includes('tamat') || optKey.includes('complete') || ss === 'completed') {
          return comic.status === 'completed';
        }
        if (optKey.includes('jalan') || optKey.includes('ongoing') || ss === 'ongoing') {
          return comic.status === 'ongoing';
        }
        return ss === comic.status;
      });

      const matchesGenre = selectedGenres.includes('all') || selectedGenres.length === 0 || comic.genres.some(g => {
        const comicNorm = g.toLowerCase().replace(/[_-]/g, ' ').trim();
        return selectedGenres.some(sg => {
          const selectNorm = sg.toLowerCase().replace(/[_-]/g, ' ').trim();
          return selectNorm === comicNorm;
        });
      });

      const matchesAdaptation = selectedAdaptations.includes('all') || selectedAdaptations.length === 0 || selectedAdaptations.some(sa => {
        const comicAdapt = (comic.adaptation || '').toLowerCase();
        if (sa === 'anime') {
          return comicAdapt.includes('anime') || !!(volume.animeAdaptation && volume.animeAdaptation.length > 0);
        }
        if (sa === 'live_action') {
          return comicAdapt.includes('live') || comicAdapt.includes('action') || !!(volume.liveActionAdaptation && volume.liveActionAdaptation.length > 0);
        }
        if (sa === 'manga') {
          return comicAdapt.includes('manga') || comicAdapt.includes('komik') || comicAdapt.includes('manhwa') || comicAdapt.includes('manhua') || comic.category === 'manga';
        }
        return false;
      });

      const matchesReadingRating = selectedReadingRatings.includes('all') || selectedReadingRatings.length === 0 || selectedReadingRatings.includes(comic.readingRating || 'Remaja');

      return matchesSearch && matchesCat && matchesPublisher && matchesStatus && matchesGenre && matchesAdaptation && matchesReadingRating;
    });
  }, [allVolumePosts, activeSearchTerm, selectedCategories, selectedPublishers, selectedStatuses, selectedGenres, selectedAdaptations, selectedReadingRatings, publisherOptions, statusOptions]);

  const sortedVolumePosts = useMemo(() => {
    const list = [...filteredVolumePosts];
    switch (sortBy) {
      case 'terbaru':
        return list.sort((a, b) => b.volume.releaseDate.localeCompare(a.volume.releaseDate));
      case 'terpopuler':
        return list.sort((a, b) => {
          const ratingDiff = b.comic.rating - a.comic.rating;
          if (ratingDiff !== 0) return ratingDiff;
          return a.comic.title.localeCompare(b.comic.title);
        });
      case 'harga_terendah':
        return list.sort((a, b) => a.volume.price - b.volume.price);
      case 'harga_tertinggi':
        return list.sort((a, b) => b.volume.price - a.volume.price);
      case 'alfabet_az':
        return list.sort((a, b) => {
          const titleA = `${a.volume.title || a.comic.title} Vol ${a.volume.volNumber}`;
          const titleB = `${b.volume.title || b.comic.title} Vol ${b.volume.volNumber}`;
          return titleA.localeCompare(titleB, 'id');
        });
      case 'alfabet_za':
        return list.sort((a, b) => {
          const titleA = `${a.volume.title || a.comic.title} Vol ${a.volume.volNumber}`;
          const titleB = `${b.volume.title || b.comic.title} Vol ${b.volume.volNumber}`;
          return titleB.localeCompare(titleA, 'id');
        });
      case 'relevan':
      default:
        return list.sort((a, b) => {
          const aFeat = a.comic.isFeatured ? 1 : 0;
          const bFeat = b.comic.isFeatured ? 1 : 0;
          if (bFeat !== aFeat) return bFeat - aFeat;
          const indexA = allVolumePosts.indexOf(a);
          const indexB = allVolumePosts.indexOf(b);
          return indexA - indexB;
        });
    }
  }, [filteredVolumePosts, sortBy, allVolumePosts]);

  // Reset page when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearchTerm, selectedCategories, selectedPublishers, selectedStatuses, selectedGenres, selectedAdaptations, selectedReadingRatings, sortBy]);

  // Pagination calculations
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedVolumePosts.length / ITEMS_PER_PAGE));
  }, [sortedVolumePosts.length, ITEMS_PER_PAGE]);

  const paginatedVolumePosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedVolumePosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedVolumePosts, currentPage, ITEMS_PER_PAGE]);





  return (
    <div className="space-y-6" id="marketplace-search-section">
      {!selectedComic && (
        <>
          {/* Visual Minimalist Landing Hero for Database */}
          <div className="relative text-center py-10 md:py-14 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white rounded-2xl overflow-hidden shadow-xs dark:shadow-md border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 mb-6 transition-all duration-200">
            {/* Abstract Background Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-100 dark:from-neutral-800/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neutral-100 dark:bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/20 text-neutral-800 dark:text-white text-[11px] font-mono font-bold tracking-widest uppercase rounded-full">
              <BookOpen className="w-3.5 h-3.5 text-[#DA6B1C] dark:text-[#DA6B1C] fill-[#DA6B1C]/10 dark:fill-[#DA6B1C]/30" />
              <span>Database &amp; Discovery Platform</span>
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-sans font-black tracking-tight uppercase leading-tight max-w-4xl text-neutral-950 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-100 dark:to-neutral-300">
              PORTAL DATABASE MANGA, NOVEL &amp; LIGHT NOVEL RESMI INDONESIA
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Temukan rilisan terbaru, detail cetakan resmi, ulasan komunitas, rekomendasi, serta akses pembelian legal dalam satu tempat.
            </p>

            <div className="pt-1 relative z-10 flex items-center justify-center gap-2.5 flex-wrap">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4.5 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white active:scale-95 duration-100 text-xs font-mono font-bold tracking-tight rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border border-[#4752C4]/20"
              >
                <svg className="w-4 h-4 fill-white text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
                </svg>
                <span className="text-white font-bold">konotasi.sukasuka</span>
              </a>
            </div>

            {/* Counter Widget Info */}
            <div className="flex items-center gap-6 pt-3 font-mono text-xs">
              <div className="flex flex-col items-center">
                <span className="text-neutral-950 dark:text-white font-extrabold text-lg leading-none">{COMICS_DATA.length}</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Judul Komik</span>
              </div>
              <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col items-center">
                <span className="text-neutral-950 dark:text-white font-extrabold text-lg leading-none">
                  {COMICS_DATA.reduce((acc, c) => acc + c.volumes.length, 0)}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Total Volume</span>
              </div>
              <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col items-center">
                <span className="text-neutral-950 dark:text-white font-extrabold text-lg leading-none">7+</span>
                <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Penerbit Resmi</span>
              </div>
            </div>
          </div>

          {/* Ads Placeholder */}
          <div className="w-full bg-neutral-50/70 dark:bg-neutral-900/40 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 text-center space-y-1.5 mb-6 transition-colors shadow-2xs">
            <div className="text-xs font-mono font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1.5">
              <span>📢</span>
              <span>SPONSORED ADSENSE</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed">
              Iklan Google Adsense membantu kelangsungan server database buku Norinoya. Hubungi kami untuk penempatan banner premium.
            </p>
          </div>

          {/* Section Item Segera Rilis */}
          {upcomingReleases.length > 0 && (
            <div className="bg-white dark:bg-[#171717] border border-[#DA6B1C]/40/80 dark:border-orange-800/50 p-4 sm:p-5 rounded-2xl space-y-3.5 shadow-2xs mb-6 relative overflow-hidden transition-colors">
              {/* Ambient Background Glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#DA6B1C]/10 dark:bg-[#DA6B1C]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#DA6B1C]/10 dark:bg-[#DA6B1C]/10 rounded-lg">
                    <Flame className="w-4 h-4 text-[#DA6B1C] fill-[#DA6B1C]/20 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100 leading-none">
                      ITEM SEGERA RILIS
                    </h3>
                    <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-sans">
                      Jadwal rilis komik &amp; novel resmi Indonesia bulan ini
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid of 6 Upcoming Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 relative z-10">
                {upcomingReleases.map(({ comic, volume, dateStr }) => (
                  <div
                    key={`upcoming-${comic.id}-${volume.volNumber}`}
                    onClick={() => openVolumeModal(comic, volume.volNumber)}
                    className="bg-neutral-50/80 dark:bg-neutral-900/80 hover:bg-white dark:hover:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-[#DA6B1C] dark:hover:border-[#DA6B1C] rounded-xl p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-3xs hover:shadow-md hover:-translate-y-0.5 group"
                  >
                    <div className="space-y-1.5">
                      {/* Cover Art with Release Badge */}
                      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-950 flex items-center justify-center">
                        {(volume.coverImage || comic.coverImage) ? (
                          <img
                            src={volume.coverImage || comic.coverImage}
                            alt={`${comic.title} Vol.${volume.volNumber}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-2 text-center">
                            <BookOpen className="w-6 h-6 text-neutral-600 mb-1" />
                            <span className="text-[9px] text-neutral-400 font-bold line-clamp-2">{comic.title}</span>
                          </div>
                        )}

                        {/* Release Date Badge */}
                        <div className="absolute top-1.5 left-1.5 right-1.5 z-10 flex justify-start">
                          <span className="bg-[#DA6B1C] text-white font-mono font-black text-[8px] px-1.5 py-0.5 rounded-md shadow-xs tracking-tight flex items-center gap-1 border border-orange-600/30">
                            <Clock className="w-2.5 h-2.5 text-white shrink-0" />
                            <span className="text-white font-extrabold">{dateStr}</span>
                          </span>
                        </div>

                        {/* Bottom Category & Rating Badges */}
                        <div className="absolute bottom-1.5 left-1.5 z-10 flex items-center gap-1 flex-wrap">
                          <span className="bg-white/95 dark:bg-neutral-900/95 text-neutral-900 dark:text-neutral-100 font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8px] capitalize shadow-xs backdrop-blur-xs border border-neutral-200/60 dark:border-neutral-800">
                            {comic.category.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                          </span>
                          {comic.readingRating && (
                            <span className={`font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8px] shadow-xs border ${getReadingRatingStyle(comic.readingRating).bg}`}>
                              {getReadingRatingStyle(comic.readingRating).text}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="space-y-0.5 text-left pt-1">
                        <span className="text-[8.5px] font-sans text-neutral-400 dark:text-neutral-500 block truncate leading-tight">
                          {comic.publisherName}
                        </span>
                        <h4 className={`text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100 ${getReadingRatingStyle(comic.readingRating).hoverClass} transition-colors line-clamp-1 leading-snug`}>
                          {volume.title || comic.title}
                        </h4>
                        <div className="text-[9.5px] font-mono font-extrabold text-[#112A12] dark:text-[#457347] leading-tight">
                          Vol.{volume.volNumber}
                        </div>
                        {(comic.authorStory || comic.authorArt) && (
                          <p className="text-[9px] font-sans text-neutral-500 dark:text-neutral-400 truncate leading-tight">
                            {getAuthorNameOnly(comic)}
                          </p>
                        )}
                        {comic.genres && comic.genres.length > 0 && (
                          <p className="text-[8.5px] font-sans text-neutral-400 dark:text-neutral-500 truncate leading-tight">
                            {comic.genres.slice(0, 2).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800/80 mt-1.5 flex items-center justify-between font-mono text-[10px]">
                      <span className="font-extrabold text-neutral-900 dark:text-neutral-100 text-[10.5px]">
                        {volume.price && volume.price > 0 ? `Rp ${volume.price.toLocaleString('id-ID')}` : '-'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

      {/* Advanced Anilist style Search Filter Panel */}
      <div className="bg-white dark:bg-[#171717] border border-[#EFEFEF] dark:border-neutral-800 p-5 rounded-2xl space-y-4 shadow-3xs transition-colors">
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <Filter className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 leading-normal">
            Panel Pencarian Tingkat Lanjut
          </h3>
        </div>

        {/* Filters Grid */}
        <div className="flex flex-col gap-3.5">
          {/* Main search input, always visible + collapse filters button for mobile */}
          <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-end">
            <div className="flex-1 relative">
              <label className="block text-xs font-mono font-bold uppercase text-neutral-400 dark:text-neutral-400 mb-1 leading-normal">Cari Kata Kunci</label>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePerformSearch();
                }}
                className="relative select-text flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Ketik judul manga, light novel, lalu tekan Enter..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      if (e.target.value === '') {
                        setActiveSearchTerm('');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePerformSearch();
                      }
                    }}
                    className="w-full pl-9 pr-8 py-1.5 text-sm bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/50 dark:hover:bg-[#262626] focus:bg-white dark:focus:bg-[#121212] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-lg outline-none h-9 font-sans transition-all focus:border-neutral-950 dark:focus:border-neutral-600 leading-normal"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setActiveSearchTerm('');
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-sm cursor-pointer"
                      title="Bersihkan input"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="h-9 px-3.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Cari</span>
                </button>
              </form>
            </div>

            {/* Advanced Filters Button on Mobile Only */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                className={`w-full h-9 flex items-center justify-center gap-1.5 border rounded-lg text-xs font-mono font-bold transition-all ${
                  isFiltersExpanded 
                    ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950' 
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:bg-[#171717] dark:text-neutral-300 dark:border-neutral-800 dark:hover:bg-[#262626]'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>{isFiltersExpanded ? 'Sembunyikan Filter' : 'Filter Kategori & Penerbit'}</span>
              </button>
            </div>
          </div>

          {/* Advanced select dropdowns - always open on desktop, expandable on mobile */}
          <div className={`${isFiltersExpanded ? 'grid' : 'hidden'} md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-3.5 pt-1 md:pt-0`}>
            {/* Format */}
            <CustomSelect
              label="Format Buku"
              value={selectedCategories}
              options={[
                { value: 'all', label: 'Semua Format', icon: Layers },
                { value: 'manga', label: 'Komik (Manga)', icon: BookOpen },
                { value: 'light_novel', label: 'Light Novel', icon: BookText },
                { value: 'novel', label: 'Novel', icon: BookText }
              ]}
              onChange={(val) => {
                setSelectedCategories(val);
              }}
              isOpen={activeDropdown === 'category'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'category' ? null : 'category');
              }}
            />

            {/* Publisher */}
            <CustomSelect
              label="Penerbit Buku"
              value={selectedPublishers}
              options={[
                { value: 'all', label: 'Semua Penerbit', icon: Building2 },
                ...publisherOptions
              ]}
              onChange={(val) => {
                setSelectedPublishers(val);
              }}
              isOpen={activeDropdown === 'publisher'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'publisher' ? null : 'publisher');
              }}
            />

            {/* Status */}
            <CustomSelect
              label="Status Publikasi"
              value={selectedStatuses}
              options={[
                { value: 'all', label: 'Semua Status', icon: Activity },
                ...statusOptions
              ]}
              onChange={(val) => {
                setSelectedStatuses(val);
              }}
              isOpen={activeDropdown === 'status'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'status' ? null : 'status');
              }}
            />

            {/* Genre */}
            <CustomSelect
              label="Genre Cerita"
              value={selectedGenres}
              options={[
                { value: 'all', label: 'Semua Genre', icon: Tag },
                ...genreOptions
              ]}
              onChange={(val) => {
                setSelectedGenres(val);
              }}
              isOpen={activeDropdown === 'genre'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'genre' ? null : 'genre');
              }}
            />

            {/* Adaptasi */}
            <CustomSelect
              label="Adaptasi"
              value={selectedAdaptations}
              options={[
                { value: 'all', label: 'Semua Adaptasi', icon: Tv },
                { value: 'anime', label: 'Anime', icon: Tv },
                { value: 'live_action', label: 'Live Action', icon: Video },
                { value: 'manga', label: 'Manga / Manhwa', icon: BookOpen }
              ]}
              onChange={(val) => {
                setSelectedAdaptations(val);
              }}
              isOpen={activeDropdown === 'adaptation'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'adaptation' ? null : 'adaptation');
              }}
            />

            {/* Rating Usia */}
            <CustomSelect
              label="Rating Usia"
              value={selectedReadingRatings}
              options={[
                { value: 'all', label: 'Semua Usia', icon: Shield },
                { value: 'Anak & Bimbingan Orang Tua', label: 'Anak & Bimbingan', icon: Shield },
                { value: 'Remaja', label: 'Remaja', icon: Shield },
                { value: 'Dewasa Ringan', label: 'Dewasa Ringan', icon: ShieldAlert },
                { value: 'Dewasa Berat', label: 'Dewasa Berat', icon: ShieldAlert }
              ]}
              onChange={(val) => {
                setSelectedReadingRatings(val);
              }}
              isOpen={activeDropdown === 'reading_rating'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'reading_rating' ? null : 'reading_rating');
              }}
            />
          </div>
        </div>

        {/* Active Filters Panel (Tag Pills) */}
        {(activeSearchTerm || 
          !selectedCategories.includes('all') || 
          !selectedPublishers.includes('all') || 
          !selectedStatuses.includes('all') || 
          !selectedGenres.includes('all') || 
          !selectedAdaptations.includes('all') ||
          !selectedReadingRatings.includes('all')) && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-neutral-400 dark:text-neutral-500 mr-2 shrink-0">
              FILTER AKTIF:
            </span>
            
            {/* Render Category tags */}
            {!selectedCategories.includes('all') && selectedCategories.map(cat => {
              const label = cat === 'manga' ? 'Komik (Manga)' : cat === 'light_novel' ? 'Light Novel' : 'Novel';
              return (
                <span key={`cat-${cat}`} className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#EFEFEF] dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-850 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-extrabold tracking-wide rounded-md transition-all select-none">
                  {label}
                  <button 
                    onClick={() => {
                      const next = selectedCategories.filter(v => v !== cat);
                      setSelectedCategories(next.length === 0 ? ['all'] : next);
                    }}
                    className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded-sm transition-colors cursor-pointer text-neutral-550 dark:text-neutral-400 hover:text-neutral-850 dark:hover:text-neutral-150"
                    title="Hapus filter"
                  >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </button>
                </span>
              );
            })}

            {/* Render Publisher tags */}
            {!selectedPublishers.includes('all') && selectedPublishers.map(pub => {
              const opt = publisherOptions.find(o => String(o.value) === String(pub));
              const label = opt ? opt.label : pub;
              return (
                <span key={`pub-${pub}`} className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#EFEFEF] dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-850 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-extrabold tracking-wide rounded-md transition-all select-none">
                  {label}
                  <button 
                    onClick={() => {
                      const next = selectedPublishers.filter(v => v !== pub);
                      setSelectedPublishers(next.length === 0 ? ['all'] : next);
                    }}
                    className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded-sm transition-colors cursor-pointer text-neutral-550 dark:text-neutral-400 hover:text-neutral-850 dark:hover:text-neutral-150"
                    title="Hapus filter"
                  >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </button>
                </span>
              );
            })}

            {/* Render Status tags */}
            {!selectedStatuses.includes('all') && selectedStatuses.map(status => {
              const opt = statusOptions.find(o => String(o.value) === String(status));
              const label = opt ? opt.label : (status === 'ongoing' ? 'Sedang Berjalan' : 'Tamat');
              return (
                <span key={`status-${status}`} className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#EFEFEF] dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-850 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-extrabold tracking-wide rounded-md transition-all select-none">
                  {label}
                  <button 
                    onClick={() => {
                      const next = selectedStatuses.filter(v => v !== status);
                      setSelectedStatuses(next.length === 0 ? ['all'] : next);
                    }}
                    className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded-sm transition-colors cursor-pointer text-neutral-550 dark:text-neutral-400 hover:text-neutral-850 dark:hover:text-neutral-150"
                    title="Hapus filter"
                  >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </button>
                </span>
              );
            })}

            {/* Render Genre tags */}
            {!selectedGenres.includes('all') && selectedGenres.map(genre => {
              return (
                <span key={`genre-${genre}`} className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#EFEFEF] dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-850 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-extrabold tracking-wide rounded-md transition-all select-none">
                  {genre}
                  <button 
                    onClick={() => {
                      const next = selectedGenres.filter(v => v !== genre);
                      setSelectedGenres(next.length === 0 ? ['all'] : next);
                    }}
                    className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded-sm transition-colors cursor-pointer text-neutral-550 dark:text-neutral-400 hover:text-neutral-850 dark:hover:text-neutral-150"
                    title="Hapus filter"
                  >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </button>
                </span>
              );
            })}

            {/* Render Adaptation tags */}
            {!selectedAdaptations.includes('all') && selectedAdaptations.map(ad => {
              const label = ad === 'anime' ? 'Anime' : ad === 'live_action' ? 'Live Action' : ad === 'manga' ? 'Manga / Manhwa' : ad;
              return (
                <span key={`ad-${ad}`} className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#EFEFEF] dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-850 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-extrabold tracking-wide rounded-md transition-all select-none">
                  {label}
                  <button 
                    onClick={() => {
                      const next = selectedAdaptations.filter(v => v !== ad);
                      setSelectedAdaptations(next.length === 0 ? ['all'] : next);
                    }}
                    className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded-sm transition-colors cursor-pointer text-neutral-550 dark:text-neutral-400 hover:text-neutral-850 dark:hover:text-neutral-150"
                    title="Hapus filter"
                  >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </button>
                </span>
              );
            })}

            {/* Render Reading Rating tags */}
            {!selectedReadingRatings.includes('all') && selectedReadingRatings.map(rr => {
              const label = rr === 'Anak & Bimbingan Orang Tua' ? 'Anak & Bimbingan' : rr;
              return (
                <span key={`rr-${rr}`} className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#EFEFEF] dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-850 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-extrabold tracking-wide rounded-md transition-all select-none">
                  {label}
                  <button 
                    onClick={() => {
                      const next = selectedReadingRatings.filter(v => v !== rr);
                      setSelectedReadingRatings(next.length === 0 ? ['all'] : next);
                    }}
                    className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded-sm transition-colors cursor-pointer text-neutral-550 dark:text-neutral-400 hover:text-neutral-850 dark:hover:text-neutral-150"
                    title="Hapus filter"
                  >
                    <X className="w-2.5 h-2.5 stroke-[3]" />
                  </button>
                </span>
              );
            })}

            {/* Dynamic Search Term Tag */}
            {activeSearchTerm && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#EFEFEF] dark:bg-neutral-800/80 border border-neutral-200/50 dark:border-neutral-700/50 text-neutral-850 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-extrabold tracking-wide rounded-md transition-all select-none">
                Cari: "{activeSearchTerm}"
                <button 
                  onClick={() => {
                    setSearchInput('');
                    setActiveSearchTerm('');
                  }}
                  className="hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5 rounded-sm transition-colors cursor-pointer text-neutral-550 dark:text-neutral-400 hover:text-neutral-850 dark:hover:text-neutral-150"
                  title="Hapus pencarian"
                >
                  <X className="w-2.5 h-2.5 stroke-[3]" />
                </button>
              </span>
            )}

            {/* Clear All active Tag */}
            <button
              onClick={() => {
                setSearchInput('');
                setActiveSearchTerm('');
                setSelectedCategories(['all']);
                setSelectedPublishers(['all']);
                setSelectedStatuses(['all']);
                setSelectedGenres(['all']);
                setSelectedAdaptations(['all']);
                setSelectedReadingRatings(['all']);
              }}
              className="text-[11px] sm:text-xs font-mono font-bold hover:underline hover:text-red-600 text-red-500 ml-auto flex items-center gap-1 cursor-pointer leading-normal pl-2"
            >
              Reset Semua
            </button>
          </div>
        )}
      </div>

      {/* Catalog Header Toolbar with product count and sorting selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-2 bg-[#FAFAFA] dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 rounded-2xl p-4 shadow-3xs" id="catalog-sort-wrapper">
        <div className="space-y-0.5 text-left">
          <span className="text-[11px] font-mono font-bold text-neutral-400 dark:text-neutral-500 block uppercase">
            DATA TERBITAN RESMI
          </span>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            Menampilkan <strong className="text-neutral-950 dark:text-white font-bold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, sortedVolumePosts.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, sortedVolumePosts.length)}</strong> dari <strong className="text-neutral-950 dark:text-white font-bold">{sortedVolumePosts.length}</strong> Jilid Komik / Novel
          </p>
        </div>
        
        {/* Style-different custom "Urutkan" selector */}
        <div className="relative select-none" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => {
              setActiveDropdown(activeDropdown === 'sort' ? null : 'sort');
            }}
            className="flex items-center gap-2 bg-neutral-50/55 dark:bg-[#121212] border border-neutral-200/70 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-[#262626] hover:border-neutral-300 dark:hover:border-neutral-700 px-3.5 h-9 rounded-lg text-xs font-sans font-bold text-neutral-850 dark:text-neutral-100 transition-all cursor-pointer outline-none w-full sm:w-auto justify-between sm:justify-start"
          >
            {(() => {
              const currentOpt = sortOptions.find(o => o.value === sortBy);
              const SortIcon = currentOpt?.icon || ArrowUpDown;
              return (
                <div className="flex items-center gap-2 truncate min-w-0">
                  <SortIcon className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                  <span>{currentOpt?.label || 'Paling Relevan'}</span>
                </div>
              );
            })()}
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 dark:text-neutral-400 shrink-0 ml-1 transition-transform duration-250 ${activeDropdown === 'sort' ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {activeDropdown === 'sort' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-[calc(100%+4px)] w-48 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 shadow-[0_12px_32px_rgba(0,0,0,0.08)] rounded-xl py-1.5 z-[110]"
              >
                {sortOptions.map((opt) => {
                  const isSelected = sortBy === opt.value;
                  const OptionIcon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSortBy(opt.value);
                        setActiveDropdown(null);
                      }}
                      className={`flex items-center justify-between w-full px-3.5 py-2.5 sm:py-2 text-xs md:text-sm text-left transition-colors font-sans cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-50 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 font-bold'
                          : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-1.5 flex-1">
                        <OptionIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#112A12] dark:text-emerald-400' : 'text-neutral-400 dark:text-neutral-500'}`} />
                        <span className="truncate">{opt.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-neutral-50 shrink-0 ml-1.5" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
        <AnimatePresence mode="popLayout">
          {paginatedVolumePosts.length > 0 ? (
            paginatedVolumePosts.map((post) => {
              const { comic, volume } = post;
              return (
                <div
                  key={post.id}
                  onClick={() => openVolumeModal(comic, volume.volNumber)}
                  className="block group cursor-pointer"
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="h-full bg-white dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_10px_24px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] select-none"
                  >
                    {/* Book Jacket Art */}
                    <div className="relative aspect-[3/4] w-full bg-neutral-950 flex flex-col justify-between p-2.5 select-none overflow-hidden">
                      {(volume.coverImage || comic.coverImage) && !imageErrors[post.id] ? (
                        <img
                          src={volume.coverImage || comic.coverImage}
                          alt={`${volume.title || comic.title} Vol ${volume.volNumber}`}
                          onError={() => setImageErrors(prev => ({ ...prev, [post.id]: true }))}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex flex-col justify-between p-2.5 border border-neutral-700">
                          <div className="my-auto text-center px-1">
                            <BookOpen className="w-7 h-7 text-neutral-500 stroke-[1.2] mx-auto mb-1 opacity-60" />
                            <span className="text-[8px] font-mono tracking-wider text-neutral-400 capitalize">
                              {comic.category.replace('_', ' ').toLowerCase()}
                            </span>
                            <h4 className="text-[10px] font-sans font-extrabold text-neutral-200 mt-1 line-clamp-3 leading-normal">
                              {volume.title || comic.title}
                            </h4>
                          </div>
                        </div>
                      )}
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-85" />

                      {/* Bottom Quick Category & Age Rating Overlay */}
                      <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 pointer-events-none">
                        <span className="bg-neutral-100/95 dark:bg-neutral-800/95 text-neutral-900 dark:text-neutral-100 font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8.5px] capitalize leading-none shadow-xs border border-neutral-200/50 dark:border-neutral-700/50">
                          {comic.category.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                        </span>
                        {comic.readingRating && (
                          <span className={`font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8.5px] leading-none shadow-xs border ${getReadingRatingStyle(comic.readingRating).bg}`}>
                            {getReadingRatingStyle(comic.readingRating).text}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Meta details */}
                    <div className="space-y-1 p-2.5 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-0.5">
                        {/* Publisher */}
                        <span className="text-[9px] sm:text-[9.5px] font-sans text-neutral-400 dark:text-neutral-500 leading-tight block truncate">
                          {comic.publisherName}
                        </span>

                        {/* Title */}
                        <h4 className={`text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100 ${getReadingRatingStyle(comic.readingRating).hoverClass} transition-colors line-clamp-1 leading-snug`}>
                          {volume.title || comic.title}
                        </h4>

                        {/* Volume under Title */}
                        <div className="text-[9.5px] sm:text-[10px] font-sans font-extrabold text-[#112A12] dark:text-[#457347] leading-tight">
                          Vol.{volume.volNumber}
                        </div>
                        
                        {/* Author */}
                        {(comic.authorStory || comic.authorArt) && (
                          <p className="text-[9.5px] sm:text-[10px] font-sans text-neutral-600 dark:text-neutral-400 leading-tight truncate pt-0.5">
                            {getAuthorNameOnly(comic)}
                          </p>
                        )}

                        {/* Genres tags */}
                        <div className="flex flex-wrap gap-1 items-center pt-0.5">
                          <span className="text-[9px] sm:text-[9.5px] text-neutral-450 dark:text-neutral-550 font-sans line-clamp-1">
                            {comic.genres.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>

                      {/* Divider line */}
                      <div className="border-t border-neutral-100 dark:border-neutral-800 my-1.5" />

                      {/* Price Row */}
                      <div className="flex items-center justify-start font-mono w-full">
                        <span className="font-extrabold text-neutral-950 dark:text-neutral-50 font-sans text-xs shrink-0 leading-none">
                          Rp {volume.price.toLocaleString('id-ID')}
                        </span>
                      </div>


                    </div>
                  </motion.div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full p-12 border border-dashed border-neutral-250 dark:border-neutral-800 text-center rounded-2xl bg-neutral-50/50 dark:bg-[#171717]">
              <AlertCircle className="w-10 h-10 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
              <h4 className="font-bold text-neutral-800 dark:text-neutral-100 font-sans text-sm">Tidak ada database komik yang cocok</h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-normal">Coba gunakan kata kunci lain atau ubah filter format penerbit.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* PAGINATION CONTROLS */}
      {sortedVolumePosts.length > 0 && totalPages > 1 && (
        <div className="pt-8 mt-6 border-t border-neutral-150 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            Halaman <span className="font-bold text-neutral-900 dark:text-neutral-100">{currentPage}</span> dari <span className="font-bold text-neutral-900 dark:text-neutral-100">{totalPages}</span> ({sortedVolumePosts.length} Volume)
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  document.getElementById('catalog-sort-wrapper')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-1">
              {(() => {
                let pages: (number | string)[] = [];
                if (totalPages <= 7) {
                  pages = Array.from({ length: totalPages }, (_, i) => i + 1);
                } else if (currentPage <= 4) {
                  pages = [1, 2, 3, 4, 5, '...', totalPages];
                } else if (currentPage >= totalPages - 3) {
                  pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                } else {
                  pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                }
                return pages.map((p, idx) => {
                  if (typeof p === 'string') {
                    return (
                      <span key={`ellipsis-${idx}`} className="w-6 text-center text-xs text-neutral-400 dark:text-neutral-600 font-mono">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setCurrentPage(p);
                        document.getElementById('catalog-sort-wrapper')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        currentPage === p
                          ? 'bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                          : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {p}
                    </button>
                  );
                });
              })()}
            </div>

            <button
              type="button"
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  document.getElementById('catalog-sort-wrapper')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* SPONSORED ADSENSE BANNER */}
      <div className="w-full mt-8 bg-neutral-50/70 dark:bg-neutral-900/40 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 text-center space-y-1.5 transition-colors shadow-2xs">
        <div className="text-xs font-mono font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1.5">
          <span>📢</span>
          <span>SPONSORED ADSENSE</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed">
          Iklan Google Adsense membantu kelangsungan server database buku Norinoya. Hubungi kami untuk penempatan banner premium.
        </p>
      </div>
        </>
      )}

      {/* Advanced Fullscreen Detailed View */}
      <AnimatePresence>
        {selectedComic && (
          <DetailBuku
            selectedComic={selectedComic}
            activeVolumeNum={activeVolumeNum}
            setActiveVolumeNum={setActiveVolumeNum}
            handleCloseModal={handleCloseModal}
            onNavigateToNews={onNavigateToNews}
            setSelectedGenres={setSelectedGenres}
            setSelectedComic={setSelectedComic}
            allComics={activeComics}
            newsList={newsList}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
