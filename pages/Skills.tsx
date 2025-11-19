import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { GlowCard } from '../components/ui/GlowCard';

export const Skills: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
            <div className="mb-10 sm:mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-primary">Technical Arsenal</h1>
                <p className="text-lg sm:text-xl text-secondary max-w-3xl">
                        My stack is built on modern, type-safe, and scalable technologies. 
                        I prioritize tools that offer excellent developer experience and production reliability.
                </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
                <GlowCard 
                    key={category.name} 
                    className="bg-surface border border-border p-8 rounded-lg"
                    glowColor="rgba(56, 189, 248, 0.15)" // Sky Blue
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-background/50 rounded border border-border">
                            <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary">{category.name}</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {category.skills.map((skill) => (
                            <div 
                                key={skill.name}
                                className="group flex flex-col items-center justify-center p-4 bg-background border border-border rounded-xl hover:border-accent/50 hover:bg-surface transition-all duration-300 cursor-default hover:z-30"
                            >
                                <div className="relative w-10 h-10 mb-3">
                                    {/* Colored Brand Icon (Hidden by default, fades in) */}
                                    <img 
                                        src={`https://cdn.simpleicons.org/${skill.iconSlug}`} 
                                        alt={`${skill.name} icon`}
                                        className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-out z-10"
                                        loading="lazy"
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />

                                    {/* White/Monochrome Icon (Visible by default, fades out) */}
                                    {/* Using filter invert for light mode to make white icons black */}
                                    <img 
                                        src={`https://cdn.simpleicons.org/${skill.iconSlug}/fff`} 
                                        alt={skill.name}
                                        className="absolute inset-0 w-full h-full object-contain opacity-60 group-hover:opacity-0 group-hover:scale-110 transition-all duration-300 ease-out dark:invert-0 invert"
                                        loading="lazy"
                                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                </div>
                                
                                <span className="text-[11px] sm:text-sm font-medium text-secondary group-hover:text-primary transition-colors duration-300 text-center">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </GlowCard>
            )
        })}
      </div>

        {/* GitHub Contribution Graph */}
        <div className="mt-16 pt-16 border-t border-border">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-primary">GitHub Activity</h3>
                <a 
                    href="https://github.com/ivory-26" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2"
                >
                    View Profile
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
            <GlowCard 
                className="bg-surface border border-border p-6 overflow-hidden"
                glowColor="rgba(255, 0, 128, 0.15)" // Pink glow to match accent
            >
                <a href="https://github.com/ivory-26" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="relative overflow-hidden rounded-lg">
                        <img 
                            src="https://ghchart.rshah.org/ff0080/ivory-26" 
                            alt="GitHub Contribution Chart"
                            className="w-full opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </a>
            </GlowCard>
        </div>
    </div>
  );
};
