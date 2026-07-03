import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="w-full py-20 px-4 md:px-8 border-b border-white/5 bg-slate-950/40 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(37,99,235,0.02),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            SUPPORT KNOWLEDGE
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to know about PixelBoost AI upscaling algorithms and credit parameters.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-900/40 border border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all duration-200 text-left"
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-slate-200 hover:text-white transition-colors cursor-pointer outline-none focus:bg-slate-900/80"
                >
                  <span className="text-sm font-semibold pr-4">{item.question}</span>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4.5 h-4.5 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4.5 h-4.5" />
                    )}
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/5 bg-slate-950/20">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-slate-900/60 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-xs font-semibold text-white">Still have custom engineering questions?</h4>
            <p className="text-[11px] text-slate-400 mt-1">Our support engineers can consult on pipeline clusters and deep models.</p>
          </div>
          <button 
            onClick={() => {
              const pricingEl = document.getElementById('pricing');
              pricingEl?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 bg-slate-950 border border-white/10 hover:border-white/20 text-xs font-semibold text-slate-200 rounded-xl cursor-pointer"
          >
            Contact Engineering Team
          </button>
        </div>

      </div>
    </div>
  );
}
