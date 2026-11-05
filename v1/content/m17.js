/* Module 17 — Optional hands-on track */
(function () {
  APP.module({
    id: 'm17', n: 17, part: 'E', cv: 1,
    title: { uk: 'Практика руками (за бажанням)', en: 'Hands-on practice (optional)' },
    short: { uk: 'Мультиметр, паяльник, макетна плата, перші схеми', en: 'Multimeter, soldering iron, breadboard, first circuits' },
    intro: {
      uk: 'Цей модуль — для тих, хто хоче потримати деталі в руках. Тут перелік недорогого набору, безпечна робота з інструментами і три перші схеми, які закріплять усе вивчене.',
      en: 'This module is for those who want to hold the parts in their hands. It lists an inexpensive kit, safe tool use and three first circuits that cement everything you have learned.'
    },
    warm: ['m01q09', 'm06q08', 'm15q14'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Безпека насамперед', en: 'Safety first' },
        body: {
          uk: '<ul><li><b>LiPo-батареї</b>: не замикаємо контакти, не протикаємо, заряджаємо лише балансним зарядним під наглядом і на негорючій поверхні. Здута батарея — на утилізацію.</li><li><b>Паяльник</b>: жало ~300–350 °C. Підставка, захисні окуляри, провітрювання (пари флюсу шкідливі).</li><li><b>Мережа 230 В</b>: усередину мережевих пристроїв без досвіду не ліземо. Конденсатори блоків живлення тримають заряд і після вимкнення.</li><li>Продзвін і вимірювання опору — лише на <b>знеструмленій</b> платі.</li></ul>',
          en: '<ul><li><b>LiPo batteries</b>: never short the contacts or puncture them; charge only with a balance charger, supervised, on a non-flammable surface. A swollen battery goes to recycling.</li><li><b>Soldering iron</b>: the tip is ~300–350 °C. Use a stand, safety glasses, ventilation (flux fumes are harmful).</li><li><b>230 V mains</b>: don’t go inside mains equipment without experience. Power-supply capacitors hold charge even after switch-off.</li><li>Continuity and resistance checks only on an <b>unpowered</b> board.</li></ul>'
        },
        recall: [{ m: 'm01', s: 's9', label: { uk: 'Коротке замикання LiPo', en: 'LiPo short circuit' } }]
      },
      {
        kind: 1,
        title: { uk: 'Мультиметр: головний прилад', en: 'The multimeter: your main instrument' },
        body: {
          uk: '<ul><li><b>Напруга (V⎓)</b> — щупи паралельно точкам: чорний на землю, червоний на точку. Так перевіряють 5 В і 3,3 В після стабілізаторів.</li><li><b>Опір (Ω)</b> — на знеструмленій деталі.</li><li><b>Продзвін</b> (значок звуку) — пищить, якщо точки з’єднані. Найкорисніший режим для читання плат.</li><li><b>Струм (A)</b> — прилад вмикається <b>послідовно</b> в коло, червоний щуп — в окреме гніздо. Помилка тут палить запобіжник приладу.</li><li><b>Діод</b> — показує падіння напруги (≈0,6 В для кремнію) в прямому напрямі.</li></ul>',
          en: '<ul><li><b>Voltage (V⎓)</b> — probes across the points: black to ground, red to the point. That is how you check 5 V and 3.3 V after regulators.</li><li><b>Resistance (Ω)</b> — on an unpowered part.</li><li><b>Continuity</b> (the sound symbol) — beeps when points are connected. The most useful mode for reading boards.</li><li><b>Current (A)</b> — the meter goes <b>in series</b> with the circuit, the red probe in a separate socket. A mistake here blows the meter’s fuse.</li><li><b>Diode</b> — shows the forward voltage drop (≈0.6 V for silicon).</li></ul>'
        },
        recall: [{ m: 'm03', s: 's2', label: { uk: 'Падіння напруги на діоді', en: 'Diode voltage drop' } }],
        fig: { photo: 'r1-263' }
      },
      {
        kind: 1,
        title: { uk: 'Паяльник і припій', en: 'Soldering iron and solder' },
        body: {
          uk: '<p>Для початку достатньо компактного паяльника з регулюванням температури (типу TS100/SH72/Pinecil), припою з флюсом усередині діаметром 0,5–0,8 мм і флюсу. Правило: гріємо <b>і майданчик, і вивід</b>, підносимо припій до місця контакту, а не до жала. Добра пайка — блискучий конус.</p>',
          en: '<p>To start, a compact temperature-controlled iron (TS100/SH72/Pinecil type), 0.5–0.8 mm flux-core solder and some flux are enough. The rule: heat <b>both the pad and the lead</b>, feed solder to the joint, not to the tip. A good joint is a shiny cone.</p>'
        },
        fig: { photo: 'r1-261' }
      },
      {
        kind: 1,
        title: { uk: 'Макетна плата: без паяння', en: 'The breadboard: no soldering' },
        body: {
          uk: '<p>Деталі встромляють в отвори. Усередині — металеві смужки: кожен короткий ряд із 5 отворів з’єднаний, а довгі лінії по краях (+ і −) — шини живлення. На фото праворуч видно ці смужки.</p>',
          en: '<p>Parts plug into the holes. Inside are metal strips: each short row of 5 holes is connected, and the long lines along the edges (+ and −) are power rails. The photo on the right shows those strips.</p>'
        },
        fig: { photo: 'r1-270' }
      },
      {
        kind: 4,
        title: { uk: 'Набір для старту', en: 'A starter kit' },
        body: {
          uk: '<ul><li>мультиметр з продзвоном;</li><li>макетна плата на 400 або 830 отворів і дроти-перемички;</li><li>набір резисторів (10 Ом – 1 МОм), керамічних і електролітичних конденсаторів;</li><li>світлодіоди, діоди 1N4007 і Шотткі, стабілітрони 3,3 та 5,1 В;</li><li>транзистори 2N2222 / BC547 і логічний MOSFET (наприклад, IRLZ44N);</li><li>модуль понижувача (MP1584 чи LM2596), тримач на 2 батарейки АА або блок живлення 5–12 В;</li><li>за бажанням: Arduino Nano або ESP32 — для перших програм.</li></ul>',
          en: '<ul><li>a multimeter with continuity;</li><li>a 400 or 830-hole breadboard and jumper wires;</li><li>a resistor kit (10 Ω – 1 MΩ), ceramic and electrolytic capacitors;</li><li>LEDs, 1N4007 and Schottky diodes, 3.3 and 5.1 V Zeners;</li><li>2N2222 / BC547 transistors and a logic-level MOSFET (e.g. IRLZ44N);</li><li>a buck module (MP1584 or LM2596), a 2×AA holder or a 5–12 V supply;</li><li>optionally: an Arduino Nano or ESP32 for first programs.</li></ul>'
        }
      },
      {
        kind: 3,
        title: { uk: 'Схема 1: світлодіод і резистор', en: 'Circuit 1: an LED and a resistor' },
        body: {
          uk: '<p>Живлення 5 В → резистор 330 Ом → довга ніжка світлодіода → коротка ніжка → земля. Вимірюємо напругу на світлодіоді (≈2 В) і на резисторі (≈3 В) — у сумі 5 В. Перевертаємо світлодіод — він згасає.</p>',
          en: '<p>5 V supply → 330 Ω resistor → LED long leg → short leg → ground. Measure the voltage across the LED (≈2 V) and across the resistor (≈3 V) — they add up to 5 V. Flip the LED and it goes dark.</p>'
        },
        recall: [{ m: 'm06', s: 's4', label: { uk: 'Розрахунок резистора', en: 'Resistor calculation' } }]
      },
      {
        kind: 3,
        title: { uk: 'Схема 2: дільник напруги', en: 'Circuit 2: a voltage divider' },
        body: {
          uk: '<p>Два резистори по 10 кОм послідовно між 5 В і землею. Вимірюємо напругу в середній точці — має бути ≈2,5 В. Замінюємо нижній на 4,7 кОм — і заздалегідь рахуємо, що покаже прилад.</p>',
          en: '<p>Two 10 kΩ resistors in series between 5 V and ground. Measure the midpoint — it should read ≈2.5 V. Swap the bottom one for 4.7 kΩ — and work out beforehand what the meter will show.</p>'
        },
        recall: [{ m: 'm06', s: 's2', label: { uk: 'Дільник', en: 'The divider' } }],
        fig: { anim: 'divider', opts: { vin: 5, r1: 10, r2: 10 } }
      },
      {
        kind: 3,
        title: { uk: 'Схема 3: транзисторний ключ', en: 'Circuit 3: a transistor switch' },
        body: {
          uk: '<p>Світлодіод із резистором — у коло стоку MOSFET-а, витік — на землю, затвор — через резистор 100 Ом на кнопку до 5 В і через 10 кОм на землю (pull-down). Натиснули кнопку — світлодіод світить. Ми щойно зібрали той самий ключ, що вмикає пищалку на польотному контролері.</p>',
          en: '<p>An LED with its resistor in the MOSFET drain path, source to ground, gate through 100 Ω to a button to 5 V and through 10 kΩ to ground (pull-down). Press the button — the LED lights. You have just built the same switch that drives the buzzer on a flight controller.</p>'
        },
        recall: [{ m: 'm06', s: 's8', label: { uk: 'Транзисторний ключ', en: 'The transistor switch' } }, { m: 'm06', s: 's9', label: { uk: 'Пищалка FC', en: 'The FC buzzer' } }]
      }
    ],
    sources: [
      { t: { uk: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4-те вид., 2016 — розділи про прилади й макетування', en: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4th ed., 2016 — chapters on instruments and prototyping' } },
      { t: { uk: 'Battery University — BU-808: безпечне поводження з літієвими батареями', en: 'Battery University — BU-808 on lithium battery safety' }, url: 'https://batteryuniversity.com/' }
    ],
    quiz: [
      { q: { uk: 'Батарея LiPo здулася. Що робити?', en: 'A LiPo battery has swollen. What do you do?' }, opts: [{ uk: 'Не використовувати й здати на утилізацію', en: 'Stop using it and send it for recycling' }, { uk: 'Притиснути й літати далі', en: 'Squeeze it and keep flying' }, { uk: 'Зарядити повністю', en: 'Charge it fully' }, { uk: 'Проткнути, щоб випустити газ', en: 'Puncture it to release the gas' }], a: 0,
        ex: { uk: 'Здуття — ознака внутрішнього пошкодження; ризик займання.', en: 'Swelling signals internal damage; fire risk.' }, see: { m: 'm17', s: 's1' } },
      { q: { uk: 'Коли можна перевіряти продзвоном чи вимірювати опір?', en: 'When may you run continuity or resistance checks?' }, opts: [{ uk: 'Лише на знеструмленій платі', en: 'Only on an unpowered board' }, { uk: 'Будь-коли', en: 'Any time' }, { uk: 'Лише під напругою', en: 'Only when powered' }, { uk: 'Лише вночі', en: 'Only at night' }], a: 0,
        ex: { uk: 'Під напругою вимірювання хибні, а прилад може пошкодитись.', en: 'When powered, readings are wrong and the meter can be damaged.' }, see: { m: 'm17', s: 's1' } },
      { q: { uk: 'Як підключити мультиметр, щоб виміряти напругу 3,3 В на платі?', en: 'How do you connect a multimeter to measure 3.3 V on a board?' }, opts: [{ uk: 'Паралельно: чорний щуп на землю, червоний на точку', en: 'In parallel: black probe to ground, red to the point' }, { uk: 'Послідовно в розрив кола', en: 'In series in a break in the circuit' }, { uk: 'Обидва щупи на одну точку', en: 'Both probes on one point' }, { uk: 'Червоний щуп у гніздо 10 A', en: 'Red probe in the 10 A socket' }], a: 0,
        ex: { uk: 'Напругу міряють паралельно, струм — послідовно.', en: 'Voltage is measured in parallel, current in series.' }, see: { m: 'm17', s: 's2' } },
      { q: { uk: 'Як вмикають мультиметр для вимірювання струму?', en: 'How is a multimeter connected to measure current?' }, opts: [{ uk: 'Послідовно в коло, червоний щуп в окреме гніздо A', en: 'In series, with the red probe in the separate A socket' }, { uk: 'Паралельно батареї', en: 'Across the battery' }, { uk: 'Як для напруги', en: 'Same as for voltage' }, { uk: 'Через антену', en: 'Through the antenna' }], a: 0,
        ex: { uk: 'Струм має пройти крізь прилад. Паралельно в режимі струму — коротке замикання.', en: 'The current must flow through the meter. Across the supply in current mode is a short circuit.' }, see: { m: 'm17', s: 's2' } },
      { q: { uk: 'Що покаже мультиметр у режимі «діод» на справному кремнієвому діоді в прямому напрямі?', en: 'What does a multimeter in diode mode show on a good silicon diode, forward?' }, opts: [{ uk: '≈0,6 В', en: '≈0.6 V' }, { uk: '0 В', en: '0 V' }, { uk: '5 В', en: '5 V' }, { uk: 'Нескінченність', en: 'Infinity' }], a: 0,
        ex: { uk: 'Прямий спад кремнієвого діода ≈0,6–0,7 В; у зворотному — «OL».', en: 'A silicon diode’s forward drop is ≈0.6–0.7 V; reverse reads “OL”.' }, see: { m: 'm17', s: 's2' } },
      { q: { uk: 'Як правильно паяти вивід?', en: 'How do you solder a lead correctly?' }, opts: [{ uk: 'Гріти і майданчик, і вивід, подавати припій у місце контакту', en: 'Heat both pad and lead, feed solder to the joint' }, { uk: 'Розтопити припій на жалі й капнути', en: 'Melt solder on the tip and drip it' }, { uk: 'Гріти лише вивід', en: 'Heat only the lead' }, { uk: 'Паяти без флюсу', en: 'Solder without flux' }], a: 0,
        ex: { uk: 'Обидві поверхні мають бути гарячими — тоді припій розтікається й тримає.', en: 'Both surfaces must be hot — then solder flows and holds.' }, see: { m: 'm17', s: 's3' } },
      { q: { uk: 'Які отвори на макетній платі з’єднані між собою?', en: 'Which holes on a breadboard are connected?' }, opts: [{ uk: 'Кожен короткий ряд із 5 отворів; довгі лінії по краях — шини', en: 'Each short row of 5 holes; the long edge lines are rails' }, { uk: 'Усі отвори', en: 'All of them' }, { uk: 'Жоден', en: 'None' }, { uk: 'Лише по діагоналі', en: 'Only diagonally' }], a: 0,
        ex: { uk: 'Металеві смужки всередині з’єднують ряди по 5.', en: 'Metal strips inside join rows of 5.' }, see: { m: 'm17', s: 's4' } },
      { type: 'calc', see: { m: 'm17', s: 's7' }, gen: function (R, c) {
          var r1 = 10, r2 = R.pick([4.7, 10, 22, 2.2]), v = 5 * r2 / (r1 + r2);
          var o = c.numOpts(v, [5 * r1 / (r1 + r2), 2.5 === Math.round(v * 10) / 10 ? 1.25 : 2.5, 5], { uk: 'В', en: 'V' }, 2);
          return { q: { uk: 'Дільник від 5 В: верхній 10 кОм, нижній ' + c.fmt(r2) + ' кОм. Що покаже мультиметр у середній точці?', en: 'A divider from 5 V: top 10 kΩ, bottom ' + c.fmt(r2) + ' kΩ. What will the meter read at the midpoint?' }, opts: o.opts, a: 0,
            ex: { uk: '5 × ' + c.fmt(r2) + ' / (10 + ' + c.fmt(r2) + ') = ' + c.fmt(v, 2) + ' В.', en: '5 × ' + c.fmt(r2) + ' / (10 + ' + c.fmt(r2) + ') = ' + c.fmt(v, 2) + ' V.' } };
        } },
      { q: { uk: 'У схемі світлодіод + резистор 330 Ом від 5 В на світлодіоді ≈2 В. Скільки на резисторі?', en: 'In an LED + 330 Ω circuit from 5 V, the LED shows ≈2 V. What is across the resistor?' }, opts: [{ uk: '≈3 В', en: '≈3 V' }, { uk: '5 В', en: '5 V' }, { uk: '2 В', en: '2 V' }, { uk: '0 В', en: '0 V' }], a: 0,
        ex: { uk: 'Напруги в послідовному колі додаються: 2 + 3 = 5 В.', en: 'Voltages in a series circuit add: 2 + 3 = 5 V.' }, see: { m: 'm17', s: 's6' } },
      { q: { uk: 'Навіщо резистор 10 кОм від затвора MOSFET на землю?', en: 'Why a 10 kΩ resistor from the MOSFET gate to ground?' }, opts: [{ uk: 'Pull-down: тримає транзистор закритим, коли кнопку відпущено', en: 'A pull-down: keeps the transistor off when the button is released' }, { uk: 'Обмежує струм світлодіода', en: 'Limits the LED current' }, { uk: 'Вимірює струм', en: 'Measures current' }, { uk: 'Він не потрібен', en: 'It isn’t needed' }], a: 0,
        ex: { uk: 'Без нього затвор «висить у повітрі» — модуль 6.', en: 'Without it the gate floats — see module 6.' }, see: { m: 'm17', s: 's8' } },
      { q: { uk: 'Що з переліченого — логічний MOSFET, яким можна керувати від 5 В?', en: 'Which of these is a logic-level MOSFET driven from 5 V?' }, opts: [{ uk: 'IRLZ44N', en: 'IRLZ44N' }, { uk: '1N4007', en: '1N4007' }, { uk: 'NE555', en: 'NE555' }, { uk: 'AMS1117', en: 'AMS1117' }], a: 0,
        ex: { uk: '«L» у IRLZ — logic level. 1N4007 — діод, NE555 — таймер, AMS1117 — стабілізатор.', en: 'The “L” in IRLZ means logic level. 1N4007 is a diode, NE555 a timer, AMS1117 a regulator.' }, see: { m: 'm17', s: 's5' } },
      { q: { uk: 'Чому не варто розбирати мережевий блок живлення відразу після вимкнення?', en: 'Why not open a mains power supply straight after switching it off?' }, opts: [{ uk: 'Конденсатори ще тримають небезпечний заряд', en: 'The capacitors still hold a dangerous charge' }, { uk: 'Він гарячий', en: 'It is hot' }, { uk: 'Втратиться прошивка', en: 'The firmware will be lost' }, { uk: 'Причин немає', en: 'No reason' }], a: 0,
        ex: { uk: 'Великі конденсатори після випрямляча можуть тримати сотні вольт.', en: 'Large capacitors after the rectifier can hold hundreds of volts.' }, see: { m: 'm17', s: 's1' } }
    ]
  });
})();
