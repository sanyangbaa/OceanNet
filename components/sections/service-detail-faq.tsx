"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ServiceDetailFaqProps {
  serviceTitle: string;
}

export function ServiceDetailFaq({ serviceTitle }: ServiceDetailFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    {
      question: `What is included in our ${serviceTitle.toLowerCase()}?`,
      answer: `Our ${serviceTitle} is planned around your organizational workflow, operational requirements, and technical architecture. We consult with your stakeholders, establish verified deliverables, and coordinate all deployment phases with comprehensive documentation and user training.`,
    },
    {
      question: "What information should we provide to get started?",
      answer:
        "Share your current operational workflow, objectives, system integrations required, preferred timeline, and any existing platform documentation. Our engineering team will review the requirements and structure a preliminary assessment.",
    },
    {
      question: "Can this solution be tailored to our custom workflows?",
      answer:
        "Yes, absolutely. Every implementation is customized to match your organization's operating environment, access controls, data security requirements, and long-term scalability goals.",
    },
    {
      question: "How do we request a technical consultation or quote?",
      answer:
        "Contact our team through the quotation form or email. Our technical leads will analyze your requirements and provide an itemized proposal and roadmap.",
    },
  ];

  return (
    <section aria-labelledby="service-faq-heading" className="mt-8">
      <h2
        id="service-faq-heading"
        className="mb-4 text-xl md:text-2xl font-bold tracking-tight text-[#07142f]"
      >
        Frequently asked questions
      </h2>
      <div className="border border-slate-200 divide-y divide-slate-200 overflow-hidden">
        {questions.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-xs md:text-sm font-bold transition-colors ${
                  isOpen
                    ? "bg-primary text-[#07142f]"
                    : "bg-white text-[#07142f] hover:bg-slate-50"
                }`}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden bg-white">
                  <p className="px-4 py-4 text-xs md:text-sm leading-relaxed text-slate-600 border-t border-slate-100">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
