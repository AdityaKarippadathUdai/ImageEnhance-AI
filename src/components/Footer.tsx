import React, { useState } from 'react';
import { Layers, Mail, Check, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-white/5 pt-16 pb-8 px-4 md:px-8 text-left">
      <div className="max-w-7xl mx-auto">
        
        {/* Main layout links grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Col (4 Cols) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer select-none group" onClick={scrollTop}>
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold tracking-tight text-white">PixelBoost <span className="font-mono text-[9px] text-cyan-400">AI</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SaaS platform for deep learning-powered image upscaling, detail synthesis, and face geometry restoration. Trusted by digital artists and studio pipelines.
            </p>

            {/* Newsletter Subscription input */}
            <form onSubmit={handleSubscribe} className="mt-4 max-w-sm">
              <label className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 block mb-2">
                Stay updated on model releases
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyan-500/50 transition-colors pl-8"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-200 px-3.5 rounded-xl font-medium transition-colors cursor-pointer shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-400" /> : 'Subscribe'}
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-emerald-400 mt-1.5 block">
                  Subscription logged! Thank you.
                </span>
              )}
            </form>
          </div>

          {/* Links columns (8 Cols combined) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Col 1 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Product</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#playground" className="hover:text-white transition-colors">Core Playground</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Model Specifications</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Tiers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compare Features</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Developers</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#api-bench" className="hover:text-white transition-colors">REST API Spec</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Python SDK</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub Actions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cluster Status</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Enterprise</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dedicated GPUs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Weights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SLA Contract</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Art Showcase</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; 2026 PixelBoost AI Technologies, Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <button 
              onClick={scrollTop} 
              className="hover:text-slate-200 transition-colors flex items-center gap-1 font-mono text-[10px] font-bold"
            >
              Back To Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
