import React from 'react';
import { Layers, Github, FileText, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, viewName: string, targetSectionId?: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(viewName);
      if (targetSectionId) {
        setTimeout(() => {
          const el = document.getElementById(targetSectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-white/10 pt-16 pb-12 px-4 md:px-8 text-left relative overflow-hidden">
      {/* Subtle ambient light glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main layout links grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4 font-sans">
            <div className="flex items-center gap-2.5 cursor-pointer select-none group" onClick={scrollTop}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center shadow-md shadow-blue-500/10">
                <Layers className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                ImageEnhancer
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6] font-mono text-[10px] font-bold tracking-normal border border-blue-500/35 px-1.5 py-0.5 rounded-md bg-blue-500/5">
                  AI
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              AI-powered image super-resolution using ESRGAN. Instantly upscale resolution, synthesize lost textures, and clean up compression noise.
            </p>
          </div>

          {/* Links columns */}
          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:gap-12 font-sans justify-end md:justify-items-end">
            
            {/* Quick Links */}
            <div className="md:justify-self-start lg:justify-self-center">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" onClick={(e) => handleLinkClick(e, 'features')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#technology" onClick={(e) => handleLinkClick(e, 'technology')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Models
                  </a>
                </li>
                <li>
                  <a href="#playground" onClick={(e) => handleLinkClick(e, 'home', 'playground')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="mailto:support@imageenhancer.ai" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="md:justify-self-start lg:justify-self-center">
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Resources</h4>
              <ul className="flex flex-col gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom bar with Copyright and Back To Top */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div className="text-center sm:text-left leading-relaxed">
            &copy; 2026 ImageEnhancer AI. Built with ESRGAN, PyTorch, FastAPI, and React.
          </div>
          
          <button 
            onClick={scrollTop} 
            className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1 font-mono text-[10px] font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-500 dark:text-slate-400"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3 text-[#14B8A6]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
