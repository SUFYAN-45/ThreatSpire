'use client'
import { useState } from "react";
import { Shield } from "lucide-react";
import { LoginModal } from "@/components/ui/login-modal";
import { SplineScene } from "@/components/ui/spline-scene";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black/[0.96] flex flex-col font-sans relative overflow-hidden">

      {/* Navbar */}
      <nav className="w-full p-6 flex justify-between items-center z-50 fixed top-0 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <Shield className="text-blue-500" /> ThreatSpire
        </div>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-md hover:bg-neutral-200 transition-colors"
        >
          Login
        </button>
      </nav>

      {/* Main Content — 21st.dev Exact Demo Layout */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 mt-16">
        <Card className="w-full max-w-6xl bg-black/[0.96] relative overflow-hidden border-white/10">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />

          <div className="flex flex-col lg:flex-row min-h-screen w-full pt-20 lg:pt-0">
            {/* Left content */}
            <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-24 flex flex-col justify-center z-10 order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Next-Gen Cloud <br/> Forensics
              </h1>
              <p className="mt-4 text-neutral-300 max-w-lg text-lg">
                Detect, dissect, and neutralize digital threats in real-time. Secure your enterprise architecture with deep learning heuristics and dynamic 3D threat visualization.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  Launch Platform
                </button>
              </div>
            </div>

            {/* Right content — NEW Spline scene kZDDjO5HuC9GJUM2 */}
            <div className="w-full h-[400px] lg:h-screen lg:w-1/2 relative z-0 order-1 lg:order-2 pointer-events-none lg:pointer-events-auto">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}
