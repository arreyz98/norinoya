import { useState, type ReactNode } from 'react';
import { BookOpen } from 'lucide-react';

import type { Comic, Volume } from '../../../types/demo';
import { bookPath, isPlainLeftClick } from '../../../utils/bookUrl';
import { getBookTypeLabel } from '../../../utils/mapBookToComic';

/**
 * Gaya label usia baca: warna badge + warna hover judul kartu.
 * Satu-satunya sumber supaya kartu di semua section tampil identik.
 */
export const getReadingRatingStyle = (rating?: string) => {
    switch (rating) {
        case 'Anak & Bimbingan Orang Tua':
        case 'Anak & Bimbingan':
            return {
                bg: 'bg-[#22c55e] dark:bg-[#16a34a] border-emerald-600/30 text-white',
                text: 'Anak & Bimbingan',
                color: '#41a34c',
                hoverClass: 'group-hover:text-[#41a34c] dark:group-hover:text-emerald-400',
                hoverClassKat: 'group-hover/kat:text-[#41a34c] dark:group-hover/kat:text-emerald-400',
            };
        case 'Remaja':
            return {
                bg: 'bg-[#f59e0b] dark:bg-[#d97706] border-amber-600/30 text-white',
                text: 'Remaja',
                color: '#f59e0b',
                hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
                hoverClassKat: 'group-hover/kat:text-[#d97706] dark:group-hover/kat:text-amber-400',
            };
        case 'Dewasa Ringan':
            return {
                bg: 'bg-[#ff6628] dark:bg-[#ea580c] border-orange-600/30 text-white',
                text: 'Dewasa Ringan',
                color: '#ff723c',
                hoverClass: 'group-hover:text-[#ff6628] dark:group-hover:text-orange-400',
                hoverClassKat: 'group-hover/kat:text-[#ff6628] dark:group-hover/kat:text-orange-400',
            };
        case 'Dewasa Berat':
            return {
                bg: 'bg-[#ef4444] dark:bg-[#dc2626] border-red-600/30 text-white',
                text: 'Dewasa Berat',
                color: '#c1271f',
                hoverClass: 'group-hover:text-[#c1271f] dark:group-hover:text-red-400',
                hoverClassKat: 'group-hover/kat:text-[#c1271f] dark:group-hover/kat:text-red-400',
            };
        default:
            return {
                bg: 'bg-[#f97316] dark:bg-[#ea580c] border-orange-600/30 text-white',
                text: 'Remaja',
                color: '#d97706',
                hoverClass: 'group-hover:text-[#d97706] dark:group-hover:text-amber-400',
                hoverClassKat: 'group-hover/kat:text-[#d97706] dark:group-hover/kat:text-amber-400',
            };
    }
};

const getAuthorNameOnly = (source: { authorStory?: string; authorArt?: string }) => {
    // Gabungkan author story & art lalu dedupe; satu orang bisa memegang kedua
    // peran sekaligus, sehingga nama yang sama tidak perlu tampil dua kali.
    const names = `${source.authorStory || ''}, ${source.authorArt || ''}`
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean);

    return Array.from(new Set(names)).join(', ');
};

/**
 * Author untuk kartu per-volume: utamakan author milik volume itu sendiri,
 * baru fallback ke author level series (comic). Tanpa ini, kartu menampilkan
 * author gabungan dari semua buku dalam series yang sama.
 */
export const getVolumeAuthorName = (
    comic: { authorStory?: string; authorArt?: string },
    volume: { authorStory?: string; authorArt?: string },
) => getAuthorNameOnly(volume) || getAuthorNameOnly(comic);

interface BookPostCardProps {
    comic: Comic;
    volume: Volume;
    /** Tandai kartu sedang di-bookmark (border emerald). */
    isBookmarked?: boolean;
    /** `true` untuk gambar di atas lipatan → loading eager + prioritas tinggi. */
    eager?: boolean;
    /** Badge tambahan di pojok kiri atas cover, mis. label "TBA". */
    cornerBadge?: ReactNode;
    /** Handler saat kartu diklik (klik kiri biasa). */
    onOpen: (comic: Comic, volNumber: number | string) => void;
}

/**
 * Kartu postingan buku/volume.
 *
 * Satu-satunya implementasi kartu katalog — dipakai section "Segera Rilis" dan
 * grid hasil pencarian supaya ukuran, padding, border, dan tipografinya konsisten.
 * Perbedaan antar-section cukup lewat prop (`cornerBadge`, `isBookmarked`, `eager`),
 * jangan bikin salinan markup baru.
 */
