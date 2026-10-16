"use client";

import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  BarChart3,
  Code2,
  Shield,
  Building2,
  Laptop,
  ArrowRight,
  Layout,
  Calculator,
  Map,
  Layers,
  Wifi,
  Cloud,
  HeartPulse,
  Server,
} from "lucide-react";
import type { Service } from "@/data/services";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const iconMap: Record<string, IconComponent> = {
  ClipboardList,
  BarChart3,
  Code2,
  Shield,
  Building2,
  Laptop,
  Layout,
  Calculator,
  Map,
  Layers,
  Wifi,
  Cloud,
  HeartPulse,
  Server,
};

export const serviceImages: Record<string, string> = {
  "digital-solutions":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
  "systems-integration":
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  "digital-health":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
  "enterprise-software":
    "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=800&auto=format&fit=crop",
  "networking":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
  "ict-infrastructure":
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
  "cybersecurity":
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
  "cloud-solutions":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  "gis-solutions":
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop",
  "ai-data-analytics":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "managed-services":
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
};

/**
 * Computes SVG path for the notched card with an elevated top-left tab
 * and smooth concave corner down to the shelf.
 */
function getCardPath(
  w: number,
  h: number,
  r = 14,
  tabW = 80,
  shelfY = 46,
  stroke = 1.5
) {
  if (w <= 0 || h <= 0) return "";
  const pad = stroke / 2;
  const left = pad;
  const top = pad;
  const right = w - pad;
  const bottom = h - pad;

  const effectiveTabW = Math.min(tabW, w - r * 2.5);
  const effectiveShelfY = shelfY;

  return [
    `M ${left} ${top + r}`,
    `A ${r} ${r} 0 0 1 ${left + r} ${top}`,
    `H ${effectiveTabW - r}`,
    `A ${r} ${r} 0 0 1 ${effectiveTabW} ${top + r}`,
    `V ${effectiveShelfY - r}`,
    `A ${r} ${r} 0 0 0 ${effectiveTabW + r} ${effectiveShelfY}`,
    `H ${right - r}`,
    `A ${r} ${r} 0 0 1 ${right} ${effectiveShelfY + r}`,
    `V ${bottom - r}`,
    `A ${r} ${r} 0 0 1 ${right - r} ${bottom}`,
    `H ${left + r}`,
    `A ${r} ${r} 0 0 1 ${left} ${bottom - r}`,
    "Z",
  ].join(" ");
}

interface SteppedServiceCardProps {
  service: Service | { id: string; title: string; description: string; icon: string; slug?: string | null };
}

export function SteppedServiceCard({ service }: SteppedServiceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({
    w: 320,
    h: 460,
  });

  const IconComponent = iconMap[service.icon] || Code2;
  const slug = service.slug || service.id;
  const image =
    serviceImages[service.id] || serviceImages["digital-solutions"];

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
      }
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tabWidth = Math.min(84, Math.max(72, Math.round(dimensions.w * 0.28)));
  const shelfY = 46;
  const pathD = getCardPath(
    dimensions.w,
    dimensions.h,
    14,
    tabWidth,
    shelfY
  );

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col h-full transition-all duration-300"
      style={{
        filter: "drop-shadow(0 2px 8px rgba(15, 23, 42, 0.04))",
      }}
    >
      {/* ── Background SVG with custom notched silhouette ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300 group-hover:drop-shadow-md"
        viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={pathD}
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="group-hover:stroke-primary/50 transition-colors duration-300"
        />
      </svg>

      {/* ── Top Header Row (Height = shelfY 46px, perfectly leveled with Read More button) ── */}
      <div className="relative w-full h-[46px] flex items-center justify-between">
        {/* Elevated Tab Icon (positioned in top-left tab, centered at height 23px) */}
        <div
          className="h-full flex items-center justify-center pl-1.5"
          style={{ width: `${tabWidth}px` }}
        >
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0" />
        </div>

        {/* Floating "Read More" Button in recessed shelf (exact same horizontal centerline at 23px) */}
        <div className="h-full flex items-center pr-3 sm:pr-4">
          {slug && (
            <Link
              href={`/services/${slug}`}
              className="h-7 sm:h-8 inline-flex items-center gap-1.5 border border-slate-300/80 bg-white/95 rounded-xl px-2.5 sm:px-3 text-slate-500 hover:border-primary hover:text-primary transition-all duration-200 group/btn shadow-xs hover:shadow-sm"
            >
              <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-slate-400 group-hover/btn:border-primary group-hover/btn:text-primary transition-colors shrink-0">
                <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
              </span>
              <span className="font-serif italic text-xs font-medium tracking-normal whitespace-nowrap leading-none">
                Read More
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* ── Main Content Area (Below Shelf) ── */}
      <div className="relative px-3.5 sm:px-4 pt-2.5 pb-5 flex flex-col flex-grow z-10">
        {/* Service Photo */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
          <Image
            src={image}
            alt={service.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Title */}
        <h3 className="text-[1.05rem] md:text-[1.12rem] font-bold text-slate-900 mt-3.5 mb-2 leading-snug tracking-tight group-hover:text-primary transition-colors">
          <Link href={`/services/${slug}`}>{service.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed line-clamp-3">
          {service.description}
        </p>
      </div>
    </div>
  );
}
