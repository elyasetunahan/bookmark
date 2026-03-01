---
title: "seomachine'i Codex'e Entegre Etme Rehberi"
slug: "seomachine-codex-entegrasyon-rehberi"
summary: "TheCraigHewitt/seomachine yapısını Codex akışına uyarlayıp araştırma, yazım ve optimizasyon süreçlerini tek bir içerik üretim pipeline'ına dönüştürme rehberi."
tags: ["codex", "seo", "content", "integration", "workflow"]
publishedAt: "2026-03-01"
topic: "AI Workflow"
---
`seomachine` açık kaynak bir "SEO içerik üretim workspace" yapısı sunuyor. Temelde araştırma -> yazım -> optimizasyon döngüsünü standartlaştırıyor. Repo Claude Code etrafında tasarlanmış olsa da, aynı yapıyı Codex ile verimli şekilde çalıştırmak mümkün.

Repo: https://github.com/TheCraigHewitt/seomachine

## seomachine'den Alınacak Ana Yapı
Repoda özellikle şu klasör düzeni dikkat çekiyor:

- `context/` (brand voice, SEO kuralları, link haritası gibi kalıcı bağlam)
- `topics/` (işlenecek konu havuzu)
- `research/` (araştırma çıktıları)
- `drafts/` (ilk taslaklar)
- `output/` ve `published/` (son içerik ve yayın takibi)

Bu ayrım Codex tarafında da çok değerli, çünkü modelin her task'ta doğru dosyaya yazmasını kolaylaştırıyor.

## Codex Tarafında Entegrasyon Planı

### 1) CLAUDE.md -> AGENTS.md eşlemesi
`seomachine` içinde Claude odaklı yönergeler var. Codex'te bunun karşılığı `AGENTS.md`.

Ne yapılmalı:
- İçerik kalitesi kuralları
- SEO kontrol listesi
- Yazım tonu
- Komut ve çıktı formatı beklentisi

hepsi `AGENTS.md` içine taşınmalı.

Basit örnek:

```md
SEO yazılarında başlıkta ana keyword geçmeli.
İlk 120 kelimede konu vaadi net olmalı.
Her yazıda en az 3 iç link önerisi üret.
Taslak dosyaları yalnızca content/notes altında oluştur.
```

### 2) Slash command akışını Codex task şablonuna çevir
Repo README'sinde `/research`, `/write`, `/optimize`, `/analyze-existing` gibi komut akışı var.

Codex'te bunu şu şekilde uygula:
- Her adımı ayrı prompt/task olarak çalıştır
- Çıktıyı ilgili klasöre yazdır
- Bir sonraki adımda önceki dosyayı input olarak ver

Örnek akış:
1. "X konusu için araştırma notu üret ve `research/x.md` yaz"
2. "Bu araştırmadan taslak üret ve `drafts/x.md` yaz"
3. "Taslağı SEO açısından optimize edip `output/x.md` yaz"

### 3) context dosyalarını zorunlu giriş haline getir
Codex'in kalitesi en çok burada artar. Özellikle:
- `context/brand-voice.md`
- `context/seo-guidelines.md`
- `context/internal-links-map.md`

her yazım task'ında referans gösterilmeli.

Örnek prompt:

```md
`context/brand-voice.md` ve `context/seo-guidelines.md` kurallarına uyarak
"[topic]" için 1800 kelimelik Türkçe taslak üret.
Çıktıyı `drafts/[slug].md` yaz.
```

### 4) Doğrulama katmanı ekle
Yazı üretimi kadar kalite kontrol de otomatikleşmeli.

Minimum kontrol listesi:
- Ana keyword başlıkta var mı?
- İlk paragrafta konu ve hedef kitle net mi?
- İç link önerileri anlamlı mı?
- Çok tekrar eden ifadeler var mı?

Bunu Codex'te "revizyon task" olarak çalıştırıp final dosyayı güncel tutabilirsin.

## Önerilen Codex Workflow (Kısa)
1. Topic seç (`topics/`)
2. Research üret (`research/`)
3. Draft yaz (`drafts/`)
4. SEO optimize et (`output/`)
5. Son kontrol + publish hazırla (`published/`)

## Pratik Uyarılar
- Tek prompt'ta tüm pipeline'ı çalıştırma; adım adım git.
- Her adımda dosya yolu ve çıktı formatını net söyle.
- Brand voice dosyası yoksa üretim başlamadan önce mutlaka oluştur.
- İç link haritası güncel değilse öneriler zayıf olur; düzenli bakım yap.

## Sonuç
`seomachine` bir araçtan çok bir çalışma modeli. Codex ile en iyi sonuç, bu modelin klasör disiplini + bağlam dosyaları + adımlı görev yaklaşımı korununca alınıyor.
