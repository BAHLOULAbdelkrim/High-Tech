// Language handling script
(function(){
  const supported = ['fr','en','ar'];
  function detectFromNavigator(){
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en';
    // map Arabic and French
    const tag = nav.toLowerCase();
    if(tag.startsWith('ar')) return 'ar';
    if(tag.startsWith('fr')) return 'fr';
    return 'en';
  }

  function currentLangFromPath(){
    const m = location.pathname.split('/').filter(Boolean);
    if(m.length>0 && supported.includes(m[0])) return m[0];
    return null;
  }

  function setDocumentDir(lang){
    if(lang === 'ar') document.documentElement.setAttribute('dir','rtl');
    else document.documentElement.setAttribute('dir','ltr');
  }

  function ensureLangPath(){
    const cur = currentLangFromPath();
    if(cur) {
      setCurrentUI(cur);
      setDocumentDir(cur);
      return;
    }
    // no lang in URL -> use navigator
    const prefer = detectFromNavigator();
    // redirect to /<lang>/
    const newPath = '/' + prefer + '/';
    // preserve query/hash
    const q = location.search + location.hash;
    location.replace(newPath + q);
  }

  function setCurrentUI(lang){
    const btn = document.getElementById('lang-button');
    const curEl = document.getElementById('lang-current');
    const list = document.getElementById('lang-list');
    if(!btn || !curEl || !list) return;
    curEl.textContent = lang.toUpperCase();
    // hide others in list by showing only those not current as options
    Array.from(list.children).forEach(li=>{
      if(li.dataset.lang === lang) li.style.display='none';
      else li.style.display='';
    });
    // set aria
    btn.setAttribute('aria-expanded','false');
    list.setAttribute('aria-hidden','true');
  }

  document.addEventListener('DOMContentLoaded', function(){
    // initial redirect if needed
    ensureLangPath();

    const btn = document.getElementById('lang-button');
    const list = document.getElementById('lang-list');
    if(btn && list){
      btn.addEventListener('click', function(e){
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if(!expanded) list.classList.add('open'), list.setAttribute('aria-hidden','false');
        else list.classList.remove('open'), list.setAttribute('aria-hidden','true');
      });

      // click outside to close
      document.addEventListener('click', function(ev){
        if(!btn.contains(ev.target) && !list.contains(ev.target)){
          list.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
          list.setAttribute('aria-hidden','true');
        }
      });

      // selection
      Array.from(list.children).forEach(li=>{
        li.addEventListener('click', function(){
          const targetLang = li.dataset.lang;
          // replace first path segment or go to root + lang
          const pathParts = location.pathname.split('/').filter(Boolean);
          // Build new path starting with language
          let newPath = '/' + targetLang + '/';
          // If we are on a page under a language, and there are other segments, try to preserve the rest of the path after the lang
          if(pathParts.length > 1 && supported.includes(pathParts[0])){
            const rest = pathParts.slice(1).join('/');
            newPath = '/' + targetLang + '/' + rest + (location.pathname.endsWith('/') ? '/' : '');
          }
          location.href = newPath + location.search + location.hash;
        });
      });
    }
  });
})();
