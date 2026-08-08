# TECHNICAL DESIGN

## 1. Teknik Hedef

Expo tabanlı, Android öncelikli, offline-first, veri odaklı 2D puzzle oyunu. Standart ekranlar React Native bileşenleriyle; yalnızca gerçekten ihtiyaç duyulan özel oyun yüzeyleri Skia ile oluşturulur.

## 2. Sürüm Politikası

- Proje oluşturulurken `create-expo-app` ile o tarihteki güncel kararlı Expo sürümü kullanılır.
- Paket sürümleri elle tahmin edilmez; Expo paketleri `npx expo install` ile kurulur.
- Dokümandaki eski bir sürüm ile güncel resmi uyumluluk tablosu çelişirse resmi Expo dokümanı esas alınır.
- Node için güncel Expo'nun desteklediği LTS sürümü kullanılır.
- `package-lock.json` repoya eklenir.

## 3. Önerilen Teknolojiler

Zorunlu:

- Expo
- Expo Router
- React Native
- TypeScript strict
- Zustand
- Zod
- Expo SQLite
- Expo Audio
- Expo Haptics
- Expo Localization
- i18next veya küçük özel localization katmanı
- React Native Gesture Handler
- React Native Reanimated

Koşullu:

- React Native Skia: bağlantı çizgileri, özel timeline veya görsel puzzle yüzeyi gerçekten fayda sağlıyorsa
- expo-dev-client: native bağımlılık Development Build gerektiriyorsa

Eklenmeyecek:

- AdMob veya başka reklam SDK'sı
- Backend/Supabase/Firebase
- React Query; uzaktan veri olmadığı için MVP'de gerekmez
- Redux; durum karmaşıklığı bunu gerektirmiyor
- Ağır oyun motoru

## 4. Mimari

Pragmatik feature-first mimari:

```text
app/
  _layout.tsx
  index.tsx
  onboarding.tsx
  cases/
    index.tsx
    [caseId].tsx
  settings.tsx
  archive.tsx

src/
  components/
  features/
    briefing/
    evidence/
    timeline/
    log-analyzer/
    contradiction/
    connection-board/
    report/
    results/
  domain/
    case/
    puzzle/
    scoring/
    progression/
  engine/
    case-loader/
    condition-evaluator/
    puzzle-runtime/
    scoring-engine/
  content/
    cases/
    locales/
  data/
    database/
    repositories/
    migrations/
  stores/
  services/
    audio/
    haptics/
    logger/
  theme/
  utils/
  types/
  test/
assets/
```

## 5. Katman Kuralları

- `domain`: saf TypeScript; React veya Expo import etmez.
- `engine`: vaka yükleme, koşul değerlendirme ve puanlama; mümkün olduğunca saf fonksiyonlar.
- `features`: ekranlara ait kullanıcı etkileşimi ve UI.
- `data`: SQLite ve repository implementasyonları.
- `content`: statik vaka JSON/TS verileri ve çeviri anahtarları.
- `app`: rota dosyaları; minimum iş mantığı.

Bağımlılık yönü:

```text
app -> features -> engine/domain
features -> repositories interfaces
repository implementations -> SQLite
content -> domain schemas
```

## 6. Veri Modeli

### CaseDefinition

```ts
export type CaseDefinition = {
  id: string;
  schemaVersion: number;
  titleKey: string;
  summaryKey: string;
  difficulty: 'tutorial' | 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  evidence: EvidenceDefinition[];
  puzzles: PuzzleDefinition[];
  hypotheses: HypothesisDefinition[];
  solution: CaseSolutionDefinition;
  scoring: ScoringDefinition;
};
```

Runtime içeriği Zod ile doğrulanır. Hatalı vaka uygulamayı çökertmek yerine geliştirici modunda açıklayıcı hata ekranı göstermelidir.

### PlayerProgress

```ts
export type PlayerProgress = {
  caseId: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  bestStars: 0 | 1 | 2 | 3;
  attempts: number;
  hintsUsedBest: number | null;
  completedAt: string | null;
};
```

### ActiveSession

Aktif vaka oturumu ayrı saklanır:

- Açılan deliller
- İşaretlenen alanlar
- Puzzle cevapları
- Kullanılan ipuçları
- Seçilen hipotez
- Son kayıt zamanı

Her anlamlı kullanıcı eyleminden sonra debounce ile kayıt yapılır.

## 7. SQLite Şeması

Önerilen tablolar:

