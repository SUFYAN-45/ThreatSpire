'use client'
import { useState } from "react";
import { Shield, ArrowLeft, Mail, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { CyberPanel } from "@/components/ui/cyber-panel";
import { Dropzone } from "@/components/ui/dropzone";
import { SplineScene } from "@/components/ui/spline-scene";
import ShaderBackground from "@/components/ui/shader-background";

const emailFlags = [
  { keyword: 'URGENT',     severity: 'danger',  desc: 'High-pressure urgency trigger'  },
  { keyword: 'suspended',  severity: 'danger',  desc: 'Account-threat manipulation'    },
  { keyword: 'click here', severity: 'warning', desc: 'Vague call-to-action link'      },
  { keyword: 'verify now', severity: 'warning', desc: 'Social engineering keyword'     },
  { keyword: 'free',       severity: 'warning', desc: 'Lure / reward manipulation'     },
  { keyword: 'password',   severity: 'danger',  desc: 'Credential harvesting indicator'},
];

export default function NlpPage() {
  const [text, setText]         = useState('');
  const [result, setResult]     = useState<typeof emailFlags | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleExtract = () => {
    if (!text.trim()) return;
    setIsRunning(true);
    setResult(null);
    setTimeout(() => {
      const detected = emailFlags.filter(f =>
        text.toLowerCase().includes(f.keyword.toLowerCase())
      );
      setResult(detected);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans relative">

      {/* Animated WebGL plasma background */}
      <ShaderBackground />

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
          <div className="flex items-center gap-1 sm:gap-2 text-white font-bold text-lg sm:text-xl">
            <Shield className="text-blue-500" /> ThreatSpire
            <span className="text-neutral-500 text-sm ml-1">/ NLP Forensics</span>
          </div>
        </div>
      </nav>

      <main className="w-full flex-1 relative mt-16">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] w-full overflow-y-auto lg:overflow-hidden">

          {/* ── Left — CyberPanel UI ── */}
          <div className="flex-1 p-4 sm:p-8 lg:p-12 relative z-10 flex flex-col justify-center min-h-[500px] lg:min-h-0 order-2 lg:order-1">
            <CyberPanel className="w-full max-w-2xl mx-auto shadow-[0_0_50px_rgba(37,99,235,0.08)]">

              {/* Header */}
              <div className="flex items-center gap-4 mb-7">
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 shrink-0">
                  <Mail className="text-blue-400 w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">Linguistic Analyzer</h2>
                  <p className="text-neutral-500 text-sm mt-0.5">
                    Detect social engineering manipulation via AI forensic linguistics.
                  </p>
                </div>
              </div>

              <div className="space-y-5">

                {/* Glowing textarea */}
                <div className="relative group/ta">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-focus-within/ta:opacity-25 transition duration-500 pointer-events-none" />
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="relative w-full h-32 bg-[#0d0d12] border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:border-blue-500/50 outline-none resize-none transition-all text-sm"
                    placeholder="Paste raw email or SMS payload here… e.g. 'URGENT: Your account will be suspended in 24 hours. Click here to verify now.'"
                  />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px bg-white/8 flex-1" />
                  <span className="text-[10px] text-neutral-600 font-semibold tracking-[0.25em] uppercase">
                    Or Upload Source
                  </span>
                  <div className="h-px bg-white/8 flex-1" />
                </div>

                {/* Dropzone */}
                <Dropzone />

                {/* CTA button */}
                <button
                  onClick={handleExtract}
                  disabled={isRunning || !text.trim()}
                  className="w-full relative inline-flex items-center justify-center gap-2.5 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-base overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn"
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  <Zap size={18} className="relative z-10 shrink-0" />
                  <span className="relative z-10">
                    {isRunning ? 'Extracting Signatures…' : 'Extract Threat Signatures'}
                  </span>
                </button>

                {/* Running pulse */}
                {isRunning && (
                  <div className="flex items-center gap-3 text-blue-400 text-sm animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 inline-block" />
                    Running NLP model on corpus…
                  </div>
                )}

                {/* Results */}
                {result !== null && (
                  <div className="animate-in fade-in zoom-in-95 duration-500 space-y-2 pt-1">
                    {result.length > 0 ? (
                      <>
                        <p className="text-[10px] text-neutral-500 font-semibold tracking-[0.25em] uppercase mb-3">
                          Linguistic Anomalies Detected
                        </p>
                        {result.map((f, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${
                              f.severity === 'danger'
                                ? 'border-red-500/30 bg-red-500/5'
                                : 'border-orange-500/30 bg-orange-500/5'
                            }`}
                          >
                            <AlertTriangle
                              size={15}
                              className={`shrink-0 ${f.severity === 'danger' ? 'text-red-400' : 'text-orange-400'}`}
                            />
                            <div className="min-w-0">
                              <span className="text-sm text-white font-mono">"{f.keyword}"</span>
                              <span className="text-xs text-neutral-500 ml-2">— {f.desc}</span>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-green-500/30 bg-green-500/5">
                        <CheckCircle className="text-green-400 shrink-0" size={17} />
                        <span className="text-sm text-green-400">
                          No social engineering patterns detected in this content.
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => { setResult(null); setText(''); }}
                      className="mt-2 text-xs text-neutral-600 hover:text-white transition-colors"
                    >
                      ← Clear Results
                    </button>
                  </div>
                )}

              </div>
            </CyberPanel>
          </div>

          {/* ── Right — Spline 3D Scene ── */}
          <div className="w-full h-[350px] lg:h-full lg:flex-1 relative pointer-events-none lg:pointer-events-auto bg-black/20 order-1 lg:order-2 border-b border-white/10 lg:border-none">
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
