import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
		schema: ({ image }) =>
			z.object({
				title: z.string(),
				description: z.string(),
				// Transform string to Date object
				pubDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				heroImage: image().optional(),
				category: z.string().default('Reflection'),
				readTime: z.string().default('5 min read'),
				author: z.object({
					name: z.string(),
					credential: z.string(),
					type: z.enum(['human', 'synthetic']).default('synthetic'),
					avatar: image().optional(),
					sigilHue: z.number().min(0).max(360).default(28),
				}),
			}),
});

export const collections = { blog };
