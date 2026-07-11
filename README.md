# Personal Blog

A personal website for publishing blog posts, projects, and research from Markdown files.

## Features

- Markdown-powered content with SHA-256 filenames
- Dedicated list and detail pages
- Admin editor with live Markdown preview
- Research PDF upload, preview, and paired export
- Responsive UI built with Tailwind CSS

## Tech stack

React, TypeScript, Vite, React Router, Tailwind CSS, and React Markdown.

## Development

```bash
npm install
npm run dev
```

Run checks with:

```bash
npm run lint
npm run build
```

## Content

Open `/admin` to create and export content. Place exported Markdown files in the matching `src/pages/<type>/data` directory. Paired research PDFs belong in `public/research`.
