# Production Launch Plan

Bu dokuman, `bookmark-portfolio` projesini production'a cikarmak icin sade bir kontrol listesi sunar. Amac, gereksiz surec yuklemeden yayin oncesi kritik riskleri kapatmaktir.

## 1. Hedef
- Site production'da sorunsuz acilsin.
- Proje, writing ve bookmark detay sayfalari calissin.
- Arama indexi guncel olsun.
- Geri donus icin net bir rollback adimi olsun.

## 2. Launch Oncesi Kontrol

### Kod ve Icerik
- Yeni icerikler `content/projects`, `content/notes`, `content/bookmarks` altinda dogru yerde mi?
- Slug cakismasi var mi?
- Mock veya eski demo icerikler kaldirildi mi?
- Ana sayfada featured proje ve son icerikler beklendigi gibi mi?

### Build ve Test
- `npm run build`
- `npm run test`
- Kritik akislari manuel kontrol et:
  - Home
  - Project list + detail
  - Writing list + detail
  - Bookmark list + detail
  - Search
  - Tag page

### Ortam ve Deploy
- Vercel production env degiskenleri dogru mu?
- Domain ve redirect ayarlari tamam mi?
- Production build log'unda warning veya error var mi?

## 3. Launch Adimi
1. `main` branch temiz ve guncel olmali.
2. Son degisiklikler push edilmeli.
3. Vercel production deploy tetiklenmeli.
4. Deploy sonrasi smoke test yapilmali.

## 4. Smoke Test
- Home aciliyor mu?
- En az bir project detail aciliyor mu?
- En az bir writing detail aciliyor mu?
- En az bir bookmark detail aciliyor mu?
- Search sonuc veriyor mu?
- Mobil gorunumde menu ve filtreler kullanilabiliyor mu?

## 5. Rollback
- Production'da kritik hata varsa bir onceki saglikli deployment'a don.
- Sorun nedeni netlesmeden yeni deploy cikma.
- Gerekirse problemli icerigi geri alip yeniden `build` dogrulasi yap.

## 6. Launch Sonrasi Takip
- Ilk 24 saatte 404 ve runtime error kontrol et.
- Arama indexinde eski/olmayan icerik gorunuyor mu kontrol et.
- Yeni icerik ekleme akisinda `npm run build:index` atlanmis mi kontrol et.

## 7. Done Kriteri
- Deploy basarili
- Kritik sayfalar test edildi
- Search dogru sonuc donuyor
- Rollback yolu hazir
