import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import { Share2, Check, ArrowLeft } from 'lucide-react';
import { GlowCard } from '../components/ui/GlowCard';

interface BlogPostProps {
  postId: number;
  toggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentTheme: 'light' | 'dark';
  onBackClick?: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ postId, toggleTheme, currentTheme, onBackClick }) => {
  const post = BLOG_POSTS.find(p => p.id === postId);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Post Not Found</h1>
          <p className="text-secondary">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    // Use deployed URL when available, fallback to current origin
    const deployedUrl = 'https://dev-e-portfolio.vercel.app/';
    const url = `${deployedUrl}?blogpost=${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Parse markdown-style content into paragraphs and sections
  const renderContent = (content: string) => {
    // Helper function to convert markdown formatting to JSX
    const renderMarkdown = (text: string) => {
      const parts: React.ReactNode[] = [];
      
      let lastIndex = 0;
      const matches: Array<{ start: number; end: number; type: string; value: string }> = [];

      // Process bold first (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;
      while ((match = boldRegex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          type: 'bold',
          value: match[1],
        });
      }

      // Process italic (*text*) - but exclude matches within bold
      const italicRegex = /(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g;
      while ((match = italicRegex.exec(text)) !== null) {
        // Check if this match overlaps with any bold match
        const overlaps = matches.some(
          m => m.type === 'bold' && m.start < match.index + match[0].length && m.end > match.index
        );
        if (!overlaps) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'italic',
            value: match[1],
          });
        }
      }

      // Process inline code (`code`)
      const codeRegex = /`(.*?)`/g;
      while ((match = codeRegex.exec(text)) !== null) {
        // Check if this match overlaps with any existing match
        const overlaps = matches.some(
          m => m.start < match.index + match[0].length && m.end > match.index
        );
        if (!overlaps) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'code',
            value: match[1],
          });
        }
      }

      // Sort matches by start position
      matches.sort((a, b) => a.start - b.start);

      // Build the output
      lastIndex = 0;
      matches.forEach((match, idx) => {
        if (match.start > lastIndex) {
          parts.push(<span key={`text-${idx}`}>{text.substring(lastIndex, match.start)}</span>);
        }

        if (match.type === 'bold') {
          parts.push(
            <strong key={`bold-${idx}`} className="font-bold">
              {match.value}
            </strong>
          );
        } else if (match.type === 'italic') {
          parts.push(
            <em key={`italic-${idx}`} className="italic">
              {match.value}
            </em>
          );
        } else if (match.type === 'code') {
          parts.push(
            <code key={`code-${idx}`} className="bg-surface/50 px-2 py-1 rounded text-accent text-sm font-mono">
              {match.value}
            </code>
          );
        }

        lastIndex = match.end;
      });

      if (lastIndex < text.length) {
        parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
      }

      return parts.length > 0 ? parts : text;
    };

    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-primary mt-8 mb-4">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-primary mt-6 mb-3">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold text-primary mt-4 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-secondary leading-relaxed ml-6 mb-2">
            {renderMarkdown(line.replace('- ', ''))}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={index} className="mb-4" />;
      }
      return <p key={index} className="text-secondary leading-relaxed mb-4">{renderMarkdown(line)}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
      {/* Back Button */}
      {onBackClick && (
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to Blog</span>
        </button>
      )}

      {/* Header with Profile & Share */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            {/* Rotating Pink Glow Ring */}
            <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,#ff0080_360deg)] animate-spin-slow opacity-100 blur-[2px]"></div>
            {/* Inner glow to smooth edges */}
            <div className="absolute -inset-[1px] rounded-full bg-background z-0"></div>
            
            <div className="relative w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden z-10 shadow-lg">
              <img
                src="/profile.jpg"
                alt="Sahil Karpe"
                className="w-full h-full object-cover transform scale-125"
                loading="lazy"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-primary">Sahil Karpe</h3>
            <p className="text-sm text-secondary font-mono">{post.date}</p>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-primary hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 text-sm font-medium group hover:shadow-[0_0_20px_rgba(255,0,128,0.3)]"
          title="Copy link to clipboard"
        >
          {copied ? (
            <>
              <Check size={16} className="text-accent animate-pulse" />
              <span className="text-accent font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={16} className="group-hover:text-accent transition-colors duration-300" />
              <span className="group-hover:text-accent transition-colors duration-300">Share</span>
            </>
          )}
        </button>
      </div>

      {/* Article */}
      <GlowCard 
        className="bg-surface border border-border p-8 sm:p-12 min-w-0"
        glowColor="rgba(168, 85, 247, 0.15)"
      >
        {/* Article Header */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold px-2 py-1 bg-accent/10 text-accent rounded">
              {post.category}
            </span>
            <span className="text-xs text-secondary font-mono">{post.readTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-secondary leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </GlowCard>

      {/* CTA Section */}
      <div className="mt-16 pt-12 border-t border-border">
        <GlowCard 
          className="bg-surface border border-border p-8 sm:p-12 text-center"
          glowColor="rgba(168, 85, 247, 0.15)"
        >
          <h3 className="text-2xl font-bold text-primary mb-4">Have thoughts on this?</h3>
          <p className="text-secondary mb-6 max-w-xl mx-auto">
            Feel free to reach out and let me know what you think about this article or if you have any suggestions.
          </p>
          <a
            href="mailto:karpesahil2007@gmail.com?subject=Thoughts on: {post.title}"
            className="relative group overflow-hidden font-bold transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_30px_rgba(255,0,128,0.5)] bg-primary text-background px-6 py-3 rounded-lg inline-block"
          >
            {/* Pink Swipe Layer */}
            <div className="absolute inset-0 bg-[#ff0080] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out will-change-transform" />
            {/* Content Layer */}
            <span className="relative z-10">Share Your Thoughts</span>
          </a>
        </GlowCard>
      </div>
    </div>
  );
};