```sql
CREATE TABLE app_meta (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE case_progress (
  case_id TEXT PRIMARY KEY NOT NULL,
  status TEXT NOT NULL,
  best_stars INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  hints_used_best INTEGER,
  completed_at TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE active_sessions (
  case_id TEXT PRIMARY KEY NOT NULL,
  payload_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE achievements (
  achievement_id TEXT PRIMARY KEY NOT NULL,
  unlocked_at TEXT NOT NULL
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY NOT NULL,
  value_json TEXT NOT NULL
);
```

Migration sistemi numaralı ve idempotent olmalıdır.

## 8. Durum Yönetimi

Zustand store'ları küçük tutulur:

- `useSettingsStore`
- `useSessionStore`
- `useUiStore`

Kalıcı ana kaynak SQLite'dır. Store, veritabanının kontrolsüz kopyası olmamalıdır.

## 9. Puzzle Runtime

Her puzzle aynı yaşam döngüsünü uygular:

```ts
type PuzzleRuntimeState = {
  puzzleId: string;
  status: 'not_started' | 'active' | 'solved';
  attempts: number;
  hintsUsed: number;
  answer: unknown;
};
```

Her puzzle adapter'ı şunları sağlar:

- definition schema
- initial state
- answer validation
- solution evaluation
- serialization
- UI component mapping

Hard-coded `if (caseId === ...)` yaklaşımı yasaktır.

## 10. Koşul Motoru

Delil veya puzzle kilitleri basit deklaratif koşullarla açılır:

```ts
type UnlockCondition =
  | { type: 'always' }
  | { type: 'evidence_opened'; evidenceId: string }
  | { type: 'puzzle_solved'; puzzleId: string }
  | { type: 'all'; conditions: UnlockCondition[] }
  | { type: 'any'; conditions: UnlockCondition[] };
```

Koşul değerlendirme saf fonksiyondur ve kapsamlı test edilir.

## 11. Puanlama

Puanlama deterministik olmalıdır.

Örnek:

- Doğru hipotez zorunlu
- 3 yıldız: en fazla 1 ipucu, kritik bağlantıların tamamı doğru
- 2 yıldız: doğru çözüm, en fazla 3 ipucu
- 1 yıldız: doğru çözüm
- 0 yıldız: rapor yanlış; vaka tamamlanmış sayılmaz

Süre yıldızı etkilemez.

## 12. Lokalizasyon

- Kullanıcıya görünen ham metin vaka JSON'una gömülmez; çeviri anahtarı kullanılır.
- Türkçe varsayılan içerik kalitesinde olmalıdır.
- İngilizce çeviri eksikse fallback Türkçe değil, geliştirici ortamında görünür eksik anahtar olmalıdır; production fallback İngilizce veya belirlenen varsayılan dil olabilir.
- Tarih/saat biçimleri locale-aware gösterilir.

## 13. Ses ve Haptics

- UI sesleri kısa ve düşük boyutlu.
- Ses dosyaları önceden yüklenir veya vaka açılışında kontrollü yüklenir.
- Ayarlardan müzik, efekt ve titreşim bağımsız kapatılabilir.
- Haptics başarısız olursa uygulama çalışmaya devam eder.

## 14. Performans

- Uzun listelerde FlatList/FlashList ancak gerçek ihtiyaç varsa.
- Büyük base64 veriler uygulama koduna gömülmez.
- Gereksiz blur, gölge ve sürekli animasyon kullanılmaz.
- Skia canvas yalnızca görünürken çalışır.
- Reanimated shared values React state ile her karede senkronize edilmez.
- Düşük/orta segment Android cihaz hedeflenir.

## 15. Hata Yönetimi

- Global Error Boundary
- Vaka içeriği doğrulama hatası ekranı
- SQLite işlem hatalarında kullanıcıya veri kaybetmeyen yeniden deneme
- Loglar kişisel veri içermemeli
- Production'da ayrıntılı stack kullanıcıya gösterilmemeli

## 16. Gizlilik

MVP:

- Hesap yok
- Reklam yok
- Konum, kişiler, kamera, mikrofon izni yok
- Gereksiz cihaz kimliği toplanmaz
- Analytics eklenmezse veri cihazdan çıkmaz

Bu durum mağaza veri güvenliği formunda doğru şekilde beyan edilmelidir.

## 17. Build

- `development`, `preview`, `production` EAS profilleri
- Android production çıktısı AAB
- Paket adı placeholder değil, kullanıcı tarafından seçilecek kalıcı application ID olmalıdır
- Sürüm kodu her production build'de artar
- Development Build yalnızca gerektiğinde kullanılır
