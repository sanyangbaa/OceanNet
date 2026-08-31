"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { slideIn, textVariant, staggerContainer } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";

export function AboutPreviewClient() {
  return (
    <motion.div
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
    >
      {/* Left Part: Image Side with slideIn left */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="relative h-100 md:h-112.5 lg:h-125"
      >
        <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <Image
            src="/images/ont_img.jpg"
            alt="ONT Technology Team"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Floating Experience Card with Tilt */}
        <div className="absolute -bottom-10 -right-10 hidden md:block z-20">
          <Tilt
            options={{ max: 45, scale: 1.05, speed: 450 }}
            className="bg-primary p-8 rounded-2xl shadow-lg border-2 border-white/20"
          >
            <span className="text-5xl font-black text-white leading-none block">
              6+
            </span>
            <p className="text-white/90 font-bold uppercase tracking-widest mt-2 text-sm">
              Years of <br /> Excellence
            </p>
          </Tilt>
        </div>
      </motion.div>

      {/* Right Part: Content Side with slideIn right */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex flex-col gap-4 md:gap-6"
      >
        <motion.div variants={textVariant(0.1)}>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary block mb-2">
            About Our Company
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-secondary leading-tight">
            Building a Smarter <br />
            Digital Future<span className="text-primary">.</span>
          </h2>
        </motion.div>

        <motion.p
          variants={textVariant(0.2)}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          OceanNet Technologies delivers innovative technology solutions that
          help organizations improve efficiency, enhance transparency,
          strengthen resilience, and achieve measurable results.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4">
          {[
            "Enterprise Ready",
            "Secure & Compliant",
            "Cloud Enabled",
            "Always Supported",
          ].map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
              <p className="font-bold text-sm uppercase tracking-wide text-secondary">
                {feature}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4 md:pt-6">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-lg font-bold transition-all hover:bg-primary hover:text-white shadow-xl hover:scale-105 active:scale-95 duration-300 text-sm uppercase tracking-wider"
          >
            READ OUR STORY
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
