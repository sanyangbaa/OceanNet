"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  HardHat,
  Hammer,
  Leaf,
  Wrench,
  DoorOpen,
  Table,
  Layers,
  Truck,
  Package,
} from "lucide-react";
import type { Service } from "@/data/services";
import { fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";

const iconMap: Record<string, any> = {
  ClipboardList,
  BarChart3,
  Code2,
  Shield,
  Building2,
  Laptop,
  Layout,
  Calculator,
  Map,
  HardHat,
  Hammer,
  Leaf,
  Wrench,
  DoorOpen,
  Table,
  Layers,
  Truck,
  Package,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCardClient({ service, index }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon] || Code2;
  const slug = service.slug || service.id;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.08, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col h-full"
    >
      <Tilt
        options={{ max: 45, scale: 1.02, speed: 450 }}
        id={service.id}
        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-border flex flex-col justify-between items-start group h-full"
      >
        <div className="w-full">
          {/* Top left Icon Container */}
          <div className="bg-primary/10 p-3 rounded-lg inline-flex items-center justify-center mb-4 ring-1 ring-primary/20">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold text-secondary mb-2 leading-snug tracking-tight group-hover:text-primary transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-base leading-relaxed mb-4 line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Learn More link */}
        {slug && (
          <Link
            href={`/services/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-secondary transition-colors group/link mt-auto pt-2"
          >
            Learn More{" "}
            <span className="group-hover/link:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        )}
      </Tilt>
    </motion.div>
  );
}
