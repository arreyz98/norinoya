import React from 'react';

export default function LoadingDetailBuku() {
  return (
    <div className="w-full bg-white dark:bg-neutral-950 flex flex-col min-h-screen animate-pulse select-none pointer-events-none">
      <div className="h-full w-full bg-white dark:bg-[#202120] text-neutral-950 dark:text-neutral-50 flex flex-col relative">
        
        {/* Top Header Sticky Bar Skeleton */}
        <div className="fixed top-[58px] sm:top-[64px] left-0 right-0 z-40 w-full bg-white/95 dark:bg-[#202120]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800">
          <div className="max-w-4xl w-full mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
            {/* Tombol Kembali Skeleton */}
            <div className="h-9 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
            {/* Tombol Bagikan Skeleton */}
            <div className="w-9 h-9 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          </div>
        </div>

        {/* Scrollable Container Area */}
        <div className="w-full h-fit lg:max-w-[92%] xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-24 pt-16 sm:pt-20 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-28 dark:bg-neutral-950">
          
          {/* Main Book Card Skeleton (Cover + Right Column) */}
          <div className="bg-neutral-50/80 dark:bg-[#0F0F0F] p-3 sm:p-5 md:p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col md:flex-row gap-4 md:gap-6 items-start relative overflow-hidden shadow-xs">
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent pointer-events-none" />

            {/* Left Column: Cover Jacket Art & Thumbnails */}
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-80">
              <div className="relative aspect-[3/4] w-full max-w-[260px] mx-auto md:max-w-none rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 shadow-md">
                {/* Overlay shadow placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-5 gap-1.5 self-center w-full">
                {[...Array(5)].map((_, i) => (
                  <div key={`thumb-skeleton-${i}`} className="aspect-square rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                ))}
              </div>
            </div>

            {/* Right Column: Combined Info Panel */}
            <div className="space-y-4 flex-1 pt-1 w-full">
              {/* Title & Volume Heading */}
              <div className="space-y-2">
                <div className="h-7 md:h-8 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                <div className="h-5 md:h-6 w-1/2 bg-neutral-200/70 dark:bg-neutral-800/70 rounded-md" />
              </div>

              {/* Synopsis paragraph lines */}
              <div className="space-y-2 py-1">
                <div className="h-3.5 w-full bg-neutral-200/80 dark:bg-neutral-800/80 rounded" />
                <div className="h-3.5 w-11/12 bg-neutral-200/80 dark:bg-neutral-800/80 rounded" />
                <div className="h-3.5 w-4/5 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
              </div>

              {/* Collector Badge box */}
              <div className="p-4 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs max-w-xl space-y-3">
                <div className="h-6 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
                <div className="h-3 w-56 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                <div className="h-px bg-neutral-150 dark:bg-neutral-800/80 my-2" />
                <div className="h-3 w-28 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                <div className="h-3 w-40 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
              </div>

              {/* Divider */}
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-4" />

              {/* Metadata Badges & Authors */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-18 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-3.5 w-36 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                  <div className="h-3.5 w-36 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                </div>

                {/* Genre pills */}
                <div className="flex items-center gap-1.5 pt-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={`genre-skeleton-${i}`} className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Grid Details Body (Left: Volume Details, Right: Book Specs & Relevan) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-full">
            
            {/* Left Detail Column (8 Cols) */}
            <div className="col-span-1 md:col-span-8 space-y-6 w-full">
              
              {/* Keterangan / News Link Box */}
              <div className="space-y-3">
                <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="h-3.5 w-full bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                <div className="h-3.5 w-4/5 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                <div className="h-16 w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl" />
              </div>

              {/* Volume Selector Carousel */}
              <div className="space-y-3">
                <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="flex items-center gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={`vol-btn-skeleton-${i}`} className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                  ))}
                </div>
              </div>

              {/* Active Volume details card (Price & Affiliate Links) */}
              <div className="rounded-xl p-3.5 sm:p-5 space-y-4 sm:space-y-5 bg-neutral-50/40 dark:bg-[#171717] border border-neutral-200/70 dark:border-neutral-800">
                <div className="flex justify-between items-center">
                  <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  <div className="h-7 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="h-3.5 w-64 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                  <div className="space-y-2 pt-1">
                    <div className="h-9 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                    <div className="h-9 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                    <div className="h-9 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Metadata Column (4 Cols) */}
            <div className="col-span-1 md:col-span-4 space-y-4 w-full">
              
              {/* Spesifikasi Buku Box */}
              <div className="bg-neutral-50 dark:bg-[#171717] rounded-2xl p-4.5 space-y-3.5 border border-neutral-200/70 dark:border-neutral-800">
                <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded pb-2 border-b border-neutral-200 dark:border-neutral-800" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={`spec-skeleton-${i}`} className="space-y-1">
                      <div className="h-2.5 w-24 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                      <div className="h-3.5 w-36 bg-neutral-200 dark:bg-neutral-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Katalog Relevan Box */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-150 dark:border-neutral-800">
                  <div className="h-4 w-36 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-4 w-14 bg-neutral-200/70 dark:bg-neutral-800/70 rounded-md" />
                </div>
                <div className="h-3 w-52 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                <div className="space-y-2 pt-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={`rel-skeleton-${i}`} className="p-2.5 bg-neutral-50/80 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 rounded-xl flex gap-3 items-center">
                      <div className="w-11 h-15 bg-neutral-200 dark:bg-neutral-800 rounded-md shrink-0" />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="h-2.5 w-12 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                        <div className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
                        <div className="h-3 w-16 bg-neutral-200/80 dark:bg-neutral-800/80 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