export default function BookPostCard({
    comic,
    volume,
    isBookmarked = false,
    eager = false,
    cornerBadge,
    onOpen,
}: BookPostCardProps) {
    const [hasCoverError, setHasCoverError] = useState(false);

    const coverImage = volume.coverImage || comic.coverImage;
    const ratingStyle = getReadingRatingStyle(comic.readingRating);
    const authorName = getVolumeAuthorName(comic, volume);
    const genresLabel = comic.genres?.slice(0, 2).join(', ') ?? '';
    const hasPrice = typeof volume.price === 'number' && volume.price > 0;

    return (
        <a
            href={bookPath(comic, volume) ?? undefined}
            onClick={(event) => {
                if (!isPlainLeftClick(event)) return;
                event.preventDefault();
                onOpen(comic, volume.volNumber);
            }}
            className="block group cursor-pointer"
        >
            <div
                className={`h-full bg-white dark:bg-neutral-900 border-2 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 select-none ${
                    isBookmarked
                        ? 'border-emerald-400'
                        : 'border-[#EFEFEF] dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_10px_24px_rgba(0,0,0,0.05)] hover:translate-y-[-2px]'
                }`}
            >
                {/* Cover */}
                <div className="relative aspect-[3/4] w-full bg-neutral-950 overflow-hidden select-none">
                    {coverImage && !hasCoverError ? (
                        <img
                            src={coverImage}
                            alt={`${volume.title || comic.title} Vol ${volume.volNumber}`}
                            loading={eager ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={eager ? 'high' : 'auto'}
                            onError={() => setHasCoverError(true)}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950 flex flex-col justify-center p-2.5 border border-neutral-700">
                            <div className="text-center px-1">
                                <BookOpen className="w-7 h-7 text-neutral-500 stroke-[1.2] mx-auto mb-1 opacity-60" />
                                <span className="text-[8px] font-mono tracking-wider text-neutral-400 capitalize">
                                    {getBookTypeLabel(comic.category)}
                                </span>
                                <h4 className="text-[10px] font-sans font-extrabold text-neutral-200 mt-1 line-clamp-3 leading-normal">
                                    {volume.title || comic.title}
                                </h4>
                            </div>
                        </div>
                    )}

                    {/* Badge tambahan (mis. TBA) */}
                    {cornerBadge && <div className="absolute top-1.5 left-1.5 z-20">{cornerBadge}</div>}

                    {/* Kategori & rating usia baca */}
                    <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 pointer-events-none">
                        <span className="bg-neutral-100/95 dark:bg-neutral-800/95 text-neutral-900 dark:text-neutral-100 font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8.5px] capitalize leading-none shadow-xs border border-neutral-200/50 dark:border-neutral-700/50">
                            {getBookTypeLabel(comic.category)}
                        </span>
                        {comic.readingRating && (
                            <span
                                className={`font-sans font-extrabold px-1.5 py-0.5 rounded-md text-[8.5px] leading-none shadow-xs border ${ratingStyle.bg}`}
                            >
                                {ratingStyle.text}
                            </span>
                        )}
                    </div>
                </div>

                {/* Meta */}
                <div className="space-y-1 p-2.5 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-0.5">
                        <span className="text-[9px] sm:text-[9.5px] font-sans text-neutral-400 dark:text-neutral-500 leading-tight block truncate">
                            {comic.publisherName}
                        </span>

                        <h4
                            className={`text-xs font-sans font-extrabold text-neutral-900 dark:text-neutral-100 ${ratingStyle.hoverClass} transition-colors line-clamp-1 leading-snug`}
                        >
                            {volume.title || comic.title}
                        </h4>

                        <div className="text-[9.5px] sm:text-[10px] font-sans font-extrabold text-[#112A12] dark:text-[#457347] leading-tight">
                            Vol.{volume.volNumber}
                        </div>

                        {authorName && (
                            <p className="text-[9.5px] sm:text-[10px] font-sans text-neutral-600 dark:text-neutral-400 leading-tight truncate pt-0.5">
                                {authorName}
                            </p>
                        )}

                        {genresLabel && (
                            <div className="flex flex-wrap gap-1 items-center pt-0.5">
                                <span className="text-[9px] sm:text-[9.5px] text-neutral-450 dark:text-neutral-550 font-sans line-clamp-1">
                                    {genresLabel}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-neutral-100 dark:border-neutral-800 my-1.5" />

                    <div className="flex items-center justify-start font-mono w-full">
                        <span className="font-extrabold text-neutral-950 dark:text-neutral-50 font-sans text-xs shrink-0 leading-none">
                            {hasPrice ? `Rp ${volume.price.toLocaleString('id-ID')}` : '-'}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
}
