import { Hero } from "@/components/sections/hero";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { WhyOceanNet } from "@/components/sections/why-oceannet";
import { Partners } from "@/components/sections/partners";
import { Testimonials } from "@/components/sections/testimonials";
import { CallToAction } from "@/components/sections/cta";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <div id="services">
        <ServicesOverview />
      </div>
      <WhyChooseUs />
      <Partners />
      <WhyOceanNet />
      <FeaturedProjects />
      <Testimonials />
      <CallToAction />
    </>
  );
}
