'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, currency } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

  const formattedSubtotal =
    currency === 'NGN'
      ? `₦${subtotal.toLocaleString('en-NG')}`
      : `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="text-lg font-bold text-neutral-900">Your Cart</h2>
              <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 mb-1">Your cart is empty</h3>
                <p className="text-sm text-neutral-500 max-w-xs mb-6">
                  Explore our curated corporate gift kits, luxury business cards, and custom apparel.
                </p>
                <button
                  onClick={closeCart}
                  className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemPrice =
                  currency === 'NGN'
                    ? `₦${item.totalPrice.toLocaleString('en-NG')}`
                    : `$${item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

                const unitPrice =
                  currency === 'NGN'
                    ? `₦${item.unitPrice.toLocaleString('en-NG')}`
                    : `$${item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

                return (
                  <div key={item.id} className="py-4 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg bg-neutral-100 overflow-hidden shrink-0 border border-neutral-200/60 relative">
                      {/* Placeholder image or img */}
                      <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400 font-semibold text-xs">
                        {item.name.substring(0, 2).toUpperCase()}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-neutral-900 truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Specs */}
                      <div className="text-xs text-neutral-500 mt-1 space-y-0.5">
                        {item.selectedFinish && <div>Finish: {item.selectedFinish}</div>}
                        {item.selectedSize && <div>Size: {item.selectedSize}</div>}
                        {item.turnaroundDays && (
                          <div className="flex items-center gap-1 text-emerald-600 font-medium">
                            <Clock className="w-3 h-3" />
                            {item.turnaroundDays}-day turnaround
                          </div>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-neutral-200 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 10))}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 10)}
                            className="px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-neutral-900">{itemPrice}</div>
                          <div className="text-[10px] text-neutral-400">{unitPrice}/unit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Checkout CTA */}
          {items.length > 0 && (
            <div className="border-t border-neutral-100 px-6 py-5 bg-neutral-50/50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Estimated Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between text-base font-bold text-neutral-900">
                  <span>Total</span>
                  <span>{formattedSubtotal}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full bg-black text-white flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/checkout?type=proforma"
                  onClick={closeCart}
                  className="w-full bg-white text-neutral-800 border border-neutral-300 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold hover:bg-neutral-100 transition-colors"
                >
                  Generate Corporate Proforma Invoice
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Paystack & Flutterwave 256-bit encrypted checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
