import { HeroClient } from "./hero-client";
import { AnimatedBubbles } from "@/components/shared/animated-bubbles";

export function Hero() {
  return (
    <section className="relative bg-[#03045E] text-white pt-20 md:pt-30 pb-4 md:pb-6 overflow-hidden">
      {/* Background ambient lighting effects extending seamlessly to top of viewport */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-0" />

      {/* Full-coverage Animated Bubbles across entire Hero section */}
      <AnimatedBubbles count={36} variant="mixed" className="z-0" />

      <HeroClient />
    </section>
  );
}
