# Scentmoon

A personal writing and blog site built with [Next.js](https://nextjs.org)
(React), statically exported and hosted on GitHub Pages.

## Writing a post

Add a Markdown file to `content/posts/`. The filename becomes the URL slug.

```md
---
title: "My new post"
date: 2026-09-10
excerpt: "A one or two sentence summary shown on the archive page."
tags:
  - writing
  - essay
---

Your words here. Markdown is supported, including **bold**, *italics*,
[links](https://example.com), images, and `code`.
```

The site rebuilds automatically on every push to `main`.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
pnpm build
```

The fully static site is written to `out/`, ready for any static host.

## Customizing the site

- Site name, description, and URL live in `src/lib/site.ts`.
- The header/footer layout is in `src/app/layout.tsx`.
- Page copy is in `src/app/page.tsx` and `src/app/about/`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which exports the
site and publishes it to GitHub Pages.

To use a custom domain:

1. Add your domain (e.g. `example.com`) in the repository's Pages settings,
   or create `public/CNAME` containing just your domain.
2. At your DNS provider, point the domain at GitHub Pages:
   - `A` records for the apex: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - a `CNAME` from `www` to `juinpejuinpe.github.io`
3. Update `SITE_URL` in `src/lib/site.ts`.
