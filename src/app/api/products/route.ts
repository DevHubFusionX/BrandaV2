import { NextResponse } from 'next/server';
import { FX_RATES } from '@/lib/commerce/pricing';
import { detailedProducts, DetailedProduct } from '@/lib/commerce/products';

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  minimumOrderQuantity?: number;
  shippingInformation?: string;
  images: string[];
  thumbnail: string;
}

// Category mapper from public eCommerce categories to Branda corporate merchandise categories
function mapToBrandaCategory(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes('laptop') || cat.includes('phone') || cat.includes('tablet') || cat.includes('audio') || cat.includes('tech')) {
    return 'Drinkware & Tech';
  }
  if (cat.includes('shirt') || cat.includes('apparel') || cat.includes('hoodie') || cat.includes('dress') || cat.includes('shoe')) {
    return 'Clothing & Accessories';
  }
  if (cat.includes('bag') || cat.includes('luggage') || cat.includes('travel')) {
    return 'Travel, Bags & Accessories';
  }
  if (cat.includes('fragrance') || cat.includes('beauty') || cat.includes('skin')) {
    return 'Curated Packs';
  }
  if (cat.includes('sport') || cat.includes('outdoor')) {
    return 'Sports & Outdoor';
  }
  return 'Office & Journals';
}

function normalizeProduct(p: DummyJsonProduct): DetailedProduct {
  const slug = p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const basePriceNGN = Math.round(p.price * FX_RATES.NGN_PER_USD);
  const memberDiscountPct = Math.round(p.discountPercentage || 12);
  const memberPriceNGN = Math.round(basePriceNGN * (1 - memberDiscountPct / 100));
  const moq = p.minimumOrderQuantity || Math.floor(Math.random() * 5) + 3;

  const pricingTiers = [
    { minQty: moq, maxQty: 24, unitPriceNGN: basePriceNGN, discountPct: 0 },
    { minQty: 25, maxQty: 49, unitPriceNGN: Math.round(basePriceNGN * 0.91), discountPct: 9 },
    { minQty: 50, maxQty: 99, unitPriceNGN: Math.round(basePriceNGN * 0.84), discountPct: 16 },
    { minQty: 100, maxQty: null, unitPriceNGN: Math.round(basePriceNGN * 0.74), discountPct: 26 },
  ];

  return {
    id: String(p.id),
    slug: `${slug}-${p.id}`,
    name: p.title,
    brand: p.brand || 'Branda Premium',
    sku: p.sku || `BRD-${p.id.toString().padStart(5, '0')}`,
    category: mapToBrandaCategory(p.category),
    inStock: p.stock > 0,
    basePriceNGN,
    memberPriceNGN,
    moq,
    shippingInfo: p.shippingInformation || 'Lagos & Nationwide Delivery',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1E3A8A' },
      { name: 'Graphite', hex: '#4B5563' },
    ],
    decorationOptions: [
      'Full Color High-Res UV Print',
      'Precision Screen Print',
      'Laser Engraving',
    ],
    sizes: ['ONE SIZE'],
    pricingTiers,
    description: p.description,
    imageUrl: p.thumbnail || (p.images && p.images[0]) || undefined,
    images: p.images || (p.thumbnail ? [p.thumbnail] : []),
    details: [
      { label: 'Category', value: mapToBrandaCategory(p.category) },
      { label: 'Minimum Order', value: `${moq} units` },
      { label: 'Lead Time', value: p.shippingInformation || '3-5 Working Days' },
      { label: 'Branding Method', value: 'High-Res UV / Screen Print' },
      { label: 'Packaging', value: 'Individual Protective Box' },
    ],
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('q');
  const limitParam = searchParams.get('limit');
  const limit = limitParam !== null ? parseInt(limitParam, 10) : 100;
  const skip = parseInt(searchParams.get('skip') || '0', 10);

  try {
    let apiUrl = limit === 0 
      ? 'https://dummyjson.com/products?limit=0' 
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (search) {
      apiUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit || 100}`;
    }

    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache on edge for 1 hour
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch from external API: ${res.statusText}`);
    }

    const data = await res.json();
    let normalized = (data.products as DummyJsonProduct[]).map(normalizeProduct);

    if (category && category !== 'All') {
      normalized = normalized.filter((p) => p.category === category);
    }

    return NextResponse.json({
      products: normalized,
      total: data.total || normalized.length,
      limit: data.limit,
      skip: data.skip,
    });
  } catch (error) {
    console.warn('External API unavailable, serving curated fallback catalog:', error);
    
    // Fallback gracefully to curated local catalog
    const localList = Object.values(detailedProducts);
    return NextResponse.json({
      products: localList,
      total: localList.length,
      limit,
      skip: 0,
      fallback: true,
    });
  }
}
