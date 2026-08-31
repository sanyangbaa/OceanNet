import { getAdminTestimonials } from "@/lib/data";
import DeleteButton from "@/components/admin/delete-button-client";
import { Plus, Edit, Trash2, MessageSquareQuote } from "lucide-react";
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
            Manage client testimonials displayed on the homepage.
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
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full self-start group-hover:bg-primary group-hover:text-black transition-all">
                    <MessageSquareQuote size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                    prefetch={false}
                    className="text-gray-400 hover:text-white transition-colors"
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

              <div className="mt-2 text-yellow-400 flex text-sm">
                {"★".repeat(testimonial.rating || 5)}
                {"☆".repeat(5 - (testimonial.rating || 5))}
              </div>

              <p className="text-gray-300 italic text-sm mt-2 flex-1">
                "{testimonial.content}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
