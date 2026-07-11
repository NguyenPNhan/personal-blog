import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '../../components/MarkdownContent'
import { topics } from './content'

const enabledAction = 'inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700'
const disabledAction = 'inline-flex cursor-not-allowed items-center justify-center rounded-full bg-stone-200 px-5 py-3 text-sm font-semibold text-stone-400'

function ResearchDetailPage() {
  const { filename } = useParams()
  const topic = topics.find((entry) => entry.filename === filename)

  if (!topic) {
    return (
      <section className="py-24">
        <h1 className="text-4xl font-bold">Research entry not found</h1>
        <Link to="/research" className="mt-6 inline-block font-semibold text-amber-700">Back to Research</Link>
      </section>
    )
  }

  const pdfUrl = topic.metadata.pdf === 'true'
    ? `${import.meta.env.BASE_URL}research/${topic.filename.replace(/\.md$/, '.pdf')}`
    : topic.metadata.pdf

  return (
    <section className="min-h-[calc(100vh-73px)] py-10 sm:py-16">
      <Link to="/research" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-amber-700">
        <span aria-hidden="true">&larr;</span> Back to Research
      </Link>

      <article className="detail-surface mx-auto max-w-4xl p-6 sm:p-12 lg:p-16">
        <div className="flex flex-wrap items-center gap-3">
          <time className="text-sm text-stone-500" dateTime={topic.metadata.date}>{topic.metadata.date}</time>
          {topic.metadata.status && <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs text-stone-600">{topic.metadata.status}</span>}
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-6xl">{topic.metadata.title ?? 'Untitled'}</h1>
        {topic.metadata.excerpt && <p className="mt-6 text-xl leading-8 text-stone-600">{topic.metadata.excerpt}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          {pdfUrl ? <a className={enabledAction} href={pdfUrl} download>Download PDF</a> : <button type="button" className={disabledAction} disabled>Download PDF</button>}
          {topic.metadata.paperUrl ? <a className={enabledAction} href={topic.metadata.paperUrl} target="_blank" rel="noreferrer">Research paper</a> : <button type="button" className={disabledAction} disabled>Research paper</button>}
        </div>
        <div className="mt-10 border-t border-stone-200 pt-10"><MarkdownContent content={topic.content} /></div>
      </article>
    </section>
  )
}

export default ResearchDetailPage
