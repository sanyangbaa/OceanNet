"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Users, Mail, Link as LinkIcon } from "lucide-react";
import Image from "next/image";

interface TeamFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export function TeamForm({ initialData, id }: TeamFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: (initialData?.name as string) || "",
    role: (initialData?.role as string) || "",
    bio: (initialData?.bio as string) || "",
    image: (initialData?.image as string) || "",
    email: (initialData?.email as string) || "",
    linkedin: (initialData?.linkedin as string) || "",
    order: (initialData?.order as number) || 0,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setIsLoading(true);
    try {
      const file = e.target.files[0];
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", id ? `team/${id}` : "team");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (uploadRes.ok) {
        const { urls } = await uploadRes.json();
        if (urls && urls[0]) {
          setFormData({ ...formData, image: urls[0] });
        }
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading image");
    } finally {
      setIsLoading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = id ? `/api/admin/team/${id}` : "/api/admin/team";
      const method = id ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/about");
        router.refresh();
      } else {
        alert("Failed to save team member");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-bold uppercase tracking-tight text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Position / Role
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-bold uppercase tracking-tight text-primary"
                  placeholder="Chief Architect"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Short Bio
              </label>
              <textarea
                rows={4}
                value={formData.bio || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none leading-relaxed text-gray-300"
                placeholder="Brief professional background..."
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
              Contact & Socials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors"
                    size={14}
                  />
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-2.5 rounded-sm text-sm focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  LinkedIn URL
                </label>
                <div className="relative group">
                  <LinkIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors"
                    size={14}
                  />
                  <input
                    type="text"
                    value={formData.linkedin || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 pl-10 pr-4 py-2.5 rounded-sm text-sm focus:outline-none"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media & Ordering */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              Profile Photo
            </h3>
            <div className="space-y-4">
              <div className="aspect-4/5 relative rounded-sm overflow-hidden border border-white/10 bg-black/40">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-800">
                    <Users size={40} />
                    <span className="text-[10px] uppercase font-black mt-2">
                      No Image
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Upload Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:bg-primary file:text-black hover:file:bg-primary/90"
                />
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block pt-2">
                  Or Paste Image URL
                </label>
                <div className="relative group">
                  <LinkIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                    size={12}
                  />
                  <input
                    type="text"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/10 pl-9 pr-3 py-2 rounded-sm text-xs focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              Ordering
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Sequence Index
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2 rounded-sm text-sm focus:outline-none"
              />
              <p className="text-[9px] text-gray-600 uppercase font-black">
                Controls appearance priority on the About page.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-white/10 pt-8 mt-12">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-black px-10 py-3 rounded-sm font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {id ? "Update Member" : "Register Member"}
        </button>
      </div>
    </form>
  );
}
