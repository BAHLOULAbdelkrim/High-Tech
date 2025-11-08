// ===== Mobile menu toggle (remplacer l'ancien bloc) =====
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('#menu-toggle') || document.querySelector('.mobile-burger');
  const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('mobileMenuClose') || document.querySelector('.close-mobile');

  if (!burger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open'); // block background scroll
    // animate burger if you use class 'open' on burger
    burger.classList.add('open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    burger.classList.remove('open');
  }

  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (mobileMenu.classList.contains('open')) closeMenu(); else openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeMenu();
    });
  }

  // close when clicking outside the menu content: if menu is open and click target is the overlay
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) { closeMenu(); }
  });

  // close on resize when desktop breakpoint crossed
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900 && mobileMenu.classList.contains('open')) closeMenu();
  });
});
