import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
  ArrowLeft,
  Clapperboard,
  CheckCircle2,
  Mic,
  BookOpen,
  BookMarked,
  Info,
  Send,
  type LucideIcon,
} from 'lucide-react';

import Navbar from './Navbar';
import Footer from './Footer';
import { ShareModal } from './ShareModal';
import { getBookTypeLabel } from '../../../utils/mapBookToComic';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type LinkStatus = 'Subscription' | 'Gratis' | 'Digital' | 'Fisik' | 'Penerbit';
type GroupIcon = 'subtitle' | 'dub' | 'book';
type GroupAccent = 'amber' | 'emerald';

interface WatchLinkRow {
  platform: string;
  subLabel?: string;
  status: LinkStatus;
  href: string;
}

interface WatchLinkGroup {
  id: string;
  title: string;
  badgeLabel: string;
  icon: GroupIcon;
  accent: GroupAccent;
  links: WatchLinkRow[];
}

interface MangaCardMeta {
  slug: string;                   // untuk link /buku/{slug}
  coverUrl: string;
  publisherName: string;
  title: string;
  volumeNumber: number | string;  // untuk "Vol.N" + query ?vol=
  authors: string;
  genres: string[];               // ditampilkan slice(0, 2)
  price: number;                  // ditampilkan toLocaleString('id-ID')
  category: string;               // untuk getBookTypeLabel()
  readingRating: string;          // untuk getReadingRatingStyle()
}

interface AdaptationCorrespondence {
  label: string;
  range: string;
  chapters: string;
}

interface TimelineTag {
  label: string;
  tone: 'neutral' | 'amber';
}

interface TimelineEntry {
  id: string;
  index: number;
  studio?: string | null;
  tags?: TimelineTag[];
  title: string;
  description: string;
  manga?: MangaCardMeta | null;
  adaptation?: AdaptationCorrespondence | null;
  watchGroups?: WatchLinkGroup[];
  upcoming?: boolean;
}

export interface PanduanDetailData {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  entries: TimelineEntry[];
}

interface DetailPanduanAdaptasiProps {
  panduan?: PanduanDetailData | null;
}

/* -------------------------------------------------------------------------- */
/*  Style maps                                                                 */
/* -------------------------------------------------------------------------- */

const STATUS_STYLES: Record<LinkStatus, { pill: string; dot: string }> = {
  Subscription: {
    pill: 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400',
    dot: 'bg-red-600',
  },
  Gratis: {
    pill: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400',
    dot: 'bg-emerald-600',
  },
  Digital: {
    pill: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400',
    dot: 'bg-emerald-600',
  },
  Fisik: {
    pill: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400',
    dot: 'bg-emerald-600',
  },
  Penerbit: {
    pill: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400',
    dot: 'bg-emerald-600',
  },
};

const ACCENT_STYLES: Record<GroupAccent, { chip: string; badge: string; dot: string }> = {
  amber: {
    chip: 'bg-amber-50 border-amber-300 text-amber-600 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-400',
    badge: 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400',
    dot: 'bg-amber-600',
  },
  emerald: {
    chip: 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-900/50 dark:text-emerald-400',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400',
    dot: 'bg-emerald-600',
  },
};

const GROUP_ICON: Record<GroupIcon, LucideIcon> = {
  subtitle: CheckCircle2,
  dub: Mic,
  book: BookOpen,
};

