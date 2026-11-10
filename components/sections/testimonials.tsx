import { getTestimonials, getFeaturedTestimonials } from "@/lib/data";
import { TestimonialsClient } from "@/components/sections/testimonials-client";
import type { Testimonial } from "@/server/db";

export async function Testimonials({
  testimonials: providedTestimonials,
  featuredOnly = false,
}: {
  testimonials?: Testimonial[];
  featuredOnly?: boolean;
} = {}) {
  const testimonials =
    providedTestimonials ??
    (featuredOnly
      ? await getFeaturedTestimonials()
      : await getTestimonials());

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="overflow-hidden bg-white py-8 sm:py-12 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-2.5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-primary" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-primary">
              Testimonial
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-[25px] sm:text-[28px] lg:text-[32px] font-bold tracking-tight text-secondary leading-[1.25]">
            Our Clients Say
          </h2>
        </div>
        <TestimonialsClient testimonials={testimonials} />
      </div>
    </section>
  );
}

