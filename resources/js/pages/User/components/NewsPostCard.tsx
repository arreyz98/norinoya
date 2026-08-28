import React from 'react';
import { motion } from 'motion/react';
import { 
  Send, Newspaper, RefreshCw, 
  Sparkles, Tag, Ticket, Mic, Tv, Gamepad2, Flame, BookOpen, BookMarked, BookText 
} from 'lucide-react';
import { NewsUpdate } from '../../../types/demo';

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

export interface NewsPostCardProps {
  post: NewsUpdate;
  index: number;
  selectPost: (post: NewsUpdate | null) => void;
  handleToggleCategory: (catId: string, forceSingle?: boolean) => void;
  renderImageGallery: (post: NewsUpdate, isDetail?: boolean) => React.ReactNode;
  handleSharePost: (post: NewsUpdate, e?: React.MouseEvent) => void;
}

export default function NewsPostCard({
  post,
  index,
  selectPost,
  handleToggleCategory,
  renderImageGallery,
  handleSharePost,
}: NewsPostCardProps) {
  let CategoryBadgeIcon: React.ComponentType<{ className?: string }> = Newspaper;
  let categoryLabelText = 'Berita';
  
  if (post.category === 'cetakan_ulang') {
    CategoryBadgeIcon = RefreshCw;
    categoryLabelText = 'Cetak Ulang';
  } else if (post.category === 'manga') {
    CategoryBadgeIcon = BookOpen;
    categoryLabelText = 'Manga';
  } else if (post.category === 'light_novel') {
    CategoryBadgeIcon = BookMarked;
    categoryLabelText = 'Light Novel';
  } else if (post.category === 'novel') {
    CategoryBadgeIcon = BookText;
    categoryLabelText = 'Novel';
  } else if (post.category === 'rilisan') {
    CategoryBadgeIcon = Newspaper;
    categoryLabelText = 'Rilisan';
  } else if (post.category === 'edukasi') {
    CategoryBadgeIcon = Sparkles;
    categoryLabelText = 'Review';
  } else if (post.category === 'promo') {
    CategoryBadgeIcon = Tag;
    categoryLabelText = 'Promo';
  } else if (post.category === 'event') {
    CategoryBadgeIcon = Ticket;
    categoryLabelText = 'Event';
  } else if (post.category === 'komunitas') {
    CategoryBadgeIcon = Mic;
    categoryLabelText = 'Komunitas';
  } else if (post.category === 'anime') {
    CategoryBadgeIcon = Tv;
    categoryLabelText = 'Anime';
  } else if (post.category === 'game') {
    CategoryBadgeIcon = Gamepad2;
    categoryLabelText = 'Game';
  } else if (post.category === 'jepang') {
    CategoryBadgeIcon = ToriiGate;
    categoryLabelText = 'Jepang';
  } else if (post.category === 'breaking') {
    CategoryBadgeIcon = Flame;
    categoryLabelText = 'Breaking';
  }

  return (
    <motion.div key={post.id} className="space-y-6">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className="bg-white hover:bg-[#F7F7F7] dark:bg-neutral-900 dark:hover:bg-[#262626] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-5 sm:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all cursor-pointer group space-y-3.5"
        onClick={() => selectPost(post)}
      >
        {/* Top Header Line: @username • displayName • timestamp */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 leading-normal">
          <span className="font-extrabold text-[#112A12] dark:text-[#112A12] shrink-0">@{post.username}</span>
          <span className="shrink-0 text-neutral-300 dark:text-neutral-600">•</span>
          <span className="shrink-0">{post.displayName}</span>
          <span className="shrink-0 text-neutral-300 dark:text-neutral-600">•</span>
          <span className="shrink-0">{post.timestamp}</span>
        </div>

        {/* Category Badge Pill */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleCategory(post.category, true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-800/90 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold border border-neutral-200/40 dark:border-neutral-700/40 transition-all cursor-pointer active:scale-95 group/badge"
            title={`Klik untuk memfilter kategori: ${categoryLabelText}`}
          >
            <CategoryBadgeIcon className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0 group-hover/badge:rotate-12 transition-transform" />
            <span>{categoryLabelText}</span>
          </button>
        </div>

        {/* Title Headline */}
        <h3 className="text-lg sm:text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50">
          {post.title}
        </h3>

        {/* Attached Image / Multi-image Grid Gallery */}
        {renderImageGallery(post)}

        {/* Post Actions Footer Bar */}
        <div className="flex items-center justify-end pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 mt-3">
          <button
            type="button"
            onClick={(e) => handleSharePost(post, e)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200/90 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-sans font-semibold transition-all cursor-pointer active:scale-95 border border-neutral-200/60 dark:border-neutral-700/60 shadow-2xs group/share"
            title="Bagikan postingan ini"
          >
            <span>Bagikan</span>
            <Send className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 group-hover/share:translate-x-0.5 group-hover/share:-translate-y-0.5 transition-transform stroke-[2]" />
          </button>
        </div>
      </motion.article>

      {index === 0 && (
        <div className="bg-neutral-50/60 dark:bg-neutral-900/40 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700/80 p-5 sm:p-6 text-center space-y-2 transition-all">
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
            <span>📢</span>
            <span>SPONSORED ADSENSE</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed font-sans">
            Iklan Google Adsense membantu kelangsungan server database buku Norinoya. Hubungi kami untuk penempatan banner premium.
          </p>
        </div>
      )}
    </motion.div>
  );
}
