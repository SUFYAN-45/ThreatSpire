'use client'
import { useState } from "react";
import { SplineScene } from "@/components/ui/spline-scene";
import { CyberPanel } from "@/components/ui/cyber-panel";
import { Dropzone } from "@/components/ui/dropzone";
import { Shield, ArrowLeft, Terminal, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SandboxPage() {
  const [scriptContent, setScriptContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDetonate = async () => {
    if (!scriptContent.trim()) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scriptContent })
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data);
      } else {
        alert("Simulation failed: " + data.error);
      }
    } catch (error) {
      console.error("Simulation error:", error);
      alert("Network error occurred during simulation.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans">
      <nav className="w-full border-b border-white/10 p-4 md:px-8 flex justify-between items-center z-50 bg-black/50 backdrop-blur-md fixed top-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2"><ArrowLeft size={18} /> Back</Link>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-1 sm:gap-2 text-white font-bold text-lg sm:text-xl"><Shield className="text-blue-500" /> ThreatSpire <span className="text-neutral-500 text-sm ml-2">/ Code Sandbox</span></div>
        </div>
      </nav>

      <main className="w-full flex-1 relative mt-16">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-full overflow-y-auto lg:overflow-hidden">
          <div className="flex-1 p-4 sm:p-8 lg:p-12 relative z-10 flex flex-col justify-center min-h-[500px] lg:min-h-0 order-2 lg:order-1">
            <CyberPanel className="w-full max-w-2xl mx-auto shadow-[0_0_50px_rgba(37,99,235,0.1)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"><Terminal className="text-blue-400 w-8 h-8"/></div>
                <div><h2 className="text-3xl font-bold text-white tracking-tight">Script Sandbox</h2><p className="text-neutral-400 text-sm mt-1">Safely parse and detonate scripts in an isolated container.</p></div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-2xl flex flex-col h-48 focus-within:border-blue-500/50 transition-colors">
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

                <div className="flex items-center gap-4"><div className="h-px bg-white/10 flex-1"></div><span className="text-xs text-neutral-500 font-semibold tracking-widest uppercase">Or Upload Script</span><div className="h-px bg-white/10 flex-1"></div></div>
                <Dropzone />

                <button onClick={handleDetonate} disabled={isAnalyzing || !scriptContent.trim()} className="w-full group relative inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:pointer-events-none">
                  {!isAnalyzing && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                  {isAnalyzing ? <Loader2 className="animate-spin relative z-10" size={20} /> : <><Terminal size={20} className="relative z-10" /><span className="relative z-10">Simulate Detonation</span></>}
                </button>

                {result && (
                  <div className="mt-4 p-4 rounded-xl border border-white/10 bg-black/40 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center mb-3">
                      <div><p className="text-sm text-neutral-400">Sandbox Assessment</p><p className={`text-2xl font-bold ${result.status === 'Malicious' ? 'text-red-500' : result.status === 'Suspicious' ? 'text-orange-500' : 'text-green-500'}`}>{result.status}</p></div>
                      <div className="text-right"><p className="text-sm text-neutral-400">Risk Score</p><p className="text-xl font-mono text-white">{result.riskScore}/100</p></div>
                    </div>
                    {result.flags.length > 0 && (
                      <div className="space-y-2 border-t border-white/10 pt-3 mt-2">
                        {result.flags.map((flag: any, i: number) => (
                          <div key={i} className="text-xs flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${flag.type === 'danger' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                            <span className="text-neutral-300">{flag.msg}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CyberPanel>
          </div>
          <div className="w-full h-[350px] lg:h-full lg:flex-1 relative pointer-events-none lg:pointer-events-auto bg-black/20 order-1 lg:order-2 border-b border-white/10 lg:border-none"><SplineScene scene="https://prod.spline.design/ZSwGzzb-xRVdRXjP/scene.splinecode" className="w-full h-full" /></div>
        </div>
      </main>
    </div>
  )
}
