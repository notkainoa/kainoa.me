### My simplistic portfolio site

Inspired by https://paco.me/ and https://emilkowal.ski/

### SEO and AI discovery

`npm run build` prerenders the page into static HTML (`scripts/prerender.mjs`), so search engines and AI crawlers see the full content without running JavaScript. The same step adds JSON-LD structured data and generates `llms.txt` and `sitemap.xml` from `constants.ts`, so editing a project or job there updates all of them. Static files (`robots.txt`, icons, `og.png` link-preview image) live in `public/`. Head tags (title, description, Open Graph) are in `index.html`.
