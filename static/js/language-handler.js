class LanguageHandler {
    constructor() {
        this.currentLang = this.getCurrentLang();
        this.init();
    }

    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('ar')) return 'ar';
        if (browserLang.startsWith('fr')) return 'fr';
        return 'en';
    }

    getCurrentLang() {
        const path = window.location.pathname;
        const langMatch = path.match(/^\/(fr|en|ar)(\/|$)/);
        return langMatch ? langMatch[1] : this.getBrowserLanguage();
    }

    redirectToLanguage() {
        const currentPath = window.location.pathname;
        const shouldRedirect = !currentPath.match(/^\/(fr|en|ar)(\/|$)/);
        
        if (shouldRedirect) {
            const newUrl = `/${this.currentLang}${currentPath === '/' ? '' : currentPath}`;
            window.location.href = newUrl;
        }
    }

    initLanguageSelector() {
        const currentBtn = document.getElementById('languageCurrent');
        const dropdown = document.getElementById('languageDropdown');
        const options = document.querySelectorAll('.language-option');

        currentBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = e.target.getAttribute('data-lang');
                this.changeLanguage(newLang);
            });
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
    }

    changeLanguage(newLang) {
        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(/^\/(fr|en|ar)/, `/${newLang}`);
        window.location.href = newPath;
    }

    init() {
        this.redirectToLanguage();
        document.addEventListener('DOMContentLoaded', () => {
            this.initLanguageSelector();
        });
    }
}

new LanguageHandler();
