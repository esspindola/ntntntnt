/* TOKYO — shared site behaviour: nav scroll state, mobile menu, scroll reveal */
(function () {
  'use strict';

  // Nav scroll state
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('.nav__toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
      var open = document.body.classList.contains('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
    });
  }

  // Scroll reveal — scroll-driven check (robust across environments) + safety net
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  function checkReveals() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = reveals.length - 1; i >= 0; i--) {
      var el = reveals[i];
      var top = el.getBoundingClientRect().top;
      if (top < vh * 0.92) {
        el.classList.add('in');
        reveals.splice(i, 1);
      }
    }
  }
  var ticking = false;
  function onScrollReveal() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { checkReveals(); ticking = false; });
  }
  window.addEventListener('scroll', onScrollReveal, { passive: true });
  window.addEventListener('resize', onScrollReveal, { passive: true });
  checkReveals();
  // Safety net: never leave content hidden
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < (window.innerHeight || 800) * 0.95) el.classList.add('in');
    });
  }, 400);
})();
