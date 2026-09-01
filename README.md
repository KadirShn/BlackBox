# Black Box: Incident Investigator

Black Box: Incident Investigator, dijital delilleri inceleyerek olayları çözmeye dayanan çevrimdışı bir puzzle ve hikâye oyunudur. Oyuncu brifingleri okur, kanıtları karşılaştırır, zaman çizelgelerini düzenler, çelişkileri tespit eder ve soruşturma raporunu tamamlar.

## Özellikler

- Bir tutorial ve dört ana vaka
- Timeline, log analizi, çelişki ve bağlantı puzzle'ları
- Veri odaklı ve çalışma zamanında doğrulanan vaka içerikleri
- Çevrimdışı oynanış ve SQLite tabanlı yerel kayıt sistemi
- Türkçe ve İngilizce dil desteği
- Başarımlar, istatistikler ve tekrar oynama desteği
- Büyük metin, ekran okuyucu ve reduce motion desteği
- Reklamsız ve hesap gerektirmeyen deneyim

## Teknoloji

- Expo ve React Native
- TypeScript strict mode
- Expo Router
- SQLite
- Zustand
- Zod
- Jest ve React Native Testing Library

## Gereksinimler

- Node.js 22.13 veya daha yeni bir LTS sürümü
- npm
- Android geliştirmesi için Android Studio ve yapılandırılmış Android SDK

## Kurulum

```bash
npm install
```

## Geliştirme

Expo geliştirme sunucusunu başlatmak için:

```bash
npm start
```

Uygulamayı hedef platformda çalıştırmak için:

```bash
npm run android
npm run web
```

Kalıcı Android application ID değeri `com.kadirshn.blackbox` olarak tanımlıdır.

## Kalite kontrolleri

```bash
npm run typecheck
npm run lint
npm test
npm run format:check
npm run export:android
npm run export:web
```

## Android build

Yerel Android build yönergeleri için [`docs/ANDROID_STUDIO_BUILD.md`](docs/ANDROID_STUDIO_BUILD.md) belgesine bakın.

Google Play için production Android App Bundle oluşturmak için:

```bash
npx eas-cli@latest build --platform android --profile production
```

EAS yapılandırmasında `development`, `preview` ve `production` build profilleri bulunur.

## Proje yapısı

```text
app/          Expo Router ekranları ve navigasyon
src/          Domain, veri, oyun motoru, servis ve UI kodları
assets/       Uygulama görselleri, fontlar ve sesler
scripts/      İçerik doğrulama ve geliştirme araçları
docs/         Build, test ve mağaza yayın belgeleri
```

Vaka çözümleri ekranlara gömülmez. Vaka ve puzzle içerikleri veri dosyalarında tanımlanır, Zod şemalarıyla doğrulanır ve React'tan bağımsız oyun motoru tarafından değerlendirilir.

## Gizlilik

Oyun hesabı, reklam SDK'sı veya backend kullanmaz. Ana oyun işlevleri internet bağlantısı olmadan çalışır ve oyuncu ilerlemesi cihazdaki yerel veritabanında saklanır.
