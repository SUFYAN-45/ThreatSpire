import React from "react";
import { cn } from "@/lib/utils";

export function CyberPanel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(
      // Glass surface — rgba(5,5,18,0.72) matches the shader's dark navy bgColor1 at 72% opacity
      "relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-2xl",
      "bg-[rgba(5,5,20,0.72)]",
      "shadow-[0_8px_48px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(255,255,255,0.04)]",
      "group transition-all duration-500 hover:border-indigo-500/30",
      className
    )}>
      {/* Subtle inner corner glow — matches shader purple lineColor */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/8 via-transparent to-purple-700/8 pointer-events-none" />

      {/* Hover shimmer — brightens the panel glass on interact */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Top edge highlight — the plasma warp line feel */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
      {/* Left edge highlight */}
      <div className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-indigo-400/30 via-transparent to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 p-4 sm:p-8 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
