export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  description: string;
  status: "Completed" | "In Progress";
  year: number;
  location: string;
  scope: string[];
  gallery: string[];
  shortDescription?: string;
  technologies?: string[];
}

export const projects: Project[] = [
  {
    id: "saas-analytics-platform",
    title: "SaaS Analytics Platform",
    client: "InsightWorks Ltd.",
    category: "Web Development ",
    shortDescription:
      "Multi-tenant analytics platform providing real-time dashboards and customizable reports.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    description:
      "Built a scalable, multi-tenant analytics platform with real-time ETL pipelines, interactive dashboards, and role-based access control. The platform ingests data from multiple sources and delivers insights with sub-second query latency.",
    status: "Completed",
    year: 2024,
    location: "Remote / Cloud",
    scope: [
      "Multi-tenant architecture",
      "Real-time ETL",
      "Interactive Dashboards",
      "RBAC & SSO",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1526378727400-0b0b2a0aa0d3?auto=format&fit=crop&q=80&w=1200",
    ],
    technologies: ["Node.js", "React", "PostgreSQL", "Kafka", "Docker"],
  },
  {
    id: "mobile-health-app",
    title: "Mobile Health Companion",
    client: "HealthBridge",
    category: "Mobile Development",
    shortDescription:
      "Cross-platform mobile app for patient monitoring and teleconsultations.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    description:
      "A secure mobile application enabling remote patient monitoring, appointment scheduling, and teleconsultations. End-to-end encrypted messaging and HIPAA-conscious data handling were implemented.",
    status: "Completed",
    year: 2023,
    location: "Global",
    scope: [
      "Cross-platform app",
      "Secure messaging",
      "Remote monitoring",
      "Teleconsultation APIs",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=1200",
    ],
    technologies: ["React Native", "TypeScript", "Firebase"],
  },
  {
    id: "ecommerce-platform",
    title: "Headless E‑Commerce Platform",
    client: "CommerceFlow",
    category: "Web Development",
    shortDescription:
      "Fast, headless e-commerce backend with GraphQL APIs and composable storefront.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    description:
      "Designed and implemented a headless e-commerce backend exposing performant GraphQL APIs, flexible product modeling, and integration with multiple payment providers and CDNs for fast global delivery.",
    status: "In Progress",
    year: 2024,
    location: "Remote",
    scope: [
      "GraphQL API",
      "Payment Integrations",
      "Composable Storefront",
      "CDN Optimization",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1526378727400-0b0b2a0aa0d3?auto=format&fit=crop&q=80&w=1200",
    ],
    technologies: ["Next.js", "GraphQL", "Stripe"],
  },
];
