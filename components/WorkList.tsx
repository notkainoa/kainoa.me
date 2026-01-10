import React from 'react';
import { Job } from '../types';

interface WorkListProps {
  jobs: Job[];
}

export const WorkList: React.FC<WorkListProps> = ({ jobs }) => {
  return (
    <div className="flex flex-col gap-6">
      {jobs.map((job, index) => {
        const isYourCompany = job.company === "Your Company?";
        const isPlaceholder = !job.start && !job.end;
        return (
          <a
            key={index}
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block no-underline ${isPlaceholder ? 'opacity-75' : ''}`}
          >
            <div className="flex justify-between items-baseline mb-1">
              <h3 className={`font-medium text-neutral-200 ${(isPlaceholder && !isYourCompany) || !isPlaceholder ? 'group-hover:text-blue-400 transition-colors' : ''} ${isPlaceholder ? 'text-neutral-400' : ''}`}>
                {job.company}
              </h3>
              <span className="text-neutral-500 tabular-nums">
                {job.start} — {job.end}
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
  );
};