# TASKS

Durumlar: `[ ]` bekliyor, `[~]` sürüyor, `[x]` tamamlandı, `[!]` engelli.

Codex bir fazı bitirmeden sonraki faza geçmemelidir.

## FAZ 0 — Keşif ve Kurulum

- [x] Dokümanların tamamını oku ve çelişkileri listele
- [x] Güncel kararlı Expo oluşturma yöntemini resmi dokümandan doğrula
- [x] Projeyi TypeScript ve Expo Router ile oluştur
- [x] Android application ID için güvenli placeholder tanımla ve kullanıcıya değiştirmesi gerektiğini belirt
- [x] ESLint, Prettier ve strict TypeScript yapılandır
- [x] Test altyapısını kur
- [x] `development`, `preview`, `production` için `eas.json` oluştur
- [x] Temel klasör yapısını oluştur
- [x] README'ye geliştirme komutlarını ekle
- [x] İlk typecheck, lint, test ve export doğrulamasını yap

**Kabul kriteri:** Boş uygulama Android/Web uygunluğunda başlar; typecheck ve lint temizdir.

## FAZ 1 — Uygulama İskeleti ve Tasarım Sistemi

- [x] Theme token sistemi
- [x] Typography ve spacing token'ları
- [x] Safe area ve root providers
- [x] Ana navigasyon
- [x] Home ekranı
- [x] Case List ekranı mock data ile
- [x] Settings ekranı
- [x] PrimaryButton, CaseCard, StatusBadge bileşenleri
- [x] Loading, Empty, Error state bileşenleri
- [x] Reduce motion ve haptics ayarı
- [x] TR/EN lokalizasyon iskeleti
- [x] Component temel testleri

**Kabul kriteri:** Kullanıcı Home, Cases ve Settings arasında gezebilir; tema ve dil ayarları çalışır.

## FAZ 2 — Domain, Veri ve Kayıt

- [x] Case Zod schema
- [x] Puzzle discriminated union schema
- [x] Unlock condition schema
- [x] PlayerProgress modelleri
- [x] SQLite database bootstrap
- [x] Migration runner
- [x] Progress repository
- [x] Active session repository
- [x] Settings repository
- [x] Transaction ve hata yönetimi
- [x] Repository testleri
- [x] Geliştirme reset/seed aracı

**Kabul kriteri:** Uygulama kapanıp açıldığında ayar ve örnek vaka ilerlemesi korunur.

## FAZ 3 — Tutorial Vertical Slice

- [x] Tutorial vaka içeriğini tanımla
- [x] Briefing ekranı
- [x] Evidence Desk temel ekranı
- [x] Evidence card detay görünümü
- [x] Timeline puzzle
- [x] Timeline drag interaction
- [x] Timeline erişilebilir button alternatifi
- [x] Puzzle evaluation
- [x] Hint sheet
- [x] Report ekranı
- [x] Result ekranı
- [x] Yıldız hesaplama
- [x] Aktif oturum autosave
- [x] Tutorial tamamlanınca Vaka 1 kilidini aç
- [x] Uçtan uca manuel test senaryosu yaz

**Kabul kriteri:** Yeni kullanıcı tutorial'ı baştan sona internet olmadan tamamlayabilir ve ilerleme kaydedilir.

## FAZ 4 — Yeniden Kullanılabilir Puzzle Motoru

- [x] Puzzle registry
- [x] Generic puzzle route/container
- [x] Log analyzer puzzle
- [x] Contradiction puzzle
- [x] Connection board puzzle
- [x] Connection board için Skia gereksinimini ölç ve karar belgele
- [x] Her puzzle için serialize/restore
- [x] Her puzzle için üç seviyeli hint desteği
- [x] Her puzzle evaluator unit testleri
- [x] Puzzle schema içerik doğrulama scripti

**Kabul kriteri:** Dört puzzle türü vaka verisinden açılır ve özel case ID koşulları içermez.

## FAZ 5 — Vaka 1 ve İçerik Pipeline

- [x] Vaka 1 “Gece Rotası” içerik taslağı
- [x] Deliller ve lokalizasyon
- [x] Puzzle kombinasyonu
- [x] Hipotez ve çözüm
- [x] Unlock graph doğrulama
- [x] Vaka içerik testleri
- [x] Case list gerçek ilerleme entegrasyonu
- [x] Arşiv ekranı
- [x] Tekrar oynama akışı

**Kabul kriteri:** Tutorial ve Vaka 1 eksiksiz oynanır; yeni vaka ekleme süreci dokümante edilmiştir.

## FAZ 6 — Kalan MVP İçeriği

- [x] Vaka 2 “Sessiz İstasyon”
- [x] Vaka 3 “Yanlış Yolcu”
- [x] Vaka 4 “Kara Kutu”
- [x] Tüm TR metinlerin edit kontrolü
- [x] Tüm EN metinlerin edit kontrolü
- [x] İçerik zorluk eğrisi testi
- [x] Başarımlar sistemi
- [x] İstatistik özeti
- [x] Tüm vakalar için content validation

**Kabul kriteri:** 1 tutorial + 4 vaka tamamlanabilir; hiçbir erişilemez puzzle veya eksik çeviri yoktur.

## FAZ 7 — Polish

- [x] Ses servisi
- [x] UI sesleri
- [x] Haptic feedback
- [x] Geçiş animasyonları
- [x] Reduce Motion davranışı
- [x] Küçük ekran testi
- [x] Büyük font testi
- [x] Screen reader temel testi
- [x] Düşük/orta Android performans testi
- [x] App icon ve splash placeholder sistemi
- [x] Asset lisans kaydı

**Kabul kriteri:** Kritik akışlarda belirgin UX veya erişilebilirlik engeli yoktur.

## FAZ 8 — Stabilizasyon ve Yayın

- [x] Global error boundary
- [x] Hatalı içerik fallback ekranı
- [x] Save corruption kurtarma stratejisi
- [x] Fresh install testi
- [x] Upgrade/migration testi
- [x] Offline airplane mode testi
- [x] Production logging kontrolü
- [x] Android permissions kontrolü
- [x] Gizlilik politikası taslağı için veri envanteri
- [x] Google Play Data Safety bilgileri
- [x] Store kısa/açıklama metin taslağı
- [x] Ekran görüntüsü shot list
- [x] Preview build
- [ ] Production AAB
- [ ] Release checklist'i tamamla

**Kabul kriteri:** İmzalı production AAB üretilebilir ve kapalı teste hazırdır.

## Gelecek — MVP Sonrası

- [ ] Ücretli vaka paketi fizibilitesi
- [ ] Google Play Billing entegrasyonu
- [ ] Bulut yedekleme değerlendirmesi
- [ ] Yeni puzzle türleri
- [ ] Sezon 2 hikâyesi
- [ ] iOS yayın hazırlığı
