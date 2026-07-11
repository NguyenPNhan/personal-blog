export type MarkdownDocument = {
  filename: string
  metadata: Record<string, string>
  content: string
}

export function parseMarkdown(filename: string, source: string): MarkdownDocument {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  const metadata: Record<string, string> = {}

  if (frontmatter) {
    for (const line of frontmatter[1].split(/\r?\n/)) {
      const separator = line.indexOf(':')
      if (separator === -1) continue

      const key = line.slice(0, separator).trim()
      const value = line.slice(separator + 1).trim()
      metadata[key] = value
    }
  }

  return {
    filename: filename.split('/').pop() ?? filename,
    metadata,
    content: frontmatter ? source.slice(frontmatter[0].length) : source,
  }
}

export function loadMarkdownFiles(modules: Record<string, unknown>): MarkdownDocument[] {
  return Object.entries(modules)
    .map(([filename, source]) => parseMarkdown(filename, String(source)))
    .sort((a, b) => (b.metadata.date ?? '').localeCompare(a.metadata.date ?? ''))
}

export function splitList(value = ''): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}
