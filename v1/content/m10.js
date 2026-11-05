/* Module 10 — Sensors and camera */
(function () {
  APP.module({
    id: 'm10', n: 10, part: 'C', cv: 1,
    title: { uk: 'Датчики і камера', en: 'Sensors and the camera' },
    short: { uk: 'Гіроскоп, барометр, GPS, компас, камера, OSD', en: 'Gyro, barometer, GPS, compass, camera, OSD' },
    intro: {
      uk: 'Процесор «сліпий», поки датчики не розкажуть йому, як він рухається, на якій висоті і де на мапі. У цьому модулі — органи чуття дрона і як вони виглядають на платі.',
      en: 'The processor is “blind” until sensors tell it how it is moving, how high it is and where it is on the map. This module covers the drone’s senses and how they look on a board.'
    },
    warm: ['m09q08', 'm09q06', 'm04q05'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Гіроскоп і акселерометр (IMU)', en: 'The gyro and accelerometer (IMU)' },
        body: {
          uk: '<p><b>IMU</b> — інерційний вимірювальний блок, одна крихітна мікросхема:</p><ul><li><b>гіроскоп</b> вимірює <b>швидкість обертання</b> навколо трьох осей (тангаж, крен, рискання);</li><li><b>акселерометр</b> вимірює <b>прискорення</b> — як швидко змінюється швидкість. Коли плата нерухома, він усе одно показує прискорення 1 g (≈9,8 м/с²), спрямоване <b>вгору</b>: опора (або тяга двигунів) не дає платі падати. За напрямом цих 1 g прошивка визначає, де «низ» і який нахил.</li></ul><p>Усередині — мікроскопічні механічні структури на кремнії (MEMS). Головний датчик для стабілізації — саме гіроскоп. Відомі моделі: MPU-6000/6050 (старі), ICM-42688-P, BMI270 (сучасні).</p>',
          en: '<p>The <b>IMU</b> (inertial measurement unit) is one tiny chip:</p><ul><li>the <b>gyro</b> measures <b>rotation rate</b> around three axes (pitch, roll, yaw);</li><li>the <b>accelerometer</b> measures <b>acceleration</b> — how fast speed changes. When the board is still, it still reads an acceleration of 1 g (≈9.8 m/s²) pointing <b>up</b>: the support (or the motors’ thrust) keeps the board from falling. From the direction of that 1 g the firmware works out which way is “down” and the tilt.</li></ul><p>Inside are microscopic mechanical structures in silicon (MEMS). The gyro is the key sensor for stabilisation. Known models: MPU-6000/6050 (older), ICM-42688-P, BMI270 (current).</p>'
        },
        fig: { photo: 'r1-156', cap: { uk: 'MPU-6050 у корпусі QFN 4 × 4 мм.', en: 'An MPU-6050 in a 4 × 4 mm QFN package.' } }
      },
      {
        id: 's1b',
        kind: 1,
        title: { uk: 'Чому MEMS-гіроскоп — не дзиґа', en: 'Why a MEMS gyro is not a spinning wheel' },
        body: {
          uk: '<p>Класичний гіроскоп — важке колесо, що швидко крутиться в рамках. Він «тримає» свою площину, як колесо велосипеда, тому його ставили в літаках і на кораблях. На польотному контролері такого колеса немає — і тому іноді кажуть, що там «лише акселерометр». Насправді гіроскоп там є, просто влаштований інакше.</p><p>У <b>MEMS-гіроскопі</b> нічого не крутиться. Усередині кремнієвого кристала — мікроскопічна рамка на пружинах, яка безперервно <b>коливається</b>, як камертон. Коли плата повертається, на рамку діє <b>сила Коріоліса</b> і зсуває її вбік, під прямим кутом до коливань. Гребінчасті пластинки — крихітні конденсатори — вимірюють цей зсув.</p><p>Головна різниця: класичний гіроскоп <b>зберігає напрям</b>, а MEMS-гіроскоп вимірює <b>швидкість повороту</b> (градуси за секунду). Кут прошивка рахує сама, складаючи ці швидкості тисячі разів на секунду.</p>',
          en: '<p>A classic gyroscope is a heavy wheel spinning fast inside rings. It “holds” its plane like a bicycle wheel, which is why it was used in aircraft and ships. A flight controller has no such wheel — so people sometimes say there is “only an accelerometer” on it. In fact there is a gyro, it just works differently.</p><p>Nothing spins in a <b>MEMS gyro</b>. Inside the silicon die is a microscopic frame on springs that <b>vibrates</b> constantly, like a tuning fork. When the board turns, the <b>Coriolis force</b> pushes the frame sideways, at a right angle to the vibration. Comb-shaped plates — tiny capacitors — measure that shift.</p><p>The key difference: a classic gyroscope <b>keeps a direction</b>, while a MEMS gyro measures the <b>rate of turn</b> (degrees per second). The firmware works out the angle itself by adding up these rates thousands of times per second.</p>'
        },
        recall: [{ m: 'm02', s: 's5', label: { uk: 'Конденсатор: дві пластини', en: 'The capacitor: two plates' } }],
        fig: { anim: 'memsgyro', cap: { uk: 'Рухаємо повзунок «Поворот плати»: що швидший поворот, то сильніше рамку зсуває вгору-вниз.', en: 'Move the “Board rotation” slider: the faster the turn, the more the frame is pushed up and down.' } }
      },
      {
        id: 's1c',
        kind: 5,
        title: { uk: 'Які датчики стоять на польотних контролерах', en: 'Which sensors flight controllers use' },
        body: {
          uk: '<p>Майже на всіх сучасних польотних контролерах — одна мікросхема, у якій разом <b>3-осьовий гіроскоп і 3-осьовий акселерометр</b> (разом 6 осей). Найчастіше трапляються:</p><ul><li><b>MPU-6000</b> (InvenSense, тепер TDK) — найпоширеніший на старших платах;</li><li><b>ICM-20602, ICM-20689</b> (TDK InvenSense) — наступне покоління;</li><li><b>ICM-42688-P</b> (TDK InvenSense) — сучасний, з низьким рівнем шуму;</li><li><b>BMI270</b> (Bosch) — сучасний, часто на маленьких платах «все-в-одному».</li></ul><p>Модель датчика пишуть у характеристиках плати (рядок «Gyro» або «IMU»), а конфігуратор (Betaflight, INAV) показує, який датчик знайшов.</p><p><b>Чи бувають плати без якогось датчика?</b></p><ul><li><b>Лише з акселерометром — ні.</b> Акселерометр вимірює прискорення. Нахил прошивка визначає лише за напрямом тих 1 g, які датчик показує в спокої, — і плутає їх із будь-яким іншим прискоренням та вібрацією двигунів. А швидкий поворот на місці акселерометр майже не помічає. Без гіроскопа дрон не стабілізувати.</li><li><b>Акселерометр вимкнено програмно — так, часто.</b> В акро-режимі він не потрібен, і в Betaflight його можна вимкнути. Тоді зникають режими Angle і Horizon: для самовирівнювання акселерометр обов’язковий.</li><li><b>Лише гіроскопи — так бувало раніше.</b> Ранні плати KK (наприклад, версія 5.5) мали три окремі гіроскопи Murata, по одному на вісь, і жодного акселерометра: дрон тримався в повітрі, але сам не вирівнювався.</li><li><b>Барометр і компас</b> — окремі мікросхеми (про них — далі в модулі). На FPV-дроні без GPS їх часто немає взагалі.</li></ul>',
          en: '<p>Almost every modern flight controller has one chip that combines a <b>3-axis gyro and a 3-axis accelerometer</b> (6 axes in total). The most common ones:</p><ul><li><b>MPU-6000</b> (InvenSense, now TDK) — the most common on older boards;</li><li><b>ICM-20602, ICM-20689</b> (TDK InvenSense) — the next generation;</li><li><b>ICM-42688-P</b> (TDK InvenSense) — current, low noise;</li><li><b>BMI270</b> (Bosch) — current, often on small all-in-one boards.</li></ul><p>The sensor model is listed in the board specs (the “Gyro” or “IMU” line), and the configurator (Betaflight, INAV) shows which sensor it found.</p><p><b>Are there boards missing a sensor?</b></p><ul><li><b>Accelerometer only — no.</b> An accelerometer measures acceleration. The firmware can judge tilt only from the direction of the 1 g the sensor reads at rest — and confuses it with any other acceleration and motor vibration. A fast turn in place the accelerometer barely notices. Without a gyro the drone cannot be stabilised.</li><li><b>Accelerometer switched off in software — yes, often.</b> Acro mode does not need it, and Betaflight lets you disable it. Then Angle and Horizon modes disappear: self-levelling requires the accelerometer.</li><li><b>Gyros only — yes, in the past.</b> Early KK boards (for example version 5.5) had three separate Murata gyros, one per axis, and no accelerometer: the drone stayed in the air but did not level itself.</li><li><b>Barometer and compass</b> are separate chips (more on them later in this module). FPV drones without GPS often have none at all.</li></ul>'
        },
        fig: {
          svg: function (L) {
            var s = '<rect class="st" x="150" y="70" width="80" height="80" rx="6"/><text class="lbl" x="190" y="108" text-anchor="middle">IMU</text><text class="txm" x="190" y="124" text-anchor="middle">6 ' + L({ uk: 'осей', en: 'axes' }) + '</text>';
            s += D.arrow(190, 70, 190, 22, 'cu') + D.arrow(230, 110, 290, 110, 'cu') + D.arrow(165, 140, 128, 176, 'cu');
            s += D.t(200, 26, 'Z', 'lbl', 'start') + D.t(294, 106, 'X', 'lbl', 'start') + D.t(120, 190, 'Y', 'lbl', 'end');
            s += '<path class="st acc" d="M172,40 A18,8 0 1,0 208,40" /><path class="st acc" d="M262,92 A8,18 0 1,1 262,128"/><path class="st acc" d="M134,150 A14,14 0 1,0 156,170"/>';
            s += '<text class="txm" x="12" y="40" style="fill:var(--copper)">' + L({ uk: '→ акселерометр:', en: '→ accelerometer:' }) + '</text><text class="txm" x="12" y="55" style="fill:var(--copper)">' + L({ uk: 'прискорення по X, Y, Z', en: 'acceleration along X, Y, Z' }) + '</text>';
            s += '<text class="txm" x="250" y="160" style="fill:var(--accent)">' + L({ uk: '↻ гіроскоп:', en: '↻ gyro:' }) + '</text><text class="txm" x="250" y="175" style="fill:var(--accent)">' + L({ uk: 'поворот навколо', en: 'rotation around' }) + '</text><text class="txm" x="250" y="190" style="fill:var(--accent)">X, Y, Z</text>';
            return D.svg(380, 200, s);
          },
          cap: { uk: 'Одна мікросхема IMU: три прямі осі для акселерометра і три повороти для гіроскопа — крен, тангаж і рискання.', en: 'One IMU chip: three straight axes for the accelerometer and three rotations for the gyro — roll, pitch and yaw.' }
        }
      },
      {
        kind: 2,
        title: { uk: 'Модуль із датчиком: підписані виводи', en: 'A sensor module: labelled pins' },
        body: {
          uk: '<p>Модуль GY-521 з MPU-6050. Підписи виводів — наші старі знайомі: <b>VCC, GND</b> — живлення; <b>SCL, SDA</b> — шина I²C; <b>INT</b> — сигнал «дані готові». Стрілки X і Y на платі показують осі датчика.</p>',
          en: '<p>A GY-521 module with an MPU-6050. The pin labels are old friends: <b>VCC, GND</b> — power; <b>SCL, SDA</b> — the I²C bus; <b>INT</b> — a “data ready” signal. The X and Y arrows on the board show the sensor axes.</p>'
        },
        recall: [{ m: 'm09', s: 's4', label: { uk: 'I²C і SPI', en: 'I²C and SPI' } }],
        fig: { photo: 'r1-158' }
      },
      {
        kind: 5,
        title: { uk: 'IMU на справжній платі', en: 'An IMU on a real board' },
        body: {
          uk: '<p>На польотному контролері гіроскоп — маленький квадрат QFN, зазвичай <b>у центрі</b> плати: там вібрації найменші. Біля нього завжди 1–3 блокувальні конденсатори.</p>',
          en: '<p>On a flight controller the gyro is a small QFN square, usually <b>in the centre</b> of the board, where vibration is lowest. There are always 1–3 decoupling capacitors next to it.</p>'
        },
        recall: [{ m: 'm02', s: 's11', label: { uk: 'Блокувальні конденсатори', en: 'Decoupling capacitors' } }],
        fig: { photo: 'r1-155', cap: { uk: 'MPU-6050 на платі планшета, поруч — конденсатори.', en: 'An MPU-6050 on a tablet board, with capacitors next to it.' } }
      },
      {
        kind: 1,
        title: { uk: 'Барометр: висота за тиском', en: 'The barometer: height from pressure' },
        body: {
          uk: '<p>Тиск повітря падає з висотою — приблизно на 12 Па кожен метр біля землі. <b>Барометр</b> (BMP280, DPS310, SPL06) вимірює тиск і дає прошивці відносну висоту. Він чутливий до вітру від гвинтів і до світла, тому на платі його часто закривають шматочком поролону.</p>',
          en: '<p>Air pressure drops with height — by about 12 Pa per metre near the ground. A <b>barometer</b> (BMP280, DPS310, SPL06) measures pressure and gives the firmware relative altitude. It is sensitive to prop wash and light, so on a board it is often covered with a bit of foam.</p>'
        }
      },
      {
        kind: 1,
        title: { uk: 'GPS / GNSS і компас', en: 'GPS / GNSS and the compass' },
        body: {
          uk: '<p><b>GNSS-модуль</b> приймає слабкі сигнали з супутників (GPS, Galileo, BeiDou) і визначає координати. Будова: <b>керамічна патч-антена</b> (квадрат зверху), приймач (часто u-blox M8/M10) і підключення по UART (TX/RX).</p><p>Поруч часто стоїть <b>компас</b> (магнітометр) на I²C — тому в GPS-модуля буває 4 дроти UART+I²C плюс живлення. Компас «боїться» силових дротів і магнітів двигунів, тому модуль виносять подалі на щоглу.</p><p>Сигнал супутників надзвичайно слабкий — це важливо для модуля 14 (завади й підміна).</p>',
          en: '<p>A <b>GNSS module</b> receives faint signals from satellites (GPS, Galileo, BeiDou) and works out coordinates. Its parts: a <b>ceramic patch antenna</b> (the square on top), a receiver (often u-blox M8/M10) and a UART link (TX/RX).</p><p>A <b>compass</b> (magnetometer) on I²C often sits alongside, so GPS modules may have UART + I²C wires plus power. The compass “fears” power wires and motor magnets, so the module is mounted away on a mast.</p><p>Satellite signals are extremely weak — that matters for module 14 (jamming and spoofing).</p>'
        },
        fig: { photo: 'r1-161', cap: { uk: 'GPS-модуль: патч-антена, виводи TX, RX, VIN, GND.', en: 'A GPS module: patch antenna, TX, RX, VIN, GND pins.' } }
      },
      {
        kind: 5,
        title: { uk: 'Патч-антена GNSS зблизька', en: 'A GNSS patch antenna close up' },
        body: { uk: '<p>Кераміка зі срібним покриттям і точка живлення. Розмір і форма підібрані під частоту ~1,575 ГГц. Про антени — модуль 11.</p>', en: '<p>Ceramic with a silver coating and a feed point. Its size and shape are tuned to ~1.575 GHz. Antennas are module 11.</p>' },
        fig: { photo: 'r1-162' }
      },
      {
        kind: 1,
        title: { uk: 'Камера: аналогова і цифрова', en: 'The camera: analog and digital' },
        body: {
          uk: '<p>FPV-камера — світлочутлива матриця (CMOS) і процесор зображення.</p><ul><li><b>Аналогова</b> видає сигнал CVBS (PAL/NTSC) одним дротом — його можна відразу передати в аналоговий відеопередавач. Мінімальна затримка.</li><li><b>Цифрова</b> (системи DJI, Walksnail, HDZero) працює в парі зі своїм цифровим передавачем і дає чисту картинку високої роздільності.</li></ul><p>Дроти камери: живлення, земля і відео.</p>',
          en: '<p>An FPV camera is a light-sensitive sensor (CMOS) plus an image processor.</p><ul><li>An <b>analog</b> camera outputs a CVBS signal (PAL/NTSC) on one wire — it can go straight into an analog video transmitter. Minimal latency.</li><li>A <b>digital</b> camera (DJI, Walksnail, HDZero systems) works with its own digital transmitter and gives a clean high-resolution picture.</li></ul><p>Camera wires: power, ground and video.</p>'
        },
        fig: { photo: 'r1-163', cap: { uk: 'Аналогова FPV-камера RunCam Eagle.', en: 'A RunCam Eagle analog FPV camera.' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: OSD — напис поверх відео', en: 'Combine: OSD — text over the video' },
        body: {
          uk: '<p>Пілот бачить у шоломі напругу батареї, витрачені мАг, час польоту. Як? Відеосигнал із камери проходить через мікросхему <b>OSD</b> на польотному контролері (часто AT7456E). Процесор по SPI каже їй, які символи накласти, і вона домішує їх у відео, перш ніж воно піде на передавач.</p><p>Ось де сходиться все, що ми вивчили: дільник (напруга), шунт (струм), SPI (керування OSD), камера і відеопередавач.</p>',
          en: '<p>The pilot sees battery voltage, mAh used and flight time in the goggles. How? The camera’s video passes through an <b>OSD</b> chip on the flight controller (often the AT7456E). The processor tells it over SPI which characters to overlay, and it mixes them into the video before it reaches the transmitter.</p><p>This is where everything comes together: the divider (voltage), the shunt (current), SPI (OSD control), the camera and the video transmitter.</p>'
        },
        recall: [{ m: 'm06', s: 's3', label: { uk: 'Дільник напруги батареї', en: 'The battery voltage divider' } }, { m: 'm07', s: 's9', label: { uk: 'Датчик струму', en: 'The current sensor' } }],
        fig: {
          svg: function (L) {
            return D.svg(380, 120, D.chip(6, 40, 80, 44, L({ uk: 'Камера', en: 'Camera' }), 'CVBS') + D.arrow(86, 62, 120, 62, 'acc') + D.chip(120, 40, 100, 44, 'OSD', 'AT7456E') +
              D.arrow(220, 62, 254, 62, 'acc') + D.chip(254, 40, 100, 44, 'VTX', '5,8 GHz') + D.chip(120, 0, 100, 26, 'MCU', '') + D.arrow(170, 26, 170, 40, 'cu') +
              D.t(170, 108, L({ uk: '«16,4 В  850 мАг  2:15»', en: '“16.4V  850mAh  2:15”' }), 'txm'));
          }
        }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: дрон як зібрані разом органи чуття', en: 'Device: a drone as a set of senses' },
        body: {
          uk: '<p>Камера спереду, GPS на щоглі вгорі, польотний контролер у центрі рами з гіроскопом посередині плати, антени ззаду. Розташування кожного вузла має причину: камері — огляд, GPS — небо, гіроскопу — найменше вібрацій, антенам — подалі від карбону й дротів.</p>',
          en: '<p>The camera at the front, GPS on a mast on top, the flight controller in the centre of the frame with the gyro in the middle of the board, antennas at the back. Every placement has a reason: the camera needs a view, GPS needs the sky, the gyro needs the least vibration, antennas need distance from carbon and wires.</p>'
        },
        fig: { photo: 'r1-251' }
      }
    ],
    sources: [
      { t: { uk: 'TDK InvenSense — документація MPU-6000/6050, ICM-42688-P', en: 'TDK InvenSense — MPU-6000/6050, ICM-42688-P datasheets' } },
      { t: { uk: 'Bosch Sensortec — документація BMP280, BMI270', en: 'Bosch Sensortec — BMP280, BMI270 datasheets' } },
      { t: { uk: 'J. Geen, D. Krakauer. New iMEMS Angular-Rate-Sensing Gyroscope. Analog Dialogue 37-01, Analog Devices, 2003', en: 'J. Geen, D. Krakauer. New iMEMS Angular-Rate-Sensing Gyroscope. Analog Dialogue 37-01, Analog Devices, 2003' }, url: 'https://www.analog.com/en/resources/analog-dialogue/articles/imems-angular-rate-sensing-gyroscope.html' },
      { t: { uk: 'O. Liang. Betaflight Flight Modes — які режими потребують акселерометра', en: 'O. Liang. Betaflight Flight Modes — which modes need the accelerometer' }, url: 'https://oscarliang.com/betaflight-modes' },
      { t: { uk: 'u-blox — документація приймачів M8/M10', en: 'u-blox — M8/M10 receiver documentation' } },
      { t: { uk: 'Analog Devices (Maxim) — документація MAX7456 / сумісні AT7456E', en: 'Analog Devices (Maxim) — MAX7456 datasheet / compatible AT7456E' } }
    ],
    quiz: [
      { q: { uk: 'Що насправді вимірює MEMS-гіроскоп на польотному контролері?', en: 'What does the MEMS gyro on a flight controller actually measure?' }, opts: [{ uk: 'Швидкість повороту в градусах за секунду', en: 'Rate of turn in degrees per second' }, { uk: 'Тримає напрям, як дзиґа, що крутиться', en: 'It holds a direction like a spinning wheel' }, { uk: 'Висоту над землею', en: 'Height above ground' }, { uk: 'Лише прискорення', en: 'Only acceleration' }], a: 0,
        ex: { uk: 'Нічого не крутиться: рамка коливається, а поворот зсуває її силою Коріоліса. Датчик видає °/с, кут рахує прошивка.', en: 'Nothing spins: a frame vibrates and a turn shifts it through the Coriolis force. The sensor outputs °/s; the firmware works out the angle.' }, see: { m: 'm10', s: 's1b' } },
      { q: { uk: 'Що зсуває коливальну рамку MEMS-гіроскопа, коли плата повертається?', en: 'What pushes the vibrating frame of a MEMS gyro when the board turns?' }, opts: [{ uk: 'Сила Коріоліса', en: 'The Coriolis force' }, { uk: 'Магнітне поле двигунів', en: 'The motors’ magnetic field' }, { uk: 'Струм батареї', en: 'The battery current' }, { uk: 'Тиск повітря', en: 'Air pressure' }], a: 0,
        ex: { uk: 'Рух рамки + поворот плати = сила Коріоліса під прямим кутом до коливань.', en: 'Frame motion + board rotation = a Coriolis force at a right angle to the vibration.' }, see: { m: 'm10', s: 's1b' } },
      { q: { uk: 'У Betaflight вимкнули акселерометр. Що станеться?', en: 'The accelerometer is disabled in Betaflight. What happens?' }, opts: [{ uk: 'В акро дрон літає, але зникають режими Angle і Horizon', en: 'It flies in acro, but Angle and Horizon modes disappear' }, { uk: 'Дрон не зможе злетіти', en: 'The drone cannot take off' }, { uk: 'Зникне відео', en: 'The video disappears' }, { uk: 'Перестане працювати гіроскоп', en: 'The gyro stops working' }], a: 0,
        ex: { uk: 'Для стабілізації потрібен гіроскоп. Акселерометр потрібен лише для самовирівнювання.', en: 'Stabilisation needs the gyro. The accelerometer is needed only for self-levelling.' }, see: { m: 'm10', s: 's1c' } },
      { q: { uk: 'Чи бувають польотні контролери лише з акселерометром, без гіроскопа?', en: 'Are there flight controllers with only an accelerometer and no gyro?' }, opts: [{ uk: 'Ні — без гіроскопа дрон не стабілізувати', en: 'No — without a gyro the drone cannot be stabilised' }, { uk: 'Так, це найпоширеніший варіант', en: 'Yes, it is the most common type' }, { uk: 'Так, на всіх платах із GPS', en: 'Yes, on all boards with GPS' }, { uk: 'Так, на всіх платах «все-в-одному»', en: 'Yes, on all all-in-one boards' }], a: 0,
        ex: { uk: 'Буває навпаки: ранні плати KK мали лише гіроскопи. А акселерометр часто вимикають програмно.', en: 'The reverse happens: early KK boards had gyros only. And the accelerometer is often disabled in software.' }, see: { m: 'm10', s: 's1c' } },
      { q: { uk: 'Що вимірює гіроскоп?', en: 'What does a gyro measure?' }, opts: [{ uk: 'Швидкість обертання навколо осей', en: 'Rotation rate around the axes' }, { uk: 'Висоту', en: 'Altitude' }, { uk: 'Координати', en: 'Coordinates' }, { uk: 'Напругу батареї', en: 'Battery voltage' }], a: 0,
        ex: { uk: 'Гіроскоп — швидкість обертання. Акселерометр — прискорення і напрям «вниз».', en: 'The gyro measures rotation rate. The accelerometer measures acceleration and which way is “down”.' }, see: { m: 'm10', s: 's1' } },
      { q: { uk: 'Що дає акселерометр?', en: 'What does an accelerometer provide?' }, opts: [{ uk: 'Прискорення; у спокої — 1 g угору, за яким видно, де «низ»', en: 'Acceleration; at rest, 1 g pointing up, which shows where “down” is' }, { uk: 'Тиск повітря', en: 'Air pressure' }, { uk: 'Магнітний північ', en: 'Magnetic north' }, { uk: 'Зображення', en: 'An image' }], a: 0,
        ex: { uk: 'Акселерометр вимірює прискорення. У спокої він показує 1 g угору — за його напрямом прошивка знає, де «низ». Це потрібно для режиму самовирівнювання.', en: 'The accelerometer measures acceleration. At rest it reads 1 g pointing up — from its direction the firmware knows where “down” is. That is needed for self-levelling mode.' }, see: { m: 'm10', s: 's1' } },
      { q: { uk: 'Що таке IMU?', en: 'What is an IMU?' }, opts: [{ uk: 'Мікросхема з гіроскопом і акселерометром', en: 'A chip with a gyro and accelerometer' }, { uk: 'Тип антени', en: 'An antenna type' }, { uk: 'Регулятор обертів', en: 'A speed controller' }, { uk: 'Відеопередавач', en: 'A video transmitter' }], a: 0,
        ex: { uk: 'Inertial Measurement Unit — інерційний вимірювальний блок.', en: 'Inertial Measurement Unit.' }, see: { m: 'm10', s: 's1' } },
      { q: { uk: 'На модулі GY-521 є виводи SCL і SDA. Через яку шину він підключається?', en: 'The GY-521 module has SCL and SDA pins. Which bus does it use?' }, opts: [{ uk: 'I²C', en: 'I²C' }, { uk: 'UART', en: 'UART' }, { uk: 'SPI', en: 'SPI' }, { uk: 'USB', en: 'USB' }], a: 0,
        ex: { uk: 'SCL і SDA — сигнали I²C.', en: 'SCL and SDA are I²C signals.' }, see: { m: 'm10', s: 's2' } },
      { q: { uk: 'Де на польотному контролері зазвичай розміщують гіроскоп?', en: 'Where on a flight controller is the gyro usually placed?' }, opts: [{ uk: 'У центрі плати — там найменше вібрацій', en: 'In the centre of the board — least vibration there' }, { uk: 'На краю біля роз’єму', en: 'At the edge by a connector' }, { uk: 'Під батареєю', en: 'Under the battery' }, { uk: 'Біля антени', en: 'Next to the antenna' }], a: 0,
        ex: { uk: 'Центр плати — найближче до центру рами, де вібрації менші.', en: 'The board centre is closest to the frame centre, where vibration is lower.' }, see: { m: 'm10', s: 's3' } },
      { q: { uk: 'Як барометр визначає висоту?', en: 'How does a barometer determine height?' }, opts: [{ uk: 'За тиском повітря, що падає з висотою', en: 'From air pressure, which drops with height' }, { uk: 'За супутниками', en: 'From satellites' }, { uk: 'За температурою', en: 'From temperature' }, { uk: 'Ультразвуком', en: 'With ultrasound' }], a: 0,
        ex: { uk: 'Біля землі тиск падає ≈12 Па на метр.', en: 'Near the ground pressure drops ≈12 Pa per metre.' }, see: { m: 'm10', s: 's4' } },
      { q: { uk: 'Навіщо барометр на платі накривають поролоном?', en: 'Why is a barometer on a board covered with foam?' }, opts: [{ uk: 'Захистити від потоку повітря гвинтів і світла', en: 'To shield it from prop wash and light' }, { uk: 'Для теплоізоляції процесора', en: 'To insulate the processor' }, { uk: 'Щоб не подряпати', en: 'To prevent scratches' }, { uk: 'Від радіозавад', en: 'Against radio interference' }], a: 0,
        ex: { uk: 'Потік повітря змінює тиск біля датчика — показання «стрибають».', en: 'Moving air changes the pressure at the sensor — readings jump.' }, see: { m: 'm10', s: 's4' } },
      { q: { uk: 'Через яку шину зазвичай підключають GPS-приймач?', en: 'Which bus usually connects a GPS receiver?' }, opts: [{ uk: 'UART (TX/RX)', en: 'UART (TX/RX)' }, { uk: 'SPI', en: 'SPI' }, { uk: 'Аналоговий відеовхід', en: 'Analog video input' }, { uk: 'Силові дроти', en: 'Power wires' }], a: 0,
        ex: { uk: 'GPS — UART; компас поруч — I²C.', en: 'GPS uses UART; the compass alongside uses I²C.' }, see: { m: 'm10', s: 's5' } },
      { q: { uk: 'Що за керамічний квадрат зверху на GPS-модулі?', en: 'What is the ceramic square on top of a GPS module?' }, opts: [{ uk: 'Патч-антена', en: 'A patch antenna' }, { uk: 'Батарейка', en: 'A battery' }, { uk: 'Радіатор', en: 'A heatsink' }, { uk: 'Барометр', en: 'A barometer' }], a: 0,
        ex: { uk: 'Керамічна патч-антена налаштована на частоту GNSS ≈1,575 ГГц.', en: 'The ceramic patch is tuned to the GNSS frequency ≈1.575 GHz.' }, see: { m: 'm10', s: 's6' } },
      { q: { uk: 'Чому GPS-модуль з компасом виносять на щоглу?', en: 'Why is a GPS module with a compass mounted on a mast?' }, opts: [{ uk: 'Компас збивають силові дроти й магніти, а GPS потребує відкритого неба', en: 'Power wires and magnets disturb the compass, and GPS needs open sky' }, { uk: 'Щоб краще виглядало', en: 'For looks' }, { uk: 'Щоб охолоджувати', en: 'For cooling' }, { uk: 'Щоб не намокав', en: 'To keep it dry' }], a: 0,
        ex: { uk: 'Струми в дротах створюють магнітні поля; карбон і дроти затіняють супутники.', en: 'Currents in wires create magnetic fields; carbon and wires shade the satellites.' }, see: { m: 'm10', s: 's5' } },
      { q: { uk: 'Чим сигнал супутників GNSS особливий?', en: 'What is special about GNSS satellite signals?' }, opts: [{ uk: 'Він надзвичайно слабкий біля землі', en: 'It is extremely weak at ground level' }, { uk: 'Він дуже потужний', en: 'It is very powerful' }, { uk: 'Він іде дротом', en: 'It travels by wire' }, { uk: 'Він працює лише вночі', en: 'It works only at night' }], a: 0,
        ex: { uk: 'Слабкий сигнал легко заглушити — про це модуль 14.', en: 'A weak signal is easy to drown out — see module 14.' }, see: { m: 'm10', s: 's5' } },
      { q: { uk: 'Яким сигналом видає зображення аналогова FPV-камера?', en: 'What signal does an analog FPV camera output?' }, opts: [{ uk: 'Композитний відеосигнал CVBS (PAL/NTSC)', en: 'A composite CVBS video signal (PAL/NTSC)' }, { uk: 'Цифровий USB', en: 'Digital USB' }, { uk: 'Wi-Fi', en: 'Wi-Fi' }, { uk: 'I²C', en: 'I²C' }], a: 0,
        ex: { uk: 'Один дріт відео, CVBS, стандарт PAL чи NTSC.', en: 'One video wire, CVBS, PAL or NTSC standard.' }, see: { m: 'm10', s: 's7' } },
      { q: { uk: 'Головна перевага аналогового FPV-відео?', en: 'The main advantage of analog FPV video?' }, opts: [{ uk: 'Мінімальна затримка', en: 'Minimal latency' }, { uk: 'Висока роздільність', en: 'High resolution' }, { uk: 'Шифрування', en: 'Encryption' }, { uk: 'Немає завад', en: 'No interference' }], a: 0,
        ex: { uk: 'Аналог — найменша затримка; цифра — чіткість.', en: 'Analog gives the lowest latency; digital gives clarity.' }, see: { m: 'm10', s: 's7' } },
      { q: { uk: 'Що робить мікросхема OSD на польотному контролері?', en: 'What does the OSD chip on a flight controller do?' }, opts: [{ uk: 'Накладає текст (напругу, мАг, час) поверх відео', en: 'Overlays text (voltage, mAh, time) on the video' }, { uk: 'Передає відео в ефір', en: 'Transmits video over the air' }, { uk: 'Вимірює висоту', en: 'Measures height' }, { uk: 'Керує двигунами', en: 'Drives the motors' }], a: 0,
        ex: { uk: 'OSD — On-Screen Display, екранне меню поверх відео.', en: 'OSD means On-Screen Display.' }, see: { m: 'm10', s: 's8' } },
      { q: { uk: 'Якою шиною процесор керує OSD-мікросхемою AT7456E?', en: 'Which bus does the processor use to control an AT7456E OSD chip?' }, opts: [{ uk: 'SPI', en: 'SPI' }, { uk: 'UART', en: 'UART' }, { uk: 'Аналоговим відео', en: 'Analog video' }, { uk: 'Радіо', en: 'Radio' }], a: 0,
        ex: { uk: 'OSD, гіроскоп і флеш — на SPI.', en: 'OSD, gyro and flash are on SPI.' }, see: { m: 'm10', s: 's8' } },
      { q: { uk: 'Звідки OSD бере значення напруги батареї?', en: 'Where does the OSD get the battery voltage from?' }, opts: [{ uk: 'Процесор вимірює її через дільник і передає в OSD', en: 'The processor measures it through a divider and passes it to the OSD' }, { uk: 'Камера бачить батарею', en: 'The camera sees the battery' }, { uk: 'З GPS', en: 'From GPS' }, { uk: 'Вгадує', en: 'It guesses' }], a: 0,
        ex: { uk: 'Дільник → АЦП процесора → OSD → відео.', en: 'Divider → processor ADC → OSD → video.' }, see: { m: 'm10', s: 's8' } },
      { q: { uk: 'Що з переліченого вимірює магнітне поле Землі?', en: 'Which of these measures the Earth’s magnetic field?' }, opts: [{ uk: 'Компас (магнітометр)', en: 'The compass (magnetometer)' }, { uk: 'Гіроскоп', en: 'The gyro' }, { uk: 'Барометр', en: 'The barometer' }, { uk: 'Шунт', en: 'The shunt' }], a: 0,
        ex: { uk: 'Магнітометр показує напрям на магнітну північ.', en: 'A magnetometer points to magnetic north.' }, see: { m: 'm10', s: 's5' } }
    ]
  });
})();
