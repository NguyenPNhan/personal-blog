// @ts-check
import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const site = process.env.SITE_URL

export default defineConfig({
  ...(site ? { site } : {}),
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
})
