import { ChevronLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/services"
          prefetch={false}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest self-start"
        >
          <ChevronLeft size={14} /> Back to Services
        </Link>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            Edit Service
          </h1>
          <p className="text-gray-400 mt-1">
            Services are now managed as static data.
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-sm p-6 flex gap-4">
        <AlertCircle className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-bold text-blue-400">
            Services are now managed as static data
          </p>
          <p className="text-sm text-blue-300/80 mt-2 mb-3">
            To edit a service, modify the{" "}
            <code className="bg-black/30 px-2 py-1 rounded text-xs font-mono">
              data/services.ts
            </code>{" "}
            file directly.
          </p>
          <p className="text-sm text-blue-300/80">
            Find the service in the services array, update its properties, and
            save the file. Changes will appear immediately on your website.
          </p>
        </div>
      </div>
    </div>
  );
}
