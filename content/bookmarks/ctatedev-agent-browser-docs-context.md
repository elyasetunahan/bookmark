---
title: "Agent Browser Dogfood: Repro-first web app QA workflow"
slug: "ctatedev-agent-browser-docs-context"
summary: "Vercel Labs dogfood skill: web uygulamalarını sistematik gezip her issue için kanıtlı ve tekrar üretilebilir QA raporu üretme akışı."
tags: ["agent-browser", "qa", "ux-testing", "repro", "agents"]
publishedAt: "2026-02-24"
url: "https://skills.sh/vercel-labs/agent-browser/dogfood"
why: "Agent tabanlı test sürecinde bulguları kanıtla yazmak ve rapor kalitesini standardize etmek için doğrudan uygulanabilir bir rehber."
---
Dogfood skill'in ana mesajı: uygulamayı rastgele değil, sistematik şekilde gez; her bulguyu anında ve kanıtla dokümante et.

Öne çıkan noktalar:

- Sadece hedef URL zorunlu, diğer parametreler için makul defaultlar var.
- `agent-browser` binary'sini doğrudan kullanmayı öneriyor (`npx agent-browser` yerine).
- 6 adımlı akış: initialize -> authenticate -> orient -> explore -> document -> wrap up.
- Repro-first prensibi: interactive bug'larda video + adım screenshot; statik görsel bug'larda tek annotate screenshot yeterli.
- Her issue bulunduğu anda rapora eklenmeli; sona bırakılmamalı.
- Hedef kalite: az ama güçlü kanıtlı bulgu (5-10 iyi dokümante issue), belirsiz toplu liste değil.

Tweet referansı: https://x.com/ctatedev/status/2026357704617267314?s=20
