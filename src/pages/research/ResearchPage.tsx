import { Link } from 'react-router-dom'
import { topics } from './content'
import { truncateText } from '../../lib/markdown'

function ResearchPage() {
  return (
    <section className="min-h-[calc(100vh-73px)] py-20 sm:py-24">
      <header className="mb-14 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-[-0.04em] sm:text-7xl">Research</h1>
      </header>

      <div className="space-y-4">
        {topics.map((topic) => {
          return (
            <article
              key={topic.filename}
              className="flex w-full flex-col gap-6 rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-stone-900/5 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
            >
              <Link to={`/research/${topic.filename}`} className="group block max-w-3xl flex-1">
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 transition group-hover:text-amber-700 sm:text-3xl">
                  {topic.metadata.title ?? 'Untitled'}
                </h2>
                {topic.metadata.excerpt && <p className="mt-3 text-base leading-7 text-stone-600 sm:text-lg">{truncateText(topic.metadata.excerpt)}</p>}
                <time className="mt-3 block text-sm text-stone-500" dateTime={topic.metadata.date}>{topic.metadata.date}</time>
              </Link>

              <div className="flex shrink-0 flex-wrap items-center gap-3">
                {topic.pdfUrl ? (
                  <a href={topic.pdfUrl} download className="rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700">
                    Download PDF
                  </a>
                ) : (
                  <button type="button" disabled className="cursor-not-allowed rounded-full bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400">
                    Download PDF
                  </button>
                )}
                {topic.metadata.paperUrl ? (
                  <a href={topic.metadata.paperUrl} target="_blank" rel="noreferrer" className="rounded-full border border-stone-900 px-4 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white">
                    Research paper
                  </a>
                ) : (
                  <button type="button" disabled className="cursor-not-allowed rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400">
                    Research paper
                  </button>
                )}
                <Link
                  to={`/research/${topic.filename}`}
                  aria-label={`View ${topic.metadata.title ?? 'research'} details`}
                  className="rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-amber-600 hover:text-amber-700"
                >
                  View details <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {topics.length === 0 && <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-stone-500">No research entries found.</p>}
    </section>
  )
}

export default ResearchPage
