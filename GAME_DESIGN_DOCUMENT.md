# GAME DESIGN DOCUMENT

## 1. Ürün Özeti

**Ad:** Black Box: Incident Investigator  
**Tür:** Puzzle, gizem, hafif dedektiflik, interaktif hikâye  
**Platform:** Android öncelikli; daha sonra iOS  
**Teknoloji:** Expo + React Native + TypeScript  
**Ekran yönü:** Dikey  
**Hedef kitle:** Genel casual oyuncular, gizem ve mantık oyunlarını sevenler  
**Oturum süresi:** 5–12 dakika  
**İş modeli:** İlk sürüm reklamsız. Gelecekte tek seferlik premium veya ücretli vaka paketleri değerlendirilebilir.  
**Çevrimdışı kullanım:** Ana oyun tamamen çevrimdışı çalışmalıdır.

## 2. Oyunun Kısa Tanımı

Oyuncu, teknoloji kaynaklı olayları araştıran bağımsız bir dijital müfettiştir. Güvenlik görüntüleri, cihaz logları, mesajlar, konum kayıtları, sensör okumaları ve tanık ifadelerini inceler. Oyuncu delilleri doğru sıraya koyar, çelişkileri bulur, delilleri ilişkilendirir ve olayın nasıl gerçekleştiğini açıklayan nihai raporu oluşturur.

Oyunun amacı yalnızca doğru şıkkı seçmek değildir. Oyuncu, vardığı sonucu destekleyen doğru delilleri de göstermelidir.

## 3. Tasarım İlkeleri

1. **Kolay öğren, zor ustalaş:** İlk vaka tek mekaniği öğretir; sonraki vakalar mekanikleri birleştirir.
2. **Metin değil etkileşim:** Uzun paragraflar yerine kartlar, görseller, zaman çizelgeleri ve kısa kayıtlar kullanılır.
3. **Adil gizem:** Çözüm için gereken tüm bilgiler vakada bulunur. Rastgele tahmin zorunlu olmaz.
4. **Kısa oturum:** Her puzzle birkaç dakika içinde anlaşılmalı ve çözülebilmelidir.
5. **Tekrar kullanılabilir motor:** Yeni vaka eklemek, uygulama kodunu değiştirmeyi gerektirmemelidir.
6. **Offline-first:** Vaka, kayıt ve ayarlar yerel çalışır.
7. **Reklamsız deneyim:** Oynanış veya sonuç ekranında reklam bulunmaz.

## 4. Temel Oynanış Döngüsü

1. Vaka seçimi
2. Kısa brifing
3. Delil masasının açılması
4. Delillerin incelenmesi
5. Bir veya daha fazla puzzle çözümü
6. Delillerin bağlantı panosunda ilişkilendirilmesi
7. Hipotez seçimi
8. Nihai rapor gönderimi
9. Puan, yıldız ve açıklama
10. Yeni vaka veya arşiv açılması

## 5. MVP Kapsamı

MVP; mağazaya hazır devasa bir oyun değil, kaliteli ve tamamlanabilir ilk sürümdür.

### İçerik

- 1 etkileşimli eğitim vakası
- 4 ana vaka
- 4 puzzle türü
- 1 genel hikâye zinciri
- Türkçe ve İngilizce
- Yerel kayıt
- Vaka tekrar oynama
- Basit başarımlar
- Ayarlar ve erişilebilirlik
- Reklamsız

### MVP dışı

- Online hesap
- Bulut senkronizasyonu
- Liderlik tablosu
- Çok oyunculu mod
- Günlük internetten indirilen vaka
- Kullanıcı tarafından oluşturulan içerik
- Abonelik
- Enerji/can sistemi
- Zorunlu bildirimler
- Sunucu backend'i

## 6. Puzzle Türleri

### 6.1 Zaman Çizelgesi

Oyuncu olay kartlarını sürükleyerek kronolojik sıraya dizer.

Kurallar:

- 4–8 kart
- Bazı kartlarda kesin saat, bazılarında bağlamsal ipucu vardır.
- Yanlış sıralamada doğrudan doğru sıra gösterilmez.
- Erişilebilir alternatif olarak sürükleme yerine yukarı/aşağı düğmeleri sağlanır.

### 6.2 Log Analizi

Oyuncu sistem kayıtları içinde anormal satırları bulur.

Kurallar:

- Filtreler: saat, kaynak, seviye, cihaz
- En fazla 20–30 görünür kayıt
- Gerçek programlama bilgisi gerekmez.
- Renk tek başına anlam taşımamalıdır; ikon ve etiket kullanılır.

### 6.3 Çelişki Bulma

Oyuncu iki ifade veya bir ifade ile teknik kayıt arasındaki çelişen bölümleri seçer.

Kurallar:

- Kısa metinler
- Cümle veya veri alanı seçimi
- Çözüm, açık bir mantıksal uyuşmazlığa dayanmalıdır.

### 6.4 Bağlantı Panosu

Oyuncu delil düğümlerini sebep, sonuç, destek veya çelişki bağlantılarıyla bağlar.

Kurallar:

- 5–10 düğüm
- Dokun ve hedef seç yöntemi, sürüklemeye alternatif olmalıdır.
- Bağlantı türleri ikon ve metinle ayrılır.

## 7. Vaka Listesi

### Tutorial — Kayıp 11 Dakika

