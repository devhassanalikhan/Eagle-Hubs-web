(function() {
  'use strict';
  
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
})();
