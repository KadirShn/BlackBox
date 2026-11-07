import { withParams } from '@/content/locales/templateKeys';
import type { CaseDefinition, EvidenceDefinition } from '@/domain/case/caseSchema';

const DAILY_PREFIX = 'daily-';
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

type EvidenceType = EvidenceDefinition['type'];

type Scenario = {
  id: 'server' | 'access' | 'line';
  causes: readonly [string, string, string];
  pools: Readonly<Record<string, readonly string[]>>;
  sources: {
    start: string;
    anomaly: string;
    recovery: string;
    noise: string;
    trigger: Readonly<Record<string, string>>;
    herring: Readonly<Record<string, string>>;
  };
  devices: { main: string; aux: string };
  evidenceTypes: {
    start: EvidenceType;
    anomaly: EvidenceType;
    recovery: EvidenceType;
    trigger: EvidenceType;
    herring: EvidenceType;
  };
};

// Device names in the pools stay language-neutral; everything readable lives in dailyTranslations.
const scenarios: readonly Scenario[] = [
  {
    id: 'server',
    causes: ['disk', 'deploy', 'cert'],
    pools: {
      system: ['ATLAS-3', 'ORION-7', 'VEGA-2', 'LYRA-5', 'NOVA-9', 'KESTREL-4'],
      version: ['4.2.0', '4.3.1', '5.0.2', '5.1.0', '5.2.3'],
      count: ['1.240', '2.380', '3.115', '4.760'],
    },
    sources: {
      start: 'OPS',
      anomaly: 'APP',
      recovery: 'OPS',
      noise: 'MON',
      trigger: { disk: 'DISK', deploy: 'DEPLOY', cert: 'TLS' },
      herring: { disk: 'DISK', deploy: 'DEPLOY', cert: 'TLS' },
    },
    devices: { main: '{system}', aux: 'GW-1' },
    evidenceTypes: {
      start: 'message',
      anomaly: 'system_log',
      recovery: 'statement',
      trigger: 'system_log',
      herring: 'system_log',
    },
  },
  {
    id: 'access',
    causes: ['clone', 'lock', 'remote'],
    pools: {
      room: ['B2-ARC', 'R-114', 'VAULT-3', 'LAB-07', 'SRV-12'],
      card: ['C-2041', 'C-3318', 'C-5170', 'C-7702'],
      account: ['admin.ops', 'fm.night', 'sec.duty'],
    },
    sources: {
      start: 'PATROL',
      anomaly: 'DOOR',
      recovery: 'GUARD',
      noise: 'HVAC',
      trigger: { clone: 'CARD', lock: 'LOCK', remote: 'ADMIN' },
      herring: { clone: 'CARD', lock: 'LOCK', remote: 'ADMIN' },
    },
    devices: { main: '{room}', aux: 'LOBBY' },
    evidenceTypes: {
      start: 'statement',
      anomaly: 'sensor_record',
      recovery: 'statement',
      trigger: 'system_log',
      herring: 'system_log',
    },
  },
  {
    id: 'line',
    causes: ['sensor', 'operator', 'power'],
    pools: {
      line: ['LINE-1', 'LINE-2', 'LINE-3', 'LINE-4'],
      station: ['ST-3', 'ST-5', 'ST-8'],
      sensor: ['S-14', 'S-22', 'S-37', 'S-51'],
      value: ['−312', '−400', '−512'],
      operator: ['K-118', 'K-204', 'K-377'],
      count: ['12', '18', '27', '34'],
    },
    sources: {
      start: 'MES',
      anomaly: 'PLC',
      recovery: 'MAINT',
      noise: 'CONV',
      trigger: { sensor: 'SENSOR', operator: 'ESTOP', power: 'POWER' },
      herring: { sensor: 'SENSOR', operator: 'SHIFT', power: 'POWER' },
    },
    devices: { main: '{line}', aux: 'GRID' },
    evidenceTypes: {
      start: 'message',
      anomaly: 'sensor_record',
      recovery: 'statement',
      trigger: 'sensor_record',
      herring: 'system_log',
    },
  },
];

export function isDailyCaseId(caseId: string): boolean {
  return caseId.startsWith(DAILY_PREFIX) && datePattern.test(caseId.slice(DAILY_PREFIX.length));
}

export function dailyCaseId(dateKey: string): string {
  return `${DAILY_PREFIX}${dateKey}`;
}

export function dailyDateFromId(caseId: string): string | null {
  return isDailyCaseId(caseId) ? caseId.slice(DAILY_PREFIX.length) : null;
}

/** The player's calendar day, so the daily file changes at local midnight. */
export function localDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function shiftDateKey(dateKey: string, days: number): string {
  const [year = 0, month = 1, day = 1] = dateKey.split('-').map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return shifted.toISOString().slice(0, 10);
}

