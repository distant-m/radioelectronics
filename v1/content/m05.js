/* Module 5 — Reading schematics */
(function () {
  function symbolTable(L, list) {
    var cols = 3, cw = 126, rh = 78, s = '';
    list.forEach(function (it, i) {
      var c = i % cols, r = Math.floor(i / cols), x = 4 + c * cw, y = 6 + r * rh;
      s += '<rect class="grid" x="' + x + '" y="' + y + '" width="' + (cw - 6) + '" height="' + (rh - 6) + '" rx="6" style="fill:none"/>';
      s += it.d(x + (cw - 6) / 2, y + 30);
      s += D.t(x + (cw - 6) / 2, y + rh - 14, L(it.n), 'txm');
    });
    return D.svg(cols * cw + 4, Math.ceil(list.length / cols) * rh + 8, s);
  }
  var SYMS = [
    { n: { uk: 'Резистор', en: 'Resistor' }, d: function (x, y) { return D.two('res', x - 40, y, x + 40, y); } },
    { n: { uk: 'Резистор (США)', en: 'Resistor (US)' }, d: function (x, y) { return D.two('resUS', x - 40, y, x + 40, y); } },
    { n: { uk: 'Конденсатор', en: 'Capacitor' }, d: function (x, y) { return D.two('cap', x - 40, y, x + 40, y); } },
    { n: { uk: 'Електролітичний', en: 'Electrolytic' }, d: function (x, y) { return D.two('ecap', x - 40, y, x + 40, y); } },
    { n: { uk: 'Котушка', en: 'Inductor' }, d: function (x, y) { return D.two('ind', x - 40, y, x + 40, y); } },
    { n: { uk: 'Діод', en: 'Diode' }, d: function (x, y) { return D.two('diode', x - 40, y, x + 40, y); } },
    { n: { uk: 'Світлодіод', en: 'LED' }, d: function (x, y) { return D.two('led', x - 40, y + 4, x + 40, y + 4); } },
    { n: { uk: 'Стабілітрон', en: 'Zener' }, d: function (x, y) { return D.two('zener', x - 40, y, x + 40, y); } },
    { n: { uk: 'Діод Шотткі', en: 'Schottky' }, d: function (x, y) { return D.two('schottky', x - 40, y, x + 40, y); } },
    { n: { uk: 'NPN-транзистор', en: 'NPN transistor' }, d: function (x, y) { return '<g transform="translate(' + (x + 2) + ',' + (y - 2) + ') scale(.78) translate(' + (-x) + ',' + (-y) + ')">' + D.npn(x, y, {}) + '</g>'; } },
    { n: { uk: 'MOSFET (N)', en: 'MOSFET (N)' }, d: function (x, y) { return '<g transform="translate(' + (x + 4) + ',' + (y - 2) + ') scale(.78) translate(' + (-x) + ',' + (-y) + ')">' + D.nmos(x, y, {}) + '</g>'; } },
    { n: { uk: 'Кварц', en: 'Crystal' }, d: function (x, y) { return D.two('xtal', x - 40, y, x + 40, y); } },
    { n: { uk: 'Батарея', en: 'Battery' }, d: function (x, y) { return D.two('bat', x - 40, y, x + 40, y); } },
    { n: { uk: 'Вимикач', en: 'Switch' }, d: function (x, y) { return D.two('swOpen', x - 40, y + 4, x + 40, y + 4); } },
    { n: { uk: 'Запобіжник', en: 'Fuse' }, d: function (x, y) { return D.two('fuse', x - 40, y, x + 40, y); } },
    { n: { uk: 'Земля (GND)', en: 'Ground (GND)' }, d: function (x, y) { return D.gnd(x, y - 12); } },
    { n: { uk: 'Антена', en: 'Antenna' }, d: function (x, y) { return D.ant(x, y + 22); } },
    { n: { uk: 'Двигун', en: 'Motor' }, d: function (x, y) { return D.two('motor', x - 40, y, x + 40, y); } }
  ];

  APP.module({
    id: 'm05', n: 5, part: 'A', cv: 1,
    title: { uk: 'Як читати схему', en: 'Reading a schematic' },
    short: { uk: 'Символи, зв’язки, позначення', en: 'Symbols, connections, designators' },
    intro: {
      uk: 'Схема — це «мова» електроніки. Вона показує не де деталі лежать, а як вони з’єднані. Навчившись читати схему, ми зможемо розуміти будь-яку плату, для якої є документація.',
      en: 'A schematic is the “language” of electronics. It shows not where parts sit, but how they are connected. Once you can read schematics, you can understand any board that has documentation.'
    },
    warm: ['m04q08', 'm03q02', 'm02q19'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Схема ≠ плата', en: 'A schematic is not a board' },
        body: {
          uk: '<p>На схемі деталі розставлено так, щоб було зручно <b>читати</b>: живлення вгорі, земля внизу, сигнал іде зліва направо. На платі ті самі деталі стоять так, щоб було зручно <b>виготовляти</b>. Тому схема і плата можуть зовсім не бути схожими — але з’єднання в них однакові.</p>',
          en: '<p>A schematic places parts so they are easy to <b>read</b>: power on top, ground at the bottom, signal flowing left to right. A board places the same parts so they are easy to <b>manufacture</b>. So a schematic and a board may look nothing alike — but their connections are identical.</p>'
        },
        fig: {
          svg: function (L) {
            var s = D.t(95, 16, L({ uk: 'схема', en: 'schematic' }), 'lbl') + '<g transform="translate(0,26)">';
            s += D.w([[30, 120], [30, 98]]) + D.two('bat', 30, 98, 30, 66) + D.w([[30, 66], [30, 40], [70, 40]]) + D.two('res', 70, 40, 130, 40, { label: 'R1' }) + D.w([[130, 40], [160, 40], [160, 66]]) + D.two('led', 160, 66, 160, 100) + D.w([[160, 100], [160, 120], [30, 120]]) + D.t(134, 88, 'D1', 'lbl');
            s += '</g>' + D.t(290, 16, L({ uk: 'те саме на платі', en: 'the same on a board' }), 'lbl') + '<g transform="translate(0,26)">';
            s += '<rect x="210" y="30" width="160" height="110" rx="8" style="fill:var(--board)"/>';
            s += '<path d="M250,60 L250,105 L330,105 M300,60 L330,60 L330,80" style="fill:none;stroke:#c98a45;stroke-width:5;stroke-linecap:round"/>';
            s += '<rect x="234" y="44" width="32" height="18" rx="2" style="fill:#2b2f2d"/><text x="250" y="57" text-anchor="middle" style="fill:#e9efe9;font:600 10px var(--mono)">BAT</text>';
            s += '<rect x="282" y="52" width="22" height="13" rx="2" style="fill:#1b1d1c"/><text x="293" y="49" text-anchor="middle" style="fill:#e9efe9;font:600 10px var(--mono)">R1</text>';
            s += '<rect x="322" y="78" width="16" height="12" rx="2" style="fill:#e0e6e2"/><text x="352" y="88" style="fill:#e9efe9;font:600 10px var(--mono)">D1</text>';
            return D.svg(380, 176, s + '</g>');
          },
          cap: { uk: 'Ліворуч — схема, праворуч — розташування на платі. З’єднання ті самі.', en: 'Left: the schematic. Right: the board layout. Same connections.' }
        }
      },
      {
        kind: 1,
        title: { uk: 'Словник символів', en: 'A dictionary of symbols' },
        body: {
          uk: '<p>Ось основні символи. Більшість ми вже бачили в попередніх модулях. У документації трапляються обидва стилі — європейський (ДСТУ, IEC) і американський.</p>',
          en: '<p>Here are the main symbols. You have met most of them in earlier modules. Documentation uses both styles — European (IEC) and American.</p>'
        },
        fig: { svg: function (L) { return symbolTable(L, SYMS); } }
      },
      {
        kind: 1,
        title: { uk: 'Дроти, точки і перетини', en: 'Wires, dots and crossings' },
        body: {
          uk: '<ul><li>Лінія — це провідник. Усе, що з’єднано лініями, має однакову напругу. Таку групу називають <b>колом</b> або <b>net’ом</b>.</li><li><b>Точка</b> на перетині — з’єднання.</li><li>Лінії перетинаються <b>без точки</b> — вони НЕ з’єднані, просто проходять одна над одною.</li><li>Однакові <b>мітки</b> (наприклад, «SDA») на різних кінцях схеми означають, що ці місця з’єднані, навіть якщо лінії між ними немає.</li></ul>',
          en: '<ul><li>A line is a conductor. Everything joined by lines is at the same voltage. Such a group is called a <b>net</b>.</li><li>A <b>dot</b> at a junction is a connection.</li><li>Lines crossing <b>without a dot</b> are NOT connected; they just pass over each other.</li><li>Identical <b>labels</b> (for example “SDA”) at different places on a schematic mean those points are connected, even with no line between them.</li></ul>'
        },
        fig: {
          svg: function (L) {
            var s = D.line(30, 60, 150, 60) + D.line(90, 20, 90, 100) + D.dot(90, 60) + D.t(90, 125, L({ uk: 'з’єднано', en: 'connected' }), 'txm');
            s += D.line(200, 60, 320, 60) + D.line(260, 20, 260, 100) + D.t(260, 125, L({ uk: 'НЕ з’єднано', en: 'NOT connected' }), 'txm');
            return D.svg(350, 135, s);
          }
        }
      },
      {
        kind: 1,
        title: { uk: 'Живлення і земля', en: 'Power and ground' },
        body: {
          uk: '<p>Щоб не тягнути лінії від батареї до кожної деталі, використовують символи:</p><ul><li><b>Земля (GND)</b> — «мінус», загальна точка відліку. Усі символи землі на схемі з’єднані між собою.</li><li><b>Живлення</b> — риска чи стрілка вгору з підписом: VCC, VDD, +5V, 3V3, VBAT.</li></ul><p>«3V3» означає 3,3 В — так пишуть, бо кому на платі легко не помітити.</p>',
          en: '<p>To avoid drawing a line from the battery to every part, schematics use symbols:</p><ul><li><b>Ground (GND)</b> — “minus”, the common reference point. All ground symbols on a schematic are connected.</li><li><b>Supply</b> — a bar or up-arrow with a label: VCC, VDD, +5V, 3V3, VBAT.</li></ul><p>“3V3” means 3.3 V — written that way because a decimal point is easy to miss on a board.</p>'
        }
      },
      {
        kind: 1,
        title: { uk: 'Позиційні позначення', en: 'Reference designators' },
        body: {
          uk: '<p>Кожна деталь має літеру й номер. Ті самі позначення надруковано біля деталей на платі.</p><ul><li><b>R</b> — резистор, <b>C</b> — конденсатор, <b>L</b> — котушка</li><li><b>D</b> — діод, <b>LED</b> — світлодіод</li><li><b>Q</b> (або <b>VT</b>) — транзистор</li><li><b>U</b> (або <b>IC</b>) — мікросхема</li><li><b>Y</b> або <b>X</b> — кварц</li><li><b>J</b>, <b>P</b>, <b>CN</b> — роз’єм</li><li><b>F</b> — запобіжник, <b>SW</b> — кнопка, <b>FB</b> — феритова бусина, <b>TP</b> — контрольна точка</li></ul>',
          en: '<p>Every part has a letter and a number. The same designators are printed next to parts on the board.</p><ul><li><b>R</b> — resistor, <b>C</b> — capacitor, <b>L</b> — inductor</li><li><b>D</b> — diode, <b>LED</b> — LED</li><li><b>Q</b> — transistor</li><li><b>U</b> (or <b>IC</b>) — integrated circuit</li><li><b>Y</b> or <b>X</b> — crystal</li><li><b>J</b>, <b>P</b>, <b>CN</b> — connector</li><li><b>F</b> — fuse, <b>SW</b> — switch, <b>FB</b> — ferrite bead, <b>TP</b> — test point</li></ul>'
        },
        recall: [{ m: 'm02', s: 's13', label: { uk: 'C9, R30 на фото плати', en: 'C9, R30 on a board photo' } }]
      },
      {
        kind: 3,
        title: { uk: 'Читаємо справжню схему: стабілізатор 5 В', en: 'Reading a real schematic: a 5 V regulator' },
        body: {
          uk: '<p>Розберемо схему зліва направо:</p><ol><li><b>D1 (1N4007)</b> — захист від переплутаної полярності.</li><li><b>C1 220 мкФ</b> — запас енергії на вході (електролітичний).</li><li><b>C2 100 нФ</b> — блокувальний, гасить швидкі завади.</li><li><b>VR1 7805</b> — стабілізатор: з будь-яких 7–25 В робить рівно 5 В.</li><li><b>C3 100 нФ</b> і <b>C4 220 мкФ</b> — те саме на виході.</li></ol><p>Майже кожна деталь тут уже знайома. Саме так читають будь-яку схему: шукаємо знайомі «цеглинки» і розуміємо, що робить кожна.</p>',
          en: '<p>Let’s read it left to right:</p><ol><li><b>D1 (1N4007)</b> — reverse-polarity protection.</li><li><b>C1 220 µF</b> — an energy reserve at the input (electrolytic).</li><li><b>C2 100 nF</b> — decoupling, kills fast noise.</li><li><b>VR1 7805</b> — the regulator: turns anything from 7–25 V into exactly 5 V.</li><li><b>C3 100 nF</b> and <b>C4 220 µF</b> — the same at the output.</li></ol><p>You already know nearly every part here. That is how any schematic is read: find the familiar “bricks” and work out what each one does.</p>'
        },
        recall: [{ m: 'm03', s: 's9', label: { uk: 'Діод-захист', en: 'Protection diode' } }, { m: 'm02', s: 's11', label: { uk: 'Блокувальний конденсатор', en: 'Decoupling capacitor' } }],
        fig: { photo: 'r1-098' }
      },
      {
        kind: 4,
        title: { uk: 'Блок-схема: «карта» замість креслення', en: 'Block diagrams: a map instead of a drawing' },
        body: {
          uk: '<p>Для складних пристроїв спершу малюють <b>блок-схему</b>: прямокутники-вузли і стрілки між ними. Ось спрощена блок-схема польотного контролера. Кожен блок ми розберемо в модулях 7–10.</p>',
          en: '<p>For complex devices, people first draw a <b>block diagram</b>: boxes for the units and arrows between them. Here is a simplified block diagram of a flight controller. You will take each block apart in modules 7–10.</p>'
        },
        fig: {
          svg: function (L) {
            function box(x, y, w, h, a, b) { return D.chip(x, y, w, h, a, b); }
            var s = box(140, 70, 100, 60, L({ uk: 'Процесор', en: 'Processor' }), 'STM32');
            s += box(10, 10, 100, 44, L({ uk: 'Гіроскоп', en: 'Gyro' }), 'IMU') + D.arrow(110, 40, 140, 82, 'acc');
            s += box(10, 146, 100, 44, L({ uk: 'Живлення', en: 'Power' }), 'BEC 5V / 3V3') + D.arrow(110, 160, 140, 120, 'cu');
            s += box(270, 10, 100, 44, L({ uk: 'Приймач', en: 'Receiver' }), 'ELRS') + D.arrow(270, 40, 240, 82, 'acc');
            s += box(270, 146, 100, 44, 'ESC', L({ uk: 'двигуни', en: 'motors' })) + D.arrow(240, 120, 270, 160, 'acc');
            s += box(140, 156, 100, 40, 'OSD / VTX', '') + D.arrow(190, 130, 190, 156, 'acc');
            return D.svg(380, 205, s);
          },
          cap: { uk: 'Зелені стрілки — сигнали, мідна — живлення.', en: 'Green arrows are signals, the copper one is power.' }
        }
      },
      {
        kind: 5,
        title: { uk: 'Схема з’єднань між платами', en: 'A wiring diagram between boards' },
        body: {
          uk: '<p>Схема з’єднань показує, який вивід якої плати до чого підключено. Тут плата з мікроконтролером STM32 («Blue Pill»):</p><ul><li>з модулем датчика MPU-6050 (праворуч) — двома проводами <b>SCL</b> і <b>SDA</b> (шина I²C) плюс живлення;</li><li>з іншою платою (внизу) — чотирма проводами <b>MOSI, MISO, SCK, NSS</b> (шина SPI).</li></ul><p>Про ці шини — у модулі 9. Поки що звертаємо увагу: підписи на проводах збігаються з підписами виводів на платах.</p>',
          en: '<p>A wiring diagram shows which pin of which board connects to what. Here an STM32 microcontroller board (“Blue Pill”) connects:</p><ul><li>to an MPU-6050 sensor module (right) with two wires, <b>SCL</b> and <b>SDA</b> (the I²C bus), plus power;</li><li>to another board (below) with four wires, <b>MOSI, MISO, SCK, NSS</b> (the SPI bus).</li></ul><p>These buses are module 9. For now, notice that the wire labels match the pin labels printed on the boards.</p>'
        },
        fig: {
          photo: 'r1-141',
          hot: [
            { id: 'mcu', p: [37, 12, 11, 12], label: { uk: 'Мікроконтролер STM32', en: 'STM32 microcontroller' } },
            { id: 'imu', p: [78, 40, 22, 26], label: { uk: 'Модуль датчика MPU-6050', en: 'MPU-6050 sensor module' }, info: { uk: 'гіроскоп + акселерометр', en: 'gyro + accelerometer' } },
            { id: 'i2c', p: [79, 46, 6, 6], label: { uk: 'Виводи SCL і SDA (I²C)', en: 'SCL and SDA pins (I²C)' } },
            { id: 'spi', p: [14, 1, 40, 5], label: { uk: 'Підписи SPI: MOSI, MISO, SCK, NSS', en: 'SPI labels: MOSI, MISO, SCK, NSS' } },
            { id: 'xtal', p: [46, 12, 9, 10], label: { uk: 'Кварц', en: 'Crystal' } }
          ]
        }
      }
    ],
    sources: [
      { t: { uk: 'IEC 60617 — міжнародний стандарт графічних символів для схем', en: 'IEC 60617 — international standard for graphical symbols in diagrams' } },
      { t: { uk: 'IEEE 315 — американський стандарт символів', en: 'IEEE 315 — US standard for graphic symbols' } },
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид. — додаток про читання схем', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed. — appendix on reading schematics' } }
    ],
    quiz: [
      { q: { uk: 'Що показує принципова схема?', en: 'What does a schematic show?' }, opts: [{ uk: 'Як деталі з’єднані між собою', en: 'How the parts are connected' }, { uk: 'Де саме деталі лежать на платі', en: 'Exactly where parts sit on the board' }, { uk: 'Скільки коштує пристрій', en: 'What the device costs' }, { uk: 'Як деталі виглядають ззовні', en: 'What the parts look like' }], a: 0,
        ex: { uk: 'Схема — про з’єднання, а не про розташування.', en: 'A schematic is about connections, not placement.' }, see: { m: 'm05', s: 's1' } },
      { q: { uk: 'Дві лінії на схемі перетинаються <b>без точки</b>. Вони…', en: 'Two lines on a schematic cross <b>without a dot</b>. They are…' }, opts: [{ uk: 'Не з’єднані', en: 'Not connected' }, { uk: 'З’єднані', en: 'Connected' }, { uk: 'З’єднані через резистор', en: 'Connected through a resistor' }, { uk: 'Помилка на схемі', en: 'A drawing error' }], a: 0,
        ex: { uk: 'Без точки — просто переходять одна над одною.', en: 'Without a dot they just pass over each other.' }, see: { m: 'm05', s: 's3' } },
      { q: { uk: 'На різних кінцях схеми є дві лінії з міткою «SDA». Що це означає?', en: 'Two lines on opposite sides of a schematic are labelled “SDA”. What does that mean?' }, opts: [{ uk: 'Вони з’єднані між собою', en: 'They are connected to each other' }, { uk: 'Це два різні сигнали', en: 'They are two different signals' }, { uk: 'Одну з них треба видалити', en: 'One should be deleted' }, { uk: 'Там стоїть роз’єм', en: 'There is a connector there' }], a: 0,
        ex: { uk: 'Однакові мітки = одне коло, навіть без лінії між ними.', en: 'Identical labels = one net, even with no line between them.' }, see: { m: 'm05', s: 's3' } },
      { q: { uk: 'Що позначає символ землі (GND)?', en: 'What does the ground (GND) symbol mean?' }, opts: [{ uk: 'Загальний «мінус» — усі такі символи з’єднані', en: 'The common “minus” — all such symbols are connected' }, { uk: 'Місце, де плату прикручено до корпусу', en: 'Where the board screws to the case' }, { uk: 'Найвищу напругу на платі', en: 'The highest voltage on the board' }, { uk: 'Антену', en: 'An antenna' }], a: 0,
        ex: { uk: 'GND — точка відліку напруги; усі символи землі — одне коло.', en: 'GND is the voltage reference; all ground symbols are one net.' }, see: { m: 'm05', s: 's4' } },
      { q: { uk: 'Що означає мітка <b>3V3</b>?', en: 'What does the label <b>3V3</b> mean?' }, opts: [{ uk: 'Живлення 3,3 В', en: 'A 3.3 V supply' }, { uk: '3 вольти на 3 входах', en: '3 volts on 3 inputs' }, { uk: '33 В', en: '33 V' }, { uk: 'Версія 3, ревізія 3', en: 'Version 3, revision 3' }], a: 0,
        ex: { uk: 'Літера V замінює кому: 3V3 = 3,3 В.', en: 'The letter V replaces the decimal point: 3V3 = 3.3 V.' }, see: { m: 'm05', s: 's4' } },
      { q: { uk: 'Позначення <b>U3</b> на платі — це…', en: 'The designator <b>U3</b> on a board is…' }, opts: [{ uk: 'Мікросхема номер 3', en: 'Integrated circuit number 3' }, { uk: 'Напруга 3 В', en: '3 volts' }, { uk: 'Третій роз’єм USB', en: 'The third USB port' }, { uk: 'Котушка', en: 'An inductor' }], a: 0,
        ex: { uk: 'U (або IC) — мікросхема.', en: 'U (or IC) means integrated circuit.' }, see: { m: 'm05', s: 's5' } },
      { q: { uk: 'Яка літера позначає <b>транзистор</b>?', en: 'Which letter marks a <b>transistor</b>?' }, opts: [{ uk: 'Q', en: 'Q' }, { uk: 'T', en: 'T' }, { uk: 'R', en: 'R' }, { uk: 'U', en: 'U' }], a: 0,
        ex: { uk: 'Q — транзистор (у вітчизняних схемах ще VT).', en: 'Q is a transistor (VT in some European schematics).' }, see: { m: 'm05', s: 's5' } },
      { q: { uk: 'Що позначають літерою <b>Y</b> або <b>X</b>?', en: 'What do <b>Y</b> or <b>X</b> mark?' }, opts: [{ uk: 'Кварцовий резонатор', en: 'A crystal' }, { uk: 'Запобіжник', en: 'A fuse' }, { uk: 'Невідому деталь', en: 'An unknown part' }, { uk: 'Перемичку', en: 'A jumper' }], a: 0,
        ex: { uk: 'Y або X — кварц.', en: 'Y or X is a crystal.' }, see: { m: 'm05', s: 's5' } },
      { q: { uk: 'Позначення <b>J1</b> найімовірніше означає…', en: 'The designator <b>J1</b> most likely means…' }, opts: [{ uk: 'Роз’єм', en: 'A connector' }, { uk: 'Перемичку на 1 Ом', en: 'A 1 Ω jumper' }, { uk: 'Діод', en: 'A diode' }, { uk: 'Конденсатор 1 мкФ', en: 'A 1 µF capacitor' }], a: 0,
        ex: { uk: 'J (jack), а також P чи CN — роз’єми.', en: 'J (jack), as well as P or CN, mark connectors.' }, see: { m: 'm05', s: 's5' } },
      { q: { uk: 'Що позначає <b>TP</b> на платі?', en: 'What does <b>TP</b> on a board mark?' }, opts: [{ uk: 'Контрольну точку для вимірювання', en: 'A test point for measurements' }, { uk: 'Транзистор потужний', en: 'A power transistor' }, { uk: 'Термопару', en: 'A thermocouple' }, { uk: 'Верхній шар плати', en: 'The top layer' }], a: 0,
        ex: { uk: 'TP — test point: майданчик, до якого торкаються щупом.', en: 'TP is a test point: a pad you touch with a probe.' }, see: { m: 'm05', s: 's5' } },
      { q: { uk: 'Символ: прямокутник з двома виводами. Що це в європейському стилі?', en: 'Symbol: a rectangle with two leads. What is it in European style?' }, opts: [{ uk: 'Резистор', en: 'A resistor' }, { uk: 'Конденсатор', en: 'A capacitor' }, { uk: 'Батарея', en: 'A battery' }, { uk: 'Мікросхема', en: 'An IC' }], a: 0,
        fig: { svg: D.svg(200, 60, D.two('res', 20, 30, 180, 30)) },
        ex: { uk: 'Прямокутник — резистор за ДСТУ/IEC. У США — зигзаг.', en: 'A rectangle is the IEC resistor. The US uses a zigzag.' }, see: { m: 'm05', s: 's2' } },
      { q: { uk: 'Що це за символ?', en: 'What is this symbol?' }, opts: [{ uk: 'Конденсатор', en: 'A capacitor' }, { uk: 'Батарея', en: 'A battery' }, { uk: 'Котушка', en: 'An inductor' }, { uk: 'Вимикач', en: 'A switch' }], a: 0,
        fig: { svg: D.svg(200, 60, D.two('cap', 20, 30, 180, 30)) },
        ex: { uk: 'Дві однакові паралельні риски — конденсатор.', en: 'Two equal parallel plates — a capacitor.' }, see: { m: 'm05', s: 's2' } },
      { q: { uk: 'Що це за символ?', en: 'What is this symbol?' }, opts: [{ uk: 'Батарея', en: 'A battery' }, { uk: 'Конденсатор', en: 'A capacitor' }, { uk: 'Земля', en: 'Ground' }, { uk: 'Запобіжник', en: 'A fuse' }], a: 0,
        fig: { svg: D.svg(200, 60, D.two('bat', 20, 30, 180, 30)) },
        ex: { uk: 'Довга тонка риска (+) і коротка товста (−) — батарея.', en: 'A long thin plate (+) and a short thick one (−) — a battery.' }, see: { m: 'm05', s: 's2' } },
      { q: { uk: 'Що це за символ?', en: 'What is this symbol?' }, opts: [{ uk: 'Котушка індуктивності', en: 'An inductor' }, { uk: 'Резистор', en: 'A resistor' }, { uk: 'Антена', en: 'An antenna' }, { uk: 'Кварц', en: 'A crystal' }], a: 0,
        fig: { svg: D.svg(200, 60, D.two('ind', 20, 35, 180, 35)) },
        ex: { uk: 'Ряд півкіл — витки дроту, тобто котушка.', en: 'A row of half-circles — turns of wire, i.e. an inductor.' }, see: { m: 'm05', s: 's2' } },
      { q: { uk: 'Що це за символ?', en: 'What is this symbol?' }, opts: [{ uk: 'MOSFET з N-каналом', en: 'An N-channel MOSFET' }, { uk: 'Біполярний транзистор NPN', en: 'An NPN bipolar transistor' }, { uk: 'Діод', en: 'A diode' }, { uk: 'Операційний підсилювач', en: 'An op-amp' }], a: 0,
        fig: { svg: D.svg(200, 80, D.nmos(90, 40, {})) },
        ex: { uk: 'Затвор окремо від каналу (зазор) і три сегменти — MOSFET.', en: 'A gate separated from the channel and three segments — a MOSFET.' }, see: { m: 'm05', s: 's2' } },
      { q: { uk: 'У схемі стабілізатора 7805 навіщо діод 1N4007 на вході?', en: 'In the 7805 regulator schematic, why is there a 1N4007 at the input?' }, opts: [{ uk: 'Захищає від переплутаної полярності', en: 'It protects against reversed polarity' }, { uk: 'Підвищує напругу', en: 'It raises the voltage' }, { uk: 'Світиться, коли є живлення', en: 'It lights when power is present' }, { uk: 'Задає частоту', en: 'It sets a frequency' }], a: 0,
        ex: { uk: 'Батарея навпаки — діод закритий, стабілізатор цілий.', en: 'Battery backwards — the diode is closed and the regulator survives.' }, see: { m: 'm05', s: 's6' } },
      { q: { uk: 'Навіщо в схемі стабілізатора і великі (220 мкФ), і маленькі (100 нФ) конденсатори?', en: 'Why does the regulator schematic have both big (220 µF) and small (100 nF) capacitors?' }, opts: [{ uk: 'Великі — запас енергії, маленькі — гасять швидкі завади', en: 'Big ones store energy; small ones kill fast noise' }, { uk: 'Це помилка — достатньо одного', en: 'It’s a mistake — one is enough' }, { uk: 'Маленькі — для краси', en: 'The small ones are decorative' }, { uk: 'Великі задають напругу 5 В', en: 'The big ones set the 5 V' }], a: 0,
        ex: { uk: 'Різні конденсатори працюють на різних швидкостях змін.', en: 'Different capacitors work at different speeds of change.' }, see: { m: 'm05', s: 's6' } },
      { q: { uk: 'Що таке блок-схема?', en: 'What is a block diagram?' }, opts: [{ uk: 'Спрощена «карта» пристрою: вузли-прямокутники і зв’язки між ними', en: 'A simplified “map” of a device: boxes for units and links between them' }, { uk: 'Креслення з кожним резистором', en: 'A drawing showing every resistor' }, { uk: 'Фото плати', en: 'A photo of the board' }, { uk: 'Список деталей', en: 'A parts list' }], a: 0,
        ex: { uk: 'Блок-схема показує загальну будову без дрібних деталей.', en: 'A block diagram shows the overall structure without small parts.' }, see: { m: 'm05', s: 's7' } },
      { type: 'tap', q: { uk: 'Торкаємося модуля <b>датчика руху</b> (гіроскоп + акселерометр).', en: 'Tap the <b>motion sensor</b> module (gyro + accelerometer).' },
        fig: { photo: 'r1-141', hot: [{ id: 'imu', p: [78, 40, 22, 26] }, { id: 'mcu', p: [37, 12, 11, 12] }, { id: 'usb', p: [6, 13, 9, 9] }, { id: 'board2', p: [8, 58, 47, 40] }] },
        a: 'imu', ex: { uk: 'Синій модуль праворуч, підписаний ITG/MPU, — MPU-6050.', en: 'The blue module on the right, labelled ITG/MPU, is the MPU-6050.' }, see: { m: 'm05', s: 's8' } }
    ]
  });
})();
