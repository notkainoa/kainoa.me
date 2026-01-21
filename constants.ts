import { Job, Project, Social } from './types';

export const NAME = "Kainoa Newton";
export const TITLE = "Software Engineer";
export const TAGLINE = "High School Student - Interested in AI Product/Dev";

export const ABOUT = `
I'm a student who's recently been obsessed with AI coding. It's become so easy to prototype new ideas in just minutes, magic!

I'm also interested in how we can build products around AI in ways that feel natural and intuitive.
`;

export const EXPERIENCE: Job[] = [
  {
    company: "Your Company?",
    role: "Intern",
    start: "",
    end: "",
    description: "Contact me",
    link: "mailto:k@kainoa.me"
  },
  {
    company: "Emdash (unofficial)",
    role: "Contributor",
    start: "Present",
    end: "",
    description: "Thinking about, designing, and implementing useful features and functionality as an open source contributor.",
    link: "#"
  },
  {
    company: "Gumloop",
    role: "Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    description: "Gained proficiency in creating AI workflow automations in Gumloop.",
    link: "#"
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Raceday",
    description: "Get insights on your training to perform at your best on raceday.",
    tech: ["Mobile app", "In development"]
  },
  {
    title: "Sleep Share",
    description: "Strava but for sleep. Keep your friends accountable!",
    link: "https://sleepshare.fun",
    tech: ["Mobile app", "In development"]
  },
  {
    title: "Run Utils",
    description: "Collection of running related utilities.",
    tech: ["Mobile app"]
  },
  {
    title: "Bay Clock",
    description: "Shows your personal school schedule, for Bay school sf.",
    link: "https://github.com/lucaskchang/bay-clock-3",
    tech: ["Web app", "Open Source"]
  },
  {
    title: "Draw",
    description: "Excalidraw plus but its free and open source.",
    link: "https://github.com/notkainoa/draw",
    tech: ["Excalidraw", "Web app", "Open Source"]
  },
  {
    title: "Emblemic",
    description: "Browser-based app icon designer with pixel art tools, gradients, and noise textures.",
    link: "https://github.com/notkainoa/Emblemic",
    tech: ["Web app", "Open Source"]
  },
  {
    title: "Athletic.net Data Extractor",
    description: "Chrome extension to copy or download race results from athletic.net with one click.",
    link: "https://github.com/notkainoa/athletic.net-data-extractor",
    tech: ["Chrome Extension", "Open Source"]
  },
  {
    title: "Google Stitch Image Paste",
    description: "Chrome extension that lets you paste images straight into stitch.withgoogle.com for instant uploads.",
    link: "https://github.com/notkainoa/Google-Stitch-Image-Paste",
    tech: ["Chrome Extension", "Open Source"]
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
