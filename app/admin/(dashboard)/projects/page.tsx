import { getAdminProjects } from "@/lib/data";
import DeleteButton from "@/components/admin/delete-button-client";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/server/db";

async function getProjects() {
  return await getAdminProjects();
}

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your construction portfolio and showcase your best work.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          prefetch={false}
          className="bg-primary text-black px-4 py-2 rounded-sm font-bold uppercase text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 self-start md:self-auto"
        >
          <Plus size={16} /> Add project
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 p-4 rounded-sm">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-black/40 border border-white/5 pl-10 pr-4 py-2 rounded-sm text-sm focus:outline-none focus:border-primary/30 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total: {projects.length}</span>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {/* Mobile Card View (shown on small screens) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {projects.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-sm p-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
              No projects found.
            </div>
          ) : (
            projects.map((project: Project) => (
              <div key={project.id} className="bg-white/5 border border-white/10 rounded-sm p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="h-20 w-24 relative bg-white/5 rounded-sm overflow-hidden border border-white/10 shrink-0">
                    {project.image ? (
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <Briefcase size={24} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white uppercase text-sm truncate">{project.title}</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter truncate mb-2">{project.slug}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-sm bg-blue-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-500/20">
                        {project.status}
                      </span>
                      <span className="text-gray-400 text-[10px] font-bold uppercase">{project.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-gray-400 text-xs font-medium">{project.location}</span>
                  <div className="flex gap-2">
                    <Link 
                      href={`/projects/${project.slug}`} 
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <ExternalLink size={16} />
                    </Link>
                    <Link 
                      href={`/admin/projects/${project.id}`} 
                      prefetch={false}
                      className="p-2 text-gray-400 hover:text-primary"
                    >
                      <Edit size={16} />
                    </Link>
                    <DeleteButton id={project.id} apiPath="/api/admin/projects" redirectUrl="/admin/projects" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View (shown on md and up) */}
        <div className="hidden md:block bg-white/5 border border-white/10 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/2">
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">Project</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">Location</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">Category</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  projects.map((project: Project) => (
                    <tr key={project.id} className="group hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-16 relative bg-white/5 rounded-sm overflow-hidden border border-white/10 shrink-0">
                            {project.image ? (
                              <Image 
                                src={project.image} 
                                alt={project.title} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-700">
                                <Briefcase size={20} />
                              </div>
                            )}
                          </div>
                              <div className="min-w-0 max-w-[24rem]">
                            <p className="font-bold text-white uppercase text-sm line-clamp-2">{project.title}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-tighter truncate">{project.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-xs font-medium">{project.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-sm bg-blue-500/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-blue-400 border border-blue-500/20">
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-xs font-medium">{project.category}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <Link 
                              href={`/projects/${project.slug}`} 
                              target="_blank"
                              className="p-2 text-gray-500 hover:text-white transition-colors"
                            >
                              <ExternalLink size={16} />
                            </Link>
                            <Link 
                              href={`/admin/projects/${project.id}`} 
                              prefetch={false}
                              className="p-2 text-gray-500 hover:text-primary transition-colors"
                            >
                              <Edit size={16} />
                            </Link>
                            <DeleteButton id={project.id} apiPath="/api/admin/projects" redirectUrl="/admin/projects" />
                         </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
