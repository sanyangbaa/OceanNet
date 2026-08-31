import { getAdminCounts } from "@/lib/data";
import { getPool, normalizeResult } from "@/server/db";
import {
  Activity,
  AlertCircle,
  Briefcase,
  Building2,
  CheckCircle,
  ChevronRight,
  Clock,
  MessageSquare,
  Plus,
  Star,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const [counts, recentProjects, recentMessages] = await Promise.all([
    getAdminCounts(),
    (async () => {
      const p = getPool();
      if (!p) return [];
      const [rows] = await p.query(
        `SELECT "id", "title", "category", "status", "image", "createdAt" FROM "Project" ORDER BY "createdAt" DESC LIMIT 5`
      );
      return normalizeResult<any[]>(rows, "Project");
    })(),
    (async () => {
      const p = getPool();
      if (!p) return [];
      const [rows] = await p.query(
        `SELECT "id", "name", "subject", "status", "createdAt" FROM "ContactMessage" ORDER BY "createdAt" DESC LIMIT 5`
      );
      return normalizeResult<any[]>(rows, "ContactMessage");
    })(),
  ]);

  return { counts, recentProjects, recentMessages };
}

function timeAgo(date: Date | string) {
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default async function AdminDashboard() {
  const { counts, recentProjects, recentMessages } = await getDashboardData();
  const unreadMessages = recentMessages.filter((m: any) => m.status === "new").length;

  const statCards = [
    {
      label: "Total Projects",
      value: counts.projects,
      icon: Briefcase,
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-400",
      border: "border-blue-500/20",
      href: "/admin/projects",
      change: "Active portfolio",
    },
    {
      label: "Team Members",
      value: counts.team,
      icon: Users,
      color: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-400",
      border: "border-emerald-500/20",
      href: "/admin/about",
      change: "In our team",
    },
    {
      label: "Testimonials",
      value: counts.testimonials,
      icon: Star,
      color: "from-amber-500/20 to-amber-600/10",
      iconColor: "text-amber-400",
      border: "border-amber-500/20",
      href: "/admin/testimonials",
      change: "Client reviews",
    },
    {
      label: "New Messages",
      value: unreadMessages,
      icon: MessageSquare,
      color: "from-primary/20 to-primary/10",
      iconColor: "text-primary",
      border: "border-primary/20",
      href: "/admin/contact",
      change: "Awaiting reply",
    },
  ];

  const quickLinks = [
    { label: "Add Project", href: "/admin/projects/new", icon: Briefcase, desc: "Upload new construction work" },
    { label: "Add Team Member", href: "/admin/about", icon: Users, desc: "Update the team roster" },
    { label: "View Messages", href: "/admin/contact", icon: MessageSquare, desc: "Read client enquiries" },
    { label: "Testimonials", href: "/admin/testimonials", icon: Star, desc: "Manage client reviews" },
    { label: "Site Settings", href: "/admin/settings", icon: Building2, desc: "Company info & branding" },
  ];

  const projectStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "in progress":
      case "ongoing":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "planning":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const messageStatusIcon = (status: string) => {
    switch (status) {
      case "replied":
        return <CheckCircle size={12} className="text-emerald-400" />;
      case "read":
        return <Clock size={12} className="text-blue-400" />;
      default:
        return <AlertCircle size={12} className="text-primary" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, Administrator — here's what's happening at ONT today.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-primary text-black px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg shadow-primary/20 self-start sm:self-auto"
        >
          <Plus size={14} /> New Project
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group relative overflow-hidden bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/[0.08]">
                <card.icon size={18} className={card.iconColor} />
              </div>
              <ChevronRight
                size={14}
                className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <div>
              <p className="text-3xl font-black text-white tracking-tight leading-none">{card.value}</p>
              <p className="text-xs font-bold text-white/70 mt-1.5 uppercase tracking-wider">{card.label}</p>
              <p className="text-[10px] text-gray-600 mt-0.5">{card.change}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Briefcase size={15} className="text-primary" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Recent Projects</h2>
            </div>
            <Link
              href="/admin/projects"
              className="text-[10px] font-bold text-primary/70 hover:text-primary uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              View all <ChevronRight size={10} />
            </Link>
          </div>

          <div className="divide-y divide-white/[0.04]">
            {recentProjects.length > 0 ? (
              recentProjects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/admin/projects?id=${project.id}`}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="h-10 w-10 rounded-xl overflow-hidden bg-white/[0.05] border border-white/[0.08] shrink-0">
                    {project.image && (
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors truncate">{project.title}</p>
                    <p className="text-[10px] text-gray-600 mt-0.5 uppercase tracking-wide">{project.category}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${projectStatusColor(project.status)}`}>{project.status}</span>
                    <span className="text-[9px] text-gray-700">{timeAgo(project.createdAt)}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-12 text-center">
                <Briefcase size={24} className="text-gray-700 mx-auto mb-3" />
                <p className="text-xs text-gray-600 font-medium">No projects yet</p>
                <Link href="/admin/projects/new" className="inline-flex items-center gap-1.5 text-[10px] text-primary font-bold mt-3 hover:underline">
                  <Plus size={10} /> Add your first project
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden flex-1">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <MessageSquare size={15} className="text-primary" />
                <h2 className="text-sm font-black text-white uppercase tracking-wider">Messages</h2>
              </div>
              {unreadMessages > 0 && (
                <span className="text-[9px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-wide">{unreadMessages} new</span>
              )}
            </div>

            <div className="divide-y divide-white/[0.04]">
              {recentMessages.length > 0 ? (
                recentMessages.map((msg: any) => (
                  <Link
                    key={msg.id}
                    href={`/admin/contact?id=${msg.id}`}
                    className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors group"
                  >
                    <div className="mt-0.5 shrink-0">{messageStatusIcon(msg.status)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white group-hover:text-primary transition-colors truncate">{msg.name}</p>
                      <p className="text-[10px] text-gray-600 truncate mt-0.5">{msg.subject}</p>
                    </div>
                    <span className="text-[9px] text-gray-700 shrink-0 mt-0.5">{timeAgo(msg.createdAt)}</span>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center">
                  <MessageSquare size={20} className="text-gray-700 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 font-medium">No messages yet</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/[0.06]">
              <Link
                href="/admin/contact"
                className="block w-full py-3 text-[10px] font-black uppercase tracking-widest text-center text-primary/60 hover:text-primary hover:bg-primary/[0.04] transition-all"
              >
                View All Messages
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-black text-gray-600 uppercase tracking-[0.2em] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-start gap-3 p-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.06] hover:border-primary/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <link.icon size={15} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors leading-snug">{link.label}</p>
                <p className="text-[10px] text-gray-600 mt-0.5 leading-snug hidden sm:block">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-primary" />
            <h2 className="text-sm font-black text-white uppercase tracking-wider">Project Activity</h2>
          </div>
          <span className="text-[10px] bg-white/[0.05] border border-white/[0.08] text-gray-500 px-2.5 py-1 rounded-lg font-medium">This year</span>
        </div>

        <div className="flex items-end gap-1.5 h-24">
          {[30, 55, 40, 80, 65, 90, 50, 75, 85, 60, 45, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-primary/20 hover:bg-primary/50 transition-colors relative group cursor-pointer"
              style={{ height: `${h}%` }}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {h}%
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 text-[9px] text-gray-700 font-bold uppercase tracking-wider">
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
            <span key={m} className="flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
