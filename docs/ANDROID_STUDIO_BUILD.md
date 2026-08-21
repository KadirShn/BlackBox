# Android Studio ve yerel APK

## Android Studio'da açma

1. Android Studio'da **Open** seçeneğini kullanın.
2. Proje kökü yerine `android` klasörünü seçin.
3. Gradle senkronizasyonunun bitmesini bekleyin.
4. Çalışan emülatörü ve `app` yapılandırmasını seçip **Run** düğmesine basın.

Debug uygulaması JavaScript'i Metro'dan alır. Proje kökünde ayrı bir terminal açıp şunu çalıştırın:

```bash
npx expo start --dev-client
```

## Kurulabilir APK üretme

Metro ile mevcut x86_64 Android Studio emülatörü için geliştirme APK'sı:

```bash
npm run build:android:debug
```

Metro gerektirmeden açılabilen x86_64 emülatör preview APK'sı:

```bash
npm run build:android:preview
```

Çıktılar sırasıyla şurada oluşturulur:

- `artifacts/builds/black-box-debug.apk`
- `artifacts/builds/black-box-preview.apk`

APK'yı çalışan emülatöre veya USB debugging açık cihaza kurmak için:

```bash
adb install -r artifacts/builds/black-box-preview.apk
```

## Önemli sınırlar

- Preview APK yerel debug anahtarıyla imzalanır; Google Play'e yüklenmez.
- Debug APK açılırken Metro bağlantısı ister.
- Fiziksel ARM cihazda geliştirme için `npx expo run:android` kullanın; komut bağlı cihazın
  mimarisini seçer.
- Production AAB kalıcı `com.kadirshn.blackbox` application ID'sini kullanır. Upload key EAS'in
  uzak Android credentials sistemi tarafından yönetilir.

## Son doğrulama

21 Ağustos 2026 tarihinde üretilen release preview APK:

- Dosya: `artifacts/builds/black-box-preview.apk`
- Paket: `com.kadirshn.blackbox`
- Version name/code: `1.0.0` / `1`
- Min/target/compile SDK: `24` / `36` / `36`
- ABI: `x86_64`
- Release Gradle görevleri: `assembleRelease`, `lintVitalRelease` başarılı.

Release birleşik manifestinde mikrofon, eski depolama ve `SYSTEM_ALERT_WINDOW` izinleri yoktur.
