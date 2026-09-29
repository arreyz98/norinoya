import React from 'react';

export default function LoadingNews() {
  return (
    <div className="w-full animate-pulse space-y-8 pb-12 select-none pointer-events-none">
      {/* 1. Hero Landing Banner Skeleton */}
      <div className="relative text-center py-10 md:py-14 bg-neutral-100/70 dark:bg-neutral-900/60 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 px-6 flex flex-col items-center justify-center space-y-4 overflow-hidden shadow-xs dark:shadow-md">
        {/* Shimmer sweep effect */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent pointer-events-none" />

        {/* Pill Badge */}
        <div className="h-6 w-44 bg-neutral-200 dark:bg-neutral-800 rounded-full" />

        {/* Big Title NEWS */}
        <div className="h-10 sm:h-12 w-48 sm:w-56 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />

        {/* Subtitle description */}
        <div className="h-4 w-full max-w-md bg-neutral-200/80 dark:bg-neutral-800/80 rounded-md" />

        {/* Social / Discord Button */}
        <div className="pt-1.5">
          <div className="h-9 w-44 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
        </div>

        {/* Counter Widget Info */}
        <div className="flex items-center gap-4 sm:gap-6 pt-3">
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-6 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            <div className="h-3 w-20 bg-neutral-200/70 dark:bg-neutral-800/70 rounded-md" />
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Layout Skeleton (Category Sidebar, Feed Posts List, Right Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 max-w-7xl mx-auto px-1">
        
        {/* LEFT COLUMN: Sticky Filter & Category Sidebar (3 Columns on lg) */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-4 self-start">
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800 p-4 space-y-4 shadow-xs">
            {/* Title & Search bar */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
              <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
              <div className="h-3 w-16 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
            </div>

            {/* Search Input Skeleton */}
            <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800/70 rounded-xl border border-neutral-200/60 dark:border-neutral-700/60" />

            {/* Category list items */}
            <div className="space-y-1.5 pt-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={`cat-skeleton-${i}`}
                  className="h-9 w-full bg-neutral-50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-between px-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  </div>
                  <div className="h-3 w-6 bg-neutral-200/60 dark:bg-neutral-700/60 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: Featured Feed Posts (5 Columns on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Mobile Search & Category Bar (Visible on mobile/tablet) */}
          <div className="lg:hidden flex flex-col gap-3">
            <div className="h-12 w-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800 p-2 flex items-center gap-2" />
            <div className="h-10 w-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/60 dark:border-neutral-800 p-2 flex items-center gap-2" />
          </div>

          {/* Feed Title & Counter Header */}
          <div className="flex items-center justify-between px-1">
            <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            <div className="h-3 w-20 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-md" />
          </div>

          {/* List of News Post Cards (Skeleton) */}
          {[...Array(3)].map((_, i) => (
            <div key={`news-card-skeleton-${i}`} className="space-y-6">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 p-5 sm:p-6 shadow-xs space-y-3.5">
                
                {/* Meta header: @username • time */}
                <div className="flex items-center gap-2">
                  <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <div className="h-3 w-28 bg-neutral-200/70 dark:bg-neutral-800/70 rounded" />
                  <div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  <div className="h-3 w-16 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                </div>

                {/* Category Badge Pill */}
                <div className="h-6 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200/40 dark:border-neutral-700/40" />

                {/* Title headline lines */}
                <div className="space-y-2">
                  <div className="h-5 sm:h-6 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  <div className="h-5 sm:h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                </div>

                {/* Attached Image Box */}
                <div className="w-full aspect-[16/10] bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden" />

                {/* Footer action buttons */}
                <div className="flex items-center justify-end pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 mt-3">
                  <div className="h-7 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-lg" />
                </div>
              </div>

              {/* Sponsored banner under first card */}
              {i === 0 && (
                <div className="bg-neutral-50/60 dark:bg-neutral-900/40 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700/80 p-5 sm:p-6 flex flex-col items-center justify-center space-y-2">
                  <div className="h-3.5 w-36 bg-neutral-200 dark:bg-neutral-800 rounded" />
                  <div className="h-3 w-72 max-w-full bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Pinned Announcements & Trending (3 Columns on lg) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 self-start">
          
          {/* Pinned Board Card */}
          <div className="bg-[#112A12]/90 dark:bg-[#0c1d0d] p-5 rounded-xl border border-[#1e4220] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#1e4220]">
              <div className="h-4 w-24 bg-emerald-900/60 rounded" />
              <div className="h-3 w-16 bg-emerald-900/60 rounded" />
            </div>
            <div className="space-y-3 pt-1">
              {[...Array(2)].map((_, i) => (
                <div key={`pin-skeleton-${i}`} className="space-y-1.5 p-1">
                  <div className="h-2.5 w-20 bg-emerald-900/60 rounded" />
                  <div className="h-3.5 w-full bg-emerald-800/40 rounded" />
                  <div className="h-3.5 w-4/5 bg-emerald-800/40 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Popular News Card */}
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
              <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-3 w-20 bg-orange-100 dark:bg-orange-950/40 rounded" />
            </div>
            <div className="space-y-3 pt-1">
              {[...Array(4)].map((_, i) => (
                <div key={`pop-skeleton-${i}`} className="flex items-start gap-2.5">
                  <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-800 rounded shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-2.5 w-14 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
                    <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 shadow-xs space-y-3">
            <div className="h-3.5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-14 w-full bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800" />
            <div className="h-14 w-full bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-100 dark:border-neutral-800" />
          </div>
        </div>

      </div>
    </div>
  );
}
