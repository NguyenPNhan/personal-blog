# NguyenPNhan's Blog

A playful Astro portfolio for blog posts, projects, and research.

## Features

- Astro 7 static routes and content collections
- Cartoon portfolio visual system inspired by Astro Cartoon Portfolio
- Blog, project, and research list/detail pages
- Markdown with GFM tables, math/KaTeX, syntax highlighting, and copyable code blocks
- Research PDF download support

## Development

```bash
npm install
npm run dev
```

Validation:

```bash
npm run check
npm run lint
npm run build
```

## Publishing content

Create a URL-friendly folder for each entry and add a file named `markdown.md`:

```text
src/content/blog/my-post/markdown.md
src/content/project/my-project/markdown.md
src/content/research/my-research/markdown.md
```

The folder name becomes the public URL slug. For example:

```text
src/content/blog/my-post/markdown.md → /blog/my-post
```

For research PDFs, set `pdf: true` in frontmatter and place the file at:

```text
public/research/my-research.pdf
```

The PDF basename must match the research entry folder name. Markdown filenames never need to be renamed or hashed.

For production metadata, set `SITE_URL` to the deployed origin before building. Astro will then emit absolute canonical and social-image URLs.

## Visual theme

The palette and cartoon-portfolio direction are inspired by the [Astro Cartoon Portfolio](https://github.com/tomcomtang/astro-cartoon-portfolio) theme. See `THIRD_PARTY_NOTICES.md` for attribution.
