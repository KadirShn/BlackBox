# CASE FORMAT

## Amaç

Yeni bir vaka, ana oyun koduna özel koşul eklemeden veri dosyalarıyla tanımlanmalıdır.

## Önerilen Yapı

```text
src/content/cases/case-001/
  manifest.ts
  evidence.ts
  puzzles.ts
  solution.ts
  index.ts
```

İlk MVP'de TypeScript data modules tercih edilebilir. Sistem oturduktan sonra saf JSON'a geçilebilir. Her iki durumda da Zod doğrulaması zorunludur.

## Temel Tipler

```ts
type EvidenceType =
  'message' | 'system_log' | 'sensor_record' | 'image' | 'statement' | 'location_record';

type EvidenceDefinition = {
  id: string;
  type: EvidenceType;
  titleKey: string;
  descriptionKey: string;
  content: EvidenceContent;
  unlockCondition: UnlockCondition;
  tags: string[];
};

type PuzzleDefinition =
  | TimelinePuzzleDefinition
  | LogAnalyzerPuzzleDefinition
  | ContradictionPuzzleDefinition
  | ConnectionBoardPuzzleDefinition;
```

## Timeline Puzzle

```ts
type TimelinePuzzleDefinition = {
  id: string;
  type: 'timeline';
  titleKey: string;
  instructionsKey: string;
  itemIds: string[];
  correctOrder: string[];
  unlockCondition: UnlockCondition;
  hints: HintDefinition[];
};
```

Kurallar:

- `itemIds` ve `correctOrder` aynı eleman kümesine sahip olmalıdır.
- Tekrarlanan ID olamaz.
- 3'ten az, 8'den fazla kart MVP'de kullanılmaz.

## Log Analyzer Puzzle

```ts
type LogAnalyzerPuzzleDefinition = {
  id: string;
  type: 'log_analyzer';
  titleKey: string;
  rows: LogRowDefinition[];
  requiredRowIds: string[];
  allowedMistakes: number;
  unlockCondition: UnlockCondition;
  hints: HintDefinition[];
};
```

## Contradiction Puzzle

```ts
type ContradictionPuzzleDefinition = {
  id: string;
  type: 'contradiction';
  sourceA: SelectableSourceDefinition;
  sourceB: SelectableSourceDefinition;
  validPairs: Array<{ aSegmentId: string; bSegmentId: string }>;
  unlockCondition: UnlockCondition;
  hints: HintDefinition[];
};
```

## Connection Board Puzzle

```ts
type ConnectionType = 'supports' | 'contradicts' | 'causes';

type ConnectionBoardPuzzleDefinition = {
  id: string;
  type: 'connection_board';
  nodeIds: string[];
  allowedConnectionTypes: ConnectionType[];
  requiredConnections: Array<{
    from: string;
    to: string;
    type: ConnectionType;
  }>;
  unlockCondition: UnlockCondition;
  hints: HintDefinition[];
};
```

Bağlantılar yönlüdür. Değerlendirme sırasında normalize etme kuralı açık olmalıdır.

## Hipotez ve Çözüm

```ts
type HypothesisDefinition = {
  id: string;
  labelKey: string;
  explanationKey: string;
};

type CaseSolutionDefinition = {
  correctHypothesisId: string;
  requiredEvidenceIds: string[];
  requiredPuzzleIds: string[];
  explanationKey: string;
};
```

## İpucu

```ts
type HintDefinition = {
  id: string;
  level: 1 | 2 | 3;
  textKey: string;
  highlightTargetId?: string;
};
```

İpucu metni cevabı ilk seviyede doğrudan vermemelidir.

## Lokalizasyon Anahtarları

Örnek:

```text
cases.case001.title
cases.case001.briefing.summary
cases.case001.evidence.gps.title
cases.case001.evidence.gps.description
cases.case001.puzzles.timeline.instructions
cases.case001.result.explanation
```

## İçerik Doğrulama

Build veya test sırasında tüm vakalar için şu kontroller çalışmalıdır:

- Benzersiz ID
- Referans verilen evidence/puzzle ID mevcut
- Çeviri anahtarları iki dilde mevcut
- Çözümde kullanılan hipotez mevcut
- Puzzle çözümü geçerli
- Unlock graph erişilebilir ve döngüsel kilit içermiyor
- En az bir tamamlanabilir yol var

## Örnek Minimal Vaka

```ts
export const tutorialCase: CaseDefinition = {
  id: 'tutorial-missing-eleven',
  schemaVersion: 1,
  titleKey: 'cases.tutorial.title',
  summaryKey: 'cases.tutorial.summary',
  difficulty: 'tutorial',
  estimatedMinutes: 5,
  evidence: [],
  puzzles: [],
  hypotheses: [],
  solution: {
    correctHypothesisId: 'maintenance-mode',
    requiredEvidenceIds: ['flight-log', 'maintenance-ticket'],
    requiredPuzzleIds: ['timeline-main'],
    explanationKey: 'cases.tutorial.solution',
  },
  scoring: {
    maxHintsForThreeStars: 0,
    maxHintsForTwoStars: 2,
  },
};
```
