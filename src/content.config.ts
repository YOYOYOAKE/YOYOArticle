import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/posts',
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      createTime: z.date(),
      lastEditedTime: z.date().optional(),
      completed: z.boolean(),
      top: z.boolean().default(false),
      tags: z.array(z.string()).optional(),
    }),
})

const jottings = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/jottings',
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      createTime: z.date(),
      lastEditedTime: z.date().optional(),
      completed: z.boolean(),
      top: z.boolean().default(false),
      tags: z.array(z.string()).optional(),
    }),
})

const friends = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/friends',
  }),
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),
      website: z.string(),
      icon: z.string(),
      draft: z.boolean().default(false),
    }),
})

const docs = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/docs',
  }),
  schema: () =>
    z.union([
      z.object({
        name: z.string(),
        description: z.string(),
        url: z.string().optional(),
        icon: z.string().optional(),
      }),
      z.object({
        title: z.string(),
        description: z.string(),
        createTime: z.date(),
        completed: z.boolean(),
      }),
    ]),
})

export const collections = { posts, jottings, friends, docs }
