export const chapterTwoTranslationsTr: Record<string, string> = {
  'cases.cold.title': 'Soğuk Zincir',
  'cases.cold.summary': 'Aşı deposundaki soğuk odanın alarmı neden sustu?',
  'cases.cold.briefing':
    'Mira: Lumen ilaç deposundaki CR-80 soğuk odası gece ısındı; 2.400 doz aşı imha edilecek. Gösterge paneli bütün gece 4,0 °C yazıyor. Panelin yalan söylediğini kanıtla.',
  'cases.cold.evidence.compressor.title': 'Kompresör Döngüsü',
  'cases.cold.evidence.compressor.description': 'CR-80 soğutma ünitesinin bakım çizelgesi.',
  'cases.cold.evidence.compressor.body':
    '01:30 — Planlı defrost döngüsü başladı; dört dakika sonra kompresör normal çalışmaya döndü.',
  'cases.cold.evidence.alarm.title': 'Sıcaklık Alarmı',
  'cases.cold.evidence.alarm.description': 'Bağımsız yedek termometrenin kaydı.',
  'cases.cold.evidence.alarm.body': '01:52 — Yedek termometre 9,8 °C ölçtü; alarm tetiklendi.',
  'cases.cold.evidence.mute.title': 'Alarm Susturma',
  'cases.cold.evidence.mute.description': 'Alarm sunucusundaki işlem kaydı.',
  'cases.cold.evidence.mute.body':
    '01:54 — Alarm “planlı bakım” gerekçesiyle kapı panelinden susturuldu.',
  'cases.cold.evidence.door.title': 'Kapı Sensörü',
  'cases.cold.evidence.door.description': 'CR-80 kapısının manyetik sensörü.',
  'cases.cold.evidence.door.body': '02:06 — Kapı 12 dakika açık kaldıktan sonra kapandı.',
  'cases.cold.evidence.camera.title': 'Soğuk Oda Kamerası',
  'cases.cold.evidence.camera.description': 'Kapı panelinin önünden alınmış kare.',
  'cases.cold.evidence.camera.scene':
    'Kapüşonlu bir figür kapı paneline eğilmiş; yüzü görünmüyor. Kapının üzerindeki metal etiket net okunuyor.',
  'cases.cold.evidence.camera.body':
    'Etiket: “CR-80 · SERİ NO 7731-4417”. Figür kart okutmuyor; panele elle kod giriyor.',
  'cases.cold.evidence.memo.title': 'Bakım Notu',
  'cases.cold.evidence.memo.description': 'Teknik servisin kapı paneline bıraktığı not.',
  'cases.cold.evidence.memo.body':
    '“Gece bakım penceresinde geçici panel kodu: ünitenin seri numarasının SON DÖRT hanesi, TERS sırayla. Kodu kimseyle paylaşmayın.”',
  'cases.cold.evidence.graph.title': 'Sıcaklık Grafiği',
  'cases.cold.evidence.graph.description': 'Panelin gece boyunca raporladığı ölçüm.',
  'cases.cold.evidence.graph.body':
    '00:00–06:00 arasında değer tam 4,0 °C. Defrost sırasında bile tek bir ondalık oynama yok; gerçek bir sensör böyle dümdüz bir çizgi çizmez.',
  'cases.cold.evidence.audit.title': 'Panel Denetimi',
  'cases.cold.evidence.audit.description': 'Kod girişinden sonraki iç panel kaydı.',
  'cases.cold.evidence.audit.body':
    '01:54 — 7144 kodu kabul edildi. Oturum profili: BBX-SVC (servis hesabı). İlk komut: sensör beslemesini HOLD moduna al.',
  'cases.cold.timeline.title': 'Gece Olayları',
  'cases.cold.timeline.instructions':
    'Kompresör döngüsünü, alarmı, susturmayı ve kapının kapanmasını kronolojik sırala.',
  'cases.cold.timeline.hint1': 'Defrost döngüsü alarmdan yaklaşık yirmi dakika önce başladı.',
  'cases.cold.timeline.hint2': 'Susturma, alarmdan iki dakika sonra geldi.',
  'cases.cold.timeline.hint3': '01:30 → 01:52 → 01:54 → 02:06 sırasını kullan.',
  'cases.cold.code.title': 'Kapı Paneli',
  'cases.cold.code.instructions':
    'Bakım notundaki kuralı kamera karesinde görünen seri numarasına uygula ve paneli aç.',
  'cases.cold.code.prompt': 'PANEL CR-80 › GEÇİCİ BAKIM KODU › 4 HANE GEREKLİ',
  'cases.cold.code.hint1': 'Kodun nasıl üretildiği bakım notunda yazıyor.',
  'cases.cold.code.hint2': 'Seri numarası kamera karesindeki etikette: 7731-4417.',
  'cases.cold.code.hint3': 'Son dört hane 4417; ters sırayla 7144.',
  'cases.cold.logs.title': 'Panel Logları',
  'cases.cold.logs.instructions':
    'Sıcaklık göstergesini sahte biçimde sabitleyen değişikliği ve onu mümkün kılan girişi seç.',
  'cases.cold.logs.row1': 'Defrost döngüsü başladı (planlı, 4 dk).',
  'cases.cold.logs.row2': 'Defrost tamamlandı; kompresör normal.',
  'cases.cold.logs.row3': 'Yedek ölçüm 9,8 °C; eşik aşıldı.',
  'cases.cold.logs.row4': 'Kod 7144 kabul edildi; oturum profili BBX-SVC.',
  'cases.cold.logs.row5': 'Besleme modu HOLD; gösterilen değer 4,0 °C’ye sabitlendi.',
  'cases.cold.logs.row6': 'Alarm bakım gerekçesiyle susturuldu.',
  'cases.cold.logs.row7': 'Kapı kapandı; açık kalma süresi 12 dk.',
  'cases.cold.logs.hint1': 'Alarm sonuçtur; asıl müdahale onu izleyen dakikada başladı.',
  'cases.cold.logs.hint2': 'PANEL kaynağındaki kod girişi kritik.',
  'cases.cold.logs.hint3': '01:54 PANEL ve 01:54 SENSOR satırlarını seç.',
  'cases.cold.hypothesis.compressor': 'Kompresör arızası',
  'cases.cold.hypothesis.compressor.explanation':
    'Defrosttan sonra soğutma yeniden başlamamış olabilir.',
  'cases.cold.hypothesis.drift': 'Sensör kalibrasyon kayması',
  'cases.cold.hypothesis.drift.explanation': 'Bozuk bir sensör yanlış değeri raporlamış olabilir.',
  'cases.cold.hypothesis.override': 'Servis profiliyle bilinçli müdahale',
  'cases.cold.hypothesis.override.explanation':
    'Biri panel koduyla girip sensörü sabit değere kilitledi ve alarmı susturdu.',
  'cases.cold.solution':
    'Kompresör defrostu 01:34’te sorunsuz bitti. 01:52’de yedek termometre ısınmayı yakaladı; iki dakika sonra biri bakım notundaki kuralla üretilen 7144 koduyla panele girdi. BBX-SVC servis profili sensörü 4,0 °C’ye kilitledi ve alarmı susturdu. Bu profil, Kara Kutu derlemesindeki imzasız paketle aynı adı taşıyor.',

  'cases.ghost.title': 'Hayalet Sinyal',
  'cases.ghost.summary': 'Bir kavşağı yeşile kilitleyen acil durum sinyalinin kaynağını bul.',
  'cases.ghost.briefing':
    'Mira: Gece 03:12’de 9 numaralı kavşakta tüm kuzey ışıkları yeşile döndü; bir teslimat minibüsüyle yol süpürgesi kıl payı çarpışmadı. Sistem bunun bir ambulans önceliği olduğunu söylüyor. Ambulans gerçekten orada mıydı?',
  'cases.ghost.evidence.preempt.title': 'Öncelik Olayı',
  'cases.ghost.evidence.preempt.description': 'K9 denetleyicisinin olay kaydı.',
  'cases.ghost.evidence.preempt.body':
    '03:12 — Acil öncelik isteği kabul edildi; kuzey ekseni iki dakika boyunca yeşilde kilitlendi.',
  'cases.ghost.evidence.dispatch.title': 'Ambulans Koordinasyon Kaydı',
  'cases.ghost.evidence.dispatch.description': 'Bölge ambulans merkezinin görev listesi.',
  'cases.ghost.evidence.dispatch.body':
    '03:00–03:30 arasında 9 numaralı kavşağa görevlendirilmiş araç yok. AMB-12 o saatlerde Garaj-2’de şarjdaydı.',
  'cases.ghost.evidence.camera.title': 'Kavşak Kamerası',
  'cases.ghost.evidence.camera.description': 'K9 kuzey kamerasından alınmış kare.',
  'cases.ghost.evidence.camera.scene':
    'Kavşakta yalnızca beyaz bir teslimat minibüsü ve turuncu bir yol süpürgesi var. Hiçbir araçta tepe lambası yanmıyor.',
  'cases.ghost.evidence.camera.body':
    'Kamera 03:11–03:14 arasında hiçbir acil durum aracı göstermiyor. Minibüsün tavanında standart dışı küçük bir anten dikkat çekiyor.',
  'cases.ghost.evidence.radio.title': 'Telsiz Yakalaması',
  'cases.ghost.evidence.radio.description': 'Kavşak alıcısının ham çerçeve kaydı.',
  'cases.ghost.evidence.radio.body':
    '03:11:52 — Yakalanan acil öncelik çerçevesi:\nKİMLİK: 41 4D 42 2D 31 32\nVERİCİ: 54 58 2D 39 30 34',
  'cases.ghost.evidence.protocol.title': 'Protokol Sayfası',
  'cases.ghost.evidence.protocol.description': 'Acil öncelik çerçevesinin alan tanımları.',
  'cases.ghost.evidence.protocol.body':
    'Çerçeve iki alandan oluşur: KİMLİK ve VERİCİ. Her alan ASCII onaltılık çiftlerle yazılır.\n2D = “-” · 30–39 = 0–9 · 41 = A · 42 = B · 4D = M · 54 = T · 58 = X',
  'cases.ghost.evidence.firmware.title': 'Yazılım Sürüm Notu',
  'cases.ghost.evidence.firmware.description': 'Kavşak denetleyicisinin son güncellemesi.',
  'cases.ghost.evidence.firmware.body':
    'Geçen hafta K9 denetleyicisi 2.3.1 sürümüne güncellendi. Sürüm notlarında “nadir durumlarda faz geçişi gecikebilir” uyarısı var.',
  'cases.ghost.evidence.match.title': 'Verici Eşleşmesi',
  'cases.ghost.evidence.match.description': 'Filo kaydı ve sertifika sorgusu.',
  'cases.ghost.evidence.match.body':
    'Filo kaydına göre AMB-12’nin vericisi TX-118. TX-904 hiçbir ambulansa kayıtlı değil; BBX-SVC test sertifikasıyla eşleştirilmiş bir saha test cihazı olarak görünüyor.',
  'cases.ghost.logs.title': 'Kavşak Logları',
  'cases.ghost.logs.instructions':
    'Aynı araç kimliğinin aynı anda iki farklı yerde göründüğünü kanıtlayan iki satırı seç.',
  'cases.ghost.logs.row1': 'Döngü normal: kuzey 30 sn, doğu 25 sn.',
  'cases.ghost.logs.row2': 'Acil öncelik çerçevesi alındı; sinyal gücü −41 dBm.',
  'cases.ghost.logs.row3': 'Öncelik kabul edildi: araç kimliği AMB-12; kuzey ekseni yeşil.',
  'cases.ghost.logs.row4': 'AMB-12 durumu: Garaj-2, şarjda; konum değişmedi.',
  'cases.ghost.logs.row5': 'Doğu yönünde kırmızı uzatıldı; yaya fazı atlandı.',
  'cases.ghost.logs.row6': 'Öncelik sona erdi; normal döngüye dönüldü.',
  'cases.ghost.logs.row7': 'Zamanlama toleransı denetimi geçti (sürüm 2.3.1).',
  'cases.ghost.logs.hint1': 'Kavşak kayıtlarını filo kaydıyla karşılaştır.',
  'cases.ghost.logs.hint2': 'FLEET kaynağı AMB-12’nin nerede olduğunu söylüyor.',
  'cases.ghost.logs.hint3': '03:12 CTRL ve 03:12 FLEET satırlarını seç.',
  'cases.ghost.contradiction.title': 'Görünmeyen Ambulans',
  'cases.ghost.contradiction.instructions':
    'Denetleyici kaydıyla kamera görüntüsü arasındaki doğrudan çelişkiyi eşleştir.',
  'cases.ghost.contradiction.sourceA': 'Denetleyici Kaydı',
  'cases.ghost.contradiction.sourceB': 'Kavşak Kamerası',
  'cases.ghost.contradiction.a1': 'Öncelik isteğini AMB-12 ambulansı gönderdi.',
  'cases.ghost.contradiction.a2': 'Öncelik 03:14’te sona erdi.',
  'cases.ghost.contradiction.b1': 'Kavşakta hiçbir acil durum aracı görünmüyor.',
  'cases.ghost.contradiction.b2': 'Teslimat minibüsü yeşil ışıkta kavşaktan geçti.',
  'cases.ghost.contradiction.hint1': 'Bir ambulans öncelik istiyorsa kavşakta görünmesi gerekir.',
  'cases.ghost.contradiction.hint2': 'Denetleyicinin AMB-12 iddiasını seç.',
  'cases.ghost.contradiction.hint3': 'AMB-12 iddiasını “acil durum aracı yok” karesiyle eşleştir.',
  'cases.ghost.code.title': 'Çerçeve Çözümleme',
  'cases.ghost.code.instructions':
    'Protokol sayfasındaki tabloyla yakalanan çerçevenin VERİCİ alanını çöz ve seri numarasını gir.',
  'cases.ghost.code.prompt': 'VERİCİ ALANI › 54 58 2D 39 30 34 › SERİ NUMARASI?',
  'cases.ghost.code.hint1': 'Tablo, her onaltılık çifti tek bir karaktere çevirir.',
  'cases.ghost.code.hint2': '54 = T, 58 = X, 2D = tire; 39, 30 ve 34 rakamdır.',
  'cases.ghost.code.hint3': 'Verici seri numarası TX-904.',
  'cases.ghost.connections.title': 'Sinyal Zinciri',
  'cases.ghost.connections.instructions':
    'Yakalanan çerçeveyi, öncelik olayını ve onu çürüten kayıtları bağla.',
  'cases.ghost.connections.hint1':
    'Çerçeve olaya yol açtı; iki kayıt olayla çelişiyor; bir kayıt çerçeveyi açıklıyor.',
  'cases.ghost.connections.hint2':
    'Koordinasyon kaydı ve kamera, öncelik olayıyla ayrı ayrı çelişir.',
  'cases.ghost.connections.hint3': 'Verici eşleşmesi, telsiz yakalamasını destekler.',
  'cases.ghost.hypothesis.ambulance': 'Gerçek ambulans geçişi',
  'cases.ghost.hypothesis.ambulance.explanation':
    'Görevli bir ambulans kavşaktan geçerken öncelik istemiş olabilir.',
  'cases.ghost.hypothesis.firmware': 'Denetleyici yazılım hatası',
  'cases.ghost.hypothesis.firmware.explanation':
    'Yeni sürüm faz geçişlerini hatalı yönetmiş olabilir.',
  'cases.ghost.hypothesis.clone': 'Klonlanmış acil durum vericisi',
  'cases.ghost.hypothesis.clone.explanation':
    'Biri ambulans kimliğini taklit eden bir vericiyle kavşağı yeşile kilitledi.',
  'cases.ghost.solution':
    'AMB-12 o saatte Garaj-2’de şarjdaydı ve kamera kavşakta hiçbir acil durum aracı göstermiyor. Yakalanan çerçevenin verici alanı TX-904’tü; filo kaydına göre AMB-12’nin vericisi TX-118. TX-904, BBX-SVC test sertifikasına bağlı bir saha test cihazı: biri ambulans kimliğini klonlayıp kavşağı yeşile kilitledi. Yazılım güncellemesi zamanlama denetiminden sorunsuz geçmişti.',

  'cases.signature.title': 'Son İmza',
  'cases.signature.summary': 'BBX-SVC servis hesabının arkasındaki kimliği ortaya çıkar.',
  'cases.signature.briefing':
    'Mira: BBX-SVC servis hesabı son olayların ortak paydası. Hesabın tokenı, izindeki yayın mühendisi Deniz Arı’nın oturumundan üretilmiş. Ekip Deniz’i suçluyor. Tokenın gerçekte nasıl oluştuğunu kanıtla.',
  'cases.signature.evidence.mfa.title': 'Geçici MFA Girişi',
  'cases.signature.evidence.mfa.description': 'Kimlik sağlayıcının giriş kaydı.',
  'cases.signature.evidence.mfa.body':
    '00:58 — d.ari hesabına geçici MFA koduyla, tanınmayan bir cihazdan giriş yapıldı.',
  'cases.signature.evidence.token.title': 'Token Üretimi',
  'cases.signature.evidence.token.description': 'Erişim yönetimi sisteminin kaydı.',
  'cases.signature.evidence.token.body':
    '01:12 — BBX-SVC için 30 günlük erişim tokenı üretildi; oluşturan oturum: d.ari.',
  'cases.signature.evidence.commit.title': 'Commit Kaydı',
  'cases.signature.evidence.commit.description': 'Gece testi yapılandırmasındaki değişiklik.',
  'cases.signature.evidence.commit.body':
    '01:41 — Commit 9f3c2a1: nightly.yml içinde verify_signature: false. Yazar: BBX-SVC.',
  'cases.signature.evidence.build.title': 'İmzasız Derleme',
  'cases.signature.evidence.build.description': 'Kara Kutu vakasındaki gece derlemesi.',
  'cases.signature.evidence.build.body':
    '02:00 — BBX nightly build imza doğrulaması atlanarak dört saha sistemine yayıldı.',
  'cases.signature.evidence.ticket.title': 'Destek Talebi',
  'cases.signature.evidence.ticket.description': 'BT destek masasına açılan talep.',
  'cases.signature.evidence.ticket.body':
    '9 Ekim, 23:40 — “Deniz Arı” adına talep: “MFA telefonumu kaybettim, geçici kodu e-postama gönderin.” Talep şirket dışı bir adresten geldi ve kod o adrese gönderildi.',
  'cases.signature.evidence.leave.title': 'İzin Kaydı',
  'cases.signature.evidence.leave.description': 'İnsan kaynakları kaydı.',
  'cases.signature.evidence.leave.body':
    'Deniz Arı 10–20 Ekim arası yıllık izinde. Şirket laptopu izinden önce mühürlenerek BT dolabına teslim edildi.',
  'cases.signature.evidence.vpn.title': 'VPN Ağ Geçidi',
  'cases.signature.evidence.vpn.description': 'Uzak bağlantı kaydı.',
  'cases.signature.evidence.vpn.body':
    'Kayıt saati UTC. 22:10 — d.ari oturumu açıldı; kaynak yurt dışında bir bulut veri merkezi.\nNot: Diğer tüm şirket kayıtları yerel saattedir (UTC+3).',
  'cases.signature.evidence.camera.title': 'BT Odası Kamerası',
  'cases.signature.evidence.camera.description': 'Laptop dolabının bulunduğu oda.',
  'cases.signature.evidence.camera.scene':
    'Ofis karanlık. BT dolabının kapağı kapalı ve mühürlü; masalarda kimse yok.',
  'cases.signature.evidence.camera.body':
    'Kare, ofiste kimsenin olmadığını ve Deniz’in laptopunun mühürlü dolapta durduğunu gösteriyor.',
  'cases.signature.evidence.blame.title': 'Ekip Lideri İfadesi',
  'cases.signature.evidence.blame.description': 'Test ekibi liderinin görüşü.',
  'cases.signature.evidence.blame.body':
    '“Deniz haftalardır imza adımının gece testlerini yavaşlattığından şikâyet ediyordu. Bence kapatan o.”',
  'cases.signature.evidence.session.title': 'Oturum İzi',
  'cases.signature.evidence.session.description': 'VPN ve erişim sistemlerinin eşleştirmesi.',
  'cases.signature.evidence.session.body':
    'Yerel 01:10’da açılan VPN oturumu ile 01:12’deki token üretimi aynı oturum kimliğini taşıyor (S-5521). Oturum şirket cihaz sertifikası olmadan, tarayıcı üzerinden açılmış.',
  'cases.signature.timeline.title': 'Tokenın Yolu',
  'cases.signature.timeline.instructions':
    'Girişi, token üretimini, commit’i ve derlemenin yayınını kronolojik sırala.',
  'cases.signature.timeline.hint1': 'Her şey bir girişle başladı; yayın en son geldi.',
  'cases.signature.timeline.hint2': 'Token, commit’ten yarım saat önce üretildi.',
  'cases.signature.timeline.hint3': '00:58 → 01:12 → 01:41 → 02:00 sırasını kullan.',
  'cases.signature.clock.title': 'Saat Dilimi',
  'cases.signature.clock.instructions':
    'VPN kaydı farklı bir saat diliminde tutuluyor. Oturumun yerel saatini bul ve SSDD biçiminde gir.',
  'cases.signature.clock.prompt': 'VPN OTURUMU › 22:10 UTC › YEREL SAAT (UTC+3) › SSDD',
  'cases.signature.clock.hint1': 'VPN kaydı UTC; diğer kayıtlar UTC+3.',
  'cases.signature.clock.hint2': '22:10’a üç saat ekle; gece yarısını geçtiğine dikkat et.',
  'cases.signature.clock.hint3': 'Yerel saat 01:10; 0110 gir.',
  'cases.signature.logs.title': 'Kimlik Logları',
  'cases.signature.logs.instructions':
    'Ele geçirilen kimlikten imza kontrolünün kapatılmasına uzanan üç satırı seç.',
  'cases.signature.logs.row1': 'Giriş: geçici MFA kodu; cihaz tanınmadı.',
  'cases.signature.logs.row2': 'Giriş: ofis ağı, kayıtlı cihaz.',
  'cases.signature.logs.row3': 'BBX-SVC için 30 günlük erişim tokenı üretildi.',
  'cases.signature.logs.row4': 'Gece testi kuyruğa alındı.',
  'cases.signature.logs.row5': 'nightly.yml: verify_signature true → false.',
  'cases.signature.logs.row6': 'BBX nightly build yayınlandı.',
  'cases.signature.logs.row7': 'Durum: yıllık izin (aktif).',
  'cases.signature.logs.hint1': 'Zincir tanınmayan bir cihazdan yapılan girişle başlıyor.',
  'cases.signature.logs.hint2': '00:58 SSO satırı ilk halkadır; ofisteki giriş ilgisiz.',
  'cases.signature.logs.hint3': '00:58 SSO, 01:12 IAM ve 01:41 GIT satırlarını seç.',
  'cases.signature.contradiction.title': 'Suçlama',
  'cases.signature.contradiction.instructions':
    'Ekip liderinin suçlamasını çürüten kaydı eşleştir.',
  'cases.signature.contradiction.sourceA': 'Ekip Lideri İfadesi',
  'cases.signature.contradiction.sourceB': 'İK ve Kamera Kayıtları',
  'cases.signature.contradiction.a1': 'İmza adımını Deniz kendisi kapattı.',
  'cases.signature.contradiction.a2': 'Deniz imza adımından sık sık şikâyet ediyordu.',
  'cases.signature.contradiction.b1': 'Deniz o gece izindeydi; laptopu mühürlü dolaptaydı.',
  'cases.signature.contradiction.b2': 'Commit BBX-SVC servis hesabıyla yapıldı.',
  'cases.signature.contradiction.hint1':
    'Şikâyet etmek bir şey yapmak demek değildir; kimin ne yapabildiğine bak.',
  'cases.signature.contradiction.hint2': 'Liderin “kendisi kapattı” iddiasını seç.',
  'cases.signature.contradiction.hint3': 'Bu iddiayı izin ve dolap kaydıyla eşleştir.',
  'cases.signature.connections.title': 'Ele Geçirme Zinciri',
  'cases.signature.connections.instructions':
    'Destek talebinden imzasız derlemeye uzanan neden zincirini kur ve kamerayı doğru halkaya bağla.',
  'cases.signature.connections.hint1':
    'Dört “neden olur” bağlantısı bir zincir oluşturur; kamera bir halkayı destekler.',
  'cases.signature.connections.hint2':
    'Destek talebi oturum izine, oturum izi token üretimine neden olur.',
  'cases.signature.connections.hint3':
    'Token commit’e, commit derlemeye neden olur; kamera oturum izini destekler.',
  'cases.signature.hypothesis.insider': 'Mühendisin bilinçli müdahalesi',
  'cases.signature.hypothesis.insider.explanation':
    'Deniz, şikâyet ettiği imza adımını kendi hesabıyla kapattı.',
  'cases.signature.hypothesis.ci': 'CI yapılandırma hatası',
  'cases.signature.hypothesis.ci.explanation':
    'Otomatik bir şablon güncellemesi imza adımını yanlışlıkla kapatmış olabilir.',
  'cases.signature.hypothesis.hijack': 'Ele geçirilmiş kimlik',
  'cases.signature.hypothesis.hijack.explanation':
    'Biri Deniz’in kimliğini ele geçirip servis tokenı üretti ve imza kontrolünü kapattı.',
  'cases.signature.solution':
    'Saldırgan, 9 Ekim’de Deniz adına sahte bir destek talebi açıp geçici MFA kodunu kendi e-postasına aldırdı. Deniz izindeyken, yerel 01:10’da yurt dışındaki bir veri merkezinden onun hesabıyla VPN’e bağlandı ve iki dakika sonra BBX-SVC tokenını üretti. Aynı token 01:41’de imza doğrulamasını kapatan commit’i attı; 02:00’deki nightly build bu yüzden imzasız yayıldı. Ofis boştu ve laptop mühürlüydü: Deniz suçlu değildi, kimliği çalınmıştı.',
};

