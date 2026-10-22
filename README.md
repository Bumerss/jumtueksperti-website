# jumtueksperti.lv

Static website for SIA "Jumtu ekspertīžu birojs" (www.jumtueksperti.lv), in Latvian (`/`) and Russian (`/ru/`).

**Live preview:** https://bumerss.github.io/jumtueksperti-website/

The site is plain pre-built HTML/CSS: no build step and no server code. Upload the whole folder as is.

## Deploy

**Netlify** or **Cloudflare Pages** (both free):

1. Connect this repository (or drag and drop the folder).
2. Build command: none. Publish directory: `/` (repository root).
3. Add the custom domain `www.jumtueksperti.lv`.

`_headers` (security and caching headers) and `_redirects` (non-www → www, 404 pages) are read automatically by both hosts. On Cloudflare Pages, set the non-www → www redirect in the dashboard (Rules → Redirect Rules); see the comment in `_redirects`.

## Before launch

- The contact and consultation forms post to `/api/contact` and `/api/consultation/request`, which do not exist in this static export. Connect them to a form service (e.g. Netlify Forms or Web3Forms) before going live.
- After launch, submit `https://www.jumtueksperti.lv/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Structure

- `index.html`, `*/index.html`: Latvian pages
- `ru/`: Russian pages
- `_astro/`: stylesheet and Open Sans font files
- `assets/`: logos, photos, certificates (personal data redacted), map tiles
- `sitemap.xml`, `robots.txt`, `llms.txt`: search engine and AI crawler files
