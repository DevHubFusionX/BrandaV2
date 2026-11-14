import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { ProductCard } from '@/components/products/product-card';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryInfoMap: Record<string, { title: string; description: string; parentCategory: string }> = {
  'curated-packs': {
    title: 'Curated Merchandise Packs',
    description: 'Turnkey, customized corporate gift boxes and onboarding welcome packs designed for Nigerian enterprises.',
    parentCategory: 'Curated Packs',
  },
  'prints': {
    title: 'Business Prints & Packaging',
    description: 'Precision luxury packaging, branded stationery, presentation folders, and marketing collateral.',
    parentCategory: 'Packaging & Components',
  },
  'apparel': {
    title: 'Corporate Apparel & Uniforms',
    description: 'Heavyweight custom hoodies, structured polos, corporate caps, and executive branded wear.',
    parentCategory: 'Clothing & Accessories',
  },
  'drinkware-tech': {
    title: 'Drinkware & Executive Tech',
    description: 'Double-walled thermal flasks, high-capacity power banks, wireless chargers, and executive audio.',
    parentCategory: 'Drinkware & Tech',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  const info = categoryInfoMap[slug] || {
    title: `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Catalog`,
    description: `Explore premium branded ${slug.replace('-', ' ')} with volume pricing and nationwide delivery across Nigeria.`,
    parentCategory: 'All Merchandise',
  };

  const canonicalUrl = `${siteConfig.url}/categories/${slug}`;

  return {
    title: `${info.title} | ${siteConfig.name}`,
    description: info.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${info.title} | ${siteConfig.name}`,
      description: info.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'en_NG',
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.category;
  const info = categoryInfoMap[slug] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: `Browse custom corporate ${slug.replace('-', ' ')} tailored for businesses and events.`,
    parentCategory: 'All Merchandise',
  };

  // Structured Data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'All Merchandise', url: '/shop' },
    { name: info.title, url: `/categories/${slug}` },
  ]);

  const categoryProducts = [
    {
      id: `${slug}-1`,
      name: 'Anker® 3-In-1 Power Bank',
      category: 'Drinkware & Tech',
      priceNGN: 48500,
      memberPriceNGN: 42000,
      moq: 3,
      colorsCount: 3,
      slug: 'anker-3-in-1-power-bank',
      shipsLocation: 'Lagos & Nationwide',
      imageUrl: 'https://images.unsplash.com/photo-1609592426009-0d19e917d0c3?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: `${slug}-2`,
      name: 'New Hire Onboarding Welcome Pack (Complete Gift Box)',
      category: 'Curated Packs',
      priceNGN: 38500,
      memberPriceNGN: 32000,
      moq: 15,
      colorsCount: 3,
      slug: 'employee-onboarding-kit',
      shipsLocation: 'Nationwide Delivery',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: `${slug}-3`,
      name: 'Ahead Clubhouse Wool & Flannel Cap',
      category: 'Clothing & Accessories',
      priceNGN: 14500,
      memberPriceNGN: 12800,
      moq: 10,
      colorsCount: 4,
      slug: 'ahead-clubhouse-wool-cap',
      shipsLocation: 'Nationwide',
      imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: `${slug}-4`,
      name: 'Moleskine® Soft Cover Large 12-Month Weekly Planner',
      category: 'Office & Journals',
      priceNGN: 28500,
      memberPriceNGN: 24000,
      moq: 4,
      colorsCount: 1,
      slug: 'moleskine-soft-cover-large-planner',
      shipsLocation: 'Nationwide',
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="bg-white min-h-screen pb-32 text-neutral-900 font-sans">
      <JsonLd data={breadcrumbSchema} />

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
          <span className="text-neutral-600 truncate">{info.title}</span>
        </div>

        {/* Category Header Banner */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            {info.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl leading-relaxed">
            {info.description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
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

      </div>
    </div>
  );
}
