import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { companyInfo } from "@/data/company";
import { services } from "@/data/services";
import { FooterSections } from "@/components/shared/footer-sections";

const footerServiceLinks = services.slice(0, 5).map((service) => ({
  name: service.title,
  href: service.slug ? `/services/${service.slug}` : `/services#${service.id}`,
}));

const footerLinks = [
  {
    title: "Useful Pages",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Projects", href: "/projects" },
      { name: "Services", href: "/services" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Service Areas",
    links: footerServiceLinks,
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#07142f] pt-8 pb-4 text-white sm:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,.35) 1px, transparent 1.2px), radial-gradient(ellipse at 52% 42%, rgba(56,189,248,.12), transparent 68%)",
          backgroundSize: "8px 8px, 100% 100%",
          maskImage:
            "radial-gradient(ellipse at 52% 42%, black 0%, transparent 72%)",
        }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <FooterSections className="mb-5 grid grid-cols-1 items-start gap-7 border-b border-white/10 pb-7 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.15fr] lg:gap-8 lg:pb-8">
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-3">
            <Link href="/" className="group flex items-center">
              <div className="relative inline-flex items-center justify-center rounded-xl bg-white/95 px-3.5 py-2 shadow-sm ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
                <div className="relative h-11 w-44 sm:h-12 sm:w-38">
                  <Image
                    src="/logo/official_logo.png"
                    alt="OceanNet Technologies"
                    fill
                    sizes="200px"
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-300">
              {companyInfo.footerDescription}
            </p>

            <div className="mt-1 flex items-center gap-2">
              <a
                href={companyInfo.socials.facebook}
                aria-label="OceanNet on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a
                href={companyInfo.socials.instagram}
                aria-label="OceanNet on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href={companyInfo.socials.linkedin}
                aria-label="OceanNet on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.346V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.269 2.372 4.269 5.455v6.286zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a
                href={companyInfo.socials.twitter}
                aria-label="OceanNet on X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path d="M18.244 2H21.5l-7.12 8.138L22 22h-5.956l-4.666-6.104 L6.036 22H2.778l7.616-8.703L2 2h6.108l4.218 5.553L18.244 2zm-1.142 18h1.804L7.128 3.895H5.193L17.102 20z" />
                </svg>
              </a>
              <a
                href={companyInfo.socials.tiktok}
                aria-label="OceanNet on TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.74.02 1.48-.04 2.94-.04 4.42-.57-.17-1.14-.3-1.73-.35-.81-.07-1.64.08-2.37.47-.78.41-1.46 1.07-1.73 1.93-.32.97-.11 2.05.31 2.93.39.83 1.05 1.47 1.91 1.78.32.13.65.21.99.23.11.02.22.03.33.03.81 0 1.59-.24 2.26-.67.65-.42 1.15-1.07 1.34-1.81.04-.23.05-.47.05-.71.01-4.06.01-8.12.01-12.18z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.slice().reverse().map((section) => (
            <div key={section.title} className="flex flex-col gap-6">
              <h4 className="flex items-center gap-3 text-base font-extrabold uppercase tracking-wide text-primary">
                {section.title}
                <span className="h-px w-10 bg-primary/80" aria-hidden="true" />
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm leading-snug text-slate-300 transition-colors duration-200 hover:text-primary"
                    >
                      <span
                        className="text-primary transition-transform duration-200 ease-out group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        ›
                      </span>
                      <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="flex items-center gap-3 text-base font-extrabold uppercase tracking-wide text-primary">
              Office &amp; Contact
              <span className="h-px w-10 bg-primary/80" aria-hidden="true" />
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-slate-300">
                  {companyInfo.contacts.address}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`tel:${companyInfo.contacts.phone.replace(/[^\d+]/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {companyInfo.contacts.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${companyInfo.contacts.email}`}
                  className="break-all transition-colors hover:text-primary"
                >
                  {companyInfo.contacts.email}
                </a>
              </div>
            </div>
          </div>
        </FooterSections>

        <div className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-b border-white/10 pb-4 text-sm text-slate-300 sm:gap-x-5">
          <Link href="/terms" className="transition-colors hover:text-primary">
            Terms of Use
          </Link>
          <span className="h-4 w-px bg-white/15" aria-hidden="true" />
          <Link href="/privacy" className="transition-colors hover:text-primary">
            Privacy Policy
          </Link>
          <span className="h-4 w-px bg-white/15" aria-hidden="true" />
          <Link
            href="/privacy#cookies"
            className="transition-colors hover:text-primary"
          >
            Cookies
          </Link>
          <span className="h-4 w-px bg-white/15" aria-hidden="true" />
          <Link href="/contact" className="transition-colors hover:text-primary">
            Help
          </Link>
        </div>

        {/* Copyright and design attribution */}
        <div className="flex flex-col items-center justify-between gap-2 text-center text-sm font-medium text-slate-300 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.
          </p>
          <p>
            Designed by{" "}
            <span className="font-semibold text-primary">
              OceanNet Technologies
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

