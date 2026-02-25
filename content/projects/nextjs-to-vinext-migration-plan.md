---
title: "Mevcut Next.js Projesini vinext'e Taşıma Planı"
slug: "nextjs-to-vinext-migration-plan"
summary: "Cloudflare vinext yaklaşımına göre eldeki bir Next.js projesini Vite tabanlı vinext ve Cloudflare Workers hedefine taşımak için teknik geçiş planı."
tags: ["nextjs", "vinext", "cloudflare-workers", "migration", "vite"]
publishedAt: "2026-02-25"
role: "Platform Engineer"
stack: ["Next.js", "vinext", "Vite", "Cloudflare Workers", "KV"]
featured: false
impact: "Build süresini düşürme ve Cloudflare runtime ile geliştirme/deploy tutarlılığı sağlama"
links:
  - label: "Cloudflare Blog (vinext)"
    url: "https://blog.cloudflare.com/vinext/"
  - label: "vinext Repo"
    url: "https://github.com/cloudflare/vinext"
---
## Problem
Mevcut Next.js proje akışında Node dev/runtime ile hedef serverless runtime arasında farklar var. Ayrıca deploy zinciri platforma özel dönüşümler gerektiriyor.

## Hedef
Eldeki Next.js kod tabanını minimum kırılım ile vinext'e geçirip Cloudflare Workers üzerinde çalıştırmak.

## Varsayımlar
- Proje App Router veya Pages Router kullanıyor.
- Kod tabanı tamamen statik pre-render bağımlısı değil.
- Cloudflare hesabı, Workers ve KV altyapısı erişilebilir.

## Geçiş Planı
### 1) Hazırlık ve Envanter
1. Mevcut Next.js sürümü, router tipi ve runtime bağımlılıklarını çıkar.
2. `generateStaticParams()` ve build-time static pre-render bağımlı sayfaları listele.
3. Middleware, Server Actions ve cache stratejisini dökümante et.

### 2) Teknik POC Branch
1. Ayrı bir migration branch aç.
2. `vinext` kur:
   - `npm install vinext`
3. Script'lerde `next` yerine `vinext` kullan:
   - `vinext dev`
   - `vinext build`
4. Lokal smoke test: kritik route'lar, form submit, auth akışları.

### 3) Runtime ve Caching Uyarlaması
1. Cloudflare Workers deploy hedefini etkinleştir.
2. ISR için KV tabanlı cache handler entegre et:
   - `KVCacheHandler` + `setCacheHandler(...)`
3. Gerekirse cache backend stratejisini (KV/R2) payload karakteristiğine göre seç.

### 4) Uyum ve Risk Kontrolleri
1. Blogdaki "experimental" durum nedeniyle production öncesi ek doğrulama katmanı koy.
2. Static pre-rendering eksikliği nedeniyle tamamen statik sayfaları yeniden değerlendir.
3. Kritik sayfalarda SSR + cache davranışını ölç.

### 5) Deploy ve Rollout
1. İlk deploy: `vinext deploy`.
2. Trafik yoğunluğu yüksek projelerde kontrollü şekilde `--experimental-tpr` dene.
3. Canary rollout: düşük trafik segmenti -> tam trafik.

### 6) Geri Dönüş Planı
- Rollout boyunca mevcut Next.js deploy hattını canlı tut.
- Hata durumunda trafik yeniden mevcut Next.js sürümüne yönlendirilsin.

## Kabul Kriterleri
- Kritik kullanıcı akışları fonksiyonel olarak eşdeğer çalışmalı.
- Build/deploy pipeline tek komutla tekrarlanabilir olmalı.
- Gözlemlenebilirlik metrikleri (latency, error rate) baseline ile karşılaştırılmalı.
- Rollback prosedürü dokümante ve test edilmiş olmalı.

## Not
Cloudflare makalesine göre vinext deneysel durumda. Bu nedenle geçiş "big bang" yerine kontrollü, ölçümlü ve rollback hazır şekilde yapılmalı.
