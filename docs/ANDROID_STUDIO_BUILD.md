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
- Production AAB öncesinde `com.example.blackboxincidentinvestigator` kalıcı bir application ID
  ile değiştirilmeli ve ayrı upload key oluşturulmalıdır.

## Son doğrulama

8 Ağustos 2026 tarihinde üretilen debug APK:

- Dosya: `artifacts/builds/black-box-debug.apk`
- Paket: `com.example.blackboxincidentinvestigator`
- Version name/code: `1.0.0` / `1`
- Min/target/compile SDK: `24` / `36` / `36`
- ABI: `x86_64`
- SHA-256: `8FFCE6EDD84800A24547EF1939170373D6B4E1D563DC75939A4691DF06479E30`

Expo Doctor 20/20, Expo paket uyumluluğu, TypeScript, ESLint, Prettier ve 41 Jest testi
geçti. Android Gradle lint, uygulama bulgusu üretmeden `react-native-worklets` build scriptini
analiz eden Android Lint/Kotlin UAST iç hatasında duruyor (`Cannot find a KaModule`). Bu upstream
araç hatası AAB üretimini engellemez; yine de bağımlılık güncellemelerinde tekrar denenmelidir.

Release birleşik manifestinde mikrofon, eski depolama ve `SYSTEM_ALERT_WINDOW` izinleri yoktur.
