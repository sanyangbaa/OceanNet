"use client";

import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
 
// export 
export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed, isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden">
      <Sidebar />

      {/* Main content — shifts based on sidebar state */}
      <main
        className={cn(
          "flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed",
          collapsed ? "lg:ml-[60px]" : "lg:ml-64",
          // Hide content on small screens when the mobile sidebar is open
          isOpen ? "lg:block hidden" : "lg:block"
        )}
      >
        <div className="w-full max-w-full px-4 md:px-6 lg:px-8 pt-4">
          <Header />
          <div className="w-full max-w-full overflow-hidden pb-16">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
