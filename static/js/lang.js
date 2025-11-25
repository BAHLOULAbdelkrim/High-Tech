// lang.js - handles auto-redirect based on navigator language and provides language-selector behavior.
//
// Behavior:
// - If path doesn't start with /en/ /fr/ /ar/, redirect to detected language prefix: ar -> /ar/, fr -> /fr/, else -> /en/.
// - Language selector shows current language and hides other languages; clicking toggles the dropdown.
// - Selecting a language replaces the first path segment with the chosen language and navigates there.
// - For Arabic, sets document.documentElement.dir="rtl".

(function(){
  const supported = ['en','fr','ar'];
  const langNames = { en: 'English', fr: 'Français', ar: 'العربية' };

  function detectPreferred() {
    const nl = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage || 'en';
    const code = nl.slice(0,2).toLowerCase();
    if (code === 'ar') return 'ar';
    if (code === 'fr') return 'fr';
    return 'en';
  }

  function pathnameLang(pathname) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return null;
    const first = parts[0].toLowerCase();
    return supported.includes(first) ? first : null;
  }

  // Redirect if no language in URL
  const currentPath = window.location.pathname;
  const currentLangInPath = pathnameLang(currentPath);
  if (!currentLangInPath) {
    const preferred = detectPreferred();
    // preserve path and hash/query if any, but prefix with lang
    const suffix = currentPath === '/' ? '/' : currentPath.replace(/^\//,'/');
    const newPath = '/' + preferred + (suffix === '/' ? '/' : suffix);
    window.location.replace(newPath);
    return;
  }

  // If we are here, page path already contains a language prefix.
  const pageLang = currentLangInPath;
  // set html lang and dir
  document.documentElement.lang = pageLang === 'ar' ? 'ar' : (pageLang === 'fr' ? 'fr' : 'en');
  document.documentElement.dir = pageLang === 'ar' ? 'rtl' : 'ltr';

  // Language selector UI
  document.addEventListener('DOMContentLoaded', function(){
    const btn = document.getElementById('lang-button');
    const list = document.getElementById('lang-list');
    const currentSpan = document.getElementById('lang-current');

    if (!btn || !list || !currentSpan) return;

    // Populate list items
    list.innerHTML = '';
    supported.forEach(l => {
      const li = document.createElement('li');
      li.setAttribute('data-lang', l);
      li.textContent = langNames[l];
      if (l === pageLang) {
        // current language shown on button, hide from list
        li.setAttribute('aria-hidden','true');
      } else {
        li.setAttribute('aria-hidden','false');
      }
      list.appendChild(li);
    });

    // Show current on button
    currentSpan.textContent = langNames[pageLang];

    // Toggle dropdown
    btn.addEventListener('click', function(e){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        list.hidden = true;
      } else {
        list.hidden = false;
      }
    });

    // Click outside closes
    document.addEventListener('click', function(e){
      if (!btn.contains(e.target) && !list.contains(e.target)) {
        list.hidden = true;
        btn.setAttribute('aria-expanded','false');
      }
    });

    // Language switcher logic
    list.addEventListener('click', function(e){
      const li = e.target.closest('li');
      if (!li) return;
      const targetLang = li.getAttribute('data-lang');
      if (!targetLang || targetLang === pageLang) return;

      // Build new path: replace first segment with targetLang
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length === 0) {
        // go to /targetLang/
        window.location.href = '/' + targetLang + '/';
        return;
      }
      parts[0] = targetLang;
      const newPath = '/' + parts.join('/') + (window.location.pathname.endsWith('/') ? '/' : '');
      window.location.href = newPath;
    });
  });
})();