import { loadMarkdownFiles } from '../../lib/markdown'

const files = import.meta.glob('./data/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const topics = loadMarkdownFiles(files)
