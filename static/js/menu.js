// ===== Menu mobile =====
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
let isOpen = false;

function openMenu() {
  if (!mobileNav) return;
  mobileNav.classList.add('open');
  document.body.classList.add('menu-open');
  toggle.classList.add('open');
  isOpen = true;
}

function closeMenu() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.classList.remove('open');
  isOpen = false;
}

if (toggle) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });
}

document.addEventListener('click', (e) => {
  if (isOpen && mobileNav && !mobileNav.contains(e.target) && !toggle.contains(e.target)) {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && isOpen) closeMenu();
});

const mobileClose = document.getElementById('mobile-nav-close');
if (mobileClose) {
  mobileClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
}
