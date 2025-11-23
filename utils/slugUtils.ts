/**
 * Convert a string to a URL-safe slug
 * @param text - The text to convert to a slug
 * @returns URL-safe slug
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Get the full blog post URL for a given slug
 * @param slug - The blog post slug
 * @param absolute - Whether to return absolute URL (default: true)
 * @returns The blog post URL
 */
export const getBlogPostUrl = (slug: string, absolute: boolean = true): string => {
  const deployedUrl = 'https://dev-e-portfolio.vercel.app';
  const path = `/blog/${slug}`;
  return absolute ? `${deployedUrl}${path}` : path;
};
