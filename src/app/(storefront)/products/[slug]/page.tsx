import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/commerce/products';
import { siteConfig } from '@/config/site';
import { JsonLd } from '@/components/seo/json-ld';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { ProductDetailClient } from './product-detail-client';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product Not Found | ${siteConfig.name}`,
    };
  }

  const canonicalUrl = `${siteConfig.url}/products/${slug}`;
  const title = `${product.name} | ${siteConfig.name}`;
  const description = product.description.slice(0, 160);

  const images = product.imageUrl 
    ? [{ url: product.imageUrl, width: 800, height: 800, alt: product.name }] 
    : [];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'en_NG',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    slug: product.slug,
    sku: product.sku,
    brand: product.brand,
    basePriceNGN: product.basePriceNGN,
    lowPriceNGN: product.pricingTiers[product.pricingTiers.length - 1]?.unitPriceNGN || product.basePriceNGN,
    highPriceNGN: product.basePriceNGN,
    inStock: product.inStock,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'All Merchandise', url: '/shop' },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  return (
    <>
      {/* Technical SEO: Server-Rendered Schema.org Product & BreadcrumbList JSON-LD */}
      <JsonLd data={[productSchema, breadcrumbSchema]} />

      {/* Interactive Client Component for gallery, tiers, cart persistence & related merchandise */}
      <ProductDetailClient initialProduct={product} slug={slug} />
    </>
  );
}
