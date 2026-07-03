import React, { useState } from 'react';
import { Terminal, Copy, Check, RefreshCw, Code, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { API_CODE_SNIPPETS } from '../data';

export default function ApiPlayground() {
  const [apiKey, setApiKey] = useState<string>('pb_live_8f3d8a7c2e91b5c00e4912f7193c72b');
  const [activeLang, setActiveLang] = useState<string>('curl');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  
  // API sandbox state
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testSuccess, setTestSuccess] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('// Click "Send Test Request" above to trigger a live API simulation.');

  const generateNewKey = () => {
    const chars = '0123456789abcdef';
    let result = 'pb_live_';
    for (let i = 0; i < 28; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setApiKey(result);
  };

  const copyToClipboard = (text: string, type: 'key' | 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleTestApi = () => {
    setIsTesting(true);
    setTestSuccess(false);
    setTerminalOutput(`$ sending request to api.pixelboost.ai/v1/upscale...\n> Headers: { Authorization: Bearer ${apiKey.substring(0, 15)}... }\n> Body: { scale: 4, model: "pixelboost-ultra", image_url: "https://example.com/asset.jpg" }`);

    setTimeout(() => {
      setTerminalOutput(prev => prev + `\n\n[INFO] Connected to warm GPU worker instance on US-EAST4...`);
      setTimeout(() => {
        setTerminalOutput(prev => prev + `\n[INFO] Allocating super-resolution weights (ESRGAN-v4)...`);
        setTimeout(() => {
          setTerminalOutput(prev => prev + `\n\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "status": "success",\n  "request_id": "req_84f9b8c02c",\n  "processing_time_ms": 1142,\n  "scale": 4,\n  "model": "pixelboost-ultra",\n  "original_dimensions": "1024x768",\n  "upscaled_dimensions": "4096x3072",\n  "upscaled_url": "https://cdn.pixelboost.ai/outputs/84f9b8c02c_4x.png",\n  "credits_consumed": 2\n}`);
          setIsTesting(false);
          setTestSuccess(true);
        }, 800);
      }, 500);
    }, 600);
  };

  // Get active code snippet replacing the placeholder key with our dynamic key
  const activeSnippet = API_CODE_SNIPPETS.find(s => s.language === activeLang)?.code.replace('pb_live_8f3d8...', apiKey) || '';

  return (
    <div id="api-bench" className="w-full py-20 px-4 md:px-8 border-b border-white/5 bg-slate-950/60 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(20,184,166,0.05),transparent_45%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Developer Info & API Config (5 Cols) */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 font-semibold mb-3">
              <Terminal className="w-3.5 h-3.5" />
              DEVELOPER SUITE
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white mb-4">
              Integrate 4K Upscaling in 5 Lines of Code
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              PixelBoost provides an ultra-low latency REST API designed to power design systems, e-commerce assets pipelines, and user-generated content applications. Up to 8x resolution multipliers are accessible programmatically.
            </p>

            {/* API Key management block */}
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400">Your Sandbox API Key</span>
                <button
                  onClick={generateNewKey}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Roll Key
                </button>
              </div>

              {/* Input copy suite */}
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-3 py-2.5 font-mono text-[11px] text-slate-300 select-all truncate">
                  {apiKey}
                </div>
                <button
                  onClick={() => copyToClipboard(apiKey, 'key')}
                  className="bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-white/20 p-2.5 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
                  title="Copy Key"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-start gap-1.5 mt-3 text-[10px] text-slate-500 leading-normal">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                <span>Keep this key secret. Authorization headers must use standard Bearer token encryption. Do not expose this key inside client-side bundles.</span>
              </div>
            </div>

            {/* Features lists */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/30 p-3 rounded-xl border border-white/5">
                <div className="text-xs font-semibold text-slate-300">Warm Convolutions</div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono">1.1s average cold-start time</div>
              </div>
              <div className="bg-slate-900/30 p-3 rounded-xl border border-white/5">
                <div className="text-xs font-semibold text-slate-300">Webhook Callbacks</div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono">Receive scaled URLs directly</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Code & Terminal Suite (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-1.5 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Tabs for Languages & Actions */}
              <div className="flex items-center justify-between bg-slate-950/80 border-b border-white/5 rounded-t-xl px-4 py-2">
                <div className="flex gap-2">
                  {['curl', 'javascript', 'python'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-2.5 py-1 text-[11px] font-mono font-medium rounded-md transition-colors cursor-pointer ${
                        activeLang === lang
                          ? 'bg-slate-900 border border-white/10 text-cyan-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'cURL'}
                    </button>
                  ))}
                </div>

                {/* Right utility buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyToClipboard(activeSnippet, 'code')}
                    className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>

                  <button
                    id="test-api-btn"
                    onClick={handleTestApi}
                    disabled={isTesting}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-semibold text-[10px] tracking-wide uppercase px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    {isTesting ? 'Sending...' : 'Send Test Request'}
                  </button>
                </div>
              </div>

              {/* Code window block */}
              <div className="bg-slate-950 p-5 text-left border-b border-white/5 text-[11px] font-mono text-slate-300 overflow-x-auto h-52 leading-relaxed">
                <pre>{activeSnippet}</pre>
              </div>

              {/* Live Terminal Test-Response Block */}
              <div className="bg-slate-950 p-4 font-mono text-left text-[11px] rounded-b-xl border-t border-white/5">
                <div className="flex items-center gap-1.5 text-slate-500 uppercase tracking-widest text-[9px] font-bold mb-3">
                  <Terminal className="w-3.5 h-3.5 text-turquoise-400" />
                  Request / Response Log
                  {testSuccess && (
                    <span className="ml-auto text-emerald-400 flex items-center gap-1 font-mono text-[9px] tracking-normal uppercase bg-emerald-950/20 border border-emerald-500/30 px-1 py-0.2 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      200 OK (SUCCESS)
                    </span>
                  )}
                </div>
                <pre className={`overflow-y-auto max-h-48 whitespace-pre-wrap leading-relaxed ${
                  testSuccess ? 'text-cyan-300/90' : 'text-slate-500'
                }`}>
                  {terminalOutput}
                </pre>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
