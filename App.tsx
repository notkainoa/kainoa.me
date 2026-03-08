import React, { useState, useEffect } from 'react';
import { NAME, TAGLINE, ABOUT, EXPERIENCE, PROJECTS, SOCIALS } from './constants';
import { WorkList } from './components/WorkList';
import { ProjectList } from './components/ProjectList';

const App: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("k@kainoa.me");
      setToastMessage("Email copied to clipboard");
    } catch {
      setToastMessage("Failed to copy email");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 font-sans selection:bg-neutral-700 selection:text-white">
      {/* 
        Main Layout Constraints:
        - max-w-[600px] 
        - centered (mx-auto)
        - 128px margin block (py-32)
        - 24px margin inline (px-6)
      */}
      <main className="max-w-[600px] mx-auto px-6 py-32 flex flex-col gap-16">
        
        {/* Header / Intro */}
        <header className="flex flex-col gap-6">
          <h1 className="font-medium text-white tracking-tight">
            {NAME}
          </h1>
          <p className="text-neutral-400 leading-relaxed">
            {TAGLINE}
          </p>
        </header>

        {/* About */}
        <section>
          <h2 className="text-neutral-500 uppercase tracking-widest mb-6">About</h2>
          <div className="prose prose-invert prose-neutral max-w-none">
            <p className="text-neutral-400 leading-7 whitespace-pre-line">
              {ABOUT.trim()}
            </p>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-neutral-500 uppercase tracking-widest mb-6">Experience</h2>
          <WorkList jobs={EXPERIENCE} onCopyEmail={handleCopyEmail} />
        </section>

        {/* Projects */}
        <section className="-mx-6 px-6 sm:-mx-16 sm:px-16">
          <h2 className="text-neutral-500 uppercase tracking-widest mb-6">Projects</h2>
          <ProjectList projects={PROJECTS} />
        </section>

        {/* Connect / Socials */}
        <section>
          <h2 className="text-neutral-500 uppercase tracking-widest mb-6">Connect</h2>
          <div className="flex flex-col gap-3">
            {SOCIALS.map((social) => {
              const isEmail = social.name === "Email";
              return (
                <a
                  key={social.name}
                  href={isEmail ? "#" : social.url}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  onClick={isEmail ? handleCopyEmail : undefined}
                  className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group no-underline"
                >
                  <span className="min-w-[80px] text-neutral-500">{social.name}</span>
                  <span className="group-hover:underline underline-offset-4 decoration-neutral-700">
                    {social.handle}
                  </span>
                  <svg 
                    className="w-3 h-3 text-neutral-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              );
            })}
          </div>
        </section>
        
        {/* Footer */}
        <footer className="pt-12 border-t border-neutral-800/50 flex justify-between items-center text-neutral-600">
          <span>© {new Date().getFullYear()} {NAME}</span>
          <span>SF
</span>
        </footer>

      </main>

      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="toast-enter bg-neutral-800 text-neutral-200 px-4 py-2.5 rounded-lg shadow-lg border border-neutral-700 flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
