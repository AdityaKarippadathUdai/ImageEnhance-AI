import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  title?: string;
  duration?: number; // in ms
}

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  show: (type: ToastType, message: string, options?: ToastOptions) => void;
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Individual Toast Component
function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void; key?: string }) {
  const [timeLeft, setTimeLeft] = useState(item.duration);
  const [isHovered, setIsHovered] = useState(false);
  const startTime = useRef(Date.now());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // calculate adjusted time left
      const elapsed = Date.now() - startTime.current;
      setTimeLeft((prev) => Math.max(0, prev - elapsed));
    } else {
      startTime.current = Date.now();
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 50;
          if (next <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            // Safely defer the dismissal to the next event loop tick
            setTimeout(() => onDismiss(item.id), 0);
            return 0;
          }
          return next;
        });
      }, 50);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, item.id, item.duration, onDismiss]);

  const progressPercent = (timeLeft / item.duration) * 100;

  // Icon selector based on type
  const getIcon = () => {
    switch (item.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  // Color theme selector
  const getThemeClasses = () => {
    switch (item.type) {
      case 'success':
        return {
          border: 'border-emerald-500/20 dark:border-emerald-500/10',
          bg: 'bg-white/95 dark:bg-[#061512]/95',
          progress: 'bg-emerald-500',
          shadow: 'shadow-[0_10px_30px_rgba(16,185,129,0.08)] dark:shadow-[0_0_40px_rgba(16,185,129,0.05)]'
        };
      case 'error':
        return {
          border: 'border-rose-500/20 dark:border-rose-500/10',
          bg: 'bg-white/95 dark:bg-[#1a0a0f]/95',
          progress: 'bg-rose-500',
          shadow: 'shadow-[0_10px_30px_rgba(244,63,94,0.08)] dark:shadow-[0_0_40px_rgba(244,63,94,0.05)]'
        };
      case 'warning':
        return {
          border: 'border-amber-500/20 dark:border-amber-500/10',
          bg: 'bg-white/95 dark:bg-[#1b1208]/95',
          progress: 'bg-amber-500',
          shadow: 'shadow-[0_10px_30px_rgba(245,158,11,0.08)] dark:shadow-[0_0_40px_rgba(245,158,11,0.05)]'
        };
      case 'info':
      default:
        return {
          border: 'border-blue-500/20 dark:border-blue-500/10',
          bg: 'bg-white/95 dark:bg-[#080f1e]/95',
          progress: 'bg-[#2563EB]',
          shadow: 'shadow-[0_10px_30px_rgba(37,99,235,0.08)] dark:shadow-[0_0_40px_rgba(37,99,235,0.05)]'
        };
    }
  };

  const classes = getThemeClasses();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-80 sm:w-96 rounded-2xl border ${classes.border} ${classes.bg} ${classes.shadow} backdrop-blur-xl p-4 flex gap-3 overflow-hidden select-none`}
    >
      {/* Dynamic Colored Side Ribbon */}
      <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${classes.progress}`} />

      {/* Icon */}
      <div className="pl-1.5 pt-0.5">{getIcon()}</div>

      {/* Text Context */}
      <div className="flex-1 flex flex-col text-left">
        {item.title ? (
          <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight font-sans">
            {item.title}
          </h4>
        ) : (
          <h4 className="text-xs font-bold text-slate-900 dark:text-white tracking-tight capitalize font-sans">
            {item.type}
          </h4>
        )}
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal font-sans">
          {item.message}
        </p>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => onDismiss(item.id)}
        className="w-5 h-5 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer flex items-center justify-center shrink-0 self-start"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Countdown Progress Bar */}
      <div className="absolute bottom-0 left-1.5 right-0 h-[3px] bg-slate-100 dark:bg-white/5">
        <div
          className={`h-full ${classes.progress} transition-all duration-75`}
          style={{ width: `${progressPercent}%`, transitionTimingFunction: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((type: ToastType, message: string, options?: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options?.duration ?? 4500;
    const newToast: ToastItem = {
      id,
      type,
      message,
      title: options?.title,
      duration,
    };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const success = useCallback((message: string, options?: ToastOptions) => {
    show('success', message, { title: options?.title || 'Success', ...options });
  }, [show]);

  const error = useCallback((message: string, options?: ToastOptions) => {
    show('error', message, { title: options?.title || 'Error', ...options });
  }, [show]);

  const info = useCallback((message: string, options?: ToastOptions) => {
    show('info', message, { title: options?.title || 'Notice', ...options });
  }, [show]);

  const warning = useCallback((message: string, options?: ToastOptions) => {
    show('warning', message, { title: options?.title || 'Warning', ...options });
  }, [show]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, show, success, error, info, warning, dismiss }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-full pointer-events-none">
        {/* Pointer events enabled on children only so screen space remains clickable */}
        <div className="pointer-events-auto flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => (
              <ToastCard key={toast.id} item={toast} onDismiss={dismiss} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
}
