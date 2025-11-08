document.addEventListener('DOMContentLoaded', function(){
  // mobile menu
  const burger = document.querySelector('.mobile-burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = mobileMenu && mobileMenu.querySelector('.close-mobile');

  if(burger && mobileMenu){
    burger.addEventListener('click', () => {
      mobileMenu.style.display = 'block';
      mobileMenu.setAttribute('aria-hidden','false');
    });
    closeBtn && closeBtn.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      mobileMenu.setAttribute('aria-hidden','true');
    });
  }
});
