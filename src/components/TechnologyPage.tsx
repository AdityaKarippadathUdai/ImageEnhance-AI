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

const ARCH_NODE_TOOLTIPS: Record<string, { title: string; subtitle: string; desc: string; metric: string; color: string; centerX: number; centerY: number }> = {
  lowres: {
    title: 'Low-Res Input',
    subtitle: 'Pipeline Ingest',
    desc: 'Passes raw H × W × 3 float32 RGB pixel tensors into CUDA device memory.',
    metric: 'Input Shape: [1, 3, H, W]',
    color: 'from-blue-500 to-indigo-500',
    centerX: 80,
    centerY: 150,
  },
  conv: {
    title: 'Convolution Layer',
    subtitle: 'Feature Extractor',
    desc: 'Extracts low-level structural features using 3×3 convolution operations, maps channels to 64 dimensions.',
    metric: 'Kernel: 3×3 | Strides: 1',
    color: 'from-blue-500 to-cyan-500',
    centerX: 205,
    centerY: 165,
  },
  rrdb: {
    title: 'RRDB Block',
    subtitle: 'Feature Synthesizer',
    desc: '23 stacked Residual-in-Residual Dense Blocks without Batch Normalization layers to generate rich textures.',
    metric: 'Depth: 23 Blocks | Params: ~16.7M',
    color: 'from-emerald-500 to-green-500',
    centerX: 385,
    centerY: 165,
  },
  upsample: {
    title: 'Pixel Shuffle',
    subtitle: 'Upsampling Layer',
    desc: 'Uses sub-pixel convolution to reorganize deep channels spatially for crystal-clear 4x scaling.',
    metric: 'Algorithm: Sub-Pixel Convolution',
    color: 'from-amber-500 to-yellow-500',
    centerX: 652,
    centerY: 165,
  },
  highres: {
    title: 'Enhanced 4K',
    subtitle: 'Output Stream',
    desc: 'Clamps features back to standard [0, 255] integer range to write pristine lossless RGB images.',
    metric: 'Output Shape: [1, 3, 4H, 4W]',
    color: 'from-emerald-500 to-teal-500',
    centerX: 897,
    centerY: 150,
  },
  discriminator: {
    title: 'Discriminator',
    subtitle: 'Adversarial Judge',
    desc: 'A relativistic CNN evaluating whether real database photos are more realistic than generated frames.',
    metric: 'Formulation: Relativistic GAN',
    color: 'from-purple-500 to-indigo-600',
    centerX: 485,
    centerY: 385,
  },
  skip: {
    title: 'Skip Connections',
    subtitle: 'Gradient Highway',
    desc: 'Sums low-frequency identity features directly into upscaling states to preserve global shapes and colors.',
    metric: 'Operation: Element-wise addition (+)',
    color: 'from-teal-500 to-cyan-500',
    centerX: 545,
    centerY: 155,
  },
};

