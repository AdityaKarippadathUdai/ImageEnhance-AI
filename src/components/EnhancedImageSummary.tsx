import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle,
  Download, 
  Maximize2, 
  Sliders, 
  Database, 
  Layers, 
  Clock, 
  Cpu, 
  RefreshCw, 
  Eye, 
  Share2, 
  Sparkles 
} from 'lucide-react';

interface EnhancedImageSummaryProps {
  imageSrc: string | null;
  fileName: string | null;
  originalWidth: number;
  originalHeight: number;
  fileSize: number | null;
  fileFormat: string | null;
  scaleFactor: number;
  processingTime: number; // in seconds
  status: 'success' | 'failed';
  errorMessage?: string | null;
  onDownload: () => void;
  onCompare: () => void;
  onReset: () => void;
  onRetry: () => void;
}

export default function EnhancedImageSummary({
  imageSrc,
  fileName,
  originalWidth,
  originalHeight,
  fileSize,
  fileFormat,
  scaleFactor,
  processingTime,
  status,
  errorMessage,
  onDownload,
  onCompare,
  onReset,
  onRetry
}: EnhancedImageSummaryProps) {
  
  // Formatting helpers
  const formatFileSize = (bytes: number | null, multiplier: number = 1): string => {
    if (bytes === null) return '—';
    const finalBytes = bytes * multiplier;
    if (finalBytes > 1024 * 1024) {
      return `${(finalBytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(finalBytes / 1024).toFixed(1)} KB`;
  };

  // 2x upscaling increases size by approx ~3.2x; 4x by ~11.5x in standard compression
  const sizeMultiplier = scaleFactor === 2 ? 3.2 : 11.5;

  const outputWidth = originalWidth * scaleFactor;
  const outputHeight = originalHeight * scaleFactor;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Real-ESRGAN Enhanced Image',
        text: `Check out my enhanced image: ${fileName} upscaled to ${outputWidth}x${outputHeight}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Application link copied to clipboard!');
    }
  };

  if (status === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-red-500/5 dark:bg-red-950/10 border border-red-500/20 shadow-lg text-left relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-red-500 opacity-80" />
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-4 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
            <XCircle className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
              Enhancement Pipeline Failed
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 font-sans leading-relaxed">
              {errorMessage || 'An error occurred during convolutional model inference. GPU memory allocation failed or connection lost.'}
            </p>
          </div>
          <button
            onClick={onRetry}
            className="w-full md:w-auto px-6 py-3 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Enhancement
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-white/50 dark:bg-[#090d16]/50 border border-slate-200 dark:border-white/10 shadow-[0_12px_40px_0_rgba(31,38,135,0.06)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.3)] overflow-hidden"
    >
      {/* Decorative colored glow bar at the top */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 opacity-90" />
      
      {/* Dynamic atmospheric ambient bubbles */}
      <div className="absolute top-[-50px] left-[-50px] w-36 h-36 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-50px] w-36 h-36 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Thumb vs Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
        
        {/* Thumbnail Preview Area (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-slate-50 dark:bg-[#030712]/50 border border-slate-200 dark:border-white/5 rounded-2xl p-4 relative overflow-hidden group min-h-[220px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
          
          <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden bg-slate-100 dark:bg-[#020617]/80">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="Enhanced thumbnail preview"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[180px] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
              />
            ) : (
              <div className="w-full h-36 flex items-center justify-center text-slate-400 dark:text-slate-600">
                <Layers className="w-10 h-10 animate-pulse" />
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between z-20">
            <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-[#14B8A6] uppercase tracking-wider bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/15">
              Enhanced Asset
            </span>
            <span className="text-[10px] font-mono text-slate-500 font-medium">
              {outputWidth} × {outputHeight}
            </span>
          </div>
        </div>

        {/* Detailed Metadata Area (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col justify-between text-left">
          <div>
            {/* Success Header Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-5">
              <div>
                <h3 className="text-base font-extrabold font-sans tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                  <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  Super-Resolution Output Complete
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-sans">
                  The neural pipeline successfully reconstructed high-frequency micro-details.
                </p>
              </div>

              {/* Verified Badge */}
              <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono px-2.5 py-1 bg-gradient-to-r from-blue-500/10 to-teal-500/10 text-blue-600 dark:text-teal-400 rounded-full border border-teal-500/20 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
                Real-ESRGAN x4+
              </span>
            </div>

            {/* Metrics Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              
              {/* Output Resolution */}
              <div className="bg-slate-50 dark:bg-[#111827]/30 border border-slate-200/60 dark:border-white/5 rounded-xl p-3 hover:border-slate-300 dark:hover:border-white/10 transition-all">
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                  <Maximize2 className="w-3.5 h-3.5 text-blue-500" />
                  Output Resolution
                </div>
                <div className="text-xs font-bold font-mono text-slate-850 dark:text-slate-100 mt-1.5">
                  {outputWidth} × {outputHeight} px
                </div>
              </div>

              {/* Upscaling Factor */}
              <div className="bg-slate-50 dark:bg-[#111827]/30 border border-slate-200/60 dark:border-white/5 rounded-xl p-3 hover:border-slate-300 dark:hover:border-white/10 transition-all">
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                  <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                  Upscale Factor
                </div>
                <div className="text-xs font-bold font-mono text-slate-850 dark:text-slate-100 mt-1.5">
                  {scaleFactor}× Target
                </div>
              </div>

              {/* Output File Size */}
              <div className="bg-slate-50 dark:bg-[#111827]/30 border border-slate-200/60 dark:border-white/5 rounded-xl p-3 hover:border-slate-300 dark:hover:border-white/10 transition-all">
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                  <Database className="w-3.5 h-3.5 text-teal-500" />
                  Est. File Size
                </div>
                <div className="text-xs font-bold font-mono text-teal-600 dark:text-[#14B8A6] mt-1.5">
                  ~{formatFileSize(fileSize, sizeMultiplier)}
                </div>
              </div>

              {/* Output Format */}
              <div className="bg-slate-50 dark:bg-[#111827]/30 border border-slate-200/60 dark:border-white/5 rounded-xl p-3 hover:border-slate-300 dark:hover:border-white/10 transition-all">
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  Format
                </div>
                <div className="text-xs font-bold font-mono text-slate-850 dark:text-slate-100 mt-1.5">
                  {fileFormat || 'PNG'}
                </div>
              </div>

              {/* Processing Time */}
              <div className="bg-slate-50 dark:bg-[#111827]/30 border border-slate-200/60 dark:border-white/5 rounded-xl p-3 hover:border-slate-300 dark:hover:border-white/10 transition-all">
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-purple-500" />
                  Processing Time
                </div>
                <div className="text-xs font-bold font-mono text-slate-850 dark:text-slate-100 mt-1.5">
                  {processingTime.toFixed(1)}s
                </div>
              </div>

              {/* AI Model */}
              <div className="bg-slate-50 dark:bg-[#111827]/30 border border-slate-200/60 dark:border-white/5 rounded-xl p-3 hover:border-slate-300 dark:hover:border-white/10 transition-all">
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-pink-500" />
                  AI Engine
                </div>
                <div className="text-xs font-bold font-sans text-slate-850 dark:text-slate-100 mt-1.5">
                  ESRGAN x4+
                </div>
              </div>

            </div>
          </div>

          {/* Action Buttons suite */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full">
            {/* Download Enhanced Image (Primary Gradient CTA) */}
            <button
              onClick={onDownload}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:opacity-90 transition-all shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Enhanced Image
            </button>

            {/* Compare Before & After */}
            <button
              onClick={onCompare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-250 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-blue-500" />
              Compare Before & After
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-250 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-teal-500" />
              Share
            </button>

            {/* Enhance Another Image */}
            <button
              onClick={onReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-250 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-purple-500" />
              New Image
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
