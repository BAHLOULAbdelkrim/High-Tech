document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('#menu-toggle') || document.querySelector('.mobile-burger');
  const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('mobile-nav');
  const closeBtn = mobileMenu ? mobileMenu.querySelector('.close-mobile') : null;

  if (!burger || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add('open');
    burger.classList.add('open');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  burger.addEventListener('click', e => {
    e.stopPropagation();
    if (mobileMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', e => {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Ferme au clic hors du menu
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Ferme au resize si on dépasse le breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileMenu.classList.contains('open')) closeMenu();
  });
});


// ===== Slideshow automatique =====
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('#slideshow .slide');
  if (!slides.length) return; // sécurité

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('visible');
    current = (current + 1) % slides.length;
    slides[current].classList.add('visible');
  }, 5000); // 5 secondes par image
});
