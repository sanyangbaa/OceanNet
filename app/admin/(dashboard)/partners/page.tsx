import { getAdminPartners } from "@/lib/data";
import DeleteButton from "@/components/admin/delete-button-client";
import { Plus, Edit, Building2 } from "lucide-react";
import Link from "next/link";
import type { Partner } from "@/server/db";

export default async function AdminPartnersPage() {
  const partners = await getAdminPartners();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Partners
          </h1>
          <p className="text-gray-400 mt-1">
            Manage partner organizations featured on the public website.
          </p>
        </div>
        <Link
          href="/admin/partners/new"
          prefetch={false}
          className="bg-primary text-black px-4 py-2 rounded-sm font-bold uppercase text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <Plus size={16} /> Add partner
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.length === 0 ? (
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-sm p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
            No partners found. Add one to feature it publicly.
          </div>
        ) : (
          partners.map((partner: Partner) => (
            <div
              key={partner.id}
              className="group overflow-hidden bg-white/5 border border-white/10 rounded-sm hover:border-primary/50 transition-all duration-500 p-6 flex gap-4 flex-col"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full self-start group-hover:bg-primary group-hover:text-black transition-all">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">
                      {partner.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {partner.active ? "Visible publicly" : "Hidden"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/partners/${partner.id}`}
                    prefetch={false}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <DeleteButton
                    id={partner.id}
                    apiPath="/api/admin/partners"
                    redirectUrl="/admin/partners"
                  />
                </div>
              </div>

              {partner.description ? (
                <p className="text-gray-300 text-sm mt-2 flex-1">
                  {partner.description}
                </p>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
