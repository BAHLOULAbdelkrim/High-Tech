// Simple slideshow & mobile burger script
document.addEventListener('DOMContentLoaded', function(){
  const slides = document.querySelectorAll('.slideshow .slide');
  let idx = 0;
  const interval = 3000;
  if(slides.length){
    setInterval(()=>{
      slides[idx].classList.remove('visible');
      idx = (idx+1)%slides.length;
      slides[idx].classList.add('visible');
    }, interval);
  }

  // mobile menu
  const burger = document.querySelector('.mobile-burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = mobileMenu && mobileMenu.querySelector('.close-mobile');
  if(burger && mobileMenu){
    burger.addEventListener('click', ()=> { mobileMenu.style.display='block'; mobileMenu.setAttribute('aria-hidden','false'); });
    closeBtn && closeBtn.addEventListener('click', ()=> { mobileMenu.style.display='none'; mobileMenu.setAttribute('aria-hidden','true'); });
  }
});
