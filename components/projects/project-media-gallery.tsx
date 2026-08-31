"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectMediaGalleryProps {
  mainImage: string;
  gallery: string[];
  youtubeUrl?: string | null;
  title: string;
}

type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail: string;
  title: string;
};

function getYoutubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;
      const pathParts = parsed.pathname.split("/").filter(Boolean);
      const embedIndex = pathParts.indexOf("embed");
      if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
        return pathParts[embedIndex + 1];
      }
      const shortIndex = pathParts.indexOf("shorts");
      if (shortIndex !== -1 && pathParts[shortIndex + 1]) {
        return pathParts[shortIndex + 1];
      }
    }
  } catch {
    return null;
  }
  return null;
}

function getYoutubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function ProjectMediaGallery({
  mainImage,
  gallery,
  youtubeUrl,
  title,
}: ProjectMediaGalleryProps) {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const items = useMemo<MediaItem[]>(() => {
    const imageItems: MediaItem[] = [];
    const galleryImages = Array.isArray(gallery) ? gallery : [];
    const uniqueGallery = [...new Set([mainImage, ...galleryImages])];

    if (youtubeUrl) {
      const id = getYoutubeVideoId(youtubeUrl);
      if (id) {
        imageItems.push({
          id: `yt-${id}`,
          type: "video",
          src: youtubeUrl,
          thumbnail: getYoutubeThumbnail(id),
          title: "Project Video",
        });
      }
    }

    const imageEntries = uniqueGallery.map((src, index) => ({
      id: `img-${index}`,
      type: "image" as const,
      src,
      thumbnail: src,
      title,
    }));

    return [...imageItems, ...imageEntries];
  }, [gallery, mainImage, youtubeUrl, title]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={cn(
              "relative overflow-hidden rounded-sm shadow-lg hover:shadow-2xl transition-all duration-700 group",
              item.type === "video" && "cursor-pointer",
              idx === 0 && "md:col-span-2",
            )}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActiveMedia(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActiveMedia(item);
                }
              }}
              className="relative block w-full h-full"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              {item.type === "video" ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-[320px] w-full object-cover"
                />
              ) : (
                <div className="relative h-[320px] w-full">
                  <Image
                    src={item.thumbnail}
                    alt={`${title} image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-secondary/60 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.type === "video" ? (
                    <Play className="h-6 w-6 text-accent" />
                  ) : (
                    <ArrowRight className="h-6 w-6 text-accent" />
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white/90">
                    {item.type === "video" ? "YouTube Video" : "Gallery Image"}
                  </span>
                  {item.type === "video" && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        <Play className="h-4 w-4 text-red-500" />
                        Play
                      </span>
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-slate-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        YouTube
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveMedia(null)}
          />
          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl bg-secondary shadow-2xl mx-auto border border-white/15">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-accent">
                  {activeMedia.type === "video"
                    ? "Video Preview"
                    : "Image Preview"}
                </p>
                <h2 className="text-xl font-black text-white">
                  {activeMedia.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                className="rounded-full border border-white/15 bg-white/10 p-3 text-white transition-colors hover:bg-primary hover:border-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative h-[35vh] min-h-[240px] bg-black sm:h-[40vh] md:h-[45vh] lg:h-[65vh]">
              {activeMedia.type === "video" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(activeMedia.src)}?autoplay=1&rel=0`}
                  title={activeMedia.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              ) : (
                <Image
                  src={activeMedia.thumbnail}
                  alt={activeMedia.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-300">
                {activeMedia.type === "video"
                  ? "Watch the project video directly on the site or open it on YouTube."
                  : "Browse the project media in a larger view."}
              </p>
              {activeMedia.type === "video" && (
                <Link
                  href={activeMedia.src}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open on YouTube
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
