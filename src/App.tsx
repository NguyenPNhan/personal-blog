import { Link, NavLink, Route, Routes } from 'react-router-dom'
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

function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight transition-colors hover:text-amber-700"
        >
          Personal Blog<span className="text-amber-700">.</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-3">
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                    isActive
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:bg-stone-200/70 hover:text-stone-950'
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
    <section className="flex min-h-[calc(100vh-73px)] items-center py-24">
      <div className="max-w-3xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Ideas, experiments, and discoveries
        </p>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
          A place for things I learn and build.
        </h1>
      </div>
    </section>
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
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navigation />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Routes>
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
      </main>
    </div>
  )
}

export default App
