/* Eagle Hubs Software Division v2 — main.js
   Theme toggle, nav state, scroll-spy, mobile menu, hero slideshow,
   stat counters, reveal fallback, contact form. */
(function(){
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── THEME TOGGLE ── */
  window.toggleTheme = function(){
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try{ localStorage.setItem('eh-theme', next); }catch(e){}
  };

  /* ── NAV ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive:true });

  window.toggleMob = function(){
    const m = document.getElementById('mob-menu');
    const btn = document.getElementById('mobBtn');
    const open = m.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? '✕' : '☰';
  };
  window.closeMob = function(){
    document.getElementById('mob-menu').classList.remove('open');
    const btn = document.getElementById('mobBtn');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '☰';
  };

  /* scroll-spy */
  const spyLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const spyMap = new Map();
  spyLinks.forEach(a => {
    const sec = document.getElementById(a.getAttribute('href').slice(1));
    if(sec) spyMap.set(sec, a);
  });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        spyLinks.forEach(a => a.classList.remove('active'));
        const link = spyMap.get(e.target);
        if(link) link.classList.add('active');
      }
    });
  }, { rootMargin:'-40% 0px -55% 0px' });
  spyMap.forEach((_, sec) => spy.observe(sec));

  /* ── HERO SLIDESHOW (lazy: only slide 1 loads eagerly) ── */
  (function(){
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    if(!slides.length) return;
    let idx = 0;
    slides[0].classList.add('active');
    if(reducedMotion || slides.length < 2) return;

    /* preload remaining backgrounds after full page load */
    window.addEventListener('load', () => {
      slides.slice(1).forEach(s => {
        const url = s.dataset.bg;
        if(url) s.style.backgroundImage = 'url("' + url + '")';
      });
    });

    setInterval(() => {
      const prev = slides[idx];
      idx = (idx + 1) % slides.length;
      const next = slides[idx];
      if(next.dataset.bg && !next.style.backgroundImage){
        next.style.backgroundImage = 'url("' + next.dataset.bg + '")';
      }
      prev.classList.remove('active');
      /* restart ken burns */
      void next.offsetWidth;
      next.classList.add('active');
    }, 6500);
  })();

  /* ── REVIEWS MARQUEE: duplicate cards once for a seamless loop ── */
  (function(){
    const track = document.querySelector('.reviews-track');
    if(!track || reducedMotion) return;
    track.innerHTML += track.innerHTML;
  })();

  /* ── STAT COUNTERS ── */
  (function(){
    const els = document.querySelectorAll('.hero-stat-val[data-count]');
    if(!els.length) return;
    const fmt = (el, v) => {
      let s = el.dataset.format === 'comma' ? Math.round(v).toLocaleString('en-US') : String(Math.round(v));
      el.textContent = s + (el.dataset.suffix || '');
    };
    if(reducedMotion){ els.forEach(el => fmt(el, +el.dataset.count)); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target, target = +el.dataset.count, dur = 1500, t0 = performance.now();
        (function tick(t){
          const p = Math.min((t - t0) / dur, 1);
          fmt(el, target * (1 - Math.pow(1 - p, 3))); /* ease-out cubic */
          if(p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold:0.6 });
    els.forEach(el => io.observe(el));
  })();

  /* ── 3D TILT (service cards + case-study devices) ── */
  (function(){
    if(reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const els = document.querySelectorAll('.service-card, .work-media');
    els.forEach(el => {
      const strength = el.classList.contains('work-media') ? 5 : 7;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transition = 'transform .08s linear';
        el.style.transform =
          'perspective(900px) rotateX(' + ((0.5 - py) * strength) + 'deg)' +
          ' rotateY(' + ((px - 0.5) * strength) + 'deg) translateY(-2px)';
        el.style.setProperty('--mx', (px * 100) + '%');
        el.style.setProperty('--my', (py * 100) + '%');
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .5s cubic-bezier(.22,.61,.36,1)';
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      });
    });
  })();

  /* ── REVEALS (IO fallback) ── */
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── PROCESS SCROLL LINE ── */
  (function(){
    const fill = document.getElementById('processFill');
    const sec = document.getElementById('process');
    if(!fill || !sec) return;
    if(reducedMotion){ fill.style.width = '100%'; return; }
    const update = () => {
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height * 0.9), 0), 1);
      fill.style.width = (p * 100) + '%';
    };
    window.addEventListener('scroll', update, { passive:true });
    update();
  })();

  /* ── SMOOTH ANCHORS ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){ e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  /* ── CONTACT FORM ── */
  (function(){
    const form = document.getElementById('contactForm');
    if(!form) return;
    const status = document.getElementById('formStatus');
    const getData = () => ({
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      message: form.message.value.trim()
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = getData();
      if(!d.name || !d.email || !d.message){
        status.className = 'form-status err';
        status.textContent = 'Please fill in your name, email, and message.';
        return;
      }
      const btn = document.getElementById('formSubmitBtn');
      btn.disabled = true; btn.style.opacity = .6;
      status.className = 'form-status'; status.textContent = 'Sending…';
      try{
        const res = await fetch('https://formsubmit.co/ajax/dev.hassanalikhan@gmail.com', {
          method:'POST',
          headers:{ 'Content-Type':'application/json', 'Accept':'application/json' },
          body: JSON.stringify({
            name: d.name, email: d.email, company: d.company, message: d.message,
            _subject: 'New project inquiry — Eagle Hubs Software',
            _template: 'table', _captcha: 'false'
          })
        });
        if(!res.ok) throw new Error();
        status.className = 'form-status ok';
        status.textContent = "Sent — we'll get back to you within a day.";
        form.reset();
      }catch(err){
        status.className = 'form-status err';
        status.textContent = "Couldn't send right now — try the WhatsApp button instead.";
      }finally{
        btn.disabled = false; btn.style.opacity = 1;
      }
    });

    window.sendViaWhatsApp = function(){
      const d = getData();
      const text = encodeURIComponent(
        'Hi Eagle Hubs — new project inquiry.\n' +
        'Name: ' + (d.name || '—') + '\n' +
        'Email: ' + (d.email || '—') + '\n' +
        (d.company ? 'Company: ' + d.company + '\n' : '') +
        'Message: ' + (d.message || '—')
      );
      window.open('https://wa.me/923175084821?text=' + text, '_blank', 'noopener');
    };
  })();
})();
