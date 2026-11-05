/* Module 4 — Packages, markings, datasheets */
(function () {
  APP.module({
    id: 'm04', n: 4, part: 'A', cv: 1,
    title: { uk: 'Корпуси, маркування, документація', en: 'Packages, markings, datasheets' },
    short: { uk: 'Як упізнати деталь за виглядом і написом', en: 'Recognising a part by its look and its label' },
    intro: {
      uk: 'Та сама схема може бути в деталях розміром із квасолину або з макове зерно. У цьому модулі ми навчимося впізнавати корпуси, знаходити перший вивід і за написом на корпусі знаходити документацію.',
      en: 'The same circuit can be built from parts the size of a bean or a poppy seed. In this module you learn to recognise packages, find pin 1, and use the marking to find the datasheet.'
    },
    warm: ['m03q14', 'm02q04', 'm03q02'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Два світи: вивідні і SMD', en: 'Two worlds: through-hole and SMD' },
        body: {
          uk: '<ul><li><b>Вивідні (THT)</b> деталі мають «ніжки», що проходять крізь отвори в платі. Великі, міцні, легко паяти вручну. Їх ставлять на роз’єми, великі конденсатори, силові елементи.</li><li><b>SMD</b> (поверхневий монтаж) деталі лежать прямо на майданчиках з одного боку плати. Крихітні, їх ставлять роботи. Майже вся сучасна електроніка, зокрема дрони, — SMD.</li></ul>',
          en: '<ul><li><b>Through-hole (THT)</b> parts have “legs” that go through holes in the board. Big, sturdy, easy to solder by hand. Used for connectors, big capacitors, power parts.</li><li><b>SMD</b> (surface-mount) parts sit on pads on one side of the board. Tiny, placed by machines. Almost all modern electronics, drones included, are SMD.</li></ul>'
        },
        fig: { photo: 'r1-067', cap: { uk: 'Корпуси транзисторів від SOT-23 до TO-3, масштаб 10 мм.', en: 'Transistor packages from SOT-23 to TO-3, 10 mm scale.' } }
      },
      {
        kind: 1,
        title: { uk: 'Розміри SMD-деталей: 0402, 0603, 0805…', en: 'SMD sizes: 0402, 0603, 0805…' },
        body: {
          uk: '<p>Резистори й конденсатори мають стандартні розміри. Код — це довжина і ширина в сотих частках дюйма:</p><ul><li><b>1206</b> — 3,2 × 1,6 мм (великі, легко паяти)</li><li><b>0805</b> — 2,0 × 1,25 мм</li><li><b>0603</b> — 1,6 × 0,8 мм (часто на польотних контролерах)</li><li><b>0402</b> — 1,0 × 0,5 мм (як піщинка)</li></ul><p>Розмір не каже нічого про номінал: в 0603 може бути і 10 Ом, і 1 МОм. Зате більший корпус витримує більшу потужність.</p>',
          en: '<p>Resistors and capacitors come in standard sizes. The code is length and width in hundredths of an inch:</p><ul><li><b>1206</b> — 3.2 × 1.6 mm (large, easy to solder)</li><li><b>0805</b> — 2.0 × 1.25 mm</li><li><b>0603</b> — 1.6 × 0.8 mm (common on flight controllers)</li><li><b>0402</b> — 1.0 × 0.5 mm (like a grain of sand)</li></ul><p>Size says nothing about the value: an 0603 can hold 10 Ω or 1 MΩ. But a bigger body handles more power.</p>'
        },
        fig: { photo: 'r2-124', cap: { uk: 'Паяння деталі 0805 пінцетом — ось реальний масштаб.', en: 'Soldering an 0805 part with tweezers — this is the real scale.' } }
      },
      {
        kind: 1,
        title: { uk: 'Корпуси мікросхем', en: 'Chip packages' },
        body: {
          uk: '<ul><li><b>DIP</b> — дві лінії ніжок крізь плату. Старий, великий.</li><li><b>SOIC / SOP</b> — дві лінії вигнутих «крилець» по боках.</li><li><b>TQFP / LQFP</b> — ніжки з усіх чотирьох боків. Так виглядає процесор польотного контролера.</li><li><b>QFN</b> — квадрат <b>без ніжок</b>: контакти — лише майданчики по краях і великий під дном. Типовий корпус гіроскопа.</li><li><b>BGA</b> — кульки припою під дном, ніжок не видно взагалі.</li></ul>',
          en: '<ul><li><b>DIP</b> — two rows of legs through the board. Old and large.</li><li><b>SOIC / SOP</b> — two rows of bent “gull-wing” leads on the sides.</li><li><b>TQFP / LQFP</b> — leads on all four sides. This is what a flight-controller processor looks like.</li><li><b>QFN</b> — a square with <b>no legs</b>: only pads along the edges and a big one underneath. A typical gyro package.</li><li><b>BGA</b> — solder balls under the body; no leads visible at all.</li></ul>'
        },
        fig: { photo: 'r1-073', cap: { uk: 'Та сама мікросхема NE555 у корпусах DIP (ліворуч) і SOIC (праворуч).', en: 'The same NE555 chip in DIP (left) and SOIC (right) packages.' } }
      },
      {
        kind: 2,
        title: { uk: 'QFN і BGA: ніжок не видно', en: 'QFN and BGA: no visible legs' },
        body: {
          uk: '<p>QFN — контакти лише по краях. Ця мікросхема CP2102 — міст USB↔UART. USB теж послідовна шина (Universal Serial Bus), але складна: пакети, адреси, керує всім комп’ютер. А мікроконтролер найпростіше говорить через UART — два проводи TX і RX (модуль 9). CP2102 перекладає з однієї «мови» на іншу. Така сама стоїть на багатьох платах ESP32 і на старих польотних контролерах.</p>',
          en: '<p>QFN — contacts only along the edges. This CP2102 is a USB↔UART bridge. USB is a serial bus too (Universal Serial Bus), but a complex one: packets, addresses, and the computer runs everything. A microcontroller talks most simply over UART — two wires, TX and RX (module 9). The CP2102 translates between the two “languages”. The same chip sits on many ESP32 boards and older flight controllers.</p>'
        },
        fig: { photo: 'r1-081' },
        body2: { uk: '<p>BGA: кульки припою під корпусом. Їх видно лише збоку, і то не завжди.</p>', en: '<p>BGA: solder balls under the body. You see them only from the side, and not always.</p>' }
      },
      {
        kind: 2,
        title: { uk: 'BGA збоку', en: 'BGA from the side' },
        body: { uk: '', en: '' },
        fig: { photo: 'r1-089', cap: { uk: 'Кульки BGA між мікросхемою і платою.', en: 'BGA balls between the chip and the board.' } }
      },
      {
        kind: 1,
        title: { uk: 'Де перший вивід', en: 'Where pin 1 is' },
        body: {
          uk: '<p>Щоб читати схему, треба знати, де <b>вивід 1</b>. Його позначають:</p><ul><li>крапкою чи ямкою на корпусі;</li><li>скошеним кутом або виїмкою (у DIP);</li><li>крапкою чи трикутником на платі (білим шовкографом).</li></ul><p>Далі виводи нумерують <b>проти годинникової стрілки</b>, якщо дивитися згори. Обережно: на корпусі бувають заводські фарбові мітки — вони не мають стосунку до виводу 1.</p>',
          en: '<p>To read a schematic you must know where <b>pin 1</b> is. It is marked by:</p><ul><li>a dot or dimple on the body;</li><li>a bevelled corner or a notch (on DIP);</li><li>a dot or triangle on the board (white silkscreen).</li></ul><p>From there, pins are numbered <b>counter-clockwise</b> seen from above. Careful: some chips carry factory paint marks that have nothing to do with pin 1.</p>'
        },
        fig: {
          photo: 'r1-088',
          hot: [
            { id: 'dimple', p: [23, 22, 10, 10], label: { uk: 'Ямка на корпусі', en: 'Dimple on the body' }, info: { uk: 'показує кут виводу 1', en: 'marks the pin-1 corner' } },
            { id: 'silk', p: [1, 11, 10, 9], label: { uk: 'Крапка на платі біля U2', en: 'Dot on the board by U2' }, info: { uk: 'дублює позначку виводу 1', en: 'repeats the pin-1 mark' } },
            { id: 'pin1', p: [5, 22, 14, 6], label: { uk: 'Вивід 1', en: 'Pin 1' }, info: { uk: 'далі — проти годинникової стрілки', en: 'then counter-clockwise' } },
            { id: 'paint', p: [67, 24, 14, 14], label: { uk: 'Жовта фарба', en: 'Yellow paint' }, info: { uk: 'заводська мітка, НЕ вивід 1', en: 'a factory mark, NOT pin 1' } }
          ]
        }
      },
      {
        kind: 2,
        title: { uk: 'Рахуємо виводи', en: 'Counting pins' },
        body: {
          uk: '<p>Тут виробник плати надрукував номери виводів 26, 51, 76 і 100 біля кутів. Крапка на корпусі — біля виводу 1, ліворуч унизу. Номери зростають проти годинникової стрілки: 1–25 знизу, 26–50 праворуч, 51–75 угорі, 76–100 ліворуч.</p>',
          en: '<p>Here the board maker printed pin numbers 26, 51, 76 and 100 near the corners. The dot on the body is next to pin 1, bottom left. Numbers rise counter-clockwise: 1–25 along the bottom, 26–50 on the right, 51–75 on top, 76–100 on the left.</p>'
        },
        fig: { photo: 'r1-085' }
      },
      {
        kind: 1,
        title: { uk: 'Маркування: що написано на корпусі', en: 'Markings: what the body says' },
        body: {
          uk: '<p>На великих мікросхемах написана назва майже повністю: виробник, модель, дата випуску. На дрібних — <b>скорочений код</b> із 2–4 символів.</p><ul><li>Великий напис → шукаємо в інтернеті «назва + datasheet».</li><li>Короткий код → шукаємо «код + SMD marking + корпус» (наприклад, «B2 SOD-123»). Один і той самий код у різних виробників може означати різні деталі — корпус звужує пошук.</li></ul>',
          en: '<p>Large chips carry nearly the full name: maker, model, date code. Small ones carry a <b>short code</b> of 2–4 characters.</p><ul><li>A full name → search “name + datasheet”.</li><li>A short code → search “code + SMD marking + package” (for example “B2 SOD-123”). The same code can mean different parts from different makers — the package narrows it down.</li></ul>'
        },
        fig: { photo: 'r1-082', cap: { uk: 'Мікросхема флеш-пам’яті: на корпусі видно виробника і модель — 25DF041A.', en: 'A flash memory chip: the maker and model, 25DF041A, are readable.' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: читаємо документацію (datasheet)', en: 'Combine: reading a datasheet' },
        body: {
          uk: '<p>Документація виробника на 20–100 сторінок лякає, але новачку потрібні лише чотири місця:</p><ol><li><b>Перша сторінка</b> — що це і для чого (короткий опис, головні цифри).</li><li><b>Розташування виводів</b> (pinout) — малюнок корпусу з номерами й назвами виводів.</li><li><b>Граничні параметри</b> (absolute maximum ratings) — що деталь <b>не</b> витримає: напруга, струм, температура.</li><li><b>Типова схема ввімкнення</b> (typical application) — готова схема, яку повторюють на платах. Часто на платі видно саме її.</li></ol>',
          en: '<p>A 20–100 page manufacturer datasheet is intimidating, but a beginner needs only four places:</p><ol><li><b>Page one</b> — what it is and what it’s for (short description, key numbers).</li><li><b>Pin configuration</b> (pinout) — a drawing of the package with pin numbers and names.</li><li><b>Absolute maximum ratings</b> — what the part will <b>not</b> survive: voltage, current, temperature.</li><li><b>Typical application</b> — a ready circuit that boards copy. Often that is exactly what you see on the board.</li></ol>'
        },
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: що всередині флешки', en: 'Device: what’s inside a USB stick' },
        body: {
          uk: '<p>Проста флешка — ідеальна перша «розібрана» плата. Торкаємося частин: тут є роз’єм, контролер, пам’ять, кварцовий резонатор, світлодіод і вимикач.</p>'
            + '<p><b>Як зрозуміти, що це контролер?</b> Три ознаки разом: квадратний корпус із виводами з усіх чотирьох боків (TQFP); стоїть одразу біля роз’єму USB, а доріжки йдуть від нього і до роз’єму, і до пам’яті; поруч — кварц. Остаточно підтверджує маркування: <b>OTi</b> — логотип тайванської компанії Ours Technology, що робила контролери для флешок. Шукаємо «OTi2168» — і бачимо: USB-контролер флеш-диска.</p>'
            + '<p><b>Що робить контролер?</b> З комп’ютером він говорить по USB, а з пам’яттю — по її власній паралельній шині. Він перетворює «запиши файл» на команди для мікросхеми пам’яті, рівномірно розподіляє запис, щоб комірки зношувалися однаково, і обходить зіпсовані комірки. Без контролера мікросхема пам’яті для комп’ютера — просто купа виводів.</p>'
            + '<p><b>Кварцовий резонатор</b> (кварц) — пластинка кварцу в металевому корпусі, що коливається з дуже точною частотою, як камертон. Контролер рахує від неї час — це його «метроном». USB вимагає точного темпу передачі, тож без кварцу флешка не «домовиться» з комп’ютером. Частоту пишуть на корпусі: тут <b>12.000</b> = 12 МГц, а на платі поруч підпис <b>XTAL1</b> (від crystal — кристал).</p>',
          en: '<p>A simple USB stick is the perfect first “opened” board. Tap its parts: connector, controller, memory, crystal, LED and switch.</p>'
            + '<p><b>How do we know it is the controller?</b> Three signs together: a square package with pins on all four sides (TQFP); it sits right next to the USB connector, with traces running from it both to the connector and to the memory; and a crystal is nearby. The marking confirms it: <b>OTi</b> is the logo of Ours Technology, a Taiwanese maker of flash-drive controllers. Search “OTi2168” and you find a USB flash-disk controller.</p>'
            + '<p><b>What does the controller do?</b> It talks USB to the computer and the memory’s own parallel bus to the memory chip. It turns “write a file” into commands for the memory, spreads writes evenly so the cells wear out at the same rate, and skips bad cells. Without the controller, the memory chip is just a pile of pins to the computer.</p>'
            + '<p>A <b>crystal</b> (quartz resonator) is a sliver of quartz in a metal can that vibrates at a very exact frequency, like a tuning fork. The controller keeps time from it — it is its “metronome”. USB needs an exact data rate, so without a crystal the stick cannot “agree” with the computer. The frequency is printed on the can: here <b>12.000</b> = 12 MHz, and next to it on the board is the label <b>XTAL1</b> (from crystal).</p>'
        },
        fig: {
          photo: 'r1-002',
          hot: [
            { id: 'usb', p: [4, 8, 22, 22], label: { uk: 'Роз’єм USB', en: 'USB connector' }, info: { uk: 'живлення 5 В і дані', en: '5 V power and data' } },
            { id: 'ctrl', p: [38, 13, 13, 13], label: { uk: 'Контролер (TQFP)', en: 'Controller (TQFP)' }, info: { uk: '«мозок»: говорить із комп’ютером по USB і керує пам’яттю', en: 'the “brain”: talks USB to the computer and manages the memory' } },
            { id: 'flash', p: [53, 10, 23, 21], label: { uk: 'Флеш-пам’ять', en: 'Flash memory' }, info: { uk: 'тут зберігаються файли', en: 'where the files are stored' } },
            { id: 'xtal', p: [72, 57, 8, 21], label: { uk: 'Кварцовий резонатор (кварц), 12 МГц', en: 'Crystal (quartz resonator), 12 MHz' }, info: { uk: '«метроном» контролера: задає точну частоту для USB', en: 'the controller’s “metronome”: sets the exact frequency for USB' } },
            { id: 'led', p: [88, 62, 8, 9], label: { uk: 'Світлодіод', en: 'LED' }, info: { uk: 'блимає під час запису', en: 'blinks while writing' } },
            { id: 'sw', p: [31, 76, 13, 7], label: { uk: 'Вимикач захисту від запису', en: 'Write-protect switch' } }
          ],
          cap: { uk: 'Цифри на фото — від автора світлини; торкаємося самих деталей.', en: 'The numbers on the photo are the photographer’s; tap the parts themselves.' }
        }
      },
      {
        kind: 5,
        title: { uk: 'На платі: одна функція — різні корпуси', en: 'On the board: one function, different packages' },
        body: {
          uk: 'На платі: одна функція — різні корпуси', en: 'On the board: one function, different packages' },
        body: {
          uk: '<p>Спершу — що це за деталь. <b>Стабілізатор напруги</b> — мікросхема з трьома виводами: <b>вхід, земля, вихід</b>. На вхід подаємо «неточну» напругу — наприклад, 7–12 В від батареї, яка поступово сідає, — а на виході отримуємо рівно <b>5 В</b>, хоч би як змінювався вхід. Число в назві — це вихідна напруга: 78<b>05</b> дає 5 В, 78<b>12</b> — 12 В.</p><p>Як він це робить? Зайву напругу перетворює на тепло. Зі 12 В до 5 В — 7 В залишаються на стабілізаторі, і кожен ампер струму дає 7 Вт тепла. Тому потужному стабілізатору потрібен великий корпус із металевою пластиною та отвором для радіатора. Схему зі стабілізатором прочитаємо в модулі 5, а живлення детально розберемо в модулі 7.</p>',
          en: '<p>First — what is this part? A <b>voltage regulator</b> is a chip with three pins: <b>input, ground, output</b>. We feed an “imprecise” voltage into the input — say 7–12 V from a battery that slowly runs down — and get exactly <b>5 V</b> at the output, however the input changes. The number in the name is the output voltage: 78<b>05</b> gives 5 V, 78<b>12</b> gives 12 V.</p><p>How does it do that? It turns the extra voltage into heat. From 12 V down to 5 V, 7 V stay across the regulator, and every amp of current makes 7 W of heat. That is why a powerful regulator needs a big package with a metal tab and a hole for a heatsink. We will read a regulator schematic in module 5 and take power supplies apart in module 7.</p>'
        },
        fig: { anim: 'regulator', opts: { vin: 12 }, cap: { uk: 'Рухаємо повзунки: змінюємо напругу батареї й струм лампи, перемикаємо 7805 і 78L05. Вихід тримається на 5 В, а корпус гріється.', en: 'Move the sliders: change the battery voltage and the lamp current, switch between 7805 and 78L05. The output holds at 5 V while the body heats up.' } },
        body2: {
          uk: '<p>На фото — 7805 у великому корпусі TO-220 і його молодший брат 78L05 у маленькому TO-92. Функція та сама, але 7805 витримує до 1,5 А, а маленький — лише ~0,1 А. Корпус підказує, яку потужність деталь розрахована пропускати.</p><p><b>Як читати маркування:</b></p><ul><li><b>78</b> — сімейство стабілізаторів <b>плюсової</b> напруги. Їхні «дзеркальні брати» <b>79</b>xx дають мінусову напругу (7905 = −5 В).</li><li><b>05</b> — вихідна напруга у вольтах: 7805 = 5 В, 7809 = 9 В, 7812 = 12 В.</li><li><b>L</b> посередині — low, «слабкий»: до ~0,1 А. Буває ще <b>M</b> — medium, до ~0,5 А. Без літери — до 1,5 А.</li><li>Літери <b>перед</b> числом — виробник: L7805 — ST, MC7805 — ON Semi, UA7805 (µA7805) — Texas Instruments. Функція однакова.</li><li>Літери <b>після</b> — варіант виконання. У UA7805<b>C</b> на фото «C» означає робочий діапазон 0…125 °C.</li><li>Окремий рядок цифр і літер (тут «36AHHV9» біля логотипа TI) — код партії й дати. Для нас неважливий.</li></ul>',
          en: '<p>In the photo: the 7805 in a large TO-220 package and its little brother, the 78L05, in a small TO-92. The function is the same, but the 7805 handles up to 1.5 A and the small one only ~0.1 A. The package hints at how much power a part is built to handle.</p><p><b>How to read the marking:</b></p><ul><li><b>78</b> is the family of <b>positive</b>-voltage regulators. Their “mirror siblings”, <b>79</b>xx, give a negative voltage (7905 = −5 V).</li><li><b>05</b> is the output voltage in volts: 7805 = 5 V, 7809 = 9 V, 7812 = 12 V.</li><li><b>L</b> in the middle means low power: up to ~0.1 A. There is also <b>M</b>, medium, up to ~0.5 A. No letter — up to 1.5 A.</li><li>Letters <b>before</b> the number are the maker: L7805 — ST, MC7805 — ON Semi, UA7805 (µA7805) — Texas Instruments. Same function.</li><li>Letters <b>after</b> it are the version. In the UA7805<b>C</b> in the photo, “C” means the 0…125 °C operating range.</li><li>A separate line of digits and letters (here “36AHHV9” next to the TI logo) is a batch and date code. Not important for us.</li></ul>'
        },
        fig2: { photo: 'r1-099', marks: [{ p: [15, 32, 23, 8.5], t: { uk: 'маркування', en: 'marking' } }] }
      },
      {
        id: 's11b',
        kind: 5,
        title: { uk: 'Транзистор чи стабілізатор?', en: 'Transistor or regulator?' },
        recall: [{ m: 'm03', s: 's11', label: { uk: 'Транзистори в TO-92', en: 'Transistors in TO-92' } }, { m: 'm03', s: 's12', label: { uk: 'MOSFET', en: 'MOSFET' } }],
        body: {
          uk: '<p>Транзистори ми вже бачили в таких самих корпусах (модуль 3). Зовні стабілізатор у TO-220 і транзистор у TO-220 однакові, так само як і маленькі TO-92. Розрізняємо їх так:</p><ol><li><b>Читаємо маркування.</b> 78xx, 79xx, LM317, AMS1117 — стабілізатори. 2N…, BC…, BD…, TIP… — звичайні (біполярні) транзистори. IRF…, IRLZ… — польові (MOSFET).</li><li><b>Дивимося, що поруч на платі.</b> Біля стабілізатора — конденсатори на вході й на виході, а середній вивід іде на землю. Транзистор стоїть на шляху до навантаження (двигуна, котушки, світлодіодів), а до його бази чи затвора йде резистор від мікросхеми.</li><li><b>Шукаємо підпис на платі.</b> Стабілізатор зазвичай позначають U (або IC), транзистор — Q (або VT). Про ці літери — у модулі 5.</li></ol>',
          en: '<p>We have already seen transistors in exactly these packages (module 3). From outside, a regulator in TO-220 and a transistor in TO-220 look the same, and so do the small TO-92 ones. We tell them apart like this:</p><ol><li><b>Read the marking.</b> 78xx, 79xx, LM317, AMS1117 are regulators. 2N…, BC…, BD…, TIP… are ordinary (bipolar) transistors. IRF…, IRLZ… are MOSFETs.</li><li><b>Look at the neighbours on the board.</b> A regulator has capacitors at its input and output, and its middle pin goes to ground. A transistor sits in the path to a load (a motor, a coil, LEDs), and a resistor runs from a chip to its base or gate.</li><li><b>Find the label on the board.</b> A regulator is usually marked U (or IC), a transistor Q (or VT). More on these letters in module 5.</li></ol>'
        },
        fig: {
          svg: function (L) {
            function to220(cx, y, name, pins, cls) {
              var s = '<rect class="st" x="' + (cx - 30) + '" y="' + y + '" width="60" height="34" rx="3"/><circle class="st" cx="' + cx + '" cy="' + (y + 16) + '" r="8"/>' +
                '<rect class="fl" x="' + (cx - 32) + '" y="' + (y + 34) + '" width="64" height="58" rx="3" style="opacity:.85"/>' +
                '<text x="' + cx + '" y="' + (y + 68) + '" text-anchor="middle" style="fill:var(--fig-bg);font:600 12px var(--mono)">' + name + '</text>';
              for (var i = 0; i < 3; i++) { var x = cx - 24 + i * 24; s += '<line class="st" x1="' + x + '" y1="' + (y + 92) + '" x2="' + x + '" y2="' + (y + 130) + '" style="stroke-width:4"/>' + '<text class="lbl ' + cls + '" x="' + x + '" y="' + (y + 148) + '" text-anchor="middle" style="font-size:11px">' + L(pins[i]) + '</text>'; }
              return s;
            }
            function to92(cx, y, name, pins, cls) {
              var s = '<path class="fl" d="M' + (cx - 30) + ',' + (y + 34) + ' L' + (cx - 30) + ',' + (y + 10) + ' Q' + (cx - 30) + ',' + y + ' ' + (cx - 20) + ',' + y + ' L' + (cx + 20) + ',' + y + ' Q' + (cx + 30) + ',' + y + ' ' + (cx + 30) + ',' + (y + 10) + ' L' + (cx + 30) + ',' + (y + 34) + ' Z" style="opacity:.85"/>' +
                '<text x="' + cx + '" y="' + (y + 22) + '" text-anchor="middle" style="fill:var(--fig-bg);font:600 11px var(--mono)">' + name + '</text>';
              for (var i = 0; i < 3; i++) { var x = cx - 22 + i * 22; s += '<line class="st" x1="' + x + '" y1="' + (y + 34) + '" x2="' + x + '" y2="' + (y + 66) + '"/>' + '<text class="lbl ' + cls + '" x="' + x + '" y="' + (y + 82) + '" text-anchor="middle" style="font-size:11px">' + L(pins[i]) + '</text>'; }
              return s;
            }
            var IN = { uk: 'вх', en: 'IN' }, G = { uk: 'зем', en: 'GND' }, OUT = { uk: 'вих', en: 'OUT' };
            return D.svg(380, 330,
              '<text class="tx" x="95" y="16" text-anchor="middle" style="font-weight:600">' + L({ uk: 'стабілізатори', en: 'regulators' }) + '</text>' +
              '<text class="tx" x="285" y="16" text-anchor="middle" style="font-weight:600">' + L({ uk: 'транзистори', en: 'transistors' }) + '</text>' +
              '<line class="grid" x1="190" y1="6" x2="190" y2="322"/>' +
              to220(95, 28, '7805', [IN, G, OUT], 'cuf') + to220(285, 28, 'IRLZ44N', ['G', 'D', 'S'], 'accf') +
              to92(95, 212, '78L05', [OUT, G, IN], 'cuf') + to92(285, 212, 'BC547', ['C', 'B', 'E'], 'accf') +
              '<text class="txm" x="95" y="318" text-anchor="middle">' + L({ uk: 'порядок навпаки!', en: 'order reversed!' }) + '</text>');
          },
          cap: { uk: 'Корпуси однакові — виводи різні. Корпуси показано плоским боком до нас, виводами вниз. Навіть у 7805 і 78L05 порядок виводів протилежний, тому перед паянням завжди відкриваємо документацію.', en: 'Same packages, different pins. Shown flat side towards us, pins down. Even the 7805 and 78L05 have opposite pin orders, so we always open the datasheet before soldering.' }
        }
      },
      {
        kind: 5,
        title: { uk: 'Частота, написана на корпусі', en: 'A frequency written on the body' },
        body: {
          uk: 'Частота, написана на корпусі', en: 'A frequency written on the body' },
        body: {
          uk: '<p>Ще один приклад маркування — <b>генератор частоти</b>. Це «старший брат» кварцу з флешки: у металевому корпусі вже є і кварц, і схема, що підтримує його коливання. Тож генератор сам видає готовий сигнал і має зазвичай чотири виводи: живлення, земля, вихід і вмикання. Кварцу ж потрібна допомога мікросхеми, і виводів у нього два.</p>',
          en: '<p>One more marking example — an <b>oscillator</b>. It is the “big brother” of the crystal in the USB stick: the metal can holds both a crystal and the circuit that keeps it vibrating. So an oscillator puts out a ready signal by itself and usually has four pins: power, ground, output and enable. A crystal needs a chip’s help and has two pins.</p>'
        },
        fig: { anim: 'osc', cap: { uk: 'Вмикаємо живлення і вивід «вмикання»: кварц коливається, на виході — рівні такти.', en: 'Turn on power and the enable pin: the crystal vibrates and the output gives even ticks.' } },
        body2: {
          uk: '<p>Частоту написано прямо на корпусі: «<b>40.000</b>». Крапка тут — десяткова, як пишуть англійською: 40,000 МГц = <b>40&nbsp;МГц</b>, а не «сорок тисяч». Кварци й генератори для мікросхем маркують у мегагерцах, з трьома знаками після крапки. Виняток — годинниковий кварц <b>32.768</b>: це кілогерци (32 768 Гц), він стоїть біля годинника реального часу.</p><p>У рядку «F345 7M» — серія генератора і код партії. Частоту шукаємо в рядку з крапкою.</p>',
          en: '<p>The frequency is printed right on the body: “<b>40.000</b>”. The dot is a decimal point: 40.000 MHz = <b>40 MHz</b>, not “forty thousand”. Crystals and oscillators for chips are marked in megahertz with three decimals. The exception is the watch crystal <b>32.768</b>: that is kilohertz (32,768 Hz), and it sits next to a real-time clock.</p><p>The line “F345 7M” is the oscillator series and a batch code. Look for the frequency in the line with the dot.</p>'
        },
        fig2: { photo: 'r1-146' }
      }
    ],
    sources: [
      { t: { uk: 'JEDEC — стандарти корпусів мікросхем (SOIC, QFP, QFN, BGA)', en: 'JEDEC — IC package standards (SOIC, QFP, QFN, BGA)' }, url: 'https://www.jedec.org/' },
      { t: { uk: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4-те вид., 2016 — розділ про корпуси і ІМС', en: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4th ed., 2016 — section on packages and ICs' } },
      { t: { uk: 'Silicon Labs — документація CP2102/9 «Single-Chip USB-to-UART Bridge»', en: 'Silicon Labs — CP2102/9 datasheet “Single-Chip USB-to-UART Bridge”' } },
      { t: { uk: 'Документація STMicroelectronics на L7805 / L78L05 — струм і корпуси', en: 'STMicroelectronics datasheets for L7805 / L78L05 — current and packages' } }
    ],
    quiz: [
      { q: { uk: 'Що означає літера <b>L</b> у назві 78L05?', en: 'What does the <b>L</b> in 78L05 mean?' }, opts: [{ uk: 'Слабкий варіант: до ~0,1 А', en: 'Low-power version: up to ~0.1 A' }, { uk: 'Мінусова напруга', en: 'Negative voltage' }, { uk: 'Вихід 5 В замість 12 В', en: '5 V instead of 12 V' }, { uk: 'Виробник — ST', en: 'Made by ST' }], a: 0,
        ex: { uk: 'L — low: той самий стабілізатор на 5 В, але лише до ~0,1 А. Без літери — до 1,5 А.', en: 'L means low: the same 5 V regulator, but only up to ~0.1 A. Without a letter — up to 1.5 A.' }, see: { m: 'm04', s: 's11' } },
      { q: { uk: 'На корпусі написано <b>7912</b>. Що це?', en: 'A part is marked <b>7912</b>. What is it?' }, opts: [{ uk: 'Стабілізатор мінусової напруги −12 В', en: 'A −12 V negative regulator' }, { uk: 'Стабілізатор +12 В', en: 'A +12 V regulator' }, { uk: 'Транзистор', en: 'A transistor' }, { uk: 'Стабілізатор 7,9 В', en: 'A 7.9 V regulator' }], a: 0,
        ex: { uk: '78xx — плюсова напруга, 79xx — мінусова. Останні дві цифри — вольти.', en: '78xx is positive, 79xx negative. The last two digits are the volts.' }, see: { m: 'm04', s: 's11' } },
      { q: { uk: 'Два однакові корпуси TO-220: на одному «7805», на іншому «IRLZ44N». Що можна сказати?', en: 'Two identical TO-220 packages: one says “7805”, the other “IRLZ44N”. What can we say?' }, opts: [{ uk: 'Перший — стабілізатор, другий — польовий транзистор; виводи в них різні', en: 'The first is a regulator, the second a MOSFET; their pins differ' }, { uk: 'Це та сама деталь від різних виробників', en: 'The same part from different makers' }, { uk: 'Обидва — стабілізатори', en: 'Both are regulators' }, { uk: 'Їх можна міняти місцями', en: 'They are interchangeable' }], a: 0,
        ex: { uk: 'Корпус лише «упаковка». Що всередині — каже маркування: 78xx — стабілізатор, IRF/IRLZ — MOSFET.', en: 'The package is just a “wrapper”. The marking tells what is inside: 78xx is a regulator, IRF/IRLZ a MOSFET.' }, see: { m: 'm04', s: 's11b' } },
      { q: { uk: 'Деталь у TO-220: середній вивід іде на землю, на вході й виході — конденсатори. Найімовірніше, це…', en: 'A TO-220 part: the middle pin goes to ground, capacitors at input and output. Most likely it is…' }, opts: [{ uk: 'Стабілізатор', en: 'A regulator' }, { uk: 'Транзистор, що керує двигуном', en: 'A transistor driving a motor' }, { uk: 'Кварц', en: 'A crystal' }, { uk: 'Запобіжник', en: 'A fuse' }], a: 0,
        ex: { uk: 'Вхід — земля — вихід, конденсатори з обох боків: класичне оточення стабілізатора.', en: 'Input — ground — output with capacitors on both sides: the classic regulator setup.' }, see: { m: 'm04', s: 's11b' } },
      { q: { uk: 'Чим SMD-деталі відрізняються від вивідних?', en: 'How do SMD parts differ from through-hole ones?' }, opts: [{ uk: 'Лежать на майданчиках з одного боку плати, без ніжок крізь отвори', en: 'They sit on pads on one side, without legs through holes' }, { uk: 'Вони завжди більші', en: 'They are always bigger' }, { uk: 'Вони не мають полярності', en: 'They never have polarity' }, { uk: 'Вони працюють лише на змінному струмі', en: 'They only work on AC' }], a: 0,
        ex: { uk: 'SMD — поверхневий монтаж: деталь припаяна на майданчики зверху.', en: 'SMD means surface-mount: the part is soldered onto pads on top.' }, see: { m: 'm04', s: 's1' } },
      { q: { uk: 'Що означає код розміру <b>0603</b>?', en: 'What does the size code <b>0603</b> mean?' }, opts: [{ uk: 'Корпус ≈1,6 × 0,8 мм', en: 'A body of ≈1.6 × 0.8 mm' }, { uk: 'Номінал 60 кОм', en: 'A value of 60 kΩ' }, { uk: 'Напруга 6,3 В', en: 'A 6.3 V rating' }, { uk: 'Виготовлено в червні 2003', en: 'Made in June 2003' }], a: 0,
        ex: { uk: 'Код — розмір у сотих дюйма: 0,06 × 0,03 дюйма ≈ 1,6 × 0,8 мм.', en: 'The code is size in hundredths of an inch: 0.06 × 0.03 in ≈ 1.6 × 0.8 mm.' }, see: { m: 'm04', s: 's2' } },
      { q: { uk: 'Два резистори: один 0402, другий 1206. Що можна сказати точно?', en: 'Two resistors: one 0402, one 1206. What can you say for sure?' }, opts: [{ uk: '1206 витримує більшу потужність; про номінал розмір не каже', en: 'The 1206 handles more power; size says nothing about the value' }, { uk: '1206 має більший опір', en: 'The 1206 has more resistance' }, { uk: '0402 має більший опір', en: 'The 0402 has more resistance' }, { uk: 'Вони однакові', en: 'They are identical' }], a: 0,
        ex: { uk: 'Розмір визначає потужність розсіювання, а не опір.', en: 'Size sets power dissipation, not resistance.' }, see: { m: 'm04', s: 's2' } },
      { q: { uk: 'Корпус мікросхеми з виводами на <b>всіх чотирьох</b> боках — це…', en: 'A chip package with leads on <b>all four</b> sides is…' }, opts: [{ uk: 'TQFP / LQFP', en: 'TQFP / LQFP' }, { uk: 'DIP', en: 'DIP' }, { uk: 'SOIC', en: 'SOIC' }, { uk: 'SOT-23', en: 'SOT-23' }], a: 0,
        ex: { uk: 'QFP — Quad Flat Package, ніжки з чотирьох боків.', en: 'QFP stands for Quad Flat Package: leads on four sides.' }, see: { m: 'm04', s: 's3' } },
      { q: { uk: 'Квадратна мікросхема без ніжок, контакти лише по краях і під дном. Це…', en: 'A square chip with no legs, contacts only at the edges and underneath. That is…' }, opts: [{ uk: 'QFN', en: 'QFN' }, { uk: 'DIP', en: 'DIP' }, { uk: 'TO-220', en: 'TO-220' }, { uk: 'TQFP', en: 'TQFP' }], a: 0,
        ex: { uk: 'QFN — «Quad Flat No-lead»: пласка, без ніжок.', en: 'QFN means “Quad Flat No-lead”: flat, no legs.' }, see: { m: 'm04', s: 's3' } },
      { q: { uk: 'У якого корпусу контакти — кульки припою під дном?', en: 'Which package has solder balls underneath as its contacts?' }, opts: [{ uk: 'BGA', en: 'BGA' }, { uk: 'SOIC', en: 'SOIC' }, { uk: 'DIP', en: 'DIP' }, { uk: '0805', en: '0805' }], a: 0,
        ex: { uk: 'BGA — Ball Grid Array, сітка кульок.', en: 'BGA means Ball Grid Array.' }, see: { m: 'm04', s: 's5' } },
      { q: { uk: 'NE555 у корпусі DIP і NE555 у корпусі SOIC — це…', en: 'An NE555 in DIP and an NE555 in SOIC are…' }, opts: [{ uk: 'Та сама мікросхема в різних корпусах', en: 'The same chip in different packages' }, { uk: 'Різні мікросхеми з однаковою назвою', en: 'Different chips with the same name' }, { uk: 'DIP — оригінал, SOIC — підробка', en: 'DIP is genuine, SOIC is fake' }, { uk: 'SOIC вдвічі потужніша', en: 'The SOIC is twice as powerful' }], a: 0,
        ex: { uk: 'Корпус — лише «упаковка». Кристал і функція ті самі.', en: 'The package is just the “wrapper”. The die and function are the same.' }, see: { m: 'm04', s: 's3' } },
      { q: { uk: 'Як нумерують виводи мікросхеми, якщо дивитися згори?', en: 'How are a chip’s pins numbered, seen from above?' }, opts: [{ uk: 'Від виводу 1 проти годинникової стрілки', en: 'From pin 1, counter-clockwise' }, { uk: 'За годинниковою стрілкою', en: 'Clockwise' }, { uk: 'Від найбільшого до найменшого', en: 'From largest to smallest' }, { uk: 'Довільно, у кожного виробника по-своєму', en: 'Randomly, each maker differently' }], a: 0,
        ex: { uk: 'Стандарт: вивід 1 біля позначки, далі проти годинникової стрілки.', en: 'The standard: pin 1 by the mark, then counter-clockwise.' }, see: { m: 'm04', s: 's6' } },
      { q: { uk: 'На корпусі є жовта фарбова пляма. Це вивід 1?', en: 'A chip has a yellow paint spot. Is that pin 1?' }, opts: [{ uk: 'Ні, це може бути заводська мітка — шукаємо ямку, скіс чи крапку на платі', en: 'No, it may be a factory mark — look for a dimple, bevel or board dot' }, { uk: 'Так, завжди', en: 'Yes, always' }, { uk: 'Так, якщо фарба жовта', en: 'Yes, if the paint is yellow' }, { uk: 'Це означає, що мікросхема зламана', en: 'It means the chip is broken' }], a: 0,
        ex: { uk: 'Фарба — часто мітка перевірки на заводі. Вивід 1 позначають ямкою, скосом або крапкою.', en: 'Paint is often a factory test mark. Pin 1 is marked by a dimple, bevel or dot.' }, see: { m: 'm04', s: 's6' } },
      { q: { uk: 'На крихітному корпусі лише код «B2». Як знайти, що це за деталь?', en: 'A tiny part carries only “B2”. How do you find out what it is?' }, opts: [{ uk: 'Шукати «код + SMD marking + корпус»', en: 'Search “code + SMD marking + package”' }, { uk: 'Це неможливо', en: 'It’s impossible' }, { uk: 'B2 завжди означає 2 Ом', en: 'B2 always means 2 Ω' }, { uk: 'Подивитися на колір плати', en: 'Look at the board colour' }], a: 0,
        ex: { uk: 'Короткі коди шукають у таблицях SMD-маркування; корпус звужує пошук.', en: 'Short codes are found in SMD marking tables; the package narrows it down.' }, see: { m: 'm04', s: 's8' } },
      { q: { uk: 'Який розділ документації каже, чого деталь <b>не</b> витримає?', en: 'Which datasheet section says what a part will <b>not</b> survive?' }, opts: [{ uk: 'Absolute maximum ratings (граничні параметри)', en: 'Absolute maximum ratings' }, { uk: 'Typical application', en: 'Typical application' }, { uk: 'Ordering information', en: 'Ordering information' }, { uk: 'Revision history', en: 'Revision history' }], a: 0,
        ex: { uk: 'Граничні параметри — межі, за якими деталь псується.', en: 'Absolute maximum ratings are the limits beyond which the part is damaged.' }, see: { m: 'm04', s: 's9' } },
      { q: { uk: 'Де в документації шукати готову схему, яку часто видно на платах?', en: 'Where in a datasheet do you find the ready circuit often seen on boards?' }, opts: [{ uk: 'Typical application (типова схема)', en: 'Typical application' }, { uk: 'Absolute maximum ratings', en: 'Absolute maximum ratings' }, { uk: 'Package dimensions', en: 'Package dimensions' }, { uk: 'На обкладинці', en: 'On the cover' }], a: 0,
        ex: { uk: 'Виробник показує рекомендовану схему ввімкнення — плати її повторюють.', en: 'The maker shows a recommended circuit — boards copy it.' }, see: { m: 'm04', s: 's9' } },
      { q: { uk: 'Що показує розділ «pinout» (розташування виводів)?', en: 'What does the “pinout” section show?' }, opts: [{ uk: 'Номер і назву кожного виводу на малюнку корпусу', en: 'The number and name of each pin on a package drawing' }, { uk: 'Ціну деталі', en: 'The price' }, { uk: 'Максимальну температуру', en: 'Maximum temperature' }, { uk: 'Як паяти', en: 'How to solder' }], a: 0,
        ex: { uk: 'Pinout — «карта» виводів: VCC, GND, входи, виходи.', en: 'The pinout is a “map” of the pins: VCC, GND, inputs, outputs.' }, see: { m: 'm04', s: 's9' } },
      { q: { uk: '7805 у TO-220 і 78L05 у TO-92: що відрізняється?', en: '7805 in TO-220 vs 78L05 in TO-92: what differs?' }, opts: [{ uk: 'Допустимий струм: маленький розрахований на значно менший', en: 'The current rating: the small one handles much less' }, { uk: 'Вихідна напруга', en: 'The output voltage' }, { uk: 'Один випрямляє, інший стабілізує', en: 'One rectifies, the other regulates' }, { uk: 'Нічого', en: 'Nothing' }], a: 0,
        ex: { uk: 'Обидва дають 5 В, але 78L05 — лише ~0,1 А. Більший корпус — більша потужність.', en: 'Both give 5 V, but the 78L05 handles only ~0.1 A. A bigger package means more power.' }, see: { m: 'm04', s: 's11' } },
      { q: { uk: 'На металевому корпусі написано «40.000». Найімовірніше, це…', en: 'A metal can reads “40.000”. Most likely it is…' }, opts: [{ uk: 'Генератор або кварц на 40 МГц', en: 'A 40 MHz oscillator or crystal' }, { uk: 'Резистор 40 кОм', en: 'A 40 kΩ resistor' }, { uk: 'Конденсатор 40 мкФ', en: 'A 40 µF capacitor' }, { uk: 'Запобіжник на 40 А', en: 'A 40 A fuse' }], a: 0,
        ex: { uk: 'На кварцах і генераторах пишуть частоту в МГц.', en: 'Crystals and oscillators are marked with their frequency in MHz.' }, see: { m: 'm04', s: 's12' } },
      { q: { uk: 'Яку деталь флешки «будить» кварцовий резонатор?', en: 'What does the crystal on a USB stick serve?' }, opts: [{ uk: 'Задає точну частоту для контролера й USB', en: 'It sets an exact frequency for the controller and USB' }, { uk: 'Зберігає файли', en: 'It stores files' }, { uk: 'Захищає від запису', en: 'It write-protects' }, { uk: 'Світиться під час роботи', en: 'It glows while working' }], a: 0,
        ex: { uk: 'Кварц — «метроном» схеми. Без точної частоти USB не працює.', en: 'A crystal is the circuit’s “metronome”. USB won’t work without an exact frequency.' }, see: { m: 'm04', s: 's10' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>флеш-пам’яті</b> — мікросхеми, де зберігаються файли.', en: 'Tap the <b>flash memory</b> — the chip that stores files.' },
        fig: { photo: 'r1-002', hot: [{ id: 'flash', p: [53, 10, 23, 21] }, { id: 'ctrl', p: [38, 13, 13, 13] }, { id: 'usb', p: [4, 8, 22, 22] }, { id: 'xtal', p: [72, 57, 8, 21] }, { id: 'led', p: [88, 62, 8, 9] }] },
        a: 'flash', ex: { uk: 'Найбільша мікросхема у TSOP-корпусі — пам’ять. Менша квадратна — контролер.', en: 'The biggest chip, in a TSOP package, is the memory. The smaller square one is the controller.' }, see: { m: 'm04', s: 's10' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>кварцового резонатора</b>.', en: 'Tap the <b>crystal</b>.' },
        fig: { photo: 'r1-002', hot: [{ id: 'xtal', p: [72, 57, 8, 21] }, { id: 'flash', p: [53, 10, 23, 21] }, { id: 'ctrl', p: [38, 13, 13, 13] }, { id: 'sw', p: [31, 76, 13, 7] }, { id: 'led', p: [88, 62, 8, 9] }] },
        a: 'xtal', ex: { uk: 'Металевий овальний корпус із написом частоти — кварц.', en: 'The oval metal can with a frequency written on it is the crystal.' }, see: { m: 'm04', s: 's10' } },
      { type: 'tap', q: { uk: 'Де <b>вивід 1</b> цієї мікросхеми?', en: 'Where is <b>pin 1</b> of this chip?' },
        fig: { photo: 'r1-088', hot: [{ id: 'pin1', p: [5, 21, 15, 7] }, { id: 'paint', p: [66, 22, 16, 16] }, { id: 'tr', p: [80, 21, 15, 7] }, { id: 'bl', p: [5, 70, 15, 7] }, { id: 'br', p: [80, 70, 15, 7] }] },
        a: 'pin1', ex: { uk: 'Ямка й скошений кут — угорі ліворуч, тож вивід 1 — верхній на лівому боці. Жовта пляма — лише фарба.', en: 'The dimple and bevelled corner are top left, so pin 1 is the top lead on the left side. The yellow spot is just paint.' }, see: { m: 'm04', s: 's6' } },
      { type: 'tap', q: { uk: 'Крапка на корпусі — ліворуч унизу. Торкаємося <b>виводу 1</b>.', en: 'The body dot is bottom left. Tap <b>pin 1</b>.' },
        fig: { photo: 'r1-085', hot: [{ id: 'p1', p: [19, 80, 9, 13] }, { id: 'p76', p: [8, 15, 10, 9] }, { id: 'p51', p: [72, 6, 9, 13] }, { id: 'p26', p: [82, 72, 10, 9] }] },
        a: 'p1', ex: { uk: 'Вивід 1 — крайній лівий у нижньому ряду, поруч із «100». Далі 1–25 ідуть направо.', en: 'Pin 1 is the leftmost of the bottom row, next to “100”. Pins 1–25 run to the right.' }, see: { m: 'm04', s: 's7' } }
    ]
  });
})();
