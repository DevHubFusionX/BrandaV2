'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight,
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Info, 
  Truck
} from 'lucide-react';
import { DetailedProduct } from '@/lib/commerce/products';
import { ProductCard } from '@/components/products/product-card';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency, resolveTierUnitPrice } from '@/lib/commerce/pricing';

const fallbackRelated = [
  {
    id: '1',
    name: 'Anker® 3-In-1 Power Bank',
    slug: 'anker-3-in-1-power-bank',
    category: 'Drinkware & Tech',
    priceNGN: 48500,
    memberPriceNGN: 42000,
    moq: 3,
    colorsCount: 1,
    shipsLocation: 'Ships Nigeria',
  },
  {
    id: '2',
    name: 'Moleskine® Soft Cover Large Planner',
    slug: 'moleskine-soft-cover-large-planner',
    category: 'Office & Journals',
    priceNGN: 28500,
    memberPriceNGN: 24000,
    moq: 4,
    colorsCount: 1,
    shipsLocation: 'Nationwide',
  },
  {
    id: '3',
    name: 'Ahead Clubhouse Wool & Flannel Cap',
    slug: 'ahead-clubhouse-wool-cap',
    category: 'Clothing & Accessories',
    priceNGN: 14500,
    memberPriceNGN: 12800,
    moq: 10,
    colorsCount: 4,
    shipsLocation: 'Nationwide',
  },
  {
    id: '9',
    name: 'Double-Wall Stainless Steel Tumbler (500ml)',
    slug: 'insulated-thermal-flasks',
    category: 'Drinkware & Tech',
    priceNGN: 7800,
    memberPriceNGN: 6500,
    moq: 25,
    colorsCount: 5,
    shipsLocation: 'Lagos & Nationwide',
  },
];

interface ProductDetailClientProps {
  initialProduct: DetailedProduct;
  slug: string;
}

