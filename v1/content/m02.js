/* Module 2 — Passive components */
(function () {
  var OHM = { uk: 'Ом', en: 'Ω' };
  function kfmt(c, ohms) { // human-readable resistance
    var uk = c.lang !== 'en';
    if (ohms >= 1e6) return c.fmt(ohms / 1e6) + (uk ? ' МОм' : ' MΩ');
    if (ohms >= 1e3) return c.fmt(ohms / 1e3) + (uk ? ' кОм' : ' kΩ');
    return c.fmt(ohms) + (uk ? ' Ом' : ' Ω');
  }
  var COLORS = [
    { uk: 'чорний', en: 'black' }, { uk: 'коричневий', en: 'brown' }, { uk: 'червоний', en: 'red' }, { uk: 'помаранчевий', en: 'orange' }, { uk: 'жовтий', en: 'yellow' },
    { uk: 'зелений', en: 'green' }, { uk: 'синій', en: 'blue' }, { uk: 'фіолетовий', en: 'violet' }, { uk: 'сірий', en: 'grey' }, { uk: 'білий', en: 'white' }
  ];
  var HEX = ['#1b1b1b', '#7a4a21', '#d22b2b', '#f08a1c', '#f2d21b', '#2f9a44', '#2a5fd1', '#8a3fc4', '#8c8c8c', '#f4f4f4'];
  function resistorSvg(d1, d2, m) {
    var b = function (x, i) { return '<rect x="' + x + '" y="34" width="12" height="52" fill="' + HEX[i] + '" stroke="#555" stroke-width=".6"/>'; };
    return D.svg(380, 120, '<line class="st mut" x1="10" y1="60" x2="370" y2="60" style="stroke-width:3"/>' +
      '<rect x="90" y="32" width="200" height="56" rx="24" fill="#e7cfa4" stroke="#9c7b48" stroke-width="1.5"/>' + b(120, d1) + b(150, d2) + b(180, m) +
      '<rect x="250" y="34" width="12" height="52" fill="#c9a43c" stroke="#555" stroke-width=".6"/>');
  }

  APP.module({
    id: 'm02', n: 2, part: 'A', cv: 1,
    title: { uk: 'Пасивні компоненти', en: 'Passive components' },
    short: { uk: 'Резистори, конденсатори, котушки', en: 'Resistors, capacitors, coils' },
    intro: {
      uk: 'Пасивні компоненти не підсилюють сигнал — вони обмежують, накопичують і згладжують. Саме їх найбільше на будь-якій платі: сотні дрібних «цеглинок».',
      en: 'Passive components don’t amplify — they limit, store and smooth. They are the most numerous parts on any board: hundreds of small “bricks”.'
    },
    warm: ['m01q08', 'm01q04', 'm01q13'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Резистор обмежує струм', en: 'A resistor limits current' },
        body: {
          uk: '<p>Резистор — це «вузьке місце» в колі. Він обмежує струм і перетворює частину енергії на тепло. Це саме той опір R із закону Ома.</p><p>На схемах резистор позначають прямокутником (європейський стиль, ДСТУ) або зигзагом (американський стиль). Обидва трапляються в документації.</p>',
          en: '<p>A resistor is a “narrow spot” in a circuit. It limits current and turns some energy into heat. It is the R from Ohm’s law.</p><p>Schematics draw it as a rectangle (European/IEC style) or a zigzag (US style). You will meet both in documentation.</p>'
        },
        recall: [{ m: 'm01', s: 's5', label: { uk: 'Закон Ома', en: 'Ohm’s law' } }],
        fig: {
          svg: function (L) {
            return D.svg(380, 90, D.two('res', 30, 40, 160, 40) + D.t(95, 75, L({ uk: 'Європа, Україна', en: 'Europe, Ukraine' }), 'txm') +
              D.two('resUS', 220, 40, 350, 40) + D.t(285, 75, L({ uk: 'США, Азія', en: 'USA, Asia' }), 'txm'));
          }
        }
      },
      {
        kind: 1,
        title: { uk: 'Кольорові смужки: як прочитати номінал', en: 'Colour bands: reading the value' },
        body: {
          uk: '<p>На вивідних резисторах номінал закодовано кольорами. У 4-смугового резистора:</p><ul><li>1-ша і 2-га смуги — дві цифри;</li><li>3-тя — скільки нулів дописати (множник);</li><li>4-та, окремо від решти (золота, срібна), — точність.</li></ul><p>Цифри: чорний 0, коричневий 1, червоний 2, помаранчевий 3, жовтий 4, зелений 5, синій 6, фіолетовий 7, сірий 8, білий 9.</p><p>Приклад нижче: <b>червоний, червоний, чорний</b> = 2, 2 і нуль нулів = <b>22 Ом</b>, золото = ±5 %.</p>',
          en: '<p>Through-hole resistors carry their value as colours. On a 4-band resistor:</p><ul><li>bands 1 and 2 are two digits;</li><li>band 3 is how many zeros to add (multiplier);</li><li>band 4, set apart (gold, silver), is the tolerance.</li></ul><p>Digits: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9.</p><p>Example below: <b>red, red, black</b> = 2, 2 and no zeros = <b>22 Ω</b>, gold = ±5%.</p>'
        },
        fig: { photo: 'r2-120' }
      },
      {
        kind: 2,
        title: { uk: 'Справжні резистори', en: 'Real resistors' },
        body: {
          uk: '<p>Тренуємося на фото: знаходимо смугу точності (вона трохи відступає) і читаємо з протилежного боку.</p>',
          en: '<p>Practise on the photo: find the tolerance band (it stands a little apart) and read from the opposite end.</p>'
        },
        fig: { photo: 'r2-117', cap: { uk: 'Найчастіші номінали: 1 кОм, 4,7 кОм, 10 кОм, 100 кОм.', en: 'The most common values: 1 kΩ, 4.7 kΩ, 10 kΩ, 100 kΩ.' } }
      },
      {
        kind: 1,
        title: { uk: 'SMD-резистори: код із цифр', en: 'SMD resistors: a number code' },
        body: {
          uk: '<p>На крихітних SMD-резисторах кольорів немає — пишуть цифри:</p><ul><li><b>3 цифри:</b> дві цифри + кількість нулів. 103: 1 і 0 → 10, третя цифра 3 — це три нулі = 10 000 Ом = <b>10 кОм</b>. 472 = 4,7 кОм.</li><li><b>4 цифри</b> (точніші): три цифри + нулі. 4701: 4, 7 і 0 → 470, четверта цифра 1 — це один нуль = 4,7 кОм.</li><li><b>R</b> — це кома: 4R7 = 4,7 Ом.</li><li><b>0</b> або <b>000</b> — резистор нуль ом, просто перемичка.</li></ul><p>Деякі резистори мають код EIA-96 (дві цифри + літера, наприклад «01A») — його читають за таблицею. Найменші (0402 і менше) взагалі не мають маркування.</p>',
          en: '<p>Tiny SMD resistors have no colours — they use digits:</p><ul><li><b>3 digits:</b> two digits + number of zeros. 103: 1 and 0 → 10, the third digit 3 means three zeros = 10,000 Ω = <b>10 kΩ</b>. 472 = 4.7 kΩ.</li><li><b>4 digits</b> (precision): three digits + zeros. 4701: 4, 7 and 0 → 470, the fourth digit 1 means one zero = 4.7 kΩ.</li><li><b>R</b> marks the decimal point: 4R7 = 4.7 Ω.</li><li><b>0</b> or <b>000</b> is a zero-ohm resistor — just a jumper.</li></ul><p>Some resistors use the EIA-96 code (two digits + a letter, such as “01A”), read from a table. The smallest ones (0402 and below) carry no marking at all.</p>'
        },
        fig: { photo: 'r2-125', cap: { uk: 'Маркування 822 = 82 і два нулі = 8200 Ом = 8,2 кОм.', en: 'Marking 822 = 82 plus two zeros = 8200 Ω = 8.2 kΩ.' } }
      },
      {
        kind: 1,
        title: { uk: 'Конденсатор накопичує заряд', en: 'A capacitor stores charge' },
        body: {
          uk: '<p>Конденсатор — це дві металеві пластини, розділені ізолятором. Він заряджається, як маленька швидка батарейка, і швидко віддає заряд.</p><ul><li>Ємність вимірюють у фарадах (Ф). На практиці — мікрофаради (мкФ), нанофаради (нФ), пікофаради (пФ): 1 мкФ = 1000 нФ = 1 000 000 пФ.</li><li>Постійний струм крізь конденсатор не тече: коли він зарядився, струм припиняється.</li><li>На кожному конденсаторі є гранична напруга. Перевищимо — він вийде з ладу.</li></ul>',
          en: '<p>A capacitor is two metal plates separated by an insulator. It charges like a tiny fast battery and gives the charge back quickly.</p><ul><li>Capacitance is measured in farads (F). In practice: microfarads (µF), nanofarads (nF), picofarads (pF): 1 µF = 1000 nF = 1,000,000 pF.</li><li>Steady DC does not flow through a capacitor: once it is charged, current stops.</li><li>Every capacitor has a maximum voltage. Exceed it and the part fails.</li></ul>'
        },
        fig: { anim: 'capcharge', cap: { uk: 'Натискаємо «Зарядити», потім «Розрядити» — дивимося на форму кривої.', en: 'Press “Charge”, then “Discharge” — watch the shape of the curve.' } }
      },
      {
        kind: 1,
        title: { uk: 'Види конденсаторів і полярність', en: 'Capacitor types and polarity' },
        body: {
          uk: '<ul><li><b>Керамічні (MLCC)</b> — коричневі або сірі «цеглинки». Без полярності і <b>без маркування</b>: номінал можна дізнатися лише зі схеми або приладом. Їх найбільше.</li><li><b>Електролітичні</b> — алюмінієві «бочечки», великі ємності. Мають полярність: смуга на корпусі позначає <b>мінус</b>.</li><li><b>Танталові</b> — жовті або чорні прямокутники. Теж полярні, але смуга позначає <b>плюс</b>! Неправильне підключення — коротке замикання і навіть займання.</li><li><b>Плівкові</b> — коробочки, частіше в мережевих пристроях.</li></ul>',
          en: '<ul><li><b>Ceramic (MLCC)</b> — brown or grey “bricks”. No polarity and <b>no marking</b>: the value is known only from the schematic or by measuring. They are the most common.</li><li><b>Electrolytic</b> — aluminium “cans”, large values. Polarised: the stripe on the can marks <b>minus</b>.</li><li><b>Tantalum</b> — yellow or black blocks. Also polarised, but the stripe marks <b>plus</b>! Connecting one backwards means a short and even fire.</li><li><b>Film</b> — little boxes, more common in mains equipment.</li></ul>'
        },
        fig: { photo: 'r1-009', cap: { uk: 'Різні конденсатори поруч: керамічні, танталові, електролітичні.', en: 'Different capacitors side by side: ceramic, tantalum, electrolytic.' } },
        body2: {
          uk: '<p>Танталові конденсатори з маркуванням: смужка на краю — це плюс.</p>',
          en: '<p>Tantalum capacitors with markings: the stripe at one end is plus.</p>'
        }
      },
      {
        kind: 2,
        title: { uk: 'Танталові: смуга — це плюс', en: 'Tantalum: the stripe is plus' },
        body: { uk: '<p>Порівнюємо з електролітичними, де смуга — мінус. Це найчастіша помилка новачків.</p>', en: '<p>Compare with electrolytics, where the stripe is minus. This is the most common beginner mistake.</p>' },
        fig: { photo: 'r1-017z', marks: [{ p: [29.5, 6.5, 15, 21.5], t: '+' }, { p: [34.5, 81, 10.5, 18], t: '+' }], cap: { uk: 'Збільшено: світла смуга з краю корпусу — плюс. Посередині — така сама деталь, перевернута догори дном: видно лише контакти, маркування немає. На вивідних танталових плюс позначають знаком «+» біля ніжки.', en: 'Enlarged: the light stripe at the end of the body is plus. In the middle is the same part upside down: only the contacts show, no marking. Leaded tantalums mark plus with a “+” by the lead.' } }
      },
      {
        kind: 1,
        title: { uk: 'Котушка: «інерція» струму', en: 'A coil: the “inertia” of current' },
        body: {
          uk: '<p>Котушка (індуктивність, дросель) — дріт, намотаний витками, часто на феритовому осерді. Поки струм тече, вона накопичує енергію в <b>магнітному полі</b> і опирається будь-якій <b>зміні</b> струму — як важке колесо, яке важко розкрутити і важко зупинити.</p><ul><li>Одиниця — генрі (Гн). На платах — мікрогенрі (мкГн) і наногенрі (нГн).</li><li>Силові котушки біля перетворювачів напруги мають код: «220» = 22 мкГн, «4R7» = 4,7 мкГн.</li><li><b>Феритова бусина</b> — маленький «глушник». Струм тече не крізь сам ферит (це кераміка, майже ізолятор), а провідником, який проходить крізь нього. Ферит охоплює магнітне поле цього струму: постійному струму він не заважає, а високочастотні завади гасить, перетворюючи на тепло.</li></ul>',
          en: '<p>A coil (inductor, choke) is wire wound in turns, often on a ferrite core. While current flows, it stores energy in a <b>magnetic field</b> and resists any <b>change</b> in current — like a heavy wheel that is hard to spin up and hard to stop.</p><ul><li>The unit is the henry (H). On boards: microhenries (µH) and nanohenries (nH).</li><li>Power inductors next to voltage converters carry a code: “220” = 22 µH, “4R7” = 4.7 µH.</li><li>A <b>ferrite bead</b> is a little “muffler”. Current does not flow through the ferrite itself (it is a ceramic, close to an insulator) but through the conductor that passes through it. The ferrite wraps around that current’s magnetic field: it leaves DC alone and turns high-frequency noise into heat.</li></ul>'
        },
        fig: { photo: 'r1-028', cap: { uk: 'Тороїдальна котушка: мідний дріт на кільці.', en: 'A toroidal coil: copper wire on a ring.' } }
      },
      {
        id: 's8b', kind: 1,
        title: { uk: 'Маркування котушок: як у резисторів, але в мікрогенрі', en: 'Inductor markings: like resistors, but in microhenries' },
        body: {
          uk: '<p>Котушки маркують тим самим кодом, що й резистори, — лише <b>базова одиниця інша: мікрогенрі (мкГн)</b>.</p><ul><li><b>3 цифри</b>: дві цифри + кількість нулів, результат у мкГн. <b>220</b> = 22 мкГн, <b>101</b> = 100 мкГн, <b>471</b> = 470 мкГн.</li><li><b>R</b> — кома в мікрогенрі: <b>4R7</b> = 4,7 мкГн, <b>R47</b> = 0,47 мкГн.</li><li><b>N</b> — кома в <b>наногенрі</b> (крихітні котушки радіочастини): <b>2N2</b> = 2,2 нГн, <b>10N</b> = 10 нГн.</li><li><b>Кольорові смуги</b> на вивідних котушках — той самий кольоровий код, що в резисторів, результат у мкГн: коричневий-чорний-чорний = 10 мкГн.</li><li>Найменші SMD-котушки (0402, 0603) часто без маркування — як і керамічні конденсатори.</li></ul><p>Порівнюємо базові одиниці трицифрового коду: <b>резистор — Ом</b>, <b>котушка — мкГн</b>, <b>конденсатор — пФ</b> (104 = 10 і чотири нулі пФ = 100 нФ).</p>',
          en: '<p>Inductors use the same code as resistors — only the <b>base unit differs: microhenries (µH)</b>.</p><ul><li><b>3 digits</b>: two digits + number of zeros, result in µH. <b>220</b> = 22 µH, <b>101</b> = 100 µH, <b>471</b> = 470 µH.</li><li><b>R</b> is the decimal point in microhenries: <b>4R7</b> = 4.7 µH, <b>R47</b> = 0.47 µH.</li><li><b>N</b> is the decimal point in <b>nanohenries</b> (tiny RF inductors): <b>2N2</b> = 2.2 nH, <b>10N</b> = 10 nH.</li><li><b>Colour bands</b> on leaded inductors use the resistor colour code, result in µH: brown-black-black = 10 µH.</li><li>The smallest SMD inductors (0402, 0603) are often unmarked — like ceramic capacitors.</li></ul><p>Compare the base units of the three-digit code: <b>resistor — Ω</b>, <b>inductor — µH</b>, <b>capacitor — pF</b> (104 = 10 plus four zeros pF = 100 nF).</p>'
        },
        recall: [{ m: 'm02', s: 's4', label: { uk: 'Код SMD-резисторів', en: 'SMD resistor codes' } }],
        fig: {
          svg: function (L) {
            var dp = L({ uk: ',', en: '.' });
            var groups = [
              { sym: 'res', img: 'th-res', n: L({ uk: 'Резистор — база: Ом', en: 'Resistor — base: Ω' }), rows: [['103', '10 ' + L({ uk: 'кОм', en: 'kΩ' })], ['4701', '4' + dp + '7 ' + L({ uk: 'кОм', en: 'kΩ' })], ['4R7', '4' + dp + '7 ' + L({ uk: 'Ом', en: 'Ω' })], ['220', '22 ' + L({ uk: 'Ом', en: 'Ω' })]] },
              { sym: 'ind', img: 'th-ind', n: L({ uk: 'Котушка — база: мкГн', en: 'Inductor — base: µH' }), rows: [['101', '100 ' + L({ uk: 'мкГн', en: 'µH' })], ['4R7', '4' + dp + '7 ' + L({ uk: 'мкГн', en: 'µH' })], ['R47', '0' + dp + '47 ' + L({ uk: 'мкГн', en: 'µH' })], ['2N2', '2' + dp + '2 ' + L({ uk: 'нГн (N = кома)', en: 'nH (N = point)' })], ['220', '22 ' + L({ uk: 'мкГн', en: 'µH' })]] },
              { sym: 'cap', img: 'th-cap', note: L({ uk: 'SMD-кераміка — часто без коду', en: 'SMD ceramics — often unmarked' }), n: L({ uk: 'Конденсатор — база: пФ', en: 'Capacitor — base: pF' }), rows: [['104', '100 ' + L({ uk: 'нФ', en: 'nF' })], ['105', '1 ' + L({ uk: 'мкФ', en: 'µF' })], ['220', '22 ' + L({ uk: 'пФ', en: 'pF' })]] }
            ];
            var s = '', y = 8;
            groups.forEach(function (g) {
              var gh = Math.max(34 + g.rows.length * 30, 162);
              s += '<rect x="6" y="' + y + '" width="368" height="' + gh + '" rx="8" style="fill:none;stroke:var(--line)"/>';
              s += D.two(g.sym, 18, y + 18, 70, y + 18) + D.t(82, y + 23, g.n, 'lbl', 'start');
              g.rows.forEach(function (r, k) {
                var yy = y + 38 + k * 30, hl = r[0] === '220';
                s += '<rect x="22" y="' + yy + '" width="62" height="24" rx="4" style="fill:var(--sunk);stroke:' + (hl ? 'var(--copper)' : 'var(--line)') + '"/><text x="53" y="' + (yy + 17) + '" text-anchor="middle" style="fill:var(--ink);font:600 14px var(--mono)">' + r[0] + '</text>';
                s += '<text class="tx" x="98" y="' + (yy + 17) + '">= ' + r[1] + '</text>';
              });
              s += '<image href="img/' + g.img + '.webp" x="266" y="' + (y + 38) + '" width="96" height="96" preserveAspectRatio="xMidYMid slice" style="clip-path:inset(0 round 8px)"/>';
              if (g.note) s += D.t(22, y + 148, g.note, 'txm', 'start');
              y += gh + 10;
            });
            return D.svg(380, y, s);
          },
          cap: { uk: 'Той самий код «220» (у мідній рамці) — це 22 Ом, 22 мкГн або 22 пФ, залежно від деталі. Тож спершу визначаємо, що це за деталь: за виглядом, позначенням на платі (R, L, C) і місцем.', en: 'The same code “220” (copper frame) means 22 Ω, 22 µH or 22 pF depending on the part. So first identify the part: by its look, its board label (R, L, C) and where it sits.' }
        }
      },
      {
        kind: 2,
        title: { uk: 'Котушка і конденсатор поруч', en: 'A coil and a capacitor side by side' },
        body: {
          uk: '<p>На фото — SMD-котушка з маркуванням «220» (22 мкГн) і SMD-електролітичний конденсатор. Така пара майже завжди означає <b>імпульсний перетворювач напруги</b>. Ми ще зустрінемо її в модулі 7.</p>',
          en: '<p>The photo shows an SMD coil marked “220” (22 µH) and an SMD electrolytic capacitor. This pair almost always means a <b>switching voltage converter</b>. You will meet it again in module 7.</p>'
        },
        fig: { photo: 'r1-014' }
      },
      {
        kind: 1,
        title: { uk: 'Змінні резистори', en: 'Variable resistors' },
        body: {
          uk: '<p><b>Потенціометр</b> — резистор із повзунком: крутимо ручку, і опір між повзунком та краями змінюється. Так влаштовані ручки гучності й стіки старих пультів.</p><p><b>Підстроювальний резистор</b> (тример) — маленький, його крутимо викруткою один раз під час налаштування. Синій багатообертовий — найпоширеніший: його видно на фото нижче. Латунний гвинт повертаємо викруткою, і повзунок усередині повільно їде доріжкою — один оберт гвинта зсуває його зовсім трохи, тому напругу можна виставити дуже точно.</p><p>На корпусі — уже знайомий трицифровий код: <b>103</b> = 10 і три нулі = <b>10 кОм</b>. Тут модуль сфотографовано догори дриґом, тож напис перевернутий.</p>',
          en: '<p>A <b>potentiometer</b> is a resistor with a slider (wiper): turn the knob and the resistance between the wiper and the ends changes. Volume knobs and the sticks of older radios work this way.</p><p>A <b>trimmer</b> is a small one, turned with a screwdriver once during setup. The blue multi-turn type is the most common — see the photo below. Turn the brass screw with a screwdriver and the wiper inside creeps along the track; one turn of the screw moves it only a little, so the voltage can be set very precisely.</p><p>The body carries the familiar three-digit code: <b>103</b> = 10 followed by three zeros = <b>10 kΩ</b>. The module was photographed upside down, so the text is inverted.</p>'
        },
        fig: { photo: 'r1-037', cap: { uk: 'Потенціометр у розрізі: повзунок ковзає по резистивній доріжці.', en: 'A potentiometer cut open: the wiper slides along a resistive track.' } },
        fig2: { photo: 'r1-104t', marks: [{ p: [31, 28, 13, 16], t: { uk: 'гвинт', en: 'screw' } }, { p: [55, 31, 17, 10], t: { uk: '103 = 10 кОм', en: '103 = 10 kΩ' } }], cap: { uk: 'Синій багатообертовий тример на модулі живлення LM2596 (модуль 7).', en: 'A blue multi-turn trimmer on an LM2596 power module (module 7).' } }
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: конденсатор як «резервуар»', en: 'Combine: a capacitor as a “reservoir”' },
        body: {
          uk: '<p>Мікросхема бере струм ривками — мільйони разів на секунду. Довгі доріжки від джерела не встигають. Тому біля <b>кожної</b> мікросхеми ставлять керамічний конденсатор 100 нФ просто на виводи живлення. Він віддає заряд миттєво, як бочка з водою біля грядки.</p><p>Такий конденсатор називають <b>блокувальним</b> (decoupling). Коли бачимо крихітний конденсатор впритул до мікросхеми — це він.</p><p>А <b>резистор + конденсатор</b> разом утворюють RC-фільтр: він згладжує різкі стрибки. Про це — у модулі 6.</p>',
          en: '<p>A chip draws current in bursts — millions of times per second. Long traces from the supply can’t keep up. So next to <b>every</b> chip sits a 100 nF ceramic capacitor right on the power pins. It hands out charge instantly, like a water barrel next to a garden bed.</p><p>This is called a <b>decoupling</b> capacitor. When you see a tiny capacitor tight against a chip, that’s what it is.</p><p>A <b>resistor + capacitor</b> together form an RC filter that smooths sharp jumps. More on that in module 6.</p>'
        },
        fig: {
          svg: function (L) {
            return D.svg(380, 170, D.chip(170, 40, 120, 90, 'U1', L({ uk: 'мікросхема', en: 'chip' })) +
              D.w([[40, 30], [230, 30], [230, 40]]) + D.vcc(40, 30, '3,3 V') + D.dot(130, 30) + D.two('cap', 130, 30, 130, 120, { label: 'C', value: '100 nF', side: 'l' }) + D.gnd(130, 120) +
              D.w([[230, 130], [230, 140]]) + D.gnd(230, 140) +
              D.t(300, 22, L({ uk: 'якомога ближче!', en: 'as close as possible!' }), 'txm', 'middle'));
          },
          cap: { uk: 'Блокувальний конденсатор між живленням і землею, впритул до мікросхеми.', en: 'A decoupling capacitor between supply and ground, right next to the chip.' }
        }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: конденсатор на живленні регулятора обертів', en: 'Device: the capacitor on an ESC power lead' },
        body: {
          uk: '<p>На FPV-дроні біля роз’єму батареї часто стоїть великий електролітичний конденсатор (наприклад, 1000 мкФ). Двигуни різко змінюють струм, і на проводах виникають сплески напруги. Конденсатор їх «гасить», захищаючи регулятор обертів (ESC) і зменшуючи завади на відео.</p><p>Правило вибору: робоча напруга конденсатора — з запасом над максимальною напругою батареї. Для 6S (25,2 В) беруть 35 В або більше.</p>',
          en: '<p>An FPV drone often has a large electrolytic capacitor (for example 1000 µF) near the battery connector. The motors change current abruptly, which causes voltage spikes on the wires. The capacitor “absorbs” them, protecting the speed controller (ESC) and reducing noise in the video.</p><p>Rule of thumb: the capacitor’s voltage rating must be well above the battery’s maximum. For 6S (25.2 V) use 35 V or more.</p>'
        },
        recall: [{ m: 'm01', s: 's7', label: { uk: 'Напруга батареї nS', en: 'nS battery voltage' } }]
      },
      {
        kind: 5,
        title: { uk: 'На платі: що є що', en: 'On the board: what is what' },
        body: {
          uk: '<p>Біля кожної деталі білою фарбою надруковано її <b>позиційне позначення</b>: R — резистор, C — конденсатор. Торкаємося частин фото.</p>',
          en: '<p>Next to every part, white paint shows its <b>reference designator</b>: R for resistor, C for capacitor. Tap parts of the photo.</p>'
        },
        fig: {
          photo: 'r1-006',
          hot: [
            { id: 'r23', p: [31, 7, 14, 10], label: { uk: 'R23 — SMD-резистор «152»', en: 'R23 — SMD resistor “152”' }, info: { uk: '15 і два нулі = 1,5 кОм', en: '15 plus two zeros = 1.5 kΩ' } },
            { id: 'r30', p: [19, 64, 15, 11], label: { uk: 'R30 — резистор «473»', en: 'R30 — resistor “473”' }, info: { uk: '47 кОм', en: '47 kΩ' } },
            { id: 'c9', p: [38, 39, 25, 20], label: { uk: 'C9 — керамічний конденсатор', en: 'C9 — ceramic capacitor' }, info: { uk: 'без маркування — номінал лише зі схеми', en: 'no marking — the value comes only from the schematic' } },
            { id: 'tant', p: [55, 0, 25, 20], label: { uk: 'Танталовий конденсатор', en: 'Tantalum capacitor' }, info: { uk: 'жовтий корпус, смуга = плюс', en: 'yellow body, stripe = plus' } }
          ]
        }
      }
    ],
    sources: [
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид., 2015 — розділи 1.2, 1.4', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed., 2015 — sections 1.2, 1.4' } },
      { t: { uk: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4-те вид., 2016 — розділ 3', en: 'P. Scherz, S. Monk. Practical Electronics for Inventors, 4th ed., 2016 — chapter 3' } },
      { t: { uk: 'J. Eco, A. Limjoco. Ferrite Beads Demystified. Analog Dialogue 50-02, Analog Devices, 2016', en: 'J. Eco, A. Limjoco. Ferrite Beads Demystified. Analog Dialogue 50-02, Analog Devices, 2016' } },
      { t: { uk: 'IEC 60062 — міжнародний стандарт маркування резисторів і конденсаторів', en: 'IEC 60062 — international standard for resistor and capacitor marking codes' } }
    ],
    quiz: [
      { q: { uk: 'Що робить резистор у колі?', en: 'What does a resistor do in a circuit?' },
        opts: [{ uk: 'Обмежує струм і частину енергії перетворює на тепло', en: 'Limits current and turns some energy into heat' }, { uk: 'Накопичує заряд', en: 'Stores charge' }, { uk: 'Пропускає струм лише в один бік', en: 'Passes current only one way' }, { uk: 'Підсилює сигнал', en: 'Amplifies a signal' }],
        a: 0, ex: { uk: 'Резистор — «вузьке місце», що обмежує струм. Енергія на ньому виділяється як тепло.', en: 'A resistor is a “narrow spot” that limits current. The energy it takes becomes heat.' }, see: { m: 'm02', s: 's1' } },
      { type: 'calc', see: { m: 'm02', s: 's2' }, gen: function (R, c) {
          var d1 = R.int(1, 9), d2 = R.int(0, 9), m = R.int(0, 4), v = (d1 * 10 + d2) * Math.pow(10, m);
          var wrong = [(d1 * 10 + d2) * Math.pow(10, m + 1), (d1 * 10 + d2) * Math.pow(10, Math.max(0, m - 1)) + (m === 0 ? 1 : 0), (d2 * 10 + d1) * Math.pow(10, m)];
          var seen = {}, opts = []; [v].concat(wrong).forEach(function (x) { var k = kfmt(c, x); if (!seen[k]) { seen[k] = 1; opts.push(k); } });
          if (opts.length < 4) opts.push(kfmt(c, v * 100));
          return { q: { uk: 'Смуги резистора: ' + COLORS[d1].uk + ', ' + COLORS[d2].uk + ', ' + COLORS[m].uk + ', золота. Який номінал?', en: 'Resistor bands: ' + COLORS[d1].en + ', ' + COLORS[d2].en + ', ' + COLORS[m].en + ', gold. What is the value?' },
            fig: { svg: resistorSvg(d1, d2, m) }, opts: opts.slice(0, 4), a: 0,
            ex: { uk: COLORS[d1].uk + ' = ' + d1 + ', ' + COLORS[d2].uk + ' = ' + d2 + ', ' + COLORS[m].uk + ' = ' + m + ' нул' + (m === 1 ? 'ь' : (m >= 2 && m <= 4 ? 'і' : 'ів')) + ' → ' + kfmt({ lang: 'uk', fmt: c.fmt }, v) + '.', en: COLORS[d1].en + ' = ' + d1 + ', ' + COLORS[d2].en + ' = ' + d2 + ', ' + COLORS[m].en + ' = ' + m + ' zero' + (m === 1 ? '' : 's') + ' → ' + kfmt({ lang: 'en', fmt: c.fmt }, v) + '.' } };
        } },
      { q: { uk: 'Яка смуга на 4-смуговому резисторі показує точність?', en: 'Which band on a 4-band resistor shows the tolerance?' },
        opts: [{ uk: 'Остання, трохи відступає від інших (часто золота)', en: 'The last one, set slightly apart (often gold)' }, { uk: 'Перша', en: 'The first' }, { uk: 'Третя', en: 'The third' }, { uk: 'Найширша', en: 'The widest' }],
        a: 0, ex: { uk: 'Смуга точності стоїть окремо. Читають з протилежного кінця.', en: 'The tolerance band stands apart. Read from the opposite end.' }, see: { m: 'm02', s: 's2' } },
      { type: 'calc', see: { m: 'm02', s: 's4' }, gen: function (R, c) {
          var d = R.pick([[1, 0], [2, 2], [4, 7], [3, 3], [6, 8], [1, 5], [2, 7]]), m = R.int(1, 4), v = (d[0] * 10 + d[1]) * Math.pow(10, m), code = '' + d[0] + d[1] + m;
          var o = [kfmt(c, v), kfmt(c, v * 10), kfmt(c, v / 10), kfmt(c, d[0] * 100 + d[1] * 10 + m)];
          var seen = {}, opts = []; o.forEach(function (x) { if (!seen[x]) { seen[x] = 1; opts.push(x); } });
          return { q: { uk: 'На SMD-резисторі написано <b>' + code + '</b>. Який номінал?', en: 'An SMD resistor is marked <b>' + code + '</b>. What is the value?' }, opts: opts, a: 0,
            ex: { uk: 'Дві цифри: ' + d[0] + ' і ' + d[1] + ' → ' + d[0] + d[1] + ', далі ' + m + ' нул' + (m === 1 ? 'ь' : (m <= 4 ? 'і' : 'ів')) + ' = ' + kfmt({ lang: 'uk', fmt: c.fmt }, v) + '.', en: 'Two digits: ' + d[0] + ' and ' + d[1] + ' → ' + d[0] + d[1] + ', then ' + m + ' zero' + (m === 1 ? '' : 's') + ' = ' + kfmt({ lang: 'en', fmt: c.fmt }, v) + '.' } };
        } },
      { q: { uk: 'SMD-резистор з маркуванням <b>4R7</b> — це:', en: 'An SMD resistor marked <b>4R7</b> is:' },
        opts: [{ uk: '4,7 Ом', en: '4.7 Ω' }, { uk: '47 Ом', en: '47 Ω' }, { uk: '4,7 кОм', en: '4.7 kΩ' }, { uk: '470 Ом', en: '470 Ω' }],
        a: 0, ex: { uk: 'Літера R стоїть на місці коми: 4R7 = 4,7 Ом.', en: 'The letter R stands for the decimal point: 4R7 = 4.7 Ω.' }, see: { m: 'm02', s: 's4' } },
      { q: { uk: 'SMD-резистор з маркуванням <b>4701</b> — це:', en: 'An SMD resistor marked <b>4701</b> is:' },
        opts: [{ uk: '4,7 кОм', en: '4.7 kΩ' }, { uk: '47 кОм', en: '47 kΩ' }, { uk: '4701 Ом', en: '4701 Ω' }, { uk: '470 Ом', en: '470 Ω' }],
        a: 0, ex: { uk: 'Чотири цифри: «470» і один нуль = 4700 Ом = 4,7 кОм.', en: 'Four digits: “470” plus one zero = 4700 Ω = 4.7 kΩ.' }, see: { m: 'm02', s: 's4' } },
      { q: { uk: 'Навіщо на платі резистор з маркуванням <b>0</b>?', en: 'Why would a board have a resistor marked <b>0</b>?' },
        opts: [{ uk: 'Це перемичка: з’єднує два місця, її легко зняти або переставити', en: 'It’s a jumper: it links two points and is easy to remove or move' }, { uk: 'Це зламаний резистор', en: 'It’s a broken resistor' }, { uk: 'Він має нескінченний опір', en: 'It has infinite resistance' }, { uk: 'Це запобіжник на 0 А', en: 'It’s a 0 A fuse' }],
        a: 0, ex: { uk: 'Резистор нуль ом — перемичка. Ним вибирають варіанти схеми на заводі.', en: 'A zero-ohm resistor is a jumper. Factories use it to choose circuit options.' }, see: { m: 'm02', s: 's4' } },
      { q: { uk: 'Що відбувається, коли конденсатор підключили до батареї і він повністю зарядився?', en: 'A capacitor is connected to a battery and fully charged. What happens next?' },
        opts: [{ uk: 'Струм через нього припиняється', en: 'Current through it stops' }, { uk: 'Струм тече постійно', en: 'Current keeps flowing steadily' }, { uk: 'Він починає заряджати батарею', en: 'It starts charging the battery' }, { uk: 'Він нагрівається до вибуху', en: 'It heats up until it explodes' }],
        a: 0, ex: { uk: 'Постійний струм крізь заряджений конденсатор не тече.', en: 'Steady DC does not flow through a charged capacitor.' }, see: { m: 'm02', s: 's5' } },
      { q: { uk: 'Скільки нанофарад в 1 мкФ?', en: 'How many nanofarads are in 1 µF?' },
        opts: [{ uk: '1000 нФ', en: '1000 nF' }, { uk: '10 нФ', en: '10 nF' }, { uk: '1 000 000 нФ', en: '1,000,000 nF' }, { uk: '0,001 нФ', en: '0.001 nF' }],
        a: 0, ex: { uk: '1 мкФ = 1000 нФ = 1 000 000 пФ.', en: '1 µF = 1000 nF = 1,000,000 pF.' }, see: { m: 'm02', s: 's5' } },
      { q: { uk: 'На <b>електролітичному</b> конденсаторі смуга на корпусі позначає…', en: 'On an <b>electrolytic</b> capacitor, the stripe on the can marks…' },
        opts: [{ uk: 'Мінус', en: 'Minus' }, { uk: 'Плюс', en: 'Plus' }, { uk: 'Номінал', en: 'The value' }, { uk: 'Виробника', en: 'The manufacturer' }],
        a: 0, ex: { uk: 'У електролітичних смуга — мінус. У танталових — навпаки, плюс.', en: 'On electrolytics the stripe is minus. On tantalum it’s the opposite: plus.' }, see: { m: 'm02', s: 's6' } },
      { q: { uk: 'На <b>танталовому</b> конденсаторі смуга позначає…', en: 'On a <b>tantalum</b> capacitor, the stripe marks…' },
        opts: [{ uk: 'Плюс', en: 'Plus' }, { uk: 'Мінус', en: 'Minus' }, { uk: 'Що він неполярний', en: 'That it is non-polarised' }, { uk: 'Максимальну температуру', en: 'Maximum temperature' }],
        a: 0, ex: { uk: 'У танталових смуга — плюс. Переплутати — означає ризик займання.', en: 'On tantalum the stripe is plus. Mixing it up risks fire.' }, see: { m: 'm02', s: 's7' } },
      { q: { uk: 'Як дізнатися номінал маленького керамічного SMD-конденсатора?', en: 'How do you find the value of a small ceramic SMD capacitor?' },
        opts: [{ uk: 'Зі схеми або виміряти приладом — маркування на ньому немає', en: 'From the schematic or by measuring — it carries no marking' }, { uk: 'За кольоровими смугами', en: 'From colour bands' }, { uk: 'За трицифровим кодом на корпусі', en: 'From a three-digit code on the body' }, { uk: 'За розміром: що більший, то більша ємність', en: 'From its size: bigger means more capacitance' }],
        a: 0, ex: { uk: 'Керамічні SMD-конденсатори зазвичай не мають маркування.', en: 'Ceramic SMD capacitors usually carry no marking.' }, see: { m: 'm02', s: 's6' } },
      { q: { uk: 'Що станеться, якщо перевищити граничну напругу конденсатора?', en: 'What happens if you exceed a capacitor’s voltage rating?' },
        opts: [{ uk: 'Він може вийти з ладу, електролітичний — навіть здутися чи лопнути', en: 'It can fail; an electrolytic may even bulge or burst' }, { uk: 'Його ємність зросте', en: 'Its capacitance goes up' }, { uk: 'Нічого — це лише рекомендація', en: 'Nothing — it’s only a guideline' }, { uk: 'Він почне світитися', en: 'It starts to glow' }],
        a: 0, ex: { uk: 'Ізолятор між пластинами пробивається. Тому напругу беруть із запасом.', en: 'The insulator between the plates breaks down. That is why ratings are chosen with margin.' }, see: { m: 'm02', s: 's5' } },
      { q: { uk: 'Котушка індуктивності опирається…', en: 'An inductor resists…' },
        opts: [{ uk: 'Будь-якій зміні струму', en: 'Any change in current' }, { uk: 'Будь-якій напрузі', en: 'Any voltage' }, { uk: 'Лише постійному струму', en: 'Only direct current' }, { uk: 'Нагріванню', en: 'Heating' }],
        a: 0, ex: { uk: 'Котушка накопичує енергію в магнітному полі й «гальмує» зміни струму, як важке колесо.', en: 'A coil stores energy in a magnetic field and “brakes” changes in current, like a heavy wheel.' }, see: { m: 'm02', s: 's8' } },
      { q: { uk: 'Силова SMD-котушка має маркування <b>220</b>. Це…', en: 'A power SMD inductor is marked <b>220</b>. That means…' },
        opts: [{ uk: '22 мкГн', en: '22 µH' }, { uk: '220 Ом', en: '220 Ω' }, { uk: '220 мГн', en: '220 mH' }, { uk: '22 нФ', en: '22 nF' }],
        a: 0, ex: { uk: 'Для котушок код такий самий: 22 і нуль нулів = 22 мкГн.', en: 'Inductors use the same code: 22 plus no zeros = 22 µH.' }, see: { m: 'm02', s: 's8' } },
      { type: 'calc', see: { m: 'm02', s: 's8b' }, gen: function (R, c) {
          var d = R.pick([[1, 0], [2, 2], [3, 3], [4, 7], [6, 8], [1, 5]]), z = R.int(0, 2), v = (d[0] * 10 + d[1]) * Math.pow(10, z), code = '' + d[0] + d[1] + z, u = c.lang === 'en' ? ' µH' : ' мкГн';
          var opts = [c.fmt(v) + u, c.fmt(v * 10) + u, c.fmt(v) + (c.lang === 'en' ? ' Ω' : ' Ом'), c.fmt(v) + (c.lang === 'en' ? ' nH' : ' нГн')];
          return { q: { uk: 'Силова SMD-котушка з маркуванням <b>' + code + '</b>. Яка індуктивність?', en: 'A power SMD inductor marked <b>' + code + '</b>. What is its inductance?' }, opts: opts, a: 0,
            ex: { uk: 'Дві цифри: ' + d[0] + ' і ' + d[1] + ' → ' + d[0] + d[1] + ', далі ' + z + ' нул' + (z === 1 ? 'ь' : (z === 0 ? 'ів' : 'і')) + ' = ' + c.fmt(v) + ' мкГн. У котушок база — мікрогенрі.', en: 'Two digits: ' + d[0] + ' and ' + d[1] + ' → ' + d[0] + d[1] + ', then ' + z + ' zero' + (z === 1 ? '' : 's') + ' = ' + c.fmt(v) + ' µH. For inductors the base unit is µH.' } };
        } },
      { q: { uk: 'Котушка з маркуванням <b>R47</b> — це…', en: 'An inductor marked <b>R47</b> is…' }, opts: [{ uk: '0,47 мкГн', en: '0.47 µH' }, { uk: '47 мкГн', en: '47 µH' }, { uk: '0,47 Ом', en: '0.47 Ω' }, { uk: '470 мкГн', en: '470 µH' }], a: 0,
        ex: { uk: 'R стоїть на місці коми перед 47: 0,47 мкГн.', en: 'R stands for the decimal point before 47: 0.47 µH.' }, see: { m: 'm02', s: 's8b' } },
      { q: { uk: 'Крихітна котушка біля радіочипа має маркування <b>2N2</b>. Це…', en: 'A tiny inductor near a radio chip is marked <b>2N2</b>. That is…' }, opts: [{ uk: '2,2 нГн', en: '2.2 nH' }, { uk: '2,2 мкГн', en: '2.2 µH' }, { uk: '22 нГн', en: '22 nH' }, { uk: 'Транзистор 2N2222', en: 'A 2N2222 transistor' }], a: 0,
        ex: { uk: 'N — кома в наногенрі: 2N2 = 2,2 нГн. Такі малі значення — для радіочастот.', en: 'N is the decimal point in nanohenries: 2N2 = 2.2 nH. Such small values are for radio frequencies.' }, see: { m: 'm02', s: 's8b' } },
      { q: { uk: 'Керамічний конденсатор із кодом <b>104</b> має ємність…', en: 'A ceramic capacitor coded <b>104</b> has a capacitance of…' }, opts: [{ uk: '100 нФ', en: '100 nF' }, { uk: '104 пФ', en: '104 pF' }, { uk: '10 мкФ', en: '10 µF' }, { uk: '100 кОм', en: '100 kΩ' }], a: 0,
        ex: { uk: 'У конденсаторів база — пікофаради: 10 і чотири нулі = 100 000 пФ = 100 нФ.', en: 'For capacitors the base is picofarads: 10 plus four zeros = 100,000 pF = 100 nF.' }, see: { m: 'm02', s: 's8b' } },
      { q: { uk: 'Для чого феритова бусина?', en: 'What is a ferrite bead for?' },
        opts: [{ uk: 'Гасить високочастотні завади в провіднику, не заважаючи постійному струму', en: 'It suppresses high-frequency noise in the conductor without hindering DC' }, { uk: 'Накопичує заряд на час польоту', en: 'It stores charge for the flight' }, { uk: 'Перетворює змінний струм на постійний', en: 'It turns AC into DC' }, { uk: 'Це прикраса кабелю', en: 'It’s a cable decoration' }],
        a: 0, ex: { uk: 'Струм тече провідником усередині бусини, а не феритом. Ферит діє через магнітне поле: ВЧ-завади перетворює на тепло, а постійному струму живлення не заважає.', en: 'Current flows through the conductor inside the bead, not through the ferrite. The ferrite acts through the magnetic field: it turns RF noise into heat and leaves the DC supply alone.' }, see: { m: 'm02', s: 's8' } },
      { q: { uk: 'Крихітний конденсатор 100 нФ стоїть впритул до виводів живлення мікросхеми. Навіщо?', en: 'A tiny 100 nF capacitor sits right against a chip’s power pins. Why?' },
        opts: [{ uk: 'Це блокувальний конденсатор: миттєво віддає заряд, коли мікросхема бере струм ривками', en: 'It’s a decoupling capacitor: it supplies charge instantly when the chip draws current in bursts' }, { uk: 'Він задає частоту процесора', en: 'It sets the processor’s clock frequency' }, { uk: 'Він захищає від неправильної полярності', en: 'It protects against reverse polarity' }, { uk: 'Він охолоджує мікросхему', en: 'It cools the chip' }],
        a: 0, ex: { uk: 'Блокувальний конденсатор — місцевий «резервуар» енергії біля кожної мікросхеми.', en: 'A decoupling capacitor is a local energy “reservoir” next to every chip.' }, see: { m: 'm02', s: 's11' } },
      { q: { uk: 'Ставимо конденсатор на живлення ESC для батареї 6S. Яку робочу напругу обираємо?', en: 'You fit a capacitor on an ESC power lead for a 6S battery. Which voltage rating?' },
        opts: [{ uk: '35 В або більше', en: '35 V or more' }, { uk: '16 В', en: '16 V' }, { uk: '25 В рівно', en: 'Exactly 25 V' }, { uk: '6,3 В', en: '6.3 V' }],
        a: 0, ex: { uk: '6S заряджена — 25,2 В, плюс сплески. Потрібен запас: 35 В і вище.', en: 'A charged 6S is 25.2 V, plus spikes. You need margin: 35 V or more.' }, see: { m: 'm02', s: 's12' } },
      { q: { uk: 'Що означає позначення <b>C9</b> біля деталі на платі?', en: 'What does the label <b>C9</b> next to a part on a board mean?' },
        opts: [{ uk: 'Конденсатор номер 9 на схемі', en: 'Capacitor number 9 on the schematic' }, { uk: 'Ємність 9 мкФ', en: '9 µF capacitance' }, { uk: 'Котушка на 9 витків', en: 'A 9-turn coil' }, { uk: 'Напруга 9 В', en: '9 volts' }],
        a: 0, ex: { uk: 'Позиційне позначення: літера — тип деталі (C — конденсатор), число — її номер на схемі.', en: 'A reference designator: the letter is the part type (C = capacitor), the number is its index on the schematic.' }, see: { m: 'm02', s: 's13' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>резистора</b> з маркуванням «473».', en: 'Tap the <b>resistor</b> marked “473”.' },
        fig: { photo: 'r1-006', hot: [{ id: 'r30', p: [19, 64, 15, 11] }, { id: 'c9', p: [38, 39, 25, 20] }, { id: 'tant', p: [55, 0, 25, 20] }, { id: 'c16', p: [7, 20, 22, 16] }, { id: 'c10', p: [50, 62, 22, 18] }] },
        a: 'r30', ex: { uk: 'R30 «473» = 47 кОм. Поруч — керамічні (C9, C10, C16) і танталові конденсатори.', en: 'R30 “473” = 47 kΩ. Around it are ceramic (C9, C10, C16) and tantalum capacitors.' }, see: { m: 'm02', s: 's13' } },
      { type: 'tap', q: { uk: 'Танталовий конденсатор «33 16V». Торкаємося його <b>плюсового</b> боку.', en: 'A “33 16V” tantalum capacitor. Tap its <b>plus</b> end.' },
        fig: { photo: 'r1-017z', hot: [{ id: 'plus', p: [29, 6, 16, 23] }, { id: 'minus', p: [72, 6, 14, 23] }, { id: 'text', p: [48, 8, 24, 20] }] },
        a: 'plus', ex: { uk: 'Світла смуга — плюс. У танталових навпаки, ніж в електролітичних.', en: 'The light stripe is plus — the opposite of electrolytics.' }, see: { m: 'm02', s: 's7' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>танталового</b> конденсатора.', en: 'Tap a <b>tantalum</b> capacitor.' },
        fig: { photo: 'r1-006', hot: [{ id: 'tant', p: [62, 12, 22, 22] }, { id: 'c9', p: [38, 39, 25, 20] }, { id: 'r23', p: [31, 7, 14, 10] }, { id: 'c17', p: [17, 38, 18, 14] }, { id: 'r30', p: [19, 64, 15, 11] }] },
        a: 'tant', ex: { uk: 'Танталові — жовті прямокутні корпуси з маркуванням і смугою-плюсом.', en: 'Tantalums are the yellow rectangular bodies with a marking and a plus stripe.' }, see: { m: 'm02', s: 's7' } }
    ]
  });
})();
