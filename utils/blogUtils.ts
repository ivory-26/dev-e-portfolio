import { BlogPost } from '../types';

/**
 * Gets the latest blog post based on the date field.
 * Parses dates like "November 24, 2025" and returns the most recent one.
 * @param blogPosts - Array of blog posts
 * @returns The latest blog post or null if array is empty
 */
export const getLatestBlogPost = (blogPosts: BlogPost[]): BlogPost | null => {
  if (blogPosts.length === 0) return null;
  
  // Sort by date (newest first) and return the first one
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
  
  return sortedPosts[0];
};

/**
 * Gets all blog posts sorted by date (newest first).
 * @param blogPosts - Array of blog posts
 * @returns Sorted array of blog posts
 */
export const getBlogPostsSortedByDate = (blogPosts: BlogPost[]): BlogPost[] => {
  return [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
};
