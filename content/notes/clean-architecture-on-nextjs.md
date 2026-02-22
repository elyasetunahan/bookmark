---
title: "Next.js App Router'da Clean Architecture Sınırları"
slug: "clean-architecture-on-nextjs"
summary: "App Router projelerinde domain, application ve UI sınırlarını pratikte nerede çizdiğime dair notlar."
tags: ["nextjs", "architecture", "typescript"]
publishedAt: "2025-10-21"
topic: "Architecture"
---
Monorepo veya tek repo fark etmeksizin, içerik ve domain servislerini framework bağımsız tutmak uzun vadede değişim maliyetini azaltıyor.

## Sınır Prensibi
UI katmanı yalnızca use-case çağırmalı; veri erişim detayını bilmemeli.

## Pratik Sonuç
Test kapsamını artırmak kolaylaşıyor ve framework geçişleri daha düşük riskle yönetiliyor.
