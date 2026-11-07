// Templates for the generated daily file; {placeholders} are filled from the case key.
export const dailyTranslationsTr: Record<string, string> = {
  'daily.common.timeline.title': 'Olay Sırası',
  'daily.common.timeline.instructions': 'Dört olayı en eskiden en yeniye sırala.',
  'daily.common.timeline.hint1': 'Her kartın başındaki saati karşılaştır.',
  'daily.common.timeline.hint2': 'İlk olay {startTime}, son olay {recoveryTime}.',
  'daily.common.timeline.hint3':
    '{startTime} → {triggerTime} → {anomalyTime} → {recoveryTime} sırasını kullan.',
  'daily.common.logs.title': 'Gece Logları',
  'daily.common.logs.instructions': 'Olayı başlatan değişikliği ve onu izleyen ilk hatayı seç.',
  'daily.common.logs.hint1':
    'Bilgi satırlarının çoğu olağan işlemler; uyarı ve hata seviyelerine odaklan.',
  'daily.common.logs.hint2': '{triggerTime} {triggerSource} satırı olayı başlattı.',
  'daily.common.logs.hint3':
    '{triggerTime} {triggerSource} ve {anomalyTime} {anomalySource} satırlarını seç.',

  'daily.server.title': '{system} Kesintisi',
  'daily.server.summary': 'Ödeme sunucusu {system} gece yanıt vermeyi bıraktı.',
  'daily.server.briefing':
    'Mira: Bu gecenin dosyası kısa. {system} ödeme sunucusu {anomalyAt} çöktü ve {count} işlem askıda kaldı. Kesintiyi neyin başlattığını bul; yanlış ipucuna kanma.',
  'daily.server.start.title': 'Bakım Penceresi',
  'daily.server.start.description': 'Operasyon ekibinin gece notu.',
  'daily.server.start.body':
    '{startTime} — Gece bakım penceresi açıldı; {system} normal yük altında.',
  'daily.server.anomaly.title': 'Servis Çöküşü',
  'daily.server.anomaly.description': 'Uygulama izleme kaydı.',
  'daily.server.anomaly.body':
    '{anomalyTime} — {system} istekleri yanıtlamayı bıraktı; {count} ödeme işlemi askıda.',
  'daily.server.recovery.title': 'Nöbetçi Notu',
  'daily.server.recovery.description': 'Nöbetçi mühendisin müdahale kaydı.',
  'daily.server.recovery.body':
    '{recoveryTime} — Nöbetçi mühendis servisi geri getirdi ve kök neden analizi istedi.',
  'daily.server.trigger.disk.title': 'Disk Doluluk Uyarısı',
  'daily.server.trigger.disk.description': 'Depolama birimi kaydı.',
  'daily.server.trigger.disk.body':
    '{triggerTime} — Yedekleme işi günlükleri {system} sistem diskine yazmaya başladı; disk %100 doldu.',
  'daily.server.trigger.deploy.title': 'Sürüm Dağıtımı',
  'daily.server.trigger.deploy.description': 'Dağıtım hattı kaydı.',
  'daily.server.trigger.deploy.body':
    '{triggerTime} — Sürüm {version} onay adımı atlanarak canlıya alındı; ödeme servisi yeni sürümle yeniden başladı.',
  'daily.server.trigger.cert.title': 'Sertifika Olayı',
  'daily.server.trigger.cert.description': 'TLS bağlantı kaydı.',
  'daily.server.trigger.cert.body':
    '{triggerTime} — {system} TLS sertifikasının süresi doldu; istemciler bağlantıyı reddetmeye başladı.',
  'daily.server.herring.disk.title': 'Disk Raporu',
  'daily.server.herring.disk.description': 'Haftalık depolama özeti.',
  'daily.server.herring.disk.body':
    'Disk kullanımı %71. Haftalık temizlik görevi {herringAt} planlandığı gibi çalıştı ve 40 GB yer açtı.',
  'daily.server.herring.deploy.title': 'Test Dağıtımı',
  'daily.server.herring.deploy.description': 'Dağıtım hattının bildirimi.',
  'daily.server.herring.deploy.body':
    'Sürüm {version} {herringAt} yalnızca test ortamına dağıtıldı; canlı sistemlere dokunulmadı.',
  'daily.server.herring.cert.title': 'Sertifika Hatırlatması',
  'daily.server.herring.cert.description': 'Otomatik e-posta.',
  'daily.server.herring.cert.body':
    '{herringTime} — “{system} sertifikasının yenilenmesine 21 gün kaldı.” Mevcut sertifika geçerli.',
  'daily.server.log.start': 'Bakım penceresi açıldı; yük normal.',
  'daily.server.log.noise': 'Ağ geçidi sağlık kontrolü başarılı.',
  'daily.server.log.anomaly': 'Ödeme servisi yanıt vermiyor; istekler zaman aşımına uğradı.',
  'daily.server.log.recovery': 'Servis yeniden başlatıldı; işlemler sürüyor.',
  'daily.server.log.trigger.disk': 'Sistem diski %100 dolu; yazma işlemleri başarısız.',
  'daily.server.log.trigger.deploy': 'Sürüm {version} canlıya alındı; onay adımı atlandı.',
  'daily.server.log.trigger.cert': 'TLS sertifikasının süresi doldu; el sıkışmalar reddediliyor.',
  'daily.server.log.herring.disk': 'Haftalık disk temizliği tamamlandı; kullanım %71.',
  'daily.server.log.herring.deploy': 'Sürüm {version} test ortamına dağıtıldı.',
  'daily.server.log.herring.cert': 'Sertifika yenileme hatırlatması gönderildi (21 gün).',
  'daily.server.hypothesis.disk': 'Disk doluluğu',
  'daily.server.hypothesis.disk.explanation':
    'Dolan disk, servisin yazma işlemlerini durdurmuş olabilir.',
  'daily.server.hypothesis.deploy': 'Hatalı sürüm dağıtımı',
  'daily.server.hypothesis.deploy.explanation': 'Onaysız bir sürüm servisi bozmuş olabilir.',
  'daily.server.hypothesis.cert': 'Süresi dolan sertifika',
  'daily.server.hypothesis.cert.explanation':
    'Geçersiz sertifika istemcilerin bağlanmasını engellemiş olabilir.',
  'daily.server.solution.disk':
    '{triggerAt} yedekleme işi günlükleri sistem diskine yazmaya başladı ve disk doldu. {anomalyAt} yazamayan ödeme servisi çöktü. Diğer kayıtlar olağan işlemlerdi; asıl iz depolama birimindeydi.',
  'daily.server.solution.deploy':
    '{triggerAt} sürüm {version} onay adımı atlanarak canlıya alındı. Yeni sürümle yeniden başlayan ödeme servisi {anomalyAt} çöktü. Diğer kayıtlar olağan işlemlerdi; asıl iz dağıtım hattındaydı.',
  'daily.server.solution.cert':
    '{triggerAt} {system} TLS sertifikasının süresi doldu ve istemciler bağlantıyı reddetti. {anomalyAt} ödeme servisi tamamen erişilemez oldu. Diğer kayıtlar olağan işlemlerdi; asıl iz sertifikadaydı.',

  'daily.access.title': '{room} Kapısı',
  'daily.access.summary': 'Kapalı {room} odasının kapısı gece açıldı.',
  'daily.access.briefing':
    'Mira: Bu gecenin dosyası kısa. {room} odasının kapısı {anomalyAt} açıldı; o saatte içeride kimsenin olmaması gerekiyordu. Kapının nasıl açıldığını kanıtla.',
  'daily.access.start.title': 'Güvenlik Turu',
  'daily.access.start.description': 'Gece devriyesinin kontrol listesi.',
  'daily.access.start.body':
    '{startTime} — Gece turu tamamlandı; {room} dahil tüm kapılar kilitli.',
  'daily.access.anomaly.title': 'Kapı Açıldı',
  'daily.access.anomaly.description': 'Kapının manyetik sensörü.',
  'daily.access.anomaly.body': '{anomalyTime} — {room} kapısı açıldı ve 4 dakika açık kaldı.',
  'daily.access.recovery.title': 'Görevli Raporu',
  'daily.access.recovery.description': 'Nöbetçi güvenlik görevlisinin raporu.',
  'daily.access.recovery.body':
    '{recoveryTime} — Görevli kapıyı aralık buldu; içeride kimse yoktu, raflar karıştırılmıştı.',
  'daily.access.trigger.clone.title': 'Çift Kart Okuması',
  'daily.access.trigger.clone.description': 'Kart okuyucu kaydı.',
  'daily.access.trigger.clone.body':
    '{triggerTime} — Kart {card} aynı dakikada hem lobi turnikesinde hem {room} kapısında okutuldu.',
  'daily.access.trigger.lock.title': 'Kilit Arızası',
  'daily.access.trigger.lock.description': 'Kilit motoru kaydı.',
  'daily.access.trigger.lock.body':
    '{triggerTime} — {room} kilit motoru “kapanma doğrulanamadı” hatası verdi; kapı kilitlenmedi.',
  'daily.access.trigger.remote.title': 'Uzaktan Açma Komutu',
  'daily.access.trigger.remote.description': 'Yönetim paneli kaydı.',
  'daily.access.trigger.remote.body':
    '{triggerTime} — Yönetim panelinden {room} için uzaktan kilit açma komutu gönderildi; oturum: {account}.',
  'daily.access.herring.clone.title': 'Kart Geçmişi',
  'daily.access.herring.clone.description': 'Kart yönetim sistemi sorgusu.',
  'daily.access.herring.clone.body':
    'Kart {card} gün içinde yalnızca lobi turnikesinde kullanıldı; kayıp ya da çalıntı bildirimi yok.',
  'daily.access.herring.lock.title': 'Kilit Bakımı',
  'daily.access.herring.lock.description': 'Tesis bakım kaydı.',
  'daily.access.herring.lock.body':
    '{room} kilidinin bakımı geçen ay yapıldı; {herringAt}ki otomatik testte motor sorunsuz kapandı.',
  'daily.access.herring.remote.title': 'Panel Erişimi',
  'daily.access.herring.remote.description': 'Yönetim paneli oturum özeti.',
  'daily.access.herring.remote.body':
    '{account} hesabı {herringAt} panele girip yalnızca klima ayarlarını değiştirdi; kapı komutu yok.',
  'daily.access.log.start': 'Gece turu tamamlandı; tüm kapılar kilitli.',
  'daily.access.log.noise': 'Klima sunucu odası için soğutmaya geçti.',
  'daily.access.log.anomaly': 'Kapı açıldı; açık kalma süresi 4 dk.',
  'daily.access.log.recovery': 'Görevli kapıyı kontrol edip kapattı.',
  'daily.access.log.trigger.clone': 'Kart {card}: lobi ve {room} okuyucusunda eşzamanlı okuma.',
  'daily.access.log.trigger.lock': 'Kilit motoru kapanmayı doğrulayamadı.',
  'daily.access.log.trigger.remote': 'Uzaktan kilit açma komutu; oturum {account}.',
  'daily.access.log.herring.clone': 'Kart {card} lobi turnikesinde okundu.',
  'daily.access.log.herring.lock': 'Kilit otomatik testi başarılı.',
  'daily.access.log.herring.remote': 'Panel oturumu {account}: klima ayarı değişti.',
  'daily.access.hypothesis.clone': 'Kopyalanmış kart',
  'daily.access.hypothesis.clone.explanation':
    'Birisi geçerli bir kartın kopyasıyla kapıyı açmış olabilir.',
  'daily.access.hypothesis.lock': 'Kilit arızası',
  'daily.access.hypothesis.lock.explanation':
    'Kilit mekanik olarak kapanmamış ve kapı itilerek açılmış olabilir.',
  'daily.access.hypothesis.remote': 'Uzaktan açma',
  'daily.access.hypothesis.remote.explanation':
    'Yönetim panelinden bilinçli bir kilit açma komutu gönderilmiş olabilir.',
  'daily.access.solution.clone':
    '{triggerAt} kart {card} aynı dakikada iki farklı kapıda okundu; aynı kart iki yerde birden olamaz. Kopyalanmış kart {anomalyAt} {room} kapısını açtı.',
  'daily.access.solution.lock':
    '{triggerAt} kilit motoru kapanmayı doğrulayamadı ve {room} kapısı kilitsiz kaldı. {anomalyAt} kapı itilerek açıldı; kart ya da komut gerekmedi.',
  'daily.access.solution.remote':
    '{triggerAt} {account} oturumu yönetim panelinden {room} için uzaktan açma komutu gönderdi. {anomalyAt}ki açılış bu komutun sonucuydu.',

  'daily.line.title': '{line} Duruşu',
  'daily.line.summary': 'Üretim hattı {line} gece aniden durdu.',
  'daily.line.briefing':
    'Mira: Bu gecenin dosyası kısa. {line} üretim hattı {anomalyAt} durdu ve {count} parça yarım kaldı. Hattı durduran asıl nedeni bul.',
  'daily.line.start.title': 'Vardiya Başlangıcı',
  'daily.line.start.description': 'Üretim planlama mesajı.',
  'daily.line.start.body': '{startTime} — Gece vardiyası {line} üzerinde üretime başladı.',
  'daily.line.anomaly.title': 'Hat Durdu',
  'daily.line.anomaly.description': 'Hat kontrolcüsü kaydı.',
  'daily.line.anomaly.body':
    '{anomalyTime} — {line} güvenlik kontrolcüsü hattı durdurdu; {count} parça yarım kaldı.',
  'daily.line.recovery.title': 'Bakım Raporu',
  'daily.line.recovery.description': 'Bakım ekibinin notu.',
  'daily.line.recovery.body':
    '{recoveryTime} — Bakım ekibi hattı yeniden başlattı; mekanik hasar bulunmadı.',
  'daily.line.trigger.sensor.title': 'Sensör Okuması',
  'daily.line.trigger.sensor.description': 'Sıcaklık sensörü kaydı.',
  'daily.line.trigger.sensor.body':
    '{triggerTime} — {sensor} sensörü {value} °C bildirdi; bu değer fiziksel olarak imkânsız.',
  'daily.line.trigger.operator.title': 'Acil Durdurma',
  'daily.line.trigger.operator.description': 'İstasyon butonu kaydı.',
  'daily.line.trigger.operator.body':
    '{triggerTime} — {station} istasyonundaki acil durdurma butonu basıldı; operatör kartı: {operator}.',
  'daily.line.trigger.power.title': 'Voltaj Düşüşü',
  'daily.line.trigger.power.description': 'Enerji analizörü kaydı.',
  'daily.line.trigger.power.body':
    '{triggerTime} — Ana besleme voltajı 200 ms boyunca %62’ye düştü; sürücüler korumaya geçti.',
  'daily.line.herring.sensor.title': 'Kalibrasyon Kaydı',
  'daily.line.herring.sensor.description': 'Kalite biriminin notu.',
  'daily.line.herring.sensor.body':
    '{sensor} sensörü dün kalibre edildi; {herringTime} ölçümü normal aralıkta.',
  'daily.line.herring.operator.title': 'Vardiya Kaydı',
  'daily.line.herring.operator.description': 'Vardiya listesi.',
  'daily.line.herring.operator.body':
    'Operatör {operator} {herringAt} vardiyayı devraldı; istasyon kayıtlarında olağan dışı bir işlem yok.',
  'daily.line.herring.power.title': 'Jeneratör Testi',
  'daily.line.herring.power.description': 'Tesis enerji raporu.',
  'daily.line.herring.power.body':
    'Aylık jeneratör testi {herringAt} tamamlandı; şebeke gece boyunca stabil kaldı.',
  'daily.line.log.start': 'Gece vardiyası üretime başladı.',
  'daily.line.log.noise': 'Konveyör hızı nominal.',
  'daily.line.log.anomaly': 'Güvenlik kontrolcüsü hattı durdurdu.',
  'daily.line.log.recovery': 'Hat yeniden başlatıldı.',
  'daily.line.log.trigger.sensor': '{sensor}: {value} °C okundu; aralık dışı.',
  'daily.line.log.trigger.operator': '{station} acil durdurma butonu basıldı; kart {operator}.',
  'daily.line.log.trigger.power': 'Besleme voltajı %62’ye düştü (200 ms).',
  'daily.line.log.herring.sensor': '{sensor} kalibrasyon doğrulaması başarılı.',
  'daily.line.log.herring.operator': 'Vardiya devri: operatör {operator}.',
  'daily.line.log.herring.power': 'Jeneratör testi tamamlandı.',
  'daily.line.hypothesis.sensor': 'Arızalı sensör',
  'daily.line.hypothesis.sensor.explanation':
    'Yanlış bir sensör değeri güvenlik kontrolcüsünü tetiklemiş olabilir.',
  'daily.line.hypothesis.operator': 'Operatör müdahalesi',
  'daily.line.hypothesis.operator.explanation':
    'Bir operatör acil durdurma butonuna basmış olabilir.',
  'daily.line.hypothesis.power': 'Enerji dalgalanması',
  'daily.line.hypothesis.power.explanation':
    'Kısa bir voltaj düşüşü sürücüleri durdurmuş olabilir.',
  'daily.line.solution.sensor':
    '{triggerAt} {sensor} sensörü fiziksel olarak imkânsız bir değer ({value} °C) bildirdi. Güvenlik kontrolcüsü bunu tehlike sayıp {anomalyAt} hattı durdurdu.',
  'daily.line.solution.operator':
    '{triggerAt} {station} istasyonundaki acil durdurma butonuna {operator} kartıyla basıldı. Güvenlik kontrolcüsü {anomalyAt} hattı durdurdu; ortada bir arıza yoktu.',
  'daily.line.solution.power':
    '{triggerAt} ana besleme 200 ms boyunca %62’ye düştü ve sürücüler korumaya geçti. Hat {anomalyAt} durdu; mekanik bir sorun yoktu.',
};

