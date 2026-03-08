import React, { useState, useEffect } from 'react';
import { NAME, TAGLINE, ABOUT, ABOUT_LEAD, EXPERIENCE, PROJECTS, SOCIALS } from './constants';
import { WorkList } from './components/WorkList';
import { ProjectList } from './components/ProjectList';

const App: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; success: boolean } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const emailAddress = SOCIALS.find((s) => s.name === "Email")?.handle;

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!emailAddress) {
      setToast({ message: "Failed to copy email", success: false });
      return;
    }
    try {
      await navigator.clipboard.writeText(emailAddress);
      setToast({ message: "Email copied to clipboard", success: true });
    } catch {
      setToast({ message: "Failed to copy email", success: false });
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
              <span className="italic text-[17px] font-normal leading-[28px]" style={{ fontFamily: 'Newsreader, Signifier, Times, serif', fontFeatureSettings: 'normal', color: '#f2f2f2' }}>
                {ABOUT_LEAD}
              </span>
              {" "}{ABOUT.trim()}
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-7 mb-7 -mx-6 px-6 sm:-mx-16 sm:px-16">
          <ProjectList projects={PROJECTS} />
        </section>

        {/* Experience */}
        <section className="mb-7">
          <h2 className="font-inter text-[#E5E5E5] mb-7 leading-[28px] tracking-tight" style={{ fontWeight: '500', fontFeatureSettings: '"calt", "case", "kern"' }}>Experience</h2>
          <WorkList jobs={EXPERIENCE} onCopyEmail={handleCopyEmail} />
        </section>

        {/* Connect / Socials */}
        <section>
          <h2 className="font-inter text-[#E5E5E5] mb-7 leading-[28px]" style={{ fontFeatureSettings: '"calt", "case", "kern"' }}>Connect</h2>
          <p className="text-[#E5E5E5] leading-[28px]">
            Reach me at{' '}
            <a href="https://x.com/kainoabhn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4">@kainoabhn</a>
            {' or '}
            <a href="#" onClick={handleCopyEmail} className="hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4">k@kainoa.me</a>
            {' '}
            <a
              href="https://github.com/notkainoa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E5E5E5] hover:text-white transition-colors inline-flex items-center align-baseline"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] relative top-[2px]">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            {' '}
            <a
              href="https://www.linkedin.com/in/kainoa-newton-36b193307/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E5E5E5] hover:text-white transition-colors inline-flex items-center align-baseline"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] relative top-[2px]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </p>
        </section>
        
        {/* Footer */}
        <footer className="mt-7 pt-12 border-t border-neutral-800/50 flex justify-between items-center text-[#E5E5E5] text-[16px] leading-[28px]">
          <span>{NAME}</span>
          <span>SF
</span>
        </footer>

      </main>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="toast-enter bg-neutral-800 text-neutral-200 px-4 py-2.5 rounded-lg shadow-lg border border-neutral-700 flex items-center gap-2 text-sm">
            {toast.success ? (
              <svg className="w-4 h-4 text-green-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            )}
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
