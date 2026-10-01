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
        "bg-primary/25 border border-primary/40",
        "bg-[#0077C8]/30 border border-[#0096C7]/50",
        "bg-primary/15 border border-primary/30",
      ],
      cyan: [
        "bg-accent/25 border border-accent/40",
        "bg-[#30DBE7]/30 border border-[#90E0EF]/50",
        "bg-accent/15 border border-accent/30",
      ],
      mixed: [
        "bg-accent/25 border border-accent/40",
        "bg-primary/30 border border-primary/50",
        "bg-white/20 border border-white/40",
        "bg-[#00B4D8]/25 border border-[#90E0EF]/40",
        "bg-[#30DBE7]/20 border border-white/30",
        "bg-accent/35 border border-accent/60",
      ],
    };

    const colorList = colors[variant];

    return Array.from({ length: Math.min(Math.max(count, 0), 8) }, (_, i) => ({
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
          className={`absolute rounded-full ${b.color}`}
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            top: `${b.top}%`,
            opacity: b.opacity,
          }}
          animate={{
            y: [-b.yDistance, b.yDistance, -b.yDistance],
            x: [-b.xOffset, b.xOffset, -b.xOffset],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        >
        </motion.div>
      ))}
    </div>
  );
}

export default AnimatedBubbles;
