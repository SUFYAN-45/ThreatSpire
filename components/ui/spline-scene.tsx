'use client'
import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {/*
        Inner div is 40px taller than the parent and sits 40px higher,
        which pushes the Spline watermark (bottom ~40px) out of the
        visible clipping region without cropping the 3D model itself.
      */}
      <div className="absolute inset-0 w-full" style={{ height: 'calc(100% + 60px)', bottom: '-40px', top: 'auto' }}>
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <span className="animate-pulse text-blue-500 font-mono text-sm tracking-widest">
                Initializing 3D Engine…
              </span>
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      </div>
    </div>
  );
}
