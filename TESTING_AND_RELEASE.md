# TESTING AND RELEASE

## 1. Test Stratejisi

### Unit

Öncelik:

- Zod vaka doğrulaması
- Unlock condition evaluator
- Scoring engine
- Puzzle evaluators
- Progression logic
- Migration helpers

### Component

- CaseCard durumları
- HintSheet
- Report seçimleri
- Timeline erişilebilir alternatif
- Error/empty/loading durumları

### Integration

- SQLite bootstrap -> migration -> repository
- Case loader -> schema -> runtime
- Session autosave -> uygulama yeniden açılışı -> restore
- Case completion -> stars -> next case unlock

### Manual E2E

1. Fresh install
2. Dil seçimi
3. Tutorial başlatma
4. Uygulamayı puzzle ortasında kapatma
5. Oturumu devam ettirme
6. İpucu kullanma
7. Yanlış rapor
8. Doğru rapor
9. Sonraki vakanın açılması
10. Airplane mode altında aynı akış

## 2. Zorunlu Komutlar

Proje scriptleri oluşturulduktan sonra benzer komutlar bulunmalıdır:

```bash
npm run typecheck
npm run lint
npm test
npx expo export --platform android
```

Gerçek script isimleri README'de belgelenir.

## 3. Cihaz Matrisi

En az:

- Küçük Android ekran
- Orta segment fiziksel Android cihaz veya eşdeğer emulator
- Güncel Android sürümü
- Desteklenen en düşük Android sürümüne yakın cihaz/emulator
- Büyük font
- Reduce Motion
- TalkBack temel gezinme

## 4. Performans Bütçesi

- İlk etkileşim makul sürede
- Ekran geçişlerinde belirgin takılma olmaması
- Büyük log listesinde akıcı scroll
- Puzzle ekranında sürekli gereksiz rerender olmaması
- Memory leak veya her geçişte artan ses/canvas kaynağı olmaması

Kesin sayı iddia edilmez; gerçek cihaz profiling ile regresyonlar belgelenir.

## 5. Save Güvenliği

Testler:

- Eski schema migration
- Eksik active session alanı
- Bozuk JSON payload
- Uygulamanın kayıt sırasında kapanması
- Vaka içeriği güncellendikten sonra eski session

Bozuk aktif session tüm ilerlemeyi silmemelidir. Yalnızca ilgili oturum güvenli biçimde sıfırlanabilir.

## 6. Yayın Öncesi Kontrol

### Uygulama

- [x] Debug menüler production'da kapalı
- [x] Placeholder metin yok
- [x] Eksik çeviri yok
- [x] Tüm vakalar tamamlanabilir
- [x] Gizli test butonları yok
- [x] Hata logları kişisel veri içermiyor
- [x] Reklam SDK'sı yok
- [x] Kullanılmayan izin yok

### Android

- [x] Kalıcı package name
- [ ] Version name/code doğru
- [x] Adaptive icon
- [x] Splash screen
- [x] Edge-to-edge kontrolü
- [x] Back button davranışı
- [ ] AAB başarıyla kurulup açılıyor

### Store

- [ ] Oyun kategorisi doğru
- [ ] İçerik derecelendirme doğru
- [x] Gizlilik politikası doğru
- [x] Data Safety gerçek davranışla uyumlu
- [ ] Ekran görüntüleri gerçek uygulamadan
- [x] Açıklama vaat edilmeyen özellik içermiyor
- [ ] Destek e-postası erişilebilir

## 7. Gizlilik Veri Envanteri

MVP hedefi:

- Hesap bilgisi: toplanmaz
- Konum: toplanmaz
- Kişiler: toplanmaz
- Fotoğraf/video: toplanmaz
- Cihaz kimliği: toplanmaz
- Reklam verisi: toplanmaz
- Oyun ilerlemesi: yalnızca cihazda saklanır

Crash veya analytics SDK daha sonra eklenirse bu liste ve mağaza beyanı güncellenmelidir.

## 8. Release Akışı

1. Main branch temiz
2. Test/lint/typecheck geçer
3. Content validation geçer
4. Preview build ve fiziksel cihaz testi
5. Version code artır
6. Production AAB
7. Internal test
8. Closed test
9. Geri bildirim düzeltmeleri
10. Production rollout
