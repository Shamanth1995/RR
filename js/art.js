/* ==========================================================================
   Coorg River Rest — generated artwork
   Plain JavaScript that returns SVG markup strings:
     ART.vine({...})        coffee branches for the page edges
     ART.scene(kind, seed)  small illustrated scenes for cards
   No dependencies. Animations are CSS classes defined in css/styles.css.
   ========================================================================== */
(function () {
  'use strict';

  const W = 400, H = 250;
  const f = (n) => Math.round(n * 10) / 10;
  const attrs = (o) =>
    Object.entries(o)
      .map(([k, v]) => (v === undefined || v === null || v === false ? '' : ` ${k}="${v}"`))
      .join('');
  const t = (name, o = {}, inner) =>
    inner === undefined
      ? `<${name}${attrs(o)}/>`
      : `<${name}${attrs(o)}>${Array.isArray(inner) ? inner.join('') : inner}</${name}>`;

  function rng(seed) {
    return () => {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }

  const stops = (list) => list.map(([o, c, op]) => t('stop', { offset: o, 'stop-color': c, 'stop-opacity': op }));
  const lin = (id, list, x2 = 0, y2 = 1) => t('linearGradient', { id, x1: 0, y1: 0, x2, y2 }, stops(list));
  const rad = (id, list, extra = {}) => t('radialGradient', { id, ...extra }, stops(list));

  /* ------------------------------------------------------------------------
     Coffee vine
     ------------------------------------------------------------------------ */
  function vine({ L, W: VW, seed, density = 'lush', uid, horizontal = false, cherries = true, blossoms = true }) {
    const r = rng(seed), lush = density !== 'light';
    const stems = [
      { amp: VW * 0.17, f: 0.0105, ph: r() * 6, w: 2.6, op: 1 },
      { amp: VW * 0.24, f: 0.0082, ph: r() * 6 + 2, w: 1.3, op: 0.75 },
    ];
    const sx = (s, y) => VW * 0.36 + Math.sin(y * s.f + s.ph) * s.amp + Math.sin(y * s.f * 2.3 + s.ph * 1.7) * s.amp * 0.35;
    const kids = [];

    stems.forEach((s, i) => {
      let d = `M${f(sx(s, -10))} -10`;
      for (let y = 0; y <= L + 12; y += 10) d += ` L${f(sx(s, y))} ${y}`;
      kids.push(t('path', { d, fill: 'none', stroke: `url(#${uid}-stem)`, 'stroke-width': s.w, 'stroke-linecap': 'round', opacity: s.op }));
    });

    const leaf = (sz, g, op) => {
      const w = sz * 0.36;
      const body = `M0 0 C${f(sz * 0.15)} ${f(-w)} ${f(sz * 0.55)} ${f(-w * 1.15)} ${f(sz * 0.82)} ${f(-w * 0.45)} Q${f(sz * 0.93)} ${f(-w * 0.15)} ${f(sz)} 0 Q${f(sz * 0.93)} ${f(w * 0.15)} ${f(sz * 0.82)} ${f(w * 0.45)} C${f(sz * 0.55)} ${f(w * 1.15)} ${f(sz * 0.15)} ${f(w)} 0 0Z`;
      const gloss = `M0 0 C${f(sz * 0.15)} ${f(-w)} ${f(sz * 0.55)} ${f(-w * 1.15)} ${f(sz * 0.82)} ${f(-w * 0.45)} Q${f(sz * 0.93)} ${f(-w * 0.15)} ${f(sz)} 0Z`;
      let veins = `M${f(sz * 0.04)} 0 Q${f(sz * 0.5)} ${f(-w * 0.06)} ${f(sz * 0.95)} 0`;
      [0.22, 0.4, 0.58, 0.74].forEach((p) => {
        veins += ` M${f(sz * p)} 0 Q${f(sz * (p + 0.06))} ${f(-w * 0.4)} ${f(sz * (p + 0.15))} ${f(-w * 0.62)}`;
        veins += ` M${f(sz * p)} 0 Q${f(sz * (p + 0.06))} ${f(w * 0.4)} ${f(sz * (p + 0.15))} ${f(w * 0.62)}`;
      });
      return [
        t('path', { d: body, fill: `url(#${uid}-g${g})`, opacity: op }),
        t('path', { d: gloss, fill: '#fff', opacity: 0.09 }),
        t('path', { d: veins, fill: 'none', stroke: 'oklch(0.82 0.08 145 / .42)', 'stroke-width': 0.6 }),
      ].join('');
    };

    const cherryColors = ['oklch(0.52 0.19 27)', 'oklch(0.52 0.19 27)', 'oklch(0.44 0.16 22)', 'oklch(0.60 0.18 40)', 'oklch(0.70 0.14 125)', 'oklch(0.78 0.14 90)'];

    let y = 6 + r() * 10, side = 1, n = 0;
    while (y < L) {
      const s = r() < 0.72 ? stems[0] : stems[1];
      const x = sx(s, y);
      if (r() < 0.82) side = -side;
      const pair = r() < 0.45;
      const sz = (lush ? 15 : 12) + r() * (lush ? 22 : 15);
      const placeLeaf = (sd, k) => {
        const ang = sd > 0 ? -18 - r() * 46 : 198 + r() * 46;
        const g = Math.floor(r() * 3);
        const dur = (4 + r() * 4).toFixed(2), del = (-r() * 8).toFixed(2);
        kids.push(
          t('g', { transform: `translate(${f(x)} ${f(y)}) rotate(${ang.toFixed(0)})` },
            t('g', { class: 'sway', style: `animation-duration:${dur}s;animation-delay:${del}s` }, [
              t('path', { d: 'M0 0 L4 0', stroke: 'oklch(0.40 0.06 140)', 'stroke-width': 1 }),
              t('g', { transform: 'translate(3 0)' }, leaf(sz * (k ? 0.85 : 1), g, (0.82 + r() * 0.18).toFixed(2))),
            ])
          )
        );
      };
      placeLeaf(side, 0);
      if (pair) placeLeaf(-side, 1);

      if (cherries && r() < (lush ? 0.22 : 0.12)) {
        const count = 3 + Math.floor(r() * 4);
        const berries = [];
        for (let k = 0; k < count; k++) {
          const a = r() * Math.PI * 2, rr = 2 + r() * 4.2;
          const cx = x + Math.cos(a) * rr + side * 1.5, cy = y + Math.sin(a) * rr * 0.75 + 2.5;
          const br = 2.8 + r() * 1.2;
          const col = cherryColors[Math.floor(r() * cherryColors.length)];
          berries.push(t('circle', { cx: f(cx), cy: f(cy), r: f(br), fill: col }));
          berries.push(t('circle', { cx: f(cx - br * 0.35), cy: f(cy - br * 0.38), r: f(br * 0.3), fill: '#fff', opacity: 0.55 }));
        }
        kids.push(t('g', { filter: `url(#${uid}-cs)` }, berries));
      }

      if (blossoms && r() < (lush ? 0.075 : 0.06)) {
        const bx = x + side * (9 + r() * 6), by = y - 4, pr = 3.4 + r() * 1.4;
        const petals = [0, 1, 2, 3, 4].map((k) => {
          const deg = k * 72 + r() * 10;
          const a = (deg * Math.PI) / 180;
          const px = bx + Math.cos(a) * pr * 0.95, py = by + Math.sin(a) * pr * 0.95;
          return t('ellipse', { cx: f(px), cy: f(py), rx: f(pr * 1.05), ry: f(pr * 0.34), transform: `rotate(${deg.toFixed(0)} ${f(px)} ${f(py)})`, fill: 'oklch(0.99 0.01 110)', opacity: 0.95 });
        });
        kids.push(
          t('g', { class: 'bloom', style: `animation-duration:${(3 + r() * 3).toFixed(1)}s;animation-delay:${(-r() * 5).toFixed(1)}s` }, [
            t('circle', { cx: f(bx), cy: f(by), r: f(pr * 4), fill: `url(#${uid}-glow)` }),
            ...petals,
            t('circle', { cx: f(bx), cy: f(by), r: f(pr * 0.45), fill: 'oklch(0.86 0.11 100)' }),
          ])
        );
      }

      y += lush ? 14 + r() * 16 : 26 + r() * 22;
      n++;
    }

    const grad = (id, a, b) => t('linearGradient', { id: `${uid}-${id}`, x1: 0, y1: 0, x2: 1, y2: 0 }, stops([[0, a], [1, b]]));
    const defs = t('defs', {}, [
      grad('g0', 'oklch(0.30 0.06 155)', 'oklch(0.50 0.11 150)'),
      grad('g1', 'oklch(0.36 0.08 148)', 'oklch(0.60 0.13 140)'),
      grad('g2', 'oklch(0.27 0.05 165)', 'oklch(0.44 0.08 158)'),
      lin(`${uid}-stem`, [[0, 'oklch(0.46 0.06 90)'], [1, 'oklch(0.36 0.05 120)']]),
      rad(`${uid}-glow`, [[0, 'oklch(0.95 0.04 110)', 0.4], [1, 'oklch(0.95 0.04 110)', 0]]),
      t('filter', { id: `${uid}-cs`, x: '-50%', y: '-50%', width: '200%', height: '200%' },
        t('feDropShadow', { dx: 0, dy: 0.8, stdDeviation: 0.6, 'flood-color': '#3a0f08', 'flood-opacity': 0.35 })),
    ]);
    const body = horizontal ? t('g', { transform: 'matrix(0 1 1 0 0 0)' }, kids) : t('g', {}, kids);
    return t('svg', {
      viewBox: horizontal ? `0 0 ${L} ${VW}` : `0 0 ${VW} ${L}`,
      preserveAspectRatio: horizontal ? 'xMinYMin slice' : 'xMidYMin slice',
      class: 'vine-svg',
      'aria-hidden': 'true',
      focusable: 'false',
    }, defs + body);
  }

  /* ------------------------------------------------------------------------
     Scene toolkit
     ------------------------------------------------------------------------ */
  let uidN = 0;
  function ctx(seed) {
    const c = { u: 'sc' + ++uidN, r: rng(seed), defs: [], b: [] };
    c.id = (n) => `${c.u}-${n}`;
    c.def = (s) => c.defs.push(s);
    c.add = (s) => c.b.push(s);
    return c;
  }
  const out = (c) =>
    t('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'xMidYMid slice', class: 'scene', 'aria-hidden': 'true', focusable: 'false' },
      t('defs', {}, c.defs) + c.b.join(''));

  function sky(c, list) {
    c.def(lin(c.id('sky'), list));
    c.add(t('rect', { width: W, height: H, fill: `url(#${c.id('sky')})` }));
  }
  function glow(c, cx, cy, r, color, op = 0.8, name = 'glow' + c.defs.length) {
    c.def(rad(c.id(name), [[0, color, op], [1, color, 0]]));
    c.add(t('circle', { cx, cy, r, fill: `url(#${c.id(name)})` }));
  }
  function ridgePts(c, y, amp, o = {}) {
    const p1 = c.r() * 6, p2 = c.r() * 6, f1 = o.f1 || 0.012, f2 = o.f2 || 0.031;
    const pts = [];
    for (let x = -4; x <= W + 8; x += 8) {
      let yy = y + Math.sin(x * f1 + p1) * amp + Math.sin(x * f2 + p2) * amp * 0.35;
      (o.peaks || []).forEach((pk) => { yy -= pk.h * Math.exp(-((x - pk.x) ** 2) / (2 * pk.w ** 2)); });
      pts.push([x, yy]);
    }
    return pts;
  }
  const ptsToLine = (pts, dy = 0) => 'M' + pts.map(([x, y]) => `${f(x)} ${f(y + dy)}`).join(' L');
  const ptsToShape = (pts) => `M-4 ${H + 4} L` + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join(' L') + ` L${W + 8} ${H + 4} Z`;
  function hills(c, y, amp, fill, o = {}) {
    const pts = ridgePts(c, y, amp, o);
    c.add(t('path', { d: ptsToShape(pts), fill, opacity: o.op }));
    return pts;
  }
  function canopy(c, y, rMin, rMax, fill, jit = 4, op) {
    let x = -14, d = `M-14 ${H + 4} L-14 ${f(y)}`;
    while (x < W + 14) {
      const rr = rMin + c.r() * (rMax - rMin), dx = rr * 1.5, ny = y + (c.r() - 0.5) * 2 * jit;
      d += ` A${f(rr)} ${f(rr)} 0 0 1 ${f(x + dx)} ${f(ny)}`;
      x += dx;
    }
    c.add(t('path', { d: d + ` L${W + 14} ${H + 4} Z`, fill, opacity: op }));
  }
  function mist(c, y, h, op = 0.6, color = '#fff') {
    const id = c.id('mist' + c.defs.length);
    c.def(lin(id, [[0, color, 0], [0.5, color, op], [1, color, 0]]));
    c.add(t('rect', { x: -10, y, width: W + 20, height: h, fill: `url(#${id})` }));
  }
  function stars(c, n, maxY, color = '#fff') {
    for (let i = 0; i < n; i++) {
      c.add(t('circle', {
        cx: f(c.r() * W), cy: f(c.r() * maxY), r: f(0.4 + c.r() * 1.1), fill: color,
        class: 'tw', style: `animation-delay:${(-c.r() * 4).toFixed(2)}s;animation-duration:${(2 + c.r() * 3).toFixed(1)}s`,
      }));
    }
  }
  function grass(c, y, n, colors, hMin = 6, hMax = 16) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const x = c.r() * W, h = hMin + c.r() * (hMax - hMin), lean = (c.r() - 0.5) * 8;
      d += `M${f(x)} ${f(y + c.r() * 10)} q${f(lean * 0.3)} ${f(-h * 0.6)} ${f(lean)} ${f(-h)} `;
    }
    c.add(t('path', { d, stroke: colors, 'stroke-width': 1.2, fill: 'none', 'stroke-linecap': 'round' }));
  }
  function areca(c, x, base, h, color, lean = 0) {
    const tx = x + lean, ty = base - h;
    let s = t('path', { d: `M${x} ${base} Q${f(x + lean * 0.3)} ${f(base - h * 0.5)} ${f(tx)} ${f(ty)}`, stroke: color, 'stroke-width': 2.2, fill: 'none' });
    for (let i = 0; i < 8; i++) {
      const a = -Math.PI / 2 + (i - 3.5) * 0.42 + (c.r() - 0.5) * 0.2, len = 16 + c.r() * 8;
      const ex = tx + Math.cos(a) * len, ey = ty + Math.sin(a) * len * 0.6 + len * 0.45;
      const qx = tx + Math.cos(a) * len * 0.5, qy = ty + Math.sin(a) * len * 0.6 - 4;
      s += t('path', { d: `M${f(tx)} ${f(ty)} Q${f(qx)} ${f(qy)} ${f(ex)} ${f(ey)}`, stroke: color, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' });
    }
    c.add(s);
  }
  function silverOak(c, x, base, h, trunk, leaf) {
    let s = t('path', { d: `M${x} ${base} L${f(x + 1)} ${f(base - h)}`, stroke: trunk, 'stroke-width': 1.6 });
    for (let i = 0; i < 8; i++) {
      const yy = base - h * (0.35 + (i / 8) * 0.68), side = i % 2 ? 1 : -1;
      s += t('ellipse', { cx: f(x + side * (2 + c.r() * 4)), cy: f(yy), rx: f(4 + c.r() * 4), ry: f(3 + c.r() * 3), fill: leaf });
    }
    c.add(s);
  }
  function bamboo(c, x, base, h, n, colors) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const k = (i - (n - 1) / 2) / n, hh = h * (0.7 + c.r() * 0.35);
      const ex = x + k * h * 1.3 + (c.r() - 0.5) * 6, ey = base - hh;
      const col = colors[i % colors.length];
      s += t('path', { d: `M${f(x + k * 6)} ${base} Q${f(x + k * h * 0.25)} ${f(base - hh * 0.75)} ${f(ex)} ${f(ey)}`, stroke: col, 'stroke-width': 1.5, fill: 'none', 'stroke-linecap': 'round' });
      for (let j = 0; j < 4; j++) {
        const lx = ex - k * 4 * j + (c.r() - 0.5) * 8, ly = ey + j * 5 + c.r() * 4;
        s += t('path', { d: `M${f(lx)} ${f(ly)} l${f(4 + c.r() * 5)} ${f(2 + c.r() * 3)}`, stroke: col, 'stroke-width': 1.6, 'stroke-linecap': 'round' });
      }
    }
    c.add(t('g', { class: 'sway-slow' }, s));
  }

  /* Animals & structures ------------------------------------------------------ */
  function elephant(x, y, s, fill, shade, flip = false) {
    const tr = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`;
    return t('g', { transform: tr }, [
      t('ellipse', { cx: 44, cy: 36, rx: 30, ry: 21, fill }),
      t('ellipse', { cx: 50, cy: 26, rx: 22, ry: 14, fill }),
      t('rect', { x: 16, y: 44, width: 11, height: 30, rx: 3.5, fill }),
      t('rect', { x: 30, y: 48, width: 10, height: 26, rx: 3.5, fill: shade }),
      t('rect', { x: 56, y: 48, width: 10, height: 26, rx: 3.5, fill: shade }),
      t('rect', { x: 68, y: 42, width: 11, height: 32, rx: 3.5, fill }),
      t('ellipse', { cx: 78, cy: 31, rx: 14, ry: 15, fill }),
      t('circle', { cx: 80, cy: 22, r: 9, fill }),
      t('path', { d: 'M68 19 C57 22 57 44 65 48 C72 51 76 40 74 30 Z', fill: shade }),
      t('path', { d: 'M88 30 C95 40 94 54 91 66 C90 70 93 72 96 69', stroke: fill, 'stroke-width': 6.5, fill: 'none', 'stroke-linecap': 'round' }),
      t('path', { d: 'M85 44 C88 50 92 51 95 49', stroke: 'oklch(0.95 0.02 90)', 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }),
      t('path', { d: 'M15 30 C9 36 9 44 11 52', stroke: fill, 'stroke-width': 1.8, fill: 'none' }),
    ]);
  }
  function deer(c, x, y, s, antlers = true, flip = false) {
    const body = 'oklch(0.58 0.11 55)', dark = 'oklch(0.44 0.09 50)', cream = 'oklch(0.90 0.04 80)';
    const parts = [
      t('rect', { x: 23, y: 38, width: 3, height: 32, rx: 1.4, fill: dark, transform: 'rotate(4 24 38)' }),
      t('rect', { x: 52, y: 38, width: 3, height: 32, rx: 1.4, fill: dark, transform: 'rotate(-6 53 38)' }),
      t('ellipse', { cx: 40, cy: 34, rx: 22, ry: 11, fill: body }),
      t('ellipse', { cx: 40, cy: 40, rx: 15, ry: 3.5, fill: cream, opacity: 0.55 }),
      t('path', { d: 'M22 31 L13 12 L21 9 L31 28 Z', fill: body }),
      t('ellipse', { cx: 14, cy: 11, rx: 7, ry: 4.4, fill: body, transform: 'rotate(-15 14 11)' }),
      t('ellipse', { cx: 8.5, cy: 13.5, rx: 3.6, ry: 2.6, fill: body }),
      t('circle', { cx: 6, cy: 13.2, r: 1, fill: '#2a1a12' }),
      t('ellipse', { cx: 20, cy: 6, rx: 4.2, ry: 1.8, fill: body, transform: 'rotate(-30 20 6)' }),
      t('rect', { x: 29, y: 38, width: 3, height: 32, rx: 1.4, fill: body, transform: 'rotate(-3 30 38)' }),
      t('rect', { x: 57, y: 38, width: 3, height: 32, rx: 1.4, fill: body, transform: 'rotate(5 58 38)' }),
      t('path', { d: 'M61 28 q5 -2 6 3', stroke: cream, 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }),
    ];
    if (antlers) parts.push(t('path', { d: 'M15 7 C13 0 12 -6 9 -15 M12 -3 L5 -7 M10.5 -9 L15 -15 M17 7 C18 1 20 -4 22 -12 M19.5 -1 L25 -4', stroke: dark, 'stroke-width': 1.3, fill: 'none', 'stroke-linecap': 'round' }));
    for (let i = 0; i < 12; i++) parts.push(t('circle', { cx: f(26 + c.r() * 30), cy: f(28 + c.r() * 10), r: f(0.8 + c.r() * 0.6), fill: '#fff', opacity: 0.8 }));
    return t('g', { transform: `translate(${x} ${y}) scale(${flip ? -s : s} ${s})` }, parts);
  }
  function temple(c, cx, base, s, p) {
    const S = (n) => f(n * s);
    const X = (n) => f(cx + n * s), Y = (n) => f(base - n * s);
    let g = '';
    g += t('rect', { x: X(-82), y: Y(14), width: S(164), height: S(14), fill: p.plinth });
    g += t('rect', { x: X(-18), y: Y(7), width: S(36), height: S(7), fill: p.step });
    g += t('rect', { x: X(-62), y: Y(54), width: S(124), height: S(40), fill: p.wall });
    for (let i = 0; i < 9; i++) g += t('rect', { x: X(-60 + i * 15), y: Y(54), width: S(3.2), height: S(40), fill: p.pillar });
    g += t('rect', { x: X(-10), y: Y(46), width: S(20), height: S(32), fill: p.door });
    c.def(rad(c.id('lamp'), [[0, p.glow, 0.95], [1, p.glow, 0]]));
    g += t('circle', { cx: X(0), cy: Y(24), r: S(14), fill: `url(#${c.id('lamp')})`, class: 'flick' });
    g += t('path', { d: `M${X(-94)} ${Y(50)} Q${X(-72)} ${Y(58)} ${X(-58)} ${Y(76)} L${X(58)} ${Y(76)} Q${X(72)} ${Y(58)} ${X(94)} ${Y(50)} Z`, fill: p.roof });
    g += t('path', { d: `M${X(-94)} ${Y(50)} Q${X(0)} ${Y(46)} ${X(94)} ${Y(50)}`, stroke: p.roofDark, 'stroke-width': S(2.4), fill: 'none' });
    for (let i = 1; i < 6; i++) g += t('path', { d: `M${X(-90 + i * 6)} ${Y(52 + i * 4)} L${X(90 - i * 6)} ${Y(52 + i * 4)}`, stroke: p.roofDark, 'stroke-width': S(0.6), opacity: 0.45 });
    g += t('rect', { x: X(-40), y: Y(86), width: S(80), height: S(11), fill: p.wall });
    for (let i = 0; i < 9; i++) g += t('rect', { x: X(-36 + i * 9), y: Y(83), width: S(3), height: S(5), fill: p.pillar });
    g += t('path', { d: `M${X(-60)} ${Y(82)} Q${X(-30)} ${Y(94)} ${X(0)} ${Y(124)} Q${X(30)} ${Y(94)} ${X(60)} ${Y(82)} Z`, fill: p.roof });
    g += t('path', { d: `M${X(-12)} ${Y(94)} L${X(0)} ${Y(110)} L${X(12)} ${Y(94)} Z`, fill: p.roofDark });
    g += t('path', { d: `M${X(-7)} ${Y(95)} L${X(0)} ${Y(104)} L${X(7)} ${Y(95)} Z`, fill: p.wall, opacity: 0.8 });
    g += t('path', { d: `M${X(0)} ${Y(124)} L${X(0)} ${Y(138)}`, stroke: p.gold, 'stroke-width': S(1.6) });
    g += t('circle', { cx: X(0), cy: Y(127), r: S(3.2), fill: p.gold });
    g += t('circle', { cx: X(0), cy: Y(133), r: S(2.1), fill: p.gold });
    c.add(g);
  }
  function lampTower(c, x, base, s, stone, flame) {
    let g = t('rect', { x: f(x - 2.4 * s), y: f(base - 72 * s), width: f(4.8 * s), height: f(72 * s), fill: stone });
    g += t('ellipse', { cx: x, cy: f(base - 2 * s), rx: f(9 * s), ry: f(2.4 * s), fill: stone });
    for (let k = 0; k < 7; k++) {
      const y = base - (12 + k * 9) * s, rx = (8 - k * 0.7) * s;
      g += t('ellipse', { cx: x, cy: f(y), rx: f(rx), ry: f(1.4 * s), fill: stone });
      [-1, 1].forEach((sd) => {
        g += t('circle', { cx: f(x + sd * rx), cy: f(y - 1.6 * s), r: f(3.4 * s), fill: flame, opacity: 0.25, class: 'flick', style: `animation-delay:${(-c.r() * 2).toFixed(2)}s` });
        g += t('circle', { cx: f(x + sd * rx), cy: f(y - 1.6 * s), r: f(1 * s), fill: 'oklch(0.95 0.10 90)' });
      });
    }
    g += t('path', { d: `M${f(x - 3 * s)} ${f(base - 72 * s)} L${x} ${f(base - 80 * s)} L${f(x + 3 * s)} ${f(base - 72 * s)} Z`, fill: stone });
    c.add(g);
  }
  function waves(c, y0, y1, n, color = '#fff', opMax = 0.7) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = c.r() * (W + 40) - 20, y = y0 + c.r() * (y1 - y0), w = 8 + c.r() * 14;
      s += t('path', {
        d: `M${f(x)} ${f(y)} q${f(w / 4)} -3 ${f(w / 2)} 0 t${f(w / 2)} 0`,
        stroke: color, 'stroke-width': f(0.9 + c.r() * 1.2), fill: 'none', 'stroke-linecap': 'round',
        opacity: f(0.25 + c.r() * opMax), class: 'wv', style: `animation-delay:${(-c.r() * 4).toFixed(2)}s;animation-duration:${(3 + c.r() * 3).toFixed(1)}s`,
      });
    }
    c.add(s);
  }
  function blob(cx, cy, rx, ry, c, n = 22, wob = 0.12) {
    const pts = [];
    const ph = c.r() * 6;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, k = 1 + Math.sin(a * 3 + ph) * wob + (c.r() - 0.5) * wob * 0.6;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let d = `M${f(mid(pts[n - 1], pts[0])[0])} ${f(mid(pts[n - 1], pts[0])[1])}`;
    for (let i = 0; i < n; i++) {
      const p = pts[i], m = mid(p, pts[(i + 1) % n]);
      d += ` Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`;
    }
    return { d: d + 'Z', pts };
  }

  /* ------------------------------------------------------------------------
     Scenes
     ------------------------------------------------------------------------ */
  const scenes = {
    safari(c) {
      sky(c, [[0, 'oklch(0.80 0.09 70)'], [1, 'oklch(0.93 0.06 95)']]);
      glow(c, 300, 92, 90, 'oklch(0.97 0.08 90)', 0.75);
      c.add(t('circle', { cx: 300, cy: 92, r: 22, fill: 'oklch(0.97 0.06 95)' }));
      hills(c, 140, 10, 'oklch(0.70 0.06 115)', { op: 0.7 });
      mist(c, 128, 40, 0.5, 'oklch(0.97 0.04 90)');
      canopy(c, 168, 9, 18, 'oklch(0.45 0.08 135)', 5);
      areca(c, 62, 175, 70, 'oklch(0.38 0.06 135)', 4);
      areca(c, 352, 178, 60, 'oklch(0.38 0.06 135)', -3);
      hills(c, 204, 4, 'oklch(0.66 0.11 105)', { f1: 0.008 });
      c.add(elephant(132, 136, 0.95, 'oklch(0.33 0.03 55)', 'oklch(0.28 0.03 55)'));
      c.add(elephant(224, 166, 0.55, 'oklch(0.36 0.03 55)', 'oklch(0.30 0.03 55)'));
      hills(c, 236, 3, 'oklch(0.58 0.10 110)');
      grass(c, 222, 70, 'oklch(0.50 0.10 100)', 6, 20);
    },
    river(c) {
      sky(c, [[0, 'oklch(0.86 0.03 220)'], [1, 'oklch(0.95 0.02 170)']]);
      hills(c, 104, 10, 'oklch(0.72 0.05 170)', { op: 0.75 });
      mist(c, 100, 36, 0.6);
      hills(c, 132, 12, 'oklch(0.50 0.08 155)');
      canopy(c, 158, 7, 14, 'oklch(0.36 0.07 155)', 4);
      c.def(lin(c.id('water'), [[0, 'oklch(0.64 0.07 200)'], [1, 'oklch(0.46 0.07 215)']]));
      c.add(t('path', { d: `M-4 176 Q100 168 200 174 T404 170 L404 254 L-4 254 Z`, fill: `url(#${c.id('water')})` }));
      [[70, 214, 14], [318, 196, 10], [356, 232, 16]].forEach(([x, y, r]) => {
        c.add(t('ellipse', { cx: x, cy: y, rx: r, ry: r * 0.5, fill: 'oklch(0.34 0.02 200)' }));
        c.add(t('ellipse', { cx: x - 2, cy: y - 2, rx: r * 0.6, ry: r * 0.22, fill: 'oklch(0.50 0.02 200)' }));
      });
      waves(c, 178, 248, 70, '#fff', 0.65);
      const x = 196, y = 212;
      let raft = t('ellipse', { cx: x, cy: y + 7, rx: 44, ry: 6, fill: '#fff', opacity: 0.45 });
      raft += t('rect', { x: x - 36, y: y - 7, width: 72, height: 14, rx: 7, fill: 'oklch(0.68 0.17 48)', stroke: 'oklch(0.48 0.14 38)', 'stroke-width': 1 });
      raft += t('path', { d: `M${x - 30} ${y} L${x + 30} ${y}`, stroke: 'oklch(0.48 0.14 38)', 'stroke-width': 0.8 });
      const jackets = ['oklch(0.62 0.19 28)', 'oklch(0.82 0.15 90)', 'oklch(0.62 0.19 28)', 'oklch(0.82 0.15 90)'];
      const helmets = ['oklch(0.60 0.15 250)', 'oklch(0.62 0.19 28)', 'oklch(0.95 0.01 90)', 'oklch(0.60 0.15 250)'];
      for (let i = 0; i < 4; i++) {
        const px = x - 24 + i * 16, dir = i % 2 ? 1 : -1;
        raft += t('line', { x1: px, y1: y - 13, x2: px + dir * 10, y2: y + 9, stroke: 'oklch(0.28 0.02 60)', 'stroke-width': 1.3 });
        raft += t('ellipse', { cx: px + dir * 10, cy: y + 9, rx: 2.2, ry: 1.2, fill: 'oklch(0.28 0.02 60)' });
        raft += t('rect', { x: px - 3.5, y: y - 17, width: 7, height: 10, rx: 2.5, fill: jackets[i] });
        raft += t('circle', { cx: px, cy: y - 20.5, r: 3, fill: 'oklch(0.56 0.07 50)' });
        raft += t('path', { d: `M${px - 3.4} ${y - 20.5} A3.4 3.4 0 0 1 ${px + 3.4} ${y - 20.5} Z`, fill: helmets[i] });
      }
      for (let i = 0; i < 9; i++) raft += t('circle', { cx: f(x + 36 + c.r() * 14), cy: f(y - 4 + c.r() * 12), r: f(1 + c.r() * 2.2), fill: '#fff', opacity: 0.85 });
      c.add(t('g', { class: 'bob' }, raft));
    },
    peak(c) {
      sky(c, [[0, 'oklch(0.70 0.07 290)'], [0.55, 'oklch(0.82 0.08 20)'], [1, 'oklch(0.92 0.08 70)']]);
      glow(c, 120, 150, 110, 'oklch(0.96 0.09 80)', 0.8);
      hills(c, 128, 8, 'oklch(0.66 0.05 280)', { peaks: [{ x: 90, h: 22, w: 40 }], op: 0.8 });
      mist(c, 122, 30, 0.55, 'oklch(0.96 0.05 60)');
      hills(c, 150, 10, 'oklch(0.54 0.06 220)', { peaks: [{ x: 330, h: 30, w: 45 }] });
      mist(c, 148, 28, 0.45, 'oklch(0.95 0.04 60)');
      const main = hills(c, 196, 6, 'oklch(0.56 0.11 135)', { peaks: [{ x: 238, h: 118, w: 70 }] });
      c.add(t('path', { d: ptsToShape(main.map(([x, y]) => [x, y + 26])), fill: 'oklch(0.48 0.10 140)' }));
      const top = main.reduce((a, b) => (b[1] < a[1] ? b : a));
      c.add(t('path', { d: `M168 252 L196 214 L178 200 L214 168 L200 150 L${f(top[0] - 8)} 120 L${f(top[0])} ${f(top[1] + 2)}`, stroke: 'oklch(0.92 0.05 85)', 'stroke-width': 1.4, 'stroke-dasharray': '2 4', fill: 'none', 'stroke-linecap': 'round' }));
      c.add(t('path', { d: `M${f(top[0])} ${f(top[1] + 1)} L${f(top[0])} ${f(top[1] - 13)}`, stroke: 'oklch(0.30 0.03 60)', 'stroke-width': 1 }));
      c.add(t('path', { d: `M${f(top[0])} ${f(top[1] - 13)} l9 3 l-9 3 Z`, fill: 'oklch(0.62 0.19 28)', class: 'flag' }));
      canopy(c, 232, 6, 13, 'oklch(0.32 0.07 155)', 6);
      grass(c, 236, 50, 'oklch(0.66 0.11 125)', 5, 12);
    },
    falls(c) {
      sky(c, [[0, 'oklch(0.94 0.03 140)'], [1, 'oklch(0.86 0.06 150)']]);
      canopy(c, 70, 12, 22, 'oklch(0.58 0.09 150)', 8, 0.8);
      canopy(c, 108, 10, 20, 'oklch(0.44 0.09 152)', 8);
      c.add(t('path', { d: 'M118 254 L132 150 L142 96 L160 66 L246 60 L262 92 L276 160 L286 254 Z', fill: 'oklch(0.36 0.03 160)' }));
      c.add(t('path', { d: 'M140 120 L150 90 L162 84 L158 128 Z M252 100 L266 150 L254 160 Z', fill: 'oklch(0.46 0.07 145)', opacity: 0.8 }));
      c.def(lin(c.id('fall'), [[0, 'oklch(0.98 0.01 200)'], [1, 'oklch(0.86 0.04 210)']]));
      c.add(t('path', { d: 'M172 64 L232 62 Q236 140 244 206 L162 206 Q168 140 172 64 Z', fill: `url(#${c.id('fall')})`, opacity: 0.85 }));
      for (let i = 0; i < 10; i++) {
        const x = 176 + i * 6 + (c.r() - 0.5) * 3;
        c.add(t('path', {
          d: `M${f(x)} 64 Q${f(x + (c.r() - 0.5) * 6)} 140 ${f(x + (x - 202) * 0.35)} 206`,
          stroke: '#fff', 'stroke-width': f(1.5 + c.r() * 2.5), fill: 'none', opacity: f(0.5 + c.r() * 0.5),
          'stroke-dasharray': `${f(10 + c.r() * 14)} ${f(6 + c.r() * 10)}`, class: 'fall',
          style: `animation-duration:${(0.9 + c.r() * 0.8).toFixed(2)}s;animation-delay:${(-c.r()).toFixed(2)}s`,
        }));
      }
      c.def(lin(c.id('pool'), [[0, 'oklch(0.70 0.07 195)'], [1, 'oklch(0.52 0.07 205)']]));
      c.add(t('ellipse', { cx: 204, cy: 222, rx: 120, ry: 26, fill: `url(#${c.id('pool')})` }));
      glow(c, 204, 204, 60, '#ffffff', 0.85);
      waves(c, 206, 240, 26, '#fff', 0.6);
      const leafy = (x, y, sz, rot, col) => t('path', { d: `M0 0 C${sz * 0.3} ${-sz * 0.4} ${sz * 0.8} ${-sz * 0.35} ${sz} 0 C${sz * 0.8} ${sz * 0.35} ${sz * 0.3} ${sz * 0.4} 0 0Z`, fill: col, transform: `translate(${x} ${y}) rotate(${rot})` });
      let plants = '';
      [[0, 250, 70, -60], [10, 250, 60, -30], [-4, 230, 56, -10], [400, 250, 70, -120], [392, 250, 60, -150], [404, 228, 54, -170]].forEach(([x, y, s, r], i) => {
        plants += leafy(x, y, s, r, i % 2 ? 'oklch(0.34 0.08 150)' : 'oklch(0.28 0.06 155)');
      });
      c.add(t('g', { class: 'sway-slow' }, plants));
    },
    temple(c) {
      sky(c, [[0, 'oklch(0.36 0.07 285)'], [0.6, 'oklch(0.58 0.10 330)'], [1, 'oklch(0.80 0.12 55)']]);
      stars(c, 22, 90);
      glow(c, 200, 190, 150, 'oklch(0.85 0.13 60)', 0.45);
      hills(c, 168, 9, 'oklch(0.30 0.05 300)', { op: 0.9 });
      canopy(c, 196, 7, 14, 'oklch(0.22 0.04 220)', 4);
      areca(c, 46, 214, 96, 'oklch(0.20 0.03 220)', 6);
      areca(c, 70, 214, 78, 'oklch(0.20 0.03 220)', -4);
      areca(c, 352, 214, 92, 'oklch(0.20 0.03 220)', -6);
      c.add(t('rect', { x: -4, y: 212, width: W + 8, height: 42, fill: 'oklch(0.26 0.03 60)' }));
      temple(c, 206, 214, 0.86, {
        plinth: 'oklch(0.48 0.03 70)', step: 'oklch(0.56 0.03 70)', wall: 'oklch(0.86 0.04 80)', pillar: 'oklch(0.42 0.06 50)',
        door: 'oklch(0.30 0.05 40)', glow: 'oklch(0.88 0.15 75)', roof: 'oklch(0.40 0.10 35)', roofDark: 'oklch(0.28 0.07 30)', gold: 'oklch(0.80 0.14 85)',
      });
      lampTower(c, 104, 214, 0.92, 'oklch(0.50 0.03 70)', 'oklch(0.85 0.17 70)');
      c.add(t('ellipse', { cx: 206, cy: 236, rx: 120, ry: 8, fill: 'oklch(0.80 0.14 70)', opacity: 0.18 }));
    },
    shrine(c) {
      sky(c, [[0, 'oklch(0.86 0.04 220)'], [1, 'oklch(0.96 0.03 130)']]);
      hills(c, 96, 12, 'oklch(0.66 0.06 170)', { peaks: [{ x: 120, h: 30, w: 60 }], op: 0.8 });
      mist(c, 92, 40, 0.75);
      hills(c, 128, 12, 'oklch(0.52 0.09 150)', { peaks: [{ x: 300, h: 26, w: 50 }] });
      mist(c, 130, 30, 0.55);
      canopy(c, 162, 8, 16, 'oklch(0.40 0.09 150)', 4);
      c.add(t('rect', { x: -4, y: 200, width: W + 8, height: 60, fill: 'oklch(0.60 0.10 135)' }));
      temple(c, 196, 204, 0.78, {
        plinth: 'oklch(0.58 0.01 80)', step: 'oklch(0.66 0.01 80)', wall: 'oklch(0.72 0.01 80)', pillar: 'oklch(0.50 0.01 80)',
        door: 'oklch(0.34 0.02 60)', glow: 'oklch(0.86 0.14 75)', roof: 'oklch(0.46 0.11 38)', roofDark: 'oklch(0.32 0.08 32)', gold: 'oklch(0.78 0.13 85)',
      });
      silverOak(c, 52, 204, 92, 'oklch(0.36 0.03 60)', 'oklch(0.42 0.08 145)');
      silverOak(c, 340, 204, 104, 'oklch(0.36 0.03 60)', 'oklch(0.42 0.08 145)');
      c.def(lin(c.id('stream'), [[0, 'oklch(0.80 0.06 210)'], [1, 'oklch(0.62 0.08 215)']], 1, 0));
      c.add(t('path', { d: 'M-4 236 C80 222 140 248 220 232 S340 224 404 240 L404 250 C340 236 260 252 200 244 S60 236 -4 248 Z', fill: `url(#${c.id('stream')})` }));
      waves(c, 232, 246, 14, '#fff', 0.5);
      grass(c, 210, 60, 'oklch(0.50 0.11 135)', 4, 10);
    },
    tea(c) {
      sky(c, [[0, 'oklch(0.84 0.05 220)'], [1, 'oklch(0.95 0.03 150)']]);
      [[90, 50, 34], [270, 38, 26]].forEach(([x, y, r]) => {
        c.add(t('g', { class: 'drift-slow', opacity: 0.9 }, [
          t('ellipse', { cx: x, cy: y, rx: r, ry: r * 0.32, fill: '#fff' }),
          t('ellipse', { cx: x + r * 0.3, cy: y - r * 0.18, rx: r * 0.5, ry: r * 0.3, fill: '#fff' }),
        ]));
      });
      hills(c, 104, 8, 'oklch(0.70 0.05 175)', { op: 0.7 });
      mist(c, 100, 26, 0.5);
      const layers = [
        { y: 132, amp: 14, fill: 'oklch(0.62 0.13 135)', row: 'oklch(0.48 0.12 140)' },
        { y: 170, amp: 16, fill: 'oklch(0.68 0.15 130)', row: 'oklch(0.52 0.13 138)' },
        { y: 210, amp: 12, fill: 'oklch(0.72 0.16 128)', row: 'oklch(0.55 0.14 135)' },
      ];
      layers.forEach((L, i) => {
        const pts = ridgePts(c, L.y, L.amp, { f1: 0.01 + i * 0.003 });
        const id = c.id('clip' + i);
        c.def(t('clipPath', { id }, t('path', { d: ptsToShape(pts) })));
        let rows = t('path', { d: ptsToShape(pts), fill: L.fill });
        for (let k = 1; k < 16; k++) rows += t('path', { d: ptsToLine(pts, k * 6.5), stroke: L.row, 'stroke-width': 2.6, fill: 'none', opacity: 0.6 });
        c.add(t('g', { 'clip-path': `url(#${id})` }, rows));
        if (i === 0) [70, 150, 240, 320].forEach((x) => silverOak(c, x, L.y + 10 + c.r() * 6, 44 + c.r() * 18, 'oklch(0.40 0.03 60)', 'oklch(0.44 0.09 150)'));
        if (i === 1) {
          c.add(t('rect', { x: 286, y: L.y - 14, width: 26, height: 14, fill: 'oklch(0.96 0.01 90)' }));
          c.add(t('path', { d: `M282 ${L.y - 13} L299 ${L.y - 26} L316 ${L.y - 13} Z`, fill: 'oklch(0.52 0.15 30)' }));
          c.add(t('rect', { x: 296, y: L.y - 9, width: 6, height: 9, fill: 'oklch(0.40 0.05 50)' }));
        }
      });
    },
    deer(c) {
      sky(c, [[0, 'oklch(0.80 0.07 130)'], [1, 'oklch(0.90 0.07 105)']]);
      for (let i = 0; i < 14; i++) {
        const x = c.r() * W, w = 4 + c.r() * 8, depth = c.r();
        c.add(t('rect', { x: f(x), y: 0, width: f(w), height: H, fill: `oklch(${(0.62 - depth * 0.22).toFixed(2)} 0.05 ${120 + depth * 30})`, opacity: f(0.5 + depth * 0.5) }));
      }
      c.def(lin(c.id('ray'), [[0, '#fff', 0.55], [1, '#fff', 0]]));
      c.add(t('path', { d: 'M150 0 L196 0 L330 250 L230 250 Z M236 0 L256 0 L370 250 L330 250 Z', fill: `url(#${c.id('ray')})`, opacity: 0.6, class: 'rays' }));
      c.add(t('path', { d: canopyTop(c), fill: 'oklch(0.32 0.07 150)' }));
      hills(c, 196, 5, 'oklch(0.56 0.10 125)', { f1: 0.01 });
      c.add(deer(c, 318, 160, 0.82, false, true));
      c.add(deer(c, 116, 132, 1.25, true));
      hills(c, 238, 3, 'oklch(0.46 0.09 130)');
      grass(c, 220, 80, 'oklch(0.40 0.09 135)', 6, 18);
    },
    island(c) {
      sky(c, [[0, 'oklch(0.86 0.06 80)'], [1, 'oklch(0.95 0.04 140)']]);
      glow(c, 90, 70, 70, 'oklch(0.98 0.07 95)', 0.8);
      hills(c, 118, 8, 'oklch(0.70 0.05 160)', { op: 0.75 });
      mist(c, 112, 30, 0.55);
      c.def(lin(c.id('water'), [[0, 'oklch(0.78 0.05 190)'], [1, 'oklch(0.58 0.07 205)']]));
      c.add(t('rect', { x: -4, y: 132, width: W + 8, height: 130, fill: `url(#${c.id('water')})` }));
      [[60, 150, 70, 9], [230, 160, 90, 11], [360, 146, 54, 8], [150, 200, 80, 12]].forEach(([x, y, rx, ry], i) => {
        c.add(t('ellipse', { cx: x, cy: y + ry * 0.6, rx: rx * 0.95, ry: ry * 0.5, fill: 'oklch(0.40 0.07 150)', opacity: 0.35 }));
        c.add(t('ellipse', { cx: x, cy: y, rx, ry, fill: i % 2 ? 'oklch(0.50 0.11 140)' : 'oklch(0.46 0.10 145)' }));
        const clumps = 2 + (i % 2);
        for (let k = 0; k < clumps; k++) bamboo(c, x - rx * 0.4 + k * rx * 0.4, y - ry * 0.3, 34 + c.r() * 20, 9, ['oklch(0.42 0.10 145)', 'oklch(0.55 0.13 135)', 'oklch(0.34 0.08 150)']);
      });
      waves(c, 138, 248, 40, '#fff', 0.45);
      let raft = '';
      for (let i = 0; i < 6; i++) raft += t('rect', { x: 262, y: 216 + i * 3, width: 66, height: 3, rx: 1.5, fill: i % 2 ? 'oklch(0.60 0.08 80)' : 'oklch(0.52 0.08 75)' });
      raft += t('line', { x1: 302, y1: 214, x2: 318, y2: 170, stroke: 'oklch(0.40 0.05 60)', 'stroke-width': 1.4 });
      raft += t('rect', { x: 292, y: 194, width: 8, height: 18, rx: 3, fill: 'oklch(0.55 0.14 250)' });
      raft += t('circle', { cx: 296, cy: 189, r: 3.6, fill: 'oklch(0.52 0.07 50)' });
      raft += t('ellipse', { cx: 296, cy: 186.5, rx: 6, ry: 1.6, fill: 'oklch(0.80 0.10 85)' });
      c.add(t('g', { class: 'bob' }, raft));
    },

    /* services */
    campfire(c) {
      sky(c, [[0, 'oklch(0.18 0.035 265)'], [0.68, 'oklch(0.26 0.05 300)'], [1, 'oklch(0.38 0.08 40)']]);
      stars(c, 50, 140);
      glow(c, 322, 46, 30, 'oklch(0.95 0.03 100)', 0.5);
      c.add(t('circle', { cx: 322, cy: 46, r: 9, fill: 'oklch(0.96 0.02 100)' }));
      hills(c, 160, 10, 'oklch(0.22 0.03 230)');
      canopy(c, 182, 8, 16, 'oklch(0.16 0.03 190)', 5);
      c.add(t('rect', { x: -4, y: 206, width: W + 8, height: 50, fill: 'oklch(0.20 0.03 150)' }));
      glow(c, 200, 196, 150, 'oklch(0.72 0.18 55)', 0.55, 'fireglow');
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2, x = 200 + Math.cos(a) * 46, y = 224 + Math.sin(a) * 9;
        c.add(t('ellipse', { cx: f(x), cy: f(y), rx: f(6 + c.r() * 3), ry: f(4 + c.r() * 1.5), fill: 'oklch(0.44 0.02 60)' }));
        c.add(t('ellipse', { cx: f(x - 1), cy: f(y - 2), rx: 3.5, ry: 1.3, fill: 'oklch(0.70 0.08 60)', opacity: 0.6 }));
      }
      const flame = (s, col, cls, dur) => t('g', { class: cls, style: `animation-duration:${dur}s` },
        t('path', { d: `M${f(200 - 22 * s)} 214 C${f(200 - 28 * s)} ${f(214 - 22 * s)} ${f(200 - 10 * s)} ${f(214 - 32 * s)} ${f(200 - 8 * s)} ${f(214 - 56 * s)} C${f(200)} ${f(214 - 38 * s)} ${f(200 + 6 * s)} ${f(214 - 46 * s)} ${f(200 + 4 * s)} ${f(214 - 72 * s)} C${f(200 + 20 * s)} ${f(214 - 50 * s)} ${f(200 + 28 * s)} ${f(214 - 30 * s)} ${f(200 + 22 * s)} 214 Z`, fill: col }));
      c.add(flame(1, 'oklch(0.66 0.20 40)', 'flk', 1.6));
      c.add(flame(0.72, 'oklch(0.78 0.18 62)', 'flk', 1.2));
      c.add(flame(0.42, 'oklch(0.95 0.09 95)', 'flk', 0.9));
      [[-18, 'oklch(0.38 0.06 50)'], [18, 'oklch(0.34 0.06 45)']].forEach(([rot, col]) => {
        c.add(t('g', { transform: `rotate(${rot} 200 216)` }, [
          t('rect', { x: 160, y: 211, width: 80, height: 10, rx: 5, fill: col }),
          t('ellipse', { cx: 161, cy: 216, rx: 3, ry: 5, fill: 'oklch(0.62 0.07 70)' }),
          t('ellipse', { cx: 239, cy: 216, rx: 3, ry: 5, fill: 'oklch(0.62 0.07 70)' }),
        ]));
      });
      for (let i = 0; i < 14; i++) {
        c.add(t('circle', {
          cx: f(186 + c.r() * 28), cy: 170, r: f(0.8 + c.r() * 1.2), fill: 'oklch(0.86 0.15 75)', class: 'spark',
          style: `animation-delay:${(-c.r() * 3).toFixed(2)}s;animation-duration:${(2 + c.r() * 2).toFixed(1)}s;--dx:${f((c.r() - 0.5) * 40)}px`,
        }));
      }
    },
    bbq(c) {
      sky(c, [[0, 'oklch(0.28 0.06 270)'], [0.6, 'oklch(0.46 0.09 320)'], [1, 'oklch(0.72 0.12 45)']]);
      stars(c, 18, 70);
      hills(c, 158, 9, 'oklch(0.30 0.05 285)');
      canopy(c, 184, 8, 15, 'oklch(0.21 0.04 210)', 5);
      c.add(t('rect', { x: -4, y: 210, width: W + 8, height: 46, fill: 'oklch(0.24 0.04 160)' }));
      const P = [[-10, 26], [100, 74], [200, 36], [300, 74], [410, 26]];
      c.add(t('path', { d: `M${P[0]} Q${P[1]} ${P[2]} Q${P[3]} ${P[4]}`, stroke: 'oklch(0.18 0.02 260)', 'stroke-width': 1, fill: 'none' }));
      const qb = (a, b, cc, tt) => [(1 - tt) ** 2 * a[0] + 2 * (1 - tt) * tt * b[0] + tt * tt * cc[0], (1 - tt) ** 2 * a[1] + 2 * (1 - tt) * tt * b[1] + tt * tt * cc[1]];
      [[P[0], P[1], P[2]], [P[2], P[3], P[4]]].forEach(([a, b, cc]) => {
        for (let k = 1; k < 9; k++) {
          const [x, y] = qb(a, b, cc, k / 9);
          c.add(t('g', { class: 'bulb', style: `animation-delay:${(-c.r() * 3).toFixed(2)}s` }, [
            t('circle', { cx: f(x), cy: f(y + 4), r: 9, fill: 'oklch(0.92 0.12 85)', opacity: 0.22 }),
            t('circle', { cx: f(x), cy: f(y + 4), r: 2.8, fill: 'oklch(0.95 0.11 90)' }),
          ]));
        }
      });
      glow(c, 200, 168, 90, 'oklch(0.72 0.19 45)', 0.5, 'coal');
      let g = '';
      g += t('path', { d: 'M178 238 L190 202 M222 238 L210 202 M200 242 L200 206', stroke: 'oklch(0.20 0.02 250)', 'stroke-width': 3, 'stroke-linecap': 'round' });
      g += t('path', { d: 'M148 168 Q148 208 200 208 Q252 208 252 168 Z', fill: 'oklch(0.22 0.02 250)' });
      g += t('path', { d: 'M156 176 Q164 200 196 202', stroke: 'oklch(0.42 0.02 250)', 'stroke-width': 1.4, fill: 'none', opacity: 0.6 });
      g += t('ellipse', { cx: 200, cy: 168, rx: 50, ry: 6, fill: 'oklch(0.66 0.20 38)', class: 'flick' });
      g += t('rect', { x: 144, y: 162, width: 112, height: 5, rx: 2.5, fill: 'oklch(0.34 0.02 250)' });
      const food = ['oklch(0.93 0.04 90)', 'oklch(0.52 0.15 140)', 'oklch(0.58 0.15 45)', 'oklch(0.70 0.10 350)', 'oklch(0.56 0.19 28)'];
      [[156, 156, 244, 150], [160, 160, 240, 158]].forEach(([x1, y1, x2, y2], s) => {
        g += t('line', { x1: x1 - 6, y1, x2: x2 + 8, y2, stroke: 'oklch(0.80 0.01 250)', 'stroke-width': 1.2 });
        for (let k = 0; k < 9; k++) {
          const tt = (k + 0.5) / 9, x = x1 + (x2 - x1) * tt, y = y1 + (y2 - y1) * tt;
          g += t('rect', { x: f(x - 4), y: f(y - 4), width: 8, height: 8, rx: 2.4, fill: food[(k + s * 2) % food.length] });
        }
      });
      c.add(g);
      for (let i = 0; i < 4; i++) {
        const x = 182 + i * 12;
        c.add(t('path', {
          d: `M${x} 150 C${x - 10} 128 ${x + 12} 112 ${x} 92 S${x + 8} 62 ${x - 4} 46`,
          stroke: '#fff', 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none', opacity: 0.16, class: 'smoke',
          style: `animation-delay:${(-i * 1.1).toFixed(1)}s`,
        }));
      }
    },
    pool(c) {
      c.def(lin(c.id('lawn'), [[0, 'oklch(0.62 0.12 140)'], [1, 'oklch(0.52 0.11 145)']], 1, 1));
      c.add(t('rect', { width: W, height: H, fill: `url(#${c.id('lawn')})` }));
      grass(c, 0, 160, 'oklch(0.48 0.10 145)', 4, 9);
      grass(c, 200, 160, 'oklch(0.48 0.10 145)', 4, 9);
      const shape = blob(200, 126, 140, 78, c, 24, 0.1);
      shape.pts.forEach(([x, y]) => {
        const dx = x - 200, dy = y - 126, k = 1.06;
        c.add(t('ellipse', { cx: f(200 + dx * k), cy: f(126 + dy * k), rx: f(10 + c.r() * 7), ry: f(7 + c.r() * 5), fill: c.r() < 0.5 ? 'oklch(0.64 0.02 85)' : 'oklch(0.56 0.02 80)' }));
        c.add(t('ellipse', { cx: f(200 + dx * k - 2), cy: f(126 + dy * k - 2), rx: 4.5, ry: 2.2, fill: 'oklch(0.80 0.02 90)', opacity: 0.6 }));
      });
      c.def(rad(c.id('water'), [[0, 'oklch(0.76 0.08 190)'], [1, 'oklch(0.52 0.09 205)']]));
      c.def(t('clipPath', { id: c.id('pc') }, t('path', { d: shape.d })));
      let water = t('path', { d: shape.d, fill: `url(#${c.id('water')})` });
      let caust = '';
      for (let i = 0; i < 9; i++) {
        const y = 60 + i * 16;
        caust += t('path', { d: `M40 ${y} q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`, stroke: '#fff', 'stroke-width': 1.1, fill: 'none', opacity: 0.22 });
      }
      water += t('g', { class: 'caustic' }, caust);
      for (let i = 0; i < 6; i++) {
        water += t('circle', {
          cx: f(120 + c.r() * 160), cy: f(90 + c.r() * 70), r: 14, fill: 'none', stroke: '#fff', 'stroke-width': 1.2, class: 'ripple',
          style: `animation-delay:${(-c.r() * 4).toFixed(2)}s`,
        });
      }
      c.add(t('g', { 'clip-path': `url(#${c.id('pc')})` }, water));
      const flower = (x, y) => t('g', { class: 'drift', transform: `translate(${x} ${y})` }, [0, 72, 144, 216, 288].map((a) =>
        t('ellipse', { cx: 0, cy: -5, rx: 3.4, ry: 6, fill: 'oklch(0.98 0.02 95)', transform: `rotate(${a})` })).join('') + t('circle', { r: 2.6, fill: 'oklch(0.86 0.14 90)' }));
      const lf = (x, y, r, col) => t('g', { class: 'drift', style: `animation-delay:-${(c.r() * 6).toFixed(1)}s` }, t('path', { d: 'M0 0 C6 -8 18 -8 24 0 C18 8 6 8 0 0Z', fill: col, transform: `translate(${x} ${y}) rotate(${r})` }));
      c.add(flower(160, 110));
      c.add(flower(250, 150));
      c.add(lf(214, 92, 20, 'oklch(0.55 0.13 140)'));
      c.add(lf(130, 150, -30, 'oklch(0.62 0.14 120)'));
      const big = (x, y, s, rot, col) => t('path', { d: `M0 0 C${s * 0.25} ${-s * 0.42} ${s * 0.8} ${-s * 0.4} ${s} 0 C${s * 0.8} ${s * 0.4} ${s * 0.25} ${s * 0.42} 0 0Z`, fill: col, transform: `translate(${x} ${y}) rotate(${rot})` });
      c.add(t('g', { class: 'sway-slow' }, [big(-6, 4, 80, 30, 'oklch(0.34 0.08 150)'), big(-6, 20, 70, 6, 'oklch(0.40 0.10 145)'), big(406, 246, 84, 200, 'oklch(0.34 0.08 150)'), big(406, 226, 64, 176, 'oklch(0.42 0.10 140)'), big(406, 6, 60, 150, 'oklch(0.38 0.09 148)')].join('')));
    },
    games(c) {
      c.add(t('rect', { width: W, height: H, fill: 'oklch(0.60 0.12 138)' }));
      for (let i = -2; i < 10; i++) c.add(t('rect', { x: i * 56, y: -60, width: 28, height: 380, fill: 'oklch(0.64 0.12 136)', transform: 'rotate(-18 200 125)' }));
      const shadow = (x, y, rx, ry) => t('ellipse', { cx: x, cy: y, rx, ry, fill: '#173016', opacity: 0.18 });
      c.add(shadow(114, 138, 36, 34));
      c.def(rad(c.id('ball'), [[0, '#ffffff'], [0.75, 'oklch(0.94 0.01 90)'], [1, 'oklch(0.78 0.01 90)']], { cx: '40%', cy: '35%' }));
      c.def(t('clipPath', { id: c.id('bc') }, t('circle', { cx: 108, cy: 130, r: 34 })));
      const pent = (cx, cy, r, rot) => 'M' + [0, 1, 2, 3, 4].map((k) => { const a = rot + (k * 2 * Math.PI) / 5; return `${f(cx + Math.cos(a) * r)} ${f(cy + Math.sin(a) * r)}`; }).join(' L') + 'Z';
      let ball = t('circle', { cx: 108, cy: 130, r: 34, fill: `url(#${c.id('ball')})` });
      let seams = t('path', { d: pent(108, 130, 11, -Math.PI / 2), fill: 'oklch(0.22 0.01 250)' });
      for (let k = 0; k < 5; k++) {
        const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5;
        const vx = 108 + Math.cos(a) * 11, vy = 130 + Math.sin(a) * 11, ox = 108 + Math.cos(a) * 30, oy = 130 + Math.sin(a) * 30;
        seams += t('path', { d: `M${f(vx)} ${f(vy)} L${f(108 + Math.cos(a) * 20)} ${f(130 + Math.sin(a) * 20)}`, stroke: 'oklch(0.40 0.01 250)', 'stroke-width': 1 });
        seams += t('path', { d: pent(ox, oy, 10, a + Math.PI), fill: 'oklch(0.22 0.01 250)' });
      }
      ball += t('g', { 'clip-path': `url(#${c.id('bc')})` }, seams);
      ball += t('circle', { cx: 108, cy: 130, r: 34, fill: 'none', stroke: 'oklch(0.70 0.01 250)', 'stroke-width': 0.8 });
      c.add(ball);
      let sh = shadow(250, 82, 28, 10);
      sh += t('g', { transform: 'translate(236 74) rotate(-28)' }, [
        t('path', { d: 'M0 -8 L44 -20 L44 20 L0 8 Z', fill: '#fff', opacity: 0.95 }),
        t('path', { d: 'M0 -4 L44 -12 M0 0 L44 0 M0 4 L44 12 M22 -14 L22 14', stroke: 'oklch(0.80 0.01 250)', 'stroke-width': 0.8 }),
        t('path', { d: 'M0 -9 A9 9 0 0 0 0 9 Z', fill: 'oklch(0.92 0.04 85)' }),
        t('rect', { x: -1.5, y: -9, width: 3, height: 18, fill: 'oklch(0.56 0.19 28)' }),
      ].join(''));
      c.add(t('g', { class: 'bob' }, sh));
      let rq = t('g', { transform: 'translate(322 160) rotate(-38)' }, [
        t('rect', { x: -3, y: 34, width: 6, height: 30, rx: 2.5, fill: 'oklch(0.30 0.03 40)' }),
        t('line', { x1: 0, y1: 0, x2: 0, y2: 36, stroke: 'oklch(0.60 0.01 250)', 'stroke-width': 2 }),
        t('ellipse', { cx: 0, cy: -24, rx: 20, ry: 27, fill: '#fff', 'fill-opacity': 0.12, stroke: 'oklch(0.36 0.12 260)', 'stroke-width': 3.5 }),
        ...[-14, -7, 0, 7, 14].map((x) => t('line', { x1: x, y1: -48, x2: x, y2: 0, stroke: '#fff', 'stroke-width': 0.6, opacity: 0.8 })),
        ...[-42, -34, -26, -18, -10].map((y) => t('line', { x1: -19, y1: y, x2: 19, y2: y, stroke: '#fff', 'stroke-width': 0.6, opacity: 0.8 })),
      ]);
      c.add(rq);
      const die = (x, y, rot, pips) => {
        const P = { 1: [[0, 0]], 3: [[-6, -6], [0, 0], [6, 6]], 5: [[-6, -6], [6, -6], [0, 0], [-6, 6], [6, 6]], 6: [[-6, -7], [6, -7], [-6, 0], [6, 0], [-6, 7], [6, 7]] }[pips];
        return t('g', { transform: `translate(${x} ${y}) rotate(${rot})` }, [
          t('rect', { x: -12, y: -10, width: 26, height: 26, rx: 5, fill: '#173016', opacity: 0.18 }),
          t('rect', { x: -13, y: -13, width: 26, height: 26, rx: 5, fill: 'oklch(0.98 0.01 90)' }),
          ...P.map(([px, py]) => t('circle', { cx: px, cy: py, r: 2.2, fill: pips === 1 ? 'oklch(0.56 0.19 28)' : 'oklch(0.22 0.01 250)' })),
        ].join(''));
      };
      c.add(die(206, 178, 14, 5));
      c.add(die(238, 206, -22, 3));
      const card = (x, y, rot, suit, col) => t('g', { transform: `translate(${x} ${y}) rotate(${rot})` }, [
        t('rect', { x: -15, y: -20, width: 34, height: 48, rx: 3.5, fill: '#173016', opacity: 0.16 }),
        t('rect', { x: -17, y: -24, width: 34, height: 48, rx: 3.5, fill: '#fff' }),
        t('text', { x: -12, y: -12, 'font-size': 9, 'font-family': 'Inter, sans-serif', 'font-weight': 600, fill: col }, 'A'),
        t('text', { x: 0, y: 7, 'font-size': 18, 'text-anchor': 'middle', fill: col }, suit),
      ].join(''));
      c.add(card(58, 210, -16, '♠', 'oklch(0.22 0.01 250)'));
      c.add(card(82, 214, 8, '♥', 'oklch(0.56 0.19 28)'));
    },
  };

  function canopyTop(c) {
    let d = `M-10 -4 L-10 ${30}`, x = -10;
    while (x < W + 10) {
      const rr = 14 + c.r() * 22, dx = rr * 1.4, ny = 26 + c.r() * 40;
      d += ` A${f(rr)} ${f(rr)} 0 0 0 ${f(x + dx)} ${f(ny)}`;
      x += dx;
    }
    return d + ` L${W + 10} -4 Z`;
  }

  function scene(kind, seed = 1) {
    const c = ctx(seed);
    (scenes[kind] || scenes.peak)(c);
    return out(c);
  }

  window.ART = { vine, scene };
})();
