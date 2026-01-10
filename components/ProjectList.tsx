import React from 'react';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="flex flex-col gap-8">
      {projects.map((project, index) => (
        <a
          key={index}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-2 no-underline"
        >
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-neutral-200 group-hover:underline decoration-neutral-600 underline-offset-4">
              {project.title}
            </h3>
            <div className="h-px bg-neutral-800 flex-grow group-hover:bg-neutral-700 transition-colors" />
          </div>
          
          <p className="text-neutral-400 leading-relaxed">
            {project.description}
          </p>

          {project.tech && (
            <div className="flex gap-2 mt-1">
              {project.tech.map((t) => (
                <span key={t} className="text-neutral-600 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
          )}
        </a>
      ))}
    </div>
  );
};