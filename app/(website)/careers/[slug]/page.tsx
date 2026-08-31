import { getJobById } from "@/lib/careers";
import { notFound } from "next/navigation";
import { JobDetailClient } from "@/components/careers/job-detail-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobById(slug);
  if (!job) return { title: "Job Not Found" };
  return { title: `${job.title} | OceanNet Careers` };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // slug param is actually the job id
  const job = await getJobById(slug);
  if (!job) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://oceannettech.com";
  const shareUrl = `${siteUrl}/careers/${job.id}`;
  const shareTitle = `Apply for ${job.title} at OceanNet Technologies`;

  return (
    <JobDetailClient
      job={job}
      shareUrl={shareUrl}
      shareTitle={shareTitle}
    />
  );
}
