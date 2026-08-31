import { getTeamMembers } from "@/lib/data";
import { companyInfo as staticCompanyInfo } from "@/data/company";
import { AboutClient } from "@/components/sections/about-client";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: `About Us | ${staticCompanyInfo.shortName || "ONT"}`,
    description: staticCompanyInfo.description || "OceanNet Technologies.",
  };
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="pt-10 pb-10">
      <AboutClient
        companyInfo={staticCompanyInfo}
        teamMembers={teamMembers}
      />
    </div>
  );
}
