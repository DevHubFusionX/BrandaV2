export interface PricingTier {
  minQty: number;
  maxQty: number | null;
  unitPriceNGN: number;
  discountPct: number;
}

export interface DetailedProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  sku: string;
  category: string;
  inStock: boolean;
  basePriceNGN: number;
  memberPriceNGN: number;
  moq: number;
  shippingInfo: string;
  colors: { name: string; hex: string }[];
  decorationOptions: string[];
  sizes?: string[];
  pricingTiers: PricingTier[];
  description: string;
  details: { label: string; value: string }[];
  imageUrl?: string;
  images?: string[];
}

export const detailedProducts: Record<string, DetailedProduct> = {
  'anker-3-in-1-power-bank': {
    id: '1',
    slug: 'anker-3-in-1-power-bank',
    name: 'Anker® 3-In-1 Power Bank',
    brand: 'Anker',
    sku: 'PQ733KJ',
    category: 'Drinkware & Tech',
    inStock: true,
    basePriceNGN: 48500,
    memberPriceNGN: 42000,
    moq: 3,
    shippingInfo: 'Lagos & Nationwide Delivery',
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1E3A8A' },
    ],
    decorationOptions: ['Full Color High-Res UV Print', 'Precision Screen Print'],
    sizes: ['ONE SIZE'],
    pricingTiers: [
      { minQty: 3, maxQty: 24, unitPriceNGN: 48500, discountPct: 0 },
      { minQty: 25, maxQty: 49, unitPriceNGN: 44200, discountPct: 9 },
      { minQty: 50, maxQty: 99, unitPriceNGN: 41000, discountPct: 15 },
      { minQty: 100, maxQty: null, unitPriceNGN: 38000, discountPct: 22 },
    ],
    description:
      'The Anker® 3-in-1 Power Bank features high-speed 65W fast-charging with a foldable plug and integrated high-durability braided cable. Designed for high-performing executives, remote teams, and high-impact corporate gifting.',
    details: [
      { label: 'Battery Capacity', value: '10,000mAh High-Density Polymer' },
      { label: 'Max Output', value: '65W Power Delivery (PD 3.0)' },
      { label: 'Branding Area', value: '45mm x 25mm Full Color' },
      { label: 'Turnaround Time', value: '3-5 Working Days in Lagos' },
      { label: 'Certifications', value: 'CE, FCC, RoHS Compliant' },
    ],
  },
  'luxury-600gsm-business-cards': {
    id: '2',
    slug: 'luxury-600gsm-business-cards',
    name: 'Luxury 600gsm Duplex Business Cards',
    brand: 'Prints by Branda',
    sku: 'BC-600-DUO',
    category: 'Prints & Marketing',
    inStock: true,
    basePriceNGN: 35000,
    memberPriceNGN: 29500,
    moq: 100,
    shippingInfo: '48h Express Available',
    colors: [
      { name: 'Matte Black', hex: '#18181B' },
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Royal Navy', hex: '#0F172A' },
    ],
    decorationOptions: ['Raised Spot UV Gloss', 'Metallic Gold Foil Stamping', 'Blind Debossing'],
    sizes: ['Standard 3.5" x 2.0" (89mm x 51mm)'],
    pricingTiers: [
      { minQty: 100, maxQty: 249, unitPriceNGN: 350, discountPct: 0 },
      { minQty: 250, maxQty: 499, unitPriceNGN: 280, discountPct: 20 },
      { minQty: 500, maxQty: 999, unitPriceNGN: 210, discountPct: 40 },
      { minQty: 1000, maxQty: null, unitPriceNGN: 165, discountPct: 53 },
    ],
    description:
      'Engineered on ultra-heavyweight 600gsm duplex board with velvet soft-touch lamination. Deliver an unforgettable tactile impression with precision gold foil stamping and raised spot UV.',
    details: [
      { label: 'Paper Stock', value: '600gsm Duplex Silk Cardstock' },
      { label: 'Finish', value: 'Velvet Soft-Touch Matte Lamination' },
      { label: 'Embellishments', value: 'Spot UV + Foil Stamping' },
      { label: 'Turnaround', value: '48 Hours Express in Lagos' },
    ],
  },
  'employee-onboarding-kit': {
    id: '3',
    slug: 'employee-onboarding-kit',
    name: 'New Hire Onboarding Welcome Pack (Complete Gift Box)',
    brand: 'BrandGifts by Branda',
    sku: 'KIT-OB-01',
    category: 'Curated Packs',
    inStock: true,
    basePriceNGN: 38500,
    memberPriceNGN: 32000,
    moq: 15,
    shippingInfo: 'Nationwide Delivery',
    colors: [
      { name: 'Midnight Charcoal', hex: '#27272A' },
      { name: 'Cobalt Blue', hex: '#1E40AF' },
      { name: 'Forest Emerald', hex: '#065F46' },
    ],
    decorationOptions: ['Embroidery', 'Laser Engraving', 'Full-Bleed Box Print'],
    sizes: ['ONE SIZE (Apparel sizes specified at checkout)'],
    pricingTiers: [
      { minQty: 15, maxQty: 49, unitPriceNGN: 38500, discountPct: 0 },
      { minQty: 50, maxQty: 99, unitPriceNGN: 34500, discountPct: 10 },
      { minQty: 100, maxQty: 249, unitPriceNGN: 31000, discountPct: 19 },
      { minQty: 250, maxQty: null, unitPriceNGN: 27500, discountPct: 28 },
    ],
    description:
      'The definitive welcome experience for modern companies. Includes a custom-embroidered heavyweight hoodie, double-wall stainless thermal flask, debossed hardcover notebook, and twist pen inside a custom mailer box.',
    details: [
      { label: 'Kit Contents', value: 'Hoodie (380gsm), Flask (500ml), A5 Journal, Pen, Custom Box' },
      { label: 'Customization', value: 'Company Logo on All Items' },
      { label: 'Packaging', value: 'Full-bleed custom printed mailer box with crinkle paper fill' },
      { label: 'Lead Time', value: '3-5 Working Days' },
    ],
  },
};

export function getProductBySlug(slug: string): DetailedProduct {
  if (detailedProducts[slug]) {
    return detailedProducts[slug];
  }
  // Fallback to Anker power bank template with updated title
  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    ...detailedProducts['anker-3-in-1-power-bank'],
    id: slug,
    slug,
    name: formattedTitle,
  };
}

