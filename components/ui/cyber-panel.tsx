import React from "react";
import { cn } from "@/lib/utils";

export function CyberPanel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] group transition-all duration-500 hover:border-white/20",
      className
    )}>
      {/* Ambient Inner Glow (The Purple & Blue Gradients) */}
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Top highlight line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
      
      {/* Content Container */}
      <div className="relative z-10 p-4 sm:p-8 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
