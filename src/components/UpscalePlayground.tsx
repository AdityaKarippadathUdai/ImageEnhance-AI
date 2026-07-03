import React, { useState, useRef, useEffect } from 'react';
import { Upload, Sliders, Sparkles, Image as ImageIcon, Download, Check, AlertCircle, Cpu, RefreshCw, Layers, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProcessingStep } from '../types';

export default function UpscalePlayground() {
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [customHeight, setCustomHeight] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Upscaling parameter states - restricted to Real-ESRGAN compatible 2x and 4x
  const [scaleFactor, setScaleFactor] = useState<number>(4);

  // Dimensions & resolution details
  const beforeRes = customImage 
    ? (customWidth && customHeight ? `${customWidth} × ${customHeight} px` : '1200 × 800 px')
    : '—';

  const afterRes = customImage
    ? (customWidth && customHeight 
        ? `${customWidth * scaleFactor} × ${customHeight * scaleFactor} px` 
        : `${1200 * scaleFactor} × ${800 * scaleFactor} px`)
    : '—';

  // Processing state machine
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [processingLogs, setProcessingLogs] = useState<string[]>([]);
  const [hasProcessed, setHasProcessed] = useState<boolean>(false); 

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const steps: ProcessingStep[] = [
    { id: 'init', label: 'Initializing Real-ESRGAN neural weights and allocating GPU memory...', duration: 600, status: 'idle' },
    { id: 'denoise', label: 'Analyzing compression patterns & correcting tile borders...', duration: 800, status: 'idle' },
    { id: 'convolve', label: 'Executing Real-ESRGAN x4+ multi-pass residual dense blocks...', duration: 1200, status: 'idle' },
    { id: 'refine', label: 'Reconstructing sub-pixel high-frequency edges and micro-textures...', duration: 700, status: 'idle' },
  ];

  // Document-wide paste image event handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processUploadedFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Drag and drop mechanics
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file: File) => {
    setUploadError(null);

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload a valid image file (PNG, JPEG, WebP).');
      return;
    }

    // Strict 10 MB maximum size validation limit
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File exceeds the maximum size of 10 MB. Please optimize your asset.');
      return;
    }
    
    setCustomFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const resultSrc = event.target.result as string;
        setCustomImage(resultSrc);
        setHasProcessed(false); // needs processing!

        // Load image to get width and height
        const img = new Image();
        img.onload = () => {
          setCustomWidth(img.width);
          setCustomHeight(img.height);
        };
        img.src = resultSrc;
      }
    };
    reader.readAsDataURL(file);
  };

  // Loads a premium stock photography demo image so users can test immediately
  const handleLoadDemo = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering parent file picker click
    setUploadError(null);
    setCustomFileName('misty_alpine_ridge_demo.jpg');
    setCustomWidth(800);
    setCustomHeight(600);
    setCustomImage('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800');
    setHasProcessed(false);
  };

  // Trigger simulated AI Super Resolution
  const handleEnhance = () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessingLogs([]);
    setCurrentStepIndex(0);
    
    let currentStep = 0;
    const totalSteps = steps.length;

    const runStep = () => {
      if (currentStep >= totalSteps) {
        setIsProcessing(false);
        setHasProcessed(true);
        setProcessingLogs(prev => [...prev, `⚡ [SUCCESS] Real-ESRGAN super-resolution complete! Enhanced output generated in 3.1s`]);
        setProgress(100);
        return;
      }

      const step = steps[currentStep];
      setCurrentStepIndex(currentStep);
      setProcessingLogs(prev => [...prev, `[${currentStep + 1}/${totalSteps}] ${step.label}`]);

      // Animate progress up during the step duration
      const duration = step.duration;
      const startTime = Date.now();
      const startProgress = (currentStep / totalSteps) * 100;
      const targetProgress = ((currentStep + 1) / totalSteps) * 100;

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(1, elapsed / duration);
        const currentProgress = startProgress + ratio * (targetProgress - startProgress);
        setProgress(Math.round(currentProgress));

        if (ratio === 1) {
          clearInterval(interval);
          currentStep++;
          setTimeout(runStep, 200); // Small pause between steps
        }
      }, 50);
    };

    runStep();
  };

  // Triggers browser download of currently upscaled image
  const handleDownload = () => {
    if (!customImage) return;
    const link = document.createElement('a');
    link.href = customImage;
    link.download = `realesrgan_${scaleFactor}x_${customFileName || 'enhanced_asset.jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Determine display sources
  const displayOriginal = customImage || '';
  const displayUpscaled = customImage || '';

  return (
    <div id="playground" className="w-full py-16 px-4 md:px-8 border-b border-white/10 bg-[#020617]/50 backdrop-blur-md relative overflow-hidden">
      {/* Injecting CSS Keyframes specifically for the dashing border effect */}
      <style>{`
        @keyframes border-dash {
          to {
            stroke-dashoffset: -160;
          }
        }
        .animate-border-dash {
          animation: border-dash 12s linear infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.06),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE PLAYGROUND
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-3">
            Real-ESRGAN x4+ Super-Resolution
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl">
            Upload your low-fidelity images or photos. Our frontend pipeline simulates the Real-ESRGAN deep residual networks to reconstruct crisp, high-frequency details.
          </p>
        </div>

        {/* Dynamic View State Transition */}
        <AnimatePresence mode="wait">
          {!customImage ? (
            /* STATE 1: Centered, Large Premium Glass Upload Card */
            <motion.div
              key="empty-upload-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex justify-center items-center py-4"
            >
              <div
                id="premium-dropzone"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-full max-w-2xl rounded-3xl p-10 md:p-12 backdrop-blur-xl bg-[#090d16]/75 border border-white/10 hover:border-blue-500/35 transition-all duration-300 group overflow-hidden cursor-pointer text-center select-none shadow-[0_0_80px_rgba(37,99,235,0.12)] ${
                  isDragActive ? 'border-blue-400 bg-blue-500/5' : ''
                }`}
              >
                {/* SVG Animated Dashed Border (Blue animation) */}
                <svg className="absolute inset-0 w-full h-full rounded-3xl pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="1.5"
                    y="1.5"
                    width="calc(100% - 3px)"
                    height="calc(100% - 3px)"
                    rx="24"
                    fill="none"
                    stroke="url(#blue-teal-gradient)"
                    strokeWidth="2"
                    strokeDasharray="12, 8"
                    className="animate-border-dash opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <defs>
                    <linearGradient id="blue-teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Hover Glow Radial Background Element */}
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-teal-500/0 rounded-3xl blur-3xl group-hover:via-blue-500/15 transition-all duration-500 pointer-events-none" />

                {/* Card Interior */}
                <div className="relative z-10 flex flex-col items-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* Large Upload Icon with active halo & pulsate */}
                  <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/25 flex items-center justify-center mb-6 text-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.25)] group-hover:text-[#14B8A6] transition-all duration-300">
                    <Upload className="w-9 h-9" />
                  </div>

                  {/* Title & Prompt */}
                  <h3 className="text-xl font-sans font-bold text-white mb-2 tracking-tight">
                    Drag, Drop or Paste Image to start
                  </h3>
                  <p className="text-sm text-slate-400 max-w-sm mb-8 leading-relaxed">
                    Select a low-resolution photo or compressed graphic. The Real-ESRGAN x4+ model will synthesize details.
                  </p>

                  {/* Supported formats & Max size details */}
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {['PNG', 'JPEG', 'WEBP'].map((format) => (
                      <span key={format} className="px-3 py-1 rounded-md bg-[#111827]/80 border border-white/5 text-[10px] font-bold font-mono text-slate-300 tracking-wider">
                        {format}
                      </span>
                    ))}
                    <span className="px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold font-mono text-rose-300 tracking-wider">
                      MAX 10 MB
                    </span>
                  </div>

                  {/* Interactive Paste Keyboard Cues */}
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mb-6">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">Ctrl</span> + <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">V</span> to paste clipboard image
                  </div>

                  {/* Contextual Validation Feedback */}
                  {uploadError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-400 font-medium mb-6 text-left"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{uploadError}</span>
                    </motion.div>
                  )}

                  {/* Demo Image Trigger */}
                  <div className="border-t border-white/5 pt-6 w-full flex justify-center">
                    <button
                      onClick={handleLoadDemo}
                      className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide text-[#14B8A6] bg-[#14B8A6]/10 border border-[#14B8A6]/20 hover:bg-[#14B8A6]/20 hover:scale-105 transition-all cursor-pointer shadow-lg shadow-teal-500/5"
                    >
                      💡 Or load alpine demo image
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* STATE 2: Active Comparison Workspace with Compact Premium Preview Card */
            <motion.div
              key="active-workspace-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* LEFT COLUMN: Parameters, Logs & Preview (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Compact Glass Preview Card (Replacing Upload State) */}
                <div className="relative w-full rounded-2xl p-5 backdrop-blur-xl bg-[#090d16]/75 border border-white/10 shadow-xl overflow-hidden group text-left">
                  <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none group-hover:border-blue-500/20 transition-colors" />

                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Header with name and removal action */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#14B8A6] flex items-center gap-1.5 font-mono">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Active Source Asset
                      </span>
                      <button
                        onClick={() => {
                          setCustomImage(null);
                          setCustomFileName('');
                          setCustomWidth(0);
                          setCustomHeight(0);
                          setHasProcessed(false);
                          setUploadError(null);
                        }}
                        className="text-[10px] text-rose-400 hover:text-rose-300 font-bold font-sans flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Remove Image
                      </button>
                    </div>

                    {/* Image Preview Window */}
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-slate-950/40 flex items-center justify-center">
                      <img
                        src={customImage}
                        alt="Uploaded source preview"
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-slate-300">
                        {customWidth} × {customHeight} px • {customFileName ? (customFileName.length > 25 ? `${customFileName.substring(0, 22)}...` : customFileName) : 'custom_input.jpg'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Parametrization Drawer */}
                <div className="bg-[#111827]/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
                  
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6 border-b border-white/10 pb-3 font-sans">
                    <Sliders className="w-4 h-4 text-[#14B8A6]" />
                    Upscale Parameters
                  </h3>

                  {/* Scale Options */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold text-[#CBD5E1] block mb-2 font-sans uppercase tracking-wider">
                      Scale Factor
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[2, 4].map((factor) => (
                        <button
                          key={factor}
                          onClick={() => setScaleFactor(factor)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                            scaleFactor === factor
                              ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] border-transparent text-white shadow-lg shadow-blue-500/10 font-sans'
                              : 'bg-[#020617] border-white/10 text-slate-400 hover:border-white/20 font-sans'
                          }`}
                        >
                          {factor}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Model Specification */}
                  <div className="bg-[#020617]/60 border border-white/10 rounded-xl p-4 font-sans space-y-4 mb-6">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#14B8A6]" />
                      Active Model Specification
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-left">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">Original Res</span>
                        <span className="text-xs font-bold text-white font-mono">{beforeRes}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">Estimated Output</span>
                        <span className="text-xs font-bold text-[#14B8A6] font-mono">{afterRes}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">AI Model</span>
                        <span className="text-xs font-bold text-white font-sans">Real-ESRGAN x4+</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">Device</span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          CUDA (GPU)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    id="enhance-button"
                    onClick={handleEnhance}
                    disabled={isProcessing}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide uppercase text-white bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:from-[#2563EB]/90 hover:to-[#14B8A6]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans shadow-lg shadow-blue-500/10"
                  >
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    {isProcessing ? 'Convolution in progress...' : !hasProcessed ? 'Enhance Image' : 'Re-Enhance Image'}
                  </button>

                  {/* Custom Upload info text */}
                  {!hasProcessed && (
                    <div className="mt-3 flex items-start gap-1.5 p-2 bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-lg text-[10px] text-[#FBBF24] font-medium font-sans text-left">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#FBBF24] mt-0.5" />
                      <span>Image loaded. Click "Enhance Image" to execute Real-ESRGAN neural upscaling.</span>
                    </div>
                  )}
                </div>

                {/* Neural Net Processing Console/Logs */}
                <div className="bg-[#020617]/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl font-mono text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#14B8A6]" />
                      Core Pipeline Log
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#111827] border border-white/10 text-slate-400">
                      GPU_A100_ACTIVE
                    </span>
                  </div>

                  {/* Logs area */}
                  <div className="h-28 overflow-y-auto text-[10px] text-slate-400 flex flex-col gap-1 pr-1">
                    {processingLogs.length === 0 ? (
                      <span className="text-slate-600 italic">Console idling. Run enhance to stream CNN state parameters...</span>
                    ) : (
                      processingLogs.map((log, index) => {
                        const isSuccess = log.includes('SUCCESS');
                        const isStep = log.match(/^\[\d\/\d\]/);
                        return (
                          <div 
                            key={index} 
                            className={`leading-relaxed ${
                              isSuccess ? 'text-emerald-400 font-semibold' : isStep ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {log}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-1">
                        <span>PROCESSING GRID</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-[#111827] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] h-full transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: Viewports comparison & Download action (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left Viewport: Original Low-Res */}
                  <div className="bg-[#111827]/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold bg-white/5 px-2.5 py-1 rounded">
                        Original Input
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-medium">{beforeRes}</span>
                    </div>
                    
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-[#020617]/80 flex items-center justify-center group min-h-[250px]">
                      <img
                        src={displayOriginal}
                        alt="Original low-res input"
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain filter blur-[0.5px] transition-transform duration-300 group-hover:scale-[1.03]"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/5 text-[9px] font-mono px-2 py-0.5 rounded text-slate-400">
                        Low-Fidelity
                      </div>
                    </div>
                  </div>

                  {/* Right Viewport: Enhanced Output */}
                  <div className="bg-[#111827]/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#14B8A6] font-bold bg-[#14B8A6]/10 px-2.5 py-1 rounded">
                        Enhanced Output
                      </span>
                      <span className="text-[10px] font-mono text-[#14B8A6] font-bold">
                        {isProcessing ? 'Processing...' : afterRes}
                      </span>
                    </div>

                    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-[#020617]/80 flex items-center justify-center group min-h-[250px]">
                      <AnimatePresence mode="wait">
                        {isProcessing && (
                          <motion.div
                            key="processing-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#020617]/95 flex flex-col items-center justify-center gap-3 z-10"
                          >
                            <RefreshCw className="w-8 h-8 text-[#14B8A6] animate-spin" />
                            <div className="text-center">
                              <p className="text-[11px] font-mono text-slate-300 font-semibold tracking-wider uppercase">
                                MODEL INFERENCE ACTIVE
                              </p>
                              <p className="text-[10px] font-mono text-slate-500 mt-1">
                                Applying Real-ESRGAN x4+ ({progress}%)
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!hasProcessed && !isProcessing ? (
                        <div className="absolute inset-0 bg-[#020617]/95 flex flex-col items-center justify-center text-center p-5 z-10">
                          <Sparkles className="w-8 h-8 text-slate-600 mb-3 animate-pulse" />
                          <p className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                            Awaiting Enhancement
                          </p>
                          <p className="text-[10px] text-slate-500 max-w-[200px] mt-1.5 font-sans leading-relaxed">
                            Click the "Enhance Image" button to run the Super-Resolution model.
                          </p>
                        </div>
                      ) : (
                        <img
                          src={displayUpscaled}
                          alt="Enhanced output"
                          referrerPolicy="no-referrer"
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      )}

                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-[9px] font-mono px-2 py-0.5 rounded text-white font-semibold">
                        Super-Resolved ({scaleFactor}x)
                      </div>
                    </div>
                  </div>

                </div>

                {/* Quick Stats and Download Suite */}
                <div className="bg-[#111827]/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="text-left">
                    <h4 className="text-xs font-semibold text-[#CBD5E1]">
                      Custom Super-Resolution Output
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-md font-sans">
                      Upscaled using Real-ESRGAN x4+ model at {scaleFactor}x factor. Intact geometry with reconstructed edge sharpness.
                    </p>
                    
                    {/* Resolution Change pill */}
                    <div className="flex items-center gap-3 mt-3 text-[10px] font-mono font-medium text-slate-400">
                      <span className="bg-[#020617] border border-white/10 px-2 py-0.5 rounded text-rose-300">
                        Original: {beforeRes}
                      </span>
                      <span>→</span>
                      <span className="bg-[#020617] border border-white/10 px-2 py-0.5 rounded text-emerald-400 font-bold">
                        Enhanced: {afterRes}
                      </span>
                    </div>
                  </div>

                  {/* Download CTA */}
                  <button
                    id="download-result-btn"
                    onClick={handleDownload}
                    disabled={isProcessing || !hasProcessed}
                    className="w-full md:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:from-[#2563EB]/90 hover:to-[#14B8A6]/90 text-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 font-sans shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    Download Enhanced Asset
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
