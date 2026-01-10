import { Job, Project, Social } from './types';

export const NAME = "Kainoa Newton";
export const TITLE = "Software Engineer";
export const TAGLINE = "Building accessible, high-performance web applications.";

export const ABOUT = `
I am a software engineer passionate about building high-quality digital experiences. 
I specialize in React, TypeScript, and modern web technologies. 
I enjoy dissecting complex problems and turning them into simple, elegant interfaces.
Currently, I'm focused on exploring the intersection of AI and UI/UX.
`;

export const EXPERIENCE: Job[] = [
  {
    company: "Your Company?",
    role: "Intern",
    start: "",
    end: "",
    description: "Contact me",
    link: "mailto:hello@kainoa.me"
  },
  {
    company: "Gumloop",
    role: "Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    description: "Gained proficiency in creating AI workflow automations in Gumloop.",
    link: "#"
  },
  {
    company: "Other Irrelevant Jobs",
    role: "",
    start: "",
    end: "",
    description: "",
    link: "https://www.linkedin.com/in/kainoa-newton-36b193307/"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Gemini UI Wrapper",
    description: "A clean, efficient wrapper around Google's Gemini API for React developers.",
    link: "https://github.com/notkainoa",
    tech: ["TypeScript", "AI", "Node.js"]
  },
  {
    title: "Minimal Folio",
    description: "A lightweight portfolio template designed for speed and accessibility.",
    link: "https://github.com/notkainoa",
    tech: ["React", "Tailwind"]
  },
  {
    title: "DevTools Pro",
    description: "Browser extension helping developers debug React rendering issues.",
    link: "#",
    tech: ["Chrome Extension", "Performance"]
  }
];

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/notkainoa",
    handle: "@notkainoa"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kainoa-newton-36b193307/",
    handle: "Kainoa Newton"
  },
  {
    name: "Email",
    url: "mailto:hello@kainoa.me", // Placeholder
    handle: "hello@kainoa.me"
  }
];