// Menu mobile et mega-menu
const toggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const bars = toggle ? toggle.querySelectorAll('span') : [];
let isOpen = false;

function openMenu() {
  if(!mobileNav) return;
  mobileNav.classList.remove('opacity-0','pointer-events-none','-translate-y-0');
  mobileNav.classList.add('opacity-100','pointer-events-auto','translate-y-0');
  if(bars.length){
    bars[0].classList.add('rotate-45','translate-y-1.5');
    bars[1].classList.add('opacity-0');
    bars[2].classList.add('-rotate-45','-translate-y-1.5');
  }
  isOpen = true;
}

function closeMenu() {
  if(!mobileNav) return;
  mobileNav.classList.add('opacity-0','pointer-events-none','-translate-y-0');
  mobileNav.classList.remove('opacity-100','pointer-events-auto','translate-y-0');
  if(bars.length){
    bars[0].classList.remove('rotate-45','translate-y-1.5');
    bars[1].classList.remove('opacity-0');
    bars[2].classList.remove('-rotate-45','-translate-y-1.5');
  }
  isOpen = false;
}

if(toggle){
  toggle.addEventListener('click',(e)=>{
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });
}

// fermer menu si scroll
let lastScroll = 0;
window.addEventListener('scroll',()=>{
  const currentScroll = window.pageYOffset;
  if(isOpen && currentScroll > lastScroll) closeMenu(); 
  lastScroll = currentScroll;
});

// fermer si click en dehors
document.addEventListener('click', (e)=>{
  if(isOpen && mobileNav && !mobileNav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
});

// fermer sur resize > md
window.addEventListener('resize',()=>{
  if(window.innerWidth >= 768 && isOpen) closeMenu();
});

// --- Mega-menu interaction (JS-powered fallback) ---
document.querySelectorAll('nav#main-nav .menu-item').forEach(item => {
  item.addEventListener('mouseenter', (e) => {
    const id = item.getAttribute('data-id');
    if(!id) return;
    // trigger Hugo-rendered mega (we use a shared mega container)
    const mega = document.getElementById('mega-container');
    if(!mega) return;
    // Load data from a global JS object if present (site-specific)
    if(window.menuData && window.menuData[id]){
      const data = window.menuData[id];
      document.getElementById('mega-title').textContent = data.title || '';
      const list = document.getElementById('mega-list');
      list.innerHTML = '';
      (data.subs || []).forEach(sub => {
        const li = document.createElement('li');
        li.className = 'p-1';
        const a = document.createElement('a');
        a.href = sub.url || '#';
        a.textContent = sub.name;
        a.className = 'block font-medium hover:underline';
        a.addEventListener('click', (ev) => {
          ev.preventDefault();
          // show details in left column
          document.getElementById('submenu-details').classList.remove('hidden');
          document.getElementById('submenu-name').textContent = sub.name;
          const childList = document.getElementById('submenu-child-list');
          childList.innerHTML = '';
          const sample = [sub.name + ' - Ex: Derniers tests', sub.name + ' - Ex: Comparatifs', sub.name + ' - Ex: Guides'];
          sample.forEach(s => {
            const li2 = document.createElement('li');
            li2.textContent = s;
            childList.appendChild(li2);
          });
        });
        li.appendChild(a);
        list.appendChild(li);
      });
      mega.classList.remove('hidden');
    }
  });
});

document.querySelectorAll('nav#main-nav li.group').forEach(menuItem => {
  menuItem.addEventListener('mouseleave', () => {
    const mega = document.getElementById('mega-container');
    if(mega) mega.classList.add('hidden');
  });
});

// --- Sidebar filtre marques (exemple) ---
// This assumes your category pages include a .brand-filter container with checkboxes
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
