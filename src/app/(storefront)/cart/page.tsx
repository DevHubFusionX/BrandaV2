'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/commerce/pricing';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, currency } = useCart();

  const formatPrice = (amount: number) => formatCurrency(amount, currency);

  const totalEstimate = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalProductsCount = items.length;

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto text-neutral-400">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-950">Your cart is empty</h1>
            <p className="text-xs text-neutral-500 mt-2">
              Browse our catalog of corporate gifts, merchandise, and branded packs to begin your project.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-md tracking-wider uppercase transition-colors"
          >
            Explore Merchandise
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Main Two-Column Layout (Matching Reference Screenshots) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* Left Column: Cart Items List (~65% width) */}
          <div className="lg:col-span-7 xl:col-span-8">
            
            {/* Header: Title & Total Count (Exact Match to Image 1) */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                Your cart
              </h1>
              <p className="text-xs text-neutral-500 font-normal mt-1">
                Total ({totalProductsCount} {totalProductsCount === 1 ? 'product' : 'products'})
              </p>
            </div>

            {/* Bulk Product Group Container (Exact Match to Image 1) */}
            <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-2xs">
              
              {/* Card Group Header Bar */}
              <div className="bg-[#F8FAFC] px-6 py-3.5 border-b border-neutral-200 flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-900">
                  Bulk Product ({totalProductsCount})
                </span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-neutral-900 underline font-medium hover:text-black transition-colors"
                >
                  Remove all
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={item.id} className="p-6 sm:p-7 flex flex-col sm:flex-row gap-6 items-start justify-between">
                    
                    {/* Item Image + Details */}
                    <div className="flex gap-6 items-start w-full sm:w-auto">
                      
                      {/* Product Image: Real Image or Clean Empty Container */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-neutral-100 border border-neutral-200/80 flex flex-col items-center justify-center shrink-0 p-2 text-center overflow-hidden">
                        {item.image && item.image !== '/product-placeholder.png' ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        ) : (
                          <>
                            <div className="w-8 h-8 rounded bg-neutral-200 flex items-center justify-center text-[9px] font-mono text-neutral-500 mb-1">
                              ITEM
                            </div>
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {item.selectedColor || 'Default'}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Item Info */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        
                        {/* Title (Mobile price shows inline if small) */}
                        <div className="flex items-start justify-between sm:block">
                          <h2 className="text-sm sm:text-base font-bold text-neutral-950 leading-snug">
                            {item.name}
                          </h2>
                          <div className="sm:hidden text-sm font-bold text-neutral-950 text-right">
                            {formatPrice(item.unitPrice)} <span className="text-xs font-normal text-neutral-500">/ item</span>
                          </div>
                        </div>

                        {/* Color Swatch Indicator (Matching Image 1: Color: [circle outline] Black) */}
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600 pt-0.5">
                          <span className="text-neutral-500">Color:</span>
                          <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 bg-white inline-block" />
                          <span className="text-neutral-800">{item.selectedColor || 'Black'}</span>
                        </div>

                        {/* Quantity Stepper (Exact Match to Image 1: Wide Pill with —  4  +) */}
                        <div className="pt-2">
                          <div className="text-xs text-neutral-500 font-normal mb-1.5">
                            Quantity
                          </div>
                          <div className="inline-flex items-center justify-between border border-neutral-300 rounded-full px-4 py-1 w-28 sm:w-32 bg-white text-xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-neutral-500 hover:text-black select-none font-bold text-sm"
                              aria-label="Decrease quantity"
                            >
                              —
                            </button>
                            <span className="font-semibold text-neutral-900 px-2 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-neutral-500 hover:text-black select-none font-bold text-sm"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Price and Delete Icon on Desktop (Exact Match to Image 1) */}
                    <div className="hidden sm:flex flex-col items-end justify-between h-full self-stretch min-h-[100px]">
                      <div className="text-sm sm:text-base font-bold text-neutral-950 text-right">
                        {formatPrice(item.unitPrice)} <span className="text-xs font-normal text-neutral-500">/ item</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-950 hover:text-red-600 transition-colors p-1 mt-auto"
                        aria-label="Remove item"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4 fill-neutral-950 stroke-neutral-950 hover:fill-red-600 hover:stroke-red-600 transition-colors" />
                      </button>
                    </div>

                    {/* Mobile Delete Row */}
                    <div className="sm:hidden flex justify-end w-full pt-1">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-600 hover:text-red-600 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Right Column: Project Summary (Exact Match to Image 2) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:pl-6">
            
            <h2 className="text-2xl font-bold text-neutral-950 tracking-tight mb-5">
              Project summary
            </h2>

            {/* Line items */}
            <div className="space-y-3 pb-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between text-sm">
                  <span className="text-neutral-800 pr-4 truncate max-w-[240px]">
                    {item.name}
                  </span>
                  <span className="font-bold text-neutral-950 shrink-0">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200 pt-4 pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-base font-bold text-neutral-950">
                    Total Estimate
                  </div>
                  <div className="text-xs text-neutral-500 font-normal mt-0.5">
                    (Not including taxes and fees)
                  </div>
                </div>
                <div className="text-2xl font-bold text-neutral-950 tracking-tight">
                  {formatPrice(totalEstimate)}
                </div>
              </div>
            </div>

            {/* Buttons Suite (Exact Match to Image 2) */}
            <div className="mt-6 space-y-3">
              
              {/* Primary Action Button: Next: Add project details [circle with white arrow] */}
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-3 px-4 rounded-md text-xs tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Next: Add project details</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </button>

              {/* Secondary Action Button: [circle with black left arrow] Continue shopping */}
              <Link
                href="/shop"
                className="w-full bg-white hover:bg-neutral-50 border border-neutral-950 text-neutral-950 font-semibold py-3 px-4 rounded-md text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <ArrowLeft className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>Continue shopping</span>
              </Link>

              {/* Security Reassurance Note */}
              <p className="text-xs text-neutral-600 font-normal text-center pt-2">
                No credit card info required
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
