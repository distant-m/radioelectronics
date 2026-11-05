/* Module 3 — Semiconductors: diodes and transistors */
(function () {
  APP.module({
    id: 'm03', n: 3, part: 'A', cv: 1,
    title: { uk: 'Діоди та транзистори', en: 'Diodes and transistors' },
    short: { uk: 'Клапан, ліхтарик, вимикач і підсилювач', en: 'A valve, a light, a switch and an amplifier' },
    intro: {
      uk: 'Напівпровідники — «розумні» деталі. Діод пропускає струм лише в один бік, транзистор дозволяє маленькому сигналу керувати великим струмом. Із цього зроблено все: від зарядки телефона до регулятора обертів дрона.',
      en: 'Semiconductors are the “smart” parts. A diode passes current only one way; a transistor lets a small signal control a big current. Everything is built from this, from a phone charger to a drone’s speed controller.'
    },
    warm: ['m02q14', 'm02q10', 'm01q02'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Діод — клапан в один бік', en: 'A diode is a one-way valve' },
        body: {
          uk: '<p>Діод пропускає струм від <b>анода</b> до <b>катода</b> і не пропускає назад. На схемі трикутник показує, куди можна текти струму, а риска — «стіна».</p><p>На корпусі катод позначають <b>смугою</b> — так само, як риску на символі.</p>',
          en: '<p>A diode passes current from the <b>anode</b> to the <b>cathode</b> and blocks it the other way. On a schematic, the triangle points where current may flow and the bar is the “wall”.</p><p>On the body, the cathode is marked with a <b>stripe</b> — just like the bar on the symbol.</p>'
        },
        fig: { anim: 'diode', cap: { uk: 'Перевертаємо батарею — і світлодіод згасає.', en: 'Flip the battery and the LED goes dark.' } }
      },
      {
        kind: 2,
        title: { uk: 'Справжній діод: де катод', en: 'A real diode: where the cathode is' },
        body: {
          uk: '<p>1N4007 — найпоширеніший випрямний діод (до 1 А, до 1000 В). Сіра смуга — катод.</p><p>На діоді відкритому в прямому напрямі завжди «губиться» трохи напруги: у звичайного кремнієвого ≈0,6–0,7 В, у діода Шотткі — ≈0,2–0,4 В. Тому Шотткі ставлять там, де кожна десята вольта на рахунку.</p>',
          en: '<p>The 1N4007 is the most common rectifier diode (up to 1 A, up to 1000 V). The grey stripe is the cathode.</p><p>A conducting diode always “loses” a little voltage: ≈0.6–0.7 V for an ordinary silicon diode, ≈0.2–0.4 V for a Schottky. That is why Schottkys go where every tenth of a volt counts.</p>'
        },
        fig: { photo: 'r1-044' }
      },
      {
        kind: 5,
        title: { uk: 'SMD-діоди', en: 'SMD diodes' },
        body: {
          uk: '<p>На платі діоди — чорні прямокутники з двома виводами. Смуга чи риска на корпусі — катод, як і в більших. Код на корпусі («KE», «B2») — скорочена назва; її шукають у таблиці виробника.</p>',
          en: '<p>On a board, diodes are black rectangles with two leads. A stripe or bar on the body is the cathode, just like the big ones. The code on the body (“KE”, “B2”) is a short name, looked up in the maker’s table.</p>'
        },
        fig: { photo: 'r2-128', cap: { uk: 'Діод Шотткі в корпусі SOD-123, маркування «B2». Риска ліворуч — катод.', en: 'A Schottky diode in a SOD-123 package, marked “B2”. The bar on the left is the cathode.' } }
      },
      {
        kind: 2,
        title: { uk: 'Світлодіод — діод, що світиться', en: 'An LED is a diode that glows' },
        body: {
          uk: '<p>Світлодіод (LED) — це теж діод: світить лише в прямому напрямі. <b>Довга ніжка</b> — анод (+), коротка — катод (−).</p><div class="key">Світлодіод завжди вмикають через резистор, інакше струм буде надто великий і він згорить.</div><p>Розрахунок цього резистора — у модулі 6.</p>',
          en: '<p>A light-emitting diode (LED) is still a diode: it lights only in the forward direction. The <b>long leg</b> is the anode (+), the short one the cathode (−).</p><div class="key">An LED is always driven through a resistor, otherwise the current is too high and it burns out.</div><p>Calculating that resistor comes in module 6.</p>'
        },
        fig: { photo: 'r1-059' }
      },
      {
        kind: 5,
        title: { uk: 'Світлодіоди на платі', en: 'LEDs on a board' },
        body: {
          uk: '<p>На платах світлодіоди позначають <b>D</b> або <b>LED</b>. На польотному контролері вони показують стан: живлення, «armed», режим. На фото — двокольоровий SMD-світлодіод D1.</p>',
          en: '<p>On boards, LEDs are labelled <b>D</b> or <b>LED</b>. On a flight controller they show status: power, “armed”, mode. The photo shows a two-colour SMD LED, D1.</p>'
        },
        fig: { photo: 'r1-060' }
      },
      {
        kind: 1,
        title: { uk: 'Стабілітрон і TVS-діод: захисники', en: 'Zener and TVS diodes: the protectors' },
        body: {
          uk: '<p><b>Стабілітрон</b> (діод Зенера) вмикають «навпаки». Поки напруга нижча за його поріг — він закритий. Щойно вище — відкривається й не дає напрузі рости. Так отримують стабільну опорну напругу: 3,3 В, 5,1 В тощо.</p><p><b>TVS-діод</b> — «запобіжний клапан» від коротких сплесків: при перенапрузі за мить відводить її на землю. Його ставлять на входи живлення й роз’єми.</p>',
          en: '<p>A <b>Zener diode</b> is connected “backwards”. While the voltage is below its threshold, it stays closed. Above it, it opens and stops the voltage from rising. That gives a stable reference: 3.3 V, 5.1 V and so on.</p><p>A <b>TVS diode</b> is a “safety valve” against short spikes: on overvoltage it dumps it to ground in an instant. It sits on power inputs and connectors.</p>'
        },
        fig: { photo: 'r1-053', cap: { uk: 'Стабілітрон у скляному корпусі. Чорна смуга — катод.', en: 'A Zener diode in a glass body. The black stripe is the cathode.' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо 4 діоди: випрямляч', en: 'Combine 4 diodes: a rectifier' },
        body: {
          uk: '<p>Змінний струм змінює напрям. Один діод просто відріже половину хвилі. А <b>міст із чотирьох діодів</b> спрямує обидві половини в один бік — вийде <b>пульсуюча</b> напруга одного знака.</p><p>Додаємо <b>конденсатор</b> — він заряджається на вершинах і віддає енергію в «провалах». Напруга стає майже рівною — постійною.</p>',
          en: '<p>Alternating current keeps changing direction. One diode just cuts off half the wave. A <b>bridge of four diodes</b> steers both halves the same way — giving a <b>pulsing</b> voltage of one polarity.</p><p>Add a <b>capacitor</b> — it charges at the peaks and gives energy back in the dips. The voltage becomes nearly flat: DC.</p>'
        },
        recall: [{ m: 'm02', s: 's5', label: { uk: 'Конденсатор накопичує заряд', en: 'A capacitor stores charge' } }, { m: 'm01', s: 's4', label: { uk: 'Змінний і постійний струм', en: 'AC and DC' } }],
        fig: { anim: 'rectifier', opts: { mode: 'full' }, cap: { uk: 'Спершу 1 діод, потім міст, потім додаємо конденсатор.', en: 'First 1 diode, then the bridge, then add the capacitor.' } }
      },
      {
        kind: 3,
        title: { uk: 'Як виглядає діодний міст на схемі', en: 'What a diode bridge looks like on a schematic' },
        body: {
          uk: '<p>Чотири діоди, складені ромбом. Змінний струм заходить зліва і справа, постійний виходить згори (+) і знизу (−). Простежмо пальцем: у кожну половину хвилі струм іде через два діоди, і завжди однаково через навантаження.</p>',
          en: '<p>Four diodes arranged in a diamond. AC comes in left and right; DC leaves at the top (+) and bottom (−). Trace it with a finger: in each half of the wave current passes two diodes and always goes the same way through the load.</p>'
        },
        fig: {
          svg: function (L) {
            var s = '';
            s += D.two('diode', 110, 110, 160, 60) + D.two('diode', 160, 160, 210, 110);
            s += D.two('diode', 110, 110, 160, 160, {}) ;
            s = '';
            // left node (110,110), top (160,60), right (210,110), bottom (160,160). Current flows bottom→left→top and bottom→right→top
            s += D.two('diode', 110, 110, 160, 60) + D.two('diode', 210, 110, 160, 60) + D.two('diode', 160, 160, 110, 110) + D.two('diode', 160, 160, 210, 110);
            s += D.dot(110, 110) + D.dot(210, 110) + D.dot(160, 60) + D.dot(160, 160);
            s += D.w([[110, 110], [40, 110]]) + D.w([[210, 110], [240, 110], [240, 200], [40, 200], [40, 160]]) + D.two('ac', 40, 110, 40, 160);
            s += D.w([[160, 60], [160, 30], [330, 30], [330, 70]]) + D.two('res', 330, 70, 330, 130, { label: 'R', side: 'r' }) + D.w([[330, 130], [330, 230], [160, 230], [160, 160]]);
            s += D.t(300, 22, '+', 'lbl') + D.t(300, 248, '−', 'lbl') + D.t(18, 140, '~', 'lbl');
            s += D.t(370, 104, L({ uk: 'навант.', en: 'load' }), 'txm', 'end');
            return D.svg(380, 260, s);
          },
          cap: { uk: 'Діодний міст: два «~» входи і два виходи «+» та «−».', en: 'A diode bridge: two “~” inputs and two outputs, “+” and “−”.' }
        }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: блок живлення і захист від переплутаної полярності', en: 'Device: a power supply and reverse-polarity protection' },
        body: {
          uk: '<p>Кожен зарядний пристрій з розетки робить саме це: випрямляє змінний струм діодним мостом і згладжує конденсатором.</p><p>Друге застосування — <b>захист</b>. Діод, поставлений послідовно з живленням, просто не пропустить струм, якщо батарею підключити навпаки. Ціна — ті самі 0,3–0,7 В втрат, тому в потужних колах замість діода ставлять транзистор.</p>',
          en: '<p>Every wall charger does exactly this: it rectifies AC with a diode bridge and smooths it with a capacitor.</p><p>A second use is <b>protection</b>. A diode in series with the supply simply blocks current if the battery is connected backwards. The price is that 0.3–0.7 V loss, so high-power circuits use a transistor instead.</p>'
        }
      },
      {
        kind: 1,
        title: { uk: 'Транзистор: малий струм керує великим', en: 'A transistor: a small current controls a big one' },
        body: {
          uk: '<p><b>Біполярний транзистор</b> має три виводи: база (Б), колектор (К), емітер (Е). Маленький струм у базу відкриває великий струм від колектора до емітера — як палець, що відкриває кран.</p><p>Так транзистор працює <b>підсилювачем</b> (слабкий сигнал → сильний) або <b>ключем</b> (увімкнено / вимкнено).</p><p>На схемі стрілка на емітері показує напрям струму. Найпоширеніший малий корпус — TO-92 (чорна «напівкругла» таблетка) або крихітний SOT-23 на платі.</p>',
          en: '<p>A <b>bipolar transistor</b> has three leads: base (B), collector (C), emitter (E). A small current into the base lets a big current flow from collector to emitter — like a finger opening a tap.</p><p>That makes a transistor an <b>amplifier</b> (weak signal → strong) or a <b>switch</b> (on / off).</p><p>On a schematic, the arrow on the emitter shows the current direction. The common small packages are TO-92 (a black “half-round” pill) or the tiny SOT-23 on boards.</p>'
        },
        fig: {
          svg: function (L) {
            return D.svg(380, 140, D.npn(110, 70, {}) + D.t(80, 64, L({ uk: 'база', en: 'base' }), 'txm', 'end') + D.t(130, 30, L({ uk: 'колектор', en: 'collector' }), 'txm', 'start') + D.t(130, 118, L({ uk: 'емітер', en: 'emitter' }), 'txm', 'start') +
              D.t(250, 50, L({ uk: 'NPN-транзистор', en: 'NPN transistor' }), 'lbl', 'middle') + D.t(250, 72, L({ uk: 'малий струм у базу →', en: 'small current into base →' }), 'txm', 'middle') + D.t(250, 90, L({ uk: 'великий струм К → Е', en: 'big current C → E' }), 'txm', 'middle'));
          }
        }
      },
      {
        kind: 2,
        title: { uk: 'Транзистори в корпусі TO-92', en: 'Transistors in TO-92 packages' },
        body: { uk: '<p>Той самий корпус з чотирьох боків і лінійка для масштабу: ~5 мм завширшки.</p>', en: '<p>The same package from four sides with a ruler for scale: about 5 mm wide.</p>' },
        fig: { photo: 'r1-063' }
      },
      {
        kind: 1,
        title: { uk: 'Польовий транзистор (MOSFET): керує напругою', en: 'The MOSFET: controlled by voltage' },
        body: {
          uk: '<p>MOSFET — головний силовий транзистор сучасної електроніки. Його виводи: <b>затвор (G)</b>, <b>стік (D)</b>, <b>витік (S)</b>.</p><ul><li>Подали напругу на затвор (відносно витоку) — канал між стоком і витоком відкрився, тече великий струм.</li><li>Зняли напругу — канал закрився.</li><li>Затвор майже не споживає струму: ним можна керувати прямо з виводу мікроконтролера (якщо транзистор розрахований на «логічний» рівень).</li></ul><p>Відкритий MOSFET має дуже малий опір — соті й тисячні частки ома. Тому він майже не гріється навіть при десятках ампер.</p>',
          en: '<p>The MOSFET is the main power transistor of modern electronics. Its pins: <b>gate (G)</b>, <b>drain (D)</b>, <b>source (S)</b>.</p><ul><li>Put voltage on the gate (relative to the source) and the channel between drain and source opens: a big current flows.</li><li>Remove it and the channel closes.</li><li>The gate draws almost no current, so a microcontroller pin can drive it directly (if the transistor is rated for “logic level”).</li></ul><p>An open MOSFET has very low resistance — hundredths or thousandths of an ohm. That is why it barely warms up even at tens of amps.</p>'
        },
        fig: { anim: 'mosfet', cap: { uk: 'Маленька напруга на затворі вмикає двигун.', en: 'A small gate voltage turns on the motor.' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: швидке вмикання = регулювання (ШІМ)', en: 'Combine: fast switching = control (PWM)' },
        body: {
          uk: '<p>Якщо вмикати й вимикати транзистор тисячі разів на секунду, двигун «бачить» <b>середню</b> напругу. Частку часу «увімкнено» називають <b>заповненням</b> (duty cycle). 50 % — половина швидкості. Це <b>ШІМ</b> — широтно-імпульсна модуляція.</p><p>Транзистор при цьому або повністю відкритий, або закритий — тому майже не гріється. Так керують двигунами, яскравістю світлодіодів і перетворювачами напруги.</p>',
          en: '<p>Switch a transistor on and off thousands of times per second and the motor “sees” the <b>average</b> voltage. The share of “on” time is the <b>duty cycle</b>. 50% means half speed. This is <b>PWM</b> — pulse-width modulation.</p><p>The transistor is always either fully on or fully off, so it barely heats up. That is how motors, LED brightness and voltage converters are controlled.</p>'
        },
        fig: { anim: 'pwm' }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: регулятор обертів — це набір MOSFET-ів', en: 'Device: a speed controller is a set of MOSFETs' },
        body: {
          uk: '<p>Регулятор обертів (ESC) безколекторного двигуна містить <b>6 MOSFET-ів</b> на кожен двигун — по два на кожну з трьох фаз. Плата «4-в-1» для квадрокоптера — це 24 силові транзистори. Як саме вони крутять двигун — у модулі 8.</p><p>Силові MOSFET-и бувають різних корпусів: від великого TO-220 з отвором під радіатор до плоских, як на платах ESC.</p>',
          en: '<p>A brushless speed controller (ESC) has <b>6 MOSFETs</b> per motor — two for each of three phases. A “4-in-1” quadcopter board holds 24 power transistors. How they actually spin the motor is module 8.</p><p>Power MOSFETs come in many packages: from the large TO-220 with a hole for a heatsink to the flat ones on ESC boards.</p>'
        },
        fig: { photo: 'r1-068', cap: { uk: 'Різні корпуси силових транзисторів.', en: 'Various power transistor packages.' } }
      },
      {
        kind: 5,
        title: { uk: 'На платі: де затвор, стік і витік', en: 'On the board: gate, drain and source' },
        body: { uk: '<p>Тут виробник плати сам підписав виводи: G — D — S. Це стандартний порядок для корпусу TO-220. Металева пластина з отвором з’єднана зі стоком.</p>', en: '<p>Here the board maker labelled the pins: G — D — S. That is the standard order for a TO-220. The metal tab with the hole is connected to the drain.</p>' },
        fig: {
          photo: 'r1-072',
          hot: [
            { id: 'g', p: [55, 84, 9, 13], label: { uk: 'G — затвор', en: 'G — gate' }, info: { uk: 'сюди подають сигнал керування', en: 'the control signal goes here' } },
            { id: 'd', p: [65, 84, 9, 13], label: { uk: 'D — стік', en: 'D — drain' }, info: { uk: 'з’єднаний із металевою пластиною', en: 'connected to the metal tab' } },
            { id: 's', p: [76, 84, 9, 13], label: { uk: 'S — витік', en: 'S — source' } },
            { id: 'tab', p: [53, 13, 34, 26], label: { uk: 'Пластина для радіатора', en: 'Heatsink tab' }, info: { uk: 'відводить тепло; електрично — це стік', en: 'carries heat away; electrically it is the drain' } },
            { id: 'mark', p: [55, 52, 30, 18], label: { uk: 'Маркування: 24N25G', en: 'Marking: 24N25G' }, info: { uk: 'з нього шукають документацію', en: 'used to look up the datasheet' } }
          ]
        }
      }
    ],
    sources: [
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид., 2015 — розділи 1.6 (діоди), 2–3 (транзистори)', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed., 2015 — sections 1.6 (diodes), chapters 2–3 (transistors)' } },
      { t: { uk: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4-те вид., 2016 — розділ 4', en: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4th ed., 2016 — chapter 4' } },
      { t: { uk: 'Документація виробників на 1N4007 (напр., Vishay, onsemi) — граничні струм і напруга', en: 'Manufacturer datasheets for the 1N4007 (e.g. Vishay, onsemi) — current and voltage ratings' } }
    ],
    quiz: [
      { q: { uk: 'Як діод пропускає струм?', en: 'How does a diode pass current?' }, opts: [{ uk: 'Лише в одному напрямі: від анода до катода', en: 'Only one way: from anode to cathode' }, { uk: 'В обидва боки однаково', en: 'Both ways equally' }, { uk: 'Лише змінний струм', en: 'Only alternating current' }, { uk: 'Лише коли нагріється', en: 'Only once it warms up' }], a: 0,
        ex: { uk: 'Діод — клапан в один бік: анод → катод.', en: 'A diode is a one-way valve: anode → cathode.' }, see: { m: 'm03', s: 's1' } },
      { q: { uk: 'Що позначає смуга на корпусі діода?', en: 'What does the stripe on a diode body mark?' }, opts: [{ uk: 'Катод', en: 'The cathode' }, { uk: 'Анод', en: 'The anode' }, { uk: 'Максимальний струм', en: 'Maximum current' }, { uk: 'Що діод несправний', en: 'That the diode is faulty' }], a: 0,
        ex: { uk: 'Смуга відповідає рисці на символі — це катод.', en: 'The stripe matches the bar on the symbol — the cathode.' }, see: { m: 'm03', s: 's2' } },
      { q: { uk: 'Скільки напруги «губиться» на відкритому кремнієвому діоді?', en: 'How much voltage does a conducting silicon diode “lose”?' }, opts: [{ uk: '≈0,6–0,7 В', en: '≈0.6–0.7 V' }, { uk: '0 В', en: '0 V' }, { uk: '≈5 В', en: '≈5 V' }, { uk: 'Половину напруги джерела', en: 'Half of the supply voltage' }], a: 0,
        ex: { uk: 'Кремнієвий діод — 0,6–0,7 В, Шотткі — 0,2–0,4 В.', en: 'Silicon: 0.6–0.7 V; Schottky: 0.2–0.4 V.' }, see: { m: 'm03', s: 's2' } },
      { q: { uk: 'Чим цінний діод Шотткі?', en: 'What makes a Schottky diode valuable?' }, opts: [{ uk: 'Менше падіння напруги (≈0,2–0,4 В) і швидкість', en: 'A lower voltage drop (≈0.2–0.4 V) and speed' }, { uk: 'Він світиться', en: 'It glows' }, { uk: 'Він пропускає струм в обидва боки', en: 'It conducts both ways' }, { uk: 'Він стабілізує напругу 5 В', en: 'It regulates 5 V' }], a: 0,
        ex: { uk: 'Шотткі втрачає менше напруги, тому стоїть там, де кожна частка вольта важлива.', en: 'A Schottky loses less voltage, so it is used where every fraction of a volt matters.' }, see: { m: 'm03', s: 's2' } },
      { q: { uk: 'Яка ніжка світлодіода — анод (+)?', en: 'Which LED leg is the anode (+)?' }, opts: [{ uk: 'Довга', en: 'The long one' }, { uk: 'Коротка', en: 'The short one' }, { uk: 'Будь-яка', en: 'Either' }, { uk: 'Та, що ближче до пласкої грані', en: 'The one by the flat edge' }], a: 0,
        ex: { uk: 'Довга ніжка — анод. Плаский бік корпусу і коротка ніжка — катод.', en: 'The long leg is the anode. The flat edge and the short leg are the cathode.' }, see: { m: 'm03', s: 's4' } },
      { q: { uk: 'Чому світлодіод вмикають через резистор?', en: 'Why is an LED driven through a resistor?' }, opts: [{ uk: 'Щоб обмежити струм — інакше він згорить', en: 'To limit current — otherwise it burns out' }, { uk: 'Щоб він світив іншим кольором', en: 'To change its colour' }, { uk: 'Щоб перетворити змінний струм на постійний', en: 'To turn AC into DC' }, { uk: 'Резистор не потрібен', en: 'No resistor is needed' }], a: 0,
        ex: { uk: 'Без резистора струм через LED обмежує лише батарея — і він швидко згорає.', en: 'Without a resistor only the battery limits the LED current — and it burns out fast.' }, see: { m: 'm03', s: 's4' } },
      { q: { uk: 'Батарею в колі зі світлодіодом перевернули. Що буде?', en: 'The battery in an LED circuit is flipped. What happens?' }, opts: [{ uk: 'Світлодіод не світитиме — він закритий у зворотному напрямі', en: 'The LED stays dark — it is closed in reverse' }, { uk: 'Світитиме яскравіше', en: 'It glows brighter' }, { uk: 'Світитиме іншим кольором', en: 'It glows a different colour' }, { uk: 'Світитиме так само', en: 'It glows the same' }], a: 0,
        ex: { uk: 'LED — це діод: у зворотному напрямі струм не тече.', en: 'An LED is a diode: no current in reverse.' }, see: { m: 'm03', s: 's1' } },
      { q: { uk: 'Що робить стабілітрон (діод Зенера)?', en: 'What does a Zener diode do?' }, opts: [{ uk: 'Не дає напрузі піднятися вище свого порогу', en: 'Keeps the voltage from rising above its threshold' }, { uk: 'Світиться під напругою', en: 'Glows under voltage' }, { uk: 'Накопичує заряд', en: 'Stores charge' }, { uk: 'Підсилює радіосигнал', en: 'Amplifies a radio signal' }], a: 0,
        ex: { uk: 'Увімкнений «навпаки», він відкривається на своєму порозі й тримає напругу.', en: 'Connected “backwards”, it opens at its threshold and holds the voltage there.' }, see: { m: 'm03', s: 's6' } },
      { q: { uk: 'Для чого TVS-діод на вході живлення?', en: 'What is a TVS diode on a power input for?' }, opts: [{ uk: 'Захищає від коротких сплесків напруги', en: 'It protects against short voltage spikes' }, { uk: 'Показує, що живлення увімкнено', en: 'It shows the power is on' }, { uk: 'Перетворює 12 В на 5 В', en: 'It turns 12 V into 5 V' }, { uk: 'Згладжує пульсації', en: 'It smooths ripple' }], a: 0,
        ex: { uk: 'TVS миттєво відводить сплеск на землю, рятуючи решту схеми.', en: 'A TVS instantly dumps a spike to ground, saving the rest of the circuit.' }, see: { m: 'm03', s: 's6' } },
      { q: { uk: 'Що дає міст із чотирьох діодів, якщо на вхід подати змінний струм?', en: 'What does a bridge of four diodes produce from AC?' }, opts: [{ uk: 'Пульсуючу напругу одного знака', en: 'A pulsing voltage of one polarity' }, { uk: 'Ідеально рівну постійну напругу', en: 'Perfectly flat DC' }, { uk: 'Змінний струм удвічі вищої напруги', en: 'AC at double the voltage' }, { uk: 'Нічого — струм не пройде', en: 'Nothing — current won’t pass' }], a: 0,
        ex: { uk: 'Міст спрямовує обидві половини хвилі в один бік. Рівною напругу робить конденсатор.', en: 'The bridge steers both halves one way. A capacitor is what makes it flat.' }, see: { m: 'm03', s: 's7' } },
      { q: { uk: 'Що додають до діодного моста, щоб напруга стала майже рівною?', en: 'What is added to a diode bridge to make the voltage nearly flat?' }, opts: [{ uk: 'Конденсатор', en: 'A capacitor' }, { uk: 'Ще один діод', en: 'Another diode' }, { uk: 'Світлодіод', en: 'An LED' }, { uk: 'Потенціометр', en: 'A potentiometer' }], a: 0,
        ex: { uk: 'Конденсатор заряджається на вершинах і віддає енергію між ними.', en: 'The capacitor charges at the peaks and releases energy in between.' }, see: { m: 'm03', s: 's7' } },
      { q: { uk: 'Що буде, якщо замість моста поставити лише <b>один</b> діод?', en: 'What if a <b>single</b> diode replaces the bridge?' }, opts: [{ uk: 'Пройде лише половина хвилі — половина енергії втрачається', en: 'Only half the wave passes — half the energy is lost' }, { uk: 'Вийде те саме', en: 'Exactly the same result' }, { uk: 'Напруга подвоїться', en: 'The voltage doubles' }, { uk: 'Діод згорить одразу', en: 'The diode burns out instantly' }], a: 0,
        ex: { uk: 'Один діод — однопівперіодний випрямляч: нижні половини відрізано.', en: 'One diode is a half-wave rectifier: the lower halves are cut off.' }, see: { m: 'm03', s: 's7' } },
      { q: { uk: 'Як діод захищає від переплутаної полярності батареї?', en: 'How does a diode protect against a reversed battery?' }, opts: [{ uk: 'Стоїть послідовно й не пропускає струм у зворотному напрямі', en: 'It sits in series and blocks current in reverse' }, { uk: 'Перемикає полярність автоматично', en: 'It swaps polarity automatically' }, { uk: 'Подає звуковий сигнал', en: 'It beeps' }, { uk: 'Розряджає батарею', en: 'It drains the battery' }], a: 0,
        ex: { uk: 'Батарея навпаки — діод закритий, схема без струму, отже ціла.', en: 'Battery backwards — the diode is closed, no current reaches the circuit, so it survives.' }, see: { m: 'm03', s: 's9' } },
      { q: { uk: 'Які виводи в біполярного транзистора?', en: 'What are a bipolar transistor’s pins?' }, opts: [{ uk: 'База, колектор, емітер', en: 'Base, collector, emitter' }, { uk: 'Затвор, стік, витік', en: 'Gate, drain, source' }, { uk: 'Анод, катод', en: 'Anode, cathode' }, { uk: 'Плюс, мінус, земля', en: 'Plus, minus, ground' }], a: 0,
        ex: { uk: 'Біполярний: Б-К-Е. Польовий (MOSFET): G-D-S.', en: 'Bipolar: B-C-E. MOSFET: G-D-S.' }, see: { m: 'm03', s: 's10' } },
      { q: { uk: 'Що керує польовим транзистором (MOSFET)?', en: 'What controls a MOSFET?' }, opts: [{ uk: 'Напруга на затворі відносно витоку', en: 'The voltage on the gate relative to the source' }, { uk: 'Великий струм у затвор', en: 'A big current into the gate' }, { uk: 'Температура корпусу', en: 'The body temperature' }, { uk: 'Магніт поруч', en: 'A nearby magnet' }], a: 0,
        ex: { uk: 'MOSFET керується напругою; затвор майже не споживає струму.', en: 'A MOSFET is voltage-controlled; the gate draws almost no current.' }, see: { m: 'm03', s: 's12' } },
      { q: { uk: 'Чому відкритий MOSFET майже не гріється навіть при великому струмі?', en: 'Why does an open MOSFET barely warm up even at high current?' }, opts: [{ uk: 'Його опір у відкритому стані дуже малий', en: 'Its on-resistance is very small' }, { uk: 'Він охолоджується повітрям від гвинтів', en: 'Propeller air cools it' }, { uk: 'Струм іде повз нього', en: 'The current bypasses it' }, { uk: 'Він гріється, але це не видно', en: 'It does heat, you just can’t see it' }], a: 0,
        ex: { uk: 'Малий опір → мала потужність тепла (P = I²R).', en: 'Low resistance → little heat (P = I²R).' }, see: { m: 'm03', s: 's12' } },
      { type: 'calc', see: { m: 'm03', s: 's13' }, gen: function (R, c) {
          var v = R.pick([12, 16, 24]), d = R.pick([25, 40, 50, 60, 75]), vo = v * d / 100;
          var o = c.numOpts(vo, [v, v - vo, v * 100 / d], { uk: 'В', en: 'V' }, 1);
          return { q: { uk: 'ШІМ із заповненням ' + d + ' % від джерела ' + v + ' В. Яку середню напругу «бачить» двигун?', en: 'PWM at ' + d + '% duty from a ' + v + ' V supply. What average voltage does the motor “see”?' }, opts: o.opts, a: 0,
            ex: { uk: 'Середня = заповнення × напруга = ' + d + ' % × ' + v + ' = ' + c.fmt(vo, 1) + ' В.', en: 'Average = duty × voltage = ' + d + '% × ' + v + ' = ' + c.fmt(vo, 1) + ' V.' } };
        } },
      { q: { uk: 'Скільки силових MOSFET-ів у регуляторі обертів для <b>одного</b> безколекторного двигуна?', en: 'How many power MOSFETs does a speed controller for <b>one</b> brushless motor have?' }, opts: [{ uk: '6 (по два на кожну з трьох фаз)', en: '6 (two for each of three phases)' }, { uk: '1', en: '1' }, { uk: '3', en: '3' }, { uk: '24', en: '24' }], a: 0,
        ex: { uk: 'Три фази × два ключі = 6. А плата 4-в-1 — це 24.', en: 'Three phases × two switches = 6. A 4-in-1 board has 24.' }, see: { m: 'm03', s: 's14' } },
      { type: 'tap', q: { uk: 'Торкаємося виводу <b>затвора (G)</b> правого транзистора.', en: 'Tap the <b>gate (G)</b> pin of the right transistor.' },
        fig: { photo: 'r1-072', hot: [{ id: 'g', p: [55, 84, 9, 13] }, { id: 'd', p: [65, 84, 9, 13] }, { id: 's', p: [76, 84, 9, 13] }, { id: 'tab', p: [53, 13, 34, 26] }] },
        a: 'g', ex: { uk: 'Порядок TO-220: G — D — S зліва направо (маркуванням до себе).', en: 'TO-220 order: G — D — S, left to right (marking facing you).' }, see: { m: 'm03', s: 's15' } },
      { type: 'tap', q: { uk: 'Торкаємося деталі, яка електрично з’єднана зі <b>стоком</b>, але служить для відведення тепла.', en: 'Tap the part that is electrically the <b>drain</b> but serves to carry heat away.' },
        fig: { photo: 'r1-072', hot: [{ id: 'tab', p: [53, 13, 34, 26] }, { id: 'mark', p: [55, 52, 30, 18] }, { id: 'g', p: [55, 84, 9, 13] }, { id: 'lbl', p: [55, 93, 40, 7] }] },
        a: 'tab', ex: { uk: 'Металева пластина з отвором — для радіатора; вона з’єднана зі стоком.', en: 'The metal tab with the hole is for a heatsink; it is connected to the drain.' }, see: { m: 'm03', s: 's15' } }
    ]
  });
})();
