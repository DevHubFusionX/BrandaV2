import { NextResponse } from 'next/server';
import { FX_RATES } from '@/lib/commerce/pricing';
import { detailedProducts, DetailedProduct } from '@/lib/commerce/products';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // 1. Check local detailed catalog first (instant match)
  if (detailedProducts[id]) {
    return NextResponse.json(detailedProducts[id]);
  }

  // 2. Extract numeric ID if slug ends with numeric suffix (e.g. `anker-power-bank-1` -> 1)
  const numericId = id.split('-').pop();

  if (numericId && !isNaN(Number(numericId))) {
    try {
      const res = await fetch(`https://dummyjson.com/products/${numericId}`, {
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const p = await res.json();
        const basePriceNGN = Math.round(p.price * FX_RATES.NGN_PER_USD);
        const memberPriceNGN = Math.round(basePriceNGN * 0.88);
        const moq = p.minimumOrderQuantity || 5;

        const normalized: DetailedProduct = {
          id: String(p.id),
          slug: id,
          name: p.title,
          brand: p.brand || 'Branda Premium',
          sku: p.sku || `BRD-${p.id}`,
          category: p.category,
          inStock: p.stock > 0,
          basePriceNGN,
          memberPriceNGN,
          moq,
          shippingInfo: p.shippingInformation || 'Lagos & Nationwide Delivery',
          colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Navy', hex: '#1E3A8A' },
          ],
          decorationOptions: [
            'Full Color High-Res UV Print',
            'Precision Screen Print',
            'Laser Engraving',
          ],
          sizes: ['ONE SIZE'],
          pricingTiers: [
            { minQty: moq, maxQty: 24, unitPriceNGN: basePriceNGN, discountPct: 0 },
            { minQty: 25, maxQty: 49, unitPriceNGN: Math.round(basePriceNGN * 0.91), discountPct: 9 },
            { minQty: 50, maxQty: 99, unitPriceNGN: Math.round(basePriceNGN * 0.84), discountPct: 16 },
            { minQty: 100, maxQty: null, unitPriceNGN: Math.round(basePriceNGN * 0.74), discountPct: 26 },
          ],
          description: p.description,
          imageUrl: p.thumbnail || (p.images && p.images[0]) || undefined,
          images: p.images || (p.thumbnail ? [p.thumbnail] : []),
          details: [
            { label: 'Category', value: p.category },
            { label: 'Minimum Order Quantity', value: `${moq} units` },
            { label: 'Warranty & Specs', value: p.warrantyInformation || 'Enterprise Quality Guaranteed' },
            { label: 'Return Policy', value: p.returnPolicy || '30 days corporate return policy' },
          ],
        };

        return NextResponse.json(normalized);
      }
    } catch (e) {
      console.warn('Could not fetch single product from external API:', e);
    }
  }

  // 3. Fallback to default product template
  return NextResponse.json(detailedProducts['anker-3-in-1-power-bank']);
}
