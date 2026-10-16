"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface FooterSectionsProps {
  className: string;
  children: ReactNode;
}

export function FooterSections({
  children,
  className,
}: FooterSectionsProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isDetailPage =
    segments.length === 2 &&
    (segments[0] === "services" || segments[0] === "projects");

  return isDetailPage ? null : <div className={className}>{children}</div>;
}
