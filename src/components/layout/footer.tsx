import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ShieldCheck, Truck, Clock, Award } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white mt-auto border-t border-neutral-800">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-neutral-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Nationwide Delivery</div>
              <div className="text-xs text-neutral-400">Lagos, Abuja & all 36 States</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">48h Express Printing</div>
              <div className="text-xs text-neutral-400">Fast turnaround on high-demand items</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Corporate Invoicing</div>
              <div className="text-xs text-neutral-400">VAT-compliant receipts & Proforma POs</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center shrink-0 text-white">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Branda Quality Guarantee</div>
              <div className="text-xs text-neutral-400">Digital 3D proof approval before print</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-4">
          <div className="flex flex-col">
            <span className="text-2xl font-black lowercase tracking-tight text-white">branda</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">
              {siteConfig.subname}
            </span>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
            Branda V2 is an integrated branding ecosystem connecting prints, corporate merchandise, apparel, and design through one high-performance digital platform.
          </p>
          <div className="text-xs text-neutral-500 space-y-1">
            <div>Office: {siteConfig.contact.address}</div>
            <div>Support: {siteConfig.contact.email}</div>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
            Curated Gifting
          </h5>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link href="/products/employee-onboarding-kit" className="hover:text-white transition-colors">Onboarding Welcome Kits</Link></li>
            <li><Link href="/products/executive-vip-gift-box" className="hover:text-white transition-colors">Executive VIP Boxes</Link></li>
            <li><Link href="/products/conference-event-pack" className="hover:text-white transition-colors">Conference Packs</Link></li>
            <li><Link href="/categories/curated-packs" className="hover:text-white transition-colors">Seasonal Plans (Bronze/Gold)</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
            Prints & Packaging
          </h5>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link href="/products/luxury-business-cards" className="hover:text-white transition-colors">Luxury Business Cards</Link></li>
            <li><Link href="/products/custom-packaging-boxes" className="hover:text-white transition-colors">Custom Mailer Boxes</Link></li>
            <li><Link href="/products/roll-up-banners-signage" className="hover:text-white transition-colors">Roll-up Banners</Link></li>
            <li><Link href="/products/marketing-flyers-brochures" className="hover:text-white transition-colors">Flyers & Brochures</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
            B2B & Solutions
          </h5>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li><Link href="/pricing#corporate" className="hover:text-white transition-colors">Request Corporate Quote</Link></li>
            <li><Link href="/platform#brand-vault" className="hover:text-white transition-colors">Brand Vault™ Hub</Link></li>
            <li><Link href="/resources/artwork-guidelines" className="hover:text-white transition-colors">Artwork Guidelines</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Book a Demo</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-900 py-6 px-4 text-center text-xs text-neutral-500">
        <p>© 2026 Branda Technologies Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}

