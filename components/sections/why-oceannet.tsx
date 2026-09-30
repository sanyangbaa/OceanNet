"use client";

import { Handshake, Layers3, MapPinned, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { fadeIn } from "@/lib/motion";
import { MobileCarouselControls } from "@/components/shared/mobile-carousel-controls";
import { useMobileCarousel } from "@/components/shared/use-mobile-carousel";

const reasons = [
  {
    icon: MapPinned,
    title: "Local Expertise. International Standards.",
    description:
      "We understand the Gambian operating environment and apply modern engineering and delivery practices to build solutions that work in context.",
  },
  {
    icon: Layers3,
    title: "End-to-End Delivery",
    description:
      "From assessment and architecture through implementation, training, deployment and ongoing support, we stay accountable for the full delivery journey.",
  },
  {
    icon: ShieldCheck,
    title: "Multidisciplinary Engineering",
    description:
      "Software, systems integration, cloud, networking, cybersecurity, infrastructure and digital platforms come together within one delivery ecosystem.",
  },
  {
    icon: Handshake,
    title: "Strategic Technology Partnerships",
    description:
      "Our specialist partner network helps us scale the expertise needed for complex local and regional assignments.",
  },
];

export function WhyOceanNet() {
  const { activeIndex, handleScroll, scrollContainerRef, scrollTo } =
    useMobileCarousel(reasons.length);

  return (
    <section className="bg-background py-10 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          subtitle="Why OceanNet"
          title="Built for Context"
          description="We bring practical local knowledge, broad engineering capability and accountable delivery to every engagement."
          //   align="left"
          withBubbles={false}
        />

        <div className="relative group/carousel">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pt-6 pb-4 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0"
          >
            {reasons.map((reason, index) => (
              <motion.article
                key={reason.title}
                variants={fadeIn("up", "spring", index * 0.1, 0.7)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="flex h-full w-[95%] shrink-0 snap-center flex-col border-l-2 border-primary/25 pl-5 max-md:!transform-none sm:w-[450px] md:w-auto"
              >
                <reason.icon
                  aria-hidden="true"
                  className="mb-5 h-7 w-7 text-primary"
                />
                <h3 className="text-lg font-bold leading-snug text-secondary">
                  {reason.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </motion.article>
            ))}
          </div>

          <MobileCarouselControls
            activeIndex={activeIndex}
            count={reasons.length}
            itemLabel="reason"
            onSelect={scrollTo}
          />
        </div>
      </div>
    </section>
  );
}
