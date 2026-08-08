# Black Box Görsel Sistemi

## Tasarım fikri

Arayüz, standart mobil kart koleksiyonu yerine taşınabilir bir olay inceleme terminali gibi davranır.
Üç görsel katman birlikte kullanılır:

1. **Sinyal ağı:** İnce grid, düğüm noktaları ve tarama çizgileri ekranlar arasında süreklilik sağlar.
2. **Olay dosyaları:** Vaka ve delil yüzeylerinde dosya sırtı, köşe kesikleri, sınıflandırma kodları ve
   telemetri rayları bulunur.
3. **Komuta merkezi:** Ana ekrandaki radar çekirdeği aktif inceleme hissi verir; hareket azaltma
   açıkken tarama animasyonu tamamen durur.

## Renk rolleri

- Gece laciverti: ana zemin ve odak
- Sinyal turkuazı: etkileşim, aktif durum ve veri bağlantısı
- Uyarı amberi: sınıflandırma, kritik olay ve dekoratif vurgu
- Kırık beyaz: birincil metin
- Kırmızı / yeşil: hata ve başarı; her zaman ikon veya metinle birlikte

## Bileşen kuralları

- Kartlar yalnızca veri gruplamak için kullanılır; dekoratif her içerik ayrı kutuya alınmaz.
- Birincil eylem turkuaz, ikincil eylemler koyu terminal yüzeyidir.
- Vaka kartında durum rozeti, yıldızlar ve sinyal rayı birlikte ilerleme bilgisini taşır.
- Delil kartında dairesel veri glifi ve sağ alt sınıflandırma kesiği bulunur.
- Önemli sayaçlar tabular rakam kullanır.
- Metinler sistem font ölçeğine ek olarak uygulama içi Normal/Büyük/Çok Büyük ölçeğine uyar.

## Hareket

- Sayfa girişi 180 ms opacity geçişidir.
- Radar taraması yavaş ve dekoratiftir; oyun bilgisi taşımaz.
- `reduceMotion` açıkken sayfa geçişi ve radar hareketi durur.
- Animasyonlar puzzle sonucunu veya erişilebilir metni ikame etmez.
