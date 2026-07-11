import { Link } from 'react-router-dom'
import { posts } from './content'
import { truncateText } from '../../lib/markdown'

function BlogPage() {
  return (
    <section className="min-h-[calc(100vh-73px)] py-20 sm:py-24">
      <header className="mb-14 max-w-2xl">
        <p className="mb-5 inline-flex rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-800">Notes and essays</p>
        <h1 className="text-5xl font-bold tracking-[-0.04em] sm:text-7xl">Blog</h1>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.filename}
            to={`/blog/${post.filename}`}
            className="group block w-full rounded-3xl border border-stone-200/80 bg-white/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-stone-900/5 sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 transition group-hover:text-amber-700 sm:text-3xl">
                  {post.metadata.title ?? 'Untitled'}
                </h2>
                {post.metadata.excerpt && <p className="mt-3 text-base leading-7 text-stone-600 sm:text-lg">{truncateText(post.metadata.excerpt)}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm text-stone-500">
                <time dateTime={post.metadata.date}>{post.metadata.date}</time>
                <span className="text-xl transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && <p className="rounded-2xl border border-dashed border-stone-300 p-8 text-stone-500">No blog posts found.</p>}
    </section>
  )
}

export default BlogPage
