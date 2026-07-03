import React, { useState } from 'react';
import { Check, Sparkles, X, CreditCard, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../data';
import { PricingPlan } from '../types';

export default function PricingTable() {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  
  // Checkout modal states
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Prefilled mock payment credentials
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState<string>('12/28');
  const [cvc, setCvc] = useState<string>('415');

  const handleOpenCheckout = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsCheckingOut(true);
    setPaymentSuccess(false);
    setIsProcessingPayment(false);
  };

  const handleCloseCheckout = () => {
    setIsCheckingOut(false);
    setSelectedPlan(null);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    
    // Simulate payment transaction step
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div id="pricing" className="w-full py-20 px-4 md:px-8 border-b border-white/10 bg-[#020617] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.04),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            MEMBERSHIP PLANS
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-4">
            Predictable Pricing, Max Output
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mb-8 font-sans">
            Choose a plan that fits your creative volume. Unlock 8x resolution multipliers, priority warm-GPU nodes, and full API integration.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3 bg-[#111827]/40 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer font-sans ${
                !isAnnual ? 'bg-[#111827] text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 font-sans ${
                isAnnual ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white shadow-lg shadow-blue-500/15' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Yearly Billing
              <span className="bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.priceYearly : plan.priceMonthly;
            const originalPrice = plan.priceMonthly;

            return (
              <div
                key={plan.name}
                className={`bg-[#111827]/40 backdrop-blur-md border rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] ${
                  plan.isPopular
                    ? 'border-[#14B8A6]/40 shadow-[0_0_30px_rgba(20,184,166,0.08)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular Pill Accent */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-lg font-sans">
                    Most Popular
                  </div>
                )}

                {/* Upper block */}
                <div className="text-left">
                  <h3 className="text-base font-bold text-white mb-2 font-sans">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-normal mb-6 min-h-[36px] font-sans">{plan.description}</p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-2 mb-6 border-b border-white/10 pb-6">
                    <span className="text-4xl font-sans font-extrabold text-white">
                      ${price}
                    </span>
                    <div className="flex flex-col text-left font-sans">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        USD / MONTH
                      </span>
                      {isAnnual && price > 0 && (
                        <span className="text-[10px] text-amber-400 font-medium">
                          Billed annually (${price * 12}/yr)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feature benefits list */}
                  <ul className="flex flex-col gap-3.5 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                        <Check className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <button
                  id={`pricing-cta-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleOpenCheckout(plan)}
                  className={`w-full py-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 font-sans ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-[#2563EB] via-[#14B8A6] to-teal-600 hover:from-[#2563EB]/90 hover:to-teal-500/90 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-[#020617] border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-[#111827]'
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic checkout sandbox modal */}
        {isCheckingOut && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-md">
            <div className="bg-[#111827]/90 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative backdrop-blur-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#020617]/40">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4.5 h-4.5 text-[#14B8A6]" />
                  <span className="text-xs font-bold text-white tracking-wide uppercase">Secure Sandbox Checkout</span>
                </div>
                <button
                  onClick={handleCloseCheckout}
                  className="text-slate-400 hover:text-slate-200 p-1 rounded-lg border border-white/10 hover:border-white/20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Success Screen */}
              {paymentSuccess ? (
                <div className="p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Upgrade Complete!</h3>
                  <p className="text-xs text-slate-400 max-w-xs leading-normal mb-6">
                    Your account has been upgraded to <strong className="text-slate-200">{selectedPlan.name}</strong>. Enjoy full 8x upscales, warm-GPU workers, and higher rate capacities.
                  </p>
                  <button
                    onClick={handleCloseCheckout}
                    className="w-full py-2.5 bg-[#020617] border border-white/10 text-slate-200 hover:text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Back to Application
                  </button>
                </div>
              ) : (
                /* Payment form */
                <form onSubmit={handleProcessPayment} className="p-6 text-left">
                  
                  {/* Order Summary box */}
                  <div className="bg-[#020617]/80 border border-white/10 rounded-xl p-4 mb-5">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-400">Selected Product:</span>
                      <span className="font-bold text-white">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Billing Interval:</span>
                      <span className="font-mono text-[#14B8A6] font-semibold">
                        {isAnnual ? 'Annually (Save 20%)' : 'Monthly'}
                      </span>
                    </div>
                    <div className="border-t border-white/10 my-3 pt-3 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-200">Amount Due Today:</span>
                      <span className="text-xl font-extrabold text-white">
                        ${isAnnual ? selectedPlan.priceYearly * 12 : selectedPlan.priceMonthly}
                      </span>
                    </div>
                  </div>

                  {/* Sandbox Notification */}
                  <div className="bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-[10px] p-3 rounded-lg mb-4 leading-normal flex items-start gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 shrink-0 text-[#14B8A6] mt-0.5" />
                    <span>This is a test-bench deployment sandbox. Use the pre-filled mock credentials below to safely authorize.</span>
                  </div>

                  {/* Card number input */}
                  <div className="mb-4">
                    <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-[#14B8A6]/50 transition-colors font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
                    </div>
                  </div>

                  {/* Expiry / CVC row */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block mb-1.5">
                        Expires
                      </label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-[#14B8A6]/50 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block mb-1.5">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full bg-[#020617] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-[#14B8A6]/50 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2">
                    <button
                      id="authorize-payment-btn"
                      type="submit"
                      disabled={isProcessingPayment}
                      className="w-full py-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:from-[#2563EB]/90 hover:to-[#14B8A6]/90 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      {isProcessingPayment ? 'Authorizing with gateway...' : 'Authorize $0.00 Test Payment'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseCheckout}
                      className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-slate-300 transition-colors cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
