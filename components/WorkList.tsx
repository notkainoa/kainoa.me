import React from 'react';
import { Job } from '../types';

interface WorkListProps {
  jobs: Job[];
  onCopyEmail: (e: React.MouseEvent) => void;
}

export const WorkList: React.FC<WorkListProps> = ({ jobs, onCopyEmail }) => {
  return (
    <div className="relative">
      {/* Timeline line - runs through dot centers */}
      <div className="absolute left-[8px] top-0 bottom-0 w-px bg-gradient-to-b from-neutral-600/50 via-neutral-700/35 to-transparent" />

      <div className="flex flex-col gap-[18px]">
        {jobs.map((job, index) => {
          const isYourCompany = job.company === "Your Company?";
          const isPlaceholder = !job.start && !job.end;
          const Tag = isYourCompany ? 'a' : (job.link ? 'a' : 'div');
          const linkProps = isYourCompany
            ? { href: "#", onClick: onCopyEmail }
            : job.link
            ? { href: job.link, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <Tag
              key={index}
              {...linkProps}
              className="group flex items-center gap-3 no-underline"
            >
              {/* Timeline dot */}
              <div className="relative shrink-0 w-[17px] h-[17px] z-10">
                <div className="w-full h-full rounded-full border-[1.5px] border-neutral-600/80 bg-[#0a0a0a] group-hover:border-[#E5E5E5] group-hover:scale-110 group-hover:shadow-[0_0_8px_rgba(229,229,229,0.15)] transition-all duration-300 ease-out" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content card */}
              <div className={`flex-1 min-w-0 px-[15px] py-2.5 bg-neutral-800/20 border border-neutral-800/40 rounded hover:bg-neutral-800/35 hover:border-neutral-700/50 transition-all duration-300 ease-out ${isPlaceholder ? 'opacity-50 group-hover:opacity-70' : ''}`}>
                <div className="flex items-start justify-between gap-5 mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-inter text-[#E5E5E5] text-[15px] leading-tight tracking-tight ${(!isPlaceholder || isYourCompany) ? 'group-hover:text-white transition-colors duration-300' : ''}`} style={{ fontWeight: '500', fontFeatureSettings: '"calt", "kern"' }}>
                      {job.company}
                    </h3>
                  </div>
                  {job.start && (
                    <span className="shrink-0 text-[#9a9a9a] text-[12.5px] tabular-nums leading-tight tracking-wide font-mono">
                      {job.end ? `${job.start} - ${job.end}` : job.start}
                    </span>
                  )}
                </div>

                <div className="text-[#b8b8b8] text-[14px] leading-tight mb-0.5 font-normal">
                  {job.role}
                </div>

                {job.description && (
                  <div className={`text-[#8a8a8a] text-[13px] leading-relaxed mt-1.5 ${isPlaceholder ? 'group-hover:text-[#d0d0d0] transition-colors duration-300' : ''}`}>
                    {job.description}
                  </div>
                )}
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
};