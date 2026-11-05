/* Module 14 — Electronic warfare basics (open sources, principles only) */
(function () {
  APP.module({
    id: 'm14', n: 14, part: 'D', cv: 1,
    title: { uk: 'Основи РЕБ і радіомоніторингу', en: 'EW and radio monitoring basics' },
    short: { uk: 'Придушення, підміна GNSS, виявлення, пеленгування', en: 'Jamming, GNSS spoofing, detection, direction finding' },
    intro: {
      uk: 'У цьому модулі — дві різні речі. <b>Радіоелектронна боротьба (РЕБ)</b> — дії проти чужих радіоканалів: придушення (глушіння) і підміна сигналу (спуфінг). <b>Радіоелектронна розвідка (РЕР) і радіомоніторинг</b> — пошук сигналів у ефірі: виявити, розпізнати, знайти джерело. Окремо згадаємо <b>захист власного каналу</b> — не глушінням чужих, а тим, як влаштований свій зв’язок: стрибки частоти, спрямовані антени, мінімальна потужність і час в ефірі. Тут — лише принципи з відкритих джерел і те, як розпізнати обладнання. Глибше вивчають у спеціалізованих курсах.',
      en: 'This module covers two different things. <b>Electronic warfare (EW)</b> means acting against other radio links: jamming and spoofing. <b>Signals intelligence and radio monitoring</b> mean searching the airwaves: detecting, recognising and locating signal sources. We also touch on <b>protecting your own link</b> — not by jamming others, but through how your own link is built: frequency hopping, directional antennas, minimum power and minimum time on air. Only principles from open sources are covered here, plus how to recognise the equipment. Deeper study belongs to specialised courses.'
    },
    warm: ['m13q08', 'm12q06', 'm11q06'],
    steps: [
      {
        id: 's0',
        kind: 1,
        title: { uk: 'Як поділяють РЕБ у доктрині США', en: 'How US doctrine divides electronic warfare' },
        body: {
          uk: '<p>У нас зазвичай розділяють <b>РЕБ</b> (глушіння, підміна) і <b>РЕР</b> (пошук і розпізнавання сигналів). У військовій доктрині США все це зібрано під одним словом <b>electronic warfare</b> і поділено на три частини:</p><ul><li><b>Electronic attack</b> (радіоелектронна атака) — погіршити або позбавити противника доступу до ефіру: придушення, підміна сигналу.</li><li><b>Electronic protection</b> (радіоелектронний захист) — зберегти доступ до ефіру для своїх: стрибки частоти, спрямовані антени, дисципліна в ефірі.</li><li><b>EW support</b> (забезпечення РЕБ) — виявляти й каталогізувати випромінювання своїх і чужих, щоб планувати захист і атаку. Це найближче до нашої РЕР і радіомоніторингу.</li></ul><p>Різні країни ділять ці поняття по-різному, тож коли читаємо іноземні джерела, варто перевіряти, що саме автор називає «РЕБ».</p>',
          en: '<p>In Ukraine, <b>EW</b> (jamming, spoofing) and <b>SIGINT</b> (searching for and recognising signals) are usually kept apart. US military doctrine gathers all of this under one term, <b>electronic warfare</b>, divided into three parts:</p><ul><li><b>Electronic attack</b> — degrade or deny the enemy’s use of the spectrum: jamming, spoofing.</li><li><b>Electronic protection</b> — protect access to the spectrum for friendly forces: frequency hopping, directional antennas, radio discipline.</li><li><b>EW support</b> — identify and catalogue emissions of friendly and enemy forces to plan protection and attack. This is the closest to signals intelligence and radio monitoring.</li></ul><p>Countries divide these terms differently, so when reading foreign sources it is worth checking what exactly the author calls “EW”.</p>'
        },
        fig: {
          svg: function (L) {
            function box(x, w, t1, t2, cls) { return '<rect x="' + x + '" y="70" width="' + w + '" height="64" rx="6" class="st ' + cls + '"/><text class="lbl" x="' + (x + w / 2) + '" y="96" text-anchor="middle" style="font-size:11.5px">' + t1 + '</text><text class="txm" x="' + (x + w / 2) + '" y="116" text-anchor="middle">' + L(t2) + '</text>'; }
            var s = '<rect x="110" y="8" width="160" height="34" rx="6" class="st"/><text class="lbl" x="190" y="30" text-anchor="middle">Electronic warfare</text>';
            s += D.line(190, 42, 190, 56) + D.line(62, 56, 318, 56) + D.line(62, 56, 62, 70) + D.line(190, 56, 190, 70) + D.line(318, 56, 318, 70);
            s += box(6, 112, 'Attack', { uk: 'атака', en: 'jam, spoof' }, 'cu') + box(134, 112, 'Protection', { uk: 'захист свого', en: 'protect own' }, 'acc') + box(262, 112, 'Support', { uk: 'пошук сигналів', en: 'find signals' }, '');
            s += '<text class="txm" x="62" y="152" text-anchor="middle" style="fill:var(--copper)">' + L({ uk: '≈ наша РЕБ', en: '≈ jamming' }) + '</text><text class="txm" x="318" y="152" text-anchor="middle">' + L({ uk: '≈ наша РЕР', en: '≈ SIGINT' }) + '</text>';
            return D.svg(380, 162, s);
          },
          cap: { uk: 'Три частини electronic warfare за доктриною США.', en: 'The three parts of electronic warfare in US doctrine.' }
        }
      },
      {
        kind: 1,
        title: { uk: 'Що таке придушення', en: 'What jamming is' },
        body: {
          uk: '<p>Приймач чує корисний сигнал, лише якщо той помітно сильніший за шум. <b>Придушення</b> (глушіння) — це навмисний шум на тій самій частоті, сильніший за корисний сигнал <b>у точці приймача</b>.</p><div class="formula">J/S = потужність завади / потужність сигналу (у приймача)</div><p>Ключове слово — «у приймача». Засобу РЕБ не треба бути потужнішим за передавач оператора: якщо він стоїть набагато ближче до дрона, ніж оператор, навіть невелика потужність перекриває сигнал. І навпаки: що ближче оператор і що спрямованіша його антена — то стійкіший зв’язок.</p>',
          en: '<p>A receiver hears a useful signal only if it is clearly stronger than the noise. <b>Jamming</b> is deliberate noise on the same frequency, stronger than the useful signal <b>at the receiver</b>.</p><div class="formula">J/S = jammer power / signal power (at the receiver)</div><p>The key words are “at the receiver”. An EW device does not need to out-power the operator’s transmitter: if it is much closer to the drone than the operator is, even modest power drowns the signal. Conversely, the closer the operator and the more directional their antenna, the more robust the link.</p>'
        },
        recall: [{ m: 'm13', s: 's9', label: { uk: 'Бюджет радіолінії', en: 'The link budget' } }, { m: 'm12', s: 's3', label: { uk: 'LNA «засліплюється»', en: 'The LNA gets blinded' } }],
        fig: { anim: 'jam', cap: { uk: 'Збільшуємо потужність завади, порівнюємо вузьку й широку заваду, вмикаємо стрибки частоти.', en: 'Raise the jammer power, compare a narrow and a wide jammer, turn on frequency hopping.' } }
      },
      {
        kind: 1,
        title: { uk: 'Вузька, широка, загороджувальна', en: 'Narrow, wide, barrage' },
        body: {
          uk: '<ul><li><b>Прицільна</b> (вузька) завада — на одній частоті. Ефективна проти фіксованого каналу (наприклад, аналогового відео), безсила проти стрибків частоти.</li><li><b>Загороджувальна</b> (широка) — накриває весь діапазон. Але та сама потужність «розмазується» по ширшій смузі — на кожному каналі її менше.</li><li><b>Спрямовані антени</b> концентрують потужність у промінь — тому на ручних засобах кілька патч- чи Yagi-антен, по одній на діапазон.</li></ul><p>Звідси головна інженерна суперечка РЕБ: ширина смуги проти потужності на канал.</p>',
          en: '<ul><li>A <b>spot</b> (narrow) jammer sits on one frequency. Effective against a fixed channel (analog video, say), powerless against frequency hopping.</li><li>A <b>barrage</b> (wide) jammer covers the whole band. But the same power is “spread” across a wider band — less on each channel.</li><li><b>Directional antennas</b> concentrate power into a beam — which is why handheld devices carry several patch or Yagi antennas, one per band.</li></ul><p>Hence the core engineering tension in EW: bandwidth versus power per channel.</p>'
        },
        recall: [{ m: 'm11', s: 's8', label: { uk: 'Спрямовані антени', en: 'Directional antennas' } }]
      },
      {
        kind: 3,
        title: { uk: 'Поєднуємо: чому стрибки частоти і LoRa стійкіші', en: 'Combine: why hopping and LoRa hold up better' },
        body: {
          uk: '<p>Усе, що ми вивчили, складається в одну картину:</p><ul><li><b>FHSS</b> змушує заваду бути широкою, а отже, слабшою на кожному каналі.</li><li><b>LoRa</b> «розтягує» кожен біт у часі й частоті і приймає сигнал навіть <b>нижче</b> рівня шуму.</li><li><b>Нижча частота пакетів</b> — менше пакетів за секунду, але кожен довший, і на кожен біт припадає більше енергії. Приймач витягує з шуму слабший сигнал, тобто його чутливість краща, а запас — більший. Наприклад, ELRS 2,4 ГГц: 500 Гц — чутливість −105 dBm, 50 Гц — −115 dBm, тобто на 10 dB більше запасу. Ціна — повільніша реакція: 50 пакетів за секунду замість 500.</li><li><b>Спрямована антена оператора</b> додає децибели на свій бік рівняння.</li></ul><p>Жоден спосіб не робить зв’язок незаглушуваним — кожен лише змінює співвідношення J/S.</p>',
          en: '<p>Everything you have learned comes together:</p><ul><li><b>FHSS</b> forces the jammer to go wide, and therefore weaker per channel.</li><li><b>LoRa</b> “stretches” each bit in time and frequency and receives signals even <b>below</b> the noise floor.</li><li>A <b>lower packet rate</b> means fewer packets per second, but each one is longer, so every bit carries more energy. The receiver can pull a weaker signal out of the noise — better sensitivity, more margin. For example, ELRS 2.4 GHz: 500 Hz has −105 dBm sensitivity, 50 Hz has −115 dBm — 10 dB more margin. The price is slower response: 50 packets a second instead of 500.</li><li>A <b>directional operator antenna</b> adds decibels on its side of the equation.</li></ul><p>No method makes a link unjammable — each only shifts the J/S ratio.</p>'
        },
        recall: [{ m: 'm13', s: 's4', label: { uk: 'FHSS', en: 'FHSS' } }, { m: 'm13', s: 's3', label: { uk: 'Частота пакетів ELRS', en: 'ELRS packet rate' } }]
      },
      {
        kind: 4,
        title: { uk: 'Ручні засоби протидії дронам', en: 'Handheld counter-drone devices' },
        body: {
          uk: '<p>Українська «рушниця» Kvertus KVS 6+ та литовська EDM4S (NT Service) у підрозділах ЗСУ. Будова в них схожа: кілька спрямованих антен — по одній на діапазон (канали керування, GNSS, відео), підсилювачі, акумулятор, приклад і приціл. Оператор спрямовує промінь на дрон.</p>',
          en: '<p>The Ukrainian Kvertus KVS 6+ “rifle” and the Lithuanian EDM4S (NT Service) in Ukrainian units. They are built alike: several directional antennas — one per band (control links, GNSS, video), amplifiers, a battery, a stock and a sight. The operator aims the beam at the drone.</p>'
        },
        fig: { photo: 'r2-025', cap: { uk: 'Kvertus KVS 6+ в окопі.', en: 'A Kvertus KVS 6+ in a trench.' } }
      },
      {
        kind: 4,
        title: { uk: 'EDM4S зблизька', en: 'The EDM4S up close' },
        body: { uk: '<p>Видно блоки антен спереду і батарею. Кожен блок «світить» на свій діапазон.</p>', en: '<p>The antenna blocks at the front and the battery are visible. Each block “shines” on its own band.</p>' },
        fig: { photo: 'r2-028', cap: { uk: 'EDM4S на виставці в Києві, 2021.', en: 'An EDM4S at an exhibition in Kyiv, 2021.' } }
      },
      {
        kind: 5,
        title: { uk: 'Як влаштований багатодіапазонний засіб', en: 'How a multi-band device is built' },
        body: {
          uk: '<p>Стаціонарний багатодіапазонний засіб розібрано на частини: блок генераторів і підсилювачів (окремий модуль на кожен діапазон, ряди вихідних роз’ємів), набір антен — по одній на діапазон, блок живлення і пульт. Торкаємося частин.</p><p>Ознаки такого обладнання на будь-якому фото: багато антенних виходів, масивні радіатори, вентилятори, потужне живлення.</p>',
          en: '<p>A stationary multi-band device laid out in parts: the generator and amplifier unit (a separate module per band, rows of output connectors), a set of antennas — one per band, a power supply and a remote. Tap the parts.</p><p>Signs of such equipment in any photo: many antenna outputs, massive heatsinks, fans, a heavy power supply.</p>'
        },
        recall: [{ m: 'm12', s: 's3', label: { uk: 'Підсилювач потужності гріється', en: 'The power amplifier heats up' } }],
        fig: {
          photo: 'r2-044',
          hot: [
            { id: 'unit', p: [35, 28, 30, 42], label: { uk: 'Блок генераторів і підсилювачів', en: 'Generator and amplifier unit' }, info: { uk: 'модуль на кожен діапазон, ребра радіатора', en: 'one module per band, heatsink fins' } },
            { id: 'ant', p: [66, 34, 22, 36], label: { uk: 'Антени — по одній на діапазон', en: 'Antennas — one per band' } },
            { id: 'psu', p: [18, 33, 17, 20], label: { uk: 'Блок живлення', en: 'Power supply' } },
            { id: 'rc', p: [19, 61, 14, 13], label: { uk: 'Пульт увімкнення', en: 'Remote switch' } }
          ]
        }
      },
      {
        kind: 1,
        title: { uk: 'GNSS: глушіння і підміна', en: 'GNSS: jamming and spoofing' },
        body: {
          uk: '<p>Сигнал супутника GPS біля землі — близько −130 dBm, нижче рівня шуму. Тому його легко <b>заглушити</b> навіть малою потужністю — приймач просто втрачає супутники.</p><p><b>Підміна</b> (спуфінг) хитріша: передавач імітує сигнали супутників, трохи сильніші за справжні. Приймач «захоплює» їх і обчислює неправильні координати чи час — апарат «думає», що він деінде.</p><p>Захист: <b>CRPA</b> — антена з кількох елементів. Електроніка порівнює сигнали з елементів і «відвертає» чутливість від напрямку завади, залишаючи її на небо.</p><p>Саме такі антени противник ставить на «Шахеди», крилаті ракети й набори для керованих авіабомб — модуль CRPA «Комета» з 4, 12 або 16 елементами, а в 2026 році знайшли й 32-елементний. Що більше елементів, то більше напрямків завад антена може «вимкнути» одночасно: приблизно на один менше, ніж елементів. Тому одна станція завад проти такої антени майже безсила.</p>',
          en: '<p>A GPS satellite signal at ground level is about −130 dBm, below the noise floor. So it is easy to <b>jam</b> with very little power — the receiver simply loses the satellites.</p><p><b>Spoofing</b> is subtler: a transmitter imitates satellite signals, slightly stronger than the real ones. The receiver locks onto them and computes wrong coordinates or time — the craft “thinks” it is elsewhere.</p><p>A defence is the <b>CRPA</b> — an antenna of several elements. Electronics compare the elements’ signals and steer sensitivity away from the jammer’s direction while keeping it on the sky.</p><p>This is exactly the kind of antenna the enemy fits to Shaheds, cruise missiles and glide-bomb kits — the “Kometa” CRPA module with 4, 12 or 16 elements, and in 2026 a 32-element one was found. The more elements, the more jamming directions the antenna can “switch off” at once: roughly one fewer than the number of elements. That is why a single jammer is almost powerless against it.</p>'
        },
        recall: [{ m: 'm10', s: 's5', label: { uk: 'GNSS і слабкий сигнал', en: 'GNSS and its weak signal' } }],
        fig: {
          svg: function (L) {
            var s = '', cx = 92, cy = 100;
            // plate, top view
            s += '<circle cx="' + cx + '" cy="' + cy + '" r="70" class="st" style="fill:var(--fig-bg)"/>';
            for (var k = 0; k < 8; k++) { var a = k * Math.PI / 4, x = cx + 46 * Math.cos(a), y = cy + 46 * Math.sin(a); s += '<rect x="' + (x - 11).toFixed(1) + '" y="' + (y - 11).toFixed(1) + '" width="22" height="22" rx="2" class="cuf" style="opacity:.85"/><circle cx="' + (x + 4).toFixed(1) + '" cy="' + (y - 4).toFixed(1) + '" r="2" class="fl"/>'; }
            s += '<rect x="' + (cx - 11) + '" y="' + (cy - 11) + '" width="22" height="22" rx="2" class="cuf" style="opacity:.85"/><circle cx="' + (cx + 4) + '" cy="' + (cy - 4) + '" r="2" class="fl"/>';
            s += '<text class="txm" x="' + cx + '" y="190" text-anchor="middle">' + L({ uk: 'вигляд згори: 9 елементів', en: 'top view: 9 elements' }) + '</text>';
            // reception pattern, side view
            var ox = 282, oy = 150, r = 82, pts = [];
            for (var d = 0; d <= 180; d += 2) { var th = d * Math.PI / 180, g = 0.55 + 0.45 * Math.sin(th), dn = Math.abs(d - 18); if (dn < 18) g *= Math.pow(dn / 18, 2); pts.push((ox - r * g * Math.cos(th)).toFixed(1) + ',' + (oy - r * g * Math.sin(th)).toFixed(1)); }
            s += '<line class="grid" x1="186" y1="' + oy + '" x2="378" y2="' + oy + '"/>';
            s += '<polygon points="' + ox + ',' + oy + ' ' + pts.join(' ') + '" class="accf" style="opacity:.25"/><polyline points="' + pts.join(' ') + '" class="st acc"/>';
            s += '<rect x="' + (ox - 16) + '" y="' + (oy - 4) + '" width="32" height="6" rx="2" class="cuf"/>';
            s += D.arrow(206, 128, 248, 140, 'cu') + '<text class="txm" x="196" y="122" style="fill:var(--copper)">' + L({ uk: 'завада', en: 'jammer' }) + '</text>';
            s += '<text class="txm" x="282" y="56" text-anchor="middle" style="fill:var(--accent)">' + L({ uk: 'небо: супутники', en: 'sky: satellites' }) + '</text>';
            s += '<text class="txm" x="282" y="190" text-anchor="middle">' + L({ uk: 'чутливість: «провал» на заваду', en: 'sensitivity: a “null” on the jammer' }) + '</text>';
            return D.svg(380, 200, s);
          },
          cap: { uk: 'Ліворуч — пластина CRPA з кількох антенних елементів. Праворуч — її чутливість збоку: угору, на супутники, вона лишається, а в напрямку завади електроніка робить «провал».', en: 'Left — a CRPA plate with several antenna elements. Right — its sensitivity from the side: it stays up towards the satellites, while the electronics carve a “null” towards the jammer.' }
        }
      },
      {
        kind: 1,
        title: { uk: 'Виявлення: бачимо ефір', en: 'Detection: seeing the airwaves' },
        body: {
          uk: '<p>Щоб протидіяти, спершу треба <b>побачити</b>. Для цього — прилади, що показують спектр і водоспад:</p><ul><li><b>аналізатор спектра</b> — точний вимірювальний прилад;</li><li><b>SDR</b> (програмно-визначене радіо) — приймач, де обробка сигналу робиться програмою на комп’ютері: від дешевого RTL-SDR до HackRF чи USRP;</li><li>спеціалізовані <b>детектори</b> дронів, що впізнають характерні сигнали відео й керування.</li></ul><p>На водоспаді аналогове відео — широка смуга, LoRa — короткі «риски», що стрибають, Wi-Fi — пачки. Навіть завади від зарядного пристрою видно.</p>',
          en: '<p>Before you can counter, you must <b>see</b>. That takes devices showing a spectrum and waterfall:</p><ul><li>a <b>spectrum analyser</b> — a precise measuring instrument;</li><li>an <b>SDR</b> (software-defined radio) — a receiver whose signal processing is done by software on a computer: from a cheap RTL-SDR to a HackRF or USRP;</li><li>specialised drone <b>detectors</b> that recognise characteristic video and control signals.</li></ul><p>On a waterfall analog video is a wide band, LoRa short hopping “dashes”, Wi-Fi bursts. Even noise from a charger is visible.</p>'
        },
        recall: [{ m: 'm13', s: 's5', label: { uk: 'LoRa на водоспаді', en: 'LoRa on a waterfall' } }, { m: 'm13', s: 's7', label: { uk: 'Відео на водоспаді', en: 'Video on a waterfall' } }],
        fig: { photo: 'r2-065', cap: { uk: 'Радіомоніторинг: спрямована антена в руці й живий спектр на екрані.', en: 'Radio monitoring: a handheld directional antenna and a live spectrum on screen.' } }
      },
      {
        kind: 2,
        title: { uk: 'SDR зблизька', en: 'SDRs up close' },
        body: { uk: '<p>HackRF One — SDR від 1 МГц до 6 ГГц, популярний у навчанні. Антена під’єднується роз’ємом SMA, а весь «розум» — у програмі на комп’ютері.</p>', en: '<p>The HackRF One is an SDR covering 1 MHz to 6 GHz, popular for learning. The antenna attaches with an SMA connector, and all the “brains” are in software on a computer.</p>' },
        fig: { photo: 'r1-231' }
      },
      {
        kind: 2,
        title: { uk: 'Завади навколо нас', en: 'Interference all around us' },
        body: { uk: '<p>Тривимірний спектр завад від звичайного зарядного пристрою. Імпульсні перетворювачі (модуль 7) «смітять» в ефір — тому РЕБ-обладнання й чутливі приймачі ретельно екранують і фільтрують.</p>', en: '<p>A 3D spectrum of interference from an ordinary battery charger. Switching converters (module 7) “litter” the airwaves — that is why EW equipment and sensitive receivers are carefully shielded and filtered.</p>' },
        recall: [{ m: 'm07', s: 's4', label: { uk: 'Імпульсний перетворювач', en: 'The switching converter' } }],
        fig: { photo: 'r1-226' }
      },
      {
        kind: 1,
        title: { uk: 'Пеленгування: звідки сигнал', en: 'Direction finding: where the signal comes from' },
        body: {
          uk: '<p>Спрямована антена найбільше «чує» в одному напрямі. Повертаємо її — і там, де сигнал найсильніший (або, для деяких антен, найслабший), — напрям на джерело. Це <b>пеленг</b>.</p><p>Два пеленги з різних точок перетинаються — там джерело. Так знаходять і передавачі, і пульти операторів. Тому досвідчені оператори обмежують час у ефірі й потужність передавача.</p>',
          en: '<p>A directional antenna “hears” best in one direction. Turn it, and where the signal is strongest (or, for some antennas, weakest) is the direction to the source. That is a <b>bearing</b>.</p><p>Two bearings from different points cross — the source is there. That is how transmitters and operators’ radios are located. So experienced operators limit their time on air and their transmit power.</p>'
        },
        fig: { photo: 'r2-057', cap: { uk: 'Саморобна Yagi з рулетки — класична антена для пошуку передавачів.', en: 'A home-made tape-measure Yagi — the classic antenna for hunting transmitters.' } }
      },
      {
        kind: 4,
        title: { uk: 'Відповідь без радіо: оптоволокно', en: 'An answer without radio: fibre optics' },
        body: {
          uk: '<p>FPV-дрон на оптоволокні тягне за собою котушку тонкого волокна. Керування і відео йдуть по ньому, а не через ефір, — <b>радіоканалу, який можна заглушити, немає</b>. Його не видно й на водоспаді.</p><p>Ціна: вага котушки, обмежена довжина, ризик обриву за гілки, неможливість різко маневрувати назад.</p>',
          en: '<p>A fibre-optic FPV drone pulls a spool of thin fibre behind it. Control and video travel through it rather than through the air — <b>there is no radio link to jam</b>. It does not show on a waterfall either.</p><p>The costs: spool weight, limited length, the risk of snagging on branches, no sharp reversing.</p>'
        },
        fig: { photo: 'r2-099', cap: { uk: 'Український FPV-дрон з котушкою оптоволокна.', en: 'A Ukrainian FPV drone with a fibre spool.' } }
      }
    ],
    sources: [
      { t: { uk: 'J. R. Hoehn. Defense Primer: Electronic Warfare. Congressional Research Service, IF11118 (оновл. 2022)', en: 'J. R. Hoehn. Defense Primer: Electronic Warfare. Congressional Research Service, IF11118 (updated 2022)' }, url: 'https://www.everycrsreport.com/reports/IF11118.html' },
      { t: { uk: 'ExpressLRS — Signal Health: чутливість для кожної частоти пакетів', en: 'ExpressLRS — Signal Health: sensitivity for each packet rate' }, url: 'https://expresslrs.org/info/signal-health/' },
      { t: { uk: 'В. Хоменко. Ukraine captures 32-element CRPA antenna from Russian Shahed. Militarnyi, 7.07.2026', en: 'V. Khomenko. Ukraine captures 32-element CRPA antenna from Russian Shahed. Militarnyi, 7 July 2026' }, url: 'https://militarnyi.com/en/news/ukraine-captures-crpa-antenna-russia-shahed/' },
      { t: { uk: 'Defense Express. Kometa-M navigation unit with 16 antennas found in Iskander-K, 17.06.2025', en: 'Defense Express. Kometa-M navigation unit with 16 antennas found in Iskander-K, 17 June 2025' }, url: 'https://en.defence-ua.com/weapon_and_tech/kometa_m_navigation_unit_with_16_antennas_found_in_russian_iskander_k_what_it_means-14876.html' },
      { t: { uk: 'David L. Adamy. EW 101: A First Course in Electronic Warfare. Artech House, 2001 (і наступні томи)', en: 'David L. Adamy. EW 101: A First Course in Electronic Warfare. Artech House, 2001 (and later volumes)' } },
      { t: { uk: 'Richard A. Poisel. Introduction to Communication Electronic Warfare Systems. Artech House, 2-ге вид., 2008', en: 'Richard A. Poisel. Introduction to Communication Electronic Warfare Systems. Artech House, 2nd ed., 2008' } },
      { t: { uk: 'IS-GPS-200 — офіційна специфікація сигналу GPS (мінімальна потужність прийому)', en: 'IS-GPS-200 — the official GPS signal specification (minimum received power)' }, url: 'https://www.gps.gov/technical/icwg/' },
      { t: { uk: 'Semtech AN1200.22 — LoRa Modulation Basics', en: 'Semtech AN1200.22 — LoRa Modulation Basics' } },
      { t: { uk: 'Great Scott Gadgets — документація HackRF One', en: 'Great Scott Gadgets — HackRF One documentation' }, url: 'https://hackrf.readthedocs.io/' }
    ],
    quiz: [
      { q: { uk: 'Коли приймач втрачає корисний сигнал через заваду?', en: 'When does a receiver lose the useful signal to a jammer?' }, opts: [{ uk: 'Коли завада у точці приймача сильніша за корисний сигнал', en: 'When the jamming at the receiver is stronger than the useful signal' }, { uk: 'Коли засіб РЕБ потужніший за передавач оператора', en: 'When the EW device is more powerful than the operator’s transmitter' }, { uk: 'Завжди, коли поруч є засіб РЕБ', en: 'Whenever an EW device is nearby' }, { uk: 'Лише вночі', en: 'Only at night' }], a: 0,
        ex: { uk: 'Важить співвідношення J/S саме у приймача, а не потужності на виходах.', en: 'What matters is J/S at the receiver, not the output powers.' }, see: { m: 'm14', s: 's1' } },
      { q: { uk: 'Чому невеликий засіб РЕБ біля дрона може заглушити потужний пульт далеко?', en: 'Why can a small EW device near a drone drown out a powerful radio far away?' }, opts: [{ uk: 'Сигнал слабне з відстанню, тож завада поруч сильніша у приймача', en: 'Signals weaken with distance, so nearby jamming is stronger at the receiver' }, { uk: 'Засоби РЕБ завжди потужніші', en: 'EW devices are always more powerful' }, { uk: 'Пульт вимикається автоматично', en: 'The radio switches off automatically' }, { uk: 'Це неможливо', en: 'It’s impossible' }], a: 0,
        ex: { uk: 'Подвоєння відстані — мінус 6 dB. Геометрія вирішує.', en: 'Doubling distance costs 6 dB. Geometry decides.' }, see: { m: 'm14', s: 's1' } },
      { q: { uk: 'Що дає ширша (загороджувальна) завада порівняно з вузькою тієї самої потужності?', en: 'What does a wider (barrage) jammer give compared with a narrow one of the same power?' }, opts: [{ uk: 'Накриває більше частот, але на кожному каналі слабша', en: 'It covers more frequencies but is weaker on each channel' }, { uk: 'Сильніша на кожному каналі', en: 'It is stronger on each channel' }, { uk: 'Те саме', en: 'The same' }, { uk: 'Не впливає на стрибки частоти', en: 'It doesn’t affect hopping' }], a: 0,
        ex: { uk: 'Потужність «розмазується» по смузі.', en: 'The power is spread across the band.' }, see: { m: 'm14', s: 's2' } },
      { q: { uk: 'Проти якого каналу прицільна (вузька) завада найефективніша?', en: 'Against which link is a spot (narrow) jammer most effective?' }, opts: [{ uk: 'Проти каналу на одній фіксованій частоті (наприклад, аналогового відео)', en: 'One on a single fixed frequency (e.g. analog video)' }, { uk: 'Проти FHSS', en: 'Against FHSS' }, { uk: 'Проти оптоволокна', en: 'Against fibre optics' }, { uk: 'Проти всіх однаково', en: 'Against all equally' }], a: 0,
        ex: { uk: 'Канал, що не стрибає, — легка ціль для вузької завади.', en: 'A link that doesn’t hop is an easy target for a narrow jammer.' }, see: { m: 'm14', s: 's2' } },
      { q: { uk: 'Чому на ручних засобах протидії кілька антен?', en: 'Why do handheld counter-drone devices have several antennas?' }, opts: [{ uk: 'По одній спрямованій антені на кожен діапазон', en: 'One directional antenna per band' }, { uk: 'Для балансу ваги', en: 'For weight balance' }, { uk: 'Одна працює, інші запасні', en: 'One works, the rest are spares' }, { uk: 'Щоб приймати відео', en: 'To receive video' }], a: 0,
        ex: { uk: 'Кожна антена резонує у своєму діапазоні й концентрує промінь.', en: 'Each antenna resonates in its own band and focuses a beam.' }, see: { m: 'm14', s: 's4' } },
      { q: { uk: 'Що з переліченого збільшує стійкість зв’язку до завад?', en: 'Which of these makes a link more resistant to jamming?' }, opts: [{ uk: 'Стрибки частоти, нижча частота пакетів, спрямована антена оператора', en: 'Frequency hopping, a lower packet rate, a directional operator antenna' }, { uk: 'Вища потужність відео', en: 'Higher video power' }, { uk: 'Довші пропелери', en: 'Longer propellers' }, { uk: 'Яскравіший OSD', en: 'A brighter OSD' }], a: 0,
        ex: { uk: 'Кожен спосіб зсуває співвідношення J/S на користь корисного сигналу.', en: 'Each shifts J/S in favour of the useful signal.' }, see: { m: 'm14', s: 's3' } },
      { q: { uk: 'Чи може будь-який метод зробити радіоканал повністю незаглушуваним?', en: 'Can any method make a radio link completely unjammable?' }, opts: [{ uk: 'Ні — методи лише змінюють співвідношення J/S', en: 'No — methods only shift the J/S ratio' }, { uk: 'Так, FHSS', en: 'Yes, FHSS' }, { uk: 'Так, LoRa', en: 'Yes, LoRa' }, { uk: 'Так, потужний передавач', en: 'Yes, a powerful transmitter' }], a: 0,
        ex: { uk: 'Достатньо потужна і широка завада заглушить будь-який радіоканал.', en: 'A powerful and wide enough jammer can drown any radio link.' }, see: { m: 'm14', s: 's3' } },
      { q: { uk: 'Чому сигнал GNSS так легко заглушити?', en: 'Why is a GNSS signal so easy to jam?' }, opts: [{ uk: 'Біля землі він дуже слабкий — нижче рівня шуму', en: 'At ground level it is very weak — below the noise floor' }, { uk: 'Супутники вимикаються вночі', en: 'Satellites switch off at night' }, { uk: 'Він на 5,8 ГГц', en: 'It is at 5.8 GHz' }, { uk: 'Він не шифрований', en: 'It isn’t encrypted' }], a: 0,
        ex: { uk: 'Близько −130 dBm — навіть мала завада перекриває.', en: 'Around −130 dBm — even a small jammer overpowers it.' }, see: { m: 'm14', s: 's7' } },
      { q: { uk: 'Чим підміна (спуфінг) GNSS відрізняється від глушіння?', en: 'How does GNSS spoofing differ from jamming?' }, opts: [{ uk: 'Приймач отримує фальшиві «супутникові» сигнали й рахує неправильні координати', en: 'The receiver gets fake “satellite” signals and computes wrong coordinates' }, { uk: 'Це те саме', en: 'It’s the same thing' }, { uk: 'Спуфінг вимикає двигуни', en: 'Spoofing stops the motors' }, { uk: 'Спуфінг діє лише на відео', en: 'Spoofing affects only video' }], a: 0,
        ex: { uk: 'Глушіння — «нічого не чути», підміна — «чути неправду».', en: 'Jamming is “hear nothing”; spoofing is “hear a lie”.' }, see: { m: 'm14', s: 's7' } },
      { q: { uk: 'Як працює антена CRPA?', en: 'How does a CRPA antenna work?' }, opts: [{ uk: 'Кілька елементів; електроніка «відвертає» чутливість від напрямку завади', en: 'Several elements; electronics steer sensitivity away from the jammer’s direction' }, { uk: 'Вона просто більша', en: 'It is simply bigger' }, { uk: 'Вона передає свій сигнал GPS', en: 'It transmits its own GPS signal' }, { uk: 'Вона працює лише вночі', en: 'It works only at night' }], a: 0,
        ex: { uk: 'Controlled Reception Pattern Antenna — керована діаграма прийому.', en: 'Controlled Reception Pattern Antenna.' }, see: { m: 'm14', s: 's7' } },
      { q: { uk: 'Що таке SDR?', en: 'What is an SDR?' }, opts: [{ uk: 'Радіоприймач, де обробку сигналу робить програма', en: 'A radio receiver whose signal processing is done by software' }, { uk: 'Тип антени', en: 'An antenna type' }, { uk: 'Тип батареї', en: 'A battery type' }, { uk: 'Регулятор обертів', en: 'A speed controller' }], a: 0,
        ex: { uk: 'Software Defined Radio: RTL-SDR, HackRF, USRP…', en: 'Software Defined Radio: RTL-SDR, HackRF, USRP…' }, see: { m: 'm14', s: 's8' } },
      { q: { uk: 'Як на водоспаді зазвичай виглядає аналогове FPV-відео?', en: 'How does analog FPV video usually look on a waterfall?' }, opts: [{ uk: 'Широка суцільна смуга', en: 'A wide continuous band' }, { uk: 'Короткі риски, що стрибають', en: 'Short hopping dashes' }, { uk: 'Одна тонка лінія', en: 'A single thin line' }, { uk: 'Його не видно', en: 'It isn’t visible' }], a: 0,
        ex: { uk: 'Відео займає ~20 МГц безперервно. Риски, що стрибають, — ознака LoRa/FHSS.', en: 'Video occupies ~20 MHz continuously. Hopping dashes mark LoRa/FHSS.' }, see: { m: 'm14', s: 's8' } },
      { q: { uk: 'Що таке пеленг?', en: 'What is a bearing?' }, opts: [{ uk: 'Напрям на джерело сигналу', en: 'The direction to a signal’s source' }, { uk: 'Потужність передавача', en: 'Transmitter power' }, { uk: 'Тип завади', en: 'A jammer type' }, { uk: 'Частота каналу', en: 'A channel frequency' }], a: 0,
        ex: { uk: 'Спрямованою антеною знаходять напрям максимуму.', en: 'A directional antenna finds the direction of maximum signal.' }, see: { m: 'm14', s: 's11' } },
      { q: { uk: 'Як визначити положення передавача?', en: 'How do you locate a transmitter?' }, opts: [{ uk: 'Перетином двох і більше пеленгів з різних точок', en: 'By crossing two or more bearings from different points' }, { uk: 'Одним пеленгом', en: 'With a single bearing' }, { uk: 'За кольором сигналу на водоспаді', en: 'By its colour on a waterfall' }, { uk: 'Ніяк', en: 'It can’t be done' }], a: 0,
        ex: { uk: 'Один пеленг дає лінію, два — точку.', en: 'One bearing gives a line, two give a point.' }, see: { m: 'm14', s: 's11' } },
      { q: { uk: 'Чому FPV-дрон на оптоволокні не вдається заглушити радіозавадою?', en: 'Why can’t a fibre-optic FPV drone be jammed by radio?' }, opts: [{ uk: 'Керування і відео йдуть волокном, а не через ефір', en: 'Control and video travel through the fibre, not through the air' }, { uk: 'Він дуже швидкий', en: 'It is very fast' }, { uk: 'Він має сильніший передавач', en: 'It has a stronger transmitter' }, { uk: 'Він використовує FHSS', en: 'It uses FHSS' }], a: 0,
        ex: { uk: 'Немає радіоканалу — нічого глушити.', en: 'No radio link — nothing to jam.' }, see: { m: 'm14', s: 's12' } },
      { q: { uk: 'Головні недоліки оптоволоконного FPV?', en: 'The main drawbacks of fibre-optic FPV?' }, opts: [{ uk: 'Вага котушки, обмежена довжина, ризик обриву', en: 'Spool weight, limited length, risk of breaking' }, { uk: 'Його легко заглушити', en: 'It is easy to jam' }, { uk: 'Немає відео', en: 'There is no video' }, { uk: 'Немає недоліків', en: 'None' }], a: 0,
        ex: { uk: 'Захист від РЕБ має фізичну ціну.', en: 'Protection from EW has a physical price.' }, see: { m: 'm14', s: 's12' } },
      { type: 'tap', q: { uk: 'Торкаємося <b>антен</b> багатодіапазонного засобу.', en: 'Tap the multi-band device’s <b>antennas</b>.' },
        fig: { photo: 'r2-044', hot: [{ id: 'ant', p: [66, 34, 22, 36] }, { id: 'unit', p: [35, 28, 30, 42] }, { id: 'psu', p: [18, 33, 17, 20] }, { id: 'rc', p: [19, 61, 14, 13] }] },
        a: 'ant', ex: { uk: 'Ряд чорних штирів праворуч — антени, по одній на діапазон.', en: 'The row of black whips on the right are the antennas, one per band.' }, see: { m: 'm14', s: 's6' } }
    ]
  });
})();
