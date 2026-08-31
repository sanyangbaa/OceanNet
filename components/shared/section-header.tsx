"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { textVariant } from "@/lib/motion";
import { AnimatedBubbles } from "./animated-bubbles";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  withBackground?: boolean;
  backgroundImage?: string;
  withBubbles?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  className,
  dark = false,
  withBackground = false,
  backgroundImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
  withBubbles = true,
}: SectionHeaderProps) {
  const isDarkOrBg = dark || withBackground;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        withBackground ? "py-16 md:py-20 mb-10" : "py-8",
        className,
      )}
    >
      {/* Background Image Effect */}
      {withBackground && (
        <div className="absolute inset-0 z-0 group">
          <div className="absolute inset-0 bg-[#03045E]/85 z-10" />
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover blur-[2px] scale-110 transition-transform duration-700 group-hover:scale-100"
          />
        </div>
      )}

      {/* Full-coverage Animated Bubbles across the whole Section Header */}
      {withBubbles && (
        <AnimatedBubbles
          count={30}
          variant="mixed"
          className={isDarkOrBg ? "z-10" : "z-0 opacity-40"}
        />
      )}

      {/* Centered Content Container Animated with textVariant */}
      <motion.div
        variants={textVariant(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={cn(
          "relative z-20 mx-auto max-w-4xl px-6 flex flex-col gap-4",
          align === "center" ? "text-center" : "text-left",
        )}
      >
        {subtitle && (
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-[0.3em] mb-2",
              isDarkOrBg ? "text-accent" : "text-primary",
            )}
          >
            {subtitle}
          </span>
        )}
        <h2
          className={cn(
            "text-3xl md:text-5xl font-black uppercase tracking-tight",
            isDarkOrBg ? "text-white" : "text-secondary",
          )}
        >
          {title}
          <span className={isDarkOrBg ? "text-accent" : "text-primary"}>.</span>
        </h2>
        {description && (
          <p
            className={cn(
              "text-lg leading-relaxed max-w-2xl",
              align === "center" ? "mx-auto" : "",
              isDarkOrBg ? "text-white/85" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        )}
        {/* Decorative accent bar */}
        <div
          className={cn(
            "h-1.5 w-24 rounded-full mt-4",
            align === "center" ? "mx-auto" : "",
            isDarkOrBg ? "bg-accent" : "bg-primary",
          )}
        />
      </motion.div>
    </div>
  );
}

export default SectionHeader;
