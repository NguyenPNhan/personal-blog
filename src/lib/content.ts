import type { CollectionEntry } from 'astro:content'

export type ContentKind = 'blog' | 'project' | 'research'
export type AnyEntry = CollectionEntry<ContentKind>

export function entrySlug(entry: Pick<AnyEntry, 'id'>): string {
  const id = entry.id.replace(/\\/g, '/').replace(/\.md$/i, '')
  return id.endsWith('/markdown') ? id.slice(0, -'/markdown'.length) : id
}

export function sortNewest<T extends { data: { date: string } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.date.localeCompare(a.data.date))
}

export function formatDate(value: string): string {
  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return value
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(parsed)
}

export function excerpt(value = '', maxLength = 190): string {
  const normalized = value.replace(/\s+/g, ' ').trim()
  if (normalized.length <= maxLength) return normalized
  const shortened = normalized.slice(0, maxLength + 1).replace(/\s+\S*$/, '').trimEnd()
  return `${shortened || normalized.slice(0, maxLength).trimEnd()}…`
}
