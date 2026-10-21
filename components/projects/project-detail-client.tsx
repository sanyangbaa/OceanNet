"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Quote,
  Star,
} from "lucide-react";
import { companyInfo } from "@/data/company";
import type { Project } from "@/server/db";

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects?: Project[];
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2.5 text-xs sm:text-sm">
      <span className="shrink-0 font-bold text-[#07142f]">{label}:</span>
      <span className="text-right text-slate-600 font-medium">{value}</span>
    </div>
  );
}

function ensureArray(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) {
    return val.filter((item): item is string => typeof item === "string");
  }
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === "string",
        );
      }
    } catch {
      return val
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const galleryList = ensureArray(project.gallery);
  const slides = [...new Set([project.image, ...galleryList].filter(Boolean))];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const isSliderPausedRef = useRef(false);

  useEffect(() => {
    isSliderPausedRef.current = isSliderPaused;
  }, [isSliderPaused]);

  useEffect(() => {
    if (slides.length < 2) return;
    const interval = window.setInterval(() => {
      if (!isSliderPausedRef.current) {
        setActiveSlide((current) => (current + 1) % slides.length);
      }
    }, 6000);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };
  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  const keyFeaturesList = ensureArray(project.keyFeatures);
  const highlights =
    keyFeaturesList.length > 0
      ? keyFeaturesList
      : [
          "Delivered according to defined technical requirements and specifications",
          "Engineered for high availability, security, and scalability",
          "Seamless integration with organizational workflows and systems",
          "Comprehensive user training, technical handoff, and ongoing support",
          "Measurable operational efficiency and process transparency",
        ];

  const rating =
    typeof project.rating === "number" && project.rating > 0
      ? Math.max(1, Math.min(5, Math.round(project.rating)))
      : 5;

  const reviewAuthor =
    project.reviewAuthor || project.client || "Client Representative";
  const reviewRole = project.reviewRole || project.client || "Partner";
  const reviewText =
    project.reviewText ||
    "The team executed the project with exceptional professionalism and attention to detail. Deliverables were completed on schedule and fully aligned with our organizational needs.";

  const detailParagraphs = (project.description || "")
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* ── Breadcrumb / Hero Header ── */}
      <section className="relative flex min-h-60 sm:min-h-72 items-center justify-center overflow-hidden bg-[#07142f] px-4 py-14">
        <Image
          src={slides[0] || "/images/about_hero_full.png"}
          alt=""
          fill
          unoptimized={/^https?:\/\//i.test(slides[0] || "")}
          sizes="100vw"
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-[#07142f]/80" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
            Project Detail
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
              href="/projects"
              className="transition-colors hover:text-primary"
            >
              Pages
            </Link>
            <span className="text-primary font-bold">&gt;</span>
            <span className="text-white">Project Detail</span>
          </nav>
        </div>
      </section>

      {/* ── Main Project Detail Content ── */}
      <main className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.95fr)] lg:gap-10 items-start">
          {/* Left Column (2/3) */}
          <div className="min-w-0">
            {/* Gallery Slider */}
            <div
              id="project-slider"
              className="group relative aspect-video sm:aspect-[16/10] overflow-hidden bg-slate-100 shadow-sm"
              onMouseEnter={() => setIsSliderPaused(true)}
              onMouseLeave={() => setIsSliderPaused(false)}
            >
              <Image
                key={slides[activeSlide]}
                src={slides[activeSlide]}
                alt={`${project.title} slide ${activeSlide + 1}`}
                fill
                unoptimized={/^https?:\/\//i.test(slides[activeSlide])}
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
                className="object-cover transition-opacity duration-500"
              />

              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousSlide}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center bg-[#07142f]/80 text-white shadow-md transition-colors hover:bg-primary hover:text-[#07142f]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextSlide}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center bg-[#07142f]/80 text-white shadow-md transition-colors hover:bg-primary hover:text-[#07142f]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 transition-all ${
                          activeSlide === idx
                            ? "w-6 bg-primary"
                            : "w-2 bg-white/70 hover:bg-white"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Project Title and Description */}
            <div className="mt-8">
              <h2 className="mb-4 text-2xl md:text-3xl font-extrabold tracking-tight text-[#07142f]">
                {project.title}
              </h2>
              {project.shortDescription && (
                <p className="mb-4 text-xs sm:text-sm font-semibold leading-relaxed text-slate-700">
                  {project.shortDescription}
                </p>
              )}
              <div className="space-y-4 text-xs sm:text-sm leading-[1.75] text-slate-600">
                {detailParagraphs.length > 0 ? (
                  detailParagraphs.map((paragraph, index) => (
                    <p key={`desc-${index}`}>{paragraph}</p>
                  ))
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
            </div>

            {/* The Challenge in Work - From Admin Project Form */}
            {(project.challenge || highlights.length > 0) && (
              <div className="mt-8">
                <h3 className="mb-3 text-xl md:text-2xl font-bold tracking-tight text-[#07142f]">
                  The Challenge in Work
                </h3>
                {project.challenge ? (
                  <p className="text-xs sm:text-sm leading-[1.75] text-slate-600 whitespace-pre-line">
                    {project.challenge}
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm leading-[1.75] text-slate-600">
                    Voluptua est takimata stet invidunt sed rebum nonumy stet, clita aliquyam dolores vero stet consetetur elitr takimata rebum sanctus. Sit sed accusam stet sit nonumy kasd diam dolores, sanctus lorem kasd duo dolor dolor vero sit et.
                  </p>
                )}

                {/* Checklist items with golden checkmarks */}
                {highlights.length > 0 && (
                  <ul className="mt-4 space-y-2.5">
                    {highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-slate-600"
                      >
                        <Check
                          className="h-4 w-4 shrink-0 text-primary mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* YouTube Embed if available */}
            {project.youtubeUrl && (
              <div className="mt-8">
                <h3 className="mb-3 text-xl font-bold tracking-tight text-[#07142f]">
                  Project Video Walkthrough
                </h3>
                <div className="aspect-video overflow-hidden bg-black shadow-sm">
                  <iframe
                    src={
                      project.youtubeUrl.includes("watch?v=")
                        ? project.youtubeUrl.replace("watch?v=", "embed/")
                        : project.youtubeUrl.includes("youtu.be/")
                          ? project.youtubeUrl.replace("youtu.be/", "youtube.com/embed/")
                          : project.youtubeUrl
                    }
                    title={`${project.title} Video`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Bottom Quote Banner */}
            <div className="mt-8 flex flex-col sm:flex-row overflow-hidden shadow-sm">
              <p className="flex items-center bg-[#07142f] px-5 py-4 text-xs sm:text-sm font-bold text-white flex-1">
                Have a project? Let&apos;s work together.
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
            {/* Widget 1: PROJECT DETAIL */}
            <section aria-labelledby="project-detail-heading">
              <h2
                id="project-detail-heading"
                className="mb-3.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#07142f]"
              >
                Project Detail
                <span className="h-0.5 w-10 bg-primary" aria-hidden="true" />
              </h2>
              <div className="divide-y divide-slate-200">
                <DetailRow label="Client" value={project.client} />
                <DetailRow
                  label="Project Lead / Tech Lead"
                  value={project.projectRole || project.role || "OceanNet Technologies"}
                />
                <DetailRow label="Region" value={project.location} />
                <DetailRow
                  label="Status"
                  value={project.status || "Complete"}
                />
                <DetailRow
                  label="Year Completed"
                  value={project.year ? String(project.year) : "2024"}
                />
                <DetailRow label="Category" value={project.category} />

                {/* Rating row with 5 gold stars */}
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-2.5 text-xs sm:text-sm">
                  <span className="shrink-0 font-bold text-[#07142f]">
                    Rating:
                  </span>
                  <div
                    className="flex items-center gap-0.5 text-primary"
                    aria-label={`${rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i < rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Solid View Project Button */}
              <a
                href="#project-slider"
                className="mt-4 flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs sm:text-sm font-extrabold text-[#07142f] transition-colors hover:bg-primary/85 uppercase tracking-wide shadow-xs"
              >
                View Project
              </a>
            </section>

            {/* Widget 2: CLIENT REVIEW */}
            <section aria-labelledby="client-review-heading">
              <h2
                id="client-review-heading"
                className="mb-3.5 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-[#07142f]"
              >
                Client Review
                <span className="h-0.5 w-10 bg-primary" aria-hidden="true" />
              </h2>
              <div className="bg-[#f3f6ff] p-5 shadow-xs">
                <div className="relative mb-3 h-12 w-12 overflow-hidden bg-white shadow-xs">
                  {project.reviewImage ? (
                    <Image
                      src={project.reviewImage}
                      alt={reviewAuthor}
                      fill
                      unoptimized={/^https?:\/\//i.test(project.reviewImage)}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/20 text-[#07142f] font-extrabold text-base">
                      {reviewAuthor.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <h4 className="text-sm font-bold text-[#07142f]">
                  {reviewAuthor}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {reviewRole}
                </p>

                <Quote className="mt-3 h-4 w-4 fill-primary text-primary" />
                <p className="mt-1 text-xs leading-relaxed text-slate-600 italic">
                  {reviewText}
                </p>
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
