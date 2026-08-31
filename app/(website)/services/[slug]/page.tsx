import { services } from "@/data/services";
import { notFound } from "next/navigation";
import { ServiceDetailClient } from "@/components/services/service-detail-client";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  // Find service from static mockdata
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
