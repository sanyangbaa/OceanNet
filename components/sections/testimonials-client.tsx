"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/server/db";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="relative h-full px-4 pb-3 pt-6 sm:px-8">
      <div
        className="absolute bottom-3 left-8 right-0 top-12 bg-primary sm:left-12"
        aria-hidden="true"
      />
      <div className="relative flow-root h-auto min-h-44 border-2 border-primary bg-white p-4 sm:pl-24.5 sm:pr-6 md:h-44">
        <div className="relative float-left -ml-8 mt-0.5 mr-3.5 mb-2 z-10 h-[4.5rem] w-[4.5rem] overflow-hidden border-2 border-primary bg-white p-1 sm:absolute sm:float-none sm:m-0 sm:-left-5 sm:top-8 sm:h-[4.75rem] sm:w-[4.75rem]">
          <div className="relative h-full w-full overflow-hidden bg-gray-100">
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                unoptimized={/^https?:\/\//i.test(testimonial.image)}
                sizes="76px"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-50 text-2xl font-bold text-primary">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-600 md:line-clamp-5">
          {testimonial.content}
        </p>
      </div>
      <div className="relative ml-8 flex h-11 items-center justify-between gap-2 bg-primary px-4 sm:ml-12 sm:px-5">
        <h3 className="text-base sm:text-lg font-bold leading-tight text-white truncate">
          {testimonial.name}
        </h3>
        {testimonial.role &&
        testimonial.role.trim() &&
        testimonial.role.trim().toLowerCase() !== "oceannet" ? (
          <span className="text-[11px] sm:text-xs font-medium text-white/80 truncate max-w-[50%]">
            {testimonial.role}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function TestimonialsClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [activeDesktopPage, setActiveDesktopPage] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const desktopPageCount = Math.ceil(testimonials.length / 2);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
    setIsSwiping(true);
    setDragOffset(0);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = event.touches[0]?.clientX ?? touchStartX.current;
    const currentY = event.touches[0]?.clientY ?? touchStartY.current;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Allow natural vertical page scroll if user scrolls vertically
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffX) < 12) {
      return;
    }

    // Apply edge damping
    if (
      (activeMobileIndex === 0 && diffX > 0) ||
      (activeMobileIndex === testimonials.length - 1 && diffX < 0)
    ) {
      setDragOffset(diffX * 0.25);
    } else {
      setDragOffset(diffX);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    setIsSwiping(false);

    if (dragOffset < -45 && activeMobileIndex < testimonials.length - 1) {
      setActiveMobileIndex((prev) => prev + 1);
    } else if (dragOffset > 45 && activeMobileIndex > 0) {
      setActiveMobileIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="relative">
      {/* ── MOBILE VIEW: Exactly 1 card visible at a time with smooth sliding ── */}
      <div className="overflow-hidden md:hidden">
        <div
          className="flex will-change-transform"
          style={{
            transform: `translateX(calc(-${activeMobileIndex * 100}% + ${dragOffset}px))`,
            transition: isSwiping
              ? "none"
              : "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          aria-live="polite"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP VIEW: 2 cards per view with smooth sliding ── */}
      <div className="hidden md:block overflow-hidden">
        <div
          className="flex will-change-transform transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${activeDesktopPage * 100}%)`,
          }}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          aria-live="polite"
        >
          {Array.from({ length: desktopPageCount }, (_, pageIdx) => (
            <div
              key={pageIdx}
              className="w-full shrink-0 grid grid-cols-2 gap-5 lg:gap-8"
            >
              {testimonials
                .slice(pageIdx * 2, pageIdx * 2 + 2)
                .map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── NAVIGATION CONTROLS ── */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {/* Mobile controls (1 card at a time) */}
        {testimonials.length > 1 && (
          <div className="flex md:hidden items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setActiveMobileIndex((i) => Math.max(0, i - 1))}
              disabled={activeMobileIndex === 0}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Pagination dots for mobile */}
            <div className="flex items-center gap-1.5 px-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMobileIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeMobileIndex === idx
                      ? "w-6 bg-primary"
                      : "w-2 bg-primary/25"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveMobileIndex((i) =>
                  Math.min(testimonials.length - 1, i + 1),
                )
              }
              disabled={activeMobileIndex === testimonials.length - 1}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Desktop controls (2 cards per page) */}
        {desktopPageCount > 1 && (
          <div className="hidden md:flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveDesktopPage((p) => Math.max(0, p - 1))}
              disabled={activeDesktopPage === 0}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveDesktopPage((p) =>
                  Math.min(desktopPageCount - 1, p + 1),
                )
              }
              disabled={activeDesktopPage === desktopPageCount - 1}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

