import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sliders, Cpu, Eye, Layers, Shield, CheckCircle, CheckCircle2 } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  techSpecs: string[];
  gradient: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<any>;
}

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedFeature, setSelectedFeature] = useState<string>('super-res');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [comparisonCategory, setComparisonCategory] = useState<string>('anime');

  const categories = [
    { id: 'all', label: 'All Tech' },
    { id: 'inference', label: 'Model Inference' },
    { id: 'texture', label: 'Texture Synthesis' },
    { id: 'refinement', label: 'Refinement' },
  ];

  const features: FeatureItem[] = [
    {
      id: 'super-res',
      title: 'Neural Super-Resolution',
      tag: 'inference',
      description: 'Upscale assets up to 400% of their original bounds while introducing high-frequency detail. Standard bilinear filters stretch pixels; our model predicts actual structural lines using deep convolutional neural layers.',
      techSpecs: [
        'Real-ESRGAN x4+ Generative Weights',
        'Intact Edge Sharpness Vectoring',
        'Sub-pixel Alignment Correction'
      ],
      gradient: 'from-blue-500 to-indigo-600',
      metric: '4x',
      metricLabel: 'Upscale Bounds',
      icon: Layers
    },
    {
      id: 'deblur',
      title: 'De-compression Artifact Eraser',
      tag: 'inference',
      description: 'JPEG/PNG compression leaves behind blocky artifacts and ringing noise around high-contrast edges. Our filter isolates non-linear noise and actively replaces block boundaries with smooth gradient maps.',
      techSpecs: [
        'JPEG Ringing Suppression',
        'Non-linear Block Filtering',
        'Edge Preserving Denoising'
      ],
      gradient: 'from-teal-400 to-emerald-600',
      metric: '-94%',
      metricLabel: 'Compression Noise',
      icon: Shield
    },
    {
      id: 'texture',
      title: 'Texture Synthesis Grid',
      tag: 'texture',
      description: 'Reconstruct physical realism. When processing materials like fabrics, skin texture, wood grains, or sand, our generator network synthesizes micro-textures rather than flat shapes, maintaining biological accuracy.',
      techSpecs: [
        'Perceptual Content Modeling',
        'Stochastic Noise Matching',
        'Biological Pattern Synthesizer'
      ],
      gradient: 'from-purple-500 to-pink-600',
      metric: '100%',
      metricLabel: 'Texture Fidelity',
      icon: Cpu
    },
    {
      id: 'facial',
      title: 'Anatomical Facial Refiner',
      tag: 'refinement',
      description: 'Low-res portraits suffer from pixelated features. Our localized neural attention module identifies facial regions to synthesize coherent eyelashes, skin pores, hair strands, and pristine eye reflections.',
      techSpecs: [
        'Facial Landmark Alignment',
        'Specular Highlight Recovery',
        'Multi-stage Portrait Priority'
      ],
      gradient: 'from-amber-400 to-orange-500',
      metric: '<12ms',
      metricLabel: 'Regional Latency',
      icon: Eye
    }
  ];

  const comparisons: Record<string, { before: string; after: string; title: string; desc: string }> = {
    anime: {
      before: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&q=10&auto=format&fit=crop', // very low res
      after: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=90&auto=format&fit=crop', // high res
      title: 'Vector-like Illustration Scaling',
      desc: 'Maintains sharp lines and vibrant flat hues without color-bleeding or pixelation.'
    },
    texture: {
      before: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&q=10&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=90&auto=format&fit=crop',
      title: 'Complex Texture Reconstruction',
      desc: 'Restores sand grains, fine fabrics, and natural surface erosion with generative depth.'
    },
    portrait: {
      before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=5&auto=format&fit=crop',
      after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=90&auto=format&fit=crop',
      title: 'Sub-Pixel Facial Symmetry',
      desc: 'Synthesizes realistic eyes, individual skin pores, and fine hair follicles.'
    }
  };

  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(f => f.tag === activeTab);

  const activeFeatureObj = features.find(f => f.id === selectedFeature) || features[0];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-[#F8FAFC] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-[#2563EB] dark:text-blue-400 font-mono font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            CORE CAPABILITIES
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 animate-fade-in">
            Architected to Restore What Was{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">
              Thought Lost
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Standard upscaling stretches pixels, introducing blur and noise. PixelBoost AI uses localized Convolutional Neural Networks (CNNs) to synthesize missing high-frequency micro-data.
          </p>
        </div>

        {/* SECTION 1: Features Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
          
          {/* Left Column: Interactive Navigation & Feature Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-white/5 rounded-xl self-start mb-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-sans uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === cat.id
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Feature Cards Stack */}
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {filteredFeatures.map((f) => {
                  const isSelected = selectedFeature === f.id;
                  const IconComponent = f.icon;
                  return (
                    <motion.div
                      key={f.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setSelectedFeature(f.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden group shadow-sm hover:shadow ${
                        isSelected 
                          ? 'bg-blue-50/50 dark:bg-[#111827]/60 border-[#2563EB]/40 dark:border-blue-500/40 shadow-blue-500/5' 
                          : 'bg-white dark:bg-[#111827]/25 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-[#111827]/40'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white tracking-wide font-sans">{f.title}</h3>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{f.description}</p>
                        </div>
                      </div>

                      {/* Accent indicator dot on selected card */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#FBBF24] shadow-[0_0_6px_rgba(37,99,235,0.4)] dark:shadow-[0_0_6px_#FBBF24]" />
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Deep-Dive Panel */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-md dark:shadow-2xl relative overflow-hidden text-left h-full">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeatureObj.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded">
                      MODULE: {activeFeatureObj.tag}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 font-sans">{activeFeatureObj.title}</h2>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-mono font-extrabold text-[#2563EB] dark:text-[#14B8A6]">{activeFeatureObj.metric}</span>
                    <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">{activeFeatureObj.metricLabel}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {activeFeatureObj.description}
                </p>

                {/* Sub-features list */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Engineering Specs:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {activeFeatureObj.techSpecs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[11px] text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400 shrink-0" />
                        <span className="font-sans font-semibold">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conceptual Neural Path Graph */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                    <span>Active Convolution Path</span>
                    <span className="text-[#2563EB] dark:text-[#14B8A6] font-semibold">Processing Layer: 64ch</span>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5">
                    {['Raw Input', 'Feature Extraction', 'RRDB Blocks (x23)', 'Sub-Pixel Conv', 'Final Reconstruction'].map((step, idx) => (
                      <React.Fragment key={step}>
                        <div className={`p-1.5 rounded border text-[8px] font-mono text-center flex-1 transition-colors ${
                          idx === 2 
                            ? 'bg-gradient-to-r from-blue-500/10 to-teal-500/10 border-[#2563EB]/30 dark:border-blue-500/30 text-[#2563EB] dark:text-white font-bold'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400'
                        }`}>
                          {step}
                        </div>
                        {idx < 4 && <span className="hidden sm:inline text-slate-400 dark:text-slate-600 text-[9px]">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* SECTION 2: Interactive Real-time Slider Visualizer */}
        <div className="bg-slate-50 dark:bg-[#111827]/20 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-xl text-left mb-16 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.03),transparent_35%)] pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 border-b border-slate-200 dark:border-white/10 pb-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2563EB] dark:text-[#FBBF24]">Interactive Comparison Simulator</span>
              <h2 className="text-xl md:text-2xl font-sans font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                Inspect high-frequency edge reconstruction
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed font-sans">
                Select an image asset category below, then drag the slider back and forth to witness the restoration of synthesized details and sub-pixel geometries.
              </p>
            </div>

            {/* category selectors */}
            <div className="flex gap-2 self-start lg:self-center">
              {Object.keys(comparisons).map((key) => (
                <button
                  key={key}
                  onClick={() => setComparisonCategory(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wide border transition-all cursor-pointer ${
                    comparisonCategory === key
                      ? 'bg-white border-[#2563EB]/40 text-[#2563EB] dark:bg-[#111827] dark:border-blue-500/40 dark:text-blue-400 shadow-sm'
                      : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/10'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Split-Canvas container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 flex justify-center">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 select-none max-w-3xl bg-slate-100 dark:bg-slate-950">
                
                {/* Left Side: Original Blurred */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={comparisons[comparisonCategory].before}
                    alt="Original low-res preview"
                    className="w-full h-full object-cover blur-[1.5px]"
                    style={{ imageRendering: 'pixelated' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 z-20 bg-white/95 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-white/5 px-2.5 py-1 rounded-md text-[9px] font-mono text-slate-600 dark:text-slate-400 uppercase font-bold tracking-wider shadow-sm">
                    Compressed Low-Res Input
                  </div>
                </div>

                {/* Right Side: Enhanced Clear */}
                <div 
                  className="absolute inset-0 h-full overflow-hidden transition-all duration-75"
                  style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
                >
                  <img
                    src={comparisons[comparisonCategory].after}
                    alt="Upscaled premium asset preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 right-4 z-20 bg-gradient-to-r from-[#2563EB] to-[#14B8A6] border border-blue-400/25 px-2.5 py-1 rounded-md text-[9px] font-mono text-white uppercase font-extrabold tracking-wider shadow-lg">
                    Enhanced Output (4K Asset)
                  </div>
                </div>

                {/* Interactive Slider line bar */}
                <div 
                  className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-[#2563EB] via-teal-400 to-[#2563EB] z-30 cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                >
                  {/* Slider drag handle badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 dark:border-teal-400 flex items-center justify-center text-blue-600 dark:text-teal-400 shadow-xl pointer-events-none">
                    <Sliders className="w-3.5 h-3.5 rotate-90" />
                  </div>
                </div>

                {/* Absolute overlay invisible slide element to capture mouse/drag events */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                />

              </div>
            </div>

            {/* Slider Explanation notes */}
            <div className="lg:col-span-4 space-y-5 text-left">
              <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-sm">
                <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded">Active Scene Details</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 font-sans">{comparisons[comparisonCategory].title}</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-sans">{comparisons[comparisonCategory].desc}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Observable enhancements:</h4>
                <div className="space-y-2">
                  {[
                    'Eradicates JPEG blockade & compression blocks',
                    'Maintains high contrast boundary precision',
                    'Interpolates textures on high-frequency channels'
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-sans text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