export function ProductDetailClient({ initialProduct, slug }: ProductDetailClientProps) {
  const [product, setProduct] = useState<DetailedProduct>(initialProduct);
  const { currency, addItem } = useCart();

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Black');
  const [purchaseOption, setPurchaseOption] = useState<'bulk' | 'pack'>('bulk');
  const [quantity, setQuantity] = useState<number>(product.moq || 3);
  const [showTierTable, setShowTierTable] = useState(false);
  const [openDescription, setOpenDescription] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);

  // Dynamic Product loading from free API proxy
  useEffect(() => {
    async function loadDynamicProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.name) {
            setProduct(data);
            if (data.moq) setQuantity(data.moq);
            if (data.colors?.[0]?.name) setSelectedColor(data.colors[0].name);
          }
        }
      } catch (err) {
        console.warn('API error, using initial product:', err);
      }
    }
    loadDynamicProduct();
  }, [slug]);

  // Load complementary merchandise for cross-sell
  const [relatedItems, setRelatedItems] = useState<any[]>([]);

  useEffect(() => {
    async function loadRelated() {
      try {
        const res = await fetch('/api/products?limit=12');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products)) {
            const filtered = data.products
              .filter((p: any) => p.slug !== slug && String(p.id) !== String(product.id))
              .slice(0, 4)
              .map((p: any) => ({
                id: String(p.id),
                name: p.name,
                slug: p.slug,
                category: p.category,
                priceNGN: p.basePriceNGN,
                memberPriceNGN: p.memberPriceNGN,
                moq: p.moq || 3,
                colorsCount: p.colors?.length || 3,
                shipsLocation: p.shippingInfo || 'Nationwide',
                imageUrl: p.imageUrl,
              }));
            if (filtered.length > 0) {
              setRelatedItems(filtered);
            }
          }
        }
      } catch (err) {
        console.warn('Could not load related products:', err);
      }
    }
    loadRelated();
  }, [slug, product.id]);

  const displayRelated = relatedItems.length > 0
    ? relatedItems
    : fallbackRelated.filter((p) => p.slug !== slug).slice(0, 4);

  const displayImages = product.images && product.images.length > 0
    ? product.images
    : (product.imageUrl ? [product.imageUrl] : []);
  const activeImage = displayImages[selectedImageIndex] || displayImages[0] || product.imageUrl;

  // Dynamic Tier Calculation via DRY pricing engine
  const currentUnitPrice = resolveTierUnitPrice(product.pricingTiers, quantity, product.basePriceNGN);
  const totalPrice = currentUnitPrice * quantity;

  const formatPrice = (ngn: number) => formatCurrency(ngn, currency);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      slug: product.slug,
      image: activeImage || '/product-placeholder.png',
      quantity,
      unitPrice: currentUnitPrice,
      selectedColor,
      decorationMethod: product.decorationOptions[0] || 'Full Color',
      turnaroundDays: 3,
    });
  };

  return (
    <div className="bg-white min-h-screen pb-32 text-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* 1. Breadcrumbs (Subtle font size & generous bottom spacing) */}
        <div className="flex items-center gap-2.5 text-[11px] text-neutral-500 font-medium mb-10 sm:mb-12">
          <Link
            href="/shop"
            className="w-4.5 h-4.5 rounded-full bg-black text-white flex items-center justify-center shrink-0 hover:bg-neutral-800 transition-colors"
            title="Back to All Merchandise"
          >
            <ArrowLeft className="w-2.5 h-2.5 stroke-[2.5]" />
          </Link>
          <Link href="/shop" className="hover:text-black font-semibold text-neutral-900">
            All Merchandise
          </Link>
          <span className="text-neutral-400">/</span>
          <span className="text-neutral-600 truncate">{product.name}</span>
        </div>

        {/* 2. Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          {/* Left Column: Gallery + Accordions */}
          <div className="lg:col-span-7">
            
            {/* Gallery: Thumbnails + Main Display */}
            <div className="flex flex-col-reverse sm:flex-row gap-6 items-start">
              
              {/* Vertical Thumbnail Strip */}
              <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
                {displayImages.length > 0 ? (
                  displayImages.slice(0, 4).map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-12 h-12 rounded-md border transition-all flex items-center justify-center p-1 bg-white overflow-hidden ${
                        selectedImageIndex === idx
                          ? 'border-neutral-950 ring-1 ring-neutral-950 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))
                ) : (
                  [0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-12 h-12 rounded-md border transition-all flex items-center justify-center p-1 bg-white ${
                        selectedImageIndex === idx
                          ? 'border-neutral-950 ring-1 ring-neutral-950 shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="w-full h-full rounded bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-[9px] text-neutral-400 font-mono">
                        #{idx + 1}
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Main Product Canvas Container */}
              <div className="w-full">
                <div className="relative w-full aspect-square rounded-lg bg-neutral-50/70 border border-neutral-200 flex flex-col items-center justify-center p-10 sm:p-14 overflow-hidden">
                  
                  {activeImage ? (
                    <div className="w-full h-full flex items-center justify-center p-6">
                      <img
                        src={activeImage}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-200 hover:scale-105"
                      />
                    </div>
                  ) : (
                    /* Empty Container Representation */
                    <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-lg bg-neutral-100 border border-neutral-200/90 flex flex-col items-center justify-center text-center p-4">
                      <div className="w-10 h-10 rounded bg-neutral-200/80 mb-2.5 flex items-center justify-center text-neutral-400 font-mono text-[9px]">
                        IMG
                      </div>
                      <span className="text-[11px] font-medium text-neutral-600">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono mt-1">
                        View #{selectedImageIndex + 1} • {selectedColor}
                      </span>
                    </div>
                  )}

                  {/* Left / Right Carousel Floating Arrows */}
                  {displayImages.length > 1 && (
                    <div className="absolute right-5 bottom-5 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1))}
                        className="w-7 h-7 rounded-full bg-white/95 hover:bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                        aria-label="Previous view"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0))}
                        className="w-7 h-7 rounded-full bg-white/95 hover:bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
                        aria-label="Next view"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Accordions directly below gallery with generous spacing */}
            <div className="mt-12 space-y-0 border-t border-neutral-200/80">
              
              {/* Description Accordion */}
              <div className="border-b border-neutral-200/80 py-4 sm:py-4.5">
                <button
                  onClick={() => setOpenDescription(!openDescription)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 text-left hover:text-black tracking-normal"
                >
                  <span>Description</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${openDescription ? 'rotate-180' : ''}`} />
                </button>
                {openDescription && (
                  <div className="pt-3 pb-1 text-xs text-neutral-600 leading-relaxed font-normal">
                    {product.description}
                  </div>
                )}
              </div>

              {/* Product Details Accordion */}
              <div className="border-b border-neutral-200/80 py-4 sm:py-4.5">
                <button
                  onClick={() => setOpenDetails(!openDetails)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900 text-left hover:text-black tracking-normal"
                >
                  <span>Product details</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${openDetails ? 'rotate-180' : ''}`} />
                </button>
                {openDetails && (
                  <div className="pt-3 pb-1 space-y-2 text-xs">
                    {product.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-neutral-100 last:border-0">
                        <span className="text-neutral-500 font-normal">{detail.label}</span>
                        <span className="text-neutral-900 font-semibold">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Right Column: Pricing & Configuration */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-7">
            
            {/* 1. Header (Brand, Name, SKU) */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-neutral-950 uppercase tracking-wider">
                {product.brand}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight leading-snug">
                {product.name}
              </h1>
              <p className="text-[11px] text-neutral-400 font-mono">
                Item # {product.sku}
              </p>
            </div>

            {/* 2. Dynamic Pricing Tiers Callout */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                  {formatPrice(currentUnitPrice)}
                </span>
                <span className="text-xs text-neutral-500 font-normal">
                  / item
                </span>
              </div>

              {/* Dynamic Member Price Callout */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                <span>Or</span>
                <span className="font-bold text-neutral-950">
                  {formatPrice(product.memberPriceNGN)} / item
                </span>
                <span>with</span>
                <Link href="/pricing" className="text-neutral-950 font-bold underline hover:text-black">
                  membership
                </Link>
                <Info className="w-3.5 h-3.5 text-neutral-400 ml-0.5" />
              </div>

              {/* Turnaround Lead Time Indicator */}
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 pt-1">
                <Truck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Production time: <strong>3-5 business days</strong> • Fast delivery across Nigeria</span>
              </div>
            </div>

            {/* Pricing Tiers Table */}
            <div className="border border-neutral-200/90 rounded-lg p-3 bg-neutral-50/50">
              <button
                type="button"
                onClick={() => setShowTierTable(!showTierTable)}
                className="w-full flex items-center justify-between text-xs font-semibold text-neutral-900"
              >
                <span>Volume Discount Pricing</span>
                <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                  {showTierTable ? 'Hide breakdown' : 'View volume tiers'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTierTable ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {showTierTable && (
                <div className="mt-3 pt-3 border-t border-neutral-200/80 space-y-1.5 text-xs">
                  {product.pricingTiers.map((tier, idx) => {
                    const isCurrentTier = quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded ${
                          isCurrentTier ? 'bg-black text-white font-bold' : 'text-neutral-700'
                        }`}
                      >
                        <span>
                          {tier.minQty} {tier.maxQty ? `– ${tier.maxQty}` : '+'} units
                        </span>
                        <div className="flex items-center gap-2">
                          {tier.discountPct > 0 && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${isCurrentTier ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200 text-neutral-700'}`}>
                              Save {tier.discountPct}%
                            </span>
                          )}
                          <span>{formatPrice(tier.unitPriceNGN)} / ea</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Color Swatch Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-900">
                  Color: <strong className="text-neutral-950 font-bold">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-neutral-950 ring-2 ring-neutral-950 ring-offset-2' 
                          : 'border-neutral-200 hover:scale-105'
                      }`}
                      title={color.name}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check 
                          className={`w-3.5 h-3.5 stroke-[3] ${
                            color.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'
                          }`} 
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Decoration Options */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1">
                <span>Decoration methods included</span>
                <Info className="w-3.5 h-3.5 text-neutral-400" />
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {product.decorationOptions.map((opt) => (
                  <span
                    key={opt}
                    className="px-2.5 py-1 rounded bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px] font-medium"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Purchase Options (Bulk vs Brand Pack) */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-neutral-900">
                Purchase options
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Option 1: Buy in bulk */}
                <div
                  onClick={() => setPurchaseOption('bulk')}
                  className={`cursor-pointer rounded-lg border p-3 flex items-start gap-2.5 transition-all ${
                    purchaseOption === 'bulk'
                      ? 'border-neutral-950 bg-neutral-50/50 shadow-2xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="pt-0.5">
                    {purchaseOption === 'bulk' ? (
                      <div className="w-4 h-4 rounded-full border-4 border-neutral-950 bg-white" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-neutral-300 bg-white" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    Buy in bulk
                  </span>
                </div>

                {/* Option 2: Add to Brand Pack */}
                <div
                  onClick={() => setPurchaseOption('pack')}
                  className={`cursor-pointer rounded-lg border p-3 flex items-start gap-2.5 transition-all ${
                    purchaseOption === 'pack'
                      ? 'border-neutral-950 bg-neutral-50/50 shadow-2xs'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="pt-0.5">
                    {purchaseOption === 'pack' ? (
                      <div className="w-4 h-4 rounded-full border-4 border-neutral-950 bg-white" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-neutral-300 bg-white" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-neutral-900 flex items-center gap-1">
                    Add to a Brand Pack <Info className="w-3.5 h-3.5 text-neutral-400" />
                  </span>
                </div>
              </div>
            </div>

            {/* 6. Available Sizes */}
            {product.sizes && (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-neutral-900 flex items-center gap-1">
                  <span>Available sizes</span>
                  <Info className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <div className="text-[11px] font-semibold text-neutral-700 tracking-wider pt-0.5">
                  {product.sizes[0]}
                </div>
              </div>
            )}

            {/* 7. Quantity Stepper */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-neutral-900">
                Quantity (min {product.moq})
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(product.moq, prev - 1))}
                  className="text-neutral-500 hover:text-black text-sm px-1 select-none font-medium"
                  aria-label="Decrease quantity"
                >
                  —
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                  className="w-11 h-7.5 text-center text-xs font-semibold text-neutral-900 border border-neutral-300 rounded focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="text-neutral-500 hover:text-black text-sm px-1 select-none font-medium"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              {/* Estimated Price Note */}
              <div className="text-[11px] text-neutral-700 font-medium pt-1">
                Estimated price calculated in cart
              </div>
            </div>

            {/* 8. Add to Cart CTA Button & Perk */}
            <div className="pt-2 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-neutral-950 hover:bg-black text-white font-semibold py-3 rounded-md text-xs tracking-wider uppercase text-center transition-colors shadow-xs"
              >
                Add to cart
              </button>

              {/* Platinum Member Perk Notice */}
              <div className="flex items-center gap-2 text-[11px] text-neutral-600 pt-0.5">
                <div className="w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-[9px] font-bold">
                  !
                </div>
                <span>
                  Platinum members get an estimated <strong className="text-neutral-950">{formatPrice(totalPrice * 0.05)} (5%)</strong> back on this item
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Frequently Paired Merchandise (Related Products) */}
        <div className="mt-20 pt-12 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-100">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                Complete Your Brand Experience
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight mt-1">
                Frequently Paired Merchandise
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-black mt-2 sm:mt-0 group"
            >
              <span>Browse full catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayRelated.map((rel) => (
              <ProductCard
                key={rel.id}
                id={rel.id}
                name={rel.name}
                slug={rel.slug}
                category={rel.category}
                priceNGN={rel.priceNGN}
                memberPriceNGN={rel.memberPriceNGN}
                moq={rel.moq}
                colorsCount={rel.colorsCount}
                shipsLocation={rel.shipsLocation}
                imageUrl={rel.imageUrl}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

