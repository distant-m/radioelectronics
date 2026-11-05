/* Module 6 — Basic circuits */
(function () {
  var V = { uk: 'В', en: 'V' }, OHM = { uk: 'Ом', en: 'Ω' };
  APP.module({
    id: 'm06', n: 6, part: 'A', cv: 1,
    title: { uk: 'Базові схеми', en: 'Basic circuits' },
    short: { uk: 'Дільник, підтяжка, фільтр, ключ', en: 'Divider, pull-up, filter, switch' },
    intro: {
      uk: 'Із кількох деталей складаються маленькі «вузли», що повторюються на кожній платі. Навчившись їх упізнавати, ми бачитимемо на схемі вже не десятки деталей, а кілька зрозумілих функцій.',
      en: 'A few parts make up small “building blocks” that repeat on every board. Once you recognise them, a schematic stops being dozens of parts and becomes a handful of clear functions.'
    },
    warm: ['m05q02', 'm01q09', 'm03q15'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Послідовно і паралельно', en: 'Series and parallel' },
        body: {
          uk: '<ul><li><b>Послідовно</b> — одна деталь за іншою, струм іде крізь обидві. Опори <b>додаються</b>: 1 кОм + 2 кОм = 3 кОм.</li><li><b>Паралельно</b> — деталі поруч, струм ділиться між ними. Загальний опір <b>менший</b> за найменший: два однакові резистори паралельно дають половину опору одного.</li></ul><p>Банки батареї послідовно — напруги додаються (так виходить 6S). Паралельно — додаються ємності (так роблять «2P»-збірки).</p>',
          en: '<ul><li><b>Series</b> — one part after another, current flows through both. Resistances <b>add</b>: 1 kΩ + 2 kΩ = 3 kΩ.</li><li><b>Parallel</b> — parts side by side, current splits between them. The total is <b>less</b> than the smallest: two equal resistors in parallel give half of one.</li></ul><p>Battery cells in series add voltages (that is how 6S is made). In parallel, capacities add (that is how “2P” packs are built).</p>'
        },
        recall: [{ m: 'm01', s: 's7', label: { uk: 'Банки батареї і S', en: 'Battery cells and S' } }],
        fig: {
          svg: function (L) {
            var s = D.t(90, 18, L({ uk: 'послідовно', en: 'series' }), 'lbl') + D.w([[10, 50], [30, 50]]) + D.two('res', 30, 50, 90, 50, { label: 'R1' }) + D.two('res', 90, 50, 150, 50, { label: 'R2' }) + D.w([[150, 50], [170, 50]]);
            s += D.t(90, 100, 'R = R1 + R2', 'txm');
            s += D.t(285, 18, L({ uk: 'паралельно', en: 'parallel' }), 'lbl') + D.w([[205, 60], [225, 60], [225, 40], [255, 40]]) + D.w([[225, 60], [225, 80], [255, 80]]) + D.two('res', 255, 40, 315, 40) + D.two('res', 255, 80, 315, 80) + D.w([[315, 40], [345, 40], [345, 60], [365, 60]]) + D.w([[315, 80], [345, 80], [345, 60]]) + D.dot(225, 60) + D.dot(345, 60);
            s += D.t(285, 110, '1/R = 1/R1 + 1/R2', 'txm');
            return D.svg(380, 120, s);
          }
        }
      },
      {
        kind: 3,
        title: { uk: 'Дільник напруги: два резистори', en: 'The voltage divider: two resistors' },
        body: {
          uk: '<p>Два резистори послідовно між живленням і землею. У точці між ними — <b>частина</b> вхідної напруги, і ця частина залежить від співвідношення резисторів.</p><div class="formula">Uвих = Uвх × R2 / (R1 + R2)</div><p>Однакові резистори — рівно половина. Рухаємо повзунки.</p>',
          en: '<p>Two resistors in series between supply and ground. The point between them carries a <b>fraction</b> of the input voltage, set by the ratio of the resistors.</p><div class="formula">Uout = Uin × R2 / (R1 + R2)</div><p>Equal resistors give exactly half. Move the sliders.</p>'
        },
        fig: { anim: 'divider', opts: { vin: 12, r1: 10, r2: 10 } }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: як польотний контролер «бачить» батарею', en: 'Device: how a flight controller “sees” the battery' },
        body: {
          uk: '<p>Процесор польотного контролера вимірює напругу лише до 3,3 В. А батарея 6S — до 25,2 В. Як бути? <b>Дільником!</b></p><p>Часто ставлять 10 кОм і 1 кОм: 25,2 × 1 / (10 + 1) ≈ <b>2,3 В</b> — безпечно для процесора. Прошивка (наприклад, Betaflight) множить виміряне назад на коефіцієнт і показує справжню напругу в окулярах.</p><p>Якщо напруга в OSD бреше — часто винен саме коефіцієнт дільника в налаштуваннях.</p>',
          en: '<p>A flight-controller processor can only measure up to 3.3 V. A 6S battery goes up to 25.2 V. The answer: <b>a divider!</b></p><p>A common pair is 10 kΩ and 1 kΩ: 25.2 × 1 / (10 + 1) ≈ <b>2.3 V</b> — safe for the processor. The firmware (for example Betaflight) multiplies the reading back by a scale factor and shows you the real voltage in the goggles.</p><p>If the OSD voltage is wrong, the divider scale setting is often the culprit.</p>'
        },
        fig: { anim: 'divider', opts: { vin: 25.2, r1: 10, r2: 1 }, cap: { uk: 'Uвх = 25,2 В (6S). Підбираємо R1 і R2 так, щоб Uвих не перевищувала 3,3 В.', en: 'Uin = 25.2 V (6S). Choose R1 and R2 so that Uout stays below 3.3 V.' } }
      },
      {
        kind: 3,
        title: { uk: 'Світлодіод + резистор: рахуємо', en: 'LED + resistor: the calculation' },
        body: {
          uk: '<p>На світлодіоді «застрягає» своя напруга: червоний ≈2 В, синій і білий ≈3 В. Решту напруги має «забрати» резистор.</p><div class="formula">R = (Uживл − U<sub>LED</sub>) / I</div><p>Приклад: живлення 5 В, червоний LED (2 В), струм 10 мА: R = (5 − 2) / 0,01 = <b>300 Ом</b>. Беремо найближчий стандартний більший — 330 Ом.</p>',
          en: '<p>An LED “holds” its own voltage: red ≈2 V, blue and white ≈3 V. The resistor must take the rest.</p><div class="formula">R = (Usupply − U<sub>LED</sub>) / I</div><p>Example: 5 V supply, red LED (2 V), 10 mA: R = (5 − 2) / 0.01 = <b>300 Ω</b>. Take the next standard value up — 330 Ω.</p>'
        },
        recall: [{ m: 'm03', s: 's4', label: { uk: 'Світлодіод', en: 'The LED' } }],
        fig: {
          svg: function (L) {
            return D.svg(380, 150, D.vcc(60, 30, '+5 V') + D.w([[60, 30], [60, 40]]) + D.two('res', 60, 40, 60, 90, { label: 'R', value: '330 Ω', side: 'r' }) + D.two('led', 60, 90, 60, 128) + D.gnd(60, 128) +
              D.t(200, 50, L({ uk: '5 В − 2 В = 3 В на резисторі', en: '5 V − 2 V = 3 V across the resistor' }), 'tx', 'start') + D.t(200, 72, '3 / 0,01 = 300 Ω → 330 Ω', 'txm', 'start') + D.t(200, 112, L({ uk: '2 В на світлодіоді', en: '2 V across the LED' }), 'tx', 'start'));
          }
        }
      },
      {
        kind: 1,
        title: { uk: 'Логічні рівні: «1» і «0»', en: 'Logic levels: “1” and “0”' },
        body: {
          uk: '<p>Цифрові мікросхеми розуміють лише два стани: <b>високий рівень</b> («1», близько напруги живлення — 3,3 В) і <b>низький</b> («0», близько 0 В). Сигнали між процесором, приймачем, гіроскопом — це швидкі послідовності нулів і одиниць.</p><p>Важливо: вхід, не підключений ні до чого, «висить у повітрі» і ловить завади — то 0, то 1. Саме для цього потрібні підтяжки (див. далі).</p>',
          en: '<p>Digital chips understand only two states: <b>high</b> (“1”, near the supply — 3.3 V) and <b>low</b> (“0”, near 0 V). Signals between processor, receiver and gyro are fast sequences of zeros and ones.</p><p>Important: an input connected to nothing “floats” and picks up noise — flipping between 0 and 1. That is what pull-ups are for (see next).</p>'
        }
      },
      {
        kind: 3,
        title: { uk: 'Підтягувальний резистор (pull-up)', en: 'The pull-up resistor' },
        body: {
          uk: '<p>Резистор 10 кОм із входу на живлення тримає вхід на «1», поки кнопка не натиснута. Натиснули — кнопка з’єднує вхід із землею, і там «0». Резистор великий, тож струм при цьому мізерний.</p><p>Буває й навпаки — <b>pull-down</b> на землю. На платах підтяжки стоять на кнопках, на лініях I²C (SDA, SCL), на виводах увімкнення мікросхем.</p>',
          en: '<p>A 10 kΩ resistor from the input to the supply holds the input at “1” while the button is released. Press it, and the button connects the input to ground: “0”. The resistor is large, so the current is tiny.</p><p>The reverse also exists — a <b>pull-down</b> to ground. On boards, pull-ups sit on buttons, on I²C lines (SDA, SCL), on chip enable pins.</p>'
        },
        fig: {
          svg: function (L) {
            return D.svg(380, 170, D.vcc(100, 30, '3V3') + D.w([[100, 30], [100, 40]]) + D.two('res', 100, 40, 100, 90, { label: 'R', value: '10 kΩ', side: 'l' }) + D.dot(100, 100) + D.w([[100, 90], [100, 100], [220, 100]]) +
              D.chip(220, 75, 120, 50, 'MCU', L({ uk: 'вхід', en: 'input' })) + D.w([[100, 100], [100, 112]]) + D.two('swOpen', 100, 112, 100, 150) + D.gnd(100, 150) +
              D.t(130, 138, L({ uk: 'кнопка', en: 'button' }), 'txm', 'start'));
          },
          cap: { uk: 'Кнопка відпущена → «1». Натиснута → «0».', en: 'Button released → “1”. Pressed → “0”.' }
        }
      },
      {
        kind: 3,
        title: { uk: 'RC-фільтр: резистор + конденсатор', en: 'The RC filter: resistor + capacitor' },
        body: {
          uk: '<p>Резистор послідовно, конденсатор на землю — і швидкі «стрибки» на сигналі згладжуються: конденсатор просто не встигає за ними. Повільні зміни проходять.</p><p>Швидкість реакції задає <b>стала часу τ = R × C</b>. 10 кОм × 1 мкФ = 0,01 с. За час τ конденсатор заряджається приблизно на 63 %.</p><p>RC-фільтри стоять на вимірюванні напруги батареї і струму — щоб показання не «стрибали».</p>',
          en: '<p>A resistor in series and a capacitor to ground — and fast “jumps” on a signal are smoothed: the capacitor can’t keep up with them. Slow changes pass through.</p><p>The reaction speed is the <b>time constant τ = R × C</b>. 10 kΩ × 1 µF = 0.01 s. In one τ the capacitor charges to about 63%.</p><p>RC filters sit on battery voltage and current sensing — so readings don’t jump around.</p>'
        },
        recall: [{ m: 'm02', s: 's5', label: { uk: 'Заряд конденсатора', en: 'Capacitor charging' } }],
        fig: { anim: 'capcharge' }
      },
      {
        kind: 3,
        title: { uk: 'Транзисторний ключ і захисний діод', en: 'A transistor switch and its protection diode' },
        body: {
          uk: '<p>Вивід мікроконтролера дає лише кілька міліампер. Щоб увімкнути двигун, пищалку чи світлодіодну стрічку, ставлять <b>MOSFET-ключ</b>: процесор керує затвором, а великий струм іде через транзистор.</p><p>Якщо навантаження — котушка (двигун, реле, пищалка), паралельно йому ставлять <b>діод «навпаки»</b>. Коли ключ вимикається, котушка «хоче» продовжити струм і видає сплеск напруги — діод дає цьому струму безпечний шлях.</p>',
          en: '<p>A microcontroller pin supplies only a few milliamps. To switch a motor, a buzzer or an LED strip, a <b>MOSFET switch</b> is used: the processor drives the gate, and the big current flows through the transistor.</p><p>If the load is a coil (motor, relay, buzzer), a <b>reverse diode</b> sits across it. When the switch turns off, the coil “wants” to keep current flowing and throws a voltage spike — the diode gives that current a safe path.</p>'
        },
        recall: [{ m: 'm03', s: 's12', label: { uk: 'MOSFET', en: 'The MOSFET' } }, { m: 'm02', s: 's8', label: { uk: 'Котушка опирається змінам', en: 'A coil resists change' } }],
        fig: {
          svg: function (L) {
            return D.svg(380, 210, D.vcc(220, 25, '+5 V') + D.w([[220, 25], [220, 40], [300, 40]]) + D.dot(220, 40) + D.two('motor', 220, 40, 220, 100) + D.dot(220, 100) + D.w([[300, 40], [300, 52]]) + D.two('diode', 300, 100, 300, 52) + D.w([[300, 100], [220, 100]]) +
              D.w([[220, 100], [220, 122]]) + D.nmos(210, 150, { pins: true }) + D.w([[220, 178], [220, 186]]) + D.gnd(220, 186) + D.w([[184, 150], [140, 150]]) + D.two('res', 90, 150, 140, 150, { label: '100 Ω' }) + D.w([[60, 150], [90, 150]]) +
              D.t(56, 140, 'MCU', 'lbl', 'end') + D.t(314, 72, L({ uk: 'захисний', en: 'flyback' }), 'txm', 'start') + D.t(314, 87, L({ uk: 'діод', en: 'diode' }), 'txm', 'start'));
          }
        }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: пищалка на польотному контролері', en: 'Device: the buzzer on a flight controller' },
        body: {
          uk: '<p>Майданчики «BZ+» і «BZ−» на польотному контролері — це саме такий ключ. «BZ+» з’єднаний із 5 В, «BZ−» — зі стоком транзистора на платі. Процесор вмикає транзистор, і пищалка звучить — наприклад, коли треба знайти дрон після падіння.</p>',
          en: '<p>The “BZ+” and “BZ−” pads on a flight controller are exactly such a switch. “BZ+” is tied to 5 V, “BZ−” to the drain of a transistor on the board. The processor turns the transistor on and the buzzer sounds — for example, to find a downed drone.</p>'
        }
      },
      {
        kind: 5,
        title: { uk: 'На платі: підтяжки біля мікросхеми', en: 'On the board: pull-ups next to a chip' },
        body: {
          uk: '<p>Біля мікросхеми — резистори з кодом «473» = 47 кОм. Такі великі номінали біля входів часто працюють як підтяжки або частини дільників. Мікросхема 4558 — подвійний операційний підсилювач у корпусі на 8 виводів.</p>',
          en: '<p>Next to the chip are resistors coded “473” = 47 kΩ. Such large values near inputs often work as pull-ups or parts of dividers. The 4558 chip is a dual operational amplifier in an 8-pin package.</p>'
        },
        recall: [{ m: 'm02', s: 's4', label: { uk: 'Код SMD-резисторів', en: 'SMD resistor codes' } }, { m: 'm04', s: 's6', label: { uk: 'Вивід 1', en: 'Pin 1' } }],
        fig: {
          photo: 'r2-150',
          hot: [
            { id: 'u', p: [30, 30, 39, 50], label: { uk: 'Мікросхема 4558 (8 виводів)', en: 'The 4558 chip (8 pins)' }, info: { uk: 'подвійний операційний підсилювач', en: 'a dual operational amplifier' } },
            { id: 'p1', p: [35, 79, 8, 17], label: { uk: 'Вивід 1', en: 'Pin 1' }, info: { uk: 'біля круглої ямки на корпусі', en: 'next to the round dimple' } },
            { id: 'r473', p: [80, 42, 17, 11], label: { uk: 'Резистор «473» = 47 кОм', en: 'Resistor “473” = 47 kΩ' } },
            { id: 'r10e', p: [0, 5, 8, 20], label: { uk: 'Резистор «10E» = 10 Ом', en: 'Resistor “10E” = 10 Ω' }, info: { uk: 'літера E тут означає «Ом»', en: 'the letter E stands for “ohm” here' } }
          ]
        }
      }
    ],
    sources: [
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид., 2015 — розділи 1.2.3 (дільник), 1.4 (RC), 2.2 (ключі)', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed., 2015 — sections 1.2.3 (divider), 1.4 (RC), 2.2 (switches)' } },
      { t: { uk: 'Документація Betaflight — налаштування масштабу вимірювання напруги (vbat_scale)', en: 'Betaflight documentation — voltage measurement scale setting (vbat_scale)' }, url: 'https://betaflight.com/docs/' }
    ],
    quiz: [
      { type: 'calc', see: { m: 'm06', s: 's1' }, gen: function (R, c) {
          var a = R.pick([1, 2.2, 4.7, 10, 22]), b = R.pick([1, 3.3, 4.7, 10, 47]), s = a + b, p = a * b / (a + b);
          var o = c.numOpts(s, [p, Math.abs(a - b) || a * 2, a * b], { uk: 'кОм', en: 'kΩ' }, 1);
          return { q: { uk: 'Резистори ' + c.fmt(a) + ' кОм і ' + c.fmt(b) + ' кОм з’єднано <b>послідовно</b>. Загальний опір?', en: 'Resistors of ' + c.fmt(a) + ' kΩ and ' + c.fmt(b) + ' kΩ in <b>series</b>. Total resistance?' }, opts: o.opts, a: 0,
            ex: { uk: 'Послідовно опори додаються: ' + c.fmt(a) + ' + ' + c.fmt(b) + ' = ' + c.fmt(s, 1) + ' кОм.', en: 'In series, resistances add: ' + c.fmt(a) + ' + ' + c.fmt(b) + ' = ' + c.fmt(s, 1) + ' kΩ.' } };
        } },
      { q: { uk: 'Два однакові резистори по 10 кОм з’єднано паралельно. Загальний опір?', en: 'Two equal 10 kΩ resistors in parallel. Total resistance?' }, opts: [{ uk: '5 кОм', en: '5 kΩ' }, { uk: '20 кОм', en: '20 kΩ' }, { uk: '10 кОм', en: '10 kΩ' }, { uk: '100 кОм', en: '100 kΩ' }], a: 0,
        ex: { uk: 'Два однакові паралельно — половина одного.', en: 'Two equal ones in parallel give half of one.' }, see: { m: 'm06', s: 's1' } },
      { q: { uk: 'Що дає з’єднання банок батареї <b>послідовно</b>?', en: 'What does connecting battery cells in <b>series</b> do?' }, opts: [{ uk: 'Напруги додаються', en: 'Voltages add' }, { uk: 'Ємності додаються, напруга та сама', en: 'Capacities add, voltage stays' }, { uk: 'Напруга зменшується', en: 'Voltage drops' }, { uk: 'Нічого не змінюється', en: 'Nothing changes' }], a: 0,
        ex: { uk: 'Послідовно — S: напруги додаються. Паралельно — P: ємності.', en: 'Series (S) adds voltages. Parallel (P) adds capacity.' }, see: { m: 'm06', s: 's1' } },
      { type: 'calc', see: { m: 'm06', s: 's2' }, gen: function (R, c) {
          var vin = R.pick([5, 9, 12, 24]), pr = R.pick([[10, 10], [10, 5], [20, 10], [30, 10], [10, 30]]), vo = vin * pr[1] / (pr[0] + pr[1]);
          var o = c.numOpts(vo, [vin * pr[0] / (pr[0] + pr[1]), vin / 2 === vo ? vin / 3 : vin / 2, vin * pr[1] / pr[0]], V, 2);
          return { q: { uk: 'Дільник: Uвх = ' + vin + ' В, R1 = ' + pr[0] + ' кОм (вгорі), R2 = ' + pr[1] + ' кОм (внизу). Uвих = ?', en: 'Divider: Uin = ' + vin + ' V, R1 = ' + pr[0] + ' kΩ (top), R2 = ' + pr[1] + ' kΩ (bottom). Uout = ?' }, opts: o.opts, a: 0,
            ex: { uk: 'Uвих = ' + vin + ' × ' + pr[1] + ' / (' + pr[0] + ' + ' + pr[1] + ') = ' + c.fmt(vo, 2) + ' В.', en: 'Uout = ' + vin + ' × ' + pr[1] + ' / (' + pr[0] + ' + ' + pr[1] + ') = ' + c.fmt(vo, 2) + ' V.' } };
        } },
      { q: { uk: 'Дільник з двох <b>однакових</b> резисторів дає на виході…', en: 'A divider made of two <b>equal</b> resistors outputs…' }, opts: [{ uk: 'Половину вхідної напруги', en: 'Half of the input voltage' }, { uk: 'Всю вхідну напругу', en: 'The full input voltage' }, { uk: 'Подвоєну напругу', en: 'Double the voltage' }, { uk: 'Нуль', en: 'Zero' }], a: 0,
        ex: { uk: 'R2 / (R1 + R2) = 1/2.', en: 'R2 / (R1 + R2) = 1/2.' }, see: { m: 'm06', s: 's2' } },
      { q: { uk: 'Навіщо польотному контролеру дільник на вході напруги батареї?', en: 'Why does a flight controller need a divider on the battery voltage input?' }, opts: [{ uk: 'Процесор вимірює лише до ~3,3 В, а батарея — до 25 В', en: 'The processor measures only up to ~3.3 V, the battery goes to 25 V' }, { uk: 'Щоб заряджати батарею', en: 'To charge the battery' }, { uk: 'Щоб підвищити напругу', en: 'To raise the voltage' }, { uk: 'Щоб живити відеопередавач', en: 'To power the video transmitter' }], a: 0,
        ex: { uk: 'Дільник зменшує напругу до безпечного рівня; прошивка множить назад.', en: 'The divider scales the voltage down to a safe level; firmware scales it back.' }, see: { m: 'm06', s: 's3' } },
      { q: { uk: 'У польоті OSD показує неправильну напругу батареї, а батарея справна. Що перевірити першим?', en: 'In flight the OSD shows the wrong battery voltage, but the battery is fine. What do you check first?' }, opts: [{ uk: 'Коефіцієнт масштабу (дільника) в налаштуваннях прошивки', en: 'The voltage scale (divider) setting in the firmware' }, { uk: 'Колір проводів', en: 'The wire colours' }, { uk: 'Канал відеопередавача', en: 'The video channel' }, { uk: 'Пропелери', en: 'The propellers' }], a: 0,
        ex: { uk: 'Якщо коефіцієнт не відповідає дільнику на платі, показання брешуть.', en: 'If the scale does not match the board’s divider, the reading lies.' }, see: { m: 'm06', s: 's3' } },
      { type: 'calc', see: { m: 'm06', s: 's4' }, gen: function (R, c) {
          var vs = R.pick([5, 9, 12]), led = R.pick([{ v: 2, uk: 'червоний', en: 'red' }, { v: 3, uk: 'синій', en: 'blue' }]), mA = R.pick([10, 20]), r = (vs - led.v) / (mA / 1000);
          var o = c.numOpts(r, [vs / (mA / 1000), led.v / (mA / 1000), (vs + led.v) / (mA / 1000)], OHM, 0);
          return { q: { uk: 'Живлення ' + vs + ' В, ' + led.uk + ' світлодіод (≈' + led.v + ' В), струм ' + mA + ' мА. Який резистор потрібен?', en: 'A ' + vs + ' V supply, a ' + led.en + ' LED (≈' + led.v + ' V), ' + mA + ' mA. Which resistor is needed?' }, opts: o.opts, a: 0,
            ex: { uk: 'R = (' + vs + ' − ' + led.v + ') / ' + c.fmt(mA / 1000, 3) + ' = ' + c.fmt(r, 0) + ' Ом.', en: 'R = (' + vs + ' − ' + led.v + ') / ' + c.fmt(mA / 1000, 3) + ' = ' + c.fmt(r, 0) + ' Ω.' } };
        } },
      { q: { uk: 'Розрахунок дав 300 Ом, а є лише 270, 330 і 390 Ом. Що взяти?', en: 'The calculation gives 300 Ω, but you only have 270, 330 and 390 Ω. Which one?' }, opts: [{ uk: '330 Ом — найближчий більший', en: '330 Ω — the nearest larger value' }, { uk: '270 Ом — найближчий менший', en: '270 Ω — the nearest smaller value' }, { uk: 'Жоден не підійде', en: 'None will do' }, { uk: 'Без резистора', en: 'No resistor' }], a: 0,
        ex: { uk: 'Більший опір — трохи менший струм, безпечніше для світлодіода.', en: 'A larger resistance means slightly less current — safer for the LED.' }, see: { m: 'm06', s: 's4' } },
      { q: { uk: 'Що відбувається з входом мікросхеми, не підключеним ні до чого?', en: 'What happens to a chip input connected to nothing?' }, opts: [{ uk: 'Він «висить у повітрі» і ловить завади: то 0, то 1', en: 'It floats and picks up noise: flipping between 0 and 1' }, { uk: 'Він завжди дорівнює 0', en: 'It is always 0' }, { uk: 'Він завжди дорівнює 1', en: 'It is always 1' }, { uk: 'Мікросхема вимикається', en: 'The chip shuts down' }], a: 0,
        ex: { uk: 'Тому входи підтягують резистором до живлення або землі.', en: 'That is why inputs are pulled up or down with a resistor.' }, see: { m: 'm06', s: 's5' } },
      { q: { uk: 'Підтягувальний резистор (pull-up) з’єднує вхід із…', en: 'A pull-up resistor connects an input to…' }, opts: [{ uk: 'Живленням — щоб у спокої там була «1»', en: 'The supply — so it reads “1” at rest' }, { uk: 'Землею — щоб там був «0»', en: 'Ground — so it reads “0”' }, { uk: 'Антеною', en: 'The antenna' }, { uk: 'Батареєю напряму, без резистора', en: 'The battery directly, no resistor' }], a: 0,
        ex: { uk: 'Pull-up тягне до живлення, pull-down — до землі.', en: 'A pull-up pulls to the supply, a pull-down to ground.' }, see: { m: 'm06', s: 's6' } },
      { q: { uk: 'На яких лініях майже завжди є підтяжки?', en: 'Which lines almost always have pull-ups?' }, opts: [{ uk: 'SDA і SCL шини I²C', en: 'The I²C lines, SDA and SCL' }, { uk: 'Силові дроти батареї', en: 'The battery power wires' }, { uk: 'Обмотки двигуна', en: 'Motor windings' }, { uk: 'Антенний кабель', en: 'The antenna cable' }], a: 0,
        ex: { uk: 'Шина I²C працює лише з підтягувальними резисторами.', en: 'The I²C bus works only with pull-up resistors.' }, see: { m: 'm06', s: 's6' } },
      { type: 'calc', see: { m: 'm06', s: 's7' }, gen: function (R, c) {
          var r = R.pick([1, 10, 100]), cu = R.pick([1, 10, 100]), t = r * 1000 * cu / 1e6;
          var o = c.numOpts(t, [t * 10, t / 10, t * 1000], { uk: 'с', en: 's' }, 3);
          return { q: { uk: 'RC-фільтр: R = ' + r + ' кОм, C = ' + cu + ' мкФ. Яка стала часу τ?', en: 'RC filter: R = ' + r + ' kΩ, C = ' + cu + ' µF. What is the time constant τ?' }, opts: o.opts, a: 0,
            ex: { uk: 'τ = R × C = ' + (r * 1000) + ' Ом × ' + c.fmt(cu / 1e6, 6) + ' Ф = ' + c.fmt(t, 3) + ' с.', en: 'τ = R × C = ' + (r * 1000) + ' Ω × ' + c.fmt(cu / 1e6, 6) + ' F = ' + c.fmt(t, 3) + ' s.' } };
        } },
      { q: { uk: 'Що робить RC-фільтр із сигналом?', en: 'What does an RC filter do to a signal?' }, opts: [{ uk: 'Згладжує швидкі стрибки, пропускає повільні зміни', en: 'Smooths fast jumps, passes slow changes' }, { uk: 'Підсилює сигнал', en: 'Amplifies the signal' }, { uk: 'Перетворює AC на DC', en: 'Turns AC into DC' }, { uk: 'Подвоює частоту', en: 'Doubles the frequency' }], a: 0,
        ex: { uk: 'Конденсатор не встигає за швидкими змінами — вони згладжуються.', en: 'The capacitor can’t follow fast changes, so they are smoothed out.' }, see: { m: 'm06', s: 's7' } },
      { q: { uk: 'На скільки відсотків заряджається конденсатор за один час τ?', en: 'How far does a capacitor charge in one time constant τ?' }, opts: [{ uk: '≈63 %', en: '≈63%' }, { uk: '100 %', en: '100%' }, { uk: '50 %', en: '50%' }, { uk: '10 %', en: '10%' }], a: 0,
        ex: { uk: 'За τ — ≈63 %, за 5τ — майже повністю.', en: 'In one τ — ≈63%; in 5τ — almost fully.' }, see: { m: 'm06', s: 's7' } },
      { q: { uk: 'Чому мікроконтролер не вмикає двигун напряму своїм виводом?', en: 'Why doesn’t a microcontroller drive a motor directly from its pin?' }, opts: [{ uk: 'Вивід дає лише кілька мА — потрібен транзисторний ключ', en: 'A pin supplies only a few mA — a transistor switch is needed' }, { uk: 'Двигун працює лише на змінному струмі', en: 'The motor runs only on AC' }, { uk: 'Це заборонено правилами', en: 'It’s against the rules' }, { uk: 'Вивід дає надто велику напругу', en: 'The pin voltage is too high' }], a: 0,
        ex: { uk: 'Процесор лише керує; великий струм іде через MOSFET.', en: 'The processor only controls; the big current flows through a MOSFET.' }, see: { m: 'm06', s: 's8' } },
      { q: { uk: 'Навіщо діод паралельно двигуну чи реле в ключовій схемі?', en: 'Why is there a diode across a motor or relay in a switch circuit?' }, opts: [{ uk: 'Дає безпечний шлях струму котушки при вимиканні, гасить сплеск', en: 'It gives the coil current a safe path at switch-off, killing the spike' }, { uk: 'Щоб двигун крутився в обидва боки', en: 'So the motor can turn both ways' }, { uk: 'Показує, що двигун працює', en: 'It shows the motor is running' }, { uk: 'Випрямляє струм', en: 'It rectifies the current' }], a: 0,
        ex: { uk: 'Котушка опирається зміні струму й дає сплеск; діод його гасить.', en: 'A coil resists the change in current and throws a spike; the diode absorbs it.' }, see: { m: 'm06', s: 's8' } },
      { q: { uk: 'Що таке майданчики BZ+ і BZ− на польотному контролері?', en: 'What are the BZ+ and BZ− pads on a flight controller?' }, opts: [{ uk: 'Підключення пищалки через транзисторний ключ', en: 'A buzzer connection through a transistor switch' }, { uk: 'Живлення батареї', en: 'Battery power' }, { uk: 'Шина I²C', en: 'An I²C bus' }, { uk: 'Вхід відеосигналу', en: 'A video input' }], a: 0,
        ex: { uk: 'BZ+ — 5 В, BZ− — стік ключа. Процесор вмикає пищалку.', en: 'BZ+ is 5 V, BZ− is the switch drain. The processor turns on the buzzer.' }, see: { m: 'm06', s: 's9' } },
      { type: 'tap', q: { uk: 'Торкаємося резистора <b>47 кОм</b>.', en: 'Tap the <b>47 kΩ</b> resistor.' },
        fig: { photo: 'r2-150', hot: [{ id: 'r473', p: [80, 42, 17, 11] }, { id: 'r10e', p: [0, 5, 8, 20] }, { id: 'u', p: [30, 30, 39, 50] }, { id: 'p1', p: [35, 79, 8, 17] }, { id: 'eh', p: [80, 59, 17, 11] }] },
        a: 'r473', ex: { uk: '«473» = 47 і три нулі = 47 000 Ом.', en: '“473” = 47 plus three zeros = 47,000 Ω.' }, see: { m: 'm06', s: 's10' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>виводу 1</b> мікросхеми 4558.', en: 'Tap <b>pin 1</b> of the 4558 chip.' },
        fig: { photo: 'r2-150', hot: [{ id: 'p1', p: [35, 79, 8, 17] }, { id: 'p8', p: [35, 10, 8, 17] }, { id: 'p4', p: [58, 79, 8, 17] }, { id: 'p5', p: [58, 10, 8, 17] }] },
        a: 'p1', ex: { uk: 'Ямка — ліворуч унизу, отже вивід 1 — лівий нижній. Далі 2–4 направо, 5–8 угорі справа наліво.', en: 'The dimple is bottom left, so pin 1 is the bottom-left lead. Then 2–4 to the right, 5–8 along the top from right to left.' }, see: { m: 'm04', s: 's6' } }
    ]
  });
})();
