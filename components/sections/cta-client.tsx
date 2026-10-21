"use client";

import Link from "next/link";
import { CalendarDays, Rocket } from "lucide-react";

export function CTAClient() {
  return (
    <section aria-label="Get started with OceanNet" className="w-full">
      // CTAs
      <div className="grid grid-cols-2 bg-primary">
        <Link
          href="/contact?subject=Project+Inquiry"
          className="group relative flex min-h-13 sm:min-h-20 md:min-h-23 items-center justify-center gap-1.5 sm:gap-3 bg-[#07142f] px-2 py-3 pr-3 sm:px-5 sm:py-5 sm:pr-10 text-[11px] min-[380px]:text-xs sm:text-lg md:text-2xl font-bold text-primary transition-colors hover:bg-[#0d1e40] focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary [clip-path:polygon(0_0,100%_0,90%_100%,0%_100%)] sm:[clip-path:polygon(0_0,100%_0,92%_100%,0%_100%)]"
        >
          <Rocket
            className="h-3.5 w-3.5 min-[380px]:h-4 min-[380px]:w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 transition-transform group-hover:scale-110"
            strokeWidth={2.5}
          />
          <span className="truncate">Start A Project</span>
          <span
            className="absolute inset-x-0 bottom-0 h-0.5 sm:h-1 bg-primary"
            aria-hidden="true"
          />
        </Link>

        <Link
          href="/contact?subject=Consultation"
          className="group flex min-h-13 sm:min-h-20 md:min-h-23 items-center justify-center gap-1.5 sm:gap-3 bg-primary px-2 py-3 pl-1.5 sm:px-5 sm:py-5 sm:pl-8 text-[11px] min-[380px]:text-xs sm:text-lg md:text-2xl font-bold text-[#07142f] transition-colors hover:bg-primary/90 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#07142f]"
        >
          <CalendarDays
            className="h-3.5 w-3.5 min-[380px]:h-4 min-[380px]:w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 shrink-0 transition-transform group-hover:scale-110"
            strokeWidth={2.5}
          />
          <span className="truncate">Schedule A Call</span>
        </Link>
      </div>
    </section>
  );
}

