
document.addEventListener('DOMContentLoaded', function(){
  const slides = ['images/slide1.jpg','images/slide2.jpg','images/slide3.jpg','images/slide4.jpg'];
  let slideIndex = 0;
  const cover = document.getElementById('cover-img');
  const defaultSlides = slides.slice();
  let sliderInterval = setInterval(nextSlide, 3000);
  function nextSlide(){
    if(window.currentMenu) return; // if in a menu showing single image, stop cycling
    slideIndex = (slideIndex+1)%slides.length;
    cover.src = '/' + slides[slideIndex];
  }
  // initial
  if(cover) cover.src='/' + slides[0];
  // Menu interaction
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(mi=>{
    mi.addEventListener('click', ()=>{
      const img = mi.dataset.img;
      const menu = mi.dataset.menu;
      window.currentMenu = menu;
      // show the menu image
      cover.src = '/images/' + img;
      // show submenu list
      const subs = JSON.parse(mi.dataset.subs || '[]');
      const subsEl = document.getElementById('submenus');
      subsEl.innerHTML='';
      subs.forEach(s=>{
        const b = document.createElement('div');
        b.className='side-item';
        b.textContent = s;
        b.addEventListener('click', ()=>{ location.href = '/' + menu.toLowerCase().replace(/ /g,'-') + '/' + menu.toLowerCase().replace(/ /g,'-') + '-'+s.toLowerCase().replace(/ /g,'-') + '/'; });
        subsEl.appendChild(b);
      });
      // stop slider
      clearInterval(sliderInterval);
    });
  });
  // clicking home (brand) returns to default slider
  const brand = document.getElementById('brand-home');
  if(brand){
    brand.addEventListener('click', ()=>{
      window.currentMenu = null;
      slideIndex = 0;
      cover.src='/' + defaultSlides[0];
      sliderInterval = setInterval(nextSlide, 3000);
      document.getElementById('submenus').innerHTML='';
    });
  }
  // search icon hover effect
  const searchIcon = document.getElementById('search-icon');
  if(searchIcon){
    searchIcon.addEventListener('mouseover', ()=>{ searchIcon.style.opacity=1; searchIcon.style.transform='scale(1.05)'; });
    searchIcon.addEventListener('mouseout', ()=>{ searchIcon.style.opacity=0.8; searchIcon.style.transform='scale(1)'; });
  }
  // burger menu toggle
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  burger && burger.addEventListener('click', ()=>{
    if(mobileMenu.style.display==='block'){ mobileMenu.style.display='none'; burger.textContent='☰'; }
    else { mobileMenu.style.display='block'; burger.textContent='✕'; }
  });
  // language switch simple stub
  const langs = document.querySelectorAll('.lang');
  langs.forEach(l=> l.addEventListener('click', ()=>{ alert('Basculer vers '+ l.textContent.trim() + ' (demo)'); }));
});
