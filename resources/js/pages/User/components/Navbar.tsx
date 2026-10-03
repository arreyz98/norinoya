import React from 'react';
import { router } from '@inertiajs/react';
import { Home, Newspaper, ShoppingBag, Bookmark, Sun, Moon } from 'lucide-react';
import logoDarkUrl from '../../../../../public/assets/images/dark.svg';
import logoLightUrl from '../../../../../public/assets/images/white.svg';
import { useBookmarks } from '../../../utils/bookmarkStorage';

export interface NavbarProps {
  activeTab: 'home' | 'news' | 'kios' | 'database' | 'about' | 'etalase' | 'calendar' | 'bookmark';
  darkMode: boolean;
  toggleDarkMode: () => void;
  onNavigateHome?: () => void;
  onNavigateNews?: () => void;
  onNavigateKios?: () => void;
  onNavigateBookmark?: () => void;
}

export default function Navbar({
  activeTab,
  darkMode,
  toggleDarkMode,
  onNavigateHome,
  onNavigateNews,
  onNavigateKios,
  onNavigateBookmark,
}: NavbarProps) {
  const { counts } = useBookmarks();

  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      router.visit('/');
    }
  };

  const handleNewsClick = () => {
    if (onNavigateNews) {
      onNavigateNews();
    } else {
      router.visit('/news');
    }
  };

  const handleKiosClick = () => {
    if (onNavigateKios) {
      onNavigateKios();
    } else {
      router.visit('/kios');
    }
  };

  const handleBookmarkClick = () => {
    if (onNavigateBookmark) {
      onNavigateBookmark();
    } else {
      router.visit('/bookmark');
    }
  };

  const isHomeActive = activeTab === 'home' || activeTab === 'database';
  const isNewsActive = activeTab === 'news';
  const isKiosActive = activeTab === 'kios' || activeTab === 'etalase';
  const isBookmarkActive = activeTab === 'bookmark';

  const mobileButtonClass = (isActive: boolean) =>
    `flex flex-col items-center justify-center flex-1 py-1 cursor-pointer outline-none focus:outline-none transition-transform duration-150 group active:scale-95 text-center ${
      isActive
         ? 'text-emerald-600 dark:text-emerald-400 stroke-emerald-600 dark:stroke-emerald-400 fill-emerald-500/15 dark:fill-emerald-900/60'
         : 'text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 fill-transparent'
    }`;

  return (
    <>
      <header className="bg-[#FEFFFE] dark:bg-[#202120] border-b border-neutral-100 dark:border-neutral-800/60 sticky top-0 z-[50] py-3 px-4 sm:px-6 flex md:grid md:grid-cols-3 items-center justify-between md:justify-items-stretch transition-colors duration-200">
        {/* Logo Container */}
        <div className="flex items-center justify-between w-full md:w-auto md:justify-start gap-3">
          <div
            className="relative h-9 sm:h-10 flex items-center cursor-pointer group select-none"
            onClick={handleHomeClick}
          >
            <img
              src={darkMode ? logoDarkUrl : logoLightUrl}
              alt="Norinoya Logo"
              className="absolute max-w-[200px] sm:max-w-[240px] w-auto object-contain transition-transform scale-70"
            />
          </div>

          {/* Mobile Dark Mode Toggle */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg border border-neutral-200/50 dark:border-neutral-700 transition-all active:scale-95 shadow-3xs cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#DA6B1C]" /> : <Moon className="w-4 h-4 text-[#112A12]" />}
            </button>
          </div>
        </div>

        {/* Nav Items - Hidden on mobile, sticky bottom navigation handles it inside Viewport */}
        <nav className="hidden md:flex items-center justify-center gap-1.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 p-1 rounded-xl shrink-0 justify-self-center shadow-xs">
          <button
            onClick={handleHomeClick}
            className={`px-3.5 py-1.5 text-[13px] font-sans font-semibold rounded-lg transition-colors duration-150 cursor-pointer outline-none focus:outline-none select-none flex items-center gap-2 group ${
              isHomeActive
                ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-neutral-200/80 dark:border-neutral-700'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-transparent'
            }`}
          >
            <Home className="w-4.5 h-4.5" />
            <span>Home</span>
          </button>
          <button
            onClick={handleKiosClick}
            className={`px-3.5 py-1.5 text-[13px] font-sans font-semibold rounded-lg transition-colors duration-150 cursor-pointer outline-none focus:outline-none select-none flex items-center gap-2 group ${
              isKiosActive
                ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-neutral-200/80 dark:border-neutral-700'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-transparent'
            }`}
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            <span>Kios</span>
          </button>
          <button
            onClick={handleNewsClick}
            className={`px-3.5 py-1.5 text-[13px] font-sans font-semibold rounded-lg transition-colors duration-150 cursor-pointer outline-none focus:outline-none select-none flex items-center gap-2 group ${
              isNewsActive
                ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 shadow-xs border border-neutral-200/80 dark:border-neutral-700'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-transparent'
            }`}
          >
            <Newspaper className="w-4.5 h-4.5" />
            <span>News</span>
          </button>
          <button
            onClick={handleBookmarkClick}
            className={`px-3.5 py-1.5 text-[13px] font-sans font-semibold rounded-lg transition-colors duration-150 cursor-pointer outline-none focus:outline-none select-none flex items-center gap-2 group ${
              isBookmarkActive
                ? 'bg-white dark:bg-neutral-800 text-[#DA6B1C] shadow-xs border border-neutral-200/80 dark:border-neutral-700'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-transparent'
            }`}
          >
            <span className="relative flex items-center">
              <Bookmark className={`w-4.5 h-4.5 ${isBookmarkActive ? 'fill-[#DA6B1C]' : ''}`} />
              {counts.total > 0 && (
                <span
                  className="absolute -top-2 -right-2 min-w-[15px] h-[15px] px-1 flex items-center justify-center rounded-full bg-[#DA6B1C] text-white text-[9px] font-bold leading-none tabular-nums ring-2 ring-neutral-50 dark:ring-neutral-900/45"
                  title={`${counts.total} item tersimpan`}
                >
                  {counts.total > 99 ? '99+' : counts.total}
                </span>
              )}
            </span>
            <span>Bookmark</span>
          </button>
        </nav>

        {/* Desktop Utilities - Right Side */}
        <div className="hidden md:flex items-center gap-2 justify-self-end">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg cursor-pointer border border-neutral-200/50 dark:border-neutral-700 transition-all shadow-3xs"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#DA6B1C]" /> : <Moon className="w-4 h-4 text-[#112A12]" />}
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white/98 dark:bg-neutral-900/98 backdrop-blur-md border-t border-neutral-200/80 dark:border-neutral-800 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.35)] px-2 pt-1.5 pb-[max(6px,env(safe-area-inset-bottom,6px))] select-none flex items-center justify-around w-full">
        <button onClick={handleHomeClick} className={mobileButtonClass(isHomeActive)}>
          <Home className="w-5 h-5 stroke-2 transition-colors duration-150" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">Home</span>
        </button>
        <button onClick={handleKiosClick} className={mobileButtonClass(isKiosActive)}>
          <ShoppingBag className="w-5 h-5 stroke-2 transition-colors duration-150" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">Kios</span>
        </button>
        <button onClick={handleNewsClick} className={mobileButtonClass(isNewsActive)}>
          <Newspaper className="w-5 h-5 stroke-2 transition-colors duration-150" />
          <span className="text-xs font-sans font-bold leading-none tracking-tight">News</span>
        </button>
        <button onClick={handleBookmarkClick} className={mobileButtonClass(isBookmarkActive)}>
          <span className="relative flex items-center justify-center mb-0.5">
            <Bookmark className="w-5 h-5 stroke-2 transition-colors duration-150" />
            {counts.total > 0 && (
              <span
                className={`absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 flex items-center justify-center rounded-full bg-[#DA6B1C] text-white text-[9px] font-bold leading-none tabular-nums ring-2 ${
                  isBookmarkActive
                    ? 'ring-neutral-100/90 dark:ring-neutral-700'
                    : 'ring-white/95 dark:ring-neutral-800/95'
                }`}
              >
                {counts.total > 99 ? '99+' : counts.total}
              </span>
            )}
          </span>
          <span className="text-xs font-sans font-bold leading-none tracking-tight">Bookmark</span>
        </button>
      </div>
    </>
  );
}
