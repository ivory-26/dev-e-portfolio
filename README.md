# Sahil Karpe – Dev E-Portfolio

Modern personal portfolio built with Vite + React, Tailwind, and a Gemini-powered voice match experience. This repo is ready for GitHub and production hosting, with clear setup instructions and deployment guidance.

Live AI Studio app: https://ai.studio/apps/drive/1UOD7kRKzX5Vd0MvzY4M0MJ3ygGuw90I-

## Features

- Responsive hero, skills, projects, and blog/activity sections
- Interactive widgets (GitHub stats, Spotify, voice match) powered by custom hooks
- Gemini Live transcription via `useGeminiLive`
- Scroll restoration, animated buttons, and reusable UI cards

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS & Framer Motion-inspired animations
- Google AI Studio (Gemini Live API)
- Lucide icons + custom widgets

## Getting Started

**Prerequisites**

- Node.js 18+
- npm (comes with Node.js)

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` (if the example file is missing, create `.env.local` manually) and set:

```
VITE_GEMINI_API_KEY=your-google-ai-studio-key
```

### Run Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel

1. Install the Vercel CLI (`npm i -g vercel`) or connect the repo in the dashboard.
2. When prompted for environment variables, add `VITE_GEMINI_API_KEY`.
3. Vercel detects Vite automatically using `vercel.json`; default build command is `npm run build` and output directory is `dist`.
4. Deploy via `vercel` (preview) and `vercel --prod` (production) or use the Vercel dashboard buttons.

### Other Static Hosts

1. Run `npm run build` to generate the production bundle in `dist/`.
2. Upload the `dist/` folder to Netlify, Cloudflare Pages, GitHub Pages, etc.
3. Set `VITE_GEMINI_API_KEY` as an environment variable in your hosting provider’s dashboard so the Gemini widgets can authenticate.

## Folder Overview

```
components/  Shared UI (Navbar, Footer, cards, widgets)
hooks/       Custom hooks including Gemini Live integration
pages/       Route-level sections (Home, Projects, Experience, etc.)
public/      Static assets (profile photo, favicon, etc.)
```

## Credits & Acknowledgements

- **Google AI Studio** for powering the Gemini Live transcription experience used by `useGeminiLive`.
- Open-source libraries: Vite, React, Tailwind CSS, Lucide Icons, and Framer Motion community snippets.

## Contributing

Issues and PRs are welcome. Please open an issue describing the improvement or bug first so we can coordinate changes.

