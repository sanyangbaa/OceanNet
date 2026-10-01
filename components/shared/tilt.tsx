"use client";

import React, { useRef } from "react";

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
  options = { max: 15, scale: 1.02, speed: 450 },
  className = "",
  style,
  ...props
}: TiltProps) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const rectRef = useRef<DOMRect | null>(null);

  const max = options.max ?? 15;
  const scale = options.scale ?? 1.02;
  const speed = options.speed ?? 450;
  const perspective = options.perspective ?? 1000;

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    rectRef.current = tiltRef.current?.getBoundingClientRect() ?? null;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const element = tiltRef.current;
    if (
      !element ||
      e.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (!rectRef.current) rectRef.current = element.getBoundingClientRect();
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      const rect = rectRef.current;
      if (!rect) return;

      const xPercent =
        ((pointerRef.current.x - rect.left) / (rect.width || 1) - 0.5) * 2;
      const yPercent =
        ((pointerRef.current.y - rect.top) / (rect.height || 1) - 0.5) * 2;
      const rotateX = -yPercent * (max / 2);
      const rotateY = xPercent * (max / 2);

      element.style.transition = "none";
      element.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    });
  };

  const handlePointerLeave = () => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    rectRef.current = null;
    if (!tiltRef.current) return;
    tiltRef.current.style.transition = `transform ${speed}ms ${options.easing || "cubic-bezier(.03,.98,.52,.99)"}`;
    tiltRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={tiltRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: `transform ${speed}ms ${options.easing || "cubic-bezier(.03,.98,.52,.99)"}`,
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
