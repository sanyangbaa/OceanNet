import { db } from "@/server/db";
import { PartnerForm } from "@/components/admin/partner-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await db.partner.findUnique({
    where: { id },
  });

  if (!partner) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/partners"
          prefetch={false}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest self-start"
        >
          <ChevronLeft size={14} /> Back to Partners
        </Link>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Edit Partner
          </h1>
          <p className="text-gray-400 mt-1">
            Update the partner details below.
          </p>
        </div>
      </div>

      <PartnerForm initialData={partner} id={id} />
    </div>
  );
}
