import { db } from "@/lib/db";
import { CTAClient } from "./cta-client";

export async function CallToAction() {
  let companyInfo = null;
  try {
    companyInfo = await db.companyInfo.findFirst();
  } catch (error) {
    console.error("Failed to fetch company info for CallToAction:", error);
  }

  return (
    <section className="py-14 md:py-20 relative overflow-hidden bg-white">
      {/* Subtle decorative background watermark */}
      <div className="absolute mx-auto px-4 md:px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[18rem] font-black text-secondary/5 pointer-events-none whitespace-nowrap select-none">
        OCEANNET
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <CTAClient phone={"+220 278 5585"} />
        </div>
      </div>
    </section>
  );
}
