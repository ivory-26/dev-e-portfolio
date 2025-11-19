import React from 'react';
import { BLOG_POSTS } from '../constants';
import { GlowCard } from '../components/ui/GlowCard';

export const Blog: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-16">
        <h1 className="text-5xl font-bold mb-6 text-primary">Engineering Log</h1>
        <p className="text-xl text-secondary max-w-2xl">
            Thoughts on software architecture, performance optimization, and the future of web development.
        </p>
      </div>

      <div className="grid gap-6">
        {BLOG_POSTS.length > 0 ? (
          BLOG_POSTS.map((post) => (
            <article key={post.id} className="group cursor-pointer">
                <GlowCard 
                    className="bg-surface border border-border p-8 hover:bg-background/50 hover:border-accent/30 transition-all duration-300"
                    glowColor="rgba(168, 85, 247, 0.15)" // Purple
                >
                    <div className="flex items-center gap-4 text-xs font-mono text-secondary mb-4">
                        <span className="text-accent">{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                        {post.title}
                    </h2>
                    <p className="text-secondary leading-relaxed">
                        {post.excerpt}
                    </p>
                </GlowCard>
            </article>
          ))
        ) : (
          <GlowCard 
            className="bg-surface border border-border p-16 text-center"
            glowColor="rgba(168, 85, 247, 0.15)"
          >
            <span className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded mb-4 inline-block">BLOG</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              Coming Soon
            </h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              I'm working on some exciting content about web development, programming, and my learning journey. Check back soon for new articles!
            </p>
          </GlowCard>
        )}
      </div>
    </div>
  );
};