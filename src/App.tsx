import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, Eye, Layers, Zap, Cpu, Code } from 'lucide-react';
import Header from './components/Header';
import UpscalePlayground from './components/UpscalePlayground';
import BentoFeatures from './components/BentoFeatures';
import FeaturesPage from './components/FeaturesPage';
import TechnologyPage from './components/TechnologyPage';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchPlayground = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      // Delay slightly to let the home view mount, then scroll smoothly
      setTimeout(() => {
        scrollToSection('playground');
      }, 100);
    } else {
      scrollToSection('playground');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-sans antialiased overflow-x-hidden selection:bg-turquoise-500/20 selection:text-turquoise-300 transition-colors duration-500">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/10 to-turquoise-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-[400px] right-10 w-[400px] h-[400px] bg-gradient-to-br from-turquoise-500/5 to-amber-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>

      {/* Persistent Global Header */}
      <Header currentView={currentView} onNavigate={setCurrentView} />

      {/* Dynamic View Panel with Smooth Framer Motion Transition */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* HERO SECTION */}
            <section id="hero" className="relative pt-20 pb-24 px-4 md:px-8 border-b border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                
                {/* Top Pill Announcement */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-slate-300 mb-6 hover:border-white/20 transition-all cursor-pointer"
                  onClick={() => setCurrentView('features')}
                >
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turquoise-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-turquoise-500"></span>
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold mr-1">NEW RELEASE</span>
                  PixelBoost Core v2.4 (ESRGAN-v4 weights online)
                  <ArrowRight className="w-3 h-3 text-slate-500 ml-0.5" />
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
                >
                  Turn Compressed Blurry Photos Into{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-turquoise-400 to-[#14B8A6]">
                    Pristine 4K Assets
                  </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10 font-sans"
                >
                  Synthesize lost textures, restore facial symmetry, and eliminate compression artifacts instantly. Engineered on A100-GPU grids for ultra-low latency creative pipelines.
                </motion.p>

                {/* Call to Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
                >
                  <button
                    id="hero-primary-cta"
                    onClick={handleLaunchPlayground}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-turquoise-400 via-cyan-400 to-blue-400 hover:from-turquoise-300 hover:to-blue-300 transition-all cursor-pointer shadow-xl shadow-turquoise-500/10 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4.5 h-4.5 fill-slate-950 stroke-none" />
                    Launch Live Playground
                  </button>
                  <button
                    id="hero-secondary-cta"
                    onClick={() => setCurrentView('features')}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-slate-900 border border-white/10 hover:border-white/20 hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Explore Core Features
                  </button>
                </motion.div>

              </div>
            </section>

            {/* INTERACTIVE WORKSPACE/PLAYGROUND SECTION */}
            <UpscalePlayground />

            {/* BENTO CAPABILITIES/FEATURES */}
            <BentoFeatures />
          </motion.div>
        )}

        {currentView === 'features' && (
          <motion.div
            key="features-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <FeaturesPage />
          </motion.div>
        )}

        {currentView === 'technology' && (
          <motion.div
            key="technology-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <TechnologyPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL FOOTER */}
      <Footer onNavigate={setCurrentView} />

    </div>
  );
}
