// ===== Menu mobile =====
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const bars = toggle ? toggle.querySelectorAll('span') : [];
let isOpen = false;

// Ouvrir menu mobile
function openMenu() {
  if (!mobileNav) return;
  mobileNav.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-0');
  mobileNav.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

  if (bars.length) {
    bars[0].classList.add('rotate-45', 'translate-y-1.5');
    bars[1].classList.add('opacity-0');
    bars[2].classList.add('-rotate-45', '-translate-y-1.5');
  }

  isOpen = true;
}

// Fermer menu mobile
function closeMenu() {
  if (!mobileNav) return;
  mobileNav.classList.add('opacity-0', 'pointer-events-none', '-translate-y-0');
  mobileNav.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');

  if (bars.length) {
    bars[0].classList.remove('rotate-45', 'translate-y-1.5');
    bars[1].classList.remove('opacity-0');
    bars[2].classList.remove('-rotate-45', '-translate-y-1.5');
  }

  isOpen = false;
}

// Toggle menu mobile au clic sur le burger
if (toggle) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });
}

// Fermer menu mobile au scroll vers le bas
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (isOpen && currentScroll > lastScroll) closeMenu();
  lastScroll = currentScroll;
});

// Fermer menu mobile si clic en dehors
document.addEventListener('click', (e) => {
  if (isOpen && mobileNav && !mobileNav.contains(e.target) && !toggle.contains(e.target)) {
    closeMenu();
  }
});

// Fermer menu mobile si resize > md (768px)
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && isOpen) closeMenu();
});


// ===== Sidebar filtre marques =====
// Si tes pages ont une .brand-filter avec des checkbox
document.querySelectorAll('.brand-filter input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const brand = checkbox.dataset.brand;
    const checked = checkbox.checked;
    const products = document.querySelectorAll('.product-item');

    products.forEach(p => {
      if (p.dataset.brand === brand) {
        p.style.display = checked ? 'block' : 'none';
      }
    });
  });
});
