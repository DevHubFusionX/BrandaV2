'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X,
  Globe
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/commerce/pricing';

export function ShopNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { items, currency, setCurrency } = useCart();
  const cartItemCount = hasMounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Close autocomplete on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const autocompleteMatches = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    const catalog = [
      {
        id: '1',
        name: 'Anker® 3-In-1 Power Bank',
        slug: 'anker-3-in-1-power-bank',
        category: 'Drinkware & Tech',
        priceNGN: 48500,
      },
      {
        id: '2',
        name: 'New Hire Onboarding Welcome Pack',
        slug: 'employee-onboarding-kit',
        category: 'Curated Packs',
        priceNGN: 38500,
      },
      {
        id: '3',
        name: 'Ahead Clubhouse Wool & Flannel Cap',
        slug: 'ahead-clubhouse-wool-cap',
        category: 'Clothing & Accessories',
        priceNGN: 14500,
      },
      {
        id: '4',
        name: 'Moleskine® Soft Cover Large Planner',
        slug: 'moleskine-soft-cover-large-planner',
        category: 'Office & Journals',
        priceNGN: 28500,
      },
    ];

    return catalog.filter(
      (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    ).slice(0, 3);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'NGN' ? 'USD' : 'NGN');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">
          
          {/* 1. Left Group: Logo + Navigation Links (Exact Match to Reference Screenshot) */}
          <div className="flex items-center gap-7 lg:gap-10">
            
            {/* Branda Logo with Subtitle */}
            <Link href="/shop" className="group flex flex-col items-start select-none shrink-0">
              <span className="text-[22px] font-black tracking-tight text-neutral-950 leading-none group-hover:text-black transition-colors font-sans lowercase">
                branda
              </span>
              <span className="text-[7.5px] text-neutral-400 font-semibold tracking-wider uppercase mt-1 leading-none">
                a branda company
              </span>
            </Link>

            {/* Links: All Merchandise, Collections, Curated Packs, Resources */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-7 text-sm font-medium">
              <Link
                href="/shop"
                className={`transition-colors ${
                  pathname === '/shop'
                    ? 'text-neutral-950 font-bold'
                    : 'text-neutral-700 hover:text-neutral-950'
                }`}
              >
                All Merchandise
              </Link>
              <Link
                href="/shop?tab=collections"
                className="text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                Collections
              </Link>
              <Link
                href="/shop?tab=curated-packs"
                className="text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                Curated Packs
              </Link>
              <Link
                href="/resources"
                className="text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                Resources
              </Link>
            </nav>
          </div>

          {/* 2. Right Group: Search Pill, BOOK A DEMO, User Icon, Cart with Blue Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Input Pill with Instant Autocomplete */}
            <div ref={searchContainerRef} className="relative hidden sm:block">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center w-52 sm:w-60 lg:w-64 bg-neutral-100/90 rounded-full px-3.5 py-1.5 border border-transparent focus-within:border-neutral-300 focus-within:bg-white transition-all">
                  <Search className="w-3.5 h-3.5 text-neutral-400 mr-2 shrink-0 stroke-[2]" />
                  <input
                    type="text"
                    placeholder="Search Products"
                    value={searchQuery}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    className="bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none w-full"
                  />
                </div>
              </form>

              {/* Autocomplete Dropdown Popup */}
              {isSearchFocused && autocompleteMatches.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Suggested Products
                  </div>
                  {autocompleteMatches.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded bg-neutral-100 border border-neutral-200 shrink-0 flex items-center justify-center text-[8px] font-mono text-neutral-400">
                        IMG
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-900 truncate">{item.name}</p>
                        <p className="text-[10px] text-neutral-500">{formatCurrency(item.priceNGN, currency)}</p>
                      </div>
                    </Link>
                  ))}
                  <div 
                    onClick={() => {
                      setIsSearchFocused(false);
                      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                    }}
                    className="pt-1.5 mt-1 border-t border-neutral-100 px-3 py-1 text-[11px] text-[#0066FF] hover:underline font-medium cursor-pointer"
                  >
                    View all matching results ➔
                  </div>
                </div>
              )}
            </div>

            {/* Book a Demo Pill Button (Exact Match to Reference Screenshot) */}
            <Link
              href="/contact?intent=demo"
              className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-full transition-colors whitespace-nowrap tracking-wide uppercase"
            >
              BOOK A DEMO
            </Link>

            {/* Currency switch helper */}
            <button
              onClick={toggleCurrency}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-neutral-600 hover:text-black bg-neutral-100 hover:bg-neutral-200/80 rounded-full transition-colors"
              title="Toggle currency"
            >
              <Globe className="w-3 h-3 text-neutral-500" />
              <span>{currency === 'NGN' ? '₦ NGN' : '$ USD'}</span>
            </button>

            {/* User Account Icon */}
            <Link
              href="/account"
              className="p-1.5 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
              title="Account"
            >
              <User className="w-5 h-5 stroke-[1.8]" />
            </Link>

            {/* Shopping Cart Icon with Circular Blue Badge (Navigates to /cart) */}
            <Link
              href="/cart"
              className="relative p-1.5 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#2563EB] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="pb-2">
            <div className="flex items-center w-full bg-neutral-100 rounded-full px-3.5 py-2">
              <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none w-full"
              />
            </div>
          </form>

          <div className="space-y-2 text-sm font-semibold">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-neutral-900"
            >
              All Merchandise
            </Link>
            <Link
              href="/shop?tab=collections"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-neutral-700"
            >
              Collections
            </Link>
            <Link
              href="/shop?tab=curated-packs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-neutral-700"
            >
              Curated Packs
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-neutral-700"
            >
              Resources
            </Link>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={toggleCurrency}
              className="text-xs font-bold text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-full"
            >
              Currency: {currency === 'NGN' ? '₦ NGN' : '$ USD'}
            </button>
            <Link
              href="/contact?intent=demo"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-white bg-black px-4 py-1.5 rounded-full"
            >
              BOOK A DEMO
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

