import type {
  Project,
  SkillCategory,
  Certification,
  LabExperiment,
  TimelineEntry,
} from "~/types/portfolio";

export const SKILLS: SkillCategory[] = [
  {
    label: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"],
  },
  {
    label: "Frameworks & Libraries",
    skills: ["React", "Node.js", "Express", "Flutter", "TailwindCSS", "Flask"],
  },
  {
    label: "Tools & Platforms",
    skills: ["Git", "Cisco Packet Tracer", "MATLAB", "Firebase"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "inventory-system",
    title: "Villahermosa Inventory System",
    description:
      "A mobile inventory management app built with Flutter for a local business. Features real-time stock tracking, low-stock alerts, and a clean dashboard for owners to monitor daily operations.",
    techStack: ["Flutter", "Dart", "Firebase"],
    githubUrl: "https://github.com/jechdeias/villahermosa-inventory",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    featured: true,
  },
  {
    id: "sta-cruz-hotels",
    title: "Sta Cruz Hotels Booking App",
    description:
      "A hotel booking mobile app for Sta Cruz, featuring room browsing, availability checking, and seamless reservation management for guests and hotel staff.",
    techStack: ["Flutter", "Firebase", "NoSQL"],
    videoUrl: "https://www.youtube.com/embed/B02Dz8nC6Zo",
    featured: true,
  },
  {
    id: "portfolio-site",
    title: "This Portfolio",
    description:
      "A handcrafted portfolio with a cottagecore aesthetic. Built with React Router 7, TailwindCSS v4, and a lot of love for typographic detail.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: false,
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Software Development with GitHub Copilot",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "January 2026",
    image: "/certificates/software-development-with-github-copilot.png",
  },
  {
    title: "Intermediate Git",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "January 2026",
    image: "/certificates/intermediate-git.png",
  },
  {
    title: "Introduction to Git",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "December 2025",
    image: "/certificates/introduction-to-git.png",
  },
  {
    title: "Cleaning Data with Generative AI",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "December 2025",
    image: "/certificates/cleaning-data-with-generative-ai.png",
  },
  {
    title: "Software Development with Windsurf",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "December 2025",
    image: "/certificates/software-development-with-windsurf.png",
  },
  {
    title: "AI-Assisted Coding for Developers",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "December 2025",
    image: "/certificates/ai-assisted-coding-for-developers.png",
  },
  {
    title: "Understanding Data Engineering",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "November 2025",
    image: "/certificates/understanding-data-engineering.png",
  },
  {
    title: "Understanding Machine Learning",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "November 2025",
    image: "/certificates/understanding-machine-learning.png",
  },
  {
    title: "Understanding Data Science",
    issuer: "DataCamp",
    issuerInitial: "D",
    date: "November 2025",
    image: "/certificates/understanding-data-science.png",
  },
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    title: "Signal Processing & Fourier Analysis",
    tool: "MATLAB",
    description:
      "Explored frequency-domain analysis of audio signals using the Fast Fourier Transform. Applied windowing techniques and visualized spectrograms to understand signal composition.",
    tags: ["DSP", "FFT", "Signal Analysis", "Audio"],
    repoUrl: "#",
  },
  {
    title: "Enterprise Network Simulation",
    tool: "Cisco Packet Tracer",
    description:
      "Designed and simulated a multi-floor enterprise network with VLANs, inter-VLAN routing, DHCP, and ACLs. Verified connectivity and security policies across all segments.",
    tags: ["Networking", "VLAN", "Routing", "DHCP", "ACL"],
    repoUrl: "#",
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    org: "University Computer Society",
    role: "Web Development Lead",
    type: "org",
    startDate: "Aug 2024",
    endDate: "Present",
    description:
      "Leading a team of student developers building internal tools and organizing workshops on modern web technologies for club members.",
  },
  {
    org: "Local Tech Startup",
    role: "Software Development Intern",
    type: "internship",
    startDate: "Jun 2024",
    endDate: "Aug 2024",
    description:
      "Contributed to the frontend of a SaaS dashboard, implementing data visualization components and improving mobile responsiveness across the platform.",
  },
  {
    org: "Community Coding Bootcamp",
    role: "Volunteer Instructor",
    type: "volunteer",
    startDate: "Jan 2024",
    endDate: "May 2024",
    description:
      "Taught introductory Python and web development to high school students from underrepresented communities, mentoring 20+ learners through their first projects.",
  },
];

export const PERSONAL = {
  name: "Jehdeiah Shane G. Par",
  tagline: "I build things that work beautifully — and feel human.",
  email: "jehdeiahshane@gmail.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  bio: `I'm a computer engineering student with a soft spot for elegant interfaces and systems that feel inevitable once you see them. When I'm not debugging at midnight, I'm reading about design, experimenting with new tools, or tending to a small collection of houseplants.

I believe good software is a lot like good writing — it should be clear, considered, and a little bit surprising. I'm always looking for projects where I can bring that sensibility to life.`,
};
