import React from 'react';
import { EXPERIENCE } from '../constants';
import { GlowCard } from '../components/ui/GlowCard';

export const Experience: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
       <div className="mb-16">
        <h1 className="text-5xl font-bold mb-6 text-primary">Career Trajectory</h1>
        <p className="text-xl text-secondary max-w-2xl">
            My professional journey building software for startups and enterprise companies.
        </p>
      </div>

      <div className="relative border-l border-border ml-4 space-y-12">
        {EXPERIENCE.map((job, index) => (
            <div key={job.id} className="relative pl-12">
                {/* Timeline Dot */}
                <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-accent shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-secondary'}`}></div>
                
                <GlowCard 
                    className="bg-surface border border-border p-8 hover:border-primary/20 transition-colors"
                    glowColor="rgba(16, 185, 129, 0.15)" // Emerald Green
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">{job.role}</h3>
                        <span className="font-mono text-sm text-secondary mt-1 sm:mt-0">{job.period}</span>
                    </div>
                    <div className="text-lg text-primary mb-4 font-medium">{job.company}</div>
                    <p className="text-secondary leading-relaxed">
                        {job.description}
                    </p>
                </GlowCard>
            </div>
        ))}
      </div>
    </div>
  );
};