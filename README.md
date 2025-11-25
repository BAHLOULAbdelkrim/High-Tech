Hugo project **blabla**

How it works:
- URLs use language subpaths: `/en/`, `/fr/`, `/ar/`.
- A small JavaScript (`/js/lang.js`) auto-redirects users visiting the root `/` (or any path missing a language prefix)
  to the appropriate language based on the browser's language: Arabic -> `/ar/`, French -> `/fr/`, otherwise `/en/`.
- The language selector (top-right) shows the current language and hides the other languages; click to expand the others.
- Changing language updates the URL to the same path but with the new language prefix and updates the page `lang` and `dir` attributes.
- Content is identical across languages (same homepage content duplicated under each language folder).

Build:
1. Install Hugo (extended recommended).
2. From this project's root: `hugo` to build `public/`.
3. Deploy the generated `public/` to Cloudflare Pages (no Cloudflare Workers needed).

Files included: config, simple layouts, CSS, JS, and sample content for EN/FR/AR.

Download the zip to your machine and extract to use with Hugo.