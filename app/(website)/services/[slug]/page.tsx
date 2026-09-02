import { services } from "@/data/services";
import { notFound } from "next/navigation";
import { ServiceDetailClient } from "@/components/services/service-detail-client";
import { companyInfo } from "@/data/company";
import type { Metadata } from "next";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: `Service | ${companyInfo.name}` };

  return {
    title: `${service.title} | ${companyInfo.name}`,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      title: `${service.title} | ${companyInfo.name}`,
      description: service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Find service from static mockdata
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
