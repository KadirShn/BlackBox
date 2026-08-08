# Yeni Vaka Ekleme

Vaka içeriği React ekranlarına yazılmaz. Her vaka `src/content/cases/<case-slug>/index.ts`
altında `CaseDefinition` biçiminde tanımlanır ve `src/content/cases/catalog.ts` kataloğuna hikâye
sırasıyla eklenir.

## Akış

1. Benzersiz bir vaka, delil, puzzle, hipotez ve hint kimliği seç.
2. Vaka nesnesini `satisfies CaseDefinition` ile tanımla. Dışarıdan yüklenen içerik ayrıca
   `caseSchema.parse` üzerinden katalogda doğrulanır.
3. Metinleri `src/content/locales/caseTranslations.ts` içinde hem `tr` hem `en` için ekle.
4. Puzzle kilitlerini yalnızca `always`, `evidence_opened`, `puzzle_solved`, `all` veya `any`
   koşullarıyla kur. Vaka kimliğine özel motor kodu ekleme.
5. Çözümün gerekli delil ve puzzle kimliklerini açıkça listele.
6. Vaka yanında içerik testi ekle; doğru puzzle cevaplarını ve doğru raporu doğrula.
7. `npm run validate:content` çalıştır. Bu kontrol eksik referansları, çevirileri ve erişilemeyen
   unlock graph düğümlerini hata olarak bildirir.

## Puzzle cevap biçimleri

- `timeline`: sıralı delil kimliği dizisi
- `log_analyzer`: seçilen log satırı kimliği dizisi
- `contradiction`: `{ aSegmentId, bSegmentId }`
- `connection_board`: `{ from, to, type }` bağlantılarının dizisi

İçerik üretimi sonrasında typecheck, lint, test ve Android/Web export kontrolleri birlikte
çalıştırılmalıdır.
