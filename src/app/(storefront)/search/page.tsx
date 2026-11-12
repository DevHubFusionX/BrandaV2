import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ProductCard } from '@/components/products/product-card';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolved = await searchParams;
  const q = resolved.q || '';
  return {
    title: q ? `Search results for "${q}" | ${siteConfig.name}` : `Search Products | ${siteConfig.name}`,
    robots: {
      index: false, // Technical SEO: Prevent crawl waste on internal search parameter queries
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolved = await searchParams;
  const query = resolved.q || '';

  const mockCatalog = [
    {
      id: '1',
      name: 'Anker® 3-In-1 Power Bank',
      category: 'Drinkware & Tech',
      priceNGN: 48500,
      memberPriceNGN: 42000,
      moq: 3,
      colorsCount: 3,
      slug: 'anker-3-in-1-power-bank',
      shipsLocation: 'Ships Nigeria',
    },
    {
      id: '2',
      name: 'New Hire Onboarding Welcome Pack (Complete Gift Box)',
      category: 'Curated Packs',
      priceNGN: 38500,
      memberPriceNGN: 32000,
      moq: 15,
      colorsCount: 3,
      slug: 'employee-onboarding-kit',
      shipsLocation: 'Nationwide Delivery',
    },
    {
      id: '3',
      name: 'Ahead Clubhouse Wool & Flannel Cap',
      category: 'Clothing & Accessories',
      priceNGN: 14500,
      memberPriceNGN: 12800,
      moq: 10,
      colorsCount: 4,
      slug: 'ahead-clubhouse-wool-cap',
      shipsLocation: 'Nationwide',
    },
    {
      id: '4',
      name: 'Moleskine® Soft Cover Large 12-Month Weekly Planner',
      category: 'Office & Journals',
      priceNGN: 28500,
      memberPriceNGN: 24000,
      moq: 4,
      colorsCount: 1,
      slug: 'moleskine-soft-cover-large-planner',
      shipsLocation: 'Nationwide',
    },
  ];

  let results: any[] = mockCatalog;
  if (query) {
    results = mockCatalog.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <div className="bg-white min-h-screen pb-32 text-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-6">
          <Link
            href="/shop"
            className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 hover:bg-neutral-800 transition-colors"
            title="Back to All Merchandise"
          >
            <ArrowLeft className="w-3 h-3 stroke-[2.5]" />
          </Link>
          <Link href="/shop" className="hover:text-black font-semibold text-neutral-900">
            All Merchandise
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-600 truncate">Search</span>
        </div>

        {/* Search Header */}
        <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
              {query ? `Search results for "${query}"` : 'All Products'}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Showing {results.length} matching {results.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Quick Search Input */}
          <form action="/search" method="GET" className="w-full sm:w-72">
            <div className="relative flex items-center bg-neutral-100 rounded-full px-3.5 py-2 border border-neutral-200 focus-within:border-black focus-within:bg-white transition-all">
              <SearchIcon className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Filter search..."
                className="bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none w-full"
              />
            </div>
          </form>
        </div>

        {/* Product Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                category={product.category}
                priceNGN={product.priceNGN}
                memberPriceNGN={product.memberPriceNGN}
                moq={product.moq}
                colorsCount={product.colorsCount}
                shipsLocation={product.shipsLocation}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <p className="text-sm font-semibold text-neutral-900">
              No products found matching &quot;{query}&quot;
            </p>
            <p className="text-xs text-neutral-500">
              Try searching with broader keywords or browse our full merchandise collections.
            </p>
            <Link
              href="/shop"
              className="inline-flex px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-md hover:bg-neutral-800 transition-colors"
            >
              Browse All Merchandise
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
