"use client";

import { motion } from "framer-motion";
import type { Service } from "@/data/services";
import { fadeIn } from "@/lib/motion";
import { SteppedServiceCard } from "@/components/sections/stepped-service-card";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCardClient({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeIn("up", "tween", index * 0.02, 0.25)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.01 }}
      className="flex flex-col h-full"
    >
      <SteppedServiceCard service={service} />
    </motion.div>
  );
}