function seededRandom(seed: string): () => number {
  let state = 2166136261;
  for (const character of seed) {
    state = Math.imul(state ^ character.charCodeAt(0), 16777619);
  }
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(random: () => number, values: readonly T[]): T {
  const value = values[Math.floor(random() * values.length)];
  if (value === undefined) throw new Error('Cannot pick from an empty list');
  return value;
}

function shuffle<T>(random: () => number, values: readonly T[]): T[] {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    const current = result[index];
    const swap = result[target];
    if (current === undefined || swap === undefined) continue;
    result[index] = swap;
    result[target] = current;
  }
  return result;
}

function clock(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = String(Math.floor(normalized / 60)).padStart(2, '0');
  return `${hours}:${String(normalized % 60).padStart(2, '0')}`;
}

const turkishNumberWords = [
  'sıfır',
  'bir',
  'iki',
  'üç',
  'dört',
  'beş',
  'altı',
  'yedi',
  'sekiz',
  'dokuz',
];
const turkishTensWords = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli'];

function lastSpokenWord(value: number): string {
  if (value === 0) return 'sıfır';
  const units = value % 10;
  return units === 0
    ? (turkishTensWords[Math.floor(value / 10)] ?? 'on')
    : (turkishNumberWords[units] ?? 'bir');
}

/** "01:42" → "01:42’de": the locative suffix follows how the time is read aloud. */
export function turkishLocative(time: string): string {
  const [hours = 0, minutes = 0] = time.split(':').map(Number);
  const word = lastSpokenWord(minutes === 0 ? hours : minutes);
  const vowels = [...word].filter((character) => 'aıoueiöü'.includes(character));
  const backVowel = 'aıou'.includes(vowels.at(-1) ?? 'e');
  const voiceless = 'çfhkpsşt'.includes(word.at(-1) ?? '');
  return `${time}’${voiceless ? 't' : 'd'}${backVowel ? 'a' : 'e'}`;
}

function between(random: () => number, min: number, max: number): number {
  return min + Math.floor(random() * (max - min + 1));
}

const cache = new Map<string, CaseDefinition>();

export function getDailyCase(caseId: string): CaseDefinition | null {
  const dateKey = dailyDateFromId(caseId);
  if (dateKey === null) return null;
  const cached = cache.get(caseId);
  if (cached !== undefined) return cached;
  const generated = generateDailyCase(dateKey);
  cache.set(caseId, generated);
  return generated;
}

