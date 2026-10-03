import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
  threshold?: number;
}

export default function BackToTopButton({ threshold = 250 }: BackToTopButtonProps) {
  const [showToTop, setShowToTop] = useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowToTop(scrollTop > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showToTop && (
        <motion.button
          id="to-top-button"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScrollToTop}
          className="fixed bottom-[88px] right-4 md:bottom-8 md:right-8 z-[100] bg-white/95 dark:bg-[#171717]/95 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-white p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:bg-neutral-100 dark:hover:bg-[#262626] hover:text-neutral-950 dark:hover:text-white focus:outline-none flex items-center justify-center cursor-pointer font-bold group transition-colors"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
