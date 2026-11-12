'use client';

import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  Check,
  AlertCircle
} from 'lucide-react';
import { formatCurrency } from '@/lib/commerce/pricing';

export interface PaymentSuccessDetails {
  reference: string;
  amountPaid: number;
  method: 'card' | 'bank_transfer';
  timestamp: string;
  customerEmail: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (details: PaymentSuccessDetails) => void;
  amountNGN: number;
  customerEmail: string;
  customerName?: string;
  orderTitle?: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  amountNGN,
  customerEmail,
  customerName = 'Valued Client',
  orderTitle = 'Branda Corporate Order Deposit',
}: PaymentModalProps) {
  const [paymentTab, setPaymentTab] = useState<'card' | 'transfer'>('card');
  const [step, setStep] = useState<'details' | 'otp' | 'processing' | 'success'>('details');

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardPin, setCardPin] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFillTestCard = () => {
    setCardNumber('4084 0840 8408 4084');
    setCardExpiry('12/30');
    setCardCvv('408');
    setCardPin('3310');
    setErrorMessage('');
  };

  const handleInitiateCardPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) {
      setErrorMessage('Please fill in test card details or click "Use Test Card"');
      return;
    }
    setStep('otp');
    setErrorMessage('');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    setTimeout(() => {
      const reference = `BRD-PAY-${Date.now().toString().slice(-8)}`;
      setStep('success');
      setTimeout(() => {
        onSuccess({
          reference,
          amountPaid: amountNGN,
          method: 'card',
          timestamp: new Date().toISOString(),
          customerEmail,
        });
      }, 1500);
    }, 1800);
  };

  const handleSimulateTransferSuccess = () => {
    setStep('processing');
    setTimeout(() => {
      const reference = `BRD-TX-${Date.now().toString().slice(-8)}`;
      setStep('success');
      setTimeout(() => {
        onSuccess({
          reference,
          amountPaid: amountNGN,
          method: 'bank_transfer',
          timestamp: new Date().toISOString(),
          customerEmail,
        });
      }, 1500);
    }, 2000);
  };

  const handleCopyAccount = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('0123456789');
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Test Mode Banner */}
        <div className="bg-[#2563EB] text-white px-4 py-1.5 text-[11px] font-bold tracking-wider flex items-center justify-between uppercase">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Paystack / Flutterwave Test Mode
          </span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
            Zero Real Charges
          </span>
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200 bg-neutral-50/70">
          <div>
            <div className="text-xs text-neutral-500 font-medium">{customerEmail}</div>
            <div className="text-xl font-extrabold text-neutral-950 tracking-tight">
              {formatCurrency(amountNGN, 'NGN')}
            </div>
            <div className="text-[11px] text-neutral-500 truncate max-w-[280px]">
              {orderTitle}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step: Details View */}
        {step === 'details' && (
          <div className="p-6 space-y-5">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-lg text-xs font-bold">
              <button
                type="button"
                onClick={() => setPaymentTab('card')}
                className={`py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                  paymentTab === 'card'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card (Test)</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentTab('transfer')}
                className={`py-2 rounded-md flex items-center justify-center gap-1.5 transition-all ${
                  paymentTab === 'transfer'
                    ? 'bg-white text-black shadow-xs'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {paymentTab === 'card' ? (
              <form onSubmit={handleInitiateCardPay} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-700">Enter card details</span>
                  <button
                    type="button"
                    onClick={handleFillTestCard}
                    className="text-[11px] font-bold text-[#0066FF] hover:underline"
                  >
                    Auto-Fill Test Card
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4084 0840 8408 4084"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-md focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="12/30"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-md focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="408"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono border border-neutral-300 rounded-md focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-neutral-950 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Pay {formatCurrency(amountNGN, 'NGN')}</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3">
                  <div className="text-xs text-neutral-500 font-medium">
                    Simulated Nigerian Virtual Bank Account
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-neutral-400">Bank Name</div>
                      <div className="text-xs font-bold text-neutral-900">Wema Bank (Branda Virtual)</div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] text-neutral-400">Account Number</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-base font-mono font-bold tracking-wider text-neutral-950">
                        0123456789
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="text-xs text-neutral-500 hover:text-black p-1"
                        title="Copy account number"
                      >
                        {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-neutral-400">Account Name</div>
                    <div className="text-xs font-bold text-neutral-900">Branda Digital / {customerName}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateTransferSuccess}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>I have simulated transfer ({formatCurrency(amountNGN, 'NGN')})</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Encrypted • FIRS VAT Inclusive</span>
            </div>
          </div>
        )}

        {/* Step: 3D Secure OTP Simulation */}
        {step === 'otp' && (
          <div className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0066FF] flex items-center justify-center mx-auto mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-neutral-950">
                3D Secure Verification
              </h3>
              <p className="text-xs text-neutral-500">
                A test one-time code was dispatched to your registered phone. Enter <strong className="text-neutral-900">123456</strong> below.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOtpCode('123456')}
                  className="w-1/2 py-2.5 border border-neutral-200 text-neutral-700 text-xs font-bold rounded-lg hover:bg-neutral-50 cursor-pointer"
                >
                  Fill 123456
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  Verify &amp; Authorize
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step: Processing State */}
        {step === 'processing' && (
          <div className="p-10 text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#0066FF] mx-auto" />
            <h3 className="text-sm font-bold text-neutral-950">
              Verifying with Central Bank Switch...
            </h3>
            <p className="text-xs text-neutral-500">
              Please do not refresh. Generating FIRS VAT transaction receipt.
            </p>
          </div>
        )}

        {/* Step: Success State */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-in zoom-in-75 duration-200" />
            <h3 className="text-base font-extrabold text-neutral-950">
              Payment Successful!
            </h3>
            <p className="text-xs text-neutral-600">
              Order confirmed and production queue updated. Directing you now...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

