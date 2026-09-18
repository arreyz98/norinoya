import React from 'react';

export default function LoadingKios() {
  return (
    <div className="w-full animate-pulse space-y-6 pb-12 select-none pointer-events-none">
      {/* 1. Kios Hero Banner Skeleton */}
      <div className="relative text-center py-10 md:py-14 bg-neutral-100/70 dark:bg-neutral-900/60 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 overflow-hidden shadow-xs dark:shadow-md">
        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent pointer-events-none" />

        {/* Pill Badge Partner */}
        <div className="h-6 w-52 bg-neutral-200 dark:bg-neutral-800 rounded-full" />

        {/* Big Title KIOS */}
        <div className="h-10 sm:h-12 w-44 sm:w-52 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />

        {/* Subtitle description */}
        <div className="h-4 w-full max-w-xl bg-neutral-200/80 dark:bg-neutral-800/80 rounded-md" />

        {/* Action Button: Gabung Partner? */}
        <div className="pt-0.5">
          <div className="h-9 w-36 sm:w-40 bg-neutral-200 dark:bg-neutral-800 rounded-lg sm:rounded-xl" />
        </div>

        {/* Counter Widget Info */}
        <div className="flex items-center gap-4 sm:gap-6 pt-1 sm:pt-2">
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            <div className="h-3 w-16 bg-neutral-200/70 dark:bg-neutral-800/70 rounded-md" />
          </div>
          <div className="h-5 sm:h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            <div className="h-3 w-16 bg-neutral-200/70 dark:bg-neutral-800/70 rounded-md" />
          </div>
          <div className="h-5 sm:h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            <div className="h-3 w-16 bg-neutral-200/70 dark:bg-neutral-800/70 rounded-md" />
          </div>
        </div>
      </div>

      {/* 2. Advanced Search Filter Panel Skeleton */}
      <div className="bg-white dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 p-5 rounded-2xl space-y-4 shadow-3xs">
        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="h-3.5 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </div>

        <div className="flex flex-col gap-3.5">
          {/* Main search bar input */}
          <div className="space-y-1">
            <div className="h-3 w-28 bg-neutral-200/80 dark:bg-neutral-800/80 rounded" />
            <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-800 rounded-xl" />
          </div>

          {/* Filter dropdowns (Kategori, Partner, Harga, dll) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
            {[...Array(4)].map((_, i) => (
              <div key={`kios-filter-${i}`} className="space-y-1">
                <div className="h-2.5 w-16 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                <div className="h-9 w-full bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-800 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Subheader: Total Hasil & Sort dropdown Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="space-y-1.5">
          <div className="h-2.5 w-28 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
          <div className="h-3.5 w-52 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-36 bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-800 rounded-lg" />
          <div className="h-9 w-18 bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-800 rounded-lg" />
        </div>
      </div>

      {/* 4. Products Grid Skeleton (6 columns layout, 18 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
        {[...Array(18)].map((_, i) => (
          <div
            key={`kios-product-skeleton-${i}`}
            className="h-full bg-white dark:bg-neutral-900 border border-[#EFEFEF] dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-3xs"
          >
            {/* Cover Image Box */}
            <div className="relative aspect-[3/4] w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              {/* Badges top & bottom */}
              <div className="absolute top-2 right-2 w-10 h-3.5 bg-neutral-300 dark:bg-neutral-700 rounded" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <div className="w-12 h-3.5 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
                <div className="w-10 h-3.5 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
              </div>
            </div>

            {/* Meta details */}
            <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between space-y-2">
              <div className="space-y-1.5">
                <div className="h-2.5 w-16 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                <div className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="h-3.5 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="h-2.5 w-12 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
              </div>

              {/* Price & Buy footer */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 mt-2 space-y-1">
                <div className="flex items-baseline gap-1.5">
                  <div className="h-3.5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-2.5 w-10 bg-neutral-200/50 dark:bg-neutral-800/50 rounded" />
                </div>
                <div className="h-2.5 w-20 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
