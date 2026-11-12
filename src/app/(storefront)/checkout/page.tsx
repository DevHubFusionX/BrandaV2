'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Calendar, 
  Info, 
  Upload, 
  User, 
  Building2, 
  Phone, 
  ArrowRight, 
  PenTool,
  X,
  CreditCard,
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/commerce/pricing';
import { PaymentModal, PaymentSuccessDetails } from '@/components/checkout/payment-modal';

export default function CheckoutProjectDetailsPage() {
  const { items, currency, clearCart } = useCart();

  // Contact States (Initialized with customer data matching reference screenshot)
  const [email, setEmail] = useState('info@devhubfusionx.site');
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [firstName, setFirstName] = useState('Franklin chibuike');
  const [lastName, setLastName] = useState('anyanwu');
  const [companyName, setCompanyName] = useState('devhufusionx');
  const [phone, setPhone] = useState('+2348030531624');
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  // Project Details States
  const [dateInput, setDateInput] = useState('December 11th, 2026');
  const [isFirmDate, setIsFirmDate] = useState(true);
  const [projectComments, setProjectComments] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Checkout Mode & Payment Integration States
  const [checkoutMode, setCheckoutMode] = useState<'mockup' | 'deposit'>('mockup');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentSuccessDetails | null>(null);

  // Confirmation View State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{
    items: typeof items;
    totalEstimate: number;
    email: string;
    paymentReference?: string;
  } | null>(null);

  const formatPrice = (amount: number) => formatCurrency(amount, currency);

  const totalEstimate = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalProductsCount = items.length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...newFiles].slice(0, 2));
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== fileName));
  };

  const handlePaymentSuccess = (details: PaymentSuccessDetails) => {
    setPaymentDetails(details);
    setIsPaymentModalOpen(false);

    setOrderSummary({
      items: items.length > 0 ? [...items] : [
        {
          id: 'mock-sample-item',
          productId: '1',
          name: 'Anker® 3-In-1 Power Bank',
          slug: 'anker-3-in-1-power-bank',
          image: '/product-placeholder.png',
          quantity: 4,
          unitPrice: currency === 'NGN' ? 202290 : 134.86,
          totalPrice: currency === 'NGN' ? 809160 : 539.44,
          selectedColor: 'Black',
          turnaroundDays: 3,
        }
      ],
      totalEstimate: totalEstimate > 0 ? totalEstimate : (currency === 'NGN' ? 809160 : 539.44),
      email: email || 'info@devhubfusionx.site',
      paymentReference: details.reference,
    });
    setIsSubmitted(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkoutMode === 'deposit') {
      setIsPaymentModalOpen(true);
      return;
    }

    // Cache the submitted order details for the confirmation screen
    setOrderSummary({
      items: items.length > 0 ? [...items] : [
        {
          id: 'mock-sample-item',
          productId: '1',
          name: 'Anker® 3-In-1 Power Bank',
          slug: 'anker-3-in-1-power-bank',
          image: '/product-placeholder.png',
          quantity: 4,
          unitPrice: currency === 'NGN' ? 202290 : 134.86,
          totalPrice: currency === 'NGN' ? 809160 : 539.44,
          selectedColor: 'Black',
          turnaroundDays: 3,
        }
      ],
      totalEstimate: totalEstimate > 0 ? totalEstimate : (currency === 'NGN' ? 809160 : 539.44),
      email: email || 'info@devhubfusionx.site',
    });
    setIsSubmitted(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // CONFIRMATION VIEW (Exact Match to Reference Screenshots 1 & 2)
  // -------------------------------------------------------------
  if (isSubmitted && orderSummary) {
    return (
      <div className="bg-white min-h-screen text-neutral-900 font-sans pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
            
            {/* Left Column: Thank you note + What happens now? Steps */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-10">
              
              {/* Header Title & Subtitle (Exact Match to Screenshot 1) */}
              <div>
                {orderSummary.paymentReference && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-full mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Payment Verified • Ref: {orderSummary.paymentReference}</span>
                  </div>
                )}
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                  Thank you for your project request!
                </h1>
                <p className="text-xs sm:text-sm text-neutral-700 mt-3 font-normal leading-relaxed">
                  We just sent you an email to <span className="text-[#0066FF] font-medium">{orderSummary.email}</span> confirming this information.
                </p>
              </div>

              {/* What happens now? */}
              <div className="pt-2">
                <h2 className="text-xl font-bold text-neutral-950 tracking-tight mb-8">
                  What happens now?
                </h2>

                <div className="space-y-10 sm:space-y-12">
                  
                  {/* Step 1: Activate your account (Illustration 1) */}
                  <div className="flex gap-5 sm:gap-7 items-start">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center relative">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible">
                        <ellipse cx="50" cy="88" rx="30" ry="5" fill="#18181B" opacity="0.95" />
                        {/* Blue Envelope Body */}
                        <rect x="22" y="42" width="56" height="42" rx="4" fill="#0066FF" />
                        {/* Dark Inner Pocket */}
                        <polygon points="26,44 50,62 74,44 70,44 50,58 30,44" fill="#0047AB" />
                        {/* Letter Emerging */}
                        <rect x="28" y="24" width="44" height="30" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                        {/* Character Figure jumping on top */}
                        <circle cx="50" cy="18" r="4" fill="#18181B" />
                        <path d="M46 28 L50 22 L54 28 M48 24 L52 24" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
                        {/* Envelope Front Flaps */}
                        <polygon points="22,84 50,60 22,46" fill="#0052CC" />
                        <polygon points="78,84 50,60 78,46" fill="#0052CC" />
                        <polygon points="22,84 78,84 50,62" fill="#0066FF" />
                        {/* Star accents */}
                        <text x="18" y="32" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                        <text x="76" y="36" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                        <text x="70" y="82" fontSize="9" fill="#94A3B8" fontWeight="bold">+</text>
                      </svg>
                    </div>

                    <div className="pt-1">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                        Activate your account
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed max-w-lg">
                        We created a free account for you! Check your email and follow the steps to activate your account &amp; gain access to your personalized merchandise dashboard.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Review your mockups (Illustration 2) */}
                  <div className="flex gap-5 sm:gap-7 items-start">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center relative">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible">
                        <ellipse cx="50" cy="88" rx="28" ry="5" fill="#18181B" opacity="0.95" />
                        {/* Document in vibrant blue */}
                        <g transform="rotate(-6 50 50)">
                          <rect x="28" y="22" width="44" height="60" rx="3" fill="#0066FF" />
                          {/* Document text lines */}
                          <line x1="34" y1="34" x2="56" y2="34" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="34" y1="42" x2="66" y2="42" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="34" y1="50" x2="66" y2="50" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="34" y1="58" x2="50" y2="58" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
                        </g>
                        {/* Magnifying Glass */}
                        <circle cx="64" cy="34" r="11" fill="none" stroke="#18181B" strokeWidth="3" />
                        <circle cx="64" cy="34" r="8" fill="#FFFFFF" fillOpacity="0.4" />
                        <line x1="72" y1="42" x2="82" y2="52" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
                        {/* Star accents */}
                        <text x="18" y="44" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                        <text x="80" y="26" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                      </svg>
                    </div>

                    <div className="pt-1">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                        Review your mockups
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed max-w-lg">
                        Your mockups will be ready within 1 business day! Be on the lookout for an email notification.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Edit and approve your products (Illustration 3) */}
                  <div className="flex gap-5 sm:gap-7 items-start">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center relative">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible">
                        <ellipse cx="50" cy="88" rx="30" ry="5" fill="#18181B" opacity="0.95" />
                        {/* Tilted Blue Pencil */}
                        <g transform="rotate(-35 50 50)">
                          {/* Pencil tip */}
                          <polygon points="50,15 44,28 56,28" fill="#F1F5F9" />
                          <polygon points="50,15 47,21 53,21" fill="#18181B" />
                          {/* Pencil Body in blue */}
                          <rect x="44" y="28" width="12" height="42" fill="#0066FF" />
                          <line x1="48" y1="28" x2="48" y2="70" stroke="#0052CC" strokeWidth="1" />
                          <line x1="52" y1="28" x2="52" y2="70" stroke="#0052CC" strokeWidth="1" />
                          {/* Metal band and eraser */}
                          <rect x="44" y="70" width="12" height="6" fill="#CBD5E1" />
                          <rect x="44" y="76" width="12" height="8" rx="2" fill="#F43F5E" />
                        </g>
                        {/* Drawn stroke and sparkles */}
                        <path d="M42 74 Q48 76 54 70" stroke="#18181B" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <text x="24" y="32" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                        <text x="74" y="48" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                      </svg>
                    </div>

                    <div className="pt-1">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                        Edit and approve your products
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed max-w-lg">
                        Let&apos;s make this project perfect! Request design edits and approve when ready.
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Place your order (Illustration 4 from Screenshot 2) */}
                  <div className="flex gap-5 sm:gap-7 items-start">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center relative">
                      <svg viewBox="0 0 100 100" className="w-20 h-20 overflow-visible">
                        {/* Wrist cuff */}
                        <ellipse cx="38" cy="78" rx="10" ry="5" fill="#18181B" />
                        {/* Blue Hand giving thumbs up */}
                        <g fill="#0066FF" stroke="#0052CC" strokeWidth="1">
                          <path d="M35 76 C35 70 38 60 44 56 C46 54 48 52 52 52 C56 52 64 54 66 58 C68 62 68 70 64 74 C60 78 48 80 38 78 Z" />
                          <path d="M48 52 C48 42 46 32 48 24 C50 20 56 20 58 24 C60 32 60 42 60 52 Z" />
                          <rect x="58" y="52" width="16" height="7" rx="3.5" fill="#0066FF" />
                          <rect x="58" y="58" width="16" height="7" rx="3.5" fill="#0066FF" />
                          <rect x="58" y="64" width="15" height="7" rx="3.5" fill="#0066FF" />
                          <rect x="56" y="70" width="14" height="7" rx="3.5" fill="#0066FF" />
                        </g>
                        {/* Small Figure atop thumb */}
                        <circle cx="53" cy="18" r="3" fill="#18181B" />
                        <path d="M50 28 L53 22 L56 28 M51 24 L55 24" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />
                        {/* Star sparkles */}
                        <text x="24" y="38" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                        <text x="68" y="30" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                        <text x="74" y="66" fontSize="10" fill="#94A3B8" fontWeight="bold">+</text>
                      </svg>
                    </div>

                    <div className="pt-1">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                        Place your order
                      </h3>
                      <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed max-w-lg">
                        Once everything looks perfect, pay and place your order! We&apos;ll then begin production which typically takes 3-4 weeks.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Right Column: Project summary (Exact Match to Screenshot 1) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:pl-6">
              
              <h2 className="text-2xl font-bold text-neutral-950 tracking-tight">
                Project summary
              </h2>

              {/* Total Estimate */}
              <div className="pt-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-bold text-neutral-900">
                      Total Estimate
                    </div>
                    <div className="text-xs text-neutral-500 font-normal mt-0.5">
                      (Not including taxes and fees)
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                    {formatPrice(orderSummary.totalEstimate)}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="pt-4 space-y-4">
                <div className="text-xs text-neutral-500 font-medium">
                  {orderSummary.items.length} {orderSummary.items.length === 1 ? 'Product' : 'Products'}
                </div>

                {orderSummary.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    
                    {/* Product Thumbnail: Real Image or Clean Container */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-neutral-100 border border-neutral-200/90 flex flex-col items-center justify-center shrink-0 p-1 text-center overflow-hidden">
                      {item.image && item.image !== '/product-placeholder.png' ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded bg-neutral-200 flex items-center justify-center text-[8px] font-mono text-neutral-400">
                          IMG
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-neutral-950 truncate">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-neutral-500">
                        Color: {item.selectedColor || 'Black'}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} – {formatPrice(item.unitPrice)} / item
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FORM ENTRY VIEW (Exact Match to Reference Screenshots from Previous Step)
  // -------------------------------------------------------------
  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">
          
          {/* Left Column: Form Details (~65% width) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* 1. Contact Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-neutral-950">
                  Contact
                </h2>
                {isEditingContact && (
                  <button
                    type="button"
                    onClick={() => setIsEditingContact(false)}
                    className="text-xs text-[#0066FF] hover:underline font-semibold"
                  >
                    Done
                  </button>
                )}
              </div>

              {isEditingContact ? (
                <div className="pt-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full max-w-md p-3 border border-neutral-300 rounded-md text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative w-full max-w-md">
                    <input
                      type="text"
                      readOnly
                      value={email}
                      onClick={() => setIsEditingContact(true)}
                      className="w-full p-3.5 pr-10 border border-neutral-200 rounded-md text-xs sm:text-sm text-neutral-900 bg-white cursor-pointer focus:outline-none"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0066FF] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-700 font-normal">
                    Looks like you are new here - Welcome!
                  </p>
                </div>
              )}
            </div>

            {/* 2. Contact Details Section */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-base sm:text-lg font-bold text-neutral-950">
                  Contact Details
                </h2>
                <button
                  type="button"
                  onClick={() => setIsEditingDetails(!isEditingDetails)}
                  className="text-xs text-[#0066FF] hover:underline font-semibold cursor-pointer"
                >
                  {isEditingDetails ? 'Done' : 'Edit'}
                </button>
              </div>

              {isEditingDetails ? (
                <div className="space-y-3 max-w-md p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="p-2.5 border border-neutral-300 rounded text-xs bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="p-2.5 border border-neutral-300 rounded text-xs bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded text-xs bg-white"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded text-xs bg-white"
                  />
                </div>
              ) : (
                <div className="space-y-2 text-xs sm:text-sm text-neutral-900 font-normal">
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#0066FF] shrink-0" />
                    <span>{firstName} {lastName}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                    <span>{companyName}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#0066FF] shrink-0" />
                    <span>{phone}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-b border-neutral-200 pt-3" />

            {/* 3. Project Details Section */}
            <div className="space-y-6 pt-1">
              
              <h2 className="text-xl font-bold text-neutral-950 tracking-tight">
                Project Details
              </h2>

              {/* Date Question & Toggle */}
              <div className="space-y-2">
                <label className="block text-xs text-neutral-800 font-medium">
                  Do you need these by a certain date?
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="relative w-full max-w-sm">
                    <input
                      type="text"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      className="w-full p-3 pr-10 border border-neutral-300 rounded-md text-xs sm:text-sm text-neutral-900 bg-white focus:outline-none focus:border-black"
                    />
                    <Calendar className="w-4 h-4 text-neutral-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 flex-1">
                    <div>
                      <div className="text-xs font-bold text-neutral-900">
                        This is a firm date
                      </div>
                      <div className="text-xs text-neutral-500 font-normal">
                        E.g. I need this for a conference or an event
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFirmDate(!isFirmDate)}
                      className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 cursor-pointer ${
                        isFirmDate ? 'bg-[#0066FF]' : 'bg-neutral-300'
                      }`}
                      aria-label="Toggle firm date"
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                          isFirmDate ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#0066FF] pt-1">
                  <div className="w-4 h-4 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    i
                  </div>
                  <span>
                    Our typical turnaround time is 3-4 weeks but orders can be expedited on request.
                  </span>
                </div>
              </div>

              {/* Comments Textarea */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs text-neutral-800 font-medium">
                  Any items we missed or comments you&apos;d like to add?
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={1000}
                    placeholder="Insert card copy, special requests, or anything we missed"
                    value={projectComments}
                    onChange={(e) => setProjectComments(e.target.value)}
                    className="w-full p-3.5 pb-7 border border-neutral-300 rounded-md text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black resize-y"
                  />
                  <div className="absolute right-3 bottom-2.5 text-[11px] text-neutral-400 font-mono">
                    {projectComments.length}/1000
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-xs text-neutral-800 font-medium">
                  Coupon code
                </label>
                <input
                  type="text"
                  placeholder="e.g. SAVE10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full max-w-md p-3 border border-neutral-300 rounded-md text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black"
                />
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 pt-0.5">
                  <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>Code will be applied after submission</span>
                </div>
              </div>

              {/* Upload Vector Banner Callout */}
              <div className="bg-[#F0F6FF] border border-[#D0E2FF] rounded-lg p-4 flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white border border-[#D0E2FF] flex items-center justify-center text-[#0066FF] shrink-0">
                    <PenTool className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-950">
                      Upload Vector file for the best quality and faster turnaround
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      The file should end in: .svg, .eps, .ai, .pdf
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-bold text-[#0066FF] hover:underline shrink-0"
                >
                  Learn more
                </button>
              </div>

              {/* File Dropzone / Upload Area */}
              <div className="border border-neutral-200 rounded-lg p-8 sm:p-10 flex flex-col items-center justify-center text-center bg-white">
                <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                  <div className="w-10 h-10 flex items-center justify-center text-[#0066FF] mb-1">
                    <Upload className="w-7 h-7 stroke-[2]" />
                  </div>
                  <div className="text-xs text-neutral-600 font-medium">
                    Drag &amp; Drop to Upload or{' '}
                    <span className="text-[#0066FF] underline font-semibold">
                      Choose files
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1">
                    Maximum file size: 20MB
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Maximum file quantity: 2
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".svg,.eps,.ai,.pdf,.png,.jpg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Uploaded Files Chips */}
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-neutral-100 w-full justify-center">
                    {uploadedFiles.map((file) => (
                      <span
                        key={file}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-800 font-medium"
                      >
                        <span>{file}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file)}
                          className="text-neutral-400 hover:text-black"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Mode Selection (Standard Free Mockup vs Priority Express Deposit) */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-semibold text-neutral-900 block">
                  Select Order Submission Flow:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setCheckoutMode('mockup')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      checkoutMode === 'mockup'
                        ? 'border-neutral-950 bg-neutral-50/80 shadow-2xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        checkoutMode === 'mockup' ? 'border-neutral-950 bg-neutral-950' : 'border-neutral-300'
                      }`}>
                        {checkoutMode === 'mockup' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs font-bold text-neutral-950">Free Digital Mockup</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 pl-5.5">
                      No card required. Review 3D proof in 24h.
                    </p>
                  </div>

                  <div
                    onClick={() => setCheckoutMode('deposit')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      checkoutMode === 'deposit'
                        ? 'border-neutral-950 bg-neutral-50/80 shadow-2xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        checkoutMode === 'deposit' ? 'border-neutral-950 bg-neutral-950' : 'border-neutral-300'
                      }`}>
                        {checkoutMode === 'deposit' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs font-bold text-neutral-950">Pay Deposit (Test Mode)</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 pl-5.5">
                      Paystack test card/transfer. Priority queue.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`font-semibold py-3 px-6 rounded-md text-xs tracking-wide flex items-center gap-2 transition-colors shadow-xs ${
                    checkoutMode === 'deposit'
                      ? 'bg-black hover:bg-neutral-800 text-white'
                      : 'bg-[#8A94A0] hover:bg-neutral-800 text-white'
                  }`}
                >
                  <span>{checkoutMode === 'deposit' ? 'Proceed to Test Payment' : 'Request Mockups'}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                    <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Project Summary & In Your Cart */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8 lg:pl-4">
            
            {/* Top Estimate Box */}
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm sm:text-base font-bold text-neutral-950">
                    Total Estimate
                  </div>
                  <div className="text-xs text-neutral-500 font-normal mt-0.5">
                    (Not including taxes and fees)
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                  {formatPrice(totalEstimate)}
                </div>
              </div>

              {/* Legal Terms Consent (Branda brand) */}
              <p className="text-[11px] text-neutral-600 font-normal leading-relaxed pt-1">
                By continuing, I agree to Branda&apos;s{' '}
                <Link href="/privacy" className="text-[#0066FF] hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms" className="text-[#0066FF] hover:underline">
                  Terms of Use
                </Link>
                .
              </p>

              {/* Request Mockups / Test Payment Full-Width Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className={`w-full font-semibold py-3.5 px-4 rounded-md text-xs tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs mt-3 ${
                  checkoutMode === 'deposit'
                    ? 'bg-black hover:bg-neutral-800 text-white'
                    : 'bg-[#8A94A0] hover:bg-neutral-800 text-white'
                }`}
              >
                <span>{checkoutMode === 'deposit' ? 'Proceed to Test Payment' : 'Request Mockups'}</span>
                <span className="w-3.5 h-3.5 rounded-full bg-white text-black flex items-center justify-center shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </button>

              {/* Explanatory Step Note */}
              <p className="text-xs text-neutral-500 font-normal leading-relaxed pt-1">
                {checkoutMode === 'deposit'
                  ? 'Simulate instant corporate deposit payment via Paystack test card or bank transfer.'
                  : 'This step sends your project to our design team for review and mockups.'}
              </p>
            </div>

            {/* Bottom Block: In Your Cart */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-neutral-950">
                  In Your Cart
                </h3>
                <Link
                  href="/cart"
                  className="text-xs text-[#0066FF] hover:underline font-semibold"
                >
                  Edit
                </Link>
              </div>

              {/* Total items line */}
              <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
                <span>{totalProductsCount} {totalProductsCount === 1 ? 'Product' : 'Products'}</span>
                <span className="font-bold text-neutral-950">{formatPrice(totalEstimate)}</span>
              </div>

              {/* Products Preview Cards List */}
              <div className="space-y-4 pt-2">
                <div className="text-xs text-neutral-500 font-medium">
                  {totalProductsCount} {totalProductsCount === 1 ? 'Product' : 'Products'}
                </div>

                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    
                    {/* Product Thumbnail: Real Image or Clean Container */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-neutral-100 border border-neutral-200/90 flex flex-col items-center justify-center shrink-0 p-1 text-center overflow-hidden">
                      {item.image && item.image !== '/product-placeholder.png' ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded bg-neutral-200 flex items-center justify-center text-[8px] font-mono text-neutral-400">
                          IMG
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <h4 className="text-xs font-bold text-neutral-950 truncate">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-neutral-500">
                        Color: {item.selectedColor || 'Black'}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} – {formatPrice(item.unitPrice)} / item
                      </div>
                      <div className="text-xs font-bold text-neutral-950 pt-0.5">
                        {formatPrice(item.totalPrice)}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Test Mode Payment Gateway Simulation Modal (Paystack / Flutterwave) */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        amountNGN={totalEstimate > 0 ? (currency === 'NGN' ? Math.round(totalEstimate * 0.5) : Math.round(totalEstimate * 1500 * 0.5)) : 404580}
        customerEmail={email}
        customerName={firstName ? `${firstName} ${lastName}` : 'Franklin anyanwu'}
        orderTitle="Branda Corporate Merchandise 50% Production Deposit"
      />
    </div>
  );
}
