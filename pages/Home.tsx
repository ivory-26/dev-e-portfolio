import React from 'react';
import { PROJECTS, BLOG_POSTS } from '../constants';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ArrowRight, ArrowUpRight, User } from 'lucide-react';
import { PageView } from '../types';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { SpotifyWidget } from '../components/widgets/SpotifyWidget';
import { GithubWidget } from '../components/widgets/GithubWidget';
import { VoiceMatchWidget } from '../components/widgets/VoiceMatchWidget';
import { GlowCard } from '../components/ui/GlowCard';

interface HomeProps {
  setPage: (page: PageView) => void;
  setSelectedBlogPostId?: (id: number) => void;
}

export const Home: React.FC<HomeProps> = ({ setPage, setSelectedBlogPostId }) => {
  // Now showing all featured projects (which we updated to 4)
  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 4);
  const latestBlog = BLOG_POSTS.length > 0 ? BLOG_POSTS[0] : null;

  const handleBlogClick = () => {
    if (latestBlog && setSelectedBlogPostId) {
      setSelectedBlogPostId(latestBlog.id);
      setPage(PageView.BLOG_POST);
    }
  };

  return (
    <div className="flex flex-col gap-16 md:gap-24 pt-28 sm:pt-32">
      {/* Hero / About Section */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                {/* Profile & Status Section */}
                    <div className="flex items-center gap-4 mb-8 flex-wrap sm:flex-nowrap">
                    <div className="relative group">
                         {/* Rotating Pink Glow Ring */}
                        <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,#ff0080_360deg)] animate-spin-slow opacity-100 blur-[2px]"></div>
                        {/* Inner glow to smooth edges */}
                        <div className="absolute -inset-[1px] rounded-full bg-background z-0"></div>
                        
                        <div className="relative w-20 h-20 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden z-10 shadow-lg">
                            <img
                                src="/profile.jpg"
                                alt="Sahil Karpe"
                                className="w-full h-full object-cover transform scale-125"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Sahil Karpe</h2>
                        <div className="flex items-center gap-2 text-accent text-sm font-mono mt-1">
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            Available for freelance
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-primary">
                    Your fastest path to <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-zinc-400 to-zinc-500">production.</span>
                </h1>
                <p className="text-lg sm:text-xl text-secondary mb-8 max-w-2xl leading-relaxed">
                    A teen learning to code in this rat race. Currently learning React, GenAI Agents and NodeJS.
                    <br/><br/>
                    <span className="text-sm italic">Fun fact: The first computer bug was actually a real moth which got stuck in a Harvard computer.</span>
                </p>
                <div className="flex flex-wrap gap-3">
                    <AnimatedButton 
                        onClick={() => setPage(PageView.PROJECTS)}
                        variant="primary"
                        icon={ArrowRight}
                        className="px-8 py-4 text-base"
                    >
                        View Work
                    </AnimatedButton>
                    
                    <AnimatedButton 
                        onClick={() => setPage(PageView.CONTACT)}
                        variant="outline"
                        className="px-8 py-4 text-base"
                    >
                        Contact Me
                    </AnimatedButton>
                </div>
            </div>

            {/* Right Side - Interactive Voice Match Widget */}
            <div className="relative h-[380px] sm:h-[400px] lg:h-[420px]">
                <VoiceMatchWidget className="h-full w-full shadow-2xl" />
            </div>
        </div>
      </section>

      {/* Featured Projects Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
                <h2 className="text-3xl font-bold mb-2 text-primary">Featured Projects</h2>
                <p className="text-secondary">Selected works that define my engineering approach.</p>
            </div>
            <button 
                onClick={() => setPage(PageView.PROJECTS)}
                className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors"
            >
                View All <ArrowRight size={16} />
            </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </section>

      {/* Activity & Insights Section (Blog + Widgets) */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="text-3xl font-bold mb-2 text-primary">Activity & Insights</h2>
        <p className="text-secondary mb-12">What I'm writing, coding, and listening to.</p>

        <div className="grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
            {/* Latest Blog Card - Spans 2 rows on large */}
            <GlowCard 
                onClick={handleBlogClick}
                className={`min-w-0 lg:col-span-2 lg:row-span-2 bg-surface border border-border p-8 hover:border-accent/50 transition-colors flex flex-col justify-between ${latestBlog ? 'cursor-pointer' : 'cursor-default'}`}
                glowColor="rgba(168, 85, 247, 0.15)" // Purple
            >
                
                {latestBlog ? (
                  <>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded">LATEST POST</span>
                            <span className="text-xs text-secondary font-mono">{latestBlog.date}</span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                            {latestBlog.title}
                        </h3>
                        <p className="text-secondary max-w-xl leading-relaxed mb-6">
                            {latestBlog.excerpt}
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent transition-colors">
                        Read Article <ArrowUpRight size={16} />
                    </div>
                  </>
                ) : (
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <span className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded mb-4">BLOG</span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                        Coming Soon
                    </h3>
                    <p className="text-secondary text-center max-w-md">
                        I'm working on some exciting content. Check back soon for articles on web development and coding!
                    </p>
                  </div>
                )}
            </GlowCard>

            {/* Github Widget */}
            <div className="min-w-0">
                <GithubWidget />
            </div>
            
            {/* Spotify Widget */}
            <div className="min-w-0">
                <SpotifyWidget />
            </div>
        </div>
      </section>

      {/* CTA / Contact Snippet */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-16">
                <div className="bg-surface border border-border p-8 md:p-24 text-center relative overflow-hidden rounded-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary">Ready to scale?</h2>
            <p className="text-lg sm:text-xl text-secondary mb-8 max-w-2xl mx-auto">
                Let's discuss how we can engineer your next big idea into a reality with performance and reliability at its core.
            </p>
            <div className="flex justify-center">
                <AnimatedButton 
                    onClick={() => setPage(PageView.CONTACT)}
                    className="px-8 py-4 text-base"
                >
                    Get in Touch
                </AnimatedButton>
            </div>
        </div>
      </section>
    </div>
  );
};