// Simple slideshow & mobile burger script
document.addEventListener('DOMContentLoaded', function() {

  /* =========================
     Slideshow
     ========================= */
  const slides = document.querySelectorAll('.slideshow .slide');
  let idx = 0;
  const interval = 3000;
  if(slides.length){
    setInterval(() => {
      slides[idx].classList.remove('visible');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('visible');
    }, interval);
  }

  /* =========================
     Mobile menu
     ========================= */
  const burger = document.querySelector('.mobile-burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = mobileMenu && mobileMenu.querySelector('.close-mobile');

  if(burger && mobileMenu){
    // Ouvrir le menu mobile
    burger.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      mobileMenu.setAttribute('aria-hidden', 'false');
    });

    // Fermer le menu mobile
    closeBtn && closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });

    // Optionnel : fermer le menu si on clique en dehors du contenu
    mobileMenu.addEventListener('click', (e) => {
      if(e.target === mobileMenu){
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

});
