import React, { useState, useEffect } from 'react';
import { NAME, TAGLINE, ABOUT, ABOUT_LEAD, EXPERIENCE, PROJECTS, SOCIALS } from './constants';
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
    <div className="min-h-screen bg-[#1A1A1A] text-neutral-200 font-sans text-base selection:bg-neutral-700 selection:text-white" style={{ fontFeatureSettings: '"frac", "kern", "ss02"' }}>
      {/* 
        Main Layout Constraints:
        - max-w-[600px] 
        - centered (mx-auto)
        - 128px margin block (py-32)
        - 24px margin inline (px-6)
      */}
      <main className="max-w-[750px] mx-auto px-6 py-32 flex flex-col gap-[28px]">
        
        {/* Header / Intro */}
        <header className="flex flex-col gap-6">
          <h1 className="font-inter font-normal text-[#E5E5E5] leading-[28px]" style={{ fontFeatureSettings: '"calt", "case", "kern"', fontWeight: '400' }}>
            {NAME}
          </h1>
        </header>

        {/* About */}
        <section>
          <div className="prose prose-invert prose-neutral max-w-none">
            <p className="text-[#E5E5E5] leading-[28px] whitespace-pre-line opacity-100">
              <span className="italic text-[16px] font-normal leading-[28px]" style={{ fontFamily: 'Newsreader, Signifier, Times, serif', fontFeatureSettings: 'normal', color: '#f2f2f2' }}>
                {ABOUT_LEAD}
              </span>
              {" "}{ABOUT.trim()}
            </p>
          </div>
        </section>

        {/* Experience */}
        <section>
          <h2 className="font-inter text-[#E5E5E5] mb-6 leading-[28px]" style={{ fontFeatureSettings: '"calt", "case", "kern"' }}>Experience</h2>
          <WorkList jobs={EXPERIENCE} onCopyEmail={handleCopyEmail} />
        </section>

        {/* Projects */}
        <section className="-mx-6 px-6 sm:-mx-16 sm:px-16 mt-7 mb-7">
          <ProjectList projects={PROJECTS} />
        </section>

        {/* Connect / Socials */}
        <section>
          <h2 className="font-inter text-[#E5E5E5] mb-6 leading-[28px]" style={{ fontFeatureSettings: '"calt", "case", "kern"' }}>Connect</h2>
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
                  className="flex items-center gap-3 text-[#E5E5E5] hover:text-white transition-colors group no-underline"
                >
                  <span className="min-w-[80px] text-[#E5E5E5] leading-[28px]">{social.name}</span>
                  <span className="group-hover:underline underline-offset-4 decoration-neutral-700 leading-[28px]">
                    {social.handle}
                  </span>
                  <svg 
                    className="w-3 h-3 text-[#E5E5E5] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" 
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
        <footer className="pt-12 border-t border-neutral-800/50 flex justify-between items-center text-[#E5E5E5] text-[16px] leading-[28px]">
          <span>{NAME}</span>
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
