// --- Définition des sous-menus ---
window.subMenus = {
  smartphones: [
    { name: "Android", url: "/smartphones/android/" },
    { name: "iPhone", url: "/smartphones/iphone/" },
    { name: "Pliables", url: "/smartphones/pliables/" }
  ],
  tablettes: [
    { name: "Android", url: "/tablettes/android/" },
    { name: "iPad", url: "/tablettes/ipad/" },
    { name: "Windows", url: "/tablettes/windows/" }
  ],
  ordinateurs: [
    { name: "PC Portables", url: "/ordinateurs/pc-portables/" },
    { name: "PC de bureau", url: "/ordinateurs/pc-de-bureau/" },
    { name: "Mini PC", url: "/ordinateurs/mini-pc/" },
    { name: "Ultrabooks", url: "/ordinateurs/ultrabooks/" },
    { name: "Gaming", url: "/ordinateurs/gaming/" }
  ],
  // ... tous les autres sous-menus ...
};

// --- Gestion du clic menu principal ---
document.addEventListener("DOMContentLoaded", function() {
  const mainContent = document.getElementById("main-content");
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach(item => {
    item.addEventListener("click", function(e) {
      const id = item.getAttribute("data-id");
      if (!id || !window.subMenus[id] || !mainContent) return;

      e.preventDefault(); // Bloque seulement menu principal
      const subs = window.subMenus[id];

      let html = `<h2 class="menu-main-title mb-4">${item.textContent}</h2>`;
      html += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`;

      subs.forEach(sub => {
        html += `
          <article class="submenu">
            <h3 class="submenu-title">
              <a href="${sub.url}">${sub.name}</a> <!-- navigation normale -->
            </h3>
          </article>
        `;
      });

      html += `</div>`;
      mainContent.innerHTML = html;
    });
  });
});
