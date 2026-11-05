/* Module 1 — Electricity basics */
(function () {
  var V = { uk: 'В', en: 'V' }, A = { uk: 'А', en: 'A' }, OHM = { uk: 'Ом', en: 'Ω' }, W = { uk: 'Вт', en: 'W' };
  function u(o, l) { return o[l] || o.uk; }

  APP.module({
    id: 'm01', n: 1, part: 'A', cv: 1,
    title: { uk: 'Струм, напруга, опір', en: 'Current, voltage, resistance' },
    short: { uk: 'Що таке електрика і звідки береться живлення', en: 'What electricity is and where power comes from' },
    intro: {
      uk: 'Перш ніж читати плату, треба зрозуміти, що по ній «тече». Цей модуль — про три величини, на яких тримається вся електроніка, і про батарею, що живить дрон.',
      en: 'Before reading a board, you need to understand what “flows” through it. This module covers the three quantities all electronics rest on, and the battery that powers a drone.'
    },
    steps: [
      {
        kind: 1,
        title: { uk: 'Струм — це рух зарядів', en: 'Current is moving charge' },
        body: {
          uk: '<p>У металевому дроті є вільні електрони. Коли їх «штовхає» батарея, вони рухаються дротом — це і є <b>електричний струм</b>.</p><p>Найпростіше уявити воду в трубах:</p><ul><li><b>Напруга</b> — це тиск, що штовхає воду.</li><li><b>Струм</b> — скільки води протікає за секунду.</li><li><b>Опір</b> — наскільки вузька труба.</li></ul><div class="key">Без напруги струму немає. Без замкненого кола — теж.</div>',
          en: '<p>A metal wire contains free electrons. When a battery “pushes” them, they move along the wire — that is <b>electric current</b>.</p><p>The easiest picture is water in pipes:</p><ul><li><b>Voltage</b> is the pressure pushing the water.</li><li><b>Current</b> is how much water flows per second.</li><li><b>Resistance</b> is how narrow the pipe is.</li></ul><div class="key">No voltage — no current. No closed circuit — no current either.</div>'
        },
        fig: {
          svg: function (L) {
            return D.svg(380, 150,
              '<rect class="st mut" x="20" y="40" width="340" height="34" rx="6"/><rect class="st mut" x="150" y="49" width="80" height="16" rx="4"/>' +
              '<circle class="dot" cx="60" cy="57" r="5"/><circle class="dot" cx="90" cy="57" r="5"/><circle class="dot" cx="120" cy="57" r="5"/><circle class="dot" cx="175" cy="57" r="4"/><circle class="dot" cx="205" cy="57" r="4"/><circle class="dot" cx="270" cy="57" r="5"/><circle class="dot" cx="310" cy="57" r="5"/>' +
              D.arrow(30, 100, 110, 100, 'acc') + D.t(70, 122, L({ uk: 'тиск = напруга', en: 'pressure = voltage' }), 'txm') +
              D.t(190, 100, L({ uk: 'вузьке місце = опір', en: 'narrow spot = resistance' }), 'txm') +
              D.t(310, 100, L({ uk: 'потік = струм', en: 'flow = current' }), 'txm') +
              D.t(190, 28, L({ uk: 'труба з водою ≈ дріт із зарядами', en: 'a water pipe ≈ a wire with charges' }), 'tx'));
          },
          cap: { uk: 'Аналогія з водою: вона не ідеальна, але добре пояснює головне.', en: 'The water analogy is not perfect, but it explains the main idea well.' }
        }
      },
      {
        kind: 2,
        title: { uk: 'Найпростіше коло: батарея, вимикач, лампа', en: 'The simplest circuit: battery, switch, lamp' },
        body: {
          uk: '<p>Струм іде лише по <b>замкненому колу</b>: від одного полюса батареї через навантаження до другого. Розмикаємо коло вимикачем — і струм зупиняється одразу всюди.</p><p>Домовились вважати, що струм тече від «+» до «−». Насправді електрони рухаються навпаки, але на схемах усі використовують домовлений напрям.</p>',
          en: '<p>Current flows only around a <b>closed circuit</b>: from one battery terminal, through the load, to the other. Open the circuit with a switch and current stops everywhere at once.</p><p>By convention, current flows from “+” to “−”. Electrons actually move the other way, but all schematics use the conventional direction.</p>'
        },
        fig: { anim: 'circuit', cap: { uk: 'Натискаємо «Замкнути вимикач». Потім порівнюємо домовлений напрям струму з рухом електронів.', en: 'Press “Close the switch”. Then compare the conventional current direction with electron flow.' } }
      },
      {
        kind: 1,
        title: { uk: 'Одиниці: вольт, ампер, ом', en: 'Units: volt, ampere, ohm' },
        body: {
          uk: '<ul><li><b>Напруга U</b> — у вольтах (В). Батарея дрона 6S — близько 22–25 В.</li><li><b>Струм I</b> — в амперах (А). Дрон у висінні бере десятки ампер.</li><li><b>Опір R</b> — в омах (Ом). На платах трапляються резистори від кількох ом до мільйонів.</li></ul><p>Великі й малі числа скорочують приставками:</p><ul><li><b>к</b> (кіло) = ×1000: 4,7 кОм = 4700 Ом</li><li><b>М</b> (мега) = ×1 000 000: 1 МОм</li><li><b>м</b> (мілі) = ÷1000: 250 мА = 0,25 А</li><li><b>мк</b> (мікро) = ÷1 000 000: 10 мкФ</li></ul>',
          en: '<ul><li><b>Voltage U</b> — in volts (V). A 6S drone battery is about 22–25 V.</li><li><b>Current I</b> — in amperes (A). A hovering drone draws tens of amps.</li><li><b>Resistance R</b> — in ohms (Ω). Boards carry resistors from a few ohms to millions.</li></ul><p>Big and small numbers use prefixes:</p><ul><li><b>k</b> (kilo) = ×1000: 4.7 kΩ = 4700 Ω</li><li><b>M</b> (mega) = ×1,000,000: 1 MΩ</li><li><b>m</b> (milli) = ÷1000: 250 mA = 0.25 A</li><li><b>µ</b> (micro) = ÷1,000,000: 10 µF</li></ul>'
        }
      },
      {
        kind: 1,
        title: { uk: 'Постійний і змінний струм', en: 'Direct and alternating current' },
        body: {
          uk: '<p><b>Постійний (DC)</b> — тече в один бік. Його дають батареї та акумулятори. Майже вся електроніка дрона працює на постійному струмі.</p><p><b>Змінний (AC)</b> — постійно змінює напрям. У розетці в Україні — 230 В, напрям змінюється 50 разів на секунду (50 Гц).</p><p>Пізніше ми побачимо, як діоди перетворюють змінний струм на постійний — це робить кожен зарядний пристрій.</p>',
          en: '<p><b>Direct current (DC)</b> flows one way. Batteries provide it. Almost all drone electronics run on DC.</p><p><b>Alternating current (AC)</b> keeps changing direction. A Ukrainian wall socket gives 230 V, switching direction 50 times per second (50 Hz).</p><p>Later you will see how diodes turn AC into DC — every charger does this.</p>'
        },
        fig: {
          svg: function (L) {
            var s = '<line class="grid" x1="20" y1="60" x2="360" y2="60"/><line class="st acc" x1="20" y1="35" x2="360" y2="35"/>' + D.t(20, 22, L({ uk: 'DC — постійний', en: 'DC — direct' }), 'lbl', 'start');
            var p = []; for (var x = 0; x <= 340; x += 4) p.push((20 + x) + ',' + (140 - Math.sin(x / 340 * 6 * Math.PI) * 28).toFixed(1));
            s += '<line class="grid" x1="20" y1="140" x2="360" y2="140"/><polyline class="st cu" points="' + p.join(' ') + '"/>' + D.t(20, 100, L({ uk: 'AC — змінний', en: 'AC — alternating' }), 'lbl', 'start');
            s += D.t(360, 186, L({ uk: 'час →', en: 'time →' }), 'txm', 'end');
            return D.svg(380, 195, s);
          }
        }
      },
      {
        kind: 3,
        title: { uk: 'Закон Ома: як пов’язані всі три', en: 'Ohm’s law: how the three are linked' },
        body: {
          uk: '<div class="formula">I = U / R</div><p>Струм дорівнює напрузі, поділеній на опір. Звідси ще дві форми: <b>U = I × R</b> і <b>R = U / I</b>.</p><p>Приклад: до 12 В підключили резистор 6 Ом. Струм = 12 / 6 = <b>2 А</b>.</p><p>Рухаємо повзунки: більше напруги — лампа яскравіша; більше опору — тьмяніша.</p>',
          en: '<div class="formula">I = U / R</div><p>Current equals voltage divided by resistance. Two more forms follow: <b>U = I × R</b> and <b>R = U / I</b>.</p><p>Example: a 6 Ω resistor on 12 V. Current = 12 / 6 = <b>2 A</b>.</p><p>Move the sliders: more voltage — a brighter lamp; more resistance — a dimmer one.</p>'
        },
        fig: { anim: 'ohm' }
      },
      {
        kind: 3,
        title: { uk: 'Потужність: скільки роботи робить струм', en: 'Power: how much work the current does' },
        body: {
          uk: '<div class="formula">P = U × I</div><p>Потужність вимірюють у ватах (Вт). Дрон на батареї 4S (≈15 В), що бере 20 А, споживає 15 × 20 = <b>300 Вт</b>.</p><p>Частина потужності завжди стає <b>теплом</b>. Тому силові дроти дрона товсті, а деталі, через які йде великий струм, гріються.</p>',
          en: '<div class="formula">P = U × I</div><p>Power is measured in watts (W). A drone on a 4S battery (≈15 V) drawing 20 A uses 15 × 20 = <b>300 W</b>.</p><p>Part of the power always turns into <b>heat</b>. That is why a drone’s power wires are thick, and parts carrying big currents get warm.</p>'
        }
      },
      {
        kind: 4,
        title: { uk: 'Батарея дрона: банки, S і C', en: 'The drone battery: cells, S and C' },
        body: {
          uk: '<p>LiPo-акумулятор складається з <b>банок</b> (комірок). Одна банка: <b>4,2 В</b> — повністю заряджена, <b>3,7 В</b> — номінал, нижче ~3,0 В — шкідливо для банки.</p><p>Банки з’єднують послідовно, і напруги додаються. Число банок позначають літерою <b>S</b>: 4S = 4 × 4,2 = 16,8 В повністю зарядженої; 6S = 25,2 В.</p><ul><li><b>мАг (mAh)</b> — ємність: 1300 мАг віддають 1,3 А протягом години.</li><li><b>C</b> — допустимий струм розряду: ємність в А·год × C. Для 1,3 А·год і 100C це 130 А. Виробники часто пишуть завищене C.</li></ul>',
          en: '<p>A LiPo battery is made of <b>cells</b>. One cell: <b>4.2 V</b> fully charged, <b>3.7 V</b> nominal, below ~3.0 V harms the cell.</p><p>Cells are connected in series, so voltages add up. The cell count is written with <b>S</b>: 4S = 4 × 4.2 = 16.8 V fully charged; 6S = 25.2 V.</p><ul><li><b>mAh</b> — capacity: 1300 mAh delivers 1.3 A for one hour.</li><li><b>C</b> — allowed discharge current: capacity in Ah × C. For 1.3 Ah and 100C that is 130 A. Manufacturers often overstate C.</li></ul>'
        },
        fig: { photo: 'r1-094', cap: { uk: 'Батарея 3S: на етикетці видно ємність 5200 (мАг) і 60C.', en: 'A 3S battery: the label shows the capacity, 5200 (mAh), and 60C.' } },
        body2: {
          uk: '<p>Те саме правило діє всюди. Пульт показує <b>8,2 В</b> — це дві літієві банки (2S) по ~4,1 В. Майже повний заряд.</p>',
          en: '<p>The same rule applies everywhere. This radio shows <b>8.2 V</b> — two lithium cells (2S) of ~4.1 V each. Almost full.</p>'
        }
      },
      {
        kind: 4,
        title: { uk: 'Пульт теж живиться від батареї', en: 'The radio runs on a battery too' },
        body: {
          uk: '<p>Дивимося на екран: число в рамці зліва — напруга батареї пульта. Коли воно падає до ~7 В (2 × 3,5 В), час заряджати.</p>',
          en: '<p>Look at the screen: the number in the box on the left is the radio’s battery voltage. When it drops to ~7 V (2 × 3.5 V), it is time to charge.</p>'
        },
        fig: {
          photo: 'own-tx12',
          hot: [
            { id: 'volt', p: [31, 68, 9, 7], label: { uk: 'Напруга батареї: 8,2 В', en: 'Battery voltage: 8.2 V' }, info: { uk: '2 банки × 4,1 В', en: '2 cells × 4.1 V' } },
            { id: 'pwr', p: [41, 36, 13, 9], label: { uk: 'Кнопка живлення', en: 'Power button' } },
            { id: 'stick', p: [11, 22, 27, 27], label: { uk: 'Стік (джойстик)', en: 'Stick (gimbal)' } }
          ],
          cap: { uk: 'RadioMaster TX12 MKII з ELRS. Власне фото.', en: 'RadioMaster TX12 MKII with ELRS. Own photo.' }
        }
      },
      {
        kind: 5,
        title: { uk: 'Силові роз’єми: XT30, XT60, XT90', en: 'Power connectors: XT30, XT60, XT90' },
        body: {
          uk: '<p>Батарею підключають жовтими роз’ємами. Число в назві — це <b>короткочасний</b> струм, а тривалий удвічі менший:</p><ul><li><b>XT30</b> — 15 А тривало / 30 А пікове</li><li><b>XT60</b> — 30 А / 60 А</li><li><b>XT90</b> — 45 А / 90 А</li></ul><p>Зрізані кути — це «ключ»: роз’єм не вставиш навпаки. Червоний дріт — «+», чорний — «−».</p><div class="key">Коротке замикання LiPo-батареї — це пожежа. Ніколи не торкаємося одночасно обох контактів металом.</div>',
          en: '<p>Batteries plug in with yellow connectors. The number in the name is the <b>short burst</b> current; the continuous rating is half that:</p><ul><li><b>XT30</b> — 15 A continuous / 30 A burst</li><li><b>XT60</b> — 30 A / 60 A</li><li><b>XT90</b> — 45 A / 90 A</li></ul><p>The cut corners are a “key”: the plug won’t go in backwards. Red wire is “+”, black is “−”.</p><div class="key">A short-circuited LiPo battery means fire. Never bridge both contacts with metal.</div>'
        },
        fig: { src: { uk: 'svg/xt-connectors-uk.svg', en: 'svg/xt-connectors-en.svg' }, cap: { uk: 'Вигляд спереду, приблизно в масштабі. Значення струму — дані виробника AMASS.', en: 'Front view, roughly to scale. Current ratings are AMASS manufacturer figures.' } }
      }
    ],
    sources: [
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид. Cambridge University Press, 2015 — розділ 1', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed. Cambridge University Press, 2015 — chapter 1' } },
      { t: { uk: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4-те вид. McGraw-Hill, 2016', en: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4th ed. McGraw-Hill, 2016' } },
      { t: 'Battery University (Cadex Electronics, I. Buchmann) — BU-205: Types of Lithium-ion', url: 'https://batteryuniversity.com/article/bu-205-types-of-lithium-ion' },
      { t: { uk: 'Holybro — номінальні струми роз’ємів AMASS XT60/XT90', en: 'Holybro — AMASS XT60/XT90 connector ratings' }, url: 'https://docs.holybro.com/power-module-and-pdb/power-module/connector-and-wire-rating' }
    ],
    quiz: [
      { q: { uk: 'Що в аналогії з водою відповідає <b>напрузі</b>?', en: 'In the water analogy, what corresponds to <b>voltage</b>?' },
        opts: [{ uk: 'Тиск, що штовхає воду', en: 'The pressure pushing the water' }, { uk: 'Кількість води за секунду', en: 'The amount of water per second' }, { uk: 'Ширина труби', en: 'The width of the pipe' }, { uk: 'Довжина труби', en: 'The length of the pipe' }],
        a: 0, ex: { uk: 'Напруга «штовхає» заряди, як тиск штовхає воду. Потік — це струм, вузькість — опір.', en: 'Voltage “pushes” charges like pressure pushes water. Flow is current, narrowness is resistance.' }, see: { m: 'm01', s: 's1' } },
      { q: { uk: 'Вимикач у колі розімкнули. Що станеться зі струмом?', en: 'The switch in a circuit is opened. What happens to the current?' },
        opts: [{ uk: 'Він зупиниться в усьому колі', en: 'It stops in the whole circuit' }, { uk: 'Він зупиниться лише після вимикача', en: 'It stops only after the switch' }, { uk: 'Він стане вдвічі меншим', en: 'It halves' }, { uk: 'Нічого не зміниться', en: 'Nothing changes' }],
        a: 0, ex: { uk: 'Струм іде лише по замкненому колу. Розрив будь-де зупиняє його всюди.', en: 'Current flows only around a closed circuit. A break anywhere stops it everywhere.' }, see: { m: 'm01', s: 's2' } },
      { q: { uk: 'У який бік за домовленістю тече струм на схемах?', en: 'Which way does current flow on schematics, by convention?' },
        opts: [{ uk: 'Від «+» до «−»', en: 'From “+” to “−”' }, { uk: 'Від «−» до «+»', en: 'From “−” to “+”' }, { uk: 'В обидва боки', en: 'Both ways' }, { uk: 'Залежить від кольору дроту', en: 'Depends on the wire colour' }],
        a: 0, ex: { uk: 'Домовлений напрям — від «+» до «−». Електрони насправді рухаються навпаки.', en: 'The conventional direction is “+” to “−”. Electrons actually move the other way.' }, see: { m: 'm01', s: 's2' } },
      { q: { uk: 'Скільки це — 4,7 кОм?', en: 'How much is 4.7 kΩ?' },
        opts: [{ uk: '4700 Ом', en: '4700 Ω' }, { uk: '47 Ом', en: '47 Ω' }, { uk: '0,0047 Ом', en: '0.0047 Ω' }, { uk: '4 700 000 Ом', en: '4,700,000 Ω' }],
        a: 0, ex: { uk: '«к» (кіло) означає ×1000: 4,7 × 1000 = 4700 Ом.', en: '“k” (kilo) means ×1000: 4.7 × 1000 = 4700 Ω.' }, see: { m: 'm01', s: 's3' } },
      { q: { uk: '250 мА — це скільки ампер?', en: '250 mA is how many amps?' },
        opts: [{ uk: '0,25 А', en: '0.25 A' }, { uk: '2,5 А', en: '2.5 A' }, { uk: '25 А', en: '25 A' }, { uk: '250 000 А', en: '250,000 A' }],
        a: 0, ex: { uk: '«м» (мілі) — поділити на 1000: 250 / 1000 = 0,25 А.', en: '“m” (milli) means divide by 1000: 250 / 1000 = 0.25 A.' }, see: { m: 'm01', s: 's3' } },
      { q: { uk: 'Який струм дає батарея дрона?', en: 'What kind of current does a drone battery provide?' },
        opts: [{ uk: 'Постійний (DC)', en: 'Direct (DC)' }, { uk: 'Змінний (AC), 50 Гц', en: 'Alternating (AC), 50 Hz' }, { uk: 'Змінний, 2,4 ГГц', en: 'Alternating, 2.4 GHz' }, { uk: 'Імпульсний, лише під час польоту', en: 'Pulsed, only in flight' }],
        a: 0, ex: { uk: 'Батареї дають постійний струм, що тече в один бік.', en: 'Batteries give direct current that flows one way.' }, see: { m: 'm01', s: 's4' } },
      { q: { uk: 'Які параметри має мережа в розетці в Україні?', en: 'What are the mains parameters in a Ukrainian wall socket?' },
        opts: [{ uk: '230 В, 50 Гц', en: '230 V, 50 Hz' }, { uk: '110 В, 60 Гц', en: '110 V, 60 Hz' }, { uk: '12 В, постійний', en: '12 V, DC' }, { uk: '380 В, постійний', en: '380 V, DC' }],
        a: 0, ex: { uk: 'В Україні — 230 В змінного струму, 50 Гц.', en: 'Ukraine uses 230 V AC at 50 Hz.' }, see: { m: 'm01', s: 's4' } },
      { q: { uk: 'Опір у колі збільшили, а напругу залишили тією самою. Що буде зі струмом?', en: 'The resistance in a circuit goes up while the voltage stays the same. What happens to the current?' },
        opts: [{ uk: 'Зменшиться', en: 'It decreases' }, { uk: 'Збільшиться', en: 'It increases' }, { uk: 'Не зміниться', en: 'It stays the same' }, { uk: 'Змінить напрям', en: 'It reverses' }],
        a: 0, ex: { uk: 'I = U / R: що більший опір, то менший струм.', en: 'I = U / R: the bigger the resistance, the smaller the current.' }, see: { m: 'm01', s: 's5' } },
      { type: 'calc', see: { m: 'm01', s: 's5' }, gen: function (R, c) {
          var r = R.pick([2, 3, 4, 5, 6, 8, 10, 12]), i = R.pick([0.5, 1, 1.5, 2, 3]), v = r * i;
          var o = c.numOpts(i, [v * r, r / v, v + r], A, 2);
          return { q: { uk: 'Батарея ' + c.fmt(v) + ' В, резистор ' + r + ' Ом. Який струм у колі?', en: 'A ' + c.fmt(v) + ' V battery and a ' + r + ' Ω resistor. What current flows?' }, opts: o.opts, a: 0,
            ex: { uk: 'I = U / R = ' + c.fmt(v) + ' / ' + r + ' = ' + c.fmt(i) + ' А.', en: 'I = U / R = ' + c.fmt(v) + ' / ' + r + ' = ' + c.fmt(i) + ' A.' } };
        } },
      { type: 'calc', see: { m: 'm01', s: 's5' }, gen: function (R, c) {
          var r = R.pick([100, 220, 330, 470, 1000]), mA = R.pick([10, 20, 5]), v = r * mA / 1000;
          var o = c.numOpts(v, [r * mA, r / mA, v * 10], V, 2);
          return { q: { uk: 'Через резистор ' + r + ' Ом іде струм ' + mA + ' мА. Яка напруга на ньому?', en: 'A current of ' + mA + ' mA flows through a ' + r + ' Ω resistor. What is the voltage across it?' }, opts: o.opts, a: 0,
            ex: { uk: 'U = I × R. Спершу мА в А: ' + mA + ' мА = ' + c.fmt(mA / 1000, 3) + ' А. U = ' + c.fmt(mA / 1000, 3) + ' × ' + r + ' = ' + c.fmt(v) + ' В.', en: 'U = I × R. First mA to A: ' + mA + ' mA = ' + c.fmt(mA / 1000, 3) + ' A. U = ' + c.fmt(mA / 1000, 3) + ' × ' + r + ' = ' + c.fmt(v) + ' V.' } };
        } },
      { type: 'calc', see: { m: 'm01', s: 's6' }, gen: function (R, c) {
          var s = R.pick([4, 6]), v = s === 4 ? 15 : 22, i = R.pick([10, 15, 20, 30, 40]), p = v * i;
          var o = c.numOpts(p, [v + i, p / 10, v / i * 100], W, 0);
          return { q: { uk: 'Дрон на батареї ' + s + 'S (≈' + v + ' В) бере ' + i + ' А. Яку потужність він споживає?', en: 'A drone on a ' + s + 'S battery (≈' + v + ' V) draws ' + i + ' A. How much power does it use?' }, opts: o.opts, a: 0,
            ex: { uk: 'P = U × I = ' + v + ' × ' + i + ' = ' + p + ' Вт.', en: 'P = U × I = ' + v + ' × ' + i + ' = ' + p + ' W.' } };
        } },
      { q: { uk: 'Чому силові дроти дрона товсті?', en: 'Why are a drone’s power wires thick?' },
        opts: [{ uk: 'Через них іде великий струм, а тонкий дріт сильно грівся б', en: 'They carry big currents, and a thin wire would heat up a lot' }, { uk: 'Щоб дрон був важчим і стабільнішим', en: 'To make the drone heavier and more stable' }, { uk: 'Щоб збільшити напругу батареї', en: 'To raise the battery voltage' }, { uk: 'Щоб захистити від радіозавад', en: 'To protect against radio interference' }],
        a: 0, ex: { uk: 'Великий струм нагріває дріт. Товщий дріт має менший опір і гріється менше.', en: 'A big current heats a wire. A thicker wire has less resistance and heats less.' }, see: { m: 'm01', s: 's6' } },
      { type: 'calc', see: { m: 'm01', s: 's7' }, gen: function (R, c) {
          var s = R.pick([2, 3, 4, 6, 8]), v = s * 4.2;
          var o = c.numOpts(v, [s * 3.7, s * 3.0, s * 5], V, 1);
          return { q: { uk: 'Яка напруга повністю зарядженої LiPo-батареї ' + s + 'S?', en: 'What is the voltage of a fully charged ' + s + 'S LiPo battery?' }, opts: o.opts, a: 0,
            ex: { uk: 'Одна банка повністю заряджена — 4,2 В. ' + s + ' × 4,2 = ' + c.fmt(v, 1) + ' В.', en: 'One fully charged cell is 4.2 V. ' + s + ' × 4.2 = ' + c.fmt(v, 1) + ' V.' } };
        } },
      { q: { uk: 'Що означає позначка <b>1300 мАг</b> на батареї?', en: 'What does <b>1300 mAh</b> on a battery mean?' },
        opts: [{ uk: 'Ємність: віддасть 1,3 А протягом години', en: 'Capacity: it delivers 1.3 A for one hour' }, { uk: 'Максимальна напруга 13 В', en: 'Maximum voltage 13 V' }, { uk: 'Струм заряджання 13 А', en: 'Charging current 13 A' }, { uk: 'Вага 130 г', en: 'Weight 130 g' }],
        a: 0, ex: { uk: 'мАг — міліампер-години, тобто ємність. 1300 мАг = 1,3 А·год.', en: 'mAh means milliamp-hours, i.e. capacity. 1300 mAh = 1.3 Ah.' }, see: { m: 'm01', s: 's7' } },
      { type: 'calc', see: { m: 'm01', s: 's7' }, gen: function (R, c) {
          var cap = R.pick([1300, 1500, 2200, 5200]), cr = R.pick([50, 75, 100]), i = cap / 1000 * cr;
          var o = c.numOpts(i, [cap * cr, cap / cr, i / 10], A, 0);
          return { q: { uk: 'Батарея ' + cap + ' мАг, ' + cr + 'C. Який максимальний струм розряду обіцяє виробник?', en: 'A ' + cap + ' mAh, ' + cr + 'C battery. What maximum discharge current does the maker promise?' }, opts: o.opts, a: 0,
            ex: { uk: 'Ємність в А·год × C: ' + c.fmt(cap / 1000, 1) + ' × ' + cr + ' = ' + c.fmt(i, c.needD(i, 0)) + ' А. На практиці реальна цифра часто нижча.', en: 'Capacity in Ah × C: ' + c.fmt(cap / 1000, 1) + ' × ' + cr + ' = ' + c.fmt(i, c.needD(i, 0)) + ' A. In practice the real figure is often lower.' } };
        } },
      { q: { uk: 'Нижче якої напруги на одну банку LiPo-батарею вже шкідливо розряджати?', en: 'Below what voltage per cell does discharging a LiPo start to harm it?' },
        opts: [{ uk: '≈3,0 В', en: '≈3.0 V' }, { uk: '4,2 В', en: '4.2 V' }, { uk: '3,9 В', en: '3.9 V' }, { uk: '1,5 В', en: '1.5 V' }],
        a: 0, ex: { uk: 'Нижче ~3,0 В на банку LiPo псується. Тому пілоти садять дрон, коли під навантаженням ~3,5 В.', en: 'Below ~3.0 V per cell a LiPo gets damaged. That is why pilots land at ~3.5 V under load.' }, see: { m: 'm01', s: 's7' } },
      { q: { uk: 'Що означає число 60 у назві роз’єму XT60?', en: 'What does the 60 in “XT60” mean?' },
        opts: [{ uk: 'Короткочасний (піковий) струм 60 А; тривалий — 30 А', en: 'A 60 A short burst current; continuous is 30 A' }, { uk: 'Тривалий струм 60 А', en: 'A continuous current of 60 A' }, { uk: 'Максимальна напруга 60 В', en: 'A maximum voltage of 60 V' }, { uk: 'Ширина роз’єму 60 мм', en: 'A 60 mm connector width' }],
        a: 0, ex: { uk: 'За даними AMASS: XT60 — 30 А тривало, 60 А протягом короткого часу.', en: 'According to AMASS: XT60 is 30 A continuous, 60 A for a short burst.' }, see: { m: 'm01', s: 's9' } },
      { q: { uk: 'Навіщо в роз’ємів XT зрізані кути?', en: 'Why do XT connectors have cut corners?' },
        opts: [{ uk: 'Це ключ полярності: роз’єм не вставиш навпаки', en: 'It’s a polarity key: the plug can’t go in backwards' }, { uk: 'Для кращого охолодження', en: 'For better cooling' }, { uk: 'Щоб зменшити вагу', en: 'To reduce weight' }, { uk: 'Це лише дизайн', en: 'Just for looks' }],
        a: 0, ex: { uk: 'Форма дозволяє з’єднати «+» лише з «+», а «−» з «−».', en: 'The shape lets “+” meet only “+”, and “−” only “−”.' }, see: { m: 'm01', s: 's9' } },
      { type: 'tap', q: { uk: 'Де на пульті показано напругу його батареї?', en: 'Where does the radio show its battery voltage?' },
        fig: { photo: 'own-tx12', hot: [
          { id: 'volt', p: [30, 67, 11, 9] }, { id: 'title', p: [41, 62, 16, 6] }, { id: 'pwr', p: [41, 36, 13, 9] }, { id: 'stick', p: [11, 22, 27, 27] }, { id: 'wheel', p: [73, 61, 11, 23] } ] },
        a: 'volt', ex: { uk: 'У рамці ліворуч на екрані — 8,2 В: дві банки по ~4,1 В.', en: 'The box on the left of the screen shows 8.2 V: two cells of ~4.1 V each.' }, see: { m: 'm01', s: 's8' } }
    ]
  });
})();
