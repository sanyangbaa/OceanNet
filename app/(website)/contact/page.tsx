import { getCompanyInfo } from "@/lib/data";
import { ContactClient, type ContactClientProps } from "./contact-client";
import { companyInfo as staticCompanyInfo } from "@/data/company";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: staticCompanyInfo.contactMetaTitle || "Contact OceanNet Technologies | The Gambia",
    description:
      staticCompanyInfo.contactMetaDescription ||
      "Contact OceanNet Technologies to discuss software, systems integration, cloud, infrastructure, cybersecurity and managed ICT requirements.",
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  let companyInfo = null;
  try {
    companyInfo = await getCompanyInfo();
  } catch (error) {
    console.error("Failed to fetch company info:", error);
  }

  const serializedCompanyInfo: ContactClientProps["companyInfo"] = {
    contacts: {
      address: companyInfo?.address || "Kanifing, The Gambia",
      phone: companyInfo?.phone || "+220 278 5585",
      email: companyInfo?.email || "info@oceannettechnologies.com",
    },
  };

  return <ContactClient companyInfo={serializedCompanyInfo} />;
}
