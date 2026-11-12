import { PricingTier } from './products';
import { CartItem, CartSummary } from '@/types/cart';

export const FX_RATES = {
  NGN_PER_USD: 1500,
  VAT_RATE: 0.075, // 7.5% Nigerian VAT for corporate procurement
} as const;

/**
 * SOLID / DRY Currency Formatter
 * Unified across Storefront, PDP, Cart, and Checkout
 */
export function formatCurrency(
  amountNGN: number,
  currency: 'NGN' | 'USD' = 'NGN'
): string {
  if (currency === 'NGN') {
    return `₦${Math.round(amountNGN).toLocaleString('en-NG')}`;
  }
  const usd = amountNGN / FX_RATES.NGN_PER_USD;
  return `$${usd.toFixed(2)}`;
}

/**
 * Resolves the unit price based on volume pricing tiers and order quantity
 */
export function resolveTierUnitPrice(
  tiers: PricingTier[],
  quantity: number,
  basePriceNGN: number
): number {
  if (!tiers || tiers.length === 0) return basePriceNGN;
  
  const matchedTier = tiers.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );

  return matchedTier ? matchedTier.unitPriceNGN : basePriceNGN;
}

/**
 * Calculates discount percentage for a volume tier
 */
export function resolveTierDiscount(
  tiers: PricingTier[],
  quantity: number
): number {
  if (!tiers || tiers.length === 0) return 0;
  
  const matchedTier = tiers.find(
    (t) => quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
  );

  return matchedTier ? matchedTier.discountPct : 0;
}

/**
 * Calculates cart financial breakdown with VAT and shipping estimates
 */
export function calculateCartSummary(
  items: CartItem[],
  currency: 'NGN' | 'USD' = 'NGN'
): CartSummary {
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const estimatedTax = Math.round(subtotal * FX_RATES.VAT_RATE);
  const estimatedShipping = subtotal > 150000 ? 0 : 7500; // Free enterprise shipping above ₦150,000
  const discount = 0;
  const total = subtotal + estimatedTax + estimatedShipping - discount;

  return {
    subtotal,
    estimatedTax,
    estimatedShipping,
    discount,
    total,
    currency,
  };
}

