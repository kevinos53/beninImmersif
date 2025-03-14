import { z, defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string(),
    category: z.string(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
      bio: z.string()
    }),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    readingTime: z.number()
  }),
});

// Exposez votre collection définie à Astro
// avec l'exportation `collections`
export const collections = { blog };