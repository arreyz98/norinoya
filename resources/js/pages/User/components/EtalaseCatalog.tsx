import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShareModal } from './ShareModal';
import DetailKios, { type CatalogItem } from './DetailKios';
import { 
  Search, Filter, Grid, List, Tag, Star, BookOpen, 
  Copy, Check, ChevronDown, ChevronRight, ChevronLeft, ArrowUpDown,
  X, ShoppingCart, ShoppingBag, 
  Sparkles, Clock, Flame, 
  TrendingDown, TrendingUp, ArrowDownAZ, ArrowUpAZ, Layers, Building2, BookText,
  CreditCard, Shirt, Gamepad2, Palette
} from 'lucide-react';


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
          className="flex items-center justify-between w-full h-9 px-3.5 bg-neutral-50/55 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 rounded-lg text-xs md:text-sm text-neutral-850 dark:text-neutral-100 transition-all font-sans font-medium text-left outline-none cursor-pointer"
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

export interface RawKiosItem {
  id: string | number;
  title: string;
  comic_title?: string;
  slug?: string;
  vol_number?: number;
  category?: string;
  merch_type?: string;
  categories?: string[];
  cover_image?: string;
  deskripsi_produk?: string;
  synopsis?: string;
  notes?: string;
  rating?: number | string;
  genres?: string[];
  publisher_name?: string;
  publisher_id?: string;
  status?: string;
  demographic?: string;
  reading_rating?: string;
  author?: string;
  price?: number | string;
  isbn?: string;
  release_date?: string;
  cetakan_info?: string;
  gramedia_url?: string;
  shopee_url?: string;
  tokopedia_url?: string;
  toco_url?: string;
  is_preloved?: boolean | number;
  original_price?: number | string;
  condition_rating?: string;
  is_sold_out?: boolean | number;
  carousel_images?: string[];
  carousel_labels?: string[];
  views_count?: number;
  shopee_clicks_count?: number;
  tokopedia_clicks_count?: number;
  gramedia_clicks_count?: number;
  toco_clicks_count?: number;
  total_clicks_count?: number;
}

interface EtalaseCatalogProps {
  onNavigateToNews?: (newsId: string) => void;
  selectedSaleId?: string | null;
  onClearSelectedSaleId?: () => void;
  dbKiosItems?: RawKiosItem[];
  dbBooksList?: unknown[];
}

