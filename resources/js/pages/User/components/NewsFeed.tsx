import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DetailNews from './DetailNews';
import NewsCategorySidebar from './NewsCategorySidebar';
import NewsRightSidebar from './NewsRightSidebar';
import NewsPostCard from './NewsPostCard';
import { ShareModal } from './ShareModal';
import { 
  Tag, Sparkles, CheckCircle2, Globe, 
  Newspaper, AlertCircle, RefreshCw, Calendar,
  BookOpen, BookMarked, BookText, Ticket, Mic, Tv, Gamepad2, ChevronUp, X, Plus
} from 'lucide-react';
import { COMICS_DATA, PRE_OWNED_ITEMS } from '../../../types/mockData';
import { NewsUpdate, Comic, Volume } from '../../../types/demo';
import { RawKiosItem } from './EtalaseCatalog';
import { VideoShortItem } from '../home';



const ToriiGate: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 4.5c5-1.5 15-1.5 20 0" />
    <path d="M3.5 7h17" />
    <path d="M2 11h20" />
    <path d="M12 7v4" />
    <path d="M7 7v14" />
    <path d="M17 7v14" />
  </svg>
);

const CATEGORY_ITEMS = [
  { id: 'all', label: 'Terbaru', icon: Globe, countKey: 'all', activeColor: 'bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900' },
  { id: 'weekly_recap', label: 'Weekly Recap', icon: Calendar, badge: '7 Hari', activeColor: 'bg-indigo-600 text-white' },
  { id: 'cetakan_ulang', label: 'Cetak Ulang', icon: RefreshCw, countKey: 'cetakan_ulang', activeColor: 'bg-[#112A12] text-white', hasTopDivider: true },
  { id: 'edukasi', label: 'Review', icon: Sparkles, countKey: 'edukasi', activeColor: 'bg-[#DA6B1C] text-white' },
  { id: 'promo', label: 'Promo', icon: Tag, countKey: 'promo', activeColor: 'bg-[#DA6B1C] text-white' },
  { id: 'rilisan', label: 'Rilisan', icon: Newspaper, countKey: 'rilisan', activeColor: 'bg-emerald-600 text-white' },
  { id: 'anime', label: 'Anime', icon: Tv, countKey: 'anime', activeColor: 'bg-red-600 text-white', hasTopDivider: true },
  { id: 'event', label: 'Event', icon: Ticket, countKey: 'event', activeColor: 'bg-purple-600 text-white' },
  { id: 'game', label: 'Game', icon: Gamepad2, countKey: 'game', activeColor: 'bg-cyan-600 text-white' },
  { id: 'jepang', label: 'Jepang', icon: ToriiGate, countKey: 'jepang', activeColor: 'bg-[#DA6B1C] text-white' },
  { id: 'komunitas', label: 'Komunitas', icon: Mic, countKey: 'komunitas', activeColor: 'bg-teal-600 text-white' },
  { id: 'light_novel', label: 'Light Novel', icon: BookMarked, countKey: 'light_novel', activeColor: 'bg-[#DA6B1C] text-white' },
  { id: 'manga', label: 'Manga', icon: BookOpen, countKey: 'manga', activeColor: 'bg-emerald-600 text-white' },
  { id: 'novel', label: 'Novel', icon: BookText, countKey: 'novel', activeColor: 'bg-blue-600 text-white' },
];

const TRENDING_TOPICS = [
  { id: 'trend-1', tag: '#EdukasiManga', count: '1.2K Posts', title: 'Kenapa kertas komik jadul gampang menguning?' },
  { id: 'trend-2', tag: '#Frieren', count: '842 Posts', title: 'Rencana cetak ulang premium volume 1 & 2' },
  { id: 'trend-3', tag: '#RilisanBaru', count: '531 Posts', title: 'Spy x Family Vol 11 terbit minggu ini' },
  { id: 'trend-4', tag: '#KomikPreOwned', count: '412 Posts', title: 'Stok bekas review mulus langsung ludes' },
  { id: 'trend-5', tag: '#GramediaAffiliate', count: '304 Posts', title: 'Voucher cashback belanja komik akhir bulan' },
];

interface PollOption {
  id: string;
  label: string;
  votes: number;
}

interface Poll {
  question: string;
  options: PollOption[];
}

interface QuickReaction {
  id: string;
  emoji: string;
  label: string;
  count: number;
}

