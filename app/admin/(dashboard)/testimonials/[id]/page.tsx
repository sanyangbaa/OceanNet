import { TestimonialForm } from "@/components/admin/testimonial-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getTestimonialById } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/testimonials"
          prefetch={false}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest self-start"
        >
          <ChevronLeft size={14} /> Back to Testimonials
        </Link>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Edit Testimonial</h1>
          <p className="text-gray-400 mt-1">Update the existing client testimonial details.</p>
        </div>
      </div>

      <TestimonialForm initialData={testimonial} id={testimonial.id} />
    </div>
  );
}
