import React from 'react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ui/ProjectCard';

export const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
      <div className="mb-10 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-primary leading-tight">Ship. Iterate. Improve.</h1>
        <p className="text-lg sm:text-xl text-secondary max-w-2xl">
            A collection of production-ready applications, open-source libraries, and experimental proofs of concept.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};