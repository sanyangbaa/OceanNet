"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  MessageSquareQuote,
  User,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";

interface TestimonialFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export function TestimonialForm({ initialData, id }: TestimonialFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: (initialData?.name as string) || "",
    role: (initialData?.role as string) || "",
    content: (initialData?.content as string) || "",
    rating: (initialData?.rating as number) || 5,
    image: (initialData?.image as string) || "",
    order: (initialData?.order as number) || 0,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setIsLoading(true);
    try {
      const file = e.target.files[0];
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append(
        "folder",
        id ? `testimonials/${id}` : "testimonials",
      );

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
      const url = id
        ? `/api/admin/testimonials/${id}`
        : "/api/admin/testimonials";
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        alert("Failed to save testimonial");
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
        {/* Left - Main Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-sm text-lg focus:outline-none focus:border-primary/50 transition-all font-black tracking-tight text-white placeholder:text-gray-800"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Role / Company
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-white placeholder:text-gray-800"
                  placeholder="e.g. CEO, Example Corp"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Testimonial Content
              </label>
              <textarea
                rows={6}
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none leading-relaxed text-gray-300"
                placeholder="What did the client say?"
              />
            </div>
          </div>
        </div>

        {/* Right - Photo & Settings */}
        <div className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              <User size={14} /> Profile Photo
            </h3>
            <div className="space-y-4">
              {/* Preview */}
              <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden border-2 border-white/10 bg-black/40 flex items-center justify-center">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-600">
                    <User size={32} />
                    <span className="text-[9px] uppercase font-black mt-1">
                      No Photo
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
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none transition-all font-medium text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-black file:bg-primary file:text-black hover:file:bg-primary/90"
                />
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block pt-1">
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
                    className="w-full bg-black/40 border border-white/10 pl-9 pr-3 py-2 rounded-sm text-xs focus:outline-none text-gray-300"
                    placeholder="https://..."
                  />
                </div>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="text-[10px] font-bold uppercase text-red-500 hover:text-red-400 tracking-widest transition-colors"
                  >
                    ✕ Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              <MessageSquareQuote size={14} /> Configuration
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Rating (1-5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`text-2xl transition-transform hover:scale-125 ${star <= formData.rating ? "text-yellow-400" : "text-gray-700"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2 rounded-sm text-sm focus:outline-none text-white"
              />
              <p className="text-[9px] text-gray-600 uppercase font-black">
                Controls the sequence on the homepage.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-white/10 pt-8 mt-12 px-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          Discard Changes
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
          {id ? "Sync Testimonial" : "Register Testimonial"}
        </button>
      </div>
    </form>
  );
}