export function generateDailyCase(dateKey: string): CaseDefinition {
  const random = seededRandom(`blackbox-daily-${dateKey}`);
  const scenario = pick(random, scenarios);
  const cause = pick(random, scenario.causes);
  const herringCause = pick(
    random,
    scenario.causes.filter((item) => item !== cause),
  );

  const startMinute = between(random, 0, 180);
  const triggerMinute = startMinute + between(random, 12, 45);
  const anomalyMinute = triggerMinute + between(random, 1, 6);
  const noiseMinute = between(random, startMinute + 2, triggerMinute - 2);
  const herringMinute = between(random, startMinute + 1, anomalyMinute + 20);
  const recoveryMinute = anomalyMinute + between(random, 15, 45);

  const params: Record<string, string> = {
    date: dateKey,
    startTime: clock(startMinute),
    triggerTime: clock(triggerMinute),
    anomalyTime: clock(anomalyMinute),
    recoveryTime: clock(recoveryMinute),
    herringTime: clock(herringMinute),
    noiseTime: clock(noiseMinute),
    startAt: turkishLocative(clock(startMinute)),
    triggerAt: turkishLocative(clock(triggerMinute)),
    anomalyAt: turkishLocative(clock(anomalyMinute)),
    recoveryAt: turkishLocative(clock(recoveryMinute)),
    herringAt: turkishLocative(clock(herringMinute)),
    triggerSource: scenario.sources.trigger[cause] ?? 'LOG',
    anomalySource: scenario.sources.anomaly,
  };
  for (const [name, pool] of Object.entries(scenario.pools)) params[name] = pick(random, pool);
  const fill = (template: string) =>
    template.replace(/\{(\w+)\}/g, (match, name: string) => params[name] ?? match);
  const key = (path: string) => withParams(`daily.${scenario.id}.${path}`, params);
  const commonKey = (path: string) => withParams(`daily.common.${path}`, params);
  const mainDevice = fill(scenario.devices.main);
  const always = { type: 'always' } as const;

  const timelineIds = ['daily-start', 'daily-trigger', 'daily-anomaly', 'daily-recovery'];
  let shuffled = shuffle(random, timelineIds);
  if (shuffled.every((id, index) => id === timelineIds[index])) shuffled = [...shuffled].reverse();

  const logRows = [
    {
      id: 'dl-start',
      minute: startMinute,
      source: scenario.sources.start,
      level: 'info' as const,
      device: mainDevice,
      messageKey: key('log.start'),
    },
    {
      id: 'dl-noise',
      minute: noiseMinute,
      source: scenario.sources.noise,
      level: 'info' as const,
      device: scenario.devices.aux,
      messageKey: key('log.noise'),
    },
    {
      id: 'dl-trigger',
      minute: triggerMinute,
      source: scenario.sources.trigger[cause] ?? 'LOG',
      level: 'warning' as const,
      device: mainDevice,
      messageKey: key(`log.trigger.${cause}`),
    },
    {
      id: 'dl-herring',
      minute: herringMinute,
      source: scenario.sources.herring[herringCause] ?? 'LOG',
      level: 'info' as const,
      device: scenario.devices.aux,
      messageKey: key(`log.herring.${herringCause}`),
    },
    {
      id: 'dl-anomaly',
      minute: anomalyMinute,
      source: scenario.sources.anomaly,
      level: 'error' as const,
      device: mainDevice,
      messageKey: key('log.anomaly'),
    },
    {
      id: 'dl-recovery',
      minute: recoveryMinute,
      source: scenario.sources.recovery,
      level: 'info' as const,
      device: mainDevice,
      messageKey: key('log.recovery'),
    },
  ]
    .sort((a, b) => a.minute - b.minute || a.id.localeCompare(b.id))
    .map(({ minute, ...row }) => ({ ...row, time: clock(minute) }));

  const timelineEvidence = (
    id: string,
    type: EvidenceType,
    path: string,
    time: string,
  ): EvidenceDefinition => ({
    id,
    type,
    titleKey: key(`${path}.title`),
    descriptionKey: key(`${path}.description`),
    content: { kind: 'timeline_item', time, bodyKey: key(`${path}.body`) },
    unlockCondition: always,
    tags: ['timeline'],
  });

  return {
    id: dailyCaseId(dateKey),
    schemaVersion: 1,
    chapter: 0,
    titleKey: key('title'),
    summaryKey: key('summary'),
    briefingKey: key('briefing'),
    difficulty: 'easy',
    estimatedMinutes: 4,
    // Shuffled so the card order never hints at which clue started the incident.
    evidence: shuffle(random, [
      timelineEvidence(
        'daily-start',
        scenario.evidenceTypes.start,
        'start',
        params.startTime ?? '',
      ),
      timelineEvidence(
        'daily-trigger',
        scenario.evidenceTypes.trigger,
        `trigger.${cause}`,
        params.triggerTime ?? '',
      ),
      timelineEvidence(
        'daily-anomaly',
        scenario.evidenceTypes.anomaly,
        'anomaly',
        params.anomalyTime ?? '',
      ),
      timelineEvidence(
        'daily-recovery',
        scenario.evidenceTypes.recovery,
        'recovery',
        params.recoveryTime ?? '',
      ),
      {
        id: 'daily-herring',
        type: scenario.evidenceTypes.herring,
        titleKey: key(`herring.${herringCause}.title`),
        descriptionKey: key(`herring.${herringCause}.description`),
        content: { kind: 'text', bodyKey: key(`herring.${herringCause}.body`) },
        unlockCondition: always,
        tags: ['context'],
      },
    ]),
    puzzles: [
      {
        id: 'daily-timeline',
        type: 'timeline',
        titleKey: commonKey('timeline.title'),
        instructionsKey: commonKey('timeline.instructions'),
        itemIds: shuffled,
        correctOrder: timelineIds,
        unlockCondition: always,
        hints: [
          { id: 'daily-time-h1', level: 1, textKey: commonKey('timeline.hint1') },
          { id: 'daily-time-h2', level: 2, textKey: commonKey('timeline.hint2') },
          { id: 'daily-time-h3', level: 3, textKey: commonKey('timeline.hint3') },
        ],
      },
      {
        id: 'daily-logs',
        type: 'log_analyzer',
        titleKey: commonKey('logs.title'),
        instructionsKey: commonKey('logs.instructions'),
        rows: logRows,
        requiredRowIds: ['dl-trigger', 'dl-anomaly'],
        allowedMistakes: 0,
        unlockCondition: { type: 'puzzle_solved', puzzleId: 'daily-timeline' },
        hints: [
          { id: 'daily-log-h1', level: 1, textKey: commonKey('logs.hint1') },
          {
            id: 'daily-log-h2',
            level: 2,
            textKey: commonKey('logs.hint2'),
            highlightTargetId: 'dl-trigger',
          },
          {
            id: 'daily-log-h3',
            level: 3,
            textKey: commonKey('logs.hint3'),
            highlightTargetId: 'dl-anomaly',
          },
        ],
      },
    ],
    hypotheses: shuffle(random, scenario.causes).map((item) => ({
      id: item,
      labelKey: key(`hypothesis.${item}`),
      explanationKey: key(`hypothesis.${item}.explanation`),
    })),
    solution: {
      correctHypothesisId: cause,
      requiredEvidenceIds: ['daily-trigger', 'daily-anomaly'],
      requiredPuzzleIds: ['daily-timeline', 'daily-logs'],
      misleadingEvidenceIds: ['daily-herring'],
      explanationKey: key(`solution.${cause}`),
    },
    scoring: { maxHintsForThreeStars: 0, maxHintsForTwoStars: 2 },
  };
}
