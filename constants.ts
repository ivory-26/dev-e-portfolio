import { Terminal, Database, Layout, Server, Cloud, Shield } from 'lucide-react';
import { Project, Experience, BlogPost, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 5,
    title: "Dev E-Portfolio (This Site)",
    description: "Personal developer portfolio built with React + Vite, TypeScript and Tailwind. Features live widgets (GitHub, Spotify) and a Gemini Live voice transcript demo. Deployed on Vercel.",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "Vercel"],
    link: "https://github.com/ivory-26/dev-e-portfolio",
    featured: true
  },
  {
    id: 0,
    title: "WeTall",
    description: "Bicopter vtol project inspired by a lot made by a few",
    tech: ["Arduino", "Drone", "VTOL", "WebDev", "IoT"],
    link: "https://github.com/SC136/WeTall",
    featured: true
  },
  {
    id: 1,
    title: "YouTube Clone",
    description: "A clone of YouTube built to practice web development skills.",
    tech: ["Web Development", "Clone"],
    link: "https://github.com/ivory-26/YouTube-Clone",
    featured: false
  },
  {
    id: 2,
    title: "Hydro Tech",
    description: "Vibe coded landing page for a local company.",
    tech: ["WebDev", "VibeCode", "Animations"],
    link: "https://github.com/ivory-26/hydro-tech",
    featured: true
  },
  {
    id: 3,
    title: "SIH - TARANG",
    description: "Smart India Hackathon project focused on innovative solutions.",
    tech: ["Hackathon", "Innovation"],
    link: "https://github.com/ivory-26/SIH--TARANG",
    featured: true
  },
  {
    id: 4,
    title: "Frontend Notes App",
    description: "A notes application built with modern frontend technologies.",
    tech: ["Frontend", "Web App", "Notes"],
    link: "https://github.com/ivory-26/frontend-notes-app",
    featured: false
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Student / Learner",
    company: "Self-Taught",
    period: "Present",
    description: "A teen learning to code in this rat race. Currently learning Javascript, C, Python."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: [
        { name: "JavaScript", iconSlug: "javascript" },
        { name: "TypeScript", iconSlug: "typescript" },
        { name: "Python", iconSlug: "python" },
        { name: "C", iconSlug: "c" },
        { name: "C++", iconSlug: "cplusplus" },
        { name: "Java", iconSlug: "java" },
        { name: "React", iconSlug: "react" },
        { name: "Node.js", iconSlug: "nodedotjs" },
        { name: "Next.js", iconSlug: "nextdotjs" }
    ],
    icon: Terminal
  },
  {
    name: "Tools & Platforms",
    skills: [
        { name: "Git", iconSlug: "git" },
        { name: "GitHub", iconSlug: "github" },
        { name: "Vercel", iconSlug: "vercel" },
        { name: "Render", iconSlug: "render" },
        { name: "Google Cloud", iconSlug: "googlecloud" },
        { name: "Arduino", iconSlug: "arduino" },
        { name: "MySQL", iconSlug: "mysql" },
        { name: "Jasmine", iconSlug: "jasmine" },
        { name: "Kaggle", iconSlug: "kaggle" },
        { name: "Google Colab", iconSlug: "googlecolab" }
    ],
    icon: Cloud
  }
];

export const BLOG_POSTS: BlogPost[] = [];