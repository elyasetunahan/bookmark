---
title: "Static Sitelerde Hızlı Client-side Arama"
slug: "client-search-at-static-scale"
summary: "Build-time index üreterek runtime backend olmadan karma içerikte hızlı arama sunma yaklaşımı."
tags: ["search", "static-site", "performance"]
publishedAt: "2025-04-11"
topic: "Search"
---
Küçük ve orta ölçekli içerik sitelerinde aramayı sunucu endpointine taşımak çoğu zaman gereksiz karmaşıklık oluşturuyor.

## Yaklaşım
Build sırasında JSON index üret, istemcide query ile filtrele ve temel skorlamayı title/tag eşleşmesine göre yap.

## Sonuç
Maliyet düşük kalırken algılanan performans yüksek oluyor.
