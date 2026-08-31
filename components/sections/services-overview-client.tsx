"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  BarChart3,
  Code2,
  Shield,
  Building2,
  Laptop,
  Layout,
  Calculator,
  Map,
  HardHat,
  Hammer,
  Leaf,
  Wrench,
  DoorOpen,
  Table,
  Layers,
  Truck,
  Package,
} from "lucide-react";
import { fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
const iconMap: Record<string, IconComponent> = {
  ClipboardList,
  BarChart3,
  Code2,
  Shield,
  Building2,
  Laptop,
  Layout,
  Calculator,
  Map,
  HardHat,
  Hammer,
  Leaf,
  Wrench,
  DoorOpen,
  Table,
  Layers,
  Truck,
  Package,
};

interface Service {
  id: string;
  slug?: string | null;
  title: string;
  description: string;
  icon: string;
}

export function ServicesOverviewClient({ services }: { services: Service[] }) {
  return (
    <div className="relative group/carousel">
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon] || Code2;
          return (
            <motion.div
              key={service.id}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="flex-shrink-0 w-[95%] sm:w-[450px] md:w-auto snap-center flex flex-col"
            >
              <Tilt
                options={{ max: 45, scale: 1.02, speed: 450 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-border flex flex-col justify-between items-start h-full"
              >
                <div className="w-full">
                  {/* Icon Container */}
                  <div className="bg-primary/10 p-3 rounded-lg inline-flex items-center justify-center mb-4 ring-1 ring-primary/20">
                    <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-secondary mb-2 leading-snug tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </Tilt>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile indicator */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {services.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/25" />
        ))}
      </div>
    </div>
  );
}
