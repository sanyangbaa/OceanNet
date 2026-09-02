import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title:
    "OceanNet Technologies | Digital Solutions & IT Services in The Gambia",
  description:
    "Enterprise software, systems integration, digital health, cloud, cybersecurity, networking and managed ICT services from OceanNet Technologies in The Gambia.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "OceanNet Technologies",
    title:
      "OceanNet Technologies | Digital Solutions & IT Services in The Gambia",
    description:
      "Enterprise software, systems integration, digital health, cloud, cybersecurity, networking and managed ICT services from The Gambia.",
    url: "/",
    images: [{ url: "/logo/official_logo.png", alt: "OceanNet Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "OceanNet Technologies | Digital Solutions & IT Services in The Gambia",
    description:
      "Digital solutions, enterprise systems, cloud, cybersecurity, networking and managed ICT services.",
    images: ["/logo/official_logo.png"],
  },
};
//
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
