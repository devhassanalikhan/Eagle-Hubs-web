(function(){
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
    document.getElementById('mobBtn').textContent = '☰';
  };

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
})();
