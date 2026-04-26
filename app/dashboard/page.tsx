'use client'
import { Shield } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CyberCard } from "@/components/ui/cyber-card";
import ShaderBackground from "@/components/ui/shader-background";

export default function DashboardHub() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans relative">

      {/* Animated WebGL plasma background */}
      <ShaderBackground />

      {/* Navbar */}
      <nav className="w-full border-b border-white/10 p-4 md:px-8 flex justify-between items-center z-50 bg-black/30 backdrop-blur-md fixed top-0">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Shield className="text-blue-500" /> ThreatSpire
        </div>
        <UserButton />
      </nav>

      {/* Module selector */}
      <main className="w-full flex-1 flex flex-col items-center justify-center mt-16 px-4 z-10 relative">
        {/* Text with subtle drop shadow so it reads against the animated BG */}
        <p className="text-xs font-mono tracking-[0.4em] text-blue-400/80 mb-4 uppercase drop-shadow-lg">
          ThreatSpire · Command Interface
        </p>
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight text-center"
          style={{ textShadow: '0 0 30px rgba(99,102,241,0.5), 0 2px 8px rgba(0,0,0,0.8)' }}
        >
          SELECT MODULE
        </h1>
        <p className="text-neutral-300 mb-14 text-center max-w-md drop-shadow-md">
          Choose an analysis engine to begin your threat investigation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl justify-items-center">
          <CyberCard
            title="URL<br/>SCANNER"
            subtitle="NETWORK"
            promptText="INITIALIZE"
            isActive={false}
            onClick={() => { window.location.href = '/dashboard/scanner'; }}
          />
          <CyberCard
            title="NLP<br/>PHISHING"
            subtitle="LINGUISTICS"
            promptText="EXTRACT"
            isActive={false}
            onClick={() => { window.location.href = '/dashboard/nlp'; }}
          />
          <CyberCard
            title="SCRIPT<br/>SANDBOX"
            subtitle="CODE"
            promptText="EXECUTE"
            isActive={false}
            onClick={() => { window.location.href = '/dashboard/sandbox'; }}
          />
        </div>
      </main>
    </div>
  );
}
