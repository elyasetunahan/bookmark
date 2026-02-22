---
title: "Content Pipeline Rewrite"
slug: "content-pipeline-rewrite"
summary: "Markdown odaklı içerik üretimini otomatik validasyon ve statik index ile ölçeklenebilir hale getiren yeniden yazım çalışması."
tags: ["content", "automation", "typescript"]
publishedAt: "2025-06-14"
role: "Software Engineer"
stack: ["TypeScript", "Node.js", "Vercel"]
featured: true
impact: "Release süresi 2 günden 4 saate indi"
links:
  - label: "Postmortem"
    url: "https://example.com/postmortem"
---
## Problem
İçerik ekleme süreçleri elle ve dağınık yürüdüğü için yayın kalitesi düşüyordu.

## Yaklaşım
Frontmatter doğrulaması, slug çakışma kontrolü ve build-time arama index üretimini aynı pipeline içinde topladım.

## Sonuç
Editöryel ekip daha hızlı yayın almaya başladı; hatalı içerik deploy edilmesi belirgin şekilde azaldı.
