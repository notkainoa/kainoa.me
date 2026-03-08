import { Job, Project, Social } from './types';

export const NAME = "Kainoa Newton";
export const TITLE = "Software Engineer";
export const TAGLINE = "High School Student - Interested in AI Product";

export const ABOUT = `
I'm a High School Student who's recently been obsessed with AI coding. It's become so easy to prototype new ideas in just minutes!

I've also been building / experimenting a lot with AI Coding Orchestration tools.
`;

export const ABOUT_LEAD = "Interested in AI product.";

export const EXPERIENCE: Job[] = [
  {
    company: "Your Company?",
    role: "Intern",
    start: "Now?",
    end: "",
    description: "Contact me",
    link: "mailto:k@kainoa.me"
  },
  {
    company: "Emdash",
    role: "OSS Contributor (unofficial)",
    start: "Oct 2025",
    end: "Feb 2026",
    description: "Thinking up, designing, and implementing useful features and functionality as an open source contributor.",
    link: "https://emdash.sh"
  },
  {
    company: "Gumloop",
    role: "Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    description: "Learned how to create powerful AI workflow automations in Gumloop. Helped out around the office.",
    link: "https://www.gumloop.com"
  },
];

export const PROJECTS: Project[] = [
  // In Development
  {
    title: "Raceday",
    description: "Get suggestions and insights to perform at your best on raceday.",
    tech: ["Mobile app"],
    category: "development"
  },
  {
    title: "Sleep Share",
    description: "Strava but for sleep.",
    link: "https://sleepshare.fun",
    tech: ["Mobile app"],
    category: "development"
  },
  {
    title: "Run Utils",
    description: "Collection of running related utilities.",
    tech: ["Mobile app"],
    category: "development"
  },
  // Projects
  {
    title: "kainoa.me",
    description: "This website.",
    link: "https://github.com/notkainoa/kainoa.me",
    tech: ["Web app"],
    category: "projects"
  },
  {
    title: "Bay Clock",
    description: "Nice UI your personal school schedule.",
    link: "https://github.com/lucaskchang/bay-clock-3",
    tech: ["Web app"],
    category: "projects"
  },
  {
    title: "Draw",
    description: "Excalidraw plus but its free and open source.",
    link: "https://github.com/notkainoa/draw",
    tech: ["Excalidraw", "Web app"],
    category: "projects"
  },
  {
    title: "Emblemic",
    description: "Simple browser-based app icon designer.",
    link: "https://github.com/notkainoa/Emblemic",
    tech: ["Web app"],
    category: "projects"
  },
  // OSS
  {
    title: "T3 Code",
    description: "A GUI for orchestrating coding agents.",
    link: "https://github.com/t3dotgg/t3-code",
    tech: ["VS Code Extension"],
    category: "oss"
  },
  {
    title: "Emdash",
    description: "Orchestrate cli coding agents through terminal views.",
    link: "https://emdash.sh",
    tech: ["Web app"],
    category: "oss"
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
    name: "X/Twitter",
    url: "https://x.com/kainoabhn",
    handle: "@kainoabhn"
  },
  {
    name: "Email",
    url: "mailto:k@kainoa.me", // Placeholder
    handle: "k@kainoa.me"
  }
];
