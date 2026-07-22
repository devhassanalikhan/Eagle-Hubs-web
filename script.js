(function() {
'use strict';

/* ─── HERO SLIDER ─── */
let slideIdx = 0;
const slides = document.querySelectorAll('.hero-slide');

function nextSlide() {
  slides[slideIdx].classList.remove('active');
  slideIdx = (slideIdx + 1) % slides.length;
  slides[slideIdx].classList.add('active');
}

let slidePaused = false;
let slideInterval = setInterval(nextSlide, 6000);
window.toggleSlide = function() {
  slidePaused = !slidePaused;
  if (slidePaused) {
    clearInterval(slideInterval);
    document.getElementById('slidePause').textContent = '▶ Play';
  } else {
    slideInterval = setInterval(nextSlide, 6000);
    document.getElementById('slidePause').textContent = '⏸ Pause';
  }
};

/* Load slides 1 and 2 lazily after 2 seconds */
setTimeout(() => {
  document.getElementById('slide-1').style.background = "url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&fm=webp&q=75') center/cover no-repeat";
  document.getElementById('slide-2').style.background = "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&fm=webp&q=75') center/cover no-repeat";
}, 2000);

/* ─── SEARCH FUNCTIONALITY ─── */
window.searchProperties = function() {
  const selects = document.querySelectorAll('#form-property .search-select');
  const purpose = selects[0].value, type = selects[1].value, 
        city = selects[2].value, size = selects[3].value,
        beds = selects[4].value, price = selects[5].value;
  const parts = [purpose,type,city,size,beds,price].filter(Boolean);
  if (!parts.length) { alert('Please select at least one filter to search.'); return; }
  const msg = encodeURIComponent(
    '*Property Search — Eagle Hubs*\n\n' +
    (purpose ? '*Purpose:* ' + purpose + '\n' : '') +
    (type ? '*Type:* ' + type + '\n' : '') +
    (city ? '*City:* ' + city + '\n' : '') +
    (size ? '*Size:* ' + size + '\n' : '') +
    (beds ? '*Bedrooms:* ' + beds + '\n' : '') +
    (price ? '*Budget:* ' + price + '\n' : '') +
    '\nPlease share matching listings.'
  );
  window.open('https://wa.me/923369313821?text=' + msg, '_blank');
};

window.searchCars = function() {
  const selects = document.querySelectorAll('#form-cars .search-select');
  const brand = selects[0].value, type = selects[1].value, 
        year = selects[2].value, city = selects[3].value,
        condition = selects[4].value, price = selects[5].value;
  const parts = [brand,type,year,city,condition,price].filter(Boolean);
  if (!parts.length) { alert('Please select at least one filter to search.'); return; }
  const msg = encodeURIComponent(
    '*Car Search — Eagle Hubs*\n\n' +
    (brand ? '*Brand:* ' + brand + '\n' : '') +
    (type ? '*Type:* ' + type + '\n' : '') +
    (year ? '*Year:* ' + year + '\n' : '') +
    (city ? '*City:* ' + city + '\n' : '') +
    (condition ? '*Condition:* ' + condition + '\n' : '') +
    (price ? '*Budget:* ' + price + '\n' : '') +
    '\nPlease share matching listings.'
  );
  window.open('https://wa.me/923369313821?text=' + msg, '_blank');
};

window.searchInvestments = function() {
  const selects = document.querySelectorAll('#form-investments .search-select');
  const project = selects[0].value, type = selects[1].value, 
        size = selects[2].value, plan = selects[3].value,
        budget = selects[4].value, status = selects[5].value;
  const parts = [project,type,size,plan,budget,status].filter(Boolean);
  if (!parts.length) { alert('Please select at least one filter to search.'); return; }
  const msg = encodeURIComponent(
    '*Investment Search — Eagle Hubs*\n\n' +
    (project ? '*Project:* ' + project + '\n' : '') +
    (type ? '*Plot Type:* ' + type + '\n' : '') +
    (size ? '*Plot Size:* ' + size + '\n' : '') +
    (plan ? '*Installment Plan:* ' + plan + '\n' : '') +
    (budget ? '*Budget:* ' + budget + '\n' : '') +
    (status ? '*Status:* ' + status + '\n' : '') +
    '\nPlease share matching listings.'
  );
  window.open('https://wa.me/923369313821?text=' + msg, '_blank');
};

/* ─── PARALLAX (hardware-accelerated) ─── */
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      slides.forEach(s => {
        s.style.transform = `translateY(${sy * 0.3}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─── MOBILE MENU ─── */
window.toggleMob = function() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('mobBtn');
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.textContent = open ? '✕' : '☰';
};
window.closeMob = function() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('mobBtn').textContent = '☰';
};

/* ─── SEARCH TAB SWITCH ─── */
window.switchTab = function(id, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.search-form').forEach(f => f.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('form-' + id).classList.add('active');
};

/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMob();
    }
  });
});

/* ─── SCROLL REVEAL via IntersectionObserver ─── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');

      /* Animate progress bars */
      const fills = e.target.querySelectorAll('.progress-fill');
      fills.forEach(f => {
        f.style.width = f.dataset.width + '%';
      });

      /* Animate stat counters */
      const stats = e.target.querySelectorAll('.stat-number[data-target]');
      stats.forEach(s => animateCounter(s));

      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

/* Also observe invest cards for progress bars */
document.querySelectorAll('.invest-card').forEach(el => io.observe(el));

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ─── CARS CAROUSEL ─── */
window.scrollCars = function(dir) {
  const track = document.getElementById('carsTrack');
  const amount = track.querySelector('.car-card').offsetWidth + 20;
  track.scrollBy({ left: dir * amount * 1.5, behavior: 'smooth' });
};

/* ─── TOUCH GESTURES for carousel ─── */
(function() {
  const track = document.getElementById('carsTrack');
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) track.scrollBy({ left: -dx * 1.5, behavior: 'smooth' });
  }, { passive: true });
})();

/* ─── INQUIRY MODAL ─── */
window.openModal = function(name) {
  document.getElementById('modalItem').textContent = name;
  const modal = document.getElementById('inquiryModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  const focusable = modal.querySelectorAll('input:not([name="website"]),textarea,button,select');
  const first = focusable[0], last = focusable[focusable.length - 1];
  setTimeout(() => first && first.focus(), 100);
  
  if (!modal.dataset.trapAdded) {
    modal.addEventListener('keydown', function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const currentFocusable = modal.querySelectorAll('input:not([name="website"]),textarea,button,select');
      const f = currentFocusable[0], l = currentFocusable[currentFocusable.length - 1];
      if (e.shiftKey ? document.activeElement === f : document.activeElement === l) {
        e.preventDefault();
        (e.shiftKey ? l : f).focus();
      }
    });
    modal.dataset.trapAdded = "true";
  }
};

window.closeModal = function() {
  document.getElementById('inquiryModal').classList.remove('open');
  document.body.style.overflow = '';
};

document.getElementById('inquiryModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

window.submitInquiry = function(e) {
  e.preventDefault();
  const form = e.target;
  
  // 1. Honeypot check
  if (form.querySelector('[name="website"]').value) return; // honeypot triggered

  const name = form.querySelector('[name="name"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();
  const item = document.getElementById('modalItem').textContent;
  const errorDiv = document.getElementById('form-error');

  // 3. Basic client-side validation
  let errors = [];
  if (name.length < 3) {
    errors.push('Name must be at least 3 characters long.');
  }
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  if (cleanPhone.length < 10) {
    errors.push('Please enter a valid phone number (minimum 10 digits).');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address.');
  }

  if (errors.length > 0) {
    errorDiv.textContent = errors.join(' ');
    errorDiv.style.display = 'block';
    return;
  }
  errorDiv.style.display = 'none';

  // 2. 10-second cooldown after submission
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = 'Sent! ✓';

  const msg = encodeURIComponent(
    `*New Inquiry — Eagle Hubs*\n\n` +
    `*Item:* ${item}\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Message:* ${message || 'N/A'}`
  );
  window.open(`https://wa.me/923369313821?text=${msg}`, '_blank');
  
  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = originalText;
  }, 10000);

  closeModal();
  form.reset();
};

/* ─── PREVENT pinch-zoom ─── */
document.addEventListener('touchmove', e => {
  if (e.touches && e.touches.length > 1) e.preventDefault();
}, { passive: false });

/* ─── ORIENTATION CHANGE ─── */
window.addEventListener('orientationchange', () => {
  setTimeout(() => window.scrollTo(0, 0), 120);
});

})();
