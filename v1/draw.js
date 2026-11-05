/* draw.js — a small library of schematic symbols drawn as SVG strings.
   Default symbols follow the European/Ukrainian (IEC, ДСТУ) style; US-style variants exist where they differ.
   Colours come from CSS classes so drawings follow light/dark theme. */
var D = (function () {
  function f(n) { return Math.round(n * 10) / 10; }
  function svg(w, h, inner, label) {
    return '<svg class="sv" viewBox="0 0 ' + w + ' ' + h + '" role="img"' + (label ? ' aria-label="' + esc(label) + '"' : '') + ' xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function w(pts, cls) { return '<polyline class="st ' + (cls || '') + '" points="' + pts.map(function (p) { return f(p[0]) + ',' + f(p[1]); }).join(' ') + '"/>'; }
  function line(x1, y1, x2, y2, cls) { return '<line class="st ' + (cls || '') + '" x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '"/>'; }
  function t(x, y, s, cls, anchor) { return '<text class="' + (cls || 'tx') + '" x="' + f(x) + '" y="' + f(y) + '" text-anchor="' + (anchor || 'middle') + '">' + esc(s) + '</text>'; }
  function dot(x, y, r) { return '<circle class="fl" cx="' + f(x) + '" cy="' + f(y) + '" r="' + (r || 3.2) + '"/>'; }

  // Symbol bodies in local coordinates: centred at 0, lying along the x axis. half = body half-length.
  var BODY = {
    res: { half: 16, d: function () { return '<rect class="st" x="-16" y="-6.5" width="32" height="13"/>'; } },
    resUS: { half: 16, d: function () { return '<polyline class="st" points="-16,0 -13,-7 -8,7 -3,-7 2,7 7,-7 12,7 16,0"/>'; } },
    cap: { half: 5, d: function () { return '<line class="st" x1="-4" y1="-13" x2="-4" y2="13"/><line class="st" x1="4" y1="-13" x2="4" y2="13"/>'; } },
    ecap: { half: 5, d: function () { return '<line class="st" x1="-4" y1="-13" x2="-4" y2="13"/><rect class="fl" x="3" y="-13" width="4" height="26"/><text class="lbl" x="-11" y="-10" text-anchor="middle">+</text>'; } },
    ind: { half: 18, d: function () { var s = 'M-18,0'; for (var i = 0; i < 4; i++) s += ' a4.5,4.5 0 0 1 9,0'; return '<path class="st" d="' + s + '"/>'; } },
    diode: { half: 9, d: function () { return '<polygon class="st" points="-9,-9 -9,9 8,0" style="fill:none"/><line class="st" x1="8" y1="-9" x2="8" y2="9"/>'; } },
    zener: { half: 9, d: function () { return '<polygon class="st" points="-9,-9 -9,9 8,0"/><polyline class="st" points="4,-12 8,-9 8,9 12,12"/>'; } },
    schottky: { half: 9, d: function () { return '<polygon class="st" points="-9,-9 -9,9 8,0"/><polyline class="st" points="4,-6 4,-9 8,-9 8,9 12,9 12,6"/>'; } },
    led: { half: 9, d: function () { return '<polygon class="st" points="-9,-9 -9,9 8,0"/><line class="st" x1="8" y1="-9" x2="8" y2="9"/><path class="st cu" d="M0,-12 l8,-9 M4,-21 l4,0 l0,4 M7,-9 l8,-9 M11,-18 l4,0 l0,4"/>'; } },
    lamp: { half: 11, d: function () { return '<circle class="st" r="11"/><path class="st" d="M-7.8,-7.8 L7.8,7.8 M-7.8,7.8 L7.8,-7.8"/>'; } },
    motor: { half: 12, upright: 'M', d: function () { return '<circle class="st" r="12"/>'; } },
    ac: { half: 12, d: function () { return '<circle class="st" r="12"/><path class="st" d="M-7,0 q3.5,-8 7,0 t7,0"/>'; } },
    xtal: { half: 10, d: function () { return '<line class="st" x1="-9" y1="-10" x2="-9" y2="10"/><rect class="st" x="-5" y="-12" width="10" height="24"/><line class="st" x1="9" y1="-10" x2="9" y2="10"/>'; } },
    swOpen: { half: 14, d: function () { return '<circle class="fl" cx="-14" cy="0" r="2.6"/><circle class="fl" cx="14" cy="0" r="2.6"/><line class="st" x1="-14" y1="0" x2="12" y2="-12"/>'; } },
    swClosed: { half: 14, d: function () { return '<circle class="fl" cx="-14" cy="0" r="2.6"/><circle class="fl" cx="14" cy="0" r="2.6"/><line class="st" x1="-14" y1="0" x2="14" y2="-1"/>'; } },
    bat: { half: 8, d: function () { return '<line class="st" x1="-4" y1="-14" x2="-4" y2="14"/><line class="st" x1="4" y1="-7" x2="4" y2="7" style="stroke-width:4.5"/><text class="lbl" x="-12" y="-10" text-anchor="middle">+</text>'; } },
    bat2: { half: 18, d: function () { return '<line class="st" x1="-14" y1="-14" x2="-14" y2="14"/><line class="st" x1="-6" y1="-7" x2="-6" y2="7" style="stroke-width:4.5"/><line class="st" x1="-6" y1="0" x2="6" y2="0" style="stroke-dasharray:2 3"/><line class="st" x1="6" y1="-14" x2="6" y2="14"/><line class="st" x1="14" y1="-7" x2="14" y2="7" style="stroke-width:4.5"/><text class="lbl" x="-22" y="-10" text-anchor="middle">+</text>'; } },
    fuse: { half: 14, d: function () { return '<rect class="st" x="-14" y="-5" width="28" height="10"/><line class="st" x1="-14" y1="0" x2="14" y2="0"/>'; } },
    phones: { half: 12, d: function () { return '<path class="st" d="M-12,0 h4 M12,0 h-4 M-8,-6 h16 v12 h-16 z M-4,-6 q4,-10 8,0"/>'; } }
  };

  // Two-terminal part between two points. Leads are drawn up to the body.
  function two(type, x1, y1, x2, y2, opt) {
    opt = opt || {};
    var b = BODY[type], dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), a = Math.atan2(dy, dx) * 180 / Math.PI;
    var cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, h = b.half;
    var s = '<g class="' + (opt.cls || '') + '"' + (opt.id ? ' data-part="' + opt.id + '"' : '') + '>';
    s += '<g transform="translate(' + f(cx) + ',' + f(cy) + ') rotate(' + f(a) + ')">';
    s += '<line class="st" x1="' + f(-L / 2) + '" y1="0" x2="' + (-h) + '" y2="0"/><line class="st" x1="' + h + '" y1="0" x2="' + f(L / 2) + '" y2="0"/>';
    s += b.d();
    s += '</g>';
    if (b.upright) s += '<text class="lbl" x="' + f(cx) + '" y="' + f(cy + 4.5) + '" text-anchor="middle">' + b.upright + '</text>';
    if (opt.label) {
      var vertical = Math.abs(dx) < Math.abs(dy);
      var lx = vertical ? cx + (opt.side === 'l' ? -22 : 22) : cx, ly = vertical ? cy + 5 : cy + (opt.side === 'b' ? 30 : -18);
      s += t(lx, ly, opt.label, 'lbl', vertical ? (opt.side === 'l' ? 'end' : 'start') : 'middle');
      if (opt.value) s += t(lx, ly + 15, opt.value, 'txm', vertical ? (opt.side === 'l' ? 'end' : 'start') : 'middle');
    }
    return s + '</g>';
  }

  function gnd(x, y) { return line(x, y, x, y + 8) + line(x - 11, y + 8, x + 11, y + 8) + line(x - 7, y + 13, x + 7, y + 13) + line(x - 3, y + 18, x + 3, y + 18); }
  function vcc(x, y, label) { return line(x, y, x, y - 10) + line(x - 9, y - 10, x + 9, y - 10) + (label ? t(x, y - 16, label, 'lbl') : ''); }
  function ant(x, y) { return line(x, y, x, y - 26) + '<polyline class="st" points="' + (x - 11) + ',' + (y - 40) + ' ' + x + ',' + (y - 26) + ' ' + (x + 11) + ',' + (y - 40) + '"/>' + line(x, y - 26, x, y - 42); }
  // NPN transistor: base at (x-24,y), collector top (x+12,y-26), emitter bottom (x+12,y+26)
  function npn(x, y, opt) {
    opt = opt || {};
    var s = (opt.circle !== false ? '<circle class="st" cx="' + (x + 2) + '" cy="' + y + '" r="19"/>' : '');
    s += line(x - 24, y, x - 6, y) + line(x - 6, y - 12, x - 6, y + 12, '') ;
    s += line(x - 6, y - 6, x + 12, y - 18) + line(x + 12, y - 18, x + 12, y - 26);
    s += line(x - 6, y + 6, x + 12, y + 18) + line(x + 12, y + 18, x + 12, y + 26);
    s += '<polygon class="fl" points="' + (x + 12) + ',' + (y + 18) + ' ' + (x + 2) + ',' + (y + 16) + ' ' + (x + 7) + ',' + (y + 9) + '"/>';
    s += '<line class="st" x1="' + (x - 6) + '" y1="' + (y - 12) + '" x2="' + (x - 6) + '" y2="' + (y + 12) + '" style="stroke-width:3.5"/>';
    if (opt.label) s += t(x + 26, y + 5, opt.label, 'lbl', 'start');
    return s;
  }
  // N-channel MOSFET: gate (x-26,y), drain top (x+10,y-28), source bottom (x+10,y+28)
  function nmos(x, y, opt) {
    opt = opt || {};
    var s = line(x - 26, y, x - 10, y) + line(x - 10, y - 13, x - 10, y + 13);
    s += '<line class="st" x1="' + (x - 4) + '" y1="' + (y - 15) + '" x2="' + (x - 4) + '" y2="' + (y - 7) + '" style="stroke-width:3"/>';
    s += '<line class="st" x1="' + (x - 4) + '" y1="' + (y - 4) + '" x2="' + (x - 4) + '" y2="' + (y + 4) + '" style="stroke-width:3"/>';
    s += '<line class="st" x1="' + (x - 4) + '" y1="' + (y + 7) + '" x2="' + (x - 4) + '" y2="' + (y + 15) + '" style="stroke-width:3"/>';
    s += w([[x - 4, y - 11], [x + 10, y - 11], [x + 10, y - 28]]);
    s += w([[x - 4, y + 11], [x + 10, y + 11], [x + 10, y + 28]]);
    s += w([[x - 4, y], [x + 10, y], [x + 10, y + 11]]);
    s += '<polygon class="fl" points="' + (x - 3) + ',' + y + ' ' + (x + 4) + ',' + (y - 4) + ' ' + (x + 4) + ',' + (y + 4) + '"/>';
    if (opt.label) s += t(x + 18, y + 5, opt.label, 'lbl', 'start');
    if (opt.pins) s += t(x - 30, y - 5, 'G', 'txm', 'end') + t(x + 16, y - 24, 'D', 'txm', 'start') + t(x + 16, y + 30, 'S', 'txm', 'start');
    return s;
  }
  // Op-amp: inputs at (x-30, y-12) (−) and (x-30, y+12) (+), output (x+30, y)
  function opamp(x, y) {
    return '<polygon class="st" points="' + (x - 22) + ',' + (y - 26) + ' ' + (x - 22) + ',' + (y + 26) + ' ' + (x + 22) + ',' + y + '"/>' +
      line(x - 30, y - 12, x - 22, y - 12) + line(x - 30, y + 12, x - 22, y + 12) + line(x + 22, y, x + 30, y) +
      t(x - 15, y - 8, '−', 'lbl', 'middle') + t(x - 15, y + 16, '+', 'lbl', 'middle');
  }
  function chip(x, y, wd, ht, label, sub) {
    return '<rect class="st" x="' + x + '" y="' + y + '" width="' + wd + '" height="' + ht + '" rx="3"/>' + t(x + wd / 2, y + ht / 2 + (sub ? -2 : 5), label, 'lbl') + (sub ? t(x + wd / 2, y + ht / 2 + 14, sub, 'txm') : '');
  }
  // Arrow showing direction of current
  function arrow(x1, y1, x2, y2, cls) {
    var a = Math.atan2(y2 - y1, x2 - x1), hx = x2 - 8 * Math.cos(a), hy = y2 - 8 * Math.sin(a);
    var p1 = [hx + 5 * Math.sin(a), hy - 5 * Math.cos(a)], p2 = [hx - 5 * Math.sin(a), hy + 5 * Math.cos(a)];
    return line(x1, y1, hx, hy, cls) + '<polygon class="' + (cls ? cls.replace('acc', 'accf').replace('cu', 'cuf') : 'fl') + '" points="' + f(x2) + ',' + f(y2) + ' ' + f(p1[0]) + ',' + f(p1[1]) + ' ' + f(p2[0]) + ',' + f(p2[1]) + '"/>';
  }
  return { svg: svg, w: w, line: line, t: t, dot: dot, two: two, gnd: gnd, vcc: vcc, ant: ant, npn: npn, nmos: nmos, opamp: opamp, chip: chip, arrow: arrow, esc: esc, f: f };
})();
