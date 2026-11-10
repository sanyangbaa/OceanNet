"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { textVariant } from "@/lib/motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  withBackground?: boolean;
  backgroundImage?: string;
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
}: SectionHeaderProps) {
  const isDarkOrBg = dark || withBackground;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        withBackground ? "py-10 sm:py-12 md:py-14 mb-6 md:mb-8" : "pt-0 pb-6 sm:pb-8",
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
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover blur-[2px] scale-110 transition-transform duration-700 group-hover:scale-100"
          />
        </div>
      )}

      {/* Centered Content Container Animated with textVariant */}
      <motion.div
        variants={textVariant(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "150px 0px" }}
        className={cn(
          "relative z-20 mx-auto w-full max-w-4xl px-0 sm:px-4 md:px-6 flex flex-col",
          align === "center" ? "text-center items-center" : "text-left items-start",
        )}
      >
        {withBackground ? (
          <>
            {subtitle && (
              <span className="text-[12px] font-bold uppercase tracking-wider mb-2 text-accent">
                {subtitle}
              </span>
            )}
            <h1 className="w-full text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold uppercase tracking-tight text-white leading-[1.20]">
              {title}
              <span className="text-accent">.</span>
            </h1>
            {description && (
              <p
                className={cn(
                  "mt-3 w-full max-w-none md:max-w-2xl text-[15px] sm:text-[16px] leading-[1.70] text-white/85",
                  align === "center" ? "mx-auto" : "",
                )}
              >
                {description}
              </p>
            )}
            <div
              className={cn(
                "h-1.5 w-20 rounded-full mt-3 bg-accent",
                align === "center" ? "mx-auto" : "",
              )}
            />
          </>
        ) : (
          <>
            {subtitle && (
              <div
                className={cn(
                  "mb-2.5 flex items-center gap-2",
                  align === "center" ? "justify-center" : "justify-start",
                )}
              >
                <span className="h-px w-8 bg-primary" />
                <span
                  className={cn(
                    "text-[12px] font-bold uppercase tracking-wider",
                    isDarkOrBg ? "text-accent" : "text-primary",
                  )}
                >
                  {subtitle}
                </span>
                <span className="h-px w-8 bg-primary" />
              </div>
            )}
            <h2
              className={cn(
                "text-[25px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight leading-[1.25]",
                isDarkOrBg ? "text-white" : "text-secondary",
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "mt-3 text-[16px] leading-[1.70] font-normal",
                  align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl",
                  isDarkOrBg ? "text-slate-300" : "text-slate-600",
                )}
              >
                {description}
              </p>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default SectionHeader;
