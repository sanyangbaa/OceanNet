"use client";

import Image from "next/image";
import Link from "next/link";
import { Calculator, Download, Mail, MapPin, Phone } from "lucide-react";
import { serviceDetailImages, serviceImages } from "@/data/service-images";
import { companyInfo } from "@/data/company";
import { ServiceDetailFaq } from "@/components/sections/service-detail-faq";
import type { Service } from "@/data/services";

interface ServiceDetailClientProps {
  service: Service;
  allServices: Service[];
}

export function ServiceDetailClient({
  service,
  allServices,
}: ServiceDetailClientProps) {
  const images = serviceDetailImages[service.id] || [
    serviceImages[service.id] ||
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  ];

  const detailParagraphs = (service.detailText || service.description)
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* ── Breadcrumb / Hero Header ── */}
      <section className="relative flex min-h-60 sm:min-h-72 items-center justify-center overflow-hidden bg-[#07142f] px-4 py-14">
        <Image
          src={images[0]}
          alt=""
          fill
          unoptimized={/^https?:\/\//i.test(images[0])}
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#07142f]/80" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Service Detail
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span className="text-primary font-bold">&gt;</span>
            <Link
              href="/services"
              className="transition-colors hover:text-primary"
            >
              Pages
            </Link>
            <span className="text-primary font-bold">&gt;</span>
            <span className="text-white">Service Detail</span>
          </nav>
        </div>
      </section>

      {/* ── Main Service Detail Content ── */}
      <main className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.95fr)] lg:gap-10 items-start">
          {/* Left Column (2/3) */}
          <div className="min-w-0">
            {/* 2 Side-by-Side Images */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {images.slice(0, 2).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[1.65/1] overflow-hidden bg-slate-100 shadow-sm"
                >
                  <Image
                    src={imgUrl}
                    alt={`${service.title} preview ${idx + 1}`}
                    fill
                    unoptimized={/^https?:\/\//i.test(imgUrl)}
                    priority={idx === 0}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 600px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Service Title and Paragraphs */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl md:text-3xl font-extrabold tracking-tight text-[#07142f]">
                {service.title}
              </h2>
              <div className="space-y-4 text-xs sm:text-sm leading-[1.75] text-slate-600">
                {detailParagraphs.map((paragraph, index) => (
                  <p key={`${service.id}-detail-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <ServiceDetailFaq serviceTitle={service.title} />

            {/* Bottom Quote Banner */}
            <div className="mt-8 flex flex-col sm:flex-row overflow-hidden shadow-sm">
              <p className="flex items-center bg-[#07142f] px-5 py-4 text-xs sm:text-sm font-bold text-white flex-1">
                Interested with this service? Let&apos;s work together.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-primary px-6 py-4 text-xs sm:text-sm font-extrabold text-[#07142f] transition-colors hover:bg-primary/85 shrink-0"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Get A Quote
              </Link>
            </div>
          </div>

          {/* Right Column / Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24">
            {/* Widget 1: OUR SERVICES */}
            <section aria-labelledby="our-services-heading">
              <h2
                id="our-services-heading"
                className="mb-3.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#07142f]"
              >
                Our Services
                <span className="h-0.5 w-10 bg-primary" aria-hidden="true" />
              </h2>
              <ul className="flex flex-col space-y-1">
                {allServices.map((item) => {
                  const itemSlug = item.slug || item.id;
                  const isCurrent =
                    itemSlug === service.slug || item.id === service.id;

                  return (
                    <li key={item.id}>
                      <Link
                        href={`/services/${itemSlug}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`group flex items-center px-4 py-2.5 text-xs sm:text-sm transition-all ${
                          isCurrent
                            ? "bg-[#eef2f9] text-[#07142f] font-extrabold border-l-4 border-primary shadow-xs"
                            : "bg-[#f3f6ff] text-slate-700 font-semibold hover:bg-primary/20 hover:text-[#07142f] border-l-4 border-transparent"
                        }`}
                      >
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Widget 2: DOWNLOAD */}
            <section aria-labelledby="download-heading">
              <h2
                id="download-heading"
                className="mb-3.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#07142f]"
              >
                Download
                <span className="h-0.5 w-10 bg-primary" aria-hidden="true" />
              </h2>
              <div className="space-y-2.5">
                <a
                  href="/docs/brochure.pdf"
                  download
                  className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-3.5 text-xs sm:text-sm font-bold text-[#07142f] transition-colors hover:bg-primary/85 shadow-xs uppercase tracking-wide"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Brochure (PDF)
                </a>
                <a
                  href="/docs/brochure.png"
                  download
                  className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-3.5 text-xs sm:text-sm font-bold text-[#07142f] transition-colors hover:bg-primary/85 shadow-xs uppercase tracking-wide"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Brochure (PNG)
                </a>
              </div>
            </section>

            {/* Widget 3: CONTACT DETAIL */}
            <section aria-labelledby="contact-detail-heading">
              <h2
                id="contact-detail-heading"
                className="mb-3.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#07142f]"
              >
                Contact Detail
                <span className="h-0.5 w-10 bg-primary" aria-hidden="true" />
              </h2>
              <div className="space-y-4 bg-[#07142f] p-5 text-xs sm:text-sm text-white shadow-sm">
                <a
                  href={`tel:${companyInfo.contacts.phone.replace(/[^\d+]/g, "")}`}
                  className="group flex items-start gap-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-[#07142f] transition-transform group-hover:scale-105">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="pt-0.5 leading-tight text-slate-200 group-hover:text-primary transition-colors">
                    <p className="font-semibold">{companyInfo.contacts.phone}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      +220 378 5585
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${companyInfo.contacts.email}`}
                  className="group flex items-start gap-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-[#07142f] transition-transform group-hover:scale-105">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="pt-0.5 leading-tight break-all text-slate-200 group-hover:text-primary transition-colors">
                    <p className="font-semibold">{companyInfo.contacts.email}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      support@oceannettechnologies.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-[#07142f]">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="pt-0.5 leading-tight text-slate-200">
                    <p className="font-semibold">Startup, Jula Finance Complex</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Kanifing South, The Gambia
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
