import { getAllJobs } from "@/lib/careers";
import { companyInfo } from "@/data/company";
import { CareersClient } from "@/components/careers/careers-client";
import { companyInfo as staticCompanyInfo } from "@/data/company";

export async function generateMetadata() {
  return {
    title: staticCompanyInfo.careerMetaTitle || "Careers at OceanNet Technologies | The Gambia",
    description:
      staticCompanyInfo.careerMetaDescription ||
      "Join the OceanNet Technologies team. We are building a multidisciplinary team working across software, systems integration, cloud, infrastructure and digital transformation in The Gambia.",
    alternates: { canonical: "/careers" },
  };
}

export default async function CareersPage() {
  const activeJobs = await getAllJobs({ activeOnly: true });

  return (
    <CareersClient
      activeJobs={activeJobs}
      companyInfo={companyInfo}
    />
  );
}
