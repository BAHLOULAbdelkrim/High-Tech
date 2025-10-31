// ===== Menu mobile =====
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
let isOpen = false;

// Ouvrir menu mobile
function openMenu() {
  if (!mobileNav) return;
  mobileNav.classList.add('open');
  document.body.classList.add('menu-open'); // bloque scroll arrière-plan
  toggle.classList.add('open');
  isOpen = true;
}

// Fermer menu mobile
function closeMenu() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.classList.remove('open');
  isOpen = false;
}

// Toggle burger
if (toggle) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!isOpen) {
      openMenu(); // ouvre le menu et ajoute la classe 'open' au burger
    } else {
      closeMenu(); // ferme le menu et retire la classe 'open'
    }
  });
}

// Fermer si clic en dehors
document.addEventListener('click', (e) => {
  if (isOpen && mobileNav && !mobileNav.contains(e.target) && !toggle.contains(e.target)) {
    closeMenu();
  }
});

// Fermer si écran élargi
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

// ===== Menu langue mobile =====
const langToggleMobile = document.getElementById('lang-toggle-mobile');
const currentLangMobile = document.getElementById('current-lang-mobile');

if (langToggleMobile) {
  const langMenu = document.createElement('ul');
  langMenu.className = 'absolute right-0 mt-2 bg-white border rounded shadow w-40';
  langMenu.style.display = 'none';
  langMenu.innerHTML = `
    <li class="px-4 py-2 hover:bg-emerald-100 cursor-pointer" data-lang="fr">FR - Français</li>
    <li class="px-4 py-2 hover:bg-emerald-100 cursor-pointer" data-lang="en">EN - English</li>
    <li class="px-4 py-2 hover:bg-emerald-100 cursor-pointer" data-lang="ar">AR - العربية</li>
  `;
  langToggleMobile.parentElement.appendChild(langMenu);

  langToggleMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.style.display = langMenu.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('click', () => {
    langMenu.style.display = 'none';
  });

  langMenu.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      currentLangMobile.textContent = li.dataset.lang.toUpperCase();
      langMenu.style.display = 'none';
    });
  });
}

// ===== Sous-menus =====
function showSubMenu(id, name) {
  const mainContent = document.getElementById("main-content");
  if (!id || !window.subMenus[id] || !mainContent) return;

  const subs = window.subMenus[id];
  let html = `<h2 class="menu-main-title mb-4">${name}</h2>`;
  html += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

  subs.forEach(sub => {
    html += `
      <article class="submenu">
        <h3 class="submenu-title">
          <a href="${sub.url}">${sub.name}</a>
        </h3>
      </article>
    `;
  });
  html += `</div>`;
  mainContent.innerHTML = html;

  // Liens actifs
  const submenuLinks = mainContent.querySelectorAll('.submenu a');
  submenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      submenuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Clic menu mobile
document.querySelectorAll('#mobile-nav .menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const id = item.dataset.id;
    const name = item.textContent;
    closeMenu();
    showSubMenu(id, name);
  });
});

// Clic menu desktop
document.querySelectorAll('#main-nav .menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const id = item.dataset.id;
    const name = item.textContent;
    showSubMenu(id, name);
  });
});
