'use client';

import React from 'react';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/commerce/pricing';

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  priceNGN: number;
  memberPriceNGN: number;
  moq: number;
  colorsCount: number;
  shipsLocation?: string;
  imageUrl?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  priceNGN,
  memberPriceNGN,
  moq,
  colorsCount,
  shipsLocation = 'Ships Nigeria',
  imageUrl,
}: ProductCardProps) {
  const { currency, addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: id,
      name,
      brand: 'Branda',
      slug,
      image: '/product-placeholder.png',
      quantity: moq,
      unitPrice: priceNGN,
      selectedColor: 'Default',
      decorationMethod: 'Screen Print',
      turnaroundDays: 3,
    });
  };

  return (
    <div className="group bg-white rounded-lg border border-neutral-200/90 overflow-hidden flex flex-col justify-between hover:border-neutral-300 hover:shadow-md transition-all duration-150">
      
      {/* 1. Top Image Container with Subtle Corners & Hover Buttons */}
      <div className="relative aspect-square w-full bg-neutral-100/90 border-b border-neutral-200/80 flex items-center justify-center p-4 overflow-hidden">
        
        {/* Product Image Canvas (Real API Image or Clean Empty Container) */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 font-mono text-[11px] uppercase tracking-widest select-none">
            <div className="w-14 h-14 rounded-md bg-neutral-200/80 border border-neutral-300/70 mb-2 flex items-center justify-center text-neutral-400 text-xs font-bold">
              Display
            </div>
            <span>Product Canvas</span>
          </div>
        )}

        {/* Hover Action Overlay (Clean Subtle Rounded-md Buttons) */}
        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1.5 z-10 opacity-0 translate-y-1.5 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out">
          
          {/* Action 1: Blue Button */}
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 px-3 rounded-md text-xs font-bold text-center shadow-xs transition-colors"
          >
            Add to Brand Pack
          </button>

          {/* Action 2: White Button */}
          <Link
            href={`/products/${slug}`}
            className="w-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200/90 py-2 px-3 rounded-md text-xs font-bold text-center shadow-2xs transition-colors block"
          >
            Buy in Bulk
          </Link>
        </div>
      </div>

      {/* 2. Product Details Section */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-3">
        
        {/* Product Title */}
        <Link href={`/products/${slug}`} className="block">
          <h3 className="text-[13px] font-bold text-neutral-900 hover:text-black line-clamp-2 leading-snug tracking-tight">
            {name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="space-y-1">
          <div className="text-[10.5px] text-neutral-500 font-medium leading-none">
            As low as
          </div>
          
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black text-neutral-950">
              {formatCurrency(priceNGN, currency)}
            </span>
            <button type="button" title="Volume tier base price" className="text-neutral-400 hover:text-neutral-600">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Member Discount */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="inline-flex items-center gap-1 bg-[#EEF4FF] text-[#2563EB] text-[11px] font-bold px-1.5 py-0.5 rounded">
              ★ Member
            </span>
            <span className="text-sm font-bold text-[#2563EB]">
              {formatCurrency(memberPriceNGN, currency)}
            </span>
            <button type="button" title="Member rate" className="text-[#2563EB]/70 hover:text-[#2563EB]">
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Min MOQ */}
            <span className="bg-neutral-100 text-neutral-700 text-[10.5px] font-medium px-2 py-0.5 rounded">
              Min {moq}
            </span>

            {/* Shipping Pill */}
            {shipsLocation && (
              <span className="bg-neutral-100 text-neutral-700 text-[10.5px] font-medium px-2 py-0.5 rounded truncate max-w-[105px]">
                {shipsLocation}
              </span>
            )}
          </div>

          {/* Color Variants Count */}
          <span className="text-[10.5px] text-neutral-500 font-medium shrink-0">
            {colorsCount} {colorsCount === 1 ? 'color' : 'colors'}
          </span>
        </div>

      </div>

    </div>
  );
}
