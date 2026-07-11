# Project Continuation Plan

Read this file before changing the project in a future session.

## Goal

Maintain a polished personal website for publishing Markdown-based blog posts, projects, and research. Content must remain easy to export from the built-in admin editor and safe to discover at build time.

## Current state

- Stack: React 19, TypeScript, Vite, Tailwind CSS v4, React Router, and React Markdown.
- Main routes:
  - `/` — homepage
  - `/blog` and `/blog/:filename`
  - `/project` and `/project/:filename`
  - `/research` and `/research/:filename`
  - `/admin` — Markdown editor and exporter
- List pages show full-width entry cards with a short preview.
- Detail pages render the full Markdown document.
- Project entries expose an optional external project link.
- Research entries expose optional PDF download and paper-link actions.
- The UI uses warm neutral colors, amber accents, floating navigation, route transitions, responsive cards, and reduced-motion support.
- Tags have been removed from the UI, admin templates, parser usage, and Markdown data.

## Content architecture

Each content type loads Markdown through `import.meta.glob` in its `content.ts` file:

- `src/pages/blog/data/*.md`
- `src/pages/project/data/*.md`
- `src/pages/research/data/*.md`

Every Markdown filename must be the lowercase SHA-256 hash of the exact UTF-8 file contents:

```text
<sha256>.md
```

Editing a Markdown file changes its hash, so always calculate the new SHA-256 value and rename the file afterward.

Supported frontmatter:

```yaml
---
title: Entry title
date: 2026-07-11
excerpt: Short list-page preview.
status: Published
readingTime: 4 min read # Blog only
link: https://example.com # Project only
pdf: true # Research only
paperUrl: https://example.com/paper # Research only
---
```

Do not reintroduce `tags` unless explicitly requested.

## Research PDFs

The admin Research tab can upload and preview a PDF. Export produces matching basenames:

```text
<sha256>.md
<sha256>.pdf
```

Place the Markdown file in `src/pages/research/data` and the PDF in `public/research`. When frontmatter contains `pdf: true`, the Research pages infer the PDF URL from the Markdown filename.

## Admin behavior

- Blog, Project, and Research keep independent in-memory drafts.
- The live preview uses the same Markdown renderer as public pages.
- Exported Markdown uses the SHA-256 of its exact content as the filename.
- Research export downloads both Markdown and the uploaded PDF when a PDF is present.
- Drafts currently reset on page refresh; persistence has not been implemented.

## UI constraints

- Keep list entries full width and detail content on dedicated routes.
- Keep direct Project and Research action buttons visible on list entries.
- Missing optional links must render as disabled buttons.
- Preserve keyboard focus styles and `prefers-reduced-motion` behavior.
- Do not restore these intentionally removed text blocks:
  - Copyright/“Built with curiosity” footer copy
  - Homepage “Notes on software...” paragraph

## Verification

After changes, run:

```bash
npm.cmd run lint
npm.cmd run build
```

On this Windows environment, prefer `npm.cmd` because PowerShell may block the `npm.ps1` wrapper.

For content changes, also verify that every Markdown basename equals its SHA-256 hash.

## Sensible next steps

1. Add local draft persistence to the admin editor.
2. Add automated tests for frontmatter parsing and SHA-256 export behavior.
3. Add a deployment rewrite so React Router detail URLs work on direct page loads.
4. Perform desktop and mobile visual QA when browser tooling is available.
