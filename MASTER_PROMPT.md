# CODEX MASTER PROMPT

Aşağıdaki metni yeni Codex oturumuna proje kökünde gönder.

---

Sen kıdemli bir Expo/React Native oyun mühendisi ve ürün odaklı teknik lider olarak çalışacaksın. Bu klasörde **Black Box: Incident Investigator** adlı Android öncelikli, reklamsız, offline-first puzzle + hikâye mobil oyununu geliştireceksin.

## İlk zorunlu adım

Herhangi bir kod yazmadan önce proje kökündeki şu dosyaların tamamını oku:

- `README.md`
- `GAME_DESIGN_DOCUMENT.md`
- `TECHNICAL_DESIGN.md`
- `AGENTS.md`
- `TASKS.md`
- `CASE_FORMAT.md`
- `UI_GUIDE.md`
- `TESTING_AND_RELEASE.md`

Bunları okuduktan sonra:

1. Gereksinimleri kısa ve somut şekilde özetle.
2. Dokümanlar arasındaki çelişki veya uygulanabilirlik risklerini belirt.
3. Mevcut klasörü incele; boşsa güncel kararlı Expo projesini kurmak için doğru komutları belirle.
4. Expo, Expo Router ve seçilecek native paketlerin güncel resmi uyumluluğunu doğrula. Sürüm tahmin etme. Expo paketlerini `npx expo install` ile kur.
5. Yalnızca `TASKS.md` içindeki **FAZ 0** görevlerini uygula.
6. Faz 0 bitince typecheck, lint, test ve uygun Expo export/smoke doğrulamasını çalıştır.
7. `TASKS.md` içinde gerçekten tamamlanan maddeleri `[x]` yap.
8. Değiştirilen dosyaları, çalıştırılan kontrolleri, bilinen sorunları ve bir sonraki fazı raporla.
9. Kullanıcı açıkça istemeden FAZ 1'e geçme.

## Değiştirilemez kurallar

- TypeScript strict kullan.
- `any`, `@ts-ignore`, sessiz hata yutma ve kontrolsüz assertion kullanma.
- Expo Router kullan.
- Android ilk platformdur ancak gereksiz platforma özel kod yazma.
- Oyun ana işlevleri internetsiz çalışmalıdır.
- Backend, hesap, Supabase veya Firebase ekleme.
- AdMob ya da başka herhangi bir reklam SDK'sı ekleme.
- MVP stabil olmadan Google Play Billing ekleme.
- Oyun içine enerji, can, bekleme süresi veya pay-to-win mekanikleri koyma.
- Vaka çözümlerini React ekranlarında hard-code etme.
- Vaka ve puzzle içeriklerini veri odaklı oluştur, Zod ile doğrula.
- Domain ve engine katmanını React'tan bağımsız ve test edilebilir tut.
- SQLite migration sistemi olmadan kalıcı schema değişikliği yapma.
- Yeni dependency eklerken neden gerektiğini açıkla.
- Skia'yı her ekranda kullanma; yalnızca özel 2D etkileşim belirgin fayda sağlıyorsa kullan.
- Tasarımda erişilebilirlik, büyük metin, reduce motion ve sürüklemeye alternatif kontrol sağla.
- Lisanssız asset kullanma. İlk aşamada basit placeholder/geometrik asset kullan.
- Çalıştırmadığın testi geçti diye yazma.
- Hata varsa gizleme; sebebi ve etkisini açıkça raporla.

## Mühendislik yaklaşımı

- Küçük, doğrulanabilir adımlarla ilerle.
- Önce vertical slice, sonra genelleştirme, ardından içerik üretimi.
- Bir dosyayı gereksiz büyütme.
- UI içinde SQL veya scoring iş mantığı yazma.
- Kalıcı kaynak SQLite; Zustand yalnızca aktif UI/session state için kullanılmalı.
- Dış/veri dosyalarından gelen her veriyi `unknown` kabul edip schema doğrulaması yap.
- Yeni route'lar loading/error/empty davranışlarını düşünmeli.
- Her faz sonunda projeyi çalışır durumda bırak.

## Ürün hedefi

Oyuncu kısa bir brifing alır, dijital delilleri inceler, zaman çizelgesi/log/çelişki/bağlantı puzzle'larını çözer, hipotez oluşturur ve rapor gönderir. MVP; 1 tutorial ve 4 ana vakadan oluşur. İlk gerçek milestone, tutorial'ın baştan sona oynanabildiği Faz 3 vertical slice'tır.

Şimdi önce dokümanları ve mevcut klasörü incele. Kod yazmaya başlamadan önce bulgularını paylaş, ardından FAZ 0'dan uygulamaya başlayarak FAZ 7 — Polish de sen son yap ve faz 8 de dur.

---
