"use client";

import { useState } from "react";
import { Phone, Loader2, CheckCircle2 } from "lucide-react";
import { companyInfo } from "@/data/company";

export function ServiceQuoteSection({ phone }: { phone?: string } = {}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Custom Software Development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneDisplay = phone || companyInfo.contacts.phone || "+220 87 278 5585";
  const phoneClean = phoneDisplay.replace(/\s+/g, "");

  const servicesList = [
    "Custom Software Development",
    "Systems Integration",
    "Digital Health Solutions",
    "Cloud & DevOps Infrastructure",
    "Cybersecurity & InfoSec",
    "IT Networking & Infrastructure",
    "GIS & Geospatial Technologies",
    "Managed ICT Support",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Quote Request: ${formData.service}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Custom Software Development",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to submit quote request. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-white py-14 md:py-20 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Information & Phone Button */}
          <div className="flex flex-col justify-center">
            <span className="text-primary font-bold text-base md:text-lg tracking-wide mb-2">
              Get A Quote
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-secondary leading-tight tracking-tight mb-6">
              Need Our Expert Help?
              <br />
              We&apos;re Here!
            </h2>

            <div className="space-y-4 text-slate-500 text-sm leading-relaxed mb-8">
              <p>
                From legacy modernization to custom enterprise software, secure cloud migration, and 24/7 managed support — OceanNet delivers high-impact digital solutions tailored to your needs.
              </p>
              <p>
                Our team partners with you from discovery to deployment, ensuring your technology investments drive real, measurable results.
              </p>
            </div>

            {/* Contact Pill matching the inspiration */}
            <div>
              <a
                href={`tel:${phoneClean}`}
                className="inline-flex items-stretch overflow-hidden border border-primary rounded-md shadow-sm hover:shadow-md transition-all group w-fit"
              >
                <div className="bg-primary text-white px-4 py-3.5 flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="bg-white px-5 py-3 flex items-center text-primary font-bold text-base tracking-tight group-hover:text-primary/80 transition-colors border-l border-primary/20">
                  {phoneDisplay}
                </div>
              </a>
            </div>
          </div>


          {/* Right Column: Quote Form matching the inspiration */}
          <div className="bg-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight mb-6">
              Get A Free Quote
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-800">
                  Quote Request Received!
                </h4>
                <p className="text-sm text-emerald-700">
                  Thank you for reaching out. One of our solution specialists will review your requirements and get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-emerald-700 underline hover:text-emerald-900"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                    {error}
                  </div>
                )}

                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Mobile & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      placeholder="Your Mobile"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      {servicesList.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <textarea
                    rows={5}
                    required
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Row 4: Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Now</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
