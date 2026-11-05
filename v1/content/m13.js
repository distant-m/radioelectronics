/* Module 13 — Control and video links */
(function () {
  APP.module({
    id: 'm13', n: 13, part: 'D', cv: 1,
    title: { uk: 'Канали керування і відео', en: 'Control and video links' },
    short: { uk: 'ELRS, CRSF, стрибки частоти, аналогове і цифрове відео', en: 'ELRS, CRSF, frequency hopping, analog and digital video' },
    intro: {
      uk: 'Між оператором і апаратом — два радіоканали: «вниз» летять команди керування, «вгору» — відео й телеметрія. У цьому модулі — як вони влаштовані, на яких частотах працюють і як виглядають на спектрі.',
      en: 'Between the operator and the craft run two radio links: commands go “down”, video and telemetry come “up”. This module covers how they work, which frequencies they use and how they look on a spectrum.'
    },
    warm: ['m12q04', 'm09q05', 'm11q03'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Два канали: керування і відео', en: 'Two links: control and video' },
        body: {
          uk: '<ul><li><b>Канал керування</b>: пульт → приймач на апараті → польотний контролер. Мало даних (положення стіків, перемикачів), але потрібна надійність і мала затримка. Зворотно — <b>телеметрія</b>: напруга, рівень сигналу (RSSI, LQ).</li><li><b>Відеоканал</b>: камера → відеопередавач (VTX) → окуляри чи монітор. Багато даних, потрібна велика смуга.</li></ul><p>Зазвичай це різні частоти й різне обладнання: керування на 868/915 МГц чи 2,4 ГГц, відео на 5,8 ГГц чи 1,2 ГГц.</p>',
          en: '<ul><li>The <b>control link</b>: radio → receiver on the craft → flight controller. Little data (stick and switch positions), but it must be reliable with low latency. Coming back is <b>telemetry</b>: voltage, signal level (RSSI, LQ).</li><li>The <b>video link</b>: camera → video transmitter (VTX) → goggles or monitor. Lots of data, a wide bandwidth.</li></ul><p>These usually use different frequencies and equipment: control on 868/915 MHz or 2.4 GHz, video on 5.8 GHz or 1.2 GHz.</p>'
        },
        fig: { photo: 'r2-110', cap: { uk: 'Оператори FPV у полі: окуляри, пульт і антени.', en: 'FPV operators in the field: goggles, radio and antennas.' } }
      },
      {
        kind: 4,
        title: { uk: 'Пульт: початок каналу керування', en: 'The radio: where the control link begins' },
        body: {
          uk: '<p>Пульт із прошивкою <b>EdgeTX</b> зчитує стіки (зараз — датчики Холла, раніше — потенціометри), формує канали і передає їх через вбудований чи зовнішній модуль ELRS. Ланцюжок усередині модуля ми вже бачили в модулі 12.</p>',
          en: '<p>A radio running <b>EdgeTX</b> reads the sticks (Hall-effect sensors now, potentiometers earlier), builds the channels and sends them through a built-in or external ELRS module. You saw the chain inside such a module in module 12.</p>'
        },
        recall: [{ m: 'm12', s: 's1', label: { uk: 'Ланцюжок модуля ELRS', en: 'The ELRS module chain' } }, { m: 'm01', s: 's8', label: { uk: 'Пульт TX12', en: 'The TX12 radio' } }],
        fig: { photo: 'own-tx12' }
      },
      {
        kind: 1,
        title: { uk: 'ExpressLRS: LoRa для керування', en: 'ExpressLRS: LoRa for control' },
        body: {
          uk: '<p><b>ExpressLRS (ELRS)</b> — відкритий проєкт системи керування на чипах LoRa (SX127x для 868/915 МГц, SX128x для 2,4 ГГц).</p><ul><li><b>Частота пакетів</b> (packet rate): 50–1000 Гц. Вища — менша затримка, але менша дальність. Нижча — більша чутливість.</li><li><b>Фраза зв’язування</b> (binding phrase) — з неї рахується унікальний ідентифікатор пари пульт–приймач.</li><li>Приймач з’єднується з польотним контролером по UART протоколом <b>CRSF</b>.</li><li><b>Телеметрія</b> повертає LQ (link quality — частка пакетів, що дійшли) і RSSI (сила сигналу в dBm).</li></ul>',
          en: '<p><b>ExpressLRS (ELRS)</b> is an open-source control-link project built on LoRa chips (SX127x for 868/915 MHz, SX128x for 2.4 GHz).</p><ul><li><b>Packet rate</b>: 50–1000 Hz. Higher means lower latency but less range. Lower means better sensitivity.</li><li>The <b>binding phrase</b> — a unique ID for the radio–receiver pair is computed from it.</li><li>The receiver connects to the flight controller over UART using the <b>CRSF</b> protocol.</li><li><b>Telemetry</b> returns LQ (link quality — the share of packets that arrive) and RSSI (signal strength in dBm).</li></ul>'
        },
        recall: [{ m: 'm09', s: 's3', label: { uk: 'UART: TX до RX', en: 'UART: TX to RX' } }]
      },
      {
        kind: 1,
        title: { uk: 'Стрибки частоти (FHSS)', en: 'Frequency hopping (FHSS)' },
        body: {
          uk: '<p>ELRS не сидить на одній частоті: передавач і приймач синхронно <b>стрибають</b> по десятках каналів за псевдовипадковою послідовністю, яку обидва знають завдяки фразі зв’язування. Це <b>FHSS</b>.</p><p>Навіщо: якщо один канал зайнятий чи заглушений, втрачаються лише пакети на ньому, а решта доходять. Щоб заглушити такий зв’язок, завада мусить накрити <b>весь</b> діапазон стрибків — а це потребує набагато більше потужності. Детальніше — в модулі 14.</p>',
          en: '<p>ELRS does not sit on one frequency: transmitter and receiver <b>hop</b> together across dozens of channels in a pseudo-random sequence that both know from the binding phrase. This is <b>FHSS</b>.</p><p>Why: if one channel is busy or jammed, only the packets on it are lost and the rest get through. To jam such a link, interference must cover the <b>whole</b> hopping range — which takes far more power. More in module 14.</p>'
        }
      },
      {
        kind: 2,
        title: { uk: 'Як виглядає LoRa на спектрі', en: 'What LoRa looks like on a spectrum' },
        body: {
          uk: '<p>Угорі — спектр (сила сигналу по частоті), внизу — «водоспад»: та сама картинка в часі, кожен рядок — мить, колір — сила. Короткі горизонтальні «риски» — окремі пакети LoRa в діапазоні ≈912–916 МГц. Кожен пакет триває частки секунди і з’являється то на одній, то на іншій частоті, тож на миттєвому спектрі вгорі їх майже не видно — а на водоспаді видно всі. Уміння читати водоспад — основа радіомоніторингу.</p>',
          en: '<p>The top is a spectrum (signal strength across frequency), the bottom a “waterfall”: the same picture over time, each row a moment, colour the strength. The short horizontal “dashes” are individual LoRa packets in the ≈912–916 MHz range. Each packet lasts a fraction of a second and appears now on one frequency, now on another, so the instantaneous spectrum at the top barely shows them — while the waterfall shows them all. Reading a waterfall is the basis of radio monitoring.</p>'
        },
        fig: { photo: 'own-lora', cap: { uk: 'Знімок з аналізатора спектра: діапазон 912–916 МГц.', en: 'A spectrum analyzer capture: the 912–916 MHz range.' } }
      },
      {
        kind: 1,
        title: { uk: 'Аналоговий відеопередавач', en: 'The analog video transmitter' },
        body: {
          uk: '<p>Аналоговий VTX бере відеосигнал камери й «накладає» його на несучу 5,8 ГГц (частотна модуляція). Важливе:</p><ul><li><b>Канали</b> — фіксовані частоти в смугах A, B, E, F, R (Raceband): приблизно 5650–5920 МГц. Один канал займає ~20 МГц.</li><li><b>Потужність</b>: 25, 200, 400, 800, 1000 мВт і більше. Вища — далі, але гріється і заважає сусідам.</li><li>Керування каналом і потужністю з польотного контролера — по UART протоколами <b>SmartAudio</b> чи <b>Tramp</b>.</li></ul><p>Аналог «сиплеться» поступово: зі слабшанням сигналу з’являються шум і смуги, але картинка не зникає одразу — пілот встигає повернути.</p>',
          en: '<p>An analog VTX takes the camera signal and “puts” it onto a 5.8 GHz carrier (frequency modulation). Key points:</p><ul><li><b>Channels</b> are fixed frequencies in bands A, B, E, F, R (Raceband): roughly 5650–5920 MHz. One channel takes ~20 MHz.</li><li><b>Power</b>: 25, 200, 400, 800, 1000 mW and more. Higher reaches further but runs hot and disturbs neighbours.</li><li>The flight controller sets channel and power over UART using <b>SmartAudio</b> or <b>Tramp</b>.</li></ul><p>Analog degrades gradually: as the signal fades, noise and lines appear, but the picture doesn’t vanish at once — the pilot has time to turn back.</p>'
        },
        fig: { photo: 'r2-144', cap: { uk: 'Відеопередавач 5,8 ГГц із кабелем U.FL → SMA.', en: 'A 5.8 GHz video transmitter with a U.FL → SMA pigtail.' } }
      },
      {
        kind: 2,
        title: { uk: 'Аналогове відео на водоспаді', en: 'Analog video on a waterfall' },
        body: { uk: '<p>Сигнал аналогового відео впізнається за характерною широкою «смугою» з рядами — це кадри й рядки зображення. Так оператори моніторингу виявляють FPV-відео в ефірі.</p>', en: '<p>Analog video is recognised by its characteristic wide “band” with rows — these are the image frames and lines. That is how monitoring operators spot FPV video on the air.</p>' },
        fig: { photo: 'r1-240' }
      },
      {
        kind: 1,
        title: { uk: 'Цифрове відео', en: 'Digital video' },
        body: {
          uk: '<p>Цифрові системи (DJI, Walksnail, HDZero та інші) стискають зображення і передають його як дані — з корекцією помилок. Плюси: висока чіткість, менше шуму. Мінуси: більша затримка в деяких системах, і на межі дальності картинка не «сиплеться», а <b>зависає й зникає</b> — без попередження.</p>',
          en: '<p>Digital systems (DJI, Walksnail, HDZero and others) compress the picture and send it as data with error correction. Pros: high clarity, less noise. Cons: more latency in some systems, and at the edge of range the picture doesn’t degrade — it <b>freezes and drops out</b> without warning.</p>'
        }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: бюджет радіолінії', en: 'Combine: the link budget' },
        body: {
          uk: '<p>Чи дійде сигнал? Рахуємо в децибелах:</p><div class="formula">Прийнято = Потужність + Підсилення антен − Втрати</div><ul><li>Потужність передавача: 20 dBm (100 мВт).</li><li>Антени: +2 dBi на апараті, +8 dBi спрямована на землі.</li><li>Втрати на відстані: що далі — то більше. Правило: <b>кожне подвоєння відстані = ще −6 dB</b> — з будь-якої відстані: 100 → 200 м, 1 → 2 км, 2 → 4 км. Це не «−6 dB на кілометр», а «−6 dB щоразу, як відстань стає вдвічі більшою». Приклад для 2,4 ГГц у вільному просторі: 1 км ≈ 100 dB втрат, 2 км ≈ 106 dB, 4 км ≈ 112 dB. Плюс перешкоди, ліс, будинки.</li></ul><p>Якщо прийнятий сигнал вищий за чутливість приймача (скажімо, −105 dBm) — зв’язок є. Різниця — це <b>запас</b>. Кожна завада «з’їдає» цей запас.</p>',
          en: '<p>Will the signal get through? Count in decibels:</p><div class="formula">Received = Power + Antenna gains − Losses</div><ul><li>Transmitter power: 20 dBm (100 mW).</li><li>Antennas: +2 dBi on the craft, +8 dBi directional on the ground.</li><li>Path loss: the further, the more. The rule: <b>every doubling of distance = another −6 dB</b> — from any starting distance: 100 → 200 m, 1 → 2 km, 2 → 4 km. It is not “−6 dB per kilometre” but “−6 dB each time the distance doubles”. Example at 2.4 GHz in free space: 1 km ≈ 100 dB of loss, 2 km ≈ 106 dB, 4 km ≈ 112 dB. Plus obstacles, forest, buildings.</li></ul><p>If the received signal is above the receiver’s sensitivity (say −105 dBm), the link holds. The difference is the <b>margin</b>. Every bit of interference “eats” that margin.</p>'
        },
        recall: [{ m: 'm11', s: 's3', label: { uk: 'Децибели', en: 'Decibels' } }, { m: 'm11', s: 's8', label: { uk: 'Спрямовані антени', en: 'Directional antennas' } }]
      },
      {
        kind: 5,
        title: { uk: 'На апараті: де канали керування і відео', en: 'On the craft: where the control and video links are' },
        body: {
          uk: '<p>На FPV-апараті шукаємо:</p><ul><li><b>приймач</b> — крихітна плата з антеною-«вусиками» або T-подібним диполем, з’єднана чотирма дротами (5V, GND, TX, RX) з польотним контролером;</li><li><b>VTX</b> — плата з радіатором або екраном, роз’ємом U.FL/MMCX і антеною «клевер» чи «грибок»;</li><li>антени розведені подалі від карбону та силових дротів.</li></ul>',
          en: '<p>On an FPV craft look for:</p><ul><li>the <b>receiver</b> — a tiny board with “whisker” antennas or a T-shaped dipole, linked to the flight controller by four wires (5V, GND, TX, RX);</li><li>the <b>VTX</b> — a board with a heatsink or shield, a U.FL/MMCX connector and a “cloverleaf” or “mushroom” antenna;</li><li>antennas placed away from carbon and power wires.</li></ul>'
        },
        fig: {
          photo: 'r1-209',
          hot: [
            { id: 'rx', p: [53, 62, 17, 30], label: { uk: 'Плата приймача керування', en: 'Control receiver board' }, info: { uk: 'крихітна, у термоусадці', en: 'tiny, in heat-shrink' } },
            { id: 'tant', p: [65, 28, 13, 33], label: { uk: 'T-подібна антена приймача', en: 'The receiver’s T-shaped antenna' } },
            { id: 'mush', p: [68, 4, 15, 18], label: { uk: 'Антена «грибок» (відео 5,8 ГГц)', en: '“Mushroom” antenna (5.8 GHz video)' } },
            { id: 'sma', p: [43, 40, 10, 9], label: { uk: 'Роз’єм SMA', en: 'SMA connector' } },
            { id: 'ufl', p: [16, 62, 6, 6], label: { uk: 'Роз’єм U.FL на кінці кабелю', en: 'U.FL connector at the end of the pigtail' }, info: { uk: 'сюди підключається VTX', en: 'this is where the VTX plugs in' } }
          ],
          cap: { uk: 'Частини каналів керування і відео: приймач з T-антеною, антена відео «грибок» і кабель SMA → U.FL. Самого VTX на цьому фото немає — він нижче.', en: 'Parts of the control and video links: a receiver with a T antenna, a “mushroom” video antenna and an SMA → U.FL pigtail. The VTX itself is not in this photo — it is below.' }
        },
        fig2: { photo: 'r2-144', cap: { uk: 'А це сам VTX (відеопередавач 5,8 ГГц): плата в корпусі, кабель U.FL → SMA до антени.', en: 'And this is the VTX itself (a 5.8 GHz video transmitter): a board in a case with a U.FL → SMA pigtail to the antenna.' } }
      }
    ],
    sources: [
      { t: { uk: 'ITU-R P.525 — розрахунок втрат у вільному просторі: L = 32,4 + 20·lg f(МГц) + 20·lg d(км)', en: 'ITU-R P.525 — calculation of free-space attenuation: L = 32.4 + 20·log f(MHz) + 20·log d(km)' }, url: 'https://www.itu.int/rec/R-REC-P.525/en' },
      { t: { uk: 'Документація ExpressLRS — частота пакетів, FHSS, телеметрія', en: 'ExpressLRS documentation — packet rate, FHSS, telemetry' }, url: 'https://www.expresslrs.org/' },
      { t: { uk: 'Документація EdgeTX', en: 'EdgeTX documentation' }, url: 'https://edgetx.org/' },
      { t: { uk: 'Документація Betaflight — SmartAudio, Tramp, OSD', en: 'Betaflight documentation — SmartAudio, Tramp, OSD' }, url: 'https://betaflight.com/docs/' },
      { t: { uk: 'Oscar Liang — статті про FPV-відео й канали керування (oscarliang.com)', en: 'Oscar Liang — articles on FPV video and control links (oscarliang.com)' }, url: 'https://oscarliang.com/' }
    ],
    quiz: [
      { q: { uk: 'Що передає канал керування в бік апарата?', en: 'What does the control link send to the craft?' }, opts: [{ uk: 'Положення стіків і перемикачів', en: 'Stick and switch positions' }, { uk: 'Відео', en: 'Video' }, { uk: 'Живлення', en: 'Power' }, { uk: 'Координати супутників', en: 'Satellite coordinates' }], a: 0,
        ex: { uk: 'Мало даних, але критична надійність.', en: 'Little data, but reliability is critical.' }, see: { m: 'm13', s: 's1' } },
      { q: { uk: 'Що таке телеметрія?', en: 'What is telemetry?' }, opts: [{ uk: 'Дані з апарата назад: напруга, якість сигналу тощо', en: 'Data from the craft back: voltage, link quality, etc.' }, { uk: 'Команди пульта', en: 'Radio commands' }, { uk: 'Відеосигнал', en: 'The video signal' }, { uk: 'Тип антени', en: 'An antenna type' }], a: 0,
        ex: { uk: 'Телеметрія — зворотний канал даних.', en: 'Telemetry is the return data link.' }, see: { m: 'm13', s: 's1' } },
      { q: { uk: 'На яких чипах побудовано ExpressLRS?', en: 'Which chips is ExpressLRS built on?' }, opts: [{ uk: 'LoRa (SX127x, SX128x)', en: 'LoRa (SX127x, SX128x)' }, { uk: 'Wi-Fi ESP8266 для радіо', en: 'Wi-Fi ESP8266 for the radio' }, { uk: 'Bluetooth', en: 'Bluetooth' }, { uk: 'Аналогові FM-передавачі', en: 'Analog FM transmitters' }], a: 0,
        ex: { uk: 'SX127x — 868/915 МГц, SX128x — 2,4 ГГц.', en: 'SX127x for 868/915 MHz, SX128x for 2.4 GHz.' }, see: { m: 'm13', s: 's3' } },
      { q: { uk: 'Вищу частоту пакетів ELRS обирають, коли потрібно…', en: 'A higher ELRS packet rate is chosen when you need…' }, opts: [{ uk: 'Менша затримка (ціна — менша дальність)', en: 'Lower latency (at the cost of range)' }, { uk: 'Більша дальність', en: 'More range' }, { uk: 'Економія батареї', en: 'Battery saving' }, { uk: 'Відео кращої якості', en: 'Better video' }], a: 0,
        ex: { uk: 'Більше пакетів — швидше, але кожен «коротший» і менш чутливий.', en: 'More packets is faster, but each is “shorter” and less sensitive.' }, see: { m: 'm13', s: 's3' } },
      { q: { uk: 'Яким протоколом приймач ELRS передає дані польотному контролеру?', en: 'Which protocol does an ELRS receiver use to talk to the flight controller?' }, opts: [{ uk: 'CRSF по UART', en: 'CRSF over UART' }, { uk: 'I²C', en: 'I²C' }, { uk: 'Аналогове відео', en: 'Analog video' }, { uk: 'DShot', en: 'DShot' }], a: 0,
        ex: { uk: 'CRSF по UART; DShot — від FC до ESC.', en: 'CRSF over UART; DShot runs from FC to ESC.' }, see: { m: 'm13', s: 's3' } },
      { q: { uk: 'Що показує LQ у телеметрії?', en: 'What does LQ show in telemetry?' }, opts: [{ uk: 'Частку пакетів, що дійшли', en: 'The share of packets that arrive' }, { uk: 'Напругу батареї', en: 'Battery voltage' }, { uk: 'Висоту', en: 'Altitude' }, { uk: 'Канал відео', en: 'The video channel' }], a: 0,
        ex: { uk: 'Link Quality: 100 % — усі пакети на місці.', en: 'Link Quality: 100% means every packet arrives.' }, see: { m: 'm13', s: 's3' } },
      { q: { uk: 'Що таке FHSS?', en: 'What is FHSS?' }, opts: [{ uk: 'Синхронні стрибки передавача і приймача по багатьох каналах', en: 'Transmitter and receiver hopping together across many channels' }, { uk: 'Тип антени', en: 'An antenna type' }, { uk: 'Відеостандарт', en: 'A video standard' }, { uk: 'Тип батареї', en: 'A battery type' }], a: 0,
        ex: { uk: 'Frequency Hopping Spread Spectrum.', en: 'Frequency Hopping Spread Spectrum.' }, see: { m: 'm13', s: 's4' } },
      { q: { uk: 'Чому стрибки частоти ускладнюють придушення?', en: 'Why does frequency hopping make jamming harder?' }, opts: [{ uk: 'Завада мусить накрити весь діапазон стрибків — потрібно значно більше потужності', en: 'The jammer must cover the whole hopping range — far more power is needed' }, { uk: 'Стрибки шифрують сигнал', en: 'Hopping encrypts the signal' }, { uk: 'Вони роблять сигнал потужнішим', en: 'They make the signal stronger' }, { uk: 'Не ускладнюють', en: 'They don’t' }], a: 0,
        ex: { uk: 'Вузька завада «влучає» лише в частину пакетів.', en: 'A narrow jammer hits only some of the packets.' }, see: { m: 'm13', s: 's4' } },
      { q: { uk: 'Що показує «водоспад» на екрані аналізатора?', en: 'What does a “waterfall” on an analyser show?' }, opts: [{ uk: 'Спектр у часі: рядок — мить, колір — сила сигналу', en: 'The spectrum over time: a row is a moment, colour is strength' }, { uk: 'Рівень води', en: 'Water level' }, { uk: 'Напругу батареї', en: 'Battery voltage' }, { uk: 'Зображення з камери', en: 'The camera image' }], a: 0,
        ex: { uk: 'Водоспад показує, коли і на якій частоті був сигнал.', en: 'A waterfall shows when and where in frequency a signal was.' }, see: { m: 'm13', s: 's5' } },
      { q: { uk: 'У якому діапазоні канали аналогового FPV-відео 5,8 ГГц?', en: 'Where are 5.8 GHz analog FPV channels?' }, opts: [{ uk: '≈5650–5920 МГц', en: '≈5650–5920 MHz' }, { uk: '2400–2480 МГц', en: '2400–2480 MHz' }, { uk: '433–435 МГц', en: '433–435 MHz' }, { uk: '1575 МГц', en: '1575 MHz' }], a: 0,
        ex: { uk: 'Смуги A, B, E, F, R займають ≈5650–5920 МГц.', en: 'Bands A, B, E, F, R span ≈5650–5920 MHz.' }, see: { m: 'm13', s: 's6' } },
      { q: { uk: 'Як польотний контролер змінює канал і потужність VTX?', en: 'How does the flight controller set the VTX channel and power?' }, opts: [{ uk: 'По UART протоколом SmartAudio або Tramp', en: 'Over UART with SmartAudio or Tramp' }, { uk: 'Через I²C', en: 'Over I²C' }, { uk: 'Ніяк, лише кнопкою', en: 'It can’t, only by button' }, { uk: 'Через DShot', en: 'Over DShot' }], a: 0,
        ex: { uk: 'SmartAudio і Tramp — протоколи керування VTX.', en: 'SmartAudio and Tramp are VTX control protocols.' }, see: { m: 'm13', s: 's6' } },
      { q: { uk: 'Як поводиться аналогове відео на межі дальності?', en: 'How does analog video behave at the edge of range?' }, opts: [{ uk: 'Поступово з’являються шум і смуги', en: 'Noise and lines appear gradually' }, { uk: 'Раптово зависає', en: 'It freezes suddenly' }, { uk: 'Стає чіткішим', en: 'It gets sharper' }, { uk: 'Змінює колір', en: 'It changes colour' }], a: 0,
        ex: { uk: 'Аналог деградує плавно — є час повернути.', en: 'Analog degrades smoothly — there is time to turn back.' }, see: { m: 'm13', s: 's6' } },
      { q: { uk: 'Головний ризик цифрового відео на межі дальності?', en: 'The main risk of digital video at the edge of range?' }, opts: [{ uk: 'Картинка зависає й зникає без попередження', en: 'The picture freezes and drops out without warning' }, { uk: 'Поступовий шум', en: 'Gradual noise' }, { uk: 'Перегрів камери', en: 'Camera overheating' }, { uk: 'Немає ризику', en: 'There is none' }], a: 0,
        ex: { uk: 'Цифра або є, або її немає.', en: 'Digital is either there or gone.' }, see: { m: 'm13', s: 's8' } },
      { type: 'calc', see: { m: 'm13', s: 's9' }, gen: function (R, c) {
          var p = R.pick([14, 20, 23, 27]), g1 = R.pick([2, 3]), g2 = R.pick([0, 5, 8, 12]), loss = R.pick([110, 120, 125, 130]), rx = p + g1 + g2 - loss;
          var dbm = { uk: 'dBm', en: 'dBm' };
          var opts = [rx, p + g1 + g2 + loss, p - loss, rx - 10].map(function (v) { return c.fmt(v, 0) + ' dBm'; });
          var seen = {}, o = []; opts.forEach(function (x) { if (!seen[x]) { seen[x] = 1; o.push(x); } });
          return { q: { uk: 'Передавач ' + p + ' dBm, антени +' + g1 + ' і +' + g2 + ' dBi, втрати на трасі ' + loss + ' dB. Який сигнал на приймачі?', en: 'Transmitter ' + p + ' dBm, antennas +' + g1 + ' and +' + g2 + ' dBi, path loss ' + loss + ' dB. What reaches the receiver?' }, opts: o, a: 0,
            ex: { uk: p + ' + ' + g1 + ' + ' + g2 + ' − ' + loss + ' = ' + rx + ' dBm.', en: p + ' + ' + g1 + ' + ' + g2 + ' − ' + loss + ' = ' + rx + ' dBm.' } };
        } },
      { q: { uk: 'Відстань до апарата подвоїлась. Як змінився сигнал (у вільному просторі)?', en: 'The distance to the craft doubled. How did the signal change (in free space)?' }, opts: [{ uk: 'Послабився на ≈6 dB', en: 'Weaker by ≈6 dB' }, { uk: 'Удвічі слабший у dB', en: 'Half as many dB' }, { uk: 'На 3 dB', en: 'By 3 dB' }, { uk: 'Не змінився', en: 'No change' }], a: 0,
        ex: { uk: 'Потужність спадає з квадратом відстані: ×2 відстані = ×¼ потужності = −6 dB — з будь-якої початкової відстані (1 → 2 км так само, як 2 → 4 км).', en: 'Power falls with distance squared: ×2 distance = ×¼ power = −6 dB — from any starting distance (1 → 2 km just like 2 → 4 km).' }, see: { m: 'm13', s: 's9' } },
      { q: { uk: 'Скільки дротів зазвичай з’єднують приймач ELRS із польотним контролером?', en: 'How many wires usually link an ELRS receiver to the flight controller?' }, opts: [{ uk: '4: 5V, GND, TX, RX', en: '4: 5V, GND, TX, RX' }, { uk: '2', en: '2' }, { uk: '8', en: '8' }, { uk: 'Жодного — по радіо', en: 'None — by radio' }], a: 0,
        ex: { uk: 'Живлення + UART.', en: 'Power + UART.' }, see: { m: 'm13', s: 's10' } }
    ]
  });
})();
