import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shareUrl: string;
  category?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  shareUrl,
  category = 'Post',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback
      const input = document.createElement('input');
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  const socialLinks = [
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-[#25D366]/30',
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%0A${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12.031 2c-5.514 0-9.999 4.486-9.999 10.001 0 1.932.551 3.737 1.503 5.272l-1.535 5.602 5.753-1.508c1.472.825 3.167 1.29 4.962 1.29 5.515 0 9.999-4.486 9.999-10.001 0-5.515-4.484-10.001-9.999-10.001zm0 18.232c-1.616 0-3.155-.445-4.487-1.233l-.322-.192-3.325.872.887-3.243-.211-.336c-.883-1.405-1.353-3.036-1.353-4.717 0-4.708 3.829-8.537 8.536-8.537s8.537 3.829 8.537 8.537-3.829 8.537-8.536 8.537zm4.686-6.386c-.257-.128-1.522-.751-1.757-.837-.235-.085-.406-.128-.577.128-.171.257-.662.837-.812 1.008-.15.171-.3.192-.557.064-.257-.128-1.085-.4-2.068-1.277-.765-.683-1.282-1.526-1.432-1.783-.15-.257-.016-.396.113-.524.116-.115.257-.3.385-.45.128-.15.171-.257.257-.428.085-.171.043-.321-.021-.45-.064-.128-.577-1.391-.791-1.903-.208-.5-.42-.431-.577-.439-.15-.008-.321-.008-.492-.008s-.45.064-.685.321c-.235.257-.9.88-.9 2.147 0 1.267.922 2.493 1.05 2.664.128.171 1.815 2.772 4.398 3.887.615.265 1.096.423 1.471.542.617.196 1.178.168 1.621.102.495-.074 1.522-.622 1.736-1.224.214-.602.214-1.117.15-1.224-.064-.107-.235-.171-.492-.299z"/>
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      color: 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 border-neutral-700',
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: (
        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 border-[#1877F2]/30',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      color: 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 text-pink-600 dark:text-pink-400 hover:from-purple-500/20 hover:via-pink-500/20 hover:to-rose-500/20 border-pink-500/30',
      url: `https://www.instagram.com/`,
      onClick: () => {
        handleCopy();
      },
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      color: 'bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9]/20 border-[#229ED9]/30',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.324-.437.892-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.325.016.096.036.314.02.485z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      color: 'bg-neutral-900/10 dark:bg-neutral-100/10 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-900/20 dark:hover:bg-neutral-100/20 border-neutral-900/30 dark:border-neutral-100/30',
      url: `https://www.tiktok.com/`,
      onClick: () => {
        handleCopy();
      },
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.33 22a6.33 6.33 0 0 0 6.33-6.33V9.05a8.16 8.16 0 0 0 4.67 1.47V7.07a4.85 4.85 0 0 1-.74-.38z"/>
        </svg>
      )
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white dark:bg-[#1C1C1C] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-150 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#112A12]/10 text-[#112A12]">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white leading-tight">
                  Bagikan {category}
                </h3>
                <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 line-clamp-1 max-w-[240px]">
                  {title}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5">
            {/* Social Media Buttons Grid */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Pilih Media Sosial
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (item.onClick) item.onClick();
                    }}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border text-xs font-bold transition-all ${item.color}`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Copy Link Section */}
            <div className="space-y-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
              <label className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                Salin Tautan Link
              </label>
              <div className="flex items-center justify-between gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 rounded-xl">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full min-w-0 bg-transparent px-2.5 text-xs font-mono text-neutral-700 dark:text-neutral-300 outline-none truncate"
                />
                <button
                  onClick={handleCopy}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0 ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xs'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

