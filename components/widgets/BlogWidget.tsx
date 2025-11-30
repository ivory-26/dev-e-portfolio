import React, { useState, useRef } from 'react';
import { BLOG_POSTS } from '../../constants';
import { GlowCard } from '../ui/GlowCard';
import { ArrowUpRight } from 'lucide-react';
import { PageView } from '../../types';
import { getBlogPostUrl } from '../../utils/slugUtils';

interface BlogWidgetProps {
  className?: string;
  setPage: (page: PageView) => void;
  setSelectedBlogPostSlug?: (slug: string) => void;
}

export const BlogWidget: React.FC<BlogWidgetProps> = ({ className, setPage, setSelectedBlogPostSlug }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleBlogClick = (slug: string) => {
    if (setSelectedBlogPostSlug) {
      setSelectedBlogPostSlug(slug);
      setPage(PageView.BLOG_POST);
      window.history.pushState({}, '', getBlogPostUrl(slug));
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight } = scrollRef.current;
      const index = Math.round(scrollTop / clientHeight);
      setActiveIndex(index);
    }
  };

  const scrollToindex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: index * scrollRef.current.clientHeight,
        behavior: 'smooth'
      });
    }
  };

  const sortedPosts = [...BLOG_POSTS].reverse();

  return (
    <GlowCard 
      className={`bg-surface border border-border hover:border-accent/50 transition-colors flex flex-col ${className}`}
      glowColor="rgba(168, 85, 247, 0.15)" // Purple
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      >
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div 
              key={post.id} 
              className="h-full w-full snap-start p-6 flex flex-col justify-between cursor-pointer"
              onClick={() => handleBlogClick(post.slug)}
            >
              <div className="relative z-10 pr-8">
                  <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded">BLOG</span>
                      <span className="text-xs text-secondary font-mono">{post.date}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                      {post.title}
                  </h3>
                  <p className="text-secondary max-w-xl leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                  </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent transition-colors">
                  Read Article <ArrowUpRight size={16} />
              </div>
            </div>
          ))
        ) : (
           <div className="h-full w-full snap-start p-8 flex flex-col items-center justify-center">
              <span className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded mb-4">BLOG</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                  Coming Soon
              </h3>
              <p className="text-secondary text-center max-w-md">
                  I'm working on some exciting content. Check back soon for articles on web development and coding!
              </p>
           </div>
        )}
      </div>

      {/* Scroll Indicators */}
      {sortedPosts.length > 1 && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {sortedPosts.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                scrollToindex(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex 
                  ? 'w-3 h-3 bg-primary scale-110' 
                  : index === activeIndex + 1
                    ? 'w-2 h-2 bg-zinc-500 hover:bg-zinc-400 hover:scale-110'
                    : 'w-2 h-2 bg-zinc-800 hover:bg-zinc-600 hover:scale-110'
              }`}
              aria-label={`Scroll to blog post ${index + 1}`}
            />
          ))}
        </div>
      )}
    </GlowCard>
  );
};
