"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, Plus } from "lucide-react";
import Image from "next/image";

interface ProjectFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export function ProjectForm({ initialData, id }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: (initialData?.title as string) || "",
    shortDescription: (initialData?.shortDescription as string) || "",
    location: (initialData?.location as string) || "",
    category: (initialData?.category as string) || "",
    customCategory: (initialData?.customCategory as string) || "",
    industry: (initialData?.industry as string) || "",
    customIndustry: (initialData?.customIndustry as string) || "",
    projectType: (initialData?.projectType as string) || "",
    status: (initialData?.status as string) || "Draft",
    publishStatus: (initialData?.publishStatus as string) || "Draft",
    client: (initialData?.client as string) || "",
    clientLogo: (initialData?.clientLogo as string) || "",
    clientWebsite: (initialData?.clientWebsite as string) || "",
    image: (initialData?.image as string) || "",
    youtubeUrl: (initialData?.youtubeUrl as string) || "",
    gallery: (Array.isArray(initialData?.gallery)
      ? initialData.gallery
      : []) as string[],
    description: (initialData?.description as string) || "",
    technologies: (Array.isArray(initialData?.technologies)
      ? initialData.technologies
      : []) as string[],
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "gallery" | "clientLogo",
  ) => {
    if (!e.target.files?.length) return;

    setIsLoading(true);
    try {
      const files = Array.from(e.target.files);
      const newUrls: string[] = [];
      const folder = id ? `projects/${id}` : "projects";

      for (const file of files) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("folder", folder);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (uploadRes.ok) {
          const { urls } = await uploadRes.json();
          if (urls && urls[0]) {
            newUrls.push(urls[0]);
          }
        }
      }

      if (newUrls.length > 0) {
        if (field === "image") {
          setFormData({ ...formData, image: newUrls[0] });
        } else if (field === "clientLogo") {
          setFormData({ ...formData, clientLogo: newUrls[0] });
        } else {
          setFormData({
            ...formData,
            gallery: [...formData.gallery, ...newUrls],
          });
        }
      } else {
        alert("Failed to upload images");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading images");
    } finally {
      setIsLoading(false);
    }
  };

  const [techInput, setTechInput] = useState("");
  const [useRichText, setUseRichText] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Client-side validation for required fields
      if (
        !formData.title?.toString().trim() ||
        !formData.shortDescription?.toString().trim() ||
        !formData.description?.toString().trim() ||
        !formData.image?.toString().trim()
      ) {
        alert(
          "Please fill the required fields: Title, Short Description, Full Description, and Project Thumbnail.",
        );
        setIsLoading(false);
        return;
      }
      const url = id ? `/api/admin/projects/${id}` : "/api/admin/projects";
      const method = id ? "PATCH" : "POST";

      // Prepare payload, allow custom category/industry to override 'Other'
      const payload: Record<string, unknown> = {
        ...formData,
        youtubeUrl: formData.youtubeUrl?.toString().trim() || null,
      };
      if (payload.category === "Other" && (payload as any).customCategory) {
        payload.category = (payload as any).customCategory;
      }
      if (payload.industry === "Other" && (payload as any).customIndustry) {
        payload.industry = (payload as any).customIndustry;
      }
      // Remove transient helper fields before sending to server
      delete (payload as any).customCategory;
      delete (payload as any).customIndustry;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const addTechnology = () => {
    if (!techInput.trim()) return;
    setFormData({
      ...formData,
      technologies: [...formData.technologies, techInput.trim()],
    });
    setTechInput("");
  };
  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(
        (_: string, i: number) => i !== index,
      ),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Core Info */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
              Core Identification
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                placeholder="e.g. School Management System"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Short Description *
              </label>
              <textarea
                rows={2}
                maxLength={200}
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                placeholder="Short summary for cards (max 200 chars)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                YouTube Video Link
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeUrl: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Cloud Solutions">Cloud Solutions</option>
                  <option value="AI Solutions">AI Solutions</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Other">Other</option>
                </select>
                {formData.category === "Other" && (
                  <input
                    type="text"
                    value={formData.customCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customCategory: e.target.value,
                      })
                    }
                    className="w-full bg-black/30 border border-white/5 px-3 py-2 rounded-sm text-sm mt-2"
                    placeholder="Enter custom category"
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium appearance-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing Maintenance">
                    Ongoing Maintenance
                  </option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium appearance-none"
                >
                  <option value="">Select Industry</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Government">Government</option>
                  <option value="Logistics">Logistics</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Other">Other</option>
                </select>
                {formData.industry === "Other" && (
                  <input
                    type="text"
                    value={formData.customIndustry}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        customIndustry: e.target.value,
                      })
                    }
                    className="w-full bg-black/30 border border-white/5 px-3 py-2 rounded-sm text-sm mt-2"
                    placeholder="Enter custom industry"
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium appearance-none"
                >
                  <option value="">Select Type</option>
                  <option value="Client Project">Client Project</option>
                  <option value="Internal Project">Internal Project</option>
                  <option value="Product Development">
                    Product Development
                  </option>
                  <option value="Open Source Project">
                    Open Source Project
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Publish Status
              </label>
              <select
                value={formData.publishStatus}
                onChange={(e) =>
                  setFormData({ ...formData, publishStatus: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium appearance-none"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                placeholder="e.g. Bijilo, The Gambia"
              />
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
              Client Details
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Client
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                placeholder="Client Name"
              />
              <input
                type="text"
                value={formData.clientWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, clientWebsite: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium mt-2"
                placeholder="Client Website (optional): https://example.com"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Media & Content */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
              Media Assets
            </h3>

            {/* Main Image */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Header Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "image")}
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:bg-primary file:text-black hover:file:bg-primary/90"
              />
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium mt-2"
                placeholder="Or provide direct URL: https://..."
              />
            </div>
            {formData.image && (
              <div className="mt-4 aspect-video relative rounded-sm overflow-hidden border border-white/10">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Gallery Images */}
            <div className="space-y-2 pt-6 border-t border-white/10 mt-6">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Gallery Images (Multiple)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "gallery")}
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:bg-white/20 file:text-white hover:file:bg-white/30"
              />
            </div>
            {formData.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {formData.gallery.map((url, idx) => (
                  <div
                    key={idx}
                    className="aspect-square relative rounded-sm overflow-hidden border border-white/10 group"
                  >
                    <Image
                      src={url}
                      alt={`Gallery ${idx}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData({
                          ...formData,
                          gallery: formData.gallery.filter((_, i) => i !== idx),
                        });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 pt-6 border-t border-white/10 mt-6">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Client Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "clientLogo")}
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-black file:bg-primary file:text-black hover:file:bg-primary/90"
              />
              <input
                type="text"
                value={formData.clientLogo}
                onChange={(e) =>
                  setFormData({ ...formData, clientLogo: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium mt-2"
                placeholder="Or provide direct URL for client logo: https://..."
              />
              {formData.clientLogo && (
                <div className="mt-4 w-24 h-24 relative rounded-sm overflow-hidden border border-white/10">
                  <Image
                    src={formData.clientLogo}
                    alt="Client logo"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
                Detailed Description *
              </h3>
              <div className="flex items-center gap-3">
                <label className="text-[10px] font-bold uppercase text-gray-400">
                  Rich Text
                </label>
                <input
                  type="checkbox"
                  checked={useRichText}
                  onChange={(e) => setUseRichText(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </div>
            {useRichText ? (
              <div>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => document.execCommand("bold")}
                    className="px-2 py-1 bg-white/5 rounded-sm"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => document.execCommand("italic")}
                    className="px-2 py-1 bg-white/5 rounded-sm"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => document.execCommand("underline")}
                    className="px-2 py-1 bg-white/5 rounded-sm"
                  >
                    U
                  </button>
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) =>
                    setFormData({
                      ...formData,
                      description: (e.target as HTMLDivElement).innerHTML,
                    })
                  }
                  className="min-h-30 w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
            ) : (
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                placeholder="Write a compelling project description..."
              />
            )}
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
              Technologies
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTechnology())
                }
                className="flex-1 bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs focus:outline-none"
                placeholder="Add a technology (e.g. React, Next.js)"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-sm transition-colors text-primary"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-sm border border-white/5"
                >
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    {tech}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(idx)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
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
          className="bg-primary text-black px-8 py-2.5 rounded-sm font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {id ? "Update Project" : "Publish Project"}
        </button>
      </div>
    </form>
  );
}
