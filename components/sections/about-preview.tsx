import { AboutPreviewClient } from "./about-preview-client";

export function AboutPreview() {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <AboutPreviewClient />
      </div>
    </section>
  );
}
