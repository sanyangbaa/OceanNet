"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, Plus, Bold, Italic, Underline, List } from "lucide-react";
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
    industry: (initialData?.industry as string) || "",
    projectType: (initialData?.projectType as string) || "",
    role: (initialData?.role as string) || "",
    servicesDelivered: (initialData?.servicesDelivered as string) || "",
    outcome: (initialData?.outcome as string) || "",
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

  const [techInput, setTechInput] = useState("");
  const [useRichText, setUseRichText] = useState(false);

  // Uncontrolled ref for rich text editor — prevents cursor jump on every keystroke
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInitialized = useRef(false);

  useEffect(() => {
    if (useRichText && editorRef.current && !editorInitialized.current) {
      editorRef.current.innerHTML = formData.description || "";
      editorInitialized.current = true;
    }
    if (!useRichText) {
      editorInitialized.current = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useRichText]);

  const execFormat = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

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


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Sync rich text editor content before submit
    const latestDescription = useRichText
      ? (editorRef.current?.innerHTML ?? formData.description)
      : formData.description;

    if (
      !formData.title?.toString().trim() ||
      !formData.shortDescription?.toString().trim() ||
      !latestDescription?.toString().trim() ||
      !formData.image?.toString().trim()
    ) {
      alert(
        "Please fill the required fields: Title, Short Description, Full Description, and Project Thumbnail.",
      );
      return;
    }
    setIsLoading(true);
    try {
      const url = id ? `/api/admin/projects/${id}` : "/api/admin/projects";
      const method = id ? "PATCH" : "POST";
      const payload: Record<string, unknown> = {
        ...formData,
        description: latestDescription,
        youtubeUrl: formData.youtubeUrl?.toString().trim() || null,
      };
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
                <input
                  list="category-options"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                  placeholder="Select or type..."
                />
                <datalist id="category-options">
                  <option value="Web Development" />
                  <option value="Mobile Development" />
                  <option value="UI/UX Design" />
                  <option value="Cloud Solutions" />
                  <option value="AI Solutions" />
                  <option value="Cybersecurity" />
                  <option value="DevOps" />
                  <option value="Systems Integration" />
                  <option value="Digital Transformation" />
                  <option value="ICT Infrastructure" />
                  <option value="Managed Services" />
                </datalist>
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
                <input
                  list="industry-options"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                  placeholder="Select or type..."
                />
                <datalist id="industry-options">
                  <option value="Finance" />
                  <option value="Healthcare" />
                  <option value="Education" />
                  <option value="Government" />
                  <option value="Logistics" />
                  <option value="E-Commerce" />
                  <option value="Telecommunications" />
                  <option value="Agriculture" />
                  <option value="Development Programmes" />
                  <option value="NGO / International Organisations" />
                  <option value="Retail" />
                  <option value="Energy" />
                </datalist>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                  Project Type
                </label>
                <input
                  list="project-type-options"
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                  placeholder="Select or type..."
                />
                <datalist id="project-type-options">
                  <option value="Client Project" />
                  <option value="Internal Project" />
                  <option value="Product Development" />
                  <option value="Open Source Project" />
                  <option value="Government Contract" />
                  <option value="Pilot / Proof of Concept" />
                </datalist>
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
                Client Name
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

          {/* Delivery Evidence — moved to left column under Client Details */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
              Delivery Evidence
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                OceanNet&apos;s Role
              </label>
              <textarea
                rows={3}
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                placeholder="Describe OceanNet's responsibility on this assignment"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Services Delivered
              </label>
              <textarea
                rows={3}
                value={formData.servicesDelivered}
                onChange={(e) =>
                  setFormData({ ...formData, servicesDelivered: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                placeholder="List the verified services delivered"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Outcome
              </label>
              <textarea
                rows={3}
                value={formData.outcome}
                onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-none"
                placeholder="Describe the verified result or operational improvement"
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Detailed Description *
              </h3>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="text-[10px] font-bold uppercase text-gray-400">Rich Text</span>
                <div
                  onClick={() => setUseRichText((v) => !v)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    useRichText ? "bg-primary" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      useRichText ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </label>
            </div>
            {useRichText ? (
              <div>
                <div className="flex gap-1 mb-2 flex-wrap">
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); execFormat("bold"); }}
                    title="Bold"
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors"
                  >
                    <Bold size={13} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); execFormat("italic"); }}
                    title="Italic"
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors"
                  >
                    <Italic size={13} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); execFormat("underline"); }}
                    title="Underline"
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors"
                  >
                    <Underline size={13} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); execFormat("insertUnorderedList"); }}
                    title="Bullet list"
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors"
                  >
                    <List size={13} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); execFormat("formatBlock", "p"); }}
                    title="New paragraph"
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm text-[10px] font-bold transition-colors"
                  >
                    ¶
                  </button>
                </div>
                {/* Uncontrolled contentEditable — initialized once, no dangerouslySetInnerHTML on rerender */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      document.execCommand("insertParagraph");
                    }
                  }}
                  className="min-h-[180px] w-full bg-black/40 border border-white/10 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all"
                  style={{ lineHeight: "1.7" }}
                />
                <p className="text-[10px] text-gray-600 mt-1">
                  Press Enter for a new paragraph &middot; Shift+Enter for line break
                </p>
              </div>
            ) : (
              <textarea
                rows={8}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium resize-y"
                placeholder="Write a compelling project description. Each new line becomes a paragraph on the public page."
              />
            )}
          </div>

          {/* Technologies — moved to right column under Detailed Description */}
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
