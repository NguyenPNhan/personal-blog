import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import BlogPage from './pages/blog/BlogPage'
import BlogDetailPage from './pages/blog/BlogDetailPage'
import ProjectPage from './pages/project/ProjectPage'
import ProjectDetailPage from './pages/project/ProjectDetailPage'
import ResearchPage from './pages/research/ResearchPage'
import ResearchDetailPage from './pages/research/ResearchDetailPage'
import AdminPage from './pages/admin/AdminPage'

const navigation = [
  { label: 'Blog', to: '/blog' },
  { label: 'Project', to: '/project' },
  { label: 'Research', to: '/research' },
  { label: 'Admin', to: '/admin' },
]

const collections = [
  {
    number: '01',
    title: 'Writing',
    description: 'Notes and essays about software, design, and lessons learned along the way.',
    to: '/blog',
    link: 'Browse the blog',
  },
  {
    number: '02',
    title: 'Projects',
    description: 'Selected things I have designed, built, shipped, and kept improving.',
    to: '/project',
    link: 'See the work',
  },
  {
    number: '03',
    title: 'Research',
    description: 'Longer investigations, working notes, papers, and open questions.',
    to: '/research',
    link: 'Explore research',
  },
]

function Navigation() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-lg shadow-stone-900/5 backdrop-blur-xl sm:rounded-full sm:px-6"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 text-base font-bold tracking-tight text-stone-950 transition-colors hover:text-amber-700 sm:text-lg"
        >
          <span className="grid size-9 place-items-center rounded-full bg-stone-950 text-sm text-white">NP</span>
          <span className="hidden sm:inline">Personal Blog<span className="text-amber-600">.</span></span>
        </Link>

        <ul className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-all sm:px-4 ${
                    isActive
                      ? 'bg-stone-950 text-white shadow-sm'
                      : 'text-stone-500 hover:bg-stone-100 hover:text-stone-950'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function Home() {
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden py-20 sm:py-28">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="relative max-w-5xl">
          <p className="eyebrow">Ideas, experiments, and discoveries</p>
          <h1 className="mt-7 text-5xl font-bold leading-[0.98] tracking-[-0.06em] text-stone-950 sm:text-7xl lg:text-8xl">
            A place for things I <span className="relative isolate whitespace-nowrap text-amber-600">learn<span className="absolute -bottom-1 left-0 -z-10 h-2 w-full rounded-full bg-amber-200/70" /></span> and build.
          </h1>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/blog" className="primary-button">Read the blog <span aria-hidden="true">&rarr;</span></Link>
            <Link to="/project" className="secondary-button">Explore projects</Link>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32" aria-labelledby="explore-heading">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Explore</p>
            <h2 id="explore-heading" className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Three threads, one body of work.</h2>
          </div>
          <div className="hidden h-px flex-1 bg-stone-200 sm:block" />
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.to} to={collection.to} className="collection-card group">
              <span className="font-mono text-xs font-bold text-amber-700">{collection.number}</span>
              <h3 className="mt-12 text-2xl font-bold tracking-tight">{collection.title}</h3>
              <p className="mt-3 leading-7 text-stone-600">{collection.description}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-stone-900">
                {collection.link} <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
    </footer>
  )
}

function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-73px)] flex-col justify-center py-24">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
        404
      </p>
      <h1 className="mb-8 text-5xl font-semibold tracking-tight">Page not found</h1>
      <Link to="/" className="font-medium text-amber-700 hover:text-amber-800">
        Return home
      </Link>
    </section>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen text-stone-900">
      <Navigation />
      <main className="mx-auto max-w-7xl px-5 sm:px-8">
        <div key={location.pathname} className="page-enter">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:filename" element={<BlogDetailPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/project/:filename" element={<ProjectDetailPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/research/:filename" element={<ResearchDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
