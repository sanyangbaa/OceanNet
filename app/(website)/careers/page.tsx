import { getAllJobs } from "@/lib/careers";
import { companyInfo } from "@/data/company";
import { CareersClient } from "@/components/careers/careers-client";
import { companyInfo as staticCompanyInfo } from "@/data/company";

export async function generateMetadata() {
  return {
    title: `Careers | ${staticCompanyInfo.careerMetaTitle || "ONT"}`,
    description:
      staticCompanyInfo.careerMetaDescription || "OceanNet Technologies.",
  };
}

export default async function CareersPage({
  searchParams,
}: {
  searchParams?:
    | { jobType?: string; q?: string }
    | Promise<{ jobType?: string; q?: string } | undefined>;
}) {
  const sp = (await searchParams) ?? {};

  const filters: { jobType?: string; q?: string } = {};
  if (sp?.jobType) filters.jobType = String(sp.jobType);
  if (sp?.q) filters.q = String(sp.q);

  const activeJobs = await getAllJobs({ ...filters, activeOnly: true });
  const allActiveJobs = await getAllJobs({ activeOnly: true });

  const jobTypes = Array.from(
    new Set(
      allActiveJobs
        .map((j) => j.jobType as string)
        .filter((x): x is string => !!x),
    ),
  );

  const hasFilter = !!(filters.jobType || filters.q);

  return (
    <CareersClient
      activeJobs={activeJobs}
      jobTypes={jobTypes}
      sp={sp}
      hasFilter={hasFilter}
      companyInfo={companyInfo}
    />
  );
}
