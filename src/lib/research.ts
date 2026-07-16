const paperFiles = import.meta.glob<string>('../content/research/*/paper.pdf', {
  eager: true,
  import: 'default',
  query: '?url',
})

export function researchPaperUrl(slug: string): string | undefined {
  return paperFiles[`../content/research/${slug}/paper.pdf`]
}
