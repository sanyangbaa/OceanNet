import { db } from "@/server/db";
import { ProjectForm } from "@/components/admin/project-form";
import { ChevronLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await db.project.findUnique({
    where: { id },
  });

  if (!project) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col gap-4">
          <Link
            href="/admin/projects"
            prefetch={false}
            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest self-start"
          >
            <ChevronLeft size={14} /> Back to Projects
          </Link>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Edit Project</h1>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-6 flex gap-4 items-start">
          <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-bold text-red-400 text-sm uppercase tracking-wider mb-1">Project Not Found</p>
            <p className="text-gray-400 text-sm">
              No project with ID <code className="text-primary bg-white/5 px-1 py-0.5 rounded text-xs">{id}</code> exists in the database.
              It may have been deleted or the link is incorrect.
            </p>
            <Link
              href="/admin/projects"
              prefetch={false}
              className="inline-block mt-4 text-xs font-black uppercase tracking-widest text-primary hover:underline"
            >
              ← Return to All Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/projects"
          prefetch={false}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest self-start"
        >
          <ChevronLeft size={14} /> Back to Projects
        </Link>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Edit Project</h1>
          <p className="text-gray-400 mt-1">Review and update the project details below.</p>
        </div>
      </div>

      <ProjectForm initialData={project} id={id} />
    </div>
  );
}
