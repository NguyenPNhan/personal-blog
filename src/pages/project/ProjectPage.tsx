import { Link } from 'react-router-dom'
import { projects } from './content'

function ProjectPage() {
  return (
    <section className="min-h-[calc(100vh-73px)] py-20 sm:py-24">
      <header className="mb-14 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Selected work</p>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Project</h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">Things I have designed, built, and learned from along the way.</p>
      </header>

      <div className="border-y border-stone-200">
        {projects.map((project) => (
          <Link
            key={project.filename}
            to={`/project/${project.filename}`}
            className="group block w-full border-b border-stone-200 px-1 py-8 last:border-b-0 sm:px-5 sm:py-10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-700">{project.metadata.status ?? 'Project'}</div>
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 transition group-hover:text-amber-700 sm:text-3xl">
                  {project.metadata.title ?? 'Untitled'}
                </h2>
                {project.metadata.excerpt && <p className="mt-3 text-base leading-7 text-stone-600 sm:text-lg">{project.metadata.excerpt}</p>}
              </div>
              <span className="shrink-0 text-xl text-stone-500 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      {projects.length === 0 && <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-stone-500">No projects found.</p>}
    </section>
  )
}

export default ProjectPage
