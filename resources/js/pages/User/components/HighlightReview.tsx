import React from 'react';
import { Video, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Volume, Comic } from '../../../types/demo';

interface HighlightReviewProps {
  activeVolObj: Volume | null;
  selectedComic?: Comic | null;
}

interface TikTokCardItem {
  id: string;
  title: string;
  tiktokUrl: string;
}

function TikTokCard({ item }: { item: TikTokCardItem }) {
  return (
    <div
      onClick={() => window.open(item.tiktokUrl, '_blank')}
      className="w-[135px] sm:w-[155px] aspect-[9/16] shrink-0 rounded-2xl overflow-hidden relative border border-neutral-200/60 dark:border-neutral-800 bg-neutral-900 flex flex-col justify-end p-2.5 sm:p-3 shadow-2xs group cursor-pointer transition-all hover:scale-102"
    >
      {/* Gambar Thumbnail dari Public Asset */}
      <img 
        src="/assets/images/thumbnail-tiktok.jpeg" 
        alt={item.title} 
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 pointer-events-none" />

      <div className="absolute top-2 left-2 z-10">
        <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[9px] font-mono font-extrabold uppercase tracking-wider">
          TIKTOK
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/20 z-10">
        <div className="w-9 h-9 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-4 h-4 fill-neutral-900 text-neutral-900 translate-x-0.5" />
        </div>
      </div>

      <div className="relative z-10 space-y-1">
        <p className="text-xs font-sans font-extrabold text-white leading-tight line-clamp-3 group-hover:text-emerald-400 transition-colors">
          {item.title}
        </p>
      </div>
    </div>
  );
}

export const HighlightReview: React.FC<HighlightReviewProps> = ({ activeVolObj, selectedComic }) => {
  // Ambil murni data dari database BookTiktokEmbed (lewat activeVolObj.tiktokEmbeds atau selectedComic)
  const embedsSource = (activeVolObj?.tiktokEmbeds && activeVolObj.tiktokEmbeds.length > 0)
    ? activeVolObj.tiktokEmbeds
    : (selectedComic?.tiktokEmbeds && selectedComic.tiktokEmbeds.length > 0)
      ? selectedComic.tiktokEmbeds
      : (selectedComic?.volumes?.flatMap(v => v.tiktokEmbeds || []) ?? []);

  const tiktokList: TikTokCardItem[] = embedsSource
    .map((embed, index) => ({
      id: embed.id || String(index),
      title: embed.name || embed.title || `Review TikTok ${index + 1}`,
      tiktokUrl: embed.url_video || embed.embed_url || '',
    }))
    .filter((item) => item.tiktokUrl.trim() !== '');

  // Jika tidak ada video TikTok di database, kosongkan (return null)
  if (!tiktokList || tiktokList.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 shadow-xs my-2 transition-all duration-200">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-[#112A12] dark:text-[#457347] shrink-0" />
          <h3 className="text-xs sm:text-sm font-sans font-black tracking-wider text-[#112A12] dark:text-[#457347] uppercase leading-none">
            HIGHLIGHT REVIEW TIKTOK
          </h3>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('highlight-shorts-modal-container');
              if (el) el.scrollBy({ left: -200, behavior: 'smooth' });
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors cursor-pointer"
            title="Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('highlight-shorts-modal-container');
              if (el) el.scrollBy({ left: 200, behavior: 'smooth' });
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors cursor-pointer"
            title="Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <a
            href="https://tiktok.com/@norinoya.official"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors cursor-pointer ml-0.5"
            title="TikTok Official"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.97 2.05 1.64 3.34 1.85.01.88 0 1.77-.01 2.65-.96-.11-1.92-.48-2.73-1.03-.69-.47-1.25-1.11-1.63-1.85-.05 1.48-.03 2.94-.04 4.41-.07 2.58-.93 5.16-2.71 7.03-1.74 1.95-4.32 2.99-6.95 2.87-2.67-.03-5.26-1.24-6.85-3.39-1.75-2.25-2.22-5.4-1.25-8.13C2.15 6.01 4.7 3.86 7.6 3.5c1.47-.15 2.98.08 4.29.81-.01 1-.01 1.99-.02 2.99-.86-.54-1.9-.76-2.9-.61-1.39.21-2.61 1.15-3.19 2.44-.7 1.46-.57 3.29.35 4.62.91 1.34 2.53 2.1 4.14 2 1.4-.04 2.72-.78 3.44-1.97.48-.75.69-1.64.67-2.52.01-3.21 0-6.42.01-9.63-.08-.55-.38-.97-.87-1.23-.28-.15-.59-.22-.92-.22H12.525z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div 
        id="highlight-shorts-modal-container"
        className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pt-1 pb-1 select-none"
      >
        {tiktokList.map((short) => (
          <TikTokCard key={short.id} item={short} />
        ))}
      </div>
    </div>
  );
};