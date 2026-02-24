---
title: "Vercel Changelog: npm i chat (Chat SDK)"
slug: "vercel-chat-sdk-changelog"
summary: "Vercel'in Chat SDK duyurusu: tek TypeScript kod tabanıyla Slack, Teams, Discord, GitHub ve diğer platformlara bot dağıtma yaklaşımı."
tags: ["chat-sdk", "vercel", "typescript", "bots", "ai-sdk"]
publishedAt: "2026-02-23"
url: "https://vercel.com/changelog/chat-sdk"
why: "Çok platformlu bot geliştirmede tek kod tabanı, type-safe event akışı ve stream destekli yanıt gönderimi için referans."
---
Bu changelog, `chat` paketini public beta olarak tanıtıyor.

Öne çıkan noktalar:

- Tek kod tabanıyla birden fazla chat platformuna bot dağıtımı
- Event-driven ve type-safe handler modeli (mention, message, reaction, slash command vb.)
- JSX ile platforma uyarlanan kart/modal UI bileşenleri
- Durum yönetimi için pluggable adapter yaklaşımı (Redis/ioredis/in-memory)
- `post()` çağrılarında AI SDK text stream desteği ile gerçek zamanlı yanıt akışı

Ek doküman: https://chat-sdk.dev/docs
