import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

export default function Header() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020617]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
            PixelBoost
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#FBBF24] font-mono text-[10px] font-semibold tracking-normal border border-[#14B8A6]/30 px-1 py-0.2 rounded-sm bg-[#14B8A6]/10">
              AI
            </span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#CBD5E1]">
          <button 
            onClick={() => scrollToSection('playground')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Playground
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('api-bench')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Developer API
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            FAQs
          </button>
        </nav>

        {/* Call to Action & User Status Pill */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shadow-[0_0_8px_#FBBF24]"></div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#FBBF24]">Pro Member</span>
          </div>

          <div className="w-8 h-8 rounded-full border border-white/10 bg-[#111827] flex items-center justify-center text-xs font-bold text-white shadow-sm select-none">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
