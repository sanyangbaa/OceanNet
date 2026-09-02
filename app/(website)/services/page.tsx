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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-16">
          {servicesData.map((service, idx) => (
            <ServiceCardClient key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
