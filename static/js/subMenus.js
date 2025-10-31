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

  "photos-videos": [
    { name: "Reflex", url: "/photos-videos/reflex/" },
    { name: "Mirror-less", url: "/photos-videos/mirror-less/" },
    { name: "Action-Cam", url: "/photos-videos/action-cam/" },
    { name: "Objectifs", url: "/photos-videos/objectifs/" },
    { name: "Surveillance", url: "/photos-videos/surveillance/" },
    { name: "Web-Cam", url: "/photos-videos/web-cam/" }
  ],

  wearables: [
    { name: "Smart-watches", url: "/wearables/smart-watches/" },
    { name: "Bracelets fitness", url: "/wearables/bracelets-fitness/" },
    { name: "Montres connectés", url: "/wearables/montres-connectees/" },
    { name: "Lunettes Connectées", url: "/wearables/lunettes-connectees/" },
    { name: "Lunettes RV", url: "/wearables/lunettes-rv/" }
  ],

  televisions: [
    { name: "Smart TV", url: "/televisions/smart-tv/" },
    { name: "OLED", url: "/televisions/oled/" },
    { name: "QLED", url: "/televisions/qled/" },
    { name: "Projecteurs", url: "/televisions/projecteurs/" }
  ],

  gaming: [
    { name: "Consoles", url: "/gaming/consoles/" },
    { name: "Accessoires", url: "/gaming/accessoires/" },
    { name: "Jeux Vidéo", url: "/gaming/jeux-video/" }
  ],

  domotique: [
    { name: "Assistants vocaux", url: "/domotique/assistants-vocaux/" },
    { name: "Lampes", url: "/domotique/lampes/" },
    { name: "Thermostats", url: "/domotique/thermostats/" },
    { name: "Battement cardiaque", url: "/domotique/battement-cardiaque/" },
    { name: "Température humaine", url: "/domotique/temperature-humaine/" },
    { name: "Hypertension", url: "/domotique/hypertension/" },
    { name: "Glycémie", url: "/domotique/glycemie/" }
  ],

  audio: [
    { name: "Ecouteurs filaires", url: "/audio/ecouteurs-filaires/" },
    { name: "Ecouteur sans fil", url: "/audio/ecouteur-sans-fil/" },
    { name: "True wireless", url: "/audio/true-wireless/" },
    { name: "Haut-parleurs", url: "/audio/haut-parleurs/" },
    { name: "Microphones", url: "/audio/microphones/" },
    { name: "Amplis", url: "/audio/amplis/" }
  ],

  "objets-connectes": [
    { name: "Drones", url: "/objets-connectes/drones/" },
    { name: "Caméras sportives", url: "/objets-connectes/cameras-sportives/" },
    { name: "Gadgets", url: "/objets-connectes/gadgets/" }
  ],

  impression: [
    { name: "Imprimantes", url: "/impression/imprimantes/" },
    { name: "Imprimantes 3D", url: "/impression/imprimantes-3d/" },
    { name: "Photocopieuses", url: "/impression/photocopieuses/" },
    { name: "Scanners", url: "/impression/scanners/" },
    { name: "Consommables", url: "/impression/consommables/" }
  ],

  peripheriques: [
    { name: "Écrans", url: "/peripheriques/ecrans/" },
    { name: "Souris", url: "/peripheriques/souris/" },
    { name: "Claviers", url: "/peripheriques/claviers/" },
    { name: "Disques externes", url: "/peripheriques/disques-externes/" },
    { name: "Clés USB", url: "/peripheriques/cles-usb/" },
    { name: "Cartes mémoire", url: "/peripheriques/cartes-memoire/" },
    { name: "Chargeurs", url: "/peripheriques/chargeurs/" },
    { name: "Batteries externes", url: "/peripheriques/batteries-externes/" },
    { name: "Hubs USB", url: "/peripheriques/hubs-usb/" },
    { name: "Protections smartphones", url: "/peripheriques/protections-smartphones/" },
    { name: "Protections tablettes", url: "/peripheriques/protections-tablettes/" }
  ]
};

// --- Gestion du clic pour remplacer #main-content ---
document.addEventListener("DOMContentLoaded", function() {
  const mainContent = document.getElementById("main-content");
  const menuItems = document.querySelectorAll(".menu-item, .sidebar-link"); // liens du haut et de gauche

  menuItems.forEach(item => {
item.addEventListener("click", function(e) {
  e.preventDefault();
  const id = item.getAttribute("data-id");
  if (!id || !window.subMenus[id]) return;

  // 1️⃣ Afficher l'image du menu
  const imgSrc = `/images/${id}.png`;
  const slider = document.getElementById('slider');
  slider.innerHTML = `<div class="slide"><img src="${imgSrc}" alt="${id}" class="w-full h-64 object-cover"></div>`;
  // optionnel : stopSlider();

  // 2️⃣ Afficher les sous-menus sous l'image
  const mainContent = document.getElementById("main-content");
  const subs = window.subMenus[id];
  let html = `<h2 class="menu-main-title mb-4">${item.textContent}</h2>`;
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

  // 3️⃣ Assurer que mainContent est visible
  mainContent.style.display = 'block';
});


// Gestion du clic sur les sous-menus pour inversion couleurs
const submenuLinks = document.querySelectorAll('.submenu a');

submenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Retirer la classe active de tous les liens
    submenuLinks.forEach(l => l.classList.remove('active'));
    // Ajouter active au lien cliqué
    link.classList.add('active');
  });
});

console.log("Clique sur :", id);

      if (!id || !window.subMenus[id]) return;

      const subs = window.subMenus[id];
      let html = `<h2 class="menu-main-title mb-4">${item.textContent}</h2>`;
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
    });
  });
});