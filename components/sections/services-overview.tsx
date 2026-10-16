import { services } from "@/data/services";
import { SectionHeader } from "@/components/shared/section-header";
import { ServicesOverviewClient } from "./services-overview-client";

export async function ServicesOverview() {
  const homepageServices = services.slice(0, 6);

  return (
    <section className="py-8 sm:py-12 md:py-14 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          subtitle="Our Expertise"
          title="What We Do"
          description="Delivering end-to-end technology solutions that modernize operations, improve efficiency, and accelerate digital transformation."
        />
        <ServicesOverviewClient services={homepageServices} />
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <a
            href="/services"
            className="inline-flex py-3.5 px-8 sm:py-4 sm:px-10 rounded-sm border-2 border-secondary font-black text-xs sm:text-sm uppercase tracking-widest transition-all text-secondary hover:bg-secondary hover:text-white"
          >
            Explore All Services
          </a>
        </div>
      </div>
    </section>
  );
}
