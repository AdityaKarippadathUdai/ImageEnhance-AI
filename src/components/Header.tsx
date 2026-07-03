import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Sparkles, Sun, Moon, Github, Menu, X, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export default function Header({ currentView = 'home', onNavigate }: HeaderProps) {
  const [localActiveSection, setLocalActiveSection] = useState<string>('home');
  const [isThemeDark, setIsThemeDark] = useState<boolean>(true); // toggles dark theme sub-variants
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  const activeSection = onNavigate ? currentView : localActiveSection;

  // Monitor scroll height to apply sticky background opacity changes (glass transition)
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up active section tracking via IntersectionObserver
  useEffect(() => {
    if (onNavigate) return; // Disable observer if custom page-based routing is active

    const sections = ['hero', 'features', 'playground'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // high precision active zone
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'hero') {
            setLocalActiveSection('home');
          } else if (entry.target.id === 'features') {
            setLocalActiveSection('features');
          } else if (entry.target.id === 'playground') {
            setLocalActiveSection('technology');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [onNavigate]);

  const scrollToSection = (id: string, sectionName: string) => {
    setIsMobileMenuOpen(false);
    setLocalActiveSection(sectionName);
    
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavItemClick = (targetId: string, sectionName: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(targetId, sectionName);
    }
  };

  const toggleTheme = () => {
    setIsThemeDark(!isThemeDark);
    const body = document.body;
    if (isThemeDark) {
      // Switch from default Cosmic Obsidian background to pure Midnight Onyx dark theme
      body.classList.remove('bg-[#020617]');
      body.classList.add('bg-[#050505]');
    } else {
      body.classList.remove('bg-[#050505]');
      body.classList.add('bg-[#020617]');
    }
  };

  const navItems = [
    { name: 'Home', section: 'home', target: 'hero' },
    { name: 'Features', section: 'features', target: 'features' },
    { name: 'Technology', section: 'technology', target: 'playground' },
  ];

  return (
    <header 
      id="main-navigation"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        hasScrolled 
          ? 'bg-[#020617]/70 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_10px_30px_-10px_rgba(2,6,23,0.3)]' 
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* LEFT: PixelBoost AI Brand Logo */}
        <div 
          onClick={() => handleNavItemClick('hero', 'home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/45 transition-all duration-300">
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
            PixelBoost
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6] font-mono text-[10px] font-bold tracking-normal border border-blue-500/35 px-1.5 py-0.5 rounded-md bg-blue-500/5">
              AI
            </span>
          </span>
        </div>

        {/* CENTER: Premium Nav Links with gold layout indicators */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <button
                key={item.name}
                onClick={() => handleNavItemClick(item.target, item.section)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors cursor-pointer select-none font-sans ${
                  isActive ? 'text-[#FBBF24]' : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2.5px] rounded-full bg-[#FBBF24] shadow-[0_0_8px_#FBBF24]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          
          {/* Centered GitHub nav link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold tracking-wide text-[#CBD5E1] hover:text-white transition-colors flex items-center gap-1 font-sans"
          >
            GitHub
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </nav>

        {/* RIGHT: Theme Toggle & GitHub CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={isThemeDark ? "Switch to Midnight Onyx" : "Switch to Cosmic Obsidian"}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/35 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer shadow-md"
          >
            <motion.div
              key={isThemeDark ? "dark" : "pure-dark"}
              initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isThemeDark ? (
                <Moon className="w-4 h-4 text-blue-400" />
              ) : (
                <Sun className="w-4 h-4 text-[#14B8A6]" />
              )}
            </motion.div>
          </button>

          {/* GitHub CTA Button */}
          <a
            id="nav-github-cta"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-slate-900 border border-white/10 hover:border-blue-500/35 hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-black/20 font-sans"
          >
            <Github className="w-3.5 h-3.5 text-blue-400 group-hover:text-[#14B8A6]" />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300"
          >
            {isThemeDark ? (
              <Moon className="w-3.5 h-3.5 text-blue-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#14B8A6]" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full border-t border-white/10 bg-[#020617]/95 backdrop-blur-xl overflow-hidden text-left"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.section;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavItemClick(item.target, item.section)}
                    className={`py-2 text-sm font-semibold tracking-wide text-left flex items-center justify-between border-b border-white/5 pb-2 ${
                      isActive ? 'text-[#FBBF24]' : 'text-slate-300'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_6px_#FBBF24]" />}
                  </button>
                );
              })}
              
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-sm font-semibold tracking-wide text-slate-300 border-b border-white/5 pb-2 flex items-center justify-between"
              >
                <span>GitHub Link</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-3 rounded-xl bg-slate-900 border border-white/10 text-center font-bold text-xs tracking-wider uppercase text-white flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4 text-blue-400" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
