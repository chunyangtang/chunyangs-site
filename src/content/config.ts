import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// z = Zod (a schema validation library, like Pydantic in Python)
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default(["General"]),
	}),
});

export const collections = { blog };
