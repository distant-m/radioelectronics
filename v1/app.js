/* app.js — engine for "Read the Board" (Читаємо плату).
   Content files call APP.module({...}). Progress is stored by stable module and question IDs,
   so a new course version never wipes what a learner has done. */
var APP = (function () {
  var VERSION = 'v1', VERSION_LABEL = '1.0';
  var FEEDBACK_EMAIL = 'radioelektronika-kurs@agentmail.to';            // filled in when the AgentMail inbox exists
  var PASS = 8, PER_TEST = 10;        // 8 of 10 to pass
  var KEY_S = 'rtb.settings', KEY_P = 'rtb.progress';

  // ---------- storage ----------
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v && typeof v === 'object' ? v : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var S = load(KEY_S, {}), P = load(KEY_P, {});
  P.mods = P.mods || {}; P.q = P.q || {};
  if (!S.lang) S.lang = 'uk';
  if (!S.updateMode) S.updateMode = 'ask';
  function saveS() { save(KEY_S, S); }
  function saveP() { save(KEY_P, P); }

  // ---------- language ----------
  function L(o) { if (o == null) return ''; if (typeof o !== 'object') return String(o); return o[S.lang] != null ? o[S.lang] : (o.uk != null ? o.uk : ''); }
  var UI = {
    uk: {
      app: 'Радіоелектроніка, її компоненти і плати', intro: 'Від однієї деталі до цілого пристрою. Кожен модуль — це сходинки: деталь → приклад → поєднуємо → пристрій → шукаємо на платі. Наприкінці — тест.', note: 'Інформація, зазначена в курсі, стосується стандартних практик плат, електроніки та частот. У курсі не враховано спеціалізовані військові прошивки та радіоелектроніку.',
      progress: 'Пройдено модулів', module: 'Модуль', part: 'Частина', open: 'Відкрито', passed: 'Пройдено', locked: 'Закрито', updated: 'Оновлено',
      lockedNote: 'Відкриється, коли складемо тест попереднього модуля.',
      startTest: 'Пройти тест', test: 'Тест', of: 'з', check: 'Перевірити', next: 'Далі', finish: 'Результат',
      right: 'Правильно', wrong: 'Неправильно', correctIs: 'Правильна відповідь', explain: 'Пояснення',
      passedT: 'Тест складено!', failedT: 'Поки що не складено', needed: 'Потрібно щонайменше ' + PASS + ' з ' + PER_TEST + '.',
      retry: 'Спробувати ще раз', retryNote: 'Наступна спроба — інші питання та інший порядок відповідей.',
      toLessons: 'До уроку', nextModule: 'Наступний модуль', home: 'До всіх модулів', mistakes: 'Розбираємо помилки',
      warmT: 'Пригадуємо', warmD: 'Два короткі питання з попередніх модулів. Без оцінки — лише щоб освіжити пам’ять.',
      recall: 'Згадуємо', sources: 'Джерела для глибшого вивчення', photo: 'Фото', lic: 'ліцензія',
      tapHint: 'Торкаємося частини на зображенні або назви нижче.', tapQ: 'Торкаємося потрібного місця на зображенні.',
      review: 'повторення', settings: 'Налаштування', glossary: 'Словник', credits: 'Автори фото', about: 'Про курс',
      lang: 'Мова', upd: 'Оновлення курсу', auto: 'Автоматично', autoD: 'Нова версія — одразу під час запуску', ask: 'Питати мене', askD: 'Спершу показати, що нового',
      offline: 'Робота без інтернету', offlineD: 'Уроки й тести вже збережено на пристрої. Фото зберігаються, коли ми їх переглядаємо. Можна завантажити всі одразу (≈6 МБ).',
      offlineBtn: 'Завантажити всі фото', offlineDone: 'Готово: усе збережено для роботи без інтернету.', offlineFail: 'Не вдалося — перевіряємо інтернет і пробуємо ще раз.', offlineNoSW: 'Цей браузер не підтримує офлайн-режим.',
      formulas: 'Формули (PDF)', formulasFile: 'Формули — Радіоелектроніка.pdf', feedback: 'Відгуки та помилки', feedbackD: 'Знайшли помилку чи щось незрозуміло? Пишемо на цю адресу:', feedbackNone: 'Адресу для відгуків буде додано в наступній версії.', copy: 'Копіювати', copied: 'Скопійовано',
      preview: 'Режим перегляду', previewD: 'Відкрити всі модулі без тестів — щоб переглянути курс.', on: 'Увімкнено', off: 'Вимкнено',
      reset: 'Скинути поступ', resetD: 'Видалить усі результати тестів на цьому пристрої.', resetSure: 'Так, видалити все', cancel: 'Скасувати', resetDone: 'Поступ скинуто.',
      version: 'Версія', updAvail: 'Доступна нова версія курсу', updNow: 'Оновити', updLater: 'Не зараз', updNote: 'Поступ збережеться.',
      search: 'Пошук…', kinds: ['Деталь', 'Приклад', 'Поєднуємо', 'Пристрій', 'На платі'],
      aboutT: 'Курс створено для самостійного навчання. Лише відкрита інформація; кожен факт спирається на названі джерела — підручники, документацію виробників, авторські статті. Фото — з Wikimedia Commons під вільними ліцензіями (з указанням авторів) або власні.',
      progressNote: 'Поступ зберігається лише в цьому браузері на цьому пристрої.',
score: 'балів', reviewTag: 'з попередніх модулів', show: 'Показати'
    },
    en: {
      app: 'Radio Electronics: Components and Boards', intro: 'From a single part to a whole device. Every module is a staircase: part → example → combine → device → find it on a board. Then a test.', note: 'The information in this course covers standard practice for circuit boards, electronics and frequencies. Specialised military firmware and electronics are not covered.',
      progress: 'Modules passed', module: 'Module', part: 'Part', open: 'Open', passed: 'Passed', locked: 'Locked', updated: 'Updated',
      lockedNote: 'Opens once you pass the previous module’s test.',
      startTest: 'Take the test', test: 'Test', of: 'of', check: 'Check', next: 'Next', finish: 'Result',
      right: 'Correct', wrong: 'Not quite', correctIs: 'Correct answer', explain: 'Explanation',
      passedT: 'Test passed!', failedT: 'Not passed yet', needed: 'You need at least ' + PASS + ' of ' + PER_TEST + '.',
      retry: 'Try again', retryNote: 'The next attempt has different questions and a new answer order.',
      toLessons: 'Back to the lesson', nextModule: 'Next module', home: 'All modules', mistakes: 'Let’s go over the mistakes',
      warmT: 'Remember?', warmD: 'Two quick questions from earlier modules. Not graded — just to refresh your memory.',
      recall: 'Recall', sources: 'Sources for going deeper', photo: 'Photo', lic: 'licence',
      tapHint: 'Tap a part of the picture or a name below.', tapQ: 'Tap the right spot in the picture.',
      review: 'review', settings: 'Settings', glossary: 'Glossary', credits: 'Photo credits', about: 'About',
      lang: 'Language', upd: 'Course updates', auto: 'Automatic', autoD: 'New version right at launch', ask: 'Ask me', askD: 'Show what’s new first',
      offline: 'Working offline', offlineD: 'Lessons and tests are already stored on the device. Photos are stored as you view them. You can download all of them at once (≈6 MB).',
      offlineBtn: 'Download all photos', offlineDone: 'Done: everything is stored for offline use.', offlineFail: 'That didn’t work — check the connection and try again.', offlineNoSW: 'This browser doesn’t support offline mode.',
      formulas: 'Formulas (PDF)', formulasFile: 'Formulas — Radio Electronics.pdf', feedback: 'Feedback and errors', feedbackD: 'Found a mistake or something unclear? Write to this address:', feedbackNone: 'A feedback address will be added in the next version.', copy: 'Copy', copied: 'Copied',
      preview: 'Preview mode', previewD: 'Open all modules without tests — to look through the course.', on: 'On', off: 'Off',
      reset: 'Reset progress', resetD: 'Deletes all test results on this device.', resetSure: 'Yes, delete everything', cancel: 'Cancel', resetDone: 'Progress reset.',
      version: 'Version', updAvail: 'A new course version is available', updNow: 'Update', updLater: 'Not now', updNote: 'Your progress will be kept.',
      search: 'Search…', kinds: ['Part', 'Example', 'Combine', 'Device', 'On the board'],
      aboutT: 'This course is made for self-study. Open information only; every fact rests on named sources — textbooks, manufacturer documentation, signed articles. Photos come from Wikimedia Commons under free licences (with author credit) or are our own.',
      progressNote: 'Progress is stored only in this browser on this device.',
score: 'points', reviewTag: 'from earlier modules', show: 'Show'
    }
  };
  function T(k) { return (UI[S.lang] || UI.uk)[k]; }

  // ---------- helpers ----------
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmt(n, d) {
    if (d == null) d = Math.abs(n) >= 100 ? 0 : (Math.abs(n) >= 10 ? 1 : 2);
    var s = (+n).toFixed(d); if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    return S.lang === 'uk' ? s.replace('.', ',') : s;
  }
  var R = { int: function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }, pick: function (a) { return a[Math.floor(Math.random() * a.length)]; } };
  // Build unique numeric options around a correct value.
  // If the chosen precision would round away a "tidy" correct value (e.g. 112.5 shown as 113), keep enough decimals.
  function needD(v, d) {
    if (d == null) return d;
    var k = d;
    while (k < 3 && Math.abs(+(+v).toFixed(k) - v) > 1e-9 && Math.abs(+(+v).toFixed(3) - v) < 1e-9) k++;
    return k;
  }
  function numOpts(correct, wrongs, unit, d) {
    var d0 = d != null ? d : (Math.abs(correct) >= 100 ? 0 : (Math.abs(correct) >= 10 ? 1 : 2));
    if (needD(correct, d0) !== d0) d = needD(correct, d0);
    var seen = {}, out = [];
    function add(v) { var k = fmt(v, d) + ' ' + L(unit); if (!seen[k] && isFinite(v) && v > 0) { seen[k] = 1; out.push(k); } }
    add(correct); wrongs.forEach(add);
    var m = [0.5, 2, 1.5, 0.1, 10, 3, 0.25];
    for (var i = 0; out.length < 4 && i < m.length; i++) add(correct * m[i]);
    return { opts: out.slice(0, 4), a: 0 };
  }

  // ---------- content registry ----------
  var MODS = [], BYID = {}, QBYID = {};
  var PARTS = {
    A: { uk: 'Частина A · Основи', en: 'Part A · Foundations' },
    B: { uk: 'Частина B · Живлення та рух', en: 'Part B · Power and motion' },
    C: { uk: 'Частина C · «Мізки» та датчики', en: 'Part C · Brains and sensors' },
    D: { uk: 'Частина D · Радіо та РЕБ', en: 'Part D · Radio and EW' },
    E: { uk: 'Частина E · Практика', en: 'Part E · Practice' }
  };
  function module(def) {
    def.quiz = def.quiz || []; def.steps = def.steps || [];
    def.quiz.forEach(function (q, i) { q.id = q.id || (def.id + 'q' + (i + 1 < 10 ? '0' : '') + (i + 1)); q.mod = def.id; QBYID[q.id] = q; });
    var k = 0; def.steps.forEach(function (s) { if (!s.id) { k++; s.id = 's' + k; } });  // explicit ids (e.g. 's8b') don’t shift the numbering of later steps
    MODS.push(def); BYID[def.id] = def;
    MODS.sort(function (a, b) { return a.n - b.n; });
  }
  function mp(id) { return P.mods[id] || (P.mods[id] = {}); }
  function isOpen(m) {
    if (S.preview || window.RTB_PREVIEW || m.n === 1) return true;
    var prev = MODS.filter(function (x) { return x.n < m.n; }).pop();
    return !prev || !!mp(prev.id).passed;
  }

  // ---------- credits ----------
  function credit(id) { return (window.CREDITS || {})[id]; }
  function creditLine(id) {
    var c = credit(id); if (!c) return '';
    var who = esc(c.author || '—');
    var lic = c.licence_url ? '<a href="' + esc(c.licence_url) + '" target="_blank" rel="noopener">' + esc(c.licence) + '</a>' : esc(c.licence);
    var src = c.page ? ' · <a href="' + esc(c.page) + '" target="_blank" rel="noopener">Wikimedia Commons</a>' : '';
    return T('photo') + ': ' + who + ' · ' + lic + src;
  }

  // ---------- figures ----------
  var animHandles = [];
  function markHtml(marks) {
    return (marks || []).map(function (m) {
      return '<div class="mark" style="left:' + m.p[0] + '%;top:' + m.p[1] + '%;width:' + m.p[2] + '%;height:' + m.p[3] + '%"><span>' + esc(L(m.t)) + '</span></div>';
    }).join('');
  }
  function hotHtml(hot, key) {
    return (hot || []).map(function (h) {
      var r = h[key] || [h.x, h.y, h.w, h.h];
      return '<button type="button" class="hot" data-hot="' + h.id + '" aria-label="' + esc(L(h.label)) + '" style="left:' + r[0] + '%;top:' + r[1] + '%;width:' + r[2] + '%;height:' + r[3] + '%"></button>';
    }).join('');
  }
  function figHtml(fig, opts) {
    if (!fig) return '';
    opts = opts || {};
    var cap = fig.cap ? L(fig.cap) : '', inner = '', credits = '';
    if (fig.svg) inner = typeof fig.svg === 'function' ? fig.svg(L) : fig.svg;
    if (fig.photo) {
      inner = '<div class="photo"><img src="img/' + fig.photo + '.webp" alt="' + esc(cap || (credit(fig.photo) || {}).title || '') + '" loading="lazy"' + sizeAttr(fig.photo) + '>' + markHtml(fig.marks) + hotHtml(fig.hot, 'p') + '</div>';
      credits = creditLine(fig.photo);
    }
    if (fig.pair) {
      var sv = typeof fig.pair.svg === 'function' ? fig.pair.svg(L) : fig.pair.svg;
      inner = '<div class="pair"><div class="photo"><img src="img/' + fig.pair.photo + '.webp" alt="" loading="lazy"' + sizeAttr(fig.pair.photo) + '>' + hotHtml(fig.hot, 'p') + '</div>' +
        '<div class="schem">' + '<div style="position:relative;width:100%">' + sv + hotHtml(fig.hot, 's') + '</div></div></div>';
      credits = creditLine(fig.pair.photo);
    }
    if (fig.src) inner = '<div class="photo" style="background:transparent"><img src="' + (typeof fig.src === 'string' ? fig.src : L(fig.src)) + '" alt="' + esc(cap) + '" loading="lazy">' + hotHtml(fig.hot, 'p') + '</div>';
    if (fig.anim) inner = '<div class="anim" data-anim="' + fig.anim + '" data-opts="' + esc(JSON.stringify(fig.opts || {})) + '"></div>';
    if (fig.anim && fig.opts && fig.opts.photo) credits = creditLine(fig.opts.photo);
    var hotUI = '';
    if (fig.hot && !opts.quiz) {
      hotUI = '<div class="hotlist">' + fig.hot.map(function (h) { return '<button type="button" data-hotb="' + h.id + '">' + esc(L(h.label)) + '</button>'; }).join('') + '</div><div class="hotinfo muted small">' + T('tapHint') + '</div>';
    }
    var capHtml = (cap || credits) ? '<div class="cap">' + (cap ? esc(cap) : '') + (cap && credits ? '<br>' : '') + credits + '</div>' : '';
    return '<div class="' + (opts.quiz ? 'qfig' : 'fig') + '" data-fig>' + inner + hotUI + (opts.quiz ? '' : capHtml) + '</div>';
  }
  function sizeAttr(id) { var c = credit(id); return c && c.w ? ' width="' + c.w + '" height="' + c.h + '"' : ''; }
  function bindHot(root, fig) {
    if (!fig || !fig.hot) return;
    function sel(id) {
      $$('.hot', root).forEach(function (b) { b.classList.toggle('show', b.dataset.hot === id); });
      $$('[data-hotb]', root).forEach(function (b) { b.classList.toggle('on', b.dataset.hotb === id); });
      var h = fig.hot.filter(function (x) { return x.id === id; })[0];
      var info = $('.hotinfo', root); if (info && h) { info.classList.remove('muted'); info.innerHTML = '<b>' + esc(L(h.label)) + '</b>' + (h.info ? ' — ' + esc(L(h.info)) : ''); }
    }
    $$('.hot', root).forEach(function (b) { b.onclick = function () { sel(b.dataset.hot); }; });
    $$('[data-hotb]', root).forEach(function (b) { b.onclick = function () { sel(b.dataset.hotb); }; });
  }
  function mountAnims(root) {
    $$('.anim[data-anim]', root).forEach(function (el) {
      var fn = window.ANIM && ANIM[el.dataset.anim];
      if (!fn) { el.innerHTML = '<div class="readout">…</div>'; return; }
      var o = {}; try { o = JSON.parse(el.dataset.opts || '{}'); } catch (e) {}
      var hnd = fn(el, o, { L: L, fmt: fmt, lang: S.lang });
      if (hnd) animHandles.push(hnd);
    });
  }
  function stopAnims() { animHandles.forEach(function (h) { try { h.stop && h.stop(); } catch (e) {} }); animHandles = []; }

  // ---------- rendering frame ----------
  var view, cur = '';
  function setTitle(s, back) {
    $('#title').textContent = s; $('#back').hidden = !back;
    $('#lang').textContent = S.lang === 'uk' ? 'EN' : 'UA';
    document.documentElement.lang = S.lang;
    document.title = s;
  }
  function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
  function render() {
    stopAnims();
    var h = location.hash.replace(/^#/, '');
    cur = h;
    window.scrollTo(0, 0);
    if (!h) return (S.introSeen || window.RTB_PREVIEW) ? renderHome() : renderIntro();
    if (h === 'intro') return renderIntro();
    var m;
    if ((m = /^m-(m\d+)$/.exec(h)) && BYID[m[1]]) return renderModule(BYID[m[1]]);
    if ((m = /^q-(m\d+)$/.exec(h)) && BYID[m[1]]) return renderQuiz(BYID[m[1]]);
    if (h === 'settings') return renderSettings();
    if (h === 'glossary') return renderGlossary();
    if (h === 'credits') return renderCredits();
    if (h === 'about') return renderAbout();
    renderHome();
  }

  // ---------- home ----------
  function renderHome() {
    setTitle(S.lang === 'uk' ? 'Радіоелектроніка' : 'Radio Electronics', false);
    var passed = MODS.filter(function (m) { return mp(m.id).passed; }).length;
    var html = '<div class="eyebrow">' + T('version') + ' ' + VERSION_LABEL + '</div><h2 class="page">' + T('app') + '</h2><p class="lede">' + T('intro') + '</p><p class="muted small">' + T('note') + '</p><p><a class="introlink" href="#intro">' + (INTRO[S.lang] || INTRO.uk).link + '</a></p>';
    html += '<div class="progressbar" role="progressbar" aria-valuemin="0" aria-valuemax="' + MODS.length + '" aria-valuenow="' + passed + '"><i style="width:' + (MODS.length ? passed / MODS.length * 100 : 0) + '%"></i></div>';
    html += '<div class="small muted">' + T('progress') + ': ' + passed + ' ' + T('of') + ' ' + MODS.length + ' · ' + T('progressNote') + '</div>';
    Object.keys(PARTS).forEach(function (pk) {
      var list = MODS.filter(function (m) { return m.part === pk; }); if (!list.length) return;
      html += '<section class="part"><h3>' + L(PARTS[pk]) + '</h3><div class="mods">';
      list.forEach(function (m) {
        var st = mp(m.id), open = isOpen(m), cls = st.passed ? 'passed' : (open ? 'open' : 'locked');
        var chip = st.passed ? (st.cv && st.cv < (m.cv || 1) ? '<span class="chip new">' + T('updated') + '</span>' : '<span class="chip ok">' + T('passed') + '</span>') : (open ? '' : '<span class="chip lock">' + T('locked') + '</span>');
        html += '<button type="button" class="mod ' + cls + '" data-m="' + m.id + '"' + (open ? '' : ' aria-disabled="true"') + '><span class="n">' + m.n + '</span><span class="tt"><b>' + esc(L(m.title)) + '</b><span>' + esc(L(m.short || '')) + (st.best != null ? ' · ' + st.best + '/' + PER_TEST : '') + '</span></span>' + chip + '</button>';
      });
      html += '</div></section>';
    });
    html += '<div class="footer-links"><a class="btn quiet" href="#intro">' + (INTRO[S.lang] || INTRO.uk).title + '</a><a class="btn quiet" id="formulas" href="files/formulas-' + S.lang + '.pdf" target="_blank" rel="noopener">' + T('formulas') + '</a><a class="btn quiet" href="#glossary">' + T('glossary') + '</a><a class="btn quiet" href="#credits">' + T('credits') + '</a><a class="btn quiet" href="#about">' + T('about') + '</a></div>';
    view.innerHTML = html;
    bindFormulas($('#formulas', view));
    $$('.mod', view).forEach(function (b) {
      b.onclick = function () {
        var m = BYID[b.dataset.m];
        if (!isOpen(m)) { toast(T('lockedNote')); return; }
        go('#m-' + m.id);
      };
    });
  }
  var toastT;
  function toast(msg) {
    var t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status');
      t.style.cssText = 'position:fixed;left:50%;bottom:calc(20px + env(safe-area-inset-bottom));transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:12px;font-size:14px;z-index:60;max-width:90vw;text-align:center';
      document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2600);
  }

  // ---------- module page ----------
  function stepHtml(m, s, opt) {
    opt = opt || {};
    var k = s.kind || 1;
    var html = '<article class="step" id="st-' + m.id + '-' + s.id + '">';
    html += '<div class="step-h"><span class="kind k' + k + '">' + T('kinds')[k - 1] + '</span></div>';
    html += '<h3>' + esc(L(s.title)) + '</h3>';
    html += '<div class="body">' + L(s.body) + '</div>';
    if (s.fig) html += figHtml(s.fig);
    if (s.body2) html += '<div class="body">' + L(s.body2) + '</div>';
    if (s.fig2) html += figHtml(s.fig2);
    if (s.recall && s.recall.length && !opt.noRecall) {
      html += '<div class="recall">' + s.recall.map(function (r) {
        var rm = BYID[r.m], rs = rm && rm.steps.filter(function (x) { return x.id === r.s; })[0];
        if (!rm || !rs) return '';
        return '<button type="button" data-rm="' + r.m + '" data-rs="' + r.s + '">↺ ' + T('recall') + ': ' + T('module') + ' ' + rm.n + ' · ' + esc(L(r.label || rs.title)) + '</button>';
      }).join('') + '</div>';
    }
    return html + '</article>';
  }
  function bindSteps(root, m) {
    m.steps.forEach(function (s) { var el = $('#st-' + m.id + '-' + s.id, root); if (el && s.fig) bindHot(el, s.fig); });
    $$('[data-rm]', root).forEach(function (b) { b.onclick = function () { openRecall(b.dataset.rm, b.dataset.rs); }; });
    mountAnims(root);
  }
  function openRecall(mid, sid) {
    var m = BYID[mid], s = m.steps.filter(function (x) { return x.id === sid; })[0];
    var bg = document.createElement('div'); bg.className = 'sheet-bg';
    bg.innerHTML = '<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-h"><b>' + T('recall') + ': ' + T('module') + ' ' + m.n + ' · ' + esc(L(m.title)) + '</b><button class="icon-btn" type="button" data-close aria-label="×"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' + stepHtml(m, s, { noRecall: true }) + '</div>';
    document.body.appendChild(bg);
    var el = $('.step', bg); if (s.fig) bindHot(el, s.fig); mountAnims(bg);
    function close() { bg.remove(); }
    bg.onclick = function (e) { if (e.target === bg || e.target.closest('[data-close]')) close(); };
  }

  function renderModule(m) {
    setTitle(T('module') + ' ' + m.n, true);
    var html = '<div class="eyebrow">' + T('module') + ' ' + m.n + ' · ' + L(PARTS[m.part]) + '</div>';
    html += '<h2 class="page">' + esc(L(m.title)) + '</h2><p class="lede">' + L(m.intro) + '</p>';
    var kinds = {}; m.steps.forEach(function (s) { kinds[s.kind || 1] = 1; });
    var warm = pickWarm(m);
    if (warm.length) {
      html += '<section class="warm"><h3>' + T('warmT') + '</h3><div class="small">' + T('warmD') + '</div>' + warm.map(function (q, i) { return '<div class="q" data-wq="' + i + '"></div>'; }).join('') + '</section>';
    }
    html += m.steps.map(function (s) { return stepHtml(m, s); }).join('');
    if (m.sources && m.sources.length) {
      html += '<section class="sources"><h3>' + T('sources') + '</h3><ul>' + m.sources.map(function (s) {
        return '<li>' + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(L(s.t)) + '</a>' : esc(L(s.t))) + (s.note ? ' — <span class="muted">' + esc(L(s.note)) + '</span>' : '') + '</li>';
      }).join('') + '</ul></section>';
    }
    html += '<div style="margin-top:22px"><a class="btn wide" href="#q-' + m.id + '">' + T('startTest') + '</a></div>';
    view.innerHTML = html;
    bindSteps(view, m);
    warm.forEach(function (q, i) { miniQuestion($('[data-wq="' + i + '"]', view), q); });
  }

  // ---------- question instancing ----------
  function instance(q) {
    var base = { id: q.id, mod: q.mod, src: q, type: q.type || 'mc' };
    if (q.type === 'calc') {
      var g = q.gen(R, { fmt: fmt, L: L, numOpts: numOpts, needD: needD, lang: S.lang });
      base.q = g.q; base.fig = g.fig || q.fig; base.ex = g.ex;
      var order = shuffle(g.opts.map(function (o, i) { return i; }));
      base.opts = order.map(function (i) { return g.opts[i]; }); base.a = order.indexOf(g.a);
      base.type = 'mc';
      return base;
    }
    base.q = q.q; base.fig = q.fig; base.ex = q.ex;
    if (q.type === 'tap') { base.a = q.a; return base; }
    var ord = shuffle(q.opts.map(function (o, i) { return i; }));
    base.opts = ord.map(function (i) { return q.opts[i]; }); base.a = ord.indexOf(q.a);
    return base;
  }
  function weightOwn(q) { var st = P.q[q.id]; if (!st || !st.s) return 3; if ((st.w || 0) > (st.r || 0)) return 4; if (st.w) return 2; return 1; }
  function weightReview(q) { var st = P.q[q.id]; if (!st || !st.s) return 0.6; return st.w ? 2 + Math.min(st.w, 3) : 0.8; }
  function wsample(items, wfn, n) {
    var pool = items.map(function (x) { return { x: x, w: wfn(x) }; }), out = [];
    while (out.length < n && pool.length) {
      var tot = pool.reduce(function (a, b) { return a + b.w; }, 0), r = Math.random() * tot, i = 0;
      for (; i < pool.length - 1; i++) { r -= pool[i].w; if (r <= 0) break; }
      out.push(pool[i].x); pool.splice(i, 1);
    }
    return out;
  }
  function priorQuestions(m) {
    var out = []; MODS.forEach(function (x) { if (x.n < m.n) out = out.concat(x.quiz); }); return out;
  }
  // "Easter" questions: required to pass, not scored. Always in modules 1, 4, 7, …, sometimes in others.
  var EGGS = [
    { id: 'egg-ua', q: { uk: 'Слава Україні!', en: 'Слава Україні! <span class="muted">(Glory to Ukraine!)</span>' },
      opts: [{ uk: 'Героям слава!', en: 'Героям слава! <span class="muted">(Glory to the heroes!)</span>' }], a: 0,
      ex: { uk: 'Героям слава!', en: 'Героям слава! — Glory to the heroes!' } },
    { id: 'egg-chr', q: { uk: 'Слава Ісусу Христу!', en: 'Слава Ісусу Христу! <span class="muted">(Glory to Jesus Christ!)</span>' },
      opts: [{ uk: 'Слава навіки!', en: 'Слава навіки! <span class="muted">(Glory forever!)</span>' }], a: 0,
      ex: { uk: 'Слава навіки!', en: 'Слава навіки! — Glory forever!' } }
  ];
  function eggFor(m) {
    if (m.n % 3 !== 1 && Math.random() > 0.3) return null;
    var e = EGGS[Math.floor(Math.random() * EGGS.length)];
    var it = instance(e); it.egg = true; it.mod = m.id; return it;
  }
  function buildAttempt(m) {
    var prior = priorQuestions(m);
    var nRev = prior.length ? Math.min(3, prior.length) : 0;
    var nOwn = Math.min(PER_TEST - nRev, m.quiz.length);
    nRev = Math.min(PER_TEST - nOwn, prior.length);
    var qs = wsample(m.quiz, weightOwn, nOwn).concat(wsample(prior, weightReview, nRev));
    var items = shuffle(qs).map(instance), egg = eggFor(m);
    if (egg) items.unshift(egg);
    return items;
  }
  function pickWarm(m) {
    var prior = MODS.filter(function (x) { return x.n < m.n && x.n >= m.n - 3; }).reduce(function (a, x) { return a.concat(x.quiz); }, []);
    if (!prior.length) return [];
    if (m.warm) { var fixed = m.warm.map(function (id) { return QBYID[id]; }).filter(Boolean); if (fixed.length) return shuffle(fixed).slice(0, 2).map(instance); }
    return wsample(prior.filter(function (q) { return q.type !== 'tap'; }), weightReview, 2).map(instance);
  }
  function record(id, ok) { var st = P.q[id] || (P.q[id] = { s: 0, w: 0, r: 0 }); st.s++; if (ok) st.r++; else { st.w++; st.lw = Date.now(); } saveP(); }

  // A self-contained question widget used by warm-ups.
  function miniQuestion(el, q) {
    el.innerHTML = '<div style="font-weight:600;margin-bottom:8px">' + L(q.q) + '</div>' + (q.fig ? figHtml(q.fig, { quiz: true }) : '') + '<div class="opts">' + (q.opts || []).map(function (o, i) { return '<button type="button" class="opt" data-i="' + i + '">' + L(o) + '</button>'; }).join('') + '</div><div data-ex></div>';
    mountAnims(el);
    $$('.opt', el).forEach(function (b) {
      b.onclick = function () {
        var i = +b.dataset.i, ok = i === q.a;
        record(q.id, ok);
        $$('.opt', el).forEach(function (x) { x.disabled = true; if (+x.dataset.i === q.a) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        $('[data-ex]', el).innerHTML = '<div class="explain"><b>' + (ok ? T('right') : T('wrong')) + '.</b> ' + L(q.ex) + recallLink(q) + '</div>';
        bindRecallLinks(el);
      };
    });
  }
  function recallLink(q) {
    var src = q.src || q; if (!src.see) return '';
    var m = BYID[src.see.m] || BYID[q.mod]; if (!m) return '';
    return ' <button type="button" class="tog" style="margin-top:8px;display:block" data-rm="' + m.id + '" data-rs="' + src.see.s + '">↺ ' + T('recall') + ': ' + T('module') + ' ' + m.n + '</button>';
  }
  function bindRecallLinks(root) { $$('[data-rm]', root).forEach(function (b) { b.onclick = function () { openRecall(b.dataset.rm, b.dataset.rs); }; }); }

  // ---------- quiz ----------
  var Q = null;
  function renderQuiz(m) {
    if (!isOpen(m)) { go('#'); return; }
    if (!Q || Q.mod !== m.id || Q.done) Q = { mod: m.id, items: buildAttempt(m), i: 0, sel: null, checked: false, score: 0, wrong: [] };
    if (Q.i >= Q.items.length) return renderResult(m);
    setTitle(T('test') + ' · ' + T('module') + ' ' + m.n, true);
    var q = Q.items[Q.i], isRev = q.mod !== m.id;
    var bar = Q.items.map(function (x, i) { return '<i class="' + (i < Q.i ? 'done' : (i === Q.i ? 'cur' : '')) + '"></i>'; }).join('');
    var html = '<div class="qbar" aria-hidden="true">' + bar + '</div>';
    html += '<div class="qcard"><div class="qhead"><span class="qtag">' + (q.egg ? '&nbsp;' : (Q.i + 1 - (Q.items[0].egg ? 1 : 0)) + ' ' + T('of') + ' ' + nScored()) + '</span>' + (isRev ? '<span class="chip new">' + T('review') + ' · ' + T('module') + ' ' + BYID[q.mod].n + '</span>' : '') + '</div>';
    html += '<div class="qtext">' + L(q.q) + '</div>';
    if (q.fig) html += figHtml(q.fig, { quiz: true });
    if (q.type === 'tap') html += '<div class="small muted" style="margin-bottom:6px">' + T('tapQ') + '</div>';
    else html += '<div class="opts">' + q.opts.map(function (o, i) { return '<button type="button" class="opt" data-i="' + i + '">' + L(o) + '</button>'; }).join('') + '</div>';
    html += '<div data-ex></div><div style="margin-top:14px"><button class="btn wide" type="button" id="qgo" disabled>' + T('check') + '</button></div></div>';
    view.innerHTML = html;
    mountAnims(view);
    var goBtn = $('#qgo');
    if (q.type === 'tap') {
      $$('.hot', view).forEach(function (b) { b.onclick = function () { if (Q.checked) return; $$('.hot', view).forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); Q.sel = b.dataset.hot; goBtn.disabled = false; }; });
    } else {
      $$('.opt', view).forEach(function (b) { b.onclick = function () { if (Q.checked) return; $$('.opt', view).forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); Q.sel = +b.dataset.i; goBtn.disabled = false; }; });
    }
    goBtn.onclick = function () {
      if (!Q.checked) {
        var ok = q.type === 'tap' ? Q.sel === q.a : Q.sel === q.a;
        Q.checked = true;
        if (q.egg) { if (!ok) Q.eggFail = true; }
        else { record(q.id, ok); if (ok) Q.score++; else Q.wrong.push(q); }
        if (q.type === 'tap') {
          $$('.hot', view).forEach(function (x) { if (x.dataset.hot === q.a) x.classList.add('right'); else if (x.dataset.hot === Q.sel) x.classList.add('wrong'); x.classList.remove('sel'); });
        } else {
          $$('.opt', view).forEach(function (x) { x.disabled = true; var i = +x.dataset.i; x.classList.remove('sel'); if (q.egg) { if (i === Q.sel) x.classList.add(ok ? 'right' : 'sel'); return; } if (i === q.a) x.classList.add('right'); else if (i === Q.sel) x.classList.add('wrong'); });
        }
        if (q.egg && ok) $('[data-ex]', view).innerHTML = '<div class="explain"><b>' + T('right') + '!</b></div>';
        if (!q.egg) $('[data-ex]', view).innerHTML = '<div class="explain"><b>' + (ok ? T('right') : T('wrong')) + '.</b> ' + L(q.ex) + recallLink(q) + '</div>';
        bindRecallLinks(view);
        goBtn.textContent = Q.i === Q.items.length - 1 ? T('finish') : T('next');
      } else {
        Q.i++; Q.sel = null; Q.checked = false; renderQuiz(m);
      }
    };
  }
  function nScored() { return Q.items.filter(function (x) { return !x.egg; }).length; }
  function renderResult(m) {
    setTitle(T('test') + ' · ' + T('module') + ' ' + m.n, true);
    var st = mp(m.id), passed = Q.score >= PASS && !Q.eggFail;
    if (!Q.done) {
      Q.done = true;
      st.attempts = (st.attempts || 0) + 1;
      st.best = Math.max(st.best || 0, Q.score);
      if (passed) { st.passed = true; st.cv = m.cv || 1; st.when = Date.now(); }
      saveP();
    }
    var next = MODS.filter(function (x) { return x.n > m.n; })[0];
    var html = '<div class="eyebrow">' + T('module') + ' ' + m.n + ' · ' + esc(L(m.title)) + '</div>';
    html += '<div class="score ' + (passed ? 'result-ok' : 'result-bad') + '">' + Q.score + '/' + nScored() + '</div>';
    html += '<h2 class="page" style="margin-top:0">' + (passed ? T('passedT') : T('failedT')) + '</h2>';
    if (!passed) html += '<p class="lede">' + (Q.eggFail && Q.score >= PASS ? '' : T('needed')) + ' ' + T('retryNote') + '</p>';
    html += '<div class="row" style="margin-top:14px">';
    if (passed && next) html += '<a class="btn" href="#m-' + next.id + '">' + T('nextModule') + ' →</a>';
    html += '<button class="btn ' + (passed ? 'ghost' : '') + '" type="button" id="again">' + T('retry') + '</button>';
    html += '<a class="btn quiet" href="#m-' + m.id + '">' + T('toLessons') + '</a></div>';
    if (Q.wrong.length) {
      html += '<section class="review"><h3>' + T('mistakes') + '</h3>' + Q.wrong.map(function (q) {
        var ans = q.type === 'tap' ? '' : '<div class="small"><b>' + T('correctIs') + ':</b> ' + L(q.opts[q.a]) + '</div>';
        return '<div class="qcard"><div class="qtext" style="font-size:16px;margin-top:0">' + L(q.q) + '</div>' + ans + '<div class="explain">' + L(q.ex) + recallLink(q) + '</div></div>';
      }).join('') + '</section>';
    }
    html += '<div style="margin-top:20px"><a class="btn quiet wide" href="#">' + T('home') + '</a></div>';
    view.innerHTML = html;
    bindRecallLinks(view);
    $('#again').onclick = function () { Q = null; renderQuiz(m); };
  }

  // ---------- settings ----------
  function renderSettings() {
    setTitle(T('settings'), true);
    var mail = FEEDBACK_EMAIL;
    var html = '<h2 class="page">' + T('settings') + '</h2>';
    html += '<div class="set"><h3>' + T('lang') + '</h3><div class="seg"><button type="button" data-l="uk" aria-pressed="' + (S.lang === 'uk') + '"><b>Українська</b></button><button type="button" data-l="en" aria-pressed="' + (S.lang === 'en') + '"><b>English</b></button></div></div>';
    html += '<div class="set"><h3>' + T('upd') + '</h3><div class="seg"><button type="button" data-u="ask" aria-pressed="' + (S.updateMode === 'ask') + '"><b>' + T('ask') + '</b><span>' + T('askD') + '</span></button><button type="button" data-u="auto" aria-pressed="' + (S.updateMode === 'auto') + '"><b>' + T('auto') + '</b><span>' + T('autoD') + '</span></button></div><div class="small muted">' + T('version') + ' ' + VERSION_LABEL + '</div></div>';
    html += '<div class="set"><h3>' + T('offline') + '</h3><div class="small muted">' + T('offlineD') + '</div><button class="btn ghost" type="button" id="dl">' + T('offlineBtn') + '</button><div class="small" id="dlmsg" aria-live="polite"></div></div>';
    html += '<div class="set"><h3>' + T('feedback') + '</h3>' + (mail ? '<div class="small muted">' + T('feedbackD') + '</div><div class="mail" id="mail">' + esc(mail) + '</div><button class="btn quiet" type="button" id="copymail">' + T('copy') + '</button>' : '<div class="small muted">' + T('feedbackNone') + '</div>') + '</div>';
    html += '<div class="set"><h3>' + T('preview') + '</h3><div class="small muted">' + T('previewD') + '</div><div class="seg"><button type="button" data-p="0" aria-pressed="' + !S.preview + '"><b>' + T('off') + '</b></button><button type="button" data-p="1" aria-pressed="' + !!S.preview + '"><b>' + T('on') + '</b></button></div></div>';
    html += '<div class="set"><h3>' + T('reset') + '</h3><div class="small muted">' + T('resetD') + '</div><div class="row"><button class="btn quiet" type="button" id="reset">' + T('reset') + '</button></div><div class="row" id="resetsure" hidden><button class="btn" type="button" id="resetyes" style="background:var(--bad)">' + T('resetSure') + '</button><button class="btn quiet" type="button" id="resetno">' + T('cancel') + '</button></div></div>';
    view.innerHTML = html;
    $$('[data-l]', view).forEach(function (b) { b.onclick = function () { S.lang = b.dataset.l; saveS(); renderSettings(); }; });
    $$('[data-u]', view).forEach(function (b) { b.onclick = function () { S.updateMode = b.dataset.u; saveS(); renderSettings(); }; });
    $$('[data-p]', view).forEach(function (b) { b.onclick = function () { S.preview = b.dataset.p === '1'; saveS(); renderSettings(); }; });
    $('#dl').onclick = downloadAll;
    var cm = $('#copymail'); if (cm) cm.onclick = function () {
      try { navigator.clipboard.writeText(mail).then(function () { toast(T('copied')); }, sel); } catch (e) { sel(); }
      function sel() { var r = document.createRange(); r.selectNodeContents($('#mail')); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    };
    $('#reset').onclick = function () { $('#resetsure').hidden = false; };
    $('#resetno').onclick = function () { $('#resetsure').hidden = true; };
    $('#resetyes').onclick = function () { P = { mods: {}, q: {} }; saveP(); Q = null; toast(T('resetDone')); $('#resetsure').hidden = true; };
  }
  // Formulas PDF: share it as a file (messengers, Files, Save) where the device supports it; otherwise just open it.
  function bindFormulas(a) {
    if (!a) return;
    a.onclick = function (e) {
      if (!navigator.share || !navigator.canShare || !window.fetch || !window.File) return;
      e.preventDefault();
      fetch(a.href).then(function (r) { return r.blob(); }).then(function (b) {
        var file = new File([b], T('formulasFile'), { type: 'application/pdf' });
        if (navigator.canShare({ files: [file] })) return navigator.share({ files: [file], title: T('formulas') });
        window.open(a.href, '_blank');
      }).catch(function (err) { if (!err || err.name !== 'AbortError') window.open(a.href, '_blank'); });
    };
  }
  function allFiles() {
    var files = ['index.html', 'styles.css', 'files/formulas-uk.pdf', 'files/formulas-en.pdf'];
    $$('script[src]').forEach(function (s) { files.push(s.getAttribute('src')); });
    ['ibm-plex-sans-latin-400', 'ibm-plex-sans-cyrillic-400', 'ibm-plex-sans-latin-600', 'ibm-plex-sans-cyrillic-600', 'ibm-plex-sans-latin-700', 'ibm-plex-sans-cyrillic-700', 'ibm-plex-mono-latin-500', 'ibm-plex-mono-cyrillic-500']
      .forEach(function (f) { files.push('fonts/' + f + '-normal.woff2'); });
    return files.map(function (f) { return new URL(f, location.href).href; });
  }
  function precache(urls, cb) {
    if (!('serviceWorker' in navigator)) { cb && cb({ error: 'nosw' }); return; }
    navigator.serviceWorker.ready.then(function (reg) {
      var sw = reg.active; if (!sw) { cb && cb({ error: 'nosw' }); return; }
      var ch = new MessageChannel(); ch.port1.onmessage = function (e) { cb && cb(e.data); };
      sw.postMessage({ type: 'precache', version: VERSION, urls: urls }, [ch.port2]);
    });
  }
  function downloadAll() {
    var msg = $('#dlmsg');
    if (!('serviceWorker' in navigator)) { msg.textContent = T('offlineNoSW'); return; }
    var imgs = Object.keys(window.CREDITS || {}).map(function (id) { return new URL('img/' + id + '.webp', location.href).href; });
    msg.textContent = '0%';
    precache(allFiles().concat(imgs), function (d) {
      if (d.error) { msg.textContent = T('offlineNoSW'); return; }
      msg.textContent = Math.round(d.done / d.total * 100) + '%';
      if (d.done === d.total) msg.textContent = d.failed ? T('offlineFail') : T('offlineDone');
    });
  }

  // ---------- glossary, credits, about ----------
  function renderGlossary() {
    setTitle(T('glossary'), true);
    var G = (window.GLOSSARY || []).slice().sort(function (a, b) { return L(a.t).localeCompare(L(b.t), S.lang); });
    view.innerHTML = '<h2 class="page">' + T('glossary') + '</h2><input type="search" id="gq" placeholder="' + T('search') + '" aria-label="' + T('search') + '"><dl class="gl" id="gl"></dl>';
    function draw(f) {
      f = (f || '').toLowerCase();
      $('#gl').innerHTML = G.filter(function (g) { return !f || (g.t.uk + ' ' + g.t.en + ' ' + L(g.d)).toLowerCase().indexOf(f) >= 0; }).map(function (g) {
        var other = S.lang === 'uk' ? g.t.en : g.t.uk;
        return '<dt>' + esc(L(g.t)) + ' <span>· ' + esc(other) + '</span></dt><dd>' + esc(L(g.d)) + '</dd>';
      }).join('');
    }
    draw(''); $('#gq').oninput = function () { draw(this.value); };
  }
  function renderCredits() {
    setTitle(T('credits'), true);
    var C = window.CREDITS || {};
    view.innerHTML = '<h2 class="page">' + T('credits') + '</h2><p class="lede">' + T('aboutT') + '</p><div class="list">' + Object.keys(C).map(function (id) {
      var c = C[id];
      return '<div class="item credit"><img src="img/' + id + '.webp" alt="" loading="lazy"><div><b>' + esc(c.title) + '</b>' + esc(c.author) + ' · ' + (c.licence_url ? '<a href="' + esc(c.licence_url) + '" target="_blank" rel="noopener">' + esc(c.licence) + '</a>' : esc(c.licence)) + (c.page ? ' · <a href="' + esc(c.page) + '" target="_blank" rel="noopener">Commons</a>' : '') + '</div></div>';
    }).join('') + '</div>';
  }
  // ---------- intro (shown on first launch; later reachable from the home page and footer) ----------
  var INTRO = {
    uk: { title: 'Вступ', hello: 'Привіт!', text: ['Це — курс, який був створений мною для себе, бо мені було цікаво розібратися в тому, як читати плати і розуміти, що за пристрій переді мною і які його параметри. З розумінням, що основна аудиторія — це технологічна спільнота сучасного українського спротиву російській агресії, приклади і аналогії проведені саме з тим, чого ми торкаємось (явно чи теоретично) щодня — FPV, РЕБ, тощо.', 'Пройшовши його, мені стали зрозумілі певні речі, які були забуті чи не з’ясовані до кінця. Втім, це тільки перший крок. Тому буду дуже радий і вдячний за відгуки, які зможу покласти в оновлення і таким чином зробити цей ресурс більш корисним для багатьох інших зацікавлених.'],
      installH: 'Як зробити з курсу додаток на телефоні', installP: 'Якщо хочемо, щоб курс працював офлайн на телефоні, як додаток, робимо наступне:',
      ios: ['Відкриваємо сайт курсу в <b>Safari</b>.', 'Натискаємо кнопку <b>«Поділитися»</b> — квадрат зі стрілкою вгору (внизу або вгорі екрана).', 'Гортаємо список униз і вибираємо <b>«На Початковий екран»</b> (англійською — Add to Home Screen). Якщо пункту немає — у самому низу списку натискаємо «Редагувати дії» і додаємо його.', 'Натискаємо <b>«Додати»</b>. На екрані з’явиться значок «Радіоелектроніка».'],
      android: ['Відкриваємо сайт курсу в <b>Chrome</b>.', 'Натискаємо меню <b>⋮</b> (три крапки вгорі праворуч).', 'Вибираємо <b>«Установити додаток»</b> або <b>«Додати на головний екран»</b> (англійською — Install app / Add to Home screen). Chrome може й сам запропонувати встановлення внизу екрана.', 'Підтверджуємо. Значок «Радіоелектроніка» з’явиться серед додатків.'],
      last: '<b>Останній крок, поки є інтернет:</b> відкриваємо курс зі значка, заходимо в Налаштування (шестерня вгорі) і натискаємо <b>«Завантажити всі фото»</b>. Після напису «Готово» курс працює без мережі. Поступ зберігається на цьому телефоні.',
      fbH: 'Зауваження і пропозиції', fbP: 'Якщо маємо зауваження чи пропозиції по курсу — пишемо на:', fbNone: 'Якщо маємо зауваження чи пропозиції по курсу — адресу для листів буде додано тут найближчим часом.',
      go: 'Почати курс', back: 'До модулів', link: 'Вступ: про курс і як встановити на телефон →' },
    en: { title: 'Introduction', hello: 'Hi!', text: ['I made this course for myself, because I wanted to understand how to read circuit boards — to tell what device is in front of me and what its parameters are. Since the main audience is the technology community of today’s Ukrainian resistance to Russian aggression, the examples and analogies are drawn from what we deal with (directly or in theory) every day — FPV, EW and so on.', 'Going through it made clear to me some things I had forgotten or never fully worked out. Still, this is only a first step. So I will be very glad and grateful for feedback, which I can put into updates and so make this resource more useful for many others who are interested.'],
      installH: 'How to turn the course into an app on your phone', installP: 'To make the course work offline on a phone, like an app, do the following:',
      ios: ['Open the course site in <b>Safari</b>.', 'Tap the <b>Share</b> button — a square with an arrow pointing up (at the bottom or top of the screen).', 'Scroll down and choose <b>Add to Home Screen</b>. If it is missing, tap “Edit Actions” at the very bottom of the list and add it.', 'Tap <b>Add</b>. The “Радіоелектроніка” icon appears on the screen.'],
      android: ['Open the course site in <b>Chrome</b>.', 'Tap the <b>⋮</b> menu (three dots, top right).', 'Choose <b>Install app</b> or <b>Add to Home screen</b>. Chrome may also offer to install it at the bottom of the screen by itself.', 'Confirm. The “Радіоелектроніка” icon appears among your apps.'],
      last: '<b>One last step while you are online:</b> open the course from the icon, go to Settings (the gear at the top) and tap <b>Download all photos</b>. Once it says “Done”, the course works without a network. Progress is stored on this phone.',
      fbH: 'Comments and suggestions', fbP: 'If you have comments or suggestions about the course, write to:', fbNone: 'If you have comments or suggestions about the course, an email address will be added here soon.',
      go: 'Start the course', back: 'To the modules', link: 'Introduction: about the course and installing it on your phone →' }
  };
  function renderIntro() {
    var I = INTRO[S.lang] || INTRO.uk, mail = FEEDBACK_EMAIL, first = !S.introSeen;
    if (first) { S.introSeen = true; saveS(); }   // shown automatically only once
    setTitle(I.title, !first);
    var html = '<div class="intro"><h2 class="page">' + I.hello + '</h2>';
    html += I.text.map(function (p, n) { return '<p>' + p + '</p>'; }).join('');
    html += '<h3>' + I.installH + '</h3><p>' + I.installP + '</p>';
    html += '<div class="howto"><h4>iPhone</h4><ol>' + I.ios.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol></div>';
    html += '<div class="howto"><h4>Android</h4><ol>' + I.android.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol></div>';
    html += '<div class="inote">' + I.last + '</div>';
    html += '<h3>' + I.fbH + '</h3>';
    html += mail ? '<p>' + I.fbP + '</p><div class="mail" id="mail">' + esc(mail) + '</div><button class="btn quiet" type="button" id="copymail">' + T('copy') + '</button>' : '<p>' + I.fbNone + '</p>';
    html += '<p class="flag" aria-label="Україна">🇺🇦❤️🇺🇦</p>';
    html += '<button class="btn wide" type="button" id="start">' + (first ? I.go : I.back) + '</button></div>';
    view.innerHTML = html;
    $('#start').onclick = function () { S.introSeen = true; saveS(); if (location.hash) go(''); else render(); };
    var cm = $('#copymail'); if (cm) cm.onclick = function () {
      try { navigator.clipboard.writeText(mail).then(function () { toast(T('copied')); }, sel); } catch (e) { sel(); }
      function sel() { var r = document.createRange(); r.selectNodeContents($('#mail')); var g = getSelection(); g.removeAllRanges(); g.addRange(r); }
    };
  }

  function renderAbout() {
    setTitle(T('about'), true);
    view.innerHTML = '<h2 class="page">' + T('app') + '</h2><p class="lede">' + T('aboutT') + '</p><p class="small muted">' + T('version') + ' ' + VERSION_LABEL + ' · ' + T('progressNote') + '</p><div class="row"><a class="btn quiet" href="#credits">' + T('credits') + '</a><a class="btn quiet" href="#settings">' + T('settings') + '</a></div>';
  }

  // ---------- updates ----------
  function vnum(v) { return parseInt(String(v).replace(/\D/g, ''), 10) || 0; }
  function checkUpdates() {
    fetch('../versions.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) {
      if (!j || !j.latest || vnum(j.latest) <= vnum(VERSION)) return;
      if (S.updateMode === 'auto') { S.pinned = j.latest; saveS(); location.replace('../' + j.latest + '/'); return; }
      var info = (j.versions || []).filter(function (x) { return x.id === j.latest; })[0] || {};
      var b = $('#banner');
      b.innerHTML = '<div class="banner-in"><p><b>' + T('updAvail') + (info.label ? ' (' + esc(info.label) + ')' : '') + '</b></p>' + (info.notes ? '<p>' + esc(L(info.notes)) + '</p>' : '') + '<p class="small">' + T('updNote') + '</p><div class="row"><button class="btn" type="button" id="updnow">' + T('updNow') + '</button><button class="btn quiet" type="button" id="updlater">' + T('updLater') + '</button></div></div>';
      b.hidden = false;
      $('#updnow').onclick = function () { S.pinned = j.latest; saveS(); location.replace('../' + j.latest + '/'); };
      $('#updlater').onclick = function () { b.hidden = true; };
    }).catch(function () {});
  }

  // ---------- start ----------
  function start() {
    view = $('#view');
    if (!S.pinned) { S.pinned = VERSION; saveS(); }
    $('#lang').onclick = function () { S.lang = S.lang === 'uk' ? 'en' : 'uk'; saveS(); if (Q && !Q.done) { var keep = Q; render(); Q = keep; } else render(); };
    $('#menu').onclick = function () { go('#settings'); };
    $('#back').onclick = function () {
      var h = location.hash;
      if (/^#q-/.test(h)) go('#m-' + h.slice(3)); else go('#');
    };
    window.addEventListener('hashchange', render);
    render();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../sw.js').then(function () { precache(allFiles()); }).catch(function () {});
    }
    checkUpdates();
  }

  return { _cur: function () { return Q; }, _inst: instance, _q: QBYID, _build: function (id) { return buildAttempt(BYID[id]); }, module: module, start: start, L: L, fmt: fmt, D: function () { return D; }, mods: MODS, byId: BYID, numOpts: numOpts };
})();
