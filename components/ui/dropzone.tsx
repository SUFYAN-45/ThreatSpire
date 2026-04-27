'use client'
import React, { useState, useRef } from "react";
import { UploadCloud, Loader2, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function Dropzone() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      // Create a unique file name to prevent overwriting
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `scans/${fileName}`;

      // Upload to Supabase Storage bucket named 'payloads'
      const { error: uploadError } = await supabase.storage
        .from('payloads')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Success!
      setUploadSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
      
    } catch (error: any) {
      console.error("Upload error:", error.message);
      alert("Failed to upload file: " + error.message);
    } finally {
      setIsUploading(false);
      // Clear the input so the same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div 
      onClick={() => !isUploading && fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${
        isUploading ? 'border-blue-500/50 bg-blue-500/5 cursor-not-allowed' : 
        uploadSuccess ? 'border-green-500/50 bg-green-500/5 cursor-pointer' :
        'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 cursor-pointer bg-[#0a0a0a]'
      }`}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept=".txt,.js,.py,.sh,.json,.csv"
      />
      
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
        {isUploading ? (
          <Loader2 className="text-blue-400 animate-spin" size={24} />
        ) : uploadSuccess ? (
          <CheckCircle className="text-green-400" size={24} />
        ) : (
          <UploadCloud className="text-neutral-400" size={24} />
        )}
      </div>
      
      {isUploading ? (
        <>
          <p className="text-white font-medium">Uploading to Cloud Storage...</p>
          <p className="text-neutral-500 text-sm mt-1">Encrypting and transferring payload</p>
        </>
      ) : uploadSuccess ? (
        <>
          <p className="text-green-400 font-medium">Upload Complete!</p>
          <p className="text-neutral-500 text-sm mt-1">File safely stored in DBaaS</p>
        </>
      ) : (
        <>
          <p className="text-white font-medium">Click or drag script to upload</p>
          <p className="text-neutral-500 text-sm mt-1">Supports .py, .sh, .txt, .json (Max 5MB)</p>
        </>
      )}
    </div>
  );
}
