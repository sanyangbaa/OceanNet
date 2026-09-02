import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ScrollToTop } from "@/components/shared/scroll-to-top";

const navItems = [{ name: "Careers", href: "/careers" }];

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      {/* <WhatsAppButton /> */}
      <ScrollToTop />
    </>
  );
}
