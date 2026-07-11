import ReactMarkdown from 'react-markdown'

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownContent
