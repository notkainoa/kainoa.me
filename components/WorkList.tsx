import React, { useState, useEffect } from 'react';
import { Job } from '../types';

interface WorkListProps {
  jobs: Job[];
}

export const WorkList: React.FC<WorkListProps> = ({ jobs }) => {
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
    <>
      <div className="flex flex-col gap-6">
        {jobs.map((job, index) => {
          const isYourCompany = job.company === "Your Company?";
          const isPlaceholder = !job.start && !job.end;
          return (
            <a
              key={index}
              href={isYourCompany ? "#" : job.link}
              target={isYourCompany ? undefined : "_blank"}
              rel={isYourCompany ? undefined : "noopener noreferrer"}
              onClick={isYourCompany ? handleCopyEmail : undefined}
              className={`group block no-underline ${isPlaceholder ? 'opacity-75' : ''}`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`font-medium text-neutral-200 ${(isPlaceholder && !isYourCompany) || !isPlaceholder ? 'group-hover:text-blue-400 transition-colors' : ''} ${isPlaceholder ? 'text-neutral-400' : ''}`}>
                  {job.company}
                </h3>
                <span className="text-neutral-500 tabular-nums">
                  {job.end ? `${job.start} — ${job.end}` : job.start}
                </span>
              </div>
              <div className="text-neutral-400">
                {job.role}
              </div>
              {job.description && (
                <div className={`text-neutral-500 mt-1 leading-relaxed max-w-[90%] ${isPlaceholder ? 'group-hover:text-blue-400 transition-colors' : ''}`}>
                  {job.description}
                </div>
              )}
            </a>
          );
        })}
      </div>

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
    </>
  );
};