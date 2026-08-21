# Google Play Data Safety ve App Content cevapları

Bu beyanlar 21 Ağustos 2026 tarihindeki `package.json`, native paketler, uygulama kodu ve Android
izinleri esas alınarak hazırlanmıştır. Yeni SDK veya veri akışı eklenirse tekrar incelenmelidir.

## Data Safety

- Uygulama gerekli veri türlerinden herhangi birini topluyor veya paylaşıyor mu? **Hayır**
- Kullanıcı verisi üçüncü taraflara aktarılıyor mu? **Hayır**
- Hesap oluşturma destekleniyor mu? **Hayır**
- Kullanıcı veri silme talebi akışı gerekiyor mu? **Hayır; hesap ve sunucu verisi yoktur.** Yerel
  veri Android'in uygulama verisini temizleme veya kaldırma işlemiyle silinir.
- Aktarım sırasında şifreleme: **Uygulanamaz; kullanıcı verisi aktarımı yoktur.**

Yerel SQLite içindeki vaka ilerlemesi ve ayarlar cihaz dışına çıkmadığı için Google'ın Data Safety
tanımında "collected" olarak işaretlenmez.

## App Content

- Ads: **No — uygulama reklam içermez.**
- App access: **All functionality is available without login or special access.**
- Target audience: **13+**; uygulama özellikle çocuklara yönelik değildir.
- News, health, government, financial features: **No.**
- User-generated content veya kullanıcılar arası iletişim: **No.**
- In-app purchases: **No.**
- Foreground service: Son manifest doğrulamasında foreground-service izni bulunmamalıdır. Varsa
  release gönderilmemeli ve izin kaynağı tekrar incelenmelidir.

## Content rating anketi için gerçek davranış

- Gerçekçi/grafik şiddet, cinsellik, kumar, uyuşturucu, küfür: **Yok**
- Korku tonu: hafif gizem/gerilim; korku görseli veya travma ayrıntısı yok
- Konum paylaşımı, sınırsız internet erişimi, kullanıcı etkileşimi: **Yok**

Nihai yaş derecelendirmesi Play Console anketinin sonucudur; burada bir derece tahmin edilmez.
