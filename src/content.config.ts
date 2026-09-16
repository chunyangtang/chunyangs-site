import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { venueIds } from '../data/venues';

// A folder is an entry's permanent ID; changing its title never changes its URL.
const folderLoader = (collection: string) => glob({
  base: `./src/content/${collection}`,
  pattern: '**/index.md',
  generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\/index\.md$/, ''),
});

const externalUrl = z.string().url().refine(
  (value) => /^https?:\/\//.test(value),
  'Use an absolute HTTP or HTTPS URL.',
);

const resource = z.object({
  label: z.string().min(1),
  url: externalUrl,
  kind: z.enum(['paper', 'code', 'demo', 'website']).default('website'),
});

const detailFields = {
  title: z.string().min(1),
  description: z.string().min(1),
  detailPage: z.boolean().default(false),
  updatedDate: z.coerce.date().optional(),
  links: z.array(resource).default([]),
};

const blog = defineCollection({
  loader: folderLoader('blog'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default(['General']),
  }),
});

const publications = defineCollection({
  loader: folderLoader('publications'),
  schema: ({ image }) => z.object({
    ...detailFields,
    authors: z.array(z.string().min(1)).min(1),
    venue: z.enum(venueIds),
    articleType: z.string().optional(),
    pubDate: z.coerce.date(),
    doi: z.string().regex(/^10\.\d{4,9}\/\S+$/).optional(),
    thumbnail: image().optional(),
    thumbnailAlt: z.string().optional(),
    image: image().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    imageCredit: z.string().optional(),
    contribution: z.string().optional(),
    media: z.array(z.object({
      title: z.string().min(1),
      outlet: z.string().min(1),
      url: externalUrl,
      featured: z.boolean().default(false),
      institutional: z.boolean().default(false),
    })).default([]),
  }),
});

const projects = defineCollection({
  loader: folderLoader('projects'),
  schema: ({ image }) => z.object({
    ...detailFields,
    status: z.enum(['Active', 'Completed', 'Archived']),
    category: z.string().min(1),
    tech: z.array(z.string()),
    order: z.number().int().nonnegative(),
    image: image(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { blog, publications, projects };
