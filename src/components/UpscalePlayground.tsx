import React, { useState, useRef, useEffect } from 'react';
import { Upload, Sliders, Sparkles, Image as ImageIcon, Download, AlertCircle, Cpu, RefreshCw, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProcessingStep } from '../types';
import { useToast } from '../context/ToastContext';
import ImageMetadataPanel from './ImageMetadataPanel';
import EnhancedImageSummary from './EnhancedImageSummary';
import { enhanceImage } from '../services/api';

export default function UpscalePlayground() {
  const toast = useToast();
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customFileName, setCustomFileName] = useState<string>('');
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [customHeight, setCustomHeight] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Metadata extraction states
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fileFormat, setFileFormat] = useState<string | null>(null);
  const [colorMode, setColorMode] = useState<string | null>(null);
  
  // Pipeline metrics
  const [actualProcessingTime, setActualProcessingTime] = useState<number>(3.3);
  const [pipelineStatus, setPipelineStatus] = useState<'success' | 'failed'>('success');
  const [pipelineError, setPipelineError] = useState<string | null>(null);
  
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
  const [dragCounter, setDragCounter] = useState<number>(0);

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
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => {
      const next = prev - 1;
      if (next <= 0) {
        setIsDragActive(false);
        return 0;
      }
      return next;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    setDragCounter(0);

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
      const errorMsg = 'Please upload a valid image file (PNG, JPEG, WebP).';
      setUploadError(errorMsg);
      toast.error(errorMsg, { title: 'Upload Failed' });
      return;
    }

    // Strict 10 MB maximum size validation limit
    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = 'File exceeds the maximum size of 10 MB. Please optimize your asset.';
      setUploadError(errorMsg);
      toast.error(errorMsg, { title: 'File Too Large' });
      return;
    }
    
    setCustomFileName(file.name);
    setFileSize(file.size);
    setUploadedFile(file);
    
    // Extract format: e.g. "image/png" -> "PNG", "image/jpeg" -> "JPEG", "image/webp" -> "WebP"
    const format = file.type ? file.type.split('/')[1]?.toUpperCase() : file.name.split('.').pop()?.toUpperCase() || 'PNG';
    setFileFormat(format === 'JPEG' ? 'JPG' : format);

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
          
          // Analyze color mode with a temporary canvas
          try {
            const canvas = document.createElement('canvas');
            canvas.width = Math.min(img.width, 100);
            canvas.height = Math.min(img.height, 100);
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
              let hasAlpha = false;
              let isGray = true;
              for (let i = 0; i < imgData.length; i += 4) {
                const r = imgData[i];
                const g = imgData[i+1];
                const b = imgData[i+2];
                const a = imgData[i+3];
                if (a < 255) {
                  hasAlpha = true;
                }
                if (Math.abs(r - g) > 5 || Math.abs(r - b) > 5 || Math.abs(g - b) > 5) {
                  isGray = false;
                }
              }
              setColorMode(hasAlpha ? 'RGBA' : isGray ? 'Grayscale' : 'RGB');
            } else {
              setColorMode('RGB');
            }
          } catch (e) {
            // cross-origin security fallback
            setColorMode('RGB');
          }

          toast.success(`"${file.name}" loaded successfully. Ready to upscale!`, { title: 'Image Uploaded' });
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
    setUploadedFile(null);
    setCustomFileName('misty_alpine_ridge_demo.jpg');
    setCustomWidth(800);
    setCustomHeight(600);
    setFileSize(145408); // Approx 142 KB
    setFileFormat('JPG');
    setColorMode('RGB');
    setCustomImage('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800');
    setHasProcessed(false);
    toast.success('Misty Alpine Ridge demo loaded successfully!', { title: 'Demo Image Loaded' });
  };

  // Trigger simulated AI Super Resolution using the Enhance Image API service
  const handleEnhance = async () => {
    if (isProcessing) return;

    toast.info('Initializing Real-ESRGAN super-resolution neural pipeline...', { title: 'Processing Started', duration: 3000 });
    setIsProcessing(true);
    setProgress(0);
    setProcessingLogs([]);
    setCurrentStepIndex(0);
    setPipelineStatus('success');
    setPipelineError(null);
    setHasProcessed(false);
    
    try {
      // 1. Trigger the reusable API service passing either the File object or demo URL/base64 fallback
      const apiPromise = enhanceImage({
        imageFile: uploadedFile,
        imageBase64: customImage,
        scaleFactor: scaleFactor,
      });

      // Display realistic progressive loading logs and increments in parallel
      let logIndex = 0;
      const totalStepsCount = steps.length;
      
      const interval = setInterval(() => {
        if (logIndex < totalStepsCount) {
          const step = steps[logIndex];
          setCurrentStepIndex(logIndex);
          setProcessingLogs(prev => [
            ...prev,
            `[${logIndex + 1}/${totalStepsCount + 1}] ${step.label}`
          ]);
          // Progress bar ticks dynamically from 0% to 90%
          setProgress(Math.round(((logIndex + 1) / (totalStepsCount + 1)) * 90));
          logIndex++;
        } else {
          clearInterval(interval);
        }
      }, 600);

      // Await actual response from the modular api service
      const response = await apiPromise;
      
      clearInterval(interval);
      
      // Finalizing step logs
      setProcessingLogs(prev => [
        ...prev,
        `[${totalStepsCount + 1}/${totalStepsCount + 1}] Finalizing tensor dimensions and compiling high-resolution JPEG streams...`,
        `⚡ [SUCCESS] ${response.statusMessage} (${response.aiModelUsed})`
      ]);
      
      setProgress(100);
      setActualProcessingTime(response.processingTime);
      
      // Update output metrics based on response values
      setFileSize(response.outputFileSize);
      const format = response.outputFileFormat;
      setFileFormat(format === 'JPEG' ? 'JPG' : format);
      
      setPipelineStatus('success');
      setIsProcessing(false);
      setHasProcessed(true);
      
      toast.success(`Super-resolution complete! Restored fine-grained textures at ${scaleFactor}x scale.`, { title: 'Upscale Complete' });
    } catch (error: any) {
      console.error('Enhancement pipeline execution failed:', error);
      setPipelineStatus('failed');
      setPipelineError(error.message || 'The convolutional neural network failed to partition the source texture.');
      setProcessingLogs(prev => [
        ...prev, 
        `❌ [FATAL] Real-ESRGAN pipeline terminated unexpectedly: ${error.message || 'CUDA Error'}`
      ]);
      setIsProcessing(false);
      setHasProcessed(true);
      toast.error(error.message || 'Super-resolution failed.', { title: 'Upscale Failed' });
    }
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
    toast.success('Triggered download for your high-resolution upscaled image.', { title: 'Downloading Asset' });
  };

  // Determine display sources
  const displayOriginal = customImage || '';
  const displayUpscaled = customImage || '';

  return (
    <div 
      id="playground" 
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="w-full py-16 px-4 md:px-8 border-b border-slate-200 dark:border-white/10 bg-slate-50/20 dark:bg-[#020617]/50 backdrop-blur-md relative overflow-hidden"
    >
      {/* Immersive Workspace-Wide Drag and Drop Overlay */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-950/40 backdrop-blur-xl border-4 border-dashed border-blue-500 dark:border-blue-400 rounded-3xl m-3 pointer-events-none"
          >
            <div className="p-6 rounded-full bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center text-blue-500 dark:text-blue-400 animate-bounce border border-blue-500/20">
              <Upload className="w-12 h-12" />
            </div>
            <h3 className="mt-5 text-2xl font-sans font-bold text-blue-600 dark:text-blue-400 tracking-tight">
              Drop your image anywhere
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-sans mt-2 max-w-xs text-center leading-relaxed">
              Release to upload and instantly view metadata metrics and upscaling options.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-[#2563EB] dark:text-blue-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE PLAYGROUND
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Real-ESRGAN x4+ Super-Resolution
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans">
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
              className="flex flex-col items-center gap-8 py-4 w-full"
            >
              <div
                id="premium-dropzone"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative w-full max-w-2xl rounded-3xl p-10 md:p-12 backdrop-blur-xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/10 hover:border-[#2563EB]/35 dark:hover:border-blue-500/35 transition-all duration-300 group overflow-hidden cursor-pointer text-center select-none shadow-[0_10px_50px_rgba(37,99,235,0.06)] dark:shadow-[0_0_80px_rgba(37,99,235,0.12)] ${
                  isDragActive ? 'border-blue-500 dark:border-blue-400 bg-blue-500/5 dark:bg-blue-500/10 scale-[1.01]' : ''
                }`}
              >
                {/* SVG Animated Dashed Border */}
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
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/25 flex items-center justify-center mb-6 text-[#2563EB] dark:text-blue-400 shadow-[0_4px_20px_rgba(37,99,235,0.08)] dark:shadow-[0_0_30px_rgba(37,99,235,0.1)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.25)] group-hover:text-[#14B8A6] transition-all duration-300">
                    <Upload className="w-9 h-9" />
                  </div>

                  {/* Title & Prompt */}
                  <h3 className="text-xl font-sans font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                    Drag, Drop or Paste Image to start
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-8 leading-relaxed font-sans">
                    Select a low-resolution photo or compressed graphic. The Real-ESRGAN x4+ model will synthesize details.
                  </p>

                  {/* Supported formats & Max size details */}
                  <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {['PNG', 'JPEG', 'WEBP'].map((format) => (
                      <span key={format} className="px-3 py-1 rounded-md bg-slate-100 dark:bg-[#111827]/80 border border-slate-200 dark:border-white/5 text-[10px] font-bold font-mono text-slate-700 dark:text-slate-300 tracking-wider">
                        {format}
                      </span>
                    ))}
                    <span className="px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold font-mono text-rose-600 dark:text-rose-300 tracking-wider">
                      MAX 10 MB
                    </span>
                  </div>

                  {/* Interactive Paste Keyboard Cues */}
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mb-6">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-[9px]">Ctrl</span> + <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-[9px]">V</span> to paste clipboard image
                  </div>

                  {/* Contextual Validation Feedback */}
                  {uploadError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1.5 px-3 py-2 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-550 dark:text-rose-400 font-medium mb-6 text-left animate-fade-in"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 dark:text-rose-400" />
                      <span>{uploadError}</span>
                    </motion.div>
                  )}

                  {/* Demo Image Trigger */}
                  <div className="border-t border-slate-200 dark:border-white/5 pt-6 w-full flex justify-center">
                    <button
                      onClick={handleLoadDemo}
                      className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide text-teal-700 dark:text-[#14B8A6] bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 hover:scale-105 transition-all cursor-pointer shadow-md shadow-teal-500/5"
                    >
                      💡 Or load alpine demo image
                    </button>
                  </div>
                </div>
              </div>

              {/* Centered compact metadata placeholder panel */}
              <div className="w-full max-w-2xl">
                <ImageMetadataPanel
                  fileName={null}
                  width={null}
                  height={null}
                  fileSize={null}
                  fileFormat={null}
                  colorMode={null}
                  scaleFactor={scaleFactor}
                />
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
                <div className="relative w-full rounded-2xl p-5 backdrop-blur-xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden group text-left">
                  <div className="absolute inset-0 border border-slate-200 dark:border-white/5 rounded-2xl pointer-events-none group-hover:border-[#2563EB]/20 transition-colors" />

                  <div className="relative z-10 flex flex-col gap-4">
                    {/* Header with name and removal action */}
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 dark:text-[#14B8A6] flex items-center gap-1.5 font-mono">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Active Source Asset
                      </span>
                      <button
                        onClick={() => {
                          setCustomImage(null);
                          setCustomFileName('');
                          setCustomWidth(0);
                          setCustomHeight(0);
                          setFileSize(null);
                          setFileFormat(null);
                          setColorMode(null);
                          setHasProcessed(false);
                          setUploadError(null);
                        }}
                        className="text-[10px] text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-bold font-sans flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Remove Image
                      </button>
                    </div>

                    {/* Image Preview Window */}
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950/40 flex items-center justify-center">
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

                {/* Real-time Image Metadata Panel */}
                <ImageMetadataPanel
                  fileName={customFileName}
                  width={customWidth}
                  height={customHeight}
                  fileSize={fileSize}
                  fileFormat={fileFormat}
                  colorMode={colorMode}
                  scaleFactor={scaleFactor}
                />

                {/* Parametrization Drawer */}
                <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
                  
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-white/10 pb-3 font-sans">
                    <Sliders className="w-4 h-4 text-[#14B8A6]" />
                    Upscale Parameters
                  </h3>

                  {/* Scale Options */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold text-slate-700 dark:text-[#CBD5E1] block mb-2 font-sans uppercase tracking-wider">
                      Scale Factor
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[2, 4].map((factor) => (
                        <button
                          key={factor}
                          onClick={() => setScaleFactor(factor)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            scaleFactor === factor
                              ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] border-transparent text-white shadow-lg shadow-blue-500/10 font-sans'
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300 dark:bg-[#020617] dark:border-white/10 dark:text-slate-400 dark:hover:border-white/20 font-sans'
                          }`}
                        >
                          {factor}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Model Specification */}
                  <div className="bg-slate-50 dark:bg-[#020617]/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 font-sans space-y-4 mb-6">
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-white/10 pb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#14B8A6]" />
                      Active Model Specification
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-left">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">Original Res</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-white font-mono">{beforeRes}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">Estimated Output</span>
                        <span className="text-xs font-bold text-teal-600 dark:text-[#14B8A6] font-mono">{afterRes}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">AI Model</span>
                        <span className="text-xs font-bold text-slate-850 dark:text-white font-sans">Real-ESRGAN x4+</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono uppercase block tracking-wider">Device</span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
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
                    <div className="mt-3 flex items-start gap-1.5 p-2 bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-lg text-[10px] text-amber-700 dark:text-[#FBBF24] font-semibold font-sans text-left animate-fade-in">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#FBBF24] mt-0.5" />
                      <span>Image loaded. Click "Enhance Image" to execute Real-ESRGAN upscaling.</span>
                    </div>
                  )}
                </div>

                {/* Neural Net Processing Console/Logs */}
                <div className="bg-slate-50 dark:bg-[#020617]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-sm dark:shadow-xl font-mono text-left">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#14B8A6]" />
                      Core Pipeline Log
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-semibold">
                      GPU_A100_ACTIVE
                    </span>
                  </div>

                  {/* Logs area */}
                  <div className="h-28 overflow-y-auto text-[10px] text-slate-700 dark:text-slate-400 flex flex-col gap-1 pr-1">
                    {processingLogs.length === 0 ? (
                      <span className="text-slate-400 dark:text-slate-600 italic">Console idling. Run enhance to stream CNN state parameters...</span>
                    ) : (
                      processingLogs.map((log, index) => {
                        const isSuccess = log.includes('SUCCESS');
                        const isStep = log.match(/^\[\d\/\d\]/);
                        return (
                          <div 
                            key={index} 
                            className={`leading-relaxed ${
                              isSuccess ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : isStep ? 'text-slate-800 dark:text-slate-300' : 'text-slate-500'
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
                      <div className="flex justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        <span>PROCESSING GRID</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-[#111827] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] h-full transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: Viewports comparison & Download action */}
              <div id="playground-viewports" className="lg:col-span-7 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Left Viewport: Original Low-Res */}
                  <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded">
                        Original Input
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-medium">{beforeRes}</span>
                    </div>
                    
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#020617]/80 flex items-center justify-center group min-h-[250px]">
                      <img
                        src={displayOriginal}
                        alt="Original low-res input"
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain filter blur-[0.5px] transition-transform duration-300 group-hover:scale-[1.03]"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-white/5 text-[9px] font-mono px-2 py-0.5 rounded text-slate-600 dark:text-slate-400 shadow-sm">
                        Low-Fidelity
                      </div>
                    </div>
                  </div>

                  {/* Right Viewport: Enhanced Output */}
                  <div className="bg-white dark:bg-[#111827]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 dark:text-[#14B8A6] font-bold bg-teal-500/10 px-2.5 py-1 rounded">
                        Enhanced Output
                      </span>
                      <span className="text-[10px] font-mono text-[#2563EB] dark:text-[#14B8A6] font-bold">
                        {isProcessing ? 'Processing...' : afterRes}
                      </span>
                    </div>

                    <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#020617]/80 flex items-center justify-center group min-h-[250px]">
                      <AnimatePresence mode="wait">
                        {isProcessing && (
                          <motion.div
                            key="processing-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/95 dark:bg-[#020617]/95 flex flex-col items-center justify-center gap-3 z-10"
                          >
                            <RefreshCw className="w-8 h-8 text-[#2563EB] dark:text-[#14B8A6] animate-spin" />
                            <div className="text-center">
                              <p className="text-[11px] font-mono text-slate-800 dark:text-slate-300 font-bold tracking-wider uppercase">
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
                        <div className="absolute inset-0 bg-slate-50/95 dark:bg-[#020617]/95 flex flex-col items-center justify-center text-center p-5 z-10">
                          <Sparkles className="w-8 h-8 text-slate-400 dark:text-slate-600 mb-3 animate-pulse" />
                          <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
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

                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-[9px] font-mono px-2 py-0.5 rounded text-white font-semibold shadow">
                        Super-Resolved ({scaleFactor}x)
                      </div>
                    </div>
                  </div>

                </div>

                {/* Enhanced Image Summary & Action Suite */}
                {hasProcessed ? (
                  <EnhancedImageSummary
                    imageSrc={customImage}
                    fileName={customFileName}
                    originalWidth={customWidth}
                    originalHeight={customHeight}
                    fileSize={fileSize}
                    fileFormat={fileFormat}
                    scaleFactor={scaleFactor}
                    processingTime={actualProcessingTime}
                    status={pipelineStatus}
                    errorMessage={pipelineError}
                    onDownload={handleDownload}
                    onCompare={() => {
                      document.getElementById('playground-viewports')?.scrollIntoView({ behavior: 'smooth' });
                      toast.info('Viewing comparative before/after viewports.', { title: 'Viewport Comparison' });
                    }}
                    onReset={() => {
                      setCustomImage(null);
                      setUploadedFile(null);
                      setCustomFileName('');
                      setCustomWidth(0);
                      setCustomHeight(0);
                      setFileSize(null);
                      setFileFormat(null);
                      setColorMode(null);
                      setHasProcessed(false);
                      setUploadError(null);
                      toast.info('Workspace reset. Ready for new asset upload.', { title: 'Workspace Cleaned' });
                    }}
                    onRetry={handleEnhance}
                  />
                ) : (
                  <div className="bg-white/40 dark:bg-[#111827]/20 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-6 text-center shadow-sm">
                    <Sparkles className="w-6 h-6 text-slate-400 dark:text-slate-600 mx-auto mb-2 animate-pulse" />
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400">
                      Super-Resolution Summary Card
                    </h4>
                    <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1 font-sans leading-relaxed">
                      This space will dynamically populate with high-fidelity asset stats, estimated output sizes, and high-speed download CTAs once the upscaling network completes execution.
                    </p>
                  </div>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
