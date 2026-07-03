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
        </nav>

        {/* Call to Action button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => scrollToSection('playground')}
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide text-white bg-[#111827] border border-white/10 hover:border-white/20 hover:bg-[#1f2937] transition-all cursor-pointer"
          >
            Launch Playground
          </button>
        </div>
      </div>
    </header>
  );
}
