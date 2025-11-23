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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Simple Secret to Great Prompts: Input > Process > Output",
    excerpt: "Master the three-step loop to writing powerful, effective prompts for AI chatbots and Large Language Models.",
    date: "November 24, 2025",
    readTime: "5 min read",
    category: "AI & Productivity",
    content: `# The Simple Secret to Great Prompts: Input > Process > Output

Ever struggle to get the right answer from an AI chatbot or Large Language Model (LLM)? Think of it exactly like talking to a computer: you give it an **Input**, it **Processes** the request, and you get an **Output**. Mastering this simple three-step loop is the key to writing powerful, effective prompts.

## Input (The Data)

The first step is giving the AI all the data it needs. Don't be vague—be specific.

**What it means:** Furnish the LLM with relevant content. This is where you feed it the article, the data, or the background information.

**How to do it:** Clearly state your idea, provide any necessary references or context, and specify the desired steps.

**Example Prompt:**

"I need a summary of the provided article about renewable energy sources. Focus on the environmental benefits and economic implications. The summary should be approximately 200 words."

## Process (The Instructions)

Just as a computer's CPU executes tasks through a defined workflow, you need to guide the LLM's "brain."

**What it means:** Guide the LLM through a defined workflow. Specify the desired execution method and the persona you want it to adopt.

**How to do it:** Ask the AI to act as a specific persona (a professor, an environmental scientist, a copywriter, etc.). Providing foundational knowledge about the task will significantly enhance the LLM's performance; the more context, the superior the outcome.

**Example Prompt:**

"Act as an environmental scientist. Analyze the provided data on solar panel efficiency, then explain the improvements in layperson's terms. Do not use jargon. Start by defining solar panel efficiency."

## Output (The Format)

Finally, tell the AI exactly how you want the final answer to look.

**What it means:** Instruct the LLM on the desired structure of its response (text, charts, lists, etc.).

**How to do it:** Be precise about the structure. Don't hesitate to offer references or examples to ensure the output meets your expectations.

**Example Prompt:**

"Provide the summary as a bulleted list, with each bullet point describing a distinct benefit or implication. Conclude with a single sentence summarizing the overall outlook for renewable energy."

## Key Takeaway

**DON'T** be afraid to test and experiment. **KEEP PROMPTING!**

The art of prompt engineering isn't about finding the perfect wording on the first try—it's about iterating and refining your approach. By understanding the Input > Process > Output framework, you're already ahead of the curve in getting the most out of AI tools.`
  }
];
