/* Module 8 — Motors and drivers */
(function () {
  APP.module({
    id: 'm08', n: 8, part: 'B', cv: 1,
    title: { uk: 'Двигуни і регулятори обертів', en: 'Motors and speed controllers' },
    short: { uk: 'Колекторні, безколекторні, ESC, сервоприводи', en: 'Brushed, brushless, ESC, servos' },
    intro: {
      uk: 'Рух — це головне, що робить дрон чи наземний робот. У цьому модулі побачимо, як транзистори з модуля 3 крутять двигуни: від простого колекторного в наземному роботі до безколекторного з регулятором обертів у FPV-дроні.',
      en: 'Motion is the main thing a drone or ground robot does. In this module you will see how the transistors from module 3 spin motors: from the simple brushed motor in a ground robot to the brushless motor and speed controller in an FPV drone.'
    },
    warm: ['m03q17', 'm07q08', 'm06q17'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Колекторний двигун: найпростіший', en: 'The brushed motor: the simplest' },
        body: {
          uk: '<p>Усередині: <b>магніти</b> на корпусі, <b>обмотки</b> на валу і <b>щітки</b>, що труться об колектор і перемикають струм в обмотках, поки вал крутиться. Подали постійну напругу — крутиться. Поміняли полярність — крутиться в інший бік.</p><p>Його недоліки: щітки зношуються й іскрять (радіозавади!). Такі двигуни стоять у сервоприводах, іграшках, деяких наземних роботах.</p>',
          en: '<p>Inside: <b>magnets</b> on the case, <b>windings</b> on the shaft, and <b>brushes</b> rubbing on a commutator that switch the current in the windings as the shaft turns. Apply DC and it spins. Reverse the polarity and it spins the other way.</p><p>Drawbacks: the brushes wear and spark (radio noise!). Such motors are found in servos, toys and some ground robots.</p>'
        },
        fig: { photo: 'r1-125', cap: { uk: 'Колекторний двигун розібраний: магніти в корпусі, ротор з обмотками, щітки в кришці.', en: 'A brushed motor taken apart: magnets in the case, the rotor with windings, brushes in the end cap.' } }
      },
      {
        kind: 3,
        title: { uk: 'Н-міст: їздимо вперед і назад', en: 'The H-bridge: forward and back' },
        body: {
          uk: '<p>Щоб двигун наземного робота крутився в обидва боки, ставлять <b>чотири ключі</b>, складені буквою «Н». Двигун — у «перекладині».</p><ul><li>Відкрили лівий верхній і правий нижній → струм іде через двигун зліва направо → вперед.</li><li>Відкрили правий верхній і лівий нижній → навпаки → назад.</li><li>Обидва ключі однієї сторони одночасно — <b>коротке замикання</b>! Схема керування цього не допускає.</li></ul><p>А якщо ще й вмикати ключі через ШІМ — керуємо і швидкістю.</p>',
          en: '<p>To spin a ground robot’s motor both ways, <b>four switches</b> are arranged like the letter “H”. The motor is the crossbar.</p><ul><li>Top-left and bottom-right on → current flows through the motor left to right → forward.</li><li>Top-right and bottom-left on → the reverse → backward.</li><li>Both switches on one side at once is a <b>short circuit</b>! The control logic prevents it.</li></ul><p>Add PWM to the switches and you control speed too.</p>'
        },
        recall: [{ m: 'm03', s: 's13', label: { uk: 'ШІМ', en: 'PWM' } }],
        fig: {
          svg: function (L) {
            var s = D.t(190, 14, '+V', 'lbl') + D.line(178, 22, 202, 22) + D.w([[190, 22], [190, 30], [90, 30], [90, 50]]) + D.w([[190, 30], [290, 30], [290, 50]]);
            s += D.two('swClosed', 90, 50, 90, 100, { cls: 'acc' }) + D.two('swOpen', 290, 50, 290, 100);
            s += D.dot(90, 110) + D.dot(290, 110) + D.w([[90, 100], [90, 120]]) + D.w([[290, 100], [290, 120]]);
            s += D.w([[90, 110], [160, 110]]) + D.two('motor', 160, 110, 220, 110) + D.w([[220, 110], [290, 110]]);
            s += D.two('swOpen', 90, 120, 90, 170) + D.two('swClosed', 290, 120, 290, 170, { cls: 'acc' });
            s += D.w([[90, 170], [90, 185], [290, 185], [290, 170]]) + D.gnd(190, 185);
            s += D.arrow(150, 95, 230, 95, 'acc') + D.t(190, 86, L({ uk: 'вперед', en: 'forward' }), 'txm');
            s += D.t(60, 78, 'S1', 'lbl', 'end') + D.t(320, 78, 'S2', 'lbl', 'start') + D.t(60, 148, 'S3', 'lbl', 'end') + D.t(320, 148, 'S4', 'lbl', 'start');
            return D.svg(380, 215, s);
          },
          cap: { uk: 'Увімкнено S1 і S4 — двигун крутиться вперед. S2 і S3 — назад.', en: 'S1 and S4 on — the motor spins forward. S2 and S3 — backward.' }
        }
      },
      {
        kind: 5,
        title: { uk: 'Н-міст в одній мікросхемі', en: 'An H-bridge in one chip' },
        body: {
          uk: '<p>Для невеликих двигунів увесь Н-міст разом із керуванням вміщують в одну мікросхему: DRV8846, DRV8833, TB6612, L298 та інші. На платі наземного робота шукаємо мікросхему з написом «DRV…» чи «TB…» біля роз’ємів двигунів.</p>',
          en: '<p>For small motors, the whole H-bridge plus control fits in one chip: DRV8846, DRV8833, TB6612, L298 and others. On a ground-robot board, look for a chip marked “DRV…” or “TB…” near the motor connectors.</p>'
        },
        fig: { photo: 'r1-131', cap: { uk: 'Драйвер двигунів TI DRV8846 у корпусі QFN.', en: 'A TI DRV8846 motor driver in a QFN package.' } }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: наземний робот', en: 'Device: a ground robot' },
        body: {
          uk: '<p>Шасі наземної платформи: акумулятор, регулятор обертів, приймач і сервопривід керма — усе на одній рамі. Принцип той самий, що в дроні, тільки двигунів менше, а струми часто більші.</p><p>Українські наземні роботизовані комплекси (НРК) — від логістичних до інженерних — побудовані на тих самих вузлах: батарея, BEC, регулятори обертів, приймач, камера, відеопередавач.</p>',
          en: '<p>A ground platform chassis: battery, speed controller, receiver and steering servo — all on one frame. The principle is the same as in a drone, with fewer motors and often bigger currents.</p><p>Ukrainian unmanned ground vehicles (UGVs) — from logistics to engineering roles — are built from the same blocks: battery, BEC, speed controllers, receiver, camera, video transmitter.</p>'
        },
        fig: { photo: 'r1-211', cap: { uk: 'Шасі радіокерованої машини: видно сервопривід, регулятор, приймач і батарею.', en: 'An RC car chassis: the servo, speed controller, receiver and battery are visible.' } }
      },
      {
        kind: 4,
        title: { uk: 'Український НРК «Вепр»', en: 'The Ukrainian “Vepr” UGV' },
        body: {
          uk: '<p>Гусеничний НРК і оператор із пультом. Звертаємо увагу на щоглу з антенами — про радіоканал дізнаємося в модулях 11–13.</p>',
          en: '<p>A tracked UGV and its operator with a controller. Note the antenna mast — the radio link is covered in modules 11–13.</p>'
        },
        fig: { photo: 'r2-074' }
      },
      {
        kind: 1,
        title: { uk: 'Безколекторний двигун: без щіток', en: 'The brushless motor: no brushes' },
        body: {
          uk: '<p>У FPV-дроні — <b>безколекторні</b> (BLDC) двигуни. Обмотки нерухомі (це <b>статор</b>), а магніти на дзвоні крутяться навколо (це <b>ротор</b>). Щіток немає — немає зносу й іскор.</p><p>Але хтось має перемикати струм в обмотках у правильний момент. Це робить електроніка — <b>регулятор обертів (ESC)</b>. У двигуна три дроти — три <b>фази</b>.</p><p>Цифри в назві, наприклад 2207 1950KV: 22 мм — діаметр статора, 07 мм — висота, 1950 обертів за хвилину на кожен вольт без навантаження.</p>',
          en: '<p>FPV drones use <b>brushless</b> (BLDC) motors. The windings stay still (the <b>stator</b>) and magnets on the bell spin around them (the <b>rotor</b>). No brushes — no wear and no sparks.</p><p>But someone must switch the winding currents at the right moment. Electronics do that: the <b>speed controller (ESC)</b>. The motor has three wires — three <b>phases</b>.</p><p>The numbers in a name such as 2207 1950KV: 22 mm stator diameter, 07 mm height, 1950 rpm per volt with no load.</p>'
        },
        fig: { photo: 'r1-120', cap: { uk: 'Статор безколекторного двигуна: шість мідних котушок.', en: 'A brushless motor stator: six copper coils.' } }
      },
      {
        kind: 3,
        title: { uk: 'Як ESC крутить двигун: шість кроків', en: 'How an ESC spins a motor: six steps' },
        body: {
          uk: '<p>Регулятор має три «напівмости» — по два MOSFET-и на кожну фазу (верхній H і нижній L). У кожен момент відкрито один верхній ключ однієї фази і один нижній — іншої. Струм іде через дві обмотки, магнітне поле тягне ротор.</p><p>Шість комбінацій по черзі — і поле «біжить» по колу, а ротор за ним. Швидкість обертання = швидкість перемикання. Сила — ШІМ на ключах.</p>',
          en: '<p>The controller has three “half-bridges” — two MOSFETs per phase (high H and low L). At any moment one high switch of one phase and one low switch of another are on. Current flows through two windings, and the magnetic field pulls the rotor.</p><p>Six combinations in turn make the field “run” around the circle, and the rotor follows. Rotation speed equals switching speed. Torque comes from PWM on the switches.</p>'
        },
        recall: [{ m: 'm03', s: 's14', label: { uk: 'ESC — набір MOSFET-ів', en: 'An ESC is a set of MOSFETs' } }],
        fig: { anim: 'esc', cap: { uk: 'Зелене — відкритий верхній ключ, мідне — нижній. Обмотки тягнуть магніт ротора.', en: 'Green is the open high switch, copper the low one. The windings pull the rotor magnet.' } }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: регулятор обертів зсередини', en: 'Device: a speed controller inside' },
        body: {
          uk: '<p>Звичайний ESC для літака чи машини. Торкаємося частин: тут мікроконтролер, силові транзистори, конденсатори на вході й контакти для прошивання. Сучасні ESC для дронів працюють на прошивках <b>BLHeli_32</b>, <b>Bluejay</b> або відкритій <b>AM32</b>, а команди отримують цифровим протоколом <b>DShot</b>.</p><p>Плата «4-в-1» для квадрокоптера — це чотири такі регулятори на одній платі: 24 MOSFET-и, один-чотири мікроконтролери і великий конденсатор на живленні.</p>',
          en: '<p>A typical ESC for a plane or car. Tap its parts: the microcontroller, power transistors, input capacitors and programming pads. Modern drone ESCs run <b>BLHeli_32</b>, <b>Bluejay</b> or the open <b>AM32</b> firmware and receive commands over the digital <b>DShot</b> protocol.</p><p>A “4-in-1” quadcopter board is four such controllers on one board: 24 MOSFETs, one to four microcontrollers and a big capacitor on the power input.</p>'
        },
        fig: {
          photo: 'r1-123',
          hot: [
            { id: 'mcu', p: [30, 37, 15, 21], label: { uk: 'Мікроконтролер (U5)', en: 'Microcontroller (U5)' }, info: { uk: 'рахує момент перемикання фаз', en: 'computes when to switch phases' } },
            { id: 'fet', p: [49, 28, 27, 47], label: { uk: 'Силові MOSFET-и', en: 'Power MOSFETs' }, info: { uk: 'по два на кожну з трьох фаз', en: 'two for each of three phases' } },
            { id: 'cap', p: [0, 33, 22, 40], label: { uk: 'Вхідні конденсатори', en: 'Input capacitors' }, info: { uk: 'гасять сплески на живленні', en: 'absorb spikes on the supply' } },
            { id: 'phase', p: [72, 28, 10, 45], label: { uk: 'Три фази до двигуна', en: 'Three phases to the motor' } },
            { id: 'prog', p: [32, 57, 16, 10], label: { uk: 'Майданчики для прошивання', en: 'Programming pads' }, info: { uk: 'MOSI, MISO, SCK, RST — ті самі назви, що в модулі 5', en: 'MOSI, MISO, SCK, RST — the same names as in module 5' } }
          ]
        }
      },
      {
        kind: 1,
        title: { uk: 'Сервопривід: двигун зі зворотним зв’язком', en: 'The servo: a motor with feedback' },
        body: {
          uk: '<p>Сервопривід повертає вал на <b>заданий кут</b> і тримає його. Усередині: маленький колекторний двигун, редуктор із шестерень, плата керування з Н-мостом і <b>потенціометр</b> на вихідному валу — він «каже» платі, де зараз вал.</p><p>Кут задають імпульсом 1–2 мс, що повторюється 50 разів на секунду: 1,5 мс — середина. Сервоприводи керують кермом наземних машин і рулями літаків.</p>',
          en: '<p>A servo turns its shaft to a <b>set angle</b> and holds it. Inside: a small brushed motor, a gear train, a control board with an H-bridge, and a <b>potentiometer</b> on the output shaft that tells the board where the shaft is.</p><p>The angle is set by a 1–2 ms pulse repeated 50 times per second: 1.5 ms is the middle. Servos steer ground vehicles and move aircraft control surfaces.</p>'
        },
        recall: [{ m: 'm02', s: 's10', label: { uk: 'Потенціометр', en: 'The potentiometer' } }],
        fig: { photo: 'r2-135', cap: { uk: 'Сервопривід відкрито: двигун, шестерні, плата керування.', en: 'A servo opened: motor, gears, control board.' } }
      },
      {
        kind: 5,
        title: { uk: 'На платі та на рамі', en: 'On the board and on the frame' },
        body: {
          uk: '<p>Як упізнати регулятор обертів на будь-якій платі:</p><ul><li>ряди однакових силових транзисторів (на 4-в-1 — 24 штуки, часто корпуси 3×3 або 5×6 мм);</li><li>товсті силові доріжки й великі майданчики для дротів батареї та фаз;</li><li>великий конденсатор на вході;</li><li>мікроконтролер і мікросхема-драйвер затворів поруч.</li></ul><p>Приймач, сервопривід і батарея разом — повна система керування класичної радіомоделі.</p>',
          en: '<p>How to recognise a speed controller on any board:</p><ul><li>rows of identical power transistors (24 on a 4-in-1, often 3×3 or 5×6 mm packages);</li><li>thick power traces and big pads for battery and phase wires;</li><li>a large input capacitor;</li><li>a microcontroller and a gate-driver chip nearby.</li></ul><p>A receiver, servo and battery together are the full control system of a classic RC model.</p>'
        },
        fig: { photo: 'r1-215', cap: { uk: 'Приймач, сервопривід і батарея з’єднані — класична система радіомоделі.', en: 'A receiver, servo and battery wired together — the classic RC system.' } }
      }
    ],
    sources: [
      { t: { uk: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4-те вид., 2016 — розділ про двигуни', en: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4th ed., 2016 — chapter on motors' } },
      { t: { uk: 'Проєкт AM32 — відкрита прошивка для регуляторів обертів', en: 'The AM32 project — open firmware for speed controllers' }, url: 'https://github.com/am32-firmware/AM32' },
      { t: { uk: 'Texas Instruments — документація DRV8846 / DRV8833 (Н-міст)', en: 'Texas Instruments — DRV8846 / DRV8833 datasheets (H-bridge)' } },
      { t: { uk: 'Документація Betaflight — протокол DShot', en: 'Betaflight documentation — the DShot protocol' }, url: 'https://betaflight.com/docs/' }
    ],
    quiz: [
      { q: { uk: 'Що в колекторному двигуні перемикає струм в обмотках?', en: 'What switches the winding current in a brushed motor?' }, opts: [{ uk: 'Щітки й колектор', en: 'The brushes and commutator' }, { uk: 'Регулятор обертів', en: 'A speed controller' }, { uk: 'Кварц', en: 'A crystal' }, { uk: 'Гіроскоп', en: 'A gyro' }], a: 0,
        ex: { uk: 'Механічне перемикання — щітки труться об колектор.', en: 'Mechanical switching — brushes rubbing on the commutator.' }, see: { m: 'm08', s: 's1' } },
      { q: { uk: 'Як змінити напрям обертання колекторного двигуна?', en: 'How do you reverse a brushed motor?' }, opts: [{ uk: 'Поміняти полярність живлення', en: 'Swap the supply polarity' }, { uk: 'Збільшити напругу', en: 'Raise the voltage' }, { uk: 'Ніяк', en: 'You can’t' }, { uk: 'Поміняти місцями два з трьох дротів', en: 'Swap two of three wires' }], a: 0,
        ex: { uk: 'Колекторний — два дроти; полярність задає напрям.', en: 'A brushed motor has two wires; polarity sets the direction.' }, see: { m: 'm08', s: 's1' } },
      { q: { uk: 'Чому колекторні двигуни шкодять радіозв’язку?', en: 'Why are brushed motors bad for radio?' }, opts: [{ uk: 'Щітки іскрять і створюють завади', en: 'The brushes spark and create noise' }, { uk: 'Вони важкі', en: 'They are heavy' }, { uk: 'Вони працюють на змінному струмі', en: 'They run on AC' }, { uk: 'Вони не шкодять', en: 'They don’t' }], a: 0,
        ex: { uk: 'Іскри — широкосмугові завади. Тому на такі двигуни ставлять конденсатори.', en: 'Sparks are broadband noise. That is why capacitors are fitted across such motors.' }, see: { m: 'm08', s: 's1' } },
      { q: { uk: 'Скільки ключів у Н-мості?', en: 'How many switches are in an H-bridge?' }, opts: [{ uk: '4', en: '4' }, { uk: '2', en: '2' }, { uk: '6', en: '6' }, { uk: '1', en: '1' }], a: 0,
        ex: { uk: 'Чотири ключі, складені буквою «Н», двигун — посередині.', en: 'Four switches in an “H”, with the motor in the middle.' }, see: { m: 'm08', s: 's2' } },
      { q: { uk: 'Що буде, якщо в Н-мості одночасно відкрити верхній і нижній ключі <b>однієї</b> сторони?', en: 'What happens if the top and bottom switches on the <b>same</b> side of an H-bridge are both on?' }, opts: [{ uk: 'Коротке замикання живлення', en: 'A short circuit of the supply' }, { uk: 'Двигун крутиться швидше', en: 'The motor spins faster' }, { uk: 'Двигун гальмує', en: 'The motor brakes' }, { uk: 'Нічого', en: 'Nothing' }], a: 0,
        ex: { uk: 'Струм іде від + до землі повз двигун — ключі горять.', en: 'Current goes from + to ground around the motor — the switches burn.' }, see: { m: 'm08', s: 's2' } },
      { q: { uk: 'Мікросхема з написом «DRV8833» біля двигунів наземного робота найімовірніше…', en: 'A chip marked “DRV8833” near a ground robot’s motors is most likely…' }, opts: [{ uk: 'Драйвер двигунів (Н-міст)', en: 'A motor driver (H-bridge)' }, { uk: 'Гіроскоп', en: 'A gyro' }, { uk: 'Пам’ять', en: 'Memory' }, { uk: 'Відеопередавач', en: 'A video transmitter' }], a: 0,
        ex: { uk: 'DRV88xx — родина драйверів двигунів Texas Instruments.', en: 'DRV88xx is a Texas Instruments motor-driver family.' }, see: { m: 'm08', s: 's3' } },
      { q: { uk: 'Що в безколекторному двигуні нерухоме?', en: 'What stays still in a brushless motor?' }, opts: [{ uk: 'Обмотки (статор)', en: 'The windings (stator)' }, { uk: 'Магніти (ротор)', en: 'The magnets (rotor)' }, { uk: 'Вал', en: 'The shaft' }, { uk: 'Щітки', en: 'The brushes' }], a: 0,
        ex: { uk: 'Статор з обмотками нерухомий, дзвін із магнітами крутиться.', en: 'The stator with windings stays still; the bell with magnets spins.' }, see: { m: 'm08', s: 's6' } },
      { q: { uk: 'Скільки дротів у безколекторного двигуна FPV-дрона?', en: 'How many wires does an FPV brushless motor have?' }, opts: [{ uk: '3 (три фази)', en: '3 (three phases)' }, { uk: '2', en: '2' }, { uk: '4', en: '4' }, { uk: '6', en: '6' }], a: 0,
        ex: { uk: 'Три фази — по одній на кожен напівміст ESC.', en: 'Three phases — one per ESC half-bridge.' }, see: { m: 'm08', s: 's6' } },
      { q: { uk: 'Як змінити напрям обертання безколекторного двигуна?', en: 'How do you reverse a brushless motor?' }, opts: [{ uk: 'Поміняти місцями будь-які два з трьох дротів (або змінити в налаштуваннях ESC)', en: 'Swap any two of the three wires (or change it in the ESC settings)' }, { uk: 'Поміняти полярність батареї', en: 'Reverse the battery' }, { uk: 'Ніяк', en: 'It can’t be done' }, { uk: 'Перевернути двигун', en: 'Mount the motor upside down' }], a: 0,
        ex: { uk: 'Зміна порядку фаз змінює напрям «бігу» поля.', en: 'Changing the phase order reverses the field’s rotation.' }, see: { m: 'm08', s: 's7' } },
      { q: { uk: 'Що означає 2207 у назві двигуна «2207 1950KV»?', en: 'What does 2207 mean in “2207 1950KV”?' }, opts: [{ uk: 'Статор 22 мм у діаметрі і 7 мм заввишки', en: 'A stator 22 mm in diameter and 7 mm tall' }, { uk: '2207 обертів за хвилину', en: '2207 rpm' }, { uk: 'Рік і місяць випуску', en: 'Year and month of manufacture' }, { uk: 'Вага 22,07 г', en: 'Weight 22.07 g' }], a: 0,
        ex: { uk: 'Перші дві цифри — діаметр статора, наступні — висота.', en: 'The first two digits are stator diameter, the next two its height.' }, see: { m: 'm08', s: 's6' } },
      { type: 'calc', see: { m: 'm08', s: 's6' }, gen: function (R, c) {
          var kv = R.pick([1300, 1750, 1950, 2400, 2750]), s = R.pick([4, 6]), v = s * 3.7, rpm = kv * v;
          var o = c.numOpts(rpm, [kv * s, kv * s * 4.2 * 2, kv / v], { uk: 'об/хв', en: 'rpm' }, 0);
          return { q: { uk: 'Двигун ' + kv + 'KV на батареї ' + s + 'S (≈' + c.fmt(v, 1) + ' В). Скільки приблизно обертів без навантаження?', en: 'A ' + kv + 'KV motor on a ' + s + 'S battery (≈' + c.fmt(v, 1) + ' V). Roughly how many rpm with no load?' }, opts: o.opts, a: 0,
            ex: { uk: 'KV × U = ' + kv + ' × ' + c.fmt(v, 1) + ' ≈ ' + c.fmt(rpm, 0) + ' об/хв.', en: 'KV × U = ' + kv + ' × ' + c.fmt(v, 1) + ' ≈ ' + c.fmt(rpm, 0) + ' rpm.' } };
        } },
      { q: { uk: 'Скільки MOSFET-ів одночасно відкрито в кожен момент шестикрокового керування?', en: 'In six-step control, how many MOSFETs are on at any moment?' }, opts: [{ uk: '2: верхній однієї фази і нижній іншої', en: '2: the high one of one phase and the low one of another' }, { uk: 'Усі 6', en: 'All 6' }, { uk: '1', en: '1' }, { uk: '3 верхніх', en: 'The 3 high ones' }], a: 0,
        ex: { uk: 'Струм іде через дві обмотки: «вхід» через верхній ключ, «вихід» через нижній.', en: 'Current flows through two windings: in via a high switch, out via a low one.' }, see: { m: 'm08', s: 's7' } },
      { q: { uk: 'Що визначає швидкість обертання безколекторного двигуна?', en: 'What sets a brushless motor’s speed?' }, opts: [{ uk: 'Як швидко ESC перемикає фази (і ШІМ на ключах)', en: 'How fast the ESC switches phases (and the PWM on the switches)' }, { uk: 'Колір дротів', en: 'The wire colours' }, { uk: 'Розмір конденсатора', en: 'The capacitor size' }, { uk: 'Довжина антени', en: 'The antenna length' }], a: 0,
        ex: { uk: 'Ротор «біжить» за полем, а поле перемикає ESC.', en: 'The rotor follows the field, and the ESC switches the field.' }, see: { m: 'm08', s: 's7' } },
      { q: { uk: 'Що таке DShot?', en: 'What is DShot?' }, opts: [{ uk: 'Цифровий протокол команд від польотного контролера до ESC', en: 'A digital command protocol from flight controller to ESC' }, { uk: 'Тип двигуна', en: 'A motor type' }, { uk: 'Тип батареї', en: 'A battery type' }, { uk: 'Відеостандарт', en: 'A video standard' }], a: 0,
        ex: { uk: 'DShot передає значення газу цифрою — без похибок аналогового сигналу.', en: 'DShot sends the throttle as a number — no analog signal errors.' }, see: { m: 'm08', s: 's8' } },
      { q: { uk: 'Скільки силових транзисторів на платі ESC «4-в-1»?', en: 'How many power transistors are on a “4-in-1” ESC board?' }, opts: [{ uk: '24', en: '24' }, { uk: '4', en: '4' }, { uk: '12', en: '12' }, { uk: '6', en: '6' }], a: 0,
        ex: { uk: '4 двигуни × 6 MOSFET-ів = 24.', en: '4 motors × 6 MOSFETs = 24.' }, see: { m: 'm08', s: 's8' } },
      { q: { uk: 'Навіщо всередині сервоприводу потенціометр?', en: 'Why is there a potentiometer inside a servo?' }, opts: [{ uk: 'Він «каже» платі, в якому положенні зараз вал', en: 'It tells the board where the shaft currently is' }, { uk: 'Ним регулюють гучність', en: 'It adjusts volume' }, { uk: 'Він обмежує струм двигуна', en: 'It limits motor current' }, { uk: 'Він задає частоту', en: 'It sets a frequency' }], a: 0,
        ex: { uk: 'Це зворотний зв’язок: плата порівнює задане положення з реальним.', en: 'It is feedback: the board compares the set position with the real one.' }, see: { m: 'm08', s: 's9' } },
      { q: { uk: 'Імпульс якої тривалості ставить сервопривід у середнє положення?', en: 'What pulse length puts a servo in the middle position?' }, opts: [{ uk: '1,5 мс', en: '1.5 ms' }, { uk: '15 мс', en: '15 ms' }, { uk: '0,15 мс', en: '0.15 ms' }, { uk: '1,5 с', en: '1.5 s' }], a: 0,
        ex: { uk: '1 мс — один край, 2 мс — інший, 1,5 мс — середина.', en: '1 ms is one end, 2 ms the other, 1.5 ms the middle.' }, see: { m: 'm08', s: 's9' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>силових транзисторів</b> регулятора обертів.', en: 'Tap the <b>power transistors</b> of the speed controller.' },
        fig: { photo: 'r1-123', hot: [{ id: 'fet', p: [49, 28, 27, 47] }, { id: 'mcu', p: [30, 37, 15, 21] }, { id: 'cap', p: [0, 33, 22, 40] }, { id: 'prog', p: [32, 57, 16, 10] }] },
        a: 'fet', ex: { uk: 'Ряди однакових восьминогих корпусів праворуч — MOSFET-и.', en: 'The rows of identical eight-leg packages on the right are MOSFETs.' }, see: { m: 'm08', s: 's8' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>мікроконтролера</b> регулятора обертів.', en: 'Tap the speed controller’s <b>microcontroller</b>.' },
        fig: { photo: 'r1-123', hot: [{ id: 'mcu', p: [30, 37, 15, 21] }, { id: 'fet', p: [49, 28, 27, 47] }, { id: 'phase', p: [72, 28, 10, 45] }, { id: 'cap', p: [0, 33, 22, 40] }] },
        a: 'mcu', ex: { uk: 'Квадратна мікросхема з виводами з чотирьох боків (U5) — мікроконтролер.', en: 'The square chip with leads on four sides (U5) is the microcontroller.' }, see: { m: 'm08', s: 's8' } }
    ]
  });
})();
