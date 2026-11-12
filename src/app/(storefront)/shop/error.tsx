'use client';

import React from 'react';
import Link from 'next/link';

export default function ShopError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-white min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">
          Unable to load merchandise catalog
        </h2>
        <p className="text-xs text-neutral-500">
          We encountered an issue fetching the latest product catalog. Please retry or contact support.
        </p>
        <div className="pt-2 flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-md hover:bg-neutral-800 transition-colors"
          >
            Retry
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-white border border-neutral-300 text-neutral-900 text-xs font-semibold rounded-md hover:bg-neutral-50 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