// Salinan lokal dari MarketplaceDB (tidak diekspor dari sana) —
// dipakai untuk chip rating umur + warna hover judul kartu buku.
const getReadingRatingStyle = (rating?: string) => {
  switch (rating) {
    case 'Anak & Bimbingan Orang Tua':
    case 'Anak & Bimbingan':
      return {
        bg: 'bg-[#22c55e] dark:bg-[#16a34a] border-emerald-600/30 text-white',
        text: 'Anak & Bimbingan',
        hoverClass: 'group-hover:text-[#41a34c] dark:group-hover:text-emerald-400',
      };
    case 'Remaja':
      return {
        bg: 'bg-[#f59e0b] dark:bg-[#d97706] border-amber-600/30 text-white',
        text: 'Remaja',
        hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
      };
    case 'Dewasa Ringan':
      return {
        bg: 'bg-[#ff6628] dark:bg-[#ea580c] border-orange-600/30 text-white',
        text: 'Dewasa Ringan',
        hoverClass: 'group-hover:text-[#ff6628] dark:group-hover:text-orange-400',
      };
    case 'Dewasa Berat':
      return {
        bg: 'bg-[#ef4444] dark:bg-[#dc2626] border-red-600/30 text-white',
        text: 'Dewasa Berat',
        hoverClass: 'group-hover:text-[#c1271f] dark:group-hover:text-red-400',
      };
    default:
      return {
        bg: 'bg-[#f97316] dark:bg-[#ea580c] border-orange-600/30 text-white',
        text: 'Remaja',
        hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
      };
  }
};

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

function StatusPill({ status }: { status: LinkStatus }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Gratis;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-semibold ${style.pill}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

function WatchLinkItem({ link }: { link: WatchLinkRow }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors"
    >
      <div className="min-w-0 pr-3">
        <div className="font-semibold text-sm text-neutral-950 dark:text-neutral-50">{link.platform}</div>
        {link.subLabel && (
          <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">{link.subLabel}</div>
        )}
      </div>
      <StatusPill status={link.status} />
    </a>
  );
}

