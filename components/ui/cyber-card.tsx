'use client';
import React from 'react';
import styles from './cyber-card.module.css';

interface CyberCardProps {
  title: string;
  subtitle: string;
  promptText: string;
  isActive: boolean;
  onClick: () => void;
}

export function CyberCard({
  title,
  subtitle,
  promptText,
  isActive,
  onClick,
}: CyberCardProps) {
  const trackers = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div
      className={`${styles.container} ${
        isActive
          ? 'scale-105 ring-2 ring-blue-500 rounded-[20px]'
          : 'opacity-70 hover:opacity-100'
      }`}
      onClick={onClick}
    >
      <div className={styles.canvas}>
        {trackers.map((num) => (
          <div
            key={num}
            className={`${styles.tracker} ${styles[`tr-${num}` as keyof typeof styles]}`}
          />
        ))}

        <div
          className={styles.card}
          style={
            isActive
              ? {
                  borderColor: '#3b82f6',
                  boxShadow:
                    '0 0 0 1px rgba(59,130,246,0.4), 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(59,130,246,0.25)',
                }
              : {}
          }
        >
          <div className={styles.cardContent}>
            {/* Glare */}
            <div className={styles.cardGlare} />

            {/* Neon corner lines */}
            <div className={styles.cyberLines}>
              <span /><span /><span /><span />
            </div>

            {/* Prompt badge */}
            <p className={styles.prompt}>
              {isActive ? '● ACTIVE' : `▶ ${promptText}`}
            </p>

            {/* Title */}
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Background glow orbs */}
            <div className={styles.glowingElements}>
              <div className={styles.glow1} />
              <div className={styles.glow2} />
              <div className={styles.glow3} />
            </div>

            {/* Subtitle */}
            <div className={styles.subtitle}>
              <span className={styles.highlight}>{subtitle}</span>
            </div>

            {/* Floating particles */}
            <div className={styles.cardParticles}>
              <span /><span /><span /><span /><span /><span />
            </div>

            {/* Corner brackets */}
            <div className={styles.cornerElements}>
              <span /><span /><span /><span />
            </div>

            {/* Neon scanline */}
            <div className={styles.scanLine} />
          </div>
        </div>
      </div>
    </div>
  );
}