Bir teslimat dronunun kayıtlarında 11 dakikalık boşluk vardır. Oyuncu zaman çizelgesini düzenler ve bakım modu ile uçuş kaydı arasındaki farkı öğrenir.

Öğretilenler:

- Delil açma
- Önemli alan işaretleme
- Zaman çizelgesi
- Rapor gönderme

### Vaka 1 — Gece Rotası

Otonom kargo aracı tanımlı rotadan çıkarak kapalı bir depoya girer.

Olası açıklamalar:

- Yazılım hatası
- GPS yanıltma
- Bakım ihmali
- Yetkili kullanıcı müdahalesi

Mekanikler:

- Zaman çizelgesi
- Log analizi

### Vaka 2 — Sessiz İstasyon

Bir metro istasyonunun sensörleri olaydan üç dakika önce veri göndermeyi bırakır. Kamera sistemi çalışıyor görünse de görüntüler tekrar etmektedir.

Mekanikler:

- Çelişki bulma
- Log analizi
- Bağlantı panosu

### Vaka 3 — Yanlış Yolcu

Akıllı otel sistemi, bir misafirin iki farklı katta aynı anda bulunduğunu bildirir.

Mekanikler:

- Zaman çizelgesi
- Çelişki bulma
- Bağlantı panosu

### Vaka 4 — Kara Kutu

Önceki vakaların aynı test yazılımıyla bağlantılı olduğu anlaşılır. Oyuncu daha önce gördüğü delil türlerini birleştirerek final raporunu oluşturur.

Mekanikler:

- Dört ana puzzle türünün birleşimi
- Birden fazla doğru ara çıkarım
- Tek nihai çözüm

## 8. Hikâye ve Ton

Ton merak uyandırıcı olmalı; korku veya aşırı karanlık olmamalıdır. Genel casual hedef kitle için şiddet, ölüm ve travma ayrıntıları minimumda tutulur. Olaylar teknoloji, dolandırıcılık, sabotaj, ihmâl ve kurumsal sırlar çevresinde gelişir.

Ana karakterin yüzü veya kesin kimliği ilk sürümde gösterilmez. Oyuncu kendisini müfettiş rolüne yerleştirebilir.

Yardımcı karakter:

- **Mira:** Vaka koordinatörü. Kısa brifingler verir, ipucu sistemi için bağlamsal mesajlar sunar.

Karşıt güç:

- **Asterion Systems:** Farklı şehir sistemlerinde ortak test yazılımı kullanan teknoloji şirketi.

## 9. İlerleme ve Puanlama

Her vaka 0–3 yıldız verir.

Örnek puan bileşenleri:

- Doğru nihai hipotez: zorunlu
- Doğru destek delilleri
- Yanlış bağlantı sayısı
- Kullanılan ipucu sayısı
- Puzzle yeniden deneme sayısı

Süre, casual oyuncuyu cezalandıran ana ölçüt olmamalıdır. Süre yalnızca kişisel istatistik olarak gösterilebilir.

Kilitleme:

- Tutorial tamamlanınca Vaka 1 açılır.
- Bir vaka en az 1 yıldızla tamamlanınca sonraki vaka açılır.
- Oyuncu eski vakaları istediği zaman tekrar oynayabilir.

## 10. İpucu Sistemi

İpucu reklam veya para gerektirmez.

Her puzzle için üç kademeli ipucu bulunabilir:

1. Genel yönlendirme
2. İlgili delili işaret etme
3. Bir adımı açıklama

İpucu kullanımı yıldız puanını etkileyebilir fakat oyuncuyu ilerlemekten alıkoymaz.

## 11. Başarımlar

MVP başarımları:

- İlk Rapor
- İpucusuz Çözüm
- Kusursuz Bağlantı
- Tüm Delilleri İncele
- Dört Vakayı Tamamla
- Üç Yıldızlı Müfettiş

Başarımlar yalnızca yerel tutulabilir. Google Play Games entegrasyonu MVP dışıdır.

## 12. Erişilebilirlik

- Metin boyutu: normal / büyük / çok büyük
- Renk körlüğüne uygun ikon ve desenler
- Hareket azaltma seçeneği
- Ses kapalıyken tüm bilgi görsel olarak erişilebilir
- Sürükleme gerektiren puzzle'larda dokunmatik alternatif
- Minimum dokunma alanı yaklaşık 44–48 dp
- Zaman baskısı yok
- Titreşim aç/kapat

## 13. Para Kazanma

İlk yayın:

- Reklam yok
- Ücretsiz veya tek seferlik ücretli uygulama kararı yayın öncesinde verilebilir
- Oyun mekaniği satın almaya bağlı olmayacak

Gelecek seçenek:

- Ana oyun ücretsiz, ek vaka paketleri tek seferlik satın alma
- Reklam kaldırma ürünü oluşturulmayacak; çünkü reklam bulunmayacak
- Ödeme entegrasyonu, MVP stabil olmadan eklenmeyecek

## 14. Başarı Ölçütleri

Teknik:

- Çökmesiz oturum oranı yüksek
- Orta sınıf Android cihazda akıcı kullanım
- İnternetsiz tam oynanış
- Kayıt kaybı olmaması

Ürün:

- Tutorial tamamlanma oranı
- Vaka 1 tamamlanma oranı
- Vaka başına ipucu kullanımı
- Puzzle terk noktaları
- Mağaza değerlendirmeleri

MVP'de üçüncü taraf analytics zorunlu değildir. Gizlilik dostu yerel debug event log'u yeterlidir.
