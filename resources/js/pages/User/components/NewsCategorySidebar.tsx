import React from 'react';
import { 
  Search, Sliders, Plus, X, Globe, Calendar, RefreshCw, Sparkles, Tag, 
  Newspaper, Tv, Ticket, Gamepad2, Mic, BookMarked, BookOpen, BookText 
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

export interface NewsCategorySidebarProps {
  leftSidebarRef: React.RefObject<HTMLDivElement | null>;
  searchInput: string;
  setSearchInput: (val: string) => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  scrollToFeedTop: () => void;
  isScrolled: boolean;
  isCategoryExpanded: boolean;
  setIsCategoryExpanded: (val: boolean) => void;
  selectedCategories: string[];
  handleToggleCategory: (catId: string, forceSingle?: boolean) => void;
  todayPostsCount: number;
  NEWS_UPDATES: NewsUpdate[];
}

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

export default function NewsCategorySidebar({
  leftSidebarRef,
  searchInput,
  setSearchInput,
  searchTerm,
  setSearchTerm,
  scrollToFeedTop,
  isScrolled,
  isCategoryExpanded,
  setIsCategoryExpanded,
  selectedCategories,
  handleToggleCategory,
  todayPostsCount,
  NEWS_UPDATES,
}: NewsCategorySidebarProps) {
  return (
    <div
      ref={leftSidebarRef}
      className="hidden lg:flex lg:col-span-3 flex-col gap-4 self-start sticky top-20 max-h-[calc(100vh-5.5rem)] overflow-y-auto pr-1 no-scrollbar"
    >
      {/* SEARCH BAR PANEL */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs">
        <h3 className="text-xs font-mono font-extrabold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase mb-3">
          Cari Berita & Review
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const clean = searchInput.trim();
            setSearchTerm(clean);
            scrollToFeedTop();

            const raw = clean.replace(/\s+/g, ' ').toLowerCase();
            if (raw.length >= 3 && !/(.)\1{3,}/.test(raw) && /[\p{L}\p{N}]/u.test(raw)) {
              const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
              fetch('/news/search-log', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-TOKEN': csrfToken,
                  'Accept': 'application/json',
                },
                body: JSON.stringify({ keyword: raw }),
              }).catch(() => {
                // Silently catch error
              });
            }
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Cari kata kunci..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full text-xs bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-3 pr-7 py-2.5 outline-none focus:border-[#112A12] dark:focus:border-[#112A12] transition-colors"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  setSearchTerm('');
                  scrollToFeedTop();
                }}
                className="absolute right-2 top-2.5 text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 font-mono outline-none cursor-pointer"
              >
                X
              </button>
            )}
          </div>
          <button
            type="submit"
            className="p-2.5 bg-[#112A12] hover:bg-[#0c1d0d] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center shrink-0 shadow-xs"
            title="Cari"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
        {searchTerm && (
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#112A12] dark:text-[#457347] font-medium bg-[#112A12]/10 dark:bg-[#112A12]/20 px-2.5 py-1 rounded-md">
            <span className="truncate">Filter: "{searchTerm}"</span>
            <button
              type="button"
              onClick={() => {
                setSearchInput('');
                setSearchTerm('');
                scrollToFeedTop();
              }}
              className="text-xs font-bold hover:underline cursor-pointer ml-1 shrink-0"
            >
              Reset
            </button>
          </div>
        )}
      </div>

      {/* CATEGORY FILTER PANEL */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs flex flex-col gap-3 transition-all">
        <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="text-xs font-mono font-extrabold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#112A12]" />
            <span>{isScrolled && !isCategoryExpanded ? 'Kategori Terpilih' : 'Kategori Berita'}</span>
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-bold">
            {selectedCategories.includes('all') ? 'Semua' : `${selectedCategories.length} Aktif`}
          </span>
        </div>

        {/* MINIMIZED MODE */}
        {isScrolled && !isCategoryExpanded ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1.5">
              {selectedCategories.map(catId => {
                const item = CATEGORY_ITEMS.find(c => c.id === catId);
                if (!item) return null;
                const Icon = item.icon;
                return (
                  <button
                    key={catId}
                    onClick={() => handleToggleCategory(catId)}
                    className={`px-2.5 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${item.activeColor}`}
                    title="Klik untuk menghapus filter ini"
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.label}</span>
                    {catId !== 'all' && (
                      <X className="w-3 h-3 ml-0.5 opacity-80 hover:opacity-100 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 mt-1.5">
              <button
                onClick={() => setIsCategoryExpanded(true)}
                className="flex-1 h-9 px-3 text-xs font-mono font-bold rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#112A12]" />
                <span>Tambah / Ubah Kategori</span>
              </button>

              <button
                onClick={() => handleToggleCategory('all', true)}
                className="w-9 h-9 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
                title="Reset Filter Kategori"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* FULL EXPANDED CATEGORY LIST */
          <div className="flex flex-col gap-1.5 max-h-[360px] lg:max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {CATEGORY_ITEMS.map(item => {
              const isSelected = selectedCategories.includes(item.id);
              const Icon = item.icon;
              const count = item.countKey === 'all'
                ? todayPostsCount
                : NEWS_UPDATES.filter(n => n.category === item.countKey).length;

              return (
                <React.Fragment key={item.id}>
                  {item.hasTopDivider && (
                    <div className="my-1.5 border-t border-neutral-200/80 dark:border-neutral-800 w-full" />
                  )}
                  <button
                    onClick={() => handleToggleCategory(item.id)}
                    className={`w-full px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? item.activeColor + ' shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500 text-neutral-900 font-extrabold uppercase ml-1">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-black/20 text-white' : 'bg-neutral-200/60 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
