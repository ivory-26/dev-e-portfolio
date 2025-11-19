import React from 'react';
import { PROJECTS } from '../constants';
import { ProjectCard } from '../components/ui/ProjectCard';

export const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-16">
        <h1 className="text-5xl font-bold mb-6 text-primary">Ship. Iterate. Improve.</h1>
        <p className="text-xl text-secondary max-w-2xl">
            A collection of production-ready applications, open-source libraries, and experimental proofs of concept.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};