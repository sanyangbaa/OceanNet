import { getAdminTestimonials } from "@/lib/data";
import DeleteButton from "@/components/admin/delete-button-client";
import { Plus, Edit, MessageSquareQuote } from "lucide-react";
import Link from "next/link";
import type { Testimonial } from "@/server/db";

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminTestimonials();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Testimonials
          </h1>
          <p className="text-gray-400 mt-1">
            Manage testimonials for the Services page and choose which ones to feature on the homepage.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          prefetch={false}
          className="bg-primary text-black px-4 py-2 rounded-sm font-bold uppercase text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <Plus size={16} /> Add testimonial
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.length === 0 ? (
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-sm p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
            No testimonials found. Add some to show social proof.
          </div>
        ) : (
          testimonials.map((testimonial: Testimonial) => (
            <div
              key={testimonial.id}
              className="group overflow-hidden bg-white/5 border border-white/10 rounded-sm hover:border-primary/50 transition-all duration-500 p-6 flex gap-6 flex-col"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4 min-w-0">
                  <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0 group-hover:bg-primary group-hover:text-black transition-all">
                    <MessageSquareQuote size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-lg leading-tight truncate">
                      {testimonial.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p
                        className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          testimonial.featured
                            ? "bg-primary/15 text-primary border border-primary/20"
                            : "bg-white/5 text-gray-400"
                        }`}
                      >
                        {testimonial.featured ? "Homepage Featured" : "Services Page"}
                      </p>

                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                    prefetch={false}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Edit testimonial"
                  >
                    <Edit size={16} />
                  </Link>
                  <DeleteButton
                    id={testimonial.id}
                    apiPath="/api/admin/testimonials"
                    redirectUrl="/admin/testimonials"
                  />
                </div>
              </div>

              <div className="text-yellow-400 flex text-sm">
                {"★".repeat(testimonial.rating || 5)}
                {"☆".repeat(5 - (testimonial.rating || 5))}
              </div>

              <p className="text-gray-300 italic text-sm mt-1 flex-1 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
