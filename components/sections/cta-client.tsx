"use client";

import Link from "next/link";
import { CalendarDays, Calculator } from "lucide-react";

export function CTAClient() {
  return (
    <section aria-label="Get started with OceanNet" className="w-full">
      <div className="grid min-h-23 grid-cols-1 bg-primary sm:grid-cols-2">
        <Link
          href="/contact?subject=Project+Inquiry"
          className="group relative flex min-h-19 items-center justify-center gap-3 bg-[#07142f] px-5 py-5 text-lg font-bold text-primary transition-colors hover:bg-[#0d1e40] focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary sm:min-h-23 sm:[clip-path:polygon(0_0,100%_0,92%_100%,0%_100%)] sm:pr-10 md:text-2xl"
        >
          <Calculator
            className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110 md:h-7 md:w-7"
            strokeWidth={2.5}
          />
          <span>Request A Quote</span>
          <span
            className="absolute inset-x-0 bottom-0 h-1 bg-primary"
            aria-hidden="true"
          />
        </Link>

        <Link
          href="/contact?subject=Consultation"
          className="group flex min-h-19 items-center justify-center gap-3 bg-primary px-5 py-5 text-lg font-bold text-[#07142f] transition-colors hover:bg-primary/90 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#07142f] sm:min-h-23 sm:pl-8 md:text-2xl"
        >
          <CalendarDays
            className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110 md:h-7 md:w-7"
            strokeWidth={2.5}
          />
          <span>Set An Appointment</span>
        </Link>
      </div>
    </section>
  );
}

