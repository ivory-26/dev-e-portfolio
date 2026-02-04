import { Terminal, Database, Layout, Server, Cloud, Shield } from 'lucide-react';
import { Project, Experience, BlogPost, SkillCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 6,
    title: "AutoReport",
    description: "Zero-click documentation for engineering students and developers. Listens to Git commits, analyzes diffs, and autonomously updates project reports using AI agents.",
    tech: ["Next.js", "Tailwind", "Shadcn UI", "NextAuth", "Express", "MongoDB", "Groq"],
    link: "https://github.com/ivory-26/autoreport",
    featured: true
  },
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
    slug: "the-simple-secret-to-great-prompts-input-process-output",
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
  },

  {
    id: 2,
    title: "The Great Battery Debate: Why 80% is the Magic Number",
    slug: "the-great-battery-debate-why-80-percent-is-the-magic-number",
    excerpt: "Discover why keeping your laptop battery at 80% is the perfect balance between performance and longevity.",
    date: "November 30, 2025",
    readTime: "5 min read",
    category: "Tech Tips",
    content: `# The Great Battery Debate: Why 80% is the Magic Number

Last week, my close friend—let's call him Swar—finally decided to upgrade his aging laptop. We spent hours trawling through reviews, comparing specs, and arguing over screen sizes. But once we settled on a sleek new machine, Swar paused and asked the question that has plagued laptop owners for a decade:

*"So... do I leave it plugged in all the time, or should I unplug it when it hits 100%?"*

It's the classic dilemma. We all want that sweet, unlimited power from the wall socket (especially for gaming or heavy work), but we're terrified of "killing" the battery. We've all heard the horror stories of batteries that hold a charge for exactly twelve minutes after a year of use.

So, we sat down and really dug into the logic of it. We wanted a solution that gave us maximum performance without turning the battery into a paperweight.

Here is what we figured out, and why the "80% Solution" is the holy grail of laptop care.

## The Problem with "Full"

To understand why this is an issue, you have to understand a tiny bit about how modern Lithium-Ion batteries feel about life.

Imagine your battery is like a rubber band. When the battery is empty (0%), the rubber band is loose and lifeless. When the battery is full (100%), that rubber band is stretched to its absolute limit.

Now, imagine keeping that rubber band stretched tight for days, weeks, or months while your laptop sits on your desk plugged into the charger. Eventually, the rubber loses its elasticity. It gets tired.

That is essentially what happens when you keep a laptop charged to 100% all the time. The battery is in a state of high chemical stress. It's not "overcharging" (modern laptops are too smart to explode), but it is sitting at high voltage, which slowly degrades its capacity to hold energy later.

## The Problem with "Cycling"

*"Okay,"* Swar said, *"So I'll just charge it to 100%, unplug it, use it until it dies, and recharge it. Problem solved?"*

Not really. Batteries have a finite lifespan measured in "cycles." One cycle is using 100% of the battery's capacity. If you drain your battery every single day just to avoid leaving it plugged in, you are actively burning through the battery's lifespan. You're putting wear and tear on the tires just because you're afraid to park the car.

Plus, when you run on battery power, your laptop often throttles itself. It slows down the processor and dims the screen to save energy. You paid for a Ferrari; why drive it in school-zone mode?

## The 80% Solution

This is where our research led us to the Goldilocks zone.

Almost every modern laptop manufacturer (Dell, HP, Lenovo, Asus, Apple) now includes a feature often called **"Battery Protection Mode,"** **"Smart Charging,"** or **"Conservation Mode."**

When you turn this setting on, your laptop communicates with the charger and says, *"Hey, once I hit 80% (or sometimes 60%), stop sending juice to the battery."*

Here is why this is brilliant for three reasons:

**No Stress:** By stopping at 80%, the battery isn't "stretched" to its limit. It's relaxing in a comfortable state. It avoids the chemical stress that happens at 100%.

**Passthrough Power:** Once the battery hits that limit, the laptop is smart enough to bypass the battery entirely. It runs directly off the electricity coming from the wall. You aren't "using" the battery, so you aren't burning through your cycle count.

**Max Performance:** Because you are plugged into the wall, your CPU and GPU can draw as much power as they need. You get the full speed of your machine without the guilt of hurting the hardware.

## The Verdict

We came to a conclusion that satisfied both our need for speed and our anxiety about longevity.

If you are a **"desk warrior"**—someone who uses their laptop mostly in one spot—turn on Battery Protection Mode. Let it hover at 80%. Your battery will stay healthy for years because it's rarely stressed and rarely cycled.

If you need to go on a trip? Sure, turn the mode off and charge to 100% for that one day. But for day-to-day life, **80% is the magic number**. It's the perfect compromise between treating your tech with care and actually getting the performance you paid for.`
  }
];
