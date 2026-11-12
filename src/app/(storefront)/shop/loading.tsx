import React from 'react';

export default function ShopLoading() {
  return (
    <div className="bg-white min-h-screen pb-24 text-neutral-900 font-sans animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-32 bg-neutral-200 rounded mb-4" />

        {/* Title Skeleton */}
        <div className="h-8 w-64 bg-neutral-200 rounded mb-6" />

        {/* Category Nav Box Skeleton */}
        <div className="h-24 w-full bg-neutral-100 rounded-xl mb-8" />

        {/* Catalog 2-Column Grid: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="h-10 w-full bg-neutral-100 rounded-lg" />
            <div className="h-40 w-full bg-neutral-100 rounded-lg" />
            <div className="h-40 w-full bg-neutral-100 rounded-lg" />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-lg p-4 space-y-3">
                <div className="aspect-square w-full bg-neutral-100 rounded-md" />
                <div className="h-4 w-3/4 bg-neutral-200 rounded" />
                <div className="h-4 w-1/3 bg-neutral-200 rounded" />
                <div className="h-8 w-full bg-neutral-100 rounded" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

