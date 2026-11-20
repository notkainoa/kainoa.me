import { Job, Project, Social } from './types';

export const NAME = "Kainoa Newton";
export const TITLE = "Software Engineer";
export const TAGLINE = "College Student - Interested in AI Product";

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
    company: "T3 Code",
    role: "OSS Contributor (unofficial)",
    start: "Mar 2026",
    end: "Present",
    description: "A GUI for orchestrating coding agents. Shipped UI improvements like collapsing long messages by default, and now working on thread snoozing and per-project windows.",
    link: "https://github.com/pingdotgg/t3code"
  },
  {
    company: "Emdash",
    role: "OSS Contributor (unofficial)",
    start: "Oct 2025",
    end: "Feb 2026",
    description: "A desktop app for orchestrating CLI coding agents. Shipped 16 merged PRs, including attaching GitHub issues to workspaces, per-workspace terminal tabs, and a better PR creation flow.",
    link: "https://github.com/generalaction/emdash"
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
  // Column 1 (Current)
  {
    title: "Aplos Mail",
    description: "Only the emails you need to see, one by one. In a beautiful, keyboard-first app. With built-in Calendar and AI.",
    shortDescription: "Only the emails you need to see, one by one",
    link: "https://aplos.email",
    tech: ["Mac app"],
    column: 1
  },
  {
    title: "5C Dining",
    description: "Beautiful dining hall menus for the Claremont Colleges",
    shortDescription: "Dining hall menus for 5Cs",
    link: "https://github.com/notkainoa/5CDining",
    tech: ["Mobile app"],
    column: 1
  },
  {
    title: "Rac Browser",
    description: "Arc + Dia + Aside on top of Helium's speed and privacy. Open source.",
    shortDescription: "Arc + Dia + Aside, oss",
    link: "https://racbrowser.com",
    status: "coming soon",
    tech: ["Mac app"],
    column: 1
  },
  // Column 2 (Current)
  {
    title: "Better T3 Notch",
    description: "T3 Code status in your notch. Answer, approve or stop your agents without leaving your app.",
    shortDescription: "T3 Code status in your notch",
    link: "https://notch.kainoa.me",
    tech: ["Mac app"],
    column: 2
  },
  {
    title: "Restless",
    description: "Keep your Mac awake with the lid closed. Actually! SSH, builds and AI agents keep running.",
    shortDescription: "Keep your Mac awake, lid closed",
    link: "https://restless.kainoa.me",
    tech: ["Mac app"],
    column: 2
  },
  {
    title: "5C Menu API",
    description: "The API behind 5C Dining. Menus for all seven dining halls, refreshed every hour. With a CLI and MCP server too.",
    shortDescription: "The API behind 5C Dining",
    link: "https://github.com/notkainoa/5CMenuAPI",
    tech: ["API", "CLI", "MCP"],
    column: 2
  },
  {
    title: "5C Index",
    description: "Search courses at the Claremont Colleges from your terminal or agent. A CLI, MCP server and agent skill.",
    shortDescription: "Search 5C courses from your agent",
    link: "https://github.com/notkainoa/5C-Index",
    tech: ["CLI", "MCP"],
    column: 2
  },
  // Column 3 (Maintained)
  {
    title: "kainoa.me",
    description: "This website. You're looking at it! Built with React, Vite and Tailwind.",
    shortDescription: "This website",
    link: "https://github.com/notkainoa/kainoa.me",
    tech: ["Web app"],
    column: 3
  },
  {
    title: "More Minimal Twitter",
    description: "Extension that makes X/Twitter cleaner and more customizable. Hide trends, ads, view counts and Grok.",
    shortDescription: "Extension that makes X/Twitter cleaner",
    link: "https://github.com/notkainoa/more-minimal-twitter",
    tech: ["Browser extension"],
    column: 3
  },
  {
    title: "Apple Symbol Catalog",
    description: "Search every Apple SF Symbol in one easy catalog, right in your browser.",
    shortDescription: "Search every SF Symbol",
    link: "https://github.com/notkainoa/apple-symbol-catalog",
    tech: ["Web app"],
    column: 3
  },
  {
    title: "SimplyBuild",
    description: "One command to build, deploy and launch your iOS app. A smart CLI wrapper around XcodeBuildMCP.",
    shortDescription: "One command to build your iOS app",
    link: "https://github.com/notkainoa/SimplyBuild",
    tech: ["CLI"],
    column: 3
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
    url: "https://x.com/notKainoa",
    handle: "@notKainoa"
  },
  {
    name: "Email",
    url: "mailto:k@kainoa.me", // Placeholder
    handle: "k@kainoa.me"
  }
];
