/**
 * Reusable shimmer skeleton fallbacks for homepage sections.
 * Used as <Suspense fallback={...}> for async server components.
 */

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent";

export function AboutPreviewSkeleton() {
  return (
    <section className="py-8 sm:py-12 md:py-14 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center w-full">
          {/* Image placeholder */}
          <div className={`${shimmer} bg-gray-200 rounded-br-3xl h-[320px] sm:h-[380px] md:h-[420px] w-full`} />
          {/* Text placeholder */}
          <div className="flex flex-col gap-4">
            <div className={`${shimmer} bg-gray-200 h-8 rounded w-3/4`} />
            <div className={`${shimmer} bg-gray-200 h-8 rounded w-full`} />
            <div className={`${shimmer} bg-gray-200 h-5 rounded w-2/3`} />
            <div className={`${shimmer} bg-gray-200 h-5 rounded w-full`} />
            <div className={`${shimmer} bg-gray-200 h-5 rounded w-4/5`} />
            <div className="flex gap-4 mt-2">
              <div className={`${shimmer} bg-gray-200 h-12 rounded-xl w-44`} />
              <div className={`${shimmer} bg-gray-200 h-12 rounded-full w-32`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionCardsSkeleton({
  bg = "bg-white",
  count = 6,
}: {
  bg?: string;
  count?: number;
}) {
  return (
    <section className={`py-8 sm:py-12 md:py-14 overflow-hidden ${bg}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="flex flex-col items-center gap-3 mb-8 sm:mb-10">
          <div className={`${shimmer} bg-gray-200 h-4 rounded w-24`} />
          <div className={`${shimmer} bg-gray-200 h-8 rounded w-56`} />
          <div className={`${shimmer} bg-gray-200 h-4 rounded w-80`} />
        </div>
        {/* Cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className={`${shimmer} bg-gray-200 rounded-lg h-52`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="overflow-hidden bg-white py-8 sm:py-12 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className={`${shimmer} bg-gray-200 h-4 rounded w-24`} />
          <div className={`${shimmer} bg-gray-200 h-8 rounded w-48`} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 p-6 border border-gray-100 rounded-xl">
              <div className={`${shimmer} bg-gray-200 h-4 rounded w-full`} />
              <div className={`${shimmer} bg-gray-200 h-4 rounded w-4/5`} />
              <div className={`${shimmer} bg-gray-200 h-4 rounded w-3/5`} />
              <div className="flex items-center gap-3 mt-2">
                <div className={`${shimmer} bg-gray-200 rounded-full h-10 w-10 shrink-0`} />
                <div className="flex flex-col gap-1 flex-1">
                  <div className={`${shimmer} bg-gray-200 h-3 rounded w-24`} />
                  <div className={`${shimmer} bg-gray-200 h-3 rounded w-16`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
