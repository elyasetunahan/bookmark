---
title: "Codex ile Çift-Ajan Eş Zamanlı Çalışma Planı"
slug: "codex-multi-agent-collab-plan"
summary: "Aynı klasörde çalışan iki Codex ajanını kontrollü şekilde koordine etmek için operasyonel plan ve dosya tabanlı protokol." 
tags: ["codex", "multi-agent", "workflow", "collaboration", "automation", "engineering"]
publishedAt: "2026-03-02"
role: "Tech Lead"
stack: ["Codex", "Markdown", "Git", "Node.js"]
featured: true
impact: "İki ajanın çakışmadan ilerlemesini, kararların görünür kalmasını ve deterministik teslimat üretimini sağlamak"
links:
  - label: "Ops Guide"
    url: "https://skills.sh/vercel-labs/agent-browser/dogfood"
---
## Hedef
Aynı klasörü dinleyen iki Codex ajanının (A ve B) eş zamanlı çalışmasını güvenli, deterministik ve tekrar edilebilir hale getirmek. Ana amaç: hız kazanırken kaliteyi ve izlenebilirliği korumak.

## Temel İlke ve Varsayımlar
- **Tek iletişim kanalı:** Dosya tabanlı mesajlaşma (ör. `chat.md`).
- **Tek karar kaynağı:** Karar kayıtları için ayrı dosya (ör. `decisions.md`).
- **Çakışma kontrolü:** Her ajan kendi iş alanını açıkça ilan eder ve dosya kilidi yaklaşımı uygular.
- **İş parçalama:** Modüler görev parçaları; tek ajan = tek parçayı sahiplenir.

## Mimari Yaklaşım
### 1) İletişim Protokolü (Dosya Tabanlı)
- `chat.md`: senkronizasyon ve kısa mesajlar
- `decisions.md`: alınan kararlar (ne, neden, ne zaman)
- `status.md`: her ajanın anlık durum ve sahiplik kaydı

**Mesaj formatı (örnek):**
```
## [Ajan-A] - Mesaj #12
Saat: 10:42
Konu: combat sistemine kritik fix
Durum: Uyguluyor
Not: rooms.js ile çakışma riski yok
```

**Karar formatı (örnek):**
```
## Karar #5: Save/Load Yapısı
Tarih: 2026-03-02
Karar: JSON tabanlı state snapshot
Gerekçe: hızlı prototip + debuggability
Sahip: Ajan-B
```

## Çalışma Planı
### Faz 0 — Kurulum
1. Ortak klasörde `chat.md`, `decisions.md`, `status.md` oluştur.
2. Her ajan kendi sorumluluk alanını `status.md` içine yazar.
3. Ortak kurallar `decisions.md` içine kaydedilir.

### Faz 1 — Görev Bölme
- Büyük hedefler 3–5 modüle bölünür.
- Her modül tek ajanın sorumluluğundadır.
- Dosya sahipliği açıkça tanımlanır.

**Örnek görev dağılımı:**
- Ajan-A: çekirdek motor (state, loop, save/load)
- Ajan-B: içerik ve UI (rooms, events, renderer)

### Faz 2 — Paralel Geliştirme
- Her ajan sadece kendi dosyalarında çalışır.
- Diğer ajana dokunması gereken dosya varsa `chat.md` üzerinden izin ister.
- Büyük refactor’larda `decisions.md` güncellenir.

### Faz 3 — Entegrasyon ve Doğrulama
- Birleştirme öncesi local testler çalıştırılır.
- Çapraz bağımlılık check listesi tamamlanır:
  - API uyumluluğu
  - JSON şeması eşleşmesi
  - CLI/UX yüzeyi

## Kalite ve Doğrulama
### Minimum Doğrulama Seti
- `npm test` (varsa)
- Entegrasyon senaryosu: en az 1 “happy path”
- Kritik fail senaryoları: boş input, beklenmeyen dosya

### Gözlemlenebilirlik
- Hata logları tek dosyada toplanır (`logs/errors.log`)
- Kritik metrikler: build süresi, test süresi, crash count

## Riskler ve Önlemler
- **Dosya çakışması:** `status.md` ile sahiplik takibi
- **Karar kirliliği:** tüm kararlar `decisions.md`’e yazılır
- **Zaman kaybı:** iletişim kuralları kısa ve deterministik tutulur

## Rollout
1. **Alpha:** tek feature modülü, iki ajan paralel yürütür.
2. **Beta:** 2–3 modül, çapraz bağımlılık test edilir.
3. **GA:** stabil modül akışı + otomasyon (lint/test) pipeline

## Çıktılar
- Net iletişim kanalı
- İzlenebilir karar defteri
- Parçalı görev dağılımı
- Hızlı ve güvenli entegrasyon

## Başarı Kriterleri
- Tek commit’te çalışan, tek seferde açılan ürün
- 7–10 dk içinde ilk çalışan demo
- Çakışma oranı sıfır veya minimum
