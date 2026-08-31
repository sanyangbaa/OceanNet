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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/sidebar-context";

const mainMenuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Careers", href: "/admin/careers", icon: Mail },
  { name: "Applications", href: "/admin/applications", icon: Mail },
  {
    name: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { name: "Messages", href: "/admin/contact", icon: Mail },
  { name: "About Us", href: "/admin/about", icon: Building2 },
  { name: "Partners", href: "/admin/partners", icon: Award },
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
    <li className="relative group/item border-b border-white/5">
      <Link
        href={item.href}
        prefetch={false}
        onClick={onClick}
        title={collapsed ? item.name : undefined}
        className={cn(
          "flex items-center gap-2 overflow-hidden rounded-md p-2 text-sm outline-none transition-all duration-200",
          collapsed ? "justify-center px-0 w-9 mx-auto" : "w-full",
          isActive
            ? "bg-primary text-black font-bold shadow-md shadow-primary/20"
            : "text-gray-400 hover:bg-white/5 hover:text-white",
        )}
      >
        <item.icon
          size={16}
          className={cn(
            "shrink-0 transition-none",
            isActive ? "text-black" : "text-gray-400",
          )}
        />
        {!collapsed && <span className="truncate">{item.name}</span>}
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
          "fixed top-0 left-0 h-screen bg-[#0a0a0a] border-r border-white/10 z-50 transition-all duration-300 overflow-hidden flex flex-col text-gray-300 py-4",
          "lg:translate-x-0",
          isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
          collapsed ? "lg:w-15" : "lg:w-64",
        )}
      >
        {/* ── Header ─────────────────────────────── */}
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-4 border-b border-white/5 shrink-0",
            collapsed ? "lg:justify-center lg:px-0" : "",
          )}
        >
          {/* Logo icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-black shrink-0">
            <Building2 className="h-4 w-4" />
          </div>

          {/* Brand name — hidden when collapsed on desktop */}
          <div
            className={cn(
              "grid flex-1 text-left text-sm leading-tight min-w-0 transition-all duration-200",
              collapsed ? "lg:hidden" : "",
            )}
          >
            <span className="truncate font-semibold text-white">ONT</span>
            <span className="truncate text-xs text-gray-500">
              Content Management
            </span>
          </div>

          {/* Mobile close button */}
          <button
            onClick={close}
            className={cn(
              "lg:hidden p-1.5 text-gray-500 hover:text-white rounded-md transition-colors shrink-0",
              collapsed ? "lg:hidden" : "",
            )}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Navigation ─────────────────────────── */}
        <nav className="flex-1 flex flex-col gap-0 px-2 pt-4 pb-4 overflow-hidden">
          {/* Group 1: Content Management */}
          <div className="space-y-2 animate-in fade-in duration-700 pb-2">
            {!collapsed && (
              <div className="flex h-7 items-center px-2 text-[10px] font-semibold text-gray-500/70 uppercase tracking-widest">
                Content
              </div>
            )}
            <ul className="flex w-full min-w-0 flex-col gap-2 border-t border-white/5">
              {mainMenuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <NavItem
                    key={`main-${item.href}`}
                    item={item}
                    collapsed={collapsed}
                    onClick={close}
                    isActive={isActive}
                  />
                );
              })}
            </ul>
          </div>

          {/* Group 2 removed — Messages moved into Content section */}
        </nav>

        {/* ── Footer ─────────────────────────────── */}
        <div className="border-t border-white/5 p-2 shrink-0">
          {/* Profile row */}
          <Link
            href="/admin/settings"
            prefetch={false}
            className="flex items-center gap-2 rounded-md p-2 mb-0.5 hover:bg-white/5 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-white shrink-0">
              <User size={14} />
            </div>
            {!collapsed && (
              <div className="grid flex-1 text-left text-xs leading-tight min-w-0">
                <span className="truncate font-semibold text-white text-xs">
                  Administrator
                </span>
                <span className="truncate text-[10px] text-gray-500">
                  admin@ont.com
                </span>
              </div>
            )}
          </Link>
          {/* Separator line */}
          <hr className="border-t border-white/5 my-0" />

          {/* Sign out */}
          <div className="relative group/logout">
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className={cn(
                "flex items-center gap-2 rounded-md p-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer",
                collapsed
                  ? "lg:justify-center lg:w-9 lg:mx-auto lg:px-0"
                  : "w-full",
              )}
            >
              <LogOut size={15} className="shrink-0" />
              {!collapsed && (
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
