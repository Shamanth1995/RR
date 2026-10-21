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
      const minDate = today;
      const minCheckOut = computed(() => addDays(booking.checkIn || today, 1));
      watch(() => booking.checkIn, (ci) => {
        if (!ci) return;
        if (ci < today) booking.checkIn = today;
        if (!booking.checkOut || booking.checkOut <= booking.checkIn) booking.checkOut = addDays(booking.checkIn, 1);
      });
      watch(() => booking.checkOut, (co) => {
        if (co && booking.checkIn && co <= booking.checkIn) booking.checkOut = addDays(booking.checkIn, 1);
      });
      const nights = computed(() => Math.max(1, Math.round((parse(booking.checkOut) - parse(booking.checkIn)) / 864e5) || 1));
      const nightsLabel = computed(() => `${nights.value} ${nights.value === 1 ? 'night' : 'nights'}`);
      const dateRange = computed(() => `${fmtShort(booking.checkIn)} – ${fmtShort(booking.checkOut)}`);
      const roomName = computed(() => ([...rooms, dorm].find((r) => r.id === booking.room) || {}).name || 'No preference');

      const enquiryText = computed(() => {
        const lines = [`Hello ${config.name || 'Coorg River Rest'}! I’d like to enquire about a stay.`, ''];
        if (booking.name) lines.push(`Name: ${booking.name}`);
        lines.push(`Check-in: ${fmtLong(booking.checkIn)}`);
        lines.push(`Check-out: ${fmtLong(booking.checkOut)} (${nightsLabel.value})`);
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
        if (typeof roomId === 'string') booking.room = roomId;
        if (typeof phoneIdx === 'number' && phones[phoneIdx]) waIndex.value = phoneIdx;
        lastFocus = document.activeElement;
        dialogOpen.value = true;
        nextTick(() => nameInput.value && nameInput.value.focus());
      }
      function closeEnquiry() {
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
      watch([dialogOpen, menuOpen, lb], ([d, m, l]) => {
        document.documentElement.style.overflow = d || m || l >= 0 ? 'hidden' : '';
      });

      /* page chrome */
      const scrolled = ref(false);
      const active = ref('');
      const onScroll = () => { scrolled.value = window.scrollY > 560; };
      const onKey = (e) => {
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
        document.addEventListener('visibilitychange', onVisibility);
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
        document.removeEventListener('visibilitychange', onVisibility);
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
        booking, minDate, minCheckOut, nightsLabel, dateRange,
        isMobile, waIndex, wa,
        dialogOpen, menuOpen, nameInput, openEnquiry, closeEnquiry,
        lb, openLightbox, openLightboxById, openLightboxBySrc, lbStep,
        onTouchStart, onTouchEnd, onLbTouchEnd,
        scrolled, active,
      };
    },
  });

  app.component('ui-icon', UiIcon);
  app.mount('#app');
})();
