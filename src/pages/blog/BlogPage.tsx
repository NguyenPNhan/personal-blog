import { Link } from 'react-router-dom'
import { posts } from './content'

function BlogPage() {
  return (
    <section className="min-h-[calc(100vh-73px)] py-20 sm:py-24">
      <header className="mb-14 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Notes and essays</p>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Blog</h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">Thoughts on design, software, learning, and the process behind the work.</p>
      </header>

      <div className="border-y border-stone-200">
        {posts.map((post) => (
          <Link
            key={post.filename}
            to={`/blog/${post.filename}`}
            className="group block w-full border-b border-stone-200 px-1 py-8 last:border-b-0 sm:px-5 sm:py-10"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-bold tracking-tight text-stone-900 transition group-hover:text-amber-700 sm:text-3xl">
                  {post.metadata.title ?? 'Untitled'}
                </h2>
                {post.metadata.excerpt && <p className="mt-3 text-base leading-7 text-stone-600 sm:text-lg">{post.metadata.excerpt}</p>}
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
