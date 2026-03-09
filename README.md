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

## İçerik Operasyon Kısayolları
- `bookmark <url veya konu>`: `content/bookmarks` altında yeni kayıt veya güncelleme yapılır.
- `project <link veya fikir>`: `content/projects` altında teknik plan/proje kaydı oluşturulur.
- `write <konu>`: `content/notes` altında uzun form yazı oluşturulur.

Her içerik değişiminden sonra arama indexi güncellenir:
- `npm run build:index`

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

## Repo Skill Dokümantasyonu
Bu repoda `bookmark/project/write` akışları için yerel skill dokümanları bulunur:

- `docs/skills/bookmark-repo-orchestrator/SKILL.md`
- `docs/skills/bookmark-flow/SKILL.md`
- `docs/skills/project-flow/SKILL.md`
- `docs/skills/write-flow/SKILL.md`
- `docs/skills/verification.md`

Hızlı başlangıç için:
- `docs/skills/README.md`
