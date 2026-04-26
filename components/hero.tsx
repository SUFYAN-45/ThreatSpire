'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Spotlight } from './spotlight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background pt-16">
      {/* Spotlights */}
      <Spotlight className="top-0 left-0" fill="url(#grad1)" />
      <Spotlight className="top-0 right-1/3" fill="url(#grad2)" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,transparent,black_50%,black)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col space-y-6"
          >
            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-balance leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Threat Intelligence
              </span>
              <span className="text-foreground"> Redefined</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed"
            >
              Experience the next generation of cybersecurity threat detection and
              analysis. Real-time insights, AI-powered analysis, and actionable
              intelligence at your fingertips.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50">
                Get Started
              </button>
              <button className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-lg font-semibold text-foreground transition-all duration-300 hover:bg-white/5 backdrop-blur-sm">
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-8 flex-wrap"
            >
              <div>
                <div className="text-3xl font-bold text-blue-400">99.9%</div>
                <div className="text-sm text-foreground/60">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-foreground/60">Live Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">1000+</div>
                <div className="text-sm text-foreground/60">Threats/Day</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Gradient Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            className="relative h-full min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden group"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 rounded-2xl" />
            
            {/* Glowing orbs */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-40 -left-4 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 right-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
            
            {/* Shine effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5 rounded-2xl" />
            
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20 rounded-2xl" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px'
            }} />
            
            {/* Center floating text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white/80 mb-2">AI-Powered</div>
                <div className="text-xl text-blue-300">Threat Detection</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient SVG Definitions */}
      <svg className="hidden" width="0" height="0">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.1 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#EC4899', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
};
