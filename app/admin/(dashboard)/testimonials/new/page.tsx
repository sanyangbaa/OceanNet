import { TestimonialForm } from "@/components/admin/testimonial-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewTestimonialPage() {
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
          <h1 className="text-4xl font-black uppercase tracking-tighter">New Testimonial</h1>
          <p className="text-gray-400 mt-1">Add a new client testimonial to showcase your work.</p>
        </div>
      </div>

      <TestimonialForm />
    </div>
  );
}
