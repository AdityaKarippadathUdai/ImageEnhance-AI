import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Sun, Moon, Github, Menu, X, ExternalLink } from 'lucide-react';

interface HeaderProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
  theme?: 'light' | 'dark';
  onChangeTheme?: (theme: 'light' | 'dark') => void;
}

export default function Header({ 
  currentView = 'home', 
  onNavigate,
  theme = 'dark',
  onChangeTheme
}: HeaderProps) {
  const [localActiveSection, setLocalActiveSection] = useState<string>('home');
  const [localTheme, setLocalTheme] = useState<'light' | 'dark'>('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  const activeSection = onNavigate ? currentView : localActiveSection;
  const currentTheme = onChangeTheme ? theme : localTheme;

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
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (onChangeTheme) {
      onChangeTheme(nextTheme);
    } else {
      setLocalTheme(nextTheme);
      const root = document.documentElement;
      if (nextTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  const navItems = [
    { name: 'Home', section: 'home', target: 'hero' },
    { name: 'Features', section: 'features', target: 'features' },
    { name: 'Technology', section: 'technology', target: 'playground' },
    { name: 'Documentation', section: 'documentation', target: 'documentation-page-root' },
    { name: 'Components', section: 'components', target: 'components-guide-page' },
  ];

  return (
    <header 
      id="main-navigation"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        hasScrolled 
          ? 'bg-white/80 dark:bg-[#020617]/70 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 py-3 shadow-[0_10px_30px_-10px_rgba(2,6,23,0.05)] dark:shadow-[0_10px_30px_-10px_rgba(2,6,23,0.3)]' 
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* LEFT: ImageEnhancer AI Brand Logo */}
        <div 
          onClick={() => handleNavItemClick('hero', 'home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/45 transition-all duration-300">
            <Layers className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white font-sans flex items-center gap-1.5">
            ImageEnhancer
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#14B8A6] font-mono text-[10px] font-bold tracking-normal border border-blue-500/35 px-1.5 py-0.5 rounded-md bg-blue-500/5 dark:bg-blue-500/5">
              AI
            </span>
          </span>
        </div>

        {/* CENTER: Premium Nav Links with elegant indicators */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <button
                key={item.name}
                onClick={() => handleNavItemClick(item.target, item.section)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wide transition-colors cursor-pointer select-none font-sans ${
                  isActive 
                    ? 'text-[#2563EB] dark:text-[#FBBF24]' 
                    : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2.5px] rounded-full bg-[#2563EB] dark:bg-[#FBBF24] shadow-[0_0_8px_rgba(37,99,235,0.4)] dark:shadow-[0_0_8px_#FBBF24]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          
          {/* Centered GitHub nav link */}
          <a
            href="https://github.com/AdityaKarippadathUdai/ImageEnhance-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold tracking-wide text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 font-sans"
          >
            GitHub
            <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500" />
          </a>
        </nav>

        {/* RIGHT: Theme Toggle & GitHub CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={currentTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/35 hover:bg-slate-200/80 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer shadow-sm flex items-center justify-center"
          >
            <motion.div
              key={currentTheme}
              initial={{ rotate: -45, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </motion.div>
          </button>

          {/* GitHub CTA Button */}
          <a
            id="nav-github-cta"
            href="https://github.com/AdityaKarippadathUdai/ImageEnhance-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 px-4 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#0F172A] hover:bg-[#1E293B] dark:bg-slate-900 border border-transparent dark:border-white/10 dark:hover:border-blue-500/35 dark:hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Github className="w-3.5 h-3.5 text-blue-400" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300"
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300"
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
            className="md:hidden w-full border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#020617]/95 backdrop-blur-xl overflow-hidden text-left shadow-lg"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.section;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavItemClick(item.target, item.section)}
                    className={`py-2 text-sm font-semibold tracking-wide text-left flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2 ${
                      isActive 
                        ? 'text-[#2563EB] dark:text-[#FBBF24]' 
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#2563EB] dark:bg-[#FBBF24] shadow-[0_0_6px_rgba(37,99,235,0.4)] dark:shadow-[0_0_6px_#FBBF24]" />}
                  </button>
                );
              })}
              
              <a
                href="https://github.com/AdityaKarippadathUdai/ImageEnhance-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-white/5 pb-2 flex items-center justify-between"
              >
                <span>GitHub Link</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="https://github.com/AdityaKarippadathUdai/ImageEnhance-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full py-3 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] dark:bg-slate-900 border border-transparent dark:border-white/10 text-center font-bold text-xs tracking-wider uppercase text-white flex items-center justify-center gap-2"
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
