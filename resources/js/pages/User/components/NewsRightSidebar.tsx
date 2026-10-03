import React from 'react';
import { Pin, ChevronRight, Flame, Globe, Instagram, Youtube } from 'lucide-react';
import { NewsUpdate } from '../../../types/demo';

export interface NewsRightSidebarProps {
  NEWS_UPDATES: NewsUpdate[];
  TRENDING_TOPICS?: Array<{ id: string; tag: string; count: string; title: string }>;
  selectPost: (post: NewsUpdate | null) => void;
  setSearchInput?: (val: string) => void;
  setSearchTerm?: (val: string) => void;
  scrollToFeedTop: () => void;
  isNewsletterSubscribed?: boolean;
  newsletterEmail?: string;
  setNewsletterEmail?: (val: string) => void;
  handleSubscribeNewsletter?: (e: React.FormEvent) => void;
  onNavigateToCatalog?: () => void;
}

export default function NewsRightSidebar({
  NEWS_UPDATES,
  selectPost,
  scrollToFeedTop,
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
               <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.28a8.16 8.16 0 0 0 4.91 1.62V7.46a4.85 4.85 0 0 1-1-.77z"/>
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
             <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.28a8.16 8.16 0 0 0 4.91 1.62V7.46a4.85 4.85 0 0 1-1-.77z"/>
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


    </div>
  );
}
