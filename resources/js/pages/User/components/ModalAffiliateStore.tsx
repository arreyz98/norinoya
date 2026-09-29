import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

export interface AffiliateStoreLink {
    id: string;
    url: string;
    storeName: string;
    storeSlug: string;
    brand: string;
    brandSlug: string;
    location?: string;
}

export interface AffiliateStoreGroup {
    storeName: string;
    storeSlug: string;
    brand: string;
    brandSlug: string;
    links: AffiliateStoreLink[];
}

interface ModalAffiliateStoreProps {
    isOpen: boolean;
    onClose: () => void;
    group: AffiliateStoreGroup | null;
    comicTitle: string;
    volNumber?: number | string;
    price?: number;
}

const getBrandColor = (brand: string, brandSlug: string): string => {
    const name = (brand || brandSlug || '').toLowerCase();
    if (name.includes('gramedia')) return '#00519E';
    if (name.includes('shopee')) return '#EE4D2D';
    if (name.includes('tokopedia')) return '#03AC0E';
    return '#22c55e';
};

const getStoreIcon = (brand: string, brandSlug: string): React.JSX.Element => {
    const name = (brand || brandSlug || '').toLowerCase();

    if (name.includes('gramedia')) {
        return (
            <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14H11v-2H9v-2h2v-2h2v2h2v2h-2v2z" />
                <text x="25" y="16.5" fill="currentColor" className="font-sans text-[8px] font-extrabold tracking-widest">
                    GRAMEDIA
                </text>
            </svg>
        );
    }

    if (name.includes('shopee')) {
        return (
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 6H6v-4h6v4z" />
            </svg>
        );
    }

    if (name.includes('tokopedia')) {
        return (
            <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14H11v-2H9v-2h2v-2h2v2h2v2h-2v2z" />
            </svg>
        );
    }

    return (
        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 6H6v-4h6v4z" />
        </svg>
    );
};

export const ModalAffiliateStore: React.FC<ModalAffiliateStoreProps> = ({ isOpen, onClose, group, comicTitle, volNumber, price }) => {
    if (!group) return null;

    const brandColor = getBrandColor(group.brand || group.brandSlug, group.brandSlug);

    const displayBrandName = group.brand || group.brandSlug || 'Store';

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    id="modal-affiliate-store-overlay"
                    className="animate-in fade-in fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto bg-black/65 p-3 backdrop-blur-xs duration-200 sm:p-4"
                    onClick={onClose}
                >
                    <motion.div
                        id="modal-affiliate-store-container"
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 350 }}
                        onClick={(e) => e.stopPropagation()}
                        className="my-auto flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-neutral-200/90 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#141414]"
                    >
                        {/* Header with Platform Branding */}
                        <div
                            className="relative shrink-0 overflow-hidden p-4 text-white sm:p-5"
                            style={{ backgroundColor: brandColor, borderColor: brandColor }}
                        >
                            <div className="pointer-events-none absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10 blur-xl" />

                    <div className="relative z-10 flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                     <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 font-sans text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur-md">
                                         {getStoreIcon(group.brand || group.brandSlug, group.brandSlug)}
                                         <span>Pilih Kota Toko</span>
                                     </div>
                                     <h3 className="font-sans text-lg leading-tight font-extrabold tracking-tight text-white sm:text-xl">
                                         Beli di {displayBrandName}
                                     </h3>
                                    <p className="line-clamp-2 text-xs font-medium text-white/90 sm:text-sm">
                                        {comicTitle} {volNumber ? `• Volume ${volNumber}` : ''}
                                        {price ? ` (Rp. ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(price)})` : ''}
                                    </p>
                                </div>

                                <button
                                    id="close-modal-affiliate-store-btn"
                                    type="button"
                                    onClick={onClose}
                                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/40"
                                    aria-label="Tutup popup"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* List of Affiliate Link Buttons */}
                        <div className="flex-1 space-y-2 overflow-y-auto overscroll-contain p-3 sm:p-4">
                            {[...group.links].sort((a, b) => (a.location ?? '').localeCompare(b.location ?? '')).map((link, index) => {
                                return (
                                    <a
                                        key={link.id || `${link.storeName}-${index}`}
                                        id={`affiliate-link-btn-${link.id || index}`}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ '--brand-color': brandColor } as React.CSSProperties}
                                        className={`group flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-neutral-200/90 bg-white p-3 text-left shadow-xs transition-all duration-150 hover:border-[var(--brand-color)] hover:bg-[#03AC0E]/5 hover:shadow-sm active:scale-[0.99] dark:border-neutral-800 dark:bg-[#181818] dark:hover:bg-[#03AC0E]/10`}
                                    >
                                        {/* Store Icon & Details */}
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div
                                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold text-white shadow-xs transition-transform group-hover:scale-105"
                                                style={{ backgroundColor: brandColor }}
                                            >
                                                {index + 1}
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="truncate capitalize font-sans text-sm font-extrabold text-neutral-900 transition-colors group-hover:text-neutral-950 sm:text-base dark:text-neutral-100 dark:group-hover:text-white">
                                                        {link.location}
                                                    </span>
                                                </div>

                                                 <div className="mt-0.5 flex items-center gap-1.5 truncate font-sans text-xs text-neutral-500 dark:text-neutral-400">
                                                      <svg className="w-3 h-3 text-neutral-400 shrink-0 fill-current" viewBox="0 0 24 24">
                                                            <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 6H6v-4h6v4z"/>
                                                        </svg>
                                                     <span className="truncate">
                                                         {link.storeName}
                                                     </span>
                                                 </div>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Footer Referral Note */}
                        <div className="flex shrink-0 items-center justify-center gap-1.5 border-t border-neutral-100 bg-neutral-50/90 p-3 sm:p-3.5 dark:border-neutral-800/80 dark:bg-[#181818]/90">
                            <svg className="h-3.5 w-3.5 shrink-0 fill-none stroke-current stroke-2 text-emerald-600" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            <span className="text-center font-sans text-[11px] text-neutral-500 dark:text-neutral-400">
                                Link referral toko buku orisinal &amp; berlisensi resmi
                            </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
