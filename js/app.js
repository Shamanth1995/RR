/* ==========================================================================
   Coorg River Rest — Vue app
   Uses the Vue 3 global build from the CDN (no build step). The template is
   the markup inside #app in index.html; content comes from js/data.js.
   ========================================================================== */
(function () {
  'use strict';
  const { createApp, ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } = Vue;

  /* --- Icons (24×24 stroke icons) ----------------------------------------- */
  const ICONS = {
    leaf: '<path d="M4 20C4 11 10 5 20 4c0 10-6 16-15 16"/><path d="M4 20 13 11"/>',
    'arrow-left': '<path d="M15 18l-6-6 6-6"/>',
    'arrow-right': '<path d="M9 18l6-6-6-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    whatsapp: '<path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.5L3.5 20.5l1.4-4.1a8.6 8.6 0 1 1 15.6-4.8Z"/><path d="M9 8.6c.3 2.9 3 5.8 6.1 6.3l1.1-1.5-2-1.1-.9.8a4.5 4.5 0 0 1-2.4-2.4l.8-.9-1.1-2Z"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    river: '<path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>',
    bean: '<ellipse cx="12" cy="12" rx="6" ry="8.8" transform="rotate(35 12 12)"/><path d="M15.6 5.6c-2.4 1.8-2 4.4-3.6 6.4s-4.2 2.2-5.6 5.6"/>',
    mountains: '<path d="m2 20 7-12 4 6 2.5-3.5L22 20Z"/><path d="m7.4 10.6 1.6 1.4 1.6-1.4"/>',
    utensils: '<path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v5"/><path d="M17 21V3c-2.2 1.2-3 4-3 8h3"/>',
    flame: '<path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-1.5-2-1.5-3C7 10 6 12.5 6 15a6 6 0 0 0 6 6Z"/>',
    grill: '<path d="M4 9h16a8 8 0 0 1-16 0Z"/><path d="M8 16.5 6 21M16 16.5l2 4.5M12 17v4M9 6c0-1 1-1 1-2.5M13.5 6c0-1 1-1 1-2.5"/>',
    pool: '<path d="M2 19c2.5 0 2.5-1.5 5-1.5s2.5 1.5 5 1.5 2.5-1.5 5-1.5 2.5 1.5 5 1.5"/><path d="M8 15V5.5a2 2 0 0 1 4 0M16 15V5.5a2 2 0 0 0-4 0M8 8.5h8M8 12h8"/>',
    games: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle cx="15.5" cy="11.2" r=".7" fill="currentColor"/><circle cx="17.6" cy="13.8" r=".7" fill="currentColor"/>',
    drop: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z"/><path d="M9.5 14.5a2.6 2.6 0 0 0 2.5 2.5"/>',
    'no-smoke': '<rect x="2.5" y="14" width="14" height="3.5" rx=".6"/><path d="M19.5 14v3.5M16.8 10.5c0-1.6 1.6-1.6 1.6-3.2S16.8 5.6 16.8 4"/><path d="M3 3l18 18"/>',
    smoke: '<rect x="2.5" y="14" width="14" height="3.5" rx=".6"/><path d="M19.5 14v3.5M16.8 10.5c0-1.6 1.6-1.6 1.6-3.2S16.8 5.6 16.8 4M20.4 10.5c0-1.6 1.6-1.6 1.6-3.2S20.4 5.6 20.4 4"/>',
    home: '<path d="M3 11 12 4l9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/>',
    'music-off': '<path d="M9 18V6l10-2v9"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/><path d="M3 3l18 18"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>',
    road: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v2"/>',
    access: '<circle cx="11" cy="4.6" r="1.8"/><path d="M11 7.6v6h5l2 5"/><path d="M8 10.6a6 6 0 1 0 7.6 8"/>',
    power: '<rect x="2.5" y="7" width="17" height="10" rx="2"/><path d="M22 10.5v3"/><path d="m11.6 8.6-2.6 3.9h4l-2.6 3.9"/>',
    signal: '<path d="M5 18v-2M9.5 18v-5M14 18v-8M18.5 18V6"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14a6.5 6.5 0 0 1 3.5 6"/>',
    route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
  };

  const UiIcon = {
    props: { name: String, size: { type: [Number, String], default: 20 } },
    computed: { paths() { return ICONS[this.name] || ''; } },
    template: '<svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" v-html="paths"></svg>',
  };

  /* --- Dates (local time, not UTC) ----------------------------------------- */
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = (s) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); };
  const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
  const fmtShort = (s) => parse(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const fmtLong = (s) => parse(s).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const fmtField = (s) => parse(s).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  /* --- Date-range calendar --------------------------------------------------
     Pick a check-in day, then a check-out day. Emits `pick` with both dates
     after every click, and `done` once a check-out date is chosen.
     Arrow keys move between days; Escape closes.
  -------------------------------------------------------------------------- */
  const WEEKDAYS = [['S', 'Sunday'], ['M', 'Monday'], ['T', 'Tuesday'], ['W', 'Wednesday'], ['T', 'Thursday'], ['F', 'Friday'], ['S', 'Saturday']];
  const RangeCalendar = {
    props: {
      checkIn: { type: String, default: '' },
      checkOut: { type: String, default: '' },
      field: { type: String, default: 'in' },
      months: { type: Number, default: 1 },
    },
    emits: ['pick', 'done', 'close'],
    setup(props, { emit }) {
      const today = iso(new Date());
      const maxIso = addDays(today, 540);
      const phase = ref(props.field);
      watch(() => props.field, (v) => { phase.value = v; });
      const start = parse(props.checkIn || today);
      const view = ref({ y: start.getFullYear(), m: start.getMonth() });
      const hover = ref('');
      const focusIso = ref(props.field === 'out' ? (props.checkOut || addDays(props.checkIn || today, 1)) : (props.checkIn || today));
      const root = ref(null);

      const monthKey = (y, m) => y * 12 + m;
      const t0 = parse(today), tMax = parse(maxIso);
      const viewKey = computed(() => monthKey(view.value.y, view.value.m));
      const canPrev = computed(() => viewKey.value > monthKey(t0.getFullYear(), t0.getMonth()));
      const canNext = computed(() => viewKey.value + props.months - 1 < monthKey(tMax.getFullYear(), tMax.getMonth()));
      const shift = (k) => { const d = new Date(view.value.y, view.value.m + k, 1); view.value = { y: d.getFullYear(), m: d.getMonth() }; };

      const rangeEnd = computed(() => props.checkOut || (phase.value === 'out' && props.checkIn && hover.value > props.checkIn ? hover.value : ''));
      const grid = computed(() => {
        const list = [];
        for (let k = 0; k < props.months; k++) {
          const first = new Date(view.value.y, view.value.m + k, 1);
          const y = first.getFullYear(), m = first.getMonth(), lead = first.getDay();
          const days = new Date(y, m + 1, 0).getDate();
          const s0 = props.checkIn, e0 = rangeEnd.value;
          const cells = [];
          for (let b = 0; b < lead; b++) cells.push({ key: 'b' + b, blank: true });
          for (let d = 1; d <= days; d++) {
            const id = `${y}-${pad(m + 1)}-${pad(d)}`;
            const col = (lead + d - 1) % 7;
            cells.push({
              key: id, iso: id, d, blank: false, col,
              disabled: id < today || id > maxIso,
              today: id === today,
              sel: id === s0 || id === e0,
              inRange: !!(s0 && e0 && id > s0 && id < e0),
              bandStart: !!(s0 && e0 && id === s0),
              bandEnd: !!(s0 && e0 && id === e0),
              label: parse(id).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
            });
          }
          list.push({ key: y + '-' + m, label: first.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }), cells });
        }
        return list;
      });
      const tabIso = computed(() => {
        const days = grid.value.flatMap((mo) => mo.cells).filter((c) => !c.blank && !c.disabled);
        return (days.find((c) => c.iso === focusIso.value) || days[0] || {}).iso;
      });

      function pick(c) {
        if (c.disabled) return;
        focusIso.value = c.iso;
        if (phase.value === 'in' || !props.checkIn || c.iso <= props.checkIn) {
          const keepOut = props.checkOut && props.checkOut > c.iso ? props.checkOut : '';
          emit('pick', { checkIn: c.iso, checkOut: keepOut });
          phase.value = 'out';
        } else {
          emit('pick', { checkIn: props.checkIn, checkOut: c.iso });
          hover.value = '';
          emit('done');
        }
      }
      const nights = computed(() => (props.checkIn && props.checkOut ? Math.round((parse(props.checkOut) - parse(props.checkIn)) / 864e5) : 0));
      const status = computed(() => {
        if (phase.value === 'out' && !props.checkOut) return 'Now choose your check-out date';
        if (phase.value === 'in') return 'Choose your check-in date';
        return `${nights.value} ${nights.value === 1 ? 'night' : 'nights'} · ${fmtShort(props.checkIn)} – ${fmtShort(props.checkOut)}`;
      });
      const focusDay = (id, opts) => nextTick(() => {
        const b = root.value && root.value.querySelector('[data-iso="' + id + '"]');
        if (b) b.focus(opts);
      });
      function onKey(e) {
        if (e.key === 'Escape') { e.stopPropagation(); emit('close'); return; }
        const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
        const from = e.target && e.target.dataset && e.target.dataset.iso;
        if (!from || !(e.key in steps)) return;
        e.preventDefault();
        let to = addDays(from, steps[e.key]);
        if (to < today) to = today;
        if (to > maxIso) to = maxIso;
        const td = parse(to), k = monthKey(td.getFullYear(), td.getMonth());
        if (k < viewKey.value) shift(k - viewKey.value);
        else if (k > viewKey.value + props.months - 1) shift(k - (viewKey.value + props.months - 1));
        focusIso.value = to;
        focusDay(to);
      }
      onMounted(() => focusDay(tabIso.value, { preventScroll: true }));
      return { root, grid, weekdays: WEEKDAYS, canPrev, canNext, shift, hover, tabIso, pick, status, onKey };
    },
    template: `
      <div ref="root" class="cal" @keydown="onKey">
        <div class="cal-months" :style="{ gridTemplateColumns: 'repeat(' + months + ', minmax(0, 1fr))' }" @mouseleave="hover = ''">
          <div v-for="(mo, mi) in grid" :key="mo.key" class="cal-month">
            <div class="cal-head">
              <button type="button" class="cal-nav" :class="{ 'is-hidden': mi !== 0 }" :disabled="!canPrev" aria-label="Previous month" @click="shift(-1)"><ui-icon name="arrow-left" :size="16"></ui-icon></button>
              <span class="cal-title" aria-live="polite">{{ mo.label }}</span>
              <button type="button" class="cal-nav" :class="{ 'is-hidden': mi !== grid.length - 1 }" :disabled="!canNext" aria-label="Next month" @click="shift(1)"><ui-icon name="arrow-right" :size="16"></ui-icon></button>
            </div>
            <div class="cal-grid">
              <span v-for="w in weekdays" :key="w[1]" class="cal-wd" :title="w[1]" aria-hidden="true">{{ w[0] }}</span>
              <div v-for="c in mo.cells" :key="c.key" class="cal-cell" :class="{ 'in-range': c.inRange, 'band-start': c.bandStart, 'band-end': c.bandEnd, 'row-start': c.col === 0, 'row-end': c.col === 6 }">
                <button v-if="!c.blank" type="button" class="cal-day" :class="{ 'is-sel': c.sel, 'is-today': c.today }" :disabled="c.disabled" :data-iso="c.iso" :tabindex="c.iso === tabIso ? 0 : -1" :aria-label="c.label" :aria-pressed="c.sel ? 'true' : 'false'" @click="pick(c)" @mouseenter="hover = c.iso" @focus="hover = c.iso">{{ c.d }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cal-foot">
          <span class="cal-status" aria-live="polite">{{ status }}</span>
          <button type="button" class="btn btn-primary btn-sm" :disabled="!checkOut" @click="$emit('done')">Done</button>
        </div>
      </div>`,
  };

  /* --- Fireflies for the dark band ---------------------------------------- */
  function fireflies(n = 46, seed = 11) {
    let s = seed;
    const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    let dots = '';
    for (let i = 0; i < n; i++) {
      const x = (r() * 100).toFixed(2), y = (r() * 100).toFixed(2), rad = (0.6 + r() * 1.6).toFixed(2);
      dots += `<circle cx="${x}%" cy="${y}%" r="${rad}" fill="oklch(0.92 0.13 105)" class="tw" style="animation-delay:-${(r() * 4).toFixed(2)}s;animation-duration:${(2.4 + r() * 3).toFixed(1)}s"/>`;
      if (i % 3 === 0) dots += `<circle cx="${x}%" cy="${y}%" r="${(rad * 4).toFixed(1)}" fill="oklch(0.92 0.13 105)" opacity=".12"/>`;
    }
    return `<svg class="scene" width="100%" height="100%" aria-hidden="true" focusable="false">${dots}</svg>`;
  }

  const app = createApp({
    setup() {
      const config = window.CONFIG || {};
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      /* content */
      const rooms = window.ROOMS || [];
      const dorm = window.DORM || { id: 'dorm', name: 'Dormitory', body: '' };
      const phones = config.phones || [];
      const baths = window.BATHS || [];
      const serviceIcons = { campfire: 'flame', bbq: 'grill', pool: 'pool', games: 'games' };
      const services = (window.SERVICES || []).map((s, i) => ({ ...s, icon: serviceIcons[s.id] || 'leaf', art: ART.scene(s.id, 101 + i * 13) }));
      const places = (window.PLACES || []).map((p, i) => ({ ...p, art: ART.scene(p.kind, 7 + i * 17) }));
      const gallery = (window.GALLERY || []).map((g) => ({ ...g, src: `images/${g.id}.jpg`, thumb: `images/thumbs/${g.id}.jpg` }));

      const links = [
        { href: '#about', label: 'About' },
        { href: '#rooms', label: 'Rooms' },
        { href: '#experiences', label: 'Experiences' },
        { href: '#gallery', label: 'Gallery' },
        { href: '#nearby', label: 'Nearby' },
        { href: '#rules', label: 'House rules' },
        { href: '#location', label: 'Location' },
      ];
      const highlights = [
        { icon: 'river', title: 'Riverside', body: 'A flowing river wraps around the property.' },
        { icon: 'bean', title: 'Coffee estates', body: 'Set amid lush, sprawling coffee plantations.' },
        { icon: 'mountains', title: 'Hill-view balconies', body: 'Every room and the dormitory has a balcony facing the hills.' },
        { icon: 'utensils', title: 'Veg & non-veg', body: 'Our own restaurant, right on site.' },
      ];
      const rules = [
        { icon: 'no-smoke', title: 'No smoking in rooms or the dining area', body: 'Smoking is permitted only in the designated smoking area.' },
        { icon: 'home', title: 'No smoking inside the cottage', body: '' },
        { icon: 'music-off', title: 'No loud music after 10:00 PM', body: '' },
        { icon: 'heart', title: 'Please treat the home with care', body: 'Guests are earnestly requested to look after the home as their own.' },
      ];
      const notes = [
        { icon: 'road', title: 'The approach road', body: 'The road leading up to the cottage may not be fully concreted.' },
        { icon: 'access', title: 'Accessibility', body: 'This is not a wheelchair-friendly property.' },
        { icon: 'power', title: 'Power backup', body: 'During a power outage the inverter supports the appliances for up to 4–6 hours. A generator is also available for backup on request.' },
        { icon: 'signal', title: 'Mobile network', body: 'Jio works fairly well here, but given the location, connectivity may be limited.' },
      ];

      /* greenery: generated once */
      const vines = {
        left: ART.vine({ L: 1500, W: 124, seed: 7, uid: 'vl' }),
        right: ART.vine({ L: 1500, W: 124, seed: 23, uid: 'vr' }),
        top: ART.vine({ L: 2600, W: 96, seed: 41, density: 'light', uid: 'vt', horizontal: true }),
        bottom: ART.vine({ L: 2600, W: 96, seed: 59, density: 'light', uid: 'vb', horizontal: true }),
      };

      /* rooms carousel */
      const idx = ref(0);
      const hover = ref(false);
      const pageHidden = ref(false);
      const autoplay = !reduced && rooms.length > 1;
      const go = (i) => { const n = rooms.length; idx.value = ((i % n) + n) % n; };
      const next = () => go(idx.value + 1);
      const prev = () => go(idx.value - 1);
      const counter = computed(() => `0${idx.value + 1} / 0${rooms.length}`);

      /* overlays */
      const dialogOpen = ref(false);
      const menuOpen = ref(false);
      const lb = ref(-1);
      const nameInput = ref(null);
      const carouselPaused = computed(() => hover.value || pageHidden.value || dialogOpen.value || menuOpen.value || lb.value >= 0);

      /* booking */
      const today = iso(new Date());
      const booking = reactive({ checkIn: addDays(today, 7), checkOut: addDays(today, 9), guests: 2, room: '', name: '', message: '' });
      const nights = computed(() => (booking.checkIn && booking.checkOut ? Math.max(1, Math.round((parse(booking.checkOut) - parse(booking.checkIn)) / 864e5)) : 0));
      const nightsLabel = computed(() => (nights.value ? `${nights.value} ${nights.value === 1 ? 'night' : 'nights'}` : 'Choose dates'));
      const dateRange = computed(() => `${booking.checkIn ? fmtShort(booking.checkIn) : '…'} – ${booking.checkOut ? fmtShort(booking.checkOut) : '…'}`);

      /* calendar: '' (closed), 'hero' (under the booking bar) or 'dialog' (inside the enquiry form) */
      const calendarFor = ref('');
      const calField = ref('in');
      const heroCal = ref(null);
      const heroPop = ref(null);
      const vw = ref(window.innerWidth);
      const calMonths = computed(() => (calendarFor.value === 'dialog' ? (vw.value >= 640 ? 2 : 1) : (vw.value >= 768 ? 2 : 1)));
      let calSnap = null;
      function openCalendar(where, field) {
        if (calendarFor.value === where && calField.value === field) { closeCalendar(); return; }
        if (!calendarFor.value) calSnap = { checkIn: booking.checkIn, checkOut: booking.checkOut };
        calendarFor.value = where;
        calField.value = field;
        if (where === 'dialog') nextTick(() => setTimeout(() => {
          const el = document.querySelector('.cal-inline');
          if (el) el.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
        }, 30));
      }
      function setDates(v) { booking.checkIn = v.checkIn; booking.checkOut = v.checkOut; }
      function closeCalendar() {
        if (!booking.checkIn && calSnap) { booking.checkIn = calSnap.checkIn; booking.checkOut = calSnap.checkOut; }
        if (!booking.checkOut || booking.checkOut <= booking.checkIn) booking.checkOut = addDays(booking.checkIn, 1);
        calendarFor.value = '';
        calSnap = null;
      }
      const onDocDown = (e) => {
        if (calendarFor.value !== 'hero') return;
        const inside = (heroCal.value && heroCal.value.contains(e.target)) || (heroPop.value && heroPop.value.contains(e.target));
        if (!inside) closeCalendar();
      };
      const onResize = () => { vw.value = window.innerWidth; };
      const roomName = computed(() => ([...rooms, dorm].find((r) => r.id === booking.room) || {}).name || 'No preference');

      const enquiryText = computed(() => {
        const lines = [`Hello ${config.name || 'Coorg River Rest'}! I’d like to enquire about a stay.`, ''];
        if (booking.name) lines.push(`Name: ${booking.name}`);
        if (booking.checkIn) lines.push(`Check-in: ${fmtLong(booking.checkIn)}`);
        if (booking.checkOut) lines.push(`Check-out: ${fmtLong(booking.checkOut)} (${nightsLabel.value})`);
        lines.push(`Guests: ${booking.guests}`);
        lines.push(`Room: ${roomName.value}`);
        if (booking.message.trim()) lines.push('', booking.message.trim());
        return lines.join('\n');
      });
      /* WhatsApp: the app on phones, WhatsApp Web (or the desktop app) on computers */
      const isMobile = /Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(navigator.userAgent || '') ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const waIndex = ref(0);
      const wa = computed(() => {
        const num = String((phones[waIndex.value] || phones[0] || {}).number || '').replace(/\D/g, '');
        const text = encodeURIComponent(enquiryText.value);
        return {
          app: `https://wa.me/${num}?text=${text}`,
          web: `https://web.whatsapp.com/send?phone=${num}&text=${text}`,
        };
      });

      /* location */
      const lat = Number(config.lat), lng = Number(config.lng);
      const hasGeo = Number.isFinite(lat) && Number.isFinite(lng);
      const mapEmbed = hasGeo ? `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed` : '';
      const directionsUrl = hasGeo ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` : config.mapsUrl || '';
      const coords = hasGeo ? `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E` : '';
      const phoneList = phones.map((p) => p.display.replace(/ /g, '\u00a0')).join(' or ');
      const directions = [
        { icon: 'phone', title: 'Call us on the way', body: `Need help finding us? Call or WhatsApp ${phoneList}.` },
        { icon: 'road', title: 'The last stretch', body: 'The road leading up to the cottage may not be fully concreted.' },
        { icon: 'signal', title: 'Save our numbers first', body: 'Mobile signal can be limited near the property, so save our numbers before you set out.' },
      ];

      let lastFocus = null;
      function openEnquiry(roomId, phoneIdx) {
        if (calendarFor.value) closeCalendar();
        if (typeof roomId === 'string') booking.room = roomId;
        if (typeof phoneIdx === 'number' && phones[phoneIdx]) waIndex.value = phoneIdx;
        lastFocus = document.activeElement;
        dialogOpen.value = true;
        nextTick(() => nameInput.value && nameInput.value.focus());
      }
      function closeEnquiry() {
        if (calendarFor.value) closeCalendar();
        dialogOpen.value = false;
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      }
      /* lightbox */
      const openLightbox = (i) => { lastFocus = document.activeElement; lb.value = i; };
      const openLightboxById = (id) => { const i = gallery.findIndex((g) => g.id === id); if (i >= 0) openLightbox(i); };
      const openLightboxBySrc = (src) => { const i = gallery.findIndex((g) => g.src === src); if (i >= 0) openLightbox(i); };
      const lbStep = (d) => { const n = gallery.length; lb.value = (((lb.value + d) % n) + n) % n; };
      watch(lb, (v, old) => { if (v < 0 && old >= 0 && lastFocus && lastFocus.focus) lastFocus.focus(); });

      /* swipe */
      let tx = 0, ty = 0;
      const onTouchStart = (e) => { const p = e.changedTouches[0]; tx = p.clientX; ty = p.clientY; };
      const swipeDir = (e) => {
        const p = e.changedTouches[0], dx = p.clientX - tx, dy = p.clientY - ty;
        return Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3 ? (dx < 0 ? 1 : -1) : 0;
      };
      const onTouchEnd = (e) => { const d = swipeDir(e); if (d) go(idx.value + d); };
      const onLbTouchEnd = (e) => { const d = swipeDir(e); if (d) lbStep(d); };

      /* scroll lock while an overlay is open */
      watch([dialogOpen, menuOpen, lb, calendarFor, vw], ([d, m, l, c, w]) => {
        const sheet = c === 'hero' && w < 640;
        document.documentElement.style.overflow = d || m || l >= 0 || sheet ? 'hidden' : '';
      });

      /* page chrome */
      const scrolled = ref(false);
      const active = ref('');
      const onScroll = () => { scrolled.value = window.scrollY > 560; };
      const onKey = (e) => {
        if (calendarFor.value) {
          if (e.key === 'Escape') closeCalendar();
          return;
        }
        if (e.key === 'Escape') {
          if (lb.value >= 0) lb.value = -1;
          else if (dialogOpen.value) closeEnquiry();
          else if (menuOpen.value) menuOpen.value = false;
          return;
        }
        if (lb.value >= 0) {
          if (e.key === 'ArrowRight') lbStep(1);
          if (e.key === 'ArrowLeft') lbStep(-1);
          return;
        }
        if (dialogOpen.value || menuOpen.value) return;
        const tag = (e.target && e.target.tagName) || '';
        if (/INPUT|TEXTAREA|SELECT/.test(tag)) return;
        const rect = document.getElementById('rooms').getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3;
        if (!inView) return;
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      };
      const onVisibility = () => { pageHidden.value = document.hidden; };

      let revealObs = null, sectionObs = null;
      onMounted(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('keydown', onKey);
        window.addEventListener('resize', onResize, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        document.addEventListener('pointerdown', onDocDown);
        onScroll();

        if ('IntersectionObserver' in window) {
          if (!reduced) {
            document.documentElement.classList.add('js-reveal');
            revealObs = new IntersectionObserver((entries) => {
              entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
            }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
            document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));
          }
          sectionObs = new IntersectionObserver((entries) => {
            entries.forEach((en) => { if (en.isIntersecting) active.value = en.target.id; });
          }, { rootMargin: '-45% 0px -50% 0px' });
          links.forEach((l) => { const el = document.querySelector(l.href); if (el) sectionObs.observe(el); });
        }
      });
      onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVisibility);
        document.removeEventListener('pointerdown', onDocDown);
        revealObs && revealObs.disconnect();
        sectionObs && sectionObs.disconnect();
      });

      return {
        config, rooms, dorm, phones, baths, services, places, gallery, links, highlights, rules, notes, vines,
        fireflies: fireflies(),
        topo: ART.scene('topo', 5),
        mapEmbed, directionsUrl, coords, directions,
        year: new Date().getFullYear(),
        idx, hover, autoplay, go, next, prev, counter, carouselPaused,
        booking, nightsLabel, dateRange, fmtField,
        calendarFor, calField, calMonths, heroCal, heroPop, vw, openCalendar, closeCalendar, setDates,
        isMobile, waIndex, wa,
        dialogOpen, menuOpen, nameInput, openEnquiry, closeEnquiry,
        lb, openLightbox, openLightboxById, openLightboxBySrc, lbStep,
        onTouchStart, onTouchEnd, onLbTouchEnd,
        scrolled, active,
      };
    },
  });

  app.component('ui-icon', UiIcon);
  app.component('range-calendar', RangeCalendar);
  app.mount('#app');
})();
