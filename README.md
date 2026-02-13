# Chunyang's Site

Personal academic website built with Astro + Tailwind CSS (v4), with dark mode, blog content collections, and image optimization.

## Stack

- Astro 5
- Tailwind CSS 4 via `@tailwindcss/vite`
- Astro Content Collections (`src/content/`)
- Markdown + KaTeX (remark/rehype plugins)

## Quick Start

```bash
npm install
npm run dev
```

App runs locally at `http://localhost:4321`.

## Commands

- `npm run dev`: start dev server
- `npm run build`: production build to `dist/`
- `npm run preview`: preview production build
- `npm run astro`: run Astro CLI

## Project Layout

```text
src/
  components/   UI sections (Navbar, BentoGrid, Hobbies, ThemeToggle)
  layouts/      Shared page shell + global scripts
  pages/        Route files
  content/      Blog markdown content + collection schema
  styles/       Global Tailwind/CSS customizations
data/
  cv.ts         Education/publication data
  site.ts       Shared profile/contact links
```

## Content Notes

- Blog posts are under `src/content/blog/<slug>/index.md`.
- Post images can live next to the markdown file (for example `src/content/blog/<slug>/image.jpg`) and be referenced as `./image.jpg` in the markdown.
- Site-wide profile/contact values are centralized in `data/site.ts`.
- CV and publication data live in `data/cv.ts`.
