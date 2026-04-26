'use client'
import { useState } from "react";
import { SplineScene } from "@/components/ui/spline-scene";
import { CyberPanel } from "@/components/ui/cyber-panel";
import { ThreatVisualizer3D } from "@/components/ui/threat-visualizer-3d";
import {
  Shield, Search, Activity, Server,
  ArrowLeft, Radar, CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function ScannerPage() {
  const [targetUrl, setTargetUrl]     = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult]           = useState<any>(null);

  const handleAnalyze = async () => {
    if (!targetUrl.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUrl }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col font-sans">

      {/* Navbar */}
      <nav className="w-full border-b border-white/10 p-4 md:px-8 flex justify-between items-center z-50 bg-black/50 backdrop-blur-md fixed top-0">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Shield className="text-blue-500" /> ThreatSpire
            <span className="text-neutral-500 text-sm ml-1">/ Network Scanner</span>
          </div>
        </div>
      </nav>

      <main className="w-full flex-1 relative mt-16">
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full">

          {/* ── Left — Scanner CyberPanel ── */}
          <div className="flex-1 p-6 md:p-10 relative z-10 flex flex-col justify-center overflow-y-auto">
            <CyberPanel className="w-full max-w-2xl mx-auto shadow-[0_0_50px_rgba(37,99,235,0.08)]">

              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shrink-0">
                  <Radar className="text-blue-400 w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Network Scanner</h2>
                  <p className="text-neutral-500 text-sm mt-0.5">
                    Analyze suspicious endpoints using heuristic deep-learning inference.
                  </p>
                </div>
              </div>

              <div className="space-y-6">

                {/* Glowing URL input */}
                <div className="relative group/input">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-focus-within/input:opacity-25 transition duration-500 pointer-events-none" />
                  <div className="relative flex items-center bg-[#0d0d12] border border-white/10 rounded-xl p-2 transition-all">
                    <Search className="text-neutral-500 ml-4 mr-3 shrink-0" size={22} />
                    <input
                      type="text"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                      placeholder="https://example.com/payload"
                      className="flex-1 bg-transparent border-none text-white text-base focus:outline-none py-3 min-w-0"
                    />
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !targetUrl.trim()}
                  className="w-full relative inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  <Radar size={18} className="relative z-10 shrink-0" />
                  <span className="relative z-10">
                    {isAnalyzing ? 'Scanning…' : 'Initialize Scan'}
                  </span>
                </button>

                {/* Scanning indicator */}
                {isAnalyzing && (
                  <div className="flex items-center gap-3 text-blue-400 text-sm animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 inline-block" />
                    Running heuristic threat analysis…
                  </div>
                )}

                {/* Results */}
                {result ? (
                  <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                    {/* 3D hologram */}
                    <ThreatVisualizer3D riskScore={result.riskScore} />

                    {/* Score card */}
                    <div className="flex justify-between items-start p-4 bg-black/40 border border-white/8 rounded-xl">
                      <div>
                        <p className="text-[10px] text-neutral-500 font-semibold tracking-[0.25em] uppercase mb-1">
                          Threat Report
                        </p>
                        <p className="text-sm text-neutral-400 truncate max-w-[220px]">{result.target}</p>
                        <p className={`text-3xl font-black mt-1 ${result.status === 'Malicious' ? 'text-red-400' : result.status === 'Suspicious' ? 'text-orange-400' : 'text-green-400'}`}>
                          {result.riskScore}
                          <span className="text-base text-neutral-500 font-normal">/100</span>
                        </p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-full border text-xs font-bold ${result.status === 'Malicious' ? 'border-red-500/50 bg-red-500/10 text-red-400' : result.status === 'Suspicious' ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-green-500/50 bg-green-500/10 text-green-400'}`}>
                        {result.status}
                      </div>
                    </div>

                    {/* Flags */}
                    {result.flags && result.flags.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-[10px] text-neutral-500 font-semibold tracking-[0.25em] uppercase">
                          Detected Anomalies
                        </p>
                        {result.flags.map((flag: any, i: number) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${flag.type === 'danger' ? 'border-red-500/30 bg-red-500/5' : 'border-orange-500/30 bg-orange-500/5'}`}
                          >
                            <Shield
                              className={`shrink-0 ${flag.type === 'danger' ? 'text-red-400' : 'text-orange-400'}`}
                              size={15}
                            />
                            <span className="text-sm text-neutral-300">{flag.msg}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg border border-green-500/30 bg-green-500/5">
                        <CheckCircle className="text-green-400 shrink-0" size={16} />
                        <span className="text-sm text-green-400">
                          No immediate threats detected by heuristic engine.
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => { setResult(null); setTargetUrl(''); }}
                      className="text-xs text-neutral-600 hover:text-white transition-colors"
                    >
                      ← Clear Results
                    </button>
                  </div>
                ) : (
                  !isAnalyzing && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/8">
                      <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center gap-3 hover:border-white/10 transition-colors">
                        <Activity className="text-green-500 shrink-0" size={18} />
                        <div>
                          <p className="text-neutral-500 text-xs">Compute Nodes</p>
                          <p className="text-white text-sm font-semibold">Online (AWS)</p>
                        </div>
                      </div>
                      <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center gap-3 hover:border-white/10 transition-colors">
                        <Server className="text-blue-500 shrink-0" size={18} />
                        <div>
                          <p className="text-neutral-500 text-xs">Inference Engine</p>
                          <p className="text-white text-sm font-semibold">Standing By</p>
                        </div>
                      </div>
                    </div>
                  )
                )}

              </div>
            </CyberPanel>
          </div>

          {/* ── Right — 3D Spline Scene ── */}
          <div className="flex-1 relative h-full w-full pointer-events-auto hidden md:block bg-black/20">
            <SplineScene
              scene="https://prod.spline.design/ZSwGzzb-xRVdRXjP/scene.splinecode"
              className="w-full h-full"
            />
          </div>

        </div>
      </main>
    </div>
  );
}
