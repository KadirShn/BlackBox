import type { Language } from '@/content/locales/translations';
import {
  remainingCaseTranslationsEn,
  remainingCaseTranslationsTr,
} from '@/content/locales/remainingCaseTranslations';

const tr: Record<string, string> = {
  ...remainingCaseTranslationsTr,
  'cases.tutorial.title': 'Kayıp 11 Dakika',
  'cases.tutorial.summary': 'Bir teslimat dronunun kayıp kayıt aralığını incele.',
  'cases.tutorial.briefing':
    'Mira: D-17 dronu teslimatı tamamladı, ancak telemetride 11 dakikalık bir boşluk var. Kayıtların neden sustuğunu kanıtlarla açıkla.',
  'cases.tutorial.evidence.dispatch.title': 'Görev Mesajı',
  'cases.tutorial.evidence.dispatch.description': 'D-17 için gönderilen teslimat görevi.',
  'cases.tutorial.evidence.dispatch.body': '21:04 — Teslimat görevi kabul edildi.',
  'cases.tutorial.evidence.ticket.title': 'Bakım Talebi',
  'cases.tutorial.evidence.ticket.description': 'Operatörün kısa tanılama talebi.',
  'cases.tutorial.evidence.ticket.body': '21:07 — Pervane titreşimi için tanılama istendi.',
  'cases.tutorial.evidence.maintenance.title': 'Bakım Modu Olayı',
  'cases.tutorial.evidence.maintenance.description': 'Uçuş denetleyicisi durum değişikliği.',
  'cases.tutorial.evidence.maintenance.body':
    '21:08 — Bakım modu etkinleştirildi; uçuş telemetrisi duraklatıldı.',
  'cases.tutorial.evidence.flight.title': 'Uçuş Kaydı',
  'cases.tutorial.evidence.flight.description': 'D-17 telemetri özetinin dönüş satırı.',
  'cases.tutorial.evidence.flight.body': '21:19 — Bakım modu kapandı; telemetri normal devam etti.',
  'cases.tutorial.puzzles.timeline.title': 'Zaman Çizelgesi',
  'cases.tutorial.puzzles.timeline.instructions':
    'Olayları en eskiden en yeniye sırala. Kartları sürükleyebilir veya ok düğmelerini kullanabilirsin.',
  'cases.tutorial.puzzles.timeline.hint1':
    'Kesin saatleri karşılaştır; boşluk bir olaydan hemen sonra başlıyor.',
  'cases.tutorial.puzzles.timeline.hint2': 'Bakım talebi, bakım modu olayından önce gelmeli.',
  'cases.tutorial.puzzles.timeline.hint3': 'Sıra 21:04, 21:07, 21:08 ve 21:19 olmalı.',
  'cases.tutorial.hypotheses.signal': 'Geçici sinyal kaybı',
  'cases.tutorial.hypotheses.signal.explanation': 'Dış bağlantı kesintisi kayıtları açıklayabilir.',
  'cases.tutorial.hypotheses.maintenance': 'Planlı bakım modu',
  'cases.tutorial.hypotheses.maintenance.explanation':
    'Tanılama sırasında telemetri tasarım gereği durdu.',
  'cases.tutorial.hypotheses.battery': 'Batarya arızası',
  'cases.tutorial.hypotheses.battery.explanation':
    'Ani güç kaybı kayıt boşluğu oluşturmuş olabilir.',
  'cases.tutorial.solution':
    'Bakım talebinden bir dakika sonra bakım modu etkinleşti. Bu mod uçuş telemetrisini 11 dakika duraklattı; sistem 21:19’da normal kayda döndü.',
  'cases.night.title': 'Gece Rotası',
  'cases.night.summary': 'Otonom kargo aracının kapalı depoya yönelmesini araştır.',
  'cases.night.briefing':
    'Mira: Cargo-04, planlı rotasından ayrılıp Warehouse-7’ye girdi. GPS uyarısı var, fakat rota değişikliğinin kaynağını kanıtlamamız gerekiyor.',
  'cases.night.evidence.plan.title': 'Onaylı Rota',
  'cases.night.evidence.plan.description': 'Cargo-04 için başlangıç rota planı.',
  'cases.night.evidence.plan.body': '23:40 — Rota N-14 onaylandı; Warehouse-7 planda yok.',
  'cases.night.evidence.gps.title': 'GPS Bütünlük Uyarısı',
  'cases.night.evidence.gps.description': 'Uydu sinyali güven puanı kısa süre düştü.',
  'cases.night.evidence.gps.body': '23:47 — Konum güven puanı %42’ye düştü; rota henüz değişmedi.',
  'cases.night.evidence.access.title': 'Erişim Denetimi',
  'cases.night.evidence.access.description': 'Bakım konsolundaki yetkili oturum kaydı.',
  'cases.night.evidence.access.body':
    '23:48 — “mira.svc” bakım hesabı Console-2 üzerinde rota yazma yetkisi aldı.',
  'cases.night.evidence.route.title': 'Rota Değişiklik Kaydı',
  'cases.night.evidence.route.description': 'Aracın hedef güncellemesi ve depo girişi.',
  'cases.night.evidence.route.body':
    '23:55 — Yetkili override ile hedef Warehouse-7 olarak değiştirildi; kapı açıldı.',
  'cases.night.timeline.title': 'Rota Olayları',
  'cases.night.timeline.instructions':
    'Rota planı, GPS uyarısı, erişim ve depo girişini kronolojik sırala.',
  'cases.night.timeline.hint1': 'Rota planı ilk, depo kapısının açılması son olaydır.',
  'cases.night.timeline.hint2': 'Yetki yükseltme GPS uyarısından bir dakika sonra gerçekleşti.',
  'cases.night.timeline.hint3': '23:40 → 23:47 → 23:48 → 23:55 sırasını kullan.',
  'cases.night.logs.title': 'Kontrol Logları',
  'cases.night.logs.instructions': 'Rota değişikliğini doğrudan açıklayan iki anormal satırı seç.',
  'cases.night.logs.row1': 'Rota N-14 yüklendi.',
  'cases.night.logs.row2': 'Motor sıcaklığı normal.',
  'cases.night.logs.row3': 'GPS güven puanı eşik altına düştü.',
  'cases.night.logs.row4': 'Bakım hesabına geçici rota yazma yetkisi verildi.',
  'cases.night.logs.row5': 'Kullanıcı override komutu hedefi Warehouse-7 yaptı.',
  'cases.night.logs.row6': 'Warehouse-7 servis kapısı açıldı.',
  'cases.night.logs.hint1': 'Uyarı ile gerçek rota komutunu birbirinden ayır.',
  'cases.night.logs.hint2': 'ACCESS kaynağındaki yetki değişimi kritik.',
  'cases.night.logs.hint3': 'ACCESS 23:48 ve NAV 23:49 satırlarını seç.',
  'cases.night.hypothesis.software': 'Navigasyon yazılımı hatası',
  'cases.night.hypothesis.software.explanation': 'Araç kendi başına yanlış hedef üretmiş olabilir.',
  'cases.night.hypothesis.gps': 'GPS yanıltma',
  'cases.night.hypothesis.gps.explanation': 'Bozuk konum sinyali aracı depoya sürüklemiş olabilir.',
  'cases.night.hypothesis.access': 'Yetkili kullanıcı müdahalesi',
  'cases.night.hypothesis.access.explanation':
    'Bakım yetkisiyle bilinçli rota override komutu gönderildi.',
  'cases.night.solution':
    'GPS güven uyarısı rota değişikliğine yol açmadı. Bir dakika sonra bakım hesabına rota yazma yetkisi verildi ve hedef kullanıcı override komutuyla Warehouse-7 olarak değiştirildi.',
};

