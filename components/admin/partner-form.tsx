"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Plus, ImagePlus } from "lucide-react";
import Image from "next/image";

interface PartnerFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export function PartnerForm({ initialData, id }: PartnerFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: (initialData?.name as string) || "",
    description: (initialData?.description as string) || "",
    website: (initialData?.website as string) || "",
    image: (initialData?.image as string) || "",
    order: Number(initialData?.order ?? 0),
    active:
      initialData?.active === undefined ? true : Boolean(initialData?.active),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setIsLoading(true);
    try {
      const file = e.target.files[0];
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("folder", id ? `partners/${id}` : "partners");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });

      if (uploadRes.ok) {
        const { urls } = await uploadRes.json();
        if (urls?.[0]) {
          setFormData({ ...formData, image: urls[0] });
        } else {
          alert("Failed to upload image");
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
      if (!formData.name.trim()) {
        alert("Please enter a partner name.");
        setIsLoading(false);
        return;
      }

      const url = id ? `/api/admin/partners/${id}` : "/api/admin/partners";
      const method = id ? "PATCH" : "POST";

      const payload = {
        ...formData,
        website: formData.website.trim(),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/partners");
        router.refresh();
      } else {
        alert("Failed to save partner");
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
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
              Partner Details
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Partner Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                placeholder="e.g. Google Cloud"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                placeholder="Short description shown on the public partner page"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: Number(e.target.value) })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Visibility
                </label>
                <label className="flex items-center gap-3 rounded-sm border border-white/10 bg-black/30 px-4 py-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-white/10 bg-black/40 text-primary"
                  />
                  Show on public pages
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
              Partner Logo
            </h3>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-white/15 bg-black/20 px-4 py-8 text-sm font-semibold text-gray-300 transition-all hover:border-primary/40 hover:text-white">
                <ImagePlus size={16} />
                Upload Logo / Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              {formData.image ? (
                <div className="relative h-48 overflow-hidden rounded-sm border border-white/10 bg-white/10">
                  <Image
                    src={formData.image}
                    alt={formData.name || "Partner logo"}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              ) : (
                <div className="rounded-sm border border-dashed border-white/10 bg-black/20 p-6 text-center text-sm text-gray-500">
                  No logo uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-primary/90 disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Partner
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:border-primary/40 hover:text-white"
        >
          <Plus className="h-4 w-4 rotate-45" />
          Cancel
        </button>
      </div>
    </form>
  );
}
