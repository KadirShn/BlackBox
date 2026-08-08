# Android emülatör doğrulaması

Tarih: 8 Ağustos 2026

## Test profili

- Cihaz: Android Studio `sdk_gphone64_x86_64` emülatörü
- Android: 14 / API 34
- Ekran: 1080 × 2400, 420 dpi
- Bellek: yaklaşık 4 GB
- Çalıştırma biçimi: yerel Expo development client + Metro

Bu profil fiziksel düşük segment cihazın yerini tamamen tutmaz. Development client'ın araçları,
Metro bağlantısı ve debug yükü özellikle bellek ile soğuk açılış değerlerini yükseltir.

## Doğrulanan akışlar

- Ana ekran → vaka arşivi → tutorial brifingi → delil masası
- Safe area, dikey kaydırma, kilitli/açık vaka kartları ve dinamik route başlıkları
- Normal ve çok büyük uygulama metin boyutu
- Reduce-motion seçeneğinin kalıcı durumu
- Dil ve metin boyutu kontrollerinin Android erişilebilirlik ağacındaki radyo semantiği
- Reduce-motion, titreşim ve arayüz sesi anahtarlarının etiket/checked durumu
- Temiz logcat penceresinde kritik akış boyunca fatal Android veya React Native JS hatası olmaması

## Performans örneği

Ana ekran, reduce-motion kapalı ve radar animasyonu çalışırken 15 saniyelik kararlı durum ile iki
kaydırma hareketi ölçüldü:

- Oluşturulan kare: 1.149
- Modern janky frame: 3 (%0,26)
- Frame deadline missed: 3
- Kare süreleri p50 / p90 / p95 / p99: 18 / 21 / 22 / 23 ms
- Görünüm ağacı: 1 `ViewRootImpl`, 81 bağlı view
- Development client belleği: 512.734 KB total PSS, 322.440 KB total RSS

Bellek rakamı üretim APK bütçesi değildir; development client ve debug çalışma zamanını içerir.
Üretim AAB/APK profilinin release hazırlığında fiziksel düşük/orta sınıf cihazda tekrar ölçülmesi
önerilir.

## Cihaz testinde düzeltilenler

- Dinamik Expo Router dosya yolu kullanıcı başlığı olarak görünüyordu; brifing, delil masası,
  delil, analiz, rapor ve sonuç başlıkları açıkça tanımlandı.
- Metin boyutu ve dil seçimleri radyo olarak okunuyor fakat Android ağacında tıklanabilir
  görünmüyordu; semantik `Pressable` radyo kontrollerine dönüştürüldü.
