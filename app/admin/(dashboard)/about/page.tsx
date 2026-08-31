import { db } from "@/server/db";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Mail,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/admin/delete-button-client";

export const dynamic = "force-dynamic";

async function getTeam() {
  return await db.teamMember.findMany({
    orderBy: { order: "asc" },
  });
}

interface Stat {
  label: string;
  value: string;
}

export default async function AdminTeamPage() {
  const [team, companyInfo] = await Promise.all([
    getTeam(),
    db.companyInfo.findFirst(),
  ]);

  const stats = companyInfo?.stats as Stat[] | undefined;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Team
          </h1>
          <p className="text-gray-400 mt-1">
            Manage the profiles of the experts driving ONT&apos;s success.
          </p>
        </div>
        <Link
          href="/admin/about/new"
          prefetch={false}
          className="bg-primary text-black px-4 py-2 rounded-sm font-bold uppercase text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <Plus size={16} /> Add Member
        </Link>
      </div>

      {/* Company stats removed per admin request */}

      {/* Team Grid */}
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white pt-8 border-t border-white/10">
          Team Directory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-3 bg-white/5 border border-white/10 rounded-sm p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
              No team members found. Build your squad.
            </div>
          ) : (
            team.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden bg-white/5 border border-white/10 rounded-sm hover:border-primary/50 transition-all duration-500"
              >
                <div className="aspect-4/3 relative bg-white/5 overflow-hidden border-b border-white/10">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                      <Users size={48} />
                    </div>
                  )}
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <Link
                      href={`/admin/about/${member.id}`}
                      prefetch={false}
                      className="p-3 bg-primary text-black rounded-sm hover:scale-110 transition-transform"
                    >
                      <Edit size={20} />
                    </Link>
                    <DeleteButton id={member.id} apiPath="/api/admin/team" redirectUrl="/admin/about" />
                  </div>

                  <div className="absolute top-4 left-4 bg-black/80 text-[10px] font-black uppercase tracking-widest px-2 py-1 border border-white/10 text-gray-400">
                    Order #{member.order}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-black uppercase text-lg truncate tracking-tight text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                    {member.role}
                  </p>

                  <div className="flex gap-4 pt-4 border-t border-white/5">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <Mail size={16} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        className="text-gray-500 hover:text-[#0077b5] transition-colors"
                      >
                        <LinkIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
