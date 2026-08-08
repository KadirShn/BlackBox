# EAS Android production build

## 8 Ağustos 2026 dependency hatası

Build `86f6fd4d-c07e-4160-a405-c3faaa27641d`, `Install dependencies` aşamasında durdu.
Gerçek hata `npm ci --include=dev` tarafından bildirilen `package.json` / `package-lock.json`
uyumsuzluğuydu. Kilit dosyası `npm install --package-lock-only --include=dev` ile yenilendi ve
aynı komutun dry-run doğrulaması geçti.

Npm 11'in Windows'ta ürettiği lockfile, Linux npm'in doğruladığı bazı peer/optional dependency
kayıtlarını yine de yazmıyor. İzole bir Windows klasöründe lock üretimi aynı sonucu verdi. Bu
nedenle production profilinde `EAS_NO_FROZEN_LOCKFILE=1` kullanılır; EAS `npm ci` yerine `npm
install` çalıştırır ve committed lockfile'ı çözüm temeli olarak kullanırken eksik Linux kayıtlarını
build ortamında tamamlar.

Expo Doctor 20/20 ve Expo dependency check temizdir.

## Production profili

- Version kaynağı: EAS remote
- Android build biçimi: AAB
- Version code: production build sırasında otomatik artar
- Credentials: EAS remote keystore

Tekrar build almadan önce `app.json` içindeki
`com.example.blackboxincidentinvestigator` application ID'sini kalıcı kimlikle değiştirin. İlk
Google Play yüklemesinden sonra application ID değiştirilemez.

Ardından:

```bash
npx eas-cli@latest build --platform android --profile production
```

Yerel Windows ortamında `eas build:inspect --stage pre-build` desteklenmez; bu komut Linux veya
macOS ister. İki inspect denemesi remote versionCode'u 3'e yükseltti. Bu geçerlidir; sonraki
auto-increment build 4 olacaktır.
