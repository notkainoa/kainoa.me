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
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center justify-between gap-1.5">
        <h3 className="font-medium text-neutral-200 text-[13px] leading-tight">
          {project.title}
        </h3>
        {project.link && (
          <svg
            className="w-2.5 h-2.5 text-neutral-600 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        )}
      </div>

      <p className="text-neutral-500 text-[11px] leading-relaxed">
        {project.description}
      </p>
    </Tag>
  );
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  let globalIndex = 0;

  return (
    <div className="grid grid-cols-3 gap-3">
      {SECTIONS.map((section) => {
        const sectionProjects = projects.filter((p) => p.category === section.category);
        if (sectionProjects.length === 0) return null;

        return (
          <div key={section.key} className="flex flex-col gap-2">
            <span className="text-neutral-600 text-[10px] uppercase tracking-widest font-medium">
              {section.label}
            </span>
            <div className="flex flex-col gap-1.5">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};
