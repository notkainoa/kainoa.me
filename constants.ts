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
    company: "Stealth Startup",
    role: "Senior Frontend Engineer",
    start: "2023",
    end: "Present",
    description: "Leading the frontend architecture using Next.js and Tailwind.",
    link: "#"
  },
  {
    company: "Tech Corp",
    role: "Software Engineer",
    start: "2021",
    end: "2023",
    description: "Developed and maintained design systems used by 50+ engineers.",
    link: "#"
  },
  {
    company: "Open Source",
    role: "Contributor",
    start: "2020",
    end: "Present",
    description: "Contributing to various React ecosystem libraries.",
    link: "https://github.com/notkainoa"
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