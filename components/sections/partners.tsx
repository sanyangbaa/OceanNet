"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PartnerRecord {
  id: string;
  name: string;
  image?: string | null;
  website?: string | null;
}

export function Partners() {
  const [partners, setPartners] = useState<PartnerRecord[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          setPartners(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Partner fetch error:", error);
      }
    };

    loadPartners();
  }, []);

  const basePartners =
    partners.length > 0 && partners.length < 5
      ? [...partners, ...partners]
      : partners;
  const scrollingPartners = [...basePartners, ...basePartners];

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="relative z-20 -mt-12 sm:-mt-12 md:-mt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white shadow-xl rounded-xl sm:rounded-2xl py-3.5 sm:py-4 md:py-6 px-4 sm:px-6 flex flex-col md:flex-row items-center gap-3 md:gap-6 overflow-hidden border border-gray-100">
          {/* Label - Big font size and heavy font weight */}
          <div className="shrink-0 flex items-center pr-0 md:pr-6 md:border-r md:border-gray-200">
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black uppercase tracking-tight text-secondary whitespace-nowrap">
              Partners
            </h3>
          </div>

          {/* Marquee Container with pause on hover */}
          <div
            className="grow overflow-hidden relative group/marquee"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Fades for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

            <div
              className="flex items-center gap-10 md:gap-24 px-4 animate-marquee-scroll"
              style={{ animationPlayState: isHovered ? "paused" : "running" }}
            >
              {scrollingPartners.map((partner, index) => {
                const content = (
                  <div
                    key={`${partner.name}-${index}`}
                    className="relative w-24 h-12 md:w-32 md:h-16 shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
                  >
                    {partner.image ? (
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        unoptimized={/^https?:\/\//i.test(partner.image)}
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                        {partner.name}
                      </div>
                    )}
                  </div>
                );

                return partner.website ? (
                  <Link
                    href={partner.website}
                    key={`${partner.name}-${index}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={`${partner.name}-${index}`}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
