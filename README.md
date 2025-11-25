Hugo site 'blabla' with JS-based language selector.

How it works:
- The site is configured with three languages (fr, en, ar). Content files for each language are under content/ with filename suffixes.
- A client-side JS (static/js/lang.js) detects the browser language and redirects users visiting the root to /fr/ or /ar/ or /en/ accordingly.
- The language selector in the header shows the current language and hides it from the dropdown; clicking selects another language and updates the URL to /<lang>/.
- The homepage content remains the same across languages (you can edit the three _index.*.md files to keep them identical).

Deploy to Cloudflare Pages:
- Create a Git repository from this folder and connect it to Cloudflare Pages.
- Build command: `hugo`
- Publish directory: `public`

