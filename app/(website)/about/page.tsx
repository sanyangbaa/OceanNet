import { getTeamMembers } from "@/lib/data";
import { companyInfo as staticCompanyInfo } from "@/data/company";
import { AboutClient } from "@/components/sections/about-client";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: staticCompanyInfo.aboutMetaTitle || "About OceanNet Technologies | The Gambia",
    description:
      staticCompanyInfo.aboutMetaDescription ||
      "Learn about OceanNet Technologies, our team, delivery approach and capabilities across digital solutions, enterprise systems, cloud and ICT infrastructure.",
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="pt-10 pb-10">
      <AboutClient companyInfo={staticCompanyInfo} teamMembers={teamMembers} />
    </div>
  );
}
