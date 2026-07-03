import React, { useState, useRef, useEffect } from 'react';
import { Upload, Sliders, Sparkles, Image as ImageIcon, Download, Check, AlertCircle, Cpu, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SHOWCASE_EXAMPLES } from '../data';
import { ImageExample, ProcessingStep } from '../types';
import ImageSlider from './ImageSlider';

export default function UpscalePlayground() {
  const [selectedExample, setSelectedExample] = useState<ImageExample>(SHOWCASE_EXAMPLES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string>('');
  
  // Upscaling parameter states
  const [scaleFactor, setScaleFactor] = useState<number>(4);
  const [selectedModel, setSelectedModel] = useState<string>('pixelboost-ultra');
  const [denoise, setDenoise] = useState<number>(35);
  const [sharpness, setSharpness] = useState<number>(65);
  const [faceEnhance, setFaceEnhance] = useState<boolean>(true);
  const [deblock, setDeblock] = useState<boolean>(true);

  // Processing state machine
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [processingLogs, setProcessingLogs] = useState<string[]>([]);
  const [hasProcessed, setHasProcessed] = useState<boolean>(true); // initially true for templates

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const steps: ProcessingStep[] = [
    { id: 'init', label: 'Initializing neural weights and allocating GPU memory...', duration: 600, status: 'idle' },
    { id: 'denoise', label: 'Analyzing compression noise patterns & deblocking pixels...', duration: 800, status: 'idle' },
    { id: 'convolve', label: 'Applying ESRGAN-v4 multi-pass residual dense networks...', duration: 1200, status: 'idle' },
    { id: 'refine', label: 'Enhancing high-frequency details and sub-pixel edges...', duration: 700, status: 'idle' },
  ];

  // If example is selected, reset custom image and mark as processed (since templates have ready before/afters)
  const handleSelectExample = (example: ImageExample) => {
    if (isProcessing) return;
    setCustomImage(null);
    setCustomFileName('');
    setSelectedExample(example);
    setHasProcessed(true);
  };

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
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    
    setCustomFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomImage(event.target.result as string);
        setHasProcessed(false); // needs processing!
      }
    };
    reader.readAsDataURL(file);
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
        setProcessingLogs(prev => [...prev, `⚡ [SUCCESS] Super-resolution complete! Upscaled output generated in 3.1s`]);
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
    const link = document.createElement('a');
    link.href = customImage || selectedExample.upscaledUrl;
    link.download = customFileName 
      ? `pixelboost_${scaleFactor}x_${customFileName}` 
      : `pixelboost_${selectedExample.title.toLowerCase().replace(/\s+/g, '_')}_${scaleFactor}x.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Determine current display sources
  const displayOriginal = customImage || selectedExample.originalUrl;
  const displayUpscaled = customImage || selectedExample.upscaledUrl;

  return (
    <div id="playground" className="w-full py-16 px-4 md:px-8 border-b border-white/10 bg-[#020617]/50 backdrop-blur-md relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(37,99,235,0.06),transparent_40%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            LIVE PLAYGROUND
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-3">
            Test the PixelBoost Core
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl">
            Upload your own pixelated photo or interact with our template presets below. Drag the slider to compare original textures against AI-reconstructed 4K geometry.
          </p>
        </div>

        {/* Showcase / Selection Templates */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-2">Presets:</span>
          {SHOWCASE_EXAMPLES.map((example) => (
            <button
              id={`preset-btn-${example.id}`}
              key={example.id}
              onClick={() => handleSelectExample(example)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                !customImage && selectedExample.id === example.id
                  ? 'bg-[#2563EB]/15 border-[#2563EB]/40 text-blue-300 shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                  : 'bg-[#111827]/40 border-white/10 text-[#CBD5E1] hover:text-white hover:border-white/20'
              }`}
            >
              {example.title}
            </button>
          ))}

          <button
            id="reset-to-custom-btn"
            onClick={() => fileInputRef.current?.click()}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 flex items-center gap-1.5 ${
              customImage
                ? 'bg-[#14B8A6]/15 border-[#14B8A6]/40 text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.15)]'
                : 'bg-[#111827]/40 border-white/10 text-[#CBD5E1] hover:text-white hover:border-white/20'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            {customImage ? 'Uploaded Custom' : 'Upload Custom'}
          </button>
        </div>

        {/* Core Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Parameters & Control Suite (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Control Panel Container */}
            <div className="bg-[#111827]/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2563EB]/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-6 border-b border-white/10 pb-3 font-sans">
                <Sliders className="w-4 h-4 text-[#14B8A6]" />
                Upscale Parameters
              </h3>

              {/* Upload Dropzone (if no custom uploaded yet, prompt nicely) */}
              {!customImage && (
                <div
                  id="dropzone"
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all mb-6 ${
                    isDragActive
                      ? 'border-[#14B8A6] bg-[#14B8A6]/5'
                      : 'border-white/10 bg-[#020617]/50 hover:bg-[#020617]/80 hover:border-white/20'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center mx-auto mb-3 border border-white/10">
                    <Upload className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium font-sans">Drag & drop your custom file here</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">PNG, JPG, WebP up to 15MB</p>
                </div>
              )}

              {/* Uploaded File Pill */}
              {customImage && (
                <div className="flex items-center justify-between p-3 bg-[#020617]/80 border border-white/10 rounded-xl mb-6 text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <ImageIcon className="w-4 h-4 text-[#14B8A6] shrink-0" />
                    <span className="text-[#CBD5E1] font-mono truncate">{customFileName || 'uploaded_image.jpg'}</span>
                  </div>
                  <button
                    onClick={() => {
                      setCustomImage(null);
                      setCustomFileName('');
                      setSelectedExample(SHOWCASE_EXAMPLES[0]);
                      setHasProcessed(true);
                    }}
                    className="text-[10px] text-rose-400 hover:text-rose-300 underline shrink-0 cursor-pointer font-sans"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Scale Options */}
              <div className="mb-5">
                <label className="text-xs font-medium text-[#CBD5E1] block mb-2 font-sans">
                  Scale Factor
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[2, 4].map((factor) => (
                    <button
                      key={factor}
                      onClick={() => setScaleFactor(factor)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
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

              {/* AI Model Selection */}
              <div className="mb-5">
                <label className="text-xs font-medium text-[#CBD5E1] block mb-2 font-sans">
                  AI Model Core
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-[#020617] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#CBD5E1] outline-none focus:border-[#14B8A6]/50 transition-colors font-sans"
                >
                  <option value="pixelboost-ultra">PixelBoost Ultra (v2.4 - Generalist)</option>
                  <option value="anime-sharper">Anime-Sharper (Illustrations & Art)</option>
                  <option value="face-restore">FaceRestore Pro (Blurry Portraits)</option>
                  <option value="text-refine">TextRefine AI (Document & Neon Signs)</option>
                </select>
              </div>

              {/* Adjustments: Denoise */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5 font-sans">
                  <span className="text-slate-400 font-medium">De-noising Level</span>
                  <span className="text-[#14B8A6] font-mono font-semibold">{denoise}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={denoise}
                  onChange={(e) => setDenoise(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#020617] rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                />
              </div>

              {/* Adjustments: Sharpness */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1.5 font-sans">
                  <span className="text-slate-400 font-medium">Edge Sharpness</span>
                  <span className="text-[#14B8A6] font-mono font-semibold">{sharpness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sharpness}
                  onChange={(e) => setSharpness(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#020617] rounded-lg appearance-none cursor-pointer accent-[#14B8A6]"
                />
              </div>

              {/* Advanced Toggles */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* Face restore toggle */}
                <button
                  onClick={() => setFaceEnhance(!faceEnhance)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    faceEnhance 
                      ? 'bg-[#020617]/80 border-[#14B8A6]/30 text-[#14B8A6]' 
                      : 'bg-[#020617]/20 border-white/10 text-slate-500'
                  }`}
                >
                  <span className="text-[11px] font-medium font-sans">Face Restore</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                    faceEnhance ? 'border-[#14B8A6] bg-[#14B8A6]/10' : 'border-slate-600'
                  }`}>
                    {faceEnhance && <Check className="w-2.5 h-2.5 text-[#14B8A6] stroke-[3]" />}
                  </div>
                </button>

                {/* Deblock toggle */}
                <button
                  onClick={() => setDeblock(!deblock)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    deblock 
                      ? 'bg-[#020617]/80 border-[#14B8A6]/30 text-[#14B8A6]' 
                      : 'bg-[#020617]/20 border-white/10 text-slate-500'
                  }`}
                >
                  <span className="text-[11px] font-medium font-sans">JPEG Deblock</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                    deblock ? 'border-[#14B8A6] bg-[#14B8A6]/10' : 'border-slate-600'
                  }`}>
                    {deblock && <Check className="w-2.5 h-2.5 text-[#14B8A6] stroke-[3]" />}
                  </div>
                </button>
              </div>

              {/* Action Button */}
              <button
                id="enhance-button"
                onClick={handleEnhance}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wide uppercase text-white bg-gradient-to-r from-[#2563EB] to-[#14B8A6] hover:from-[#2563EB]/90 hover:to-[#14B8A6]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-blue-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans shadow-lg shadow-blue-500/10"
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                {isProcessing ? 'Convolution in progress...' : customImage && !hasProcessed ? 'Enhance Custom File' : 'Re-Enhance Preset'}
              </button>

              {/* Custom Upload info text */}
              {customImage && !hasProcessed && (
                <div className="mt-3 flex items-start gap-1.5 p-2 bg-[#FBBF24]/10 border border-[#FBBF24]/20 rounded-lg text-[10px] text-[#FBBF24] font-medium font-sans">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#FBBF24] mt-0.5" />
                  <span>Custom files must be processed by the model before comparing details. Click "Enhance Custom File".</span>
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

              {/* Progress Slider */}
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

          {/* RIGHT: Comparison Stage & Metadata (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Interactive Image Frame */}
            <div className="bg-[#111827]/30 p-1.5 rounded-2xl border border-white/10 shadow-2xl relative">
              <ImageSlider
                originalSrc={displayOriginal}
                upscaledSrc={displayUpscaled}
                title={customImage ? customFileName : selectedExample.title}
                isCustomUpload={!!customImage}
                upscaleFactor={scaleFactor}
                isProcessing={isProcessing}
              />
            </div>

            {/* Quick stats and Download Suite */}
            <div className="bg-[#111827]/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-semibold text-[#CBD5E1]">
                  {customImage ? 'Custom Enhanced Target' : selectedExample.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-md">
                  {customImage 
                    ? `Processed using ${selectedModel.toUpperCase()} at ${scaleFactor}x zoom. High-contrast detail mapping active.` 
                    : selectedExample.description}
                </p>
                
                {/* Resolution Change pill */}
                <div className="flex items-center gap-3 mt-3 text-[10px] font-mono font-medium text-slate-400">
                  <span className="bg-[#020617] border border-white/10 px-2 py-0.5 rounded text-rose-300">
                    Before: {customImage ? 'Low Res' : selectedExample.resolutionBefore}
                  </span>
                  <span>→</span>
                  <span className="bg-[#020617] border border-white/10 px-2 py-0.5 rounded text-emerald-400">
                    After: {customImage ? `${scaleFactor}x Super-Res` : selectedExample.resolutionAfter}
                  </span>
                </div>
              </div>

              {/* Download CTA */}
              <button
                id="download-result-btn"
                onClick={handleDownload}
                disabled={isProcessing || !hasProcessed}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide bg-[#020617] border border-white/10 text-slate-200 hover:text-white hover:border-white/20 hover:bg-[#111827] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 font-sans"
              >
                <Download className="w-4 h-4" />
                Download 4K Asset
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
