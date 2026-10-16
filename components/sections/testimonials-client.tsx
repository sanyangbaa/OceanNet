"use client";

import { useEffect, useRef, useState } from "react";
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
      <div className="relative h-auto min-h-44 border-2 border-primary bg-white px-4 py-4 pl-21 sm:pl-24.5 sm:pr-6 md:h-44">
        <div className="absolute -left-4 top-8 z-10 h-[4.5rem] w-[4.5rem] overflow-hidden border-2 border-primary bg-white p-1 sm:-left-5 sm:h-[4.75rem] sm:w-[4.75rem]">
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
      <div className="relative ml-8 flex h-11 items-center bg-primary px-4 sm:ml-12 sm:px-5">
        <h3 className="text-lg font-bold leading-tight text-white">
          {testimonial.name}
        </h3>
      </div>
    </article>
  );
}

export function TestimonialsClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activePage, setActivePage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const itemsPerPage = isMobile ? 1 : 2;
  const pageCount = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileLayout = () => {
      setIsMobile(mediaQuery.matches);
      setActivePage(0);
    };

    updateMobileLayout();
    mediaQuery.addEventListener("change", updateMobileLayout);
    return () => mediaQuery.removeEventListener("change", updateMobileLayout);
  }, []);

  const previous = () => setActivePage((page) => Math.max(0, page - 1));
  const next = () =>
    setActivePage((page) => Math.min(pageCount - 1, page + 1));

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance =
      touchStartX.current -
      (event.changedTouches[0]?.clientX ?? touchStartX.current);
    if (distance > 45) next();
    if (distance < -45) previous();
    touchStartX.current = null;
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:gap-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        aria-live="polite"
      >
        {testimonials
          .slice(
            activePage * itemsPerPage,
            activePage * itemsPerPage + itemsPerPage,
          )
          .map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={previous}
            disabled={activePage === 0}
            aria-label="Previous testimonials"
            className="flex h-10 w-10 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={activePage === pageCount - 1}
            aria-label="Next testimonials"
            className="flex h-10 w-10 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