// Initial polls associated with news updates
const INITIAL_POLLS: Record<string, Poll> = {
  'news-1': {
    question: 'Apakah kamu akan "double-buy" (beli lagi) Frieren versi kertas premium baru ini?',
    options: [
      { id: 'opt-1-1', label: 'Ya! Demi kerapihan rak buku & koleksi jangka panjang', votes: 142 },
      { id: 'opt-1-2', label: 'Ragu, mungkin jual edisi lama dulu di Konotasi Store', votes: 58 },
      { id: 'opt-1-3', label: 'Tidak, baca sekali saja edisi lama sudah cukup', votes: 89 },
    ]
  },
  'news-2': {
    question: 'Mana yang mau kamu amankan lebih dulu minggu ini?',
    options: [
      { id: 'opt-2-1', label: 'Spy x Family Vol 11 (Anya & Bond!)', votes: 215 },
      { id: 'opt-2-2', label: 'Blue Lock Vol 15 Reguler', votes: 110 },
      { id: 'opt-2-3', label: 'Dua-duanya dong, dompet siap tiris', votes: 184 },
    ]
  },
  'news-3': {
    question: 'Menurutmu, idealnya harga komik premium di Indonesia berkisar berapa?',
    options: [
      { id: 'opt-3-1', label: 'Rp 35.000 - Rp 40.000 (Standar pas di dompet)', votes: 312 },
      { id: 'opt-3-2', label: 'Rp 45.000 - Rp 50.000 (Asal bookpaper mulus & tebal)', votes: 245 },
      { id: 'opt-3-3', label: 'Lebih dari Rp 80.000 (Khusus Hardcover/Bindup premium)', votes: 93 },
    ]
  },
  'news-4': {
    question: 'Seberapa sering kamu berburu komik seken bekas ulasan?',
    options: [
      { id: 'opt-4-1', label: 'Sering banget, cari diskon rilis mulus', votes: 76 },
      { id: 'opt-4-2', label: 'Jarang, lebih suka bau buku baru bersegel', votes: 154 },
      { id: 'opt-4-3', label: 'Kalo ada judul incaran terbitan premium aja sih', votes: 98 },
    ]
  }
};

const INITIAL_REACTIONS: Record<string, QuickReaction[]> = {
  'news-1': [
    { id: 'fire', emoji: '🔥', label: 'Hype!', count: 48 },
    { id: 'heart', emoji: '😍', label: 'Mau Banget', count: 32 },
    { id: 'sad', emoji: '😭', label: 'Dompet Menangis', count: 19 },
    { id: 'party', emoji: '🎉', label: 'Akhirnya!', count: 41 }
  ],
  'news-2': [
    { id: 'fire', emoji: '🔥', label: 'Gas Beli', count: 28 },
    { id: 'heart', emoji: '❤️', label: 'Suka', count: 44 },
    { id: 'thinking', emoji: '🤔', label: 'Mikir Dulu', count: 12 },
    { id: 'cute', emoji: '🌸', label: 'Anya Imut', count: 52 }
  ],
  'news-3': [
    { id: 'mind_blown', emoji: '🤯', label: 'Baru Tahu', count: 85 },
    { id: 'glasses', emoji: '🤓', label: 'Edukatiiif', count: 104 },
    { id: 'thumbs_up', emoji: '👍', label: 'Sangat Setuju', count: 62 },
    { id: 'save', emoji: '💾', label: 'Simpan Info', count: 41 }
  ],
  'news-4': [
    { id: 'shock', emoji: '😮', label: 'Murah Banget', count: 19 },
    { id: 'cart', emoji: '🛒', label: 'Siap Checkout', count: 25 },
    { id: 'cry', emoji: '🥺', label: 'Ketinggalan', count: 14 },
    { id: 'smile', emoji: '😊', label: 'Pantau Terus', count: 30 }
  ]
};

interface NewsFeedProps {
  dbNewsList?: unknown[];
  dbBooksList?: unknown[];
  dbKiosList?: unknown[];
  selectedNewsId?: string | null;
  setSelectedNewsId?: (id: string | null) => void;
  onNavigateToCatalog?: () => void;
  onNavigateToComic?: (comicId: string) => void;
  onSelectShort?: (short: VideoShortItem) => void;
}

