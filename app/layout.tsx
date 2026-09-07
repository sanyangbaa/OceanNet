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
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "OceanNet Technologies",
  alternateName: "ONT",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://oceannettechnologies.com",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://oceannettechnologies.com"}/logo/official_logo.png`,
  description:
    "Enterprise software, systems integration, digital health, cloud, cybersecurity, networking and managed ICT services from OceanNet Technologies in The Gambia.",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "2nd Floor, Jula Finance Complex, Opposite The Gambia Tourism and Hospitality Institute",
    addressLocality: "Kanifing",
    addressRegion: "Kanifing Municipality",
    addressCountry: "GM",
  },
  telephone: "+220 2785585",
  email: "info@oceannettechnologies.com",
  sameAs: [
    "https://facebook.com/oceannettechnologies",
    "https://linkedin.com/company/oceannet-technologies",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday"],
      opens: "09:00",
      closes: "12:30",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
