// ===== Gestion clic menus principaux =====

// On suppose que tes menus ont un data-id correspondant à l'identifiant du menu
const menuItems = document.querySelectorAll('.menu-item'); // <li class="menu-item" data-id="menu1">

// Fonction pour afficher l'image du menu actif dans le cover
window.showSlideByMenuId = function(id, src) {
  const coverContainer = document.getElementById('cover-container');
  if (!coverContainer) return;
  coverContainer.innerHTML = `<img src="${src}" alt="${id}" class="w-full h-64 object-cover">`;
};

// Fonction pour réinitialiser le slider (page d'accueil)
window.resetSlider = function() {
  const coverContainer = document.getElementById('cover-container');
  if (!coverContainer) return;
  
  coverContainer.innerHTML = document.getElementById('slider-template') 
    ? document.getElementById('slider-template').innerHTML 
    : '';
  
  // Relancer le slider JS si nécessaire
  if (window.startSlider) window.startSlider();
};

// Clic sur un menu principal
menuItems.forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    const id = item.dataset.id;
    if (!id || !window.subMenus || !window.subMenus[id]) return;

    // 1️⃣ Image du menu
    window.showSlideByMenuId(id, `/images/${id}.png`);

    // 2️⃣ Sous-menus
    const subs = window.subMenus[id];
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    let html = `<h2 class="menu-main-title mb-4">${item.textContent}</h2>`;
    html += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;
    subs.forEach(sub => {
      html += `
      <article class="submenu">
        <h3 class="submenu-title">
          <a href="${sub.url}">${sub.name}</a>
        </h3>
      </article>`;
    });
    html += `</div>`;
    mainContent.innerHTML = html;
  });
});

// Clic sur le logo / nom du site pour revenir à la page d'accueil
const logoLinks = document.querySelectorAll('a[href="/"], a[href="#home"]');
logoLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerHTML = `
        <h2 class="text-xl font-bold mb-4">Derniers articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Articles à générer dynamiquement si besoin -->
        </div>
      `;
    }
    window.resetSlider(); // revient au slider
  });
});
