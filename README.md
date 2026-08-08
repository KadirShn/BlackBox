# Black Box: Incident Investigator — Codex Proje Paketi

Bu paket, Expo ve TypeScript ile Android öncelikli, reklamsız bir puzzle + hikâye oyunu geliştirmek için hazırlanmıştır.

## Dosyalar

1. `GAME_DESIGN_DOCUMENT.md` — oyun tasarımı ve MVP kapsamı
2. `TECHNICAL_DESIGN.md` — mimari, veri modelleri ve teknik kararlar
3. `AGENTS.md` — Codex'in projede uyması gereken kalıcı kurallar
4. `TASKS.md` — fazlara ayrılmış uygulanabilir görev listesi
5. `CASE_FORMAT.md` — veri odaklı vaka ve puzzle formatı
6. `UI_GUIDE.md` — görsel dil, erişilebilirlik ve hareket kuralları
7. `TESTING_AND_RELEASE.md` — test, kalite ve Google Play hazırlığı
8. `MASTER_PROMPT.md` — yeni Codex oturumuna yapıştırılacak başlangıç promptu

## Kullanım

1. Boş bir klasör oluşturun.
2. Bu `.md` dosyalarının tamamını proje köküne kopyalayın.
3. Codex'i proje kökünde açın.
4. `MASTER_PROMPT.md` içeriğini ilk mesaj olarak gönderin.
5. Codex'in önce dokümanları okuyup Faz 0 ve Faz 1 ile başlamasını bekleyin.
6. Her faz sonunda uygulamayı çalıştırın ve git commit alın.

## Temel ürün kararı

- Reklam SDK'sı bulunmayacak.
- İlk sürüm tamamen reklamsız ve çevrimdışı oynanabilir olacak.
- MVP'de ödeme sistemi bulunmayabilir. Mimari gelecekte ücretli vaka paketlerine uygun tutulur.
- Android ilk platformdur; platform bağımsız kod yazılır.
- Expo Go uyumluluğu zorunlu değildir. Native bağımlılık gerekirse development build kullanılır.

## Geliştirme ortamı

- Node.js: Expo SDK 57'nin desteklediği Node 22.13 veya daha yeni LTS.
- Paket yöneticisi: npm; `package-lock.json` bağlayıcı kilit dosyasıdır.
- Android application ID geçici olarak `com.example.blackboxincidentinvestigator` değeridir. İlk yayın yapılandırmasından önce size ait kalıcı ve benzersiz bir kimlikle değiştirilmelidir.

Kurulum ve çalıştırma:

```bash
npm install
npm start
npm run android
npm run web
```

Android Studio ile yerel debug ve kurulabilir preview APK adımları için
[`docs/ANDROID_STUDIO_BUILD.md`](docs/ANDROID_STUDIO_BUILD.md) belgesine bakın.

Kalite kontrolleri:

```bash
npm run typecheck
npm run lint
npm test
npm run format:check
npm run export:android
npm run export:web
npm run build:android:debug
npm run build:android:preview
```

Expo SDK ile ilişkili native paketleri sürüm numarası tahmin ederek eklemeyin:

```bash
npx expo install <paket-adı>
```

EAS profilleri `eas.json` içinde `development`, `preview` ve `production` olarak tanımlıdır. Development profili kullanılmadan önce `expo-dev-client` kurulumu doğrulanmalıdır.
