import { db } from "@/server/db";
import { ProjectForm } from "@/components/admin/project-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    notFound();
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
