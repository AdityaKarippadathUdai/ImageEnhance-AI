import React from 'react';
import { Layers } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, viewName: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(viewName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#020617] border-t border-white/10 pt-16 pb-8 px-4 md:px-8 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Main layout links grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Col (4 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-4 font-sans">
            <div className="flex items-center gap-2 cursor-pointer select-none group" onClick={scrollTop}>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">PixelBoost <span className="font-mono text-[9px] text-[#14B8A6]">AI</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SaaS platform for deep learning-powered image upscaling, detail synthesis, and face geometry restoration. Trusted by digital artists and studio pipelines.
            </p>
          </div>

          {/* Links columns (8 Cols combined) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 font-sans">
            
            {/* Col 1 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Product</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#playground" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-white transition-colors">Core Playground</a></li>
                <li><a href="#features" onClick={(e) => handleLinkClick(e, 'features')} className="hover:text-white transition-colors">Model Specifications</a></li>
                <li><a href="#technology" onClick={(e) => handleLinkClick(e, 'technology')} className="hover:text-white transition-colors">Compare Features</a></li>
                <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-white transition-colors">Showcase</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Resources</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Restoration Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lossless Formats</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Platform Status</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Enterprise</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dedicated GPUs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Weights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SLA Contract</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Art Showcase</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div>
            &copy; 2026 PixelBoost AI Technologies, Inc. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
