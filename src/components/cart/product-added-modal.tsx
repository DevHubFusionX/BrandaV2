'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/commerce/pricing';

export function ProductAddedModal() {
  const router = useRouter();
  const { 
    isAddedModalOpen, 
    closeAddedModal, 
    lastAddedItem, 
    items, 
    currency 
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAddedModalOpen) {
        closeAddedModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddedModalOpen, closeAddedModal]);

  if (!isAddedModalOpen || !lastAddedItem) {
    return null;
  }

  const formatPrice = (amount: number) => formatCurrency(amount, currency);

  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = items.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleSeeCart = () => {
    closeAddedModal();
    router.push('/cart');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={closeAddedModal}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Modal Header (Exact match to Reference Screenshot 1) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-base sm:text-lg font-bold text-neutral-950">
            Product added to cart
          </h2>
          <button
            onClick={closeAddedModal}
            className="text-neutral-400 hover:text-neutral-800 transition-colors p-1 rounded-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* 2. Modal Body: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-start">
          
          {/* Left Column: Product Details (~65% width) */}
          <div className="md:col-span-7 flex gap-4 items-start">
            
            {/* Thumbnail: Real Product Image or Clean Empty Container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-neutral-100 border border-neutral-200/90 flex flex-col items-center justify-center shrink-0 p-2 text-center overflow-hidden">
              {lastAddedItem.image && lastAddedItem.image !== '/product-placeholder.png' ? (
                <img
                  src={lastAddedItem.image}
                  alt={lastAddedItem.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              ) : (
                <>
                  <div className="w-8 h-8 rounded bg-neutral-200 flex items-center justify-center text-[9px] font-mono text-neutral-500 mb-1">
                    ITEM
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {lastAddedItem.selectedColor || 'Default'}
                  </span>
                </>
              )}
            </div>

            {/* Product Meta */}
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="text-xs sm:text-sm font-bold text-neutral-950 leading-tight">
                {lastAddedItem.name}
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                {lastAddedItem.brand || 'Branda'}
              </p>

              <div className="pt-2 text-xs text-neutral-700 space-y-0.5">
                <p>
                  <span className="text-neutral-500">Color:</span> {lastAddedItem.selectedColor || 'Black'}
                </p>
                <p>
                  <span className="text-neutral-500">Decoration method:</span> {lastAddedItem.decorationMethod || 'Full Color'}
                </p>
                <p className="text-neutral-700">
                  <span className="text-neutral-500">Quantity:</span> {lastAddedItem.quantity} - {formatPrice(lastAddedItem.unitPrice)} / Item
                </p>
              </div>

              <div className="pt-1 text-sm font-bold text-neutral-950">
                {formatPrice(lastAddedItem.totalPrice)}
              </div>
            </div>

          </div>

          {/* Right Column: Your Cart Summary (~35% width, separated by vertical divider) */}
          <div className="md:col-span-5 md:border-l md:border-neutral-200 md:pl-6 space-y-4 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-wider">
              Your cart
            </h4>

            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Number of Items</span>
                <span className="font-semibold text-neutral-900">{totalCartCount}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-neutral-600 font-medium">Total Estimate</span>
                <span className="text-sm font-bold text-neutral-950">{formatPrice(totalCartAmount)}</span>
              </div>
            </div>

            {/* Actions (Matching Reference Screenshot 1) */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleSeeCart}
                className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>See cart</span>
                <div className="w-3.5 h-3.5 rounded-full border border-white/70 flex items-center justify-center text-[9px]">
                  ➔
                </div>
              </button>

              <button
                onClick={closeAddedModal}
                className="w-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-900 font-semibold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Continue shopping</span>
                <div className="w-3.5 h-3.5 rounded-full border border-neutral-400 flex items-center justify-center text-[9px] text-neutral-700">
                  ➔
                </div>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
