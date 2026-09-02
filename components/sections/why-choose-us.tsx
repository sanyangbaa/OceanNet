"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, RotateCcw, Users, Zap, Award } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";
import { AnimatedBubbles } from "@/components/shared/animated-bubbles";

const features = [
  {
    icon: ShieldCheck,
    title: "Government & Public Sector",
    description:
      "Digital government systems, infrastructure, integration and institutional capacity building.",
  },
  {
    icon: RotateCcw,
    title: "Healthcare",
    description:
      "Disease surveillance, health information systems, interoperability and digital health infrastructure.",
  },
  {
    icon: Clock,
    title: "International Development",
    description:
      "Technology implementation and technical support for donor-funded programmes and project implementation units.",
  },
  {
    icon: Award,
    title: "Private Enterprise",
    description:
      "Cloud productivity, enterprise applications, infrastructure, security and managed ICT services.",
  },
  {
    icon: Users,
    title: "Financial & Professional Services",
    description:
      "Secure collaboration, infrastructure and systems that support operational continuity.",
  },
  {
    icon: Zap,
    title: "Telecommunications & Technology Partners",
    description:
      "Local implementation, systems integration, field support and specialist delivery partnerships.",
  },
];

export function WhyChooseUs() {
  return (
    <section
      className="relative py-16 md:py-20 text-white overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #03045E 0%, #0077C8 100%)",
      }}
    >
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-0" />

      {/* Animated Bubbles */}
      <AnimatedBubbles count={18} variant="mixed" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          subtitle="The OceanNet Advantage"
          title="Industries We Serve"
          description="We combine innovation, expertise, and reliable technology solutions to help organizations achieve sustainable growth and successful digital transformation."
          dark
        />

        {/* Features Container: Carousel on mobile, Grid on desktop */}
        <div className="relative group/carousel">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="flex-shrink-0 w-[95%] sm:w-[450px] md:w-auto snap-center flex flex-col"
              >
                <Tilt
                  options={{ max: 45, scale: 1.02, speed: 450 }}
                  className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-white/70 flex flex-col justify-start items-start h-full"
                >
                  {/* Icon */}
                  <div className="bg-primary/10 p-3 rounded-lg inline-flex items-center justify-center mb-3 ring-1 ring-primary/15">
                    <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-secondary group-hover:text-primary transition-colors mb-1.5 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          {/* Mobile indicator */}
          <div className="flex justify-center gap-2 mt-4 pb-4 md:pb-0 md:hidden">
            {features.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
