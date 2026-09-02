"use client";

import { motion } from "framer-motion";
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

  useEffect(() => {
    const loadPartners = async () => {
      try {
        const res = await fetch("/api/partners", { cache: "no-store" });
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

  const scrollingPartners = [...partners, ...partners];

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="relative z-20 -mt-12 md:-mt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white shadow-lg rounded-sm py-2 md:py-6 px-6 flex flex-col md:flex-row items-center gap-2 md:gap-6 overflow-hidden">
          {/* Label */}
          <div className="shrink-0">
            <h4 className="text-sm font-bold uppercase tracking-widest text-secondary whitespace-nowrap">
              Technology <br className="hidden md:block" /> Partners:
            </h4>
          </div>

          {/* Marquee Container */}
          <div className="grow overflow-hidden relative">
            {/* Fades for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent z-10" />

            <motion.div
              className="flex items-center gap-10 md:gap-24 px-4"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {scrollingPartners.map((partner, index) => {
                const content = (
                  <div
                    key={`${partner.name}-${index}`}
                    className="relative w-24 h-12 md:w-32 md:h-16 shrink-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
                  >
                    {partner.image ? (
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-contain"
                        priority
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
