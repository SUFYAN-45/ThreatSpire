'use client'
import { useState } from "react";
import Spline from '@splinetool/react-spline';
import { CyberPanel } from "@/components/ui/cyber-panel";
import { Dropzone } from "@/components/ui/dropzone";
import { Shield, ArrowLeft, Terminal, Loader2 } from "lucide-react";
import Link from "next/link";
import ShaderBackground from "@/components/ui/shader-background";

export default function SandboxPage() {
  const [scriptContent, setScriptContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [telemetry, setTelemetry] = useState<string[]>([]);

  const handleExecute = () => {
    setIsAnalyzing(true);
    setShowResults(false);
    setTelemetry([]);

    const messages = [
      "> Establishing secure enclave...",
      "> Transferring payload to isolated container...",
      "> Initializing heuristic engine...",
      "> Scanning payload...",
      "> Executing behavioral analysis..."
    ];

    let currentStep = 0;
    
    const runSimulation = () => {
      if (currentStep < messages.length) {
        setTelemetry(prev => [...prev, messages[currentStep]]);
        currentStep++;
        setTimeout(runSimulation, 500); // 5 steps * 500ms = 2.5s
      } else {
        setIsAnalyzing(false);
        setShowResults(true);
        setTelemetry(prev => [
          ...prev, 
          "> Heuristics matched: 0",
          "> Network calls blocked: 0",
          "> Status: SAFE",
          "> Sandbox teardown complete."
        ]);
      }
    };

    runSimulation();
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans relative">

      {/* Animated WebGL plasma background */}
      <ShaderBackground />

      <nav className="w-full border-b border-white/10 p-4 md:px-8 flex justify-between items-center z-50 bg-black/50 backdrop-blur-md fixed top-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2"><ArrowLeft size={18} /> Back</Link>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-1 sm:gap-2 text-white font-bold text-lg sm:text-xl"><Shield className="text-blue-500" /> ThreatSpire <span className="text-neutral-500 text-sm ml-2">/ Code Sandbox</span></div>
        </div>
      </nav>

      <main className="w-full flex-1 relative mt-16">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-full overflow-y-auto lg:overflow-hidden">
          
          <div className="flex-1 p-4 sm:p-8 lg:p-12 relative z-10 flex flex-col justify-center min-h-[500px] lg:min-h-0 order-2 lg:order-1 lg:max-h-[calc(100vh-64px)]">
            <CyberPanel className="w-full max-w-2xl mx-auto shadow-[0_0_50px_rgba(37,99,235,0.1)] flex flex-col h-full lg:max-h-[85vh]">
              <div className="flex items-center gap-4 mb-6 shrink-0">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"><Terminal className="text-blue-400 w-8 h-8"/></div>
                <div><h2 className="text-3xl font-bold text-white tracking-tight">Script Sandbox</h2><p className="text-neutral-400 text-sm mt-1">Safely parse and detonate scripts in an isolated container.</p></div>
              </div>

              {/* Scrollable Container */}
              <div className="space-y-6 overflow-y-auto pr-2 flex-1 pb-4">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl flex flex-col h-48 shrink-0 focus-within:border-blue-500/50 transition-colors">
                  <div className="bg-[#1a1a1a] px-4 py-2 border-b border-white/5 flex items-center gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-yellow-500/80"></div><div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-xs text-neutral-500 font-mono">root@threatspire:~</span>
                  </div>
                  <textarea 
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                    placeholder="# Paste script here..."
                    spellCheck="false"
                    className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-green-400 focus:outline-none resize-none placeholder:text-neutral-700"
                  />
                </div>

                <div className="flex items-center gap-4 shrink-0"><div className="h-px bg-white/10 flex-1"></div><span className="text-xs text-neutral-500 font-semibold tracking-widest uppercase">Or Upload Script</span><div className="h-px bg-white/10 flex-1"></div></div>
                
                <div className="shrink-0">
                  <Dropzone />
                </div>

                <div className="shrink-0 pt-2">
                  <button 
                    onClick={handleExecute} 
                    disabled={isAnalyzing} 
                    className="w-full group relative inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {!isAnalyzing && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                    {isAnalyzing ? <Loader2 className="animate-spin relative z-10" size={20} /> : <><Terminal size={20} className="relative z-10" /><span className="relative z-10">Execute Sandbox Analysis</span></>}
                  </button>
                </div>

                {/* Results Terminal */}
                {(isAnalyzing || showResults) && (
                  <div className="mt-6 rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-[#111] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-neutral-500" />
                        <span className="text-xs text-neutral-500 font-mono uppercase tracking-wider">Telemetry Output</span>
                      </div>
                      {showResults && <span className="text-xs text-green-400 font-mono">Analysis Complete</span>}
                    </div>
                    <div className="p-4 font-mono text-sm text-green-400 min-h-[160px] max-h-[250px] overflow-y-auto space-y-1">
                      {telemetry.map((line, i) => (
                        <div key={i} className="opacity-90">{line}</div>
                      ))}
                      {isAnalyzing && (
                        <div className="flex items-center gap-2 text-blue-400 mt-2">
                          <Loader2 size={12} className="animate-spin" />
                          <span className="animate-pulse">Processing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CyberPanel>
          </div>

          <div className="w-full h-[350px] lg:h-full lg:flex-1 relative pointer-events-none lg:pointer-events-auto bg-transparent order-1 lg:order-2 border-b border-white/10 lg:border-none">
            <Spline scene="https://prod.spline.design/ZSwGzzb-xRVdRXjP/scene.splinecode" className="w-full h-full bg-transparent" />
          </div>

        </div>
      </main>
    </div>
  )
}
