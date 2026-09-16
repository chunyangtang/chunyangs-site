# Chunyang's Site

Chunyang Tang's personal website: research publications, project showcases, writing, and personal interests. It supports dark mode, responsive layouts, and optimized images.

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
- `npm test`: build and check detail routes, existing blog URLs, media links, and local links/images

## Project Layout

```text
src/
  components/   UI sections, publication/project items, authors, and resource links
  layouts/      Shared page shell and detail-page layout
  pages/        Route files
  content/      Blog, publication, and project folders with Markdown and local images
  content.config.ts  Collection loaders and schemas
  lib/content.ts     Queries, sorting, URL generation, and detail-page validation
  styles/       Global Tailwind/CSS customizations
data/
  cv.ts         Education data
  site.ts       Shared profile/contact links
  venues.ts     Journal/conference names, types, and accent colors
design/         Editable publication artwork and its source notes
```

## Content Notes

- Blog posts are under `src/content/blog/<slug>/index.md`.
- Post images can live next to the markdown file (for example `src/content/blog/<slug>/image.jpg`) and be referenced as `./image.jpg` in the markdown.
- Site-wide profile/contact values are centralized in `data/site.ts`.
- Education data live in `data/cv.ts`.

## Publications and Projects

Each item is a folder containing `index.md` and its images. Frontmatter supplies the listing and detail-page header; Markdown supplies the longer introduction.

- Publications: `src/content/publications/<id>/index.md` -> `/publications/<id>`; listed on the profile page.
- Projects: `src/content/projects/<id>/index.md` -> `/projects/<id>`; listed on the projects page.
- Keep folder names stable after publishing: they determine each page's URL independently of its title.
- Set `detailPage: true` to give an item its own page. Publication pages need a Markdown introduction; project pages can start with their summary, screenshot, and resources.
- Publications appear newest first by `pubDate`; projects follow their numeric `order`.
- Store images beside the entry and use relative paths such as `image: ./overview.png`. Provide descriptive alt text. Publications can have a separate 4:3 `thumbnail` for the listing and a larger `image` with a caption for the detail page.
- Use `contribution` for a concise account of your role. Add reports to `media`, setting `featured: true` for selected coverage near the introduction and `institutional: true` for an institution's own reporting.
- Register journal and conference names in `data/venues.ts` and reference the venue ID in each publication.

The [content schema](src/content.config.ts) describes all supported fields. Shared components keep author lists, venue labels, project status, and external-link indicators consistent across the site.

See [publication artwork](design/README.md) for the editable thumbnail sources.
