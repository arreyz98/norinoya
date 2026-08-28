import React from 'react';
import { BookOpen, Newspaper, ShoppingBag, Sun, Moon } from 'lucide-react';
import logoDarkUrl from '../../../../../public/assets/images/logo-dark.png';
import logoLightUrl from '../../../../../public/assets/images/logo-light.png';

export interface NavbarProps {
  activeTab: 'home' | 'news' | 'kios' | 'database' | 'about' | 'etalase' | 'calendar';
  darkMode: boolean;
  toggleDarkMode: () => void;
  onNavigateHome?: () => void;
  onNavigateNews?: () => void;
  onNavigateKios?: () => void;
}

export default function Navbar({
  activeTab,
  darkMode,
  toggleDarkMode,
  onNavigateHome,
  onNavigateNews,
  onNavigateKios,
}: NavbarProps) {
  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = '/';
    }
  };

  const handleNewsClick = () => {
    if (onNavigateNews) {
      onNavigateNews();
    } else {
      window.location.href = '/news';
    }
  };

  const handleKiosClick = () => {
    if (onNavigateKios) {
      onNavigateKios();
    } else {
      window.location.href = '/kios';
    }
  };

  const isHomeActive = activeTab === 'home' || activeTab === 'database';
  const isNewsActive = activeTab === 'news';
  const isKiosActive = activeTab === 'kios' || activeTab === 'etalase';

  return (
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
            className="h-60 max-w-[200px] sm:max-w-[240px] w-auto object-contain transition-transform group-hover:scale-105 duration-150 pt-6"
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
      <nav className="hidden md:flex items-center justify-center gap-1.5 bg-neutral-50 dark:bg-neutral-900/45 border border-neutral-200/50 dark:border-neutral-700/50 p-1 rounded-lg shrink-0 justify-self-center">
        <button
          onClick={handleHomeClick}
          className={`px-3 py-1.5 text-[12px] font-mono font-bold rounded transition-all cursor-pointer outline-none focus:outline-none select-none flex items-center gap-1.5 ${
            isHomeActive
              ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-xs border border-neutral-200/20 dark:border-neutral-600'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-transparent'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>norinoya</span>
        </button>
        <button
          onClick={handleNewsClick}
          className={`px-3 py-1.5 text-[12px] font-mono font-bold rounded transition-all cursor-pointer outline-none focus:outline-none select-none flex items-center gap-1.5 ${
            isNewsActive
              ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-neutral-50 shadow-xs border border-neutral-200/20 dark:border-neutral-600'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-transparent'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          <span>News</span>
        </button>
        <button
          onClick={handleKiosClick}
          className={`px-3 py-1.5 text-[12px] font-mono font-bold rounded transition-all cursor-pointer outline-none focus:outline-none select-none flex items-center gap-1.5 ${
            isKiosActive
              ? 'bg-white dark:bg-neutral-700 text-neutral-950 dark:text-white shadow-xs border border-neutral-200/20 dark:border-neutral-600'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white border border-transparent'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Kios</span>
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
  );
}