function WatchLinksGroup({ group }: { group: WatchLinkGroup }) {
  const accent = ACCENT_STYLES[group.accent];
  const Icon = GROUP_ICON[group.icon];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800/60 rounded-2xl p-4 md:p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${accent.chip}`}>
            <Icon className="w-4 h-4" />
          </div>
          <h4 className="text-[15px] sm:text-base font-bold text-neutral-950 dark:text-neutral-50">{group.title}</h4>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-medium ${accent.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
          {group.badgeLabel}
        </span>
      </div>
      <div className="space-y-2">
        {group.links.map((link) => (
          <WatchLinkItem key={`${group.id}-${link.platform}`} link={link} />
        ))}
      </div>
    </div>
  );
}

function AdaptationBox({ adaptation }: { adaptation: AdaptationCorrespondence }) {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 bg-white dark:bg-neutral-900 shadow-sm mb-4">
      <div className="flex items-center gap-3 mb-3">
        <Info className="w-5 h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 text-[11px] font-mono font-semibold">
          <BookMarked className="w-3.5 h-3.5" />
          <span>{adaptation.label}</span>
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <div className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-semibold select-none shadow-3xs">
          Volume: {adaptation.range}
        </div>
        <div className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 text-[11px] sm:text-xs font-sans font-semibold select-none shadow-3xs">
          Chapter: {adaptation.chapters}
        </div>
      </div>
    </div>
  );
}

/**
 * Kartu buku bergaya postingan MarketplaceDB.
 * - Ada data buku  → kartu utuh, diklik menuju halaman DetailBuku (/buku/{slug}?vol=N).
 * - Tanpa data     → slot placeholder "Segera Hadir" (non-klik).
 */
function BookPostCard({ manga }: { manga?: MangaCardMeta | null }) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!manga) {
    return (
      <div className="w-full max-w-[200px]">
        <div className="h-full bg-white dark:bg-neutral-900 border-2 border-[#EFEFEF] dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between select-none">
          <div className="relative aspect-[3/4] w-full bg-neutral-950 flex flex-col justify-between p-2.5 select-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex flex-col justify-between p-2.5 border border-neutral-700">
              <div className="my-auto text-center px-1">
                <BookOpen className="w-7 h-7 text-neutral-500 stroke-[1.2] mx-auto mb-1 opacity-60" />
                <span className="text-[8px] font-mono tracking-wider text-neutral-400 block">
                  buku
                </span>
                <h4 className="text-[10px] font-sans font-extrabold text-neutral-200 mt-1 line-clamp-3 leading-normal">
                  Segera Hadir
                </h4>
              </div>
            </div>
          </div>
          <div className="space-y-1 p-2.5 flex-1 flex flex-col justify-between text-left">
            <div className="space-y-0.5">
              <span className="text-[9px] sm:text-[9.5px] font-sans text-neutral-400 dark:text-neutral-500 leading-tight block truncate">
                Norinoya
              </span>
              <h4 className="text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100 line-clamp-1 leading-snug">
                Segera Hadir
              </h4>
              <p className="text-[9.5px] sm:text-[10px] font-sans text-neutral-600 dark:text-neutral-400 leading-tight truncate pt-0.5">
                Postingan buku belum tersedia
              </p>
            </div>
            <div className="border-t border-neutral-100 dark:border-neutral-800 my-1.5" />
            <div className="flex items-center justify-start font-mono w-full">
              <span className="font-extrabold text-neutral-400 dark:text-neutral-500 font-sans text-xs shrink-0 leading-none">
                —
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ratingStyle = getReadingRatingStyle(manga.readingRating);
  const hasCover = Boolean(manga.coverUrl) && !imageFailed;

  return (
    <div className="w-full max-w-[200px]">
      <Link
        href={`/buku/${manga.slug}?vol=${manga.volumeNumber}`}
        className="block group cursor-pointer"
      >
        <div className="h-full bg-white dark:bg-neutral-900 border-2 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 border-[#EFEFEF] dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_10px_24px_rgba(0,0,0,0.05)] hover:translate-y-[-2px] select-none">
          {/* Sampul buku */}
          <div className="relative aspect-[3/4] w-full bg-neutral-950 flex flex-col justify-between p-2.5 select-none overflow-hidden">
            {hasCover ? (
              <img
                src={manga.coverUrl}
                alt={`${manga.title} Vol ${manga.volumeNumber}`}
                loading="lazy"
                decoding="async"
                onError={() => setImageFailed(true)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex flex-col justify-between p-2.5 border border-neutral-700">
                <div className="my-auto text-center px-1">
                  <BookOpen className="w-7 h-7 text-neutral-500 stroke-[1.2] mx-auto mb-1 opacity-60" />
                  <span className="text-[8px] font-mono tracking-wider text-neutral-400 capitalize">
                    {getBookTypeLabel(manga.category)}
                  </span>
                  <h4 className="text-[10px] font-sans font-extrabold text-neutral-200 mt-1 line-clamp-3 leading-normal">
                    {manga.title}
                  </h4>
                </div>
              </div>
            )}

            {/* Chip tipe buku & rating umur */}
            <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 pointer-events-none">
              <span className="bg-neutral-100/95 dark:bg-neutral-800/95 text-neutral-900 dark:text-neutral-100 font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8.5px] capitalize leading-none shadow-xs border border-neutral-200/50 dark:border-neutral-700/50">
                {getBookTypeLabel(manga.category)}
              </span>
              {manga.readingRating && (
                <span
                  className={`font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8.5px] leading-none shadow-xs border ${ratingStyle.bg}`}
                >
                  {ratingStyle.text}
                </span>
              )}
            </div>
          </div>

          {/* Detail meta */}
          <div className="space-y-1 p-2.5 flex-1 flex flex-col justify-between text-left">
            <div className="space-y-0.5">
              {/* Penerbit */}
              <span className="text-[9px] sm:text-[9.5px] font-sans text-neutral-400 dark:text-neutral-500 leading-tight block truncate">
                {manga.publisherName}
              </span>

              {/* Judul */}
              <h4
                className={`text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100 ${ratingStyle.hoverClass} transition-colors line-clamp-1 leading-snug`}
              >
                {manga.title}
              </h4>

              {/* Volume */}
              <div className="text-[9.5px] sm:text-[10px] font-sans font-extrabold text-[#112A12] dark:text-[#457347] leading-tight">
                Vol.{manga.volumeNumber}
              </div>

              {/* Penulis */}
              {manga.authors && (
                <p className="text-[9.5px] sm:text-[10px] font-sans text-neutral-600 dark:text-neutral-400 leading-tight truncate pt-0.5">
                  {manga.authors}
                </p>
              )}

              {/* Genre */}
              <div className="flex flex-wrap gap-1 items-center pt-0.5">
                <span className="text-[9px] sm:text-[9.5px] text-neutral-450 dark:text-neutral-550 font-sans line-clamp-1">
                  {manga.genres.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>

            {/* Garis pemisah */}
            <div className="border-t border-neutral-100 dark:border-neutral-800 my-1.5" />

            {/* Harga */}
            <div className="flex items-center justify-start font-mono w-full">
              <span className="font-extrabold text-neutral-950 dark:text-neutral-50 font-sans text-xs shrink-0 leading-none">
                Rp {manga.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function TimelinePin({ index }: { index: number }) {
  return (
    <div className="absolute -left-6 md:-left-10 top-5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-900 flex items-center justify-center text-[11px] sm:text-xs font-mono font-bold z-10 shadow-sm ring-4 ring-white dark:ring-neutral-900">
      {String(index).padStart(2, '0')}
    </div>
  );
}

function TimelineNode({ entry }: { entry: TimelineEntry }) {
  if (entry.upcoming) {
    return (
      <div className="relative timeline-item" data-category="canon release upcoming">
        <TimelinePin index={entry.index} />
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 sm:p-6 shadow-sm border border-dashed border-neutral-300 dark:border-neutral-700">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 text-[11px] font-mono font-semibold">
              Segera Hadir
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-400 text-[11px] font-mono font-medium">
              Belum Tayang
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 mb-2">
            {entry.title}
          </h3>
          <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400">
            {entry.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative timeline-item" data-category="canon release">
      <TimelinePin index={entry.index} />
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-neutral-200/80 dark:border-neutral-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Slot kartu buku (placeholder "Segera Hadir" bila data belum ada) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <BookPostCard manga={entry.manga} />
          </div>

          {/* Content & adaptation correspondence */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {entry.studio && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 text-[11px] font-mono font-semibold">
                    <Clapperboard className="w-3.5 h-3.5" />
                    <span>Studio : {entry.studio}</span>
                  </span>
                )}
                {entry.tags?.map((tag) => (
                  <span
                    key={tag.label}
                    className={
                      tag.tone === 'amber'
                        ? 'px-2 py-0.5 rounded bg-amber-50 border border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-400 text-[11px] font-mono font-medium'
                        : 'px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 text-[11px] font-mono font-semibold'
                    }
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 mb-1.5">
                {entry.title}
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400 mb-4">
                {entry.description}
              </p>
          

              {entry.adaptation && <AdaptationBox adaptation={entry.adaptation} />}
      
       
            </div>

            {/* Quick watch / read links */}
            {entry.watchGroups && entry.watchGroups.length > 0 && (
              <div className="mt-4 pt-4 flex flex-col gap-4 w-full">
                {entry.watchGroups.map((group) => (
                  <WatchLinksGroup key={group.id} group={group} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function DetailPanduanAdaptasi({ panduan }: DetailPanduanAdaptasiProps) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('norinoya-dark-mode') === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  React.useLayoutEffect(() => {
    sessionStorage.setItem('norinoya-dark-mode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleNavHome = () => router.visit('/');
  const handleNavNews = () => router.visit('/news');
  const handleNavKios = () => router.visit('/kios');

  const [shareModalData, setShareModalData] = useState({
    isOpen: false,
    title: '',
    shareUrl: '',
    category: 'Panduan',
  });

  const handleShare = () => {
    if (!panduan) return;

    setShareModalData({
      isOpen: true,
      title: panduan.title,
      shareUrl: `${window.location.origin}/panduan-adaptasi/${panduan.slug}`,
      category: 'Panduan',
    });
  };

  const entries = panduan?.entries ?? [];
  const pageTitle = panduan ? `${panduan.title} - Panduan Adaptasi Norinoya` : 'Panduan Adaptasi - Norinoya';
  const pageDesc = (
    panduan?.description ||
    'Panduan nonton bertahap dan korelasi bab manga untuk adaptasi anime, lengkap dengan tautan takarir, dubbing, dan tempat baca resmi.'
  )
    .replace(/<[^>]*>/g, '')
    .slice(0, 160);

  // SEO: canonical & og:image absolut (SSR-safe — origin kosong saat server render,
  // blade tetap memakai props `meta` dari controller untuk crawler).
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}/panduan-adaptasi/${panduan?.slug ?? ''}`;
  const rawCover = entries.find((entry) => entry.manga?.coverUrl)?.manga?.coverUrl ?? '';
  const ogImage = rawCover
    ? rawCover.startsWith('http')
      ? rawCover
      : `${origin}${rawCover.startsWith('/') ? '' : '/'}${rawCover}`
    : `${origin}/assets/images/logo-dark.png`;

  const listItems = entries.filter((entry) => entry.manga?.slug);

  return (
    <div className="bg-[#FEFFFE] dark:bg-[#202120] min-h-screen text-neutral-950 dark:text-neutral-50 selection:bg-neutral-900 dark:selection:bg-neutral-100 selection:text-white dark:selection:text-neutral-900 flex flex-col justify-between font-sans">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:site_name" content="Norinoya" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="theme-color" content="#E53935" />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: pageTitle,
            itemListOrder: 'https://schema.org/ItemListOrderAscending',
            numberOfItems: listItems.length,
            itemListElement: listItems.map((entry) => ({
              '@type': 'ListItem',
              position: entry.index,
              name: `${entry.manga!.title}${entry.manga!.volumeNumber ? ` Vol. ${entry.manga!.volumeNumber}` : ''}`,
              url: `${origin}/buku/${entry.manga!.slug}`,
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: 'Panduan Adaptasi', item: `${origin}/panduan-adaptasi` },
              { '@type': 'ListItem', position: 3, name: panduan?.title ?? 'Panduan Adaptasi', item: canonicalUrl },
            ],
          })}
        </script>
      </Head>

      <Navbar
        activeTab="about"
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onNavigateHome={handleNavHome}
        onNavigateNews={handleNavNews}
        onNavigateKios={handleNavKios}
      />

      {/* Fixed Top Bar: kembali + bagikan */}
      <div className="fixed top-[57px] sm:top-[61px] left-0 right-0 z-40 w-full bg-white/95 dark:bg-[#202120]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => router.visit('/panduan-adaptasi')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-bold rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2 shrink-0">
            {panduan && (
              <button
                onClick={handleShare}
                className="w-9 h-9 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg cursor-pointer transition-all active:scale-95 border border-neutral-200/50 dark:border-neutral-700 outline-none shrink-0"
                title="Bagikan Panduan Adaptasi"
              >
                <Send className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 pt-20 sm:pt-24 pb-20 md:pb-6 bg-transparent">
        <section className="w-full py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 sm:mb-10 border-b border-neutral-200 dark:border-neutral-800">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 mt-1">
                {panduan?.title ?? 'Panduan Adaptasi'}
              </h1>
              {panduan?.description && (
                <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-3xl">
                  {panduan.description}
                </p>
              )}
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pt-1">
                Panduan Nonton Bertahap &amp; Korelasi Bab · {entries.length} node
              </p>
            </div>
          </div>

          {/* Vertical timeline stack */}
          {entries.length === 0 ? (
            <div className="py-16 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Belum ada node timeline untuk panduan ini.
              </p>
            </div>
          ) : (
            <div className="relative pl-6 md:pl-10 space-y-8 sm:space-y-10 before:content-[''] before:absolute before:left-[17px] md:before:left-[21px] before:top-4 before:bottom-6 before:w-[2px] before:bg-neutral-200 dark:before:bg-neutral-800">
              {entries.map((entry) => (
                <TimelineNode key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer onNavigateHome={handleNavHome} darkMode={darkMode} />

      <ShareModal
        isOpen={shareModalData.isOpen}
        onClose={() => setShareModalData((prev) => ({ ...prev, isOpen: false }))}
        title={shareModalData.title}
        shareUrl={shareModalData.shareUrl}
        category={shareModalData.category}
      />
    </div>
  );
}
