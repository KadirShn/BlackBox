# Black Box: Incident Investigator — Gizlilik Politikası

Son güncelleme: 21 Ağustos 2026

Black Box: Incident Investigator çevrimdışı öncelikli, reklamsız bir mobil oyundur. Uygulama
hesap oluşturmaz ve geliştiriciye oyuncu verisi gönderen bir backend, reklam, analytics veya crash
raporlama SDK'sı kullanmaz.

## Toplanan veya paylaşılan veriler

Uygulama geliştiricisi kişisel bilgi, konum, kişi listesi, fotoğraf/video, mikrofon kaydı, finansal
bilgi, reklam kimliği, cihaz kimliği, kullanım verisi veya tanılama verisi toplamaz ve üçüncü
taraflarla paylaşmaz.

## Cihazda saklanan veriler

Vaka ilerlemesi, aktif oyun oturumu, başarımlar ve dil/erişilebilirlik ayarları yalnızca
uygulamanın cihazdaki yerel SQLite veritabanında tutulur. Bu veriler geliştiricinin sunucularına
aktarılmaz. Android ayarlarından uygulama verisini temizlemek veya uygulamayı kaldırmak bu yerel
verileri silebilir.

## İzinler ve ağ erişimi

Oyun; konum, kişiler, kamera, mikrofon veya depolama izni istemez. Expo/React Native çalışma
zamanı Android manifestine internet ve ağ durumu izinleri ekleyebilir; oyunun ana işlevleri bu
izinleri kullanarak bir sunucuya veri göndermez ve uçak modunda çalışır.

## Çocukların gizliliği

Uygulama özellikle 13 yaş altı çocuklara yönelik tasarlanmamıştır ve bilerek çocuklardan kişisel
veri toplamaz.

## Değişiklikler ve iletişim

Yeni bir veri toplama, reklam, hesap, analytics veya crash raporlama özelliği eklenirse bu politika
ve Google Play Data Safety beyanı yayınlanmadan önce güncellenir. Gizlilik soruları için Google
Play mağaza sayfasındaki doğrulanmış geliştirici iletişim kanalı kullanılabilir.

Bu metin production yayını öncesinde herkese açık, HTTPS kullanan ve PDF olmayan kalıcı bir web
sayfasında yayınlanmalı; aynı URL Play Console'daki **Privacy policy** alanına girilmelidir.
