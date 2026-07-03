import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, Layers, Check, Copy, CheckCircle2 } from 'lucide-react';

interface TechBlock {
  id: string;
  name: string;
  title: string;
  math: string;
  description: string;
  stats: Record<string, string>;
}

export default function TechnologyPage() {
  const [activeTab, setActiveTab] = useState<string>('rrdb');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  const blocks: TechBlock[] = [
    {
      id: 'rrdb',
      name: 'RRDB Network Architecture',
      title: 'Residual-in-Residual Dense Blocks',
      math: 'Y = β * F_Dense(X) + X',
      description: 'Unlike standard Residual blocks that stack simple convolutions, RRDB removes batch normalization layers to save GPU memory and introduces dense multi-layer skip connections. These connections pass forward shallow visual gradients directly to deeper layers, preserving structural shape integrity during deep upscale extraction.',
      stats: {
        'Residual Layers': '23 Dense Blocks',
        'Parameter Weight': '16.7 Million',
        'Inference Type': 'FP16 Half-Precision',
        'Kernel Density': '3 × 3 Convolutional'
      }
    },
    {
      id: 'discriminator',
      name: 'Perceptual VGG Discriminator',
      title: 'Relativistic GAN Loss Structure',
      math: 'D_Ra(x_r, x_f) = σ(C(x_r) - E[C(x_f)])',
      description: 'The model doesn\'t optimize purely on L1 pixel-to-pixel distances, which yields blurry images. Instead, a secondary Perceptual Discriminator (trained on VGG19 activations) judges the upscaled output. It measures if the synthesized photo features "look like" real photograph textures, driving realistic high-frequency detail generation.',
      stats: {
        'Loss Metric': 'Relativistic RaGAN Loss',
        'Feature Extractor': 'VGG-19 Intermediate Map',
        'Content Scale': 'L1 Pixel + Perceptual Loss',
        'Validation Ratio': '98.6% SSIM'
      }
    },
    {
      id: 'subpixel',
      name: 'Sub-Pixel Convolution',
      title: 'Sub-Pixel Shuffle Interpolation',
      math: 'H × W × C_out * r^2 → rH × rW × C_out',
      description: 'Standard bilinear upsamplers or transposed convolutions suffer from checkerboard artifacts. Sub-Pixel Convolution overcomes this by keeping resolution identical, but increasing the channel volume by the square of the upscale factor. A pixel shuffling step then redistributes channels to the spatial width/height, creating pristine edges.',
      stats: {
        'Grid Operator': 'I_2D PixelShuffle',
        'Artifact Profile': 'Zero Checkerboard Ringing',
        'Scale Coefficient': 'r = 2 / r = 4',
        'Channel Output': '64-channel Dense Map'
      }
    }
  ];

  const codeSnippets: Record<string, Record<string, string>> = {
    python: {
      title: 'Inference via PyTorch Client',
      code: `import torch
from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet

# 1. Initialize the RRDB Generator architecture
model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)

# 2. Bind weights and load on CUDA GPU
upscaler = RealESRGANer(
    scale=4,
    model_path='weights/RealESRGAN_x4plus.pth',
    model=model,
    tile=400, # Tile dimensions for massive asset scaling
    tile_pad=10,
    pre_pad=0,
    half=True # FP16 half-precision execution
)

# 3. Read low-res asset and process
img_input = cv2.imread('compressed_lowres.jpg')
enhanced_output, _ = upscaler.enhance(img_input, outscale=4)

# 4. Save lossless production output
cv2.imwrite('pristine_4k_output.png', enhanced_output)
print("Convolution successful! Frame resolution multiplied 400%")`
    },
    node: {
      title: 'Inference via REST API',
      code: `import axios from 'axios';
import fs from 'fs';

// 1. Prepare asset payload
const fileBuffer = fs.readFileSync('compressed_lowres.jpg');
const base64Image = fileBuffer.toString('base64');

// 2. Transmit to high-density GPU cluster
const response = await axios.post('https://api.pixelboost.ai/v2/upscale', {
  image: base64Image,
  scale_factor: 4,
  model: 'realesrgan-x4plus',
  precision: 'fp16',
  enhance_facial: true
}, {
  headers: { 'Authorization': 'Bearer ' + process.env.PIXELBOOST_SECRET_KEY }
});

// 3. Decode pristine high-res asset
const enhancedBuffer = Buffer.from(response.data.enhanced_image, 'base64');
fs.writeFileSync('pristine_4k_output.png', enhancedBuffer);

console.log(\`Refinement resolved. Target output dimension: \${response.data.resolution}\`);`
    }
  };

  const handleCopy = () => {
    const activeCode = codeSnippets[selectedLanguage].code;
    navigator.clipboard.writeText(activeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const activeBlockObj = blocks.find(b => b.id === activeTab) || blocks[0];

  const pipelineSteps = [
    { title: 'Asset Ingest', desc: 'Normalized base RGB matrix bounds (0-1 floats) mapping channel ranges.' },
    { title: 'Feature Extraction', desc: 'Single 3x3 convolution extracts preliminary 64-channel visual cues.' },
    { title: 'RRDB Dense Passes', desc: '23 layers of non-linear dense feedback blocks recursively synthesize textures.' },
    { title: 'Sub-Pixel Shuffle', desc: 'Reshapes dense channel dimensions to true spatial high-resolution bounds.' },
    { title: 'Chromatic Refine', desc: 'Secondary attention maps perform sub-pixel specular highlight correction.' }
  ];

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-[#F8FAFC] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-[20%] right-[-100px] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-150px] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs text-[#14B8A6] font-mono font-bold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            ENGINEERING SCHEMATICS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            The Deep Stack Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6]">
              Sub-Pixel Precision
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Our super-resolution engine is optimized for high-throughput, low-latency creative pipelines. Explore the neural network topologies, mathematically clean upsamplers, and production deployment scripts.
          </p>
        </div>

        {/* SECTION 1: Pipeline Interactive Flowchart */}
        <div className="bg-slate-50 dark:bg-[#111827]/30 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 mb-16 text-left relative shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
            <Layers className="w-4.5 h-4.5 text-[#14B8A6]" />
            CNN Computational Pipeline Diagram
          </h3>

          {/* Flow Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {pipelineSteps.map((step, idx) => {
              const isActive = activePipelineStep === idx;
              return (
                <div
                  key={step.title}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden text-left ${
                    isActive 
                      ? 'bg-white border-[#2563EB]/50 dark:bg-slate-900 dark:border-blue-500/50 shadow-md' 
                      : 'bg-slate-100/60 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 shadow-sm'
                  }`}
                >
                  {/* Step ID Badge */}
                  <div className={`text-[9px] font-mono font-bold tracking-wider mb-2 ${isActive ? 'text-[#2563EB] dark:text-blue-400' : 'text-slate-500'}`}>
                    STEP_0{idx + 1}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5 font-sans">{step.title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed leading-normal">{step.desc}</p>
                  
                  {/* Active highlight lines */}
                  {isActive && (
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-[#14B8A6]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Active step readout block */}
          <div className="p-4 bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 rounded-xl font-mono text-xs text-slate-700 dark:text-slate-300 shadow-sm flex items-start gap-1.5">
            <span className="text-[#2563EB] dark:text-emerald-400 font-bold mr-1.5 shrink-0">► [PIPELINE NODE ACTIVE]:</span>
            <span>{pipelineSteps[activePipelineStep].desc}</span>
          </div>
        </div>

        {/* SECTION 2: Architecture Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* Left Side: Controls & Topology selector */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2563EB] dark:text-[#FBBF24]">Topology Schematics</span>
            <h2 className="text-xl md:text-2xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
              Network Topology Modules
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed font-sans">
              Select an algorithm block to dissect the mathematical weights, layer configurations, and structural models running on CUDA GPU cores.
            </p>

            <div className="flex flex-col gap-2">
              {blocks.map((b) => {
                const isActive = activeTab === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveTab(b.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                      isActive 
                        ? 'bg-white border-[#2563EB]/40 dark:border-[#14B8A6]/40 text-[#2563EB] dark:text-[#14B8A6] shadow-sm' 
                        : 'bg-slate-50 dark:bg-[#111827]/25 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 shadow-sm'
                    }`}
                  >
                    <div className="font-semibold text-xs font-sans text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{b.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 font-mono">{b.title}</div>
                    
                    {isActive && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#FBBF24] shadow-[0_0_6px_rgba(37,99,235,0.4)] dark:shadow-[0_0_6px_#FBBF24]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Deep mathematical and spec readouts */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950/75 border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 text-left relative overflow-hidden min-h-[380px] shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#14B8A6]/10 to-transparent rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeBlockObj.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xs font-bold text-[#14B8A6] font-mono uppercase tracking-widest">{activeBlockObj.title}</h3>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1 font-sans">{activeBlockObj.name}</h2>
                </div>

                {/* Mathematical Equation Block */}
                <div className="p-4 bg-slate-50 dark:bg-[#111827]/60 border border-slate-200 dark:border-white/5 rounded-xl text-left relative overflow-hidden">
                  <div className="text-[9px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-1.5">Functional Objective</div>
                  <div className="text-sm font-mono font-bold text-[#2563EB] dark:text-blue-400 select-all">{activeBlockObj.math}</div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {activeBlockObj.description}
                </p>

                {/* Technical Specifications Matrix */}
                <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-white/10 pt-5 text-left">
                  {Object.entries(activeBlockObj.stats).map(([label, val]) => (
                    <div key={label}>
                      <span className="text-[9px] text-slate-500 dark:text-slate-500 font-mono uppercase block tracking-wider">{label}</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white mt-1 font-sans">{val}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* SECTION 3: API Integration Snippet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 text-left space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2563EB] dark:text-[#FBBF24]">Developer SDK Integration</span>
            <h2 className="text-xl md:text-2xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
              Production API Integration
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Invoke the upscaling CNN from python workloads or server-side scripts. Our endpoint automatically manages tensor memory pools to scale any resolution dynamically.
            </p>

            {/* Language Toggles */}
            <div className="flex gap-1.5 p-1 bg-slate-100 border border-slate-200 dark:bg-slate-950/80 dark:border-white/5 rounded-xl self-start w-fit">
              {['python', 'node'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#14B8A6] text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lang === 'python' ? 'Python SDK' : 'Node.js REST'}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg dark:shadow-2xl relative text-left">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 dark:border-white/5">
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#14B8A6]" />
                {codeSnippets[selectedLanguage].title}
              </span>
              
              <button
                onClick={handleCopy}
                className="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-sans"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Highlight Box */}
            <div className="p-4 overflow-x-auto h-72">
              <pre className="font-mono text-[11px] text-slate-300 leading-relaxed">
                <code>{codeSnippets[selectedLanguage].code}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
