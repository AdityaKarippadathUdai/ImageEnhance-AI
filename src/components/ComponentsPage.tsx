import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Layers, Sparkles, Sliders, Play, Code, ArrowRight, ChevronRight, 
  Activity, FileText, CheckCircle2, ShieldCheck, Zap, BarChart3, HelpCircle, 
  RefreshCw, Eye, Maximize2, Download, Info, AppWindow, Database, Share2,
  Table, Workflow, Terminal, Image as ImageIcon
} from 'lucide-react';
import ImageMetadataPanel from './ImageMetadataPanel';
import EnhancedImageSummary from './EnhancedImageSummary';
import BentoFeatures from './BentoFeatures';

export default function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState<string>('playground');

  const componentsList = [
    {
      id: 'playground',
      name: 'UpscalePlayground',
      category: 'Workspace Core',
      icon: AppWindow,
      short: 'The primary super-resolution sandbox coordinating uploads, state machines, and viewports.'
    },
    {
      id: 'summary',
      name: 'EnhancedImageSummary',
      category: 'Interactive Display',
      icon: Sparkles,
      short: 'Premium glassmorphic analytics card showcasing model parameters and high-speed CTAs.'
    },
    {
      id: 'metadata',
      name: 'ImageMetadataPanel',
      category: 'Telemetry/Inspector',
      icon: Database,
      short: 'Real-time pixel extractor revealing color depths, dimensional aspects, and sizes.'
    },
    {
      id: 'bento',
      name: 'BentoFeatures',
      category: 'Showcase Grid',
      icon: Layers,
      short: 'High-density card grid demonstrating advanced scaling parameters and features.'
    },
    {
      id: 'technology',
      name: 'TechnologyPage',
      category: 'Deep Architecture',
      icon: Cpu,
      short: 'Comprehensive ESRGAN computational graph and deep neural network simulator.'
    }
  ];

  // Helper to render live component previews
  const renderLivePreview = (id: string) => {
    switch (id) {
      case 'metadata':
        return (
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/30">
            <span className="text-[10px] font-mono font-bold text-slate-400 block mb-4 uppercase tracking-wider">Live Metadata Preview</span>
            <ImageMetadataPanel
              fileName="sample_raw_portrait.jpg"
              width={1024}
              height={1024}
              fileSize={1430221}
              fileFormat="image/jpeg"
              colorMode="RGB"
              scaleFactor={4}
            />
          </div>
        );
      case 'summary':
        return (
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/30">
            <span className="text-[10px] font-mono font-bold text-slate-400 block mb-4 uppercase tracking-wider">Live Summary Preview</span>
            <EnhancedImageSummary
              imageSrc="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400"
              fileName="misty_alpine.jpg"
              originalWidth={1024}
              originalHeight={768}
              fileSize={820400}
              fileFormat="JPEG"
              scaleFactor={4}
              processingTime={2.8}
              status="success"
              onDownload={() => alert('Download triggered!')}
              onCompare={() => alert('Comparison viewport focused!')}
              onReset={() => alert('Workspace reset!')}
              onRetry={() => alert('Pipeline re-run!')}
            />
          </div>
        );
      case 'bento':
        return (
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/30 max-h-[400px] overflow-y-auto">
            <span className="text-[10px] font-mono font-bold text-slate-400 block mb-4 uppercase tracking-wider">Live Bento Grid Preview</span>
            <BentoFeatures />
          </div>
        );
      case 'playground':
        return (
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/30 text-center space-y-4">
            <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">UpscalePlayground Layout Overview</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs font-sans">
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl">
                <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                  Dropzone Area
                </h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Supports Drag & Drop, Copy/Paste from clipboard, and standard file explorers. Automatically reads sizes, formats, and colors.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl">
                <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                  Parameter Controls
                </h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Features interactive radio buttons constraining scales to 2x and 4x, maintaining mathematical compatibility with neural network weights.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl">
                <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Dual-Viewport Slider
                </h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Interactive side-by-side comparative views of before (original blur) and after (neural upscale), with smooth coordinate calculations.
                </p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl">
                <h5 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  Durable Outputs Card
                </h5>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Replaces basic CTA button with Premium Enhanced Image Summary showcasing sub-pixel detail logs, processing scales, and file streams.
                </p>
              </div>
            </div>
          </div>
        );
      case 'technology':
        return (
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/30 text-center space-y-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wider">TechnologyPage Architecture</span>
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl text-left space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                <span className="text-xs font-bold font-sans text-slate-800 dark:text-slate-200">Neural Network Topology</span>
                <span className="text-[9px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">RaGAN Weights Loaded</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                The Technology page acts as an educational simulator. It models the adversarial loop, renders high-precision SVG flowchart paths with custom tooltips, compares mathematical bicubic interpolation side-by-side with Generative Super-Resolution, and displays live-streaming CUDA GPU buffers.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Content catalog of working details
  const getComponentDetails = (id: string) => {
    switch (id) {
      case 'playground':
        return {
          title: 'UpscalePlayground Component',
          subtitle: 'System Orchestration Center',
          desc: 'This is the parent sandbox coordinating the image enhancement pipeline. It contains multiple state hooks that handle file ingestion, real-time loading streams, process timelines, and output assets.',
          states: [
            { name: 'customImage', type: 'string | null', desc: 'The base64 data URI of the uploaded source file.' },
            { name: 'scaleFactor', type: '2 | 4', desc: 'Spatially determines upscaling target (2x or 4x scale).' },
            { name: 'isProcessing', type: 'boolean', desc: 'Indicates if the pipeline neural steps are running.' },
            { name: 'processingLogs', type: 'string[]', desc: 'Appends progressive logs stream during inference.' },
            { name: 'hasProcessed', type: 'boolean', desc: 'Enables download CTAs and final summary cards.' }
          ],
          props: [
            { name: 'No props', type: '—', default: '—', desc: 'Standalone workspace component managing local states.' }
          ],
          logic: 'Features a document-wide `paste` event listener to easily capture files from the clipboard. Pre-flight checks calculate aspect ratios, pixel density, and clamp huge resolutions to protect client memory resources.'
        };
      case 'summary':
        return {
          title: 'EnhancedImageSummary Component',
          subtitle: 'Super-Resolution Output Dashboard',
          desc: 'A premium, glassmorphic analytics card appearing automatically upon pipeline completion. It maps deep network metrics visually and clusters user actions dynamically.',
          states: [
            { name: 'sizeMultiplier', type: 'const number', desc: 'Simulates high-frequency file weight expansion (~3.2x for 2x, ~11.5x for 4x).' }
          ],
          props: [
            { name: 'imageSrc', type: 'string | null', default: 'Required', desc: 'Base64 image string for output thumbnail rendering.' },
            { name: 'fileName', type: 'string', default: 'Required', desc: 'Source name for downloaded asset prefixes.' },
            { name: 'scaleFactor', type: 'number', default: '4', desc: 'Spatially computes final dimensions.' },
            { name: 'processingTime', type: 'number', default: '0', desc: 'Actual inference duration in seconds.' },
            { name: 'status', type: '"success" | "failed"', default: '"success"', desc: 'Determines success layout vs error messages.' },
            { name: 'onDownload', type: '() => void', default: 'Required', desc: 'Trigger for browser file download.' },
            { name: 'onCompare', type: '() => void', default: 'Required', desc: 'Smoothly scrolls viewports into view.' },
            { name: 'onReset', type: '() => void', default: 'Required', desc: 'Resets workspace state.' }
          ],
          logic: 'Utilizes custom mathematical functions to dynamically approximate realistic post-ESRGAN compressed file sizes based on the input byte arrays.'
        };
      case 'metadata':
        return {
          title: 'ImageMetadataPanel Component',
          subtitle: 'Real-time Source Ingest Analyzer',
          desc: 'A sidecar utility displaying parsed low-res metadata parameters. It helps users understand color modes, image aspect ratios, and format standards before triggering upscaling neural weights.',
          states: [
            { name: 'None', type: '—', desc: 'Strictly deterministic stateless component.' }
          ],
          props: [
            { name: 'fileName', type: 'string', default: '""', desc: 'The base file name.' },
            { name: 'width', type: 'number', default: '0', desc: 'Extracted source pixel width.' },
            { name: 'height', type: 'number', default: '0', desc: 'Extracted source pixel height.' },
            { name: 'fileSize', type: 'number | null', default: 'null', desc: 'The file weight in bytes.' },
            { name: 'fileFormat', type: 'string | null', default: 'null', desc: 'Standard MIME type (e.g. image/png).' },
            { name: 'colorMode', type: 'string | null', default: 'null', desc: 'Calculated color profile (RGB, RGBA, CMYK).' }
          ],
          logic: 'Performs rapid unit conversions (Bytes to KB/MB) and generates proportional aspect ratio pill displays dynamically (e.g. 1:1, 4:3, 16:9).'
        };
      case 'bento':
        return {
          title: 'BentoFeatures Component',
          subtitle: 'Advanced Feature Presentation Grid',
          desc: 'A structural, high-density dashboard showcase. It uses responsive bento grids and interactive cards to explain upscaler attributes, noise reduction ratios, and model weight classes.',
          states: [
            { name: 'hoveredIndex', type: 'number | null', desc: 'Tracks active cursor locations to coordinate subtle 3D hovering transformations.' }
          ],
          props: [
            { name: 'None', type: '—', default: '—', desc: 'Static structural grid designed to blend into home dashboards.' }
          ],
          logic: 'Employs standard Framer Motion staggered animations on mounting. High-contrast colors are managed dynamically through CSS variables supporting dark-mode variations.'
        };
      case 'technology':
        return {
          title: 'TechnologyPage Component',
          subtitle: 'ESRGAN Deep Architecture Page',
          desc: 'The architectural core of our technical explanation, featuring an interactive vector graph (SVG) mapping deep neural pathways, continuous dense skip-connections, and adversarial discriminator networks.',
          states: [
            { name: 'activeArchNode', type: 'string', desc: 'Tracks the currently clicked node in the vector flow chart.' },
            { name: 'sliderPosition', type: 'number', desc: 'The coordinate position percentage (0-100) of the before/after image slider.' },
            { name: 'isSliding', type: 'boolean', desc: 'Monitors active mouse/touch drag triggers on the canvas.' },
            { name: 'simulationLogs', type: 'string[]', desc: 'Feeds simulated PyTorch/CUDA log entries dynamically to the active terminal panel.' }
          ],
          props: [
            { name: 'onNavigate', type: '(view: string) => void', default: 'undefined', desc: 'Triggers page routing transitions back to workspace views.' }
          ],
          logic: 'Calculates cursor delta coordinates on the slider container relative to its container bounding box (`getBoundingClientRect`), ensuring perfect drag responsiveness across desktop and mobile browsers.'
        };
      default:
        return null;
    }
  };

  const details = getComponentDetails(selectedComponent);

  return (
    <div id="components-guide-page" className="w-full min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-[#F8FAFC] py-12 relative overflow-hidden select-none">
      
      {/* Ambient backgrounds */}
      <div className="absolute top-[15%] left-[-200px] w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-150px] w-[450px] h-[450px] bg-teal-500/5 dark:bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-left">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 dark:border-white/15 pb-8 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 font-bold font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            Component Architecture
          </div>
          <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Detailed Component Workings
          </h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-3xl mt-3 font-sans leading-relaxed">
            Inspect our system components. Below is an exhaustive structural guide detailing the inputs (props), localized state machines, event handshakes, and rendering patterns that form our super-resolution system.
          </p>
        </div>

        {/* Master layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider pl-2 mb-1">
              Select Component Node
            </span>
            {componentsList.map((comp) => {
              const IconComp = comp.icon;
              const isSelected = selectedComponent === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedComponent(comp.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 relative overflow-hidden group cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-transparent border-blue-500/35 shadow-sm scale-[1.01]' 
                      : 'bg-white/45 dark:bg-[#090d16]/30 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-tr from-blue-600 to-teal-500 text-white border-blue-400' 
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10 group-hover:text-slate-650 dark:group-hover:text-slate-200'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 pr-2">
                    <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
                      {comp.category}
                    </span>
                    <h4 className={`text-sm font-bold font-sans tracking-tight transition-colors ${
                      isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-slate-250'
                    }`}>
                      {comp.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal line-clamp-2 mt-1">
                      {comp.short}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">
                      <ChevronRight className="w-5 h-5 animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Detail Panel Section */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {details && (
                <motion.div
                  key={selectedComponent}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  {/* Detailed Description Panel */}
                  <div className="bg-white/50 dark:bg-[#090d16]/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4 mb-5">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                          {details.subtitle}
                        </span>
                        <h2 className="text-xl md:text-2xl font-sans font-extrabold text-slate-950 dark:text-white">
                          {details.title}
                        </h2>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-3 py-1 bg-gradient-to-r from-blue-500/15 to-teal-500/15 text-blue-600 dark:text-teal-400 rounded-full border border-teal-500/20">
                        React_V18_TS
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-6">
                      {details.desc}
                    </p>

                    {/* Local States Schema */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-xs font-bold font-sans tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pl-1">
                        <Terminal className="w-4 h-4 text-blue-500" />
                        Reactive State Variables (`useState`)
                      </h4>
                      <div className="overflow-hidden border border-slate-100 dark:border-white/5 rounded-2xl">
                        <table className="w-full text-xs font-sans text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/5">
                              <th className="p-3 font-semibold">State Name</th>
                              <th className="p-3 font-semibold">Type Signature</th>
                              <th className="p-3 font-semibold">Functional Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {details.states.map((st) => (
                              <tr key={st.name} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 duration-200">
                                <td className="p-3 font-mono font-bold text-[#14B8A6]">{st.name}</td>
                                <td className="p-3 font-mono text-[10.5px] text-slate-600 dark:text-slate-400">{st.type}</td>
                                <td className="p-3 text-slate-500">{st.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Component API Props Schema */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-xs font-bold font-sans tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pl-1">
                        <Table className="w-4 h-4 text-teal-500" />
                        Component API Properties (`Props`)
                      </h4>
                      <div className="overflow-hidden border border-slate-100 dark:border-white/5 rounded-2xl">
                        <table className="w-full text-xs font-sans text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/5">
                              <th className="p-3 font-semibold">Prop Key</th>
                              <th className="p-3 font-semibold">Type</th>
                              <th className="p-3 font-semibold">Default</th>
                              <th className="p-3 font-semibold">Scope of Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {details.props.map((pr) => (
                              <tr key={pr.name} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 duration-200">
                                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{pr.name}</td>
                                <td className="p-3 font-mono text-[10.5px] text-slate-600 dark:text-slate-400">{pr.type}</td>
                                <td className="p-3 font-mono text-[10.5px] text-slate-500">{pr.default}</td>
                                <td className="p-3 text-slate-500">{pr.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Operational Logic */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold font-sans tracking-tight text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pl-1">
                        <Workflow className="w-4 h-4 text-purple-500" />
                        Event Handlers & Internal Logic Flow
                      </h4>
                      <div className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-white/5 rounded-2xl flex items-start gap-3.5 text-xs text-slate-600 dark:text-slate-400">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="leading-relaxed font-sans">
                          <strong>Algorithmic Execution:</strong> {details.logic}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Render Live Preview Frame */}
                  {renderLivePreview(selectedComponent)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
