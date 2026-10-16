"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  Trash2,
  Plus,
  Bold,
  Italic,
  Underline,
  List,
  Building,
  Briefcase,
  Upload,
  ArrowLeft,
  Star,
  MessageSquareQuote,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

interface ProjectFormProps {
  initialData?: Record<string, unknown>;
  id?: string;
}

export function ProjectForm({ initialData, id }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Main Body Content
    title: (initialData?.title as string) || "",
    category: (initialData?.category as string) || "Commercial",
    description: (initialData?.description as string) || "",
    challenge: (initialData?.challenge as string) || "",
    keyFeatures: Array.isArray(initialData?.keyFeatures)
      ? initialData.keyFeatures
          .filter((item): item is string => typeof item === "string")
          .join("\n")
      : (initialData?.keyFeatures as string) || "",

    // Project Detail Card (Sidebar 1)
    client: (initialData?.client as string) || "",
    projectRole:
      (initialData?.projectRole as string) ||
      (initialData?.role as string) ||
      "",
    location: (initialData?.location as string) || "",
    projectSize: (initialData?.projectSize as string) || "",
    status: (initialData?.status as string) || "Complete",
    year: initialData?.year ? String(initialData.year) : "2024",
    rating: initialData?.rating ? String(initialData.rating) : "5",

    // Client Review Card (Sidebar 2)
    reviewAuthor: (initialData?.reviewAuthor as string) || "",
    reviewRole: (initialData?.reviewRole as string) || "",
    reviewText: (initialData?.reviewText as string) || "",
    reviewImage: (initialData?.reviewImage as string) || "",

    // Media & Visuals
    image: (initialData?.image as string) || "",
    gallery: (Array.isArray(initialData?.gallery)
      ? initialData.gallery
      : []) as string[],

    // Publish & Visibility
    publishStatus: (initialData?.publishStatus as string) || "Published",
    featured: Boolean(initialData?.featured),
  });

  const [useRichText, setUseRichText] = useState(false);
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
  }, [useRichText, formData.description]);

  const execFormat = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "gallery" | "reviewImage",
  ) => {
    if (!e.target.files?.length) return;

    setUploadingField(field);
    try {
      const files = Array.from(e.target.files);
      const newUrls: string[] = [];
      const folder = id ? `projects/${id}` : "projects";

      for (const file of files) {
        if (file.size > 7 * 1024 * 1024) {
          alert(
            `"${file.name}" exceeds the 7MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
          );
          continue;
        }

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
        } else {
          const errData = await uploadRes.json().catch(() => ({}));
          alert(errData.error || `Failed to upload "${file.name}"`);
        }
      }

      if (newUrls.length > 0) {
        if (field === "image") {
          setFormData((prev) => ({ ...prev, image: newUrls[0] }));
        } else if (field === "reviewImage") {
          setFormData((prev) => ({ ...prev, reviewImage: newUrls[0] }));
        } else {
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, ...newUrls],
          }));
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading images");
    } finally {
      setUploadingField(null);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const latestDescription = useRichText
      ? (editorRef.current?.innerHTML ?? formData.description)
      : formData.description;

    if (
      !formData.title?.toString().trim() ||
      !latestDescription?.toString().trim() ||
      !formData.image?.toString().trim()
    ) {
      alert("Please provide the required fields: Title, Description, and Cover Image.");
      return;
    }

    setIsLoading(true);
    try {
      const url = id ? `/api/admin/projects/${id}` : "/api/admin/projects";
      const method = id ? "PATCH" : "POST";

      const keyFeaturesList = formData.keyFeatures
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);

      const payload: Record<string, unknown> = {
        title: formData.title,
        category: formData.category,
        description: latestDescription,
        shortDescription: formData.description.slice(0, 160),
        challenge: formData.challenge,
        keyFeatures: keyFeaturesList,
        client: formData.client,
        projectRole: formData.projectRole,
        role: formData.projectRole,
        location: formData.location,
        projectSize: formData.projectSize,
        status: formData.status,
        year: formData.year ? Number(formData.year) : null,
        rating: formData.rating ? Number(formData.rating) : 5,
        reviewAuthor: formData.reviewAuthor,
        reviewRole: formData.reviewRole,
        reviewText: formData.reviewText,
        reviewImage: formData.reviewImage,
        image: formData.image,
        gallery: formData.gallery,
        publishStatus: formData.publishStatus,
        featured: formData.featured,
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
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving the project");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12"
    >
      {/* ── Top Action Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm">
            <span className="text-[10px] uppercase font-bold text-gray-500">
              Publish Status:
            </span>
            <select
              value={formData.publishStatus}
              onChange={(e) =>
                setFormData({ ...formData, publishStatus: e.target.value })
              }
              className="bg-transparent text-xs font-bold text-primary focus:outline-none cursor-pointer"
            >
              <option value="Published" className="bg-neutral-900 text-white">
                Published
              </option>
              <option value="Draft" className="bg-neutral-900 text-white">
                Draft
              </option>
              <option value="Archived" className="bg-neutral-900 text-white">
                Archived
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-black px-6 py-2 rounded-sm font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {id ? "Update Project" : "Publish Project"}
          </button>
        </div>
      </div>

      {/* Feature on homepage banner */}
      <label className="flex items-center gap-3 bg-primary/10 border border-primary/30 px-4 py-3 rounded-sm cursor-pointer">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
          className="h-4 w-4 accent-primary"
        />
        <span>
          <span className="block text-xs font-black uppercase tracking-widest text-primary">
            Feature on homepage
          </span>
          <span className="block text-xs text-gray-400 mt-0.5">
            Display this project in the featured projects section on the homepage.
          </span>
        </span>
      </label>

      {/* ── 2-Column Layout matching Inspiration Image ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Left Column: Main Content & The Challenge in Work ── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Project Overview */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Building size={16} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Main Project Details
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Project Title <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-white"
                placeholder="e.g. Solar Power Ltd Project"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                  Project Description <span className="text-primary">*</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    Rich Text
                  </span>
                  <div
                    onClick={() => setUseRichText((v) => !v)}
                    className={`relative w-9 h-4.5 rounded-full transition-colors cursor-pointer ${
                      useRichText ? "bg-primary" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        useRichText ? "translate-x-4.5" : "translate-x-0"
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
                      onMouseDown={(e) => {
                        e.preventDefault();
                        execFormat("bold");
                      }}
                      title="Bold"
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors text-white"
                    >
                      <Bold size={13} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        execFormat("italic");
                      }}
                      title="Italic"
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors text-white"
                    >
                      <Italic size={13} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        execFormat("underline");
                      }}
                      title="Underline"
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors text-white"
                    >
                      <Underline size={13} />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        execFormat("insertUnorderedList");
                      }}
                      title="Bullet list"
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-sm transition-colors text-white"
                    >
                      <List size={13} />
                    </button>
                  </div>
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="min-h-[170px] w-full bg-black/40 border border-white/10 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all text-white"
                    style={{ lineHeight: "1.7" }}
                  />
                </div>
              ) : (
                <textarea
                  rows={6}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-white resize-y"
                  placeholder="Enter the main project overview. Empty lines separate paragraphs on the frontend page."
                />
              )}
            </div>
          </div>

          {/* The Challenge in Work Section */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                The Challenge in Work
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Challenge Description (Paragraph)
              </label>
              <textarea
                rows={4}
                value={formData.challenge}
                onChange={(e) =>
                  setFormData({ ...formData, challenge: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-sm focus:outline-none focus:border-primary/50 transition-all font-medium text-white resize-y"
                placeholder="Describe the challenges faced and the core approach taken for this project."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Challenge Highlights / Checklist (one item per line)
              </label>
              <textarea
                rows={5}
                value={formData.keyFeatures}
                onChange={(e) =>
                  setFormData({ ...formData, keyFeatures: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-4 py-2.5 rounded-sm text-xs font-mono focus:outline-none focus:border-primary/50 transition-all font-medium text-white resize-y"
                placeholder={
                  "Lorem ipsum dolor sit amet\nNam liber tempor cum soluta nobis option\nDuis autem vel eum iriure dolor\nLabore ipsum duo amet eos sed ipsum justo\nEt ipsum sit diam ut magna lorem vero lorem rebum"
                }
              />
              <p className="text-[11px] text-gray-500">
                Each line will be displayed on the public page with a golden checkmark icon.
              </p>
            </div>
          </div>

          {/* Media Slider Assets */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Upload size={16} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Main Slider &amp; Gallery Images
              </h3>
            </div>

            {/* Featured Cover Image */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Featured / Cover Image <span className="text-primary">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "image")}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="cursor-pointer bg-primary text-black font-black uppercase tracking-widest px-4 py-2 rounded-sm text-xs flex items-center gap-2 shrink-0 hover:bg-primary/90 transition-all"
                >
                  <Upload size={14} />
                  {uploadingField === "image" ? "Uploading..." : "Upload File"}
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs focus:outline-none font-medium text-white"
                  placeholder="Or provide direct URL: https://..."
                />
              </div>

              {formData.image && (
                <div className="mt-3 aspect-video relative rounded-sm overflow-hidden border border-white/10 bg-black/40">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    unoptimized={/^https?:\/\//i.test(formData.image)}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute top-2 right-2 bg-red-500/90 text-white p-1.5 rounded-sm hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Images for Slider */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                  Additional Slider Images ({formData.gallery.length} Images)
                </label>
                <label
                  htmlFor="gallery-images-upload"
                  className="cursor-pointer text-primary text-[10px] font-bold uppercase hover:underline flex items-center gap-1"
                >
                  <Plus size={12} />
                  Add Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "gallery")}
                  className="hidden"
                  id="gallery-images-upload"
                />
              </div>

              {formData.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {formData.gallery.map((url, idx) => (
                    <div
                      key={idx}
                      className="aspect-square relative rounded-sm overflow-hidden border border-white/10 group bg-black/40"
                    >
                      <Image
                        src={url}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        unoptimized={/^https?:\/\//i.test(url)}
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            gallery: formData.gallery.filter(
                              (_, i) => i !== idx,
                            ),
                          })
                        }
                        className="absolute top-1 right-1 bg-red-600/90 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Column: Project Detail Card & Client Review (Sidebar) ── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Widget 1: PROJECT DETAIL CARD (Matches Sidebar 1 of Image 2) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={16} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Sidebar: Project Detail Card
              </h3>
            </div>

            {/* Client */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Client <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. Solar Power Ltd"
              />
            </div>

            {/* Architect */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Architect / Lead <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.projectRole}
                onChange={(e) =>
                  setFormData({ ...formData, projectRole: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. John Doe"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Location <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. NY, USA"
              />
            </div>

            {/* Size */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Size <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.projectSize}
                onChange={(e) =>
                  setFormData({ ...formData, projectSize: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. 10000 SF"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Status <span className="text-primary">*</span>
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50 cursor-pointer"
              >
                <option value="Complete" className="bg-neutral-900 text-white">
                  Complete
                </option>
                <option value="In Progress" className="bg-neutral-900 text-white">
                  In Progress
                </option>
                <option value="Under Construction" className="bg-neutral-900 text-white">
                  Under Construction
                </option>
                <option value="In Planning" className="bg-neutral-900 text-white">
                  In Planning
                </option>
              </select>
            </div>

            {/* Year Completed */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Year Completed <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                min="1990"
                max="2099"
                required
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. 2021"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Category <span className="text-primary">*</span>
              </label>
              <input
                list="category-options-list"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. Commercial"
              />
              <datalist id="category-options-list">
                <option value="Commercial" />
                <option value="Residential" />
                <option value="Digital Solutions" />
                <option value="Systems Integration" />
                <option value="Digital Health" />
                <option value="Enterprise Software" />
                <option value="Networking" />
                <option value="ICT Infrastructure" />
                <option value="Cybersecurity" />
                <option value="Cloud Solutions" />
                <option value="GIS Solutions" />
                <option value="AI & Analytics" />
                <option value="Managed Services" />
              </datalist>
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Rating (1-5 Stars) <span className="text-primary">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="1"
                  required
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  className="w-24 bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                />
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Number(formData.rating || 5) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: CLIENT REVIEW CARD (Matches Sidebar 2 of Image 2) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquareQuote size={16} className="text-primary" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                Sidebar: Client Review Card
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Reviewer Name
              </label>
              <input
                type="text"
                value={formData.reviewAuthor}
                onChange={(e) =>
                  setFormData({ ...formData, reviewAuthor: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Reviewer Role / Company
              </label>
              <input
                type="text"
                value={formData.reviewRole}
                onChange={(e) =>
                  setFormData({ ...formData, reviewRole: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50"
                placeholder="e.g. Solar Power Ltd"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Review Quote / Text
              </label>
              <textarea
                rows={3}
                value={formData.reviewText}
                onChange={(e) =>
                  setFormData({ ...formData, reviewText: e.target.value })
                }
                className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs font-medium text-white focus:outline-none focus:border-primary/50 resize-y"
                placeholder="e.g. Labore kasd est lorem et est. Amet dolor at erat duo diam. Dolor amet amet ipsum erat..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                Reviewer Photo
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "reviewImage")}
                  className="hidden"
                  id="client-review-photo-upload"
                />
                <label
                  htmlFor="client-review-photo-upload"
                  className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/10 px-3 py-2 rounded-sm text-xs font-bold text-white shrink-0 transition-colors"
                >
                  {uploadingField === "reviewImage" ? "Uploading..." : "Upload Photo"}
                </label>
                <input
                  type="text"
                  value={formData.reviewImage}
                  onChange={(e) =>
                    setFormData({ ...formData, reviewImage: e.target.value })
                  }
                  className="min-w-0 flex-1 bg-black/40 border border-white/10 px-3 py-2 rounded-sm text-xs text-white focus:outline-none focus:border-primary/50"
                  placeholder="Or URL: https://..."
                />
              </div>

              {formData.reviewImage && (
                <div className="mt-2 flex items-center gap-3 bg-black/30 p-2 rounded-sm border border-white/10">
                  <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/20 shrink-0">
                    <Image
                      src={formData.reviewImage}
                      alt="Reviewer photo"
                      fill
                      unoptimized={/^https?:\/\//i.test(formData.reviewImage)}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] text-gray-400 truncate flex-1">
                    {formData.reviewImage}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, reviewImage: "" })}
                    className="text-gray-500 hover:text-red-400 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Save Action ── */}
      <div className="flex justify-end gap-4 border-t border-white/10 pt-8 mt-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-black px-8 py-2.5 rounded-sm font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
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
