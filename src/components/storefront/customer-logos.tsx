import React from 'react';

export function CustomerLogos() {
  return (
    <section className="bg-white py-12 md:py-16 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Centered Caption (Matching Reference Screenshot) */}
        <p className="text-center text-xs sm:text-sm font-medium text-neutral-500 mb-8 sm:mb-10">
          Our Customers
        </p>

        {/* Horizontal Monochrome Logo Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          
          {/* Paystack */}
          <div className="flex items-center gap-1.5 text-neutral-900 hover:text-black transition-colors select-none">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M4 4h16v4H4zm0 6h12v4H4zm0 6h16v4H4z" />
            </svg>
            <span className="text-base sm:text-lg font-black tracking-tight font-sans">
              paystack
            </span>
          </div>

          {/* Flutterwave */}
          <div className="flex items-center gap-1.5 text-neutral-900 hover:text-black transition-colors select-none">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5S10 17.33 10 16.5v-9c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v9z" />
            </svg>
            <span className="text-base sm:text-lg font-bold tracking-tight font-sans">
              flutterwave
            </span>
          </div>

          {/* Piggyvest */}
          <div className="flex items-center gap-1.5 text-neutral-900 hover:text-black transition-colors select-none">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12l2 2 4-4" stroke="#ffffff" strokeWidth="2" fill="none" />
            </svg>
            <span className="text-base sm:text-lg font-extrabold tracking-tight font-sans">
              piggyvest
            </span>
          </div>

          {/* Moniepoint */}
          <div className="flex items-center gap-1.5 text-neutral-900 hover:text-black transition-colors select-none">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
            <span className="text-base sm:text-lg font-black tracking-tight font-sans">
              moniepoint
            </span>
          </div>

          {/* Kuda */}
          <div className="flex items-center gap-1 text-neutral-900 hover:text-black transition-colors select-none">
            <span className="text-lg sm:text-xl font-black tracking-tighter font-sans lowercase">
              kuda.
            </span>
          </div>

          {/* Notion */}
          <div className="flex items-center gap-1.5 text-neutral-900 hover:text-black transition-colors select-none">
            <div className="w-5 h-5 rounded-sm bg-neutral-900 text-white font-bold font-serif text-xs flex items-center justify-center">
              N
            </div>
            <span className="text-base sm:text-lg font-bold tracking-tight font-sans">
              Notion
            </span>
          </div>

          {/* Siemens */}
          <div className="flex items-center text-neutral-900 hover:text-black transition-colors select-none">
            <span className="text-sm sm:text-base font-black tracking-widest uppercase font-sans">
              SIEMENS
            </span>
          </div>

          {/* Eden Life */}
          <div className="flex items-center gap-1.5 text-neutral-900 hover:text-black transition-colors select-none">
            <span className="text-base sm:text-lg font-extrabold tracking-tight font-sans">
              edenlife
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

