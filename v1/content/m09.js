/* Module 9 — Microcontrollers and flight controllers */
(function () {
  function fcSvg(L) {
    var s = '<rect x="40" y="10" width="300" height="300" rx="18" style="fill:var(--board)"/>';
    [[60, 30], [320, 30], [60, 290], [320, 290]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="10" style="fill:var(--fig-bg)"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="13" style="fill:none;stroke:#c98a45;stroke-width:3"/>'; });
    function chip(x, y, w, h, t, sub) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" style="fill:#16191a"/><text x="' + (x + w / 2) + '" y="' + (y + h / 2 + (sub ? -2 : 4)) + '" text-anchor="middle" style="fill:#e9efe9;font:600 11px var(--mono)">' + t + '</text>' + (sub ? '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 12) + '" text-anchor="middle" style="fill:#aab8b0;font:10px var(--sans)">' + sub + '</text>' : ''); }
    function pad(x, y, t) { return '<rect x="' + x + '" y="' + y + '" width="22" height="14" rx="3" style="fill:#d8b05c"/><text x="' + (x + 11) + '" y="' + (y - 4) + '" text-anchor="middle" style="fill:#e9efe9;font:600 9px var(--mono)">' + t + '</text>'; }
    s += chip(140, 120, 100, 80, 'MCU', 'STM32F405');
    s += chip(146, 60, 68, 36, 'IMU', L({ uk: 'гіро + аксел.', en: 'gyro + accel' }));
    s += chip(256, 136, 44, 30, 'BARO', '');
    s += chip(82, 136, 44, 40, 'FLASH', 'blackbox');
    s += chip(150, 226, 80, 30, 'OSD', 'AT7456E');
    s += '<rect x="94" y="64" width="34" height="34" rx="4" style="fill:#2e3a33"/><text x="111" y="85" text-anchor="middle" style="fill:#e9efe9;font:600 9px var(--mono)">BEC</text>';
    s += '<rect x="168" y="268" width="44" height="20" rx="3" style="fill:#b9c0c3"/><text x="190" y="282" text-anchor="middle" style="fill:#1a231f;font:600 10px var(--mono)">USB</text>';
    s += '<rect x="250" y="210" width="18" height="12" rx="2" style="fill:#c9ced1"/><text x="259" y="236" text-anchor="middle" style="fill:#e9efe9;font:9px var(--mono)">BOOT</text>';
    s += pad(54, 112, 'T1') + pad(54, 140, 'R1') + pad(54, 182, 'T2') + pad(54, 210, 'R2');
    s += pad(304, 182, 'SDA') + pad(304, 210, 'SCL') + pad(304, 240, '5V');
    s += pad(262, 56, 'VBAT') + pad(262, 84, 'GND');
    s += pad(84, 250, 'VTX') + pad(110, 268, 'CAM');
    s += '<rect x="148" y="16" width="84" height="22" rx="3" style="fill:#2b2f2d"/><text x="190" y="31" text-anchor="middle" style="fill:#e9efe9;font:600 9px var(--mono)">ESC 8-pin</text>';
    return D.svg(380, 320, s);
  }
  APP.module({
    id: 'm09', n: 9, part: 'C', cv: 1,
    title: { uk: 'Мікроконтролери і польотний контролер', en: 'Microcontrollers and the flight controller' },
    short: { uk: '«Мозок», кварц, шини UART, I²C, SPI', en: 'The “brain”, the crystal, the UART, I²C and SPI buses' },
    intro: {
      uk: 'Польотний контролер — «мозок» дрона: він тисячі разів на секунду читає гіроскоп, рахує, як утримати апарат, і дає команди регуляторам. У цьому модулі дізнаємося, з чого він складається і як його частини «розмовляють» між собою.',
      en: 'The flight controller is the drone’s “brain”: thousands of times per second it reads the gyro, computes how to hold the craft steady, and commands the speed controllers. In this module you learn what it is made of and how its parts “talk” to each other.'
    },
    warm: ['m05q06', 'm04q04', 'm06q11'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Мікроконтролер: комп’ютер в одній мікросхемі', en: 'A microcontroller: a computer in one chip' },
        body: {
          uk: '<p>Мікроконтролер (MCU) — це процесор, пам’ять для програми (флеш), оперативна пам’ять і багато «периферії» в одному корпусі: послідовні порти, таймери для ШІМ, аналого-цифровий перетворювач (ним вимірюють напругу батареї з дільника).</p><p>На дронах найчастіше — <b>STM32</b> від STMicroelectronics або сумісні <b>AT32</b>. На пристроях з Wi-Fi і Bluetooth — <b>ESP32</b>.</p><p>Програма, записана в мікроконтролер, — це <b>прошивка</b>: Betaflight, INAV, ArduPilot.</p>',
          en: '<p>A microcontroller (MCU) is a processor, program memory (flash), working memory and lots of “peripherals” in one package: serial ports, PWM timers, an analog-to-digital converter (which measures the battery voltage from the divider).</p><p>Drones most often use <b>STM32</b> from STMicroelectronics or compatible <b>AT32</b> parts. Devices with Wi-Fi and Bluetooth use the <b>ESP32</b>.</p><p>The program stored in the microcontroller is the <b>firmware</b>: Betaflight, INAV, ArduPilot.</p>'
        },
        recall: [{ m: 'm06', s: 's3', label: { uk: 'Дільник для вимірювання батареї', en: 'The battery-sensing divider' } }],
        fig: { photo: 'r1-138', cap: { uk: 'Навчальна плата STM32 Discovery: мікроконтролер у центрі, підписані виводи по краях.', en: 'An STM32 Discovery training board: the microcontroller in the middle, labelled pins along the edges.' } }
      },
      {
        kind: 1,
        title: { uk: 'Кварц — «метроном»', en: 'The crystal — a metronome' },
        body: {
          uk: '<p>Процесор виконує команди в такт. Точний такт задає <b>кварцовий резонатор</b>: шматочок кварцу, що коливається на своїй частоті (8, 12, 16, 25 МГц…). Всередині мікроконтролера частота множиться — до 168 МГц у STM32F405.</p><p>На платі кварц — металевий корпус (HC-49 або SMD) з написом частоти, завжди поруч із процесором і з двома маленькими конденсаторами.</p>',
          en: '<p>A processor executes instructions in step with a clock. The precise clock comes from a <b>crystal</b>: a sliver of quartz that vibrates at its own frequency (8, 12, 16, 25 MHz…). Inside the microcontroller the frequency is multiplied — up to 168 MHz in an STM32F405.</p><p>On a board the crystal is a metal can (HC-49 or SMD) marked with its frequency, always next to the processor with two small capacitors.</p>'
        },
        recall: [{ m: 'm04', s: 's12', label: { uk: 'Частота на корпусі', en: 'A frequency on the body' } }],
        fig: { photo: 'r1-143', cap: { uk: 'Кварц 16 МГц у корпусі HC-49 — така частота на багатьох платах Arduino.', en: 'A 16 MHz crystal in an HC-49 can — the frequency on many Arduino boards.' } }
      },
      {
        kind: 1,
        title: { uk: 'Як мікросхеми розмовляють: UART', en: 'How chips talk: UART' },
        body: {
          uk: '<p><b>UART</b> (послідовний порт) — два проводи: <b>TX</b> (передача) і <b>RX</b> (прийом) плюс спільна земля. Важливо: <b>TX одного пристрою з’єднують з RX іншого</b> — «рот до вуха».</p><p>На польотному контролері UART-ів кілька (T1/R1, T2/R2…). До них підключають приймач (протокол CRSF чи SBUS), GPS, керування відеопередавачем, цифрові системи відео.</p>',
          en: '<p><b>UART</b> (a serial port) uses two wires: <b>TX</b> (transmit) and <b>RX</b> (receive), plus a shared ground. Important: <b>one device’s TX connects to the other’s RX</b> — “mouth to ear”.</p><p>A flight controller has several UARTs (T1/R1, T2/R2…). They connect the receiver (CRSF or SBUS protocol), GPS, video transmitter control and digital video systems.</p>'
        },
        fig: {
          svg: function (L) {
            return D.svg(380, 130, D.chip(20, 30, 110, 70, 'FC', 'UART1') + D.chip(250, 30, 110, 70, L({ uk: 'Приймач', en: 'Receiver' }), 'ELRS') +
              D.t(140, 52, 'T1', 'lbl', 'start') + D.t(140, 88, 'R1', 'lbl', 'start') + D.t(240, 52, 'TX', 'lbl', 'end') + D.t(240, 88, 'RX', 'lbl', 'end') +
              D.w([[130, 47], [165, 47], [215, 83], [250, 83]], 'acc') + D.w([[130, 83], [165, 83], [215, 47], [250, 47]], 'cu') +
              D.t(190, 120, L({ uk: 'TX → RX, RX ← TX: навхрест', en: 'TX → RX, RX ← TX: crossed' }), 'txm'));
          }
        }
      },
      {
        kind: 1,
        title: { uk: 'I²C і SPI: шини для датчиків', en: 'I²C and SPI: buses for sensors' },
        body: {
          uk: '<ul><li><b>I²C</b> — два проводи: <b>SDA</b> (дані) і <b>SCL</b> (такт). На одну шину можна повісити багато пристроїв: кожен має свою <b>адресу</b>. Потрібні підтягувальні резистори. Повільна: барометр, компас, дисплей.</li><li><b>SPI</b> — чотири проводи: <b>MOSI</b> (від головного), <b>MISO</b> (до головного), <b>SCK</b> (такт), <b>CS/NSS</b> (вибір пристрою). Набагато швидша. Нею процесор читає <b>гіроскоп</b> тисячі разів на секунду, а також флеш-пам’ять і OSD.</li></ul>',
          en: '<ul><li><b>I²C</b> — two wires: <b>SDA</b> (data) and <b>SCL</b> (clock). Many devices can share one bus, each with its own <b>address</b>. Pull-up resistors are required. It is slow: barometer, compass, display.</li><li><b>SPI</b> — four wires: <b>MOSI</b> (from the master), <b>MISO</b> (to the master), <b>SCK</b> (clock), <b>CS/NSS</b> (chip select). Much faster. The processor reads the <b>gyro</b> over it thousands of times per second, as well as flash memory and the OSD.</li></ul>'
        },
        recall: [{ m: 'm06', s: 's6', label: { uk: 'Підтяжки на I²C', en: 'Pull-ups on I²C' } }, { m: 'm05', s: 's8', label: { uk: 'Схема з’єднань I²C і SPI', en: 'The I²C and SPI wiring diagram' } }],
        fig: { photo: 'r1-141', cap: { uk: 'Справжнє з’єднання: датчик праворуч — на I²C (SCL, SDA), плата внизу — на SPI (MOSI, MISO, SCK, NSS).', en: 'A real hookup: the sensor on the right uses I²C (SCL, SDA), the board below uses SPI (MOSI, MISO, SCK, NSS).' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: цикл стабілізації', en: 'Combine: the stabilisation loop' },
        body: {
          uk: '<p>Ось що робить польотний контролер кілька тисяч разів на секунду (типово 4–8 кГц):</p><ol><li>читає гіроскоп по SPI — як швидко дрон обертається;</li><li>порівнює з тим, що просить пілот (команди з приймача по UART);</li><li>регулятор <b>PID</b> рахує, наскільки сильніше чи слабше крутити кожен двигун;</li><li>надсилає команди в ESC протоколом DShot.</li></ol><p>Цикл повторюється, поки ввімкнено живлення. Якщо гіроскоп «шумить» від вібрацій — дрон тремтить. Тому плату ставлять на гумові демпфери.</p>',
          en: '<p>This is what a flight controller does several thousand times per second (typically 4–8 kHz):</p><ol><li>reads the gyro over SPI — how fast the drone is rotating;</li><li>compares it with what the pilot asks for (commands from the receiver over UART);</li><li>the <b>PID</b> controller computes how much harder or softer to drive each motor;</li><li>sends commands to the ESCs using DShot.</li></ol><p>The loop repeats as long as power is on. If the gyro is “noisy” from vibration, the drone shakes. That is why the board sits on rubber dampers.</p>'
        },
        recall: [{ m: 'm08', s: 's8', label: { uk: 'DShot і ESC', en: 'DShot and the ESC' } }]
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: карта польотного контролера', en: 'Device: a map of a flight controller' },
        body: {
          uk: '<p>Узагальнена плата F4 формату 30,5 × 30,5 мм (відстань між отворами кріплення). Майже кожен сучасний польотний контролер має ці блоки: процесор, гіроскоп, барометр, флеш-пам’ять для «чорної скриньки» (blackbox), OSD, BEC, роз’єм USB, кнопку BOOT, майданчики UART, I²C, відео і роз’єм до 4-в-1 ESC.</p><p>Кнопка <b>BOOT</b>: якщо затиснути її під час підключення USB, процесор переходить у режим завантаження прошивки (DFU) — так «оживляють» плату після невдалого оновлення.</p>',
          en: '<p>A generic F4 board in the 30.5 × 30.5 mm format (mounting hole spacing). Almost every modern flight controller has these blocks: processor, gyro, barometer, flash memory for the “black box” (blackbox), OSD, BEC, USB port, BOOT button, UART, I²C and video pads, and the connector to a 4-in-1 ESC.</p><p>The <b>BOOT</b> button: hold it while plugging in USB and the processor enters firmware-loading mode (DFU) — that is how a board is revived after a failed update.</p>'
        },
        fig: { svg: fcSvg, cap: { uk: 'Узагальнена схема розташування — справжні плати відрізняються, але блоки ті самі.', en: 'A generic layout — real boards differ, but the blocks are the same.' } }
      },
      {
        kind: 1,
        title: { uk: 'Покоління процесорів: F1 → F4 → F7 → H7', en: 'Processor generations: F1 → F4 → F7 → H7' },
        body: {
          uk: '<ul><li><b>F1, F3</b> — застарілі, сучасний Betaflight їх не підтримує.</li><li><b>F405</b> — 168 МГц, 5+ UART. Найпоширеніший.</li><li><b>F411</b> — 100 МГц, менше UART. Дешеві й малі плати.</li><li><b>F722 / F745</b> — 216 МГц, більше UART.</li><li><b>H743</b> — 480 МГц, найшвидший; часто з ArduPilot чи INAV.</li><li><b>AT32F435</b> — альтернатива від Artery, підтримується з Betaflight 4.5.</li></ul><p>Літера і цифри — на корпусі процесора. Так за 5 секунд можна визначити покоління будь-якої плати.</p>',
          en: '<ul><li><b>F1, F3</b> — outdated; current Betaflight no longer supports them.</li><li><b>F405</b> — 168 MHz, 5+ UARTs. The most common.</li><li><b>F411</b> — 100 MHz, fewer UARTs. Cheap, small boards.</li><li><b>F722 / F745</b> — 216 MHz, more UARTs.</li><li><b>H743</b> — 480 MHz, the fastest; often with ArduPilot or INAV.</li><li><b>AT32F435</b> — an alternative from Artery, supported since Betaflight 4.5.</li></ul><p>The letter and digits are printed on the processor. That lets you identify any board’s generation in five seconds.</p>'
        }
      },
      {
        kind: 5,
        title: { uk: 'На платі: інші «мізки»', en: 'On the board: other “brains”' },
        body: {
          uk: '<p>Arduino і ESP32 — популярні у саморобних проєктах: детекторах, наземних станціях, ретрансляторах. На ESP32 видно металевий екран (під ним процесор і радіочастина) та антену-«змійку», надруковану прямо на платі. Про антени — у модулі 11.</p>',
          en: '<p>Arduino and ESP32 are popular in DIY projects: detectors, ground stations, relays. On an ESP32 you see a metal shield (the processor and radio are under it) and a zigzag antenna printed right on the board. Antennas are module 11.</p>'
        },
        fig: { photo: 'r1-154' }
      }
    ],
    sources: [
      { t: { uk: 'Oscar Liang. F1, F3, F4, G4, F7 and H7 Flight Controller Processors Explained (2022, оновлено 2024)', en: 'Oscar Liang. F1, F3, F4, G4, F7 and H7 Flight Controller Processors Explained (2022, updated 2024)' }, url: 'https://oscarliang.com/f1-f3-f4-flight-controller/' },
      { t: { uk: 'STMicroelectronics — документація STM32F405 / STM32F722 / STM32H743', en: 'STMicroelectronics — STM32F405 / STM32F722 / STM32H743 datasheets' } },
      { t: { uk: 'Документація Betaflight — порти, UART, DFU', en: 'Betaflight documentation — ports, UART, DFU' }, url: 'https://betaflight.com/docs/' },
      { t: { uk: 'NXP UM10204 — специфікація шини I²C', en: 'NXP UM10204 — I²C bus specification' } }
    ],
    quiz: [
      { q: { uk: 'Що таке мікроконтролер?', en: 'What is a microcontroller?' }, opts: [{ uk: 'Процесор, пам’ять і периферія в одній мікросхемі', en: 'A processor, memory and peripherals in one chip' }, { uk: 'Великий конденсатор', en: 'A big capacitor' }, { uk: 'Тип батареї', en: 'A battery type' }, { uk: 'Датчик руху', en: 'A motion sensor' }], a: 0,
        ex: { uk: 'MCU — «комп’ютер в одній мікросхемі».', en: 'An MCU is a “computer in one chip”.' }, see: { m: 'm09', s: 's1' } },
      { q: { uk: 'Що таке прошивка (Betaflight, INAV, ArduPilot)?', en: 'What is firmware (Betaflight, INAV, ArduPilot)?' }, opts: [{ uk: 'Програма, записана в мікроконтролер', en: 'The program stored in the microcontroller' }, { uk: 'Тип паяльника', en: 'A type of soldering iron' }, { uk: 'Модель рами', en: 'A frame model' }, { uk: 'Відеостандарт', en: 'A video standard' }], a: 0,
        ex: { uk: 'Прошивка — програма польотного контролера.', en: 'Firmware is the flight controller’s program.' }, see: { m: 'm09', s: 's1' } },
      { q: { uk: 'Навіщо мікроконтролеру кварц?', en: 'Why does a microcontroller need a crystal?' }, opts: [{ uk: 'Задає точну тактову частоту', en: 'It sets an exact clock frequency' }, { uk: 'Зберігає прошивку', en: 'It stores the firmware' }, { uk: 'Захищає від перенапруги', en: 'It protects against overvoltage' }, { uk: 'Вимірює температуру', en: 'It measures temperature' }], a: 0,
        ex: { uk: 'Кварц — «метроном» процесора.', en: 'The crystal is the processor’s “metronome”.' }, see: { m: 'm09', s: 's2' } },
      { q: { uk: 'Як з’єднують UART між двома пристроями?', en: 'How is a UART wired between two devices?' }, opts: [{ uk: 'TX одного до RX другого і навпаки, плюс земля', en: 'TX of one to RX of the other and vice versa, plus ground' }, { uk: 'TX до TX, RX до RX', en: 'TX to TX, RX to RX' }, { uk: 'Лише один дріт', en: 'A single wire only' }, { uk: 'Через антену', en: 'Through an antenna' }], a: 0,
        ex: { uk: '«Рот до вуха»: передача однієї сторони — прийом іншої.', en: '“Mouth to ear”: one side’s transmit is the other’s receive.' }, see: { m: 'm09', s: 's3' } },
      { q: { uk: 'Приймач ELRS підключили TX→T2, RX→R2, і зв’язку немає. Найімовірніша помилка?', en: 'An ELRS receiver is wired TX→T2, RX→R2 and does not work. The most likely mistake?' }, opts: [{ uk: 'Треба навхрест: TX приймача → R2, RX приймача → T2', en: 'It must be crossed: receiver TX → R2, receiver RX → T2' }, { uk: 'Приймач зламаний', en: 'The receiver is broken' }, { uk: 'Треба підключити до I²C', en: 'It should go to I²C' }, { uk: 'Бракує кварцу', en: 'A crystal is missing' }], a: 0,
        ex: { uk: 'Найчастіша помилка новачків — не перехрестити TX і RX.', en: 'The most common beginner mistake is not crossing TX and RX.' }, see: { m: 'm09', s: 's3' } },
      { q: { uk: 'Які два сигнали має шина I²C?', en: 'What two signals does the I²C bus have?' }, opts: [{ uk: 'SDA і SCL', en: 'SDA and SCL' }, { uk: 'TX і RX', en: 'TX and RX' }, { uk: 'MOSI і MISO', en: 'MOSI and MISO' }, { uk: 'G і S', en: 'G and S' }], a: 0,
        ex: { uk: 'SDA — дані, SCL — такт.', en: 'SDA is data, SCL is clock.' }, see: { m: 'm09', s: 's4' } },
      { q: { uk: 'Як на одній шині I²C розрізняють кілька пристроїв?', en: 'How are several devices told apart on one I²C bus?' }, opts: [{ uk: 'За адресою кожного пристрою', en: 'By each device’s address' }, { uk: 'За кольором дроту', en: 'By wire colour' }, { uk: 'Ніяк — лише один пристрій', en: 'They can’t — one device only' }, { uk: 'За напругою живлення', en: 'By supply voltage' }], a: 0,
        ex: { uk: 'Кожен пристрій I²C має свою адресу.', en: 'Each I²C device has its own address.' }, see: { m: 'm09', s: 's4' } },
      { q: { uk: 'Якою шиною процесор зазвичай читає гіроскоп польотного контролера?', en: 'Which bus does the processor usually use to read the flight-controller gyro?' }, opts: [{ uk: 'SPI — вона найшвидша', en: 'SPI — it is the fastest' }, { uk: 'I²C', en: 'I²C' }, { uk: 'UART', en: 'UART' }, { uk: 'По радіо', en: 'Over radio' }], a: 0,
        ex: { uk: 'Гіроскоп читають тисячі разів на секунду — потрібна швидка SPI.', en: 'The gyro is read thousands of times per second — fast SPI is needed.' }, see: { m: 'm09', s: 's4' } },
      { q: { uk: 'Що означає сигнал <b>MISO</b>?', en: 'What does the <b>MISO</b> signal mean?' }, opts: [{ uk: 'Дані від підлеглого пристрою до головного (SPI)', en: 'Data from the peripheral to the master (SPI)' }, { uk: 'Тактовий сигнал I²C', en: 'The I²C clock' }, { uk: 'Живлення 3,3 В', en: '3.3 V power' }, { uk: 'Вхід відео', en: 'Video input' }], a: 0,
        ex: { uk: 'Master In, Slave Out. MOSI — навпаки.', en: 'Master In, Slave Out. MOSI is the reverse.' }, see: { m: 'm09', s: 's4' } },
      { q: { uk: 'Що робить регулятор PID у польотному контролері?', en: 'What does the PID controller in a flight controller do?' }, opts: [{ uk: 'Рахує, як змінити оберти двигунів, щоб дрон рухався так, як хоче пілот', en: 'Computes how to change motor speeds so the drone moves as the pilot wants' }, { uk: 'Заряджає батарею', en: 'Charges the battery' }, { uk: 'Передає відео', en: 'Transmits video' }, { uk: 'Записує журнал польоту', en: 'Records the flight log' }], a: 0,
        ex: { uk: 'PID порівнює «що є» з гіроскопа і «що треба» з пульта.', en: 'PID compares “what is” from the gyro with “what’s wanted” from the radio.' }, see: { m: 'm09', s: 's5' } },
      { q: { uk: 'Чому польотний контролер ставлять на гумові демпфери?', en: 'Why is a flight controller mounted on rubber dampers?' }, opts: [{ uk: 'Щоб вібрації не «зашумлювали» гіроскоп', en: 'So vibration doesn’t add noise to the gyro' }, { uk: 'Для ізоляції від струму', en: 'For electrical insulation' }, { uk: 'Щоб плата не нагрівалась', en: 'To keep the board cool' }, { uk: 'Для краси', en: 'For looks' }], a: 0,
        ex: { uk: 'Вібрації двигунів → шум у гіроскопі → тремтіння дрона.', en: 'Motor vibration → gyro noise → a shaky drone.' }, see: { m: 'm09', s: 's5' } },
      { q: { uk: 'Що означає розмір плати «30,5 × 30,5»?', en: 'What does a “30.5 × 30.5” board size mean?' }, opts: [{ uk: 'Відстань між отворами кріплення в мм', en: 'The mounting-hole spacing in mm' }, { uk: 'Вага в грамах', en: 'Weight in grams' }, { uk: 'Струм в амперах', en: 'Current in amps' }, { uk: 'Частота процесора', en: 'Processor frequency' }], a: 0,
        ex: { uk: 'Стандарти кріплення: 30,5, 20 і 25,5 мм.', en: 'Mounting standards: 30.5, 20 and 25.5 mm.' }, see: { m: 'm09', s: 's6' } },
      { q: { uk: 'Навіщо кнопка BOOT на польотному контролері?', en: 'What is the BOOT button on a flight controller for?' }, opts: [{ uk: 'Затиснута під час підключення USB — переводить процесор у режим прошивки (DFU)', en: 'Held while plugging in USB, it puts the processor into firmware mode (DFU)' }, { uk: 'Вмикає двигуни', en: 'It starts the motors' }, { uk: 'Перезапускає відеопередавач', en: 'It restarts the VTX' }, { uk: 'Вмикає пищалку', en: 'It sounds the buzzer' }], a: 0,
        ex: { uk: 'DFU — режим завантаження прошивки, рятує після невдалого оновлення.', en: 'DFU is firmware-loading mode, a rescue after a failed update.' }, see: { m: 'm09', s: 's6' } },
      { q: { uk: 'Для чого на польотному контролері окрема флеш-пам’ять?', en: 'What is the separate flash memory on a flight controller for?' }, opts: [{ uk: 'Запис «чорної скриньки» (blackbox) — журналу польоту', en: 'Recording the “black box” (blackbox) flight log' }, { uk: 'Зберігання відео', en: 'Storing video' }, { uk: 'Живлення процесора', en: 'Powering the processor' }, { uk: 'Радіозв’язок', en: 'Radio communication' }], a: 0,
        ex: { uk: 'Blackbox пише дані гіроскопа й двигунів для аналізу.', en: 'Blackbox records gyro and motor data for analysis.' }, see: { m: 'm09', s: 's6' } },
      { q: { uk: 'На процесорі написано STM32F405. Яке це покоління?', en: 'The processor reads STM32F405. Which generation is it?' }, opts: [{ uk: 'F4, 168 МГц', en: 'F4, 168 MHz' }, { uk: 'F1, застаріле', en: 'F1, outdated' }, { uk: 'H7, 480 МГц', en: 'H7, 480 MHz' }, { uk: 'F7, 216 МГц', en: 'F7, 216 MHz' }], a: 0,
        ex: { uk: 'F405 — найпоширеніший F4, 168 МГц.', en: 'The F405 is the most common F4, at 168 MHz.' }, see: { m: 'm09', s: 's7' } },
      { q: { uk: 'Яке покоління процесорів сучасний Betaflight уже <b>не</b> підтримує?', en: 'Which processor generation does current Betaflight <b>no longer</b> support?' }, opts: [{ uk: 'F1 і F3', en: 'F1 and F3' }, { uk: 'F4', en: 'F4' }, { uk: 'F7', en: 'F7' }, { uk: 'H7', en: 'H7' }], a: 0,
        ex: { uk: 'F1 і F3 застаріли; підтримку прибрали.', en: 'F1 and F3 are outdated; support was dropped.' }, see: { m: 'm09', s: 's7' } },
      { q: { uk: 'Що таке AT32F435?', en: 'What is the AT32F435?' }, opts: [{ uk: 'Процесор від Artery — альтернатива STM32, підтримується в Betaflight 4.5+', en: 'An Artery processor — an STM32 alternative, supported in Betaflight 4.5+' }, { uk: 'Тип гіроскопа', en: 'A gyro type' }, { uk: 'Регулятор обертів', en: 'A speed controller' }, { uk: 'Відеопередавач', en: 'A video transmitter' }], a: 0,
        ex: { uk: 'AT32 з’явились як альтернатива під час дефіциту STM32.', en: 'AT32 parts appeared as an alternative during the STM32 shortage.' }, see: { m: 'm09', s: 's7' } },
      { q: { uk: 'Що ховається під металевим екраном модуля ESP32?', en: 'What hides under the metal shield of an ESP32 module?' }, opts: [{ uk: 'Процесор і радіочастина (Wi-Fi, Bluetooth)', en: 'The processor and radio section (Wi-Fi, Bluetooth)' }, { uk: 'Батарея', en: 'A battery' }, { uk: 'Двигун', en: 'A motor' }, { uk: 'Нічого — це прикраса', en: 'Nothing — it’s decoration' }], a: 0,
        ex: { uk: 'Екран захищає радіочастину від завад. Детально — модуль 12.', en: 'The shield protects the radio section from interference. More in module 12.' }, see: { m: 'm09', s: 's8' } }
    ]
  });
})();
