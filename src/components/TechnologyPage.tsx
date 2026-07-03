import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Layers, Sparkles, Sliders, Play, Code, ArrowRight, ChevronRight, 
  Activity, FileText, CheckCircle2, ShieldCheck, Zap, BarChart3, HelpCircle, 
  RefreshCw, Eye, Maximize2, Download, History, Palette, HeartPulse, 
  Globe, Brush, Camera, Gamepad2, Split, Info, ArrowRightLeft, Network,
  Maximize, Image as ImageIcon
} from 'lucide-react';

interface TechnologyPageProps {
  onNavigate?: (view: string) => void;
}

export default function TechnologyPage({ onNavigate }: TechnologyPageProps) {
  // Section 2: Architecture interactive node selector
  const [activeArchNode, setActiveArchNode] = useState<string>('generator');

  // Section 5: Why ESRGAN - Interactive slider state
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [compareAsset, setCompareAsset] = useState<'mountain' | 'butterfly' | 'text'>('mountain');
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Section 8: Sequential workflow animation state
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([
    '► System core idle. Ready for pipeline simulation.'
  ]);

  // Model specs modal state
  const [showSpecsModal, setShowSpecsModal] = useState<boolean>(false);

  // Auto-play Section 8 workflow stages sequentially
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveWorkflowIndex((prev) => (prev + 1) % 5);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle live logs generation whenever the active workflow stage shifts
  useEffect(() => {
    const stageLogs: Record<number, string[]> = {
      0: [
        '⌛ [GPU_0] Ingesting source low-resolution floating-point tensor...',
        '⚙️ [GPU_0] Casting RGB coordinates from [0, 255] into normalized floats [0.0, 1.0].',
        '⚙️ [GPU_0] Applying reflect-padding boundary borders: [Pad: top=12, bottom=12, left=12, right=12]',
        '⚡ [GPU_0] Input buffer loaded. Tensor dimensions: [batch=1, channels=3, h=180, w=180]'
      ],
      1: [
        '⌛ [GPU_0] Executing initial convolutional weight layer...',
        '⚙️ [GPU_0] Layer: Conv2D(in_channels=3, out_channels=64, kernel_size=3x3, stride=1, padding=1)',
        '⚙️ [GPU_0] Computing 64 spatial shallow feature activation maps.',
        '⚡ [GPU_0] Shallow feature extraction completed. Peak memory allocated: 124MB'
      ],
      2: [
        '⌛ [GPU_0] Entering Residual-in-Residual Dense Block (RRDB) array...',
        '⚙️ [GPU_0] Running 23 stacked Dense Blocks recursively without Batch Normalization layers.',
        '⚙️ [GPU_0] Passing continuous shallow gradients forward via dense skip-connections (β=0.2).',
        '⚙️ [GPU_0] Reconstructing sub-pixel high-frequency contours and organic macro-textures.',
        '⚡ [GPU_0] Synthesized deep latent maps generated. Iterations: 23/23.'
      ],
      3: [
        '⌛ [GPU_0] Executing Pixel Shuffle sub-pixel convolutional upsampler...',
        '⚙️ [GPU_0] Expanding intermediate feature channels from 64 to 1024 channels (r=4).',
        '⚙️ [GPU_0] Spatial translation mapping: [1, 1024, 180, 180] → [1, 64, 720, 720]',
        '⚙️ [GPU_0] Eliminating checkerboard artifacts via sub-pixel grid restructuring.',
        '⚡ [GPU_0] Upscaling convolution complete. Resolution expanded 400% spatially.'
      ],
      4: [
        '⌛ [GPU_0] Finalizing chrominance adjustments and clamping RGB channels...',
        '⚙️ [GPU_0] Scaling output tensor back into integer space: clamp_range([0.0, 1.0] * 255.0).',
        '⚙️ [GPU_0] Running post-upscale perceptual sharpening filter passes.',
        '⚙️ [GPU_0] Writing super-resolved lossless PNG output stream to high-speed disk.',
        '⚡ [SUCCESS] Inference complete in 3.12s. Output: 720 × 720 px (Lossless Super Resolution)'
      ]
    };

    const newLogs = stageLogs[activeWorkflowIndex] || [];
    setSimulationLogs(newLogs);
  }, [activeWorkflowIndex]);

  // Comparison images metadata
  const compareAssets = {
    mountain: {
      title: 'Misty Alpine Ridge',
      lowRes: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=50&w=600&blur=10',
      highRes: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
      lowLabel: 'Bicubic (Stretched & Blurry)',
      highLabel: 'ESRGAN (Crisp Textures)'
    },
    butterfly: {
      title: 'Monarch Wing Macro',
      lowRes: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=50&w=600&blur=10',
      highRes: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
      lowLabel: 'Pixelated Scale (Loss of Detail)',
      highLabel: 'Sub-Pixel Synthetic Scales'
    },
    text: {
      title: 'Compressed Line Typography',
      lowRes: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=50&w=600&blur=10',
      highRes: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      lowLabel: 'Muddy Anti-Aliased Outline',
      highLabel: 'Reconstructed Sharp Vector Edges'
    }
  };

  // Drag handlers for Section 5 side-by-side slider
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSliding) return;
    handleSliderMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSliding) return;
    handleSliderMove(e.clientX);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-[#F8FAFC] py-4 relative overflow-hidden select-none">
      
      {/* Background radial glow accents */}
      <div className="absolute top-[10%] left-[-200px] w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-150px] w-[500px] h-[500px] bg-teal-400/5 dark:bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[25%] w-[550px] h-[550px] bg-emerald-500/5 dark:bg-emerald-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* ==============================================
            HERO SECTION
           ============================================== */}
        <section className="relative pt-12 pb-20 border-b border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 font-bold font-mono uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 animate-spin-slow" />
                Deep Learning Pipeline
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Technology Behind{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 dark:from-blue-400 dark:via-turquoise-400 dark:to-emerald-400">
                  ImageEnhancer AI
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-xl">
                Powered by Enhanced Super-Resolution Generative Adversarial Networks (ESRGAN) to restore details, sharpen textures, and generate high-quality high-resolution images from low-resolution inputs.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate?.('home')}
                  className="px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Try Live Upscaling
                </button>
                <button
                  onClick={() => setShowSpecsModal(true)}
                  className="px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-700 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer flex items-center gap-1.5 hover:scale-[1.02]"
                >
                  View Model Specs
                </button>
              </div>
            </div>

            {/* Right Animated SVG Illustration Column */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-square bg-slate-50/50 dark:bg-[#090d16]/40 border border-slate-200 dark:border-white/5 backdrop-blur-xl rounded-3xl p-6 flex items-center justify-center shadow-lg overflow-hidden group">
                
                {/* Embedded dynamic animated grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Glowing light orb behind neural network */}
                <div className="absolute w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-teal-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

                <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Decorative surrounding bounding curves */}
                  <path d="M40,60 L60,40 M340,60 L360,40 M40,340 L60,360 M340,340 L360,360" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 dark:text-white/10" />
                  
                  {/* Neural Net connections */}
                  {/* Column 1: Input Nodes (x=80) */}
                  {/* Column 2: Latent Layer 1 (x=160) */}
                  {/* Column 3: Latent Layer 2 (x=240) */}
                  {/* Column 4: Output Nodes (x=320) */}

                  {/* Connect Layer 1 to Layer 2 */}
                  <g stroke="currentColor" strokeWidth="1" className="text-blue-500/20 dark:text-blue-500/25">
                    {[100, 160, 220, 280, 340].map((y1) => 
                      [130, 200, 270].map((y2) => (
                        <line key={`l12-${y1}-${y2}`} x1="80" y1={y1} x2="180" y2={y2} />
                      ))
                    )}
                  </g>

                  {/* Connect Layer 2 to Layer 3 */}
                  <g stroke="currentColor" strokeWidth="1" className="text-teal-500/20 dark:text-teal-500/25">
                    {[130, 200, 270].map((y1) => 
                      [100, 160, 220, 280, 340].map((y2) => (
                        <line key={`l23-${y1}-${y2}`} x1="180" y1={y1} x2="280" y2={y2} />
                      ))
                    )}
                  </g>

                  {/* Connect Layer 3 to Layer 4 */}
                  <g stroke="currentColor" strokeWidth="1" className="text-emerald-500/20 dark:text-emerald-500/25">
                    {[100, 160, 220, 280, 340].map((y1) => 
                      [140, 200, 260].map((y2) => (
                        <line key={`l34-${y1}-${y2}`} x1="280" y1={y1} x2="350" y2={y2} />
                      ))
                    )}
                  </g>

                  {/* Dynamic pulsing signal paths along neural linkages */}
                  <path d="M 80,160 L 180,200 L 280,160 L 350,200" stroke="url(#activeGrad)" strokeWidth="2" strokeDasharray="10 100" className="animate-dash" />
                  <path d="M 80,280 L 180,270 L 280,340 L 350,260" stroke="url(#activeGrad2)" strokeWidth="2" strokeDasharray="15 120" className="animate-dash-slow" />
                  <path d="M 80,100 L 180,130 L 280,220 L 350,140" stroke="url(#activeGrad)" strokeWidth="1.5" strokeDasharray="8 80" className="animate-dash" />

                  {/* Nodes Rendering */}
                  {/* Input Nodes Column */}
                  <g>
                    {[100, 160, 220, 280, 340].map((y, i) => (
                      <g key={`n1-${i}`}>
                        <circle cx="80" cy={y} r="8" fill="white" className="dark:fill-slate-950" stroke="#3B82F6" strokeWidth="2" />
                        <circle cx="80" cy={y} r="3" fill="#3B82F6" className="animate-pulse" />
                      </g>
                    ))}
                  </g>

                  {/* Latent Column 1 */}
                  <g>
                    {[130, 200, 270].map((y, i) => (
                      <g key={`n2-${i}`}>
                        <circle cx="180" cy={y} r="10" fill="white" className="dark:fill-slate-950" stroke="#14B8A6" strokeWidth="2" />
                        <circle cx="180" cy={y} r="4" fill="#14B8A6" />
                      </g>
                    ))}
                  </g>

                  {/* Latent Column 2 */}
                  <g>
                    {[100, 160, 220, 280, 340].map((y, i) => (
                      <g key={`n3-${i}`}>
                        <circle cx="280" cy={y} r="8" fill="white" className="dark:fill-slate-950" stroke="#14B8A6" strokeWidth="2" />
                        <circle cx="280" cy={y} r="3" fill="#14B8A6" />
                      </g>
                    ))}
                  </g>

                  {/* Output Nodes Column */}
                  <g>
                    {[140, 200, 260].map((y, i) => (
                      <g key={`n4-${i}`}>
                        <circle cx="350" cy={y} r="10" fill="white" className="dark:fill-slate-950" stroke="#10B981" strokeWidth="2" />
                        <circle cx="350" cy={y} r="5" fill="#10B981" className="animate-ping" />
                      </g>
                    ))}
                  </g>

                  {/* Core Definitions for gradients and keys */}
                  <defs>
                    <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="50%" stopColor="#14B8A6" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient id="activeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                </svg>

                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -200;
                    }
                  }
                  .animate-dash {
                    animation: dash 4s linear infinite;
                  }
                  .animate-dash-slow {
                    animation: dash 7s linear infinite;
                  }
                  .animate-spin-slow {
                    animation: spin 12s linear infinite;
                  }
                `}</style>
              </div>
            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 1: WHAT IS ESRGAN?
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 font-extrabold">ESRGAN?</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto rounded-full" />
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              <strong>Enhanced Super-Resolution Generative Adversarial Network</strong> is a state-of-the-art deep learning architecture that reconstructs ultra-sharp, high-fidelity images from heavily compressed or low-resolution originals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-sans flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"><Sliders className="w-4 h-4" /></span>
                  Why Interpolation Fails
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Traditional math upscalers (Bicubic, Bilinear, Lanczos) use surrounding pixels to calculate mathematical averages. While fast, this technique cannot guess lost structures. The results are inevitably muddy, blurry, and plagued by halo artifacting near high-contrast edges.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-sans flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400"><Sparkles className="w-4 h-4" /></span>
                  Why ESRGAN Excels
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  ESRGAN employs a Generative Adversarial Network. During training, a generator network is tasked with drawing new details, while a discriminator judges if they look artificial. This continuous competition forces the generator to draw realistic, organic textures (pores, concrete grit, textile fibers, grass strands) that look visually perfect to human eyes.
                </p>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-tr from-blue-600/5 via-teal-500/5 to-emerald-500/5 dark:from-blue-600/10 dark:via-teal-500/10 dark:to-emerald-500/10 border border-slate-200 dark:border-white/10 rounded-3xl text-left space-y-4">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#14B8A6]">Structural Innovation</span>
              <h4 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                Removing Batch Normalization & Boosting Perceptual Fidelity
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                ESRGAN is a substantial refinement over previous super-resolution attempts (SRGAN). By removing Batch Normalization layers entirely, ESRGAN recovers better color fidelity, reduces training instabilities, and allows the model to capture high-frequency detail directly in latent spaces.
              </p>
              <div className="pt-2 flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span><strong>23 Residual-in-Residual Dense Blocks (RRDB)</strong> for extreme capacity.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span><strong>Relativistic average GAN (RaGAN)</strong> for vivid contrast metrics.</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span><strong>VGG-19 Perceptual loss</strong> maps features, not individual pixels.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Applications Title */}
          <div className="text-center md:text-left mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans uppercase tracking-wider mb-2">
              Cross-Industry Applications
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              From restoring historic photography archives to sharpening micro-satellite radar images, ESRGAN scales seamlessly.
            </p>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Old Photo Restoration',
                desc: 'Clears compression artifacts, repairs mold blemishes, and recovers lost facial shapes from decades-old family archives.',
                icon: History,
                color: 'from-blue-500 to-indigo-500'
              },
              {
                title: 'Anime & Line Art',
                desc: 'Cleans digital color fills, sharpens ink profiles, and outputs pristine illustrations without staircase raster lines.',
                icon: Palette,
                color: 'from-teal-500 to-emerald-500'
              },
              {
                title: 'Medical Diagnostics',
                desc: 'Improves clarity of cellular microscopy slices, tissue MRI scans, and ultrasound maps for diagnostic review.',
                icon: HeartPulse,
                color: 'from-rose-500 to-pink-500'
              },
              {
                title: 'Satellite Imaging',
                desc: 'Upscales land topography, maps street boundaries, and clarifies defense reconnaissance inputs with sub-pixel resolution.',
                icon: Globe,
                color: 'from-sky-500 to-cyan-500'
              },
              {
                title: 'Digital Art Prints',
                desc: 'Magnifies concept paintings, matte backgrounds, and midjourney concept files to gallery-grade printable specs.',
                icon: Brush,
                color: 'from-violet-500 to-purple-500'
              },
              {
                title: 'Creative Photography',
                desc: 'Rescues heavily cropped frames or high-ISO shots by removing sensor noise while retaining organic foliage or skin textures.',
                icon: Camera,
                color: 'from-amber-500 to-orange-500'
              },
              {
                title: 'Gaming Textures',
                desc: 'Remasters 64px legacy game pixels into modern 4K textures, ready for high-resolution physically-based shaders.',
                icon: Gamepad2,
                color: 'from-red-500 to-rose-600'
              },
              {
                title: 'High-Fidelity Web',
                desc: 'Permits high-efficiency mobile loading by shipping compressed assets and upscaling them dynamically client-side.',
                icon: Maximize2,
                color: 'from-emerald-500 to-teal-500'
              }
            ].map((app, index) => {
              const IconComp = app.icon;
              return (
                <div
                  key={app.title}
                  className="bg-white dark:bg-[#090d16]/35 border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-blue-500/25 dark:hover:border-blue-500/25 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden text-left"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="space-y-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${app.color} text-white flex items-center justify-center shadow-sm`}>
                      <IconComp className="w-4.5 h-4.5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{app.title}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans leading-normal">{app.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==============================================
            SECTION 2: ESRGAN ARCHITECTURE DIAGRAM
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#2563EB]">Neural Network Topology</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              ESRGAN Generator-Discriminator Stack
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Click the model modules in the flow diagram below to analyze how tensors propagate, weights are updated, and features are computed in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive SVG Diagram (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm min-h-[460px]">
              
              {/* Diagram Header */}
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3 mb-6">
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5 text-blue-500" />
                  Interactive Topology Graph
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  FP32_WEIGHTS_LIVE
                </span>
              </div>

              {/* Responsive SVG Flowchart */}
              <div className="w-full relative flex items-center justify-center">
                <svg className="w-full max-w-xl aspect-[16/10]" viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Grid Pattern inside Diagram */}
                  <defs>
                    <pattern id="diagGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-white/5" />
                    </pattern>
                  </defs>
                  <rect width="600" height="380" fill="url(#diagGrid)" rx="16" />

                  {/* Flow links (Arrows) */}
                  <g stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-white/10">
                    {/* LowRes to Preprocess */}
                    <path d="M 90,190 L 140,190" stroke="url(#flowBlue)" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                    {/* Preprocess to Generator */}
                    <path d="M 210,190 L 255,190" stroke="url(#flowBlue)" strokeWidth="3" markerEnd="url(#arrow-blue)" />
                    {/* Generator to Upsample */}
                    <path d="M 335,190 L 380,190" stroke="url(#flowTeal)" strokeWidth="3" markerEnd="url(#arrow-teal)" />
                    {/* Upsample to HighRes */}
                    <path d="M 455,190 L 500,190" stroke="url(#flowEmerald)" strokeWidth="3" markerEnd="url(#arrow-emerald)" />
                    
                    {/* Feedback loops during training */}
                    {/* HighRes down to Discriminator */}
                    <path d="M 525,215 L 525,290 L 450,290" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-red)" />
                    {/* Discriminator to Perceptual Loss */}
                    <path d="M 370,290 L 270,290" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-amber)" />
                    {/* Perceptual Loss feedback to Generator */}
                    <path d="M 210,290 L 180,290 L 180,220" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-blue-small)" />
                  </g>

                  {/* Node 1: Low Res Image Input */}
                  <g className="cursor-pointer" onClick={() => setActiveArchNode('lowres')}>
                    <rect x="20" y="155" width="70" height="70" rx="12" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'lowres' ? '#2563EB' : 'currentColor'} strokeWidth={activeArchNode === 'lowres' ? '3' : '1'} />
                    <circle cx="55" cy="190" r="15" fill="#3B82F6" fillOpacity="0.1" />
                    <foreignObject x="43" y="178" width="24" height="24">
                      <ImageIcon className={`w-6 h-6 ${activeArchNode === 'lowres' ? 'text-blue-500' : 'text-slate-400'}`} />
                    </foreignObject>
                    <text x="55" y="245" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-slate-300">Low-Res</text>
                  </g>

                  {/* Node 2: Image Preprocessing */}
                  <g className="cursor-pointer" onClick={() => setActiveArchNode('preprocess')}>
                    <rect x="140" y="160" width="70" height="60" rx="10" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'preprocess' ? '#3B82F6' : 'currentColor'} strokeWidth={activeArchNode === 'preprocess' ? '3' : '1'} />
                    <circle cx="175" cy="190" r="12" fill="#14B8A6" fillOpacity="0.1" />
                    <foreignObject x="165" y="180" width="20" height="20">
                      <Sliders className={`w-5 h-5 ${activeArchNode === 'preprocess' ? 'text-[#14B8A6]' : 'text-slate-400'}`} />
                    </foreignObject>
                    <text x="175" y="240" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-600 dark:fill-slate-400">Preprocessing</text>
                  </g>

                  {/* Node 3: Generator Network (RRDB) */}
                  <g className="cursor-pointer" onClick={() => setActiveArchNode('generator')}>
                    <rect x="255" y="150" width="80" height="80" rx="14" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'generator' ? '#14B8A6' : 'currentColor'} strokeWidth={activeArchNode === 'generator' ? '3' : '1'} />
                    <circle cx="295" cy="190" r="16" fill="#14B8A6" fillOpacity="0.1" />
                    <foreignObject x="283" y="178" width="24" height="24">
                      <Layers className={`w-6 h-6 ${activeArchNode === 'generator' ? 'text-teal-500' : 'text-slate-400'}`} />
                    </foreignObject>
                    <text x="295" y="250" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-slate-300">RRDB Gen</text>
                  </g>

                  {/* Node 4: Upsampling Layer */}
                  <g className="cursor-pointer" onClick={() => setActiveArchNode('upsample')}>
                    <rect x="380" y="160" width="75" height="60" rx="10" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'upsample' ? '#10B981' : 'currentColor'} strokeWidth={activeArchNode === 'upsample' ? '3' : '1'} />
                    <circle cx="417" cy="190" r="14" fill="#10B981" fillOpacity="0.1" />
                    <foreignObject x="407" y="180" width="20" height="20">
                      <Maximize className={`w-5 h-5 ${activeArchNode === 'upsample' ? 'text-emerald-500' : 'text-slate-400'}`} />
                    </foreignObject>
                    <text x="417" y="240" textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-600 dark:fill-slate-400">Pixel Shuffle</text>
                  </g>

                  {/* Node 5: Enhanced High Res Image */}
                  <g className="cursor-pointer" onClick={() => setActiveArchNode('highres')}>
                    <rect x="500" y="155" width="70" height="70" rx="12" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'highres' ? '#10B981' : 'currentColor'} strokeWidth={activeArchNode === 'highres' ? '3' : '1'} />
                    <circle cx="535" cy="190" r="15" fill="#10B981" fillOpacity="0.1" />
                    <foreignObject x="523" y="178" width="24" height="24">
                      <Sparkles className={`w-6 h-6 ${activeArchNode === 'highres' ? 'text-emerald-400' : 'text-slate-400'}`} />
                    </foreignObject>
                    <text x="535" y="245" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-slate-300">Enhanced 4K</text>
                  </g>

                  {/* Node 6: Discriminator */}
                  <g className="cursor-pointer" onClick={() => setActiveArchNode('discriminator')}>
                    <rect x="370" y="265" width="80" height="50" rx="8" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'discriminator' ? '#EF4444' : 'currentColor'} strokeWidth={activeArchNode === 'discriminator' ? '3' : '1'} />
                    <circle cx="410" cy="290" r="10" fill="#EF4444" fillOpacity="0.1" />
                    <foreignObject x="402" y="282" width="16" height="16">
                      <ShieldCheck className={`w-4 h-4 ${activeArchNode === 'discriminator' ? 'text-rose-500' : 'text-slate-400'}`} />
                    </foreignObject>
                    <text x="410" y="330" textAnchor="middle" className="text-[9px] font-sans font-bold fill-slate-600 dark:fill-slate-400">Discriminator</text>
                  </g>

                  {/* Node 7: Perceptual Loss */}
                  <g className="cursor-pointer" onClick={() => setActiveArchNode('loss')}>
                    <rect x="210" y="265" width="60" height="50" rx="8" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'loss' ? '#F59E0B' : 'currentColor'} strokeWidth={activeArchNode === 'loss' ? '3' : '1'} />
                    <circle cx="240" cy="290" r="10" fill="#F59E0B" fillOpacity="0.1" />
                    <foreignObject x="232" y="282" width="16" height="16">
                      <Activity className={`w-4 h-4 ${activeArchNode === 'loss' ? 'text-amber-500' : 'text-slate-400'}`} />
                    </foreignObject>
                    <text x="240" y="330" textAnchor="middle" className="text-[9px] font-sans font-bold fill-slate-600 dark:fill-slate-400">VGG Loss</text>
                  </g>

                  {/* Arrow Marker Definitions */}
                  <g>
                    <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B82F6" />
                    </marker>
                    <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#14B8A6" />
                    </marker>
                    <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
                    </marker>
                    <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#EF4444" />
                    </marker>
                    <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#F59E0B" />
                    </marker>
                    <marker id="arrow-blue-small" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B82F6" />
                    </marker>

                    <linearGradient id="flowBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                    <linearGradient id="flowTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14B8A6" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient id="flowEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </g>
                </svg>
              </div>

              {/* Quick tip text */}
              <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-blue-500/10 border border-blue-500/10 rounded-xl text-[10px] text-blue-700 dark:text-blue-300">
                <Info className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                <span>Interactivity Active: Hover or click on different sections of the graph to populate deep-dive documentation on the right.</span>
              </div>

            </div>

            {/* Right Side: Block Descriptions (5 Cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6 text-left shadow-sm min-h-[460px] relative overflow-hidden">
              <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {activeArchNode === 'lowres' && (
                  <motion.div key="lowres" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-500">Pipeline Ingest</span>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">Low-Resolution Image (LR)</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      The starting input source. Tensors of spatial size <strong>H × W × 3</strong> are passed to CUDA memory. Often suffers from JPEG artifacts, blockiness, color bleeding, and lack of fine details.
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                      <div>Input Format: PNG, JPG, WEBP</div>
                      <div className="mt-1">Inference Resolution: Up to 1080p source</div>
                      <div className="mt-1">Batch Sizing: Dynamic channel batch mapping</div>
                    </div>
                  </motion.div>
                )}

                {activeArchNode === 'preprocess' && (
                  <motion.div key="preprocess" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#14B8A6]">Mathematical Norm</span>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">Image Preprocessing</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Raw pixels are cast into floating-point numbers. Standard normalization divides rgb values by 255.0 to yield a stable range of <strong>[0.0, 1.0]</strong>. Mirror-reflect padding prevents edge boundary artifacts in subsequent convolution.
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                      <div>Range Conversion: [0, 255] → [0.0, 1.0]</div>
                      <div className="mt-1">Boundary Pad: Mirror reflective (10px)</div>
                      <div className="mt-1">Data Precision: float32 / float16 standard</div>
                    </div>
                  </motion.div>
                )}

                {activeArchNode === 'generator' && (
                  <motion.div key="generator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-teal-400 font-bold">The Core Model</span>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">Generator Network (RRDB)</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Composed of 23 Residual-in-Residual Dense Blocks. RRDB omits Batch Normalization (BN) layers, which saves 30% GPU memory and improves training stability. Dense multi-layer skip connections pass shallow visual features forward to preserve shape and edge contours.
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                      <div>Residual Blocks: 23 Dense Blocks</div>
                      <div className="mt-1">Weight Parameter: 16.7 Million</div>
                      <div className="mt-1">Inference Speed: FP16 cuda half-precision</div>
                    </div>
                  </motion.div>
                )}

                {activeArchNode === 'upsample' && (
                  <motion.div key="upsample" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">Scale Expansion</span>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">Pixel Shuffle Upsampler</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Instead of standard bicubic upsampling or transposed deconvolution (which produce pixel grid checkerboard artifacts), ESRGAN uses Sub-Pixel Convolution (Pixel Shuffle). Channels are multiplied by the square of the scale factor, then reorganized spatially to double or quadruple dimensions cleanly.
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                      <div>Grid Shuffler: Channel spatial translation</div>
                      <div className="mt-1">Upscale Factor: 2x, 4x compatible</div>
                      <div className="mt-1">Artifact Suppression: High-fidelity anti-ringing</div>
                    </div>
                  </motion.div>
                )}

                {activeArchNode === 'highres' && (
                  <motion.div key="highres" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 font-bold">The Output Stream</span>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">Enhanced High Resolution</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      The final output. Spatial size is exactly scaled (e.g. 4x). Pixel values are clamped to safe ranges and de-normalized back to integers <strong>[0, 255]</strong>. Edges are razor sharp, noise is completely eliminated, and textures look organic.
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                      <div>Peak Resolution: Scaled to 4K limits</div>
                      <div className="mt-1">Color Bitdepth: 8-bit or 16-bit Lossless PNG</div>
                      <div className="mt-1">Edge Contrast: Optimized local gradient delta</div>
                    </div>
                  </motion.div>
                )}

                {activeArchNode === 'discriminator' && (
                  <motion.div key="discriminator" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-500">Adversarial Judge</span>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">Relativistic Discriminator</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Used during model training. It predicts the probability that real training photos are more realistic than fake generated upscaled images. This relativistic formulation pushes the Generator to draw highly organic micro-textures instead of just copying blurred borders.
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                      <div>GAN Metric: Relativistic Average Loss (RaGAN)</div>
                      <div className="mt-1">Feature Space: VGG19 activation patterns</div>
                      <div className="mt-1">Target: Natural-looking texture synthesis</div>
                    </div>
                  </motion.div>
                )}

                {activeArchNode === 'loss' && (
                  <motion.div key="loss" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-500 font-bold">Optimization Goal</span>
                    <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white">Perceptual Loss (VGG-19)</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Rather than checking if pixels match perfectly (L1 pixel-to-pixel loss, which always produces blurred images), Perceptual Loss feeds both the generated image and target photo through a pre-trained VGG-19 network and compares intermediate activation grids (conv4_4). This forces the structural content and high-level patterns to align exactly.
                    </p>
                    <div className="p-3 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-mono text-slate-500">
                      <div>Feature Extractor: Pre-trained VGG-19 CNN</div>
                      <div className="mt-1">Primary Target layer: conv4_4 layer weights</div>
                      <div className="mt-1">Loss formulation: MSE of VGG activation vectors</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 3: IMAGE ENHANCEMENT WORKFLOW
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#14B8A6]">Pipeline Progression</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              End-to-End Image Enhancement Workflow
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              From the millisecond you drop your file on our web workspace, our system triggers a multi-pass, highly orchestrated visual reconstruction.
            </p>
          </div>

          {/* Workflow Scrollable Container */}
          <div className="relative overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-11 gap-4 min-w-[1200px] md:min-w-0">
              {[
                { label: 'User Upload', step: '01', desc: 'Secure local asset drag-and-drop ingestion', bg: 'bg-blue-500' },
                { label: 'File Validation', step: '02', desc: 'Pre-flight file extension & weight restrictions', bg: 'bg-indigo-500' },
                { label: 'Preprocessing', step: '03', desc: 'Matrix RGB casting and reflect boundary padding', bg: 'bg-teal-500' },
                { label: 'Inference Queue', step: '04', desc: 'Allocating high-throughput GPU memory buffers', bg: 'bg-emerald-500' },
                { label: 'Feature Extract', step: '05', desc: 'Extracting preliminary 64-channel spatial mappings', bg: 'bg-cyan-500' },
                { label: 'Texture Reconstruct', step: '06', desc: '23 Residual dense block forward weight loops', bg: 'bg-violet-500' },
                { label: 'Super Resolution', step: '07', desc: 'Channel shuffling expanding resolution by 400%', bg: 'bg-purple-500' },
                { label: 'Quality Tuning', step: '08', desc: 'Bilateral chrominance specular highlight tuning', bg: 'bg-rose-500' },
                { label: 'Asset Rendered', step: '09', desc: 'Clamping float tensors back into integer ranges', bg: 'bg-amber-500' },
                { label: 'Compare Slate', step: '10', desc: 'Generating interactive side-by-side workspace', bg: 'bg-emerald-600' },
                { label: 'Lossless Save', step: '11', desc: 'Triggering high-speed PNG/JPG local downloads', bg: 'bg-blue-600' }
              ].map((node, index) => (
                <div key={node.step} className="flex-1 min-w-[180px] md:min-w-0 flex flex-col items-center text-center relative group">
                  
                  {/* Staggered entry node dot */}
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 group-hover:border-blue-500 dark:group-hover:border-blue-500 shadow-md group-hover:shadow-blue-500/10 flex items-center justify-center transition-all duration-300 relative z-10 mb-4 hover:scale-110">
                    <span className={`text-xs font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500`}>
                      {node.step}
                    </span>
                  </div>

                  {/* Node Connections - SVG Arrows (Desktop only, absolutely positioned) */}
                  {index < 10 && (
                    <div className="hidden md:block absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-[2px] bg-gradient-to-r from-slate-200 to-slate-200 dark:from-white/5 dark:to-white/5 pointer-events-none z-0 group-hover:from-blue-500/50 group-hover:to-teal-500/50 transition-all duration-500">
                      <ChevronRight className="w-3 h-3 text-slate-300 dark:text-white/10 absolute right-[-5px] top-[-5px] group-hover:text-teal-400" />
                    </div>
                  )}

                  {/* Hover visual block */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#090d16]/30 border border-slate-200 dark:border-white/5 group-hover:border-blue-500/20 group-hover:bg-white dark:group-hover:bg-slate-900/50 shadow-sm transition-all duration-300 text-left w-full h-28">
                    <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight font-sans tracking-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {node.label}
                    </h4>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-normal leading-relaxed line-clamp-3 font-sans">
                      {node.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================
            SECTION 4: MODEL COMPONENTS
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#2563EB]">Core Mathematical Blocks</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              The Four Pillars of Super Resolution
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Unlike simplistic upscalers, ESRGAN distributes model tasks across dedicated operational zones to achieve maximum photorealism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Generator */}
            <div className="bg-slate-50/50 dark:bg-[#090d16]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between group shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">1. The Generator Net (RRDB)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Tasked with receiving a blurred input and synthesizing high-resolution textures. It uses <strong>Residual-in-Residual Dense Blocks (RRDB)</strong>, stacking dense convolutional layers with continuous skip-connections. Gradients flow backwards effortlessly, letting layers recover fine visual features.
                </p>
                <div className="p-3 bg-white dark:bg-[#020617] border border-slate-100 dark:border-white/5 rounded-xl font-mono text-[10px] text-slate-500">
                  <span className="text-[#14B8A6] font-bold">► Formula:</span> Y = β × F_dense(X) + X (Multi-Pass Skip Gradient)
                </div>
              </div>
            </div>

            {/* Card 2: Discriminator */}
            <div className="bg-slate-50/50 dark:bg-[#090d16]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:border-teal-500/20 transition-all duration-300 flex flex-col justify-between group shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-[#14B8A6] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">2. Relativistic Discriminator</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Instead of standard GAN discriminators that judge if an image is 100% "real or fake", ESRGAN uses a <strong>Relativistic average Discriminator (RaGAN)</strong>. It measures if the upscaled output is relatively "more realistic" than authentic dataset images, creating organic, high-frequency structures.
                </p>
                <div className="p-3 bg-white dark:bg-[#020617] border border-slate-100 dark:border-white/5 rounded-xl font-mono text-[10px] text-slate-500">
                  <span className="text-rose-500 font-bold">► Objective:</span> D_Ra(x_r, x_f) = σ(C(x_r) - E[C(x_f)])
                </div>
              </div>
            </div>

            {/* Card 3: Perceptual Loss */}
            <div className="bg-slate-50/50 dark:bg-[#090d16]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between group shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">3. VGG Perceptual Loss</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Standard L1 pixel losses calculate simple flat distances, rendering blurry boundaries. ESRGAN maps perceptual vectors extracted from deep layers of a pre-trained <strong>VGG-19</strong> neural net. The generator is penalized if the style, lighting, or details do not look organic.
                </p>
                <div className="p-3 bg-white dark:bg-[#020617] border border-slate-100 dark:border-white/5 rounded-xl font-mono text-[10px] text-slate-500">
                  <span className="text-[#2563EB] font-bold">► Layers:</span> Features extracted at conv4_4 activation map
                </div>
              </div>
            </div>

            {/* Card 4: Adversarial Training */}
            <div className="bg-slate-50/50 dark:bg-[#090d16]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-8 hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between group shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-[#FBBF24] flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">4. Min-Max Adversarial Loop</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  During high-intensity model training, the Generator (synthesizing details) and the Discriminator (classifying details) engage in a min-max game. Over millions of iterations, both networks refine each other recursively, achieving an organic, authentic detail synthesis.
                </p>
                <div className="p-3 bg-white dark:bg-[#020617] border border-slate-100 dark:border-white/5 rounded-xl font-mono text-[10px] text-slate-500">
                  <span className="text-amber-500 font-bold">► Target:</span> Global optimization of combined relativistic weights
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 5: WHY ESRGAN? (INTERACTIVE COMPARISON SLIDER)
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-emerald-400">Visual Quality Comparison</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              Bicubic Interpolation vs. ESRGAN Super-Resolution
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Drag the interactive slider back and forth to inspect how standard upscalers blur edges compared to ESRGAN's rich high-frequency detail reconstruction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[9px] font-mono uppercase font-bold text-slate-500 tracking-wider">Select Sample Asset</span>
              
              <div className="flex flex-col gap-2.5">
                {(Object.keys(compareAssets) as Array<keyof typeof compareAssets>).map((key) => {
                  const asset = compareAssets[key];
                  const isActive = compareAsset === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setCompareAsset(key);
                        setSliderPosition(50);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 relative overflow-hidden ${
                        isActive 
                          ? 'bg-slate-50 border-blue-500/40 dark:bg-slate-900/50 dark:border-blue-500/35 shadow-sm' 
                          : 'bg-white border-slate-200 dark:bg-transparent dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans">{asset.title}</h4>
                      <span className="text-[9px] font-mono text-slate-400">Asset category: {key.toUpperCase()}</span>
                      {isActive && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Technical features matrix comparison */}
              <div className="bg-slate-50 dark:bg-[#090d16]/40 border border-slate-200 dark:border-white/5 rounded-2xl p-5 space-y-3 font-sans">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block border-b border-slate-200 dark:border-white/10 pb-2">Technical Difference</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Edge Sharpness:</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">Extreme Delta</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Texture Synthesis:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Generative (GAN)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ringing Artifacts:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">0% Ringing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Color Fidelity:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">Clamped float32</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Slider Box (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div 
                ref={sliderContainerRef}
                onMouseDown={() => setIsSliding(true)}
                onMouseUp={() => setIsSliding(false)}
                onMouseLeave={() => setIsSliding(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsSliding(true)}
                onTouchEnd={() => setIsSliding(false)}
                onTouchMove={handleTouchMove}
                className="relative aspect-video w-full rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#020617]/80 overflow-hidden cursor-ew-resize shadow-lg group select-none"
              >
                {/* 1. Base Image - ESRGAN / High-Res (Right Layer) */}
                <img 
                  src={compareAssets[compareAsset].highRes} 
                  alt="Enhanced high-res upscaled asset"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* 2. Overlapping Image - Bicubic / Low-Res (Left Layer, clipped based on sliderPosition) */}
                <div 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                  }}
                >
                  <img 
                    src={compareAssets[compareAsset].lowRes} 
                    alt="Standard stretched low-res asset"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Left label badge (Bicubic) */}
                <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1 rounded-xl text-[10px] font-mono text-slate-300 z-10">
                  {compareAssets[compareAsset].lowLabel}
                </div>

                {/* Right label badge (ESRGAN) */}
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-teal-500 shadow-md border border-white/10 px-3 py-1 rounded-xl text-[10px] font-mono text-white font-semibold z-10">
                  {compareAssets[compareAsset].highLabel}
                </div>

                {/* Sliding separator handle bar */}
                <div 
                  className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)] cursor-ew-resize z-20 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Decorative sliding button center handle */}
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 flex items-center justify-center shadow-lg transform -translate-x-1/2">
                    <ArrowRightLeft className="w-4 h-4 text-blue-500" />
                  </div>
                </div>

                {/* Overlay instructions on first hover */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-sans font-medium text-slate-300 pointer-events-none tracking-wide flex items-center gap-1.5 opacity-80 group-hover:opacity-0 transition-opacity">
                  <Split className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                  <span>Drag slider left or right to compare details</span>
                </div>
              </div>

              {/* Resolution metrics readout bar */}
              <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50 dark:bg-[#111827]/40 border border-slate-200 dark:border-white/5 rounded-2xl text-[11px] font-sans">
                <span className="text-slate-500 font-medium">Interpolated crop: 150% stretch blur</span>
                <span className="text-teal-600 dark:text-teal-400 font-bold font-mono">ESRGAN: Reconstructed sub-pixel details</span>
              </div>
            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 6: TECHNICAL FEATURES
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#2563EB]">Technical Specs</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              Under the Hood Feature Set
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Optimized computational layers constructed on modern PyTorch, yielding exceptional throughput on active GPU workloads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Deep Residual Learning',
                desc: 'Bypasses standard convolution layers by learning isolated residual matrices, avoiding gradient degradation.',
                icon: Layers,
                tag: 'GRAD_STABLE'
              },
              {
                title: 'Residual-in-Residual Blocks',
                desc: 'Multi-layer dense skip-connections coupling continuous local gradients to bolster model representations.',
                icon: Cpu,
                tag: 'RRDB_V4'
              },
              {
                title: 'Relativistic GAN',
                desc: 'Predicts relative photorealism metrics, generating highly natural high-frequency textures.',
                icon: RefreshCw,
                tag: 'RAGAN_LOSS'
              },
              {
                title: 'VGG Perceptual Loss',
                desc: 'Evaluates global shape alignments in high-level feature spaces rather than individual pixel spaces.',
                icon: Eye,
                tag: 'VGG19_CONV4'
              },
              {
                title: 'Pixel Shuffle Upsampler',
                desc: 'Efficient sub-pixel convolutions expanding spatial channels cleanly, eliminating grid artifact boundaries.',
                icon: Maximize2,
                tag: 'I_2D_SHUFFLE'
              },
              {
                title: 'High Fidelity Output',
                desc: 'Guarantees structural shape preservation by clamping float ranges and running anti-aliasing passes.',
                icon: ShieldCheck,
                tag: 'SSIM_OPTIMIZED'
              },
              {
                title: 'Organic Texture Synthesis',
                desc: 'Intelligently recreates realistic fibers, hair pores, concrete, and foliage based on context cues.',
                icon: Sparkles,
                tag: 'GAN_SYNTHESIS'
              },
              {
                title: 'Fast GPU Inference',
                desc: 'Extremely optimized tensor pools running within milliseconds using FP16 CUDA half-precision.',
                icon: Zap,
                tag: 'FP16_CUDA_SPEED'
              }
            ].map((feature, i) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-white dark:bg-[#090d16]/35 border border-slate-200 dark:border-white/5 rounded-2xl p-6 hover:border-blue-500/25 dark:hover:border-blue-500/25 transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500/10 to-teal-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10 flex items-center justify-center group-hover:scale-105 duration-300">
                        <IconComp className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[8px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-white/5 dark:text-slate-400 px-2 py-0.5 rounded">
                        {feature.tag}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans">{feature.title}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal leading-relaxed font-sans">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==============================================
            SECTION 7: AI PIPELINE STATISTICS
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-blue-500">Pipeline Performance</span>
              <h2 className="text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                High-Density Scaling Metrics
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Our model operates on a custom PyTorch backend optimized for low-latency client delivery, ensuring rapid image rendering across multiple output dimensions.
              </p>
            </div>

            {/* Performance Stats Cards (8 Cols) */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Active Model', val: 'Real-ESRGAN x4+', desc: 'Stable multi-pass CNN weights', icon: Cpu },
                { label: 'Training Library', val: 'PyTorch 2.1', desc: 'Accelerated tensor backend', icon: Activity },
                { label: 'Symmetric Scaling', val: '4× Super-Res', desc: '16× total pixel count expansion', icon: Maximize2 },
                { label: 'Output Streams', val: 'PNG / JPG / WEBP', desc: 'Lossless & optimized configurations', icon: FileText },
                { label: 'Device Target', val: 'CUDA Accelerated', desc: 'FP16 half-precision tensor pools', icon: Zap },
                { label: 'Latency simulation', val: '3.12 Seconds', desc: 'Inference speed for standard inputs', icon: BarChart3 }
              ].map((stat) => {
                const IconComp = stat.icon;
                return (
                  <div key={stat.label} className="p-5 bg-slate-50/70 dark:bg-[#111827]/25 border border-slate-200 dark:border-white/5 rounded-2xl flex flex-col justify-between text-left space-y-3 shadow-sm hover:border-blue-500/10 duration-200">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase block text-slate-500">{stat.label}</span>
                      <span className="text-sm font-sans font-bold text-slate-900 dark:text-white tracking-tight mt-0.5 block">{stat.val}</span>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block leading-normal">{stat.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 8: INTERACTIVE WORKFLOW ANIMATION
           ============================================== */}
        <section className="py-20 border-b border-slate-200 dark:border-white/10 text-left">
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#14B8A6]">Visual Simulator</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              Interactive Workflow Animation
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              Experience a simulated execution sequence of the Real-ESRGAN upscaler. Select a step to dissect tensor shapes, mathematical weights, and log readouts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive workflow sidebar (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center text-left">
              {[
                { idx: 0, title: '1. Tensor Ingestion', summary: 'Normalization of raw RGB arrays into float tensors.', detail: 'Divides color integers [0-255] by 255.0 to map range [0.0, 1.0]. Peak memory buffers are allocated dynamically on active GPU grids.' },
                { idx: 1, title: '2. Shallow Feature Extract', summary: '3x3 convolution extracts 64 channel maps.', detail: 'Runs early weight transformations through Conv2D (in_channels=3, out_channels=64, kernel=3x3, padding=1), mapping visual contours.' },
                { idx: 2, title: '3. Deep RRDB Processing', summary: '23 Residual dense blocks synthesize textures.', detail: 'Optimized model passes bypass Batch Normalization. Passes shallow gradients continuously to deeply nested layers, preserving boundaries.' },
                { idx: 3, title: '4. Sub-Pixel Shuffle Upscale', summary: 'Channel redistribution expands dimensions.', detail: 'Translates 1024 high-dimension maps back down into 64 clean spatial maps, multiplying resolution 400% without aliasing.' },
                { idx: 4, title: '5. Post-Process & Lossless Save', summary: 'Clamping float tensors to write raw PNG streams.', detail: 'Clamps values back into standard 8-bit rgb constraints, applying anti-ringing algorithms to output lossless, detailed images.' }
              ].map((step) => {
                const isActive = activeWorkflowIndex === step.idx;
                return (
                  <button
                    key={step.idx}
                    onClick={() => {
                      setActiveWorkflowIndex(step.idx);
                      setIsAutoPlaying(false); // Stop auto playing on click
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      isActive 
                        ? 'bg-slate-50 border-[#14B8A6]/40 dark:bg-[#090d16]/70 dark:border-[#14B8A6]/40 shadow-sm' 
                        : 'bg-white border-slate-200 dark:bg-transparent dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className={`text-xs font-bold font-sans ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {step.title}
                      </h4>
                      {isActive && (
                        <span className="text-[8px] font-mono font-bold text-[#14B8A6] bg-[#14B8A6]/10 px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                          ACTIVE_NODE
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-sans leading-normal line-clamp-1">{step.summary}</p>
                    
                    {/* Expanded technical specifications drawer */}
                    {isActive && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-[10px] text-slate-600 dark:text-slate-400 font-sans leading-normal leading-relaxed mt-2.5 border-t border-slate-200 dark:border-white/5 pt-2 font-normal text-left"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </button>
                );
              })}

              {/* Play / Pause toggle controls */}
              <div className="flex items-center gap-3 mt-1.5 self-start px-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isAutoPlaying 
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-[#FBBF24]' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-[#14B8A6]'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${isAutoPlaying ? 'animate-spin' : ''}`} />
                  {isAutoPlaying ? 'Pause Auto-Cycle' : 'Play Auto-Cycle'}
                </button>
                <span className="text-[9px] text-slate-400 font-mono italic">
                  Cycle Interval: 4.5s
                </span>
              </div>
            </div>

            {/* Simulated Live Console logs (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 dark:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between text-left shadow-lg">
              
              {/* Console header */}
              <div className="flex items-center justify-between border-b border-slate-800 dark:border-white/5 pb-3 mb-4 font-mono">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  NVIDIA_A100_SXM4 GPU Log Console
                </span>
                <span className="text-[9px] text-slate-500">
                  DEVICE_ID: GPU_CORE_0
                </span>
              </div>

              {/* Live Simulated Logs content */}
              <div className="font-mono text-[10px] md:text-xs text-slate-300 leading-relaxed min-h-[160px] flex flex-col gap-2 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {simulationLogs.map((log, i) => {
                    const isSuccess = log.includes('[SUCCESS]');
                    const isTask = log.includes('►') || log.includes('⌛');
                    return (
                      <motion.div
                        key={`${activeWorkflowIndex}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.08 }}
                        className={`${
                          isSuccess 
                            ? 'text-emerald-400 font-semibold' 
                            : isTask 
                              ? 'text-blue-400 font-semibold' 
                              : 'text-slate-400'
                        }`}
                      >
                        {log}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Console footer stats */}
              <div className="border-t border-slate-800 dark:border-white/5 pt-4 mt-4 flex justify-between items-center font-mono text-[9px] text-slate-500">
                <div>Memory Allocated: 1,412 MB / 40,960 MB</div>
                <div>Status: SIMULATOR_ACTIVE</div>
              </div>

            </div>

          </div>
        </section>

        {/* ==============================================
            SECTION 9: CALL TO ACTION
           ============================================== */}
        <section className="py-16 text-center relative overflow-hidden">
          {/* Neon background circle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-600/10 to-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-600 dark:text-teal-400 font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              ImageEnhancer AI Tool suite
            </div>
            
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Ready to Experience AI Super Resolution?
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-sans">
              Experience the Real-ESRGAN x4+ model live. Upload your asset, trigger neural processing steps, and download 4K lossless prints.
            </p>

            <div className="flex justify-center items-center gap-4 pt-3">
              <button
                onClick={() => onNavigate?.('home')}
                className="px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-md shadow-blue-500/15 duration-300 transition-all cursor-pointer hover:scale-[1.02]"
              >
                Try Image Enhancement
              </button>
              <button
                onClick={() => setShowSpecsModal(true)}
                className="px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-700 dark:text-[#CBD5E1] bg-slate-100 hover:bg-slate-200 dark:bg-[#111827] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 duration-300 transition-all cursor-pointer"
              >
                View Model Specifications
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ==============================================
          TECHNICAL SPECIFICATIONS MODAL
         ============================================== */}
      <AnimatePresence>
        {showSpecsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpecsModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal box body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#090d16] border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto shadow-2xl text-left"
            >
              {/* Header with Title */}
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-blue-500 tracking-wider">Model Config Card</span>
                  <h3 className="text-xl font-sans font-bold text-slate-900 dark:text-white mt-0.5">Real-ESRGAN x4+ Model Specifications</h3>
                </div>
                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer font-bold font-sans text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Table / Details spec content */}
              <div className="space-y-6">
                
                {/* Intro block */}
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  The primary network weight utilized in our pipeline is <code>RealESRGAN_x4plus.pth</code>, optimized for general photography and complex textures, built on PyTorch.
                </p>

                {/* Table list */}
                <div className="divide-y divide-slate-150 dark:divide-white/5 text-xs font-sans">
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Model Architecture:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">RRDBNet (23 blocks, 32 grow channels)</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Input Channels:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">3 (RGB Color channels)</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Output Channels:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">3 (RGB Color channels)</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Feature Maps Width:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">64 Channel Maps</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Parameter Count:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">16.7 Million float32 weights</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Supported Scales:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">2×, 4× Symmetric Upscaling</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Computational Ops:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">~36.8 TFLOPs (Inference peak)</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Target Frameworks:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">PyTorch 2.1+, LibTorch C++, ONNX 1.15+</span>
                  </div>
                  <div className="py-3 flex justify-between">
                    <span className="text-slate-500">Device Backends:</span>
                    <span className="font-bold text-slate-800 dark:text-white font-mono">NVIDIA CUDA, Apple Metal MPS, Vulkan NCNN</span>
                  </div>
                </div>

                {/* Footer disclaimer */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 rounded-2xl flex items-start gap-2 text-[10px] text-slate-500 leading-normal leading-relaxed">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>The weights referenced are released under the BSD-3-Clause License from scientific publication outputs "Real-ESRGAN: Training Real-World Blind Image Super-Resolution with Pure Synthetic Data" (ICCV 2021 Workshops).</span>
                </div>

                {/* Confirm dismiss button */}
                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-150 font-bold text-xs uppercase tracking-wider cursor-pointer text-center"
                >
                  Dismiss Specifications Card
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
