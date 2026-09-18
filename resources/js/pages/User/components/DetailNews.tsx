import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Send, CheckCircle2, 
  Newspaper, RefreshCw, Sparkles, Tag, Ticket, Mic, Tv, Gamepad2, Flame,
  Users, Eye, Heart, ShoppingBag, ChevronRight, BookOpen, BookMarked, BookText,
  Play, ArrowUpRight, Video
} from 'lucide-react';
import { COMICS_DATA } from '../../../types/mockData';
import { NewsUpdate, Comic, Volume } from '../../../types/demo';
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

import { RawKiosItem } from './EtalaseCatalog';

export interface DetailNewsProps {
  activePost: NewsUpdate;
  selectPost: (post: NewsUpdate | null) => void;
  handleToggleCategory: (catId: string, forceSingle?: boolean) => void;
  renderImageGallery: (post: NewsUpdate, isDetail?: boolean) => React.ReactNode;
  handleSharePost: (post: NewsUpdate, e?: React.MouseEvent) => void;
  polls: Record<string, { question: string; options: Array<{ id: string; label: string; votes: number }> }>;
  userVotes: Record<string, string>;
  handleVote: (postId: string, optionId: string) => void;
  reactions: Record<string, Array<{ id?: string; emoji: string; label?: string; count: number }>>;
  userReactions: Record<string, Record<string, boolean>>;
  handleQuickReaction: (postId: string, reactionId: string, emoji: string) => void;
  flyingReactions: { id: number; emoji: string; x: number; y: number }[];
  relevantCatalogItems: Array<{ comic: Comic; vol: Volume; score: number }>;
  relevantKiosItems: RawKiosItem[];
  onNavigateToCatalog?: () => void;
  onNavigateToComic?: (comicId: string) => void;
  triggerToast: (msg: string) => void;
  isNewsletterSubscribed?: boolean;
  newsletterEmail?: string;
  setNewsletterEmail?: (email: string) => void;
  handleSubscribeNewsletter?: (e: React.FormEvent) => void;
  dbBooksList?: unknown[];
  onSelectShort?: (short: VideoShortItem) => void;
  allNews?: NewsUpdate[];
}

