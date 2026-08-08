# AGENTS.md

Bu dosya Codex için bağlayıcı proje kurallarını içerir.

## 1. Çalışma Biçimi

1. Kod yazmadan önce `README.md`, `GAME_DESIGN_DOCUMENT.md`, `TECHNICAL_DESIGN.md`, `TASKS.md`, `CASE_FORMAT.md`, `UI_GUIDE.md` ve `TESTING_AND_RELEASE.md` dosyalarını oku.
2. Bir seferde yalnızca mevcut fazın görevlerini uygula.
3. Büyük belirsizliklerde rastgele özellik ekleme. En küçük güvenli ve test edilebilir çözümü seç.
4. Her fazın sonunda:
   - typecheck çalıştır
   - lint çalıştır
   - testleri çalıştır
   - Expo export veya uygun smoke build çalıştır
   - `TASKS.md` durumlarını güncelle
   - yapılanları ve kalan riskleri özetle
5. Kullanıcı açıkça istemeden sonraki faza geçme.

## 2. Değiştirilemez Ürün Kuralları

- Oyun reklamsızdır.
- AdMob veya başka reklam SDK'sı ekleme.
- MVP'de backend ekleme.
- Oyun offline çalışmalıdır.
- Android öncelikli, platform bağımsız kod yaz.
- Puzzle + hikâye ana odağı korunmalıdır.
- Genel casual oyuncu için anlaşılır tasarla.
- Zaman baskısını zorunlu mekanik yapma.

## 3. Kod Kalitesi

- TypeScript strict zorunlu.
- `any`, `@ts-ignore` ve kontrolsüz type assertion kullanma.
- Bilinmeyen dış veri `unknown` olarak alınır ve Zod ile doğrulanır.
- Fonksiyon ve bileşenler tek sorumluluk taşımalıdır.
- İş mantığını React bileşenlerine gömme.
- Domain ve engine kodu saf TypeScript olmalıdır.
- Tekrar eden sabitleri merkezileştir.
- Gereksiz abstraction ve erken optimizasyondan kaçın.
- Yeni dependency eklemeden önce mevcut araçlarla çözülüp çözülemeyeceğini değerlendir.
- Paketleri Expo uyumlu şekilde `npx expo install` ile kur.

## 4. Dosya ve İsimlendirme

- React bileşenleri: `PascalCase.tsx`
- Hook'lar: `useSomething.ts`
- Yardımcılar: `camelCase.ts`
- Testler: kaynak dosyanın yanında veya belirlenen test klasöründe `.test.ts(x)`
- Route dosyaları Expo Router kurallarına uyar.
- Barrel export yalnızca döngüsel bağımlılık yaratmıyorsa.

## 5. UI Kuralları

- Safe area destekle.
- Küçük ekran ve büyük font test et.
- Renk tek başına anlam taşımaz.
- Dokunma alanları en az yaklaşık 44–48 dp.
- Sürüklemenin dokunarak çalışan alternatifi olmalıdır.
- Landscape zorunlu değil; dikey kullanım optimize edilir.
- Yeni ekranlar loading, empty ve error durumlarını düşünür.
- Animasyonlar `reduce motion` ayarına saygı duyar.

## 6. Veri ve Kayıt

- Vaka tanımları runtime'da doğrulanır.
- İlerleme SQLite ile kalıcıdır.
- Migration olmadan tablo şeması değiştirme.
- Kayıt işlemleri atomik veya transaction içinde olmalıdır.
- Oyuncu ilerlemesini sessizce sıfırlama.
- Geliştirme seed/reset aracı production arayüzünde görünmez.

## 7. Test Kuralları

Aşağıdakiler test edilmeden tamamlanmış sayılmaz:

- condition evaluator
- scoring engine
- case schema validation
- puzzle answer evaluators
- progression unlock logic
- repository migration ve temel CRUD

UI testleri kritik akışlara odaklanır; snapshot testleri ana strateji değildir.

## 8. Güvenlik ve Gizlilik

- Secret veya API key repoya yazma.
- Gereksiz izin isteme.
- Kullanıcı metni veya kişisel veri loglama.
- Remote code loading yapma.
- Vaka içeriklerinde lisanssız üçüncü taraf varlık kullanma.

## 9. Yasaklar

- Projeyi tek devasa dosyada oluşturmak
- Hard-coded vaka çözümü
- Route bileşenlerine SQL yazmak
- Testleri kaldırarak build düzeltmek
- Hataları boş `catch` ile yutmak
- Çalışmayan placeholder özelliği tamamlandı olarak işaretlemek
- Kullanıcı istemeden ödeme veya reklam entegrasyonu eklemek
- Paket sürümlerini tahmin ederek uyumsuz dependency eklemek

## 10. Definition of Done

Bir görev yalnızca şu şartlarda tamamlanır:

- Kabul kriterleri sağlandı
- TypeScript hatası yok
- İlgili testler var ve geçiyor
- Erişilebilirlik temel kontrolleri yapıldı
- Android'de çalışıyor
- Dokümantasyon gerektiği kadar güncellendi
- Bilinen eksikler açıkça yazıldı
