import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface ImageSliderProps {
  originalSrc: string;
  upscaledSrc: string;
  title?: string;
  isCustomUpload?: boolean;
  upscaleFactor?: number;
  isProcessing?: boolean;
}

export default function ImageSlider({
  originalSrc,
  upscaledSrc,
  title = 'Sample Image',
  isCustomUpload = false,
  upscaleFactor = 4,
  isProcessing = false,
}: ImageSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isProcessing) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isProcessing) return;
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  // Center slider periodically for an ambient "wiggle" on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setSliderPosition(45);
      setTimeout(() => {
        setSliderPosition(55);
        setTimeout(() => {
          setSliderPosition(50);
        }, 400);
      }, 400);
    }, 1000);
    return () => clearTimeout(timer);
  }, [originalSrc]);

  return (
    <div className="relative flex flex-col w-full h-full">
      {/* Top Bar for Slider */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-slate-950/80 backdrop-blur-sm rounded-t-xl text-xs text-slate-400">
        <span className="font-medium truncate max-w-[200px]">{title}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Ready to compare
          </span>
          <span className="bg-slate-900 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
            {upscaleFactor}x Scale Mode
          </span>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        id="comparison-stage"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => !isProcessing && setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className={`relative w-full aspect-video md:aspect-[4/3] lg:aspect-video bg-slate-950 overflow-hidden cursor-ew-resize select-none border-x border-b border-white/5 rounded-b-xl ${
          isProcessing ? 'pointer-events-none' : ''
        }`}
      >
        {/* Loading Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md">
            <div className="relative w-20 h-20 mb-4">
              {/* Outer spinning ring */}
              <div className="absolute inset-0 border-4 border-slate-900 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-blue-500 border-r-turquoise-400 rounded-full animate-spin"></div>
              {/* Inner pulsed spark */}
              <div className="absolute inset-4 bg-slate-900 border border-white/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <p className="text-slate-200 font-medium tracking-tight animate-pulse text-sm">
              PixelBoost Core Engine Upscaling...
            </p>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Running deep neural-net convolution
            </p>
          </div>
        )}

        {/* Right Pane (Upscaled - Crisp, Beautiful) */}
        <div className="absolute inset-0 w-full h-full bg-slate-900">
          <img
            src={upscaledSrc}
            alt="Upscaled View"
            className="w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Label Right */}
          <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider text-slate-200 shadow-lg select-none">
            BOOSTED AFTER
          </div>
        </div>

        {/* Left Pane (Original - Blurry, low quality) */}
        <div
          className="absolute inset-0 h-full overflow-hidden border-r-2 border-sky-400/80 z-10"
          style={{ width: `${sliderPosition}%` }}
        >
          {/* Since we need to match the parent container's aspect cover, we set a fixed width on the image equal to the parent container's physical width */}
          <div className="absolute inset-0 w-full h-full min-w-[300px]" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
            <img
              src={originalSrc}
              alt="Original Low-Res View"
              className="w-full h-full object-cover pointer-events-none filter blur-sm brightness-90 saturate-[85%]"
              referrerPolicy="no-referrer"
              style={{
                imageRendering: 'pixelated',
              }}
            />
          </div>
          {/* Label Left */}
          <div className="absolute top-4 left-4 z-20 bg-slate-950/90 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium tracking-wider text-slate-400 shadow-lg select-none">
            ORIGINAL BEFORE
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Vertical Glowing Line */}
          <div className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-blue-500 via-turquoise-400 to-emerald-500 shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>

          {/* Central Handle Sphere */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_12px_rgba(20,184,166,0.5)] cursor-ew-resize">
            <div className="flex items-center gap-0.5 text-slate-200">
              <ChevronLeft className="w-3.5 h-3.5" />
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
            {/* Visual glow ring */}
            <div className="absolute -inset-1 border border-cyan-500/30 rounded-full animate-ping-slow pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Helper hint below slider */}
      <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 px-1 font-mono">
        <span className="flex items-center gap-1">
          <ChevronLeft className="w-3 h-3" /> Drag the handle left or right to inspect pixels <ChevronRight className="w-3 h-3" />
        </span>
        <span className="hidden md:inline">
          Original: Blurry & Compressed | PixelBoost: AI-Sharpened 4K
        </span>
      </div>
    </div>
  );
}