export default function DetailNews({
  activePost,
  selectPost,
  handleToggleCategory,
  renderImageGallery,
  handleSharePost,
  polls,
  userVotes,
  handleVote,
  reactions,
  userReactions,
  handleQuickReaction,
  flyingReactions,
  relevantCatalogItems,
  relevantKiosItems,
  onNavigateToCatalog,
  onNavigateToComic,
  triggerToast,
  dbBooksList = [],
  onSelectShort,
  allNews = [],
}: DetailNewsProps) {
  // Increment view counter on backend when viewing detail news
  React.useEffect(() => {
    if (!activePost?.id) return;

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    fetch(`/news/${encodeURIComponent(String(activePost.id))}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        slug: activePost.slug,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success && typeof data.views_count === 'number') {
          if (activePost) {
            activePost.views_count = data.views_count;
          }
        }
      })
      .catch(() => {
        // Silently catch network errors
      });
  }, [activePost]);

  // Instantly reset scroll to top when mounting or changing post so fixed bar stays in place
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [activePost?.id]);

  const metaTitle = activePost?.title ? `${activePost.title} - Norinoya News` : 'Berita - Norinoya';
  const metaDesc = (activePost?.content || 'Baca update berita dan artikel terbaru seputar manga, anime, dan pop culture di Norinoya.').replace(/<[^>]*>/g, '').slice(0, 160);
  const metaImage = activePost?.attachedImage || '';

  return (
    <div className="w-full max-w-6xl mx-auto relative -mt-4 sm:-mt-6">
      <Head title={metaTitle}>
        <meta name="description" content={metaDesc} />
        <meta property="og:site_name" content="Norinoya" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="article" />
        {metaImage && <meta property="og:image" content={metaImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDesc} />
        {metaImage && <meta name="twitter:image" content={metaImage} />}
        <meta name="theme-color" content="#E53935" />
      </Head>
      {/* Full-width Fixed Top Navigation Bar */}
      <div className="fixed top-[57px] sm:top-[61px] left-0 right-0 z-40 w-full bg-white/95 dark:bg-[#202120]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => selectPost(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {/* Share Action */}
            <button
              onClick={(e) => handleSharePost(activePost, e)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none shrink-0"
              title="Bagikan Berita"
            >
              <span>Bagikan</span>
              <Send className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        key="news-detail-view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        {/* Responsive Grid Layout: Left Main Detail + Right Widgets Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-16 sm:pt-20">

        {/* LEFT COLUMN: Main Detail Content Container (8 Cols on Desktop) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#202120] rounded-2xl overflow-hidden border border-neutral-200/85 dark:border-neutral-800 shadow-sm relative">

          {/* Floating Emojis Burst Render Stage */}
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {flyingReactions.map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 2.2, x: f.x, y: f.y }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute bottom-28 left-[45%] text-4xl select-none"
              >
                {f.emoji}
              </motion.div>
            ))}
          </div>

          {/* Main Detail Content Area */}
          <div className="flex flex-col">
            <div className="p-5 sm:p-7 flex flex-col gap-5">
              
              {/* Headline & Meta */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400 leading-normal">
                  <span className="font-extrabold text-[#112A12] dark:text-white shrink-0">@{activePost.username}</span>
                  <span className="shrink-0 text-neutral-300 dark:text-neutral-600">•</span>
                  <span className="shrink-0">{activePost.displayName}</span>
                  <span className="shrink-0 text-neutral-300 dark:text-neutral-600">•</span>
                  <span className="shrink-0">{activePost.timestamp}</span>
                </div>

                {/* Category Badge Pill */}
                {(() => {
                  let IconComponent: React.ElementType = Newspaper;
                  let label = 'Berita';
                  if (activePost.category === 'cetakan_ulang') {
                    IconComponent = RefreshCw;
                    label = 'Cetak Ulang';
                  } else if (activePost.category === 'manga') {
                    IconComponent = BookOpen;
                    label = 'Manga';
                  } else if (activePost.category === 'light_novel') {
                    IconComponent = BookMarked;
                    label = 'Light Novel';
                  } else if (activePost.category === 'novel') {
                    IconComponent = BookText;
                    label = 'Novel';
                  } else if (activePost.category === 'rilisan') {
                    IconComponent = Newspaper;
                    label = 'Rilisan';
                  } else if (activePost.category === 'edukasi') {
                    IconComponent = Sparkles;
                    label = 'Review';
                  } else if (activePost.category === 'promo') {
                    IconComponent = Tag;
                    label = 'Promo';
                  } else if (activePost.category === 'event') {
                    IconComponent = Ticket;
                    label = 'Event';
                  } else if (activePost.category === 'komunitas') {
                    IconComponent = Mic;
                    label = 'Komunitas';
                  } else if (activePost.category === 'anime') {
                    IconComponent = Tv;
                    label = 'Anime';
                  } else if (activePost.category === 'game') {
                    IconComponent = Gamepad2;
                    label = 'Game';
                  } else if (activePost.category === 'jepang') {
                    IconComponent = ToriiGate;
                    label = 'Jepang';
                  } else if (activePost.category === 'breaking') {
                    IconComponent = Flame;
                    label = 'Breaking';
                  }
                  return (
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.location.pathname === '/news') {
                            handleToggleCategory(activePost.category, true);
                            selectPost(null);
                            const searchParams = new URLSearchParams(window.location.search);
                            searchParams.set('category', activePost.category);
                            window.history.pushState({}, '', `/news?${searchParams.toString()}`);
                          } else {
                            window.location.href = `/news?category=${encodeURIComponent(activePost.category)}`;
                          }
                        }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold border border-neutral-200/50 dark:border-neutral-700 transition-all cursor-pointer active:scale-95 group/badge"
                        title={`Filter postingan kategori: ${label}`}
                      >
                        <IconComponent className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0 group-hover/badge:rotate-12 transition-transform" />
                        <span>{label}</span>
                      </button>
                    </div>
                  );
                })()}

                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-50 leading-tight">
                  {activePost.title}
                </h2>
              </div>

              {/* Body Paragraph */}
              {activePost.content && (
                <div 
                  className="whitespace-pre-line [&_p:empty]:min-h-[1.5rem] text-xs sm:text-sm text-neutral-700 dark:text-[#c0d6d8] leading-relaxed font-sans bg-neutral-50 dark:bg-[#202120] p-4 sm:p-5 rounded-xl border border-neutral-100 dark:border-neutral-800 prose dark:prose-invert max-w-none prose-sm prose-p:my-2.5 prose-p:leading-relaxed prose-headings:mt-4 prose-headings:mb-2 text-justify"
                  dangerouslySetInnerHTML={{ __html: activePost.content }}
                />
              )}

              {/* Photo / Multi-image Grid Gallery directly below description */}
              {renderImageGallery(activePost, true)}

              {/* INSERT KATALOG & REVIEW SHORT RECOMMENDATIONS SECTION */}
              {activePost.recommendations && activePost.recommendations.length > 0 && (
                <div className="pt-2 border-t border-neutral-200/80 dark:border-neutral-800 space-y-5">
                  {/* Section Header Banner */}
                  <div className="flex items-center justify-between gap-2 bg-neutral-100/80 dark:bg-neutral-800/80 p-3 sm:p-3.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/60">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#DA6B1C] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight flex items-center gap-1.5">
                          <span>INSERT KATALOG & REVIEW SHORT</span>
                        </h4>
                        <p className="text-[10px] sm:text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                          Katalog (Kiri) • Review Short Konotasi (Kanan)
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#DA6B1C] text-white shrink-0">
                      {activePost.recommendations.length} Rekomendasi
                    </span>
                  </div>

                  {/* Recommendations Item List */}
                  <div className="space-y-5">
                    {activePost.recommendations.map((rec, idx) => {
                      // Match Book from DB or mock data
                      const matchedDbBook = rec.book_id 
                        ? (dbBooksList as Record<string, unknown>[]).find(b => String(b.id) === String(rec.book_id))
                        : null;
                      
                      const matchedMockComic = COMICS_DATA.find(c => c.id === rec.comicId || c.slug === rec.comicId || String(c.id) === String(rec.book_id));
                      
                      const bookTitle = matchedDbBook?.title 
                        ? `${matchedDbBook.title} Vol ${matchedDbBook.volume}`
                        : (matchedMockComic?.title || rec.title);
                      
                      const bookTypeObj = matchedDbBook?.book_type as { name?: string } | string | undefined;
                      const bookCategory = (typeof bookTypeObj === 'object' ? bookTypeObj?.name : bookTypeObj) || matchedMockComic?.category || 'Manga';
                      const ageRatingObj = matchedDbBook?.age_rating as { name?: string } | string | undefined;
                      const bookRating = (typeof ageRatingObj === 'object' ? ageRatingObj?.name : ageRatingObj) || matchedMockComic?.readingRating || 'Dewasa Ringan';
                      const publisherObj = matchedDbBook?.publisher as { name?: string } | undefined;
                      const publisherName = publisherObj?.name || matchedMockComic?.publisherName || 'Penerbit Resmi';
                      const bookPrice = matchedDbBook?.msrp ? Number(matchedDbBook.msrp) : (matchedMockComic?.volumes?.[0]?.price || 45000);
                      
                      // Generate exact identifier to open in DetailBuku
                      const targetComicId = matchedDbBook 
                        ? (matchedDbBook.series_id ? `series-${matchedDbBook.series_id}-vol-${matchedDbBook.volume}` : `book-${matchedDbBook.id}`)
                        : (rec.comicId || matchedMockComic?.id);

                      // Cover Image utama milik buku
                      const imagesArr = matchedDbBook?.images as Array<{ image_url?: string; file_path?: string }> | undefined;
                      const coverImg = (imagesArr && imagesArr.length > 0)
                        ? (imagesArr[0].image_url || imagesArr[0].file_path)
                        : (matchedMockComic?.coverImage || rec.shortReview?.thumbnail || 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80');

                      // TikTok video matching from book's tiktok embeds or specific id
                      const tiktokEmbedsArr = matchedDbBook?.tiktok_embeds as Array<{ id?: string | number; name?: string; url_video?: string }> | undefined;
                      const matchedTiktokEmbed = tiktokEmbedsArr?.find(t => String(t.id) === String(rec.tiktok_embed_id))
                        || (tiktokEmbedsArr && tiktokEmbedsArr.length > 0 ? tiktokEmbedsArr[0] : null);

                      // Gunakan thumbnail tiktok dari public/assets/images/thumbnail-tiktok.jpeg
                      const shortThumbnail = '/assets/images/thumbnail-tiktok.jpeg';
                      const shortTitle = rec.shortReview?.title || matchedTiktokEmbed?.name || `Review Short: ${rec.title}`;
                      const videoUrl = rec.shortReview?.url_video || matchedTiktokEmbed?.url_video;

                      return (
                        <div 
                          key={`rec-${rec.number || idx}-${rec.title}`}
                          className="space-y-3 bg-neutral-50/70 dark:bg-[#202120] p-3.5 sm:p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800"
                        >
                          {/* Numbered Header & Description */}
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-lg bg-[#DA6B1C] text-white font-mono font-black text-xs shrink-0 shadow-2xs">
                                {rec.number || (idx + 1)}
                              </span>
                              <h4 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
                                {rec.title}
                              </h4>
                            </div>
                            {rec.description && (
                              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans pt-0.5">
                                {rec.description}
                              </p>
                            )}
                          </div>

                          {/* Side-by-Side Dual Insert Section (Katalog Kiri & Review Short Kanan) */}
                          <div className="flex flex-wrap sm:flex-nowrap gap-4 pt-1 items-start justify-start">
                            
                            {/* LEFT CARD: INSERT KATALOG POST */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                if (targetComicId && onNavigateToComic) {
                                  onNavigateToComic(String(targetComicId));
                                } else if (onNavigateToCatalog) {
                                  onNavigateToCatalog();
                                }
                              }}
                              className="group/kat relative w-full sm:w-[260px] shrink-0 bg-white dark:bg-[#181912] hover:bg-neutral-50 dark:hover:bg-[#222319] border border-neutral-200/90 dark:border-neutral-700/60 rounded-2xl overflow-hidden transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                            >
                              <div>
                                {/* Top Cover Image with Badges */}
                                <div className="relative w-full h-48 sm:h-52 bg-neutral-900 overflow-hidden shrink-0">
                                  <img 
                                    src={coverImg} 
                                    alt={bookTitle} 
                                    className="w-full h-full object-cover object-top group-hover/kat:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                  {/* Bottom Badges */}
                                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
                                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white text-neutral-900 shadow-xs border border-neutral-200">
                                      {typeof bookCategory === 'string' ? (bookCategory.charAt(0).toUpperCase() + bookCategory.slice(1)) : 'Manga'}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold shadow-xs border ${getReadingRatingBadgeStyle(typeof bookRating === 'string' ? bookRating : 'Dewasa Ringan')}`}>
                                      {typeof bookRating === 'string' ? bookRating : 'Dewasa Ringan'}
                                    </span>
                                  </div>
                                </div>

                                {/* Details Area */}
                                <div className="p-3.5 space-y-1">
                                  <p className="text-[11px] font-sans font-medium text-neutral-400 dark:text-neutral-500 truncate">
                                    {publisherName}
                                  </p>
                                  <h5 className={`text-sm font-extrabold text-neutral-900 dark:text-neutral-50 ${getReadingRatingHoverClass(typeof bookRating === 'string' ? bookRating : 'Dewasa Ringan', 'group-hover/kat')} transition-colors line-clamp-2 leading-snug`}>
                                    {bookTitle}
                                  </h5>
                                  <p className="text-xs font-sans text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                    {typeof matchedDbBook?.short_description === 'string' ? matchedDbBook.short_description : (matchedMockComic?.genres?.join(', ') || 'Koleksi Resmi Norinoya')}
                                  </p>
                                </div>
                              </div>

                              {/* Divider & Price */}
                              <div className="px-3.5 pb-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                                <span className="text-sm sm:text-base font-mono font-extrabold text-neutral-900 dark:text-neutral-50">
                                  Rp {bookPrice.toLocaleString('id-ID')}
                                </span>
                                <span className={`text-[10.5px] font-sans font-bold text-neutral-700 dark:text-neutral-300 ${getReadingRatingHoverClass(typeof bookRating === 'string' ? bookRating : 'Dewasa Ringan', 'group-hover/kat')} flex items-center gap-1`}>
                                  Lihat Katalog <ArrowUpRight className="w-3 h-3 text-[#112A12] dark:text-[#457347]" />
                                </span>
                              </div>
                            </div>

                            {/* RIGHT CARD: INSERT SHORT KONOTASI (9:16 aspect ratio) */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                if (videoUrl && videoUrl.startsWith('http')) {
                                  window.open(videoUrl, '_blank');
                                } else if (onSelectShort) {
                                  onSelectShort({
                                    id: rec.shortReview?.id || `short-${rec.number || idx}`,
                                    title: shortTitle,
                                    views: rec.shortReview?.views || '24.3K',
                                    duration: rec.shortReview?.duration || '0:52',
                                    likes: '5.2K',
                                    thumbnail: shortThumbnail,
                                    quote: rec.shortReview?.quote || '"Review jujur bedah fisik & cetakan komik!"'
                                  });
                                } else if (videoUrl) {
                                  window.open(videoUrl, '_blank');
                                } else {
                                  triggerToast(`🎬 Video Review: ${shortTitle}`);
                                }
                              }}
                              className="group/short relative w-full sm:w-[220px] aspect-[9/16] shrink-0 bg-neutral-900 rounded-2xl overflow-hidden transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between border border-neutral-200/90 dark:border-neutral-700/60"
                            >
                              {/* Background Image */}
                              <img 
                                src={shortThumbnail} 
                                alt={shortTitle} 
                                className="absolute inset-0 w-full h-full object-cover group-hover/short:scale-105 transition-transform duration-500 opacity-90 group-hover/short:opacity-100"
                              />
                              
                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 pointer-events-none" />

                              {/* Top Bar Badges */}
                              <div className="relative z-10 p-3 flex items-center justify-between">
                                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-black tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/10 shadow-xs flex items-center gap-1">
                                  <Video className="w-3 h-3 text-[#DA6B1C]" />
                                  <span>SHORTS</span>
                                </span>
                                <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-black/70 text-white backdrop-blur-md border border-white/10 shadow-xs">
                                  {rec.shortReview?.duration || '0:58'}
                                </span>
                              </div>

                              {/* Center Play Button Overlay */}
                              <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none">
                                <div className="w-11 h-11 rounded-full bg-[#DA6B1C] text-white flex items-center justify-center shadow-lg group-hover/short:scale-110 transition-transform">
                                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                                </div>
                              </div>

                              {/* Bottom Details */}
                              <div className="relative z-10 p-3 space-y-2">
                                <h5 className="text-xs sm:text-sm font-extrabold text-white leading-snug drop-shadow-md line-clamp-2 group-hover/short:text-orange-300 transition-colors">
                                  {shortTitle}
                                </h5>

                                <div className="flex items-center justify-between text-white/90 font-mono text-[11px] font-bold pt-1.5 border-t border-white/15">
                                  <div className="flex items-center gap-1.5">
                                    <Eye className="w-3.5 h-3.5 text-neutral-300" />
                                    <span>{rec.shortReview?.views || '18.9K'}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-orange-400">
                                    <Heart className="w-3.5 h-3.5 fill-current text-orange-400" />
                                    <span>4.8K</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* INTERACTIVE POLLING SECTION */}
              {(() => {
                const postPoll = polls[activePost.id] || (
                  activePost.poll_question && Array.isArray(activePost.poll_options) && activePost.poll_options.length > 0
                    ? {
                        question: activePost.poll_question,
                        options: activePost.poll_options.map((opt, idx: number) => ({
                          id: opt.id || `opt-${activePost.id}-${idx + 1}`,
                          label: opt.label || '',
                          votes: Number(opt.votes) || 0,
                        }))
                      }
                    : null
                );

                if (!postPoll || !postPoll.question || !postPoll.options || postPoll.options.length === 0) return null;

                const totalVotes = postPoll.options.reduce((sum: number, opt: { votes?: number }) => sum + (Number(opt.votes) || 0), 0) || 1;
                const hasVotedThisPost = !!userVotes[activePost.id];

                return (
                  <div className="bg-neutral-50/70 dark:bg-[#171717] p-5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col gap-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      <Users className="w-4 h-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
                      <span>POLING KOMUNITAS</span>
                    </div>
                    
                    <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white">
                      {postPoll.question}
                    </h4>

                    <div className="flex flex-col gap-2.5 mt-1">
                      {postPoll.options.map((option: { id: string; label: string; votes: number }) => {
                        const percent = Math.round(((Number(option.votes) || 0) / totalVotes) * 100);
                        const isUserChoice = userVotes[activePost.id] === option.id;

                        return (
                          <button
                            key={option.id}
                            disabled={hasVotedThisPost}
                            onClick={() => handleVote(activePost.id, option.id)}
                            className={`relative overflow-hidden w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between group/opt cursor-pointer outline-none ${
                              hasVotedThisPost
                                ? isUserChoice
                                  ? 'border-[#112A12] bg-[#112A12]/10 dark:bg-[#112A12]/20'
                                  : 'border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-[#262626]/40'
                                : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#262626] hover:border-[#112A12] hover:bg-neutral-50 dark:hover:bg-[#323232]'
                            }`}
                          >
                            <span className="relative z-10 text-neutral-900 dark:text-white font-medium">{option.label}</span>
                            <div className="flex items-center gap-2 relative z-10 font-mono text-xs">
                              {hasVotedThisPost && <span>{percent}%</span>}
                              {isUserChoice && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            </div>
                            {hasVotedThisPost && (
                              <div
                                style={{ width: `${percent}%` }}
                                className="absolute left-0 top-0 bottom-0 bg-[#112A12]/10 dark:bg-[#112A12]/25 pointer-events-none transition-all duration-500"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* QUICK REACTION BADGES */}
              {(() => {
                const postReactions = reactions[activePost.id] || (
                  Array.isArray(activePost.reactions) && activePost.reactions.length > 0
                    ? activePost.reactions.map((r: { id?: string; emoji?: string; label?: string; count?: number }, idx: number) => ({
                        id: r.id || `react-${idx}`,
                        emoji: r.emoji || '👍',
                        label: r.label || '',
                        count: Number(r.count) || 0,
                      }))
                    : [
                        { id: 'fire', emoji: '🔥', label: 'Hype', count: 24 },
                        { id: 'heart', emoji: '❤️', label: 'Suka', count: 48 },
                        { id: 'thinking', emoji: '🤔', label: 'Menarik', count: 12 },
                        { id: 'party', emoji: '🎉', label: 'Keren', count: 35 },
                      ]
                );

                if (!postReactions || postReactions.length === 0) return null;

                return (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-mono font-extrabold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Beri Reaksi Instan
                    </h4>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {postReactions.map((react, idx) => {
                        const reactId = react.id || `react-${idx}`;
                        const alreadyReacted = userReactions[activePost.id]?.[reactId];
                        return (
                          <button
                            key={reactId}
                            onClick={() => handleQuickReaction(activePost.id, reactId, react.emoji)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer outline-none border ${
                              alreadyReacted
                                ? 'bg-[#112A12] text-white border-[#112A12] shadow-xs scale-102'
                                : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-700/60 hover:bg-neutral-100 dark:hover:bg-neutral-750'
                            }`}
                          >
                            <span className="text-sm leading-none">{react.emoji}</span>
                            <span className="font-mono text-[10px] font-extrabold leading-none">{react.label || ''}</span>
                            <span className="bg-black/10 dark:bg-white/10 text-[9px] px-1.5 py-0.5 rounded-full font-mono leading-none">
                              {react.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* OTHER NEWS SECTION ("Berita Lainnya") */}
              {(() => {
                const otherNewsList = (allNews && allNews.length > 0 ? allNews : [])
                  .filter(p => String(p.id) !== String(activePost.id))
                  .slice(0, 3);

                if (otherNewsList.length === 0) return null;

                return (
                  <div className="border-t border-neutral-150 dark:border-neutral-800/80 pt-6">
                    <h3 className="text-xs font-mono font-extrabold text-neutral-500 dark:text-neutral-400 mb-4 flex items-center gap-1.5 uppercase tracking-wider">
                      <Newspaper className="w-4 h-4 text-[#112A12]" />
                      <span>Berita Lainnya</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {otherNewsList.map((post) => {
                        let categoryLabel = '';
                        let categoryColor = 'bg-neutral-100 text-neutral-750 dark:bg-neutral-800 dark:text-neutral-300';
                        
                        if (post.category === 'cetakan_ulang') {
                          categoryLabel = 'Cetak Ulang';
                          categoryColor = 'bg-[#112A12]/10 dark:bg-emerald-950/45 text-[#112A12] dark:text-white border border-[#112A12]/20 dark:border-[#112A12]/30';
                        } else if (post.category === 'manga') {
                          categoryLabel = 'Manga';
                          categoryColor = 'bg-emerald-50 dark:bg-emerald-950/45 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30';
                        } else if (post.category === 'light_novel') {
                          categoryLabel = 'Light Novel';
                          categoryColor = 'bg-orange-50 dark:bg-orange-950/45 text-[#DA6B1C] dark:text-[#DA6B1C] border border-orange-100/50 dark:border-orange-900/30';
                        } else if (post.category === 'novel') {
                          categoryLabel = 'Novel';
                          categoryColor = 'bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30';
                        } else if (post.category === 'rilisan') {
                          categoryLabel = 'Rilisan';
                          categoryColor = 'bg-emerald-50 dark:bg-emerald-950/45 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30';
                        } else if (post.category === 'edukasi') {
                          categoryLabel = 'Review';
                          categoryColor = 'bg-orange-50 dark:bg-orange-950/45 text-orange-600 dark:text-[#DA6B1C] border border-rose-100/50 dark:border-rose-900/30';
                        } else if (post.category === 'promo') {
                          categoryLabel = 'Promo';
                          categoryColor = 'bg-orange-50 dark:bg-orange-950/45 text-[#DA6B1C] dark:text-[#DA6B1C] border border-rose-100/50 dark:border-rose-900/30';
                        } else if (post.category === 'event') {
                          categoryLabel = 'Event';
                          categoryColor = 'bg-purple-50 dark:bg-purple-950/45 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/30';
                        } else if (post.category === 'komunitas') {
                          categoryLabel = 'Komunitas';
                          categoryColor = 'bg-teal-50 dark:bg-teal-950/45 text-teal-600 dark:text-teal-400 border border-teal-100/50 dark:border-teal-900/30';
                        } else if (post.category === 'anime') {
                          categoryLabel = 'Anime';
                          categoryColor = 'bg-red-50 dark:bg-red-950/45 text-red-600 dark:text-red-400 border border-red-100/50 dark:border-red-900/30';
                        } else if (post.category === 'game') {
                          categoryLabel = 'Game';
                          categoryColor = 'bg-cyan-50 dark:bg-cyan-950/45 text-cyan-600 dark:text-cyan-400 border border-cyan-100/50 dark:border-cyan-900/30';
                        } else if (post.category === 'jepang') {
                          categoryLabel = 'Jepang';
                          categoryColor = 'bg-pink-50 dark:bg-pink-950/45 text-pink-600 dark:text-pink-400 border border-pink-100/50 dark:border-pink-900/30';
                        } else if (post.category === 'breaking') {
                          categoryLabel = 'Breaking';
                          categoryColor = 'bg-orange-50 dark:bg-orange-950/45 text-orange-600 dark:text-orange-400 border border-orange-100/50 dark:border-orange-900/30';
                        }

                        return (
                          <div
                            key={post.id}
                            onClick={() => selectPost(post)}
                            className="bg-neutral-50/50 dark:bg-[#1A1A1A] hover:bg-neutral-50 dark:hover:bg-[#262626] p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 cursor-pointer group transition-all flex flex-col justify-between h-full hover:shadow-xs"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${categoryColor}`}>
                                  {categoryLabel}
                                </span>
                                <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500">{post.timestamp}</span>
                              </div>
                              <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-neutral-50 line-clamp-2 group-hover:text-[#112A12] dark:group-hover:text-emerald-400 transition-colors">
                                {post.title}
                              </h4>
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                                {post.content}
                              </p>
                            </div>
                            <div className="pt-3.5 flex items-center gap-1 text-[10px] font-bold text-[#112A12] dark:text-[#112A12] font-mono">
                              <span>Baca Berita</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Right Sidebar Widgets (4 Cols on Desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
           
           {/* WIDGET 1: MINI KATALOG BUKU RELEVAN */}
           {relevantCatalogItems && relevantCatalogItems.length > 0 && (
             <div className="bg-white dark:bg-[#202120] rounded-2xl p-4 sm:p-5 border border-neutral-200/85 dark:border-neutral-800 shadow-xs flex flex-col gap-3.5">
               <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-neutral-200/80 dark:border-neutral-800">
                 <div className="flex items-center gap-2">
                   <ShoppingBag className="w-4 h-4 text-neutral-100 dark:text-neutral-100 shrink-0" />
                   <h3 className="text-xs font-mono font-extrabold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                     Katalog Relevan
                   </h3>
                 </div>
                 <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#112A12]/15 text-[#112A12]">
                    {relevantCatalogItems.length} Jilid
                 </span>
               </div>

               <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-sans leading-tight">
                 Manga & volume terbitan resmi yang berhubungan dengan berita ini:
               </p>

               <div className="flex flex-col gap-2.5">
                 {relevantCatalogItems.map(({ comic, vol }, idx) => (
                   <div 
                     key={`${comic.id}-${vol.volNumber}-${idx}`}
                     onClick={() => {
                       if (comic.slug) {
                         window.location.href = `/buku/${comic.slug}`;
                       } else if (onNavigateToComic && comic.id) {
                         onNavigateToComic(comic.id);
                       } else if (comic.id) {
                         window.location.href = `/#/database/${comic.id}`;
                       } else if (onNavigateToCatalog) {
                         onNavigateToCatalog();
                       } else {
                         triggerToast(`📚 Membuka Katalog: ${comic.title} Vol ${vol.volNumber}`);
                       }
                     }}
                     className="flex gap-3 p-2.5 rounded-xl bg-neutral-50 dark:bg-[#1A2321] hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-emerald-500/20 transition-all cursor-pointer group/kat hover:shadow-xs active:scale-[0.99]"
                   >
                     <img 
                       src={vol.coverImage || comic.coverImage} 
                       alt={`${comic.title} Vol ${vol.volNumber}`}
                       className="w-13 h-18 object-cover rounded-lg border border-neutral-200 dark:border-neutral-700 shrink-0 shadow-2xs group-hover/kat:scale-103 transition-transform" 
                     />
                     <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                       <div>
                         <div className="flex items-center gap-1.5 mb-1">
                           <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.2 rounded bg-neutral-200/80 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                             Vol {vol.volNumber}
                           </span>
                           <span className="text-[9px] font-mono text-neutral-400 font-medium truncate">
                             {comic.originalPublisher || 'Official'}
                           </span>
                         </div>
                         <h4 className={`text-xs font-extrabold text-neutral-900 dark:text-neutral-100 line-clamp-1 ${getReadingRatingHoverClass(comic.readingRating, 'group-hover/kat')} transition-colors`}>
                           {comic.title}
                         </h4>
                         <p className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1 font-sans">
                           {comic.genres?.slice(0, 2).join(', ') || comic.demographic}
                         </p>
                       </div>
                       <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-neutral-200/50 dark:border-neutral-800/80 mt-1">
                         <span className="text-xs font-mono font-black text-[#112A12]">
                           Rp {vol.price ? vol.price.toLocaleString('id-ID') : '45.000'}
                         </span>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}

           {/* WIDGET 2: PRODUK TERKAIT (KOMIK & MERCHANDISE RELEVAN) */}
           <div className="bg-white dark:bg-[#202120] rounded-2xl p-4 sm:p-5 border border-neutral-200/85 dark:border-neutral-800 shadow-xs flex flex-col gap-3.5">
             <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-neutral-200/80 dark:border-neutral-800">
               <div className="flex items-center gap-2">
                 <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                 <h3 className="text-xs font-mono font-extrabold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                   Produk Terkait
                 </h3>
               </div>
               <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                 Kios
               </span>
             </div>

             <div className="flex flex-col gap-3">
               {relevantKiosItems.map((kiosItem, idx) => {
                 const coverImage = kiosItem.cover_image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80';
                 const title = kiosItem.comic_title || kiosItem.title;
                 const volText = kiosItem.vol_number ? `Vol ${kiosItem.vol_number}` : '';
                 const salePrice = Number(kiosItem.price) || 0;
                 const origPrice = Number(kiosItem.original_price) || 0;
                 const rating = kiosItem.condition_rating || 'Tersedia';
                 const partnerName = kiosItem.publisher_name || 'Konotasi Store';

                 return (
                   <div 
                     key={`kios-${kiosItem.id || idx}`}
                     onClick={() => {
                       const targetSlug = kiosItem.slug || kiosItem.id;
                       window.location.href = `/kios/${targetSlug}`;
                     }}
                     className="p-3 rounded-xl bg-emerald-950/5 dark:bg-emerald-950/20 border border-emerald-500/25 dark:border-emerald-500/20 flex flex-col gap-2.5 cursor-pointer group/kios hover:border-emerald-500 transition-all hover:shadow-xs active:scale-[0.99]"
                   >
                     <div className="flex gap-3">
                       <div className="relative shrink-0">
                         <img 
                           src={coverImage} 
                           alt={title}
                           className="w-15 h-20 object-cover rounded-lg border border-emerald-500/30 shadow-2xs group-hover/kios:scale-103 transition-transform" 
                         />
                         <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded text-[8px] font-mono font-extrabold bg-emerald-600 text-white shadow-xs">
                           {rating}
                         </span>
                       </div>
                       <div className="flex flex-col justify-between flex-1 min-w-0">
                         <div>
                           <div className="text-[10px] font-sans font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                             {partnerName}
                           </div>
                           <h4 className="text-xs font-extrabold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover/kios:text-emerald-600 dark:group-hover/kios:text-emerald-400 transition-colors">
                             {title} {volText}
                           </h4>
                           <p className="text-[10px] text-neutral-600 dark:text-neutral-300 font-sans line-clamp-2 mt-0.5 leading-tight">
                             {kiosItem.notes || kiosItem.deskripsi_produk || kiosItem.synopsis || ''}
                           </p>
                         </div>
                         <div className="flex items-baseline gap-2 mt-1">
                           <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">
                             Rp {salePrice.toLocaleString('id-ID')}
                           </span>
                           {origPrice > salePrice && (
                             <span className="text-[10px] font-mono text-neutral-400 line-through">
                               Rp {origPrice.toLocaleString('id-ID')}
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

           {/* WIDGET 3: SPONSORED ADSENSE */}
           <div className="rounded-2xl bg-white dark:bg-[#202120] p-5 sm:p-6 border border-dashed border-neutral-300 dark:border-neutral-700/80 text-center flex flex-col items-center justify-center gap-3 transition-all">
             <div className="flex items-center justify-center gap-1.5 text-neutral-400 dark:text-neutral-500">
               <span className="text-sm">📣</span>
               <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider">
                 SPONSORED ADSENSE
               </span>
             </div>

             <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-xs mx-auto">
               Iklan Google Adsense membantu kelangsungan server database buku Norinoya. Hubungi kami untuk penempatan banner premium.
             </p>
           </div>

        </div>
      </div>
    </motion.div>
  </div>
);
}
