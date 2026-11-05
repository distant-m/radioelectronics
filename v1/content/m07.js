/* Module 7 — Power systems */
(function () {
  var V = { uk: 'В', en: 'V' }, W = { uk: 'Вт', en: 'W' };
  APP.module({
    id: 'm07', n: 7, part: 'B', cv: 1,
    title: { uk: 'Живлення: від батареї до мікросхеми', en: 'Power: from the battery to the chip' },
    short: { uk: 'Стабілізатори, понижувачі, BEC, датчик струму', en: 'Regulators, buck converters, BEC, current sensing' },
    intro: {
      uk: 'Батарея дає 15–25 В, процесор хоче 3,3 В, камера — 5 В, відеопередавач — 9–12 В. Цей модуль про те, як одна батарея «розкладається» на всі потрібні напруги і як ці вузли виглядають на платі.',
      en: 'The battery gives 15–25 V; the processor wants 3.3 V, the camera 5 V, the video transmitter 9–12 V. This module shows how one battery is split into all the voltages needed, and how those blocks look on a board.'
    },
    warm: ['m06q04', 'm02q14', 'm03q16'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Дерево живлення', en: 'The power tree' },
        body: {
          uk: '<p>У дроні напруги розходяться «гілками»:</p><ul><li><b>Батарея (VBAT)</b> напряму — регулятори обертів і двигуни, найбільший струм.</li><li><b>10–12 В</b> — відеопередавач, камера (часто окремий перетворювач).</li><li><b>5 В</b> — приймач, GPS, світлодіоди, пищалка.</li><li><b>3,3 В</b> — процесор, гіроскоп, барометр.</li></ul><p>Кожна гілка — окремий перетворювач напруги. Знайдемо їх на платі — і половину плати вже зрозуміли.</p>',
          en: '<p>In a drone, voltages split into “branches”:</p><ul><li><b>Battery (VBAT)</b> directly — speed controllers and motors, the biggest current.</li><li><b>10–12 V</b> — video transmitter, camera (often a separate converter).</li><li><b>5 V</b> — receiver, GPS, LEDs, buzzer.</li><li><b>3.3 V</b> — processor, gyro, barometer.</li></ul><p>Each branch is a separate voltage converter. Find them on a board and you already understand half of it.</p>'
        },
        recall: [{ m: 'm01', s: 's7', label: { uk: 'Батарея nS', en: 'The nS battery' } }],
        fig: {
          svg: function (L) {
            function b(x, y, a, c) { return D.chip(x, y, 104, 40, a, c); }
            var s = b(8, 80, 'VBAT', '4S–6S, 15–25 V');
            s += D.arrow(112, 100, 140, 28, 'cu') + b(140, 8, 'ESC', L({ uk: 'двигуни', en: 'motors' }));
            s += D.arrow(112, 100, 140, 76, 'cu') + b(140, 56, '10 V', 'VTX, ' + L({ uk: 'камера', en: 'camera' }));
            s += D.arrow(112, 100, 140, 124, 'cu') + b(140, 104, '5 V', 'RX, GPS, LED');
            s += D.arrow(244, 124, 266, 124, 'cu') + b(266, 104, '3,3 V', 'MCU, IMU');
            return D.svg(380, 160, s);
          }
        }
      },
      {
        kind: 1,
        title: { uk: 'Лінійний стабілізатор: зайве — в тепло', en: 'The linear regulator: excess becomes heat' },
        body: {
          uk: '<p>Найпростіший спосіб отримати меншу напругу — <b>лінійний стабілізатор</b> (7805, AMS1117). Він працює як «розумний резистор»: увесь надлишок напруги перетворює на тепло.</p><div class="formula">P<sub>тепла</sub> = (Uвх − Uвих) × I</div><p>12 В → 5 В при 1 А: (12 − 5) × 1 = <b>7 Вт</b> тепла! Тому лінійні ставлять лише там, де різниця напруг мала або струм маленький — наприклад, 5 В → 3,3 В для процесора.</p><p><b>LDO</b> (low dropout) — лінійний стабілізатор, якому досить дуже малої різниці між входом і виходом (кілька десятих вольта).</p>',
          en: '<p>The simplest way to get a lower voltage is a <b>linear regulator</b> (7805, AMS1117). It acts like a “smart resistor”: all the excess voltage turns into heat.</p><div class="formula">P<sub>heat</sub> = (Uin − Uout) × I</div><p>12 V → 5 V at 1 A: (12 − 5) × 1 = <b>7 W</b> of heat! So linear regulators are used only where the voltage difference is small or the current is low — for example 5 V → 3.3 V for a processor.</p><p>An <b>LDO</b> (low dropout) is a linear regulator that needs only a very small difference between input and output (a few tenths of a volt).</p>'
        },
        recall: [{ m: 'm05', s: 's6', label: { uk: 'Схема 7805', en: 'The 7805 schematic' } }, { m: 'm02', s: 's11', label: { uk: 'Блокувальний конденсатор', en: 'Decoupling capacitor' } }],
        fig: {
          photo: 'r1-096',
          hot: [
            { id: 'tab', p: [18, 4, 55, 25], label: { uk: 'Пластина для радіатора', en: 'Heatsink tab' }, info: { uk: 'з’єднана із середнім виводом — землею', en: 'connected to the middle pin — ground' } },
            { id: 'in', p: [29, 62, 11, 25], label: { uk: 'Вивід 1 — вхід', en: 'Pin 1 — input' } },
            { id: 'gnd', p: [42, 62, 10, 25], label: { uk: 'Вивід 2 — земля', en: 'Pin 2 — ground' } },
            { id: 'out', p: [56, 62, 11, 25], label: { uk: 'Вивід 3 — вихід 5 В', en: 'Pin 3 — 5 V output' } },
            { id: 'cin', p: [31, 89, 15, 9], label: { uk: 'Конденсатор на вході', en: 'Input capacitor' }, info: { uk: 'між входом і землею', en: 'between input and ground' } },
            { id: 'cout', p: [49, 89, 16, 9], label: { uk: 'Конденсатор на виході', en: 'Output capacitor' }, info: { uk: 'між виходом і землею', en: 'between output and ground' } }
          ],
          cap: { uk: 'Стабілізатор 7805 на платі: корпус TO-220 з пластиною для радіатора.', en: 'A 7805 regulator on a board: a TO-220 package with a heatsink tab.' }
        },
        body2: {
          uk: '<p>Під ніжками — два маленькі бежеві SMD-конденсатори (керамічні). Лівий стоїть між <b>входом і землею</b>, правий — між <b>виходом і землею</b>. Це ті самі блокувальні конденсатори з модуля 2: вхідний гасить завади й стрибки від батареї, вихідний допомагає стабілізатору працювати стійко і віддає заряд миттєво, коли навантаження різко бере струм. Документація ST на L7805 радить ставити 0,33 мкФ на вході й 0,1 мкФ на виході — якомога ближче до виводів, як тут.</p>',
          en: '<p>Below the legs sit two small beige SMD capacitors (ceramic). The left one is between <b>input and ground</b>, the right one between <b>output and ground</b>. These are the same decoupling capacitors from module 2: the input one soaks up noise and spikes from the battery, the output one keeps the regulator stable and delivers charge instantly when the load suddenly draws current. ST’s L7805 datasheet recommends 0.33 µF at the input and 0.1 µF at the output — as close to the pins as possible, as here.</p>'
        }
      },
      {
        kind: 5,
        title: { uk: 'AMS1117-3.3: найпоширеніший', en: 'AMS1117-3.3: the most common one' },
        body: {
          uk: '<p>Корпус SOT-223: три ніжки і широка пластина. Напис «3.3» або «33» — вихідна напруга. Він є майже на кожній платі ESP32, Arduino і багатьох польотних контролерах — живить процесор від 5 В.</p>',
          en: '<p>A SOT-223 package: three legs and a wide tab. “3.3” or “33” is the output voltage. It sits on almost every ESP32 and Arduino board and many flight controllers — feeding the processor from 5 V.</p>'
        },
        fig: { photo: 'r1-103', cap: { uk: 'AMS1117-3.3 з конденсаторами поруч (C300) — вихідний конденсатор обов’язковий.', en: 'An AMS1117-3.3 with capacitors next to it (C300) — the output capacitor is mandatory.' } }
      },
      {
        kind: 3,
        title: { uk: 'Понижувальний перетворювач: ключ + котушка + діод + конденсатор', en: 'The buck converter: switch + coil + diode + capacitor' },
        body: {
          uk: '<p>Щоб не палити енергію, використовують <b>імпульсний</b> перетворювач. Збираємо все, що вивчили:</p><ul><li><b>Транзисторний ключ</b> вмикається й вимикається сотні тисяч разів на секунду (ШІМ).</li><li><b>Котушка</b> накопичує енергію, коли ключ увімкнено, і віддає, коли вимкнено — вона «згладжує» струм.</li><li><b>Діод</b> (або другий транзистор) замикає коло, коли ключ вимкнено.</li><li><b>Конденсатор</b> на виході згладжує напругу.</li></ul><div class="formula">Uвих ≈ D × Uвх</div><p>ККД — 85–95 %. Тепла майже немає. Це <b>buck-перетворювач</b>.</p>',
          en: '<p>To avoid burning energy, a <b>switching</b> converter is used. It brings together everything you have learned:</p><ul><li>A <b>transistor switch</b> turns on and off hundreds of thousands of times per second (PWM).</li><li>A <b>coil</b> stores energy while the switch is on and releases it while off — it “smooths” the current.</li><li>A <b>diode</b> (or a second transistor) closes the loop while the switch is off.</li><li>An output <b>capacitor</b> smooths the voltage.</li></ul><div class="formula">Uout ≈ D × Uin</div><p>Efficiency is 85–95%. Almost no heat. This is a <b>buck converter</b>.</p>'
        },
        recall: [{ m: 'm03', s: 's13', label: { uk: 'ШІМ', en: 'PWM' } }, { m: 'm02', s: 's8', label: { uk: 'Котушка', en: 'The coil' } }, { m: 'm02', s: 's9', label: { uk: 'Котушка + конденсатор поруч', en: 'Coil + capacitor side by side' } }],
        fig: { anim: 'buck', opts: { vin: 16 }, cap: { uk: 'Змінюємо заповнення — і вихідна напруга змінюється. Мідна лінія — струм котушки: «пилка».', en: 'Change the duty cycle and the output voltage changes. The copper line is the coil current: a “sawtooth”.' } }
      },
      {
        kind: 2,
        title: { uk: 'Модулі-понижувачі: впізнаємо блоки', en: 'Buck modules: recognise the blocks' },
        body: {
          uk: '<p>Угорі — популярний модуль на LM2596. Торкаємося частин: усі чотири «цеглинки» понижувача видно неозброєним оком. Ліворуч унизу — підвищувальний модуль, праворуч унизу — мініатюрний понижувач.</p>',
          en: '<p>At the top is the popular LM2596 module. Tap its parts: all four buck “bricks” are visible to the naked eye. Bottom left is a boost module, bottom right a miniature buck.</p>'
        },
        fig: {
          photo: 'r1-104',
          hot: [
            { id: 'cin', p: [23, 14, 11, 23], label: { uk: 'Вхідний конденсатор 100 мкФ 50 В', en: 'Input capacitor 100 µF 50 V' } },
            { id: 'ic', p: [36, 12, 13, 24], label: { uk: 'Мікросхема LM2596 (ключ + керування)', en: 'LM2596 chip (switch + control)' } },
            { id: 'l', p: [49, 18, 15, 24], label: { uk: 'Котушка «470» = 47 мкГн', en: 'Coil “470” = 47 µH' } },
            { id: 'cout', p: [66, 13, 11, 22], label: { uk: 'Вихідний конденсатор 220 мкФ 35 В', en: 'Output capacitor 220 µF 35 V' } },
            { id: 'd', p: [35, 40, 11, 7], label: { uk: 'Діод Шотткі SS34', en: 'Schottky diode SS34' }, info: { uk: 'замикає коло, коли ключ вимкнено', en: 'closes the loop while the switch is off' } },
            { id: 'trim', p: [52, 7, 13, 10], label: { uk: 'Підстроювальний резистор', en: 'Trimmer' }, info: { uk: 'ним виставляють вихідну напругу (через дільник!)', en: 'sets the output voltage (through a divider!)' } }
          ]
        }
      },
      {
        kind: 2,
        title: { uk: 'Ще потужніший понижувач', en: 'A more powerful buck' },
        body: {
          uk: '<p>Модулі на XL4015 (до 5 А): велика тороїдальна котушка, два електролітичні конденсатори, мікросхема і клемники для дротів. Сині тримери — регулювання напруги і обмеження струму (для заряджання акумуляторів).</p>',
          en: '<p>XL4015 modules (up to 5 A): a big toroidal coil, two electrolytic capacitors, the chip and screw terminals. The blue trimmers set the voltage and the current limit (for charging batteries).</p>'
        },
        fig: { photo: 'r1-105' }
      },
      {
        kind: 1,
        title: { uk: 'Підвищувальний перетворювач', en: 'The boost converter' },
        body: {
          uk: '<p>Ті самі чотири деталі, переставлені інакше, <b>підвищують</b> напругу: з 3,7 В літієвої банки роблять 5 В (так працює павербанк) або з 5 В — 12 В. Назва — <b>boost</b>. Що змінилося:</p><ul><li><b>Котушка</b> тепер стоїть одразу після входу.</li><li><b>Транзисторний ключ</b> з’єднує кінець котушки із землею.</li><li><b>Діод</b> веде від котушки до виходу.</li><li><b>Конденсатор</b> на виході, як і раніше, згладжує напругу.</li></ul><p>Як це працює. Ключ <b>увімкнено</b>: струм іде від входу через котушку просто в землю, котушка набирає енергію (згадуємо її «інерцію»). Ключ <b>вимкнено</b>: котушка не дає струму зупинитися і «штовхає» його далі. Її напруга <b>додається</b> до вхідної, і струм через діод заряджає конденсатор до вищої напруги. Діод не пускає заряд назад, коли ключ знову вмикається.</p><div class="formula">Uвих ≈ Uвх / (1 − D)</div><p>Що довше ключ увімкнений, то більше енергії набирає котушка і то вища напруга на виході. Приклад: з 3,7 В зробити 5 В — D ≈ 1 − 3,7 / 5 ≈ 26 %.</p><p>Ціна: на вході струм <b>більший</b>, ніж на виході. Потужність не береться нізвідки: 5 В × 2 А = 10 Вт на виході — це понад 2,7 А з банки 3,7 В.</p>',
          en: '<p>The same four parts arranged differently <b>raise</b> the voltage: from a 3.7 V lithium cell to 5 V (that is how a power bank works) or from 5 V to 12 V. The name is <b>boost</b>. What changed:</p><ul><li>The <b>coil</b> now comes right after the input.</li><li>The <b>transistor switch</b> connects the end of the coil to ground.</li><li>The <b>diode</b> runs from the coil to the output.</li><li>The output <b>capacitor</b> still smooths the voltage.</li></ul><p>How it works. Switch <b>on</b>: current flows from the input through the coil straight to ground, and the coil stores energy (remember its “inertia”). Switch <b>off</b>: the coil will not let the current stop and “pushes” it on. Its voltage <b>adds</b> to the input, and the current charges the capacitor through the diode to a higher voltage. The diode stops the charge from flowing back when the switch turns on again.</p><div class="formula">Uout ≈ Uin / (1 − D)</div><p>The longer the switch stays on, the more energy the coil stores and the higher the output. Example: to get 5 V from 3.7 V, D ≈ 1 − 3.7 / 5 ≈ 26%.</p><p>The price: input current is <b>higher</b> than output current. Power doesn’t come from nowhere: 5 V × 2 A = 10 W at the output means over 2.7 A from a 3.7 V cell.</p>'
        },
        recall: [{ m: 'm07', s: 's4', label: { uk: 'Понижувач (buck)', en: 'The buck converter' } }, { m: 'm02', s: 's8', label: { uk: 'Котушка: «інерція» струму', en: 'The coil: current “inertia”' } }],
        fig: { anim: 'boost', opts: { vin: 5 }, cap: { uk: 'Змінюємо заповнення — і вихідна напруга росте. Мідна підсвітка показує, куди йде струм: ключ увімкнено — через котушку в землю; вимкнено — через діод на вихід.', en: 'Change the duty cycle and the output voltage rises. The copper glow shows where current flows: switch on — through the coil to ground; off — through the diode to the output.' } },
        fig2: { photo: 'r1-109', cap: { uk: 'Модулі перетворювачів: угорі — зворотний бік, унизу — плата з мікросхемою XL6009, двома котушками «470» (47 мкГн) і підстроювальним резистором «103» для налаштування вихідної напруги.', en: 'Converter modules: top — the back side; bottom — a board with an XL6009 chip, two “470” coils (47 µH) and a “103” trimmer to set the output voltage.' } }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: BEC на польотному контролері', en: 'Device: the BEC on a flight controller' },
        body: {
          uk: '<p><b>BEC</b> (battery eliminator circuit) — так у моделізмі називають понижувач, що живить електроніку від силової батареї. На польотному контролері зазвичай два: «5V 2A» і «10V 2A» (для відео). У специфікації плати шукаємо рядок «BEC».</p><p>Чому відеопередавачу потрібне <b>чисте</b> живлення? Імпульсні перетворювачі й двигуни створюють пульсації. В аналоговому відео вони виглядають як смуги й «сніг». Тому живлення камери й VTX додатково фільтрують LC-фільтром (котушка + конденсатор) або беруть окремий BEC.</p>',
          en: '<p><b>BEC</b> (battery eliminator circuit) is the hobby name for a buck converter that powers electronics from the flight battery. A flight controller usually has two: “5V 2A” and “10V 2A” (for video). Look for the “BEC” line in a board’s specs.</p><p>Why does the video transmitter need <b>clean</b> power? Switching converters and motors create ripple. In analog video it shows as lines and “snow”. So camera and VTX power is filtered with an LC filter (coil + capacitor) or taken from a separate BEC.</p>'
        },
        recall: [{ m: 'm02', s: 's12', label: { uk: 'Конденсатор на ESC', en: 'Capacitor on the ESC' } }]
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: датчик струму', en: 'Device: the current sensor' },
        body: {
          uk: '<p>Скільки мАг уже витрачено з батареї? Це рахує <b>датчик струму</b>. Основа — <b>шунт</b>: резистор із мізерним опором (соті й тисячні частки ома, позначення на кшталт R0005), через який іде весь струм дрона.</p><p>За законом Ома на шунті виникає крихітна напруга: 100 А × 0,0005 Ом = 0,05 В. Підсилювач робить із неї сигнал для процесора, а прошивка рахує струм і витрачені мАг.</p><p>На платі шунт — широкий плаский резистор біля силових майданчиків батареї.</p>',
          en: '<p>How many mAh have been used? A <b>current sensor</b> counts that. Its core is a <b>shunt</b>: a resistor with a tiny resistance (hundredths or thousandths of an ohm, marked like R0005) that carries the drone’s full current.</p><p>By Ohm’s law a tiny voltage appears across it: 100 A × 0.0005 Ω = 0.05 V. An amplifier turns it into a signal for the processor, and the firmware computes current and mAh used.</p><p>On a board, the shunt is a wide flat resistor near the battery power pads.</p>'
        },
        recall: [{ m: 'm01', s: 's5', label: { uk: 'Закон Ома', en: 'Ohm’s law' } }]
      },
      {
        kind: 5,
        title: { uk: 'На платі: як знайти перетворювач', en: 'On the board: how to find a converter' },
        body: {
          uk: '<p>Правило для будь-якої плати:</p><ul><li><b>Котушка (часто з написом 1R0, 2R2, 4R7, 100) + мікросхема поруч + конденсатори</b> → імпульсний перетворювач.</li><li><b>Корпус SOT-223 / SOT-23-5 без котушки + конденсатори</b> → лінійний стабілізатор.</li><li>Конденсатори з більшою робочою напругою стоять на вході (бік батареї), з меншою — на виході.</li></ul><p>Повертаємося до фото модуля LM2596 вище: саме так його й розпізнають.</p>',
          en: '<p>A rule for any board:</p><ul><li><b>A coil (often marked 1R0, 2R2, 4R7, 100) + a chip next to it + capacitors</b> → a switching converter.</li><li><b>A SOT-223 / SOT-23-5 package without a coil + capacitors</b> → a linear regulator.</li><li>Capacitors with a higher voltage rating sit on the input (battery side); lower-rated ones on the output.</li></ul><p>Go back to the LM2596 module photo above: that is exactly how it is recognised.</p>'
        },
        fig: { photo: 'r1-014', cap: { uk: 'Котушка «220» і конденсатор на платі — ознака імпульсного перетворювача.', en: 'A “220” coil and a capacitor on a board — the sign of a switching converter.' } }
      }
    ],
    sources: [
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид., 2015 — розділ 9 (стабілізатори і перетворювачі)', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed., 2015 — chapter 9 (regulators and converters)' } },
      { t: { uk: 'Texas Instruments — документація LM2596 (типова схема buck-перетворювача)', en: 'Texas Instruments — LM2596 datasheet (typical buck circuit)' } },
      { t: { uk: 'Advanced Monolithic Systems — документація AMS1117', en: 'Advanced Monolithic Systems — AMS1117 datasheet' } },
      { t: { uk: 'Документація Betaflight — налаштування датчика струму', en: 'Betaflight documentation — current sensor setup' }, url: 'https://betaflight.com/docs/' }
    ],
    quiz: [
      { q: { uk: 'Від якої напруги зазвичай живляться процесор і гіроскоп польотного контролера?', en: 'What voltage usually powers a flight controller’s processor and gyro?' }, opts: [{ uk: '3,3 В', en: '3.3 V' }, { uk: 'Від батареї напряму', en: 'Straight from the battery' }, { uk: '12 В', en: '12 V' }, { uk: '230 В', en: '230 V' }], a: 0,
        ex: { uk: 'Процесор і датчики — 3,3 В. 5 В — периферія, VBAT — двигуни.', en: 'Processor and sensors run on 3.3 V. 5 V feeds peripherals, VBAT the motors.' }, see: { m: 'm07', s: 's1' } },
      { q: { uk: 'Що живиться від батареї напряму, без перетворювача?', en: 'What is powered straight from the battery, with no converter?' }, opts: [{ uk: 'Регулятори обертів і двигуни', en: 'Speed controllers and motors' }, { uk: 'Процесор', en: 'The processor' }, { uk: 'Гіроскоп', en: 'The gyro' }, { uk: 'Приймач', en: 'The receiver' }], a: 0,
        ex: { uk: 'Силова частина бере повну напругу батареї.', en: 'The power stage takes the full battery voltage.' }, see: { m: 'm07', s: 's1' } },
      { q: { uk: 'Що робить лінійний стабілізатор із надлишком напруги?', en: 'What does a linear regulator do with excess voltage?' }, opts: [{ uk: 'Перетворює на тепло', en: 'Turns it into heat' }, { uk: 'Повертає в батарею', en: 'Returns it to the battery' }, { uk: 'Накопичує в котушці', en: 'Stores it in a coil' }, { uk: 'Випромінює в антену', en: 'Radiates it from an antenna' }], a: 0,
        ex: { uk: 'Лінійний — як «розумний резистор»: зайве йде в тепло.', en: 'A linear regulator is like a “smart resistor”: the excess becomes heat.' }, see: { m: 'm07', s: 's2' } },
      { type: 'calc', see: { m: 'm07', s: 's2' }, gen: function (R, c) {
          var vin = R.pick([9, 12, 16]), vout = R.pick([5, 3.3]), i = R.pick([0.2, 0.5, 1]), p = (vin - vout) * i;
          var o = c.numOpts(p, [vin * i, vout * i, (vin + vout) * i], W, 2);
          return { q: { uk: 'Лінійний стабілізатор: вхід ' + vin + ' В, вихід ' + c.fmt(vout) + ' В, струм ' + c.fmt(i) + ' А. Скільки тепла він виділяє?', en: 'A linear regulator: ' + vin + ' V in, ' + c.fmt(vout) + ' V out, ' + c.fmt(i) + ' A. How much heat does it produce?' }, opts: o.opts, a: 0,
            ex: { uk: 'P = (' + vin + ' − ' + c.fmt(vout) + ') × ' + c.fmt(i) + ' = ' + c.fmt(p, 2) + ' Вт.', en: 'P = (' + vin + ' − ' + c.fmt(vout) + ') × ' + c.fmt(i) + ' = ' + c.fmt(p, 2) + ' W.' } };
        } },
      { q: { uk: 'Що означає LDO?', en: 'What is an LDO?' }, opts: [{ uk: 'Лінійний стабілізатор, якому досить малої різниці напруг між входом і виходом', en: 'A linear regulator that needs only a small input-output voltage difference' }, { uk: 'Імпульсний перетворювач', en: 'A switching converter' }, { uk: 'Тип акумулятора', en: 'A battery type' }, { uk: 'Тип світлодіода', en: 'A type of LED' }], a: 0,
        ex: { uk: 'Low dropout — малий «запас» напруги, кілька десятих вольта.', en: 'Low dropout: a small voltage margin, a few tenths of a volt.' }, see: { m: 'm07', s: 's2' } },
      { q: { uk: 'Де лінійний стабілізатор — розумний вибір?', en: 'Where is a linear regulator a sensible choice?' }, opts: [{ uk: '5 В → 3,3 В при невеликому струмі', en: '5 V → 3.3 V at a small current' }, { uk: '25 В → 5 В при 3 А', en: '25 V → 5 V at 3 A' }, { uk: 'Живлення двигунів', en: 'Powering motors' }, { uk: 'Підвищення 3,7 В до 5 В', en: 'Raising 3.7 V to 5 V' }], a: 0,
        ex: { uk: 'Мала різниця напруг і малий струм — мало тепла.', en: 'A small voltage difference and small current mean little heat.' }, see: { m: 'm07', s: 's2' } },
      { q: { uk: 'Напис «33» на корпусі AMS1117 означає…', en: '“33” on an AMS1117 package means…' }, opts: [{ uk: 'Вихідна напруга 3,3 В', en: '3.3 V output' }, { uk: 'Струм 33 А', en: '33 A current' }, { uk: '33-й тиждень випуску', en: 'Week 33 of production' }, { uk: 'Опір 33 Ом', en: '33 Ω resistance' }], a: 0,
        ex: { uk: 'AMS1117-3.3 дає 3,3 В. Бувають -5.0, -2.5, -1.8.', en: 'AMS1117-3.3 gives 3.3 V. There are also -5.0, -2.5, -1.8 versions.' }, see: { m: 'm07', s: 's3' } },
      { q: { uk: 'З яких основних деталей складається понижувальний (buck) перетворювач?', en: 'What are the main parts of a buck converter?' }, opts: [{ uk: 'Ключ, котушка, діод (або другий ключ), конденсатор', en: 'Switch, coil, diode (or a second switch), capacitor' }, { uk: 'Чотири діоди і конденсатор', en: 'Four diodes and a capacitor' }, { uk: 'Два резистори', en: 'Two resistors' }, { uk: 'Кварц і світлодіод', en: 'A crystal and an LED' }], a: 0,
        ex: { uk: 'Ключ рубає напругу, котушка й конденсатор згладжують, діод замикає коло.', en: 'The switch chops, the coil and capacitor smooth, the diode closes the loop.' }, see: { m: 'm07', s: 's4' } },
      { type: 'calc', see: { m: 'm07', s: 's4' }, gen: function (R, c) {
          var vin = R.pick([12, 16, 20, 24]), vout = R.pick([5, 6, 8, 10]), d = vout / vin * 100;
          var o = c.numOpts(d, [vin / vout * 10, 100 - d, 50 === Math.round(d) ? 25 : 50], { uk: '%', en: '%' }, 0);
          return { q: { uk: 'Buck-перетворювач: вхід ' + vin + ' В, треба ' + vout + ' В. Яке приблизно заповнення ШІМ?', en: 'A buck converter: ' + vin + ' V in, ' + vout + ' V needed. Roughly what PWM duty cycle?' }, opts: o.opts, a: 0,
            ex: { uk: 'D ≈ Uвих / Uвх = ' + vout + ' / ' + vin + ' ≈ ' + c.fmt(d, c.needD(d, 0)) + ' %.', en: 'D ≈ Uout / Uin = ' + vout + ' / ' + vin + ' ≈ ' + c.fmt(d, c.needD(d, 0)) + '%.' } };
        } },
      { q: { uk: 'Чому імпульсний перетворювач майже не гріється?', en: 'Why does a switching converter barely heat up?' }, opts: [{ uk: 'Ключ або повністю відкритий, або закритий, а котушка накопичує енергію замість її спалювати', en: 'The switch is fully on or off, and the coil stores energy instead of burning it' }, { uk: 'Він має вентилятор', en: 'It has a fan' }, { uk: 'Він працює лише на малих струмах', en: 'It only works at small currents' }, { uk: 'Він гріється так само, як лінійний', en: 'It heats just like a linear one' }], a: 0,
        ex: { uk: 'ККД 85–95 %: енергія переноситься, а не спалюється.', en: '85–95% efficiency: energy is transferred, not burned.' }, see: { m: 'm07', s: 's4' } },
      { q: { uk: 'Що в модулі LM2596 означає котушка з написом «470»?', en: 'On an LM2596 module, what does a coil marked “470” mean?' }, opts: [{ uk: '47 мкГн', en: '47 µH' }, { uk: '470 Ом', en: '470 Ω' }, { uk: '470 мкФ', en: '470 µF' }, { uk: '4,7 А', en: '4.7 A' }], a: 0,
        ex: { uk: '47 і нуль нулів = 47 мкГн.', en: '47 plus no zeros = 47 µH.' }, see: { m: 'm07', s: 's5' } },
      { q: { uk: 'Як на модулі LM2596 виставляють вихідну напругу?', en: 'How is the output voltage set on an LM2596 module?' }, opts: [{ uk: 'Підстроювальним резистором — він змінює дільник зворотного зв’язку', en: 'With a trimmer — it changes the feedback divider' }, { uk: 'Заміною котушки', en: 'By swapping the coil' }, { uk: 'Перемикачем полярності', en: 'With a polarity switch' }, { uk: 'Ніяк — вона фіксована', en: 'It can’t be — it’s fixed' }], a: 0,
        ex: { uk: 'Мікросхема порівнює частку виходу (з дільника) з опорною напругою.', en: 'The chip compares a fraction of the output (from a divider) with a reference.' }, see: { m: 'm07', s: 's5' } },
      { q: { uk: 'Що робить boost-перетворювач?', en: 'What does a boost converter do?' }, opts: [{ uk: 'Підвищує напругу', en: 'Raises the voltage' }, { uk: 'Знижує напругу', en: 'Lowers the voltage' }, { uk: 'Випрямляє змінний струм', en: 'Rectifies AC' }, { uk: 'Підсилює радіосигнал', en: 'Amplifies a radio signal' }], a: 0,
        ex: { uk: 'Boost — вгору (3,7 → 5 В), buck — вниз.', en: 'Boost goes up (3.7 → 5 V), buck goes down.' }, see: { m: 'm07', s: 's7' } },
      { q: { uk: 'Павербанк дає 5 В / 2 А від банки 3,7 В. Що можна сказати про струм від банки?', en: 'A power bank gives 5 V / 2 A from a 3.7 V cell. What about the current from the cell?' }, opts: [{ uk: 'Він більший за 2 А', en: 'It is more than 2 A' }, { uk: 'Рівно 2 А', en: 'Exactly 2 A' }, { uk: 'Менший за 2 А', en: 'Less than 2 A' }, { uk: 'Нуль', en: 'Zero' }], a: 0,
        ex: { uk: 'Потужність зберігається (і трохи губиться): 5 × 2 = 10 Вт, з 3,7 В це вже понад 2,7 А.', en: 'Power is conserved (minus losses): 5 × 2 = 10 W, which at 3.7 V is over 2.7 A.' }, see: { m: 'm07', s: 's7' } },
      { q: { uk: 'Що таке BEC у дроні?', en: 'What is a BEC in a drone?' }, opts: [{ uk: 'Понижувач, що живить електроніку від силової батареї', en: 'A converter that powers the electronics from the flight battery' }, { uk: 'Тип батареї', en: 'A battery type' }, { uk: 'Захист від води', en: 'Water protection' }, { uk: 'Модуль GPS', en: 'A GPS module' }], a: 0,
        ex: { uk: 'Battery Eliminator Circuit — «замінює» окрему батарею для електроніки.', en: 'Battery Eliminator Circuit — it “replaces” a separate battery for the electronics.' }, see: { m: 'm07', s: 's8' } },
      { q: { uk: 'В аналоговому відео з дрона — смуги, що змінюються з газом. Найімовірніша причина?', en: 'Analog drone video shows lines that change with throttle. The most likely cause?' }, opts: [{ uk: 'Пульсації живлення від двигунів і перетворювачів — треба фільтр або окремий BEC', en: 'Power ripple from motors and converters — a filter or separate BEC is needed' }, { uk: 'Погана погода', en: 'Bad weather' }, { uk: 'Занадто яскраве сонце', en: 'Sun too bright' }, { uk: 'Неправильний пропелер', en: 'The wrong propeller' }], a: 0,
        ex: { uk: 'Шум із силових кіл потрапляє в живлення камери й VTX.', en: 'Noise from the power circuits gets into the camera and VTX supply.' }, see: { m: 'm07', s: 's8' } },
      { type: 'calc', see: { m: 'm07', s: 's9' }, gen: function (R, c) {
          var i = R.pick([20, 50, 80, 100, 120]), r = R.pick([0.25, 0.5, 1]), u = i * r;
          var o = c.numOpts(u, [i / r, u * 10, u / 10], { uk: 'мВ', en: 'mV' }, 1);
          return { q: { uk: 'Шунт ' + c.fmt(r, 2) + ' мОм, струм ' + i + ' А. Яка напруга на шунті?', en: 'A ' + c.fmt(r, 2) + ' mΩ shunt carries ' + i + ' A. What voltage appears across it?' }, opts: o.opts, a: 0,
            ex: { uk: 'U = I × R = ' + i + ' × ' + c.fmt(r / 1000, 5) + ' Ом = ' + c.fmt(u, 1) + ' мВ.', en: 'U = I × R = ' + i + ' × ' + c.fmt(r / 1000, 5) + ' Ω = ' + c.fmt(u, 1) + ' mV.' } };
        } },
      { q: { uk: 'Як на платі розпізнати імпульсний перетворювач?', en: 'How do you recognise a switching converter on a board?' }, opts: [{ uk: 'Котушка + мікросхема поруч + конденсатори', en: 'A coil + a chip next to it + capacitors' }, { uk: 'Чотири діоди ромбом', en: 'Four diodes in a diamond' }, { uk: 'Металевий екран', en: 'A metal shield' }, { uk: 'Кварц', en: 'A crystal' }], a: 0,
        ex: { uk: 'Котушка — головна ознака імпульсного перетворювача.', en: 'The coil is the key sign of a switching converter.' }, see: { m: 'm07', s: 's10' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>котушки</b> понижувача LM2596.', en: 'Tap the <b>coil</b> of the LM2596 buck converter.' },
        fig: { photo: 'r1-104', hot: [{ id: 'l', p: [49, 18, 15, 24] }, { id: 'cin', p: [23, 14, 11, 23] }, { id: 'ic', p: [36, 12, 13, 24] }, { id: 'cout', p: [66, 13, 11, 22] }, { id: 'trim', p: [52, 7, 13, 10] }] },
        a: 'l', ex: { uk: 'Чорний квадрат із написом «470» — котушка 47 мкГн.', en: 'The black square marked “470” is a 47 µH coil.' }, see: { m: 'm07', s: 's5' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>вихідного</b> конденсатора (менша робоча напруга).', en: 'Tap the <b>output</b> capacitor (the lower voltage rating).' },
        fig: { photo: 'r1-104', hot: [{ id: 'cout', p: [66, 13, 11, 22] }, { id: 'cin', p: [23, 14, 11, 23] }, { id: 'l', p: [49, 18, 15, 24] }, { id: 'd', p: [35, 40, 11, 7] }] },
        a: 'cout', ex: { uk: '220 мкФ 35 В — на виході; 100 мкФ 50 В — на вході, бо там напруга вища.', en: '220 µF 35 V sits on the output; 100 µF 50 V on the input, where the voltage is higher.' }, see: { m: 'm07', s: 's10' } }
    ]
  });
})();
