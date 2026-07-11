import { Link } from 'react-router-dom'
import { projects } from './content'
import { truncateText } from '../../lib/markdown'

function ProjectPage() {
  return (
    <section className="min-h-[calc(100vh-73px)] py-20 sm:py-24">
      <header className="mb-14 max-w-2xl">
        <p className="mb-5 inline-flex rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Selected work</p>
        <h1 className="text-5xl font-bold tracking-[-0.04em] sm:text-7xl">Project</h1>
      </header>

      <div className="space-y-4">
        {projects.map((project) => (
          <article
            key={project.filename}
            className="flex w-full flex-col gap-6 rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-stone-900/5 sm:p-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <Link to={`/project/${project.filename}`} className="group block max-w-3xl flex-1">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 transition group-hover:text-amber-700 sm:text-3xl">
                  {project.metadata.title ?? 'Untitled'}
                </h2>
                {project.metadata.excerpt && <p className="mt-3 text-base leading-7 text-stone-600 sm:text-lg">{truncateText(project.metadata.excerpt)}</p>}
              </div>
            </Link>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {project.metadata.link ? (
                <a
                  href={project.metadata.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                  Visit project
                </a>
              ) : (
                <button type="button" disabled className="cursor-not-allowed rounded-full bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-400">
                  Visit project
                </button>
              )}
              <Link
                to={`/project/${project.filename}`}
                aria-label={`View ${project.metadata.title ?? 'project'} details`}
                className="rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:border-amber-600 hover:text-amber-700"
              >
                View details <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {projects.length === 0 && <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-stone-500">No projects found.</p>}
    </section>
  )
}

export default ProjectPage