const en: Record<string, string> = {
  ...remainingCaseTranslationsEn,
  'cases.tutorial.title': 'The Missing 11 Minutes',
  'cases.tutorial.summary': 'Investigate a missing interval in a delivery drone log.',
  'cases.tutorial.briefing':
    'Mira: Drone D-17 completed its delivery, but telemetry is silent for eleven minutes. Explain why, and support the report with evidence.',
  'cases.tutorial.evidence.dispatch.title': 'Dispatch Message',
  'cases.tutorial.evidence.dispatch.description': 'The delivery task sent to D-17.',
  'cases.tutorial.evidence.dispatch.body': '21:04 — Delivery task accepted.',
  'cases.tutorial.evidence.ticket.title': 'Maintenance Request',
  'cases.tutorial.evidence.ticket.description': 'A short diagnostic request from the operator.',
  'cases.tutorial.evidence.ticket.body': '21:07 — Diagnostics requested for propeller vibration.',
  'cases.tutorial.evidence.maintenance.title': 'Maintenance Mode Event',
  'cases.tutorial.evidence.maintenance.description': 'A flight controller state transition.',
  'cases.tutorial.evidence.maintenance.body':
    '21:08 — Maintenance mode enabled; flight telemetry paused.',
  'cases.tutorial.evidence.flight.title': 'Flight Log',
  'cases.tutorial.evidence.flight.description': 'The line where D-17 telemetry returns.',
  'cases.tutorial.evidence.flight.body':
    '21:19 — Maintenance mode ended; telemetry resumed normally.',
  'cases.tutorial.puzzles.timeline.title': 'Timeline',
  'cases.tutorial.puzzles.timeline.instructions':
    'Order events from earliest to latest. Drag cards or use the arrow buttons.',
  'cases.tutorial.puzzles.timeline.hint1':
    'Compare exact times; the gap begins immediately after one event.',
  'cases.tutorial.puzzles.timeline.hint2':
    'The maintenance request must come before the maintenance mode event.',
  'cases.tutorial.puzzles.timeline.hint3': 'The order is 21:04, 21:07, 21:08, then 21:19.',
  'cases.tutorial.hypotheses.signal': 'Temporary signal loss',
  'cases.tutorial.hypotheses.signal.explanation':
    'An external connection loss could explain the gap.',
  'cases.tutorial.hypotheses.maintenance': 'Scheduled maintenance mode',
  'cases.tutorial.hypotheses.maintenance.explanation':
    'Telemetry paused by design during diagnostics.',
  'cases.tutorial.hypotheses.battery': 'Battery failure',
  'cases.tutorial.hypotheses.battery.explanation': 'A sudden power loss may have created the gap.',
  'cases.tutorial.solution':
    'Maintenance mode began one minute after the request. It paused flight telemetry for eleven minutes, and normal logging resumed at 21:19.',
  'cases.night.title': 'Night Route',
  'cases.night.summary': 'Investigate why an autonomous cargo vehicle entered a closed warehouse.',
  'cases.night.briefing':
    'Mira: Cargo-04 left its approved route and entered Warehouse-7. There is a GPS warning, but we need to prove what actually changed the route.',
  'cases.night.evidence.plan.title': 'Approved Route',
  'cases.night.evidence.plan.description': 'The initial route plan for Cargo-04.',
  'cases.night.evidence.plan.body': '23:40 — Route N-14 approved; Warehouse-7 is not included.',
  'cases.night.evidence.gps.title': 'GPS Integrity Warning',
  'cases.night.evidence.gps.description': 'Satellite signal confidence briefly dropped.',
  'cases.night.evidence.gps.body':
    '23:47 — Position confidence fell to 42%; the route had not changed yet.',
  'cases.night.evidence.access.title': 'Access Audit',
  'cases.night.evidence.access.description': 'An authorized maintenance console session.',
  'cases.night.evidence.access.body':
    '23:48 — Maintenance account “mira.svc” received route-write access on Console-2.',
  'cases.night.evidence.route.title': 'Route Change Log',
  'cases.night.evidence.route.description': 'The vehicle target update and warehouse entry.',
  'cases.night.evidence.route.body':
    '23:55 — Authorized override changed the target to Warehouse-7; the door opened.',
  'cases.night.timeline.title': 'Route Events',
  'cases.night.timeline.instructions':
    'Order the route plan, GPS warning, access change, and warehouse entry.',
  'cases.night.timeline.hint1': 'The route plan is first and the warehouse door opening is last.',
  'cases.night.timeline.hint2': 'The access elevation happened one minute after the GPS warning.',
  'cases.night.timeline.hint3': 'Use 23:40 → 23:47 → 23:48 → 23:55.',
  'cases.night.logs.title': 'Control Logs',
  'cases.night.logs.instructions':
    'Select the two anomalous rows that directly explain the route change.',
  'cases.night.logs.row1': 'Route N-14 loaded.',
  'cases.night.logs.row2': 'Motor temperature normal.',
  'cases.night.logs.row3': 'GPS confidence dropped below threshold.',
  'cases.night.logs.row4': 'Maintenance account received temporary route-write access.',
  'cases.night.logs.row5': 'User override command changed target to Warehouse-7.',
  'cases.night.logs.row6': 'Warehouse-7 service door opened.',
  'cases.night.logs.hint1':
    'Separate the warning from the command that actually changed the route.',
  'cases.night.logs.hint2': 'The ACCESS privilege change is critical.',
  'cases.night.logs.hint3': 'Select ACCESS 23:48 and NAV 23:49.',
  'cases.night.hypothesis.software': 'Navigation software fault',
  'cases.night.hypothesis.software.explanation':
    'The vehicle may have generated the wrong target itself.',
  'cases.night.hypothesis.gps': 'GPS spoofing',
  'cases.night.hypothesis.gps.explanation':
    'A bad position signal may have drawn the vehicle to the warehouse.',
  'cases.night.hypothesis.access': 'Authorized user intervention',
  'cases.night.hypothesis.access.explanation':
    'A maintenance privilege sent a deliberate route override.',
  'cases.night.solution':
    'The GPS confidence warning did not alter the route. One minute later, a maintenance account received route-write access, and a user override changed the target to Warehouse-7.',
};

const dictionaries: Record<Language, Record<string, string>> = { tr, en };

export function translateCase(key: string, language: Language): string {
  return dictionaries[language][key] ?? `[missing:${key}]`;
}

export function hasCaseTranslation(key: string, language: Language): boolean {
  return dictionaries[language][key] !== undefined;
}
