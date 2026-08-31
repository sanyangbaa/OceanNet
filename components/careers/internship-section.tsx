"use client";

import Link from "next/link";
import { useState } from "react";
import TalentFormClient from "./talent-form-client";
import Image from "next/image";

const internships = [
  {
    id: "intern-1",
    title: "Software Engineering Intern",
    location: "Remote",
    duration: "3 months",
    image: "/images/ont_img.jpg",
    description:
      "Work with our engineering team on real projects—learn modern web development, testing, and deployment.",
  },
  {
    id: "intern-2",
    title: "Marketing Intern",
    location: "On-site (Lagos)",
    duration: "3 months",
    image: "/images/paali.jpg",
    description:
      "Support content, campaign analytics, and social media strategy while working closely with our growth team.",
  },
];

export default function InternshipSection() {
  const [selectedInternship, setSelectedInternship] = useState<string | null>(
    null,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-secondary">Internships</h3>
        <p className="text-sm text-muted-foreground">
          Short-term programs for early-career talent
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {internships.map((i) => (
          <article
            key={i.id}
            className="bg-white p-4 rounded-2xl border border-border flex flex-col shadow-sm"
          >
            <div className="h-40 w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={i.image}
                alt={i.title}
                width={600}
                height={240}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
            <h4 className="mt-4 text-lg font-bold text-secondary">{i.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {i.location} • {i.duration}
            </p>
            <p className="text-sm text-muted-foreground mt-3 flex-1">{i.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                {i.duration}
              </span>
              <button
                onClick={() => setSelectedInternship(i.title)}
                className="bg-primary text-white hover:bg-secondary px-5 py-2 rounded-full font-bold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Apply
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedInternship && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/70 backdrop-blur-sm p-4">
          <div className="relative bg-white w-full max-w-2xl p-6 md:p-8 rounded-2xl shadow-2xl border border-border">
            <button
              onClick={() => setSelectedInternship(null)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-secondary bg-muted hover:bg-muted/80 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-secondary mb-4">
              Apply: {selectedInternship}
            </h3>
            <TalentFormClient
              defaultAreaOfInterest={selectedInternship}
              onSuccess={() => setSelectedInternship(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
