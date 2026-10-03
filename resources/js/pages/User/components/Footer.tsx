import { router } from "@inertiajs/react";
import { Instagram,Youtube } from "lucide-react";
import logoDarkUrl from '../../../../../public/assets/images/dark.svg';
import logoLightUrl from '../../../../../public/assets/images/white.svg';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  darkMode: boolean;
}

export default function Footer({ onNavigateHome, onNavigateAbout , darkMode }: FooterProps) {
    const handleNavNews = () => {
    router.visit('/news');
  };

  const handleNavEtalase = () => {
    router.visit('/kios');
  };

  return (
       <footer className="border-t border-neutral-205 dark:border-neutral-850 mt-16 bg-neutral-50 dark:bg-neutral-900 py-12 px-6 sm:px-8 pb-24 md:pb-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">

            {/* Branding details */}
            <div className="space-y-2">
                <img
             src={darkMode ? logoDarkUrl : logoLightUrl}
             alt="Norinoya Logo"
             loading="lazy"
             decoding="async"
             className="max-w-[200px] sm:max-w-[150px] object-contain "
           />
              {/* <span className="font-sans font-black tracking-tight text-xl text-neutral-950 dark:text-white block lowercase">
                norinoya.
              </span> */}
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm font-sans leading-[20px]">
                Platform kurasi database buku (manga, novel dan light novel) legal di Indonesia.
              </p>
            </div>

            {/* Hub menu */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-neutral-700">
              <div className="space-y-2">
                <h6 className="text-xs font-mono tracking-wider font-extrabold text-neutral-400 uppercase leading-[16px]">Fitur Utama</h6>
                <ul className="text-sm space-y-2 leading-[20px] dark:text-neutral-400">
                  <li><button onClick={onNavigateHome} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">Home</button></li>
                  <li><button onClick={onNavigateHome} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">Katalog</button></li>
                  <li><button onClick={handleNavEtalase} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">Kios</button></li>
                  <li><button onClick={handleNavNews} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">News</button></li>
                  {/* <li><button onClick={handleNavSaved} className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors">Tersimpan</button></li> */}
                </ul>
              </div>

              <div className="space-y-2">
                <h6 className="text-xs font-mono tracking-wider font-extrabold text-neutral-400 uppercase leading-[16px]">Kebijakan Hukum</h6>
                <ul className="text-sm space-y-2 leading-[20px] dark:text-neutral-400">
                  <li>
                    <button
                      onClick={() => {
                        onNavigateAbout();
                        setTimeout(() => {
                          document.getElementById('privacy-policy')?.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                      }}
                      className="hover:text-black dark:hover:text-white font-medium cursor-pointer transition-colors"
                    >
                      Legal
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 col-span-2 sm:col-span-1">
                <h6 className="text-xs font-mono tracking-wider font-extrabold text-neutral-400 uppercase leading-[16px]">Media Sosial</h6>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4 py-1.5 px-3 bg-neutral-50 dark:bg-[#262626] rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">@norinoya.official</span>
                    <div className="flex gap-1.5">
                      <a
                        href="https://instagram.com/norinoya.official"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-neutral-700 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-all flex items-center justify-center shadow-xs"
                        title="Instagram @norinoya.official"
                      >
                        <Instagram className="w-3.5 h-3.5 text-neutral-700 dark:text-white" />
                      </a>
                      <a
                        href="https://tiktok.com/@norinoya.official"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-white hover:text-neutral-900 dark:hover:text-white transition-all flex items-center justify-center shadow-xs"
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

                  <div className="flex items-center justify-between gap-4 py-1.5 px-3 bg-neutral-50 dark:bg-[#262626] rounded-xl border border-neutral-100 dark:border-neutral-800">
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">@konotasi.sukasuka</span>
                    <div className="flex gap-1.5">
                      <a
                        href="https://instagram.com/konotasi.sukasuka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-neutral-700 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-all flex items-center justify-center shadow-xs"
                        title="Instagram @konotasi.sukasuka"
                      >
                        <Instagram className="w-3.5 h-3.5 text-neutral-700 dark:text-white" />
                      </a>
                      <a
                        href="https://tiktok.com/@konotasi.sukasuka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-neutral-900 dark:hover:border-white hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-white hover:text-neutral-900 dark:hover:text-white transition-all flex items-center justify-center shadow-xs"
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
                        className="w-7 h-7 rounded-lg bg-white dark:bg-[#171717] border border-neutral-200 dark:border-neutral-700/80 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 text-neutral-700 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-all flex items-center justify-center shadow-xs"
                        title="YouTube @konotasi.sukasuka"
                      >
                        <Youtube className="w-3.5 h-3.5 text-neutral-700 dark:text-white" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto border-t border-neutral-200 dark:border-neutral-800 mt-10 pt-6 text-center text-xs font-mono text-neutral-500 dark:text-neutral-400 flex flex-col items-center justify-center leading-[18px]">
            <span>©2026 norinoya</span>
          </div>
        </footer>
    )
}
