import React from 'react';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

const SECTIONS: { key: string; label: string; category: string }[] = [
  { key: 'development', label: 'Building', category: 'development' },
  { key: 'projects', label: 'Projects', category: 'projects' },
  { key: 'oss', label: 'Open Source', category: 'oss' },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const Tag = project.link ? 'a' : 'div';
  const linkProps = project.link
    ? { href: project.link, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Tag
      {...linkProps}
      className="project-card group flex flex-col gap-1 p-2.5 bg-neutral-800/40 border border-neutral-800 rounded hover:border-neutral-700 hover:bg-neutral-800/70 transition-all duration-200 no-underline cursor-pointer"
      style={{ animationDelay: `${200 + index * 50}ms` }}
    >
      <div className="flex items-center justify-between gap-1.5">
        <h3 className="font-normal text-[#E5E5E5] text-[16px] leading-none border-b border-[#A0A0A0] group-hover:border-[#E5E5E5] transition-colors duration-200 pb-0.5" style={{ fontWeight: '400', fontFeatureSettings: 'normal' }}>
          {project.title}
        </h3>
        {project.link && (
          <svg
            className="w-2.5 h-2.5 text-[#E5E5E5] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        )}
      </div>

      <p className="text-[#a0a0a0] text-[16px] leading-normal">
        {project.description}
      </p>
    </Tag>
  );
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  let globalIndex = 0;

  return (
    <div className="grid grid-cols-3 gap-3 my-7">
      {SECTIONS.map((section) => {
        const sectionProjects = projects.filter((p) => p.category === section.category);
        if (sectionProjects.length === 0) return null;

        return (
          <div key={section.key} className="flex flex-col gap-2">
            <span className="font-worksans text-[#a0a0a0] text-[14px] font-normal leading-[28px] animate-in" style={{ fontFeatureSettings: 'normal', fontWeight: '400', animationDelay: '200ms' }}>
              {section.label}
            </span>
            <div className="flex flex-col gap-3">
              {sectionProjects.map((project) => {
                const card = (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={globalIndex}
                  />
                );
                globalIndex++;
                return card;
              })}
              {section.category === 'projects' && (
                <a
                  href="https://github.com/notkainoa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group flex flex-col gap-1 p-2.5 bg-neutral-800/40 border border-neutral-800 rounded hover:border-neutral-700 hover:bg-neutral-800/70 transition-all duration-200 no-underline cursor-pointer"
                  style={{ animationDelay: `${200 + globalIndex * 50}ms` }}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <h3 className="font-normal text-[#A0A0A0] text-[14px] leading-none group-hover:text-[#E5E5E5] transition-colors duration-200" style={{ fontWeight: '400', fontFeatureSettings: 'normal' }}>
                      See all
                    </h3>
                    <svg
                      className="w-3.5 h-3.5 text-[#a0a0a0] group-hover:text-[#E5E5E5] transition-colors duration-200 shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
