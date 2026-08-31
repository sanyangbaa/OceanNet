"use client";

import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import type { Testimonial } from "@/server/db";
import { fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";

export function TestimonialsClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="relative group/carousel">
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-6 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0 mt-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex-shrink-0 w-[95%] sm:w-[500px] md:w-auto snap-center flex flex-col"
          >
            <Tilt
              options={{ max: 35, scale: 1.02, speed: 450 }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 relative flex flex-col group hover:shadow-2xl hover:border-primary/20 transition-all duration-500 h-full justify-between"
            >
              <Quote className="absolute top-6 right-6 text-gray-200 w-10 h-10 rotate-180 transition-all duration-500 group-hover:scale-110 group-hover:text-primary/20" />

              {/* Star Rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < (testimonial.rating || 5) ? "text-primary fill-current" : "text-gray-300 fill-current"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-gray-600 mb-6 leading-relaxed italic relative z-10 text-sm">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                <div className="relative flex-shrink-0 h-11 w-11 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image as string}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-primary font-bold text-xl uppercase">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>

      {/* Mobile indicator */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {testimonials.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/10" />
        ))}
      </div>
    </div>
  );
}