export default function EtalaseCatalog({ 
  selectedSaleId,
  onClearSelectedSaleId,
  dbKiosItems = [],
}: EtalaseCatalogProps) {
  const catalogItems = useMemo<CatalogItem[]>(() => {
    const items: CatalogItem[] = [];

    // Murni dari Database KiosItem
    if (dbKiosItems && dbKiosItems.length > 0) {
      dbKiosItems.forEach(dbItem => {
        const categoriesArr = Array.isArray(dbItem.categories) && dbItem.categories.length > 0 
          ? dbItem.categories 
          : [dbItem.category || 'manga'];

        const carouselImgs = Array.isArray(dbItem.carousel_images) && dbItem.carousel_images.length > 0 
          ? dbItem.carousel_images 
          : (dbItem.cover_image ? [dbItem.cover_image] : []);

        const carouselLbls = Array.isArray(dbItem.carousel_labels) && dbItem.carousel_labels.length > 0 
          ? dbItem.carousel_labels 
          : ['Cover Depan', 'Punggung Buku (Spine)', 'Cover Belakang', 'Halaman Kertas'];

        items.push({
          id: String(dbItem.id),
          comicId: `kios-${dbItem.id}`,
          title: dbItem.title,
          comicTitle: dbItem.comic_title || dbItem.title,
          slug: dbItem.slug || String(dbItem.id),
          volNumber: dbItem.vol_number || 1,
          category: dbItem.merch_type || dbItem.category || 'manga',
          merchType: dbItem.merch_type || dbItem.category || 'manga',
          categories: categoriesArr,
          coverImage: dbItem.cover_image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
          synopsis: dbItem.deskripsi_produk || dbItem.synopsis || dbItem.notes || '',
          deskripsi_produk: dbItem.deskripsi_produk || dbItem.synopsis || '',
          rating: Number(dbItem.rating) || 5,
          genres: Array.isArray(dbItem.genres) && dbItem.genres.length > 0 ? dbItem.genres : (categoriesArr.map((c: string) => c.replace('_', ' '))),
          publisherName: dbItem.publisher_name || (dbItem.is_preloved ? 'Preloved @konotasi' : 'Official Partner'),
          publisherId: dbItem.publisher_id || (dbItem.is_preloved ? 'preloved' : 'partner'),
          status: (dbItem.status as 'ongoing' | 'completed') || 'completed',
          demographic: dbItem.demographic || 'General',
          readingRating: dbItem.reading_rating || 'Remaja',
          author: dbItem.author || (dbItem.is_preloved ? '@konotasi.sukasuka' : 'Official'),
          price: Number(dbItem.price) || 0,
          isbn: dbItem.isbn || 'Kios-Item',
          releaseDate: dbItem.release_date || 'Tersedia di Kios',
          cetakanInfo: dbItem.cetakan_info || dbItem.notes || '',
          affiliateLinks: {
            gramedia: dbItem.gramedia_url || '',
            shopee: dbItem.shopee_url || '',
            tokopedia: dbItem.tokopedia_url || '',
            toco: dbItem.toco_url || '',
          },
          isPreloved: Boolean(dbItem.is_preloved),
          originalPrice: dbItem.original_price ? Number(dbItem.original_price) : undefined,
          conditionRating: dbItem.condition_rating || 'S',
          notes: dbItem.notes || '',
          isSoldOut: Boolean(dbItem.is_sold_out),
          carouselImages: carouselImgs,
          carouselLabels: carouselLbls,
          shopeeUrl: dbItem.shopee_url || undefined,
          tokopediaUrl: dbItem.tokopedia_url || undefined,
          tocoUrl: dbItem.toco_url || undefined,
          views_count: dbItem.views_count,
          shopee_clicks_count: dbItem.shopee_clicks_count,
          tokopedia_clicks_count: dbItem.tokopedia_clicks_count,
          gramedia_clicks_count: dbItem.gramedia_clicks_count,
          toco_clicks_count: dbItem.toco_clicks_count,
          total_clicks_count: dbItem.total_clicks_count,
        });
      });
    }

    return items;
  }, [dbKiosItems]);

  // UI state variables
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchInput, setSearchInput] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(['all']);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['all']);
  const [pricePresets, setPricePresets] = useState<string[]>(['all']);
  const [sortBy, setSortBy] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 24;

  const handlePerformSearch = (keywordToSearch?: string) => {
    const raw = (keywordToSearch !== undefined ? keywordToSearch : searchInput).trim();
    setActiveSearchTerm(raw);

    const clean = raw.replace(/\s+/g, ' ').toLowerCase();
    if (clean.length >= 3 && !/(.)\1{3,}/.test(clean) && /[\p{L}\p{N}]/u.test(clean)) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      fetch('/kios/search-log', {
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
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const scrollableContainerRef = React.useRef<HTMLDivElement>(null);

  // Share Modal state
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    title: string;
    shareUrl: string;
    category: string;
  }>({ isOpen: false, title: '', shareUrl: '', category: 'Kios' });

  useEffect(() => {
    if (selectedItem) {
      const targetSlug = selectedItem.slug || selectedItem.id;
      window.history.pushState({ itemId: selectedItem.id }, '', `/kios/${targetSlug}`);
      
      // Scroll to top of window immediately
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollTop = 0;
      }

      // Re-trigger scroll on next ticks to ensure layout changes / unmountings don't restore position
      setTimeout(() => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        if (scrollableContainerRef.current) {
          scrollableContainerRef.current.scrollTop = 0;
        }
      }, 10);

      setTimeout(() => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        if (scrollableContainerRef.current) {
          scrollableContainerRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [selectedItem]);

  // Synchronize deep-linked sale post selections
  useEffect(() => {
    if (selectedSaleId) {
      const item = catalogItems.find(p => p.id === selectedSaleId);
      if (item) {
        setSelectedItem(item);
      }
    }
  }, [selectedSaleId, catalogItems]);

  const handleSelectItem = (item: CatalogItem) => {
    setSelectedItem(item);
    const targetSlug = item.slug || item.id;
    window.history.pushState({ itemId: item.id }, '', `/kios/${targetSlug}`);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    if (onClearSelectedSaleId) {
      onClearSelectedSaleId();
    }
    // Revert browser URL back to /kios cleanly
    if (window.location.pathname.startsWith('/kios/')) {
      window.history.pushState({}, '', '/kios');
    } else if (window.location.hash.startsWith('#/sale/') || window.location.hash.startsWith('#/etalase/')) {
      window.location.hash = '#etalase';
    }
  };

  const sortOptions = [
    { value: 'default', label: 'Terpopuler', icon: Flame },
    { value: 'relevan', label: 'Paling Relevan', icon: Sparkles },
    { value: 'terbaru', label: 'Terbaru', icon: Clock },
    { value: 'price-asc', label: 'Harga Terendah', icon: TrendingDown },
    { value: 'price-desc', label: 'Harga Tertinggi', icon: TrendingUp },
    { value: 'rating-desc', label: 'Rating Teratas', icon: Star },
    { value: 'title-asc', label: 'Abjad A-Z', icon: ArrowDownAZ },
    { value: 'title-desc', label: 'Abjad Z-A', icon: ArrowUpAZ },
    { value: 'vol-asc', label: 'Nomor Volume', icon: Layers }
  ];
  
  // Advanced Dropdown Control State
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!activeDropdown) return;
    const handleClose = () => setActiveDropdown(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [activeDropdown]);

  // Shopping Cart state
  const [cart, setCart] = useState<CatalogItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Extracted lists for filtering
  const categories = useMemo(() => {
    return [
      { value: 'all', label: 'Semua Tipe Merch', icon: Layers },
      { value: 'manga', label: 'Manga / Buku', icon: BookOpen },
      { value: 'light_novel', label: 'Light Novel', icon: BookText },
      { value: 'novel', label: 'Novel', icon: BookText },
      { value: 'trading_card', label: 'Trading Card', icon: CreditCard },
      { value: 'apparel', label: 'Apparel', icon: Shirt },
      { value: 'lifestyle', label: 'Lifestyle', icon: Sparkles },
      { value: 'tas', label: 'Tas', icon: ShoppingBag },
      { value: 'aksesoris', label: 'Aksesoris', icon: Tag },
      { value: 'gaming', label: 'Gaming', icon: Gamepad2 },
      { value: 'dekorasi', label: 'Dekorasi', icon: Palette }
    ];
  }, []);

  const publishers = useMemo(() => {
    const partnerMap = new Map<string, string>();
    catalogItems.forEach(item => {
      if (item.publisherId && item.publisherName) {
        partnerMap.set(item.publisherId, item.publisherName);
      }
    });

    const dynamicPartners = Array.from(partnerMap.entries()).map(([id, name]) => ({
      value: id,
      label: name,
      icon: Building2,
    }));

    return [
      { value: 'all', label: 'Semua Partner', icon: Building2 },
      ...dynamicPartners,
    ];
  }, [catalogItems]);

  // Handle Cart actions
  const addToCart = (item: CatalogItem) => {
    if (cart.some(cItem => cItem.id === item.id)) {
      triggerNotification(`Sudah ada di Keranjang: ${item.title}`);
      return;
    }
    setCart([...cart, item]);
    triggerNotification(`Dimasukkan ke Keranjang: ${item.title}`);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Helper notification trigger
  const triggerNotification = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => {
      setShowNotification(null);
    }, 3000);
  };

  // Clear filters
  const resetFilters = () => {
    setSearchInput('');
    setActiveSearchTerm('');
    setSelectedCategories(['all']);
    setSelectedPublishers(['all']);
    setSelectedGenres(['all']);
    setPricePresets(['all']);
    setSortBy('default');
    setCurrentPage(1);
  };

  // Reset pagination when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearchTerm, selectedCategories, selectedPublishers, selectedGenres, pricePresets, sortBy]);

  // Filter and Sort calculation
  const filteredAndSortedItems = useMemo(() => {
    let result = [...catalogItems];

    // 1. Search text filter
    if (activeSearchTerm.trim() !== '') {
      const query = activeSearchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query) ||
        item.isbn.toLowerCase().includes(query) ||
        item.genres.some(g => g.toLowerCase().includes(query)) ||
        item.publisherName.toLowerCase().includes(query)
      );
    }

    // 2. Category filter
    if (!selectedCategories.includes('all') && selectedCategories.length > 0) {
      result = result.filter(item => {
        const itemCats = item.categories && item.categories.length > 0 ? item.categories : [item.category, item.merchType].filter(Boolean);
        return selectedCategories.some(selectedCat => 
          itemCats.includes(selectedCat) || 
          item.category === selectedCat || 
          item.merchType === selectedCat
        );
      });
    }

    // 3. Publisher filter
    if (!selectedPublishers.includes('all') && selectedPublishers.length > 0) {
      result = result.filter(item => {
        return selectedPublishers.some(pubKey => {
          if (pubKey === 'preloved' && item.isPreloved) return true;
          return item.publisherId === pubKey || 
                 item.publisherName?.toLowerCase().includes(pubKey.toLowerCase());
        });
      });
    }

    // 4. Genre filter
    if (!selectedGenres.includes('all') && selectedGenres.length > 0) {
      result = result.filter(item => item.genres.some(g => selectedGenres.includes(g)));
    }

    // 5. Price Preset filter
    if (!pricePresets.includes('all') && pricePresets.length > 0) {
      const pPreset = pricePresets[0]; // Price is single select underneath
      if (pPreset === 'under-50') {
        result = result.filter(item => item.price < 50000);
      } else if (pPreset === '50-100') {
        result = result.filter(item => item.price >= 50000 && item.price <= 100000);
      } else if (pPreset === 'over-100') {
        result = result.filter(item => item.price > 100000);
      }
    }

    // 6. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'title-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'vol-asc') {
      result.sort((a, b) => a.volNumber - b.volNumber);
    }

    return result;
  }, [catalogItems, activeSearchTerm, selectedCategories, selectedPublishers, selectedGenres, pricePresets, sortBy]);

  // Pagination calculations
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE));
  }, [filteredAndSortedItems, ITEMS_PER_PAGE]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage, ITEMS_PER_PAGE]);

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

  const getReadingRatingHoverClass = (rating?: string, groupPrefix: string = 'group-hover') => {
    switch (rating) {
      case 'Anak & Bimbingan Orang Tua':
      case 'Anak & Bimbingan':
        return `${groupPrefix}:text-[#41a34c] dark:${groupPrefix}:text-emerald-400`;
      case 'Remaja':
        return `${groupPrefix}:text-[#d97706] dark:${groupPrefix}:text-amber-400`;
      case 'Dewasa Ringan':
        return `${groupPrefix}:text-[#ff6628] dark:${groupPrefix}:text-orange-400`;
      case 'Dewasa Berat':
        return `${groupPrefix}:text-[#c1271f] dark:${groupPrefix}:text-red-400`;
      default:
        return `${groupPrefix}:text-[#d97706] dark:${groupPrefix}:text-amber-400`;
    }
  };

  return (
    <div className="space-y-6" id="etalase-catalog-container">
      {!selectedItem && (
        <>
          {/* Top Header Banner Section */}
      <div className="relative text-center py-0 bg-white dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white rounded-2xl overflow-hidden shadow-xs dark:shadow-md border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 transition-all duration-200">
        {/* Abstract Background Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-100 dark:from-neutral-800/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neutral-100 dark:bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />
      
      </div>

      {/* Scroll anchor for pagination */}
      <div id="catalog-top" className="scroll-mt-6" />

      {/* Advanced Anilist style Search Filter Panel - Merged to match Catalogue */}
      <div id="search-filter-panel" className="bg-white dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 p-5 rounded-2xl space-y-4 shadow-3xs">
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <Filter className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 leading-normal">
            Panel Pencarian Tingkat Lanjut (Kios)
          </h3>
        </div>

        {/* Filters Grid */}
        <div className="flex flex-col gap-3.5">
          {/* Main search input, always visible + collapse filters button for mobile */}
          <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-end">
            <div className="flex-1 relative">
              <label className="block text-xs font-mono font-bold uppercase text-neutral-400 mb-1 leading-normal">Cari Kata Kunci</label>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePerformSearch();
                }}
                className="relative select-text flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Ketik judul manga, merch, atau kriteria lainnya lalu tekan Enter..."
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
                    className="w-full pl-9 pr-8 py-1.5 text-sm bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/50 focus:bg-white rounded-lg outline-none h-9 font-sans transition-all focus:border-neutral-950 dark:focus:border-neutral-600 dark:text-neutral-100 leading-normal"
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
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-850'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>{isFiltersExpanded ? 'Sembunyikan Filter' : 'Filter Tipe Merch & Partner'}</span>
              </button>
            </div>
          </div>

          {/* Advanced select dropdowns - always open on desktop, expandable on mobile */}
          <div className={`${isFiltersExpanded ? 'grid' : 'hidden'} md:grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 md:pt-0`}>
            {/* Format (Tipe Merch) */}
            <CustomSelect
              label="Tipe Merch"
              value={selectedCategories}
              options={categories}
              onChange={(val) => setSelectedCategories(val)}
              isOpen={activeDropdown === 'category'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'category' ? null : 'category');
              }}
            />

            {/* Publisher (Partner) */}
            <CustomSelect
              label="Partner"
              value={selectedPublishers}
              options={publishers}
              onChange={(val) => setSelectedPublishers(val)}
              isOpen={activeDropdown === 'publisher'}
              onToggle={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === 'publisher' ? null : 'publisher');
              }}
            />
          </div>
        </div>

        {/* Active Filters Panel (Tag Pills) */}
        {(activeSearchTerm || 
          !selectedCategories.includes('all') || 
          !selectedPublishers.includes('all')) && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-neutral-400 dark:text-neutral-500 mr-2 shrink-0">
              FILTER AKTIF:
            </span>
            
            {/* Render Category tags */}
            {!selectedCategories.includes('all') && selectedCategories.map(cat => {
              const label = cat === 'manga' ? 'Manga / Buku' : cat === 'light_novel' ? 'Light Novel' : 'Novel';
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
              const opt = publishers.find(o => String(o.value) === String(pub));
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
              onClick={resetFilters}
              className="text-[11px] sm:text-xs font-mono font-bold hover:underline hover:text-red-600 text-red-500 ml-auto flex items-center gap-1 cursor-pointer leading-normal pl-2"
            >
              Reset Semua
            </button>
          </div>
        )}
      </div>

      {/* POPULAR MERCH TYPES QUICK SHORTCUTS (Single Row - Horizontal Scrollable) */}
      <div className="bg-white dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 p-4 sm:p-5 rounded-2xl space-y-3 shadow-3xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-sans font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Kategori Merch & Media
          </h3>
          <button
            onClick={() => {
              setSearchInput('');
              setActiveSearchTerm('');
              setSelectedCategories(['all']);
              setSelectedPublishers(['all']);
            }}
            className="text-xs font-sans font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Reset Filter</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Single Scrollable Row */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth py-1 px-1">
          {[
            { id: 'manga', name: 'Manga / Buku', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80' },
            { id: 'light_novel', name: 'Light Novel', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&auto=format&fit=crop&q=80' },
            { id: 'novel', name: 'Novel', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&auto=format&fit=crop&q=80' },
            { id: 'trading_card', name: 'Trading Card', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=80' },
            { id: 'apparel', name: 'Apparel', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80' },
            { id: 'lifestyle', name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=200&auto=format&fit=crop&q=80' },
            { id: 'tas', name: 'Tas', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&auto=format&fit=crop&q=80' },
            { id: 'aksesoris', name: 'Aksesoris', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=200&auto=format&fit=crop&q=80' },
            { id: 'gaming', name: 'Gaming', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80' },
            { id: 'dekorasi', name: 'Dekorasi', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=200&auto=format&fit=crop&q=80' },
          ].map((cat) => {
            const isActive = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategories([cat.id]);
                  setSearchInput('');
                  setActiveSearchTerm('');
                }}
                className="flex flex-col items-center gap-1.5 group cursor-pointer transition-transform hover:scale-105 shrink-0"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 overflow-hidden flex items-center justify-center shadow-xs border transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800/80 border-neutral-200/70 dark:border-neutral-700/70 group-hover:border-emerald-500 dark:group-hover:border-emerald-400'
                }`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className={`text-[11px] sm:text-xs font-sans font-medium text-center whitespace-nowrap transition-colors ${
                  isActive ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PRODUCTS CATALOG SHELF - Now Full Width */}
      <div className="space-y-4">
        
        {/* Top Actions: Search summary, sort selector and view layout toggles */}
        <div className="bg-[#FAFAFA] dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 p-4 rounded-2xl shadow-3xs flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[11px] font-mono font-bold text-neutral-400 dark:text-neutral-500 block uppercase">
              HASIL KURASI BUKU (AFFILIATE)
            </span>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              Menampilkan <strong className="text-neutral-950 dark:text-white font-bold">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredAndSortedItems.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedItems.length)}</strong> dari <strong className="text-neutral-950 dark:text-white font-bold">{filteredAndSortedItems.length}</strong> Post Kios
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Simulasi Keranjang Floating Shortcut inside Toolbar */}
            {cart.length > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-sans font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer animate-pulse shrink-0"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Keranjang</span> ({cart.length})
              </button>
            )}

            {/* Sort selector */}
            <div className="relative select-none" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === 'sort' ? null : 'sort');
                }}
                className="flex items-center gap-2 bg-neutral-50/55 dark:bg-[#121212] border border-neutral-200/70 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-[#262626] hover:border-neutral-300 dark:hover:border-neutral-700 px-3.5 h-9 rounded-lg text-xs font-sans font-bold text-neutral-850 dark:text-neutral-100 transition-all cursor-pointer outline-none"
              >
                {(() => {
                  const currentOpt = sortOptions.find(o => o.value === sortBy);
                  const SortIcon = currentOpt?.icon || ArrowUpDown;
                  return (
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <SortIcon className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                      <span>{currentOpt?.label || 'Terpopuler'}</span>
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
                    className="absolute right-0 top-[calc(100%+4px)] w-48 bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 shadow-[0_12px_32px_rgba(0,0,0,0.08)] rounded-xl py-1.5 z-[100]"
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

            {/* View Layout Toggle */}
            <div className="flex items-center bg-neutral-50/55 dark:bg-[#121212] p-1 rounded-lg border border-neutral-200/70 dark:border-neutral-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-[#262626] text-neutral-950 dark:text-white shadow-2xs border border-neutral-200/50 dark:border-neutral-700/80'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-[#262626] text-neutral-950 dark:text-white shadow-2xs border border-neutral-200/50 dark:border-neutral-700/80'
                    : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Zero Case */}
        {filteredAndSortedItems.length === 0 && (
          <div className="bg-white dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl py-16 px-6 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-950 rounded-full flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h4 className="font-sans font-bold text-sm text-neutral-800 dark:text-neutral-200">
              {catalogItems.length === 0 ? 'Belum Ada Produk Tersedia di Kios' : 'Produk Tidak Ditemukan'}
            </h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              {catalogItems.length === 0
                ? 'Saat ini belum ada produk buku atau merchandise yang terdaftar di etalase kios. Silakan kembali lagi nanti!'
                : 'Kami tidak menemukan produk yang cocok dengan kriteria filter Anda. Silakan reset filter atau cari kata kunci lain.'}
            </p>
            {catalogItems.length > 0 && (
              <button
                onClick={resetFilters}
                className="px-4.5 py-2.5 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer"
              >
                Reset Semua Filter
              </button>
            )}
          </div>
        )}

        {/* GRID VIEW LAYOUT */}
        {viewMode === 'grid' && (
          /* Direct 6-column grid layout for all mixed partner items (matches Katalog layout) */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 animate-fadeIn">
            {paginatedItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                onClick={() => handleSelectItem(item)}
                className="h-full bg-white dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_10px_24px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] relative group select-none"
              >
                {/* Cover Jacket Art */}
                <div className="relative aspect-[3/4] w-full bg-neutral-950 flex flex-col justify-between p-2 sm:p-2.5 select-none overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />

                  {item.isPreloved && item.isSoldOut && (
                    <div className="absolute top-2 right-2 z-20">
                      <span className="bg-neutral-900/90 text-white text-[7.5px] sm:text-[8.5px] font-mono font-black tracking-wider px-1.5 py-0.5 rounded uppercase leading-none shadow-xs">
                        HABIS
                      </span>
                    </div>
                  )}

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-85" />

                  {/* Bottom Quick Category & Age Rating Overlay */}
                  <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 pointer-events-none">
                    <span className="bg-neutral-100/95 dark:bg-neutral-800/95 text-neutral-900 dark:text-neutral-100 font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8.5px] capitalize leading-none shadow-xs border border-neutral-200/50 dark:border-neutral-700/50">
                      {item.category.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                    {item.readingRating && (
                      <span className={`px-1.5 py-0.5 rounded-md font-sans font-extrabold text-[8.5px] shadow-xs border leading-none ${getReadingRatingBadgeStyle(item.readingRating)}`}>
                        {item.readingRating}
                      </span>
                    )}
                  </div>
                </div>

                {/* Meta Details: Publisher Name, Title, Volume, Price */}
                <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between text-left space-y-1.5">
                  <div className="space-y-0.5">
                    <span className="text-[9px] sm:text-[9.5px] font-sans text-neutral-400 dark:text-neutral-500 leading-tight block truncate">
                      {item.publisherName}
                    </span>
                    <h4 className={`text-[10.5px] sm:text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100 ${getReadingRatingHoverClass(item.readingRating)} transition-colors line-clamp-2 leading-snug`}>
                      {item.title}
                    </h4>
                    {item.volNumber && (
                      <div className="text-[9.5px] sm:text-[10px] font-sans font-extrabold text-[#112A12] dark:text-[#457347] leading-tight">
                        Vol.{item.volNumber}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-neutral-100 dark:border-neutral-800 pt-1.5 flex items-center justify-start font-mono w-full">
                    {item.isPreloved && item.originalPrice && (
                      <span className="text-[8.5px] text-neutral-400 line-through leading-none mr-1.5">
                        Rp {item.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                    <span className="font-extrabold text-neutral-950 dark:text-neutral-50 font-sans text-[11px] sm:text-xs shrink-0 leading-none">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* LIST VIEW LAYOUT */}
        {viewMode === 'list' && (
          <div className="space-y-3.5 animate-fadeIn">
            {paginatedItems.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`etalase-item-${item.id}`}
                className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-3.5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center sm:items-start text-left hover:border-neutral-350 dark:hover:border-neutral-700 hover:shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition-all duration-200 group relative"
              >
                {/* Compact Image with Volume info */}
                <div 
                  onClick={() => setSelectedItem(item)}
                  className="w-24 aspect-[3/4] bg-neutral-950 rounded-xl overflow-hidden shrink-0 relative flex items-center justify-center shadow-3xs cursor-pointer select-none"
                >
                  <img 
                    src={item.coverImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-center font-mono text-[9px] text-white font-bold leading-none">
                    Vol {item.volNumber}
                  </div>
                </div>

                {/* Book Metadata and Synopsis */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 text-neutral-850 dark:text-neutral-300 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md leading-none">
                        {item.category.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-550">
                        ISBN: {item.isbn}
                      </span>
                    </div>
                    <h4 
                      onClick={() => handleSelectItem(item)}
                      className="text-base font-sans font-extrabold text-neutral-950 dark:text-neutral-50 hover:text-[#112A12] dark:hover:text-[#112A12] transition-colors cursor-pointer hover:underline"
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-550 dark:text-neutral-450 font-sans">
                      by <strong>{item.author}</strong> • Publisher: <span className="font-semibold">{item.publisherName}</span>
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-450 line-clamp-2 leading-relaxed">
                    {item.synopsis}
                  </p>

                  <div className="flex flex-wrap gap-1 items-center">
                    {item.genres.map(gen => (
                      <span key={gen} className="text-[9.5px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 px-2 py-0.5 rounded-md">
                        {gen}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Store Price list and buy widgets */}
                <div className="w-full sm:w-56 shrink-0 border-t sm:border-t-0 sm:border-l border-neutral-100 dark:border-neutral-800 pt-3.5 sm:pt-0 sm:pl-4 space-y-3 flex flex-col justify-between">
                  <div className="flex sm:flex-col justify-between items-baseline gap-1">
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-550 font-extrabold tracking-wider leading-none">
                      HARGA RESMI BUKU
                    </span>
                    <span className="text-base font-sans font-black text-neutral-950 dark:text-neutral-50 leading-none">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {filteredAndSortedItems.length > 0 && totalPages > 1 && (
          <div className="pt-8 border-t border-neutral-150 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Menampilkan <span className="font-bold text-neutral-900 dark:text-neutral-100">{Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredAndSortedItems.length)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedItems.length)}</span> dari <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredAndSortedItems.length}</span> Post Katalog
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    document.getElementById('catalog-top')?.scrollIntoView({ behavior: 'smooth' });
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
                          document.getElementById('catalog-top')?.scrollIntoView({ behavior: 'smooth' });
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
                    document.getElementById('catalog-top')?.scrollIntoView({ behavior: 'smooth' });
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
      </div>
      </>
      )}

     {/* COMPONENT: DETAILED PRODUCT CATALOG FULLSCREEN VIEW */}
      <AnimatePresence>
        {selectedItem && (
          <DetailKios
            selectedItem={selectedItem}
            catalogItems={catalogItems}
            onClose={handleCloseModal}
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenShareModal={(data) => setShareModalData({ ...data, isOpen: true })}
            onAddToCart={(item) => addToCart(item)}
            triggerNotification={triggerNotification}
          />
        )}
      </AnimatePresence>

      {/* COMPONENT: SHOPPING BASKET SIMULATION SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[130] flex justify-end">
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="relative w-full max-w-md bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col justify-between font-sans z-10"
            >
              {/* Sidebar Header */}
              <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-neutral-50/50 dark:bg-neutral-950/50">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-sans font-bold text-sm uppercase tracking-wide text-neutral-900 dark:text-neutral-50 leading-none">
                      Simulasi Keranjang
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Simpan referensi link affiliate partner kami
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-150 dark:hover:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-950 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Shopping List scroll area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-2.5">
                    <span className="text-3xl block">🛒</span>
                    <h5 className="font-sans font-bold text-sm text-neutral-800 dark:text-neutral-200">Keranjang Simulasi Kosong</h5>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                      Tambahkan volume komik favorit Anda untuk melihat total pesanan dan membandingkan affiliate link sebelum melakukan transaksi orisinal.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="border border-neutral-150 dark:border-neutral-850 p-3 rounded-xl flex items-start gap-3 relative hover:border-neutral-250 transition-all bg-white dark:bg-neutral-950 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                    >
                      {/* Thumbnail mini cover */}
                      <div className="w-12 h-16 bg-neutral-900 rounded-lg overflow-hidden shrink-0 border border-neutral-100 dark:border-neutral-850">
                        <img 
                          src={item.coverImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info fields */}
                      <div className="flex-1 min-w-0 space-y-1 text-left">
                        <h5 className="font-sans font-bold text-xs text-neutral-950 dark:text-neutral-100 line-clamp-1">
                          {item.title}
                        </h5>
                        <p className="text-[10px] text-neutral-500 font-mono truncate leading-none">
                          Rp {item.price.toLocaleString('id-ID')} • ISBN: {item.isbn}
                        </p>

                        {/* Quick Partner Links */}
                        <div className="flex gap-1.5 pt-0.5">
                          <a
                            href={item.affiliateLinks.gramedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-sans font-black text-blue-600 hover:underline"
                          >
                            Gramedia
                          </a>
                          <span className="text-neutral-200 text-[9px]">•</span>
                          <a
                            href={item.affiliateLinks.shopee}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-sans font-black text-orange-600 hover:underline"
                          >
                            Shopee
                          </a>
                          <span className="text-neutral-200 text-[9px]">•</span>
                          <a
                            href={item.affiliateLinks.tokopedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] font-sans font-black text-emerald-600 hover:underline"
                          >
                            Tokopedia
                          </a>
                        </div>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-red-650 flex items-center justify-center shrink-0 cursor-pointer"
                        title="Hapus Buku"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Calculation and Actions */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-neutral-100 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-4">
                  {/* Calculations */}
                  <div className="space-y-1.5 font-sans">
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Jumlah Buku</span>
                      <span className="font-mono">{cart.length} pcs</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Estimasi Ongkir</span>
                      <span className="font-mono text-emerald-600 font-bold">Variasi per Toko</span>
                    </div>
                    <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 my-1" />
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-neutral-850 dark:text-neutral-200">Total Harga Buku</span>
                      <span className="text-lg font-black text-neutral-950 dark:text-neutral-50 font-sans">
                        Rp {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Actions */}
                  <div className="space-y-2">
                    {/* Copy entire shopping summary to text */}
                    <button
                      onClick={() => {
                        const totalStr = cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('id-ID');
                        const booksList = cart.map((item, idx) => 
                          `${idx + 1}. *${item.title}* (Rp ${item.price.toLocaleString('id-ID')})\n` +
                          `   🛒 Beli: ${item.affiliateLinks.gramedia}`
                        ).join('\n');

                        const copyText = `📝 *SIMULASI DAFTAR BELANJA BUKU RESMI*\n\n` +
                          `${booksList}\n\n` +
                          `💵 *TOTAL HARGA ESTIMASI:* Rp ${totalStr}\n\n` +
                          `Dibuat via *Norinoya Kios Affiliate*. Stop buku bajakan, dukung kreator orisinal dengan beli resmi di Gramedia, Shopee, dan Tokopedia partner!`;

                        navigator.clipboard.writeText(copyText);
                        triggerNotification(`Daftar seluruh belanjaan berhasil disalin ke clipboard!`);
                      }}
                      className="w-full h-10 bg-neutral-950 hover:bg-neutral-850 text-white dark:bg-white dark:text-neutral-950 rounded-xl text-xs font-sans font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Salin Semua Daftar Belanja</span>
                    </button>

                    <button
                      onClick={() => {
                        setCart([]);
                        triggerNotification("Simulasi Keranjang telah dibersihkan.");
                        setIsCartOpen(false);
                      }}
                      className="w-full py-2 hover:bg-neutral-100 rounded-lg text-xs font-mono font-bold text-neutral-400 hover:text-red-500 transition-colors cursor-pointer bg-transparent border-0"
                    >
                      Bersihkan Keranjang
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL TOAST NOTIFICATION POPUP */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[140] bg-neutral-950 text-white border border-neutral-800 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-sans"
          >
            <span className="text-xs">📢</span>
            <span className="text-xs font-bold leading-none">{showNotification}</span>
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
