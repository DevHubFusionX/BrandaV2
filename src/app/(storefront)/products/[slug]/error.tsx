'use client';

import React from 'react';
import Link from 'next/link';

export default function ProductError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto py-24 px-4 text-center">
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Something went wrong</h2>
      <p className="text-sm text-neutral-600 mb-6">
        We could not load this product configuration. Please try again.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/shop"
          className="border border-neutral-300 text-neutral-800 px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}

