import { services } from "@/data/services";
import { Plus, Edit, Trash2, Wrench, AlertCircle } from "lucide-react";
import type { Service } from "@/data/services";

export default async function AdminServicesPage() {
  // Services are now managed as static data in data/services.ts
  const staticServices = services as Service[];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header with Info Alert */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Services
          </h1>
          <p className="text-gray-400 mt-1">
            Services are now managed as static data in data/services.ts
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-sm p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-sm text-blue-400">
            Services are now static
          </p>
          <p className="text-xs text-blue-300/80 mt-1">
            To manage services, edit the{" "}
            <code className="bg-black/30 px-2 py-1 rounded text-[11px]">
              data/services.ts
            </code>{" "}
            file. Changes will automatically appear on your website.
          </p>
        </div>
      </div>

      {/* Services List - Read Only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staticServices.length === 0 ? (
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-sm p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
            No services found.
          </div>
        ) : (
          staticServices.map((service: Service) => (
            <div
              key={service.id}
              className="group overflow-hidden bg-white/5 border border-white/10 rounded-sm p-6 flex gap-6"
            >
              <div className="bg-primary/10 text-primary p-4 rounded-sm self-start">
                <Wrench size={24} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Order #{service.order}
                  </p>
                  <span className="text-[8px] font-bold uppercase tracking-widest bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    Static
                  </span>
                </div>
                <h3 className="font-black uppercase text-xl truncate tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                {service.features &&
                  (service.features as string[]).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(service.features as string[])
                        .slice(0, 3)
                        .map((f: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[9px] font-bold uppercase tracking-widest bg-white/5 border border-white/5 px-2 py-0.5 rounded text-gray-500"
                          >
                            {f}
                          </span>
                        ))}
                      {(service.features as string[]).length > 3 && (
                        <span className="text-[9px] font-bold text-gray-700">
                          +{(service.features as string[]).length - 3} more
                        </span>
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Instructions */}
      <div className="bg-white/5 border border-white/10 rounded-sm p-6">
        <h3 className="font-bold text-sm uppercase tracking-wide mb-3">
          How to manage services
        </h3>
        <ol className="text-xs text-gray-400 space-y-2 list-decimal list-inside">
          <li>
            Open{" "}
            <code className="bg-black/30 px-2 py-1 rounded text-[11px]">
              data/services.ts
            </code>
          </li>
          <li>Edit existing services or add new ones to the services array</li>
          <li>Save the file - changes appear immediately on your website</li>
          <li>No database updates needed - this is managed as code</li>
        </ol>
      </div>
    </div>
  );
}
