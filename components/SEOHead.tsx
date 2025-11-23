import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Sahil Karpe | Software Engineer & Full-Stack Developer',
  description = 'Portfolio of Sahil Karpe - Software Engineer specializing in full-stack development, AI/ML, and modern web technologies. Explore projects, blog posts, and technical insights.',
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://sahil-karpe.vercel.app/og-image.jpg',
  article,
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description, true);

    // Open Graph tags
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:type', ogType);
    setMetaTag('og:image', ogImage);
    
    if (canonicalUrl) {
      setMetaTag('og:url', canonicalUrl);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:title', title, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', ogImage, true);

    // Article-specific tags
    if (ogType === 'article' && article) {
      if (article.publishedTime) {
        setMetaTag('article:published_time', article.publishedTime);
      }
      if (article.author) {
        setMetaTag('article:author', article.author);
      }
      if (article.section) {
        setMetaTag('article:section', article.section);
      }
      if (article.tags) {
        article.tags.forEach(tag => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        });
      }
    }

    // Canonical URL
    if (canonicalUrl) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      
      linkElement.setAttribute('href', canonicalUrl);
    }
  }, [title, description, canonicalUrl, ogType, ogImage, article]);

  return null; // This component doesn't render anything
};
