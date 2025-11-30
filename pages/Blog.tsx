import React from 'react';
import { BLOG_POSTS } from '../constants';
import { GlowCard } from '../components/ui/GlowCard';
import { PageView } from '../types';
import { getBlogPostUrl } from '../utils/slugUtils';
import { getBlogPostsSortedByDate } from '../utils/blogUtils';
import { SEOHead } from '../components/SEOHead';

interface BlogProps {
  setSelectedBlogPostSlug: (slug: string) => void;
  setPage: (page: PageView) => void;
}

export const Blog: React.FC<BlogProps> = ({ setSelectedBlogPostSlug, setPage }) => {
  const sortedBlogPosts = getBlogPostsSortedByDate(BLOG_POSTS);
  
  const handleBlogPostClick = (slug: string) => {
    setSelectedBlogPostSlug(slug);
    setPage(PageView.BLOG_POST);
    window.history.pushState({}, '', getBlogPostUrl(slug));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
      <SEOHead
        title="Blog | Sahil Karpe"
        description="Engineering insights on software architecture, performance optimization, and web development from Sahil Karpe. Practical guides and technical tutorials for modern developers."
        canonicalUrl="https://dev-e-portfolio.vercel.app/blog"
      />
      <div className="mb-10 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 text-primary">Engineering Log</h1>
        <p className="text-lg sm:text-xl text-secondary max-w-2xl">
            Thoughts on software architecture, performance optimization, and the future of web development.
        </p>
      </div>

      <div className="grid gap-5 sm:gap-6 min-w-0">
        {sortedBlogPosts.length > 0 ? (
          sortedBlogPosts.map((post) => (
            <article 
              key={post.id} 
              className="group cursor-pointer min-w-0"
              onClick={() => handleBlogPostClick(post.slug)}
            >
                <GlowCard 
                    className="bg-surface border border-border p-8 hover:bg-background/50 hover:border-accent/30 transition-all duration-300"
                    glowColor="rgba(168, 85, 247, 0.15)" // Purple
                >
                    <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-mono text-secondary mb-4">
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
            className="bg-surface border border-border p-16 text-center min-w-0"
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