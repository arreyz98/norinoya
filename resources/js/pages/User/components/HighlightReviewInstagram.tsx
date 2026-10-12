import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { Volume, Comic } from '../../../types/demo';

interface HighlightReviewInstagramProps {
  activeVolObj: Volume | null;
  selectedComic?: Comic | null;
}

interface InstagramCardItem {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

function InstagramCard({ item }: { item: InstagramCardItem }) {
  // Thumbnail opsional: kalau tidak ada (atau gambarnya gagal dimuat, mis. URL
  // Instagram CDN yang sudah kedaluwarsa), kartu otomatis jadi teks saja —
  // tanpa kotak gambar kosong.
  const [imageFailed, setImageFailed] = useState(false);
  const showThumbnail = Boolean(item.thumbnail) && !imageFailed;

  const open = () => window.open(item.url, '_blank', 'noopener,noreferrer');

  return (
    <div
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      className="flex gap-3 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 sm:p-3 shadow-2xs group cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md overflow-hidden"
    >
      {/* Thumbnail kiri (hanya bila tersedia) */}
      {showThumbnail && (
        <div className="relative w-[92px] sm:w-[104px] aspect-[4/5] shrink-0 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Kolom kanan: label platform + judul + deskripsi */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <div className="flex items-center gap-1.5">
          <Instagram className="w-3.5 h-3.5 text-[#E1306C] shrink-0" />
          <span className="text-[10px] font-sans font-black tracking-wider uppercase text-neutral-500 dark:text-neutral-400 leading-none">
            INSTAGRAM
          </span>
        </div>

        <p className="text-xs sm:text-sm font-sans font-extrabold text-neutral-900 dark:text-neutral-100 leading-tight line-clamp-2 group-hover:text-[#112A12] dark:group-hover:text-[#457347] transition-colors">
          {item.title}
        </p>

        {item.description && (
          <p className="text-[11px] sm:text-xs font-sans text-neutral-500 dark:text-neutral-400 leading-snug line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export const HighlightReviewInstagram: React.FC<HighlightReviewInstagramProps> = ({ activeVolObj, selectedComic }) => {
  // Hanya tampilkan card Instagram milik VOLUME yang sedang dibuka.
  // Sengaja TIDAK jatuh ke embed volume lain dalam series yang sama — kalau
  // series punya beberapa volume dan hanya salah satunya ber-card IG, card itu
  // tidak boleh bocor ke halaman volume yang tidak punya.
  const embedsSource = activeVolObj
    ? (activeVolObj.instagramEmbeds ?? [])
    : (selectedComic?.instagramEmbeds ?? []);

  const items: InstagramCardItem[] = embedsSource
    .map((embed, index) => ({
      id: embed.id || String(index),
      url: (embed.url || '').trim(),
      thumbnail: embed.thumbnail_url || undefined,
      title: embed.title || embed.name || `Review Instagram ${index + 1}`,
      description: embed.description || undefined,
    }))
    .filter((item) => item.url !== '');

  // Jika tidak ada postingan Instagram di database, kosongkan (return null)
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 shadow-xs my-2 transition-all duration-200">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Instagram className="w-5 h-5 text-[#112A12] dark:text-[#457347] shrink-0" />
          <h3 className="text-xs sm:text-sm font-sans font-black tracking-wider text-[#112A12] dark:text-[#457347] uppercase leading-none">
            HIGHLIGHT REVIEW INSTAGRAM
          </h3>
        </div>

        <a
          href="https://instagram.com/norinoya.official"
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors cursor-pointer"
          title="Instagram Official"
        >
          <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
      </div>

      {/* Grid kartu horizontal (thumbnail + teks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 pb-1 select-none">
        {items.map((item) => (
          <InstagramCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
