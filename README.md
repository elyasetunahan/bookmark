# Portfolio + Writing + Bookmarks

Portfolio-first bilgi sitesi: projeler, blog tarzı writing notları ve bookmark arşivi.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Markdown içerik modeli
- Build-time statik arama indexi (`public/search-index.json`)

## Sayfalar
- `/`
- `/projects` / `/projects/[slug]`
- `/writing` / `/writing/[slug]`
- `/bookmarks` / `/bookmarks/[slug]`
- `/about`
- `/tags/[tag]`

## İçerik Klasörleri
- `content/projects/*.md`
- `content/notes/*.md`
- `content/bookmarks/*.md`

## Komutlar
- `npm run dev` → önce arama indexi üretir, sonra dev server açar
- `npm run build:index` → `public/search-index.json` üretir
- `npm run build` → prod build
- `npm run test` → unit testler (Vitest)
- `npm run test:e2e` → e2e testler (Playwright)

## Frontmatter Şeması
### Project
```yaml
title: string
slug: kebab-case string
summary: string
tags: string[]
publishedAt: ISO date string
role: string?
stack: string[]?
links: { label: string, url: string }[]?
featured: boolean?
impact: string?
```

### Writing (note)
```yaml
title: string
slug: kebab-case string
summary: string
tags: string[]
publishedAt: ISO date string
topic: string?
```

### Bookmark
```yaml
title: string
slug: kebab-case string
summary: string
tags: string[]
publishedAt: ISO date string
url: valid URL
why: string?
```
