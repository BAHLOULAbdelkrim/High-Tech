// Menu mobile et mega-menu
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const bars = toggle.querySelectorAll('span');
let isOpen = false;

function openMenu() {
  mobileNav.classList.remove('opacity-0','pointer-events-none','-translate-y-0');
  mobileNav.classList.add('opacity-100','pointer-events-auto','translate-y-0');

  // burger → croix
  bars[0].classList.add('rotate-45','translate-y-1.5');
  bars[1].classList.add('opacity-0');
  bars[2].classList.add('-rotate-45','-translate-y-1.5');

  isOpen = true;
}

function closeMenu() {
  mobileNav.classList.add('opacity-0','pointer-events-none','-translate-y-0');
  mobileNav.classList.remove('opacity-100','pointer-events-auto','translate-y-0');

  bars[0].classList.remove('rotate-45','translate-y-1.5');
  bars[1].classList.remove('opacity-0');
  bars[2].classList.remove('-rotate-45','-translate-y-1.5');

  isOpen = false;
}

toggle.addEventListener('click',(e)=>{
  e.stopPropagation();
  isOpen ? closeMenu() : openMenu();
});

// fermer menu si scroll
let lastScroll = 0;
window.addEventListener('scroll',()=>{
  const currentScroll = window.pageYOffset;
  if(isOpen && currentScroll > lastScroll) closeMenu(); 
  lastScroll = currentScroll;
});

// fermer si click en dehors
document.addEventListener('click', (e)=>{
  if(isOpen && !mobileNav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
});

// fermer sur resize > md
window.addEventListener('resize',()=>{
  if(window.innerWidth >= 768 && isOpen) closeMenu();
});

// --- Mega-menu hover automatique ---
document.querySelectorAll('nav#main-nav li.group').forEach(menuItem => {
  menuItem.addEventListener('mouseenter', () => {
    const mega = menuItem.querySelector('div');
    if(mega) mega.classList.remove('hidden');
  });
  menuItem.addEventListener('mouseleave', () => {
    const mega = menuItem.querySelector('div');
    if(mega) mega.classList.add('hidden');
  });
});

// --- Sidebar filtre marques (exemple) ---
document.querySelectorAll('.brand-filter input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const brand = checkbox.dataset.brand;
    const checked = checkbox.checked;
    const products = document.querySelectorAll('.product-item');
    products.forEach(p => {
      if(p.dataset.brand === brand) {
        p.style.display = checked ? 'block' : 'none';
      }
    });
  });
});
