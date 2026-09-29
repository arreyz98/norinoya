import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TOAST_DURATION = 3000;

/**
 * Hook notifikasi bookmark: kembalikan `message` untuk dirender
 * dan `show` untuk memicunya.
 */
export function useBookmarkToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(null), TOAST_DURATION);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { message, show };
}

export function BookmarkToast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[140] w-max max-w-[92vw] bg-neutral-950 text-white dark:bg-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 font-sans"
        >
          <span className="text-xs font-bold leading-snug">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
