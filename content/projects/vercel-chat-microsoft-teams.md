---
title: "Vercel Chat'i Microsoft Teams'e Entegre Etme"
slug: "vercel-chat-microsoft-teams"
summary: "https://github.com/vercel/chat projesini Microsoft Teams kanalında kullanılabilir hale getirmek için entegrasyon çalışması."
tags: ["vercel-chat", "microsoft-teams", "integration", "ai", "nextjs"]
publishedAt: "2026-02-25"
role: "Product Engineer"
stack: ["Next.js", "Vercel AI SDK", "Microsoft Bot Framework", "Vercel"]
featured: true
impact: "Teams üzerinden tek bir bot arayüzüyle kurum içi AI kullanımını mümkün kılma"
links:
  - label: "Project Repo"
    url: "https://github.com/vercel/chat"
---
## Hedef
`vercel/chat` tabanlı sohbet deneyimini Microsoft Teams kanalına taşıyarak ekiplerin mevcut çalışma alanı içinde AI ile etkileşime geçmesini sağlamak.

## Kapsam
- Teams tarafında sadece mention ve direct message trafiğini chat backend'ine yönlendirme
- Yanıtları Teams formatında geri gönderme
- Oturum, kullanıcı ve kanal bazlı bağlam yönetimi
- Şimdilik yalnızca metin mesajı desteği (dosya/ek kapsam dışı)

## 1) Amaç
`vercel/chat` uygulamasını Teams içinde çalışır hale getirerek kullanıcıların ayrı bir web arayüzüne geçmeden AI sohbeti kullanmasını sağlamak.

## 2) Başarı Kriterleri
- Teams'ten gelen mention veya direct message bot tarafından işlenmeli.
- Mesaj, `vercel/chat` inference hattına iletilmeli.
- Yanıt 3-8 saniye içinde Teams'e geri dönmeli (MVP hedefi).
- Her Teams conversation için bağımsız thread/context tutulmalı.

## 3) Mimari Yaklaşım (MVP)
1. Teams App + Bot Registration
- Microsoft Entra App kaydı
- Azure Bot resource oluşturma
- Messaging endpoint: `/api/teams/messages`

2. Adapter Katmanı
- Bot Framework Activity -> uygulama içi normalize edilmiş mesaj modeli
- Normalize edilen mesajı mevcut chat servis çağrısına dönüştürme

3. Context ve Session Eşleme
- Ana anahtar: `tenantId + teamId + conversationId + userId`
- Bu anahtar, `vercel/chat` tarafında thread/session karşılığına map edilir.

4. Response Dönüşümü
- LLM çıktısı Teams mesaj formatına çevrilir.
- MVP'de tek parça final message gönderilir (streaming Phase 2).

## 4) Uygulama Adımları
1. Teams bot kimlik bilgilerini güvenli env değişkenleri olarak ekle.
2. `/api/teams/messages` endpoint'ini oluştur (POST activity webhook).
3. Activity doğrulama + imza doğrulama katmanını ekle.
4. Gelen activity türlerini filtrele (`message`, `conversationUpdate`, `invoke`) ve sadece mention/DM mesajlarını işleme al.
5. `message` aktivitelerinde sadece metin payload'ını chat pipeline'a ilet.
6. Yanıtı Teams'e geri post et.
7. Hata senaryoları için fallback mesajları ekle.
8. Gözlemlenebilirlik: request-id, latency, provider error logları.

## 5) Teknik Riskler ve Önlemler
- Risk: Teams rate limit / timeout
  - Önlem: kısa yanıt-first stratejisi, retry/backoff.
- Risk: Yanıt formatı taşması
  - Önlem: maksimum karakter ve chunking kuralı.
- Risk: Çok tenantlı veri karışması
  - Önlem: tenant bazlı namespace + strict keying.

## 6) Güvenlik
- Bot endpoint çağrılarında kaynak doğrulaması zorunlu.
- Secret'lar yalnızca sunucu tarafında tutulmalı.
- PII içeren loglar maskelenmeli.

## 7) Test Planı
- Unit: activity parser, session key generator, response formatter.
- Integration: Teams mock activity -> chat pipeline -> Teams response.
- E2E: gerçek Teams test tenant üzerinde mention ve thread akışları.
- Negatif test: kanalda mention olmayan mesajların bot tarafından yok sayılması.
- Negatif test: dosya/ek mesajlarında "henüz desteklenmiyor" fallback mesajı.

## 8) Rollout
1. Internal alpha: 1 ekip, tek kanal.
2. Beta: 3-5 ekip, kullanım ve hata metrikleri takibi.
3. GA: dokümantasyon + self-service kurulum adımları.

## 9) Operasyonel Checklist
- [ ] Entra App credentials hazır
- [ ] Bot endpoint production URL aktif
- [ ] Env secret'lar Vercel'e set edildi
- [ ] Log/alert dashboard hazır
- [ ] On-call fallback prosedürü yazıldı

## 10) Kilitlenmiş Kararlar
- Kapsam: Mention + Direct Message.
- İçerik tipi: Şimdilik sadece metin mesajı.
- Yanıt modeli: MVP'de final message, streaming Phase 2.
