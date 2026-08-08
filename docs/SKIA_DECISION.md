# Connection Board — Skia Kararı

## Karar

MVP bağlantı panosunda Skia kullanılmayacak.

## Gerekçe

- Panoda en fazla 5–10 düğüm var; kaynak, hedef ve ilişki tipini dokunarak seçen erişilebilir akış problemi çözüyor.
- Bağlantılar metin ve yön oku ile listelenebildiği için renk veya çizgi tek başına anlam taşımıyor.
- Skia, yalnız dekoratif çizgiler için native paket ve canvas yaşam döngüsü maliyeti ekleyecek.
- Düşük/orta Android hedefinde standart React Native Pressable/View yaklaşımı daha küçük risk ve daha kolay screen reader sırası sağlıyor.

## Yeniden değerlendirme koşulu

Gerçek cihaz testinde 8–10 düğümlü vakalarda ilişki yapısı anlaşılamazsa veya oyuncu testleri bağlantı listesinin uzamsal bağlamı yetersiz bulursa, yalnız bağlantı çizgileri için görünürken çalışan bir Skia katmanı ölçülür. Dokunarak seçim alternatifi her durumda korunur.
