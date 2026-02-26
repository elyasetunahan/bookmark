---
title: "Codex'ten Verimli Yararlanma Rehberi"
slug: "codex-verimli-kullanim-rehberi"
summary: "Codex ile daha hızlı ve tutarlı çıktı almak için AGENTS.md, skills, instructions ve README dosyalarını nasıl birlikte kullanabileceğini pratik örneklerle anlatan rehber."
tags: ["codex", "ai", "workflow", "documentation", "developer-experience"]
publishedAt: "2026-02-26"
topic: "AI Workflow"
---
Codex'i verimli kullanmanın ana kuralı, modele daha fazla konuşmak değil daha iyi bağlam vermektir. Bağlamı düzenli tuttuğunda hem daha hızlı hem daha az tekrar ile sonuç alırsın.

## 1) AGENTS.md: Çalışma Kurallarını Kilitle
`AGENTS.md`, ajan için "çalışma anlaşması" gibidir. Projede nasıl hareket edeceğini, neyi önceleyeceğini ve hangi araçları nasıl kullanacağını burada sabitlersin.

### Ne koymalı?
- Kod stili ve edit kuralları
- Test beklentileri
- Commit/push alışkanlıkları
- Özel komut tercihleri (örn. `rg` kullanımı)

### Basit örnek
"Bu repoda dosya ararken önce `rg --files`, test için önce `npm run test`, commit mesajları `feat/fix/chore` prefix'i ile atılsın."

## 2) Skills: Tekrarlanan İşleri Paketle
`skills`, belirli iş türleri için mini prosedürlerdir. Örneğin frontend tasarım, playwright test veya PDF üretimi gibi.

### Ne zaman skill kullanmalı?
- Aynı tip görev sık geliyorsa
- Belli bir kalite standardı korunacaksa
- Araç zinciri her seferinde aynıysa

### Basit örnek
"[$frontend-design] kullanarak landing page hero bölümünü yeniden tasarla; mevcut renk sistemini koru, sadece tipografi ve yerleşimi iyileştir."

Bu tarz net bir çağrı, modelin genel amaçlı davranış yerine ilgili skill prosedürünü takip etmesini sağlar.

## 3) Instructions: Task-Level Sınırları Netleştir
`instructions`, o anki işin sınırlarını belirler. Kısa ama karar verdirici olmalı.

### İyi instruction özellikleri
- Amaç net
- Kapsam net (in/out)
- Teslim formatı net
- Kısıtlar net

### Basit örnek
"Sadece `content/bookmarks` altında değişiklik yap. Mevcut dosyaları silme. Yeni bookmark ekle, ardından `npm run build:index` çalıştır."

Bu kadar net bir instruction, yanlış dosya değişimi ve gereksiz yan adımları ciddi azaltır.

## 4) README: Proje Gerçeğinin Tek Kaynağı
`README`, model için teknik gerçeklik kaynağıdır: komutlar, klasör yapısı, şema, çalışma akışı.

### README'de özellikle bulunmalı
- Kurulum/çalıştırma komutları
- İçerik veya veri şemaları
- Kritik klasörler
- Sık hata ve çözüm notları

### Basit örnek
Bu repoda `README`, `content/projects|notes|bookmarks` şemasını ve `npm run build:index` adımını açıkça verdiği için modelin doğru klasöre yazıp index güncellemesini güvenilir hale getiriyor.

## 5) En Verimli Kombinasyon
Pratikte en iyi sonuç genelde şu sırayla geliyor:
1. `AGENTS.md` ile davranış kurallarını sabitle
2. Uygun `skill` çağrısı yap
3. Task özelinde kısa `instructions` ver
4. `README` ile gerçek komut/şema doğrulat

Bu sıralama modelin hem doğru düşünmesini hem doğru yere müdahale etmesini sağlar.

## 6) Dikkat Edilmesi Gerekenler
- Belirsiz istekten kaçın: "Bir şeyler düzelt" yerine hedef dosya ve çıktı söyle.
- Tek adımda çok iş yükleme: büyük işi parçalara böl, her adımı doğrula.
- Doğrulama adımı atlama: index/test/build gibi kontrol komutunu her değişiklikte işlet.
- Eski context'e güvenme: geçerli kararı her yeni task'ta kısa tekrar et.

## Kısa Şablon
Aşağıdaki formatı kopyalayıp task başlangıcında kullanabilirsin:

```md
Hedef: [ne yapılacak]
Kapsam: [hangi dosya/klasörler]
Kısıt: [dokunulmayacak yerler]
Beklenen çıktı: [dosya, commit, rapor]
Doğrulama: [çalıştırılacak komutlar]
```

Bu şablon tek başına bile Codex çıktısının kalitesini belirgin artırır.
