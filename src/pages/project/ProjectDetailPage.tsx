import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '../../components/MarkdownContent'
import { splitList } from '../../lib/markdown'
import { projects } from './content'

function ProjectDetailPage() {
  const { filename } = useParams()
  const project = projects.find((entry) => entry.filename === filename)

  if (!project) {
    return (
      <section className="py-24">
        <h1 className="text-4xl font-bold">Project not found</h1>
        <Link to="/project" className="mt-6 inline-block font-semibold text-amber-700">Back to Project</Link>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-73px)] py-10 sm:py-16">
      <Link to="/project" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-amber-700">
        <span aria-hidden="true">&larr;</span> Back to Project
      </Link>

      <article className="mx-auto max-w-4xl rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/50 sm:p-12 lg:p-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-700">{project.metadata.status ?? 'Project'}</span>
          {project.metadata.link ? (
            <a href={project.metadata.link} target="_blank" rel="noreferrer" className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700">Visit project</a>
          ) : (
            <button type="button" disabled className="cursor-not-allowed rounded-full bg-stone-200 px-5 py-3 text-sm font-semibold text-stone-400">Visit project</button>
          )}
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{project.metadata.title ?? 'Untitled'}</h1>
        {project.metadata.excerpt && <p className="mt-6 text-xl leading-8 text-stone-600">{project.metadata.excerpt}</p>}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools used">
          {splitList(project.metadata.tags).map((tool) => <li key={tool} className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">{tool}</li>)}
        </ul>
        <div className="mt-10 border-t border-stone-200 pt-10"><MarkdownContent content={project.content} /></div>
      </article>
    </section>
  )
}

export default ProjectDetailPage
