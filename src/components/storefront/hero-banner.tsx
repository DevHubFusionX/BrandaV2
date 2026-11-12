'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface QuickFeature {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

const quickFeatures: QuickFeature[] = [
  {
    id: '1',
    title: 'Onboarding Welcome Packs',
    subtitle: 'From curated packs',
    href: '/products/employee-onboarding-kit',
  },
  {
    id: '2',
    title: '600gsm Luxury Business Cards',
    subtitle: 'From print studio',
    href: '/products/luxury-business-cards',
  },
  {
    id: '3',
    title: 'Heavyweight Cotton Hoodies',
    subtitle: 'From apparel & wear',
    href: '/products/heavyweight-custom-hoodies',
  },
  {
    id: '4',
    title: 'Custom Branded Mailer Boxes',
    subtitle: 'From packaging',
    href: '/products/custom-packaging-boxes',
  },
];

export function HeroBanner() {
  return (
    <section className="bg-white pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Moderate, Elegant Headline (Directly Matching the Reference Scale) */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] font-bold tracking-[-0.03em] text-neutral-900 leading-[1.08]">
            Brand. Print.<br />
            Package. Fulfill.<br />
            <span className="text-neutral-400 font-bold">Repeat.</span>
          </h1>
        </div>

        {/* 2. Compact Horizontal Feature Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 md:mt-10 pt-8 border-t border-neutral-100">
          {quickFeatures.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex items-center gap-3 p-1 rounded-lg transition-colors hover:bg-neutral-50/80"
            >
              <div className="w-10 h-8 rounded-md bg-neutral-100 border border-neutral-200/80 flex items-center justify-center shrink-0 text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                Display
              </div>

              <div className="min-w-0">
                <div className="text-xs font-semibold text-neutral-900 group-hover:text-black transition-colors truncate">
                  {item.title}
                </div>
                <div className="text-[10.5px] text-neutral-400">
                  {item.subtitle}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 3. The Seamless Multi-Panel Product Display Container (Matching the Cropped Reference Image) */}
        <div className="mt-8 md:mt-10 rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-neutral-50 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80 min-h-[380px] lg:min-h-[420px]">
            
            {/* Panel 1: Curated Packs */}
            <Link
              href="/products/employee-onboarding-kit"
              className="group p-6 sm:p-7 flex flex-col justify-between bg-neutral-100/60 hover:bg-neutral-100 transition-colors relative overflow-hidden"
            >
              {/* Panel Top Tag */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <span>Curated Packs</span>
                <span className="text-neutral-400">MOQ 25</span>
              </div>

              {/* Panel Mockup Device / Canvas Frame */}
              <div className="my-auto py-6 flex flex-col items-center">
                <div className="w-full max-w-[210px] aspect-[4/5] rounded-2xl bg-white border border-neutral-200/80 p-4 shadow-sm flex flex-col justify-between group-hover:shadow-md transition-shadow">
                  <div className="w-full aspect-[4/3] rounded-xl bg-neutral-100 border border-neutral-200/70 flex items-center justify-center text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
                    Preview
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-bold text-neutral-900 leading-snug">
                      Onboarding Pack
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">
                      Hoodie + Flask + Journal
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Bottom Meta */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200/60">
                <span className="text-neutral-500 font-medium">3-5 Days Delivery</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>

            {/* Panel 2: Prints by Branda */}
            <Link
              href="/products/luxury-business-cards"
              className="group p-6 sm:p-7 flex flex-col justify-between bg-neutral-50 hover:bg-neutral-100/70 transition-colors relative overflow-hidden"
            >
              {/* Panel Top Tag */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <span>Print Studio</span>
                <span className="text-neutral-400">600gsm</span>
              </div>

              {/* Panel Mockup Device / Canvas Frame */}
              <div className="my-auto py-6 flex flex-col items-center">
                <div className="w-full max-w-[210px] aspect-[4/5] rounded-2xl bg-white border border-neutral-200/80 p-4 shadow-sm flex flex-col justify-between group-hover:shadow-md transition-shadow">
                  <div className="w-full aspect-[4/3] rounded-xl bg-neutral-100 border border-neutral-200/70 flex items-center justify-center text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
                    Preview
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-bold text-neutral-900 leading-snug">
                      Luxury Cards
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">
                      Gold Foil & Spot UV
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Bottom Meta */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200/60">
                <span className="text-neutral-500 font-medium">48h Express Ready</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>

            {/* Panel 3: Apparel & Merch */}
            <Link
              href="/products/heavyweight-custom-hoodies"
              className="group p-6 sm:p-7 flex flex-col justify-between bg-neutral-100/60 hover:bg-neutral-100 transition-colors relative overflow-hidden"
            >
              {/* Panel Top Tag */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <span>Corporate Wear</span>
                <span className="text-neutral-400">380gsm</span>
              </div>

              {/* Panel Mockup Device / Canvas Frame */}
              <div className="my-auto py-6 flex flex-col items-center">
                <div className="w-full max-w-[210px] aspect-[4/5] rounded-2xl bg-white border border-neutral-200/80 p-4 shadow-sm flex flex-col justify-between group-hover:shadow-md transition-shadow">
                  <div className="w-full aspect-[4/3] rounded-xl bg-neutral-100 border border-neutral-200/70 flex items-center justify-center text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
                    Preview
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-bold text-neutral-900 leading-snug">
                      Cotton Hoodies
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">
                      High-Density Embroidery
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Bottom Meta */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200/60">
                <span className="text-neutral-500 font-medium">Combed Organic Cotton</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>

            {/* Panel 4: Custom Packaging */}
            <Link
              href="/products/custom-packaging-boxes"
              className="group p-6 sm:p-7 flex flex-col justify-between bg-neutral-50 hover:bg-neutral-100/70 transition-colors relative overflow-hidden"
            >
              {/* Panel Top Tag */}
              <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <span>Packaging</span>
                <span className="text-neutral-400">E-Flute</span>
              </div>

              {/* Panel Mockup Device / Canvas Frame */}
              <div className="my-auto py-6 flex flex-col items-center">
                <div className="w-full max-w-[210px] aspect-[4/5] rounded-2xl bg-white border border-neutral-200/80 p-4 shadow-sm flex flex-col justify-between group-hover:shadow-md transition-shadow">
                  <div className="w-full aspect-[4/3] rounded-xl bg-neutral-100 border border-neutral-200/70 flex items-center justify-center text-neutral-400 font-mono text-[10px] uppercase tracking-widest">
                    Preview
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-bold text-neutral-900 leading-snug">
                      Custom Mailers
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">
                      Full-Bleed Interior CMYK
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel Bottom Meta */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-neutral-200/60">
                <span className="text-neutral-500 font-medium">Nationwide Delivery</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
}
