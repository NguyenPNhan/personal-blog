import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const shared = {
  title: z.string(),
  date: z.union([z.string(), z.date()]).transform((value) => (
    typeof value === 'string' ? value : value.toISOString().slice(0, 10)
  )),
  excerpt: z.string().optional(),
}

const blog = defineCollection({
  loader: glob({ pattern: '**/markdown.md', base: './src/content/blog' }),
  schema: z.object(shared),
})

const project = defineCollection({
  loader: glob({ pattern: '**/markdown.md', base: './src/content/project' }),
  schema: z.object({
    ...shared,
    link: z.union([z.url(), z.literal(''), z.null()]).optional().transform((value) => value ?? ''),
  }),
})

const research = defineCollection({
  loader: glob({ pattern: '**/markdown.md', base: './src/content/research' }),
  schema: z.object({
    ...shared,
    pdf: z.boolean().optional(),
    paperUrl: z.union([z.url(), z.literal(''), z.null()]).optional().transform((value) => value ?? ''),
  }),
})

export const collections = { blog, project, research }
