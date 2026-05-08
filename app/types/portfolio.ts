export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  issuerInitial: string;
  date: string;
  image?: string;
  credentialUrl?: string;
}

export interface LabExperiment {
  title: string;
  tool: "MATLAB" | "Cisco Packet Tracer" | string;
  description: string;
  tags: string[];
  repoUrl?: string;
}

export interface TimelineEntry {
  org: string;
  role: string;
  type: "internship" | "part-time" | "volunteer" | "full-time" | "org";
  startDate: string;
  endDate: string;
  description: string;
}
