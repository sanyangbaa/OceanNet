"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Check,
  ChevronDown,
  Clock,
  FolderOpen,
  Lightbulb,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { slideIn, textVariant, staggerContainer } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Please select a subject." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

const subjectOptions = [
  {
    value: "Project Inquiry",
    description: "Discuss a project or digital solution",
    icon: FolderOpen,
  },
  {
    value: "Consultation",
    description: "Plan a consultation with our team",
    icon: Lightbulb,
  },
  {
    value: "Support",
    description: "Get help with an existing service",
    icon: LifeBuoy,
  },
  {
    value: "Other",
    description: "Contact us about something else",
    icon: MessageSquare,
  },
];

export interface ContactClientProps {
  companyInfo: {
    contacts: {
      address: string;
      phone: string;
      email: string;
    };
  };
}

export function ContactClient({ companyInfo }: ContactClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });
  const subjectValue = useWatch({ control: form.control, name: "subject" });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setIsSuccess(true);
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        const errorData = await res.json();
        console.error("Submission failed:", errorData);
        alert(errorData.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-14 pb-12 min-h-screen bg-white overflow-x-hidden">
      {/* Hero Header with Animated Bubbles */}
      <SectionHeader
        subtitle="Get In Touch"
        title="Contact Us"
        description="Connect with our team to discuss innovative technology solutions that support your organization's digital transformation journey."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
        withBackground
        withBubbles
      />

      <section className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.01 }}
          className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16"
        >
          {/* Left Part: Contact Information with slideIn left */}
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex flex-col gap-10"
          >
            <div>
              <motion.h3
                variants={textVariant(0.1)}
                className="text-3xl font-black uppercase mb-4 tracking-tight text-secondary"
              >
                Let’s Build Together
              </motion.h3>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                Whether you are planning a new digital platform, modernising
                infrastructure, integrating systems or looking for ongoing ICT
                support, tell us what you need and our team will respond.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Tilt
                options={{ max: 8, scale: 1.01, speed: 450 }}
                className="bg-gray-50 p-6 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start"
              >
                <MapPin className="h-6 w-6 text-primary mb-4" />
                <h4 className="font-bold uppercase text-sm mb-2 text-secondary">
                  Main Office
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {companyInfo.contacts.address}
                </p>
              </Tilt>

              <Tilt
                options={{ max: 8, scale: 1.01, speed: 450 }}
                className="bg-gray-50 p-6 rounded-2xl border-l-4 border-secondary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start"
              >
                <Phone className="h-6 w-6 text-secondary mb-4" />
                <h4 className="font-bold uppercase text-sm mb-2 text-secondary">
                  Call Us
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {companyInfo.contacts.phone} <br />
                  <span className="text-xs text-muted-foreground">
                    WhatsApp
                  </span>
                </p>
              </Tilt>

              <Tilt
                options={{ max: 8, scale: 1.01, speed: 450 }}
                className="bg-gray-50 p-6 rounded-2xl border-l-4 border-secondary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start"
              >
                <Mail className="h-6 w-6 text-secondary mb-4" />
                <h4 className="font-bold uppercase text-sm mb-2 text-secondary">
                  Email Us
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {companyInfo.contacts.email}
                </p>
              </Tilt>

              <Tilt
                options={{ max: 8, scale: 1.01, speed: 450 }}
                className="bg-gray-50 p-6 rounded-2xl border-l-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start"
              >
                <Clock className="h-6 w-6 text-primary mb-4" />
                <h4 className="font-bold uppercase text-sm mb-2 text-secondary">
                  Working Hours
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mon - Thursday: 9:00 AM - 5:00 PM
                  <br />
                  Fri: 9:00 AM - 12:30 PM
                </p>
              </Tilt>
            </div>
          </motion.div>

          {/* Right Part: Contact Form with slideIn right */}
          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="bg-white -mx-4 px-4 py-8 rounded-none border-x-0 border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.07)] relative md:mx-0 md:rounded-3xl md:border md:p-10 md:shadow-lg"
          >
            <motion.h3
              variants={textVariant(0.1)}
              className="text-2xl font-black uppercase mb-6 tracking-tight text-secondary"
            >
              Send a Message
            </motion.h3>

            {isSuccess && (
              <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 mb-6 font-medium text-sm text-center">
                Your message has been sent successfully. We will get back to you
                soon!
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-bold uppercase tracking-widest text-gray-500"
                  >
                    Full Name
                  </label>
                  <input
                    {...form.register("name")}
                    id="name"
                    className={`w-full bg-gray-50 border ${form.formState.errors.name ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-widest text-gray-500"
                  >
                    Email Address
                  </label>
                  <input
                    {...form.register("email")}
                    id="email"
                    type="email"
                    className={`w-full bg-gray-50 border ${form.formState.errors.email ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-xs font-bold uppercase tracking-widest text-gray-500"
                  >
                    Phone Number
                  </label>
                  <input
                    {...form.register("phone")}
                    id="phone"
                    className={`w-full bg-gray-50 border ${form.formState.errors.phone ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                    placeholder="Phone Number (optional)"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-bold uppercase tracking-widest text-gray-500"
                  >
                    Subject
                  </label>
                  <SelectPrimitive.Root
                    name="subject"
                    value={subjectValue || null}
                    onValueChange={(value) =>
                      form.setValue("subject", value ?? "", {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectPrimitive.Trigger
                      id="subject"
                      aria-invalid={Boolean(form.formState.errors.subject)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-gray-50 px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${form.formState.errors.subject ? "border-red-500" : "border-gray-200 hover:border-primary/50"}`}
                    >
                      <SelectPrimitive.Value placeholder="Select a Subject" />
                      <SelectPrimitive.Icon>
                        <ChevronDown className="h-4 w-4 text-primary" />
                      </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>
                    <SelectPrimitive.Portal>
                      <SelectPrimitive.Positioner
                        sideOffset={8}
                        align="end"
                        className="z-50"
                      >
                        <SelectPrimitive.Popup className="w-(--anchor-width) max-w-[calc(100vw-2rem)] rounded-2xl border border-primary/15 bg-white p-2 shadow-xl shadow-secondary/10 outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 lg:w-72">
                          <SelectPrimitive.List className="space-y-1">
                            {subjectOptions.map((option) => (
                              <SelectPrimitive.Item
                                key={option.value}
                                value={option.value}
                                className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-secondary outline-none transition-colors data-highlighted:border-primary/15 data-highlighted:bg-primary/5 data-selected:bg-primary/10"
                              >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                                  <option.icon
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-sm font-semibold">
                                    {option.value}
                                  </span>
                                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                    {option.description}
                                  </span>
                                </span>
                                <SelectPrimitive.ItemIndicator className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                  <Check
                                    aria-hidden="true"
                                    className="h-3 w-3"
                                  />
                                </SelectPrimitive.ItemIndicator>
                              </SelectPrimitive.Item>
                            ))}
                          </SelectPrimitive.List>
                        </SelectPrimitive.Popup>
                      </SelectPrimitive.Positioner>
                    </SelectPrimitive.Portal>
                  </SelectPrimitive.Root>
                  {form.formState.errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs font-bold uppercase tracking-widest text-gray-500"
                >
                  Your Message
                </label>
                <textarea
                  {...form.register("message")}
                  id="message"
                  rows={5}
                  className={`w-full bg-gray-50 border ${form.formState.errors.message ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none`}
                  placeholder="Tell us about your project..."
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white hover:bg-secondary hover:text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