export default function NewsFeed({ dbNewsList = [], dbBooksList = [], dbKiosList = [], selectedNewsId, setSelectedNewsId, onNavigateToCatalog, onNavigateToComic, onSelectShort }: NewsFeedProps = {}) {
  const newsFeedData: NewsUpdate[] = useMemo(() => {
    if (dbNewsList && dbNewsList.length > 0) {
      return (dbNewsList as Array<Record<string, unknown>>).map((dbItem) => ({
        id: String(dbItem.id),
        username: (dbItem.username as string) || 'norinoya_official',
        displayName: (dbItem.display_name as string) || 'Norinoya Official',
        timestamp: dbItem.created_at ? new Date(dbItem.created_at as string).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Baru saja',
        title: dbItem.title as string,
        content: (dbItem.content as string) || '',
        category: ((dbItem.category as string) || 'rilisan') as NewsUpdate['category'],
        hashTags: (dbItem.hash_tags as string[]) || [],
        attachedImage: (dbItem.attached_image as string) || undefined,
        galleryImages: (dbItem.gallery_images as string[]) || (dbItem.attached_image ? [dbItem.attached_image as string] : undefined),
        readingRating: (dbItem.reading_rating as NewsUpdate['readingRating']) || 'Dewasa Ringan',
        isPinned: !!dbItem.is_pinned,
        recommendations: (dbItem.recommendations as NewsUpdate['recommendations']) || undefined,
        relevant_books: (dbItem.relevant_books as Array<number | string>) || undefined,
        poll_question: (dbItem.poll_question as string) || undefined,
        poll_options: (dbItem.poll_options as NewsUpdate['poll_options']) || undefined,
        reactions: (dbItem.reactions as NewsUpdate['reactions']) || undefined,
      }));
    }
    return [];
  }, [dbNewsList]);
  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      if (catParam) {
        return [catParam.toLowerCase()];
      }
    }
    return ['all'];
  });
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<boolean>(false);

  // Sync category from URL if changes
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get('category');
      if (catParam) {
        setSelectedCategories([catParam.toLowerCase()]);
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  // Scroll listener: detect scroll past ~2 posts (scrollY > 750) and auto-minimize past ~5 posts (scrollY > 1800)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 250 && leftSidebarRef.current && leftSidebarRef.current.scrollTop > 0) {
        leftSidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (y > 750) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsCategoryExpanded(false);
      }

      // Auto-minimize when scrolled deep (past ~5 news posts)
      if (y > 1800) {
        setIsCategoryExpanded(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const leftSidebarRef = useRef<HTMLDivElement>(null);

  const scrollToFeedTop = () => {
    if (leftSidebarRef.current) {
      leftSidebarRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const el = document.getElementById('norinoya-news-hub');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleCategory = (catId: string, isSingleSelect = false) => {
    if (isSingleSelect || catId === 'all') {
      setSelectedCategories([catId]);
    } else {
      setSelectedCategories(prev => {
        const withoutAll = prev.filter(c => c !== 'all');
        if (withoutAll.includes(catId)) {
          const next = withoutAll.filter(c => c !== catId);
          return next.length === 0 ? ['all'] : next;
        } else {
          return [...withoutAll, catId];
        }
      });
    }
    setTimeout(() => {
      const hubElement = document.getElementById('norinoya-news-hub');
      if (hubElement) {
        const yOffset = -70;
        const y = hubElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }, 20);
  };
  
  const [localSelectedPost, setLocalSelectedPost] = useState<NewsUpdate | null>(null);
  
  const initialPollsState = useMemo<Record<string, Poll>>(() => {
    const pMap: Record<string, Poll> = { ...INITIAL_POLLS };
    if (dbNewsList && dbNewsList.length > 0) {
      (dbNewsList as Array<Record<string, unknown>>).forEach((item) => {
        if (item.poll_question && Array.isArray(item.poll_options) && item.poll_options.length > 0) {
          pMap[String(item.id)] = {
            question: item.poll_question as string,
            options: (item.poll_options as Array<{ id?: string; label?: string; votes?: number }>).map((opt, idx: number) => ({
              id: opt.id || `opt-${item.id}-${idx + 1}`,
              label: opt.label || '',
              votes: Number(opt.votes) || 0,
            })),
          };
        }
      });
    }
    return pMap;
  }, [dbNewsList]);

  const initialReactionsState = useMemo<Record<string, QuickReaction[]>>(() => {
    const rMap: Record<string, QuickReaction[]> = { ...INITIAL_REACTIONS };
    if (dbNewsList && dbNewsList.length > 0) {
      (dbNewsList as Array<Record<string, unknown>>).forEach((item) => {
        if (Array.isArray(item.reactions) && item.reactions.length > 0) {
          rMap[String(item.id)] = (item.reactions as Array<{ id?: string; emoji?: string; label?: string; count?: number }>).map((r, idx: number) => ({
            id: r.id || `react-${idx}`,
            emoji: r.emoji || '👍',
            label: r.label || '',
            count: Number(r.count) || 0,
          }));
        } else {
          rMap[String(item.id)] = [
            { id: 'fire', emoji: '🔥', label: 'Hype', count: 24 },
            { id: 'heart', emoji: '❤️', label: 'Suka', count: 48 },
            { id: 'thinking', emoji: '🤔', label: 'Menarik', count: 12 },
            { id: 'party', emoji: '🎉', label: 'Keren', count: 35 },
          ];
        }
      });
    }
    return rMap;
  }, [dbNewsList]);

  const [polls, setPolls] = useState<Record<string, Poll>>(initialPollsState);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [reactions, setReactions] = useState<Record<string, QuickReaction[]>>(initialReactionsState);
  const [userReactions, setUserReactions] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    setPolls(prev => ({ ...initialPollsState, ...prev }));
    setReactions(prev => ({ ...initialReactionsState, ...prev }));
  }, [initialPollsState, initialReactionsState]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);
  const [shareModalData, setShareModalData] = useState<{
    isOpen: boolean;
    title: string;
    shareUrl: string;
    category?: string;
  }>({
    isOpen: false,
    title: '',
    shareUrl: '',
    category: '',
  });

  const openLightbox = (e: React.MouseEvent, images: string[], index: number = 0) => {
    e.stopPropagation();
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const renderImageGallery = (post: NewsUpdate, isDetail = false) => {
    const images = (post.galleryImages && post.galleryImages.length > 0)
      ? post.galleryImages
      : (post.attachedImage ? [post.attachedImage] : []);

    if (!images || images.length === 0) return null;

    if (images.length === 1) {
      return (
        <div 
          onClick={(e) => openLightbox(e, images, 0)}
          className="relative w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-xs group/img cursor-pointer"
        >
          <img
            src={images[0]}
            alt="Foto Berita Norinoya"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80';
            }}
            className="w-full h-auto object-contain max-h-[500px] hover:scale-[1.01] transition-transform duration-300"
          />
          {isDetail && post.hashTags && post.hashTags.length > 0 && (
            <div className="absolute bottom-3 right-3 flex gap-1.5 flex-wrap">
              {post.hashTags.map((tag, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase bg-neutral-900/80 text-neutral-100 border border-neutral-700/60 shadow-xs">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative w-full rounded-xl overflow-hidden shadow-xs border border-neutral-200 dark:border-neutral-800">
        <div className={`grid gap-1 bg-neutral-950 ${images.length === 2 ? 'grid-cols-2 aspect-[16/10]' : images.length === 3 ? 'grid-cols-2 aspect-[16/10]' : 'grid-cols-2 aspect-square sm:aspect-[16/10]'}`}>
          {images.slice(0, 4).map((imgUrl, idx) => {
            const isThirdInThree = images.length === 3 && idx === 2;
            const isFourthAndExtra = idx === 3 && images.length > 4;
            const extraCount = images.length - 4;

            return (
              <div 
                key={idx}
                onClick={(e) => openLightbox(e, images, idx)}
                className={`relative overflow-hidden cursor-pointer group/img bg-neutral-900 ${isThirdInThree ? 'col-span-2' : ''}`}
              >
                <img
                  src={imgUrl}
                  alt={`Galeri foto berita ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                />
                {isFourthAndExtra && (
                  <div className="absolute inset-0 bg-neutral-900/75 backdrop-blur-2xs flex items-center justify-center text-white font-mono font-extrabold text-base sm:text-lg">
                    +{extraCount} Foto
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isDetail && post.hashTags && post.hashTags.length > 0 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5 flex-wrap z-10">
            {post.hashTags.map((tag, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase bg-neutral-900/85 text-neutral-100 border border-neutral-700/60 shadow-xs backdrop-blur-xs">
                #{tag.replace(/^#/, '')}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const [flyingReactions, setFlyingReactions] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const reactionIdCounterRef = useRef(0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activePost = useMemo(() => {
    if (selectedNewsId !== undefined) {
      if (selectedNewsId === null) return null;
      return newsFeedData.find(post => post.id === selectedNewsId) || null;
    }
    return localSelectedPost;
  }, [selectedNewsId, localSelectedPost, newsFeedData]);

  useEffect(() => {
    if (activePost) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePost]);

  const relevantCatalogItems = useMemo(() => {
    if (!activePost) return [];

    const typedBooksList = (dbBooksList || []) as Array<Record<string, unknown>>;
    if (activePost.relevant_books && activePost.relevant_books.length > 0 && typedBooksList.length > 0) {
      const dbMatches = activePost.relevant_books.map((bId) => {
        const book = typedBooksList.find(b => String(b.id) === String(bId));
        if (!book) return null;

        const comicId = book.series_id 
          ? `series-${book.series_id}-vol-${book.volume}`
          : `book-${book.id}`;

        const bookImages = book.images as Array<{ image_url?: string; file_path?: string }> | undefined;
        const coverImg = (bookImages && bookImages.length > 0)
          ? (bookImages[0].image_url || bookImages[0].file_path)
          : 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80';

        const ageRatingObj = book.age_rating as { name?: string } | string | undefined;
        const ageRatingName = typeof ageRatingObj === 'object' ? ageRatingObj?.name : ageRatingObj;
        const publisherObj = book.publisher as { name?: string } | undefined;
        const genresArr = book.genres as Array<{ name?: string } | string> | undefined;

        const comic: Comic = {
          id: comicId,
          title: (book.title as string) || 'Judul Buku',
          slug: (book.slug as string) || String(book.id),
          coverImage: coverImg || '',
          rating: 9.0,
          status: 'ongoing',
          readingRating: (ageRatingName as Comic['readingRating']) || 'Dewasa Ringan',
          originalPublisher: publisherObj?.name || 'Penerbit Resmi',
          publisherId: 'pub-default',
          publisherName: publisherObj?.name || 'Penerbit Resmi',
          genres: genresArr ? genresArr.map(g => (typeof g === 'object' ? g?.name || '' : String(g))) : ['Manga'],
          demographic: 'General',
          category: ((book.book_type as string) || 'manga') as Comic['category'],
          totalVolumesKnown: `${book.volume || 1} Volume`,
          firstPublishedInId: '2024',
          volumes: [],
          authorStory: (book.author as string) || 'Kreator',
          authorArt: (book.author as string) || 'Kreator',
          synopsis: (book.synopsis as string) || '',
        };

        const vol: Volume = {
          volNumber: Number(book.volume) || 1,
          coverImage: coverImg || '',
          price: book.msrp ? Number(book.msrp) : 45000,
          releaseDate: (book.created_at as string) || '2024',
          cetakanInfo: 'Cetakan I (Resmi)',
          affiliateLinks: {
            gramedia: '',
            shopee: '',
            tokopedia: '',
          },
        };

        return { comic, vol, score: 100 };
      }).filter(Boolean);

      if (dbMatches.length > 0) {
        return dbMatches as Array<{ comic: Comic; vol: Volume; score: number }>;
      }
    }
    
    const postText = (activePost.title + ' ' + activePost.content + ' ' + (activePost.hashTags || []).join(' ')).toLowerCase();

    const scoredVolumes: Array<{
      comic: typeof COMICS_DATA[0];
      vol: typeof COMICS_DATA[0]['volumes'][0];
      score: number;
    }> = [];

    COMICS_DATA.forEach(comic => {
      let comicScore = 0;
      const titleLower = comic.title.toLowerCase();

      if (postText.includes(titleLower)) comicScore += 60;
      const words = titleLower.split(' ').filter(w => w.length > 3);
      words.forEach(w => {
        if (postText.includes(w)) comicScore += 20;
      });

      if (comic.category && postText.includes(comic.category.toLowerCase())) {
        comicScore += 10;
      }

      if (comic.publisherName && postText.includes(comic.publisherName.toLowerCase())) {
        comicScore += 15;
      }

      if (comic.authorStory && postText.includes(comic.authorStory.toLowerCase())) {
        comicScore += 25;
      }

      if (comic.genres) {
        comic.genres.forEach(g => {
          if (postText.includes(g.toLowerCase())) comicScore += 5;
        });
      }

      comic.volumes.forEach(vol => {
        let volScore = comicScore;
        if (postText.includes(`vol ${vol.volNumber}`) || postText.includes(`vol. ${vol.volNumber}`)) {
          volScore += 30;
        }
        scoredVolumes.push({ comic, vol, score: volScore });
      });
    });

    scoredVolumes.sort((a, b) => b.score - a.score);

    return scoredVolumes.slice(0, 4);
  }, [activePost, dbBooksList]);

  const relevantKiosItems = useMemo<RawKiosItem[]>(() => {
    if (!activePost) return [];
    const postText = (activePost.title + ' ' + activePost.content + ' ' + (activePost.hashTags || []).join(' ')).toLowerCase();

    const typedKiosList = (dbKiosList || []) as Array<Record<string, unknown>>;
    if (typedKiosList.length > 0) {
      const scoredDbItems = typedKiosList.map(item => {
        let score = 0;
        const itemTitle = String(item.title || item.comic_title || '').toLowerCase();
        const itemCat = String(item.category || '').toLowerCase();

        if (activePost.relevant_books && item.linked_book_id && activePost.relevant_books.includes(String(item.linked_book_id))) {
          score += 150;
        }

        if (itemTitle) {
          const words = itemTitle.split(' ').filter(w => w.length > 3);
          words.forEach(w => {
            if (postText.includes(w)) score += 30;
          });
          if (postText.includes(itemTitle)) score += 100;
        }

        if (itemCat && postText.includes(itemCat)) {
          score += 20;
        }

        return { item, score };
      });

      scoredDbItems.sort((a, b) => b.score - a.score);

      const mapped: RawKiosItem[] = scoredDbItems.map(({ item }) => {
        const carouselImgs = item.carousel_images as string[] | undefined;
        const linkedBook = item.linked_book as { images?: Array<{ image_url?: string; file_path?: string }> } | undefined;
        const cover = (item.cover_image as string) 
          || (carouselImgs && carouselImgs.length > 0 ? carouselImgs[0] : null)
          || (linkedBook?.images && linkedBook.images.length > 0 ? (linkedBook.images[0].image_url || linkedBook.images[0].file_path) : null)
          || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80';

        const partnerObj = item.kios_partner as { name?: string } | undefined;

        return {
          id: item.id as string | number,
          title: (item.comic_title as string) || (item.title as string) || 'Komik Pilihan',
          slug: (item.slug as string) || String(item.id),
          comic_title: (item.comic_title as string) || (item.title as string) || 'Komik Pilihan',
          vol_number: (item.vol_number as number) || 1,
          condition_rating: (item.condition_rating as string) || (item.is_preloved ? '9.0/10' : 'Baru Segel'),
          notes: (item.deskripsi_produk as string) || (item.notes as string) || 'Produk komik & merchandise resmi pilihan kolektor.',
          price: Number(item.price) || 45000,
          original_price: Number(item.original_price) || (Number(item.price) ? Number(item.price) + 15000 : 60000),
          cover_image: cover || '',
          shopee_url: (item.shopee_url as string) || '',
          tokopedia_url: (item.tokopedia_url as string) || '',
          gramedia_url: (item.gramedia_url as string) || '',
          toco_url: (item.toco_url as string) || '',
          kios_partner: partnerObj ? { name: partnerObj.name || 'Konotasi Store' } : { name: 'Konotasi Store' },
        };
      });

      const filtered = mapped.filter((_, idx) => scoredDbItems[idx].score > 0);
      if (filtered.length > 0) {
        return filtered.slice(0, 3);
      }
      return mapped.slice(0, 3);
    }

    const matched = PRE_OWNED_ITEMS.filter(item => {
      const titleLower = item.comicTitle.toLowerCase();
      const notesLower = item.notes.toLowerCase();

      if (postText.includes('frieren') && titleLower.includes('frieren')) return true;
      if (postText.includes('naruto') && titleLower.includes('naruto')) return true;
      if (postText.includes('solo') && titleLower.includes('solo')) return true;
      if (postText.includes('spy') && titleLower.includes('spy')) return true;

      return titleLower.split(' ').some(w => w.length > 3 && postText.includes(w)) || notesLower.includes(postText);
    });

    const fallbackList = matched.length > 0 ? matched.slice(0, 2) : PRE_OWNED_ITEMS.slice(0, 2);

    return fallbackList.map(item => ({
      id: item.id,
      title: item.comicTitle,
      slug: (item as unknown as { slug?: string }).slug || item.id,
      comic_title: item.comicTitle,
      vol_number: item.volumeNumber,
      condition_rating: item.conditionRating,
      notes: item.notes,
      price: item.salePrice,
      original_price: item.originalPrice,
      cover_image: item.coverImage || '',
      shopee_url: item.shopeeUrl || '',
      tokopedia_url: item.tokopediaUrl || '',
      gramedia_url: '',
      toco_url: '',
      kios_partner: { name: 'Konotasi Store' },
    }));
  }, [activePost, dbKiosList]);

  const selectPost = (post: NewsUpdate | null) => {
    if (setSelectedNewsId) {
      setSelectedNewsId(post ? post.id : null);
    } else {
      setLocalSelectedPost(post);
    }
    
    if (post) {
      const targetSlug = post.slug || post.id;
      window.history.pushState({ newsId: post.id }, '', `/news/${targetSlug}`);
    } else {
      if (window.location.pathname.startsWith('/news/')) {
        window.history.pushState({}, '', '/news');
      }
    }
  };

  // Share post with social popup & copy link
  const handleSharePost = (post: NewsUpdate, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = `${window.location.origin}/news/${post.slug || post.id}`;
    
    setShareModalData({
      isOpen: true,
      title: post.title || 'Berita Norinoya',
      shareUrl,
      category: 'Berita'
    });
  };

  // Interactive Poll Voting
  const handleVote = (postId: string, optionId: string) => {
    if (userVotes[postId]) {
      triggerToast('⚠️ Anda sudah memberikan suara pada poling ini!');
      return;
    }

    setUserVotes(prev => ({ ...prev, [postId]: optionId }));
    setPolls(prevPolls => {
      const currentPoll = prevPolls[postId];
      if (!currentPoll) return prevPolls;

      const updatedOptions = currentPoll.options.map(opt => {
        if (opt.id === optionId) {
          return { ...opt, votes: opt.votes + 1 };
        }
        return opt;
      });

      return {
        ...prevPolls,
        [postId]: {
          ...currentPoll,
          options: updatedOptions
        }
      };
    });

    triggerToast('🗳️ Terima kasih! Suara Anda telah disimpan.');
  };

  // Quick Emoji Reactions
  const handleQuickReaction = (postId: string, reactionId: string, emoji: string) => {
    const isAlreadyReacted = userReactions[postId]?.[reactionId];

    setUserReactions(prev => {
      const userPostReactions = prev[postId] || {};
      return {
        ...prev,
        [postId]: {
          ...userPostReactions,
          [reactionId]: !isAlreadyReacted
        }
      };
    });

    setReactions(prevReactions => {
      const postReactionsList = prevReactions[postId] || [];
      const updatedList = postReactionsList.map(react => {
        if (react.id === reactionId) {
          return {
            ...react,
            count: react.count + (isAlreadyReacted ? -1 : 1)
          };
        }
        return react;
      });
      return {
        ...prevReactions,
        [postId]: updatedList
      };
    });

    // Trigger visual floating particle effect
    if (!isAlreadyReacted) {
      const id = reactionIdCounterRef.current++;
      const x = Math.random() * 200 - 100; // random width drift
      const y = -100 - Math.random() * 100;
      setFlyingReactions(prev => [...prev, { id, emoji, x, y }]);
      setTimeout(() => {
        setFlyingReactions(prev => prev.filter(f => f.id !== id));
      }, 1500);
    }
  };

  // Newsletter Mock Subscription
  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsNewsletterSubscribed(true);
    setNewsletterEmail('');
    triggerToast('📧 Berhasil berlangganan buletin komik Norinoya!');
  };

  // Count of posts published today
  const todayPostsCount = useMemo(() => {
    return newsFeedData.filter(post => {
      const ts = post.timestamp.toLowerCase();
      return (
        ts.includes('just now') || 
        ts.includes('now') || 
        ts.includes('hour') || 
        ts.includes('jam') || 
        ts.includes('min') || 
        ts.includes('menit') || 
        ts.includes('sekarang')
      ) && !ts.includes('day') && !ts.includes('hari') && !ts.includes('minggu') && !ts.includes('bulan');
    }).length;
  }, [newsFeedData]);

  // Filter & Search Logic
  const filteredPosts = useMemo(() => {
    return newsFeedData.filter(post => {
      // Category filter (match any of the selected categories)
      if (!selectedCategories.includes('all')) {
        const matchesCategory = selectedCategories.some(cat => {
          if (cat === 'weekly_recap') {
            const ts = post.timestamp.toLowerCase();
            return ts.includes('just now') || ts.includes('hour') || ts.includes('min') ||
              ts.includes('jam') || ts.includes('menit') ||
              (ts.includes('day') && (() => {
                const num = parseInt(ts.match(/\d+/)?.[0] || '1', 10);
                return num <= 7;
              })()) ||
              (ts.includes('hari') && (() => {
                const num = parseInt(ts.match(/\d+/)?.[0] || '1', 10);
                return num <= 7;
              })());
          }
          return post.category === cat;
        });

        if (!matchesCategory) return false;
      }

      // Search match
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesTitle = post.title?.toLowerCase().includes(term);
        const matchesContent = post.content.toLowerCase().includes(term);
        const matchesHashtag = (post.hashTags || []).some(tag => tag.toLowerCase().includes(term));
        const matchesCategory = post.category.toLowerCase().includes(term);
        return matchesTitle || matchesContent || matchesHashtag || matchesCategory;
      }

      return true;
    });
  }, [selectedCategories, searchTerm, newsFeedData]);

  return (
    <div className="w-full font-sans antialiased text-neutral-800 dark:text-neutral-100" id="norinoya-news-hub">
      <AnimatePresence mode="wait">
        {!activePost ? (
          <motion.div
            key="news-list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 max-w-7xl mx-auto px-1"
          >
            {/* LEFT COLUMN: STICKY SEARCH & CATEGORY FILTER SIDEBAR WIDGET (3 Columns) */}
            <NewsCategorySidebar
              leftSidebarRef={leftSidebarRef}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              scrollToFeedTop={scrollToFeedTop}
              isScrolled={isScrolled}
              isCategoryExpanded={isCategoryExpanded}
              setIsCategoryExpanded={setIsCategoryExpanded}
              selectedCategories={selectedCategories}
              handleToggleCategory={handleToggleCategory}
              todayPostsCount={todayPostsCount}
              NEWS_UPDATES={newsFeedData}
            />

            {/* MIDDLE COLUMN: FEATURED POST & ARTICLE LIST (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* MOBILE CATEGORIES NAVIGATION CHIPS (lg:hidden) */}
              <div className="lg:hidden bg-white dark:bg-neutral-900 p-2.5 sm:p-3 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs flex items-center gap-2">
                <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth min-w-0 pr-1">
                  {isScrolled && !isCategoryExpanded ? (
                    <>
                      {selectedCategories.map(catId => {
                        const item = CATEGORY_ITEMS.find(c => c.id === catId);
                        if (!item) return null;
                        const Icon = item.icon;
                        return (
                          <button
                            key={catId}
                            onClick={() => handleToggleCategory(catId)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${item.activeColor}`}
                          >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span>{item.label}</span>
                            {catId !== 'all' && <X className="w-3 h-3 ml-0.5 shrink-0" />}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setIsCategoryExpanded(true)}
                        className="h-8 px-3 text-xs font-bold font-mono rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shrink-0 cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Kategori</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {CATEGORY_ITEMS.map(item => {
                        const isSelected = selectedCategories.includes(item.id);
                        const Icon = item.icon;
                        return (
                          <React.Fragment key={item.id}>
                            {item.hasTopDivider && (
                              <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-800 my-auto shrink-0 mx-0.5" />
                            )}
                            <button
                              onClick={() => handleToggleCategory(item.id)}
                              className={`px-3 py-1.5 sm:px-3.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                                isSelected
                                  ? item.activeColor + ' shadow-xs'
                                  : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-750'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5 shrink-0" />
                              <span>{item.label}</span>
                              {isSelected && item.id !== 'all' && (
                                <X className="w-3 h-3 ml-0.5 shrink-0 opacity-80" />
                              )}
                            </button>
                          </React.Fragment>
                        );
                      })}
                      {isScrolled && (
                        <button
                          onClick={() => setIsCategoryExpanded(false)}
                          className="h-8 px-2.5 text-xs font-mono font-bold rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 shrink-0 cursor-pointer flex items-center gap-1"
                        >
                          <ChevronUp className="w-3 h-3" />
                          <span>Minimize</span>
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Pinned Red Reset Filter Button on Right Side */}
                {(!selectedCategories.includes('all') || searchTerm) && (
                  <button
                    onClick={() => {
                      handleToggleCategory('all', true);
                      setSearchTerm('');
                      setIsCategoryExpanded(false);
                    }}
                    className="w-8 h-8 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white shrink-0 cursor-pointer flex items-center justify-center shadow-xs active:scale-95 transition-all"
                    title="Reset Filter"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* DYNAMIC LISTINGS FEED TITLE / RESULTS COUNT */}
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-mono font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase flex items-center gap-2 flex-wrap">
                  {selectedCategories.includes('all') ? (
                    <span>Feeds</span>
                  ) : (
                    <span>
                      Filter ({selectedCategories.length}):{' '}
                      {selectedCategories.map(c => CATEGORY_ITEMS.find(it => it.id === c)?.label).filter(Boolean).join(', ')}
                    </span>
                  )}
                  {searchTerm && <span> • Hasil Pencarian "{searchTerm}"</span>}
                </h2>
                <div className="flex items-center gap-2 shrink-0">
                  {!selectedCategories.includes('all') && (
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                      {filteredPosts.length} post ditemukan
                    </span>
                  )}
                  {(!selectedCategories.includes('all') || searchTerm) && (
                    <button
                      onClick={() => {
                        handleToggleCategory('all', true);
                        setSearchTerm('');
                      }}
                      className="hidden lg:flex w-7 h-7 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white shrink-0 cursor-pointer items-center justify-center shadow-xs active:scale-95 transition-all"
                      title="Reset Filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* DYNAMIC FEED POSTS LIST */}
              <div className="flex flex-col gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
                      <NewsPostCard
                        key={post.id}
                        post={post}
                        index={index}
                        selectPost={selectPost}
                        handleToggleCategory={handleToggleCategory}
                        renderImageGallery={renderImageGallery}
                        handleSharePost={handleSharePost}
                      />
                    ))
                  ) : (
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800 p-12 text-center flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-neutral-800 dark:text-white">
                        {newsFeedData.length === 0 ? 'Informasi Berita Belum Tersedia' : 'Tidak Ada Hasil Ditemukan'}
                      </h4>
                      <p className="text-xs text-neutral-500 max-w-[320px]">
                        {newsFeedData.length === 0 
                          ? 'Belum ada postingan berita yang dipublikasikan oleh admin. Silakan kembali lagi nanti!' 
                          : 'Silakan gunakan kategori lain atau bersihkan kata kunci pencarian Anda untuk memuat ulang berita.'}
                      </p>
                      {newsFeedData.length > 0 && (
                        <button
                          onClick={() => {
                            setSearchInput('');
                            setSearchTerm('');
                            handleToggleCategory('all', true);
                            scrollToFeedTop();
                          }}
                          className="mt-2 px-4 py-1.5 text-xs font-bold rounded-lg bg-[#112A12] text-white cursor-pointer hover:bg-[#0c1d0d]"
                        >
                          Atur Ulang Filter
                        </button>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT COLUMN: SIDEBAR WIDGETS */}
            <NewsRightSidebar
              NEWS_UPDATES={newsFeedData}
              TRENDING_TOPICS={TRENDING_TOPICS}
              selectPost={selectPost}
              setSearchInput={setSearchInput}
              setSearchTerm={setSearchTerm}
              scrollToFeedTop={scrollToFeedTop}
              isNewsletterSubscribed={isNewsletterSubscribed}
              newsletterEmail={newsletterEmail}
              setNewsletterEmail={setNewsletterEmail}
              handleSubscribeNewsletter={handleSubscribeNewsletter}
              onNavigateToCatalog={onNavigateToCatalog}
            />
          </motion.div>
        ) : (
          <DetailNews
            activePost={activePost}
            selectPost={selectPost}
            handleToggleCategory={handleToggleCategory}
            renderImageGallery={renderImageGallery}
            handleSharePost={handleSharePost}
            polls={polls}
            userVotes={userVotes}
            handleVote={handleVote}
            reactions={reactions}
            userReactions={userReactions}
            handleQuickReaction={handleQuickReaction}
            flyingReactions={flyingReactions}
            relevantCatalogItems={relevantCatalogItems}
            relevantKiosItems={relevantKiosItems}
            onNavigateToCatalog={onNavigateToCatalog}
            onNavigateToComic={onNavigateToComic}
            triggerToast={triggerToast}
            isNewsletterSubscribed={isNewsletterSubscribed}
            newsletterEmail={newsletterEmail}
            setNewsletterEmail={setNewsletterEmail}
            handleSubscribeNewsletter={handleSubscribeNewsletter}
            dbBooksList={dbBooksList}
            onSelectShort={onSelectShort}
            allNews={newsFeedData}
          />
        )}
      </AnimatePresence>

      {/* 3. DYNAMIC FLOATING NOTIFICATION TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[300] bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 rounded-xl border border-neutral-800 dark:border-neutral-200 shadow-xl flex items-center gap-2.5 max-w-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold tracking-tight">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. FULLSCREEN INTERACTIVE IMAGE LIGHTBOX */}
      <AnimatePresence>
        {lightboxImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImages(null)}
            className="fixed inset-0 z-[400] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none"
          >
            <button
              onClick={() => setLightboxImages(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-lg transition-all cursor-pointer z-20 outline-none"
            >
              ✕
            </button>

            {lightboxImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length);
                }}
                className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-2xl transition-all cursor-pointer z-20 outline-none"
              >
                ‹
              </button>
            )}

            <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center gap-3">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={lightboxImages[lightboxIndex]}
                alt={`Full preview ${lightboxIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
              {lightboxImages.length > 1 && (
                <span className="text-white/80 font-mono text-xs font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  Foto {lightboxIndex + 1} dari {lightboxImages.length}
                </span>
              )}
            </div>

            {lightboxImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % lightboxImages.length);
                }}
                className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-2xl transition-all cursor-pointer z-20 outline-none"
              >
                ›
              </button>
            )}
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
