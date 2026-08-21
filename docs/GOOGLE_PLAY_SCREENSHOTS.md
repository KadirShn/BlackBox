# Google Play ekran görüntüsü ve grafik planı

Ekran görüntüleri production/preview APK'nın gerçek arayüzünden, debug menüsü ve sistem bildirimi
olmadan alınmalıdır. Telefon için portre `1080 × 2400` PNG uygundur. Google Play en az iki ve en
fazla sekiz telefon ekran görüntüsü kabul eder; bu oyun için altı görsel önerilir.

## Shot list

1. **Ana ekran** — oyun adı, aktif dosya özeti ve ana navigasyon
   - Alt metin: “Dijital olay inceleme masasını gösteren Black Box ana ekranı.”
2. **Vaka arşivi** — tutorial ve ana vakaların kilit/yıldız durumları
   - Alt metin: “Tamamlanma ve zorluk durumlarıyla vaka arşivi.”
3. **Delil masası** — farklı türde dijital deliller ve inceleme ilerlemesi
   - Alt metin: “Sistem kaydı ve belge kartlarının bulunduğu delil masası.”
4. **Zaman çizelgesi puzzle'ı** — sıralanabilir olaylar ve erişilebilir düğmeler
   - Alt metin: “Olay kartlarını kronolojik sıraya koyma puzzle'ı.”
5. **Log veya bağlantı puzzle'ı** — oyunun teknik dedektiflik kimliği
   - Alt metin: “Şüpheli sistem kayıtlarının seçildiği analiz ekranı.”
6. **Rapor/sonuç** — hipotez, kanıt seçimi veya yıldızlı sonuç ekranı
   - Alt metin: “Kanıtlarla desteklenen nihai olay raporu.”

## Grafik gereksinimleri

- Store icon: 512 × 512, 32-bit PNG, en fazla 1 MB
- Feature graphic: 1024 × 500, JPEG veya alpha içermeyen 24-bit PNG
- Telefon screenshots: PNG/JPEG, her boyut 320–3840 px ve uzun kenar kısa kenarın iki katından
  büyük olmamalı
- Görseller gerçek uygulama davranışını göstermeli; sıralama/ödül/fiyat iddiası içermemeli
- TR ve EN görsellerinde uygulama içi metin ilgili dilde olmalı

Resmî referans: https://support.google.com/googleplay/android-developer/answer/9866151
