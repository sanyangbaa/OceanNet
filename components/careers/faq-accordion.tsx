"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items?: FAQItem[] }) {
  const defaultItems: FAQItem[] = [
    {
      q: "How do I apply for a position at OceanNet?",
      a: "When vacancies are open, select the role from the Open Positions list and click 'Apply Now'. You can submit your details and upload your CV (PDF, DOC, or DOCX) directly through the secure form.",
    },
    {
      q: "What should I do if there are currently no open positions?",
      a: "You can submit your CV to our Talent Community below. We keep submitted profiles on file for suitable future opportunities that match your technical skill set, subject to our Privacy Policy.",
    },
    {
      q: "What qualities does OceanNet look for in team members?",
      a: "We value practical engineering skills, operational curiosity, high integrity, and dedication to delivering dependable technology solutions tailored to real-world environments.",
    },
    {
      q: "How does OceanNet handle applicant data and CV retention?",
      a: "All CV uploads and candidate records are stored securely with strict access control, processed solely for recruitment purposes, and handled in full accordance with our Privacy Policy.",
    },
    {
      q: "What technology domains does OceanNet work across?",
      a: "Our multidisciplinary team works across custom software, systems integration, digital health platforms (e.g. SORMAS), enterprise systems, cloud productivity, networking, and cybersecurity.",
    },
  ];

  const list = items && items.length ? items : defaultItems;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full space-y-3">
      {list.map((it, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl border overflow-hidden transition-all duration-300 shadow-sm ${
              isOpen
                ? "border-primary/40 bg-white shadow-md"
                : "border-border bg-white hover:border-primary/20"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}
                >
                  <HelpCircle className="h-4 w-4" />
                </div>
                <span
                  className={`font-bold text-sm md:text-base transition-colors duration-300 ${
                    isOpen ? "text-primary" : "text-secondary group-hover:text-primary"
                  }`}
                >
                  {it.q}
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`transition-all duration-300 shrink-0 ml-3 ${
                  isOpen ? "text-primary rotate-180" : "text-muted-foreground"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1 pl-16 text-muted-foreground text-sm leading-relaxed">
                {it.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
