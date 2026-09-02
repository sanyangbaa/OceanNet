import { services } from "@/data/services";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCardClient } from "@/components/sections/service-card-client";
import { companyInfo as staticCompanyInfo } from "@/data/company";

export async function generateMetadata() {
  return {
    title: `Services | ${staticCompanyInfo.servicesMetaTitle || "ONT"}`,
    description:
      staticCompanyInfo.servicesMetaDescription || "OceanNet Technologies.",
  };
}

export default async function ServicesPage() {
  // Using static data from data/services.ts
  const servicesData = services;
  const categories = [
    "Core Digital Capabilities",
    "Infrastructure & Platforms",
    "Specialised & Managed Services",
  ] as const;

  return (
    <div className="pt-14 pb-12">
      {/* Hero Header */}
      <SectionHeader
        subtitle="What We Offer"
        title="Our Services"
        description="Cutting-edge IT solutions, data science, custom software engineering, and digital transformation services tailored to scale your organization."
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
        withBackground
      />

      {/* Services List */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-16 pt-6 md:pt-10">
          {categories.map((category) => {
            const categoryServices = servicesData.filter(
              (service) => service.category === category,
            );

            return (
              <section key={category} aria-labelledby={`${category}-heading`}>
                <div className="mb-8 border-l-4 border-primary pl-4">
                  <h2
                    id={`${category}-heading`}
                    className="text-2xl md:text-3xl font-black text-secondary"
                  >
                    {category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {categoryServices.map((service, idx) => (
                    <ServiceCardClient
                      key={service.id}
                      service={service}
                      index={idx}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
