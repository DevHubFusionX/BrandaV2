'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ChevronDown, 
  ChevronRight,
  Search,
  X
} from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  priceNGN: number;
  memberPriceNGN: number;
  moq: number;
  productionTime: string;
  colorsCount: number;
  slug: string;
  shipsLocation?: string;
  imageUrl?: string;
}

const mockCatalog: ProductItem[] = [
  {
    id: '1',
    name: 'Anker® 3-In-1 Power Bank',
    category: 'Drinkware & Tech',
    priceNGN: 48500,
    memberPriceNGN: 42000,
    moq: 3,
    productionTime: '48h Express',
    colorsCount: 1,
    slug: 'anker-3-in-1-power-bank',
    shipsLocation: 'Ships Nigeria',
    imageUrl: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png',
  },
  {
    id: '2',
    name: 'Moleskine® Soft Cover Large 12-Month Weekly 2027 Planner',
    category: 'Office & Journals',
    priceNGN: 28500,
    memberPriceNGN: 24000,
    moq: 4,
    productionTime: '3-5 Days',
    colorsCount: 1,
    slug: 'moleskine-soft-cover-large-planner',
    shipsLocation: 'Nationwide',
    imageUrl: 'https://cdn.dummyjson.com/products/images/home-decoration/Plant%20Pot/1.png',
  },
  {
    id: '3',
    name: 'Ahead Clubhouse Wool & Flannel Cap',
    category: 'Clothing & Accessories',
    priceNGN: 14500,
    memberPriceNGN: 12800,
    moq: 10,
    productionTime: '4-6 Days',
    colorsCount: 4,
    slug: 'ahead-clubhouse-wool-cap',
    shipsLocation: 'Nationwide',
    imageUrl: 'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png',
  },
  {
    id: '4',
    name: 'Clip-On Ring Light & Camera Cover',
    category: 'Drinkware & Tech',
    priceNGN: 9500,
    memberPriceNGN: 8200,
    moq: 25,
    productionTime: '48h Express',
    colorsCount: 1,
    slug: 'clip-on-ring-light-camera-cover',
    shipsLocation: 'Lagos Express',
    imageUrl: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Series%207%20GPS%2041mm/1.png',
  },
  {
    id: '5',
    name: 'Luxury 600gsm Duplex Business Cards (Spot UV & Foil)',
    category: 'Prints & Marketing',
    priceNGN: 35000,
    memberPriceNGN: 29500,
    moq: 100,
    productionTime: '48h Express',
    colorsCount: 3,
    slug: 'luxury-600gsm-business-cards',
    shipsLocation: 'Lagos Express',
  },
  {
    id: '6',
    name: 'Custom Branded Heavyweight Fleece Hoodie (380gsm)',
    category: 'Clothing & Accessories',
    priceNGN: 18500,
    memberPriceNGN: 16000,
    moq: 20,
    productionTime: '4-6 Days',
    colorsCount: 8,
    slug: 'heavyweight-custom-hoodies',
    shipsLocation: 'Nationwide',
    imageUrl: 'https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/1.png',
  },
  {
    id: '7',
    name: 'New Hire Onboarding Welcome Pack (Complete Gift Box)',
    category: 'Curated Packs',
    priceNGN: 38500,
    memberPriceNGN: 32000,
    moq: 15,
    productionTime: '3-5 Days',
    colorsCount: 3,
    slug: 'employee-onboarding-kit',
    shipsLocation: 'Nationwide',
  },
  {
    id: '8',
    name: 'Custom Printed E-Flute Corrugated Mailer Box',
    category: 'Packaging & Components',
    priceNGN: 1450,
    memberPriceNGN: 1150,
    moq: 50,
    productionTime: '5-7 Days',
    colorsCount: 1,
    slug: 'custom-packaging-boxes',
    shipsLocation: 'Nationwide',
  },
  {
    id: '9',
    name: 'Double-Wall Stainless Steel Thermal Tumbler (500ml)',
    category: 'Drinkware & Tech',
    priceNGN: 7800,
    memberPriceNGN: 6500,
    moq: 25,
    productionTime: '48h Express',
    colorsCount: 5,
    slug: 'insulated-thermal-flasks',
    shipsLocation: 'Lagos & Nationwide',
    imageUrl: 'https://cdn.dummyjson.com/products/images/kitchen-accessories/Carbon%20Steel%20Wok/1.png',
  },
  {
    id: '10',
    name: 'Executive Vegan Leather Laptop Portfolio (14-16")',
    category: 'Travel, Bags & Accessories',
    priceNGN: 16500,
    memberPriceNGN: 14000,
    moq: 20,
    productionTime: '3-5 Days',
    colorsCount: 3,
    slug: 'vegan-leather-laptop-sleeve',
    shipsLocation: 'Nationwide',
    imageUrl: 'https://cdn.dummyjson.com/products/images/womens-bags/Blue%20Women\'s%20Handbag/1.png',
  },
  {
    id: '11',
    name: 'Heavyweight Canvas Event Tote Bag (320gsm)',
    category: 'Travel, Bags & Accessories',
    priceNGN: 4200,
    memberPriceNGN: 3500,
    moq: 50,
    productionTime: '48h Express',
    colorsCount: 4,
    slug: 'canvas-event-tote-bag',
    shipsLocation: 'Nationwide',
    imageUrl: 'https://cdn.dummyjson.com/products/images/womens-bags/Heshe%20Women\'s%20Leather%20Bag/1.png',
  },
  {
    id: '12',
    name: 'Aluminum Heavy-Duty Roll-Up Banner Stand (1440dpi)',
    category: 'Media, Awards & Services',
    priceNGN: 24500,
    memberPriceNGN: 21000,
    moq: 1,
    productionTime: '24h Ready',
    colorsCount: 1,
    slug: 'roll-up-banners-signage',
    shipsLocation: 'Lagos & Nationwide',
  },
];

function ShopCatalogContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const urlTab = searchParams.get('tab') || '';

  const [catalog, setCatalog] = useState<ProductItem[]>(mockCatalog);
  const [topTierTab, setTopTierTab] = useState<'All' | 'Collections' | 'Curated Packs'>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const itemsPerPage = 16;

  // React to URL tab param
  useEffect(() => {
    if (urlTab === 'curated-packs') {
      setTopTierTab('Curated Packs');
      setActiveCategory('Curated Packs');
      setCurrentPage(1);
    } else if (urlTab === 'collections') {
      setTopTierTab('Collections');
      setCurrentPage(1);
    }
  }, [urlTab]);

  // Load products from free API proxy (limit=0 fetches all products)
  useEffect(() => {
    async function loadFreeApiProducts() {
      try {
        const res = await fetch('/api/products?limit=0');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            const mapped: ProductItem[] = data.products.map((p: any) => ({
              id: String(p.id),
              name: p.name,
              category: p.category,
              priceNGN: p.basePriceNGN,
              memberPriceNGN: p.memberPriceNGN,
              moq: p.moq || 3,
              productionTime: '48h Express',
              colorsCount: p.colors?.length || 3,
              slug: p.slug,
              shipsLocation: p.shippingInfo || 'Nationwide',
              imageUrl: p.imageUrl,
            }));
            setCatalog(mapped);
          }
        }
      } catch (err) {
        console.warn('API error, using initial catalog:', err);
      }
    }
    loadFreeApiProducts();
  }, []);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    moq: true,
    colors: true,
    price: true,
    productionTime: true,
    shipping: false,
    decoration: false,
  });

  const [selectedMoqs, setSelectedMoqs] = useState<number[]>([]);
  const [selectedProduction, setSelectedProduction] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('Newest');

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAllFilters = () => {
    setActiveCategory('All');
    setTopTierTab('All');
    setSelectedMoqs([]);
    setSelectedColors([]);
    setSelectedProduction(null);
    setCurrentPage(1);
  };

  const categoriesList = [
    'All',
    'Clothing & Accessories',
    'Sports & Outdoor',
    'Drinkware & Tech',
    'Kids & Baby',
    'Novelty',
    'Packaging & Components',
    'Office & Journals',
    'Travel, Bags & Accessories',
    'Pets',
    'Media, Awards & Services',
    'Home, Kitchen',
  ];

  const colorSwatches = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Navy', hex: '#1E3A8A' },
    { name: 'Red', hex: '#DC2626' },
    { name: 'Green', hex: '#16A34A' },
    { name: 'Gray', hex: '#6B7280' },
    { name: 'Royal', hex: '#2563EB' },
    { name: 'Sand', hex: '#D4B996' },
  ];

  const filteredProducts = useMemo(() => {
    let list = catalog.filter((item) => {
      // 1. Search Query from Navbar
      if (urlQuery) {
        const q = urlQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCat) return false;
      }

      // 2. Department Category Filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }

      // 3. Top Tab
      if (topTierTab === 'Curated Packs' && item.category !== 'Curated Packs') {
        return false;
      }

      // 4. MOQ Checkbox Filter
      if (selectedMoqs.length > 0 && !selectedMoqs.some((m) => item.moq <= m)) {
        return false;
      }

      // 5. Color Swatch Filter
      if (selectedColors.length > 0 && item.colorsCount <= 0) {
        return false;
      }

      // 6. Production Lead Time
      if (selectedProduction && !item.productionTime.includes(selectedProduction)) {
        return false;
      }

      return true;
    });

    if (sortBy === 'PriceLow') {
      list = [...list].sort((a, b) => a.priceNGN - b.priceNGN);
    } else if (sortBy === 'PriceHigh') {
      list = [...list].sort((a, b) => b.priceNGN - a.priceNGN);
    } else if (sortBy === 'MoqLow') {
      list = [...list].sort((a, b) => a.moq - b.moq);
    }

    return list;
  }, [catalog, activeCategory, topTierTab, selectedMoqs, selectedColors, selectedProduction, sortBy, urlQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24 text-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* 1. Breadcrumb Indicator */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-black flex items-center justify-center shrink-0">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
          <span>All Merchandise</span>
        </div>

        {/* 2. Main Page Title & Count */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-5">
          Shop All Merchandise <span className="text-neutral-400 font-normal text-xl sm:text-2xl">({filteredProducts.length})</span>
        </h1>

        {/* Active Search Term Pill (if searched from Navbar) */}
        {urlQuery && (
          <div className="flex items-center gap-2 mb-5 bg-neutral-100 text-neutral-800 text-xs px-3.5 py-1.5 rounded-full w-fit border border-neutral-200">
            <Search className="w-3.5 h-3.5 text-neutral-500" />
            <span>Search filter: <strong>&quot;{urlQuery}&quot;</strong></span>
            <Link href="/shop" className="text-neutral-400 hover:text-black ml-1 font-bold">
              <X className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* 3. Two-Tier Navigation Card Container */}
        <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-xl p-3 sm:p-4 mb-8">
          {/* Tier 1 */}
          <div className="flex items-center gap-6 border-b border-neutral-200/70 pb-2.5 text-xs sm:text-[13px] font-semibold">
            <button
              onClick={() => { setTopTierTab('All'); setActiveCategory('All'); setCurrentPage(1); }}
              className={`pb-2.5 -mb-2.5 transition-colors relative ${
                topTierTab === 'All'
                  ? 'text-[#0066FF] border-b-2 border-[#0066FF]'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Shop All Merchandise
            </button>
            <button
              onClick={() => { setTopTierTab('Collections'); setCurrentPage(1); }}
              className={`pb-2.5 -mb-2.5 transition-colors relative ${
                topTierTab === 'Collections'
                  ? 'text-[#0066FF] border-b-2 border-[#0066FF]'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => { setTopTierTab('Curated Packs'); setActiveCategory('Curated Packs'); setCurrentPage(1); }}
              className={`pb-2.5 -mb-2.5 transition-colors relative ${
                topTierTab === 'Curated Packs'
                  ? 'text-[#0066FF] border-b-2 border-[#0066FF]'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Curated Packs
            </button>
          </div>

          {/* Tier 2 */}
          <div className="flex items-center gap-5 overflow-x-auto pt-3 text-xs font-medium scrollbar-none relative">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`whitespace-nowrap transition-colors pb-1 ${
                  activeCategory === cat
                    ? 'text-black font-bold border-b-2 border-black'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="sticky right-0 bg-gradient-to-l from-neutral-50/90 to-transparent pl-4 shrink-0 flex items-center">
              <ChevronRight className="w-4 h-4 text-neutral-400 hover:text-black cursor-pointer" />
            </div>
          </div>
        </div>

        {/* 4. Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Detailed Filtering Categories */}
          <aside className="lg:col-span-3 space-y-4">
            
            {/* Header: Filters + Clear All */}
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <span className="text-xs font-bold text-neutral-950 uppercase tracking-wider">
                Filters
              </span>
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#0066FF] hover:underline font-semibold"
              >
                Clear all
              </button>
            </div>

            {/* Accordion: Category */}
            <div className="border-b border-neutral-100 pb-3.5">
              <button
                onClick={() => toggleSection('category')}
                className="w-full flex items-center justify-between text-xs font-bold text-neutral-900"
              >
                <span>Category</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${openSections.category ? 'rotate-180' : ''}`} />
              </button>
              {openSections.category && (
                <div className="space-y-1.5 pt-2 text-xs text-neutral-600">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="sidebarCategory"
                        checked={activeCategory === cat}
                        onChange={() => { setActiveCategory(cat); setCurrentPage(1); }}
                        className="text-black focus:ring-black"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion: Minimum Order Quantity (MOQ) */}
            <div className="border-b border-neutral-100 pb-3.5">
              <button
                onClick={() => toggleSection('moq')}
                className="w-full flex items-center justify-between text-xs font-bold text-neutral-900"
              >
                <span>Minimum Order Quantity</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${openSections.moq ? 'rotate-180' : ''}`} />
              </button>
              {openSections.moq && (
                <div className="space-y-1.5 pt-2 text-xs text-neutral-600">
                  {[3, 4, 10, 25, 50, 100].map((qty) => (
                    <label key={qty} className="flex items-center gap-2 cursor-pointer hover:text-black">
                      <input
                        type="checkbox"
                        checked={selectedMoqs.includes(qty)}
                        onChange={() => {
                          setSelectedMoqs((prev) =>
                            prev.includes(qty) ? prev.filter((q) => q !== qty) : [...prev, qty]
                          );
                          setCurrentPage(1);
                        }}
                        className="rounded border-neutral-300 text-black focus:ring-black"
                      />
                      <span>Min {qty}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion: Colors */}
            <div className="border-b border-neutral-100 pb-3.5">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleSection('colors')}
                  className="flex items-center gap-2 text-xs font-bold text-neutral-900"
                >
                  <span>Colors</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${openSections.colors ? 'rotate-180' : ''}`} />
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (selectedColors.length === colorSwatches.length) {
                      setSelectedColors([]);
                    } else {
                      setSelectedColors(colorSwatches.map((c) => c.name));
                    }
                    setCurrentPage(1);
                  }}
                  className="text-[11px] text-[#0066FF] hover:underline font-medium"
                >
                  {selectedColors.length === colorSwatches.length ? 'Clear all' : 'Select all'}
                </button>
              </div>
              {openSections.colors && (
                <div className="flex flex-wrap gap-2 pt-2.5">
                  {colorSwatches.map((color) => {
                    const isSelected = selectedColors.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColors((prev) =>
                            isSelected ? prev.filter((c) => c !== color.name) : [...prev, color.name]
                          );
                          setCurrentPage(1);
                        }}
                        className={`w-6 h-6 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${
                          color.border ? 'border border-neutral-300' : ''
                        } ${isSelected ? 'ring-2 ring-black ring-offset-1 scale-105' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && (
                          <div className={`w-1.5 h-1.5 rounded-full ${color.hex.toLowerCase() === '#ffffff' ? 'bg-black' : 'bg-white'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Accordion: Price Range */}
            <div className="border-b border-neutral-100 pb-3.5">
              <button
                onClick={() => toggleSection('price')}
                className="w-full flex items-center justify-between text-xs font-bold text-neutral-900"
              >
                <span>Price Range (per unit)</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
              </button>
              {openSections.price && (
                <div className="space-y-1.5 pt-2 text-xs text-neutral-600">
                  {['Under ₦5,000', '₦5,000 - ₦15,000', '₦15,000 - ₦30,000', 'Over ₦30,000'].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer hover:text-black">
                      <input type="checkbox" className="rounded border-neutral-300 text-black focus:ring-black" />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion: Production Time */}
            <div className="border-b border-neutral-100 pb-3.5">
              <button
                onClick={() => toggleSection('productionTime')}
                className="w-full flex items-center justify-between text-xs font-bold text-neutral-900"
              >
                <span>Production Time</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${openSections.productionTime ? 'rotate-180' : ''}`} />
              </button>
              {openSections.productionTime && (
                <div className="space-y-1.5 pt-2 text-xs text-neutral-600">
                  {['48h Express', '3-5 Days', '4-6 Days', '24h Ready'].map((time) => (
                    <label key={time} className="flex items-center gap-2 cursor-pointer hover:text-black">
                      <input
                        type="radio"
                        name="productionTime"
                        checked={selectedProduction === time}
                        onChange={() => {
                          setSelectedProduction(selectedProduction === time ? null : time);
                          setCurrentPage(1);
                        }}
                        className="text-black focus:ring-black"
                      />
                      <span>{time}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion: Shipping Location */}
            <div className="border-b border-neutral-100 pb-3.5">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between text-xs font-bold text-neutral-900"
              >
                <span>Shipping Location</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${openSections.shipping ? 'rotate-180' : ''}`} />
              </button>
              {openSections.shipping && (
                <div className="space-y-1.5 pt-2 text-xs text-neutral-600">
                  {['Lagos Express', 'Nationwide', 'Ships Nigeria'].map((loc) => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer hover:text-black">
                      <input type="checkbox" className="rounded border-neutral-300 text-black focus:ring-black" />
                      <span>{loc}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion: Decoration Method */}
            <div className="border-b border-neutral-100 pb-3.5">
              <button
                onClick={() => toggleSection('decoration')}
                className="w-full flex items-center justify-between text-xs font-bold text-neutral-900"
              >
                <span>Decoration Method</span>
                <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${openSections.decoration ? 'rotate-180' : ''}`} />
              </button>
              {openSections.decoration && (
                <div className="space-y-1.5 pt-2 text-xs text-neutral-600">
                  {['Screen Print', 'UV High-Res Print', 'Embroidery', 'Laser Engraving'].map((dec) => (
                    <label key={dec} className="flex items-center gap-2 cursor-pointer hover:text-black">
                      <input type="checkbox" className="rounded border-neutral-300 text-black focus:ring-black" />
                      <span>{dec}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </aside>

          {/* Right Area: Results Counter & Upgraded Product Cards Grid */}
          <main className="lg:col-span-9 space-y-5">
            
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs text-neutral-500 font-medium">
                Showing {filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
              </span>

              <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200">
                <span className="text-neutral-500">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                  className="bg-transparent font-bold text-neutral-900 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="Newest">Newest</option>
                  <option value="Popular">Most Popular</option>
                  <option value="PriceLow">Price: Low to High</option>
                  <option value="PriceHigh">Price: High to Low</option>
                  <option value="MoqLow">MOQ: Low to High</option>
                </select>
              </div>
            </div>

            {/* 4-Column Product Cards Grid with Interactive Hover Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  category={product.category}
                  priceNGN={product.priceNGN}
                  memberPriceNGN={product.memberPriceNGN}
                  moq={product.moq}
                  colorsCount={product.colorsCount}
                  shipsLocation={product.shipsLocation}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>

            {/* Interactive Dynamic Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-10 flex items-center justify-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let p = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    p = currentPage - 2 + i;
                    if (p > totalPages) p = totalPages - (4 - i);
                  }
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                        currentPage === p
                          ? 'bg-black text-white'
                          : 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="text-xs text-neutral-400 px-1">...</span>
                )}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <button
                    type="button"
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-bold"
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}

export default function ShopCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
          <div className="h-8 bg-neutral-200 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="h-96 bg-neutral-100 rounded" />
            <div className="h-96 bg-neutral-100 rounded md:col-span-3" />
          </div>
        </div>
      }
    >
      <ShopCatalogContent />
    </Suspense>
  );
}
