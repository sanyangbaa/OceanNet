import { db } from "@/server/db";
import { TeamForm } from "@/components/admin/team-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await db.teamMember.findUnique({
    where: { id },
  });

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/about"
          prefetch={false}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest self-start"
        >
          <ChevronLeft size={14} /> Back to Team
        </Link>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Edit Member
          </h1>
          <p className="text-gray-400 mt-1">
            Review and update the team member below.
          </p>
        </div>
      </div>

      <TeamForm initialData={member} id={id} />
    </div>
  );
}
