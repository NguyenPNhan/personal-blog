import { useEffect, useState } from 'react'
import MarkdownContent from '../../components/MarkdownContent'
import { parseMarkdown } from '../../lib/markdown'

type ContentType = 'blog' | 'project' | 'research'

const labels: Record<ContentType, string> = {
  blog: 'Blog',
  project: 'Project',
  research: 'Research',
}

const starters: Record<ContentType, string> = {
  blog: `---
title: A new blog post
date: 2026-07-11
excerpt: A short description of this post.
readingTime: 3 min read
---

## Start writing

Write your blog post in **Markdown** here.
`,
  project: `---
title: A new project
date: 2026-07-11
excerpt: A short description of this project.
link:
---

## About the project

Describe what you built, the problem it solves, and what you learned.
`,
  research: `---
title: A new research entry
date: 2026-07-11
excerpt: A short description of this research.
pdf:
paperUrl:
---

## Research question

Describe the question, method, findings, and next steps.
`,
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function AdminPage() {
  const [contentType, setContentType] = useState<ContentType>('blog')
  const [drafts, setDrafts] = useState<Record<ContentType, string>>(starters)
  const [researchPdf, setResearchPdf] = useState<File | null>(null)
  const [researchPdfUrl, setResearchPdfUrl] = useState('')
  const [hash, setHash] = useState('Calculating...')
  const markdown = drafts[contentType]
  const preview = parseMarkdown('preview.md', markdown)

  useEffect(() => {
    let active = true
    sha256(markdown).then((value) => active && setHash(value))
    return () => { active = false }
  }, [markdown])

  useEffect(() => {
    return () => {
      if (researchPdfUrl) URL.revokeObjectURL(researchPdfUrl)
    }
  }, [researchPdfUrl])

  const updateDraft = (value: string) => {
    setDrafts((current) => ({ ...current, [contentType]: value }))
  }

  const updateResearchPdf = (file: File | null) => {
    setResearchPdf(file)
    setResearchPdfUrl(file ? URL.createObjectURL(file) : '')
    setDrafts((current) => ({
      ...current,
      research: current.research.replace(/^pdf:.*$/m, file ? 'pdf: true' : 'pdf:'),
    }))
  }

  const downloadFile = (data: Blob, filename: string) => {
    const url = URL.createObjectURL(data)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  const exportMarkdown = async () => {
    const basename = await sha256(markdown)
    downloadFile(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }), `${basename}.md`)

    if (contentType === 'research' && researchPdf) {
      window.setTimeout(() => downloadFile(researchPdf, `${basename}.pdf`), 100)
    }
  }

  return (
    <section className="min-h-[calc(100vh-73px)] py-14 sm:py-20">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Content tools</p>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">Markdown studio</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">Write, preview, and export each content type as a verified SHA-256 file.</p>
        </div>
        <button
          type="button"
          onClick={exportMarkdown}
          className="primary-button"
        >
          Export {labels[contentType]} .md
        </button>
      </header>

      <div className="mb-6 inline-flex flex-wrap gap-1 rounded-full border border-stone-200 bg-white/80 p-1.5 shadow-sm" role="tablist" aria-label="Content type">
        {(Object.keys(labels) as ContentType[]).map((type) => (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={contentType === type}
            onClick={() => setContentType(type)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              contentType === type ? 'bg-stone-950 text-white shadow-sm' : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            {labels[type]}
          </button>
        ))}
      </div>

      <p className="mb-6 break-all rounded-2xl border border-stone-800 bg-stone-950 px-5 py-4 font-mono text-xs leading-6 text-amber-300 shadow-lg shadow-stone-900/10">
        {labels[contentType]} filename: {hash}.md
        {contentType === 'research' && researchPdf && <><br />PDF filename: {hash}.pdf</>}
      </p>

      {contentType === 'research' && (
        <section className="mb-6 rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">Research PDF</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700">
                {researchPdf ? 'Replace PDF' : 'Upload PDF'}
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  className="sr-only"
                  onChange={(event) => updateResearchPdf(event.target.files?.[0] ?? null)}
                />
              </label>
              {researchPdf && (
                <button
                  type="button"
                  onClick={() => updateResearchPdf(null)}
                  className="rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {researchPdfUrl ? (
            <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              <div className="border-b border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-500">
                {researchPdf?.name}
              </div>
              <iframe
                title="Uploaded research PDF preview"
                src={researchPdfUrl}
                className="h-[600px] w-full"
              />
            </div>
          ) : (
            <div className="mt-5 flex h-48 items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50 text-sm text-stone-500">
              Upload a PDF to preview it here.
            </div>
          )}
        </section>
      )}

      <div className="grid grid-cols-2 overflow-x-auto rounded-3xl border border-stone-200/80 bg-white shadow-xl shadow-stone-900/5">
        <div className="min-w-[28rem] border-r border-stone-200">
          <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-500">
            <span>{labels[contentType]} Markdown</span><span className="size-2 rounded-full bg-amber-500" />
          </div>
          <textarea
            aria-label={`${labels[contentType]} Markdown editor`}
            value={markdown}
            onChange={(event) => updateDraft(event.target.value)}
            spellCheck="true"
            className="min-h-[620px] w-full resize-y bg-[#141210] p-6 font-mono text-sm leading-7 text-stone-100 outline-none"
          />
        </div>
        <div className="min-w-[28rem]">
          <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-500">
            <span>Preview</span><span className="text-[10px] font-medium normal-case tracking-normal text-stone-400">Live</span>
          </div>
          <article className="min-h-[620px] p-6 sm:p-8">
            <p className="mb-2 text-sm text-stone-500">{preview.metadata.date}</p>
            <h2 className="mb-3 text-3xl font-semibold tracking-tight">{preview.metadata.title ?? 'Untitled'}</h2>
            {preview.metadata.excerpt && <p className="mb-5 text-stone-600">{preview.metadata.excerpt}</p>}

            {contentType === 'project' && (
              <p className="mb-6 text-sm text-stone-500">Project link: {preview.metadata.link || 'Not specified'}</p>
            )}
            {contentType === 'research' && (
              <div className="mb-6 space-y-1 text-sm text-stone-500">
                <p>PDF: {preview.metadata.pdf || 'Not specified'}</p>
                <p>Paper: {preview.metadata.paperUrl || 'Not specified'}</p>
              </div>
            )}

            <MarkdownContent content={preview.content} />
          </article>
        </div>
      </div>
    </section>
  )
}

export default AdminPage
