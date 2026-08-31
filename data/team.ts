export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "ceo",
    name: "Aboubacarr Yarbo",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "chief-engineer",
    name: "Ibrahim Jallow",
    role: "Chief Civil Engineer",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "head-arch",
    name: "Fatoumatta Ceesay",
    role: "Head Architect",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "project-manager",
    name: "Musa Darboe",
    role: "Senior Project Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "foreman",
    name: "Omar Touray",
    role: "Site Foreman",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "materials-head",
    name: "Isatou Saine",
    role: "Head of Procurement",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
  },
];
