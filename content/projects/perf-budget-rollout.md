---
title: "Performance Budget Rollout"
slug: "performance-budget-rollout"
summary: "Web performans metriklerini release gate haline getirerek Core Web Vitals regresyonlarını erken aşamada yakalayan süreç."
tags: ["performance", "web-vitals", "frontend"]
publishedAt: "2025-02-20"
role: "Frontend Engineer"
stack: ["Lighthouse", "Playwright", "GitHub Actions"]
featured: false
impact: "LCP p75 3.0sn'den 2.1sn'ye indi"
links:
  - label: "Checklist"
    url: "https://example.com/checklist"
---
## Problem
Sprint sonunda fark edilen performans sorunları düzeltme maliyetini yükseltiyordu.

## Yaklaşım
Kritik sayfalar için bütçe sınırları tanımlayıp CI aşamasında eşik ihlalinde build'i durduran kontrol ekledim.

## Sonuç
Regresyonlar prod öncesinde yakalanmaya başladı ve kullanıcı deneyimi daha stabil hale geldi.
