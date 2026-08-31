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
      q: "How do I apply for a job?",
      a: "Open the job details page and click the 'Apply Now' button. You can submit a short application form and upload your resume (PDF/DOC/DOCX) directly on the page.",
    },
    {
      q: "Can I apply for multiple roles?",
      a: "Yes. You may apply to multiple roles; each application is tracked separately in our system and reviewed by our recruitment team independently.",
    },
    {
      q: "What happens after I apply?",
      a: "Our recruitment team reviews all applications and will contact shortlisted candidates via email. You will receive an automatic email confirmation as soon as you submit your application.",
    },
    {
      q: "Do you offer internships and entry-level roles?",
      a: "Yes — we run internship programs and early-career hiring. Filter by 'Internship' in the job type filter above to see current openings.",
    },
    {
      q: "How long does the hiring process take?",
      a: "Our typical hiring process takes 2–4 weeks from application to offer. It includes an initial screening, a skills assessment, and one or more interviews depending on the role.",
    },
    {
      q: "Can I join the talent pool if there are no open positions?",
      a: "Absolutely. Scroll down to the 'Join Our Talent Community' section and submit your profile. We'll reach out when a suitable role opens up.",
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
