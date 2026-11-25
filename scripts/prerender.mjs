// Runs after `vite build` and the SSR build (see the "build" script in package.json).
//
// 1. Renders the app to HTML and puts it inside <div id="root">, so crawlers and
//    AI tools that don't run JavaScript still see the bio, projects and links.
// 2. Adds JSON-LD structured data about Kainoa to the <head>.
// 3. Writes llms.txt and sitemap.xml from constants.ts, so they never drift from the page.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, '.ssr');
const SITE = 'https://kainoa.me';

const { render, NAME, EXPERIENCE, PROJECTS, SOCIALS } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const socialUrl = (name) => SOCIALS.find((s) => s.name === name)?.url;
const email = SOCIALS.find((s) => s.name === 'Email')?.handle;
// The "Your Company?" card is a call to action, not a real job.
const jobs = EXPERIENCE.filter((job) => job.start && job.company !== 'Your Company?');

// --- index.html ---------------------------------------------------------------

const indexPath = path.join(dist, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const replaceOnce = (marker, value) => {
  if (!html.includes(marker)) throw new Error(`prerender: "${marker}" not found in dist/index.html`);
  html = html.replace(marker, () => value);
};

replaceOnce('<div id="root"></div>', `<div id="root">${render()}</div>`);

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE}/`,
  url: `${SITE}/`,
  name: NAME,
  mainEntity: {
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: NAME,
    givenName: 'Kainoa',
    familyName: 'Newton',
    url: `${SITE}/`,
    email: email ? `mailto:${email}` : undefined,
    description:
      "Student at Pitzer College who's obsessed with making cool software with AI. Designing a custom major across the Claremont Colleges combining Agentic Software Development and Human Computer Interaction.",
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Pitzer College', url: 'https://www.pitzer.edu/' },
    knowsAbout: ['AI products', 'Agentic software development', 'Human-computer interaction', 'Mac apps'],
    sameAs: [socialUrl('GitHub'), socialUrl('X/Twitter'), socialUrl('LinkedIn')].filter(Boolean),
  },
};
// Escape "<" so nothing in the data can close the <script> tag early.
const jsonLd = JSON.stringify(structuredData).replace(/</g, '\\u003c');
replaceOnce('<!--structured-data-->', `<script type="application/ld+json">${jsonLd}</script>`);

fs.writeFileSync(indexPath, html);

// --- llms.txt -------------------------------------------------------------------

const line = (text, link, rest) => `- ${link ? `[${text}](${link})` : text}${rest ? `: ${rest}` : ''}`;
const sentence = (text) => (/[.!?]$/.test(text) ? text : `${text}.`);

const llms = `# ${NAME}

> ${NAME} is a student at Pitzer College who's obsessed with making cool software with AI and interested in AI product. Designing a custom major across the Claremont Colleges combining Agentic Software Development and Human Computer Interaction.

Website: ${SITE}/
Location: San Francisco, California
${email ? `Email: ${email} (open to internships)\n` : ''}
## Projects

${PROJECTS.map((p) => {
  const tags = [...(p.tech ?? []), ...(p.status ? [p.status] : [])].join(', ');
  return line(p.title, p.link, `${sentence(p.description)}${tags ? ` (${tags})` : ''}`);
}).join('\n')}
- [All open source projects](https://github.com/notkainoa?tab=repositories&type=source)

## Experience

${jobs
  .map((job) => {
    const dates = job.end ? `${job.start} – ${job.end}` : job.start;
    return line(job.company, job.link, `${job.role}, ${dates}.${job.description ? ` ${sentence(job.description)}` : ''}`);
  })
  .join('\n')}

## Links

${SOCIALS.filter((s) => s.name !== 'Email')
  .map((s) => line(s.name, s.url, s.handle))
  .join('\n')}
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

// --- sitemap.xml ----------------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('prerender: wrote dist/index.html, dist/llms.txt, dist/sitemap.xml');
