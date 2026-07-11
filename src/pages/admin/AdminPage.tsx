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
tags: React, Writing
status: Draft
readingTime: 3 min read
---

## Start writing

Write your blog post in **Markdown** here.
`,
  project: `---
title: A new project
date: 2026-07-11
excerpt: A short description of this project.
tags: React, TypeScript
status: In progress
link:
---

## About the project

Describe what you built, the problem it solves, and what you learned.
`,
  research: `---
title: A new research entry
date: 2026-07-11
excerpt: A short description of this research.
tags: Research, Notes
status: In progress
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
    <section className="min-h-[calc(100vh-73px)] py-12 sm:py-16">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Content tools</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Markdown editor</h1>
          <p className="mt-3 text-stone-600">Each content type keeps a separate draft and exports its own hashed file.</p>
        </div>
        <button
          type="button"
          onClick={exportMarkdown}
          className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
        >
          Export {labels[contentType]} .md
        </button>
      </header>

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Content type">
        {(Object.keys(labels) as ContentType[]).map((type) => (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={contentType === type}
            onClick={() => setContentType(type)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              contentType === type ? 'bg-amber-100 text-amber-900' : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            {labels[type]}
          </button>
        ))}
      </div>

      <p className="mb-6 break-all rounded-xl bg-amber-50 px-4 py-3 font-mono text-xs text-amber-900">
        {labels[contentType]} filename: {hash}.md
        {contentType === 'research' && researchPdf && <><br />PDF filename: {hash}.pdf</>}
      </p>

      {contentType === 'research' && (
        <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">Research PDF</h2>
              <p className="mt-1 text-sm text-stone-500">
                Uploading a PDF sets <code>pdf: true</code> and includes the paired PDF in the export.
              </p>
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

      <div className="grid overflow-hidden rounded-2xl border border-stone-200 bg-white lg:grid-cols-2">
        <div className="border-b border-stone-200 lg:border-b-0 lg:border-r">
          <div className="border-b border-stone-200 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">{labels[contentType]} Markdown</div>
          <textarea
            aria-label={`${labels[contentType]} Markdown editor`}
            value={markdown}
            onChange={(event) => updateDraft(event.target.value)}
            spellCheck="true"
            className="min-h-[620px] w-full resize-y bg-stone-950 p-5 font-mono text-sm leading-7 text-stone-100 outline-none"
          />
        </div>
        <div>
          <div className="border-b border-stone-200 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">Preview</div>
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

      <p className="mt-5 text-sm leading-6 text-stone-500">
        Place this export in <code>src/pages/{contentType}/data</code>. Its SHA-256 filename is generated from the exact exported content.
        {contentType === 'research' && researchPdf && (
          <> Place the paired PDF in <code>public/research</code>.</>
        )}
      </p>
    </section>
  )
}

export default AdminPage
