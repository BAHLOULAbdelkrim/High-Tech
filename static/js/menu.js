// ===== Menu mobile =====
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const bars = toggle ? toggle.querySelectorAll('span') : [];
let isOpen = false;

// Conteneur pour sous-menus mobile
let mobileSubmenuContainer = document.getElementById('mobile-submenu-container');
if (!mobileSubmenuContainer) {
  mobileSubmenuContainer = document.createElement('div');
  mobileSubmenuContainer.id = 'mobile-submenu-container';
  mobileNav.parentNode.insertBefore(mobileSubmenuContainer, mobileNav.nextSibling);
}

// ouvrir menu mobile
function openMenu() {
  if (!mobileNav) return;
  mobileNav.classList.add('open');
  if (bars.length) {
    bars[0].classList.add('rotate-45', 'translate-y-1.5');
    bars[1].classList.add('opacity-0');
    bars[2].classList.add('-rotate-45', '-translate-y-1.5');
  }
  isOpen = true;
}

// fermer menu mobile
function closeMenu() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  setTimeout(() => { mobileNav.style.pointerEvents = 'none'; }, 500);
  if (bars.length) {
    bars[0].classList.remove('rotate-45', 'translate-y-1.5');
    bars[1].classList.remove('opacity-0');
    bars[2].classList.remove('-rotate-45', '-translate-y-1.5');
  }
  toggle.classList.remove('open');
  isOpen = false;

  // Masquer le conteneur des sous-menus
  if (mobileSubmenuContainer) mobileSubmenuContainer.innerHTML = '';
}

// --- Toggle au clic sur le burger ---
if (toggle) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.classList.toggle('open');
    isOpen ? closeMenu() : openMenu();
  });
}

// --- Fermer au scroll ---
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (isOpen && currentScroll > lastScroll) closeMenu();
  lastScroll = currentScroll;
});

// --- Fermer si clic en dehors ---
document.addEventListener('click', (e) => {
  if (isOpen && mobileNav && !mobileNav.contains(e.target) && !toggle.contains(e.target)) {
    closeMenu();
  }
});

// --- Fermer si écran élargi ---
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && isOpen) closeMenu();
});

// ===== Sidebar filtre marques =====
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

// ===== Menu langue (mobile) =====
const langToggleMobile = document.getElementById('lang-toggle-mobile');
const currentLangMobile = document.getElementById('current-lang-mobile');

if (langToggleMobile) {
  const langMenu = document.createElement('ul');
  langMenu.className = 'absolute right-0 mt-2 bg-white border rounded shadow w-40';
  langMenu.innerHTML = `
    <li class="px-4 py-2 hover:bg-emerald-100 cursor-pointer" data-lang="fr">FR - Français</li>
    <li class="px-4 py-2 hover:bg-emerald-100 cursor-pointer" data-lang="en">EN - English</li>
    <li class="px-4 py-2 hover:bg-emerald-100 cursor-pointer" data-lang="ar">AR - العربية</li>
  `;
  langMenu.style.display = 'none';
  langToggleMobile.parentElement.appendChild(langMenu);

  langToggleMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.style.display = langMenu.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', () => { langMenu.style.display = 'none'; });

  langMenu.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      const newLang = li.dataset.lang.toUpperCase();
      currentLangMobile.textContent = newLang;
      langMenu.style.display = 'none';
    });
  });
}

// --- Gestion des sous-menus mobile ---
const mobileMenuLinks = document.querySelectorAll('#mobile-nav .menu-item');

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const menuId = link.dataset.id;
    if (!mobileSubmenuContainer) return;

    // 1️⃣ Masquer tous les sous-menus existants
    mobileSubmenuContainer.innerHTML = '';

    // 2️⃣ Afficher le sous-menu correspondant
    const submenu = document.querySelector(`#submenu-${menuId}`);
    if (submenu) {
      const clone = submenu.cloneNode(true);
      clone.style.display = 'block';
      mobileSubmenuContainer.appendChild(clone);
    }

    // 3️⃣ Fermer le menu principal
    closeMenu();
    toggle.classList.remove('open');
  });
});
