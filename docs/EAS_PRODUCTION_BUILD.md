# EAS Android production build

## 8 Ağustos 2026 dependency hatası

Build `86f6fd4d-c07e-4160-a405-c3faaa27641d`, `Install dependencies` aşamasında durdu.
Gerçek hata `npm ci --include=dev` tarafından bildirilen `package.json` / `package-lock.json`
uyumsuzluğuydu. Kilit dosyası `npm install --package-lock-only --include=dev` ile yenilendi ve
aynı komutun dry-run doğrulaması geçti.

Lockfile `package.json` ile eşitlenmiştir. EAS bağımlılık aşamasında tekrar üretilebilir kurulum
için `npm ci --include=dev` çalıştırabilir.

Expo Doctor 20/20 ve Expo dependency check temizdir.

## Production profili

- Version kaynağı: EAS remote
- Android build biçimi: AAB
- Version code: production build sırasında otomatik artar
- Credentials: EAS remote keystore

Kalıcı Android application ID `com.kadirshn.blackbox` olarak ayarlanmıştır. Daha önce farklı paket
kimliğiyle üretilmiş APK/AAB dosyalarını Google Play'e yüklemeyin.

Ardından:

```bash
npx eas-cli@latest build --platform android --profile production
```

Yerel Windows ortamında `eas build:inspect --stage pre-build` desteklenmez; bu komut Linux veya
macOS ister. İki inspect denemesi remote versionCode'u 3'e yükseltti. Bu geçerlidir; sonraki
auto-increment build 4 olacaktır.
