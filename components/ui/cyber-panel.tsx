import React from "react";
import { cn } from "@/lib/utils";

interface CyberPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function CyberPanel({ children, className }: CyberPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.8)]",
        "group transition-all duration-500 hover:border-white/20",
        className
      )}
    >
      {/* Animated gradient fill on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Top edge highlight */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50 pointer-events-none" />

      {/* Bottom edge subtle glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-blue-500/30 pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-blue-500/30 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-purple-500/20 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-purple-500/20 pointer-events-none" />

      <div className="relative z-10 p-8 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