export const chapterTwoTranslationsEn: Record<string, string> = {
  'cases.cold.title': 'Cold Chain',
  'cases.cold.summary': 'Find out why a vaccine cold room’s alarm went silent.',
  'cases.cold.briefing':
    'Mira: The CR-80 cold room at the Lumen pharmacy depot warmed up overnight; 2,400 vaccine doses must be destroyed. The display panel reads 4.0 °C all night. Prove the panel is lying.',
  'cases.cold.evidence.compressor.title': 'Compressor Cycle',
  'cases.cold.evidence.compressor.description': 'The CR-80 cooling unit maintenance schedule.',
  'cases.cold.evidence.compressor.body':
    '01:30 — A scheduled defrost cycle started; four minutes later the compressor returned to normal operation.',
  'cases.cold.evidence.alarm.title': 'Temperature Alarm',
  'cases.cold.evidence.alarm.description': 'The independent backup thermometer record.',
  'cases.cold.evidence.alarm.body':
    '01:52 — The backup thermometer measured 9.8 °C; the alarm triggered.',
  'cases.cold.evidence.mute.title': 'Alarm Silenced',
  'cases.cold.evidence.mute.description': 'An action record on the alarm server.',
  'cases.cold.evidence.mute.body':
    '01:54 — The alarm was silenced from the door panel with the reason “scheduled maintenance”.',
  'cases.cold.evidence.door.title': 'Door Sensor',
  'cases.cold.evidence.door.description': 'The magnetic sensor on the CR-80 door.',
  'cases.cold.evidence.door.body': '02:06 — The door closed after staying open for 12 minutes.',
  'cases.cold.evidence.camera.title': 'Cold Room Camera',
  'cases.cold.evidence.camera.description': 'A frame captured in front of the door panel.',
  'cases.cold.evidence.camera.scene':
    'A hooded figure leans over the door panel; the face is hidden. The metal plate on the door is clearly legible.',
  'cases.cold.evidence.camera.body':
    'Plate: “CR-80 · SERIAL 7731-4417”. The figure does not swipe a card; they type a code on the panel by hand.',
  'cases.cold.evidence.memo.title': 'Maintenance Memo',
  'cases.cold.evidence.memo.description': 'A note the service team left at the door panel.',
  'cases.cold.evidence.memo.body':
    '“Temporary panel code during the night maintenance window: the LAST FOUR digits of the unit serial number, in REVERSE order. Do not share this code.”',
  'cases.cold.evidence.graph.title': 'Temperature Graph',
  'cases.cold.evidence.graph.description': 'The reading the panel reported overnight.',
  'cases.cold.evidence.graph.body':
    'Between 00:00 and 06:00 the value is exactly 4.0 °C. Not a single decimal moves, even during defrost; a real sensor never draws a line that flat.',
  'cases.cold.evidence.audit.title': 'Panel Audit',
  'cases.cold.evidence.audit.description': 'The internal panel record after the code entry.',
  'cases.cold.evidence.audit.body':
    '01:54 — Code 7144 accepted. Session profile: BBX-SVC (service account). First command: set the sensor feed to HOLD.',
  'cases.cold.timeline.title': 'Night Events',
  'cases.cold.timeline.instructions':
    'Order the compressor cycle, the alarm, the silencing, and the door closing chronologically.',
  'cases.cold.timeline.hint1': 'The defrost cycle started about twenty minutes before the alarm.',
  'cases.cold.timeline.hint2': 'The alarm was silenced two minutes after it triggered.',
  'cases.cold.timeline.hint3': 'Use 01:30 → 01:52 → 01:54 → 02:06.',
  'cases.cold.code.title': 'Door Panel',
  'cases.cold.code.instructions':
    'Apply the rule from the maintenance memo to the serial number visible in the camera frame and open the panel.',
  'cases.cold.code.prompt': 'PANEL CR-80 › TEMPORARY MAINTENANCE CODE › 4 DIGITS REQUIRED',
  'cases.cold.code.hint1': 'The maintenance memo explains how the code is built.',
  'cases.cold.code.hint2': 'The serial number is on the plate in the camera frame: 7731-4417.',
  'cases.cold.code.hint3': 'The last four digits are 4417; reversed, 7144.',
  'cases.cold.logs.title': 'Panel Logs',
  'cases.cold.logs.instructions':
    'Select the change that faked a steady temperature reading and the entry that made it possible.',
  'cases.cold.logs.row1': 'Defrost cycle started (scheduled, 4 min).',
  'cases.cold.logs.row2': 'Defrost complete; compressor normal.',
  'cases.cold.logs.row3': 'Backup reading 9.8 °C; threshold exceeded.',
  'cases.cold.logs.row4': 'Code 7144 accepted; session profile BBX-SVC.',
  'cases.cold.logs.row5': 'Feed mode HOLD; displayed value pinned at 4.0 °C.',
  'cases.cold.logs.row6': 'Alarm silenced for maintenance.',
  'cases.cold.logs.row7': 'Door closed; open for 12 min.',
  'cases.cold.logs.hint1':
    'The alarm is a consequence; the real intervention began a minute later.',
  'cases.cold.logs.hint2': 'The code entry from the PANEL source is critical.',
  'cases.cold.logs.hint3': 'Select the 01:54 PANEL and 01:54 SENSOR rows.',
  'cases.cold.hypothesis.compressor': 'Compressor failure',
  'cases.cold.hypothesis.compressor.explanation':
    'Cooling may not have restarted after the defrost.',
  'cases.cold.hypothesis.drift': 'Sensor calibration drift',
  'cases.cold.hypothesis.drift.explanation': 'A faulty sensor may have reported the wrong value.',
  'cases.cold.hypothesis.override': 'Deliberate service-profile override',
  'cases.cold.hypothesis.override.explanation':
    'Someone entered with the panel code, pinned the sensor to a fixed value, and silenced the alarm.',
  'cases.cold.solution':
    'The compressor defrost finished cleanly at 01:34. At 01:52 the backup thermometer caught the warming; two minutes later someone entered the panel with 7144, a code built from the maintenance memo’s rule. The BBX-SVC service profile pinned the sensor at 4.0 °C and silenced the alarm. That profile shares its name with the unsigned package from the Black Box build.',

  'cases.ghost.title': 'Ghost Signal',
  'cases.ghost.summary': 'Trace the emergency signal that locked a junction on green.',
  'cases.ghost.briefing':
    'Mira: At 03:12 every northbound light at Junction 9 turned green; a delivery van and a street sweeper nearly collided. The system says it was an ambulance pre-emption. Was an ambulance really there?',
  'cases.ghost.evidence.preempt.title': 'Pre-emption Event',
  'cases.ghost.evidence.preempt.description': 'The K9 controller event record.',
  'cases.ghost.evidence.preempt.body':
    '03:12 — Emergency pre-emption accepted; the north axis was locked on green for two minutes.',
  'cases.ghost.evidence.dispatch.title': 'Ambulance Dispatch Record',
  'cases.ghost.evidence.dispatch.description': 'The regional ambulance centre’s task list.',
  'cases.ghost.evidence.dispatch.body':
    'No vehicle was assigned to Junction 9 between 03:00 and 03:30. AMB-12 was charging in Garage 2 at the time.',
  'cases.ghost.evidence.camera.title': 'Junction Camera',
  'cases.ghost.evidence.camera.description': 'A frame from the K9 north camera.',
  'cases.ghost.evidence.camera.scene':
    'Only a white delivery van and an orange street sweeper are in the junction. No vehicle has a light bar on.',
  'cases.ghost.evidence.camera.body':
    'The camera shows no emergency vehicle between 03:11 and 03:14. A small, non-standard antenna stands out on the van’s roof.',
  'cases.ghost.evidence.radio.title': 'Radio Capture',
  'cases.ghost.evidence.radio.description': 'The raw frame log from the junction receiver.',
  'cases.ghost.evidence.radio.body':
    '03:11:52 — Captured emergency pre-emption frame:\nID: 41 4D 42 2D 31 32\nTRANSMITTER: 54 58 2D 39 30 34',
  'cases.ghost.evidence.protocol.title': 'Protocol Sheet',
  'cases.ghost.evidence.protocol.description':
    'Field definitions for the emergency pre-emption frame.',
  'cases.ghost.evidence.protocol.body':
    'A frame has two fields: ID and TRANSMITTER. Each field is written as ASCII hexadecimal pairs.\n2D = “-” · 30–39 = 0–9 · 41 = A · 42 = B · 4D = M · 54 = T · 58 = X',
  'cases.ghost.evidence.firmware.title': 'Firmware Release Note',
  'cases.ghost.evidence.firmware.description': 'The junction controller’s latest update.',
  'cases.ghost.evidence.firmware.body':
    'Last week the K9 controller was updated to version 2.3.1. The release notes warn that “phase transitions may be delayed in rare cases”.',
  'cases.ghost.evidence.match.title': 'Transmitter Match',
  'cases.ghost.evidence.match.description': 'A fleet registry and certificate lookup.',
  'cases.ghost.evidence.match.body':
    'According to the fleet registry, AMB-12’s transmitter is TX-118. TX-904 is not registered to any ambulance; it appears as a field test device paired with the BBX-SVC test certificate.',
  'cases.ghost.logs.title': 'Junction Logs',
  'cases.ghost.logs.instructions':
    'Select the two rows proving the same vehicle ID appeared in two places at once.',
  'cases.ghost.logs.row1': 'Cycle normal: north 30 s, east 25 s.',
  'cases.ghost.logs.row2': 'Emergency pre-emption frame received; signal −41 dBm.',
  'cases.ghost.logs.row3': 'Pre-emption accepted: vehicle ID AMB-12; north axis green.',
  'cases.ghost.logs.row4': 'AMB-12 status: Garage 2, charging; position unchanged.',
  'cases.ghost.logs.row5': 'East red extended; pedestrian phase skipped.',
  'cases.ghost.logs.row6': 'Pre-emption ended; normal cycle resumed.',
  'cases.ghost.logs.row7': 'Timing tolerance check passed (version 2.3.1).',
  'cases.ghost.logs.hint1': 'Compare the junction records with the fleet record.',
  'cases.ghost.logs.hint2': 'The FLEET source says where AMB-12 actually was.',
  'cases.ghost.logs.hint3': 'Select the 03:12 CTRL and 03:12 FLEET rows.',
  'cases.ghost.contradiction.title': 'The Invisible Ambulance',
  'cases.ghost.contradiction.instructions':
    'Match the direct contradiction between the controller record and the camera frame.',
  'cases.ghost.contradiction.sourceA': 'Controller Record',
  'cases.ghost.contradiction.sourceB': 'Junction Camera',
  'cases.ghost.contradiction.a1': 'Ambulance AMB-12 sent the pre-emption request.',
  'cases.ghost.contradiction.a2': 'The pre-emption ended at 03:14.',
  'cases.ghost.contradiction.b1': 'No emergency vehicle is visible in the junction.',
  'cases.ghost.contradiction.b2': 'The delivery van crossed the junction on green.',
  'cases.ghost.contradiction.hint1': 'An ambulance requesting priority should be in the frame.',
  'cases.ghost.contradiction.hint2': 'Select the controller’s AMB-12 claim.',
  'cases.ghost.contradiction.hint3':
    'Match the AMB-12 claim with the “no emergency vehicle” frame.',
  'cases.ghost.code.title': 'Frame Decoder',
  'cases.ghost.code.instructions':
    'Use the protocol sheet table to decode the TRANSMITTER field of the captured frame and enter the serial number.',
  'cases.ghost.code.prompt': 'TRANSMITTER FIELD › 54 58 2D 39 30 34 › SERIAL NUMBER?',
  'cases.ghost.code.hint1': 'The table turns each hexadecimal pair into one character.',
  'cases.ghost.code.hint2': '54 = T, 58 = X, 2D = dash; 39, 30, and 34 are digits.',
  'cases.ghost.code.hint3': 'The transmitter serial is TX-904.',
  'cases.ghost.connections.title': 'Signal Chain',
  'cases.ghost.connections.instructions':
    'Connect the captured frame, the pre-emption event, and the records that disprove it.',
  'cases.ghost.connections.hint1':
    'The frame caused the event; two records contradict it; one record explains the frame.',
  'cases.ghost.connections.hint2':
    'The dispatch record and the camera each contradict the pre-emption event.',
  'cases.ghost.connections.hint3': 'The transmitter match supports the radio capture.',
  'cases.ghost.hypothesis.ambulance': 'A real ambulance passing',
  'cases.ghost.hypothesis.ambulance.explanation':
    'An ambulance on duty may have requested priority while crossing.',
  'cases.ghost.hypothesis.firmware': 'Controller firmware fault',
  'cases.ghost.hypothesis.firmware.explanation':
    'The new version may have mishandled phase transitions.',
  'cases.ghost.hypothesis.clone': 'Cloned emergency transmitter',
  'cases.ghost.hypothesis.clone.explanation':
    'Someone locked the junction on green with a transmitter impersonating an ambulance.',
  'cases.ghost.solution':
    'AMB-12 was charging in Garage 2 at the time, and the camera shows no emergency vehicle in the junction. The captured frame’s transmitter field was TX-904, while the fleet registry lists TX-118 for AMB-12. TX-904 is a field test device tied to the BBX-SVC test certificate: someone cloned the ambulance ID and locked the junction on green. The firmware update had passed its timing check.',

  'cases.signature.title': 'The Last Signature',
  'cases.signature.summary': 'Reveal the identity behind the BBX-SVC service account.',
  'cases.signature.briefing':
    'Mira: The BBX-SVC service account links the latest incidents. Its token was issued from the session of release engineer Deniz Arı, who is on leave. The team blames Deniz. Prove how the token was really created.',
  'cases.signature.evidence.mfa.title': 'Temporary MFA Login',
  'cases.signature.evidence.mfa.description': 'An identity provider sign-in record.',
  'cases.signature.evidence.mfa.body':
    '00:58 — The d.ari account signed in with a temporary MFA code from an unrecognized device.',
  'cases.signature.evidence.token.title': 'Token Issued',
  'cases.signature.evidence.token.description': 'An access management record.',
  'cases.signature.evidence.token.body':
    '01:12 — A 30-day access token was issued for BBX-SVC; creating session: d.ari.',
  'cases.signature.evidence.commit.title': 'Commit Record',
  'cases.signature.evidence.commit.description': 'A change to the nightly test configuration.',
  'cases.signature.evidence.commit.body':
    '01:41 — Commit 9f3c2a1: verify_signature: false in nightly.yml. Author: BBX-SVC.',
  'cases.signature.evidence.build.title': 'Unsigned Build',
  'cases.signature.evidence.build.description': 'The nightly build from the Black Box case.',
  'cases.signature.evidence.build.body':
    '02:00 — The BBX nightly build skipped signature verification and spread to four field systems.',
  'cases.signature.evidence.ticket.title': 'Help Desk Ticket',
  'cases.signature.evidence.ticket.description': 'A ticket opened with the IT help desk.',
  'cases.signature.evidence.ticket.body':
    'October 9, 23:40 — Ticket on behalf of “Deniz Arı”: “I lost my MFA phone, send a temporary code to my email.” It came from an external address, and the code was sent there.',
  'cases.signature.evidence.leave.title': 'Leave Record',
  'cases.signature.evidence.leave.description': 'A human resources record.',
  'cases.signature.evidence.leave.body':
    'Deniz Arı is on annual leave from October 10 to 20. The company laptop was sealed and handed to the IT locker before the leave.',
  'cases.signature.evidence.vpn.title': 'VPN Gateway',
  'cases.signature.evidence.vpn.description': 'A remote access record.',
  'cases.signature.evidence.vpn.body':
    'Times in UTC. 22:10 — A d.ari session opened; source: a cloud data centre abroad.\nNote: All other company records use local time (UTC+3).',
  'cases.signature.evidence.camera.title': 'IT Room Camera',
  'cases.signature.evidence.camera.description': 'The room holding the laptop locker.',
  'cases.signature.evidence.camera.scene':
    'The office is dark. The IT locker door is shut and sealed; nobody is at the desks.',
  'cases.signature.evidence.camera.body':
    'The frame shows nobody in the office and Deniz’s laptop inside the sealed locker.',
  'cases.signature.evidence.blame.title': 'Team Lead Statement',
  'cases.signature.evidence.blame.description': 'The test team lead’s opinion.',
  'cases.signature.evidence.blame.body':
    '“For weeks Deniz complained that the signing step slowed down the nightly tests. I think Deniz turned it off.”',
  'cases.signature.evidence.session.title': 'Session Trace',
  'cases.signature.evidence.session.description': 'A correlation of VPN and access systems.',
  'cases.signature.evidence.session.body':
    'The VPN session opened at 01:10 local time and the 01:12 token issue carry the same session ID (S-5521). The session was opened in a browser, without a company device certificate.',
  'cases.signature.timeline.title': 'The Token’s Path',
  'cases.signature.timeline.instructions':
    'Order the login, the token issue, the commit, and the build release chronologically.',
  'cases.signature.timeline.hint1': 'It all started with a login; the release came last.',
  'cases.signature.timeline.hint2': 'The token was issued half an hour before the commit.',
  'cases.signature.timeline.hint3': 'Use 00:58 → 01:12 → 01:41 → 02:00.',
  'cases.signature.clock.title': 'Time Zone',
  'cases.signature.clock.instructions':
    'The VPN record uses a different time zone. Find the session’s local time and enter it as HHMM.',
  'cases.signature.clock.prompt': 'VPN SESSION › 22:10 UTC › LOCAL TIME (UTC+3) › HHMM',
  'cases.signature.clock.hint1': 'The VPN record is in UTC; other records are UTC+3.',
  'cases.signature.clock.hint2': 'Add three hours to 22:10, and remember midnight passes.',
  'cases.signature.clock.hint3': 'Local time is 01:10; enter 0110.',
  'cases.signature.logs.title': 'Identity Logs',
  'cases.signature.logs.instructions':
    'Select the three rows leading from the compromised identity to the disabled signature check.',
  'cases.signature.logs.row1': 'Sign-in: temporary MFA code; device not recognized.',
  'cases.signature.logs.row2': 'Sign-in: office network, registered device.',
  'cases.signature.logs.row3': '30-day access token issued for BBX-SVC.',
  'cases.signature.logs.row4': 'Nightly test queued.',
  'cases.signature.logs.row5': 'nightly.yml: verify_signature true → false.',
  'cases.signature.logs.row6': 'BBX nightly build released.',
  'cases.signature.logs.row7': 'Status: annual leave (active).',
  'cases.signature.logs.hint1': 'The chain starts with a sign-in from an unrecognized device.',
  'cases.signature.logs.hint2':
    'The 00:58 SSO row is the first link; the office sign-in is unrelated.',
  'cases.signature.logs.hint3': 'Select the 00:58 SSO, 01:12 IAM, and 01:41 GIT rows.',
  'cases.signature.contradiction.title': 'The Accusation',
  'cases.signature.contradiction.instructions':
    'Match the record that disproves the team lead’s accusation.',
  'cases.signature.contradiction.sourceA': 'Team Lead Statement',
  'cases.signature.contradiction.sourceB': 'HR and Camera Records',
  'cases.signature.contradiction.a1': 'Deniz turned off the signing step personally.',
  'cases.signature.contradiction.a2': 'Deniz often complained about the signing step.',
  'cases.signature.contradiction.b1': 'Deniz was on leave that night; the laptop was sealed away.',
  'cases.signature.contradiction.b2': 'The commit was made by the BBX-SVC service account.',
  'cases.signature.contradiction.hint1':
    'Complaining is not acting; check who could actually do what.',
  'cases.signature.contradiction.hint2': 'Select the lead’s “turned it off personally” claim.',
  'cases.signature.contradiction.hint3': 'Match that claim with the leave and locker record.',
  'cases.signature.connections.title': 'Takeover Chain',
  'cases.signature.connections.instructions':
    'Build the causal chain from the help desk ticket to the unsigned build, and tie the camera to the right link.',
  'cases.signature.connections.hint1':
    'Four “causes” links form one chain; the camera supports a single link.',
  'cases.signature.connections.hint2':
    'The help desk ticket causes the session trace, and the session trace causes the token issue.',
  'cases.signature.connections.hint3':
    'The token causes the commit, the commit causes the build; the camera supports the session trace.',
  'cases.signature.hypothesis.insider': 'A deliberate act by the engineer',
  'cases.signature.hypothesis.insider.explanation':
    'Deniz used their own account to disable the signing step they complained about.',
  'cases.signature.hypothesis.ci': 'CI configuration error',
  'cases.signature.hypothesis.ci.explanation':
    'An automated template update may have disabled the signing step by mistake.',
  'cases.signature.hypothesis.hijack': 'Hijacked identity',
  'cases.signature.hypothesis.hijack.explanation':
    'Someone took over Deniz’s identity, issued a service token, and disabled the signature check.',
  'cases.signature.solution':
    'On October 9 the attacker filed a fake help desk ticket in Deniz’s name and had the temporary MFA code sent to their own email. While Deniz was on leave, they connected to the VPN with that account from a data centre abroad at 01:10 local time and issued the BBX-SVC token two minutes later. The same token pushed the commit that disabled signature verification at 01:41, which is why the 02:00 nightly build shipped unsigned. The office was empty and the laptop was sealed: Deniz was not the culprit; Deniz’s identity was stolen.',
};
