'use client';

import React, { useRef } from 'react';

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  className = '',
  fill = 'white',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none absolute inset-0 h-full w-full fill-white [mask-image:radial-gradient(200px_ellipse_at_80%_20%,white,transparent)] ${className}`}
      width="100%"
      height="100%"
    >
      <filter id="backingBlur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
      </filter>

      <circle
        cx="50%"
        cy="20%"
        r="40%"
        fill={fill}
        fillOpacity="0.1"
        filter="url(#backingBlur)"
      />
    </svg>
  );
};
