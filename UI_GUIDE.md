# UI GUIDE

## 1. Sanat Yönü

Dijital adli inceleme masası ile modern bir kontrol panelinin birleşimi. Jenerik yeşil “hacker terminali” görünümünden kaçınılır.

Ana hisler:

- Merak
- Kontrol
- Teknik güvenilirlik
- Sakin gerilim

## 2. Tema

MVP koyu tema odaklıdır; altyapı renk token'larıyla kurulmalıdır.

Örnek semantik token'lar:

- `background.primary`
- `background.elevated`
- `surface.card`
- `text.primary`
- `text.secondary`
- `accent.primary`
- `status.success`
- `status.warning`
- `status.danger`
- `border.subtle`
- `evidence.selected`

Renk değerleri tek bir theme dosyasında tutulur. Durumlar yalnızca renkle anlatılmaz.

## 3. Tipografi

- Sistem fontu veya Expo ile lisansı uygun paketlenmiş açık kaynak font
- Gövde metninde yüksek okunabilirlik
- Terminal/log alanında monospace font kullanılabilir
- Büyük harfli uzun metinlerden kaçın
- Dinamik metin büyüklüğünde layout bozulmamalı

Tipografik roller:

- Display
- Screen title
- Section title
- Body
- Caption
- Log row
- Button label

## 4. Spacing ve Yerleşim

4 veya 8 tabanlı spacing sistemi.

Örnek:

- 4: mikro boşluk
- 8: iç element
- 12: sıkı kart
- 16: standart
- 24: bölüm
- 32: büyük bölüm

Dikey ekranlarda tek elle kullanıma dikkat edilir. Kritik ana butonlar alt bölgede erişilebilir olur.

## 5. Ana Ekranlar

### Home

- Devam et
- Vakalar
- Arşiv
- Ayarlar
- Oyuncu rütbesi veya ilerleme özeti

### Case List

- Vaka numarası
- Başlık
- Zorluk
- Yıldız
- Kilit durumu
- Tahmini süre

### Briefing

- Kısa vaka özeti
- Amaçlar
- Başlat butonu

### Evidence Desk

- Üstte vaka ilerlemesi
- Delil kartları
- Puzzle sekmesi veya görev paneli
- Rapor butonu yalnızca uygun zamanda etkin

### Puzzle

- Net talimat
- Ana etkileşim alanı
- Geri al / sıfırla
- İpucu
- Erişilebilir alternatif kontrol

### Report

- Hipotez seçenekleri
- Destek delili seçimi
- Göndermeden önce özet

### Result

- Yıldız
- Sonuç açıklaması
- Eksik veya yanlış çıkarımın öğretici açıklaması
- Tekrar oyna / sonraki vaka

## 6. Bileşenler

- `PrimaryButton`
- `SecondaryButton`
- `IconButton`
- `EvidenceCard`
- `CaseCard`
- `StatusBadge`
- `ProgressHeader`
- `BottomActionBar`
- `HintSheet`
- `ConfirmDialog`
- `EmptyState`
- `ErrorState`
- `LoadingState`

Her bileşen disabled, pressed, focused ve loading durumlarını destekler.

## 7. Hareket

- Ekran geçişleri kısa ve dikkat dağıtmayan
- Delil açılışında hafif scale/fade
- Doğru bağlantıda kısa feedback
- Yanlışta sert ekran sarsıntısı yok; erişilebilir ve sakin feedback
- Sürekli parlayan veya dönen dekoratif animasyonlardan kaçın
- Reduce Motion açıksa kritik olmayan animasyonlar kaldırılır

## 8. Haptics

- Hafif seçim: kart seçimi
- Orta başarı: puzzle çözümü
- Uyarı: geçersiz bağlantı
- Titreşim kapalıysa hiçbir çağrı yapılmaz

## 9. Erişilebilirlik Kontrolü

- Tüm ikon butonlarında accessibilityLabel
- Puzzle öğelerinde rol ve durum açıklaması
- Screen reader için doğru okuma sırası
- Minimum contrast
- Büyük fontta metin kesilmez
- Dokunmatik alternatifler
- Yalnızca sesle aktarılan ipucu yok

## 10. Asset Politikası

- İlk prototipte lisans sorunu olmayan basit geometrik/generatif assetler
- Lisanssız fotoğraf veya marka logosu yok
- Asset kaynakları `ASSET_LICENSES.md` içinde takip edilir
- AI ile üretilen asset kullanılırsa üretim kaynağı ve kullanım hakkı ayrıca kaydedilir
