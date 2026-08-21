# Release verification kaydı

## Otomatik kontroller

Her release adayı için aşağıdakiler yeniden çalıştırılır:

```powershell
npm ci --include=dev
npm run typecheck
npm run lint
npm test
npm run format:check
npm run export:android
npx expo install --check
npx expo-doctor@latest
```

## Manuel Android senaryoları

- Temiz kurulum: uygulama verisini temizle, tutorial'ın açık olduğunu doğrula
- Upgrade: önceki preview APK üzerinde ilerleme oluştur, yeni APK'yı veri silmeden kur ve devam et
- Oturum kurtarma: puzzle ortasında uygulamayı kapat/aç
- Uçak modu: uygulamayı kapat, uçak modunu aç, tutorial → rapor akışını tamamla
- Büyük metin, reduce motion, TalkBack, Android back ve edge-to-edge
- Release logcat: fatal exception, kişisel veri veya development launcher görünmemeli
- Manifest: microphone, storage, overlay ve foreground-service izinleri bulunmamalı

## Google Play sırası

1. Production AAB üret
2. Play Console'da App Signing'i etkinleştir
3. AAB'yi Internal testing'e yükle
4. Pre-launch report sonuçlarını incele
5. Closed testing ve geri bildirim düzeltmeleri
6. App Content, Data Safety, rating, store listing ve dağıtımı tamamla
7. Production'da önce kontrollü/staged rollout tercih et

## 21 Ağustos 2026 sonucu

- `npm ci --include=dev`, typecheck, lint, format, 24 suite / 51 test ve Android export geçti.
- Expo paket kontrolü temiz; Expo Doctor 21/21 geçti.
- `assembleRelease` ve `lintVitalRelease` geçti; preview APK emülatörde veri silmeden yükseltildi.
- Android 14 emülatörde uçak modunda soğuk açılış, ana ekran, ayarlar, gizlilik ve vaka listesi
  doğrulandı; fatal runtime logu görülmedi.
- Kurulu release paketi `com.kadirshn.blackbox`, versionName `1.0.0`, targetSdk 36'dır.
- Manifest yalnızca internet/ağ durumu, ses ayarı, titreşim ve wake-lock işlev izinlerini ister;
  mikrofon, depolama, overlay ve foreground-service izni yoktur.
- Production AAB, kalan Play Console alanları ve kapalı test sonucu kullanıcı hesabında
  tamamlanacaktır.
- Gizlilik politikası EAS Hosting production ortamında yayınlandı:
  `https://blackboxkdr.expo.app/privacy`.
