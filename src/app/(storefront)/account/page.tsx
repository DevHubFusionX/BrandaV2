'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Download, 
  FileText, 
  Sparkles,
  ArrowRight,
  FolderLock,
  RotateCw,
  Check,
  Lock
} from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { formatCurrency } from '@/lib/commerce/pricing';
import { PaymentModal, PaymentSuccessDetails } from '@/components/checkout/payment-modal';

export default function CustomerAccountDashboard() {
  const { currency } = useCart();
  const [activeTab, setActiveTab] = useState<'projects' | 'orders' | 'vault' | 'invoices'>('projects');
  const [mockupApproved, setMockupApproved] = useState(false);
  const [revisionRequested, setRevisionRequested] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [showRevisionModal, setShowRevisionModal] = useState(false);

  // Test Mode Payment State
  const [hasPaidDeposit, setHasPaidDeposit] = useState(false);
  const [paymentRef, setPaymentRef] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Active Project Data
  const activeProject = {
    id: 'BRD-803162',
    name: 'Q4 Enterprise Client Gifts & Tech Packs',
    createdAt: 'November 12th, 2026',
    targetDate: 'December 11th, 2026 (Firm Date)',
    status: mockupApproved ? 'Approved & Ready for Production' : 'Mockup In Design (Within 24h)',
    totalNGN: 809160,
    items: [
      {
        id: '1',
        name: 'Anker® 3-In-1 Power Bank',
        color: 'Black',
        quantity: 4,
        unitPriceNGN: 202290,
        decoration: 'Full Color High-Res UV Print',
      },
    ],
  };

  const handleApproveMockup = () => {
    setMockupApproved(true);
    setRevisionRequested(false);
  };

  const handleSendRevision = () => {
    if (revisionNotes.trim()) {
      setRevisionRequested(true);
      setShowRevisionModal(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* 1. Account Summary Banner */}
        <div className="border border-neutral-200/90 rounded-lg p-6 sm:p-8 bg-[#F8FAFC] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-full bg-neutral-950 text-white font-bold text-lg flex items-center justify-center shrink-0">
              FA
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                  Franklin chibuike anyanwu
                </h1>
                <span className="text-[11px] font-semibold bg-[#EEF4FF] text-[#0066FF] px-2.5 py-0.5 rounded-full border border-[#D0E2FF]">
                  Enterprise Account
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-neutral-600 pt-1">
                <span className="flex items-center gap-1.5 font-medium text-neutral-800">
                  <Building2 className="w-3.5 h-3.5 text-[#0066FF]" />
                  devhufusionx
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0066FF]" />
                  info@devhubfusionx.site
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0066FF]" />
                  +2348030531624
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-neutral-200 text-xs">
            <span className="text-neutral-500 font-medium">Assigned Brand Specialist</span>
            <span className="font-bold text-neutral-950">Chisom E. (Lagos Studio)</span>
            <span className="text-[#0066FF] text-[11px] font-semibold hover:underline cursor-pointer">
              Direct WhatsApp ➔
            </span>
          </div>
        </div>

        {/* 2. Navigation Tabs */}
        <div className="border-b border-neutral-200 mt-8 flex items-center gap-8 text-xs sm:text-sm font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 -mb-px transition-colors relative whitespace-nowrap ${
              activeTab === 'projects'
                ? 'text-[#0066FF] border-b-2 border-[#0066FF] font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Active Projects &amp; Mockups
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 -mb-px transition-colors relative whitespace-nowrap ${
              activeTab === 'orders'
                ? 'text-[#0066FF] border-b-2 border-[#0066FF] font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`pb-3 -mb-px transition-colors relative whitespace-nowrap ${
              activeTab === 'vault'
                ? 'text-[#0066FF] border-b-2 border-[#0066FF] font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Brand Vault™ (Logos &amp; Guidelines)
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`pb-3 -mb-px transition-colors relative whitespace-nowrap ${
              activeTab === 'invoices'
                ? 'text-[#0066FF] border-b-2 border-[#0066FF] font-bold'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Proforma Invoices &amp; WHT
          </button>
        </div>

        {/* 3. TAB 1: ACTIVE PROJECTS & MOCKUP REVIEW */}
        {activeTab === 'projects' && (
          <div className="mt-8 space-y-8">
            
            {/* Active Project Card */}
            <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-xs">
              
              {/* Card Header Bar */}
              <div className="bg-[#F8FAFC] p-5 sm:p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-900 bg-white border border-neutral-200 px-2 py-0.5 rounded">
                      {activeProject.id}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-neutral-950">
                      {activeProject.name}
                    </h2>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Requested on {activeProject.createdAt} • Target In-Hands: <strong className="text-neutral-800">{activeProject.targetDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    mockupApproved
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-[#EEF4FF] text-[#0066FF] border-[#D0E2FF]'
                  }`}>
                    {activeProject.status}
                  </span>
                </div>
              </div>

              {/* Live 4-Stage Visual Progress Stepper */}
              <div className="p-6 border-b border-neutral-100 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
                  
                  {/* Stage 1: Request Submitted */}
                  <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">1. Request Submitted</p>
                      <p className="text-[11px] text-neutral-500">Details logged</p>
                    </div>
                  </div>

                  {/* Stage 2: Mockup In Design */}
                  <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      mockupApproved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0066FF] text-white ring-4 ring-[#0066FF]/20 animate-pulse'
                    }`}>
                      {mockupApproved ? <Check className="w-4 h-4 stroke-[3]" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">2. Mockup In Design</p>
                      <p className="text-[11px] text-neutral-500">{mockupApproved ? 'Rendered' : 'Studio rendering'}</p>
                    </div>
                  </div>

                  {/* Stage 3: Client Approval */}
                  <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      mockupApproved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-100 text-neutral-400 border border-neutral-300'
                    }`}>
                      {mockupApproved ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">3. Client Approval</p>
                      <p className="text-[11px] text-neutral-500">{mockupApproved ? 'Approved by Client' : 'Pending review'}</p>
                    </div>
                  </div>

                  {/* Stage 4: In Production */}
                  <div className="flex items-center sm:flex-col sm:text-center gap-3 sm:gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      mockupApproved
                        ? 'bg-[#0066FF] text-white ring-4 ring-[#0066FF]/20'
                        : 'bg-neutral-100 text-neutral-400 border border-neutral-300'
                    }`}>
                      4
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">4. In Production</p>
                      <p className="text-[11px] text-neutral-500">Dec 11th dispatch</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Items & Mockup Action Area */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: Product List */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Project Items ({activeProject.items.length})
                  </h3>

                  {activeProject.items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start p-4 border border-neutral-200 rounded-lg bg-neutral-50/50">
                      {/* Empty Container Thumbnail per user directive */}
                      <div className="w-16 h-16 rounded-md bg-neutral-100 border border-neutral-200/90 flex flex-col items-center justify-center shrink-0 text-center">
                        <div className="w-5 h-5 rounded bg-neutral-200 flex items-center justify-center text-[8px] font-mono text-neutral-400 mb-0.5">
                          IMG
                        </div>
                        <span className="text-[8px] font-mono text-neutral-400">Black</span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-950 truncate">
                            {item.name}
                          </h4>
                          <span className="text-xs font-bold text-neutral-950">
                            {formatCurrency(item.unitPriceNGN * item.quantity, currency)}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600">
                          Color: {item.color} • Quantity: {item.quantity} units
                        </p>
                        <p className="text-[11px] text-[#0066FF] font-medium">
                          Decoration: {item.decoration}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => alert('Official Proforma Invoice generated with 7.5% VAT and WHT exemptions.')}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 hover:bg-neutral-50 px-3.5 py-2 rounded-md transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Download Proforma Invoice (PDF)</span>
                    </button>

                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] hover:underline px-2 py-2"
                    >
                      <span>Add More Items to this Pack</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right: 3D Proof & Mockup Approval Box */}
                <div className="lg:col-span-5 border border-neutral-200 rounded-lg p-5 bg-[#F8FAFC] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                      Digital 3D Proof #1
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      v1.2 (UV Vector Placement)
                    </span>
                  </div>

                  {/* Empty Container Proof Preview Area */}
                  <div className="aspect-[4/3] rounded-md bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 rounded-md bg-neutral-200/80 mb-2 flex flex-col items-center justify-center text-neutral-500 font-mono text-[9px]">
                      <span>3D PROOF</span>
                      <span className="text-[8px] text-neutral-400 mt-0.5">DEVHUBFUSIONX</span>
                    </div>
                    <p className="text-xs font-semibold text-neutral-700">
                      High-Resolution Visual Proof
                    </p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Exact scale mockup on Anker Power Bank casing
                    </p>
                  </div>

                  {/* Approval Actions */}
                  {mockupApproved ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-50 rounded-md border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Proof approved! Ready for factory production.</span>
                      </div>

                      {hasPaidDeposit ? (
                        <div className="p-3 bg-blue-50 rounded-md border border-blue-200 text-xs text-blue-900 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-[#0066FF]" />
                            <span>50% Deposit Paid (Ref: {paymentRef})</span>
                          </div>
                          <p className="text-[11px] text-blue-700">
                            FIRS VAT invoice issued. Factory printing scheduled for December 11th dispatch.
                          </p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsPaymentModalOpen(true)}
                          className="w-full bg-[#0066FF] hover:bg-[#2563EB] text-white font-bold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>Pay 50% Production Deposit ({formatCurrency(Math.round(activeProject.totalNGN * 0.5), currency)})</span>
                        </button>
                      )}
                    </div>
                  ) : revisionRequested ? (
                    <div className="p-3 bg-amber-50 rounded-md border border-amber-200 text-xs text-amber-800 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Design studio is revising your proof based on your feedback.</span>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1">
                      <button
                        type="button"
                        onClick={handleApproveMockup}
                        className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-2.5 px-4 rounded-md text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Approve Mockup &amp; Begin Production</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowRevisionModal(true)}
                        className="w-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-semibold py-2.5 px-4 rounded-md text-xs transition-colors"
                      >
                        Request Design Changes
                      </button>
                    </div>
                  )}

                  {/* Revision Modal Popup */}
                  {showRevisionModal && (
                    <div className="p-3.5 bg-white rounded-md border border-neutral-200 text-xs space-y-2.5 animate-in fade-in">
                      <label className="block font-semibold text-neutral-900">
                        What would you like our designers to change?
                      </label>
                      <textarea
                        rows={3}
                        value={revisionNotes}
                        onChange={(e) => setRevisionNotes(e.target.value)}
                        placeholder="e.g. Please make the company logo 15% larger and center it 20mm lower on the casing..."
                        className="w-full p-2 border border-neutral-300 rounded text-xs focus:outline-none focus:border-black"
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setShowRevisionModal(false)}
                          className="px-3 py-1.5 text-neutral-600 hover:text-black font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSendRevision}
                          className="px-3.5 py-1.5 bg-[#0066FF] hover:bg-blue-700 text-white rounded font-semibold"
                        >
                          Send Revision Notes
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* 4. TAB 2: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div className="mt-8 border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-2xs">
            <div className="bg-[#F8FAFC] px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Past Completed Orders
              </span>
            </div>

            <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-neutral-950">ORD-774912</span>
                    <span className="bg-neutral-100 text-neutral-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                      Delivered
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Delivered on October 18th, 2026 • Victoria Island, Lagos
                  </p>
                  <p className="text-xs font-semibold text-neutral-800">
                    50x Ahead Clubhouse Wool Caps + 50x Heavyweight Hoodies
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-neutral-950">
                    {formatCurrency(1850000, currency)}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 bg-neutral-950 text-white px-3.5 py-2 rounded-md text-xs font-semibold hover:bg-black transition-colors"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Re-order Batch</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. TAB 3: BRAND VAULT™ (ASSETS) */}
        {activeTab === 'vault' && (
          <div className="mt-8 border border-neutral-200 rounded-lg p-6 sm:p-8 bg-white space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
                  <FolderLock className="w-5 h-5 text-[#0066FF]" />
                  <span>Devhubfusionx Brand Vault™</span>
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Master vector graphics, brand colors, and guidelines stored securely for your merchandise projects.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2">
                <span className="text-xs font-bold text-neutral-900 block">Primary Logo (Vector AI)</span>
                <span className="text-[11px] text-neutral-500 block">devhubfusionx_primary_vector.ai</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                  Verified for Print
                </span>
              </div>

              <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2">
                <span className="text-xs font-bold text-neutral-900 block">Icon Mark (Vector SVG)</span>
                <span className="text-[11px] text-neutral-500 block">devhubfusionx_symbol.svg</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                  Verified for Embroidery
                </span>
              </div>

              <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50 space-y-2">
                <span className="text-xs font-bold text-neutral-900 block">Brand Palette Specs</span>
                <span className="text-[11px] text-neutral-500 block">Pantone Matching System (PMS)</span>
                <span className="text-[10px] font-semibold text-[#0066FF] bg-[#EEF4FF] px-2 py-0.5 rounded inline-block">
                  Hex #0066FF / PMS 286 C
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 6. TAB 4: PROFORMA INVOICES & WHT */}
        {activeTab === 'invoices' && (
          <div className="mt-8 border border-neutral-200 rounded-lg p-6 bg-white space-y-4">
            <h2 className="text-lg font-bold text-neutral-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-neutral-700" />
              <span>Official Proforma Invoices &amp; Tax Documents</span>
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-2xl">
              All documents are generated with Nigerian FIRS-compliant 7.5% Value Added Tax (VAT) and corporate Withholding Tax (WHT) deduction schedules.
            </p>

            <div className="divide-y divide-neutral-100 pt-2 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-neutral-900">PRO-803162-2026</span>
                  <span className="text-neutral-500 ml-2">Project: Q4 Enterprise Client Gifts (Devhubfusionx)</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Downloading FIRS-compliant PDF Proforma...')}
                  className="text-xs font-semibold text-[#0066FF] hover:underline"
                >
                  Download PDF ➔
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Production Deposit Test Mode Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={(details) => {
          setHasPaidDeposit(true);
          setPaymentRef(details.reference);
          setIsPaymentModalOpen(false);
        }}
        amountNGN={Math.round(activeProject.totalNGN * 0.5)}
        customerEmail="info@devhubfusionx.site"
        customerName="Franklin chibuike anyanwu"
        orderTitle={`Branda Deposit: ${activeProject.name}`}
      />
    </div>
  );
}
