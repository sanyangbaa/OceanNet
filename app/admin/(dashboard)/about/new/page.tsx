import { TeamForm } from "@/components/admin/team-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/team"
          prefetch={false}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest self-start"
        >
          <ChevronLeft size={14} /> Back to Team
        </Link>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Register Talent
          </h1>
          <p className="text-gray-400 mt-1">
            Add a new professional profile to the OceanNet roster.
          </p>
        </div>
      </div>

      <TeamForm />
    </div>
  );
}
