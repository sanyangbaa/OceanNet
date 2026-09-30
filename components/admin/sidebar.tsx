"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  LogOut,
  X,
  Building2,
  MessageSquareQuote,
  Mail,
  User,
  Award,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";

const menuGroups = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    label: "Content Management",
    items: [
      { name: "Projects", href: "/admin/projects", icon: Briefcase },
      { name: "Careers", href: "/admin/careers", icon: Mail },
      { name: "Applications", href: "/admin/applications", icon: Mail },
      {
        name: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquareQuote,
      },
      { name: "About Us", href: "/admin/about", icon: Building2 },
      { name: "Partners", href: "/admin/partners", icon: Award },
    ],
  },
  {
    label: "Communications",
    items: [{ name: "Messages", href: "/admin/contact", icon: Mail }],
  },
];

function NavItem({
  item,
  collapsed,
  onClick,
  isActive,
}: {
  item: { name: string; href: string; icon: React.ElementType };
  collapsed: boolean;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <li className="relative group/item">
      <Link
        href={item.href}
        prefetch={false}
        onClick={onClick}
        title={collapsed ? item.name : undefined}
        className={cn(
          "relative flex min-h-11 items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-all duration-200",
          collapsed ? "justify-center gap-0 px-0 lg:w-9 lg:mx-auto" : "w-full",
          isActive
            ? "bg-primary text-black shadow-md shadow-primary/20"
            : "text-gray-400 hover:bg-white/5 hover:text-white",
        )}
      >
        <item.icon
          size={16}
          className={cn("shrink-0", isActive ? "text-black" : "text-gray-500")}
        />
        {!collapsed && <span className="truncate">{item.name}</span>}
        {isActive && !collapsed && (
          <ChevronRight size={14} className="ml-auto shrink-0 text-black/40" />
        )}
      </Link>

      {/* Tooltip when collapsed */}
      {collapsed && (
        <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-200 opacity-0 group-hover/item:opacity-100 transition-opacity duration-150">
          <div className="bg-[#1a1a1a] border border-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
            {item.name}
          </div>
        </div>
      )}
    </li>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, collapsed, close, toggleCollapse } = useSidebar();
  const compact = collapsed && !isOpen;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen h-[100dvh] max-h-[100dvh] bg-[#080808] border-r border-white/10 z-50 transition-all duration-300 overflow-hidden flex flex-col text-gray-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
          collapsed ? "lg:w-15" : "lg:w-64",
        )}
      >
        {/* ── Header ─────────────────────────────── */}
        <div
          className={cn(
            "flex items-center justify-between gap-3 px-4 py-5 border-b border-white/5 shrink-0",
            compact ? "lg:justify-center lg:px-0" : "",
          )}
        >
          {/* Logo icon */}
          <Link
            href="/admin"
            onClick={close}
            aria-label="OceanNet Admin dashboard"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-black shadow-lg shadow-primary/20 shrink-0">
              <Building2 className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#080808] bg-emerald-400" />
            </div>

            {/* Brand name — hidden when collapsed on desktop */}
            <div className={cn("grid min-w-0 text-left text-sm leading-tight", compact ? "lg:hidden" : "")}>
              <span className="truncate font-black text-white">OceanNet</span>
              <span className="truncate text-xs text-gray-500">Admin Panel</span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={close}
            aria-label="Close navigation"
            className={cn(
              "lg:hidden min-h-10 min-w-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors shrink-0",
            )}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Navigation ─────────────────────────── */}
        <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-5 space-y-5">
          {menuGroups.map((group) => (
            <section key={group.label}>
              {!compact && (
                <p className="mb-2 px-3 text-[9px] font-black uppercase tracking-[0.18em] text-gray-600">
                  {group.label}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));
                  return (
                    <NavItem
                      key={`${group.label}-${item.href}`}
                      item={item}
                      collapsed={compact}
                      onClick={close}
                      isActive={isActive}
                    />
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>

        {/* ── Footer ─────────────────────────────── */}
        <div className="shrink-0 space-y-2 border-t border-white/5 px-3 pb-4 pt-3">
          {/* Profile row */}
          <Link
            href="/admin/settings"
            prefetch={false}
            className="flex min-h-14 items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary shrink-0">
              <User size={16} />
            </div>
            {!compact && (
              <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
                <span className="truncate font-bold text-white text-xs">
                  Administrator
                </span>
                <span className="truncate text-[10px] text-gray-500">
                  admin@ont.com
                </span>
              </div>
            )}
          </Link>
          {/* Sign out */}
          <div className="relative group/logout">
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className={cn(
                "flex items-center gap-2 rounded-md p-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer",
                compact
                  ? "lg:justify-center lg:w-9 lg:mx-auto lg:px-0"
                  : "w-full",
              )}
            >
              <LogOut size={15} className="shrink-0" />
              {!compact && (
                <span className="truncate text-xs font-medium">Log out</span>
              )}
            </button>
            {collapsed && (
              <div className="pointer-events-none absolute left-full bottom-0 ml-3 z-200 opacity-0 group-hover/logout:opacity-100 transition-opacity duration-150">
                <div className="bg-[#1a1a1a] border border-white/10 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
