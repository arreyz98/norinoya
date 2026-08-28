import React from 'react';
import { Pin, ChevronRight, Flame, Globe, Instagram, Youtube, Mail, CheckCircle2 } from 'lucide-react';
import { NewsUpdate } from '../../../types/demo';

export interface NewsRightSidebarProps {
  NEWS_UPDATES: NewsUpdate[];
  TRENDING_TOPICS?: Array<{ id: string; tag: string; count: string; title: string }>;
  selectPost: (post: NewsUpdate | null) => void;
  setSearchInput?: (val: string) => void;
  setSearchTerm?: (val: string) => void;
  scrollToFeedTop: () => void;
  isNewsletterSubscribed: boolean;
  newsletterEmail: string;
  setNewsletterEmail: (val: string) => void;
  handleSubscribeNewsletter: (e: React.FormEvent) => void;
  onNavigateToCatalog?: () => void;
}

export default function NewsRightSidebar({
  NEWS_UPDATES,
  selectPost,
  scrollToFeedTop,
  isNewsletterSubscribed,
  newsletterEmail,
  setNewsletterEmail,
  handleSubscribeNewsletter,
  onNavigateToCatalog,
}: NewsRightSidebarProps) {
  return (
    <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 self-start sticky top-20">
      
      {/* 1. PINNED ANNOUNCEMENTS BOARD */}
      <div className="bg-[#112A12] dark:bg-[#0c1d0d] text-white p-5 rounded-xl border border-[#1e4220] shadow-xs">
        <div className="flex items-center justify-between mb-3 border-b border-[#1e4220] pb-2.5">
          <div className="flex items-center gap-1.5">
            <Pin className="w-4 h-4 text-[#DA6B1C] fill-[#DA6B1C]" />
            <h3 className="text-xs font-mono font-extrabold tracking-wider text-[#8eb790] uppercase">
              Disematkan
            </h3>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1e4220] text-[#8eb790] font-bold">
            Info Resmi
          </span>
        </div>

        <div className="flex flex-col gap-1 -mx-2">
          {NEWS_UPDATES.filter(p => p.isPinned || true).slice(0, 2).length > 0 ? (
            NEWS_UPDATES.slice(0, 2).map((pinnedPost) => (
              <div
                key={`pinned-${pinnedPost.id}`}
                onClick={() => selectPost(pinnedPost)}
                className="flex items-center justify-between cursor-pointer p-2.5 rounded-xl hover:bg-[#163217] transition-colors group"
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#508252]">
                    <span className="font-extrabold text-[#DA6B1C]">@{pinnedPost.username}</span>
                    <span>•</span>
                    <span>{pinnedPost.timestamp}</span>
                  </div>
                  <p className="text-xs font-extrabold text-white line-clamp-2 group-hover:text-rose-200 transition-colors leading-snug">
                    {pinnedPost.title}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#508252] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </div>
            ))
          ) : (
            <p className="text-xs text-[#8eb790] p-2">Belum ada pengumuman disematkan.</p>
          )}
        </div>
      </div>

      {/* 2. BERITA POPULER */}
      <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-2.5">
          <h3 className="text-xs font-mono font-extrabold tracking-wider text-neutral-800 dark:text-neutral-200 uppercase flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-[#DA6B1C] fill-[#DA6B1C]" />
            <span>Berita Populer</span>
          </h3>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-orange-50 dark:bg-orange-950/60 text-[#DA6B1C] font-bold">
            Paling Banyak Dilihat
          </span>
        </div>

        <div className="flex flex-col gap-2 -mx-1">
          {(() => {
            // Sort by reaction count, replies count or length as popularity proxy
            const popularList = [...NEWS_UPDATES]
              .sort((a, b) => {
                const countA = (a.reactions?.reduce((acc: number, r: { count?: number }) => acc + (Number(r.count) || 0), 0) || 0) + (a.title?.length || 0);
                const countB = (b.reactions?.reduce((acc: number, r: { count?: number }) => acc + (Number(r.count) || 0), 0) || 0) + (b.title?.length || 0);
                return countB - countA;
              })
              .slice(0, 5);

            if (popularList.length === 0) {
              return <p className="text-xs text-neutral-400 p-2">Belum ada berita populer.</p>;
            }

            return popularList.map((post, idx) => (
              <div
                key={`pop-${post.id}`}
                onClick={() => {
                  selectPost(post);
                  scrollToFeedTop();
                }}
                className="flex items-start gap-2.5 cursor-pointer p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-all group"
              >
                <span className="font-mono font-black text-sm text-neutral-400 group-hover:text-[#DA6B1C] w-4 text-center shrink-0 pt-0.5">
                  {idx + 1}
                </span>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-tight block">
                    {post.category?.replace('_', ' ')}
                  </span>
                  <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-[#DA6B1C] transition-colors line-clamp-2 leading-snug">
                    {post.title || post.content}
                  </p>
                </div>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* 3. MEDIA SOSIAL RESMI */}
      <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs flex flex-col gap-4">
        <h3 className="text-xs font-sans font-black tracking-wider text-[#112A12] dark:text-[#457347] uppercase flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#112A12] dark:text-[#457347]" />
          <span>MEDIA SOSIAL RESMI</span>
        </h3>

        <div className="flex flex-col gap-3">
          {/* NORINOYA */}
          <div className="p-3 bg-neutral-50 dark:bg-[#262626] rounded-xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-extrabold text-[#112A12] dark:text-[#457347] uppercase tracking-wider">NORINOYA</div>
              <div className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 truncate">@norinoya.official</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href="https://instagram.com/norinoya.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-neutral-600 dark:text-neutral-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all flex items-center justify-center shadow-xs"
                title="Instagram @norinoya.official"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@norinoya.official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all flex items-center justify-center shadow-xs"
                title="TikTok @norinoya.official"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.97 2.05 1.64 3.34 1.85.01.88 0 1.77-.01 2.65-.96-.11-1.92-.48-2.73-1.03-.69-.47-1.25-1.11-1.63-1.85-.05 1.48-.03 2.94-.04 4.41-.07 2.58-.93 5.16-2.71 7.03-1.74 1.95-4.32 2.99-6.95 2.87-2.67-.03-5.26-1.24-6.85-3.39-1.75-2.25-2.22-5.4-1.25-8.13C2.15 6.01 4.7 3.86 7.6 3.5c1.47-.15 2.98.08 4.29.81-.01 1-.01 1.99-.02 2.99-.86-.54-1.9-.76-2.9-.61-1.39.21-2.61 1.15-3.19 2.44-.7 1.46-.57 3.29.35 4.62.91 1.34 2.53 2.1 4.14 2 1.4-.04 2.72-.78 3.44-1.97.48-.75.69-1.64.67-2.52.01-3.21 0-6.42.01-9.63-.08-.55-.38-.97-.87-1.23-.28-.15-.59-.22-.92-.22H12.525z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* KONOTASI */}
          <div className="p-3 bg-neutral-50 dark:bg-[#262626] rounded-xl border border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-mono font-extrabold text-orange-600 dark:text-[#DA6B1C] uppercase tracking-wider">KONOTASI</div>
              <div className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 truncate">@konotasi.sukasuka</div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href="https://instagram.com/konotasi.sukasuka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-neutral-600 dark:text-neutral-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all flex items-center justify-center shadow-xs"
                title="Instagram @konotasi.sukasuka"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@konotasi.sukasuka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all flex items-center justify-center shadow-xs"
                title="TikTok @konotasi.sukasuka"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.86.97 2.05 1.64 3.34 1.85.01.88 0 1.77-.01 2.65-.96-.11-1.92-.48-2.73-1.03-.69-.47-1.25-1.11-1.63-1.85-.05 1.48-.03 2.94-.04 4.41-.07 2.58-.93 5.16-2.71 7.03-1.74 1.95-4.32 2.99-6.95 2.87-2.67-.03-5.26-1.24-6.85-3.39-1.75-2.25-2.22-5.4-1.25-8.13C2.15 6.01 4.7 3.86 7.6 3.5c1.47-.15 2.98.08 4.29.81-.01 1-.01 1.99-.02 2.99-.86-.54-1.9-.76-2.9-.61-1.39.21-2.61 1.15-3.19 2.44-.7 1.46-.57 3.29.35 4.62.91 1.34 2.53 2.1 4.14 2 1.4-.04 2.72-.78 3.44-1.97.48-.75.69-1.64.67-2.52.01-3.21 0-6.42.01-9.63-.08-.55-.38-.97-.87-1.23-.28-.15-.59-.22-.92-.22H12.525z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@konotasi.sukasuka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition-all flex items-center justify-center shadow-xs"
                title="YouTube @konotasi.sukasuka"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PREMIUM NEWSLETTER ALERT SUBSCRIPTION */}
      <div className="bg-[#183619] dark:bg-[#09160a] text-white p-5 rounded-xl border border-[#1e4220] relative overflow-hidden shadow-xs">
        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-[#112A12]/20" />
        
        <div className="relative flex flex-col gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1e4220] flex items-center justify-center">
            <Mail className="w-4 h-4 text-[#8eb790]" />
          </div>
          <h4 className="text-sm font-extrabold tracking-tight">Dapatkan Update Rilisan Instan!</h4>
          <p className="text-[11px] text-[#8eb790] leading-relaxed">
            Berlangganan buletin untuk menerima email notifikasi otomatis jika judul incaranmu dirilis m&c! Akasha atau Elex Media.
          </p>

          {isNewsletterSubscribed ? (
            <div className="bg-[#09160a]/80 p-3 rounded-lg border border-[#1e4220] flex items-center gap-2 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-white">Anda telah terdaftar di alert!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribeNewsletter} className="flex gap-2 mt-1">
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 text-xs bg-[#09160a]/60 text-white placeholder-[#558857] border border-[#1e4220] rounded-lg px-2.5 py-2 outline-none focus:border-[#112A12]"
              />
              <button
                type="submit"
                className="bg-white hover:bg-neutral-100 text-[#09160a] font-bold text-xs px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                Daftar
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 5. BANNER PROMO LINK TO KIOS */}
      {onNavigateToCatalog && (
        <div 
          onClick={onNavigateToCatalog}
          className="bg-emerald-900 text-white p-4 rounded-xl border border-emerald-800 flex items-center justify-between cursor-pointer hover:bg-emerald-950 transition-colors shadow-xs"
        >
          <div className="space-y-0.5">
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-emerald-300">KATALOG KIOS</h4>
            <p className="text-xs font-extrabold">Beli Komik Bekas Review Konotasi Store!</p>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-300" />
        </div>
      )}

    </div>
  );
}
