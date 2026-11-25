// Server entry, used only at build time by scripts/prerender.mjs to turn the app
// into static HTML so search engines and AI crawlers see the content without
// running JavaScript.
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export { NAME, ABOUT_LEAD, EXPERIENCE, PROJECTS, SOCIALS } from './constants';

export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
