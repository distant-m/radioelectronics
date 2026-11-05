/* Module 15 — PCB anatomy */
(function () {
  APP.module({
    id: 'm15', n: 15, part: 'E', cv: 1,
    title: { uk: 'Анатомія друкованої плати', en: 'Anatomy of a printed circuit board' },
    short: { uk: 'Шари, доріжки, переходи, земля, контрольні точки', en: 'Layers, traces, vias, ground, test points' },
    intro: {
      uk: 'Ми вже знаємо деталі й вузли. Залишилось зрозуміти саму плату: з чого вона складається, як по ній «бігають» сигнали і як простежити доріжку від однієї деталі до іншої.',
      en: 'You already know the parts and the blocks. What remains is the board itself: what it is made of, how signals “run” across it, and how to follow a trace from one part to another.'
    },
    warm: ['m12q10', 'm05q10', 'm07q18'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Бутерброд із міді й склотекстоліту', en: 'A sandwich of copper and fibreglass' },
        body: {
          uk: '<p>Друкована плата — це шари:</p><ul><li><b>основа</b> — склотекстоліт (FR-4), ізолятор;</li><li><b>мідь</b> — провідні шари з доріжками; їх буває 2, 4, 6 і більше;</li><li><b>паяльна маска</b> — тонке покриття (зелене, чорне, синє), що захищає мідь і не дає припою розтектися;</li><li><b>шовкографія</b> — білі написи: позиційні позначення, ключі, логотипи.</li></ul><p>Польотні контролери зазвичай 4–8-шарові: на поверхні видно лише верхній і нижній шари, решта — всередині.</p>',
          en: '<p>A printed circuit board is layers:</p><ul><li>the <b>core</b> — fibreglass (FR-4), an insulator;</li><li><b>copper</b> — conductive layers with traces: 2, 4, 6 or more;</li><li><b>solder mask</b> — a thin coating (green, black, blue) that protects the copper and keeps solder from spreading;</li><li><b>silkscreen</b> — white printing: reference designators, keys, logos.</li></ul><p>Flight controllers are usually 4–8 layers: only the top and bottom are visible; the rest are inside.</p>'
        },
        recall: [{ m: 'm05', s: 's5', label: { uk: 'Позиційні позначення', en: 'Reference designators' } }],
        fig: { photo: 'r2-168', cap: { uk: 'Край багатошарової плати: видно шари.', en: 'The edge of a multilayer board: the layers are visible.' } }
      },
      {
        kind: 1,
        title: { uk: 'Доріжки: ширина — це струм', en: 'Traces: width means current' },
        body: {
          uk: '<p>Мідні доріжки — «дроти» плати. Їхня ширина підказує, що по них іде:</p><ul><li><b>тонкі</b> (0,1–0,2 мм) — сигнали: шини, логіка;</li><li><b>широкі</b> та цілі мідні полігони — живлення й силові струми;</li><li><b>рівні, однакової ширини, часто парами</b> — швидкісні сигнали (USB, відео);</li><li><b>рівна доріжка з «парканом» отворів</b> — радіочастотна лінія 50 Ом.</li></ul>',
          en: '<p>Copper traces are the board’s “wires”. Their width hints at what they carry:</p><ul><li><b>thin</b> (0.1–0.2 mm) — signals: buses, logic;</li><li><b>wide</b> traces and whole copper pours — power and high currents;</li><li><b>even, equal-width, often in pairs</b> — high-speed signals (USB, video);</li><li><b>a straight trace with a “fence” of holes</b> — a 50 Ω RF line.</li></ul>'
        },
        recall: [{ m: 'm12', s: 's5', label: { uk: 'Мікросмужкова лінія', en: 'The microstrip line' } }]
      },
      {
        kind: 1,
        title: { uk: 'Переходи (via): ліфти між шарами', en: 'Vias: lifts between layers' },
        body: {
          uk: '<p><b>Via</b> — металізований отвір, що з’єднує доріжки різних шарів. Сигнал «пірнає» у via на верхньому шарі й «виринає» на нижньому чи внутрішньому.</p><ul><li>Ряди дрібних via навколо екранів і вздовж ВЧ-ліній — «прошивка» землі.</li><li>Скупчення via під мікросхемою чи регулятором — тепловідвід у шар землі.</li></ul><p>На мікрофото розрізу видно, як via проходить крізь усі шари плати поруч із кульками BGA.</p>',
          en: '<p>A <b>via</b> is a plated hole that connects traces on different layers. A signal “dives” into a via on the top layer and “surfaces” on the bottom or an inner one.</p><ul><li>Rows of small vias around shields and along RF lines are ground “stitching”.</li><li>A cluster of vias under a chip or regulator carries heat into the ground layer.</li></ul><p>A cross-section micrograph shows a via passing through all the layers next to BGA balls.</p>'
        },
        fig: { photo: 'r2-171', cap: { uk: 'Мікрофото розрізу: кульки BGA, мідні шари і перехід крізь плату.', en: 'Cross-section micrograph: BGA balls, copper layers and a via through the board.' } }
      },
      {
        kind: 2,
        title: { uk: 'Плата знизу: доріжки й переходи', en: 'A board from below: traces and vias' },
        body: { uk: '<p>Нижній бік плати: сотні via і доріжки між ними. Дивимося, як тонкі сигнальні лінії відрізняються від широких полігонів живлення.</p>', en: '<p>The bottom of a board: hundreds of vias and the traces between them. Notice how thin signal lines differ from wide power pours.</p>' },
        fig: { photo: 'r1-245' }
      },
      {
        kind: 1,
        title: { uk: 'Земля: найбільша мідь на платі', en: 'Ground: the largest copper on the board' },
        body: {
          uk: '<p>Найбільша мідна площа на платі — майже завжди <b>земля</b> (GND). Часто їй відведено цілий внутрішній шар. Земля:</p><ul><li>загальна точка відліку всіх напруг;</li><li>«щит» для сигналів і радіочастини;</li><li>шлях повернення струму — кожен струм повертається до джерела саме по землі.</li></ul><p>Як знайти землю на незнайомій платі: мінус батареї, корпуси роз’ємів USB і SMA, отвори кріплення (часто), великі полігони.</p>',
          en: '<p>The largest copper area on a board is almost always <b>ground</b> (GND). Often a whole inner layer is dedicated to it. Ground is:</p><ul><li>the common reference for all voltages;</li><li>a “shield” for signals and the radio section;</li><li>the return path — every current goes back to its source through ground.</li></ul><p>How to find ground on an unfamiliar board: the battery minus, the shells of USB and SMA connectors, mounting holes (often), large copper pours.</p>'
        },
        recall: [{ m: 'm05', s: 's4', label: { uk: 'Символ землі', en: 'The ground symbol' } }]
      },
      {
        kind: 2,
        title: { uk: 'Голий друк: плата до монтажу', en: 'A bare board before assembly' },
        body: { uk: '<p>6-шарова плата без деталей. Видно майданчики під деталі, підписи котушок L1, L2, L5 і рівні ВЧ-доріжки — це радіоплата. Порожні майданчики підказують, які корпуси сюди стануть.</p>', en: '<p>A 6-layer board with no parts. You can see the pads for parts, coil labels L1, L2, L5 and even RF traces — it is a radio board. The empty pads hint at which packages go where.</p>' },
        fig: { photo: 'r2-170' }
      },
      {
        kind: 1,
        title: { uk: 'Контрольні точки і майданчики налагодження', en: 'Test points and debug pads' },
        body: {
          uk: '<p>Круглі чи квадратні голі майданчики з підписами — <b>контрольні точки</b> (TP) і майданчики для налагодження й прошивання:</p><ul><li><b>TX, RX, GND</b> — послідовний порт (UART), часто — консоль пристрою;</li><li><b>SWDIO, SWCLK</b> — прошивання й налагодження процесорів STM32;</li><li><b>MOSI, MISO, SCK, RST</b> — прошивання по SPI;</li><li><b>BOOT</b> — перемичка режиму завантаження.</li></ul><p>Через них пристрій можна «оживити», прошити чи прочитати.</p>',
          en: '<p>Round or square bare pads with labels are <b>test points</b> (TP) and pads for debugging and flashing:</p><ul><li><b>TX, RX, GND</b> — a serial port (UART), often the device console;</li><li><b>SWDIO, SWCLK</b> — flashing and debugging STM32 processors;</li><li><b>MOSI, MISO, SCK, RST</b> — flashing over SPI;</li><li><b>BOOT</b> — a boot-mode jumper.</li></ul><p>Through them a device can be revived, flashed or read.</p>'
        },
        recall: [{ m: 'm08', s: 's8', label: { uk: 'Майданчики прошивання ESC', en: 'ESC programming pads' } }, { m: 'm09', s: 's3', label: { uk: 'UART', en: 'UART' } }],
        fig: { photo: 'r1-248', cap: { uk: 'Майданчики з підписами TX, RX, CLK, DIO, GND, VD.', en: 'Pads labelled TX, RX, CLK, DIO, GND, VD.' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: як простежити доріжку', en: 'Combine: how to trace a connection' },
        body: {
          uk: '<ol><li>Знаходимо вивід (за виводом 1 і нумерацією — модуль 4).</li><li>Ведемо очима доріжку від виводу, зважаючи на via: якщо вона «пірнула» — шукаємо на іншому боці плати в тому самому місці.</li><li>Підсвічуємо плату ззаду ліхтариком — на тонких платах доріжки просвічуються.</li><li>Перевіряємо <b>мультиметром</b> у режимі продзвону: пищить — з’єднано (модуль 17).</li><li>Звіряємося зі схемою чи документацією на мікросхему: який вивід — що робить.</li></ol>',
          en: '<ol><li>Find the pin (via pin 1 and the numbering — module 4).</li><li>Follow the trace from the pin by eye, minding vias: if it “dives”, look on the other side of the board at the same spot.</li><li>Shine a torch from behind — on thin boards traces show through.</li><li>Check with a <b>multimeter</b> in continuity mode: a beep means connected (module 17).</li><li>Compare with the schematic or the chip’s datasheet: which pin does what.</li></ol>'
        },
        recall: [{ m: 'm04', s: 's6', label: { uk: 'Вивід 1', en: 'Pin 1' } }],
        fig: { photo: 'r1-247', cap: { uk: 'Контрольна точка (обведена) і доріжки до великої мікросхеми.', en: 'A test point (circled) and traces to a large chip.' } }
      }
    ],
    sources: [
      { t: { uk: 'IPC-2221 — загальний стандарт проєктування друкованих плат (ширина доріжок, струм)', en: 'IPC-2221 — generic PCB design standard (trace width vs current)' } },
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид. — розділ 12 (конструювання, заземлення)', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed. — chapter 12 (construction, grounding)' } },
      { t: { uk: 'STMicroelectronics — інтерфейс SWD для прошивання STM32', en: 'STMicroelectronics — the SWD interface for flashing STM32' } }
    ],
    quiz: [
      { q: { uk: 'Що таке паяльна маска?', en: 'What is solder mask?' }, opts: [{ uk: 'Кольорове покриття, що захищає мідь і не дає припою розтектися', en: 'A coloured coating that protects copper and keeps solder from spreading' }, { uk: 'Білі написи', en: 'White printing' }, { uk: 'Захисна маска для паяльщика', en: 'A protective mask for the person soldering' }, { uk: 'Внутрішній шар міді', en: 'An inner copper layer' }], a: 0,
        ex: { uk: 'Зелена (чи інша) маска — над міддю, крім майданчиків.', en: 'The green (or other) mask covers the copper except at pads.' }, see: { m: 'm15', s: 's1' } },
      { q: { uk: 'Що надруковано шовкографією?', en: 'What is printed in silkscreen?' }, opts: [{ uk: 'Позиційні позначення, ключі, логотипи', en: 'Reference designators, keys, logos' }, { uk: 'Доріжки живлення', en: 'Power traces' }, { uk: 'Антена', en: 'The antenna' }, { uk: 'Нічого — це декор', en: 'Nothing — it’s decoration' }], a: 0,
        ex: { uk: 'Білі написи R12, C5, U3, крапки виводу 1.', en: 'The white labels R12, C5, U3, pin-1 dots.' }, see: { m: 'm15', s: 's1' } },
      { q: { uk: 'Скільки шарів міді зазвичай у польотного контролера?', en: 'How many copper layers does a flight controller usually have?' }, opts: [{ uk: '4–8', en: '4–8' }, { uk: '1', en: '1' }, { uk: '2', en: '2' }, { uk: '50', en: '50' }], a: 0,
        ex: { uk: 'Щільна плата з радіо й швидкими шинами — 4–8 шарів.', en: 'A dense board with radio and fast buses has 4–8 layers.' }, see: { m: 'm15', s: 's1' } },
      { q: { uk: 'Що найімовірніше передає широка доріжка чи мідний полігон?', en: 'What does a wide trace or copper pour most likely carry?' }, opts: [{ uk: 'Живлення або великий струм', en: 'Power or high current' }, { uk: 'Сигнал I²C', en: 'An I²C signal' }, { uk: 'Радіосигнал 5,8 ГГц', en: 'A 5.8 GHz signal' }, { uk: 'Нічого', en: 'Nothing' }], a: 0,
        ex: { uk: 'Ширина доріжки — під струм.', en: 'Trace width follows current.' }, see: { m: 'm15', s: 's2' } },
      { q: { uk: 'Дві рівні паралельні доріжки однакової ширини, що йдуть до роз’єму USB, — це…', en: 'Two even parallel traces of equal width going to a USB connector are…' }, opts: [{ uk: 'Пара швидкісного сигналу (D+ і D−)', en: 'A high-speed signal pair (D+ and D−)' }, { uk: 'Живлення', en: 'Power' }, { uk: 'Земля', en: 'Ground' }, { uk: 'Помилка розводки', en: 'A layout error' }], a: 0,
        ex: { uk: 'Швидкі сигнали розводять парами однакової довжини.', en: 'Fast signals are routed as equal-length pairs.' }, see: { m: 'm15', s: 's2' } },
      { q: { uk: 'Що таке via?', en: 'What is a via?' }, opts: [{ uk: 'Металізований отвір, що з’єднує шари', en: 'A plated hole that connects layers' }, { uk: 'Отвір для кріплення', en: 'A mounting hole' }, { uk: 'Тип резистора', en: 'A resistor type' }, { uk: 'Дефект плати', en: 'A board defect' }], a: 0,
        ex: { uk: 'Via — «ліфт» для сигналу між шарами.', en: 'A via is a “lift” for a signal between layers.' }, see: { m: 'm15', s: 's3' } },
      { q: { uk: 'Навіщо скупчення via під регулятором напруги?', en: 'Why is there a cluster of vias under a voltage regulator?' }, opts: [{ uk: 'Відводять тепло в шар землі', en: 'They carry heat into the ground layer' }, { uk: 'Для антени', en: 'For the antenna' }, { uk: 'Щоб плата була легшою', en: 'To make the board lighter' }, { uk: 'Випадково', en: 'By accident' }], a: 0,
        ex: { uk: 'Мідь добре проводить тепло — via працюють як тепловідвід.', en: 'Copper conducts heat well — vias act as a heat path.' }, see: { m: 'm15', s: 's3' } },
      { q: { uk: 'Найбільша мідна площа на платі — найімовірніше…', en: 'The largest copper area on a board is most likely…' }, opts: [{ uk: 'Земля (GND)', en: 'Ground (GND)' }, { uk: 'Сигнал гіроскопа', en: 'The gyro signal' }, { uk: 'Антена', en: 'The antenna' }, { uk: 'Живлення 3,3 В', en: 'The 3.3 V supply' }], a: 0,
        ex: { uk: 'Земля — і точка відліку, і шлях повернення струму, і екран.', en: 'Ground is the reference, the return path and the shield.' }, see: { m: 'm15', s: 's5' } },
      { q: { uk: 'Як знайти землю на незнайомій платі?', en: 'How do you find ground on an unfamiliar board?' }, opts: [{ uk: 'Мінус батареї, корпуси роз’ємів USB/SMA, великі полігони', en: 'Battery minus, USB/SMA connector shells, large pours' }, { uk: 'Найтонша доріжка', en: 'The thinnest trace' }, { uk: 'Вивід 1 процесора', en: 'Processor pin 1' }, { uk: 'Червоний дріт', en: 'The red wire' }], a: 0,
        ex: { uk: 'Корпуси роз’ємів і мінус живлення майже завжди — земля.', en: 'Connector shells and the supply minus are almost always ground.' }, see: { m: 'm15', s: 's5' } },
      { q: { uk: 'Що таке шлях повернення струму?', en: 'What is the current return path?' }, opts: [{ uk: 'Кожен струм повертається до джерела по землі', en: 'Every current returns to its source through ground' }, { uk: 'Струм іде назад у батарею через антену', en: 'Current returns to the battery via the antenna' }, { uk: 'Струм не повертається', en: 'Current doesn’t return' }, { uk: 'Лише для змінного струму', en: 'AC only' }], a: 0,
        ex: { uk: 'Коло завжди замкнене: туди — по доріжці, назад — по землі.', en: 'A circuit is always closed: out along a trace, back through ground.' }, see: { m: 'm15', s: 's5' } },
      { q: { uk: 'Майданчики з підписами SWDIO і SWCLK призначені для…', en: 'Pads labelled SWDIO and SWCLK are for…' }, opts: [{ uk: 'Прошивання й налагодження процесора STM32', en: 'Flashing and debugging an STM32 processor' }, { uk: 'Підключення батареї', en: 'Connecting the battery' }, { uk: 'Антени', en: 'An antenna' }, { uk: 'Відеовходу', en: 'A video input' }], a: 0,
        ex: { uk: 'SWD — інтерфейс прошивання ARM-процесорів.', en: 'SWD is the ARM processor flashing interface.' }, see: { m: 'm15', s: 's7' } },
      { q: { uk: 'Майданчики TX, RX і GND на платі — це найімовірніше…', en: 'TX, RX and GND pads on a board are most likely…' }, opts: [{ uk: 'Послідовний порт (UART)', en: 'A serial port (UART)' }, { uk: 'Силове живлення', en: 'Power input' }, { uk: 'Шина I²C', en: 'An I²C bus' }, { uk: 'Вихід на двигун', en: 'A motor output' }], a: 0,
        ex: { uk: 'TX/RX — UART; часто це консоль пристрою.', en: 'TX/RX is a UART; often the device console.' }, see: { m: 'm15', s: 's7' } },
      { q: { uk: 'Доріжка від виводу мікросхеми зникла в отворі. Що робити?', en: 'A trace from a chip pin disappears into a hole. What do you do?' }, opts: [{ uk: 'Шукати її на іншому боці плати в тому самому місці', en: 'Look for it on the other side of the board at the same spot' }, { uk: 'Вважати, що вона нікуди не йде', en: 'Assume it goes nowhere' }, { uk: 'Свердлити плату', en: 'Drill the board' }, { uk: 'Пропустити цей вивід', en: 'Skip that pin' }], a: 0,
        ex: { uk: 'Via веде на інший шар. Внутрішні шари перевіряють продзвоном.', en: 'The via leads to another layer. Inner layers are checked with a continuity test.' }, see: { m: 'm15', s: 's8' } },
      { q: { uk: 'Як найнадійніше переконатися, що дві точки з’єднані?', en: 'What is the most reliable way to confirm two points are connected?' }, opts: [{ uk: 'Мультиметр у режимі продзвону', en: 'A multimeter in continuity mode' }, { uk: 'На око', en: 'By eye' }, { uk: 'За кольором маски', en: 'By mask colour' }, { uk: 'Лизнути', en: 'Lick it' }], a: 0,
        ex: { uk: 'Продзвін: пищить — є з’єднання. Робиться на знеструмленій платі!', en: 'Continuity: a beep means connected. Only on an unpowered board!' }, see: { m: 'm15', s: 's8' } },
      { q: { uk: 'Рівна доріжка з рядами отворів з обох боків — це…', en: 'A straight trace with rows of holes on both sides is…' }, opts: [{ uk: 'Радіочастотна лінія 50 Ом з «парканом» землі', en: 'A 50 Ω RF line with a ground “fence”' }, { uk: 'Силова шина', en: 'A power bus' }, { uk: 'Шина I²C', en: 'An I²C bus' }, { uk: 'Перемичка', en: 'A jumper' }], a: 0,
        ex: { uk: 'Via по боках «прошивають» землю навколо ВЧ-лінії.', en: 'Side vias “stitch” ground around the RF line.' }, see: { m: 'm15', s: 's2' } },
      { q: { uk: 'Що дає підсвічування плати ліхтариком ззаду?', en: 'What does shining a torch through a board do?' }, opts: [{ uk: 'На тонких платах просвічуються доріжки', en: 'On thin boards the traces show through' }, { uk: 'Заряджає конденсатори', en: 'It charges the capacitors' }, { uk: 'Перевіряє прошивку', en: 'It checks the firmware' }, { uk: 'Нічого', en: 'Nothing' }], a: 0,
        ex: { uk: 'Простий спосіб побачити доріжки на 1–2-шарових платах.', en: 'A simple way to see traces on 1–2 layer boards.' }, see: { m: 'm15', s: 's8' } }
    ]
  });
})();
