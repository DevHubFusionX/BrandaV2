'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Gift, 
  Printer, 
  Shirt, 
  Box, 
  Coffee, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  const primaryCategories = [
    {
      title: 'Curated Gift Packs',
      description: 'Employee onboarding kits, executive bundles, and seasonal client packs.',
      href: '/categories/curated-packs',
      icon: Gift,
    },
    {
      title: 'Prints by Branda',
      description: '600gsm business cards, presentation folders, flyers, and roll-ups.',
      href: '/categories/prints',
      icon: Printer,
    },
    {
      title: 'Apparel & Corporate Wear',
      description: 'Heavyweight organic cotton hoodies, corporate polos, and embroidered caps.',
      href: '/categories/apparel',
      icon: Shirt,
    },
    {
      title: 'Custom Packaging',
      description: 'Full-bleed mailer boxes, rigid gift cartons, and branded retail bags.',
      href: '/categories/packaging',
      icon: Box,
    },
    {
      title: 'Drinkware & Tech Merch',
      description: 'Laser-engraved thermal flasks, power banks, and smart notebooks.',
      href: '/categories/drinkware-tech',
      icon: Coffee,
    },
    {
      title: 'Office & Signage',
      description: 'Architectural acrylic signage, wall graphics, and workspace branding.',
      href: '/categories/workspace',
      icon: Building2,
    },
  ];

  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-b border-neutral-200/90 shadow-2xl z-50 transition-all animate-in fade-in slide-in-from-top-1 duration-150"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Primary Categories */}
          <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-neutral-100 pb-6 lg:pb-0 lg:pr-8">
            <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-5">
              Products & Categories
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              {primaryCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-start gap-3 p-2 -m-2 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    {/* Dark Rounded Squircle Chip */}
                    <div className="w-9 h-9 rounded-lg bg-neutral-950 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-black transition-colors">
                      <Icon className="w-4 h-4 text-neutral-200" />
                    </div>

                    <div className="min-w-0">
                      <h5 className="text-[13px] font-bold text-neutral-900 group-hover:text-black transition-colors leading-snug">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Sub-Columns + Feature Card */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-5">
                Ecosystem Capabilities
              </h4>

              {/* 3 Sub-Columns */}
              <div className="grid grid-cols-3 gap-4">
                {/* Column 1 */}
                <div className="space-y-2.5">
                  <span className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-wider block">
                    By Team / Intent
                  </span>
                  <ul className="space-y-1.5 text-xs font-medium text-neutral-800">
                    <li>
                      <Link href="/categories/curated-packs" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        New Hire Onboarding
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/conference-event-pack" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Conferences & Expos
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/executive-vip-gift-box" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Client Gifting
                      </Link>
                    </li>
                    <li>
                      <Link href="/categories/curated-packs#holiday" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Year-End Celebration
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="space-y-2.5">
                  <span className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-wider block">
                    Print Finishes
                  </span>
                  <ul className="space-y-1.5 text-xs font-medium text-neutral-800">
                    <li>
                      <Link href="/resources/finishes-guide#gold-foil" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Metallic Gold Foil
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources/finishes-guide#spot-uv" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Raised Spot UV Gloss
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources/finishes-guide#matte" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Velvet Matte Finish
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources/finishes-guide#debossing" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Precision Debossing
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div className="space-y-2.5">
                  <span className="text-[10.5px] font-semibold text-neutral-400 uppercase tracking-wider block">
                    Enterprise
                  </span>
                  <ul className="space-y-1.5 text-xs font-medium text-neutral-800">
                    <li>
                      <Link href="/platform#warehousing" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Lagos Warehousing
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing#calculator" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Volume Pricing Tiers
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing#corporate" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Net-30 Invoicing
                      </Link>
                    </li>
                    <li>
                      <Link href="/platform#logistics" onClick={onClose} className="hover:text-black transition-colors block leading-snug">
                        Nationwide Logistics
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Highlight Feature Card */}
            <div className="bg-neutral-50 hover:bg-neutral-100/70 transition-colors border border-neutral-200/80 rounded-xl p-3.5 flex items-center justify-between gap-3 mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-neutral-200" />
                </div>
                <div>
                  <h5 className="text-[13px] font-bold text-neutral-900 leading-tight">
                    Brand Vault™ & Studio
                  </h5>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    Store company vector logos, brand assets, and receive free 3D digital proofs before print.
                  </p>
                </div>
              </div>

              <Link
                href="/platform#brand-vault"
                onClick={onClose}
                className="shrink-0 text-[11px] font-bold text-neutral-900 hover:text-black inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-2xs hover:bg-neutral-50 transition-colors whitespace-nowrap"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
