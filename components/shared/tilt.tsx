"use client";

import React, { useRef, useState, useEffect } from "react";

export interface TiltOptions {
  max?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
  easing?: string;
  reset?: boolean;
}

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  options?: TiltOptions;
  className?: string;
}

export function Tilt({
  children,
  options = { max: 45, scale: 1, speed: 450 },
  className = "",
  style,
  ...props
}: TiltProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [styleState, setStyleState] = useState<React.CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: `all ${options.speed || 450}ms ${options.easing || "cubic-bezier(.03,.98,.52,.99)"}`,
  });

  const max = options.max ?? 45;
  const scale = options.scale ?? 1;
  const speed = options.speed ?? 450;
  const perspective = options.perspective ?? 1000;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;

    const rotateX = -yPercent * (max / 2);
    const rotateY = xPercent * (max / 2);

    setStyleState({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 100ms ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyleState({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`,
    });
  };

  return (
    <div
      ref={tiltRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...styleState,
        transformStyle: "preserve-3d",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Tilt;