export default function TechnologyPage({ onNavigate }: TechnologyPageProps) {
  // Section 2: Architecture interactive node selector
  const [activeArchNode, setActiveArchNode] = useState<string>('rrdb');
  const [hoveredArchNode, setHoveredArchNode] = useState<string | null>(null);

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
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#2563EB] bg-blue-500/10 px-3 py-1 rounded-full">Model Architecture</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">
              ESRGAN Architecture Diagram
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
              ESRGAN consists of a generator network for image super-resolution and a discriminator network for adversarial training. The generator uses Residual-in-Residual Dense Blocks (RRDB) to recover rich textures and details.
            </p>
          </div>

          <div className="space-y-10">
            {/* Interactive SVG Diagram Container */}
            <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
              {/* Diagram Header Banner */}
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3 mb-6">
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5 text-blue-500" />
                  Interactive ESRGAN Flowchart
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  FP32_WEIGHTS_LIVE
                </span>
              </div>

              {/* SVG Block */}
              <div className="w-full relative flex items-center justify-center">
                <svg className="w-full max-w-5xl aspect-[1000/520]" viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Grid Pattern inside Diagram */}
                  <defs>
                    <pattern id="diagGridDetailed" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-white/5" />
                    </pattern>

                    {/* Arrow Marker Definitions */}
                    <marker id="arrow-blue-det" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B82F6" />
                    </marker>
                    <marker id="arrow-green-det" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
                    </marker>
                    <marker id="arrow-yellow-det" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#F59E0B" />
                    </marker>
                    <marker id="arrow-purple-det" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1 L 10 5 L 0 9 z" fill="#8B5CF6" />
                    </marker>
                  </defs>

                  <rect width="1000" height="520" fill="url(#diagGridDetailed)" rx="20" />

                  {/* Flow Links (Arrows) with Hex colors to resolve rendering across all clients */}
                  <g strokeWidth="2.5">
                    {/* LowRes to G input */}
                    <path d="M 145,150 L 180,150" stroke="#3B82F6" markerEnd="url(#arrow-blue-det)" />
                    {/* G Conv 3x3 to RRDB */}
                    <path d="M 225,150 L 240,150" stroke="#3B82F6" markerEnd="url(#arrow-blue-det)" strokeDasharray="3 3" />
                    {/* RRDB block internal link to output */}
                    <path d="M 525,150 L 535,150" stroke="#10B981" />
                    {/* Sum (+) to Conv 3x3 */}
                    <path d="M 555,150 L 570,150" stroke="#3B82F6" markerEnd="url(#arrow-blue-det)" />
                    {/* Conv 3x3 to Upsample 1 */}
                    <path d="M 610,150 L 625,150" stroke="#3B82F6" markerEnd="url(#arrow-blue-det)" />
                    {/* Upsample 1 to Upsample 2 */}
                    <path d="M 665,150 L 680,150" stroke="#F59E0B" markerEnd="url(#arrow-yellow-det)" />
                    {/* Upsample 2 to Conv 3x3 */}
                    <path d="M 720,150 L 735,150" stroke="#F59E0B" markerEnd="url(#arrow-yellow-det)" />
                    {/* Conv 3x3 output of G to HighRes card */}
                    <path d="M 775,150 L 820,150" stroke="#10B981" markerEnd="url(#arrow-green-det)" />

                    {/* Adversarial feedback dotted lines */}
                    <path d="M 205,110 L 205,25" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 205,25 L 485,25" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 485,25 L 485,290" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" />
                    <path d="M 755,110 L 755,25" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" />
                  </g>

                  {/* Adversarial feedback label */}
                  <rect x="420" y="15" width="130" height="20" rx="6" fill="#8B5CF6" />
                  <text x="485" y="28" textAnchor="middle" fill="#FFFFFF" className="text-[9px] font-mono font-bold tracking-wider uppercase">Adversarial Feedback</text>

                  {/* 1. Low Resolution Input Card */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('lowres')}
                    onMouseEnter={() => setHoveredArchNode('lowres')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="15" y="55" width="130" height="190" rx="16" fill="white" className="dark:fill-[#0B0F19]" stroke={activeArchNode === 'lowres' ? '#3B82F6' : '#E2E8F0'} strokeWidth={activeArchNode === 'lowres' ? '3' : '1.5'} style={{ stroke: activeArchNode === 'lowres' ? '#3B82F6' : 'rgba(148,163,184,0.15)' }} />
                    <text x="80" y="80" textAnchor="middle" className="text-[10px] font-bold fill-blue-600 dark:fill-blue-400 font-sans">Low Resolution</text>
                    <text x="80" y="94" textAnchor="middle" className="text-[10px] font-bold fill-blue-600 dark:fill-blue-400 font-sans">Input Image</text>
                    <image 
                      href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=200" 
                      x="25" y="110" width="110" height="75" rx="8" 
                      style={{ filter: 'blur(3px) contrast(1.1)', imageRendering: 'pixelated' }} 
                    />
                    <text x="80" y="205" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-500 dark:fill-slate-400">x (LR)</text>
                    <text x="80" y="220" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 dark:fill-slate-500">(Input)</text>
                  </g>

                  {/* 2. Generator Network (G) Container Box */}
                  <rect x="170" y="50" width="620" height="200" rx="20" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 5" className="opacity-70" />
                  <text x="480" y="75" textAnchor="middle" className="text-xs font-extrabold fill-blue-600 dark:fill-blue-400 tracking-wider uppercase">Generator Network (G)</text>

                  {/* Generator Sub-blocks */}
                  {/* Conv 3x3 (Blue) */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('conv')}
                    onMouseEnter={() => setHoveredArchNode('conv')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="185" y="100" width="40" height="135" rx="10" fill="#3B82F6" fillOpacity={activeArchNode === 'conv' ? '1' : '0.15'} stroke="#3B82F6" strokeWidth="2" />
                    <text x="205" y="150" textAnchor="middle" fill={activeArchNode === 'conv' ? 'white' : 'currentColor'} className="text-[10px] font-bold writing-mode-vertical fill-slate-700 dark:fill-slate-300 transform rotate-90 origin-center" style={{ writingMode: 'vertical-rl' }}>Conv 3×3</text>
                  </g>

                  {/* RRDB Outer Border (Dashed Green) */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('rrdb')}
                    onMouseEnter={() => setHoveredArchNode('rrdb')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="240" y="95" width="285" height="145" rx="14" fill="#10B981" fillOpacity="0.04" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="382" y="114" textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-600 dark:fill-emerald-400 uppercase tracking-wide">Residual-in-Residual Dense Blocks (RRDB)</text>

                    {/* RRDB 1 Block */}
                    <g>
                      <rect x="255" y="130" width="60" height="60" rx="8" fill="#10B981" fillOpacity={activeArchNode === 'rrdb' ? '0.3' : '0.1'} stroke="#10B981" strokeWidth="1.5" />
                      <text x="285" y="160" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400">RRDB 1</text>
                    </g>
                    {/* Arrow between 1 and 2 */}
                    <path d="M 315,160 L 330,160" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-green-det)" />

                    {/* RRDB 2 Block */}
                    <g>
                      <rect x="330" y="130" width="60" height="60" rx="8" fill="#10B981" fillOpacity={activeArchNode === 'rrdb' ? '0.3' : '0.1'} stroke="#10B981" strokeWidth="1.5" />
                      <text x="360" y="160" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400">RRDB 2</text>
                    </g>
                    {/* Arrow between 2 and ellipsis */}
                    <path d="M 390,160 L 405,160" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-green-det)" />

                    {/* Ellipsis text */}
                    <text x="422" y="162" textAnchor="middle" className="text-base font-bold fill-emerald-600 dark:fill-emerald-400">...</text>
                    {/* Arrow between ellipsis and N */}
                    <path d="M 440,160 L 455,160" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#arrow-green-det)" />

                    {/* RRDB N Block */}
                    <g>
                      <rect x="455" y="130" width="60" height="60" rx="8" fill="#10B981" fillOpacity={activeArchNode === 'rrdb' ? '0.3' : '0.1'} stroke="#10B981" strokeWidth="1.5" />
                      <text x="485" y="160" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400">RRDB N</text>
                    </g>

                    {/* G long skip connection line */}
                    <path d="M 235,160 L 235,220 L 545,220 L 545,168" stroke="#000000" strokeWidth="1.5" fill="none" className="dark:stroke-white opacity-40" />
                  </g>

                  {/* Element-wise addition circle node (+) */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('skip')}
                    onMouseEnter={() => setHoveredArchNode('skip')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <circle cx="545" cy="150" r="10" fill="white" className="dark:fill-slate-900" stroke={activeArchNode === 'skip' ? '#14B8A6' : '#64748B'} strokeWidth="2" />
                    <text x="545" y="154" textAnchor="middle" className="text-xs font-extrabold fill-slate-700 dark:fill-slate-300">+</text>
                  </g>

                  {/* Conv 3x3 (Blue) Post-RRDB */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('conv')}
                    onMouseEnter={() => setHoveredArchNode('conv')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="570" y="100" width="40" height="135" rx="10" fill="#3B82F6" fillOpacity={activeArchNode === 'conv' ? '1' : '0.15'} stroke="#3B82F6" strokeWidth="2" />
                    <text x="590" y="150" textAnchor="middle" fill={activeArchNode === 'conv' ? 'white' : 'currentColor'} className="text-[10px] font-bold writing-mode-vertical fill-slate-700 dark:fill-slate-300" style={{ writingMode: 'vertical-rl' }}>Conv 3×3</text>
                  </g>

                  {/* Upsample 1 (Yellow) */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('upsample')}
                    onMouseEnter={() => setHoveredArchNode('upsample')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="625" y="100" width="40" height="135" rx="10" fill="#F59E0B" fillOpacity={activeArchNode === 'upsample' ? '1' : '0.15'} stroke="#F59E0B" strokeWidth="2" />
                    <text x="645" y="150" textAnchor="middle" fill={activeArchNode === 'upsample' ? 'white' : 'currentColor'} className="text-[10px] font-bold writing-mode-vertical fill-slate-700 dark:fill-slate-300" style={{ writingMode: 'vertical-rl' }}>Upsample (×2)</text>
                  </g>

                  {/* Upsample 2 (Yellow) */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('upsample')}
                    onMouseEnter={() => setHoveredArchNode('upsample')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="680" y="100" width="40" height="135" rx="10" fill="#F59E0B" fillOpacity={activeArchNode === 'upsample' ? '1' : '0.15'} stroke="#F59E0B" strokeWidth="2" />
                    <text x="700" y="150" textAnchor="middle" fill={activeArchNode === 'upsample' ? 'white' : 'currentColor'} className="text-[10px] font-bold writing-mode-vertical fill-slate-700 dark:fill-slate-300" style={{ writingMode: 'vertical-rl' }}>Upsample (×2)</text>
                  </g>

                  {/* Conv 3x3 (Blue) Output */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('conv')}
                    onMouseEnter={() => setHoveredArchNode('conv')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="735" y="100" width="40" height="135" rx="10" fill="#3B82F6" fillOpacity={activeArchNode === 'conv' ? '1' : '0.15'} stroke="#3B82F6" strokeWidth="2" />
                    <text x="755" y="150" textAnchor="middle" fill={activeArchNode === 'conv' ? 'white' : 'currentColor'} className="text-[10px] font-bold writing-mode-vertical fill-slate-700 dark:fill-slate-300" style={{ writingMode: 'vertical-rl' }}>Conv 3×3</text>
                  </g>

                  {/* 3. High Resolution Output Card */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('highres')}
                    onMouseEnter={() => setHoveredArchNode('highres')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="825" y="55" width="145" height="190" rx="16" fill="white" className="dark:fill-[#0B0F19]" stroke={activeArchNode === 'highres' ? '#10B981' : '#E2E8F0'} strokeWidth={activeArchNode === 'highres' ? '3' : '1.5'} style={{ stroke: activeArchNode === 'highres' ? '#10B981' : 'rgba(148,163,184,0.15)' }} />
                    <text x="897" y="80" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400 font-sans">High Resolution</text>
                    <text x="897" y="94" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400 font-sans">Output Image</text>
                    <image 
                      href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400" 
                      x="835" y="110" width="125" height="75" rx="8" 
                    />
                    <text x="897" y="205" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-500 dark:fill-slate-400">y (SR)</text>
                    <text x="897" y="220" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 dark:fill-slate-500">(Output)</text>
                  </g>


                  {/* 4. Discriminator Network (D) Container */}
                  <g 
                    className="cursor-pointer"
                    onClick={() => setActiveArchNode('discriminator')}
                    onMouseEnter={() => setHoveredArchNode('discriminator')}
                    onMouseLeave={() => setHoveredArchNode(null)}
                  >
                    <rect x="170" y="290" width="620" height="195" rx="20" fill="#8B5CF6" fillOpacity="0.02" stroke="#8B5CF6" strokeWidth={activeArchNode === 'discriminator' ? '2.5' : '1.5'} strokeDasharray={activeArchNode === 'discriminator' ? 'none' : '5 5'} style={{ stroke: '#8B5CF6' }} />
                    <text x="480" y="315" textAnchor="middle" className="text-xs font-extrabold fill-purple-600 dark:fill-purple-400 tracking-wider uppercase">Discriminator Network (D)</text>

                    {/* Left: Input Selection */}
                    <g>
                      {/* Real HR Image Card */}
                      <rect x="185" y="335" width="75" height="42" rx="8" fill="white" className="dark:fill-[#0B0F19]" stroke="#CBD5E1" strokeWidth="1" style={{ stroke: 'rgba(148,163,184,0.15)' }} />
                      <text x="222" y="348" textAnchor="middle" className="text-[7.5px] font-sans font-semibold fill-slate-600 dark:fill-slate-400">Real HR Image</text>
                      <text x="222" y="357" textAnchor="middle" className="text-[6.5px] font-mono fill-slate-400 dark:fill-slate-500">(From Dataset)</text>
                      <image href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=50" x="195" y="361" width="55" height="12" rx="2" />

                      {/* Generated HR Image Card */}
                      <rect x="185" y="415" width="75" height="42" rx="8" fill="white" className="dark:fill-[#0B0F19]" stroke="#CBD5E1" strokeWidth="1" style={{ stroke: 'rgba(148,163,184,0.15)' }} />
                      <text x="222" y="428" textAnchor="middle" className="text-[7.5px] font-sans font-semibold fill-slate-600 dark:fill-slate-400">Generated HR</text>
                      <text x="222" y="437" textAnchor="middle" className="text-[6.5px] font-mono fill-slate-400 dark:fill-slate-500">(From Generator)</text>
                      <image href="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=50" x="195" y="441" width="55" height="12" rx="2" style={{ filter: 'blur(1px)' }} />

                      {/* Converging Bracket paths */}
                      <path d="M 260,356 L 285,356 L 285,396" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
                      <path d="M 260,436 L 285,436 L 285,396" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
                      {/* Arrow into Conv Block 1 */}
                      <path d="M 285,396 L 315,396" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#arrow-purple-det)" />
                    </g>

                    {/* Center: Conv Blocks */}
                    {/* Conv Block 1 */}
                    <g>
                      <rect x="320" y="345" width="32" height="100" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1" />
                      <text x="336" y="398" textAnchor="middle" className="text-[8px] font-bold writing-mode-vertical fill-purple-700 dark:fill-purple-300" style={{ writingMode: 'vertical-rl' }}>Conv 1</text>
                    </g>
                    {/* Arrow 1-2 */}
                    <path d="M 352,396 L 368,396" stroke="#8B5CF6" strokeWidth="1" />

                    {/* Conv Block 2 */}
                    <g>
                      <rect x="370" y="345" width="32" height="100" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1" />
                      <text x="386" y="398" textAnchor="middle" className="text-[8px] font-bold writing-mode-vertical fill-purple-700 dark:fill-purple-300" style={{ writingMode: 'vertical-rl' }}>Conv 2</text>
                    </g>
                    {/* Arrow 2-3 */}
                    <path d="M 402,396 L 418,396" stroke="#8B5CF6" strokeWidth="1" />

                    {/* Conv Block 3 */}
                    <g>
                      <rect x="420" y="345" width="32" height="100" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1" />
                      <text x="436" y="398" textAnchor="middle" className="text-[8px] font-bold writing-mode-vertical fill-purple-700 dark:fill-purple-300" style={{ writingMode: 'vertical-rl' }}>Conv 3</text>
                    </g>
                    {/* Arrow 3-4 */}
                    <path d="M 452,396 L 468,396" stroke="#8B5CF6" strokeWidth="1" />

                    {/* Conv Block 4 */}
                    <g>
                      <rect x="470" y="345" width="32" height="100" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1" />
                      <text x="486" y="398" textAnchor="middle" className="text-[8px] font-bold writing-mode-vertical fill-purple-700 dark:fill-purple-300" style={{ writingMode: 'vertical-rl' }}>Conv 4</text>
                    </g>
                    {/* Arrow 4-5 */}
                    <path d="M 502,396 L 518,396" stroke="#8B5CF6" strokeWidth="1" />

                    {/* Conv Block 5 */}
                    <g>
                      <rect x="520" y="345" width="32" height="100" rx="6" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1" />
                      <text x="536" y="398" textAnchor="middle" className="text-[8px] font-bold writing-mode-vertical fill-purple-700 dark:fill-purple-300" style={{ writingMode: 'vertical-rl' }}>Conv 5</text>
                    </g>
                    {/* Arrow 5-Dense */}
                    <path d="M 552,396 L 568,396" stroke="#8B5CF6" strokeWidth="1" />

                    {/* Dense Layer */}
                    <g>
                      <rect x="570" y="345" width="32" height="100" rx="6" fill="#6366F1" fillOpacity="0.2" stroke="#6366F1" strokeWidth="1" />
                      <text x="586" y="398" textAnchor="middle" className="text-[8px] font-bold writing-mode-vertical fill-indigo-700 dark:fill-indigo-300" style={{ writingMode: 'vertical-rl' }}>Dense</text>
                    </g>
                    {/* Arrow Dense-Output */}
                    <path d="M 602,396 L 640,396" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#arrow-purple-det)" />

                    {/* Right: Output Probability */}
                    <g>
                      {/* Interactive bars */}
                      <rect x="645" y="380" width="6" height="32" rx="2" fill="#8B5CF6" />
                      <rect x="655" y="365" width="6" height="47" rx="2" fill="#10B981" />
                      <rect x="665" y="390" width="6" height="22" rx="2" fill="#3B82F6" />

                      <text x="690" y="390" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-200 font-sans">Real or Fake?</text>
                      <text x="690" y="402" className="text-[8.5px] font-mono fill-slate-500 dark:fill-slate-400">(Probability)</text>
                    </g>
                  </g>

                  {/* 5. Legend Box */}
                  <g>
                    <rect x="825" y="290" width="145" height="195" rx="20" fill="white" className="dark:fill-[#0B0F19]" stroke="#CBD5E1" strokeWidth="1" style={{ stroke: 'rgba(148,163,184,0.15)' }} />
                    <text x="840" y="318" className="text-xs font-bold fill-slate-800 dark:fill-slate-200">Legend</text>

                    {/* Row 1: Convolution */}
                    <rect x="840" y="336" width="12" height="12" rx="3" fill="#3B82F6" />
                    <text x="860" y="346" className="text-[9.5px] font-medium fill-slate-600 dark:fill-slate-400">Convolution Layer</text>

                    {/* Row 2: RRDB Block */}
                    <rect x="840" y="364" width="12" height="12" rx="3" fill="#10B981" />
                    <text x="860" y="374" className="text-[9.5px] font-medium fill-slate-600 dark:fill-slate-400">RRDB Block</text>

                    {/* Row 3: Upsampling Layer */}
                    <rect x="840" y="392" width="12" height="12" rx="3" fill="#F59E0B" />
                    <text x="860" y="402" className="text-[9.5px] font-medium fill-slate-600 dark:fill-slate-400">Upsampling Layer</text>

                    {/* Row 4: Discriminator Block */}
                    <rect x="840" y="420" width="12" height="12" rx="3" fill="#8B5CF6" />
                    <text x="860" y="430" className="text-[9.5px] font-medium fill-slate-600 dark:fill-slate-400">Discriminator Block</text>

                    {/* Row 5: Element-wise addition */}
                    <circle cx="846" cy="454" r="6" fill="white" stroke="#64748B" strokeWidth="1.5" className="dark:fill-slate-900" />
                    <text x="846" y="457.5" textAnchor="middle" className="text-[8px] font-bold fill-slate-700 dark:fill-slate-300">+</text>
                    <text x="860" y="458" className="text-[9.5px] font-medium fill-slate-600 dark:fill-slate-400">Element-wise Addition</text>
                  </g>
                </svg>

                {/* Floating Detailed Tooltips (Responsive Overlay) */}
                <AnimatePresence>
                  {hoveredArchNode && ARCH_NODE_TOOLTIPS[hoveredArchNode] && (() => {
                    const node = ARCH_NODE_TOOLTIPS[hoveredArchNode];
                    const leftPercent = (node.centerX / 1000) * 100;
                    const topPercent = (node.centerY / 520) * 100;
                    
                    return (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        transition={{ duration: 0.12, ease: 'easeOut' }}
                        className="absolute z-40 bg-slate-900/95 dark:bg-slate-950/95 text-white border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md pointer-events-none w-64 text-left"
                        style={{
                          left: `${leftPercent}%`,
                          top: `${topPercent}%`,
                          transform: 'translate(-50%, -108%)',
                        }}
                      >
                        {/* Tooltip pointer arrow */}
                        <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-900 dark:bg-slate-950 border-r border-b border-white/10 rotate-45" />

                        <div className="space-y-1.5 relative">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                              {node.subtitle}
                            </span>
                            <span className={`w-2 h-2 rounded-full bg-gradient-to-tr ${node.color} animate-pulse`} />
                          </div>
                          <h4 className="text-xs font-bold font-sans tracking-tight text-white leading-tight">
                            {node.title}
                          </h4>
                          <p className="text-[10px] text-slate-300 font-sans leading-relaxed">
                            {node.desc}
                          </p>
                          <div className="pt-1.5 border-t border-white/5 flex items-center gap-1">
                            <span className="text-[8px] font-mono text-slate-400 font-semibold bg-white/5 px-1.5 py-0.5 rounded">
                              {node.metric}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>

              {/* Interaction Tip Banner */}
              <div className="flex items-center gap-2 mt-4 px-3 py-2 bg-blue-500/10 border border-blue-500/10 rounded-xl text-[10px] text-blue-700 dark:text-blue-300 w-fit">
                <Info className="w-3.5 h-3.5 shrink-0 text-blue-500" />
                <span>Hover or click model components above to analyze real-time tensor shape mutations, mathematical kernels, and network specs.</span>
              </div>
            </div>

            {/* Architecture Components Bento Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-sans tracking-tight text-slate-900 dark:text-white pl-1">
                Architecture Components
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    id: 'conv',
                    title: 'Convolution Layer',
                    badge: 'Feature Extractor',
                    desc: 'Extracts low-level structural features using 3×3 convolution kernels, mapping RGB channels into 64-dimensional feature arrays.',
                    metric: 'Kernel: 3×3, Channels: 64',
                    bg: 'bg-blue-500/5 hover:bg-blue-500/10 border-blue-500/10 dark:border-blue-500/5 dark:hover:border-blue-500/20',
                    text: 'text-blue-600 dark:text-blue-400',
                    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
                    icon: Sliders
                  },
                  {
                    id: 'rrdb',
                    title: 'RRDB Block',
                    badge: 'Feature Synthesizer',
                    desc: 'Residual-in-Residual dense layers with dense connections. Omits memory-heavy Batch Normalization for cleaner gradients.',
                    metric: 'Depth: 23 Blocks, Params: ~16.7M',
                    bg: 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/10 dark:border-emerald-500/5 dark:hover:border-emerald-500/20',
                    text: 'text-emerald-600 dark:text-emerald-400',
                    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
                    icon: Layers
                  },
                  {
                    id: 'upsample',
                    title: 'Upsampling Layer',
                    badge: 'Pixel Shuffle',
                    desc: 'Doubles spatial coordinates by reshaping depth dimensions spatially, completely eliminating pixel deconvolution halos.',
                    metric: 'Method: Sub-Pixel Shuffler',
                    bg: 'bg-amber-500/5 hover:bg-amber-500/10 border-amber-500/10 dark:border-amber-500/5 dark:hover:border-amber-500/20',
                    text: 'text-amber-600 dark:text-amber-400',
                    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
                    icon: Maximize2
                  },
                  {
                    id: 'discriminator',
                    title: 'Discriminator',
                    badge: 'Adversarial Critic',
                    desc: 'A Relativistic GAN scoring real vs generated details. Triggers rich micro-texture synthesis during backpropagation.',
                    metric: 'Architecture: RaGAN-v2 CNN',
                    bg: 'bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 dark:border-purple-500/5 dark:hover:border-purple-500/20',
                    text: 'text-purple-600 dark:text-purple-400',
                    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]',
                    icon: ShieldCheck
                  },
                  {
                    id: 'skip',
                    title: 'Skip Connections',
                    badge: 'Gradient Highway',
                    desc: 'Channels low-frequency features directly across the RRDB stack, stabilizing weights and retaining macro colors.',
                    metric: 'Operation: Element-wise (+)',
                    bg: 'bg-teal-500/5 hover:bg-teal-500/10 border-teal-500/10 dark:border-teal-500/5 dark:hover:border-teal-500/20',
                    text: 'text-teal-600 dark:text-teal-400',
                    glow: 'shadow-[0_0_20px_rgba(20,184,166,0.15)]',
                    icon: Split
                  }
                ].map((component) => {
                  const IconComp = component.icon;
                  const isSelected = activeArchNode === component.id;
                  
                  return (
                    <motion.div
                      key={component.id}
                      onClick={() => setActiveArchNode(component.id)}
                      className={`cursor-pointer border rounded-2xl p-5 text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${component.bg} ${isSelected ? `${component.glow} border-current ${component.text} ring-1 ring-current bg-white dark:bg-[#090d16]/90 scale-[1.02]` : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#090d16]/30'}`}
                      whileHover={{ scale: isSelected ? 1.02 : 1.01 }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-[8px] font-mono tracking-wider font-bold uppercase opacity-80">
                            {component.badge}
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-current animate-ping' : 'bg-slate-300 dark:bg-slate-700'}`} />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <IconComp className="w-4 h-4 shrink-0" />
                          <h4 className="text-xs font-bold font-sans tracking-tight">
                            {component.title}
                          </h4>
                        </div>
                        
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal leading-relaxed">
                          {component.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[8px] font-mono opacity-80">
                        <span>{component.metric}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Comprehensive Info Banner */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 dark:border-emerald-500/5 rounded-2xl flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Unified Training Criteria</p>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-400">
                  ESRGAN integrates <strong>perceptual loss</strong>, <strong>adversarial loss</strong>, and <strong>pixel-level L1 loss</strong> simultaneously to optimize weights, ensuring synthetic textures align visually with human visual cortex responses rather than mathematical means.
                </p>
              </div>
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
