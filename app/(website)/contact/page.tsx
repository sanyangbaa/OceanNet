import { getMergedCompanyInfo } from "@/lib/data";
import { ContactClient } from "./contact-client";
import { companyInfo as staticCompanyInfo } from "@/data/company";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title:
      staticCompanyInfo.contactMetaTitle ||
      "Contact OceanNet Technologies | The Gambia",
    description:
      staticCompanyInfo.contactMetaDescription ||
      "Contact OceanNet Technologies to discuss software, systems integration, cloud, infrastructure, cybersecurity and managed ICT requirements.",
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const companyInfo = await getMergedCompanyInfo();

  return <ContactClient companyInfo={companyInfo} />;
}

