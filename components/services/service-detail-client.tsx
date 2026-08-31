"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { textVariant, fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";
import { AnimatedBubbles } from "@/components/shared/animated-bubbles";

interface ServiceDetailClientProps {
  service: any;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const capabilities = Array.isArray(service.challenges)
    ? (service.challenges as string[])
    : [];
  const tools = Array.isArray(service.technologies)
    ? (service.technologies as string[])
    : [];

  return (
    <div className="pt-20 bg-background min-h-screen overflow-hidden">
      {/* Banner / Header with Animated Bubbles & textVariant */}
      <div className="relative bg-secondary py-16 md:py-24 text-white overflow-hidden">
        <AnimatedBubbles count={16} variant="mixed" />
        <motion.div
          variants={textVariant(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6 max-w-6xl flex flex-col relative z-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-3">
            Service Details
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            {service.title}
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            {service.description}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-white transition-colors self-start"
          >
            ← All Services
          </Link>
        </motion.div>
      </div>

      {/* Main Details Body */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-16">
          {/* Detailed Description */}
          {service.detailText && (
            <motion.div
              variants={textVariant(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="prose prose-slate max-w-none"
            >
              <p className="text-foreground/80 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {service.detailText}
              </p>
            </motion.div>
          )}

          {/* Challenges We Solve */}
          {service.challenges && service.challenges.length > 0 && (
            <div>
              <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-black uppercase tracking-tight text-secondary mb-8 pb-3 border-b border-border"
              >
                Challenges We Solve
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.challenges.map((challenge: string, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={fadeIn("up", "spring", idx * 0.06, 0.75)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Tilt
                      options={{ max: 25, scale: 1.02, speed: 450 }}
                      className="bg-white p-4 rounded-xl border border-border shadow-sm flex items-start h-full"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-accent mt-2 mr-3 shrink-0" />
                      <span className="text-muted-foreground text-base leading-relaxed">
                        {challenge}
                      </span>
                    </Tilt>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Our Solutions */}
          {service.solutions && service.solutions.length > 0 && (
            <div>
              <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-black uppercase tracking-tight text-secondary mb-8 pb-3 border-b border-border"
              >
                Our Solutions
              </motion.h2>
              <div className="space-y-6">
                {service.solutions.map((solution: any, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={fadeIn("up", "spring", idx * 0.08, 0.75)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Tilt
                      options={{ max: 20, scale: 1.01, speed: 450 }}
                      className="bg-white p-6 rounded-2xl border border-border border-l-4 border-l-primary shadow-sm hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg font-bold text-secondary mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {solution.description}
                      </p>
                    </Tilt>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div>
              <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-black uppercase tracking-tight text-secondary mb-8 pb-3 border-b border-border"
              >
                Benefits
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit: string, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={fadeIn("up", "spring", idx * 0.06, 0.75)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Tilt
                      options={{ max: 25, scale: 1.02, speed: 450 }}
                      className="bg-white p-4 rounded-xl border border-border shadow-sm flex items-start h-full"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-accent mt-2 mr-3 shrink-0" />
                      <span className="text-muted-foreground text-base leading-relaxed">
                        {benefit}
                      </span>
                    </Tilt>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies & Tools */}
          {tools.length > 0 && (
            <div>
              <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-black uppercase tracking-tight text-secondary mb-8 pb-3 border-b border-border"
              >
                Technologies &amp; Tools
              </motion.h2>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Industries Served */}
          {service.industriesServed && service.industriesServed.length > 0 && (
            <div>
              <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-black uppercase tracking-tight text-secondary mb-8 pb-3 border-b border-border"
              >
                Industries Served
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {service.industriesServed.map((industry: string, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={fadeIn("up", "spring", idx * 0.05, 0.75)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Tilt
                      options={{ max: 20, scale: 1.02, speed: 450 }}
                      className="bg-white p-3.5 rounded-xl border border-border flex items-center shadow-sm"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-accent mr-3 shrink-0" />
                      <span className="text-muted-foreground text-sm font-medium">
                        {industry}
                      </span>
                    </Tilt>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <motion.div
            variants={fadeIn("up", "spring", 0.1, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #03045E 0%, #0077C8 55%, #30DBE7 100%)",
            }}
          >
            <AnimatedBubbles count={12} variant="mixed" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
                Ready to get started?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Contact us to discuss how {service.title} can help your
                organization.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-secondary hover:text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-lg hover:scale-105 active:scale-95 duration-300 uppercase tracking-wider text-sm"
              >
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
