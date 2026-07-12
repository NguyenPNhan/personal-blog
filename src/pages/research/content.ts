import { loadMarkdownFiles } from '../../lib/markdown'

const markdownFiles = import.meta.glob('./data/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const pdfFiles = import.meta.glob('./data/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

const pdfUrls = new Map(
  Object.entries(pdfFiles).map(([path, url]) => [
    path.split('/').pop()?.replace(/\.pdf$/i, ''),
    String(url),
  ]),
)

export const topics = loadMarkdownFiles(markdownFiles).map((topic) => ({
  ...topic,
  pdfUrl: pdfUrls.get(topic.filename.replace(/\.md$/i, '')),
}))
