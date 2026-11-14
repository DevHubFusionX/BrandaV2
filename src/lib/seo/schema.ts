import { siteConfig } from '@/config/site';

export interface ProductSchemaInput {
  name: string;
  description: string;
  slug: string;
  sku: string;
  brand: string;
  basePriceNGN: number;
  lowPriceNGN: number;
  highPriceNGN: number;
  images?: string[];
  inStock?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Technical SEO: Generates Schema.org JSON-LD for eCommerce Products
 * Complies with Google Merchant Center & Rich Results requirements for high commercial intent queries in Nigeria.
 */
export function generateProductSchema(product: ProductSchemaInput) {
  const productUrl = `${siteConfig.url}/products/${product.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.length
      ? product.images.map((img) => (img.startsWith('http') ? img : `${siteConfig.url}${img}`))
      : [`${siteConfig.url}/opengraph-image.png`],
    description: product.description,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Branda',
    },
    offers: {
      '@type': 'AggregateOffer',
      url: productUrl,
      priceCurrency: 'NGN',
      lowPrice: product.lowPriceNGN || product.basePriceNGN,
      highPrice: product.highPriceNGN || product.basePriceNGN * 1.5,
      offerCount: 1000,
      priceValidUntil: '2027-12-31',
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };
}

/**
 * Technical SEO: Generates Schema.org BreadcrumbList for hierarchical crawl navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Technical SEO: Organization Knowledge Graph Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressRegion: 'Lagos State',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-803-053-1624',
      contactType: 'customer service',
      areaServed: 'NG',
      availableLanguage: ['en'],
    },
  };
}

/**
 * Technical SEO: WebSite SearchAction Sitelinks Schema
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

