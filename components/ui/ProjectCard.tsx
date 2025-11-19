import React, { useRef } from 'react';
import { Project } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-surface border border-border p-6 sm:p-8 hover:border-accent/50 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden rounded-sm"
    >
      {/* Mouse Follower Aura (Pink) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 0, 128, 0.15), transparent 40%)`
        }}
      />

      {/* Existing Background Glow on Hover (Cyan - Subtle blend) */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none z-0" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
            {project.title}
            </h3>
            <a 
                href={project.link}
                className="text-secondary hover:text-primary transition-colors"
            >
                <ArrowUpRight size={20} />
            </a>
        </div>
        
        <p className="text-secondary leading-relaxed mb-6">
            {project.description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span 
            key={t} 
            className="text-xs font-mono px-2 py-1 bg-background/50 text-secondary border border-border rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};