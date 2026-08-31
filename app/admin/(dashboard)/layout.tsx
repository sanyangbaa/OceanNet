import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/contexts/sidebar-context";
import AdminLayoutClient from "@/components/admin/admin-layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <SidebarProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </SidebarProvider>
  );
}
