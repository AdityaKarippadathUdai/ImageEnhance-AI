import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Cpu, 
  ChevronDown, 
  ChevronRight,
  Zap, 
  Upload, 
  Info, 
  Maximize2, 
  Image as ImageIcon, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Clock, 
  Settings, 
  FileText, 
  Check, 
  TrendingUp, 
  Video, 
  FolderSync,
  Sliders,
  ShieldAlert,
  ChevronLeft,
  X,
  Play
} from 'lucide-react';

interface DocumentationPageProps {
  onNavigate?: (view: string) => void;
}

export default function DocumentationPage({ onNavigate }: DocumentationPageProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const sections = [
    { id: 'overview', name: 'Overview' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'features', name: 'Key Features' },
    { id: 'how-esrgan-works', name: 'How ESRGAN Works' },
    { id: 'workflow', name: 'Enhancement Workflow' },
    { id: 'supported-formats', name: 'Supported Formats' },
    { id: 'model-specifications', name: 'Model Specifications' },
    { id: 'best-practices', name: 'Best Practices' },
    { id: 'faq', name: 'Frequently Asked Questions' },
    { id: 'roadmap', name: 'Future Roadmap' },
  ];

  // Set up intersection observer to highlight current section in sidebar as user scrolls
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // height of global header plus extra buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const getArchNodeDescription = (nodeId: string) => {
    switch (nodeId) {
      case 'lr-image':
        return 'Low-Resolution Input: The original blurry image, often heavily compressed or limited in pixels.';
      case 'preprocessing':
        return 'Preprocessing: Converts the input image to tensor formats and normalizes the pixel range [0, 1] for network alignment.';
      case 'conv':
        return 'Convolution Layer: Initial feature extraction layer that detects basic structural attributes like edges and boundaries.';
      case 'rrdb':
        return 'RRDB Blocks (Residual-in-Residual Dense Blocks): The core ESRGAN feature learning backbone. Uses continuous dense connections without batch normalization to prevent artifacts and retain crisp high-frequency texture details.';
      case 'upsampling':
        return 'Upsampling Layer: Progressively sub-pixel scales feature maps using nearest-neighbor scaling followed by sub-pixel convolutions to produce the targeted scale (4x).';
      case 'hr-output':
        return 'High-Resolution Output: The high-fidelity reconstructed image containing synthesized textures and fine details.';
      case 'discriminator':
        return 'Relativistic Discriminator (U-Net): Evaluates if the generated image is more realistic than a real high-resolution target, driving the generator to construct genuine textures instead of blurry averages.';
      default:
        return '';
    }
  };

  const steps = [
    { 
      number: '01', 
      title: 'Upload Image', 
      desc: 'Drag & drop your JPG, PNG, or WebP image directly onto the live workspace canvas.', 
      icon: <Upload className="w-5 h-5 text-blue-500" /> 
    },
    { 
      number: '02', 
      title: 'Analyze Metadata', 
      desc: 'Our analyzer instantly extracts properties like original file size, dimensions, and MIME format.', 
      icon: <FileText className="w-5 h-5 text-turquoise-500" /> 
    },
    { 
      number: '03', 
      title: 'Configure Settings', 
      desc: 'Choose your desired scaling factor (2x or 4x), toggle neural face restoration, or adjust real-time denoisers.', 
      icon: <Sliders className="w-5 h-5 text-teal-500" /> 
    },
    { 
      number: '04', 
      title: 'Inference Run', 
      desc: 'Click "Enhance" to feed your image through our Real-ESRGAN x4+ neural pipeline in real-time.', 
      icon: <Cpu className="w-5 h-5 text-[#2563EB]" /> 
    },
    { 
      number: '05', 
      title: 'Interactive Review', 
      desc: 'Slide the responsive comparison handle back and forth to inspect original vs upscaled textures.', 
      icon: <Maximize2 className="w-5 h-5 text-amber-500" /> 
    },
    { 
      number: '06', 
      title: 'Download Output', 
      desc: 'Export the final high-resolution asset to your local drive without any quality loss.', 
      icon: <Check className="w-5 h-5 text-emerald-500" /> 
    }
  ];

  const features = [
    { 
      title: 'AI Super Resolution', 
      desc: 'Upscale low-resolution textures up to 400% (4x) using industry-leading generative adversarial network algorithms.', 
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
      gradient: 'from-blue-500/10 to-transparent'
    },
    { 
      title: 'Visual Comparison Slider', 
      desc: 'Inspect upscaled details using a real-time, interactive split-screen slider for pixel-perfect transparency.', 
      icon: <Maximize2 className="w-6 h-6 text-turquoise-500" />,
      gradient: 'from-turquoise-500/10 to-transparent'
    },
    { 
      title: 'Image Metadata Analysis', 
      desc: 'Automatically parses EXIF and digital structural tags to display exact aspect ratios, file sizing, and color metrics.', 
      icon: <FileText className="w-6 h-6 text-emerald-500" />,
      gradient: 'from-emerald-500/10 to-transparent'
    },
    { 
      title: 'Drag & Drop System', 
      desc: 'Fully drag-and-drop enabled file uploader makes importing photos onto the neural canvas effortless and swift.', 
      icon: <Upload className="w-6 h-6 text-purple-500" />,
      gradient: 'from-purple-500/10 to-transparent'
    },
    { 
      title: 'Adaptive Theme Architecture', 
      desc: 'Polished interfaces styled uniquely for both luminous Light Mode and immersive dark space aesthetics.', 
      icon: <BookOpen className="w-6 h-6 text-amber-500" />,
      gradient: 'from-amber-500/10 to-transparent'
    },
    { 
      title: 'Responsive Bento Layout', 
      desc: 'Perfectly optimized for mobile viewports, tablet screens, and extra-wide desktop monitors.', 
      icon: <Layers className="w-6 h-6 text-pink-500" />,
      gradient: 'from-pink-500/10 to-transparent'
    },
    { 
      title: 'High-Fidelity Downloads', 
      desc: 'Retrieve enhanced PNG or JPEG formats directly, fully retaining metadata tags and high-frequency content.', 
      icon: <Check className="w-6 h-6 text-[#14B8A6]" />,
      gradient: 'from-teal-500/10 to-transparent'
    },
    { 
      title: 'FastAPI Proxy Integration', 
      desc: 'Designed with production-ready endpoints and type-safe API services to hook into Python GPU backends instantly.', 
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      gradient: 'from-blue-600/10 to-transparent'
    }
  ];

  const faqs = [
    { 
      q: 'What is ESRGAN?', 
      a: 'ESRGAN (Enhanced Super-Resolution Generative Adversarial Networks) is an advanced deep learning model designed for single-image super-resolution. It improves upon previous models (like SRGAN) by removing batch normalization layers, incorporating Residual-in-Residual Dense Blocks (RRDB), and using a relativistic discriminator to synthesize incredibly realistic textures and fine-grained features.' 
    },
    { 
      q: 'How long does image enhancement take?', 
      a: 'The processing speed depends on the input image resolution and the scaling factor. On a dedicated server with a modern GPU (such as an NVIDIA A10G), inference typically completes within 1.5 to 3 seconds. The live demo app simulates this latency dynamically to provide a accurate representation of a production backend deployment.' 
    },
    { 
      q: 'Does the AI invent new details?', 
      a: 'Unlike traditional bilinear or bicubic interpolation which simply averages neighboring pixels and produces a blurry output, ESRGAN uses its trained neural generator to synthesize realistic high-frequency detail based on features it has "learned" from millions of high-resolution training images. It adds plausible micro-textures like hair strands, skin pores, and landscape details.' 
    },
    { 
      q: 'What image formats are supported?', 
      a: 'The platform currently supports PNG, JPG, JPEG, and WebP format imports. Output images can be downloaded in high-resolution PNG or JPG formats, preserving the original color space and aspect ratios.' 
    },
    { 
      q: 'Can I enhance very small images?', 
      a: 'Yes! Small, low-resolution icons, historical photos, or gaming sprites are actually ideal candidates for super-resolution. ESRGAN excels at scaling small, clean graphics (e.g. 128x128 pixels) up to 4x (512x512) while sharpening outlines and recreating sharp structural borders.' 
    },
    { 
      q: 'Is my uploaded image stored permanently?', 
      a: 'No. To ensure absolute user privacy and data security, all uploaded images are processed transiently in your local browser session or passed securely via base64 API payloads. No files are cached or stored permanently on external database servers.' 
    },
    { 
      q: 'What resolution will the output image have?', 
      a: 'The output resolution is a direct multiplication of your input dimensions by the chosen scaling factor. For example, if you upload an 800 x 600 pixel photo and select the 4x scale option, the output will be a sharp 3200 x 2400 pixel image.' 
    }
  ];

  const roadmap = [
    { 
      quarter: 'Q3 2026', 
      title: 'Batch Image Processing', 
      desc: 'Allow users to upload multiple files concurrently, setting a global upscaling rule, and downloading outputs as a single ZIP archive.', 
      status: 'In Development',
      icon: <FolderSync className="w-5 h-5 text-[#2563EB]" /> 
    },
    { 
      quarter: 'Q4 2026', 
      title: 'Face Restoration Pipeline', 
      desc: 'Incorporate dedicated auxiliary CodeFormer or GFPGAN neural face-fixing layers to automatically detect and reconstruct facial details with exceptional clarity.', 
      status: 'Planned',
      icon: <Sparkles className="w-5 h-5 text-emerald-500" /> 
    },
    { 
      quarter: 'Q1 2027', 
      title: 'Video Super-Resolution', 
      desc: 'Bring ESRGAN capabilities to MP4 and WebM files, leveraging temporal consistency algorithms to prevent flickering across frames.', 
      status: 'Researching',
      icon: <Video className="w-5 h-5 text-purple-500" /> 
    },
    { 
      quarter: 'Q2 2027', 
      title: 'Advanced AI Hyper-parameter Controls', 
      desc: 'Expose tiled processing size parameters, GAN-to-PSNR interpolation weights, and customized model selection to the user interface.', 
      status: 'Planned',
      icon: <Sliders className="w-5 h-5 text-amber-500" /> 
    }
  ];

  const toggleAccordion = (idx: number) => {
    setActiveAccordion(activeAccordion === idx ? null : idx);
  };

  return (
    <div id="documentation-page-root" className="min-h-screen pt-12 pb-24 px-4 md:px-8 bg-slate-50 dark:bg-[#020617] text-[#0F172A] dark:text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <section className="relative text-left mb-16 overflow-hidden py-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-[#2563EB] dark:text-blue-400 w-fit">
                <BookOpen className="w-3.5 h-3.5" />
                <span>USER GUIDE & TECHNICAL MANUAL</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Documentation
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                Learn how ImageEnhancer AI uses ESRGAN to transform low-resolution images into high-quality, detail-rich outputs. This guide covers features, workflows, supported formats, best practices, and answers to common questions.
              </p>
            </div>
            
            {/* Visual Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-tr from-[#2563EB]/10 via-turquoise-500/10 to-emerald-500/5 p-4 border border-slate-200 dark:border-white/5 shadow-2xl backdrop-blur-3xl overflow-hidden flex items-center justify-center">
                {/* SVG Illustration representing Resolution Scaling */}
                <svg className="w-4/5 h-4/5 text-[#2563EB] dark:text-blue-400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Frame */}
                  <rect x="10" y="10" width="180" height="180" rx="24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-20" />
                  
                  {/* Grid Representation of Low Resolution */}
                  <g className="opacity-40">
                    <rect x="30" y="30" width="60" height="60" rx="8" stroke="currentColor" strokeWidth="1" />
                    <line x1="30" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="30" y1="70" x2="90" y2="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="50" y1="30" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="70" y1="30" x2="70" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <text x="35" y="105" className="font-mono text-[8px] fill-current opacity-70">LR: 64x64</text>
                  </g>

                  {/* Neural Connection Rays */}
                  <g className="text-turquoise-500 opacity-60">
                    <path d="M90 60 C 110 60, 110 110, 130 110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M90 40 C 120 40, 110 130, 130 130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M90 80 C 100 80, 120 150, 130 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  </g>

                  {/* High Resolution Frame */}
                  <g className="text-emerald-500">
                    <rect x="130" y="100" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="150" cy="120" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="1 1" />
                    <text x="130" y="155" className="font-mono text-[8px] fill-current">HR: 256x256</text>
                  </g>

                  {/* Neural Network Node Accents */}
                  <circle cx="90" cy="60" r="3" className="fill-blue-500 animate-pulse" />
                  <circle cx="130" cy="110" r="3" className="fill-emerald-400" />
                  <circle cx="110" cy="85" r="4" className="fill-turquoise-400 animate-bounce" />
                </svg>

                {/* Glassmorphic Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 border border-slate-200/50 dark:border-white/10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-white">Neural Super-Resolution</h5>
                    <p className="text-[10px] text-slate-500">Reconstructing photo fidelity dynamically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LAYOUT GRID: SIDEBAR & MAIN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* STICKY SIDEBAR (Collapsible Drawer on Mobile) */}
          <aside className="lg:col-span-3">
            
            {/* Mobile Nav Button */}
            <div className="lg:hidden w-full flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 mb-6">
              <span className="text-xs font-semibold tracking-wider uppercase font-mono text-slate-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                Table of Contents
              </span>
              <button 
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:bg-blue-500/20"
              >
                {isMobileNavOpen ? 'Hide Menu' : 'Show Menu'}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileNavOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Mobile Nav List */}
            <AnimatePresence>
              {isMobileNavOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden w-full mb-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col gap-2 overflow-hidden"
                >
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollTo(sec.id)}
                      className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-between ${
                        activeSection === sec.id 
                          ? 'bg-blue-500/10 text-[#2563EB] dark:text-blue-400' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <span>{sec.name}</span>
                      {activeSection === sec.id && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Sticky Sidebar */}
            <div className="hidden lg:block sticky top-24 self-start">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-100/50 dark:shadow-none backdrop-blur-xl flex flex-col gap-1.5 text-left">
                <h3 className="text-xs font-bold tracking-widest uppercase font-mono text-slate-400 mb-4 pl-3 flex items-center gap-2">
                  <span>Navigation</span>
                </h3>
                <nav className="flex flex-col gap-1">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => handleScrollTo(sec.id)}
                        className={`group relative w-full text-left py-2.5 pl-4 pr-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-between ${
                          isActive 
                            ? 'text-[#2563EB] dark:text-[#FBBF24] bg-blue-500/5 dark:bg-white/5' 
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {/* Dynamic left side active bar indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="doc-active-bar"
                            className="absolute left-0 top-2 bottom-2 w-1 rounded-r-md bg-[#2563EB] dark:bg-[#FBBF24]"
                          />
                        )}
                        <span>{sec.name}</span>
                        <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 ${isActive ? 'text-[#2563EB] dark:text-[#FBBF24] opacity-100' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENTATION CONTENT */}
          <main className="lg:col-span-9 flex flex-col gap-20 text-left">
            
            {/* OVERVIEW SECTION */}
            <section id="overview" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-[#2563EB] to-turquoise-400 inline-block"></span>
                  Overview
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Introduction to ImageEnhancer AI
                </p>
              </div>

              <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  <strong className="text-slate-800 dark:text-white">ImageEnhancer AI</strong> is a premium, web-based image super-resolution utility designed to reconstruct blurry, compressed, or low-resolution textures into stunning, crisp assets. It leverages <strong className="text-slate-800 dark:text-white">ESRGAN (Enhanced Super-Resolution Generative Adversarial Networks)</strong>, an award-winning deep learning model, to synthetically construct and restore fine details that are lost during traditional standard resizing filters.
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  Whether you are a creative designer working with compressed web graphics, a photographer aiming to upscale old portfolio shoots, or a developer hoping to optimize graphics, ImageEnhancer AI provides an elegant, real-time environment to scale images and analyze pixel structures immediately.
                </p>

                {/* Sub features list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-1">State-of-the-Art Weights</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Uses modern x4+ ESRGAN weights to upscale high-frequency content perfectly.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-1">Face Reconstruction Toggle</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Restores human facial symmetry and details using integrated GFPGAN model architectures.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* GETTING STARTED */}
            <section id="getting-started" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-turquoise-400 to-teal-400 inline-block"></span>
                  Getting Started
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  The End-to-End User Journey
                </p>
              </div>

              {/* Responsive Stepper Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {steps.map((st, idx) => (
                  <div key={idx} className="relative p-6 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-lg shadow-slate-100/40 dark:shadow-none flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                        {st.icon}
                      </div>
                      <span className="font-mono text-xs font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                        STEP {st.number}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                        {st.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* KEY FEATURES */}
            <section id="features" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-teal-400 to-emerald-400 inline-block"></span>
                  Key Features
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Powerful tools integrated on the platform
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {features.map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 rounded-2xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-md flex flex-col gap-3 group hover:border-[#2563EB]/40 dark:hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-300">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* HOW ESRGAN WORKS */}
            <section id="how-esrgan-works" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-emerald-400 to-[#10B981] inline-block"></span>
                  How ESRGAN Works
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Understanding Generative Adversarial Networks
                </p>
              </div>

              <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none backdrop-blur-xl">
                
                <div className="flex flex-col gap-6 mb-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    <strong className="text-slate-950 dark:text-white">ESRGAN (Enhanced Super-Resolution Generative Adversarial Networks)</strong> is an industry-standard neural network framework that excels at producing extremely sharp, high-frequency details.
                  </p>
                  <p>
                    Traditional techniques (like Bicubic or Lanczos resampling) look at neighboring pixels and perform math to fill the gaps, which always leads to blurry, uninspired averages. ESRGAN takes a completely different approach: it is trained to <strong className="text-slate-950 dark:text-white">hallucinate and synthesize genuine detail</strong>.
                  </p>
                  
                  {/* Three pillars of ESRGAN */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2">No Batch Normalization</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Removing batch normalization layers reduces unpleasant halo artifacts, stabilizing quality and saving computational VRAM.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-turquoise-500/10 flex items-center justify-center text-turquoise-500 mb-3">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2">RRDB Architecture</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Combines multi-layer Residual-in-Residual Dense Blocks. This allows features from early and late convolution passes to merge deeply.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
                        <Zap className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2">Relativistic Discriminator</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Instead of checking if an image is "absolutely real or fake", it estimates if a fake image is "more realistic than a real one".</p>
                    </div>
                  </div>
                </div>

                {/* ARCHITECTURE DIAGRAM (Interactive SVG) */}
                <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-6 bg-slate-50 dark:bg-[#040812] flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Neural Network Architecture Flow</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Hover or click on any module block to view its pipeline purpose.</p>
                    </div>
                    {hoveredNode && (
                      <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold px-2 py-0.5 rounded bg-blue-500/10 text-[#2563EB] dark:text-blue-400 self-start md:self-center border border-blue-500/20">
                        {hoveredNode.toUpperCase().replace('-', ' ')}
                      </span>
                    )}
                  </div>

                  {/* High Quality Responsive Interactive Vector Map */}
                  <div className="relative w-full flex justify-center py-6 overflow-x-auto">
                    <svg className="w-full min-w-[700px] max-w-[850px] h-[180px]" viewBox="0 0 850 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                      
                      {/* Connections / Flow Arrows */}
                      <g stroke="currentColor" strokeWidth="1.5" className="text-slate-300 dark:text-white/10">
                        {/* LR to Preprocessing */}
                        <line x1="85" y1="90" x2="135" y2="90" />
                        <polygon points="135,90 128,85 128,95" className="fill-slate-300 dark:fill-white/10 stroke-none" />

                        {/* Preprocessing to Conv */}
                        <line x1="215" y1="90" x2="265" y2="90" />
                        <polygon points="265,90 258,85 258,95" className="fill-slate-300 dark:fill-white/10 stroke-none" />

                        {/* Conv to RRDB */}
                        <line x1="345" y1="90" x2="395" y2="90" />
                        <polygon points="395,90 388,85 388,95" className="fill-slate-300 dark:fill-white/10 stroke-none" />

                        {/* RRDB to Upscale */}
                        <line x1="475" y1="90" x2="525" y2="90" />
                        <polygon points="525,90 518,85 518,95" className="fill-slate-300 dark:fill-white/10 stroke-none" />

                        {/* Upscale to Output */}
                        <line x1="605" y1="90" x2="655" y2="90" />
                        <polygon points="655,90 648,85 648,95" className="fill-slate-300 dark:fill-white/10 stroke-none" />

                        {/* Feedback with Discriminator (Bi-directional curved lines) */}
                        <path d="M 705 110 C 705 155, 435 155, 435 110" strokeDasharray="3 3" />
                        <polygon points="435,110 430,117 440,117" className="fill-slate-300 dark:fill-white/10 stroke-none" />
                      </g>

                      {/* Blocks / Nodes */}
                      {/* LR Image Node */}
                      <g 
                        onMouseEnter={() => setHoveredNode('lr-image')}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`cursor-pointer transition-all duration-200 ${hoveredNode === 'lr-image' ? 'scale-105' : ''}`}
                      >
                        <rect x="5" y="60" width="80" height="60" rx="12" className={`fill-white dark:fill-[#0d1527] stroke-2 ${hoveredNode === 'lr-image' ? 'stroke-blue-500 shadow-lg' : 'stroke-slate-200 dark:stroke-white/10'}`} />
                        <text x="45" y="90" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-white">LR Image</text>
                        <text x="45" y="104" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Input</text>
                      </g>

                      {/* Preprocessing Node */}
                      <g 
                        onMouseEnter={() => setHoveredNode('preprocessing')}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`cursor-pointer transition-all duration-200 ${hoveredNode === 'preprocessing' ? 'scale-105' : ''}`}
                      >
                        <rect x="135" y="60" width="80" height="60" rx="12" className={`fill-white dark:fill-[#0d1527] stroke-2 ${hoveredNode === 'preprocessing' ? 'stroke-blue-500 shadow-lg' : 'stroke-slate-200 dark:stroke-white/10'}`} />
                        <text x="175" y="90" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-white">Normalize</text>
                        <text x="175" y="104" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Preprocessing</text>
                      </g>

                      {/* Convolution Node */}
                      <g 
                        onMouseEnter={() => setHoveredNode('conv')}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`cursor-pointer transition-all duration-200 ${hoveredNode === 'conv' ? 'scale-105' : ''}`}
                      >
                        <rect x="265" y="60" width="80" height="60" rx="12" className={`fill-white dark:fill-[#0d1527] stroke-2 ${hoveredNode === 'conv' ? 'stroke-blue-500 shadow-lg' : 'stroke-slate-200 dark:stroke-white/10'}`} />
                        <text x="305" y="90" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-white">Convolution</text>
                        <text x="305" y="104" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Edge Detect</text>
                      </g>

                      {/* RRDB Block Node */}
                      <g 
                        onMouseEnter={() => setHoveredNode('rrdb')}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`cursor-pointer transition-all duration-200 ${hoveredNode === 'rrdb' ? 'scale-105' : ''}`}
                      >
                        <rect x="395" y="60" width="80" height="60" rx="12" className={`fill-white dark:fill-[#0d1527] stroke-2 ${hoveredNode === 'rrdb' ? 'stroke-turquoise-500 shadow-lg' : 'stroke-slate-200 dark:stroke-white/10'}`} />
                        <text x="435" y="90" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-white">RRDB Blocks</text>
                        <text x="435" y="104" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Features</text>
                      </g>

                      {/* Upsample Node */}
                      <g 
                        onMouseEnter={() => setHoveredNode('upsampling')}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`cursor-pointer transition-all duration-200 ${hoveredNode === 'upsampling' ? 'scale-105' : ''}`}
                      >
                        <rect x="525" y="60" width="80" height="60" rx="12" className={`fill-white dark:fill-[#0d1527] stroke-2 ${hoveredNode === 'upsampling' ? 'stroke-emerald-500 shadow-lg' : 'stroke-slate-200 dark:stroke-white/10'}`} />
                        <text x="565" y="90" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-white">Upsampling</text>
                        <text x="565" y="104" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">4x Scaling</text>
                      </g>

                      {/* HR Output Node */}
                      <g 
                        onMouseEnter={() => setHoveredNode('hr-output')}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`cursor-pointer transition-all duration-200 ${hoveredNode === 'hr-output' ? 'scale-105' : ''}`}
                      >
                        <rect x="655" y="60" width="100" height="60" rx="12" className={`fill-white dark:fill-[#0d1527] stroke-2 ${hoveredNode === 'hr-output' ? 'stroke-indigo-500 shadow-lg' : 'stroke-slate-200 dark:stroke-white/10'}`} />
                        <text x="705" y="90" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700 dark:fill-white">HR Reconstructed</text>
                        <text x="705" y="104" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Output Asset</text>
                      </g>

                      {/* Discriminator Node (Curved Feedback Loop) */}
                      <g 
                        onMouseEnter={() => setHoveredNode('discriminator')}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={`cursor-pointer transition-all duration-200 ${hoveredNode === 'discriminator' ? 'scale-105' : ''}`}
                      >
                        <rect x="520" y="125" width="110" height="40" rx="10" className={`fill-white dark:fill-[#090d16] stroke-2 ${hoveredNode === 'discriminator' ? 'stroke-rose-500 shadow-lg' : 'stroke-slate-200 dark:stroke-white/10'}`} />
                        <text x="575" y="145" textAnchor="middle" className="text-[9px] font-sans font-semibold fill-slate-500 dark:fill-slate-400">U-Net Discriminator</text>
                        <text x="575" y="155" textAnchor="middle" className="text-[7px] font-mono fill-rose-500">Relativistic Loss</text>
                      </g>
                    </svg>
                  </div>

                  {/* Active node description pane */}
                  <AnimatePresence mode="wait">
                    {hoveredNode ? (
                      <motion.div
                        key={hoveredNode}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans"
                      >
                        {getArchNodeDescription(hoveredNode)}
                      </motion.div>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent text-xs text-slate-500 text-center font-mono">
                        💡 Hover over elements above to see dynamic definitions
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* ENHANCEMENT WORKFLOW */}
            <section id="workflow" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-[#10B981] to-blue-500 inline-block"></span>
                  Enhancement Workflow
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Continuous Neural Processing Pipe
                </p>
              </div>

              <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-100/30 dark:shadow-none backdrop-blur-xl">
                
                {/* SVG Detailed Animated Workflow Diagram */}
                <div className="w-full flex justify-center overflow-x-auto bg-slate-50 dark:bg-[#040812] border border-slate-200 dark:border-white/10 rounded-2xl p-6">
                  <svg className="w-full min-w-[750px] max-w-[850px] h-[360px]" viewBox="0 0 850 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                    
                    {/* Path Connectors (Animated SVG dash array) */}
                    <g stroke="currentColor" strokeWidth="2" className="text-blue-500/35 dark:text-blue-500/20">
                      {/* Top Row: Left to Right */}
                      <line x1="160" y1="70" x2="225" y2="70" strokeDasharray="5 3" />
                      <line x1="335" y1="70" x2="400" y2="70" strokeDasharray="5 3" />
                      <line x1="510" y1="70" x2="575" y2="70" strokeDasharray="5 3" />
                      <line x1="685" y1="70" x2="750" y2="70" strokeDasharray="5 3" />

                      {/* Drop Down Connection */}
                      <path d="M 750 90 L 750 180 L 100 180 L 100 270" fill="none" strokeDasharray="5 3" />

                      {/* Bottom Row: Left to Right */}
                      <line x1="160" y1="270" x2="225" y2="270" strokeDasharray="5 3" />
                      <line x1="335" y1="270" x2="400" y2="270" strokeDasharray="5 3" />
                      <line x1="510" y1="270" x2="575" y2="270" strokeDasharray="5 3" />
                      <line x1="685" y1="270" x2="750" y2="270" strokeDasharray="5 3" />
                    </g>

                    {/* Nodes - Top Row */}
                    {/* 1. Upload */}
                    <g className="text-blue-500">
                      <rect x="50" y="40" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="105" y="70" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Upload Image</text>
                      <text x="105" y="84" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">User Input</text>
                    </g>

                    {/* 2. Validate */}
                    <g className="text-turquoise-500">
                      <rect x="225" y="40" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="280" y="70" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Validate Image</text>
                      <text x="280" y="84" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">MIME & Dimensions</text>
                    </g>

                    {/* 3. Preprocess */}
                    <g className="text-emerald-500">
                      <rect x="400" y="40" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="455" y="70" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Preprocessing</text>
                      <text x="455" y="84" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Tensor Scaling</text>
                    </g>

                    {/* 4. Inference */}
                    <g className="text-indigo-500">
                      <rect x="575" y="40" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="630" y="70" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">ESRGAN Inference</text>
                      <text x="630" y="84" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">GPU Process</text>
                    </g>

                    {/* 5. Extraction */}
                    <g className="text-purple-500">
                      <rect x="690" y="150" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="745" y="180" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Feature Extract</text>
                      <text x="745" y="194" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">High-Freq Convs</text>
                    </g>

                    {/* Bottom Row */}
                    {/* 6. Reconstruction */}
                    <g className="text-pink-500">
                      <rect x="50" y="240" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="105" y="270" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Texture Recon</text>
                      <text x="105" y="284" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Fine Hallucination</text>
                    </g>

                    {/* 7. Upscaling */}
                    <g className="text-amber-500">
                      <rect x="225" y="240" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="280" y="270" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Upscaling</text>
                      <text x="280" y="284" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Sub-pixel scale</text>
                    </g>

                    {/* 8. Post processing */}
                    <g className="text-teal-500">
                      <rect x="400" y="240" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="455" y="270" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Post Processing</text>
                      <text x="455" y="284" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">RGB compilation</text>
                    </g>

                    {/* 9. Enhanced */}
                    <g className="text-emerald-500">
                      <rect x="575" y="240" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="630" y="270" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Enhanced Image</text>
                      <text x="630" y="284" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">In-memory Blob</text>
                    </g>

                    {/* 10. Compare & Download */}
                    <g className="text-blue-600">
                      <rect x="690" y="240" width="110" height="60" rx="14" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                      <text x="745" y="270" textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-800 dark:fill-white">Compare & Export</text>
                      <text x="745" y="284" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">Local Download</text>
                    </g>
                  </svg>
                </div>
              </div>
            </section>

            {/* SUPPORTED FORMATS */}
            <section id="supported-formats" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-blue-500 to-indigo-500 inline-block"></span>
                  Supported Formats
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Supported Input and Output structures
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Input formats */}
                <div className="p-6 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-lg flex flex-col gap-4">
                  <h4 className="text-xs font-bold tracking-widest uppercase font-mono text-slate-400">Supported Inputs</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {['PNG', 'JPG', 'JPEG', 'WebP'].map((fmt) => (
                      <span key={fmt} className="px-3 py-1.5 rounded-lg bg-blue-500/5 dark:bg-white/5 border border-blue-500/20 dark:border-white/10 text-xs font-extrabold text-blue-500 dark:text-blue-400 font-mono">
                        {fmt}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Import files directly. Transparent pixel alphas are fully preserved during ESRGAN upscale processing, preventing canvas discoloration.
                  </p>
                </div>

                {/* Output formats */}
                <div className="p-6 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-lg flex flex-col gap-4">
                  <h4 className="text-xs font-bold tracking-widest uppercase font-mono text-slate-400">Supported Outputs</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {['PNG', 'JPG', 'JPEG'].map((fmt) => (
                      <span key={fmt} className="px-3 py-1.5 rounded-lg bg-emerald-500/5 dark:bg-white/5 border border-emerald-500/20 dark:border-white/10 text-xs font-extrabold text-emerald-500 dark:text-emerald-400 font-mono">
                        {fmt}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Export high-fidelity assets. PNG files preserve crisp textures without adding lossy compression artifacts. JPEG preserves high metadata details.
                  </p>
                </div>
              </div>

              {/* Warning/Notes box */}
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-600 dark:text-amber-400 leading-relaxed flex items-start gap-3 mt-6">
                <Info className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <strong className="text-slate-800 dark:text-amber-300">Important Sizing Guardrails:</strong>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Image aspect ratio is always strictly locked and preserved.</li>
                    <li>Higher-quality or clean, noise-free input images produce significantly crisper outputs compared to heavily pixelated inputs.</li>
                    <li>Extremely large files (e.g., above 10MB) may take longer to compile and download as local memory allocation buffers scale.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* MODEL SPECIFICATIONS */}
            <section id="model-specifications" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-indigo-500 to-purple-500 inline-block"></span>
                  Model Specifications
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Deep Learning Framework Specifications
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-xl relative overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 font-mono tracking-wider text-[10px] uppercase">
                        <th className="py-3 px-4 font-bold">SPECIFICATION</th>
                        <th className="py-3 px-4 font-bold">VALUE / METRIC</th>
                        <th className="py-3 px-4 font-bold">INTEGRATION CONTEXT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-sans">
                      <tr>
                        <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Neural Architecture</td>
                        <td className="py-4 px-4 font-mono text-blue-500 dark:text-blue-400 font-bold">Real-ESRGAN x4+</td>
                        <td className="py-4 px-4 text-slate-500">Enhanced Super-Resolution GAN optimized for generic real-world photographs and complex textures.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Backbone Generator</td>
                        <td className="py-4 px-4 font-mono text-purple-500 dark:text-purple-400 font-bold">RRDB (Residual Dense)</td>
                        <td className="py-4 px-4 text-slate-500">Includes 23 continuous dense residual block states to promote high-density feature transfer.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Scaling Factor Range</td>
                        <td className="py-4 px-4 font-mono text-emerald-500 dark:text-emerald-400 font-bold">2.0× / 4.0×</td>
                        <td className="py-4 px-4 text-slate-500">Spherically multiplies coordinate maps, yielding up to a 16x scale increase in total pixel surface area.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Training Framework</td>
                        <td className="py-4 px-4 font-mono text-amber-500 dark:text-amber-400 font-bold">PyTorch (Pythonic SDK)</td>
                        <td className="py-4 px-4 text-slate-500">Compiled weights run flawlessly on CUDA, DirectML, and standard CPU backends.</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 font-semibold text-slate-900 dark:text-white">Face Restoration Hook</td>
                        <td className="py-4 px-4 font-mono text-[#2563EB] dark:text-[#2563EB] font-bold">GFPGAN v1.3</td>
                        <td className="py-4 px-4 text-slate-500">Uses blind face restoration models to reconstruct authentic facial structures from heavy pixel compression.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* BEST PRACTICES */}
            <section id="best-practices" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-purple-500 to-pink-500 inline-block"></span>
                  Best Practices
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Maximize super-resolution fidelity
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { 
                    title: 'Upload Reasonably Clean Source Files', 
                    desc: 'ESRGAN can clean up noise, but starting with a source that has minimal artifact distortion guarantees a superior and highly detailed upscale.', 
                    icon: <Check className="w-4 h-4 text-emerald-500" /> 
                  },
                  { 
                    title: 'Prefer PNG formats for Digital Assets', 
                    desc: 'PNG prevents lossy compression. Upscaling from PNG inputs ensures the network does not synthesize and scale JPEG blocking artifacts.', 
                    icon: <Check className="w-4 h-4 text-[#2563EB]" /> 
                  },
                  { 
                    title: 'Use GFPGAN Restoration For Portraits', 
                    desc: 'When upscaling photos containing people, toggle "Face Restoration" to ensure facial details (eyes, teeth, skin textures) are balanced perfectly.', 
                    icon: <Check className="w-4 h-4 text-turquoise-500" /> 
                  },
                  { 
                    title: 'Avoid Pre-compressed Heavily Scaled Files', 
                    desc: 'If an image has already been bicubic-scaled, ESRGAN might struggle to recover original micro-details. Always feed raw or camera original outputs.', 
                    icon: <Check className="w-4 h-4 text-pink-500" /> 
                  }
                ].map((bp, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-md flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white shrink-0 mt-0.5">
                      {bp.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2 leading-tight">{bp.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{bp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section id="faq" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-pink-500 to-amber-500 inline-block"></span>
                  Frequently Asked Questions
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Everything you need to know
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {faqs.map((faq, idx) => {
                  const isOpen = activeAccordion === idx;
                  return (
                    <div 
                      key={idx} 
                      className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#090d16]/75 hover:border-slate-300 dark:hover:border-white/10 transition-colors overflow-hidden"
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full py-4 px-6 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white tracking-wide cursor-pointer focus:outline-none"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} />
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-6 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 mt-1 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FUTURE ROADMAP */}
            <section id="roadmap" className="scroll-mt-24">
              <div className="flex flex-col gap-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-amber-500 to-emerald-400 inline-block"></span>
                  Future Roadmap
                </h2>
                <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase font-mono">
                  Upcoming platform capabilities
                </p>
              </div>

              {/* Vertical timeline card structure */}
              <div className="relative border-l-2 border-slate-200 dark:border-white/10 pl-6 ml-4 space-y-8">
                {roadmap.map((rm, idx) => (
                  <div key={idx} className="relative">
                    {/* Floating circular node marker */}
                    <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-white dark:bg-[#020617] border-2 border-blue-500 flex items-center justify-center text-blue-500 shadow-md">
                      {rm.icon}
                    </div>

                    <div className="p-6 rounded-3xl bg-white dark:bg-[#090d16]/75 border border-slate-200 dark:border-white/5 shadow-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                          {rm.quarter}
                        </span>
                        <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 font-extrabold self-start sm:self-center">
                          {rm.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white mb-2 leading-tight">{rm.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">{rm.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-blue-600/10 via-teal-500/5 to-transparent border border-slate-200 dark:border-white/10 relative overflow-hidden text-center mt-6">
              {/* Subtle visual radial light ring */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-3">
                Ready to Enhance Your Images?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
                Instantly process your images using state-of-the-art super-resolution neural networks. No setup or API keys needed to get started with the live demo.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('home');
                      // Delay scroll slightly
                      setTimeout(() => {
                        const el = document.getElementById('playground');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-white dark:text-slate-950 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 dark:from-turquoise-400 dark:to-blue-400 dark:hover:from-turquoise-300 dark:hover:to-blue-300 transition-all cursor-pointer shadow-lg shadow-blue-500/10 dark:shadow-turquoise-500/10 flex items-center justify-center gap-1.5 hover:scale-[1.02] duration-300"
                >
                  <Play className="w-3.5 h-3.5 fill-current stroke-none" />
                  <span>Enhance Image</span>
                </button>
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('technology');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-700 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.02] duration-300"
                >
                  <span>Explore Technology</span>
                </button>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
