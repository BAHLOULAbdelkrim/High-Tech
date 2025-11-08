// Mobile menu toggle
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const closeBtn = document.getElementById('mobile-nav-close');

function openMenu() {
  mobileNav.classList.add('open');
  document.body.classList.add('menu-open');
  toggle.classList.add('open');
}

function closeMenu() {
  mobileNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.classList.remove('open');
}

if (toggle) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNav.classList.contains('open') ? closeMenu() : openMenu();
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

// Clic en dehors ferme le menu
document.addEventListener('click', (e) => {
  if (mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !toggle.contains(e.target)) {
    closeMenu();
  }
});

// Fermer si écran élargi
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && mobileNav.classList.contains('open')) closeMenu();
});
