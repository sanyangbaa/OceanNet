import { AboutPreviewClient } from "./about-preview-client";
import { getMergedCompanyInfo } from "@/lib/data";

export async function AboutPreview() {
  const companyInfo = await getMergedCompanyInfo();

  return (
    <section className="py-8 sm:py-12 md:py-14 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <AboutPreviewClient phone={companyInfo.contacts.phone} />
      </div>
    </section>
  );
}

