'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Globe
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { navigationConfig, NavItemConfig } from '@/config/navigation';
import { MegaMenu } from './mega-menu';
import { NavDropdown } from './nav-dropdown';
import { CartDrawer } from './cart-drawer';
import { ShopNavbar } from './shop-navbar';
import { useCart } from '@/hooks/use-cart';

export function Navbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const { items, openCart, currency, setCurrency } = useCart();
  const cartItemCount = hasMounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const toggleCurrency = () => {
    setCurrency(currency === 'NGN' ? 'USD' : 'NGN');
  };

  const isShopPage = 
    pathname === '/shop' || 
    pathname.startsWith('/shop') || 
    pathname.startsWith('/products') || 
    pathname.startsWith('/categories') || 
    pathname.startsWith('/search') || 
    pathname === '/cart' ||
    pathname.startsWith('/cart') ||
    pathname === '/checkout' ||
    pathname.startsWith('/checkout') ||
    pathname === '/account' ||
    pathname.startsWith('/account');

  if (isShopPage) {
    return (
      <>
        <ShopNavbar />
        <CartDrawer />
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            
            {/* Left: Brand Identity */}
            <div className="flex items-center shrink-0 pr-4">
              <Link href="/shop" className="group flex flex-col items-start select-none">
                <span className="text-[22px] font-black tracking-tight text-neutral-950 leading-none group-hover:text-black transition-colors font-sans lowercase">
                  branda
                </span>
                <span className="text-[8.5px] text-neutral-400 font-semibold tracking-widest uppercase mt-1 leading-none">
                  {siteConfig.subname}
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links (Tight spacing & typography so nothing wraps) */}
            <nav 
              className="hidden lg:flex items-center space-x-0.5 xl:space-x-1"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {navigationConfig.map((item: NavItemConfig) => {
                const hasChildren = Boolean(item.isMegaMenu || item.items?.length);

                return (
                  <div
                    key={item.title}
                    className="relative py-4"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.title)}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 text-[13px] font-semibold tracking-normal transition-colors rounded-md whitespace-nowrap ${
                        activeDropdown === item.title
                          ? 'text-black bg-neutral-100/90'
                          : 'text-neutral-700 hover:text-black hover:bg-neutral-50'
                      }`}
                    >
                      <span>{item.title}</span>
                      {hasChildren && (
                        <ChevronDown
                          className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                            activeDropdown === item.title ? 'rotate-180 text-black' : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* Compact Popover Dropdown for Non-Mega Menu items */}
                    {!item.isMegaMenu && item.items && (
                      <NavDropdown
                        title={item.title}
                        items={item.items}
                        isOpen={activeDropdown === item.title}
                        onClose={() => setActiveDropdown(null)}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Actions Suite (No wraps, tight balanced elements) */}
            <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
              
              {/* Currency Selector */}
              <button
                onClick={toggleCurrency}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200/80 rounded-full transition-colors whitespace-nowrap"
                title="Switch Currency"
              >
                <Globe className="w-3 h-3 text-neutral-500" />
                <span>{currency === 'NGN' ? '₦ NGN' : '$ USD'}</span>
              </button>

              {/* Search Trigger */}
              <Link
                href="/search"
                className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Search catalog"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <div className="hidden md:block h-4 w-px bg-neutral-200" />

              {/* Sign In Link */}
              <Link
                href="/account"
                className="hidden xl:inline-block text-[11px] font-bold tracking-wider text-neutral-800 hover:text-black uppercase transition-colors whitespace-nowrap px-1"
              >
                LOG IN | SIGN UP
              </Link>

              {/* Primary Pill Button */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-md whitespace-nowrap"
              >
                BOOK A DEMO
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-neutral-700 hover:text-black lg:hidden rounded-lg hover:bg-neutral-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Descript-Style Mega Menu for Products */}
        <MegaMenu
          isOpen={activeDropdown === 'Products'}
          onClose={() => setActiveDropdown(null)}
        />
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div className="flex flex-col">
                <span className="text-xl font-black text-black lowercase">branda</span>
                <span className="text-[8.5px] text-neutral-400 font-semibold tracking-widest uppercase">
                  {siteConfig.subname}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 px-5 py-4 space-y-1.5">
              {navigationConfig.map((item) => (
                <div key={item.title} className="border-b border-neutral-100 pb-1.5">
                  <div className="flex items-center justify-between py-2">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-bold text-neutral-900"
                    >
                      {item.title}
                    </Link>
                    {item.items && (
                      <button
                        onClick={() =>
                          setExpandedMobileItem(
                            expandedMobileItem === item.title ? null : item.title
                          )
                        }
                        className="p-1 text-neutral-400 hover:text-neutral-900"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            expandedMobileItem === item.title ? 'rotate-180 text-black' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.items && expandedMobileItem === item.title && (
                    <div className="pl-3 py-2 space-y-1.5 bg-neutral-50 rounded-lg p-2.5 mt-1">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-medium text-neutral-600 hover:text-black py-1 leading-snug"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Drawer Footer */}
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/50 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-700">
                <span>Currency:</span>
                <button
                  onClick={toggleCurrency}
                  className="bg-white px-3 py-1 rounded-full border border-neutral-200 font-bold"
                >
                  {currency === 'NGN' ? '₦ NGN' : '$ USD'}
                </button>
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-black text-white text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-xs"
              >
                <span>BOOK A DEMO</span>
              </Link>

              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-white text-neutral-900 border border-neutral-300 text-center py-2.5 rounded-full text-xs font-bold uppercase tracking-wider block hover:bg-neutral-100 transition-colors"
              >
                LOG IN | SIGN UP
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Cart Drawer */}
      <CartDrawer />
    </>
  );
}
