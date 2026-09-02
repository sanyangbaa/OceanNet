"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { textVariant } from "@/lib/motion";

export function CTAClient({ phone = "+220 278 5585" }: { phone?: string }) {
  return (
    <>
      <motion.div
        variants={textVariant(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Eyebrow label */}
        <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          Let’s Build What’s Next.
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase text-secondary mb-6 leading-tight">
          Let’s Build What’s <br /> Next.
        </h2>
        <p className="text-lg font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Whether you are modernising infrastructure, implementing a digital
          platform, integrating enterprise systems or strengthening your cloud
          environment, OceanNet can help turn your requirements into a
          dependable operational solution.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-6"
      >
        {/* Primary CTA button */}
        <Link
          href="/contact"
          className="bg-primary text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-base flex items-center gap-3 transition-all hover:bg-secondary hover:text-white active:scale-95 shadow-xl shadow-primary/20 hover:scale-105 duration-300"
        >
          Start a Conversation
          <ArrowRight className="h-5 w-5" />
        </Link>

        {/* Phone call secondary CTA */}
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-4 text-secondary group"
        >
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            <PhoneCall className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
          </div>
          <div className="text-left">
            <span className="block text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Call Us
            </span>
            <span className="block text-xl font-black text-secondary">
              {phone}
            </span>
          </div>
        </a>
      </motion.div>
    </>
  );
}
