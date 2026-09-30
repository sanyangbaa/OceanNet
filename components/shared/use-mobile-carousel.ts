import { useRef, useState } from "react";

type CarouselAlignment = "start" | "center";

export function useMobileCarousel(
  count: number,
  alignment: CarouselAlignment = "center",
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || count === 0) return;

    const containerBounds = container.getBoundingClientRect();
    const targetPosition =
      alignment === "center"
        ? containerBounds.left + containerBounds.width / 2
        : containerBounds.left;
    const cards = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const bounds = card.getBoundingClientRect();
      const cardPosition =
        alignment === "center" ? bounds.left + bounds.width / 2 : bounds.left;
      const distance = Math.abs(cardPosition - targetPosition);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((currentIndex) =>
      currentIndex === closestIndex ? currentIndex : closestIndex,
    );
  };

  const scrollTo = (index: number) => {
    const container = scrollContainerRef.current;
    const card = container?.children.item(index) as HTMLElement | null;
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: alignment,
    });
    setActiveIndex(index);
  };

  return { activeIndex, handleScroll, scrollContainerRef, scrollTo };
}
