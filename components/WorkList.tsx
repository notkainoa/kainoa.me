import React from 'react';
import { Job } from '../types';

interface WorkListProps {
  jobs: Job[];
  onCopyEmail: (e: React.MouseEvent) => void;
}

export const WorkList: React.FC<WorkListProps> = ({ jobs, onCopyEmail }) => {
  return (
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
            onClick={isYourCompany ? onCopyEmail : undefined}
            className={`group block no-underline ${isPlaceholder ? 'opacity-75' : ''}`}
          >
            <div className="flex justify-between items-baseline mb-1">
              <h3 className={`font-normal text-[#E5E5E5] leading-[28px] ${(isPlaceholder && !isYourCompany) || !isPlaceholder ? 'group-hover:text-blue-400 transition-colors' : ''} ${isPlaceholder ? 'text-neutral-400' : ''}`} style={{ fontWeight: '400' }}>
                {job.company}
              </h3>
              <span className="text-[#E5E5E5] tabular-nums leading-[28px]">
                {job.end ? `${job.start} — ${job.end}` : job.start}
              </span>
            </div>
            <div className="text-[#E5E5E5] leading-[28px]">
              {job.role}
            </div>
            {job.description && (
              <div className={`text-[#E5E5E5] mt-1 leading-[28px] max-w-[90%] ${isPlaceholder ? 'group-hover:text-blue-400 transition-colors' : ''}`}>
                {job.description}
              </div>
            )}
          </a>
        );
      })}
    </div>
  );
};