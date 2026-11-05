/* Module 11 — Radio fundamentals */
(function () {
  function dbm2mw(d) { return Math.pow(10, d / 10); }
  APP.module({
    id: 'm11', n: 11, part: 'D', cv: 1,
    title: { uk: 'Основи радіо: хвилі, контур, антени', en: 'Radio basics: waves, tuned circuits, antennas' },
    short: { uk: 'Частота, децибели, коливальний контур, антени, роз’єми', en: 'Frequency, decibels, the LC circuit, antennas, connectors' },
    intro: {
      uk: 'Радіо — це змінний струм, що «відривається» від дроту і летить у простір. У цьому модулі від найпростішого коливального контуру ми дійдемо до детекторного приймача, а потім — до антен і роз’ємів, які бачимо на кожному дроні.',
      en: 'Radio is alternating current that “breaks away” from a wire and flies into space. In this module we go from the simplest LC circuit to a crystal radio, and then to the antennas and connectors you see on every drone.'
    },
    warm: ['m02q14', 'm02q08', 'm01q07'],
    steps: [
      {
        kind: 1,
        title: { uk: 'Частота і довжина хвилі', en: 'Frequency and wavelength' },
        body: {
          uk: '<p>Радіохвиля — це коливання, що летить зі швидкістю світла: 300 000 км/с. <b>Частота</b> (f) — скільки коливань за секунду, у герцах. <b>Довжина хвилі</b> (λ) — відстань, яку хвиля пролітає за одне коливання.</p><div class="formula">λ = c / f = 300 / f [МГц] (у метрах)</div><p>433 МГц → 69 см. 2,4 ГГц → 12,5 см. 5,8 ГГц → 5,2 см. Від довжини хвилі залежить розмір антени: що вища частота — то менша антена.</p>',
          en: '<p>A radio wave is an oscillation travelling at the speed of light: 300,000 km/s. <b>Frequency</b> (f) is oscillations per second, in hertz. <b>Wavelength</b> (λ) is the distance the wave covers in one oscillation.</p><div class="formula">λ = c / f = 300 / f [MHz] (in metres)</div><p>433 MHz → 69 cm. 2.4 GHz → 12.5 cm. 5.8 GHz → 5.2 cm. Antenna size follows the wavelength: the higher the frequency, the smaller the antenna.</p>'
        },
        recall: [{ m: 'm01', s: 's4', label: { uk: 'Змінний струм', en: 'Alternating current' } }],
        fig: { anim: 'wave' }
      },
      {
        kind: 1,
        title: { uk: 'Діапазони, які варто знати', en: 'Bands worth knowing' },
        body: {
          uk: '<ul><li><b>433 МГц, 868/915 МГц</b> — LoRa, далекобійні канали керування (ExpressLRS 900, Meshtastic).</li><li><b>1,2–1,3 ГГц</b> — аналогове відео на великих дистанціях.</li><li><b>1,575 ГГц</b> — GPS (L1).</li><li><b>2,4 ГГц</b> — Wi-Fi, Bluetooth, ExpressLRS 2.4, більшість пультів.</li><li><b>5,8 ГГц</b> — FPV-відео, Wi-Fi 5 ГГц.</li></ul><p>Нижча частота краще огинає перешкоди й далі летить, але потребує більшої антени. Вища — компактніша й «ширша» (більше даних), але легше затуляється.</p>',
          en: '<ul><li><b>433 MHz, 868/915 MHz</b> — LoRa, long-range control links (ExpressLRS 900, Meshtastic).</li><li><b>1.2–1.3 GHz</b> — long-range analog video.</li><li><b>1.575 GHz</b> — GPS (L1).</li><li><b>2.4 GHz</b> — Wi-Fi, Bluetooth, ExpressLRS 2.4, most radios.</li><li><b>5.8 GHz</b> — FPV video, 5 GHz Wi-Fi.</li></ul><p>Lower frequencies bend around obstacles better and reach further but need bigger antennas. Higher ones are more compact and “wider” (more data) but are blocked more easily.</p>'
        }
      },
      {
        kind: 1,
        title: { uk: 'Децибели: мова радіо', en: 'Decibels: the language of radio' },
        body: {
          uk: '<p>Потужності в радіо відрізняються в мільярди разів, тому їх рахують у <b>децибелах</b> — логарифмах.</p><ul><li><b>dBm</b> — потужність відносно 1 мВт: 0 dBm = 1 мВт, 20 dBm = 100 мВт, 30 dBm = 1 Вт.</li><li><b>+3 dB</b> ≈ удвічі більше, <b>−3 dB</b> ≈ удвічі менше.</li><li><b>+10 dB</b> = у 10 разів більше.</li></ul><p>Чутливість приймача — наприклад, −110 dBm: це мільйонні частки мільярдної вата. Отже, передавач на 100 мВт (20 dBm) і приймач на −110 dBm мають «запас» 130 dB на втрати в дорозі.</p>',
          en: '<p>Radio powers differ by billions of times, so they are counted in <b>decibels</b> — logarithms.</p><ul><li><b>dBm</b> is power relative to 1 mW: 0 dBm = 1 mW, 20 dBm = 100 mW, 30 dBm = 1 W.</li><li><b>+3 dB</b> ≈ twice as much, <b>−3 dB</b> ≈ half.</li><li><b>+10 dB</b> = ten times as much.</li></ul><p>Receiver sensitivity is something like −110 dBm — a millionth of a billionth of a watt. So a 100 mW (20 dBm) transmitter and a −110 dBm receiver have a 130 dB “budget” for losses along the way.</p>'
        },
        fig: {
          svg: function (L) {
            var rows = [['−110 dBm', L({ uk: 'чутливість приймача', en: 'receiver sensitivity' })], ['0 dBm', '1 mW'], ['14 dBm', '25 mW'], ['20 dBm', '100 mW'], ['27 dBm', '500 mW'], ['30 dBm', '1 W']];
            var s = '';
            rows.forEach(function (r, i) { var y = 22 + i * 26; s += '<text class="lbl" x="120" y="' + y + '" text-anchor="end">' + r[0] + '</text><text class="txm" x="140" y="' + y + '">' + r[1] + '</text>'; });
            return D.svg(380, 170, s);
          }
        }
      },
      {
        kind: 3,
        title: { uk: 'Котушка + конденсатор = коливальний контур', en: 'Coil + capacitor = an LC circuit' },
        body: {
          uk: '<p>Зарядимо конденсатор і підключимо до котушки. Конденсатор розряджається через котушку, вона накопичує енергію в магнітному полі — і, «за інерцією», перезаряджає конденсатор у зворотний бік. Потім усе навпаки. Енергія гойдається, як маятник, між електричним полем конденсатора і магнітним полем котушки.</p><div class="formula">f = 1 / (2π √(L·C))</div><p>Контур коливається на своїй <b>резонансній частоті</b>. Більше L чи C — нижча частота. Через опір дротів коливання поступово згасають.</p>',
          en: '<p>Charge a capacitor and connect it to a coil. The capacitor discharges through the coil; the coil stores energy in its magnetic field and, by “inertia”, recharges the capacitor the other way. Then the reverse. Energy swings like a pendulum between the capacitor’s electric field and the coil’s magnetic field.</p><div class="formula">f = 1 / (2π √(L·C))</div><p>The circuit oscillates at its <b>resonant frequency</b>. More L or C means a lower frequency. Wire resistance makes the oscillation die away.</p>'
        },
        recall: [{ m: 'm02', s: 's5', label: { uk: 'Конденсатор', en: 'The capacitor' } }, { m: 'm02', s: 's8', label: { uk: 'Котушка', en: 'The coil' } }],
        fig: { anim: 'lc' }
      },
      {
        kind: 3,
        title: { uk: 'Резонанс вибирає одну станцію', en: 'Resonance picks one station' },
        body: {
          uk: '<p>В антену потрапляють усі станції одразу. Але коливальний контур «відгукується» сильно лише на <b>свою</b> частоту — решта майже не проходить. Змінюючи ємність (ручкою конденсатора змінної ємності), ми переносимо резонанс — це і є <b>налаштування</b> приймача.</p><p>Той самий принцип — у кожному фільтрі на радіоплаті: контур пропускає потрібну частоту й «відсікає» сусідні.</p>',
          en: '<p>An antenna picks up every station at once. But an LC circuit responds strongly only to <b>its own</b> frequency — the rest barely pass. Changing the capacitance (with a variable capacitor knob) moves the resonance — that is <b>tuning</b> a receiver.</p><p>The same principle is in every filter on a radio board: the circuit passes the wanted frequency and “cuts off” its neighbours.</p>'
        },
        fig: { anim: 'tuning' }
      },
      {
        kind: 4,
        title: { uk: 'Пристрій: детекторний приймач', en: 'Device: the crystal radio' },
        body: {
          uk: '<p>Найпростіший радіоприймач — без батарейки взагалі:</p><ol><li><b>Антена</b> — довгий дріт — ловить усі хвилі.</li><li><b>Коливальний контур</b> (котушка + змінний конденсатор) вибирає одну станцію.</li><li><b>Діод</b>-детектор пропускає лише <b>верхні половинки</b> кожного коливання. Звук у такій хвилі «записаний» у висоті (амплітуді) коливань — це амплітудна модуляція, AM. Тож після діода лишаються імпульси, висота яких змінюється в такт звуку. Навушники надто повільні, щоб встигати за кожним коливанням, і відтворюють лише цю «обгортку» — звук.</li><li><b>Навушники</b> перетворюють цей слабкий струм на звук.</li></ol><p>Уся енергія — від самої радіохвилі. Деталі ті самі, що ми вже знаємо: котушка, конденсатор, діод. Сучасний приймач робить те саме, тільки підсилює й обробляє сигнал цифрово.</p>',
          en: '<p>The simplest radio receiver needs no battery at all:</p><ol><li>An <b>antenna</b> — a long wire — catches every wave.</li><li>An <b>LC circuit</b> (coil + variable capacitor) picks one station.</li><li>A <b>diode</b> detector passes only the <b>upper halves</b> of each oscillation. The sound is “written” into the height (amplitude) of the oscillations — this is amplitude modulation, AM. So after the diode there are pulses whose height changes in step with the sound. Headphones are far too slow to follow each oscillation and reproduce only this “envelope” — the sound.</li><li><b>Headphones</b> turn this faint current into sound.</li></ol><p>All the energy comes from the radio wave itself. The parts are the ones you know: coil, capacitor, diode. A modern receiver does the same, just amplifying and processing the signal digitally.</p>'
        },
        recall: [{ m: 'm03', s: 's1', label: { uk: 'Діод', en: 'The diode' } }],
        fig: {
          svg: function (L) {
            var s = D.ant(50, 70) + D.w([[50, 70], [50, 80], [130, 80]]) + D.dot(50, 80) + D.w([[50, 80], [50, 100]]) + D.two('ind', 50, 100, 50, 170, { label: 'L', side: 'l' }) + D.w([[50, 170], [50, 190]]);
            s += D.dot(130, 80) + D.w([[130, 80], [130, 100]]) + D.two('cap', 130, 100, 130, 170) + '<line class="st" x1="112" y1="160" x2="150" y2="110"/><polygon class="fl" points="150,110 141,113 147,119"/>' + D.w([[130, 170], [130, 190]]);
            s += D.t(162, 140, 'C', 'lbl', 'start') + D.w([[130, 80], [190, 80]]) + D.two('diode', 190, 80, 250, 80, { label: 'D' }) + D.w([[250, 80], [300, 80], [300, 105]]);
            s += D.two('phones', 300, 105, 300, 165) + D.w([[300, 165], [300, 190], [50, 190]]) + D.gnd(175, 190);
            s += D.t(300, 212, L({ uk: 'навушники', en: 'headphones' }), 'txm', 'middle') + D.t(64, 34, L({ uk: 'антена', en: 'antenna' }), 'txm', 'start');
            return D.svg(380, 225, s);
          },
          cap: { uk: 'Антена → контур LC (налаштування) → діод (детектор) → навушники. Без батарейки.', en: 'Antenna → LC circuit (tuning) → diode (detector) → headphones. No battery.' }
        },
        fig2: {
          svg: function (L) {
            var X0 = 70, W = 300, N = 600, CYC = 30, s = '';
            function env(u) { return 1 + 0.6 * Math.sin(2 * Math.PI * 2 * u); }
            function car(u) { return Math.sin(2 * Math.PI * CYC * u); }
            function path(fn, y0, k) { var p = []; for (var i = 0; i <= N; i++) { var u = i / N; p.push((X0 + u * W).toFixed(1) + ',' + (y0 - fn(u) * k).toFixed(1)); } return p.join(' '); }
            // panel 1: AM wave
            s += '<line class="grid" x1="' + X0 + '" y1="62" x2="' + (X0 + W) + '" y2="62"/>';
            s += '<polyline class="st acc" style="stroke-width:1.3" points="' + path(function (u) { return env(u) * car(u); }, 62, 26) + '"/>';
            s += '<polyline class="st cu" style="stroke-width:1.8;stroke-dasharray:5 4" points="' + path(env, 62, 26) + '"/>';
            // panel 2: after diode
            s += '<line class="grid" x1="' + X0 + '" y1="178" x2="' + (X0 + W) + '" y2="178"/>';
            s += '<polyline class="st acc" style="stroke-width:1.3" points="' + path(function (u) { return Math.max(0, env(u) * car(u)); }, 178, 26) + '"/>';
            s += '<polyline class="st mut" style="stroke-width:1;stroke-dasharray:2 3;opacity:.6" points="' + path(function (u) { return Math.min(0, env(u) * car(u)); }, 178, 26) + '"/>';
            // panel 3: what the headphones follow
            s += '<line class="grid" x1="' + X0 + '" y1="284" x2="' + (X0 + W) + '" y2="284"/>';
            s += '<polyline class="st cu" style="stroke-width:2.6" points="' + path(function (u) { return env(u) / Math.PI; }, 284, 46) + '"/>';
            // labels
            function lab(y, a, b) { return '<text class="lbl" x="4" y="' + y + '" style="font-size:12px">' + L(a) + '</text>' + (b ? '<text class="txm" x="4" y="' + (y + 14) + '">' + L(b) + '</text>' : ''); }
            s += lab(26, { uk: '1', en: '1' }) + lab(142, { uk: '2', en: '2' }) + lab(242, { uk: '3', en: '3' });
            s += '<text class="txm" x="' + (X0 + 4) + '' + '" y="14">' + L({ uk: 'радіохвиля AM: висота коливань = звук', en: 'AM radio wave: oscillation height = sound' }) + '</text>';
            s += '<text class="txm" x="' + (X0 + 4) + '" y="130">' + L({ uk: 'після діода: нижні половинки зрізано', en: 'after the diode: lower halves cut off' }) + '</text>';
            s += '<text class="txm" x="' + (X0 + 4) + '" y="234">' + L({ uk: 'навушники чують лише «обгортку» — звук', en: 'headphones follow only the “envelope” — the sound' }) + '</text>';
            s += D.arrow(30, 96, 30, 132, 'acc') + '<text class="lbl" x="36" y="118" style="font-size:11px">D</text>';
            s += D.arrow(30, 202, 30, 236, 'acc');
            return D.svg(380, 300, s);
          },
          cap: { uk: '1 — частота радіохвилі незмінна, змінюється лише висота коливань (пунктир — «обгортка»). 2 — діод пропускає струм лише в один бік, тож лишаються верхні імпульси. 3 — мембрана навушників не встигає за сотнями тисяч імпульсів на секунду і рухається за їхньою середньою висотою: так висока частота «зникає», а лишається звук.', en: '1 — the radio frequency stays the same; only the height of the oscillations changes (dashed line — the “envelope”). 2 — the diode passes current one way only, so the upper pulses remain. 3 — the headphone membrane cannot keep up with hundreds of thousands of pulses a second and follows their average height: so the high frequency “disappears” and the sound remains.' }
        }
      },
      {
        kind: 1,
        title: { uk: 'Антена: «пружина» для хвиль', en: 'The antenna: a “spring” for waves' },
        body: {
          uk: '<p>Антена — теж резонатор. Найпростіша, <b>диполь</b>, має довжину половину хвилі: два відрізки по чверть хвилі. На кінцях — максимум напруги, у центрі — максимум струму. Неправильна довжина — антена «не в резонансі», і енергія відбивається назад у передавач.</p><p>Як «добре» антена узгоджена, показує <b>КСХН</b> (SWR): 1 — ідеально, до 1,5 — добре, понад 2 — погано.</p><div class="key">Ніколи не вмикаємо передавач без антени: уся потужність повернеться і спалить підсилювач.</div>',
          en: '<p>An antenna is also a resonator. The simplest, the <b>dipole</b>, is half a wavelength long: two quarter-wave halves. The ends have maximum voltage, the centre maximum current. The wrong length means the antenna is “off resonance” and energy reflects back into the transmitter.</p><p>How well an antenna is matched is shown by <b>SWR</b>: 1 is perfect, up to 1.5 is good, above 2 is poor.</p><div class="key">Never power a transmitter without an antenna: all the power comes back and burns the amplifier.</div>'
        },
        fig: { photo: 'r1-167', cap: { uk: 'Полухвильовий диполь: розподіл напруги V(x) і струму I(x).', en: 'A half-wave dipole: voltage V(x) and current I(x) distribution.' } }
      },
      {
        kind: 1,
        title: { uk: 'Форма антени = куди і як вона «світить»', en: 'Antenna shape = where and how it “shines”' },
        body: {
          uk: '<ul><li><b>Всеспрямовані</b> (диполь, «клевер», штир) — випромінюють навколо себе. Ставлять на дрон.</li><li><b>Спрямовані</b> (патч, Yagi, гелікс, логоперіодична) — збирають енергію в промінь. Більше <b>підсилення</b> (dBi) в одному напрямі — і «сліпі» в інших. Ставлять на землі, на пульт, на станції моніторингу й придушення.</li></ul><p><b>Поляризація:</b> лінійна (штир, Yagi) або кругова — права (RHCP) чи ліва (LHCP) (клевер, гелікс). Антени передавача і приймача мають мати <b>однакову</b> поляризацію, інакше втрати можуть сягати 20 dB і більше.</p>',
          en: '<ul><li><b>Omnidirectional</b> (dipole, “cloverleaf”, whip) — radiate all around. Used on the drone.</li><li><b>Directional</b> (patch, Yagi, helix, log-periodic) — focus energy into a beam. More <b>gain</b> (dBi) in one direction, “blind” in others. Used on the ground, on the radio, on monitoring and jamming stations.</li></ul><p><b>Polarisation:</b> linear (whip, Yagi) or circular — right-hand (RHCP) or left-hand (LHCP) (cloverleaf, helix). Transmitter and receiver antennas must have the <b>same</b> polarisation, otherwise losses can reach 20 dB or more.</p>'
        },
        fig: { photo: 'r2-162', cap: { uk: 'Антена «клевер» 5,8 ГГц із роз’ємом SMA — кругова поляризація, стандарт FPV-відео.', en: 'A 5.8 GHz cloverleaf with an SMA connector — circular polarisation, the FPV video standard.' } }
      },
      {
        kind: 2,
        title: { uk: 'Спрямовані антени', en: 'Directional antennas' },
        body: {
          uk: '<p><b>Yagi</b>: один активний елемент і ряд «директорів» попереду — промінь іде вздовж стріли. <b>Логоперіодична</b>: елементи різної довжини — працює в широкому діапазоні частот. Тому її часто ставлять на станції радіомоніторингу і засоби РЕБ: одна антена перекриває кілька діапазонів.</p>',
          en: '<p><b>Yagi</b>: one driven element and a row of “directors” in front — the beam runs along the boom. <b>Log-periodic</b>: elements of different lengths — it works across a wide frequency range. That is why it is common on radio-monitoring stations and EW equipment: one antenna covers several bands.</p>'
        },
        fig: { photo: 'r2-158', cap: { uk: 'Логоперіодична антена.', en: 'A log-periodic antenna.' } }
      },
      {
        kind: 2,
        title: { uk: 'Патч і гелікс', en: 'Patch and helix' },
        body: { uk: '<p>Патч — металева пластина над «землею»; плаский, спрямований. Ґратка з кількох патчів дає ще вужчий промінь.</p>', en: '<p>A patch is a metal plate above a “ground”; flat and directional. An array of patches gives an even narrower beam.</p>' },
        fig: { photo: 'r1-173', cap: { uk: 'Ґратка патч-антен на 2,4 ГГц: видно лінії живлення між елементами.', en: 'A 2.4 GHz patch array: feed lines between the elements are visible.' } }
      },
      {
        kind: 5,
        title: { uk: 'Роз’єми і кабель', en: 'Connectors and cable' },
        body: {
          uk: '<ul><li><b>SMA</b> — різьбовий роз’єм на антенах і передавачах. Пастка: є <b>SMA</b> і <b>RP-SMA</b> — у них штир і гніздо «переставлені». Антена RP-SMA на передавачі SMA не дасть контакту — передавач працює «без антени».</li><li><b>U.FL / IPEX (MHF)</b> — крихітний защіпний роз’єм на платах приймачів і VTX. Тендітний: витримує лише кілька десятків підключень.</li><li><b>Коаксіальний кабель</b>: центральна жила, ізоляція, обплетення-екран, оболонка. Хвильовий опір — 50 Ом.</li></ul>',
          en: '<ul><li><b>SMA</b> — the threaded connector on antennas and transmitters. Trap: there is <b>SMA</b> and <b>RP-SMA</b> — the pin and socket are swapped. An RP-SMA antenna on an SMA transmitter makes no contact — the transmitter runs “without an antenna”.</li><li><b>U.FL / IPEX (MHF)</b> — a tiny snap-on connector on receiver and VTX boards. Fragile: rated for only a few dozen connections.</li><li><b>Coaxial cable</b>: centre conductor, insulation, braided shield, jacket. Characteristic impedance: 50 Ω.</li></ul>'
        },
        fig: { photo: 'r1-186', cap: { uk: 'SMA і RP-SMA: в одного в центрі штир, в іншого — гніздо.', en: 'SMA and RP-SMA: one has a centre pin, the other a socket.' } }
      },
      {
        kind: 5,
        title: { uk: 'U.FL на платі', en: 'U.FL on a board' },
        body: { uk: '<p>Порівнюємо з головкою сірника: ось наскільки він маленький.</p>', en: '<p>Compare it with a match head: that is how small it is.</p>' },
        fig: { photo: 'r1-188' }
      }
    ],
    sources: [
      { t: { uk: 'ARRL Antenna Book (American Radio Relay League) — основи антен', en: 'The ARRL Antenna Book (American Radio Relay League) — antenna fundamentals' } },
      { t: { uk: 'P. Horowitz, W. Hill. The Art of Electronics, 3-тє вид. — розділ 13 (радіочастоти)', en: 'P. Horowitz, W. Hill. The Art of Electronics, 3rd ed. — chapter 13 (RF)' } },
      { t: { uk: 'Документація ExpressLRS — діапазони 900 МГц і 2,4 ГГц', en: 'ExpressLRS documentation — 900 MHz and 2.4 GHz bands' }, url: 'https://www.expresslrs.org/' }
    ],
    quiz: [
      { type: 'calc', see: { m: 'm11', s: 's1' }, gen: function (R, c) {
          var f = R.pick([433, 868, 915, 1200, 2400, 5800]), l = 300 / f * 100;
          var o = c.numOpts(l, [l / 4, l * 10, l / 10], { uk: 'см', en: 'cm' }, 1);
          return { q: { uk: 'Яка довжина хвилі на частоті ' + f + ' МГц?', en: 'What is the wavelength at ' + f + ' MHz?' }, opts: o.opts, a: 0,
            ex: { uk: 'λ = 300 / ' + f + ' = ' + c.fmt(l / 100, 3) + ' м ≈ ' + c.fmt(l, 1) + ' см.', en: 'λ = 300 / ' + f + ' = ' + c.fmt(l / 100, 3) + ' m ≈ ' + c.fmt(l, 1) + ' cm.' } };
        } },
      { q: { uk: 'Що відбувається з розміром антени при вищій частоті?', en: 'What happens to antenna size at a higher frequency?' }, opts: [{ uk: 'Вона стає меншою', en: 'It gets smaller' }, { uk: 'Більшою', en: 'Bigger' }, { uk: 'Не змінюється', en: 'It doesn’t change' }, { uk: 'Антена не потрібна', en: 'No antenna is needed' }], a: 0,
        ex: { uk: 'Вища частота — коротша хвиля — коротша антена.', en: 'Higher frequency — shorter wave — shorter antenna.' }, see: { m: 'm11', s: 's1' } },
      { q: { uk: 'На якій частоті зазвичай працює FPV-відео?', en: 'Which frequency does FPV video usually use?' }, opts: [{ uk: '5,8 ГГц', en: '5.8 GHz' }, { uk: '433 МГц', en: '433 MHz' }, { uk: '1,575 ГГц', en: '1.575 GHz' }, { uk: '50 Гц', en: '50 Hz' }], a: 0,
        ex: { uk: '5,8 ГГц — основний діапазон FPV-відео; 1,2–1,3 ГГц — для дальності.', en: '5.8 GHz is the main FPV video band; 1.2–1.3 GHz for range.' }, see: { m: 'm11', s: 's2' } },
      { q: { uk: 'Чим нижча частота краща для дальнього зв’язку?', en: 'Why is a lower frequency better for long range?' }, opts: [{ uk: 'Краще огинає перешкоди й менше послаблюється', en: 'It bends around obstacles better and is attenuated less' }, { uk: 'Вона швидша', en: 'It is faster' }, { uk: 'Антена менша', en: 'The antenna is smaller' }, { uk: 'Вона не потребує живлення', en: 'It needs no power' }], a: 0,
        ex: { uk: 'Ціна — більша антена і менша швидкість даних.', en: 'The price is a bigger antenna and a lower data rate.' }, see: { m: 'm11', s: 's2' } },
      { type: 'calc', see: { m: 'm11', s: 's3' }, gen: function (R, c) {
          var d = R.pick([0, 10, 14, 20, 23, 27, 30]), mw = dbm2mw(d);
          var o = c.numOpts(mw, [d === 0 ? 2 : d, mw * 10, mw / 10], { uk: 'мВт', en: 'mW' }, null);
          return { q: { uk: 'Скільки міліват це ' + d + ' dBm?', en: 'How many milliwatts is ' + d + ' dBm?' }, opts: o.opts, a: 0,
            ex: { uk: 'P = 10^(dBm/10) = ' + c.fmt(mw, 0) + ' мВт. Опорні точки: 0 dBm = 1 мВт, 20 = 100 мВт, 30 = 1 Вт.', en: 'P = 10^(dBm/10) = ' + c.fmt(mw, 0) + ' mW. Anchors: 0 dBm = 1 mW, 20 = 100 mW, 30 = 1 W.' } };
        } },
      { q: { uk: 'Потужність зросла на 3 dB. У скільки разів?', en: 'Power went up by 3 dB. By what factor?' }, opts: [{ uk: '≈ удвічі', en: '≈ twice' }, { uk: 'У 3 рази', en: '3 times' }, { uk: 'У 10 разів', en: '10 times' }, { uk: 'На 3 %', en: 'By 3%' }], a: 0,
        ex: { uk: '+3 dB ≈ ×2, +10 dB = ×10.', en: '+3 dB ≈ ×2, +10 dB = ×10.' }, see: { m: 'm11', s: 's3' } },
      { q: { uk: 'Що відбувається в коливальному контурі LC?', en: 'What happens in an LC circuit?' }, opts: [{ uk: 'Енергія гойдається між конденсатором і котушкою', en: 'Energy swings between the capacitor and the coil' }, { uk: 'Змінний струм стає постійним', en: 'AC becomes DC' }, { uk: 'Напруга постійно росте', en: 'The voltage keeps rising' }, { uk: 'Нічого — це просто фільтр живлення', en: 'Nothing — it’s just a supply filter' }], a: 0,
        ex: { uk: 'Електричне поле конденсатора ↔ магнітне поле котушки, як маятник.', en: 'Capacitor’s electric field ↔ coil’s magnetic field, like a pendulum.' }, see: { m: 'm11', s: 's4' } },
      { q: { uk: 'Ємність у контурі LC збільшили. Що з резонансною частотою?', en: 'The capacitance in an LC circuit goes up. What happens to the resonant frequency?' }, opts: [{ uk: 'Знижується', en: 'It drops' }, { uk: 'Зростає', en: 'It rises' }, { uk: 'Не змінюється', en: 'It stays' }, { uk: 'Контур перестає коливатися', en: 'It stops oscillating' }], a: 0,
        ex: { uk: 'f = 1 / (2π√LC): більше C — нижча f.', en: 'f = 1 / (2π√LC): more C — lower f.' }, see: { m: 'm11', s: 's4' } },
      { q: { uk: 'Як приймач «вибирає» одну станцію з багатьох?', en: 'How does a receiver “pick” one station from many?' }, opts: [{ uk: 'Коливальний контур резонує лише на своїй частоті', en: 'The LC circuit resonates only at its own frequency' }, { uk: 'Антена ловить лише одну станцію', en: 'The antenna catches only one station' }, { uk: 'Діод відсікає інші', en: 'The diode cuts off the others' }, { uk: 'Навушники фільтрують', en: 'The headphones filter' }], a: 0,
        ex: { uk: 'Налаштування = зсув резонансу контуру на частоту станції.', en: 'Tuning = moving the circuit’s resonance to the station’s frequency.' }, see: { m: 'm11', s: 's5' } },
      { q: { uk: 'Яку роль у детекторному приймачі виконує діод?', en: 'What does the diode do in a crystal radio?' }, opts: [{ uk: 'Детектор: пропускає половину коливань, з яких «виділяється» звук', en: 'Detector: passes half of the oscillations, from which sound emerges' }, { uk: 'Підсилює сигнал', en: 'Amplifies the signal' }, { uk: 'Налаштовує частоту', en: 'Tunes the frequency' }, { uk: 'Живить навушники від батареї', en: 'Powers the headphones from a battery' }], a: 0,
        ex: { uk: 'Діод — та сама деталь, що у випрямлячі: тут він «випрямляє» радіосигнал.', en: 'The diode is the same part as in a rectifier: here it “rectifies” the radio signal.' }, see: { m: 'm11', s: 's6' } },
      { q: { uk: 'Звідки детекторний приймач бере енергію?', en: 'Where does a crystal radio get its energy?' }, opts: [{ uk: 'Із самої радіохвилі', en: 'From the radio wave itself' }, { uk: 'Від батарейки', en: 'From a battery' }, { uk: 'Від розетки', en: 'From a wall socket' }, { uk: 'Від сонячної панелі', en: 'From a solar panel' }], a: 0,
        ex: { uk: 'Батареї немає — уся енергія приходить через антену.', en: 'There is no battery — all energy comes through the antenna.' }, see: { m: 'm11', s: 's6' } },
      { q: { uk: 'Яка довжина полухвильового диполя на 2,4 ГГц?', en: 'How long is a half-wave dipole at 2.4 GHz?' }, opts: [{ uk: '≈6 см', en: '≈6 cm' }, { uk: '≈12,5 см', en: '≈12.5 cm' }, { uk: '≈1 м', en: '≈1 m' }, { uk: '≈3 мм', en: '≈3 mm' }], a: 0,
        ex: { uk: 'λ ≈ 12,5 см, половина — ≈6,25 см (на практиці трохи коротше).', en: 'λ ≈ 12.5 cm, half is ≈6.25 cm (slightly shorter in practice).' }, see: { m: 'm11', s: 's7' } },
      { q: { uk: 'Що буде, якщо ввімкнути відеопередавач без антени?', en: 'What happens if you power a video transmitter with no antenna?' }, opts: [{ uk: 'Потужність відіб’ється назад і може спалити підсилювач', en: 'The power reflects back and can burn the amplifier' }, { uk: 'Нічого, він просто не передаватиме', en: 'Nothing, it just won’t transmit' }, { uk: 'Він передаватиме ще далі', en: 'It will transmit even further' }, { uk: 'Батарея розрядиться повільніше', en: 'The battery lasts longer' }], a: 0,
        ex: { uk: 'Без навантаження енергія повертається в підсилювач — він гріється й згорає.', en: 'With no load the energy returns to the amplifier — it overheats and dies.' }, see: { m: 'm11', s: 's7' } },
      { q: { uk: 'Що показує КСХН (SWR) = 1,2?', en: 'What does SWR = 1.2 tell you?' }, opts: [{ uk: 'Антена добре узгоджена', en: 'The antenna is well matched' }, { uk: 'Антена зламана', en: 'The antenna is broken' }, { uk: 'Потужність 1,2 Вт', en: 'The power is 1.2 W' }, { uk: 'Частота 1,2 ГГц', en: 'The frequency is 1.2 GHz' }], a: 0,
        ex: { uk: '1 — ідеально, до 1,5 — добре, понад 2 — погано.', en: '1 is perfect, up to 1.5 is good, above 2 is poor.' }, see: { m: 'm11', s: 's7' } },
      { q: { uk: 'Яку антену ставлять на станцію, що має дивитися в один бік на великій відстані?', en: 'Which antenna suits a station that must look one way over a long distance?' }, opts: [{ uk: 'Спрямовану (Yagi, патч, гелікс, логоперіодичну)', en: 'A directional one (Yagi, patch, helix, log-periodic)' }, { uk: 'Всеспрямований штир', en: 'An omni whip' }, { uk: 'Будь-яку', en: 'Any' }, { uk: 'Без антени', en: 'No antenna' }], a: 0,
        ex: { uk: 'Спрямована збирає енергію в промінь — більше підсилення в одному напрямі.', en: 'A directional antenna focuses energy into a beam — more gain in one direction.' }, see: { m: 'm11', s: 's8' } },
      { q: { uk: 'Чому логоперіодичні антени популярні на станціях моніторингу і РЕБ?', en: 'Why are log-periodic antennas popular on monitoring and EW stations?' }, opts: [{ uk: 'Одна антена перекриває широкий діапазон частот', en: 'One antenna covers a wide frequency range' }, { uk: 'Вони всеспрямовані', en: 'They are omnidirectional' }, { uk: 'Вони найменші', en: 'They are the smallest' }, { uk: 'Вони не потребують кабелю', en: 'They need no cable' }], a: 0,
        ex: { uk: 'Елементи різної довжини — кожен резонує на своїй частоті.', en: 'Elements of different lengths each resonate at their own frequency.' }, see: { m: 'm11', s: 's9' } },
      { q: { uk: 'На передавачі антена з правою круговою поляризацією (RHCP), на приймачі — з лівою (LHCP). Що буде?', en: 'The transmitter has an RHCP antenna, the receiver an LHCP one. What happens?' }, opts: [{ uk: 'Великі втрати сигналу — поляризації мають збігатися', en: 'Big signal loss — polarisations must match' }, { uk: 'Сигнал посилиться', en: 'The signal gets stronger' }, { uk: 'Нічого не зміниться', en: 'Nothing changes' }, { uk: 'Зміниться частота', en: 'The frequency changes' }], a: 0,
        ex: { uk: 'Невідповідність кругової поляризації — втрати 20 dB і більше.', en: 'Mismatched circular polarisation costs 20 dB or more.' }, see: { m: 'm11', s: 's8' } },
      { q: { uk: 'Чим SMA відрізняється від RP-SMA?', en: 'How does SMA differ from RP-SMA?' }, opts: [{ uk: 'Штир і гніздо в центрі переставлені місцями', en: 'The centre pin and socket are swapped' }, { uk: 'Різьба різного розміру', en: 'Different thread size' }, { uk: 'RP-SMA — для постійного струму', en: 'RP-SMA is for DC' }, { uk: 'Нічим', en: 'Nothing' }], a: 0,
        ex: { uk: 'Зовні однакові, але RP-SMA на SMA не дає контакту центральної жили.', en: 'They look alike, but RP-SMA on SMA leaves the centre conductor unconnected.' }, see: { m: 'm11', s: 's11' } },
      { q: { uk: 'Який хвильовий опір стандартного кабелю й антенних трактів у FPV?', en: 'What is the standard impedance of FPV cables and antenna paths?' }, opts: [{ uk: '50 Ом', en: '50 Ω' }, { uk: '75 Ом', en: '75 Ω' }, { uk: '0 Ом', en: '0 Ω' }, { uk: '1 кОм', en: '1 kΩ' }], a: 0,
        ex: { uk: 'Радіочастотні тракти — 50 Ом (телебачення — 75 Ом).', en: 'RF paths use 50 Ω (television uses 75 Ω).' }, see: { m: 'm11', s: 's11' } }
    ]
  });
})();
