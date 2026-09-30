import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileCarouselControlsProps {
  activeIndex: number;
  count: number;
  itemLabel: string;
  onSelect: (index: number) => void;
  light?: boolean;
}

export function MobileCarouselControls({
  activeIndex,
  count,
  itemLabel,
  onSelect,
  light = false,
}: MobileCarouselControlsProps) {
  if (count < 2) return null;

  return (
    <div className="flex justify-between items-center mt-6 md:hidden px-2">
      <button
        type="button"
        onClick={() => onSelect(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        className={cn(
          "p-2 rounded-full border shadow-xs disabled:opacity-30 disabled:cursor-not-allowed",
          light
            ? "border-white/30 bg-white/10 text-white"
            : "border-gray-200 bg-white text-gray-700",
        )}
        aria-label={`Previous ${itemLabel}`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex justify-center items-center gap-2">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              "transition-all duration-300 rounded-full cursor-pointer",
              activeIndex === index
                ? cn("w-7 h-2", light ? "bg-white" : "bg-primary")
                : cn(
                    "w-2 h-2",
                    light
                      ? "bg-white/30 hover:bg-white/60"
                      : "bg-black/20 hover:bg-black/40",
                  ),
            )}
            aria-label={`Go to ${itemLabel} ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSelect(Math.min(count - 1, activeIndex + 1))}
        disabled={activeIndex === count - 1}
        className={cn(
          "p-2 rounded-full border shadow-xs disabled:opacity-30 disabled:cursor-not-allowed",
          light
            ? "border-white/30 bg-white/10 text-white"
            : "border-gray-200 bg-white text-gray-700",
        )}
        aria-label={`Next ${itemLabel}`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
