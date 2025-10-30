// ===== Menu mobile =====
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const bars = toggle ? toggle.querySelectorAll('span') : [];
let isOpen = false;

// 🟢 Ouvrir menu mobile (avec slide depuis la droite)
function openMenu() {
  if (!mobileNav) return;
  // remplacé la transition verticale (-translate-y-full) par une translation horizontale
  mobileNav.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
  mobileNav.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto');

  if (bars.length) {
    bars[0].classList.add('rotate-45', 'translate-y-1.5');
    bars[1].classList.add('opacity-0');
    bars[2].classList.add('-rotate-45', '-translate-y-1.5');
  }

  isOpen = true;
}

// 🟢 Fermer menu mobile (slide vers la droite)
function closeMenu() {
  if (!mobileNav) return;
  mobileNav.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
  mobileNav.classList.remove('translate-x-0', 'opacity-100', 'pointer-events-auto');

  if (bars.length) {
    bars[0].classList.remove('rotate-45', 'translate-y-1.5');
    bars[1].classList.remove('opacity-0');
    bars[2].classList.remove('-rotate-45', '-translate-y-1.5');
  }
  toggle.classList.remove('open'); // ✅ Retire la croix quand on ferme
  isOpen = false;
}

// --- Toggle au clic sur le burger ---
if (toggle) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle.classList.toggle('open'); // ✅ Ajout pour animer la croix
    isOpen ? closeMenu() : openMenu();
  });
}

// --- Fermer au scroll vers le bas ---
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

// 🟢 Fermer automatiquement le menu mobile quand on clique sur un lien
document.querySelectorAll('#mobile-nav .menu-item').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
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

  // Ouvrir / fermer le menu au clic
  langToggleMobile.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.style.display = langMenu.style.display === 'none' ? 'block' : 'none';
  });

  // Fermer en cliquant ailleurs
  document.addEventListener('click', () => {
    langMenu.style.display = 'none';
  });

  // Changer de langue
  langMenu.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      const newLang = li.dataset.lang.toUpperCase();
      currentLangMobile.textContent = newLang;
      langMenu.style.display = 'none';
      // ici tu pourrais aussi rediriger vers la version traduite si besoin
    });
  });
}


// ===== Slider spécifique par menu =====
const slider = document.getElementById('slider');

// Définir l'image correspondante pour chaque menu
const menuImages = {
  smartphones: '/images/smartphones.png',
  tablettes: '/images/tablettes.png',
  ordinateurs: '/images/ordinateurs.png',
  photos-videos: '/images/photosvideos.png',
  wearables: '/images/wearables.png',
  televisions: '/images/televisions.png',
  gaming: '/images/gaming.png',
  domotique: '/images/domotique.png',
  audio: '/images/audio.png',
  objets-connectes: '/images/objetsconnectes.png',
  impression: '/images/impression.png',
  peripheriques: '/images/peripheriques.png',
};

// Fonction pour afficher l'image correspondant au menu
function showSlideByMenu(menuId) {
  if (!slider || !menuImages[menuId]) return;

  // 🛑 Arrêter le slider automatique si il existe
  if (typeof stopSlider === "function") stopSlider();

  // Supprimer toutes les slides existantes
  slider.innerHTML = '';

  // Créer une slide unique pour le menu
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `<img src="${menuImages[menuId]}" alt="${menuId}" class="w-full h-64 object-cover">`;

  slider.appendChild(slide);
}

// Lier chaque menu à son image
document.querySelectorAll('.menu-item').forEach(menu => {
  menu.addEventListener('click', () => {
    const menuId = menu.dataset.id;
    showSlideByMenu(menuId);
  });
});
