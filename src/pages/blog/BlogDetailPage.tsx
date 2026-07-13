import { Link, useParams } from 'react-router-dom'
import MarkdownContent from '../../components/MarkdownContent'
import { posts } from './content'

function BlogDetailPage() {
  const { filename } = useParams()
  const post = posts.find((entry) => entry.filename === filename)

  if (!post) {
    return (
      <section className="py-24">
        <h1 className="text-4xl font-bold">Blog post not found</h1>
        <Link to="/blog" className="mt-6 inline-block font-semibold text-amber-700">Back to Blog</Link>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-73px)] py-10 sm:py-16">
      <Link to="/blog" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-amber-700">
        <span aria-hidden="true">&larr;</span> Back to Blog
      </Link>

      <article className="detail-surface mx-auto max-w-4xl p-6 sm:p-12 lg:p-16">
        <div className="text-sm text-stone-500">
          <time dateTime={post.metadata.date}>{post.metadata.date}</time>
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-6xl">{post.metadata.title ?? 'Untitled'}</h1>
        {post.metadata.excerpt && <p className="mt-6 text-xl leading-8 text-stone-600">{post.metadata.excerpt}</p>}
        <div className="mt-10 border-t border-stone-200 pt-10"><MarkdownContent content={post.content} /></div>
      </article>
    </section>
  )
}

export default BlogDetailPage
