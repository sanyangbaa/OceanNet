"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  xOffset: number;
  yDistance: number;
  opacity: number;
  color: string;
}

interface AnimatedBubblesProps {
  count?: number;
  className?: string;
  variant?: "blue" | "cyan" | "mixed";
}

export function AnimatedBubbles({
  count = 28,
  className = "",
  variant = "mixed",
}: AnimatedBubblesProps) {
  const bubbles = useMemo<Bubble[]>(() => {
    const colors = {
      blue: [
        "bg-primary/25 border border-primary/40 shadow-[0_0_15px_rgba(0,119,200,0.35)]",
        "bg-[#0077C8]/30 border border-[#0096C7]/50 shadow-[0_0_20px_rgba(0,150,199,0.4)]",
        "bg-primary/15 border border-primary/30",
      ],
      cyan: [
        "bg-accent/25 border border-accent/40 shadow-[0_0_15px_rgba(48,219,231,0.35)]",
        "bg-[#30DBE7]/30 border border-[#90E0EF]/50 shadow-[0_0_20px_rgba(48,219,231,0.4)]",
        "bg-accent/15 border border-accent/30",
      ],
      mixed: [
        "bg-accent/25 border border-accent/40 shadow-[0_0_18px_rgba(48,219,231,0.35)]",
        "bg-primary/30 border border-primary/50 shadow-[0_0_18px_rgba(0,119,200,0.35)]",
        "bg-white/20 border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.3)]",
        "bg-[#00B4D8]/25 border border-[#90E0EF]/40 shadow-[0_0_15px_rgba(0,180,216,0.35)]",
        "bg-[#30DBE7]/20 border border-white/30",
        "bg-accent/35 border border-accent/60 shadow-[0_0_22px_rgba(48,219,231,0.45)]",
      ],
    };

    const colorList = colors[variant];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 14 + ((i * 11) % 52), // 14px to 66px
      left: Math.floor((i * 37 + 7) % 96), // spread across 0% - 96% width
      top: Math.floor((i * 43 + 5) % 95), // spread across 0% - 95% height
      duration: 5 + ((i * 1.5) % 6), // 5s to 11s float cycle
      delay: (i * 0.4) % 4,
      xOffset: (i % 2 === 0 ? 1 : -1) * (12 + (i * 7) % 30),
      yDistance: 40 + (i * 9) % 60,
      opacity: 0.4 + ((i * 0.1) % 0.45),
      color: colorList[i % colorList.length],
    }));
  }, [count, variant]);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute rounded-full backdrop-blur-[1.5px] ${b.color}`}
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            top: `${b.top}%`,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: b.opacity * 0.5,
            scale: 0.8,
          }}
          animate={{
            y: [-b.yDistance, b.yDistance, -b.yDistance],
            x: [-b.xOffset, b.xOffset, -b.xOffset],
            opacity: [
              b.opacity * 0.5,
              b.opacity,
              b.opacity * 0.8,
              b.opacity * 0.5,
            ],
            scale: [0.85, 1.15, 0.95, 0.85],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        >
          {/* Glossy specular highlight reflection */}
          <div className="absolute top-[16%] left-[20%] w-[28%] h-[28%] rounded-full bg-white/70 blur-[0.5px]" />
        </motion.div>
      ))}
    </div>
  );
}

export default AnimatedBubbles;
