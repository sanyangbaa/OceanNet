import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PartnerForm } from "@/components/admin/partner-form";

export default function NewPartnerPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Add Partner
          </h1>
          <p className="text-gray-400 mt-1">
            Create a new partner logo and details to display in the homepage
            partners section.
          </p>
        </div>
        <Link
          href="/admin/partners"
          prefetch={false}
          className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:border-primary hover:text-primary"
        >
          <ArrowLeft size={16} /> Back to partners
        </Link>
      </div>

      <PartnerForm />
    </div>
  );
}
