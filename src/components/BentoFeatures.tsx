import React from 'react';
import { Eye, Zap, Cpu, Sparkles, FileText } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <div id="features" className="w-full py-20 px-4 md:px-8 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#020617] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(20,184,166,0.03),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Intro */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-600 dark:text-cyan-400 font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 animate-spin-slow" />
            SUPER RESOLUTION CORES
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Engineered for Precision Details
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl">
            PixelBoost goes beyond standard linear filters. Our specialized convolution models understand material geometries to synthesize pristine textures.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          
          {/* Card 1: 8x Zoom (Large - 2 cols wide) */}
          <div className="md:col-span-2 bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-slate-300 dark:hover:border-white/20 transition-all min-h-[300px] shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-[#2563EB] dark:text-blue-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Up to 4x Geometric Synthesis
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                Uncover lost pixels. Our proprietary deep network infers high-frequency features (like foliage, mountain ridges, and hair details) to expand low-resolution assets into high-resolution displays.
              </p>
            </div>

            {/* Simulated UI block */}
            <div className="mt-6 p-4 bg-slate-50 dark:bg-[#020617]/80 border border-slate-200 dark:border-white/10 rounded-xl font-mono text-[10px] text-slate-500 flex flex-wrap gap-4 items-center justify-between">
              <span className="text-slate-700 dark:text-slate-300">Scale Mode: <strong className="text-cyan-600 dark:text-cyan-400 font-bold">4.00x Ultra-Zoom</strong></span>
              <span className="text-slate-700 dark:text-slate-300">GPU Workers: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Active (Warm)</strong></span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[8px]">Ready</span>
              </div>
            </div>
          </div>

          {/* Card 2: FaceRestore Pro (Small - 1 col) */}
          <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-slate-300 dark:hover:border-white/20 transition-all min-h-[300px] shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-turquoise-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-turquoise-500/10 border border-turquoise-500/20 flex items-center justify-center mb-6 text-turquoise-600 dark:text-turquoise-400">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                FaceRestore Pro
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Repairs low-res features in portraits. Reconstructs realistic skin pores, removes film grain, and sharpens eyes while respecting original ethnic geometries.
              </p>
            </div>

            <div className="mt-6 flex gap-1 items-center text-[10px] text-turquoise-600 dark:text-turquoise-400 font-semibold font-mono uppercase tracking-wider">
              <span>Portrait Mode Activated</span>
              <span className="animate-pulse">●</span>
            </div>
          </div>

          {/* Card 3: TextRefine AI (Small - 1 col) */}
          <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-slate-300 dark:hover:border-white/20 transition-all min-h-[300px] shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 text-amber-600 dark:text-amber-400">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                OCR TextRefine
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cleans blurry signs, printouts, and digital text overlays. Sharpens character boundaries, preventing standard interpolation bleed on high-contrast outlines.
              </p>
            </div>

            <div className="mt-6 text-[10px] font-mono text-slate-500 border-t border-slate-200 dark:border-white/10 pt-3">
              Input: <span className="line-through text-rose-500 dark:text-rose-400">blur_neon.png</span> → Output: <span className="text-emerald-600 dark:text-emerald-400 font-bold">crisp_neon.png</span>
            </div>
          </div>

          {/* Card 4: High-Performance SDK (Large - 2 cols wide) */}
          <div className="md:col-span-2 bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between group hover:border-slate-300 dark:hover:border-white/20 transition-all min-h-[300px] shadow-sm hover:shadow-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-turquoise-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-600 dark:text-cyan-400">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Warm-Instance Queue Processing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                No cold-starts on our developer plans. We host ready-to-convolve neural network models in warm container blocks, guaranteeing average frame upscales of under 1.2 seconds.
              </p>
            </div>

            {/* Mini performance metrics */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-white/10 pt-4">
              <div>
                <div className="text-[10px] text-slate-500 font-mono uppercase">API LATENCY</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">950ms</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-mono uppercase">UPTIME SLA</div>
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">99.98%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-mono uppercase">BANDWIDTH</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">10 GB/s</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
