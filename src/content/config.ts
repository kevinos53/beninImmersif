import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
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
  })
});

export const collections = {
  'blog': blogCollection
}; 