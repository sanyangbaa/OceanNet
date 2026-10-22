"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { MobileCarouselControls } from "@/components/shared/mobile-carousel-controls";
import { useMobileCarousel } from "@/components/shared/use-mobile-carousel";
import { SteppedServiceCard } from "@/components/sections/stepped-service-card";

interface Service {
  id: string;
  slug?: string | null;
  title: string;
  description: string;
  icon: string;
}

export function ServicesOverviewClient({ services }: { services: Service[] }) {
  const { activeIndex, handleScroll, scrollContainerRef, scrollTo } =
    useMobileCarousel(services.length);

  return (
    <div className="relative group/carousel">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            variants={fadeIn("up", "tween", Math.min(index * 0.02, 0.1), 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "150px 0px" }}
            className="shrink-0 w-[88%] md:w-auto snap-center flex flex-col"
          >
            <SteppedServiceCard service={service} />
          </motion.div>
        ))}
      </div>

      <MobileCarouselControls
        activeIndex={activeIndex}
        count={services.length}
        itemLabel="service"
        onSelect={scrollTo}
      />
    </div>
  );
}
