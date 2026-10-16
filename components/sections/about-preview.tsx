import { AboutPreviewClient } from "./about-preview-client";

export function AboutPreview() {
  return (
    <section className="py-8 sm:py-12 md:py-14 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <AboutPreviewClient />
      </div>
    </section>
  );
}
