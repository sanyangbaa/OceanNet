import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { getMergedCompanyInfo } from "@/lib/data";

// Cache layout data (navbar + footer) for 60s — revalidates in background
export const revalidate = 60;


export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const companyInfo = await getMergedCompanyInfo();

  return (
    <>
      <Navbar companyInfo={companyInfo} />
      <main className="flex-grow">{children}</main>
      <Footer companyInfo={companyInfo} />
      {/* <WhatsAppButton /> */}
      <ScrollToTop />
    </>
  );
}
