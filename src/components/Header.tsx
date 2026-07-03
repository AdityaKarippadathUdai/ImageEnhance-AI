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
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-turquoise-500 to-amber-400 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white font-sans flex items-center gap-1">
            PixelBoost
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-400 to-amber-300 font-mono text-[10px] font-semibold tracking-normal border border-turquoise-500/30 px-1 py-0.2 rounded-sm bg-turquoise-950/20">
              AI
            </span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
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

        {/* Call to Action button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => scrollToSection('playground')}
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide text-white bg-slate-900 border border-white/10 hover:border-white/20 hover:bg-slate-800 transition-all cursor-pointer hidden sm:block"
          >
            Launch Playground
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-turquoise-400 to-blue-400 hover:from-turquoise-300 hover:to-blue-300 transition-all cursor-pointer shadow-lg shadow-turquoise-500/10 font-bold"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
