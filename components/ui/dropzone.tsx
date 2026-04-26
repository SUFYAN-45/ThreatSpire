'use client';
import React, { useCallback, useState } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dropzone() {
  const [isHovered, setIsHovered]   = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName]     = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }, []);

  const active = isHovered || isDragging;

  return (
    <label
      className={cn(
        "relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed",
        "transition-all duration-300 cursor-pointer overflow-hidden",
        active
          ? "border-blue-500 bg-blue-500/10"
          : "border-white/10 bg-black/50 hover:border-white/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".eml,.msg,.txt,.pdf"
        className="hidden"
        onChange={handleChange}
      />

      {/* Rising gradient fill */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent transition-transform duration-500",
          active ? "translate-y-0" : "translate-y-full"
        )}
      />

      {/* Content */}
      {fileName ? (
        <>
          <FileCheck2
            className="w-10 h-10 mb-2 text-green-400 relative z-10 transition-colors duration-300"
          />
          <p className="text-sm text-green-400 font-medium relative z-10 truncate max-w-[80%]">
            {fileName}
          </p>
          <p className="text-xs text-neutral-500 mt-1 relative z-10">
            Click to replace file
          </p>
        </>
      ) : (
        <>
          <UploadCloud
            className={cn(
              "w-10 h-10 mb-3 transition-colors duration-300 relative z-10",
              active ? "text-blue-400" : "text-neutral-500"
            )}
          />
          <p className="text-sm text-white font-medium relative z-10">
            Drag &amp; drop suspicious files
          </p>
          <p className="text-xs text-neutral-500 mt-1 relative z-10">
            Supports .eml, .msg, .txt, .pdf (Max 50MB)
          </p>
        </>
      )}

      {/* Scan line animation on drag */}
      {isDragging && (
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent animate-[scan_1s_linear_infinite] z-20" />
      )}
    </label>
  );
}
