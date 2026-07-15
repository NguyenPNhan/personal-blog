# Project Continuation Guide

Read this before changing the project in a future session.

## Current architecture

- Astro 7, TypeScript, custom CSS, and Astro Content Collections.
- Routes:
  - `/`
  - `/blog` and `/blog/[slug]`
  - `/project` and `/project/[slug]`
  - `/research` and `/research/[slug]`
- The visual system follows the Astro Cartoon Portfolio direction: near-white paper, teal/coral/amber accents, broad pastel bands, irregular inked cards, rounded controls, and restrained motion.

## Content architecture

All entries use a stable filename inside a slug folder:

```text
src/content/blog/<slug>/markdown.md
src/content/project/<slug>/markdown.md
src/content/research/<slug>/markdown.md
```

The folder name, not the Markdown filename, becomes the route slug. There is no content hash requirement.

Supported frontmatter:

```yaml
---
title: Entry title
date: 2026-07-15
excerpt: Short list-page preview.
link: https://example.com # Project only
pdf: true # Research only
paperUrl: https://example.com/paper # Research only
---
```

Research PDFs live at `public/research/<slug>.pdf` and require `pdf: true`.

## UI constraints

- Preserve keyboard focus styles and `prefers-reduced-motion` behavior.
- Keep Project and Research actions available from their list cards.
- Do not add placeholder contact details, comments wired to another repository, or hash-based filenames.
- Do not restore the removed copyright/“Built with curiosity” footer copy.

## Verification

```bash
npm.cmd run check
npm.cmd run lint
npm.cmd run build
```
