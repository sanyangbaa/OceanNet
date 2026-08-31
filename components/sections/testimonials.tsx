import { db } from "@/server/db";
import { SectionHeader } from "@/components/shared/section-header";
import { TestimonialsClient } from "@/components/sections/testimonials-client";

export async function Testimonials() {
  const testimonials = await db.testimonial.findMany({
    take: 6,
    orderBy: { order: "asc" },
  });

  if (testimonials.length === 0) {
    return null; // Do not render section if no testimonials exist
  }

  return (
    <section className="py-14 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          subtitle="Client Success"
          title="What People Say"
          description="Don't just take our word for it. Read what our clients have to say about our commitment to excellence."
        />

        <TestimonialsClient testimonials={testimonials} />
      </div>
    </section>
  );
}
