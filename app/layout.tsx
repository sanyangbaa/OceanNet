import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OceanNet Technologies (ONT) | Innovative IT Solutions in The Gambia",
  description:
    "OceanNet Technologies (ONT) is a leading IT company in The Gambia delivering software development, web and mobile applications, cloud solutions, cybersecurity, networking, IT consulting, digital transformation, and managed technology services for businesses and organizations.",
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