export const dailyTranslationsEn: Record<string, string> = {
  'daily.common.timeline.title': 'Sequence of Events',
  'daily.common.timeline.instructions': 'Order the four events from earliest to latest.',
  'daily.common.timeline.hint1': 'Compare the time at the start of each card.',
  'daily.common.timeline.hint2': 'The first event is {startTime}; the last is {recoveryTime}.',
  'daily.common.timeline.hint3':
    'Use {startTime} → {triggerTime} → {anomalyTime} → {recoveryTime}.',
  'daily.common.logs.title': 'Night Logs',
  'daily.common.logs.instructions':
    'Select the change that started the incident and the first error that followed.',
  'daily.common.logs.hint1': 'Most info rows are routine; focus on the warning and error levels.',
  'daily.common.logs.hint2': 'The {triggerTime} {triggerSource} row started the incident.',
  'daily.common.logs.hint3':
    'Select the {triggerTime} {triggerSource} and {anomalyTime} {anomalySource} rows.',

  'daily.server.title': '{system} Outage',
  'daily.server.summary': 'Payment server {system} stopped responding overnight.',
  'daily.server.briefing':
    'Mira: Tonight’s file is a short one. Payment server {system} went down at {anomalyTime}, leaving {count} transactions hanging. Find what started the outage, and do not fall for the wrong lead.',
  'daily.server.start.title': 'Maintenance Window',
  'daily.server.start.description': 'The operations team’s night note.',
  'daily.server.start.body':
    '{startTime} — The night maintenance window opened; {system} under normal load.',
  'daily.server.anomaly.title': 'Service Crash',
  'daily.server.anomaly.description': 'An application monitoring record.',
  'daily.server.anomaly.body':
    '{anomalyTime} — {system} stopped answering requests; {count} payment transactions are pending.',
  'daily.server.recovery.title': 'On-call Note',
  'daily.server.recovery.description': 'The on-call engineer’s intervention record.',
  'daily.server.recovery.body':
    '{recoveryTime} — The on-call engineer restored the service and requested a root cause analysis.',
  'daily.server.trigger.disk.title': 'Disk Full Warning',
  'daily.server.trigger.disk.description': 'A storage record.',
  'daily.server.trigger.disk.body':
    '{triggerTime} — A backup job started writing its logs to the {system} system disk; the disk reached 100%.',
  'daily.server.trigger.deploy.title': 'Release Deployment',
  'daily.server.trigger.deploy.description': 'A deployment pipeline record.',
  'daily.server.trigger.deploy.body':
    '{triggerTime} — Version {version} went live with the approval step skipped; the payment service restarted on the new version.',
  'daily.server.trigger.cert.title': 'Certificate Event',
  'daily.server.trigger.cert.description': 'A TLS connection record.',
  'daily.server.trigger.cert.body':
    '{triggerTime} — The {system} TLS certificate expired; clients began refusing the connection.',
  'daily.server.herring.disk.title': 'Disk Report',
  'daily.server.herring.disk.description': 'The weekly storage summary.',
  'daily.server.herring.disk.body':
    'Disk usage at 71%. The weekly cleanup job ran as scheduled at {herringTime} and freed 40 GB.',
  'daily.server.herring.deploy.title': 'Test Deployment',
  'daily.server.herring.deploy.description': 'A deployment pipeline notice.',
  'daily.server.herring.deploy.body':
    'Version {version} was deployed only to the test environment at {herringTime}; live systems were untouched.',
  'daily.server.herring.cert.title': 'Certificate Reminder',
  'daily.server.herring.cert.description': 'An automated email.',
  'daily.server.herring.cert.body':
    '{herringTime} — “The {system} certificate is due for renewal in 21 days.” The current certificate is valid.',
  'daily.server.log.start': 'Maintenance window open; load normal.',
  'daily.server.log.noise': 'Gateway health check passed.',
  'daily.server.log.anomaly': 'Payment service unresponsive; requests timing out.',
  'daily.server.log.recovery': 'Service restarted; transactions resuming.',
  'daily.server.log.trigger.disk': 'System disk 100% full; writes failing.',
  'daily.server.log.trigger.deploy': 'Version {version} live; approval step skipped.',
  'daily.server.log.trigger.cert': 'TLS certificate expired; handshakes rejected.',
  'daily.server.log.herring.disk': 'Weekly disk cleanup complete; usage 71%.',
  'daily.server.log.herring.deploy': 'Version {version} deployed to test.',
  'daily.server.log.herring.cert': 'Certificate renewal reminder sent (21 days).',
  'daily.server.hypothesis.disk': 'Full disk',
  'daily.server.hypothesis.disk.explanation': 'A full disk may have stopped the service’s writes.',
  'daily.server.hypothesis.deploy': 'Faulty release',
  'daily.server.hypothesis.deploy.explanation':
    'An unapproved version may have broken the service.',
  'daily.server.hypothesis.cert': 'Expired certificate',
  'daily.server.hypothesis.cert.explanation':
    'An invalid certificate may have stopped clients from connecting.',
  'daily.server.solution.disk':
    'At {triggerTime} a backup job began writing its logs to the system disk until it filled up. At {anomalyTime} the payment service, unable to write, crashed. The other records were routine; the real trace was in storage.',
  'daily.server.solution.deploy':
    'At {triggerTime} version {version} went live with the approval step skipped. The payment service restarted on it and crashed at {anomalyTime}. The other records were routine; the real trace was in the deployment pipeline.',
  'daily.server.solution.cert':
    'At {triggerTime} the {system} TLS certificate expired and clients refused the connection. By {anomalyTime} the payment service was unreachable. The other records were routine; the real trace was the certificate.',

  'daily.access.title': '{room} Door',
  'daily.access.summary': 'The door of the restricted room {room} opened overnight.',
  'daily.access.briefing':
    'Mira: Tonight’s file is a short one. The {room} door opened at {anomalyTime}, when nobody should have been inside. Prove how it was opened.',
  'daily.access.start.title': 'Security Round',
  'daily.access.start.description': 'The night patrol checklist.',
  'daily.access.start.body':
    '{startTime} — Night round complete; every door, including {room}, locked.',
  'daily.access.anomaly.title': 'Door Opened',
  'daily.access.anomaly.description': 'The door’s magnetic sensor.',
  'daily.access.anomaly.body':
    '{anomalyTime} — The {room} door opened and stayed open for 4 minutes.',
  'daily.access.recovery.title': 'Guard Report',
  'daily.access.recovery.description': 'The duty guard’s report.',
  'daily.access.recovery.body':
    '{recoveryTime} — The guard found the door ajar; nobody inside, shelves disturbed.',
  'daily.access.trigger.clone.title': 'Double Card Read',
  'daily.access.trigger.clone.description': 'A card reader record.',
  'daily.access.trigger.clone.body':
    '{triggerTime} — Card {card} was read at the lobby turnstile and the {room} door in the same minute.',
  'daily.access.trigger.lock.title': 'Lock Fault',
  'daily.access.trigger.lock.description': 'A lock motor record.',
  'daily.access.trigger.lock.body':
    '{triggerTime} — The {room} lock motor reported “closing not confirmed”; the door did not lock.',
  'daily.access.trigger.remote.title': 'Remote Unlock Command',
  'daily.access.trigger.remote.description': 'A management panel record.',
  'daily.access.trigger.remote.body':
    '{triggerTime} — A remote unlock command for {room} was sent from the management panel; session: {account}.',
  'daily.access.herring.clone.title': 'Card History',
  'daily.access.herring.clone.description': 'A card management lookup.',
  'daily.access.herring.clone.body':
    'Card {card} was used only at the lobby turnstile today; it was never reported lost or stolen.',
  'daily.access.herring.lock.title': 'Lock Maintenance',
  'daily.access.herring.lock.description': 'A facilities maintenance record.',
  'daily.access.herring.lock.body':
    'The {room} lock was serviced last month; in the automatic test at {herringTime} the motor closed cleanly.',
  'daily.access.herring.remote.title': 'Panel Access',
  'daily.access.herring.remote.description': 'A management panel session summary.',
  'daily.access.herring.remote.body':
    'The {account} account signed in at {herringTime} and only changed climate settings; no door commands.',
  'daily.access.log.start': 'Night round complete; all doors locked.',
  'daily.access.log.noise': 'Climate control switched to cooling for the server room.',
  'daily.access.log.anomaly': 'Door opened; open for 4 min.',
  'daily.access.log.recovery': 'Guard checked and closed the door.',
  'daily.access.log.trigger.clone': 'Card {card}: simultaneous reads at lobby and {room}.',
  'daily.access.log.trigger.lock': 'Lock motor could not confirm closing.',
  'daily.access.log.trigger.remote': 'Remote unlock command; session {account}.',
  'daily.access.log.herring.clone': 'Card {card} read at lobby turnstile.',
  'daily.access.log.herring.lock': 'Lock self-test passed.',
  'daily.access.log.herring.remote': 'Panel session {account}: climate setting changed.',
  'daily.access.hypothesis.clone': 'Cloned card',
  'daily.access.hypothesis.clone.explanation':
    'Someone may have opened the door with a copy of a valid card.',
  'daily.access.hypothesis.lock': 'Lock fault',
  'daily.access.hypothesis.lock.explanation':
    'The lock may have failed to close, letting the door be pushed open.',
  'daily.access.hypothesis.remote': 'Remote unlock',
  'daily.access.hypothesis.remote.explanation':
    'A deliberate unlock command may have been sent from the management panel.',
  'daily.access.solution.clone':
    'At {triggerTime} card {card} was read at two different doors in the same minute; one card cannot be in two places. The cloned card opened the {room} door at {anomalyTime}.',
  'daily.access.solution.lock':
    'At {triggerTime} the lock motor could not confirm closing, leaving the {room} door unlocked. At {anomalyTime} it was simply pushed open; no card or command was needed.',
  'daily.access.solution.remote':
    'At {triggerTime} the {account} session sent a remote unlock command for {room} from the management panel. The opening at {anomalyTime} was the result of that command.',

  'daily.line.title': '{line} Stoppage',
  'daily.line.summary': 'Production line {line} stopped suddenly overnight.',
  'daily.line.briefing':
    'Mira: Tonight’s file is a short one. Production line {line} stopped at {anomalyTime}, leaving {count} parts half-finished. Find what really stopped the line.',
  'daily.line.start.title': 'Shift Start',
  'daily.line.start.description': 'A production planning message.',
  'daily.line.start.body': '{startTime} — The night shift started production on {line}.',
  'daily.line.anomaly.title': 'Line Stopped',
  'daily.line.anomaly.description': 'A line controller record.',
  'daily.line.anomaly.body':
    '{anomalyTime} — The {line} safety controller stopped the line; {count} parts left half-finished.',
  'daily.line.recovery.title': 'Maintenance Report',
  'daily.line.recovery.description': 'The maintenance team’s note.',
  'daily.line.recovery.body':
    '{recoveryTime} — Maintenance restarted the line; no mechanical damage found.',
  'daily.line.trigger.sensor.title': 'Sensor Reading',
  'daily.line.trigger.sensor.description': 'A temperature sensor record.',
  'daily.line.trigger.sensor.body':
    '{triggerTime} — Sensor {sensor} reported {value} °C, a physically impossible value.',
  'daily.line.trigger.operator.title': 'Emergency Stop',
  'daily.line.trigger.operator.description': 'A station button record.',
  'daily.line.trigger.operator.body':
    '{triggerTime} — The emergency stop button at station {station} was pressed; operator card: {operator}.',
  'daily.line.trigger.power.title': 'Voltage Dip',
  'daily.line.trigger.power.description': 'A power analyser record.',
  'daily.line.trigger.power.body':
    '{triggerTime} — Main supply voltage dropped to 62% for 200 ms; the drives went into protection.',
  'daily.line.herring.sensor.title': 'Calibration Record',
  'daily.line.herring.sensor.description': 'A quality team note.',
  'daily.line.herring.sensor.body':
    'Sensor {sensor} was calibrated yesterday; its {herringTime} reading is within the normal range.',
  'daily.line.herring.operator.title': 'Shift Record',
  'daily.line.herring.operator.description': 'The shift roster.',
  'daily.line.herring.operator.body':
    'Operator {operator} took over the shift at {herringTime}; station logs show nothing unusual.',
  'daily.line.herring.power.title': 'Generator Test',
  'daily.line.herring.power.description': 'A facility power report.',
  'daily.line.herring.power.body':
    'The monthly generator test finished at {herringTime}; the grid stayed stable all night.',
  'daily.line.log.start': 'Night shift started production.',
  'daily.line.log.noise': 'Conveyor speed nominal.',
  'daily.line.log.anomaly': 'Safety controller stopped the line.',
  'daily.line.log.recovery': 'Line restarted.',
  'daily.line.log.trigger.sensor': '{sensor}: {value} °C read; out of range.',
  'daily.line.log.trigger.operator': '{station} emergency stop pressed; card {operator}.',
  'daily.line.log.trigger.power': 'Supply voltage dropped to 62% (200 ms).',
  'daily.line.log.herring.sensor': '{sensor} calibration check passed.',
  'daily.line.log.herring.operator': 'Shift handover: operator {operator}.',
  'daily.line.log.herring.power': 'Generator test complete.',
  'daily.line.hypothesis.sensor': 'Faulty sensor',
  'daily.line.hypothesis.sensor.explanation':
    'A false sensor value may have triggered the safety controller.',
  'daily.line.hypothesis.operator': 'Operator intervention',
  'daily.line.hypothesis.operator.explanation': 'An operator may have pressed the emergency stop.',
  'daily.line.hypothesis.power': 'Power fluctuation',
  'daily.line.hypothesis.power.explanation': 'A brief voltage dip may have stopped the drives.',
  'daily.line.solution.sensor':
    'At {triggerTime} sensor {sensor} reported a physically impossible value ({value} °C). The safety controller treated it as a hazard and stopped the line at {anomalyTime}.',
  'daily.line.solution.operator':
    'At {triggerTime} the emergency stop at station {station} was pressed with card {operator}. The safety controller stopped the line at {anomalyTime}; nothing had failed.',
  'daily.line.solution.power':
    'At {triggerTime} the main supply dropped to 62% for 200 ms and the drives went into protection. The line stopped at {anomalyTime}; there was no mechanical fault.',
};
