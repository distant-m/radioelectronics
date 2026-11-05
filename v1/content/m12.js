/* Module 12 — RF on the board */
(function () {
  APP.module({
    id: 'm12', n: 12, part: 'D', cv: 1,
    title: { uk: 'Радіочастина на платі', en: 'The RF section on a board' },
    short: { uk: 'Трансивер, підсилювачі, фільтри, екран, антена на платі', en: 'Transceiver, amplifiers, filters, shield, on-board antenna' },
    intro: {
      uk: 'Будь-який радіопристрій — приймач, відеопередавач, модуль LoRa, Wi-Fi — має на платі однаковий «ланцюжок» від процесора до антени. Навчившись його бачити, ми знайдемо радіочастину на будь-якій платі за хвилину.',
      en: 'Every radio device — receiver, video transmitter, LoRa module, Wi-Fi — has the same “chain” on its board from the processor to the antenna. Once you can see it, you will find the radio section on any board within a minute.'
    },
    warm: ['m11q13', 'm11q18', 'm11q09'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Ланцюжок радіочастини', en: 'The radio chain' },
        body: {
          uk: '<p>Від процесора до антени сигнал проходить ті самі вузли:</p><ol><li><b>Трансивер</b> — мікросхема, що «вміє радіо»: перетворює дані в радіосигнал і назад. Приклади: SX1276/SX1278 (LoRa 433–915 МГц), SX1280/SX1281 (LoRa 2,4 ГГц), nRF24, CC1101.</li><li><b>Опорний генератор</b> — кварц чи TCXO (термокомпенсований): точність частоти.</li><li><b>PA</b> — підсилювач потужності для передачі.</li><li><b>LNA</b> — малошумний підсилювач для прийому слабкого сигналу.</li><li><b>Перемикач</b> прийом/передача.</li><li><b>Фільтр і узгоджувальне коло</b> — дрібні котушки й конденсатори.</li><li><b>Антена</b> або роз’єм (U.FL, SMA).</li></ol>',
          en: '<p>From the processor to the antenna, the signal passes the same blocks:</p><ol><li>The <b>transceiver</b> — a chip that “does radio”: it turns data into a radio signal and back. Examples: SX1276/SX1278 (LoRa 433–915 MHz), SX1280/SX1281 (LoRa 2.4 GHz), nRF24, CC1101.</li><li>The <b>reference oscillator</b> — a crystal or TCXO (temperature-compensated): frequency accuracy.</li><li>The <b>PA</b> — power amplifier for transmitting.</li><li>The <b>LNA</b> — low-noise amplifier for receiving weak signals.</li><li>A transmit/receive <b>switch</b>.</li><li>A <b>filter and matching network</b> — tiny coils and capacitors.</li><li>The <b>antenna</b> or a connector (U.FL, SMA).</li></ol>'
        },
        recall: [{ m: 'm09', s: 's2', label: { uk: 'Кварц', en: 'The crystal' } }],
        fig: { src: { uk: 'svg/elrs-tx-module-uk.svg', en: 'svg/elrs-tx-module-en.svg' }, cap: { uk: 'Узагальнений модуль передавача ELRS: ланцюжок команд (зелений) і телеметрії (помаранчевий).', en: 'A generic ELRS transmitter module: the command chain (green) and telemetry (orange).' } }
      },
      {
        kind: 2,
        title: { uk: 'Модуль LoRa: увесь ланцюжок на нігті', en: 'A LoRa module: the whole chain on a fingernail' },
        body: {
          uk: '<p>Модуль із трансивером SX1278 — того ж сімейства, що в приймачах ExpressLRS 900 МГц і пристроях Meshtastic. Торкаємося частин: мікросхема, кварц, узгоджувальні деталі, антена-пружинка, дроти шини SPI до процесора.</p>',
          en: '<p>A module with an SX1278 transceiver — the same family as in ExpressLRS 900 MHz receivers and Meshtastic devices. Tap its parts: chip, crystal, matching parts, spring antenna, SPI wires to the processor.</p>'
        },
        recall: [{ m: 'm09', s: 's4', label: { uk: 'Шина SPI', en: 'The SPI bus' } }],
        fig: {
          photo: 'r1-200',
          hot: [
            { id: 'chip', p: [37, 57, 30, 18], label: { uk: 'Трансивер SX1278', en: 'SX1278 transceiver' } },
            { id: 'ant', p: [0, 0, 20, 46], label: { uk: 'Антена-пружинка', en: 'Spring antenna' }, info: { uk: 'спіраль — «згорнута» чвертьхвильова антена', en: 'a coil — a “folded” quarter-wave antenna' } },
            { id: 'xtal', p: [9, 67, 15, 13], label: { uk: 'Кварц', en: 'Crystal' } },
            { id: 'match', p: [8, 44, 30, 22], label: { uk: 'Фільтр і узгодження', en: 'Filter and matching' }, info: { uk: 'дрібні котушки й конденсатори між чипом і антеною', en: 'tiny coils and capacitors between chip and antenna' } },
            { id: 'spi', p: [12, 80, 62, 20], label: { uk: 'Дроти SPI до процесора', en: 'SPI wires to the processor' } }
          ]
        }
      },
      {
        kind: 1,
        title: { uk: 'Підсилювачі: PA і LNA', en: 'Amplifiers: PA and LNA' },
        body: {
          uk: '<ul><li><b>PA</b> (power amplifier) піднімає потужність трансивера (наприклад, з 10–20 мВт до 250–1000 мВт). Гріється — тому в потужних передавачах радіатор чи вентилятор.</li><li><b>LNA</b> (low noise amplifier) підсилює дуже слабкий прийнятий сигнал, додаючи мінімум власного шуму. Від нього залежить чутливість.</li></ul><p>Часто PA, LNA і перемикач об’єднані в одну мікросхему — <b>FEM</b> (front-end module).</p><p>Важливо для модуля 14: потужний сигнал поруч (свій передавач чи завада) «засліплює» LNA — приймач глухне навіть до сигналів на інших частотах.</p>',
          en: '<ul><li>The <b>PA</b> (power amplifier) raises the transceiver’s power (for example from 10–20 mW to 250–1000 mW). It heats up — so powerful transmitters have a heatsink or fan.</li><li>The <b>LNA</b> (low-noise amplifier) boosts a very weak received signal while adding minimal noise of its own. Sensitivity depends on it.</li></ul><p>Often the PA, LNA and switch are combined in one chip — an <b>FEM</b> (front-end module).</p><p>Important for module 14: a strong signal nearby (your own transmitter or a jammer) “blinds” the LNA — the receiver goes deaf even to signals on other frequencies.</p>'
        }
      },
      {
        kind: 1,
        title: { uk: 'Фільтри: SAW і LC', en: 'Filters: SAW and LC' },
        body: {
          uk: '<p>Щоб у приймач не лізли чужі сигнали, а передавач не «смітив» на сусідні частоти, ставлять фільтри:</p><ul><li><b>LC-фільтри</b> — ланцюжки крихітних котушок і конденсаторів (той самий коливальний контур!).</li><li><b>SAW-фільтри</b> — маленькі корпуси, в яких сигнал перетворюється на звукову хвилю в кристалі й назад. Дуже точно пропускають лише свою смугу. Часто стоять у GPS-приймачах.</li></ul>',
          en: '<p>To keep foreign signals out of a receiver and stop a transmitter “littering” neighbouring frequencies, filters are used:</p><ul><li><b>LC filters</b> — chains of tiny coils and capacitors (the same LC circuit!).</li><li><b>SAW filters</b> — small packages in which the signal becomes a sound wave in a crystal and back. They pass only their band, very precisely. Common in GPS receivers.</li></ul>'
        },
        recall: [{ m: 'm11', s: 's5', label: { uk: 'Резонанс вибирає частоту', en: 'Resonance picks a frequency' } }]
      },
      {
        kind: 1,
        title: { uk: 'Узгодження і 50-омна доріжка', en: 'Matching and the 50 Ω trace' },
        body: {
          uk: '<p>Між чипом і антеною — кілька найдрібніших деталей у формі букви «П» (дві деталі на землю і одна послідовно). Це <b>узгоджувальне коло</b>: воно «підганяє» опір виходу мікросхеми під 50 Ом антени, щоб енергія не відбивалась.</p><p>Сама доріжка до антени — рівна, певної ширини, часто з рядами отворів-«парканом» по боках. Це <b>мікросмужкова лінія</b> 50 Ом — вона на платі робить те саме, що коаксіальний кабель.</p>',
          en: '<p>Between the chip and the antenna sit a few of the tiniest parts in a “π” shape (two to ground and one in series). This is the <b>matching network</b>: it fits the chip’s output impedance to the antenna’s 50 Ω so energy doesn’t reflect.</p><p>The trace to the antenna is straight, of a set width, often with rows of holes — a “fence” — along its sides. This is a 50 Ω <b>microstrip line</b>: on the board it does the job of a coaxial cable.</p>'
        },
        recall: [{ m: 'm11', s: 's7', label: { uk: 'КСХН і відбиття', en: 'SWR and reflection' } }],
        fig: { photo: 'r1-159', cap: { uk: 'Плата GPS-модуля знизу: вигнута доріжка від антени до мікросхеми — мікросмужкова лінія. По периметру — пропаяний екран.', en: 'A GPS module board from below: the curved trace from the antenna to the chip is a microstrip line. The shield is soldered around the edge.' } }
      },
      {
        kind: 1,
        title: { uk: 'Металевий екран', en: 'The metal shield' },
        body: {
          uk: '<p>Радіочастину накривають <b>металевою «коробочкою»</b>, припаяною до землі по периметру. Вона не випускає назовні завади від генератора і процесора і не пускає всередину чужі сигнали.</p><p>Буває двох видів: суцільна (як на ESP32) і з рамкою та знімною кришкою — під нею видно трансивер, кварц і узгодження. Ряди отворів (via) навколо екрана з’єднують його з шаром землі — так виходить «клітка Фарадея».</p>',
          en: '<p>The radio section is covered by a <b>metal “can”</b> soldered to ground around its edge. It keeps oscillator and processor noise in and foreign signals out.</p><p>There are two kinds: one-piece (as on the ESP32) and a frame with a snap-on lid — under it you see the transceiver, crystal and matching. Rows of holes (vias) around the shield tie it to the ground layer, making a “Faraday cage”.</p>'
        },
        fig: {
          svg: function (L) {
            var s = '<rect x="20" y="130" width="340" height="16" style="fill:var(--board)"/><rect x="20" y="146" width="340" height="6" style="fill:#c98a45"/><rect x="20" y="124" width="340" height="6" style="fill:#c98a45"/>';
            s += '<path d="M90,124 L90,62 L290,62 L290,124" style="fill:none;stroke:var(--muted);stroke-width:5"/>';
            [96, 116, 136, 244, 264, 284].forEach(function (x) { s += '<rect x="' + (x - 3) + '" y="124" width="6" height="28" style="fill:#c98a45"/>'; });
            s += '<rect x="150" y="104" width="56" height="20" rx="2" style="fill:#16191a"/><text x="178" y="118" text-anchor="middle" style="fill:#e9efe9;font:600 10px var(--mono)">RF</text>';
            s += '<rect x="214" y="112" width="18" height="12" rx="1" style="fill:#c9ced1"/>';
            for (var i = 0; i < 4; i++) { s += '<path class="st cu" d="M' + (10 + i * 8) + ',' + (40 + i * 6) + ' q20,-10 40,0 t40,0" style="opacity:.8"/>'; s += '<path class="st cu" d="M' + (86) + ',' + (50 + i * 6) + ' l-14,-8" style="opacity:.6"/>'; }
            s += D.t(190, 52, L({ uk: 'екран', en: 'shield' }), 'txm') + D.t(36, 28, L({ uk: 'завади ззовні', en: 'outside noise' }), 'txm', 'start');
            s += D.t(190, 176, L({ uk: 'отвори (via) з’єднують екран із шаром землі', en: 'vias tie the shield to the ground layer' }), 'txm');
            return D.svg(380, 190, s);
          },
          cap: { uk: 'Розріз: екран припаяно до землі, via «прошивають» плату до нижнього шару землі.', en: 'Cross-section: the shield is soldered to ground; vias “stitch” the board to the bottom ground layer.' }
        }
      },
      {
        kind: 1,
        title: { uk: 'Антена, надрукована на платі', en: 'An antenna printed on the board' },
        body: {
          uk: '<p>Мідна «змійка» на краю плати — це <b>PCB-антена</b>, просто доріжка потрібної довжини (для 2,4 ГГц — кілька сантиметрів у зигзаг). Під нею немає мідної землі: інакше вона не випромінюватиме. Дешево, але гірше за зовнішню антену. Тому плата з PCB-антеною часто має й роз’єм U.FL поруч.</p>',
          en: '<p>The copper “zigzag” at the edge of a board is a <b>PCB antenna</b>, just a trace of the right length (a few centimetres in a zigzag for 2.4 GHz). There is no copper ground under it, otherwise it would not radiate. Cheap, but worse than an external antenna, so boards with a PCB antenna often have a U.FL connector too.</p>'
        },
        fig: { photo: 'r1-206', cap: { uk: 'Модуль ESP-01 поруч із монетою: «змійка» вгорі ліворуч — антена Wi-Fi.', en: 'An ESP-01 module next to a coin: the zigzag top left is the Wi-Fi antenna.' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: де радіочастина на платі', en: 'Combine: finding the radio section on a board' },
        body: {
          uk: '<p>Ознаки радіочастини на будь-якій платі:</p><ul><li>металевий екран або квадратна мікросхема біля краю плати;</li><li>кварц чи TCXO поруч;</li><li>ланцюжок найдрібніших деталей до роз’єму U.FL/SMA або до «змійки»;</li><li>рівна доріжка з рядами via по боках;</li><li>на корпусі назви SX12xx, nRF, CC1101, ESP, AT86…</li></ul><p>Знайшли — і знаємо, звідки плата «говорить» в ефір.</p>',
          en: '<p>Signs of a radio section on any board:</p><ul><li>a metal shield or a square chip near the board edge;</li><li>a crystal or TCXO next to it;</li><li>a chain of the tiniest parts leading to a U.FL/SMA connector or a zigzag;</li><li>a straight trace with rows of vias alongside;</li><li>chip names like SX12xx, nRF, CC1101, ESP, AT86…</li></ul><p>Found it — and you know where the board “speaks” to the air.</p>'
        }
      },
      {
        kind: 5,
        title: { uk: 'На платі: NodeMCU ESP8266', en: 'On the board: a NodeMCU ESP8266' },
        body: { uk: '<p>Торкаємося частин: екран радіомодуля, антена на платі, роз’єм USB, стабілізатор живлення.</p>', en: '<p>Tap the parts: the radio module shield, the on-board antenna, the USB port, the voltage regulator.</p>' },
        fig: {
          photo: 'r1-204',
          hot: [
            { id: 'can', p: [57, 33, 18, 22], label: { uk: 'Екран радіомодуля', en: 'Radio module shield' }, info: { uk: 'під ним ESP8266, флеш і кварц', en: 'the ESP8266, flash and crystal are under it' } },
            { id: 'ant', p: [75, 33, 10, 20], label: { uk: 'Антена на платі', en: 'PCB antenna' } },
            { id: 'usb', p: [15, 36, 9, 15], label: { uk: 'Роз’єм USB', en: 'USB port' } },
            { id: 'pins', p: [20, 19, 52, 8], label: { uk: 'Виводи з підписами', en: 'Labelled pins' }, info: { uk: 'TX, RX, 3V, G, D0–D8', en: 'TX, RX, 3V, G, D0–D8' } }
          ]
        }
      }
    ],
    sources: [
      { t: { uk: 'Semtech — документація SX1276/77/78 і SX1280/81', en: 'Semtech — SX1276/77/78 and SX1280/81 datasheets' } },
      { t: { uk: 'Espressif — документація ESP8266 і ESP32, рекомендації з розведення антени', en: 'Espressif — ESP8266 and ESP32 datasheets and antenna layout guides' } },
      { t: { uk: 'Документація ExpressLRS — апаратна частина приймачів і передавачів', en: 'ExpressLRS documentation — receiver and transmitter hardware' }, url: 'https://www.expresslrs.org/' }
    ],
    quiz: [
      { q: { uk: 'Що робить мікросхема-трансивер?', en: 'What does a transceiver chip do?' }, opts: [{ uk: 'Перетворює дані в радіосигнал і назад', en: 'Turns data into a radio signal and back' }, { uk: 'Стабілізує напругу', en: 'Regulates voltage' }, { uk: 'Вимірює висоту', en: 'Measures height' }, { uk: 'Крутить двигун', en: 'Spins a motor' }], a: 0,
        ex: { uk: 'Трансивер = передавач + приймач в одному чипі.', en: 'Transceiver = transmitter + receiver in one chip.' }, see: { m: 'm12', s: 's1' } },
      { q: { uk: 'Мікросхема з написом SX1280 найімовірніше працює на…', en: 'A chip marked SX1280 most likely works at…' }, opts: [{ uk: '2,4 ГГц (LoRa)', en: '2.4 GHz (LoRa)' }, { uk: '50 Гц', en: '50 Hz' }, { uk: '5,8 ГГц відео', en: '5.8 GHz video' }, { uk: 'Це не радіочип', en: 'It isn’t a radio chip' }], a: 0,
        ex: { uk: 'SX127x — до 1 ГГц, SX128x — 2,4 ГГц.', en: 'SX127x is below 1 GHz, SX128x is 2.4 GHz.' }, see: { m: 'm12', s: 's1' } },
      { q: { uk: 'Що таке TCXO?', en: 'What is a TCXO?' }, opts: [{ uk: 'Термокомпенсований генератор — точна опорна частота', en: 'A temperature-compensated oscillator — a precise reference frequency' }, { uk: 'Тип антени', en: 'An antenna type' }, { uk: 'Підсилювач потужності', en: 'A power amplifier' }, { uk: 'Захисний діод', en: 'A protection diode' }], a: 0,
        ex: { uk: 'TCXO тримає частоту стабільною при зміні температури.', en: 'A TCXO keeps the frequency stable as temperature changes.' }, see: { m: 'm12', s: 's1' } },
      { q: { uk: 'Що робить PA в радіопередавачі?', en: 'What does the PA in a transmitter do?' }, opts: [{ uk: 'Підсилює потужність перед антеною', en: 'Boosts power before the antenna' }, { uk: 'Підсилює слабкий прийнятий сигнал', en: 'Boosts a weak received signal' }, { uk: 'Фільтрує живлення', en: 'Filters the supply' }, { uk: 'Задає частоту', en: 'Sets the frequency' }], a: 0,
        ex: { uk: 'PA — power amplifier. Слабкий прийом підсилює LNA.', en: 'PA means power amplifier. The LNA handles weak reception.' }, see: { m: 'm12', s: 's3' } },
      { q: { uk: 'Від чого найбільше залежить чутливість приймача?', en: 'What does a receiver’s sensitivity depend on most?' }, opts: [{ uk: 'Від малошумного підсилювача (LNA)', en: 'The low-noise amplifier (LNA)' }, { uk: 'Від підсилювача потужності', en: 'The power amplifier' }, { uk: 'Від кольору плати', en: 'The board colour' }, { uk: 'Від розміру батареї', en: 'The battery size' }], a: 0,
        ex: { uk: 'LNA підсилює слабкий сигнал, додаючи мінімум шуму.', en: 'The LNA boosts a weak signal while adding minimal noise.' }, see: { m: 'm12', s: 's3' } },
      { q: { uk: 'Що відбувається з приймачем, коли поруч працює дуже потужний передавач?', en: 'What happens to a receiver when a very strong transmitter works nearby?' }, opts: [{ uk: 'LNA «засліплюється» і приймач глухне', en: 'The LNA is “blinded” and the receiver goes deaf' }, { uk: 'Приймач чує краще', en: 'It hears better' }, { uk: 'Нічого', en: 'Nothing' }, { uk: 'Приймач вимикається назавжди', en: 'It switches off permanently' }], a: 0,
        ex: { uk: 'Перевантажений вхід втрачає чутливість — один із механізмів придушення.', en: 'An overloaded front end loses sensitivity — one of the mechanisms of jamming.' }, see: { m: 'm12', s: 's3' } },
      { q: { uk: 'Що таке FEM у радіочастині?', en: 'What is an FEM in a radio section?' }, opts: [{ uk: 'Мікросхема, що об’єднує PA, LNA і перемикач', en: 'A chip combining PA, LNA and switch' }, { uk: 'Тип акумулятора', en: 'A battery type' }, { uk: 'Фільтр живлення', en: 'A power filter' }, { uk: 'Тип антени', en: 'An antenna type' }], a: 0,
        ex: { uk: 'Front-end module — «передня частина» радіотракту в одному корпусі.', en: 'Front-end module — the radio path’s “front end” in one package.' }, see: { m: 'm12', s: 's3' } },
      { q: { uk: 'Що робить SAW-фільтр?', en: 'What does a SAW filter do?' }, opts: [{ uk: 'Пропускає лише свою смугу частот дуже точно', en: 'Passes only its frequency band, very precisely' }, { uk: 'Підсилює сигнал', en: 'Amplifies the signal' }, { uk: 'Стабілізує напругу', en: 'Regulates voltage' }, { uk: 'Зберігає дані', en: 'Stores data' }], a: 0,
        ex: { uk: 'Сигнал → звукова хвиля в кристалі → сигнал: чужі частоти не проходять.', en: 'Signal → sound wave in a crystal → signal: other frequencies don’t pass.' }, see: { m: 'm12', s: 's4' } },
      { q: { uk: 'Навіщо узгоджувальне коло між чипом і антеною?', en: 'Why is there a matching network between the chip and the antenna?' }, opts: [{ uk: 'Щоб опір виходу відповідав 50 Ом і енергія не відбивалась', en: 'To match the output to 50 Ω so energy doesn’t reflect' }, { uk: 'Щоб охолодити чип', en: 'To cool the chip' }, { uk: 'Щоб випрямити сигнал', en: 'To rectify the signal' }, { uk: 'Щоб живити антену', en: 'To power the antenna' }], a: 0,
        ex: { uk: 'Неузгодженість — відбиття й втрати, як поганий КСХН.', en: 'A mismatch means reflection and loss, like a poor SWR.' }, see: { m: 'm12', s: 's5' } },
      { q: { uk: 'Рівна доріжка до антени з рядами отворів по боках — це…', en: 'A straight trace to the antenna with rows of holes alongside is…' }, opts: [{ uk: 'Мікросмужкова лінія 50 Ом — «коаксіал на платі»', en: 'A 50 Ω microstrip line — a “coax on the board”' }, { uk: 'Силова доріжка', en: 'A power trace' }, { uk: 'Помилка виготовлення', en: 'A manufacturing defect' }, { uk: 'Доріжка I²C', en: 'An I²C trace' }], a: 0,
        ex: { uk: 'Ширина й відстань до землі задають хвильовий опір 50 Ом.', en: 'Width and distance to ground set the 50 Ω impedance.' }, see: { m: 'm12', s: 's5' } },
      { q: { uk: 'Навіщо металевий екран над радіочастиною?', en: 'Why is there a metal shield over the radio section?' }, opts: [{ uk: 'Не випускає завади назовні й не пускає чужі сигнали всередину', en: 'It keeps noise in and foreign signals out' }, { uk: 'Для охолодження', en: 'For cooling' }, { uk: 'Це антена', en: 'It is the antenna' }, { uk: 'Захист від води', en: 'Water protection' }], a: 0,
        ex: { uk: 'Екран, з’єднаний із землею, — клітка Фарадея.', en: 'A grounded shield is a Faraday cage.' }, see: { m: 'm12', s: 's6' } },
      { q: { uk: 'Чому під PCB-антеною немає мідної землі?', en: 'Why is there no copper ground under a PCB antenna?' }, opts: [{ uk: 'Інакше антена не випромінюватиме', en: 'Otherwise the antenna won’t radiate' }, { uk: 'Щоб зекономити мідь', en: 'To save copper' }, { uk: 'Щоб плата була легшою', en: 'To make the board lighter' }, { uk: 'Це випадковість', en: 'It’s an accident' }], a: 0,
        ex: { uk: 'Земля під антеною «закоротила» б її поле.', en: 'Ground under the antenna would short out its field.' }, see: { m: 'm12', s: 's7' } },
      { q: { uk: 'Що з переліченого — НЕ ознака радіочастини на платі?', en: 'Which of these is NOT a sign of a radio section?' }, opts: [{ uk: 'Ряд великих силових MOSFET-ів', en: 'A row of big power MOSFETs' }, { uk: 'Металевий екран біля краю', en: 'A metal shield near the edge' }, { uk: 'Роз’єм U.FL', en: 'A U.FL connector' }, { uk: 'Кварц поруч із квадратною мікросхемою', en: 'A crystal next to a square chip' }], a: 0,
        ex: { uk: 'Силові MOSFET-и — ознака регулятора обертів (модуль 8).', en: 'Power MOSFETs are the sign of a speed controller (module 8).' }, see: { m: 'm12', s: 's8' } },
      { q: { uk: 'Антена-«пружинка» на модулі LoRa — це…', en: 'The “spring” antenna on a LoRa module is…' }, opts: [{ uk: 'Згорнута чвертьхвильова антена', en: 'A folded quarter-wave antenna' }, { uk: 'Котушка живлення', en: 'A power coil' }, { uk: 'Запобіжник', en: 'A fuse' }, { uk: 'Прикраса', en: 'Decoration' }], a: 0,
        ex: { uk: 'Спіраль скорочує довгу антену до кількох сантиметрів.', en: 'The coil shortens a long antenna to a few centimetres.' }, see: { m: 'm12', s: 's2' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>трансивера</b> на модулі LoRa.', en: 'Tap the <b>transceiver</b> on the LoRa module.' },
        fig: { photo: 'r1-200', hot: [{ id: 'chip', p: [37, 57, 30, 18] }, { id: 'xtal', p: [9, 67, 15, 13] }, { id: 'ant', p: [0, 0, 20, 46] }, { id: 'spi', p: [12, 80, 62, 20] }] },
        a: 'chip', ex: { uk: 'Квадратна мікросхема з написом SX1278 — трансивер.', en: 'The square chip marked SX1278 is the transceiver.' }, see: { m: 'm12', s: 's2' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>антени, надрукованої на платі</b>.', en: 'Tap the <b>antenna printed on the board</b>.' },
        fig: { photo: 'r1-204', hot: [{ id: 'ant', p: [75, 33, 10, 20] }, { id: 'can', p: [57, 33, 18, 22] }, { id: 'usb', p: [15, 36, 9, 15] }, { id: 'pins', p: [20, 19, 52, 8] }] },
        a: 'ant', ex: { uk: 'Мідна «змійка» праворуч від екрана — антена Wi-Fi.', en: 'The copper zigzag to the right of the shield is the Wi-Fi antenna.' }, see: { m: 'm12', s: 's9' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>мікросмужкової лінії</b> від антени.', en: 'Tap the <b>microstrip line</b> from the antenna.' },
        fig: { photo: 'r1-159', hot: [{ id: 'trace', p: [50, 38, 34, 30] }, { id: 'chip', p: [26, 40, 22, 18] }, { id: 'edge', p: [2, 4, 10, 88] }, { id: 'logo', p: [72, 12, 22, 22] }] },
        a: 'trace', ex: { uk: 'Вигнута рівна доріжка праворуч від чипа веде від антени — це 50-омна лінія.', en: 'The curved even trace right of the chip leads from the antenna — a 50 Ω line.' }, see: { m: 'm12', s: 's5' } }
    ]
  });
})();
