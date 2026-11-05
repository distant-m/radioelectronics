/* anim.js — interactive animations. Each one draws into its container and returns {stop}.
   Text comes in both languages; ctx.L picks the current one. Motion pauses for reduced-motion users until they press play. */
var ANIM = (function () {
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function loop(fn) {
    var id, last = performance.now(), running = true;
    function f(t) { var dt = Math.min(0.05, (t - last) / 1000); last = t; if (running) fn(dt, t / 1000); id = requestAnimationFrame(f); }
    id = requestAnimationFrame(f);
    return { stop: function () { cancelAnimationFrame(id); }, pause: function (p) { running = !p; last = performance.now(); }, get running() { return running; } };
  }
  function U(ctx, uk, en) { return ctx.L({ uk: uk, en: en }); }
  function el(tag, attrs) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function ctl(html) { return '<div class="anim-ctl">' + html + '</div>'; }
  function playBtn(ctx) { return '<button type="button" class="tog" data-play aria-pressed="' + (!RM) + '">' + U(ctx, '⏯ Пауза / запуск', '⏯ Pause / play') + '</button>'; }
  function bindPlay(root, lp) { var b = root.querySelector('[data-play]'); if (!b) return; if (RM) lp.pause(true); b.onclick = function () { var on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); lp.pause(!on); }; }
  // point along a closed polyline at fraction u (0..1)
  function along(pts, u) {
    var segs = [], tot = 0;
    for (var i = 0; i < pts.length - 1; i++) { var dx = pts[i + 1][0] - pts[i][0], dy = pts[i + 1][1] - pts[i][1], l = Math.sqrt(dx * dx + dy * dy); segs.push(l); tot += l; }
    var d = ((u % 1) + 1) % 1 * tot;
    for (i = 0; i < segs.length; i++) { if (d <= segs[i]) { var r = d / segs[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * r, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * r]; } d -= segs[i]; }
    return pts[0];
  }
  function dots(g, n) { var a = []; for (var i = 0; i < n; i++) { var c = el('circle', { r: 4, class: 'dot' }); g.appendChild(c); a.push(c); } return a; }

  // ---------- 1. simple circuit: battery, switch, lamp ----------
  function circuit(root, o, ctx) {
    var loopPts = [[60, 150], [60, 40], [320, 40], [320, 150], [60, 150]];
    root.innerHTML = D.svg(380, 200,
      D.w([[60, 150], [60, 112]]) + D.two('bat', 60, 112, 60, 78, {}) + D.w([[60, 78], [60, 40], [160, 40]]) +
      '<g data-sw></g>' + D.w([[204, 40], [320, 40], [320, 84]]) +
      '<circle data-glow cx="320" cy="100" r="24" class="cuf" opacity="0"/>' + D.two('lamp', 320, 84, 320, 116) + D.w([[320, 116], [320, 150], [60, 150]]) +
      D.t(84, 100, U(ctx, 'батарея', 'battery'), 'txm', 'start') + D.t(182, 24, U(ctx, 'вимикач', 'switch'), 'txm', 'middle') + D.t(360, 104, U(ctx, 'лампа', 'lamp'), 'txm', 'middle') +
      '<g data-dots></g>') +
      ctl('<button type="button" class="tog" data-s aria-pressed="false">' + U(ctx, 'Замкнути вимикач', 'Close the switch') + '</button>' +
          '<button type="button" class="tog" data-e aria-pressed="false">' + U(ctx, 'Показати рух електронів', 'Show electron flow') + '</button>') +
      '<div class="readout" data-r></div>';
    var sw = root.querySelector('[data-sw]'), glow = root.querySelector('[data-glow]'), r = root.querySelector('[data-r]');
    var ds = dots(root.querySelector('[data-dots]'), 16), on = false, elec = false, ph = 0;
    function draw() {
      sw.innerHTML = D.two(on ? 'swClosed' : 'swOpen', 160, 40, 204, 40);
      glow.setAttribute('opacity', on ? 0.35 : 0);
      ds.forEach(function (c) { c.style.display = on ? '' : 'none'; c.setAttribute('class', elec ? 'accf' : 'dot'); });
      r.textContent = on ? (elec ? U(ctx, 'Електрони рухаються від «−» до «+». Домовлений напрям струму — навпаки: від «+» до «−».', 'Electrons move from “−” to “+”. The agreed direction of current is the opposite: from “+” to “−”.')
        : U(ctx, 'Коло замкнене: струм іде від «+» батареї через лампу назад до «−». Лампа світить.', 'The circuit is closed: current flows from battery “+” through the lamp back to “−”. The lamp is lit.'))
        : U(ctx, 'Коло розімкнене: струму немає, лампа не світить.', 'The circuit is open: no current, the lamp is dark.');
    }
    root.querySelector('[data-s]').onclick = function () { on = !on; this.setAttribute('aria-pressed', on); this.textContent = on ? U(ctx, 'Розімкнути вимикач', 'Open the switch') : U(ctx, 'Замкнути вимикач', 'Close the switch'); draw(); };
    root.querySelector('[data-e]').onclick = function () { elec = !elec; this.setAttribute('aria-pressed', elec); draw(); };
    draw();
    // conventional current leaves "+" (top of battery) and goes clockwise: up the left side, along the top, down through the lamp
    var lp = loop(function (dt) { if (!on) return; ph += dt * 0.12 * (elec ? -1 : 1); ds.forEach(function (c, i) { var p = along(loopPts, ph + i / ds.length); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); }); });
    if (RM) lp.pause(true);
    return lp;
  }

  // ---------- 2. Ohm's law ----------
  function ohm(root, o, ctx) {
    var loopPts = [[60, 150], [60, 40], [320, 40], [320, 150], [60, 150]];
    root.innerHTML = D.svg(380, 200,
      D.w([[60, 150], [60, 112]]) + D.two('bat', 60, 112, 60, 78) + D.w([[60, 78], [60, 40], [170, 40]]) + D.two('res', 170, 40, 230, 40) + D.w([[230, 40], [320, 40], [320, 84]]) +
      '<circle data-glow cx="320" cy="100" r="26" class="cuf" opacity="0"/>' + D.two('lamp', 320, 84, 320, 116) + D.w([[320, 116], [320, 150], [60, 150]]) +
      '<text data-u class="lbl" x="84" y="100" text-anchor="start"></text><text data-rr class="lbl" x="200" y="24" text-anchor="middle"></text><g data-dots></g>') +
      ctl('<label>' + U(ctx, 'Напруга U', 'Voltage U') + ' <input type="range" min="1" max="12" step="0.5" value="6" data-v><output data-vo></output></label>' +
          '<label>' + U(ctx, 'Опір R', 'Resistance R') + ' <input type="range" min="2" max="60" step="1" value="12" data-res><output data-ro></output></label>') +
      '<div class="readout" data-r></div>';
    var vI = root.querySelector('[data-v]'), rI = root.querySelector('[data-res]'), glow = root.querySelector('[data-glow]');
    var ds = dots(root.querySelector('[data-dots]'), 16), ph = 0, I = 0;
    var Vu = U(ctx, 'В', 'V'), Ou = U(ctx, 'Ом', 'Ω'), Au = U(ctx, 'А', 'A');
    function upd() {
      var V = +vI.value, R = +rI.value; I = V / R;
      root.querySelector('[data-vo]').textContent = ctx.fmt(V) + ' ' + Vu; root.querySelector('[data-ro]').textContent = R + ' ' + Ou;
      root.querySelector('[data-u]').textContent = ctx.fmt(V) + ' ' + Vu; root.querySelector('[data-rr]').textContent = R + ' ' + Ou;
      glow.setAttribute('opacity', Math.min(0.6, I * 0.5));
      root.querySelector('[data-r]').textContent = 'I = U / R = ' + ctx.fmt(V) + ' / ' + R + ' = ' + ctx.fmt(I, 2) + ' ' + Au + ' · ' + U(ctx, 'більше напруги — більше струму; більше опору — менше струму.', 'more voltage → more current; more resistance → less current.');
    }
    vI.oninput = upd; rI.oninput = upd; upd();
    var lp = loop(function (dt) { ph += dt * Math.min(0.6, I * 0.35); ds.forEach(function (c, i) { var p = along(loopPts, ph + i / ds.length); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); }); });
    if (RM) lp.pause(true);
    return lp;
  }

  // ---------- 3. diode: one-way valve ----------
  function diode(root, o, ctx) {
    var loopPts = [[60, 150], [60, 40], [320, 40], [320, 150], [60, 150]];
    root.innerHTML = D.svg(380, 200,
      '<g data-bat></g>' + D.w([[60, 78], [60, 40], [150, 40]]) + D.two('res', 150, 40, 210, 40, { label: 'R' }) + D.w([[210, 40], [320, 40], [320, 80]]) +
      '<circle data-glow cx="320" cy="98" r="22" class="cuf" opacity="0"/>' + D.two('led', 320, 80, 320, 118) + D.w([[320, 118], [320, 150], [60, 150], [60, 112]]) +
      D.t(352, 102, 'LED', 'lbl', 'start') + '<g data-dots></g>') +
      ctl('<button type="button" class="tog" data-flip aria-pressed="false">' + U(ctx, 'Перевернути батарею', 'Flip the battery') + '</button>') +
      '<div class="readout" data-r></div>';
    var bat = root.querySelector('[data-bat]'), glow = root.querySelector('[data-glow]'), ds = dots(root.querySelector('[data-dots]'), 14), rev = false, ph = 0;
    function draw() {
      bat.innerHTML = rev ? D.two('bat', 60, 78, 60, 112) : D.two('bat', 60, 112, 60, 78);
      glow.setAttribute('opacity', rev ? 0 : 0.45);
      ds.forEach(function (c) { c.style.display = rev ? 'none' : ''; });
      root.querySelector('[data-r]').textContent = rev ? U(ctx, 'Батарею перевернуто: діод закритий, струму немає, світлодіод темний.', 'Battery flipped: the diode is closed, no current, the LED is dark.')
        : U(ctx, 'Прямий напрям: «+» з боку анода (трикутник). Діод відкритий — світлодіод світить.', 'Forward direction: “+” on the anode side (triangle). The diode is open — the LED is lit.');
    }
    root.querySelector('[data-flip]').onclick = function () { rev = !rev; this.setAttribute('aria-pressed', rev); draw(); };
    draw();
    var lp = loop(function (dt) { if (rev) return; ph += dt * 0.12; ds.forEach(function (c, i) { var p = along(loopPts, ph + i / ds.length); c.setAttribute('cx', p[0]); c.setAttribute('cy', p[1]); }); });
    if (RM) lp.pause(true);
    return lp;
  }

  // ---------- 4. capacitor charging and discharging ----------
  function capcharge(root, o, ctx) {
    var W = 380, H = 210;
    root.innerHTML = D.svg(W, H,
      '<g transform="translate(14,10)">' + D.w([[20, 60], [20, 20], [50, 20]]) + D.two('res', 50, 20, 100, 20, { label: 'R' }) + D.w([[100, 20], [130, 20], [130, 44]]) +
      '<g data-c></g>' + D.w([[130, 76], [130, 100], [20, 100], [20, 74]]) + D.two('bat', 20, 74, 20, 46) + '</g>' +
      '<line class="grid" x1="180" y1="30" x2="180" y2="170"/><line class="grid" x1="180" y1="170" x2="370" y2="170"/>' +
      '<text class="txm" x="182" y="24">U<tspan font-size="9">C</tspan></text><text class="txm" x="366" y="186" text-anchor="end">' + U(ctx, 'час', 'time') + '</text>' +
      '<polyline data-p class="st acc" points=""/>') +
      ctl('<button type="button" class="tog" data-ch aria-pressed="false">' + U(ctx, 'Зарядити', 'Charge') + '</button><button type="button" class="tog" data-dc aria-pressed="false">' + U(ctx, 'Розрядити', 'Discharge') + '</button>') +
      '<div class="readout" data-r></div>';
    var c = root.querySelector('[data-c]'), pl = root.querySelector('[data-p]'), r = root.querySelector('[data-r]');
    var u = 0, mode = 0, pts = [], t = 0;
    function drawCap() {
      c.innerHTML = D.two('cap', 130, 44, 130, 76) + '<rect class="cuf" x="' + 112 + '" y="' + (51) + '" width="' + 36 * u + '" height="4" opacity=".7"/>';
    }
    function setMode(m) { mode = m; t = 0; pts = []; root.querySelector('[data-ch]').setAttribute('aria-pressed', m === 1); root.querySelector('[data-dc]').setAttribute('aria-pressed', m === -1); }
    root.querySelector('[data-ch]').onclick = function () { setMode(1); };
    root.querySelector('[data-dc]').onclick = function () { setMode(-1); };
    drawCap();
    r.textContent = U(ctx, 'Конденсатор накопичує заряд: спершу швидко, потім дедалі повільніше. Час залежить від R і C.', 'A capacitor stores charge: fast at first, then slower and slower. The time depends on R and C.');
    var lp = loop(function (dt) {
      if (!mode) return;
      t += dt;
      u += (mode > 0 ? (1 - u) : -u) * dt * 1.2;
      pts.push([180 + Math.min(190, t * 40), 170 - u * 130]);
      if (t * 40 > 190) { mode = 0; root.querySelector('[data-ch]').setAttribute('aria-pressed', false); root.querySelector('[data-dc]').setAttribute('aria-pressed', false); }
      pl.setAttribute('points', pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '));
      drawCap();
    });
    return lp;
  }

  // ---------- 5. rectifier: AC → pulsing DC → smoothed DC ----------
  function rectifier(root, o, ctx) {
    var W = 380, H = 250;
    root.innerHTML = D.svg(W, H,
      '<text class="txm" x="8" y="18">' + U(ctx, 'Вхід: змінний струм (AC)', 'Input: alternating current (AC)') + '</text>' +
      '<line class="grid" x1="8" y1="62" x2="372" y2="62"/><polyline data-in class="st mut" points=""/>' +
      '<text class="txm" x="8" y="128" data-ot></text>' +
      '<line class="grid" x1="8" y1="226" x2="372" y2="226"/><polyline data-raw class="st mut" points="" style="stroke-dasharray:4 4"/><polyline data-out class="st acc" points=""/>' +
      '<text class="txm" x="372" y="242" text-anchor="end">0 ' + U(ctx, 'В', 'V') + '</text>') +
      ctl('<div class="row"><button type="button" class="tog" data-m="half" aria-pressed="false">' + U(ctx, '1 діод', '1 diode') + '</button><button type="button" class="tog" data-m="full" aria-pressed="true">' + U(ctx, 'Міст із 4 діодів', 'Bridge of 4 diodes') + '</button></div>' +
          '<button type="button" class="tog" data-c aria-pressed="false">' + U(ctx, '+ конденсатор', '+ capacitor') + '</button>' + playBtn(ctx)) +
      '<div class="readout" data-r></div>';
    var mode = o.mode || 'full', cap = !!o.cap, ph = 0;
    function txt() {
      root.querySelector('[data-ot]').textContent = cap ? U(ctx, 'Вихід: майже рівна постійна напруга (DC)', 'Output: nearly steady DC') : (mode === 'full' ? U(ctx, 'Вихід: пульсуюча напруга — обидві половини хвилі вгору', 'Output: pulsing voltage — both halves of the wave point up') : U(ctx, 'Вихід: лише верхні половини хвилі', 'Output: only the upper halves of the wave'));
      root.querySelector('[data-r]').textContent = cap ? U(ctx, 'Конденсатор заряджається на вершинах і віддає енергію між ними — «провали» майже зникають.', 'The capacitor charges at the peaks and gives energy back in between — the dips almost disappear.')
        : (mode === 'full' ? U(ctx, 'Міст повертає «нижню» половину хвилі догори. Напрям струму в навантаженні тепер один.', 'The bridge flips the lower half of the wave upward. Current in the load now flows one way.')
          : U(ctx, 'Один діод просто відрізає нижню половину хвилі — половина енергії втрачається.', 'A single diode simply cuts off the lower half — half of the energy is lost.'));
    }
    root.querySelectorAll('[data-m]').forEach(function (b) { b.onclick = function () { mode = b.dataset.m; root.querySelectorAll('[data-m]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); txt(); }; });
    root.querySelector('[data-c]').onclick = function () { cap = !cap; this.setAttribute('aria-pressed', cap); txt(); };
    txt();
    var lp = loop(function (dt) {
      ph += dt * 2.2;
      var pin = [], praw = [], pout = [], v = 0;
      for (var x = 0; x <= 364; x += 3) {
        var a = (x / 364) * 4 * Math.PI + ph, s = Math.sin(a);
        pin.push((8 + x) + ',' + (62 - s * 34).toFixed(1));
        var raw = mode === 'full' ? Math.abs(s) : Math.max(0, s);
        praw.push((8 + x) + ',' + (226 - raw * 70).toFixed(1));
      }
      // smoothed output: simulate RC hold over a longer window so it is stable
      if (cap) {
        var hold = 0;
        for (var k = -120; k <= 364; k += 3) {
          var aa = (k / 364) * 4 * Math.PI + ph, ss = Math.sin(aa), rr = mode === 'full' ? Math.abs(ss) : Math.max(0, ss);
          hold = Math.max(rr, hold * (mode === 'full' ? 0.985 : 0.988));
          if (k >= 0) pout.push((8 + k) + ',' + (226 - hold * 70).toFixed(1));
        }
      }
      root.querySelector('[data-in]').setAttribute('points', pin.join(' '));
      root.querySelector('[data-raw]').setAttribute('points', cap ? praw.join(' ') : '');
      root.querySelector('[data-out]').setAttribute('points', cap ? pout.join(' ') : praw.join(' '));
    });
    bindPlay(root, lp);
    return lp;
  }

  // ---------- 6. voltage divider ----------
  function divider(root, o, ctx) {
    var vin = o.vin || 12;
    root.innerHTML = D.svg(380, 230,
      D.vcc(120, 30, '') + '<text data-vin class="lbl" x="120" y="14" text-anchor="middle"></text>' +
      D.two('res', 120, 30, 120, 100, { label: 'R1', side: 'l' }) + D.w([[120, 100], [120, 120]]) + D.dot(120, 120) +
      D.two('res', 120, 120, 120, 190, { label: 'R2', side: 'l' }) + D.gnd(120, 190) +
      D.w([[120, 120], [250, 120]]) + '<circle class="st" cx="256" cy="120" r="5"/>' + '<text data-vout class="lbl" x="270" y="125" text-anchor="start"></text>' +
      '<text data-r1 class="txm" x="138" y="70" text-anchor="start"></text><text data-r2 class="txm" x="138" y="160" text-anchor="start"></text>') +
      ctl('<label>R1 <input type="range" min="1" max="50" value="' + (o.r1 || 10) + '" data-a><output data-ao></output></label><label>R2 <input type="range" min="1" max="50" value="' + (o.r2 || 10) + '" data-b><output data-bo></output></label>') +
      '<div class="readout" data-r></div>';
    var a = root.querySelector('[data-a]'), b = root.querySelector('[data-b]'), k = U(ctx, 'кОм', 'kΩ'), V = U(ctx, 'В', 'V');
    function upd() {
      var r1 = +a.value, r2 = +b.value, vo = vin * r2 / (r1 + r2);
      root.querySelector('[data-ao]').textContent = r1 + ' ' + k; root.querySelector('[data-bo]').textContent = r2 + ' ' + k;
      root.querySelector('[data-r1]').textContent = r1 + ' ' + k; root.querySelector('[data-r2]').textContent = r2 + ' ' + k;
      root.querySelector('[data-vin]').textContent = ctx.fmt(vin) + ' ' + V; root.querySelector('[data-vout]').textContent = 'Uвих = ' + ctx.fmt(vo, 2) + ' ' + V;
      root.querySelector('[data-r]').textContent = 'Uвих = Uвх × R2 / (R1 + R2) = ' + ctx.fmt(vin) + ' × ' + r2 + ' / ' + (r1 + r2) + ' = ' + ctx.fmt(vo, 2) + ' ' + V;
    }
    a.oninput = upd; b.oninput = upd; upd();
    return { stop: function () {} };
  }

  // ---------- 7. LC circuit: energy swings between capacitor and coil ----------
  function lc(root, o, ctx) {
    root.innerHTML = D.svg(380, 230,
      D.w([[70, 40], [200, 40]]) + D.w([[70, 140], [200, 140]]) +
      D.two('cap', 70, 40, 70, 140) + D.two('ind', 200, 40, 200, 140) +
      '<rect data-e class="cuf" x="52" y="86" width="36" height="8" opacity="0"/>' +
      '<g data-rings></g>' +
      '<text class="txm" x="70" y="164" text-anchor="middle">C</text><text class="txm" x="200" y="164" text-anchor="middle">L</text>' +
      '<line class="grid" x1="250" y1="90" x2="374" y2="90"/><polyline data-v class="st acc" points=""/><polyline data-i class="st cu" points=""/>' +
      '<text class="txm" x="252" y="30">' + U(ctx, 'напруга', 'voltage') + '</text><text class="txm" x="252" y="168" style="fill:var(--copper)">' + U(ctx, 'струм', 'current') + '</text>' +
      '<text data-st class="tx" x="20" y="214"></text>') +
      ctl('<label>C <input type="range" min="1" max="4" step="0.1" value="1" data-c><output data-co></output></label><button type="button" class="tog" data-d aria-pressed="false">' + U(ctx, 'Додати втрати (опір)', 'Add losses (resistance)') + '</button>' + playBtn(ctx)) +
      '<div class="readout" data-r></div>';
    var eRect = root.querySelector('[data-e]'), rings = root.querySelector('[data-rings]'), damp = false, ph = 0, amp = 1, hist = [];
    var cI = root.querySelector('[data-c]');
    function upd() { root.querySelector('[data-co]').textContent = '×' + ctx.fmt(+cI.value, 1); root.querySelector('[data-r]').textContent = U(ctx, 'Більша ємність → повільніші коливання (нижча частота). f = 1 / (2π√LC).', 'Bigger capacitance → slower swings (lower frequency). f = 1 / (2π√LC).'); }
    cI.oninput = upd; upd();
    root.querySelector('[data-d]').onclick = function () { damp = !damp; amp = 1; this.setAttribute('aria-pressed', damp); };
    var lp = loop(function (dt) {
      var w = 2.4 / Math.sqrt(+cI.value);
      ph += dt * w; if (damp) { amp *= Math.exp(-dt * 0.35); if (amp < 0.03) amp = 1; } else amp = 1;
      var v = Math.cos(ph) * amp, i = Math.sin(ph) * amp;
      eRect.setAttribute('opacity', (v * v * 0.8).toFixed(2));
      var n = Math.round(Math.abs(i) * 3), s = '';
      for (var k = 1; k <= n; k++) s += '<ellipse class="st cu" cx="200" cy="90" rx="' + (14 + k * 7) + '" ry="' + (34 + k * 9) + '" opacity="' + (0.8 - k * 0.2) + '"/>';
      rings.innerHTML = s;
      hist.push([v, i]); if (hist.length > 124) hist.shift();
      root.querySelector('[data-v]').setAttribute('points', hist.map(function (h, x) { return (250 + x) + ',' + (90 - h[0] * 50).toFixed(1); }).join(' '));
      root.querySelector('[data-i]').setAttribute('points', hist.map(function (h, x) { return (250 + x) + ',' + (90 - h[1] * 50).toFixed(1); }).join(' '));
      root.querySelector('[data-st]').textContent = Math.abs(v) > Math.abs(i) ? U(ctx, 'Енергія зараз у конденсаторі (електричне поле)', 'Energy is now in the capacitor (electric field)') : U(ctx, 'Енергія зараз у котушці (магнітне поле)', 'Energy is now in the coil (magnetic field)');
    });
    bindPlay(root, lp);
    return lp;
  }

  // ---------- 8. tuning: an LC circuit picks one station ----------
  function tuning(root, o, ctx) {
    var st = [{ f: 0.15, n: 'A' }, { f: 0.32, n: 'B' }, { f: 0.5, n: 'C' }, { f: 0.68, n: 'D' }, { f: 0.86, n: 'E' }];
    root.innerHTML = D.svg(380, 200,
      '<line class="grid" x1="14" y1="160" x2="366" y2="160"/>' +
      st.map(function (s, i) { var x = 14 + s.f * 352; return '<g data-s="' + i + '"><line class="st" x1="' + x + '" y1="160" x2="' + x + '" y2="70" style="stroke-width:5"/><text class="lbl" x="' + x + '" y="60" text-anchor="middle">' + s.n + '</text></g>'; }).join('') +
      '<path data-bell class="st acc" d=""/><text class="txm" x="14" y="186">' + U(ctx, 'частота →', 'frequency →') + '</text>') +
      ctl('<label>' + U(ctx, 'Ручка налаштування (ємність C)', 'Tuning knob (capacitance C)') + ' <input type="range" min="0.05" max="0.95" step="0.005" value="0.4" data-t></label>') +
      '<div class="readout" data-r></div>';
    var t = root.querySelector('[data-t]');
    function upd() {
      var f0 = +t.value, d = 'M14,160';
      for (var x = 0; x <= 352; x += 4) { var u = x / 352, g = Math.exp(-Math.pow((u - f0) / 0.045, 2)); d += ' L' + (14 + x) + ',' + (160 - g * 110).toFixed(1); }
      root.querySelector('[data-bell]').setAttribute('d', d);
      var best = null;
      st.forEach(function (s, i) { var g = Math.exp(-Math.pow((s.f - f0) / 0.045, 2)); root.querySelector('[data-s="' + i + '"]').setAttribute('opacity', (0.18 + 0.82 * g).toFixed(2)); if (g > 0.5) best = s; });
      root.querySelector('[data-r]').textContent = best ? U(ctx, 'Чути станцію ' + best.n + ': контур резонує на її частоті, інші майже не проходять.', 'You hear station ' + best.n + ': the circuit resonates at its frequency, the others barely pass.')
        : U(ctx, 'Між станціями — тиша. Крутимо ручку: змінюється ємність, а з нею — частота резонансу.', 'Silence between stations. Turn the knob: the capacitance changes, and with it the resonant frequency.');
    }
    t.oninput = upd; upd();
    return { stop: function () {} };
  }

  // ---------- 9. MOSFET as a switch ----------
  function mosfet(root, o, ctx) {
    root.innerHTML = D.svg(380, 230,
      D.vcc(220, 30, '+12 ' + U(ctx, 'В', 'V')) + D.w([[220, 30], [220, 50]]) + '<g data-mot></g>' + D.w([[220, 100], [220, 122]]) +
      D.nmos(210, 150, { pins: true }) + D.w([[220, 178], [220, 196]]) + D.gnd(220, 196) +
      D.w([[184, 150], [136, 150]]) + '<g data-sw></g>' + D.w([[96, 150], [60, 150], [60, 160]]) +
      D.two('bat', 60, 160, 60, 192) + D.w([[60, 192], [60, 196]]) + D.gnd(60, 196) +
      D.t(40, 181, '5 ' + U(ctx, 'В', 'V'), 'lbl', 'end') + D.t(60, 132, U(ctx, 'керування', 'control'), 'txm', 'middle') +
      '<text data-g class="lbl" x="160" y="176" text-anchor="middle"></text>') +
      ctl('<button type="button" class="tog" data-g aria-pressed="false">' + U(ctx, 'Подати 5 В на затвор', 'Apply 5 V to the gate') + '</button>') +
      '<div class="readout" data-r></div>';
    var on = false, ang = 0, mot = root.querySelector('[data-mot]'), g = root.querySelector('text[data-g]');
    function draw() {
      g.textContent = 'U(GS) = ' + (on ? '5 ' : '0 ') + U(ctx, 'В', 'V');
      root.querySelector('[data-sw]').innerHTML = D.two(on ? 'swClosed' : 'swOpen', 96, 150, 136, 150);
      root.querySelector('[data-r]').textContent = (on ? U(ctx, 'На затворі 5 В: канал відкритий, струм іде через двигун — він крутиться.', '5 V on the gate: the channel is open, current flows through the motor — it spins.') : U(ctx, 'На затворі 0 В: транзистор закритий, двигун стоїть. Маленька напруга керує великим струмом.', '0 V on the gate: the transistor is off, the motor stands still. A small voltage controls a big current.')) + ' ' + U(ctx, 'Мінус джерела 5\u00a0В з’єднаний із землею, як і виток (S), тож напруга затвора відраховується відносно витоку.', 'The minus of the 5 V source goes to ground, like the source (S), so the gate voltage is counted relative to the source.');
    }
    root.querySelector('button[data-g]').onclick = function () { on = !on; this.setAttribute('aria-pressed', on); this.textContent = on ? U(ctx, 'Зняти напругу із затвора', 'Remove gate voltage') : U(ctx, 'Подати 5 В на затвор', 'Apply 5 V to the gate'); draw(); };
    draw();
    var lp = loop(function (dt) {
      if (on) ang += dt * 540;
      mot.innerHTML = '<circle class="st" cx="220" cy="75" r="22"/><g transform="rotate(' + ang.toFixed(0) + ' 220 75)"><line class="st cu" x1="206" y1="75" x2="234" y2="75" style="stroke-width:4"/></g><text class="lbl" x="252" y="80">M</text>';
    });
    return lp;
  }

  // ---------- 10. PWM ----------
  function pwm(root, o, ctx) {
    root.innerHTML = D.svg(380, 200,
      '<line class="grid" x1="10" y1="140" x2="250" y2="140"/><polyline data-w class="st acc" points=""/><line data-avg class="st cu" x1="10" x2="250" y1="0" y2="0" style="stroke-dasharray:6 4"/>' +
      '<text class="txm" x="12" y="24">' + U(ctx, 'імпульси', 'pulses') + '</text><text class="txm" x="12" y="160" style="fill:var(--copper)">' + U(ctx, '— середня напруга', '— average voltage') + '</text>' +
      '<circle class="st" cx="320" cy="90" r="34"/><g data-rot><line class="st cu" x1="296" y1="90" x2="344" y2="90" style="stroke-width:5"/></g><text class="lbl" x="320" y="146" text-anchor="middle">M</text>') +
      ctl('<label>' + U(ctx, 'Заповнення', 'Duty cycle') + ' <input type="range" min="0" max="100" value="40" data-d><output data-o></output></label>') +
      '<div class="readout" data-r></div>';
    var d = root.querySelector('[data-d]'), ang = 0;
    function upd() {
      var D_ = +d.value / 100, pts = [], per = 60;
      for (var p = 0; p < 4; p++) { var x0 = 10 + p * per, x1 = x0 + per * D_; pts.push([x0, 140], [x0, D_ > 0 ? 40 : 140], [x1, D_ > 0 ? 40 : 140], [x1, 140], [x0 + per, 140]); }
      root.querySelector('[data-w]').setAttribute('points', pts.map(function (q) { return q[0].toFixed(1) + ',' + q[1]; }).join(' '));
      var y = 140 - 100 * D_; var a = root.querySelector('[data-avg]'); a.setAttribute('y1', y); a.setAttribute('y2', y);
      root.querySelector('[data-o]').textContent = d.value + ' %';
      root.querySelector('[data-r]').textContent = U(ctx, 'Ключ вмикається й вимикається тисячі разів на секунду. Середня напруга = ' + d.value + ' % від повної — так регулюють швидкість двигуна.', 'The switch turns on and off thousands of times per second. Average voltage = ' + d.value + ' % of full — that is how motor speed is controlled.');
    }
    d.oninput = upd; upd();
    var lp = loop(function (dt) { ang += dt * 720 * (+d.value / 100); root.querySelector('[data-rot]').setAttribute('transform', 'rotate(' + ang.toFixed(0) + ' 320 90)'); });
    return lp;
  }

  // ---------- 11. buck converter ----------
  function buck(root, o, ctx) {
    var vin = o.vin || 16;
    root.innerHTML = D.svg(380, 250,
      D.t(20, 24, '+' + ctx.fmt(vin) + ' ' + U(ctx, 'В', 'V'), 'lbl', 'start') + D.w([[30, 40], [60, 40]]) + '<g data-sw></g>' + D.w([[110, 40], [140, 40]]) + D.dot(140, 40) +
      D.two('ind', 140, 40, 230, 40, { label: 'L' }) + D.w([[230, 40], [270, 40]]) + D.dot(270, 40) + D.w([[270, 40], [296, 40]]) + '<circle class="st" cx="302" cy="40" r="5"/>' +
      D.two('diode', 140, 110, 140, 40) + D.w([[140, 110], [140, 120]]) + D.dot(140, 120) +
      D.two('ecap', 270, 40, 270, 110, { label: 'C' }) + D.w([[270, 110], [270, 120]]) + D.dot(270, 120) + D.w([[30, 120], [302, 120]]) + '<circle class="st" cx="302" cy="120" r="5"/>' + D.gnd(200, 120) +
      '<text data-vo class="lbl" x="312" y="45" text-anchor="start"></text>' +
      '<line class="grid" x1="20" y1="230" x2="360" y2="230"/><polyline data-il class="st cu" points=""/><text class="txm" x="22" y="170" style="fill:var(--copper)">' + U(ctx, 'струм котушки', 'coil current') + '</text>') +
      ctl('<label>' + U(ctx, 'Заповнення D', 'Duty cycle D') + ' <input type="range" min="10" max="90" value="31" data-d><output data-o></output></label>' + playBtn(ctx)) +
      '<div class="readout" data-r></div>';
    var d = root.querySelector('[data-d]'), sw = root.querySelector('[data-sw]'), t = 0, hist = [];
    function upd() {
      var D_ = +d.value / 100, vo = vin * D_;
      root.querySelector('[data-o]').textContent = d.value + ' %';
      root.querySelector('[data-vo]').textContent = ctx.fmt(vo, 1) + ' ' + U(ctx, 'В', 'V');
      root.querySelector('[data-r]').textContent = 'Uвих ≈ D × Uвх = ' + ctx.fmt(D_, 2) + ' × ' + ctx.fmt(vin) + ' ≈ ' + ctx.fmt(vo, 1) + ' ' + U(ctx, 'В', 'V') + ' · ' + U(ctx, 'ключ увімкнено — котушка набирає струм; вимкнено — віддає його через діод.', 'switch on — the coil builds up current; off — it releases it through the diode.');
    }
    d.oninput = upd; upd();
    var lp = loop(function (dt) {
      t += dt * 0.8; var D_ = +d.value / 100, ph = t % 1, on = ph < D_;
      sw.innerHTML = D.two(on ? 'swClosed' : 'swOpen', 60, 40, 110, 40, { cls: on ? 'acc' : '' });
      var last = hist.length ? hist[hist.length - 1] : 0.5, slope = on ? (1 - D_) : -D_;
      var v = last + slope * dt * 2.4; v = Math.max(0.05, Math.min(0.95, v)); hist.push(v); if (hist.length > 170) hist.shift();
      root.querySelector('[data-il]').setAttribute('points', hist.map(function (h, x) { return (20 + x * 2) + ',' + (230 - h * 50).toFixed(1); }).join(' '));
    });
    bindPlay(root, lp);
    return lp;
  }

  // ---------- boost converter: the coil's push adds on top of the input ----------
  function boost(root, o, ctx) {
    var vin = o.vin || 5, V = U(ctx, 'В', 'V');
    root.innerHTML = D.svg(380, 250,
      '<polyline data-pon class="st cu" points="30,40 150,40 150,120 30,120" style="stroke-width:9;opacity:0"/>' +
      '<polyline data-poff class="st cu" points="30,40 270,40 270,120 30,120" style="stroke-width:9;opacity:0"/>' +
      D.t(20, 24, '+' + ctx.fmt(vin) + ' ' + V, 'lbl', 'start') + '<circle class="st" cx="24" cy="40" r="5"/><circle class="st" cx="24" cy="120" r="5"/>' +
      D.w([[29, 40], [60, 40]]) + D.two('ind', 60, 40, 150, 40, { label: 'L' }) + D.dot(150, 40) +
      D.two('diode', 150, 40, 220, 40) + D.w([[220, 40], [270, 40]]) + D.dot(270, 40) + D.w([[270, 40], [296, 40]]) + '<circle class="st" cx="302" cy="40" r="5"/>' +
      D.w([[150, 40], [150, 62]]) + '<g data-sw></g>' + D.w([[150, 102], [150, 120]]) + D.dot(150, 120) +
      '<text class="txm" x="160" y="86">' + U(ctx, 'ключ', 'switch') + '</text>' +
      D.two('ecap', 270, 40, 270, 110, { label: 'C' }) + D.w([[270, 110], [270, 120]]) + D.dot(270, 120) +
      D.w([[29, 120], [296, 120]]) + '<circle class="st" cx="302" cy="120" r="5"/>' + D.gnd(210, 120) +
      '<text data-vo class="lbl" x="312" y="45" text-anchor="start"></text>' +
      '<line class="grid" x1="20" y1="230" x2="360" y2="230"/><polyline data-il class="st cu" points=""/><text class="txm" x="22" y="170" style="fill:var(--copper)">' + U(ctx, 'струм котушки', 'coil current') + '</text>') +
      ctl('<label>' + U(ctx, 'Заповнення D', 'Duty cycle D') + ' <input type="range" min="10" max="75" value="26" data-d><output data-o></output></label>' + playBtn(ctx)) +
      '<div class="readout" data-r></div>';
    var d = root.querySelector('[data-d]'), sw = root.querySelector('[data-sw]'), t = 0, hist = [];
    var pon = root.querySelector('[data-pon]'), poff = root.querySelector('[data-poff]');
    function upd() {
      var D_ = +d.value / 100, vo = vin / (1 - D_);
      root.querySelector('[data-o]').textContent = d.value + ' %';
      root.querySelector('[data-vo]').textContent = ctx.fmt(vo, 1) + ' ' + V;
      root.querySelector('[data-r]').textContent = U(ctx, 'Uвих ≈ Uвх / (1 − D) = ', 'Uout ≈ Uin / (1 − D) = ') + ctx.fmt(vin) + ' / (1 − ' + ctx.fmt(D_, 2) + ') ≈ ' + ctx.fmt(vo, 1) + ' ' + V + '. ' +
        U(ctx, 'Ключ увімкнено — струм іде від входу через котушку в землю, котушка набирає енергію, а вихід тим часом живиться від конденсатора. Ключ вимкнено — котушка «штовхає» струм далі, її напруга додається до вхідної, і струм через діод заряджає конденсатор до вищої напруги.',
          'Switch on — current flows from the input through the coil to ground, the coil stores energy, and the capacitor feeds the output meanwhile. Switch off — the coil “pushes” the current on, its voltage adds to the input, and the current charges the capacitor through the diode to a higher voltage.');
    }
    d.oninput = upd; upd();
    var lp = loop(function (dt) {
      t += dt * 0.5; var D_ = +d.value / 100, ph = t % 1, on = ph < D_;
      sw.innerHTML = D.two(on ? 'swClosed' : 'swOpen', 150, 62, 150, 102, { cls: on ? 'acc' : '' });
      pon.style.opacity = on ? 0.35 : 0; poff.style.opacity = on ? 0 : 0.35;
      var last = hist.length ? hist[hist.length - 1] : 0.5, slope = on ? (1 - D_) : -D_;
      var v = last + slope * dt * 1.5; v = Math.max(0.05, Math.min(0.95, v)); hist.push(v); if (hist.length > 170) hist.shift();
      root.querySelector('[data-il]').setAttribute('points', hist.map(function (h, x) { return (20 + x * 2) + ',' + (230 - h * 50).toFixed(1); }).join(' '));
    });
    bindPlay(root, lp);
    return lp;
  }

  // ---------- MEMS gyro: a vibrating frame pushed sideways by the Coriolis force ----------
  function memsgyro(root, o, ctx) {
    var DS = U(ctx, '°/с', '°/s');
    root.innerHTML = D.svg(380, 250,
      // classic gyroscope (left)
      D.t(85, 16, U(ctx, 'класичний', 'classic'), 'lbl') +
      '<ellipse class="st mut" cx="85" cy="100" rx="62" ry="62"/><ellipse class="st mut" cx="85" cy="100" rx="22" ry="62"/>' +
      '<line class="st" x1="85" y1="30" x2="85" y2="170"/><g data-wheel></g>' +
      '<text class="txm" x="85" y="192" text-anchor="middle">' + U(ctx, 'дзиґа крутиться', 'a spinning wheel') + '</text>' +
      '<text class="txm" x="85" y="207" text-anchor="middle">' + U(ctx, 'і тримає площину', 'holds its plane') + '</text>' +
      '<line class="grid" x1="178" y1="10" x2="178" y2="215"/>' +
      // MEMS (right)
      D.t(282, 16, 'MEMS', 'lbl') +
      '<g data-chip><rect class="st" x="206" y="30" width="152" height="142" rx="8"/>' +
      // fixed comb fingers top and bottom
      '<g class="mut">' + [0, 1, 2, 3, 4, 5].map(function (i) { var x = 236 + i * 18; return '<line class="st mut" x1="' + x + '" y1="40" x2="' + x + '" y2="62"/><line class="st mut" x1="' + x + '" y1="140" x2="' + x + '" y2="162"/>'; }).join('') + '</g>' +
      // springs left/right
      '<path class="st mut" d="M214,101 l6,-6 l6,12 l6,-12 l6,12 l6,-6"/><path class="st mut" d="M350,101 l-6,-6 l-6,12 l-6,-12 l-6,12 l-6,-6"/>' +
      '<polyline data-trail class="st acc" points="" style="stroke-width:1.2;opacity:.6"/>' +
      '<g data-mass><rect class="cuf" x="-36" y="-26" width="72" height="52" rx="4" style="opacity:.9"/>' +
      [0, 1, 2, 3].map(function (i) { var x = -27 + i * 18; return '<line class="st cu" x1="' + x + '" y1="-26" x2="' + x + '" y2="-36"/><line class="st cu" x1="' + x + '" y1="26" x2="' + x + '" y2="36"/>'; }).join('') +
      '</g></g>' +
      '<g data-rotarrow style="opacity:0"><path class="st acc" d="M340,24 A90,90 0 0,1 368,60"/><polygon class="accf" points="372,68 362,58 373,55"/></g>' +
      '<text data-rate class="lbl" x="282" y="196" text-anchor="middle"></text>' +
      '<text class="txm" x="282" y="211" text-anchor="middle">' + U(ctx, 'рамка коливається', 'the frame vibrates') + '</text>' +
      '<line class="grid" x1="10" y1="222" x2="370" y2="222"/>' +
      '<text data-cap class="txm" x="190" y="242" text-anchor="middle"></text>') +
      ctl('<label>' + U(ctx, 'Поворот плати', 'Board rotation') + ' <input type="range" min="-300" max="300" step="10" value="0" data-w><output data-wo></output></label>' + playBtn(ctx)) +
      '<div class="readout" data-r></div>';
    var w = root.querySelector('[data-w]'), t = 0, chipAng = 0, wheelAng = 0, trail = [];
    var mass = root.querySelector('[data-mass]'), chip = root.querySelector('[data-chip]'), wheel = root.querySelector('[data-wheel]'), tr = root.querySelector('[data-trail]');
    function txt() {
      var r = +w.value;
      root.querySelector('[data-wo]').textContent = r + ' ' + DS;
      root.querySelector('[data-rate]').textContent = U(ctx, 'датчик: ', 'sensor: ') + r + ' ' + DS;
      root.querySelector('[data-cap]').textContent = r === 0 ? U(ctx, 'плата нерухома — рамка ходить лише вліво-вправо', 'board still — the frame moves only left and right') : U(ctx, 'плата повертається — Коріоліс зсуває рамку вгору-вниз', 'board turning — Coriolis pushes the frame up and down');
      root.querySelector('[data-r]').textContent = U(ctx,
        'У MEMS-гіроскопі нічого не крутиться. Пружини тримають рамку, і вона безперервно коливається вліво-вправо. Коли плата повертається, сила Коріоліса зсуває рамку вгору-вниз — тим сильніше, що швидший поворот. Гребінчасті пластинки (конденсатори) вимірюють цей зсув, і датчик видає швидкість повороту в градусах за секунду. Він не «тримає» напрям, як дзиґа, а лише каже, як швидко плата обертається.',
        'Nothing spins in a MEMS gyro. Springs hold a frame that vibrates left and right all the time. When the board turns, the Coriolis force pushes the frame up and down — the faster the turn, the bigger the push. Comb-shaped plates (capacitors) measure that shift, and the sensor reports the rotation rate in degrees per second. It does not “hold” a direction like a spinning wheel; it only tells how fast the board is turning.');
    }
    w.oninput = txt; txt();
    var lp = loop(function (dt) {
      t += dt; var r = +w.value, ph = t * 2 * Math.PI * 1.2;
      var x = 26 * Math.sin(ph), y = -(r / 300) * 14 * Math.cos(ph);
      mass.setAttribute('transform', 'translate(' + (282 + x).toFixed(1) + ',' + (101 + y).toFixed(1) + ')');
      trail.push((282 + x).toFixed(1) + ',' + (101 + y).toFixed(1)); if (trail.length > 70) trail.shift();
      tr.setAttribute('points', trail.join(' '));
      var ra = root.querySelector('[data-rotarrow]'); ra.style.opacity = r === 0 ? 0 : Math.min(1, 0.35 + Math.abs(r) / 300); ra.setAttribute('transform', r < 0 ? 'translate(564,0) scale(-1,1)' : '');
      wheelAng += dt * 6; var s = '';
      for (var k = 0; k < 4; k++) { var a = wheelAng + k * Math.PI / 4, dx = 44 * Math.cos(a); s += '<line class="st cu" x1="' + (85 - dx).toFixed(1) + '" y1="' + (100 + 9 * Math.sin(a)).toFixed(1) + '" x2="' + (85 + dx).toFixed(1) + '" y2="' + (100 - 9 * Math.sin(a)).toFixed(1) + '" style="opacity:.55"/>'; }
      wheel.innerHTML = '<ellipse class="st cu" cx="85" cy="100" rx="44" ry="12"/>' + s;
    });
    bindPlay(root, lp);
    return lp;
  }

  // ---------- six questions on a real board: tap the answer, see an arrow and a label ----------
  function six(root, o, ctx) {
    var Q6 = [
      { uk: 'Звідки живлення?', en: 'Where does power come in?' },
      { uk: 'Як живлення ділиться?', en: 'How is power split?' },
      { uk: 'Де «мозок»?', en: 'Where is the brain?' },
      { uk: 'Як плата говорить зі світом?', en: 'How does the board talk to the world?' },
      { uk: 'Чи є радіо?', en: 'Is there radio?' },
      { uk: 'Чи є силова частина?', en: 'Is there a power stage?' }
    ];
    var L = ctx.L, c = (window.CREDITS || {})[o.photo] || { w: 720, h: 540 }, W = c.w, H = c.h, k = W / 100, kh = H / 100;
    var HOT = {}; (o.hot || []).forEach(function (h) { HOT[h.id] = h; });
    var steps = o.steps, i = 0, done = false;
    root.innerHTML = '<div class="photo six-photo" style="position:relative"><img src="img/' + o.photo + '.webp" width="' + W + '" height="' + H + '" alt="" style="display:block;width:100%;height:auto">' +
      '<svg class="six-ov" viewBox="0 0 ' + W + ' ' + H + '" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none"></svg></div>' +
      '<div class="six-card"><div class="six-n small muted"></div><div class="six-q"></div><div class="six-h small muted"></div><div class="six-btns"></div><div class="six-fb"></div></div>';
    var img = root.querySelector('.six-photo'), ov = root.querySelector('.six-ov');
    var qn = root.querySelector('.six-n'), qq = root.querySelector('.six-q'), qh = root.querySelector('.six-h'), qb = root.querySelector('.six-btns'), fb = root.querySelector('.six-fb');
    var FS = Math.max(13, Math.round(W / 30)), cur = [], past = {};
    function label(id) {
      var h = HOT[id]; if (!h) return '';
      var p = h.p, x = p[0] * k, y = p[1] * kh, w = p[2] * k, hh = p[3] * kh, cx = x + w / 2, cy = y + hh / 2;
      var t = L(h.label), tw = t.length * FS * 0.56 + FS, th = FS * 1.7;
      var lx = (h.lp ? h.lp[0] : (cx > W / 2 ? p[0] - 6 : p[0] + p[2] + 6)) * k, ly = (h.lp ? h.lp[1] : p[1] - 6) * kh;
      lx = Math.max(4, Math.min(W - tw - 4, lx - (h.lp ? tw / 2 : (cx > W / 2 ? tw : 0)))); ly = Math.max(4, Math.min(H - th - 4, ly - th / 2));
      var ax = lx + tw / 2, ay = ly + th / 2, dx = cx - ax, dy = cy - ay, d = Math.sqrt(dx * dx + dy * dy) || 1;
      var ex = cx - dx / d * Math.min(w, hh) * 0.45, ey = cy - dy / d * Math.min(w, hh) * 0.45;
      var sx = ax + dx / d * Math.min(tw, th) * 0.5, sy = ay + dy / d * Math.min(tw, th) * 0.5;
      var a = Math.atan2(ey - sy, ex - sx), hs = FS * 0.7;
      var col = h.no ? '#d24a3a' : '#e8a35c';
      return '<g><line x1="' + sx.toFixed(1) + '" y1="' + sy.toFixed(1) + '" x2="' + ex.toFixed(1) + '" y2="' + ey.toFixed(1) + '" stroke="' + col + '" stroke-width="' + (FS / 5).toFixed(1) + '" stroke-linecap="round"/>' +
        '<polygon fill="' + col + '" points="' + ex.toFixed(1) + ',' + ey.toFixed(1) + ' ' + (ex - hs * Math.cos(a - 0.45)).toFixed(1) + ',' + (ey - hs * Math.sin(a - 0.45)).toFixed(1) + ' ' + (ex - hs * Math.cos(a + 0.45)).toFixed(1) + ',' + (ey - hs * Math.sin(a + 0.45)).toFixed(1) + '"/>' +
        '<rect x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" width="' + tw.toFixed(1) + '" height="' + th.toFixed(1) + '" rx="' + (FS / 3).toFixed(1) + '" fill="#13201a" fill-opacity=".9" stroke="' + col + '" stroke-width="' + (FS / 8).toFixed(1) + '"/>' +
        '<text x="' + (lx + tw / 2).toFixed(1) + '" y="' + (ly + th * 0.68).toFixed(1) + '" text-anchor="middle" fill="#fff" style="font:600 ' + FS + 'px var(--sans)">' + t.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</text></g>';
    }
    function dot(id) {
      var h = HOT[id], p = h.p, cx = (p[0] + p[2] / 2) * k, cy = (p[1] + p[3] / 2) * kh, r = FS * 0.75;
      return '<g><circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#e8a35c" stroke="#13201a" stroke-width="' + (FS / 8).toFixed(1) + '"/><text x="' + cx.toFixed(1) + '" y="' + (cy + FS * 0.36).toFixed(1) + '" text-anchor="middle" fill="#13201a" style="font:700 ' + FS + 'px var(--sans)">' + past[id] + '</text></g>';
    }
    function drawOv() { ov.innerHTML = Object.keys(past).filter(function (id) { return cur.indexOf(id) < 0; }).map(dot).join('') + cur.map(label).join(''); }
    function btn(t, cls) { return '<button type="button" class="tog ' + (cls || '') + '">' + t + '</button>'; }
    function fbk(html, ok) { fb.innerHTML = '<div class="six-msg ' + (ok ? 'ok' : 'bad') + '">' + html + '</div>'; }
    function solved() {
      var s = steps[i]; cur = (s.a || []).concat(s.show || []); cur.forEach(function (id) { if (!past[id]) past[id] = s.q; }); drawOv();
      fbk('<b>' + L({ uk: 'Так.', en: 'Yes.' }) + '</b> ' + L(s.note), true);
      qb.innerHTML = btn(i < steps.length - 1 ? L({ uk: 'Наступне питання →', en: 'Next question →' }) : L({ uk: 'Висновок →', en: 'Conclusion →' }), 'six-next');
      qb.querySelector('.six-next').onclick = function () { i++; render(); };
    }
    function render() {
      fb.innerHTML = ''; cur = []; drawOv();
      if (i >= steps.length) return final();
      var s = steps[i];
      qn.textContent = L({ uk: 'Питання ', en: 'Question ' }) + (i + 1) + L({ uk: ' з 6', en: ' of 6' });
      qq.innerHTML = '<b>' + L(Q6[s.q - 1]) + '</b>';
      qh.textContent = L({ uk: 'Торкаємося відповіді на фото — або «Немає на цій платі».', en: 'Tap the answer on the photo — or “Not on this board”.' });
      qb.innerHTML = btn(L({ uk: 'Немає на цій платі', en: 'Not on this board' }), 'six-none') + btn(L({ uk: 'Показати відповідь', en: 'Show the answer' }), 'six-show');
      qb.querySelector('.six-none').onclick = function () { if (!s.a || !s.a.length) solved(); else fbk(L({ uk: 'Є! Шукаємо ще раз уважніше.', en: 'It is there! Look again more carefully.' }), false); };
      qb.querySelector('.six-show').onclick = solved;
    }
    function final() {
      qn.textContent = L({ uk: 'Висновок', en: 'Conclusion' });
      qq.innerHTML = '<b>' + L({ uk: 'Що це за пристрій?', en: 'What is this device?' }) + '</b>';
      var leg = {}; Object.keys(past).forEach(function (id) { (leg[past[id]] = leg[past[id]] || []).push(L(HOT[id].label)); });
      qh.innerHTML = Object.keys(leg).length ? '<div class="six-leg">' + Object.keys(leg).sort().map(function (n) { return '<div><span class="six-num">' + n + '</span>' + leg[n].join(', ') + '</div>'; }).join('') + '</div>' : '';
      var opts = o.kinds.map(function (t, j) { return { t: t, j: j }; });
      for (var a = opts.length - 1; a > 0; a--) { var b = Math.floor(Math.random() * (a + 1)); var tmp = opts[a]; opts[a] = opts[b]; opts[b] = tmp; }
      qb.innerHTML = '<div class="opts">' + opts.map(function (x) { return '<button type="button" class="opt" data-j="' + x.j + '">' + L(x.t) + '</button>'; }).join('') + '</div>';
      Array.prototype.forEach.call(qb.querySelectorAll('.opt'), function (b) {
        b.onclick = function () {
          var ok = +b.dataset.j === 0;
          b.classList.add(ok ? 'right' : 'wrong');
          if (ok) { fbk('<b>' + L({ uk: 'Так!', en: 'Yes!' }) + '</b> ' + L(o.why), true); Array.prototype.forEach.call(qb.querySelectorAll('.opt'), function (x) { x.disabled = true; }); done = true;
            fb.insertAdjacentHTML('beforeend', btn(L({ uk: '↺ Пройти ще раз', en: '↺ Try again' }), 'six-again')); fb.querySelector('.six-again').onclick = function () { i = 0; past = {}; cur = []; done = false; render(); }; }
          else fbk(L({ uk: 'Ні. Дивимося на відповіді вище: що є на платі, а чого немає?', en: 'No. Look at the answers above: what is on the board and what is not?' }), false);
        };
      });
    }
    img.onclick = function (e) {
      if (i >= steps.length) return;
      var r = img.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 100, y = (e.clientY - r.top) / r.height * 100, s = steps[i];
      var hit = null; (o.hot || []).forEach(function (h) { var p = h.p; if (x >= p[0] && x <= p[0] + p[2] && y >= p[1] && y <= p[1] + p[3]) { if (!hit || p[2] * p[3] < hit.p[2] * hit.p[3]) hit = h; } });
      if (hit && s.a && s.a.indexOf(hit.id) >= 0) return solved();
      if (hit && s.wrong && s.wrong[hit.id]) return fbk(L(s.wrong[hit.id]), false);
      if (hit && (!s.a || !s.a.length)) return fbk(L({ uk: 'Це ', en: 'That is ' }) + '<b>' + L(hit.label).toLowerCase() + '</b>. ' + L({ uk: 'А чи є на цій платі те, що ми шукаємо?', en: 'But is what we are looking for on this board at all?' }), false);
      if (hit) return fbk(L({ uk: 'Це ', en: 'That is ' }) + '<b>' + L(hit.label).toLowerCase() + '</b>. ' + L({ uk: 'Шукаємо інше.', en: 'Look for something else.' }), false);
      fbk(L({ uk: 'Тут нічого важливого. Спробуймо ще.', en: 'Nothing important here. Try again.' }), false);
    };
    render();
    return { stop: function () {} };
  }

  // ---------- 12. ESC: six steps spin a brushless motor ----------
  function esc(root, o, ctx) {
    // phases A, B, C; each has a high (H) and low (L) switch
    var steps = [['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['C', 'B']];
    var px = { A: 50, B: 110, C: 170 };
    var s = '';
    ['A', 'B', 'C'].forEach(function (p) {
      var x = px[p];
      s += '<rect data-h="' + p + '" class="st" x="' + (x - 16) + '" y="40" width="32" height="30" rx="4"/><text class="txm" x="' + x + '" y="60" text-anchor="middle">' + p + 'H</text>';
      s += '<rect data-l="' + p + '" class="st" x="' + (x - 16) + '" y="110" width="32" height="30" rx="4"/><text class="txm" x="' + x + '" y="130" text-anchor="middle">' + p + 'L</text>';
      s += D.line(x, 70, x, 110) + D.dot(x, 90) + D.t(x, 160, p, 'lbl');
    });
    s += D.line(34, 30, 186, 30) + D.t(110, 22, '+ ' + U(ctx, 'батарея', 'battery'), 'txm') + D.line(34, 150, 186, 150);
    // motor
    s += '<circle class="st" cx="300" cy="95" r="58"/>';
    ['A', 'B', 'C'].forEach(function (p, i) {
      var a = (i * 120 - 90) * Math.PI / 180, x = 300 + Math.cos(a) * 42, y = 95 + Math.sin(a) * 42;
      s += '<rect data-coil="' + p + '" class="st" x="' + (x - 12) + '" y="' + (y - 12) + '" width="24" height="24" rx="5"/><text class="lbl" x="' + x + '" y="' + (y + 5) + '" text-anchor="middle">' + p + '</text>';
    });
    s += '<g data-rotor><rect class="accf" x="294" y="72" width="12" height="23" rx="2"/><rect class="cuf" x="294" y="95" width="12" height="23" rx="2"/></g>';
    root.innerHTML = D.svg(380, 180, s) + ctl(playBtn(ctx) + '<button type="button" class="tog" data-step>' + U(ctx, 'Наступний крок', 'Next step') + '</button>') + '<div class="readout" data-r></div>';
    var k = 0, acc = 0, ang = 0, target = 0;
    function show() {
      var st = steps[k];
      root.querySelectorAll('[data-h],[data-l],[data-coil]').forEach(function (e) { e.setAttribute('class', 'st'); e.style.fill = ''; });
      root.querySelector('[data-h="' + st[0] + '"]').setAttribute('class', 'st acc'); root.querySelector('[data-h="' + st[0] + '"]').style.fill = 'var(--accent-soft)';
      root.querySelector('[data-l="' + st[1] + '"]').setAttribute('class', 'st cu'); root.querySelector('[data-l="' + st[1] + '"]').style.fill = 'var(--copper-soft)';
      root.querySelector('[data-coil="' + st[0] + '"]').setAttribute('class', 'st acc'); root.querySelector('[data-coil="' + st[1] + '"]').setAttribute('class', 'st cu');
      target = k * 60;
      root.querySelector('[data-r]').textContent = U(ctx, 'Крок ' + (k + 1) + ' з 6: відкриті ' + st[0] + 'H і ' + st[1] + 'L. Струм іде через обмотки ' + st[0] + ' → ' + st[1] + ', магніт ротора повертається на 60°.', 'Step ' + (k + 1) + ' of 6: ' + st[0] + 'H and ' + st[1] + 'L are on. Current flows through coils ' + st[0] + ' → ' + st[1] + ', the rotor magnet turns 60°.');
    }
    // The rotor always eases to its target; "Pause / play" only stops the automatic stepping.
    var auto = !RM, pb = root.querySelector('[data-play]');
    pb.setAttribute('aria-pressed', auto);
    pb.onclick = function () { auto = !auto; acc = 0; pb.setAttribute('aria-pressed', auto); };
    root.querySelector('[data-step]').onclick = function () { auto = false; pb.setAttribute('aria-pressed', false); k = (k + 1) % 6; if (k === 0) ang -= 360; show(); };
    show();
    var lp = loop(function (dt) {
      if (auto) { acc += dt; if (acc > 0.9) { acc = 0; k = (k + 1) % 6; if (k === 0) ang -= 360; show(); } }
      ang += (target - ang) * Math.min(1, dt * 6);
      root.querySelector('[data-rotor]').setAttribute('transform', 'rotate(' + ang.toFixed(1) + ' 300 95)');
    });
    return lp;
  }

  // ---------- 13. wavelength and antenna length ----------
  function wave(root, o, ctx) {
    var bands = [{ f: 433e6, n: '433 MHz' }, { f: 915e6, n: '915 MHz' }, { f: 2.4e9, n: '2,4 GHz' }, { f: 5.8e9, n: '5,8 GHz' }];
    root.innerHTML = D.svg(380, 170,
      '<line class="grid" x1="10" y1="80" x2="370" y2="80"/><polyline data-w class="st acc" points=""/>' +
      '<line class="st cu" data-q x1="10" y1="130" x2="10" y2="130" style="stroke-width:6"/><text data-qt class="txm" x="10" y="152"></text>' +
      '<text class="txm" x="370" y="24" text-anchor="end">' + U(ctx, 'шкала: 360 px = 70 см', 'scale: 360 px = 70 cm') + '</text>') +
      ctl('<div class="row">' + bands.map(function (b, i) { return '<button type="button" class="tog" data-b="' + i + '" aria-pressed="' + (i === 2) + '">' + (ctx.lang === 'en' ? b.n.replace(',', '.') : b.n.replace('MHz', 'МГц').replace('GHz', 'ГГц')) + '</button>'; }).join('') + '</div>') +
      '<div class="readout" data-r></div>';
    var sel = 2;
    function upd() {
      var b = bands[sel], lam = 3e8 / b.f, px = 360 / 0.7, lpx = lam * px, pts = [];
      for (var x = 0; x <= 360; x += 2) pts.push((10 + x) + ',' + (80 - Math.sin(x / lpx * 2 * Math.PI) * 30).toFixed(1));
      root.querySelector('[data-w]').setAttribute('points', pts.join(' '));
      var q = root.querySelector('[data-q]'); q.setAttribute('x2', 10 + Math.min(360, lpx / 4));
      var cm = lam * 100;
      root.querySelector('[data-qt]').textContent = U(ctx, 'чверть хвилі ≈ ' + ctx.fmt(cm / 4, 1) + ' см', 'quarter wave ≈ ' + ctx.fmt(cm / 4, 1) + ' cm');
      root.querySelector('[data-r]').textContent = 'λ = c / f = 300 000 000 / ' + b.f.toLocaleString(ctx.lang === 'en' ? 'en' : 'uk') + ' ≈ ' + ctx.fmt(cm, 1) + U(ctx, ' см. Що вища частота — то коротша хвиля і коротша антена.', ' cm. The higher the frequency, the shorter the wave and the antenna.');
      root.querySelectorAll('[data-b]').forEach(function (x) { x.setAttribute('aria-pressed', +x.dataset.b === sel); });
    }
    root.querySelectorAll('[data-b]').forEach(function (x) { x.onclick = function () { sel = +x.dataset.b; upd(); }; });
    upd();
    return { stop: function () {} };
  }

  // ---------- 14. jamming: signal vs noise on a spectrum ----------
  function jam(root, o, ctx) {
    var N = 40; // channels
    root.innerHTML = D.svg(380, 210,
      '<line class="grid" x1="10" y1="170" x2="370" y2="170"/><rect data-jr class="badf" x="10" y="0" width="0" height="0" opacity=".25"/>' +
      '<line data-floor class="st mut" x1="10" x2="370" y1="160" y2="160" style="stroke-dasharray:3 4"/>' +
      '<g data-sig></g><text class="txm" x="10" y="190">' + U(ctx, 'канали (частота) →', 'channels (frequency) →') + '</text><text class="txm" x="370" y="190" text-anchor="end" data-lost></text>') +
      ctl('<label>' + U(ctx, 'Потужність завади', 'Jammer power') + ' <input type="range" min="0" max="100" value="45" data-p><output data-po></output></label>' +
          '<div class="row"><button type="button" class="tog" data-w="narrow" aria-pressed="true">' + U(ctx, 'Вузька завада', 'Narrow jammer') + '</button><button type="button" class="tog" data-w="wide" aria-pressed="false">' + U(ctx, 'Широка завада', 'Wide jammer') + '</button></div>' +
          '<button type="button" class="tog" data-h aria-pressed="false">' + U(ctx, 'Стрибки частоти (FHSS)', 'Frequency hopping (FHSS)') + '</button>' + playBtn(ctx)) +
      '<div class="readout" data-r></div>';
    var p = root.querySelector('[data-p]'), width = 'narrow', hop = false, ch = 20, acc = 0, ok = 0, tot = 0, hist = [];
    function band() { return width === 'narrow' ? [14, 26] : [0, N]; }
    function jamLevel() { var b = band(), pw = +p.value / 100; return pw * 120 * Math.sqrt(10 / (b[1] - b[0])); } // spreading the same power wider lowers its density
    var SIG = 70;
    function drawStatic() {
      var b = band(), j = jamLevel(), x0 = 10 + b[0] * 9, x1 = 10 + b[1] * 9;
      var r = root.querySelector('[data-jr]'); r.setAttribute('x', x0); r.setAttribute('width', x1 - x0); r.setAttribute('y', 160 - j); r.setAttribute('height', j);
      root.querySelector('[data-po]').textContent = p.value + ' %';
    }
    function reset() { ok = 0; tot = 0; hist = []; }
    p.oninput = function () { drawStatic(); reset(); };
    root.querySelectorAll('[data-w]').forEach(function (b) { b.onclick = function () { width = b.dataset.w; root.querySelectorAll('[data-w]').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); drawStatic(); reset(); }; });
    root.querySelector('[data-h]').onclick = function () { hop = !hop; this.setAttribute('aria-pressed', hop); if (!hop) ch = 20; reset(); };
    drawStatic();
    var lp = loop(function (dt) {
      acc += dt;
      if (acc > (hop ? 0.18 : 0.3)) {
        acc = 0;
        if (hop) ch = Math.floor(Math.random() * N);
        var b = band(), inJam = ch >= b[0] && ch < b[1], lost = inJam && jamLevel() > SIG * 0.8;
        tot++; if (!lost) ok++; hist.push(lost); if (hist.length > 30) { if (!hist.shift()) ok--; tot--; }
        var x = 10 + ch * 9 + 4.5;
        root.querySelector('[data-sig]').innerHTML = '<line class="st ' + (lost ? 'bad' : 'acc') + '" x1="' + x + '" y1="160" x2="' + x + '" y2="' + (160 - SIG) + '" style="stroke-width:6"/>';
        var pct = tot ? Math.round(ok / tot * 100) : 100;
        root.querySelector('[data-lost]').textContent = U(ctx, 'пакетів дійшло: ', 'packets through: ') + pct + ' %';
        var js = jamLevel() / SIG;
        root.querySelector('[data-r]').textContent = 'J/S ≈ ' + ctx.fmt(js, 1) + ' · ' + (hop ? U(ctx, 'Сигнал стрибає по каналах: завада «влучає» лише частину часу.', 'The signal hops across channels: the jammer only hits it part of the time.')
          : (js > 0.8 && (ch >= band()[0] && ch < band()[1]) ? U(ctx, 'Завада сильніша за сигнал на його частоті — зв’язок втрачено.', 'The jammer is stronger than the signal on its frequency — the link is lost.') : U(ctx, 'Сигнал сильніший за заваду — зв’язок є.', 'The signal is stronger than the jammer — the link holds.')))
          + (width === 'wide' ? U(ctx, ' Широка завада розмазує ту саму потужність по всіх каналах — на кожному її менше.', ' A wide jammer spreads the same power over all channels — less on each one.') : '');
      }
    });
    bindPlay(root, lp);
    return lp;
  }


  // ---------- regulator: any input → steady 5 V, the rest becomes heat ----------
  function regulator(root, o, ctx) {
    var V = U(ctx, 'В', 'V'), A = U(ctx, 'А', 'A'), W = U(ctx, 'Вт', 'W');
    root.innerHTML = D.svg(380, 270,
      // battery
      D.two('bat', 76, 96, 76, 128) + D.w([[76, 96], [76, 60], [130, 60]]) + D.w([[76, 128], [76, 168]]) + D.gnd(76, 168) +
      '<text data-vin class="lbl" x="58" y="117" text-anchor="end"></text>' +
      // regulator body with heat glow
      '<rect data-heat x="130" y="38" width="90" height="56" rx="6" class="cuf" opacity="0"/>' +
      '<rect class="st" x="130" y="38" width="90" height="56" rx="6"/>' +
      '<text data-name class="lbl" x="175" y="64" text-anchor="middle"></text>' +
      '<text class="txm" x="136" y="86">' + U(ctx, 'вхід', 'in') + '</text><text class="txm" x="214" y="86" text-anchor="end">' + U(ctx, 'вихід', 'out') + '</text>' +
      D.w([[175, 94], [175, 168]]) + D.gnd(175, 168) + '<text class="txm" x="181" y="140">' + U(ctx, 'земля', 'gnd') + '</text>' +
      '<g data-waves></g>' +
      // load lamp
      D.w([[220, 60], [300, 60], [300, 92]]) + D.two('lamp', 300, 92, 300, 136) + '<circle data-glow cx="300" cy="114" r="20" class="cuf" opacity="0"/>' + D.w([[300, 136], [300, 168]]) + D.gnd(300, 168) +
      '<text data-vout class="lbl" x="250" y="50" text-anchor="middle"></text><text class="txm" x="326" y="118">' + U(ctx, 'лампа', 'lamp') + '</text>' +
      // mini scope
      '<line class="grid" x1="20" y1="258" x2="360" y2="258"/>' +
      '<polyline data-tin class="st cu" points="" style="stroke-width:1.8"/><polyline data-tout class="st acc" points="" style="stroke-width:2.4"/>' +
      '<text class="txm" x="20" y="204" style="fill:var(--copper)">' + U(ctx, '— вхід (батарея «гуляє»)', '— input (the battery wobbles)') + '</text>' +
      '<text class="txm" x="210" y="204" style="fill:var(--accent)">' + U(ctx, '— вихід', '— output') + '</text>') +
      ctl('<label>' + U(ctx, 'Вхід', 'Input') + ' <input type="range" min="4" max="14" step="0.5" value="' + (o.vin || 12) + '" data-v><output data-vo></output></label>' +
        '<label>' + U(ctx, 'Струм лампи', 'Lamp current') + ' <input type="range" min="0.05" max="1.5" step="0.05" value="0.2" data-i><output data-io></output></label>' +
        '<span class="seg" role="group"><button type="button" class="tog" data-p="big" aria-pressed="true">7805</button> <button type="button" class="tog" data-p="small" aria-pressed="false">78L05</button></span>') +
      '<div class="readout" data-r></div>';
    var sv = root.querySelector('[data-v]'), si = root.querySelector('[data-i]'), pk = 'big', t0 = 0;
    var heat = root.querySelector('[data-heat]'), glow = root.querySelector('[data-glow]'), waves = root.querySelector('[data-waves]');
    var state = {};
    function vOut(vin, st) { if (st.off) return 0; return Math.max(0, Math.min(5, vin - 2)); }
    function calc() {
      var vin = +sv.value, i = +si.value, big = pk === 'big', imax = big ? 1.5 : 0.1, pmax = big ? 2 : 0.6;
      var limited = i > imax + 1e-9, iEff = Math.min(i, imax);
      var vo = Math.max(0, Math.min(5, vin - 2)), p = (vin - vo) * iEff;
      var off = p > pmax + 1e-9;
      state = { vin: vin, i: i, iEff: off ? 0 : iEff, vo: off ? 0 : vo, p: off ? 0 : p, pRaw: p, off: off, limited: limited, big: big, pmax: pmax };
      root.querySelector('[data-vo]').textContent = ctx.fmt(vin, 1) + ' ' + V;
      root.querySelector('[data-io]').textContent = ctx.fmt(i, 2) + ' ' + A;
      root.querySelector('[data-vin]').textContent = ctx.fmt(vin, 1) + ' ' + V;
      root.querySelector('[data-name]').textContent = big ? '7805' : '78L05';
      root.querySelector('[data-vout]').textContent = ctx.fmt(state.vo, 1) + ' ' + V;
      heat.setAttribute('opacity', Math.min(0.6, state.p / pmax * 0.6).toFixed(2));
      glow.setAttribute('opacity', (state.vo / 5 * Math.min(1, state.iEff / 0.3) * 0.55).toFixed(2));
      var r;
      if (off) r = U(ctx, 'Перегрів! На стабілізаторі ' + ctx.fmt(vin - vo, 1) + ' В × ' + ctx.fmt(iEff, 2) + ' А = ' + ctx.fmt(p, 1) + ' Вт тепла — більше, ніж корпус може розсіяти без радіатора (≈' + ctx.fmt(pmax, 1) + ' Вт). Вбудований захист вимикає стабілізатор, лампа гасне.',
        'Overheating! Across the regulator: ' + ctx.fmt(vin - vo, 1) + ' V × ' + ctx.fmt(iEff, 2) + ' A = ' + ctx.fmt(p, 1) + ' W of heat — more than the package can shed without a heatsink (≈' + ctx.fmt(pmax, 1) + ' W). The built-in protection shuts it off and the lamp goes dark.');
      else if (vin < 7) r = U(ctx, 'Замало на вході: стабілізатору треба принаймні на ~2 В більше, ніж він видає, тобто ~7 В. Зараз на виході лише ' + ctx.fmt(vo, 1) + ' В.',
        'Not enough input: the regulator needs about 2 V more than it puts out, so ~7 V. Right now the output is only ' + ctx.fmt(vo, 1) + ' V.');
      else { r = U(ctx, 'На вході ' + ctx.fmt(vin, 1) + ' В, на виході рівно 5 В. Зайві ' + ctx.fmt(vin - 5, 1) + ' В × ' + ctx.fmt(iEff, 2) + ' А = ' + ctx.fmt(p, 2) + ' Вт ідуть у тепло (чим яскравіше підсвічено корпус, тим він гарячіший).',
        ctx.fmt(vin, 1) + ' V in, exactly 5 V out. The extra ' + ctx.fmt(vin - 5, 1) + ' V × ' + ctx.fmt(iEff, 2) + ' A = ' + ctx.fmt(p, 2) + ' W turn into heat (the brighter the body glows, the hotter it is).');
        if (p > pmax * 0.5) r += ' ' + U(ctx, 'Корпус уже гарячий — у справжньому пристрої тут ставлять радіатор.', 'The body is already hot — in a real device a heatsink goes here.'); }
      if (limited && !off) r += ' ' + U(ctx, 'Лампа просить ' + ctx.fmt(i, 2) + ' А, а 78L05 дає лише ~0,1 А — захист обмежує струм.', 'The lamp wants ' + ctx.fmt(i, 2) + ' A, but the 78L05 gives only ~0.1 A — the protection limits the current.');
      root.querySelector('[data-r]').textContent = r;
    }
    sv.oninput = calc; si.oninput = calc;
    Array.prototype.forEach.call(root.querySelectorAll('[data-p]'), function (b) {
      b.onclick = function () { pk = b.dataset.p; Array.prototype.forEach.call(root.querySelectorAll('[data-p]'), function (x) { x.setAttribute('aria-pressed', x === b); }); if (pk === 'small' && +si.value > 0.1) { si.value = 0.1; } calc(); };
    });
    calc();
    var lp = loop(function (dt, t) {
      t0 += dt;
      // scope: 0..15 V mapped to y 252..212
      var pin = [], pout = [];
      for (var x = 0; x <= 340; x += 4) {
        var vi = state.vin + 0.9 * Math.sin((x / 340) * 6.3 * 2 - t0 * 3) + 0.4 * Math.sin((x / 340) * 6.3 * 5 + t0 * 2);
        var vo = state.off ? 0 : Math.max(0, Math.min(5, vi - 2));
        pin.push((20 + x) + ',' + (258 - vi / 15 * 52).toFixed(1)); pout.push((20 + x) + ',' + (258 - vo / 15 * 52).toFixed(1));
      }
      root.querySelector('[data-tin]').setAttribute('points', pin.join(' ')); root.querySelector('[data-tout]').setAttribute('points', pout.join(' '));
      // rising heat waves
      var n = state.p > 0.05 ? Math.min(3, 1 + Math.floor(state.p / state.pmax * 3)) : 0, s = '';
      for (var k = 0; k < n; k++) {
        var ph = (t0 * 0.6 + k / 3) % 1, x0 = 152 + k * 23, y0 = 34 - ph * 22;
        s += '<path class="st cu" style="stroke-width:1.8" opacity="' + (1 - ph).toFixed(2) + '" d="M' + x0 + ',' + y0.toFixed(1) + ' q4,-4 0,-8 q-4,-4 0,-8"/>';
      }
      waves.innerHTML = s;
    });
    bindPlay(root, lp);
    return lp;
  }

  // ---------- oscillator: crystal + circuit in one can → ready clock signal ----------
  function osc(root, o, ctx) {
    root.innerHTML = D.svg(380, 230,
      '<rect class="bg" x="70" y="44" width="134" height="110" rx="10"/><rect class="st" x="70" y="44" width="134" height="110" rx="10" style="stroke-dasharray:5 4"/>' +
      '<text class="txm" x="137" y="38" text-anchor="middle">' + U(ctx, 'корпус генератора', 'oscillator can') + '</text>' +
      // crystal (custom so the plate can shake)
      '<line class="st" x1="94" y1="88" x2="94" y2="112"/><line class="st" x1="118" y1="88" x2="118" y2="112"/><g data-q><rect class="st cu" x="100" y="86" width="12" height="28"/></g>' +
      '<text class="txm" x="106" y="132" text-anchor="middle">' + U(ctx, 'кварц', 'crystal') + '</text>' +
      // amplifier triangle
      '<path class="st" d="M150,84 L150,116 L180,100 Z"/><text class="txm" x="160" y="132" text-anchor="middle">' + U(ctx, 'схема', 'circuit') + '</text>' +
      D.w([[118, 100], [150, 100]]) + D.w([[94, 100], [84, 100], [84, 70], [190, 70], [190, 100], [180, 100]]) +
      D.w([[190, 100], [204, 100]]) +
      // pins
      D.w([[70, 60], [50, 60]]) + '<text class="txm" x="46" y="64" text-anchor="end">' + U(ctx, 'живл.', 'VCC') + '</text>' +
      D.w([[70, 140], [50, 140]]) + D.gnd(50, 140) +
      D.w([[137, 154], [137, 182]]) + '<text class="txm" x="144" y="182">' + U(ctx, 'вмик. (EN)', 'enable') + '</text>' +
      D.w([[204, 100], [244, 100]]) + '<text class="txm" x="224" y="92" text-anchor="middle">' + U(ctx, 'вихід', 'out') + '</text>' +
      // scope
      '<line class="grid" x1="248" y1="130" x2="372" y2="130"/><line class="grid" x1="248" y1="70" x2="372" y2="70" style="stroke-dasharray:2 4"/>' +
      '<polyline data-w class="st acc" points=""/>' +
      '<circle data-led cx="310" cy="176" r="9" class="accf" opacity="0.15"/><text class="txm" x="310" y="204" text-anchor="middle">' + U(ctx, 'такт', 'tick') + '</text>' +
      '<text data-n class="lbl" x="372" y="56" text-anchor="end"></text>') +
      ctl('<button type="button" class="tog" data-pw aria-pressed="false">' + U(ctx, 'Живлення', 'Power') + '</button>' +
        '<button type="button" class="tog" data-en aria-pressed="true">' + U(ctx, 'Вмикання (EN)', 'Enable (EN)') + '</button>' + playBtn(ctx)) +
      '<div class="readout" data-r></div>';
    var pw = false, en = true, ph = 0, n = 0, hist = [];
    var bp = root.querySelector('[data-pw]'), be = root.querySelector('[data-en]');
    function txt() {
      var on = pw && en;
      root.querySelector('[data-r]').textContent = !pw ? U(ctx, 'Без живлення кварц мовчить, на виході нуль. Натискаємо «Живлення».', 'Without power the crystal is silent and the output is zero. Press “Power”.')
        : !en ? U(ctx, 'Живлення є, але вивід «вмикання» вимкнено — генератор «спить» і нічого не видає. Так економлять енергію.', 'Power is on, but the enable pin is off — the oscillator “sleeps” and puts out nothing. That saves energy.')
        : U(ctx, 'Схема підштовхує кварц, а він коливається з точно своєю частотою, як камертон. На виході — рівні прямокутні імпульси, «метроном» для мікросхеми. Справжній генератор 40.000 дає 40 000 000 таких тактів за секунду; тут уповільнено в 20 мільйонів разів.',
          'The circuit nudges the crystal, and it vibrates at exactly its own frequency, like a tuning fork. The output is even square pulses — a “metronome” for the chip. A real 40.000 oscillator gives 40,000,000 such ticks a second; here it is slowed down 20 million times.');
    }
    function resume() { var p = root.querySelector('[data-play]'); if (p && p.getAttribute('aria-pressed') !== 'true') p.click(); }
    bp.onclick = function () { pw = !pw; bp.setAttribute('aria-pressed', pw); txt(); resume(); };
    be.onclick = function () { en = !en; be.setAttribute('aria-pressed', en); txt(); resume(); };
    txt();
    var q = root.querySelector('[data-q]'), wv = root.querySelector('[data-w]'), led = root.querySelector('[data-led]'), nt = root.querySelector('[data-n]');
    var lp = loop(function (dt) {
      var on = pw && en;
      if (on) { var prev = ph; ph += dt * 2; if (Math.floor(ph) > Math.floor(prev)) n++; }
      var hi = on && (ph % 1) < 0.5;
      q.setAttribute('transform', on ? 'translate(' + (2.2 * Math.sin(ph * Math.PI * 2 * 3)).toFixed(2) + ',0)' : '');
      hist.push(hi ? 1 : 0); if (hist.length > 124) hist.shift();
      var pts = [];
      for (var i = 0; i < hist.length; i++) { var x = 372 - (hist.length - 1 - i), y = hist[i] ? 70 : 130; if (i && hist[i] !== hist[i - 1]) pts.push(x + ',' + (hist[i - 1] ? 70 : 130)); pts.push(x + ',' + y); }
      wv.setAttribute('points', pts.join(' '));
      led.setAttribute('opacity', hi ? 0.95 : 0.15);
      nt.textContent = U(ctx, 'тактів: ', 'ticks: ') + n;
    });
    bindPlay(root, lp);
    return lp;
  }

  return { circuit: circuit, ohm: ohm, diode: diode, capcharge: capcharge, rectifier: rectifier, divider: divider, lc: lc, tuning: tuning, mosfet: mosfet, pwm: pwm, buck: buck, esc: esc, wave: wave, jam: jam, regulator: regulator, osc: osc, boost: boost, memsgyro: memsgyro, six: six };
})();
