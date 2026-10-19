import { AboutPreviewClient } from "./about-preview-client";
import { getMergedCompanyInfo } from "@/lib/data";

export async function AboutPreview({ phone }: { phone?: string } = {}) {
  // If phone was passed from layout (already fetched), skip the DB call
  const resolvedPhone =
    phone ?? (await getMergedCompanyInfo()).contacts.phone;

  return (
    <section className="py-8 sm:py-12 md:py-14 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <AboutPreviewClient phone={resolvedPhone} />
      </div>
    </section>
  );
}
