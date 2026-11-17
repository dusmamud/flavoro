# Flavoro Restaurant

Restaurant website for **Flavoro Restaurant** — home, menu, gallery, reservations, blog, contact, cart — built from a reference design, on the locked SvelteKit stack.

Live: **https://flavoro.pages.dev**

## Stack

- Svelte 5.57.3 + SvelteKit 3.2.0 + Vite 8.3.8 + TypeScript (strict)
- Tailwind CSS 4.3.5 + `@sveltejs/adapter-static` 4.0.1 (prerendered static site)
- Icons: `@lucide/svelte` 1.74.0
- Fonts: `@fontsource` Playfair Display / Great Vibes / Poppins (self-hosted)

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run check   # svelte-check, must be 0 errors
npm run build   # writes the static site to build/
npm run preview # preview the production build (binds ::1 by default; use --host 127.0.0.1)
```

## Pages

Home (reference replica), About, Menu (12 dishes, filters + search), Gallery (lightbox), Reservations (client-side form, `FLV-*` confirmation), Blog (4 posts), Contact, Cart (drawer + page, localStorage), Search, Privacy, Terms, 404 — plus `sitemap.xml` and `robots.txt`.

The hero and footer use a single composite photograph each as a responsive `background-image: cover` — no separate `<img>` boxes.

## Backend

Frontend only for now. Cart, reservations and contact are client-side demos until the Go REST API lands — the seam is `src/lib/api.ts` (`PUBLIC_API_BASE_URL`, empty = mock/static data).

## Deploy

Cloudflare Pages project **`flavoro`** (https://flavoro.pages.dev), via `.github/workflows/deploy-cloudflare-pages.yml` on every push to `main` (Node 22, `npm ci`, build, `wrangler pages deploy`).

Required GitHub secrets (repo → Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — Pages:Edit + Account:Read
- `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard

## Notes

- Contact details in the site (+1234 567 8900, info@flavoro.com, 123 Food Street, New York, USA 10001) are placeholders from the reference design — replace with real details before launch.
