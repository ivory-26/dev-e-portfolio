import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  featured?: boolean;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export interface Skill {
    name: string;
    iconSlug: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
  icon: LucideIcon;
}

export enum PageView {
  HOME = 'HOME',
  PROJECTS = 'PROJECTS',
  SKILLS = 'SKILLS',
  EXPERIENCE = 'EXPERIENCE',
  BLOG = 'BLOG',
  BLOG_POST = 'BLOG_POST',
  CONTACT = 'CONTACT'
}